/* The lightweight world: layered pine silhouettes, a moon, and a few CSS
   fireflies. It is the static-mode backdrop and also the poster the 3D
   forest fades in over, so first paint never waits on WebGL. */

const rand = (() => {
  let seed = 11;
  return () => {
    seed = (seed * 16807) % 2147483647;
    return (seed - 1) / 2147483646;
  };
})();

const pine = (cx: number, base: number, h: number, w: number) => {
  const pts: [number, number][] = [
    [-0.5, 0],
    [-0.5, -0.14],
    [-0.16, -0.3],
    [-0.4, -0.33],
    [-0.12, -0.55],
    [-0.28, -0.57],
    [-0.06, -0.78],
    [-0.14, -0.8],
    [0, -1],
  ];
  const left = pts.map(([x, y]) => `${(cx + x * w).toFixed(0)},${(base + y * h).toFixed(0)}`);
  const right = pts
    .slice(0, -1)
    .reverse()
    .map(([x, y]) => `${(cx - x * w).toFixed(0)},${(base + y * h).toFixed(0)}`);
  return `M${[...left, ...right].join("L")}Z`;
};

const layer = (base: number, minH: number, maxH: number, gap: number) => {
  let d = `M0,${base}H1600V900H0Z`;
  for (let x = -20; x < 1640; x += gap * (0.6 + rand() * 0.8)) {
    const h = minH + rand() * (maxH - minH);
    d += pine(x, base + 4, h, h * (0.34 + rand() * 0.1));
  }
  return d;
};

const LAYERS = [
  layer(560, 70, 150, 34),
  layer(640, 110, 210, 46),
  layer(730, 160, 290, 64),
  layer(840, 240, 420, 96),
];

const FIREFLIES = Array.from({ length: 22 }, () => ({
  left: `${(rand() * 100).toFixed(1)}%`,
  top: `${(45 + rand() * 50).toFixed(1)}%`,
  delay: `${(rand() * -12).toFixed(1)}s`,
  duration: `${(9 + rand() * 9).toFixed(1)}s`,
  size: `${(3 + rand() * 4).toFixed(1)}px`,
  teal: rand() > 0.65,
}));

export default function StaticForest() {
  return (
    <div className="static-forest" aria-hidden="true">
      <div className="static-sky" />
      <div className="static-aurora" />
      <div className="static-moon" />
      <svg
        viewBox="0 0 1600 900"
        preserveAspectRatio="xMidYMax slice"
        className="static-trees"
      >
        {LAYERS.map((d, i) => (
          <path key={i} d={d} className={`tree-layer tree-layer-${i}`} />
        ))}
      </svg>
      <div className="static-mist" />
      {FIREFLIES.map((f, i) => (
        <span
          key={i}
          className={`static-firefly ${f.teal ? "is-teal" : ""}`}
          style={{
            left: f.left,
            top: f.top,
            width: f.size,
            height: f.size,
            animationDelay: `${f.delay}, ${f.delay}`,
            animationDuration: `${f.duration}, 3.4s`,
          }}
        />
      ))}
    </div>
  );
}
