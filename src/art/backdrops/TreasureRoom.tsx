export function TreasureRoom() {
  return (
    <svg
      viewBox="0 0 800 600"
      preserveAspectRatio="xMidYMid slice"
      className="h-full w-full"
      xmlns="http://www.w3.org/2000/svg"
    >
      <defs>
        <radialGradient id="tr-glow" cx="0.5" cy="0.55" r="0.7">
          <stop offset="0" stopColor="#e8c34a" stopOpacity="0.5" />
          <stop offset="1" stopColor="#1a0e06" stopOpacity="1" />
        </radialGradient>
        <linearGradient id="tr-floor" x1="0" x2="0" y1="0" y2="1">
          <stop offset="0" stopColor="#5a3a1a" />
          <stop offset="1" stopColor="#0d0a07" />
        </linearGradient>
      </defs>
      <rect width="800" height="600" fill="#1a0e06" />
      <rect width="800" height="600" fill="url(#tr-glow)" />
      <rect y="420" width="800" height="180" fill="url(#tr-floor)" />

      {/* Stone arches around the perimeter */}
      <g stroke="#0d0a07" strokeWidth="3" fill="#3a230f">
        <path d="M0 0 L0 280 Q120 140 240 280 L240 0 Z" />
        <path d="M560 0 L560 280 Q680 140 800 280 L800 0 Z" />
      </g>

      {/* Piles of gold coins */}
      <g stroke="#0d0a07" strokeWidth="2">
        {[
          [120, 480],
          [680, 480],
          [240, 510],
          [560, 510],
        ].map(([cx, cy], i) => (
          <g key={i}>
            <ellipse cx={cx} cy={cy} rx="80" ry="20" fill="#a06028" />
            <ellipse cx={cx} cy={cy - 14} rx="70" ry="16" fill="#c97a2b" />
            <ellipse cx={cx} cy={cy - 26} rx="58" ry="12" fill="#e8c34a" />
            {/* a few discs */}
            {[-30, -10, 10, 30].map((dx) => (
              <circle
                key={dx}
                cx={cx + dx}
                cy={cy - 30 + ((dx + 30) % 20) - 6}
                r="6"
                fill="#e8c34a"
              />
            ))}
          </g>
        ))}
      </g>

      {/* Treasure pillars in background */}
      <g stroke="#0d0a07" strokeWidth="3">
        <rect x="380" y="240" width="40" height="160" fill="#5a3a1a" />
        <rect x="370" y="220" width="60" height="20" fill="#a06028" />
        <rect x="370" y="400" width="60" height="20" fill="#a06028" />
      </g>

      {/* Sparkles */}
      <g fill="#fff">
        {[
          [140, 320],
          [260, 360],
          [400, 200],
          [560, 360],
          [660, 320],
          [200, 420],
          [600, 420],
        ].map(([x, y], i) => (
          <g key={i}>
            <circle cx={x} cy={y} r="3" />
            <line x1={x - 6} y1={y} x2={x + 6} y2={y} stroke="#fff" strokeWidth="1" />
            <line x1={x} y1={y - 6} x2={x} y2={y + 6} stroke="#fff" strokeWidth="1" />
          </g>
        ))}
      </g>

      {/* Pedestal centre — hollow because the chest sits there in-stage */}
      <g stroke="#0d0a07" strokeWidth="3">
        <rect x="320" y="500" width="160" height="20" fill="#5a3a1a" />
        <rect x="340" y="520" width="120" height="60" fill="#3a230f" />
      </g>
    </svg>
  )
}
