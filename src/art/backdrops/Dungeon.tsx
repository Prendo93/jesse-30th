export function Dungeon() {
  return (
    <svg
      viewBox="0 0 800 600"
      preserveAspectRatio="xMidYMid slice"
      className="h-full w-full"
      xmlns="http://www.w3.org/2000/svg"
    >
      <defs>
        <radialGradient id="dg-glow" cx="0.5" cy="0.6" r="0.7">
          <stop offset="0" stopColor="#3a2a14" />
          <stop offset="1" stopColor="#0d0a07" />
        </radialGradient>
      </defs>
      <rect width="800" height="600" fill="url(#dg-glow)" />

      {/* Vault arches receding */}
      <g stroke="#0d0a07" strokeWidth="3" fill="#2a1f0d">
        <path d="M0 0 L0 200 Q400 -80 800 200 L800 0 Z" />
        <path d="M0 200 Q400 80 800 200" stroke="#0d0a07" strokeWidth="3" fill="none" />
        <path d="M40 600 L40 220 Q400 100 760 220 L760 600 Z" fill="#1a0e06" />
      </g>

      {/* Stone blocks */}
      <g stroke="#0d0a07" strokeWidth="1" opacity="0.5">
        {Array.from({ length: 12 }).map((_, i) => (
          <line key={`v-${i}`} x1={40 + i * 60} y1="220" x2={40 + i * 60} y2="600" />
        ))}
      </g>

      {/* Side cauldrons */}
      <g>
        <ellipse cx="120" cy="500" rx="58" ry="14" fill="#0d0a07" />
        <path d="M70 490 Q120 540 170 490 Q170 470 130 460 Q110 460 70 470 Z" fill="#3a3a3a" stroke="#0d0a07" strokeWidth="3" />
        {/* Bubble glow */}
        <ellipse cx="120" cy="468" rx="40" ry="6" fill="#5af0a0" opacity="0.6" />
        <circle cx="105" cy="464" r="4" fill="#5af0a0" />
        <circle cx="130" cy="462" r="3" fill="#5af0a0" />
      </g>
      <g>
        <ellipse cx="680" cy="510" rx="58" ry="14" fill="#0d0a07" />
        <path d="M630 500 Q680 550 730 500 Q730 480 690 470 Q670 470 630 480 Z" fill="#3a3a3a" stroke="#0d0a07" strokeWidth="3" />
        <ellipse cx="680" cy="478" rx="40" ry="6" fill="#c97a2b" opacity="0.6" />
        <circle cx="695" cy="474" r="3" fill="#c97a2b" />
      </g>

      {/* Wall torches */}
      {[200, 600].map((x) => (
        <g key={x}>
          <rect x={x - 4} y="240" width="8" height="60" fill="#3a230f" stroke="#0d0a07" strokeWidth="2" />
          <path d={`M${x - 14} 232 Q${x} 200 ${x + 14} 232 Q${x} 246 ${x - 14} 232 Z`} fill="#e8c34a" />
          <circle cx={x} cy="220" r="40" fill="#e8c34a" opacity="0.15" />
        </g>
      ))}

      {/* Shelf with bottles */}
      <g transform="translate(340 280)" stroke="#0d0a07" strokeWidth="2">
        <rect x="-60" y="0" width="120" height="6" fill="#5a3a1a" />
        <g>
          <rect x="-50" y="-20" width="14" height="20" fill="#5af0a0" />
          <rect x="-30" y="-26" width="14" height="26" fill="#c97a2b" />
          <rect x="-10" y="-18" width="14" height="18" fill="#a060c0" />
          <rect x="10" y="-22" width="14" height="22" fill="#e8c34a" />
          <rect x="30" y="-16" width="14" height="16" fill="#5a90c0" />
        </g>
      </g>
    </svg>
  )
}
