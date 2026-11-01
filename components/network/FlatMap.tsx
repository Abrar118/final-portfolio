"use client";

import { filletPath, type NetworkLayout, type Point } from "@/lib/network-layout";
import type { LineId } from "@/data/network";

const pathD = (points: Point[]) =>
  points.map((p, i) => `${i ? "L" : "M"}${p.x.toFixed(2)} ${p.y.toFixed(2)}`).join("");

export const FLAT_PADDING = 7;

/* The same map as a flat diagram: painted first, and what remains when WebGL
   or motion is off. */
export default function FlatMap({
  layout,
  keptLines,
  focusId,
  majorIds,
  hollowIds,
  style,
  svgRef,
}: {
  layout: NetworkLayout;
  keptLines: LineId[] | null;
  focusId: string | null;
  majorIds: string[];
  hollowIds: string[];
  style?: React.CSSProperties;
  svgRef?: React.Ref<SVGSVGElement>;
}) {
  const pad = FLAT_PADDING;

  return (
    <svg
      ref={svgRef}
      className="flat-map"
      style={style}
      viewBox={`${-pad} ${-pad} ${layout.width + pad * 2} ${layout.height + pad * 2}`}
      preserveAspectRatio="xMidYMid meet"
      aria-hidden="true"
    >
      {layout.zones.map((z, i) =>
        i % 2 === 0 ? (
          <rect
            key={z.year}
            className="flat-zone"
            x={z.from}
            y={-pad * 40}
            width={z.to - z.from}
            height={layout.height + pad * 80}
          />
        ) : null,
      )}
      {layout.lines.map((l) => (
        <path
          key={l.id}
          d={pathD(filletPath(l.points, 1.1))}
          fill="none"
          stroke={`var(--line-${l.id})`}
          strokeWidth={layout.lineWidth}
          strokeLinecap="round"
          strokeLinejoin="round"
          className={keptLines && !keptLines.includes(l.id as LineId) ? "flat-drained" : undefined}
        />
      ))}
      {layout.stops.map((s) => {
        const major = majorIds.includes(s.id);
        const hollow = hollowIds.includes(s.id);
        const r = major ? 0.86 : 0.62;
        const dimmed = keptLines && !s.lines.some((l) => keptLines.includes(l as LineId));
        const focused = focusId === s.id;
        return (
          <rect
            key={s.id}
            className={`flat-stop ${dimmed ? "flat-drained" : ""} ${hollow ? "flat-hollow" : ""}`}
            x={s.x - r}
            y={s.y - r - s.span}
            width={r * 2}
            height={r * 2 + s.span * 2}
            rx={r}
            strokeWidth={focused ? 0.5 : 0.28}
          />
        );
      })}
    </svg>
  );
}
