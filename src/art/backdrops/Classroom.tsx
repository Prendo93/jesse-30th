export function Classroom() {
  return (
    <svg
      viewBox="0 0 800 600"
      preserveAspectRatio="xMidYMid slice"
      className="h-full w-full"
      xmlns="http://www.w3.org/2000/svg"
    >
      <defs>
        <linearGradient id="cl-wall" x1="0" x2="0" y1="0" y2="1">
          <stop offset="0" stopColor="#5a3a1a" />
          <stop offset="1" stopColor="#3a230f" />
        </linearGradient>
        <linearGradient id="cl-floor" x1="0" x2="0" y1="0" y2="1">
          <stop offset="0" stopColor="#7a5028" />
          <stop offset="1" stopColor="#3a230f" />
        </linearGradient>
      </defs>
      <rect width="800" height="380" fill="url(#cl-wall)" />
      <rect y="380" width="800" height="220" fill="url(#cl-floor)" />

      {/* Wood grain on floor */}
      <g stroke="#3a230f" strokeWidth="1" opacity="0.6">
        {Array.from({ length: 8 }).map((_, i) => (
          <line key={i} x1="0" y1={400 + i * 28} x2="800" y2={400 + i * 28} />
        ))}
      </g>

      {/* Tall windows with afternoon light */}
      <g stroke="#0d0a07" strokeWidth="3">
        {[200, 600].map((x) => (
          <g key={x}>
            <rect x={x - 60} y="60" width="120" height="220" fill="#a07a3a" />
            <line x1={x} y1="60" x2={x} y2="280" stroke="#3a230f" strokeWidth="3" />
            <line x1={x - 60} y1="170" x2={x + 60} y2="170" stroke="#3a230f" strokeWidth="3" />
            <rect x={x - 64} y="50" width="128" height="14" fill="#5a3a1a" />
            {/* Light shaft */}
            <polygon
              points={`${x - 60},280 ${x + 60},280 ${x + 110},420 ${x - 110},420`}
              fill="#e8c34a"
              opacity="0.18"
            />
          </g>
        ))}
      </g>

      {/* Bookshelves */}
      <g stroke="#0d0a07" strokeWidth="3">
        <rect x="20" y="180" width="80" height="220" fill="#3a230f" />
        {[200, 240, 280, 320, 360].map((y) => (
          <g key={y}>
            <line x1="20" y1={y} x2="100" y2={y} stroke="#0d0a07" strokeWidth="2" />
            <rect x="28" y={y - 24} width="8" height="22" fill="#7a1a1a" />
            <rect x="40" y={y - 28} width="8" height="26" fill="#3a4a8a" />
            <rect x="52" y={y - 22} width="8" height="20" fill="#5a3a1a" />
            <rect x="64" y={y - 26} width="8" height="24" fill="#a06028" />
            <rect x="76" y={y - 20} width="8" height="18" fill="#3a4a3a" />
          </g>
        ))}
        <rect x="700" y="180" width="80" height="220" fill="#3a230f" />
        {[200, 240, 280, 320, 360].map((y) => (
          <g key={`r-${y}`}>
            <line x1="700" y1={y} x2="780" y2={y} stroke="#0d0a07" strokeWidth="2" />
            <rect x="708" y={y - 26} width="8" height="24" fill="#3a4a8a" />
            <rect x="720" y={y - 22} width="8" height="20" fill="#7a1a1a" />
            <rect x="732" y={y - 28} width="8" height="26" fill="#a06028" />
            <rect x="744" y={y - 24} width="8" height="22" fill="#5a3a1a" />
            <rect x="756" y={y - 20} width="8" height="18" fill="#3a4a3a" />
          </g>
        ))}
      </g>

      {/* Floating feathers (Charms) */}
      <g>
        {[
          [340, 180],
          [430, 240],
          [510, 200],
          [380, 310],
          [470, 330],
        ].map(([x, y], i) => (
          <g key={i} transform={`translate(${x} ${y}) rotate(${(i * 35) % 90})`}>
            <ellipse cx="0" cy="0" rx="14" ry="3" fill="#f8e8c8" stroke="#0d0a07" strokeWidth="1" />
            <line x1="-14" y1="0" x2="14" y2="0" stroke="#3a230f" strokeWidth="1" />
          </g>
        ))}
      </g>

      {/* Chalkboard */}
      <g transform="translate(400 200)">
        <rect x="-100" y="-60" width="200" height="120" fill="#1a2a14" stroke="#5a3a1a" strokeWidth="6" />
        <text
          x="0"
          y="-12"
          fontFamily="serif"
          fontSize="22"
          textAnchor="middle"
          fill="#f8e8c8"
        >
          Wingardium
        </text>
        <text
          x="0"
          y="20"
          fontFamily="serif"
          fontSize="22"
          textAnchor="middle"
          fill="#f8e8c8"
        >
          Leviosa
        </text>
      </g>
    </svg>
  )
}
