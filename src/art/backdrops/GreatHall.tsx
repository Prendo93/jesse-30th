export function GreatHall() {
  return (
    <svg
      viewBox="0 0 800 600"
      preserveAspectRatio="xMidYMid slice"
      className="h-full w-full"
      xmlns="http://www.w3.org/2000/svg"
    >
      <defs>
        <linearGradient id="gh-floor" x1="0" x2="0" y1="0" y2="1">
          <stop offset="0" stopColor="#5a2a14" />
          <stop offset="1" stopColor="#1a0e06" />
        </linearGradient>
        <linearGradient id="gh-wall" x1="0" x2="0" y1="0" y2="1">
          <stop offset="0" stopColor="#3a2a14" />
          <stop offset="1" stopColor="#5a3a1a" />
        </linearGradient>
      </defs>
      {/* Walls */}
      <rect width="800" height="380" fill="url(#gh-wall)" />
      {/* Stone-block hint */}
      <g stroke="#0d0a07" strokeWidth="1" opacity="0.4">
        {Array.from({ length: 8 }).map((_, i) => (
          <line key={`h-${i}`} x1="0" y1={50 + i * 40} x2="800" y2={50 + i * 40} />
        ))}
        {Array.from({ length: 16 }).map((_, i) => (
          <line key={`v-${i}`} x1={i * 50} y1="0" x2={i * 50} y2="380" />
        ))}
      </g>

      {/* Arched windows */}
      <g stroke="#0d0a07" strokeWidth="3">
        {[140, 400, 660].map((x) => (
          <g key={x}>
            <path d={`M${x - 28} 100 L${x - 28} 230 Q${x} 200 ${x + 28} 230 L${x + 28} 100 Q${x} 70 ${x - 28} 100 Z`} fill="#1a1f3a" />
            <line x1={x} y1="100" x2={x} y2="230" stroke="#0d0a07" strokeWidth="2" />
            <line x1={x - 28} y1="160" x2={x + 28} y2="160" stroke="#0d0a07" strokeWidth="2" />
          </g>
        ))}
      </g>

      {/* Floating candles */}
      <g>
        {[
          [180, 60],
          [320, 40],
          [460, 50],
          [600, 30],
          [240, 120],
          [520, 110],
        ].map(([x, y]) => (
          <g key={`${x}-${y}`}>
            <rect x={x - 3} y={y} width="6" height="14" fill="#f8e8c8" stroke="#0d0a07" strokeWidth="1" />
            <ellipse cx={x} cy={y - 4} rx="3" ry="6" fill="#e8c34a" />
            <circle cx={x} cy={y - 16} r="14" fill="#e8c34a" opacity="0.15" />
          </g>
        ))}
      </g>

      {/* Floor */}
      <rect y="380" width="800" height="220" fill="url(#gh-floor)" />
      {/* Carpet runner */}
      <polygon points="320,380 480,380 540,600 260,600" fill="#7a1a1a" stroke="#0d0a07" strokeWidth="3" />
      <polygon points="340,400 460,400 500,580 300,580" fill="#a02828" />

      {/* Long tables flanking */}
      <g stroke="#0d0a07" strokeWidth="3">
        <rect x="40" y="420" width="240" height="20" fill="#5a3a1a" />
        <rect x="40" y="440" width="240" height="80" fill="#3a230f" />
        <rect x="520" y="420" width="240" height="20" fill="#5a3a1a" />
        <rect x="520" y="440" width="240" height="80" fill="#3a230f" />
      </g>

      {/* Sorting Hat on a stool, centred */}
      <g transform="translate(400 460)">
        <rect x="-30" y="20" width="60" height="40" fill="#5a3a1a" stroke="#0d0a07" strokeWidth="2" />
        <path
          d="M-40 20 Q0 -80 40 20 Z"
          fill="#3a230f"
          stroke="#0d0a07"
          strokeWidth="3"
        />
        <path d="M-20 0 Q0 -10 20 -4" stroke="#0d0a07" strokeWidth="2" fill="none" />
      </g>
    </svg>
  )
}
