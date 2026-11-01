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
}: {
  layout: NetworkLayout;
  keptLines: LineId[] | null;
  focusId: string | null;
  majorIds: string[];
  hollowIds: string[];
  style?: React.CSSProperties;
}) {
  const wide = layout.orientation === "wide";
  const pad = FLAT_PADDING;
  const span = wide ? layout.height : layout.width;

  return (
    <svg
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
            x={wide ? z.from : -pad * 40}
            y={wide ? -pad * 40 : z.from}
            width={wide ? z.to - z.from : span + pad * 80}
            height={wide ? span + pad * 80 : z.to - z.from}
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
            x={s.x - r - (wide ? 0 : s.span)}
            y={s.y - r - (wide ? s.span : 0)}
            width={r * 2 + (wide ? 0 : s.span * 2)}
            height={r * 2 + (wide ? s.span * 2 : 0)}
            rx={r}
            strokeWidth={focused ? 0.5 : 0.28}
          />
        );
      })}
    </svg>
  );
}
