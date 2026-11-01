"use client";

import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useTheme } from "next-themes";
import { buildLayout, lineById, stopById, stops, type LineId } from "@/data/network";
import type { NetworkLayout } from "@/lib/network-layout";
import { placeLabels, type LabelFrame, type LabelItem } from "@/lib/network-labels";
import { useNetwork } from "@/lib/network-store";
import FlatMap, { FLAT_PADDING } from "./FlatMap";
import type { NetworkWorld, WorldTheme, WorldView, Projected } from "./NetworkWorld";

const majorIds = stops.filter((s) => s.major).map((s) => s.id);
const hollowIds = stops.filter((s) => s.hollow).map((s) => s.id);

const THEMES: Record<"light" | "dark", WorldTheme> = {
  light: {
    lines: { M: "#8b2fc9", F: "#f5b400", J: "#007f4e", C: "#14171a", T: "#1447d6", R: "#d6330f", A: "#c81f75" },
    plate: "#c4c6c0",
    plateSheen: 1,
    zone: "#b4b7ad",
    station: "#ffffff",
    ring: "#14171a",
    hollowRing: "#14171a",
    drained: "#cdd0c8",
    train: "#14171a",
    trainOnCareer: "#ffffff",
  },
  dark: {
    lines: { M: "#b56bff", F: "#ffc21a", J: "#19c37d", C: "#f1f2ee", T: "#4d7cff", R: "#ff5a33", A: "#ff4fa3" },
    plate: "#0d1115",
    plateSheen: 0.1,
    zone: "#171c22",
    station: "#ffffff",
    ring: "#050608",
    hollowRing: "#f1f2ee",
    drained: "#2a3038",
    train: "#f1f2ee",
    trainOnCareer: "#0b0e11",
  },
};

/* Phones have room for the headline stops; the rest are in the work list. */
const NARROW_LABELS = new Set(["pmo", "psycloud", "spendsplit", "astryn", "next-stop"]);
/* Short enough to sit on the map at all times; other details wait for focus. */
const PROOF = new Set(["pmo", "psycloud"]);

const viewFor = (pathname: string, width: number): WorldView => {
  if (pathname === "/projects" && width >= 1024) return { kind: "column" };
  if (pathname.startsWith("/projects/")) return { kind: "stop", id: pathname.split("/")[2] };
  if (pathname === "/profile") return { kind: "line", id: "C" };
  if (pathname === "/contact") return { kind: "stop", id: "next-stop" };
  return { kind: "overview" };
};

/* The map behind every page. A flat SVG paints immediately; the 3D model loads
   in idle time and rises out of it. Station labels are real links positioned
   over whichever of the two is showing. */
/* Moves a name clear of the tracks; the leader line runs back to its station. */
const leaderVars = (shift: { x: number; y: number } | undefined, pxPerUnit: number) => {
  if (!shift) return undefined;
  const x = shift.x * pxPerUnit;
  const y = shift.y * pxPerUnit;
  return {
    "--sx": `${x}px`,
    "--sy": `${y}px`,
    "--lead": `${Math.hypot(x, y)}px`,
    "--lead-angle": `${Math.atan2(y, x)}rad`,
  } as React.CSSProperties;
};

export default function NetworkStage() {
  const pathname = usePathname();
  const { resolvedTheme } = useTheme();
  const theme: "light" | "dark" = resolvedTheme === "dark" ? "dark" : "light";

  const booted = useNetwork((s) => s.booted);
  const mode = useNetwork((s) => s.mode);
  const status = useNetwork((s) => s.status);
  const activeLine = useNetwork((s) => s.activeLine);
  const focusId = useNetwork((s) => s.focusId);
  const insets = useNetwork((s) => s.insets);
  const dispatchKey = useNetwork((s) => s.dispatchKey);
  const boot = useNetwork((s) => s.boot);
  const setStatus = useNetwork((s) => s.setStatus);

  const [orientation, setOrientation] = useState<"wide" | "tall">("wide");
  const [size, setSize] = useState({ w: 1440, h: 900 });
  const [ready, setReady] = useState(false);
  const [hoverId, setHoverId] = useState<string | null>(null);
  const [dragging, setDragging] = useState(false);
  const drag = useRef<{ id: number; x: number; y: number; moved: boolean } | null>(null);
  const justDragged = useRef(false);
  const [offscreen, setOffscreen] = useState(false);

  useEffect(() => boot(), [boot]);

  useEffect(() => {
    const onResize = () => {
      setSize({ w: window.innerWidth, h: window.innerHeight });
      setOrientation(window.innerWidth < 768 ? "tall" : "wide");
    };
    onResize();
    window.addEventListener("resize", onResize);
    return () => window.removeEventListener("resize", onResize);
  }, []);

  const layout: NetworkLayout = useMemo(() => buildLayout(orientation), [orientation]);
  const live = booted && mode === "3d" && status !== "failed";

  const canvasRef = useRef<HTMLCanvasElement>(null);
  const worldRef = useRef<NetworkWorld | null>(null);
  const labelRefs = useRef(new Map<string, HTMLElement>());

  const moveLabels = useCallback((points: Projected[]) => {
    const { insets: clear } = useNetwork.getState();
    const edge = window.innerWidth - clear.right;
    for (const p of points) {
      const el = labelRefs.current.get(p.id);
      if (!el) continue;
      el.style.transform = `translate3d(${p.x.toFixed(1)}px, ${p.y.toFixed(1)}px, 0)`;
      // A name the screen would cut off is hidden until it is pointed at.
      const pos = el.dataset.pos;
      if (!pos) continue;
      const width = (el.lastElementChild as HTMLElement | null)?.offsetWidth ?? 0;
      const slanted = pos === "ne" || pos === "sw";
      const reach = (slanted ? width * 0.83 : width) + 24;
      const cut =
        pos === "ne" || pos === "e" ? p.x + reach > edge : p.x - reach < clear.left;
      const overTop = pos === "ne" && p.y - width * 0.56 < clear.top;
      el.classList.toggle("is-cut", cut || overTop);
    }
  }, []);

  /* Flat mode, and the moment before the model is ready: labels follow the SVG. */
  const flatFrame = useMemo(() => {
    const areaW = Math.max(size.w - insets.left - insets.right, 1);
    const areaH = Math.max(size.h - insets.top - insets.bottom, 1);
    const fullW = layout.width + FLAT_PADDING * 2;
    const fullH = layout.height + FLAT_PADDING * 2;
    const scale = Math.min(areaW / fullW, areaH / fullH);
    return {
      scale,
      x: insets.left + (areaW - fullW * scale) / 2,
      y: insets.top + (areaH - fullH * scale) / 2,
      style: { left: insets.left, top: insets.top, width: areaW, height: areaH },
    };
  }, [size, insets, layout]);

  const showFlat = !live || !ready;

  useEffect(() => {
    if (!showFlat) return;
    const toScreen = (id: string, x: number, y: number) => ({
      id,
      x: flatFrame.x + (x + FLAT_PADDING) * flatFrame.scale,
      y: flatFrame.y + (y + FLAT_PADDING) * flatFrame.scale,
    });
    moveLabels([
      ...layout.stops.map((s) => toScreen(s.id, s.x, s.y)),
      ...layout.zones.map((z) => {
        const along = z.from + 2.4;
        return layout.orientation === "wide"
          ? toScreen(`zone-${z.year}`, along, -5)
          : toScreen(`zone-${z.year}`, -5, along);
      }),
    ]);
  }, [showFlat, flatFrame, layout, moveLabels]);

  /* Boot and tear down the model. */
  useEffect(() => {
    if (!live) return;
    let cancelled = false;
    let world: NetworkWorld | null = null;
    const canvas = canvasRef.current;
    if (!canvas) return;

    const start = async () => {
      setStatus("loading");
      const { NetworkWorld } = await import("./NetworkWorld");
      if (cancelled) return;
      try {
        world = new NetworkWorld(
          canvas,
          {
            layout,
            theme: THEMES[themeRef.current],
            hollowIds,
            majorIds,
            reducedMotion: window.matchMedia("(prefers-reduced-motion: reduce)").matches,
            mobile: window.matchMedia("(max-width: 767px), (pointer: coarse)").matches,
          },
          () => {
            if (cancelled) return;
            setStatus("ready");
            setReady(true);
          },
          moveLabels,
        );
      } catch {
        setStatus("failed");
        return;
      }
      worldRef.current = world;
      const s = useNetwork.getState();
      world.setInsets(s.insets);
      world.setView(viewFor(pathnameRef.current, window.innerWidth));
      world.setActiveLine(s.activeLine);
      world.setFocus(s.focusId);
    };

    const w = window as Window & {
      requestIdleCallback?: (cb: () => void, o?: { timeout: number }) => number;
      cancelIdleCallback?: (id: number) => void;
    };
    const idle = w.requestIdleCallback?.(() => void start(), { timeout: 900 });
    const timer = idle === undefined ? setTimeout(() => void start(), 200) : undefined;

    const onLost = (e: Event) => {
      e.preventDefault();
      setStatus("failed");
    };
    canvas.addEventListener("webglcontextlost", onLost);

    return () => {
      cancelled = true;
      if (idle !== undefined) w.cancelIdleCallback?.(idle);
      if (timer) clearTimeout(timer);
      canvas.removeEventListener("webglcontextlost", onLost);
      world?.dispose();
      worldRef.current = null;
      setReady(false);
    };
  }, [live, layout, moveLabels, setStatus]);

  const themeRef = useRef(theme);
  themeRef.current = theme;
  const pathnameRef = useRef(pathname);
  pathnameRef.current = pathname;

  useEffect(() => worldRef.current?.setTheme(THEMES[theme]), [theme, ready]);
  useEffect(() => worldRef.current?.setView(viewFor(pathname, size.w)), [pathname, size.w, ready]);
  // A link that navigated away never sees its pointer leave.
  useEffect(() => {
    setHoverId(null);
    useNetwork.getState().setFocus(null);
  }, [pathname]);
  useEffect(() => worldRef.current?.setHover(hoverId), [hoverId, ready]);
  useEffect(() => worldRef.current?.setActiveLine(activeLine), [activeLine, ready]);
  useEffect(() => worldRef.current?.setFocus(focusId), [focusId, ready]);
  useEffect(() => worldRef.current?.setInsets(insets), [insets, ready]);
  useEffect(() => worldRef.current?.resize(), [size, ready]);
  useEffect(() => {
    if (dispatchKey) worldRef.current?.dispatchToNextStop();
  }, [dispatchKey]);

  /* Stop drawing once the page has scrolled over the map. */
  useEffect(() => {
    const onScroll = () => {
      const covered = window.scrollY > window.innerHeight * 1.05 && pathnameRef.current !== "/projects";
      setOffscreen(covered);
      worldRef.current?.setPaused(covered);
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, [pathname]);

  useEffect(() => {
    const onPointer = (e: PointerEvent) => {
      if (e.pointerType !== "mouse") return;
      worldRef.current?.setPointer((e.clientX / window.innerWidth) * 2 - 1, (e.clientY / window.innerHeight) * 2 - 1);
    };
    window.addEventListener("pointermove", onPointer, { passive: true });
    return () => window.removeEventListener("pointermove", onPointer);
  }, []);

  const view = viewFor(pathname, size.w);
  const narrow = orientation === "tall";
  const showingModel = live && ready;
  // The flat diagram never turns on end, so its labels stay in map orientation.
  const frame: LabelFrame = narrow ? "tall" : view.kind === "column" && showingModel ? "column" : "wide";

  /* Lines that keep their colour on this page; the rest drain away. */
  const keptLines: LineId[] | null =
    view.kind === "stop"
      ? (stopById.get(view.id)?.lines ?? null)
      : view.kind === "line"
        ? [view.id as LineId]
        : activeLine
          ? [activeLine]
          : null;

  const labelled = (id: string) => {
    const stop = stopById.get(id)!;
    if (view.kind === "stop") {
      // This stop and the neighbours on its lines.
      const here = stopById.get(view.id);
      if (stop.hollow) return true;
      return id === view.id || (!!here && stop.lines.some((l) => here.lines.includes(l)));
    }
    if (view.kind === "line") return stop.lines.includes(view.id as never);
    if (activeLine) return stop.lines.includes(activeLine);
    if (pathname === "/projects") return !!stop.major;
    if (id === "llm-stack") return false; // Sits between two projects; its detail is on hover.
    return narrow ? NARROW_LABELS.has(id) : true;
  };

  const baseKey = layout.stops.map((s) => (labelled(s.id) ? s.id : "")).join(",");
  const { positions, shifts, hidden, pxPerUnit } = useMemo(() => {
    const clearW = Math.max(size.w - insets.left - insets.right, 120);
    const clearH = Math.max(size.h - insets.top - insets.bottom, 120);
    const pxPerUnit =
      view.kind === "stop"
        ? clearW / ((narrow ? 24 : 46) + 14)
        : frame === "column"
        ? Math.min(clearH / (layout.width * 0.86 + 11), clearW / (layout.height + 14))
        : frame === "tall"
          ? Math.min(clearW / (layout.width + 10), clearH / (layout.height * 0.87 + 11))
          : Math.min(clearW / (layout.width + 14), clearH / (layout.height * 0.76 + 11));
    const items: LabelItem[] = layout.stops.map((s) => {
      const stop = stopById.get(s.id)!;
      const proof = PROOF.has(s.id) && view.kind !== "stop";
      const isHere = view.kind === "stop" && view.id === s.id;
      return {
        id: s.id,
        chars: Math.max(stop.title.length, proof ? (stop.detail?.length ?? 0) * 0.9 : 0),
        lines: proof ? 2 : 1,
        major: !!stop.major || isHere,
        must: PROOF.has(s.id) || isHere,
        ghost: !baseKey.split(",").includes(s.id),
      };
    });
    return { ...placeLabels(layout, items, { frame, pxPerUnit, lines: keptLines }), pxPerUnit };
    // keptLines is derived from the view and active line, both named here.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [layout, baseKey, frame, size, insets, activeLine, pathname]);

  const focusStop = hoverId && !dragging ? stopById.get(hoverId) : null;

  /* Dragging pans the model. Movement under a few pixels is still a click. */
  const onPointerDown = (e: React.PointerEvent<HTMLDivElement>) => {
    justDragged.current = false;
    if (!showingModel || e.button !== 0) return;
    drag.current = { id: e.pointerId, x: e.clientX, y: e.clientY, moved: false };
  };
  const onPointerMove = (e: React.PointerEvent<HTMLDivElement>) => {
    const d = drag.current;
    if (!d || d.id !== e.pointerId) return;
    const dx = e.clientX - d.x;
    const dy = e.clientY - d.y;
    if (!d.moved) {
      if (Math.hypot(dx, dy) < 6) return;
      d.moved = true;
      e.currentTarget.setPointerCapture(e.pointerId);
      worldRef.current?.setDragging(true);
      setDragging(true);
    }
    worldRef.current?.panBy(dx, dy);
    d.x = e.clientX;
    d.y = e.clientY;
  };
  const endDrag = () => {
    if (drag.current?.moved) {
      justDragged.current = true;
      worldRef.current?.setDragging(false);
      setDragging(false);
    }
    drag.current = null;
  };

  return (
    <div
      className={`map-stage ${offscreen ? "is-covered" : ""} ${showingModel ? "is-draggable" : ""} ${
        dragging ? "is-dragging" : ""
      }`}
      data-active-line={activeLine ?? undefined}
      onPointerDown={onPointerDown}
      onPointerMove={onPointerMove}
      onPointerUp={endDrag}
      onPointerCancel={endDrag}
      onClickCapture={(e) => {
        if (!justDragged.current) return;
        justDragged.current = false;
        e.preventDefault();
        e.stopPropagation();
      }}
    >
      {showFlat && (
        <FlatMap
          layout={layout}
          keptLines={keptLines}
          focusId={hoverId ?? focusId}
          majorIds={majorIds}
          hollowIds={hollowIds}
          style={flatFrame.style}
        />
      )}
      {live && <canvas ref={canvasRef} className={`map-canvas ${ready ? "is-ready" : ""}`} aria-hidden="true" />}

      <nav className="map-labels" aria-label="Stations on the network">
        {(view.kind === "overview" || view.kind === "column") &&
          layout.zones
            .filter((z) => z.year < 2027)
            .map((z) => (
              <span
                key={z.year}
                className="map-year"
                aria-hidden="true"
                ref={(el) => {
                  if (el) labelRefs.current.set(`zone-${z.year}`, el);
                  else labelRefs.current.delete(`zone-${z.year}`);
                }}
              >
                <span>{z.year}</span>
              </span>
            ))}
        {layout.stops.map((placed) => {
          const stop = stopById.get(placed.id)!;
          const shown =
            (labelled(stop.id) && !hidden.has(stop.id)) || focusId === stop.id || hoverId === stop.id;
          return (
            <Link
              key={stop.id}
              href={stop.href}
              ref={(el) => {
                if (el) labelRefs.current.set(stop.id, el);
                else labelRefs.current.delete(stop.id);
              }}
              draggable={false}
              data-pos={positions.get(stop.id) ?? "ne"}
              style={leaderVars(shifts.get(stop.id), pxPerUnit)}
              className={`map-stop ${shown ? "" : "is-quiet"} ${stop.major ? "is-major" : ""} ${
                focusId === stop.id || hoverId === stop.id ? "is-focus" : ""
              } ${narrow ? "is-narrow" : ""} ${PROOF.has(stop.id) && view.kind !== "stop" ? "has-proof" : ""} pos-${
                positions.get(stop.id) ?? "ne"
              }`}
              tabIndex={shown ? 0 : -1}
              aria-label={`${stop.title}${stop.detail ? `, ${stop.detail}` : ""}`}
              onPointerEnter={() => setHoverId(stop.id)}
              onPointerLeave={() => setHoverId(null)}
              onFocus={() => setHoverId(stop.id)}
              onBlur={() => setHoverId(null)}
            >
              <span className="map-stop-hit" aria-hidden="true" />
              {shifts.has(stop.id) && <span className="map-stop-lead" aria-hidden="true" />}
              <span className="map-stop-text">
                <span className="map-stop-name">{stop.title}</span>
                {stop.detail && <span className="map-stop-detail">{stop.detail}</span>}
              </span>
            </Link>
          );
        })}
      </nav>

      {focusStop && view.kind === "overview" && pathname !== "/projects" && (
        <aside className="map-ticket" aria-hidden="true">
          {focusStop.project?.thumbnail && (
            <span className="map-ticket-shot">
              <Image
                src={focusStop.project.thumbnail}
                alt=""
                fill
                sizes="280px"
                className="object-cover object-top"
              />
            </span>
          )}
          <span className="map-ticket-body">
            <span className="map-ticket-lines">
              {focusStop.lines.map((l) => (
                <span key={l} className="bullet bullet-sm" style={{ "--line": `var(--line-${l})`, "--line-ink": `var(--line-${l}-ink)` } as React.CSSProperties}>
                  {l}
                </span>
              ))}
              <span className="map-ticket-year">{Math.floor(focusStop.at) >= 2027 ? "Next" : Math.floor(focusStop.at)}</span>
            </span>
            <span className="map-ticket-title">{focusStop.title}</span>
            <span className="map-ticket-text">
              {focusStop.project?.description ??
                focusStop.detail ??
                (focusStop.hollow ? "Not built yet. Get in touch." : lineById.get(focusStop.lines[0])?.blurb)}
            </span>
          </span>
        </aside>
      )}
    </div>
  );
}
