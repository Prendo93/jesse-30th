export function QuidditchSky() {
  return (
    <svg
      viewBox="0 0 800 600"
      preserveAspectRatio="xMidYMid slice"
      className="h-full w-full"
      xmlns="http://www.w3.org/2000/svg"
    >
      <defs>
        <linearGradient id="qs-sky" x1="0" x2="0" y1="0" y2="1">
          <stop offset="0" stopColor="#2a4a8a" />
          <stop offset="0.5" stopColor="#5a90c0" />
          <stop offset="1" stopColor="#a0c0d8" />
        </linearGradient>
        <linearGradient id="qs-ground" x1="0" x2="0" y1="0" y2="1">
          <stop offset="0" stopColor="#3a6a2a" />
          <stop offset="1" stopColor="#1a3a14" />
        </linearGradient>
      </defs>
      <rect width="800" height="450" fill="url(#qs-sky)" />
      <rect y="450" width="800" height="150" fill="url(#qs-ground)" />

      {/* Clouds */}
      <g fill="#f8e8c8" stroke="#0d0a07" strokeWidth="2">
        <ellipse cx="120" cy="120" rx="60" ry="20" />
        <ellipse cx="100" cy="110" rx="34" ry="14" />
        <ellipse cx="500" cy="80" rx="80" ry="22" />
        <ellipse cx="540" cy="68" rx="40" ry="14" />
        <ellipse cx="700" cy="180" rx="50" ry="18" />
      </g>

      {/* Distant castle */}
      <g stroke="#0d0a07" strokeWidth="3" opacity="0.85">
        <rect x="60" y="360" width="160" height="90" fill="#3a2a4a" />
        <rect x="80" y="300" width="30" height="60" fill="#3a2a4a" />
        <polygon points="76,300 110,260 110,300" fill="#5a3a1a" />
        <rect x="180" y="320" width="30" height="40" fill="#3a2a4a" />
        <polygon points="176,320 210,280 210,320" fill="#5a3a1a" />
      </g>

      {/* Quidditch hoops */}
      <g stroke="#0d0a07" strokeWidth="4">
        <line x1="400" y1="450" x2="400" y2="200" stroke="#3a230f" />
        <circle cx="400" cy="180" r="40" fill="none" stroke="#e8c34a" strokeWidth="8" />
        <circle cx="400" cy="180" r="40" fill="none" stroke="#0d0a07" strokeWidth="2" />

        <line x1="540" y1="450" x2="540" y2="240" stroke="#3a230f" />
        <circle cx="540" cy="220" r="32" fill="none" stroke="#e8c34a" strokeWidth="8" />
        <circle cx="540" cy="220" r="32" fill="none" stroke="#0d0a07" strokeWidth="2" />

        <line x1="280" y1="450" x2="280" y2="240" stroke="#3a230f" />
        <circle cx="280" cy="220" r="32" fill="none" stroke="#e8c34a" strokeWidth="8" />
        <circle cx="280" cy="220" r="32" fill="none" stroke="#0d0a07" strokeWidth="2" />
      </g>

      {/* Crowd hint */}
      <g>
        <rect x="0" y="430" width="120" height="20" fill="#3a230f" stroke="#0d0a07" strokeWidth="2" />
        <rect x="680" y="430" width="120" height="20" fill="#3a230f" stroke="#0d0a07" strokeWidth="2" />
        <g fill="#5a3a1a">
          {[0, 18, 36, 54, 72, 90].map((dx) => (
            <circle key={`l-${dx}`} cx={20 + dx} cy="424" r="6" />
          ))}
          {[0, 18, 36, 54, 72, 90].map((dx) => (
            <circle key={`r-${dx}`} cx={700 + dx} cy="424" r="6" />
          ))}
        </g>
      </g>

      {/* Snitch */}
      <g transform="translate(620 260)">
        <circle cx="0" cy="0" r="6" fill="#e8c34a" stroke="#0d0a07" strokeWidth="2" />
        <path d="M-6 0 Q-30 -10 -28 4" stroke="#fff" strokeWidth="2" fill="none" />
        <path d="M6 0 Q30 -10 28 4" stroke="#fff" strokeWidth="2" fill="none" />
      </g>
    </svg>
  )
}
