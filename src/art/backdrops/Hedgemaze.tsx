export function Hedgemaze() {
  return (
    <svg
      viewBox="0 0 800 600"
      preserveAspectRatio="xMidYMid slice"
      className="h-full w-full"
      xmlns="http://www.w3.org/2000/svg"
    >
      <defs>
        <linearGradient id="hm-sky" x1="0" x2="0" y1="0" y2="1">
          <stop offset="0" stopColor="#0a1a14" />
          <stop offset="0.6" stopColor="#0d2008" />
          <stop offset="1" stopColor="#0d0a07" />
        </linearGradient>
      </defs>
      <rect width="800" height="600" fill="url(#hm-sky)" />

      {/* Moon */}
      <circle cx="660" cy="100" r="44" fill="#e8c34a" opacity="0.9" />
      <circle cx="650" cy="96" r="36" fill="#0d2008" />

      {/* Distant hedge silhouettes ringing the play area */}
      <g fill="#0d2008" stroke="#3a6a2a" strokeWidth="1">
        <path d="M0 540 L80 480 L160 540 L240 470 L320 540 L400 460 L480 540 L560 470 L640 540 L720 480 L800 540 L800 600 L0 600 Z" />
        <path d="M0 60 L80 30 L160 60 L240 20 L320 60 L400 12 L480 60 L560 20 L640 60 L720 30 L800 60 L800 0 L0 0 Z" />
      </g>

      {/* Tiny stars */}
      <g fill="#e8c34a" opacity="0.7">
        <circle cx="120" cy="80" r="1.3" />
        <circle cx="280" cy="50" r="1.2" />
        <circle cx="500" cy="60" r="1.4" />
        <circle cx="730" cy="180" r="1.3" />
        <circle cx="40" cy="200" r="1.2" />
      </g>
    </svg>
  )
}
