export function CastleExterior() {
  return (
    <svg
      viewBox="0 0 800 600"
      preserveAspectRatio="xMidYMid slice"
      className="h-full w-full"
      xmlns="http://www.w3.org/2000/svg"
    >
      <defs>
        <linearGradient id="cex-sky" x1="0" x2="0" y1="0" y2="1">
          <stop offset="0" stopColor="#1a1f3a" />
          <stop offset="1" stopColor="#3a2a4a" />
        </linearGradient>
        <linearGradient id="cex-ground" x1="0" x2="0" y1="0" y2="1">
          <stop offset="0" stopColor="#3a2a14" />
          <stop offset="1" stopColor="#0d0a07" />
        </linearGradient>
      </defs>
      {/* Sky */}
      <rect width="800" height="420" fill="url(#cex-sky)" />
      {/* Moon */}
      <circle cx="640" cy="120" r="48" fill="#e8c34a" opacity="0.9" />
      <circle cx="624" cy="116" r="40" fill="#1a1f3a" />
      {/* Stars */}
      <g fill="#e8c34a">
        <circle cx="60" cy="80" r="2" />
        <circle cx="180" cy="140" r="1.5" />
        <circle cx="300" cy="60" r="2" />
        <circle cx="500" cy="100" r="1.5" />
        <circle cx="720" cy="220" r="2" />
        <circle cx="80" cy="240" r="1.5" />
      </g>

      {/* Distant mountains */}
      <path d="M0 360 L120 260 L240 320 L360 240 L480 320 L600 260 L800 340 L800 420 L0 420 Z" fill="#1a0e1a" opacity="0.7" />

      {/* Castle silhouette */}
      <g stroke="#0d0a07" strokeWidth="3">
        <rect x="280" y="200" width="240" height="220" fill="#3a2a4a" />
        <rect x="240" y="240" width="60" height="180" fill="#2a1f3a" />
        <rect x="500" y="240" width="60" height="180" fill="#2a1f3a" />
        {/* Towers */}
        <rect x="320" y="120" width="40" height="100" fill="#3a2a4a" />
        <polygon points="316,120 360,80 360,120" fill="#5a3a1a" />
        <polygon points="360,80 364,120 360,120" fill="#3a230f" />
        <rect x="440" y="100" width="44" height="120" fill="#3a2a4a" />
        <polygon points="436,100 484,60 484,100" fill="#5a3a1a" />
        <polygon points="484,60 488,100 484,100" fill="#3a230f" />
        {/* Windows — torchlit */}
        <rect x="338" y="160" width="8" height="14" fill="#e8c34a" />
        <rect x="458" y="140" width="8" height="14" fill="#e8c34a" />
        <rect x="320" y="270" width="10" height="16" fill="#e8c34a" />
        <rect x="370" y="270" width="10" height="16" fill="#e8c34a" />
        <rect x="430" y="270" width="10" height="16" fill="#e8c34a" />
        <rect x="480" y="270" width="10" height="16" fill="#e8c34a" />
        <rect x="320" y="320" width="10" height="16" fill="#e8c34a" />
        <rect x="430" y="320" width="10" height="16" fill="#e8c34a" />
        <rect x="480" y="320" width="10" height="16" fill="#e8c34a" />
        {/* Big door */}
        <path d="M380 340 Q380 300 400 300 Q420 300 420 340 L420 420 L380 420 Z" fill="#3a230f" />
      </g>

      {/* Ground */}
      <rect y="420" width="800" height="180" fill="url(#cex-ground)" />
      {/* Pathway */}
      <polygon points="380,420 420,420 460,600 340,600" fill="#5a3a1a" stroke="#0d0a07" strokeWidth="2" />

      {/* Owl flying */}
      <g transform="translate(560 180)">
        <ellipse cx="0" cy="0" rx="14" ry="10" fill="#5a3a1a" stroke="#0d0a07" strokeWidth="2" />
        <circle cx="0" cy="-6" r="6" fill="#5a3a1a" stroke="#0d0a07" strokeWidth="2" />
        <circle cx="-2" cy="-6" r="1.5" fill="#e8c34a" />
        <circle cx="2" cy="-6" r="1.5" fill="#e8c34a" />
        <path d="M-14 -2 Q-22 -10 -28 -2" stroke="#0d0a07" strokeWidth="2" fill="#3a230f" />
        <path d="M14 -2 Q22 -10 28 -2" stroke="#0d0a07" strokeWidth="2" fill="#3a230f" />
      </g>
    </svg>
  )
}
