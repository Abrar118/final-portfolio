"use client";

import { useEffect, useRef } from "react";
import { Box, Map as MapIcon } from "lucide-react";
import { lines, stopsOnLine, type LineId } from "@/data/network";
import { lineVars } from "@/lib/line-vars";
import { useNetwork } from "@/lib/network-store";

export function Bullet({ id, size }: { id: LineId; size?: "sm" | "lg" }) {
  return (
    <span className={`bullet ${size ? `bullet-${size}` : ""}`} style={lineVars(id)} aria-hidden="true">
      {id}
    </span>
  );
}

/* The line selector: each bullet lights everything its line governs. */
export function LinePicker({ showHelp = true }: { showHelp?: boolean }) {
  const activeLine = useNetwork((s) => s.activeLine);
  const toggleLine = useNetwork((s) => s.toggleLine);
  const active = lines.find((l) => l.id === activeLine);

  return (
    <div className="line-picker">
      <div className="line-picker-row" role="group" aria-label="Show one line on the map">
        {lines.map((l) => (
          <button
            key={l.id}
            type="button"
            className="line-button"
            style={lineVars(l.id)}
            aria-pressed={activeLine === l.id}
            aria-label={`${l.name}, ${stopsOnLine(l.id).length} stops`}
            title={l.name}
            onClick={() => toggleLine(l.id)}
          >
            {l.id}
          </button>
        ))}
      </div>
      {showHelp && (
        <p className="line-picker-note" role="status">
          {active
            ? `${active.name}: ${stopsOnLine(active.id).length} stops. ${active.blurb}`
            : (
                <>
                  <span className="note-wide">Drag the map. Pick a line to light its stops, or press its letter.</span>
                  <span className="note-narrow">Swipe the map sideways. Tap a line to light its stops.</span>
                </>
              )}
        </p>
      )}
    </div>
  );
}

/* Switches the map between the 3D model and the flat map. */
export function MapModeToggle() {
  const mode = useNetwork((s) => s.mode);
  const status = useNetwork((s) => s.status);
  const setMode = useNetwork((s) => s.setMode);
  const threeD = mode === "3d" && status !== "failed";

  return (
    <button
      type="button"
      className="map-control-button"
      aria-pressed={threeD}
      disabled={status === "failed"}
      aria-label={status === "failed" ? "3D map is unavailable on this device" : threeD ? "Show the flat map" : "Show the 3D map"}
      title={threeD ? "Show the flat map" : "Show the 3D map"}
      onClick={() => setMode(threeD ? "flat" : "3d")}
    >
      {threeD ? <Box className="h-4 w-4" aria-hidden="true" /> : <MapIcon className="h-4 w-4" aria-hidden="true" />}
    </button>
  );
}

/* The black station sign at the bottom of each page's map. It reports its top
   edge so the camera frames the model in the clear space above it. Controls
   in `corners` sit on the map itself and stay put while the map is dragged. */
export function MapHero({
  height = "full",
  corners,
  children,
}: {
  height?: "full" | "tall" | "short";
  corners?: { bottomLeft?: React.ReactNode; topRight?: React.ReactNode };
  children: React.ReactNode;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const setInsets = useNetwork((s) => s.setInsets);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const measure = () => {
      const top = el.getBoundingClientRect().top + window.scrollY;
      setInsets({ top: 56, left: 0, right: 0, bottom: Math.max(window.innerHeight - top, 0) });
    };
    measure();
    const observer = new ResizeObserver(measure);
    observer.observe(el);
    window.addEventListener("resize", measure);
    return () => {
      observer.disconnect();
      window.removeEventListener("resize", measure);
    };
  }, [setInsets]);

  return (
    <section className={`map-hero map-hero-${height}`}>
      {corners && (
        <div className="map-controls">
          {corners.topRight && <div className="map-controls-top-right">{corners.topRight}</div>}
          {corners.bottomLeft && <div className="map-controls-bottom-left">{corners.bottomLeft}</div>}
        </div>
      )}
      <div ref={ref} className="sign">
        {children}
      </div>
    </section>
  );
}

/* The route line that runs unbroken down a page. The train is sticky, so it
   rides along with the scroll. */
export function Route({
  line,
  rail,
  children,
}: {
  line: LineId;
  /** A sticky column on the right edge, such as a table of contents. */
  rail?: React.ReactNode;
  children: React.ReactNode;
}) {
  return (
    <div className={`route ${rail ? "route-has-rail" : ""}`} style={lineVars(line)}>
      {rail && (
        <div className="toc-rail">
          <div className="toc-rail-inner">{rail}</div>
        </div>
      )}
      <div className="route-track" aria-hidden="true">
        <span className="route-train" />
      </div>
      {children}
    </div>
  );
}

export function Stopline({
  id,
  title,
  children,
  field,
}: {
  id?: string;
  title: string;
  children: React.ReactNode;
  field?: LineId;
}) {
  return (
    <section
      id={id}
      className={`route-section ${field ? "route-field" : ""}`}
      style={field ? lineVars(field) : undefined}
    >
      <div className="page-wrap">
        <h2 className="section-title route-stop">{title}</h2>
        {children}
      </div>
    </section>
  );
}
