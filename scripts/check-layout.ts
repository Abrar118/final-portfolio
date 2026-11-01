/* Run with: node scripts/check-layout.ts
   Every segment of the map must be horizontal, vertical or 45°, every stop
   must sit on all of its lines, and a bad line id must fail loudly. */
import assert from "node:assert/strict";
import { layoutNetwork } from "../lib/network-layout.ts";
import { placeLabels } from "../lib/network-labels.ts";

const lines = ["a", "b", "c", "d"].map((id) => ({ id }));
const stops = [
  { id: "one", lines: ["a"], at: 2022.1 },
  { id: "two", lines: ["a", "d"], at: 2022.9 },
  { id: "three", lines: ["b", "c", "d"], at: 2023.5 },
  { id: "four", lines: ["a", "b"], at: 2024.5 },
  { id: "five", lines: ["c"], at: 2024.7 },
  { id: "six", lines: ["a", "b", "c", "d"], at: 2025.5 },
];

for (const orientation of ["wide", "tall"] as const) {
  const map = layoutNetwork(lines, stops, orientation);
  for (const line of map.lines) {
    line.points.slice(1).forEach((p, i) => {
      const dx = Math.abs(p.x - line.points[i].x);
      const dy = Math.abs(p.y - line.points[i].y);
      const octilinear = dx < 1e-6 || dy < 1e-6 || Math.abs(dx - dy) < 1e-6;
      assert.ok(octilinear, `${line.id} has a skewed segment: ${dx} by ${dy}`);
    });
  }
  for (const stop of map.stops) {
    for (const id of stop.lines) {
      const line = map.lines.find((l) => l.id === id)!;
      const near = line.points.some(
        (p) => Math.hypot(p.x - stop.x, p.y - stop.y) <= stop.span + 1e-6,
      );
      assert.ok(near, `${id} misses stop ${stop.id}`);
    }
  }
  assert.deepEqual(map.zones.map((z) => z.year), [2022, 2023, 2024, 2025]);
}

assert.throws(() => layoutNetwork(lines, [{ id: "x", lines: ["nope"], at: 2022 }], "wide"));
const map = layoutNetwork(lines, stops, "wide");
const items = stops.map((s) => ({ id: s.id, chars: 12, lines: 1 as const, major: false }));
const placed = placeLabels(map, items, { frame: "wide", pxPerUnit: 11 });
assert.equal(placed.positions.size, stops.length);
assert.ok([...placed.positions.values()].every((p) => p === "ne" || p === "sw"), "one label angle per map");
const tall = placeLabels(layoutNetwork(lines, stops, "tall"), items, { frame: "tall", pxPerUnit: 10 });
assert.ok([...tall.positions.values()].every((p) => p === "e" || p === "w"), "phone labels read level");

const must = placeLabels(map, [{ id: "three", chars: 40, lines: 2, major: true, must: true }], { frame: "wide", pxPerUnit: 11 });
assert.ok(!must.hidden.has("three"), "a must label is never hidden");

console.log("network layout ok");
