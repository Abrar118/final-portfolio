import * as THREE from "three";
import { mergeGeometries } from "three/examples/jsm/utils/BufferGeometryUtils.js";
import { dawn, dusk, type ForestPalette } from "./palette";

/* ─────────────────────────────────────────────────────────────────────────
   The forest. One low-poly world, built procedurally on load (no models,
   no textures to download), with four landmarks along a single trail:

     Trailhead  → a spirit-fire camp            (/)
     Elder Grove → an ancient tree with lanterns (/profile)
     Crystal Hollow → a ring of quest crystals   (/projects)
     Beacon Hill → a tower whose beam you can see from everywhere (/contact)

   The camera walks the trail between them. Everything is instanced or
   shader-driven so it stays cheap: ~100k triangles, two point lights, no
   shadows, adaptive pixel ratio.
   ───────────────────────────────────────────────────────────────────────── */

export type ForestOptions = {
  theme: "dark" | "light";
  zone: number;
  projectCount: number;
  aerial: boolean;
  reducedMotion: boolean;
  mobile: boolean;
};

/* ── Deterministic noise so the forest is the same forest every visit ── */
const fract = (x: number) => x - Math.floor(x);
const hash2 = (x: number, z: number) =>
  fract(Math.sin(x * 127.1 + z * 311.7) * 43758.5453);
const noise = (x: number, z: number) => {
  const ix = Math.floor(x);
  const iz = Math.floor(z);
  const fx = x - ix;
  const fz = z - iz;
  const ux = fx * fx * (3 - 2 * fx);
  const uz = fz * fz * (3 - 2 * fz);
  const a = hash2(ix, iz);
  const b = hash2(ix + 1, iz);
  const c = hash2(ix, iz + 1);
  const d = hash2(ix + 1, iz + 1);
  return a + (b - a) * ux + (c - a) * uz + (a - b - c + d) * ux * uz;
};
const mulberry32 = (seed: number) => () => {
  seed |= 0;
  seed = (seed + 0x6d2b79f5) | 0;
  let t = Math.imul(seed ^ (seed >>> 15), 1 | seed);
  t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
  return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
};
const smoothstep = (a: number, b: number, x: number) => {
  const t = Math.min(Math.max((x - a) / (b - a), 0), 1);
  return t * t * (3 - 2 * t);
};
const easeInOutCubic = (t: number) =>
  t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2;

/* ── Landmarks ── */
const CAMPFIRE = new THREE.Vector2(5, 43);
const ELDER = new THREE.Vector2(-47, -3);
const HOLLOW = new THREE.Vector2(41, -49);
const BEACON = new THREE.Vector2(-10, -126);

const terrain = (x: number, z: number) => {
  let h =
    (noise(x * 0.025, z * 0.025) - 0.5) * 7 +
    (noise(x * 0.07 + 13, z * 0.07 + 7) - 0.5) * 2.4 +
    Math.sin(x * 0.04) * Math.cos(z * 0.035) * 1.4;
  const r = Math.hypot(x, z + 25);
  if (r > 150) h += (r - 150) * 0.45;
  const bx = x - BEACON.x;
  const bz = z - BEACON.y;
  h += 15 * Math.exp(-(bx * bx + bz * bz) / (2 * 16 * 16));
  const hx = x - HOLLOW.x;
  const hz = z - HOLLOW.y;
  h -= 2.2 * Math.exp(-(hx * hx + hz * hz) / (2 * 12 * 12));
  return h;
};

const TRAIL: [number, number][] = [
  [2, 80],
  [4, 59],
  [-6, 38],
  [-20, 20],
  [-25, 1],
  [-12, -15],
  [8, -27],
  [22, -42],
  [16, -60],
  [2, -78],
  [-7, -99],
];

type ZoneShot = { u: number; height: number; focus: THREE.Vector3 };

/* Shared GLSL: three's color-space conversion so shader colors match the
   lit materials. */
const OUT = `#include <tonemapping_fragment>
#include <colorspace_fragment>`;

export class ForestWorld {
  private renderer: THREE.WebGLRenderer;
  private scene = new THREE.Scene();
  private camera: THREE.PerspectiveCamera;
  private clock = new THREE.Clock();
  private palette: ForestPalette;
  private opts: ForestOptions;

  private curve: THREE.CatmullRomCurve3;
  private shots: ZoneShot[] = [];

  /* camera state */
  private u = 0;
  private uFrom = 0;
  private uTo = 0;
  private travel = 1;
  private travelDur = 1;
  private aerial: boolean;
  private intro = { active: false, t: 0, dur: 3.6, angle: 0 };
  private scroll = 0;
  private scrollSmooth = 0;
  private pointer = new THREE.Vector2();
  private pointerSmooth = new THREE.Vector2();
  private viewShift = 0;
  private time = 0;

  /* scene parts that animate or recolor */
  private fog: THREE.FogExp2;
  private hemi: THREE.HemisphereLight;
  private sun: THREE.DirectionalLight;
  private sky!: THREE.Mesh<THREE.SphereGeometry, THREE.ShaderMaterial>;
  private stars!: THREE.Points<THREE.BufferGeometry, THREE.PointsMaterial>;
  private groundMat!: THREE.MeshLambertMaterial;
  private ground!: THREE.Mesh;
  private pathMat!: THREE.MeshLambertMaterial;
  private foliage: { mesh: THREE.InstancedMesh; tone: Float32Array; pick: Uint8Array }[] = [];
  private barkMats: THREE.MeshLambertMaterial[] = [];
  private canopyMat!: THREE.MeshLambertMaterial;
  private rockMat!: THREE.MeshLambertMaterial;
  private mountainMat!: THREE.MeshLambertMaterial;
  private windUniform = { value: 0 };
  private fireflies!: THREE.Points<THREE.BufferGeometry, THREE.ShaderMaterial>;
  private embers!: THREE.Points<THREE.BufferGeometry, THREE.ShaderMaterial>;
  private rays: THREE.Mesh<THREE.CylinderGeometry, THREE.ShaderMaterial>[] = [];
  private flames: THREE.Mesh<THREE.ConeGeometry, THREE.ShaderMaterial>[] = [];
  private fireLight!: THREE.PointLight;
  private glowMats: { mat: THREE.MeshBasicMaterial; which: "a" | "b" }[] = [];
  private mushrooms!: THREE.InstancedMesh;
  private mushroomPick!: Uint8Array;
  private lanterns!: THREE.InstancedMesh;
  private lanternBase: THREE.Vector3[] = [];
  private runeRings: THREE.Mesh[] = [];
  private crystals: { mesh: THREE.Mesh<THREE.OctahedronGeometry, THREE.MeshLambertMaterial>; base: THREE.Vector3; level: number }[] = [];
  private heart!: THREE.Group;
  private hollowRing!: THREE.Mesh<THREE.RingGeometry, THREE.ShaderMaterial>;
  private focusIndex = -1;
  private beam!: THREE.Mesh<THREE.CylinderGeometry, THREE.ShaderMaterial>;
  private beaconOrb!: THREE.Mesh;
  private beaconLight!: THREE.PointLight;
  private shock!: THREE.Mesh<THREE.RingGeometry, THREE.ShaderMaterial>;
  private flareT = 99;

  /* performance */
  private pixelRatio: number;
  private frameTimes: number[] = [];
  private lastFrame = 0;
  private minFrameGap: number;
  private disposed = false;
  private onFirstFrame?: () => void;

  constructor(
    canvas: HTMLCanvasElement,
    opts: ForestOptions,
    onFirstFrame?: () => void,
  ) {
    this.opts = opts;
    this.onFirstFrame = onFirstFrame;
    this.palette = opts.theme === "light" ? dawn : dusk;
    this.aerial = opts.aerial;
    this.minFrameGap = opts.mobile ? 1000 / 32 : 0;

    this.renderer = new THREE.WebGLRenderer({
      canvas,
      antialias: !opts.mobile && window.devicePixelRatio < 2,
      powerPreference: "high-performance",
      alpha: false,
      stencil: false,
    });
    this.pixelRatio = Math.min(window.devicePixelRatio, opts.mobile ? 1.25 : 1.5);
    this.renderer.setPixelRatio(this.pixelRatio);

    this.camera = new THREE.PerspectiveCamera(55, 1, 0.3, 900);
    this.fog = new THREE.FogExp2(this.palette.fog, this.palette.fogDensity);
    this.scene.fog = this.fog;

    this.hemi = new THREE.HemisphereLight();
    this.sun = new THREE.DirectionalLight();
    this.sun.position.set(-60, 90, -40);
    this.scene.add(this.hemi, this.sun);

    this.curve = new THREE.CatmullRomCurve3(
      TRAIL.map(([x, z]) => new THREE.Vector3(x, terrain(x, z), z)),
      false,
      "centripetal",
    );
    const n = TRAIL.length - 1;
    this.shots = [
      { u: 1 / n, height: 7, focus: new THREE.Vector3(-8, terrain(-8, 8) + 4, 8) },
      { u: 4 / n, height: 3.2, focus: new THREE.Vector3(ELDER.x, terrain(ELDER.x, ELDER.y) + 12, ELDER.y) },
      { u: 7 / n, height: 4, focus: new THREE.Vector3(HOLLOW.x, terrain(HOLLOW.x, HOLLOW.y) + 3, HOLLOW.y) },
      { u: 10 / n, height: 5, focus: new THREE.Vector3(BEACON.x, terrain(BEACON.x, BEACON.y) + 9, BEACON.y) },
    ];
    const start = this.shots[Math.min(opts.zone, this.shots.length - 1)].u;
    this.u = this.uFrom = this.uTo = start;

    this.buildSky();
    this.buildGround();
    this.buildForest();
    this.buildCamp();
    this.buildGrove();
    this.buildHollow();
    this.buildBeacon();
    this.buildFireflies();
    this.buildRays();
    this.applyPalette();

    this.resize();
    this.renderer.setAnimationLoop(this.loop);
  }

  /* ───────────────────────────── public API ───────────────────────────── */

  setZone(index: number) {
    const shot = this.shots[Math.min(Math.max(index, 0), this.shots.length - 1)];
    if (Math.abs(shot.u - this.uTo) < 1e-4) return;
    this.uFrom = this.u;
    this.uTo = shot.u;
    const span = Math.abs(this.uTo - this.uFrom);
    this.travelDur = this.opts.reducedMotion ? 0.001 : 1.7 + span * 3.2;
    this.travel = 0;
  }

  /** Leave the title-screen flyover and swoop down onto the trail. */
  playIntro() {
    if (!this.aerial) return;
    this.aerial = false;
    if (this.opts.reducedMotion) return;
    this.intro = { active: true, t: 0, dur: 3.6, angle: this.time * 0.035 };
  }

  setTheme(theme: "dark" | "light") {
    const next = theme === "light" ? dawn : dusk;
    if (next === this.palette) return;
    this.palette = next;
    this.applyPalette();
  }

  setScroll(progress: number) {
    this.scroll = Math.min(Math.max(progress, 0), 1);
  }

  setPointer(x: number, y: number) {
    this.pointer.set(x, y);
  }

  setViewShift(px: number) {
    this.viewShift = px;
    this.resize();
  }

  setFocus(index: number) {
    this.focusIndex = index;
  }

  flare() {
    this.flareT = 0;
  }

  resize = () => {
    const canvas = this.renderer.domElement;
    const w = canvas.clientWidth || window.innerWidth;
    const h = canvas.clientHeight || window.innerHeight;
    this.renderer.setSize(w, h, false);
    this.camera.aspect = w / h;
    this.camera.fov = w / h < 0.8 ? 68 : 55;
    if (this.viewShift) this.camera.setViewOffset(w, h, -this.viewShift, 0, w, h);
    else this.camera.clearViewOffset();
    this.camera.updateProjectionMatrix();
  };

  dispose() {
    this.disposed = true;
    this.renderer.setAnimationLoop(null);
    this.scene.traverse((obj) => {
      const mesh = obj as THREE.Mesh;
      mesh.geometry?.dispose();
      const mat = mesh.material as THREE.Material | THREE.Material[] | undefined;
      if (Array.isArray(mat)) mat.forEach((m) => m.dispose());
      else mat?.dispose();
    });
    this.renderer.dispose();
    this.renderer.forceContextLoss();
  }

  /* ───────────────────────────── building ───────────────────────────── */

  private buildSky() {
    const geo = new THREE.SphereGeometry(500, 32, 16);
    const mat = new THREE.ShaderMaterial({
      side: THREE.BackSide,
      depthWrite: false,
      fog: false,
      uniforms: {
        uTop: { value: new THREE.Color() },
        uHorizon: { value: new THREE.Color() },
        uGlow: { value: new THREE.Color() },
        uMoon: { value: new THREE.Color() },
        uAuroraA: { value: new THREE.Color() },
        uAuroraB: { value: new THREE.Color() },
        uAurora: { value: 1 },
        uMoonDir: { value: new THREE.Vector3(-0.35, 0.42, -0.84).normalize() },
        uTime: { value: 0 },
      },
      vertexShader: /* glsl */ `
        varying vec3 vDir;
        void main() {
          vDir = normalize(position);
          vec4 p = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
          gl_Position = p.xyww;
        }`,
      fragmentShader: /* glsl */ `
        uniform vec3 uTop, uHorizon, uGlow, uMoon, uAuroraA, uAuroraB, uMoonDir;
        uniform float uAurora, uTime;
        varying vec3 vDir;
        void main() {
          vec3 d = normalize(vDir);
          float h = d.y;
          vec3 col = mix(uHorizon, uTop, smoothstep(-0.02, 0.6, h));
          float m = max(dot(d, uMoonDir), 0.0);
          col += uGlow * (pow(m, 10.0) * 0.45 + pow(m, 80.0) * 0.6);
          col = mix(col, uMoon, smoothstep(0.9990, 0.9994, m));
          // Aurora: slow folded curtains in teal and chartreuse.
          float fold = sin(d.x * 5.0 + uTime * 0.05 + sin(d.z * 3.5 + uTime * 0.07) * 1.8);
          float curtain = pow(max(fold, 0.0), 3.0);
          float band = smoothstep(0.12, 0.38, h) * (1.0 - smoothstep(0.45, 0.85, h));
          float streak = 0.65 + 0.35 * sin(d.x * 40.0 + d.z * 25.0 + uTime * 0.2);
          vec3 aur = mix(uAuroraA, uAuroraB, 0.5 + 0.5 * sin(d.x * 2.0 - d.z * 1.5 + uTime * 0.03));
          col += aur * curtain * band * streak * 0.42 * uAurora;
          gl_FragColor = vec4(col, 1.0);
          ${OUT}
        }`,
    });
    this.sky = new THREE.Mesh(geo, mat);
    this.sky.renderOrder = -2;
    this.sky.frustumCulled = false;
    this.scene.add(this.sky);

    const rand = mulberry32(7);
    const count = 900;
    const pos = new Float32Array(count * 3);
    for (let i = 0; i < count; i++) {
      const theta = rand() * Math.PI * 2;
      const y = 0.08 + rand() * 0.92;
      const r = Math.sqrt(1 - y * y);
      pos.set([Math.cos(theta) * r * 460, y * 460, Math.sin(theta) * r * 460], i * 3);
    }
    const sg = new THREE.BufferGeometry();
    sg.setAttribute("position", new THREE.BufferAttribute(pos, 3));
    this.stars = new THREE.Points(
      sg,
      new THREE.PointsMaterial({
        size: 1.6,
        sizeAttenuation: false,
        transparent: true,
        depthWrite: false,
        fog: false,
        color: 0xeaf6dc,
      }),
    );
    this.stars.renderOrder = -1;
    this.stars.frustumCulled = false;
    this.scene.add(this.stars);
  }

  private buildGround() {
    const size = 560;
    const seg = this.opts.mobile ? 110 : 150;
    const geo = new THREE.PlaneGeometry(size, size, seg, seg);
    geo.rotateX(-Math.PI / 2);
    geo.translate(0, 0, -25);
    const p = geo.attributes.position as THREE.BufferAttribute;
    // Per-vertex moss mix factor; applyPalette turns it into colors.
    const mixT = new Float32Array(p.count);
    for (let i = 0; i < p.count; i++) {
      const x = p.getX(i);
      const z = p.getZ(i);
      p.setY(i, terrain(x, z));
      mixT[i] = noise(x * 0.05 + 40, z * 0.05 - 9);
    }
    geo.setAttribute("mixT", new THREE.BufferAttribute(mixT, 1));
    geo.setAttribute("color", new THREE.BufferAttribute(new Float32Array(p.count * 3), 3));
    geo.computeVertexNormals();
    this.groundMat = new THREE.MeshLambertMaterial({ vertexColors: true, flatShading: true });
    this.ground = new THREE.Mesh(geo, this.groundMat);
    this.scene.add(this.ground);

    // The trail itself: a soft-edged ribbon laid over the terrain.
    const steps = 360;
    const width = 3.2;
    const verts: number[] = [];
    const uvs: number[] = [];
    const idx: number[] = [];
    const tangent = new THREE.Vector3();
    for (let i = 0; i <= steps; i++) {
      const u = i / steps;
      const c = this.curve.getPoint(u);
      this.curve.getTangent(u, tangent);
      const nx = -tangent.z;
      const nz = tangent.x;
      const len = Math.hypot(nx, nz) || 1;
      for (const side of [-1, 1]) {
        const x = c.x + (nx / len) * width * side;
        const z = c.z + (nz / len) * width * side;
        verts.push(x, terrain(x, z) + 0.22, z);
        uvs.push(side === -1 ? 0 : 1, u * 40);
      }
      if (i < steps) {
        const a = i * 2;
        idx.push(a, a + 2, a + 1, a + 1, a + 2, a + 3);
      }
    }
    const pathGeo = new THREE.BufferGeometry();
    pathGeo.setAttribute("position", new THREE.Float32BufferAttribute(verts, 3));
    pathGeo.setAttribute("uv", new THREE.Float32BufferAttribute(uvs, 2));
    pathGeo.setIndex(idx);
    pathGeo.computeVertexNormals();
    const alpha = document.createElement("canvas");
    alpha.width = 64;
    alpha.height = 4;
    const ctx = alpha.getContext("2d")!;
    const g = ctx.createLinearGradient(0, 0, 64, 0);
    g.addColorStop(0, "#000");
    g.addColorStop(0.3, "#bbb");
    g.addColorStop(0.5, "#fff");
    g.addColorStop(0.7, "#bbb");
    g.addColorStop(1, "#000");
    ctx.fillStyle = g;
    ctx.fillRect(0, 0, 64, 4);
    const alphaMap = new THREE.CanvasTexture(alpha);
    this.pathMat = new THREE.MeshLambertMaterial({
      transparent: true,
      alphaMap,
      depthWrite: false,
      polygonOffset: true,
      polygonOffsetFactor: -2,
    });
    this.scene.add(new THREE.Mesh(pathGeo, this.pathMat));
  }

  /** Min 2D distance from a point to the trail, for keeping it clear. */
  private trailSamples: THREE.Vector2[] = [];
  private distToTrail(x: number, z: number) {
    if (!this.trailSamples.length) {
      for (let i = 0; i <= 220; i++) {
        const p = this.curve.getPoint(i / 220);
        this.trailSamples.push(new THREE.Vector2(p.x, p.z));
      }
    }
    let best = Infinity;
    for (const s of this.trailSamples) {
      const d = (s.x - x) ** 2 + (s.y - z) ** 2;
      if (d < best) best = d;
    }
    return Math.sqrt(best);
  }

  /** Distance from a point to the camera→landmark sight line of each zone. */
  private blocksView(x: number, z: number) {
    for (const shot of this.shots) {
      const a = this.curve.getPoint(shot.u);
      const ax = a.x;
      const az = a.z;
      const bx = shot.focus.x;
      const bz = shot.focus.z;
      const dx = bx - ax;
      const dz = bz - az;
      const t = Math.min(Math.max(((x - ax) * dx + (z - az) * dz) / (dx * dx + dz * dz), 0), 1);
      if (Math.hypot(ax + dx * t - x, az + dz * t - z) < 5 + t * 5) return true;
    }
    return false;
  }

  private addWind(mat: THREE.MeshLambertMaterial) {
    mat.onBeforeCompile = (shader) => {
      shader.uniforms.uWind = this.windUniform;
      shader.vertexShader = shader.vertexShader
        .replace("#include <common>", "#include <common>\nuniform float uWind;")
        .replace(
          "#include <begin_vertex>",
          `#include <begin_vertex>
          #ifdef USE_INSTANCING
            vec3 iPos = vec3(instanceMatrix[3]);
            float sway = max(position.y - 1.2, 0.0) * 0.045;
            transformed.x += sin(uWind * 1.1 + iPos.x * 0.21 + iPos.z * 0.13) * sway;
            transformed.z += cos(uWind * 0.9 + iPos.z * 0.17) * sway * 0.6;
          #endif`,
        );
    };
  }

  private buildForest() {
    const rand = mulberry32(1337);
    const scale = this.opts.mobile ? 0.55 : 1;

    // Pine: three stacked cones on a trunk.
    const trunk = new THREE.CylinderGeometry(0.18, 0.3, 2, 5);
    trunk.translate(0, 1, 0);
    const tiers = [
      [1.9, 3.2, 3.0],
      [1.5, 2.8, 4.6],
      [1.05, 2.4, 6.1],
    ].map(([r, h, y]) => {
      const c = new THREE.ConeGeometry(r, h, 7);
      c.translate(0, y, 0);
      return c;
    });
    const pineFoliage = mergeGeometries(tiers)!;
    const roundFoliage = mergeGeometries([
      new THREE.IcosahedronGeometry(1.9, 0).translate(0, 4.3, 0),
      new THREE.IcosahedronGeometry(1.35, 0).translate(0.9, 5.4, 0.4),
      new THREE.IcosahedronGeometry(1.2, 0).translate(-0.8, 5.1, -0.5),
    ])!;
    const roundTrunk = new THREE.CylinderGeometry(0.2, 0.32, 3.4, 5).translate(0, 1.7, 0);

    const placements = (count: number, minR: number, maxR: number) => {
      const out: THREE.Matrix4[] = [];
      let guard = 0;
      while (out.length < count && guard++ < count * 25) {
        const a = rand() * Math.PI * 2;
        const r = minR + Math.sqrt(rand()) * (maxR - minR);
        const x = Math.cos(a) * r;
        const z = Math.sin(a) * r - 25;
        if (this.distToTrail(x, z) < 5.5) continue;
        if (Math.hypot(x - CAMPFIRE.x, z - CAMPFIRE.y) < 9) continue;
        if (Math.hypot(x - ELDER.x, z - ELDER.y) < 13) continue;
        if (Math.hypot(x - HOLLOW.x, z - HOLLOW.y) < 17) continue;
        if (Math.hypot(x - BEACON.x, z - BEACON.y) < 11) continue;
        if (this.blocksView(x, z)) continue;
        const s = 0.75 + rand() * 0.9 + (r > 120 ? 0.4 : 0);
        const m = new THREE.Matrix4().compose(
          new THREE.Vector3(x, terrain(x, z) - 0.2, z),
          new THREE.Quaternion().setFromEuler(new THREE.Euler((rand() - 0.5) * 0.08, rand() * Math.PI * 2, (rand() - 0.5) * 0.08)),
          new THREE.Vector3(s, s * (0.85 + rand() * 0.35), s),
        );
        out.push(m);
      }
      return out;
    };

    const addSpecies = (foliageGeo: THREE.BufferGeometry, trunkGeo: THREE.BufferGeometry, mats: THREE.Matrix4[]) => {
      const fMat = new THREE.MeshLambertMaterial({ flatShading: true });
      this.addWind(fMat);
      const bMat = new THREE.MeshLambertMaterial({ flatShading: true });
      const f = new THREE.InstancedMesh(foliageGeo, fMat, mats.length);
      const b = new THREE.InstancedMesh(trunkGeo, bMat, mats.length);
      const tone = new Float32Array(mats.length);
      const pick = new Uint8Array(mats.length);
      mats.forEach((m, i) => {
        f.setMatrixAt(i, m);
        b.setMatrixAt(i, m);
        tone[i] = 0.82 + rand() * 0.3;
        pick[i] = Math.floor(rand() * 6);
      });
      f.computeBoundingSphere();
      b.computeBoundingSphere();
      this.foliage.push({ mesh: f, tone, pick });
      this.barkMats.push(bMat);
      this.scene.add(f, b);
    };

    addSpecies(pineFoliage, trunk, placements(Math.round(1150 * scale), 6, 185));
    addSpecies(roundFoliage, roundTrunk, placements(Math.round(320 * scale), 6, 130));

    // Rocks.
    this.rockMat = new THREE.MeshLambertMaterial({ flatShading: true });
    const rockCount = Math.round(180 * scale);
    const rocks = new THREE.InstancedMesh(new THREE.DodecahedronGeometry(1, 0), this.rockMat, rockCount);
    for (let i = 0; i < rockCount; i++) {
      const a = rand() * Math.PI * 2;
      const r = 8 + Math.sqrt(rand()) * 150;
      const x = Math.cos(a) * r;
      const z = Math.sin(a) * r - 25;
      if (this.distToTrail(x, z) < 3.4) continue;
      const s = 0.3 + rand() * rand() * 2.2;
      rocks.setMatrixAt(
        i,
        new THREE.Matrix4().compose(
          new THREE.Vector3(x, terrain(x, z) + s * 0.25, z),
          new THREE.Quaternion().setFromEuler(new THREE.Euler(rand() * 3, rand() * 3, rand() * 3)),
          new THREE.Vector3(s * 1.3, s * 0.8, s),
        ),
      );
    }
    rocks.computeBoundingSphere();
    this.scene.add(rocks);

    // Distant ridgeline — fog turns it into soft silhouettes.
    this.mountainMat = new THREE.MeshLambertMaterial({ flatShading: true });
    const peaks: THREE.BufferGeometry[] = [];
    for (let i = 0; i < 34; i++) {
      const a = (i / 34) * Math.PI * 2 + rand() * 0.1;
      const r = 235 + rand() * 55;
      const h = 30 + rand() * 45;
      const c = new THREE.ConeGeometry(35 + rand() * 30, h, 6);
      c.translate(Math.cos(a) * r, h / 2 + 22, Math.sin(a) * r - 25);
      peaks.push(c);
    }
    this.scene.add(new THREE.Mesh(mergeGeometries(peaks)!, this.mountainMat));

    // Glowing mushrooms lining the trail.
    const mCount = Math.round(170 * scale);
    const capMat = new THREE.MeshBasicMaterial();
    this.glowMats.push({ mat: capMat, which: "b" });
    const capGeo = new THREE.SphereGeometry(0.3, 8, 4, 0, Math.PI * 2, 0, Math.PI / 2);
    capGeo.translate(0, 0.42, 0);
    const stemGeo = new THREE.CylinderGeometry(0.06, 0.09, 0.45, 5).translate(0, 0.22, 0);
    this.mushrooms = new THREE.InstancedMesh(mergeGeometries([capGeo, stemGeo])!, capMat, mCount);
    this.mushroomPick = new Uint8Array(mCount);
    const tangent = new THREE.Vector3();
    for (let i = 0; i < mCount; i++) {
      const u = rand();
      const c = this.curve.getPoint(u);
      this.curve.getTangent(u, tangent);
      const side = rand() < 0.5 ? -1 : 1;
      const off = 3.6 + rand() * 2.6;
      const x = c.x - tangent.z * off * side + (rand() - 0.5);
      const z = c.z + tangent.x * off * side + (rand() - 0.5);
      const s = 0.35 + rand() * 0.5;
      this.mushrooms.setMatrixAt(
        i,
        new THREE.Matrix4().compose(
          new THREE.Vector3(x, terrain(x, z) - 0.05, z),
          new THREE.Quaternion().setFromEuler(new THREE.Euler((rand() - 0.5) * 0.4, 0, (rand() - 0.5) * 0.4)),
          new THREE.Vector3(s, s, s),
        ),
      );
      this.mushroomPick[i] = rand() < 0.5 ? 0 : 1;
    }
    this.mushrooms.computeBoundingSphere();
    this.scene.add(this.mushrooms);
  }

  private flameMaterial(inner: boolean) {
    return new THREE.ShaderMaterial({
      transparent: true,
      depthWrite: false,
      blending: THREE.AdditiveBlending,
      uniforms: {
        uTime: { value: 0 },
        uA: { value: new THREE.Color() },
        uB: { value: new THREE.Color() },
        uStrength: { value: inner ? 1.1 : 0.7 },
      },
      vertexShader: /* glsl */ `
        uniform float uTime;
        varying vec2 vUv;
        void main() {
          vUv = uv;
          vec3 p = position;
          float k = uv.y;
          p.x += sin(uTime * 7.0 + p.y * 3.0) * 0.12 * k;
          p.z += cos(uTime * 6.0 + p.y * 2.5) * 0.1 * k;
          p.y *= 1.0 + sin(uTime * 9.0) * 0.06;
          gl_Position = projectionMatrix * modelViewMatrix * vec4(p, 1.0);
        }`,
      fragmentShader: /* glsl */ `
        uniform vec3 uA, uB;
        uniform float uStrength;
        varying vec2 vUv;
        void main() {
          float a = (1.0 - vUv.y) * uStrength;
          gl_FragColor = vec4(mix(uA, uB, vUv.y) * a, a);
          ${OUT}
        }`,
    });
  }

  private buildCamp() {
    const y = terrain(CAMPFIRE.x, CAMPFIRE.y);
    const stones = new THREE.InstancedMesh(new THREE.DodecahedronGeometry(0.42, 0), this.rockMat, 9);
    for (let i = 0; i < 9; i++) {
      const a = (i / 9) * Math.PI * 2;
      stones.setMatrixAt(
        i,
        new THREE.Matrix4().compose(
          new THREE.Vector3(CAMPFIRE.x + Math.cos(a) * 1.35, y + 0.15, CAMPFIRE.y + Math.sin(a) * 1.35),
          new THREE.Quaternion().setFromEuler(new THREE.Euler(a, a * 2, 0)),
          new THREE.Vector3(1, 0.7, 1),
        ),
      );
    }
    this.scene.add(stones);

    for (const [r, h, inner] of [
      [0.85, 2.6, false],
      [0.55, 1.9, true],
    ] as const) {
      const geo = new THREE.ConeGeometry(r, h, 10, 6, true);
      geo.translate(0, h / 2 + 0.1, 0);
      const flame = new THREE.Mesh(geo, this.flameMaterial(inner));
      flame.position.set(CAMPFIRE.x, y, CAMPFIRE.y);
      this.flames.push(flame);
      this.scene.add(flame);
    }

    this.fireLight = new THREE.PointLight(0xffffff, 55, 34, 2);
    this.fireLight.position.set(CAMPFIRE.x, y + 1.6, CAMPFIRE.y);
    this.scene.add(this.fireLight);

    // Rising embers.
    const count = 60;
    const pos = new Float32Array(count * 3);
    const seed = new Float32Array(count);
    const rand = mulberry32(99);
    for (let i = 0; i < count; i++) {
      pos.set([CAMPFIRE.x + (rand() - 0.5) * 1.2, y + 0.4, CAMPFIRE.y + (rand() - 0.5) * 1.2], i * 3);
      seed[i] = rand();
    }
    const geo = new THREE.BufferGeometry();
    geo.setAttribute("position", new THREE.BufferAttribute(pos, 3));
    geo.setAttribute("aSeed", new THREE.BufferAttribute(seed, 1));
    this.embers = new THREE.Points(
      geo,
      new THREE.ShaderMaterial({
        transparent: true,
        depthWrite: false,
        blending: THREE.AdditiveBlending,
        uniforms: { uTime: { value: 0 }, uColor: { value: new THREE.Color() }, uPR: { value: this.pixelRatio } },
        vertexShader: /* glsl */ `
          uniform float uTime, uPR;
          attribute float aSeed;
          varying float vLife;
          void main() {
            float life = fract(uTime * (0.18 + aSeed * 0.2) + aSeed);
            vec3 p = position;
            p.y += life * 7.0;
            p.x += sin(life * 9.0 + aSeed * 20.0) * life * 1.2;
            p.z += cos(life * 7.0 + aSeed * 13.0) * life * 1.2;
            vLife = life;
            vec4 mv = modelViewMatrix * vec4(p, 1.0);
            gl_Position = projectionMatrix * mv;
            gl_PointSize = (1.0 - life) * 7.0 * uPR * (20.0 / -mv.z);
          }`,
        fragmentShader: /* glsl */ `
          uniform vec3 uColor;
          varying float vLife;
          void main() {
            float d = length(gl_PointCoord - 0.5);
            float a = smoothstep(0.5, 0.0, d) * (1.0 - vLife);
            gl_FragColor = vec4(uColor * a, a);
            ${OUT}
          }`,
      }),
    );
    this.embers.frustumCulled = false;
    this.scene.add(this.embers);
  }

  private buildGrove() {
    const base = terrain(ELDER.x, ELDER.y);
    const bark = new THREE.MeshLambertMaterial({ flatShading: true });
    this.barkMats.push(bark);

    const trunkGeo = new THREE.CylinderGeometry(1.9, 3.6, 24, 9, 8);
    const p = trunkGeo.attributes.position as THREE.BufferAttribute;
    for (let i = 0; i < p.count; i++) {
      const y = p.getY(i);
      const twist = (y + 12) * 0.05;
      const x = p.getX(i);
      const z = p.getZ(i);
      const bulge = 1 + (noise(x * 2 + y * 0.4, z * 2) - 0.5) * 0.35;
      p.setXYZ(i, (x * Math.cos(twist) - z * Math.sin(twist)) * bulge, y, (x * Math.sin(twist) + z * Math.cos(twist)) * bulge);
    }
    trunkGeo.translate(0, 12, 0);
    trunkGeo.computeVertexNormals();
    const roots = [0, 1, 2, 3, 4, 5].map((i) => {
      const r = new THREE.ConeGeometry(0.9, 7, 5);
      r.rotateZ(Math.PI / 2.6);
      r.translate(2.6, 0.9, 0);
      r.rotateY((i / 6) * Math.PI * 2 + 0.3);
      return r;
    });
    const tree = new THREE.Mesh(mergeGeometries([trunkGeo.toNonIndexed(), ...roots.map((r) => r.toNonIndexed())])!, bark);
    tree.position.set(ELDER.x, base - 0.4, ELDER.y);
    this.scene.add(tree);

    const canopyMat = new THREE.MeshLambertMaterial({ flatShading: true });
    const canopyParts = [
      [0, 25, 0, 8.5],
      [6, 22, 3, 6.5],
      [-6, 23, -2, 6.8],
      [2, 21, -6, 6],
      [-3, 20, 6, 6.2],
      [4, 29, -1, 5.5],
      [-4, 28, 2, 5],
    ].map(([x, y, z, r]) => new THREE.IcosahedronGeometry(r, 1).translate(x, y, z));
    const canopy = new THREE.Mesh(mergeGeometries(canopyParts)!, canopyMat);
    canopy.position.copy(tree.position);
    this.canopyMat = canopyMat;
    this.scene.add(canopy);

    // Spirit lanterns drifting beneath the canopy.
    const count = 26;
    const lanternMat = new THREE.MeshBasicMaterial();
    this.glowMats.push({ mat: lanternMat, which: "a" });
    this.lanterns = new THREE.InstancedMesh(new THREE.IcosahedronGeometry(0.17, 1), lanternMat, count);
    const rand = mulberry32(21);
    for (let i = 0; i < count; i++) {
      const a = rand() * Math.PI * 2;
      const r = 4 + rand() * 7;
      this.lanternBase.push(new THREE.Vector3(ELDER.x + Math.cos(a) * r, base + 3 + rand() * 13, ELDER.y + Math.sin(a) * r));
    }
    this.lanterns.frustumCulled = false;
    this.scene.add(this.lanterns);

    // Rune rings circling the roots.
    const ringMat = new THREE.MeshBasicMaterial({ transparent: true, opacity: 0.85 });
    this.glowMats.push({ mat: ringMat, which: "b" });
    for (const [r, y, tilt] of [
      [6.2, 1.2, 0],
      [7.4, 3.4, 0.12],
    ]) {
      const ring = new THREE.Mesh(new THREE.TorusGeometry(r, 0.06, 6, 96), ringMat);
      ring.rotation.x = Math.PI / 2 + tilt;
      ring.position.set(ELDER.x, base + y, ELDER.y);
      this.runeRings.push(ring);
      this.scene.add(ring);
    }
  }

  private buildHollow() {
    const base = terrain(HOLLOW.x, HOLLOW.y);
    const count = Math.max(this.opts.projectCount, 1);
    const stoneGeo = new THREE.CylinderGeometry(0.9, 1.15, 1.2, 6);
    const stones = new THREE.InstancedMesh(stoneGeo, this.rockMat, count);
    const crystalGeo = new THREE.OctahedronGeometry(0.75, 0);
    for (let i = 0; i < count; i++) {
      const a = (i / count) * Math.PI * 2 + Math.PI * 0.62;
      const r = 10.5;
      const x = HOLLOW.x + Math.cos(a) * r;
      const z = HOLLOW.y + Math.sin(a) * r;
      const y = terrain(x, z);
      stones.setMatrixAt(i, new THREE.Matrix4().makeTranslation(x, y + 0.4, z));
      const mat = new THREE.MeshLambertMaterial({ flatShading: true, emissiveIntensity: 0.9 });
      const mesh = new THREE.Mesh(crystalGeo, mat);
      const b = new THREE.Vector3(x, y + 2.6, z);
      mesh.position.copy(b);
      mesh.scale.set(0.8, 1.9, 0.8);
      this.crystals.push({ mesh, base: b, level: 0 });
      this.scene.add(mesh);
    }
    stones.computeBoundingSphere();
    this.scene.add(stones);

    // The heart of the hollow: a slow-turning crystal cluster.
    this.heart = new THREE.Group();
    const heartMat = new THREE.MeshLambertMaterial({ flatShading: true, emissiveIntensity: 1.2 });
    for (const [s, x, z, rz] of [
      [2.4, 0, 0, 0],
      [1.4, 1.5, 0.6, -0.35],
      [1.2, -1.3, -0.5, 0.4],
    ]) {
      const c = new THREE.Mesh(new THREE.OctahedronGeometry(1, 0), heartMat);
      c.scale.set(s * 0.6, s * 1.5, s * 0.6);
      c.position.set(x, s * 0.9, z);
      c.rotation.z = rz;
      this.heart.add(c);
    }
    this.heart.position.set(HOLLOW.x, base + 1.2, HOLLOW.y);
    this.scene.add(this.heart);

    this.hollowRing = new THREE.Mesh(
      new THREE.RingGeometry(9.5, 12, 96, 1),
      new THREE.ShaderMaterial({
        transparent: true,
        depthWrite: false,
        blending: THREE.AdditiveBlending,
        uniforms: { uColor: { value: new THREE.Color() }, uTime: { value: 0 }, uStrength: { value: 1 } },
        vertexShader: /* glsl */ `
          varying vec2 vUv; varying vec3 vPos;
          void main() { vUv = uv; vPos = position; gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0); }`,
        fragmentShader: /* glsl */ `
          uniform vec3 uColor; uniform float uTime, uStrength;
          varying vec3 vPos;
          void main() {
            float r = length(vPos.xy);
            float band = smoothstep(9.5, 10.75, r) * (1.0 - smoothstep(10.75, 12.0, r));
            float ang = atan(vPos.y, vPos.x);
            float runes = 0.55 + 0.45 * step(0.5, fract(ang * 9.0 + uTime * 0.05));
            float a = band * runes * 0.35 * uStrength;
            gl_FragColor = vec4(uColor * a, a);
            ${OUT}
          }`,
      }),
    );
    this.hollowRing.rotation.x = -Math.PI / 2;
    this.hollowRing.position.set(HOLLOW.x, base + 0.35, HOLLOW.y);
    this.scene.add(this.hollowRing);
  }

  private buildBeacon() {
    const base = terrain(BEACON.x, BEACON.y);
    const stoneMat = this.rockMat;
    const parts = [
      new THREE.CylinderGeometry(2.4, 3.2, 3, 7).translate(0, 1.5, 0),
      new THREE.CylinderGeometry(1.7, 2.2, 8, 7).translate(0, 7, 0),
      new THREE.CylinderGeometry(2.4, 1.7, 1.4, 7).translate(0, 11.7, 0),
    ];
    const tower = new THREE.Mesh(mergeGeometries(parts)!, stoneMat);
    tower.position.set(BEACON.x, base - 0.5, BEACON.y);
    this.scene.add(tower);

    const orbMat = new THREE.MeshBasicMaterial();
    this.glowMats.push({ mat: orbMat, which: "a" });
    this.beaconOrb = new THREE.Mesh(new THREE.IcosahedronGeometry(1.1, 2), orbMat);
    this.beaconOrb.position.set(BEACON.x, base + 13.6, BEACON.y);
    this.scene.add(this.beaconOrb);

    this.beaconLight = new THREE.PointLight(0xffffff, 120, 60, 2);
    this.beaconLight.position.copy(this.beaconOrb.position);
    this.scene.add(this.beaconLight);

    const beamGeo = new THREE.CylinderGeometry(0.9, 1.3, 220, 16, 1, true);
    beamGeo.translate(0, 110, 0);
    this.beam = new THREE.Mesh(
      beamGeo,
      new THREE.ShaderMaterial({
        transparent: true,
        depthWrite: false,
        fog: false,
        side: THREE.DoubleSide,
        blending: THREE.AdditiveBlending,
        uniforms: { uColor: { value: new THREE.Color() }, uTime: { value: 0 }, uStrength: { value: 1 } },
        vertexShader: /* glsl */ `
          varying vec2 vUv; varying vec3 vN; varying vec3 vView;
          void main() {
            vUv = uv;
            vec4 mv = modelViewMatrix * vec4(position, 1.0);
            vN = normalize(normalMatrix * normal);
            vView = normalize(-mv.xyz);
            gl_Position = projectionMatrix * mv;
          }`,
        fragmentShader: /* glsl */ `
          uniform vec3 uColor; uniform float uTime, uStrength;
          varying vec2 vUv; varying vec3 vN; varying vec3 vView;
          void main() {
            float edge = pow(abs(dot(vN, vView)), 2.0);
            float fade = pow(1.0 - vUv.y, 1.6);
            float pulse = 0.8 + 0.2 * sin(uTime * 1.6 - vUv.y * 30.0);
            float a = edge * fade * pulse * 0.6 * uStrength;
            gl_FragColor = vec4(uColor * a, a);
            ${OUT}
          }`,
      }),
    );
    this.beam.position.copy(this.beaconOrb.position);
    this.beam.frustumCulled = false;
    this.scene.add(this.beam);

    this.shock = new THREE.Mesh(
      new THREE.RingGeometry(0.9, 1, 96, 1),
      new THREE.ShaderMaterial({
        transparent: true,
        depthWrite: false,
        side: THREE.DoubleSide,
        blending: THREE.AdditiveBlending,
        uniforms: { uColor: { value: new THREE.Color() }, uAlpha: { value: 0 } },
        vertexShader: `void main(){ gl_Position = projectionMatrix * modelViewMatrix * vec4(position,1.0); }`,
        fragmentShader: `uniform vec3 uColor; uniform float uAlpha; void main(){ gl_FragColor = vec4(uColor*uAlpha, uAlpha); ${OUT} }`,
      }),
    );
    this.shock.rotation.x = -Math.PI / 2;
    this.shock.position.copy(this.beaconOrb.position);
    this.shock.visible = false;
    this.scene.add(this.shock);
  }

  private buildFireflies() {
    const rand = mulberry32(4242);
    const count = this.opts.mobile ? 260 : 560;
    const pos = new Float32Array(count * 3);
    const phase = new Float32Array(count);
    const speed = new Float32Array(count);
    const mix = new Float32Array(count);
    for (let i = 0; i < count; i++) {
      let x: number;
      let z: number;
      if (i % 3 !== 0) {
        // Most fireflies gather around the trail and the landmarks.
        const c = this.curve.getPoint(rand());
        x = c.x + (rand() - 0.5) * 26;
        z = c.z + (rand() - 0.5) * 26;
      } else {
        const a = rand() * Math.PI * 2;
        const r = Math.sqrt(rand()) * 130;
        x = Math.cos(a) * r;
        z = Math.sin(a) * r - 25;
      }
      pos.set([x, terrain(x, z) + 0.8 + rand() * 5.5, z], i * 3);
      phase[i] = rand() * 100;
      speed[i] = 0.35 + rand() * 0.6;
      mix[i] = rand() < 0.68 ? 0 : 1;
    }
    const geo = new THREE.BufferGeometry();
    geo.setAttribute("position", new THREE.BufferAttribute(pos, 3));
    geo.setAttribute("aPhase", new THREE.BufferAttribute(phase, 1));
    geo.setAttribute("aSpeed", new THREE.BufferAttribute(speed, 1));
    geo.setAttribute("aMix", new THREE.BufferAttribute(mix, 1));
    this.fireflies = new THREE.Points(
      geo,
      new THREE.ShaderMaterial({
        transparent: true,
        depthWrite: false,
        blending: THREE.AdditiveBlending,
        uniforms: {
          uTime: { value: 0 },
          uPR: { value: this.pixelRatio },
          uA: { value: new THREE.Color() },
          uB: { value: new THREE.Color() },
          uOpacity: { value: 1 },
        },
        vertexShader: /* glsl */ `
          uniform float uTime, uPR;
          attribute float aPhase, aSpeed, aMix;
          varying float vAlpha, vMix;
          void main() {
            vec3 p = position;
            float t = uTime * aSpeed + aPhase;
            p.x += sin(t * 0.7) * 1.6 + sin(t * 1.9) * 0.3;
            p.y += sin(t * 0.9 + aPhase) * 0.9;
            p.z += cos(t * 0.6) * 1.6;
            vec4 mv = modelViewMatrix * vec4(p, 1.0);
            gl_Position = projectionMatrix * mv;
            float blink = 0.5 + 0.5 * sin(t * 2.2 + aPhase * 3.0);
            vAlpha = smoothstep(0.1, 1.0, blink) * (1.0 - smoothstep(70.0, 150.0, -mv.z));
            vMix = aMix;
            gl_PointSize = clamp(9.0 * uPR * (0.55 + 0.45 * blink) * (24.0 / -mv.z), 1.0, 48.0);
          }`,
        fragmentShader: /* glsl */ `
          uniform vec3 uA, uB;
          uniform float uOpacity;
          varying float vAlpha, vMix;
          void main() {
            float d = length(gl_PointCoord - 0.5);
            float core = smoothstep(0.16, 0.0, d);
            float halo = smoothstep(0.5, 0.0, d) * 0.32;
            float a = (core + halo) * vAlpha * uOpacity;
            gl_FragColor = vec4(mix(uA, uB, vMix) * a, a);
            ${OUT}
          }`,
      }),
    );
    this.fireflies.frustumCulled = false;
    this.scene.add(this.fireflies);
  }

  private buildRays() {
    const spots: [number, number, number][] = [
      [CAMPFIRE.x - 6, CAMPFIRE.y - 10, 1],
      [ELDER.x + 6, ELDER.y + 4, 1.4],
      [ELDER.x - 4, ELDER.y - 8, 1.1],
      [HOLLOW.x, HOLLOW.y, 1.6],
      [-14, 20, 0.9],
      [10, -12, 1],
      [6, -70, 1.1],
    ];
    const geo = new THREE.CylinderGeometry(1.2, 6.5, 46, 14, 1, true);
    geo.translate(0, -23, 0);
    for (const [x, z, s] of spots) {
      const mat = new THREE.ShaderMaterial({
        transparent: true,
        depthWrite: false,
        side: THREE.DoubleSide,
        blending: THREE.AdditiveBlending,
        uniforms: { uColor: { value: new THREE.Color() }, uTime: { value: 0 }, uStrength: { value: 0.5 }, uSeed: { value: x * 0.13 + z * 0.07 } },
        vertexShader: /* glsl */ `
          varying vec2 vUv; varying vec3 vN; varying vec3 vView; varying float vDist;
          void main() {
            vUv = uv;
            vec4 mv = modelViewMatrix * vec4(position, 1.0);
            vN = normalize(normalMatrix * normal);
            vView = normalize(-mv.xyz);
            vDist = -mv.z;
            gl_Position = projectionMatrix * mv;
          }`,
        fragmentShader: /* glsl */ `
          uniform vec3 uColor; uniform float uTime, uStrength, uSeed;
          varying vec2 vUv; varying vec3 vN; varying vec3 vView; varying float vDist;
          void main() {
            float edge = pow(abs(dot(vN, vView)), 3.0);
            float v = smoothstep(0.0, 0.55, vUv.y) * (1.0 - smoothstep(0.85, 1.0, vUv.y));
            float shimmer = 0.75 + 0.25 * sin(uTime * 0.6 + uSeed + vUv.x * 12.0);
            float near = smoothstep(4.0, 14.0, vDist) * (1.0 - smoothstep(90.0, 160.0, vDist));
            float a = edge * v * shimmer * near * 0.16 * uStrength;
            gl_FragColor = vec4(uColor * a, a);
            ${OUT}
          }`,
      });
      const ray = new THREE.Mesh(geo, mat);
      ray.position.set(x, terrain(x, z) + 44 * s, z);
      ray.scale.set(s, s, s);
      ray.rotation.set(0.22, 0, -0.28);
      this.rays.push(ray);
      this.scene.add(ray);
    }
  }

  private applyPalette() {
    const P = this.palette;
    const c = (hex: string) => new THREE.Color(hex);
    this.fog.color.set(P.fog);
    this.fog.density = P.fogDensity;
    this.renderer.setClearColor(P.fog);
    this.hemi.color.set(P.hemiSky);
    this.hemi.groundColor.set(P.hemiGround);
    this.hemi.intensity = P.hemiIntensity;
    this.sun.color.set(P.sun);
    this.sun.intensity = P.sunIntensity;

    const su = this.sky.material.uniforms;
    su.uTop.value.set(P.skyTop);
    su.uHorizon.value.set(P.skyHorizon);
    su.uGlow.value.set(P.skyGlow);
    su.uMoon.value.set(P.moon);
    su.uAuroraA.value.set(P.auroraA);
    su.uAuroraB.value.set(P.auroraB);
    su.uAurora.value = P.aurora;
    this.stars.material.opacity = P.stars;
    this.stars.visible = P.stars > 0;

    // Ground: blend the two moss tones by the stored noise factor.
    const g = this.ground.geometry;
    const mixT = g.getAttribute("mixT") as THREE.BufferAttribute;
    const col = g.getAttribute("color") as THREE.BufferAttribute;
    const g0 = c(P.ground[0]);
    const g1 = c(P.ground[1]);
    const tmp = new THREE.Color();
    for (let i = 0; i < col.count; i++) {
      tmp.copy(g0).lerp(g1, smoothstep(0.3, 0.7, mixT.getX(i)));
      col.setXYZ(i, tmp.r, tmp.g, tmp.b);
    }
    col.needsUpdate = true;
    this.pathMat.color.set(P.path);

    const leaves = P.foliage.map(c);
    for (const { mesh, tone, pick } of this.foliage) {
      for (let i = 0; i < mesh.count; i++) {
        mesh.setColorAt(i, tmp.copy(leaves[pick[i] % leaves.length]).multiplyScalar(tone[i]));
      }
      if (mesh.instanceColor) mesh.instanceColor.needsUpdate = true;
    }
    this.canopyMat.color.copy(leaves[3]).lerp(leaves[4], 0.35);
    this.barkMats.forEach((m) => m.color.set(P.bark));
    this.rockMat.color.set(P.rock);
    this.mountainMat.color.set(P.mountain);

    const A = c(P.glowA);
    const B = c(P.glowB);
    for (const { mat, which } of this.glowMats) mat.color.copy(which === "a" ? A : B);
    for (let i = 0; i < this.mushrooms.count; i++) {
      this.mushrooms.setColorAt(i, this.mushroomPick[i] ? A : B);
    }
    if (this.mushrooms.instanceColor) this.mushrooms.instanceColor.needsUpdate = true;

    const ff = this.fireflies.material.uniforms;
    ff.uA.value.copy(A);
    ff.uB.value.copy(B);
    ff.uOpacity.value = P.glowOpacity;
    this.embers.material.uniforms.uColor.value.copy(A);
    for (const f of this.flames) {
      f.material.uniforms.uA.value.copy(A);
      f.material.uniforms.uB.value.copy(B);
    }
    this.fireLight.color.copy(A);
    this.beaconLight.color.copy(A);
    this.beam.material.uniforms.uColor.value.copy(A);
    this.shock.material.uniforms.uColor.value.copy(A);
    this.hollowRing.material.uniforms.uColor.value.copy(B);
    for (const r of this.rays) {
      r.material.uniforms.uColor.value.set(P.skyGlow);
      r.material.uniforms.uStrength.value = P.rays;
    }
    this.crystals.forEach(({ mesh }, i) => {
      const glow = i % 2 ? B : A;
      mesh.material.color.copy(glow).multiplyScalar(0.5);
      mesh.material.emissive.copy(glow);
    });
    this.heart.children.forEach((child) => {
      const m = (child as THREE.Mesh).material as THREE.MeshLambertMaterial;
      m.color.copy(B).multiplyScalar(0.5);
      m.emissive.copy(B);
    });
  }

  /* ───────────────────────────── per frame ───────────────────────────── */

  private tmpA = new THREE.Vector3();
  private tmpB = new THREE.Vector3();
  private tmpC = new THREE.Vector3();
  private look = new THREE.Vector3();
  private mat4 = new THREE.Matrix4();

  /** Camera position and look target for a point along the trail. */
  private trailPose(u: number, pos: THREE.Vector3, look: THREE.Vector3) {
    const p = this.curve.getPoint(Math.min(Math.max(u, 0), 1));
    let weight = 0;
    let height = 0;
    const focus = this.tmpC.set(0, 0, 0);
    for (const shot of this.shots) {
      const w = 1 - smoothstep(0, 0.085, Math.abs(u - shot.u));
      weight += w;
      height += w * shot.height;
      focus.addScaledVector(shot.focus, w);
    }
    const h = weight > 0 ? height / weight : 2.6;
    const blend = Math.min(weight, 1);
    pos.set(p.x, terrain(p.x, p.z) + 2.6 + (h - 2.6) * blend, p.z);

    const dir = u < 0.97 ? 1 : -1;
    const ahead = this.curve.getPoint(Math.min(Math.max(u + 0.035 * dir, 0), 1));
    if (dir < 0) ahead.sub(p).negate().add(p);
    ahead.y = terrain(ahead.x, ahead.z) + 2.4;
    if (weight > 0) focus.divideScalar(weight);
    look.copy(ahead).lerp(focus, blend);
  }

  private aerialPose(angle: number, pos: THREE.Vector3, look: THREE.Vector3) {
    pos.set(Math.sin(angle) * 105, 52, Math.cos(angle) * 105 - 25);
    look.set(0, 2, -30);
  }

  private loop = (now: number) => {
    if (this.disposed) return;
    if (this.minFrameGap && now - this.lastFrame < this.minFrameGap) return;
    const gap = this.lastFrame ? now - this.lastFrame : 16;
    this.lastFrame = now;
    const rawDt = Math.min(this.clock.getDelta(), 0.1);
    const dt = this.opts.reducedMotion ? rawDt * 0.3 : rawDt;
    this.time += dt;
    const t = this.time;

    /* camera */
    if (this.travel < 1) {
      this.travel = Math.min(this.travel + rawDt / this.travelDur, 1);
      this.u = this.uFrom + (this.uTo - this.uFrom) * easeInOutCubic(this.travel);
    }
    const pos = this.tmpA;
    const look = this.look;
    if (this.aerial) {
      this.aerialPose(t * 0.035, pos, look);
    } else {
      this.trailPose(this.u, pos, look);
      // Reading the page walks you a few steps toward the landmark.
      this.scrollSmooth += (this.scroll - this.scrollSmooth) * Math.min(rawDt * 4, 1);
      const fwd = this.tmpB.copy(look).sub(pos).normalize();
      pos.addScaledVector(fwd, this.scrollSmooth * 6);
      pos.y += this.scrollSmooth * 1.5;
      if (this.intro.active) {
        this.intro.t += rawDt;
        const k = easeInOutCubic(Math.min(this.intro.t / this.intro.dur, 1));
        const ap = this.tmpB;
        const al = this.tmpC;
        this.aerialPose(this.intro.angle, ap, al);
        pos.lerpVectors(ap, pos, k);
        look.lerpVectors(al, look, k);
        if (k >= 1) this.intro.active = false;
      }
    }
    if (!this.opts.reducedMotion) {
      this.pointerSmooth.lerp(this.pointer, Math.min(rawDt * 2.5, 1));
      pos.y += Math.sin(t * 0.8) * 0.06;
    }
    this.camera.position.copy(pos);
    this.camera.lookAt(look);
    if (!this.opts.reducedMotion) {
      this.camera.rotateY(-this.pointerSmooth.x * 0.06);
      this.camera.rotateX(-this.pointerSmooth.y * 0.035);
    }
    this.sky.position.copy(pos);
    this.stars.position.copy(pos);
    // Thin the fog when high up so the aerial view reads as a forest.
    this.fog.density = this.palette.fogDensity * (1 - smoothstep(8, 48, pos.y) * 0.62);

    /* life */
    this.windUniform.value = t;
    this.sky.material.uniforms.uTime.value = t;
    this.fireflies.material.uniforms.uTime.value = t;
    this.embers.material.uniforms.uTime.value = t;
    for (const f of this.flames) f.material.uniforms.uTime.value = t;
    this.fireLight.intensity = 55 * (0.85 + Math.sin(t * 11) * 0.08 + Math.sin(t * 7.3) * 0.07);
    for (const r of this.rays) r.material.uniforms.uTime.value = t;
    this.hollowRing.material.uniforms.uTime.value = t;
    this.runeRings.forEach((ring, i) => (ring.rotation.z = t * (i ? -0.12 : 0.18)));

    this.lanternBase.forEach((b, i) => {
      this.mat4.makeTranslation(b.x + Math.sin(t * 0.4 + i) * 0.6, b.y + Math.sin(t * 0.7 + i * 1.7) * 0.5, b.z + Math.cos(t * 0.35 + i) * 0.6);
      this.lanterns.setMatrixAt(i, this.mat4);
    });
    this.lanterns.instanceMatrix.needsUpdate = true;

    this.heart.rotation.y = t * 0.25;
    this.heart.position.y = terrain(HOLLOW.x, HOLLOW.y) + 1.2 + Math.sin(t * 0.8) * 0.25;
    const anyFocus = this.focusIndex >= 0;
    this.crystals.forEach((c, i) => {
      const target = !anyFocus ? 0.45 : i === this.focusIndex ? 1 : 0;
      c.level += (target - c.level) * Math.min(rawDt * 3, 1);
      const s = 0.6 + c.level * 0.45;
      c.mesh.scale.set(s * 0.8, s * 1.9, s * 0.8);
      c.mesh.position.set(c.base.x, c.base.y + Math.sin(t * 1.1 + i) * 0.22 + c.level * 0.9, c.base.z);
      c.mesh.rotation.y = t * (0.4 + c.level * 1.2) + i;
      c.mesh.material.emissiveIntensity = 0.35 + c.level * 1.6;
    });

    // Beacon: a steady pulse, and a flare when someone sends a message.
    this.flareT += rawDt;
    const flare = Math.max(0, 1 - this.flareT / 3.2);
    const f2 = flare * flare;
    this.beam.material.uniforms.uTime.value = t;
    this.beam.material.uniforms.uStrength.value = 1 + f2 * 3;
    this.beam.scale.set(1 + f2 * 2.5, 1, 1 + f2 * 2.5);
    this.beaconOrb.scale.setScalar(1 + Math.sin(t * 1.6) * 0.06 + f2 * 1.2);
    this.beaconLight.intensity = 120 * (0.9 + Math.sin(t * 1.6) * 0.1) + f2 * 600;
    this.shock.visible = this.flareT < 2.4;
    if (this.shock.visible) {
      const k = this.flareT / 2.4;
      this.shock.scale.setScalar(1 + k * 70);
      this.shock.material.uniforms.uAlpha.value = (1 - k) * 0.9;
    }

    this.renderer.render(this.scene, this.camera);

    if (this.onFirstFrame) {
      this.onFirstFrame();
      this.onFirstFrame = undefined;
    }
    this.adapt(gap);
  };

  /** Drop the render resolution if the device is struggling. */
  private adapt(gap: number) {
    this.frameTimes.push(gap);
    if (this.frameTimes.length < 90) return;
    const avg = this.frameTimes.reduce((a, b) => a + b, 0) / this.frameTimes.length;
    this.frameTimes.length = 0;
    const budget = this.minFrameGap ? this.minFrameGap * 1.35 : 24;
    if (avg > budget && this.pixelRatio > 0.6) {
      this.pixelRatio = Math.max(this.pixelRatio - 0.25, 0.6);
      this.renderer.setPixelRatio(this.pixelRatio);
      this.fireflies.material.uniforms.uPR.value = this.pixelRatio;
      this.embers.material.uniforms.uPR.value = this.pixelRatio;
      this.resize();
    }
  }
}
