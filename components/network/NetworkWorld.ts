import * as THREE from "three";
import { RoomEnvironment } from "three/examples/jsm/environments/RoomEnvironment.js";
import { filletPath, type NetworkLayout, type Point } from "@/lib/network-layout";

/* The map as a physical enamel model. Framework-free and lazy-loaded: every
   track is a real extruded ribbon generated from the same layout as the flat
   SVG, so the model cannot disagree with the data. Everything stands on a lit
   enamel plate, which catches the shadows and the sheen of the room. */

export type WorldTheme = {
  lines: Record<string, string>;
  plate: string;
  /** How much of the room the plate reflects; night needs far less. */
  plateSheen: number;
  zone: string;
  station: string;
  ring: string;
  hollowRing: string;
  drained: string;
  train: string;
  /** Contrast for the one line that is already the train's colour. */
  trainOnCareer: string;
};

export type WorldView =
  | { kind: "overview" }
  /* The whole map turned on end, for the tall panel beside the work list. */
  | { kind: "column" }
  | { kind: "stop"; id: string }
  | { kind: "line"; id: string };

export type Insets = { top: number; right: number; bottom: number; left: number };
export type Projected = { id: string; x: number; y: number };

type Options = {
  layout: NetworkLayout;
  theme: WorldTheme;
  hollowIds: string[];
  majorIds: string[];
  reducedMotion: boolean;
  mobile: boolean;
};

type Track = {
  id: string;
  mesh: THREE.Mesh<THREE.ExtrudeGeometry, THREE.MeshPhysicalMaterial>;
  path: Point[];
  lengths: number[];
  total: number;
  height: number;
  color: THREE.Color;
  rise: number;
  drain: number;
};

type Station = {
  id: string;
  group: THREE.Group;
  x: number;
  z: number;
  top: number;
  lines: string[];
  lift: number;
  /** 0 hidden, 1 shown; used for the hollow stop filling in. */
  fill: THREE.MeshPhysicalMaterial;
  hollow: boolean;
  filled: number;
};

const damp = (from: number, to: number, rate: number, dt: number) =>
  from + (to - from) * (1 - Math.exp(-rate * dt));

const ribbonShape = (path: Point[], halfWidth: number) => {
  const left: THREE.Vector2[] = [];
  const right: THREE.Vector2[] = [];
  path.forEach((p, i) => {
    const prev = path[Math.max(i - 1, 0)];
    const next = path[Math.min(i + 1, path.length - 1)];
    const dx = next.x - prev.x;
    const dy = next.y - prev.y;
    const len = Math.hypot(dx, dy) || 1;
    const nx = -dy / len;
    const ny = dx / len;
    // Shape y is negated world z, so the extrusion stands up after rotation.
    left.push(new THREE.Vector2(p.x + nx * halfWidth, -(p.y + ny * halfWidth)));
    right.push(new THREE.Vector2(p.x - nx * halfWidth, -(p.y - ny * halfWidth)));
  });
  return new THREE.Shape([...left, ...right.reverse()]);
};

const capsuleShape = (halfLength: number, radius: number) => {
  const s = new THREE.Shape();
  s.absarc(0, halfLength, radius, 0, Math.PI, false);
  s.absarc(0, -halfLength, radius, Math.PI, Math.PI * 2, false);
  s.closePath();
  return s;
};

export class NetworkWorld {
  private renderer: THREE.WebGLRenderer;
  private scene = new THREE.Scene();
  private camera: THREE.PerspectiveCamera;
  private layout: NetworkLayout;
  private theme: WorldTheme;
  private opts: Options;
  private center: THREE.Vector3;

  private tracks: Track[] = [];
  private stations: Station[] = [];
  private zones: { mesh: THREE.Mesh<THREE.PlaneGeometry, THREE.MeshPhysicalMaterial>; even: boolean }[] = [];
  private trains: { mesh: THREE.Mesh; track: Track; t: number; speed: number; dispatched: boolean }[] = [];
  private plate: THREE.Mesh<THREE.PlaneGeometry, THREE.MeshPhysicalMaterial>;
  private hollowRingMats: THREE.MeshPhysicalMaterial[] = [];
  private sun: THREE.DirectionalLight;
  private stationMats: THREE.MeshPhysicalMaterial[] = [];
  private ringMats: THREE.MeshPhysicalMaterial[] = [];
  private trainMat: THREE.MeshPhysicalMaterial;
  private careerTrainMat: THREE.MeshPhysicalMaterial;

  private view: WorldView = { kind: "overview" };
  private activeLine: string | null = null;
  private focusId: string | null = null;
  private hoverId: string | null = null;
  private insets: Insets = { top: 0, right: 0, bottom: 0, left: 0 };

  /* camera state */
  private target = new THREE.Vector3();
  private goalTarget = new THREE.Vector3();
  /** How far the visitor has dragged the map from the view's own framing. */
  private pan = new THREE.Vector3();
  private dragging = false;
  /** A phone shows the wide map at a readable scale and pans along it. */
  private narrow = false;
  private distance = 100;
  private goalDistance = 100;
  private polar = 0.02;
  private goalPolar = 0.7;
  private azimuth = 0;
  private goalAzimuth = -0.07;
  private pointer = new THREE.Vector2();
  private pointerSmooth = new THREE.Vector2();

  private rise = 0; // 0 flat diagram → 1 full model
  private width = 1;
  private height = 1;
  private raf = 0;
  private last = 0;
  private lastDraw = 0;
  private frameGap: number;
  private paused = false;
  private disposed = false;
  private firstFrame = false;
  private pixelRatio: number;
  private slowFrames = 0;
  private shadowDirty = true;
  private projected: Projected[] = [];
  private projector = new THREE.Vector3();

  constructor(
    canvas: HTMLCanvasElement,
    opts: Options,
    private onFirstFrame: () => void,
    private onProject: (points: Projected[]) => void,
  ) {
    this.opts = opts;
    this.layout = opts.layout;
    this.theme = opts.theme;
    this.frameGap = opts.mobile ? 1000 / 32 : 0;

    this.renderer = new THREE.WebGLRenderer({
      canvas,
      antialias: true,
      alpha: true,
      powerPreference: "high-performance",
    });
    this.pixelRatio = Math.min(window.devicePixelRatio, opts.mobile ? 1.5 : 2);
    this.renderer.setPixelRatio(this.pixelRatio);
    this.renderer.setClearColor(0x000000, 0);
    this.renderer.shadowMap.enabled = true;
    this.renderer.shadowMap.type = THREE.PCFSoftShadowMap;
    this.renderer.shadowMap.autoUpdate = false;

    const pmrem = new THREE.PMREMGenerator(this.renderer);
    this.scene.environment = pmrem.fromScene(new RoomEnvironment(), 0.04).texture;
    this.scene.environmentIntensity = 0.28;
    pmrem.dispose();

    this.camera = new THREE.PerspectiveCamera(26, 1, 1, 1200);

    const { width: w, height: h } = this.layout;
    this.center = new THREE.Vector3(w / 2, 0, h / 2);
    this.target.copy(this.center);
    this.goalTarget.copy(this.center);

    this.scene.add(new THREE.HemisphereLight(0xffffff, 0xd8dcd2, 1.25));
    this.sun = new THREE.DirectionalLight(0xffffff, 1.75);
    this.sun.position.set(this.center.x - 34, 70, this.center.z - 30);
    this.sun.target.position.copy(this.center);
    this.sun.castShadow = true;
    const reach = Math.max(w, h) * 0.72;
    Object.assign(this.sun.shadow.camera, { left: -reach, right: reach, top: reach, bottom: -reach, near: 1, far: 220 });
    this.sun.shadow.mapSize.set(opts.mobile ? 1024 : 2048, opts.mobile ? 1024 : 2048);
    this.sun.shadow.radius = 5;
    this.sun.shadow.bias = -0.0006;
    this.scene.add(this.sun, this.sun.target);

    this.plate = new THREE.Mesh(
      new THREE.PlaneGeometry(1600, 1600),
      new THREE.MeshPhysicalMaterial({
        color: opts.theme.plate,
        roughness: 0.46,
        clearcoat: 0.6 * opts.theme.plateSheen,
        clearcoatRoughness: 0.28,
        specularIntensity: opts.theme.plateSheen,
        envMapIntensity: opts.theme.plateSheen,
      }),
    );
    this.plate.rotation.x = -Math.PI / 2;
    this.plate.position.copy(this.center);
    this.plate.position.y = -0.03;
    this.plate.receiveShadow = true;
    this.scene.add(this.plate);

    this.trainMat = new THREE.MeshPhysicalMaterial({
      color: opts.theme.train,
      roughness: 0.25,
      clearcoat: 1,
    });

    this.careerTrainMat = new THREE.MeshPhysicalMaterial({
      color: opts.theme.trainOnCareer,
      roughness: 0.25,
      clearcoat: 1,
    });

    this.buildZones();
    this.buildTracks();
    this.buildStations();
    if (!opts.reducedMotion) this.buildTrains();
    this.applyTheme(opts.theme);

    if (opts.reducedMotion) {
      this.rise = 1;
      this.polar = this.goalPolar;
      this.azimuth = this.goalAzimuth;
    }

    this.resize();
    this.distance = this.goalDistance;
    this.last = performance.now();
    this.raf = requestAnimationFrame(this.loop);
  }

  /* ── build ─────────────────────────────────────────────────────────── */

  private buildZones() {
    const { layout: l } = this;
    const crossLength = l.height + 2400;
    l.zones.forEach((zone, i) => {
      const length = zone.to - zone.from;
      const geom = new THREE.PlaneGeometry(length, crossLength);
      const mat = new THREE.MeshPhysicalMaterial({
        color: this.theme.zone,
        roughness: 0.66,
        clearcoat: 0.2 * this.theme.plateSheen,
        clearcoatRoughness: 0.48,
        specularIntensity: this.theme.plateSheen,
        envMapIntensity: this.theme.plateSheen,
      });
      const mesh = new THREE.Mesh(geom, mat);
      mesh.rotation.x = -Math.PI / 2;
      const along = (zone.from + zone.to) / 2;
      mesh.position.set(along, 0, this.center.z);
      mesh.visible = i % 2 === 0;
      mesh.receiveShadow = true;
      this.scene.add(mesh);
      this.zones.push({ mesh, even: i % 2 === 0 });
    });
  }

  private buildTracks() {
    const half = this.layout.lineWidth / 2;
    this.layout.lines.forEach((line, i) => {
      const path = filletPath(line.points, 1.1);
      const height = 0.24 + i * 0.05;
      const geom = new THREE.ExtrudeGeometry(ribbonShape(path, half), {
        depth: height,
        bevelEnabled: true,
        bevelSize: 0.05,
        bevelThickness: 0.05,
        bevelSegments: 2,
        curveSegments: 4,
      });
      geom.rotateX(-Math.PI / 2);
      const color = new THREE.Color(this.theme.lines[line.id]);
      const mat = new THREE.MeshPhysicalMaterial({
        color,
        roughness: 0.32,
        metalness: 0,
        clearcoat: 1,
        clearcoatRoughness: 0.18,
      });
      const mesh = new THREE.Mesh(geom, mat);
      mesh.castShadow = true;
      mesh.receiveShadow = true;
      mesh.scale.y = 0.001;
      this.scene.add(mesh);

      const lengths = [0];
      path.slice(1).forEach((p, j) => {
        lengths.push(lengths[j] + Math.hypot(p.x - path[j].x, p.y - path[j].y));
      });
      this.tracks.push({
        id: line.id,
        mesh,
        path,
        lengths,
        total: lengths[lengths.length - 1],
        height,
        color,
        rise: 0,
        drain: 0,
      });
    });
  }

  private buildStations() {
    const { layout: l, opts } = this;
    const topHeight = Math.max(...this.tracks.map((t) => t.height)) + 0.12;
    const extrude = (shape: THREE.Shape, depth: number) => {
      const g = new THREE.ExtrudeGeometry(shape, {
        depth,
        bevelEnabled: true,
        bevelSize: 0.05,
        bevelThickness: 0.05,
        bevelSegments: 2,
        curveSegments: 18,
      });
      g.rotateX(-Math.PI / 2);
      return g;
    };
    l.stops.forEach((stop) => {
      const major = opts.majorIds.includes(stop.id);
      const hollow = opts.hollowIds.includes(stop.id);
      const r = hollow ? 1.15 : major ? 0.86 : 0.62;
      const group = new THREE.Group();
      group.position.set(stop.x, 0, stop.y);

      const ringMat = new THREE.MeshPhysicalMaterial({ color: this.theme.ring, roughness: 0.3, clearcoat: 1 });
      const ringShape = capsuleShape(stop.span, r);
      // The unbuilt station is a real ring: you see the plate through it.
      if (hollow) ringShape.holes.push(capsuleShape(stop.span, r * 0.7));
      const ring = new THREE.Mesh(extrude(ringShape, topHeight), ringMat);
      ring.castShadow = true;
      group.add(ring);
      (hollow ? this.hollowRingMats : this.ringMats).push(ringMat);

      const faceMat = new THREE.MeshPhysicalMaterial({ color: this.theme.station, roughness: 0.22, clearcoat: 1 });
      // The hollow stop's disc sits just under its rim, above the track that ends here.
      const faceHeight = hollow ? topHeight - 0.06 : topHeight + 0.05;
      const face = new THREE.Mesh(extrude(capsuleShape(stop.span, hollow ? r * 0.7 : r * 0.62), faceHeight), faceMat);
      group.add(face);
      if (hollow) faceMat.color.set(this.theme.plate);
      else this.stationMats.push(faceMat);
      group.scale.y = 0.001;
      this.scene.add(group);
      this.stations.push({
        id: stop.id,
        group,
        x: stop.x,
        z: stop.y,
        top: topHeight + 0.1,
        lines: stop.lines,
        lift: 0,
        fill: faceMat,
        hollow,
        filled: 0,
      });
    });
  }

  private buildTrains() {
    const geom = new THREE.CapsuleGeometry(this.layout.lineWidth * 0.36, 1.5, 6, 12);
    geom.rotateZ(Math.PI / 2);
    this.tracks.forEach((track, i) => {
      if (track.total < 8) return;
      const count = track.total > 50 ? 2 : 1;
      for (let n = 0; n < count; n++) {
        const mesh = new THREE.Mesh(geom, track.id === "C" ? this.careerTrainMat : this.trainMat);
        mesh.castShadow = true;
        this.scene.add(mesh);
        this.trains.push({
          mesh,
          track,
          t: (n / count + i * 0.13) % 1,
          speed: 2.6 + (i % 3) * 0.5,
          dispatched: false,
        });
      }
    });
  }

  /* ── public API ────────────────────────────────────────────────────── */

  resize() {
    const canvas = this.renderer.domElement;
    const w = canvas.clientWidth || window.innerWidth;
    const h = canvas.clientHeight || window.innerHeight;
    this.width = w;
    this.height = h;
    this.renderer.setSize(w, h, false);
    this.camera.aspect = w / h;
    this.applyOffset();
    this.frame();
  }

  setInsets(insets: Insets) {
    this.insets = insets;
    this.applyOffset();
    this.frame();
  }

  setView(view: WorldView) {
    if (JSON.stringify(view) !== JSON.stringify(this.view)) this.pan.set(0, 0, 0);
    this.view = view;
    this.frame();
  }

  setActiveLine(id: string | null) {
    this.activeLine = id;
    this.frame();
  }

  setFocus(id: string | null) {
    this.focusId = id;
    this.frame();
  }

  /** Lifts a station without moving the camera, so it stays under the pointer. */
  setHover(id: string | null) {
    this.hoverId = id;
  }

  setNarrow(narrow: boolean) {
    this.narrow = narrow;
    this.frame();
  }

  setDragging(dragging: boolean) {
    this.dragging = dragging;
  }

  /** Moves the map with the pointer: the ground under it stays under it. */
  panBy(dx: number, dy: number) {
    const tan = Math.tan(THREE.MathUtils.degToRad(this.camera.fov / 2));
    const perPixel = (2 * this.distance * tan) / this.height;
    const across = dx * perPixel;
    const along = (dy * perPixel) / Math.max(Math.cos(this.polar), 0.3);
    const sin = Math.sin(this.azimuth);
    const cos = Math.cos(this.azimuth);
    this.pan.x += -across * cos - along * sin;
    this.pan.z += across * sin - along * cos;
    // Keep some of the map on screen.
    const { width, height } = this.layout;
    this.pan.x = THREE.MathUtils.clamp(this.pan.x, -6 - this.goalTarget.x, width + 6 - this.goalTarget.x);
    this.pan.z = THREE.MathUtils.clamp(this.pan.z, -6 - this.goalTarget.z, height + 6 - this.goalTarget.z);
  }

  setPointer(x: number, y: number) {
    this.pointer.set(x, y);
  }

  setPaused(paused: boolean) {
    this.paused = paused;
  }

  setTheme(theme: WorldTheme) {
    this.theme = theme;
    this.applyTheme(theme);
    this.shadowDirty = true;
  }

  /** A train runs the Career line to the Next stop, which then fills in. */
  dispatchToNextStop() {
    const hollow = this.stations.find((s) => s.hollow);
    if (!hollow) return;
    hollow.filled = 1;
    const track = this.tracks.find((t) => hollow.lines.includes(t.id));
    const train = this.trains.find((t) => t.track === track);
    if (train) {
      train.t = 0.72;
      train.speed = 16;
      train.dispatched = true;
    }
  }

  dispose() {
    this.disposed = true;
    cancelAnimationFrame(this.raf);
    this.scene.traverse((o) => {
      const mesh = o as THREE.Mesh;
      mesh.geometry?.dispose();
      const mat = mesh.material as THREE.Material | undefined;
      mat?.dispose?.();
    });
    this.scene.environment?.dispose();
    this.renderer.dispose();
  }

  /* ── framing ───────────────────────────────────────────────────────── */

  private applyOffset() {
    const { top, right, bottom, left } = this.insets;
    // Slide the optical centre into the clear part of the screen.
    const dx = (right - left) / 2;
    const dy = (bottom - top) / 2;
    this.camera.setViewOffset(this.width, this.height, dx, dy, this.width, this.height);
  }

  /* Picks the goal target and distance for the current view. */
  private frame() {
    const { layout: l, insets } = this;
    const clearW = Math.max(this.width - insets.left - insets.right, 120);
    const clearH = Math.max(this.height - insets.top - insets.bottom, 120);
    const tan = Math.tan(THREE.MathUtils.degToRad(this.camera.fov / 2));

    const fit = (spanX: number, spanZ: number, polar: number) => {
      // Height the tilted span occupies on screen, scaled to the clear area.
      const viewH = (spanZ * Math.cos(polar) + 11) * (this.height / clearH);
      const viewW = (spanX + 14) * (this.width / clearW);
      if (this.narrow && spanX > 30) return viewH / (2 * tan);
      return Math.max(viewH, viewW / this.camera.aspect) / (2 * tan);
    };

    const focus = this.focusId ? this.stations.find((s) => s.id === this.focusId) : null;
    const view = this.view;

    if (view.kind === "column") {
      const whole = fit(l.height, l.width * 1.1, 0.5);
      this.goalPolar = 0.5;
      this.goalAzimuth = Math.PI / 2;
      if (focus) {
        this.goalTarget.set(
          this.center.x + (focus.x - this.center.x) * 0.25,
          0,
          this.center.z + (focus.z - this.center.z) * 0.25,
        );
        this.goalDistance = whole * 0.9;
      } else {
        this.goalTarget.copy(this.center);
        this.goalDistance = whole;
      }
      return;
    }

    if (view.kind === "stop") {
      const s = this.stations.find((st) => st.id === view.id);
      if (s) {
        this.goalTarget.set(s.x, 0, s.z);
        // Nothing lies beyond the last station: look back along the line.
        if (s.hollow) this.goalTarget.x -= 12;
        this.goalDistance = s.hollow
          ? fit(this.narrow ? 24 : 40, 7, 0.92)
          : fit(this.narrow ? 24 : 46, 20, 0.92);
        this.goalPolar = 0.92;
        this.goalAzimuth = -0.3;
        return;
      }
    }

    if (view.kind === "line") {
      const t = this.tracks.find((tr) => tr.id === view.id);
      if (t) {
        const xs = t.path.map((p) => p.x);
        const ys = t.path.map((p) => p.y);
        const [x0, x1, z0, z1] = [Math.min(...xs), Math.max(...xs), Math.min(...ys), Math.max(...ys)];
        this.goalTarget.set((x0 + x1) / 2, 0, (z0 + z1) / 2);
        this.goalDistance = fit((x1 - x0) * 0.86, z1 - z0, 0.96);
        this.goalPolar = 0.96;
        this.goalAzimuth = -0.3;
        return;
      }
    }

    const overview = fit(l.width, l.height, 0.7);
    if (focus) {
      // Drift toward what is being read, without losing the whole map.
      this.goalTarget.set(
        this.center.x + (focus.x - this.center.x) * 0.5,
        0,
        this.center.z + (focus.z - this.center.z) * 0.5,
      );
      this.goalDistance = overview * 0.8;
    } else {
      this.goalTarget.copy(this.center);
      // Open on the recent work; the earlier years are a swipe away.
      if (this.narrow) this.goalTarget.x = l.width * 0.66;
      this.goalDistance = overview;
    }
    this.goalPolar = 0.7;
    this.goalAzimuth = -0.07;
  }

  private applyTheme(theme: WorldTheme) {
    this.tracks.forEach((t) => t.color.set(theme.lines[t.id]));
    this.plate.material.color.set(theme.plate);
    [this.plate.material, ...this.zones.map(({ mesh }) => mesh.material)].forEach((m) => {
      m.envMapIntensity = theme.plateSheen;
      m.specularIntensity = theme.plateSheen;
      m.clearcoat = 0.6 * theme.plateSheen;
    });
    this.zones.forEach(({ mesh }) => mesh.material.color.set(theme.zone));
    this.hollowRingMats.forEach((m) => m.color.set(theme.hollowRing));
    this.stationMats.forEach((m) => m.color.set(theme.station));
    this.ringMats.forEach((m) => m.color.set(theme.ring));
    this.stations.forEach((s) => {
      if (s.hollow && !s.filled) s.fill.color.set(theme.plate);
      if (s.hollow && s.filled) s.fill.color.set(theme.station);
    });
    this.trainMat.color.set(theme.train);
    this.careerTrainMat.color.set(theme.trainOnCareer);
  }

  /* ── frame loop ────────────────────────────────────────────────────── */

  private loop = (now: number) => {
    if (this.disposed) return;
    this.raf = requestAnimationFrame(this.loop);
    if (this.paused) {
      this.last = now;
      return;
    }
    if (this.frameGap && now - this.lastDraw < this.frameGap) return;
    this.lastDraw = now;
    // rAF timestamps can precede the performance.now() taken at start-up.
    const dt = Math.min(Math.max((now - this.last) / 1000, 0), 0.1);
    this.last = now;
    this.watchFrameRate(dt);
    this.update(dt);
    this.draw();
    if (!this.firstFrame) {
      this.firstFrame = true;
      this.onFirstFrame();
    }
  };

  /* Lowers resolution once on slow machines rather than dropping frames. */
  private watchFrameRate(dt: number) {
    if (dt > 1 / 28) this.slowFrames++;
    else this.slowFrames = Math.max(0, this.slowFrames - 1);
    if (this.slowFrames > 45 && this.pixelRatio > 1) {
      this.slowFrames = 0;
      this.pixelRatio = 1;
      this.renderer.setPixelRatio(1);
      this.renderer.setSize(this.width, this.height, false);
    }
  }

  private update(dt: number) {
    const reduced = this.opts.reducedMotion;
    const snap = reduced ? 1e3 : 1;
    const wasRising = this.rise < 1;
    if (this.rise < 1) this.rise = Math.min(this.rise + dt / 2.2, 1);

    let moving = wasRising;
    const members = this.memberLines();

    this.tracks.forEach((track, i) => {
      // Tracks rise one after another out of the flat diagram.
      const start = i * 0.06;
      const local = Math.min(Math.max((this.rise - start) / (1 - start), 0), 1);
      const eased = 1 - Math.pow(1 - local, 4);
      const active = this.activeLine === track.id;
      const drained = members !== null && !members.includes(track.id);
      const goalRise = active && !this.isCloseView() ? 1 : 0;
      const goalDrain = drained ? 1 : 0;
      if (Math.abs(track.rise - goalRise) > 0.002 || Math.abs(track.drain - goalDrain) > 0.002) moving = true;
      track.rise = damp(track.rise, goalRise, 7 * snap, dt);
      track.drain = damp(track.drain, goalDrain, 7 * snap, dt);

      track.mesh.scale.y = Math.max(eased * (1 + track.rise * 1.5 - track.drain * 0.55), 0.001);
      track.mesh.material.color.copy(track.color).lerp(this.drainColor, track.drain * 0.86);
    });

    this.stations.forEach((s) => {
      const onActive = members !== null && s.lines.some((l) => members.includes(l)) && !this.isCloseView();
      const focused =
        this.focusId === s.id || this.hoverId === s.id || (this.view.kind === "stop" && this.view.id === s.id);
      const dimmed = members !== null && !s.lines.some((l) => members.includes(l));
      const goal = (focused ? 1.1 : 0) + (onActive ? 0.7 : 0) - (dimmed ? 0.45 : 0);
      if (Math.abs(s.lift - goal) > 0.002) moving = true;
      s.lift = damp(s.lift, goal, 8 * snap, dt);
      const eased = 1 - Math.pow(1 - this.rise, 4);
      s.group.scale.y = Math.max(eased * (1 + s.lift), 0.001);
      if (s.hollow && s.filled) s.fill.color.lerp(this.fillColor, 1 - Math.exp(-3 * dt));
    });

    this.trains.forEach((train) => {
      const { track } = train;
      train.t += (train.speed * dt) / track.total;
      if (train.t >= 1) {
        if (train.dispatched) {
          train.dispatched = false;
          train.speed = 3;
        }
        train.t %= 1;
      }
      const distance = train.t * track.total;
      let j = 1;
      while (j < track.lengths.length - 1 && track.lengths[j] < distance) j++;
      const [a, b] = [track.path[j - 1], track.path[j]];
      const seg = track.lengths[j] - track.lengths[j - 1] || 1;
      const k = (distance - track.lengths[j - 1]) / seg;
      const mesh = train.mesh;
      const top = track.height * track.mesh.scale.y + 0.16;
      mesh.position.set(a.x + (b.x - a.x) * k, top, a.y + (b.y - a.y) * k);
      mesh.rotation.y = -Math.atan2(b.y - a.y, b.x - a.x);
      const hide = members !== null && !members.includes(track.id);
      mesh.visible = !hide && this.rise >= 1;
    });

    if (moving) this.shadowDirty = true;

    /* camera: a long ease-out, with a little pointer parallax */
    const rate = reduced ? 1e3 : 2.1;
    const follow = reduced ? 1e3 : this.dragging ? 22 : 5;
    this.target.x = damp(this.target.x, this.goalTarget.x + this.pan.x, this.pan.x || this.dragging ? follow : rate, dt);
    this.target.y = damp(this.target.y, this.goalTarget.y, rate, dt);
    this.target.z = damp(this.target.z, this.goalTarget.z + this.pan.z, this.pan.z || this.dragging ? follow : rate, dt);
    this.distance = damp(this.distance, this.goalDistance, rate, dt);
    if (!wasRising) {
      this.polar = damp(this.polar, this.goalPolar, rate, dt);
      this.azimuth = damp(this.azimuth, this.goalAzimuth, rate, dt);
    } else {
      // Tilt from the flat, top-down diagram as the model rises.
      const eased = 1 - Math.pow(1 - this.rise, 3);
      this.polar = 0.02 + (this.goalPolar - 0.02) * eased;
      this.azimuth = this.goalAzimuth * eased;
    }
    this.pointerSmooth.lerp(this.pointer, 1 - Math.exp(-3 * dt));
    const az = this.azimuth + (reduced ? 0 : this.pointerSmooth.x * 0.035);
    const po = this.polar + (reduced ? 0 : this.pointerSmooth.y * 0.025);
    this.camera.position.set(
      this.target.x + this.distance * Math.sin(po) * Math.sin(az),
      this.target.y + this.distance * Math.cos(po),
      this.target.z + this.distance * Math.sin(po) * Math.cos(az),
    );
    this.camera.lookAt(this.target);
    this.camera.updateMatrixWorld();

    /* report where each station lands, for the DOM labels */
    this.projected.length = 0;
    this.stations.forEach((s) => {
      this.projector.set(s.x, s.top * s.group.scale.y, s.z).project(this.camera);
      this.projected.push({
        id: s.id,
        x: (this.projector.x * 0.5 + 0.5) * this.width,
        y: (-this.projector.y * 0.5 + 0.5) * this.height,
      });
    });
    this.layout.zones.forEach((zone) => {
      this.projector.set(zone.from + 2.4, 0, -5).project(this.camera);
      this.projected.push({
        id: `zone-${zone.year}`,
        x: (this.projector.x * 0.5 + 0.5) * this.width,
        y: (-this.projector.y * 0.5 + 0.5) * this.height,
      });
    });
    this.onProject(this.projected);
  }

  private isCloseView() {
    return this.view.kind === "stop" || this.view.kind === "line";
  }

  /* Which lines keep their colour: the page's own, or the one chosen. */
  private memberLines(): string[] | null {
    const view = this.view;
    if (view.kind === "stop") return this.stations.find((s) => s.id === view.id)?.lines ?? null;
    if (view.kind === "line") return [view.id];
    return this.activeLine ? [this.activeLine] : null;
  }

  private get drainColor() {
    return new THREE.Color(this.theme.drained);
  }

  private get fillColor() {
    return new THREE.Color(this.theme.station);
  }

  private draw() {
    if (this.shadowDirty) {
      this.renderer.shadowMap.needsUpdate = true;
      this.shadowDirty = false;
    }
    this.renderer.render(this.scene, this.camera);
  }
}
