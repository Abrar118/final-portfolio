/* Turns lines + stops into transit-map geometry: every line keeps to its own
   rail and bends at 45° into the stops it serves. Pure and framework-free so
   the 3D scene, the flat SVG and the labels all draw the same map. */

export type LayoutLine = { id: string };
export type LayoutStop = {
  id: string;
  lines: string[];
  /** Decimal year. Sets the left-to-right (or top-to-bottom) order. */
  at: number;
};
export type Point = { x: number; y: number };

export type PlacedStop = Point & {
  id: string;
  lines: string[];
  /** Half the capsule's length along the bundle; 0 for a single-line stop. */
  span: number;
  zone: number;
};

export type Orientation = "wide" | "tall";

export type NetworkLayout = {
  orientation: Orientation;
  width: number;
  height: number;
  lineWidth: number;
  lines: { id: string; points: Point[] }[];
  stops: PlacedStop[];
  zones: { year: number; from: number; to: number }[];
};

const METRICS: Record<Orientation, { col: number; rail: number; lineWidth: number }> = {
  wide: { col: 4.6, rail: 6, lineWidth: 0.8 },
  tall: { col: 2.7, rail: 4.2, lineWidth: 0.58 },
};
const BUNDLE_GAP = 1.2; // spacing between lines sharing a stop, in line widths

const pushPoint = (points: Point[], p: Point) => {
  const last = points[points.length - 1];
  if (!last || Math.hypot(last.x - p.x, last.y - p.y) > 1e-6) points.push(p);
};

/* Connects two stops: leave the first back to the rail at 45°, run along the
   rail, then rise at 45° into the second. When there is no room for all that,
   go straight there with a single 45° and whatever vertical is left. */
const route = (points: Point[], a: Point, b: Point, rail: number) => {
  const dx = b.x - a.x;
  const leave = Math.abs(a.y - rail);
  const enter = Math.abs(b.y - rail);
  if (leave + enter <= dx * 0.9) {
    pushPoint(points, { x: a.x + leave, y: rail });
    pushPoint(points, { x: b.x - enter, y: rail });
  } else {
    const dy = b.y - a.y;
    const run = Math.min(Math.abs(dy), dx);
    const rest = dy - Math.sign(dy) * run;
    pushPoint(points, { x: b.x - run, y: a.y + rest });
  }
  pushPoint(points, b);
};

export function layoutNetwork(
  lines: LayoutLine[],
  stops: LayoutStop[],
  orientation: Orientation,
): NetworkLayout {
  const { col, rail, lineWidth } = METRICS[orientation];
  const railOf = new Map(lines.map((l, i) => [l.id, i * rail]));
  const orderOf = new Map(lines.map((l, i) => [l.id, i]));
  const sorted = [...stops].sort((a, b) => a.at - b.at);
  const gap = lineWidth * BUNDLE_GAP;

  const placed: PlacedStop[] = sorted.map((s, i) => {
    const known = s.lines.filter((l) => railOf.has(l));
    if (known.length !== s.lines.length) {
      throw new Error(`Stop "${s.id}" names a line that does not exist`);
    }
    if (known.length === 0) throw new Error(`Stop "${s.id}" has no lines`);
    const ordered = [...known].sort((a, b) => orderOf.get(a)! - orderOf.get(b)!);
    const rails = ordered.map((l) => railOf.get(l)!);
    const y = rails.reduce((sum, r) => sum + r, 0) / rails.length;
    return {
      id: s.id,
      lines: ordered,
      x: i * col,
      y,
      span: ((ordered.length - 1) * gap) / 2,
      zone: Math.floor(s.at),
    };
  });

  const routed = lines.flatMap((line) => {
    const served = placed.filter((s) => s.lines.includes(line.id));
    if (served.length === 0) return [];
    const points: Point[] = [];
    served.forEach((stop, i) => {
      const slot = stop.lines.indexOf(line.id);
      const at = { x: stop.x, y: stop.y + slot * gap - stop.span };
      if (i === 0) pushPoint(points, at);
      else {
        const prev = points[points.length - 1];
        route(points, prev, at, railOf.get(line.id)!);
      }
    });
    return [{ id: line.id, points }];
  });

  const zones: NetworkLayout["zones"] = [];
  placed.forEach((s, i) => {
    const edge = i === 0 ? s.x - col : s.x - col / 2;
    const end = i === placed.length - 1 ? s.x + col : s.x + col / 2;
    const current = zones[zones.length - 1];
    if (current && current.year === s.zone) current.to = end;
    else zones.push({ year: s.zone, from: edge, to: end });
  });

  const width = placed.length ? placed[placed.length - 1].x : 0;
  const height = (lines.length - 1) * rail;

  if (orientation === "wide") {
    return { orientation, width, height, lineWidth, lines: routed, stops: placed, zones };
  }
  // Tall: time runs downward, rails spread across the width.
  const swap = <T extends Point>(p: T): T => ({ ...p, x: p.y, y: p.x });
  return {
    orientation,
    width: height,
    height: width,
    lineWidth,
    lines: routed.map((l) => ({ id: l.id, points: l.points.map(swap) })),
    stops: placed.map(swap),
    zones,
  };
}

/** Rounds a polyline's corners; used by both the SVG and the 3D ribbons. */
export function filletPath(points: Point[], radius: number, steps = 6): Point[] {
  if (points.length < 3) return points;
  const out: Point[] = [points[0]];
  for (let i = 1; i < points.length - 1; i++) {
    const [a, b, c] = [points[i - 1], points[i], points[i + 1]];
    const inLen = Math.hypot(b.x - a.x, b.y - a.y);
    const outLen = Math.hypot(c.x - b.x, c.y - b.y);
    const r = Math.min(radius, inLen / 2, outLen / 2);
    const from = { x: b.x + ((a.x - b.x) / inLen) * r, y: b.y + ((a.y - b.y) / inLen) * r };
    const to = { x: b.x + ((c.x - b.x) / outLen) * r, y: b.y + ((c.y - b.y) / outLen) * r };
    for (let s = 0; s <= steps; s++) {
      const t = s / steps;
      const u = 1 - t;
      out.push({
        x: u * u * from.x + 2 * u * t * b.x + t * t * to.x,
        y: u * u * from.y + 2 * u * t * b.y + t * t * to.y,
      });
    }
  }
  out.push(points[points.length - 1]);
  return out;
}
