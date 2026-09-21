/** Decorative purple folds give the glass real color and edges to diffuse. */
export default function AmbientBackdrop() {
  return (
    <div className="ambient-scene" aria-hidden="true">
      <svg viewBox="0 0 1600 1100" preserveAspectRatio="xMidYMid slice" className="ambient-art">
        <defs>
          <linearGradient id="fold-back" x1="0" y1="1" x2="1" y2="0">
            <stop stopColor="#14091f" /><stop offset=".36" stopColor="#4a1b69" /><stop offset=".63" stopColor="#b079da" /><stop offset=".77" stopColor="#5a267f" /><stop offset="1" stopColor="#170d24" />
          </linearGradient>
          <linearGradient id="fold-front" x1=".15" y1="0" x2=".85" y2="1">
            <stop stopColor="#1c0c2a" /><stop offset=".35" stopColor="#582683" /><stop offset=".54" stopColor="#b078d9" /><stop offset=".59" stopColor="#6c3993" /><stop offset=".85" stopColor="#2a103d" /><stop offset="1" stopColor="#11081b" />
          </linearGradient>
          <linearGradient id="fold-edge" x1="0" y1="0" x2="1" y2="1">
            <stop stopColor="#e8c3ff" stopOpacity=".1" /><stop offset=".5" stopColor="#e8c3ff" stopOpacity=".7" /><stop offset="1" stopColor="#a965d4" stopOpacity="0" />
          </linearGradient>
          <filter id="fold-soften"><feGaussianBlur stdDeviation="3" /></filter>
        </defs>
        <g filter="url(#fold-soften)">
          <path d="M630 -200 C1470 -150 1930 140 1390 500 C1020 750 310 410 95 820 C-100 1150 400 1320 660 1200 L-200 1300 L-200 110 C100 40 280 180 630 -200Z" fill="url(#fold-back)" />
          <path d="M1410 -140 C770 20 820 300 1130 520 C1510 790 620 1130 350 890 C150 700 530 530 330 390 C150 265 -95 580 -200 660 L-200 1300 L1800 1300 L1800 -180Z" fill="url(#fold-front)" />
          <path d="M1410 -140 C770 20 820 300 1130 520 C1510 790 620 1130 350 890 C150 700 530 530 330 390" fill="none" stroke="url(#fold-edge)" strokeWidth="3" />
          <path d="M95 820 C310 410 1020 750 1390 500 C1930 140 1470 -150 630 -200" fill="none" stroke="url(#fold-edge)" strokeWidth="2" />
        </g>
      </svg>
      <div className="ambient-scrim" />
    </div>
  );
}
