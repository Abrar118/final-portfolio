"use client";

import { useEffect, useRef } from "react";
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

/* The black station sign at the bottom of each page's map. It reports its top
   edge so the camera frames the model in the clear space above it. */
export function MapHero({
  height = "full",
  children,
}: {
  height?: "full" | "tall" | "short";
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
      <div ref={ref} className="sign">
        {children}
      </div>
    </section>
  );
}

/* The route line that runs unbroken down a page. The train is sticky, so it
   rides along with the scroll. */
export function Route({ line, children }: { line: LineId; children: React.ReactNode }) {
  return (
    <div className="route" style={lineVars(line)}>
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
