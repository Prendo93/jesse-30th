export function CeremonyHall() {
  return (
    <svg
      viewBox="0 0 800 600"
      preserveAspectRatio="xMidYMid slice"
      className="h-full w-full"
      xmlns="http://www.w3.org/2000/svg"
    >
      <defs>
        <linearGradient id="ch-wall" x1="0" x2="0" y1="0" y2="1">
          <stop offset="0" stopColor="#3a230f" />
          <stop offset="1" stopColor="#5a3a1a" />
        </linearGradient>
        <linearGradient id="ch-floor" x1="0" x2="0" y1="0" y2="1">
          <stop offset="0" stopColor="#5a2a14" />
          <stop offset="1" stopColor="#1a0e06" />
        </linearGradient>
      </defs>
      <rect width="800" height="380" fill="url(#ch-wall)" />
      <rect y="380" width="800" height="220" fill="url(#ch-floor)" />

      {/* Tall pointed-arch alcoves */}
      <g stroke="#0d0a07" strokeWidth="3">
        {[160, 400, 640].map((x) => (
          <g key={x}>
            <path d={`M${x - 60} 380 L${x - 60} 160 Q${x} 60 ${x + 60} 160 L${x + 60} 380 Z`} fill="#1a0e06" />
            <path d={`M${x - 50} 370 L${x - 50} 170 Q${x} 80 ${x + 50} 170 L${x + 50} 370 Z`} fill="#3a230f" />
          </g>
        ))}
      </g>

      {/* House banners */}
      {[
        { x: 100, color: '#7a1a1a', emblem: 'G' }, // Gryffindor
        { x: 280, color: '#1a4a3a', emblem: 'S' }, // Slytherin
        { x: 480, color: '#1a3a6a', emblem: 'R' }, // Ravenclaw
        { x: 680, color: '#a06028', emblem: 'H' }, // Hufflepuff
      ].map(({ x, color, emblem }, i) => (
        <g key={i}>
          <rect x={x - 30} y="60" width="60" height="240" fill={color} stroke="#0d0a07" strokeWidth="3" />
          <polygon points={`${x - 30},300 ${x + 30},300 ${x},340`} fill={color} stroke="#0d0a07" strokeWidth="3" />
          <text
            x={x}
            y="200"
            fontFamily="serif"
            fontWeight="bold"
            fontSize="60"
            textAnchor="middle"
            fill="#e8c34a"
            stroke="#0d0a07"
            strokeWidth="2"
          >
            {emblem}
          </text>
        </g>
      ))}

      {/* Floating candles */}
      <g>
        {[160, 320, 480, 640, 240, 560].map((x, i) => (
          <g key={i}>
            <rect x={x - 3} y={20 + (i % 2) * 14} width="6" height="14" fill="#f8e8c8" />
            <ellipse cx={x} cy={16 + (i % 2) * 14} rx="3" ry="6" fill="#e8c34a" />
            <circle cx={x} cy={10 + (i % 2) * 14} r="14" fill="#e8c34a" opacity="0.15" />
          </g>
        ))}
      </g>

      {/* Stage / dais */}
      <g stroke="#0d0a07" strokeWidth="3">
        <rect x="200" y="400" width="400" height="40" fill="#3a230f" />
        <rect x="220" y="440" width="360" height="20" fill="#1a0e06" />
      </g>

      {/* Carpet runner */}
      <polygon points="320,440 480,440 540,600 260,600" fill="#7a1a1a" stroke="#0d0a07" strokeWidth="3" />
    </svg>
  )
}
