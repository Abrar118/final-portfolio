import type { NetworkLayout, Point } from "@/lib/network-layout";

/* Chooses where each station's label sits so it stays attached to its own stop.
   A map sets its names at one angle, so each view offers two opposite positions
   at that angle. Touching a track, a station, another label or a year counts as
   a failure. A priority name with no clean position moves clear and is tied back
   by a leader line, as on a printed map; a minor one waits for hover. Works in a
   screen-like space, because how the map is viewed changes what collides. */

export type LabelFrame = "wide" | "flat" | "column";
export type LabelPosition = "ne" | "sw" | "e" | "w";

export type LabelItem = {
  id: string;
  chars: number;
  lines: 1 | 2;
  major: boolean;
  /** Stays on the map whatever it costs: proof figures and the page's own stop. */
  must?: boolean;
  /** Placed last and does not block others: only appears on hover. */
  ghost?: boolean;
};

export type LabelPlacement = {
  positions: Map<string, LabelPosition>;
  /** Screen-space offset in map units, for names tied back by a leader. */
  shifts: Map<string, Point>;
  hidden: Set<string>;
};

const FAILURE = 40;
const SLANT = (34 * Math.PI) / 180;
const DIRECTION: Record<LabelPosition, Point> = {
  ne: { x: Math.cos(SLANT), y: -Math.sin(SLANT) },
  sw: { x: -Math.cos(SLANT), y: Math.sin(SLANT) },
  e: { x: 1, y: 0 },
  w: { x: -1, y: 0 },
};
const PREFERENCE: Record<LabelFrame, Partial<Record<LabelPosition, number>>> = {
  wide: { ne: 0, sw: 0.5 },
  flat: { ne: 0, sw: 0.5 },
  column: { e: 0, w: 0.3 },
};
/* Where a name may move to. Every one is scored, leader line included. */
const around = (xs: number[], ys: number[]) => xs.flatMap((x) => ys.map((y) => ({ x, y })));
const SLANTED_SHIFTS = around([0, -3, 3, -6, 6], [3, -3, 5, -5, 7, -7, 10, -10]);
const LEADER_SHIFTS: Record<LabelFrame, Point[]> = {
  wide: SLANTED_SHIFTS,
  flat: SLANTED_SHIFTS,
  column: around([0, -3, 3], [3, -3, 5, -5, 7, -7]),
};
/* The flat map on a phone has rails too close for a slanted name to clear.
   Crossing one reads better than a name far from its stop, so it costs little. */
const SOFT_TRACK = 3;
/* A leader may cross a track when nothing better exists, but it costs. */
const LEADER_CROSSING = 25;

const toScreen = (frame: LabelFrame) => (p: Point): Point => {
  if (frame === "wide") return { x: p.x, y: p.y * 0.76 };
  if (frame === "flat") return p;
  return { x: -p.y, y: p.x * 0.85 }; // turned on end, time running downward
};

const distanceToSegment = (p: Point, a: Point, b: Point) => {
  const dx = b.x - a.x;
  const dy = b.y - a.y;
  const t = Math.max(0, Math.min(1, ((p.x - a.x) * dx + (p.y - a.y) * dy) / (dx * dx + dy * dy || 1)));
  return Math.hypot(p.x - a.x - dx * t, p.y - a.y - dy * t);
};

export function placeLabels(
  layout: NetworkLayout,
  items: LabelItem[],
  options: { frame: LabelFrame; pxPerUnit: number; lines?: string[] | null; keepAll?: boolean },
): LabelPlacement {
  const { frame, pxPerUnit, lines: only, keepAll } = options;
  const trackCost = frame === "flat" && keepAll ? SOFT_TRACK : FAILURE;
  const stationClear = trackCost === SOFT_TRACK ? 2.4 : 1.5;
  const screen = toScreen(frame);
  const tracks = layout.lines
    .filter((l) => !only || only.includes(l.id))
    .map((l) => l.points.map(screen));
  const stations = layout.stops.map((s) => ({ id: s.id, ...screen(s) }));
  const bounds = tracks.flat().concat(stations).reduce(
    (b, p) => ({
      x0: Math.min(b.x0, p.x),
      x1: Math.max(b.x1, p.x),
      y0: Math.min(b.y0, p.y),
      y1: Math.max(b.y1, p.y),
    }),
    { x0: Infinity, x1: -Infinity, y0: Infinity, y1: -Infinity },
  );
  const margin = frame === "column" ? 5 : 4;
  const positions = new Map<string, LabelPosition>();
  const shifts = new Map<string, Point>();
  const hidden = new Set<string>();
  const lineHeight = 15 / pxPerUnit;
  // The year labels are fixed, so they are taken before anything else.
  const taken: Point[] = layout.zones.flatMap((z) => {
    const along = z.from + 2.4;
    const year = screen({ x: along, y: -5 });
    return [-2, 0, 2].map((dx) => ({ x: year.x + dx, y: year.y }));
  });

  const ordered = [...items].sort(
    (a, b) =>
      Number(!!a.ghost) - Number(!!b.ghost) ||
      Number(!!b.must) - Number(!!a.must) ||
      Number(b.major) - Number(a.major) ||
      b.chars - a.chars,
  );

  for (const item of ordered) {
    const home = stations.find((s) => s.id === item.id);
    if (!home) continue;
    const charPx = item.major ? 8.2 : 6.8;
    const length = (item.chars * charPx) / pxPerUnit;
    const half = (item.lines * lineHeight) / 2;

    const evaluate = (key: LabelPosition, shift: Point) => {
      const dir = DIRECTION[key];
      const normal = { x: -dir.y, y: dir.x };
      const start = 1 + half * 0.4;
      const samples: Point[] = [];
      for (let d = 0; d <= length; d += Math.max(length / 10, 0.6)) {
        for (const side of [-half * 0.8, 0, half * 0.8]) {
          samples.push({
            x: home.x + shift.x + dir.x * (start + d) + normal.x * side,
            y: home.y + shift.y + dir.y * (start + d) + normal.y * side,
          });
        }
      }
      let cost = PREFERENCE[frame][key]!;
      for (const p of samples) {
        // The stop's own tracks always meet the label's first letters.
        const nearHome = Math.hypot(p.x - home.x, p.y - home.y) < 1.9;
        if (!nearHome) {
          for (const track of tracks) {
            for (let i = 1; i < track.length; i++) {
              if (distanceToSegment(p, track[i - 1], track[i]) < layout.lineWidth / 2 + 0.2) cost += trackCost;
            }
          }
        }
        for (const s of stations) {
          if (s.id !== item.id && Math.hypot(p.x - s.x, p.y - s.y) < stationClear) cost += FAILURE;
        }
        for (const t of taken) {
          if (Math.hypot(p.x - t.x, p.y - t.y) < lineHeight * 0.95) cost += FAILURE;
        }
        if (
          p.x < bounds.x0 - margin ||
          p.x > bounds.x1 + margin ||
          p.y < bounds.y0 - margin ||
          p.y > bounds.y1 + margin
        ) {
          cost += FAILURE;
        }
      }
      // Tie-break toward short leaders, and pay for each track one crosses.
      const reach = Math.hypot(shift.x, shift.y);
      cost += reach * 0.6;
      for (let d = 1.9; d < reach; d += 0.5) {
        const p = { x: home.x + (shift.x / reach) * d, y: home.y + (shift.y / reach) * d };
        for (const track of tracks) {
          for (let i = 1; i < track.length; i++) {
            if (distanceToSegment(p, track[i - 1], track[i]) < layout.lineWidth / 2) cost += LEADER_CROSSING;
          }
        }
      }
      return { position: key, shift, cost, samples };
    };

    const keys = Object.keys(PREFERENCE[frame]) as LabelPosition[];
    const none: Point = { x: 0, y: 0 };
    const cheapest = (shift: Point) =>
      keys.map((k) => evaluate(k, shift)).reduce((a, b) => (b.cost < a.cost ? b : a));

    let best = cheapest(none);
    if (best.cost >= FAILURE && !item.ghost && (item.major || trackCost === SOFT_TRACK)) {
      for (const shift of LEADER_SHIFTS[frame]) {
        const moved = cheapest(shift);
        if (moved.cost < best.cost) best = moved;
      }
    }

    positions.set(item.id, best.position);
    if (item.ghost) continue;
    if (best.cost >= FAILURE && !item.must && !keepAll) {
      hidden.add(item.id);
      continue;
    }
    if (best.shift !== none) shifts.set(item.id, best.shift);
    taken.push(...best.samples);
  }
  return { positions, shifts, hidden };
}
