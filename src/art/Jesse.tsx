export type JessePose =
  | 'default'
  | 'reading'
  | 'wand'
  | 'mixing'
  | 'broom'
  | 'crowned'

type Props = {
  pose?: JessePose
  className?: string
}

/**
 * Jesse — chunky low-poly cartoon character recurring across stages.
 * Designed as a 240x360 viewbox; styled via the Tailwind/HUD palette.
 */
export function Jesse({ pose = 'default', className = 'h-72 w-auto' }: Props) {
  return (
    <svg
      viewBox="0 0 240 360"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      data-testid="jesse-character"
      data-pose={pose}
      aria-label="Jesse, a Hogwarts first-year"
    >
      {/* Floor shadow */}
      <ellipse cx="120" cy="345" rx="64" ry="6" fill="#000" opacity="0.4" />

      {/* Robes (school cloak) */}
      <path
        d="M70 200 L60 340 L180 340 L170 200 Q120 230 70 200 Z"
        fill="#3a1f0d"
        stroke="#0d0a07"
        strokeWidth="3"
      />
      {/* Robe trim — Hufflepuff yellow */}
      <path d="M60 340 L180 340 L175 326 L65 326 Z" fill="#e8c34a" />
      <path d="M120 200 L120 340" stroke="#1a0e06" strokeWidth="2" opacity="0.5" />

      {/* Tie — Hufflepuff yellow & black */}
      <path
        d="M110 200 L130 200 L128 240 L120 252 L112 240 Z"
        fill="#e8c34a"
        stroke="#0d0a07"
        strokeWidth="2"
      />
      <path d="M114 210 L126 210" stroke="#0d0a07" strokeWidth="2" />
      <path d="M114 220 L126 220" stroke="#0d0a07" strokeWidth="2" />

      {/* Neck */}
      <rect x="106" y="170" width="28" height="22" fill="#f1c8a0" stroke="#0d0a07" strokeWidth="2" />

      {/* Head */}
      <ellipse cx="120" cy="130" rx="52" ry="56" fill="#f1c8a0" stroke="#0d0a07" strokeWidth="3" />

      {/* Hair — short brown */}
      <path
        d="M70 100 Q120 60 170 100 Q170 120 160 122 Q150 96 120 92 Q92 96 80 122 Q70 120 70 100 Z"
        fill="#5a3a1a"
        stroke="#0d0a07"
        strokeWidth="3"
      />
      <path d="M104 96 L98 116 L114 110 Z" fill="#3a230f" />
      <path d="M132 94 L142 112 L126 108 Z" fill="#3a230f" />

      {/* Glasses */}
      <circle cx="100" cy="130" r="12" fill="#fff" stroke="#0d0a07" strokeWidth="3" />
      <circle cx="140" cy="130" r="12" fill="#fff" stroke="#0d0a07" strokeWidth="3" />
      <line x1="112" y1="130" x2="128" y2="130" stroke="#0d0a07" strokeWidth="3" />
      {/* Eyes */}
      <circle cx="100" cy="130" r="4" fill="#1a0e06" />
      <circle cx="140" cy="130" r="4" fill="#1a0e06" />

      {/* Eyebrows — pose-specific */}
      {pose === 'reading' || pose === 'mixing' ? (
        <>
          <path d="M88 116 L112 116" stroke="#3a230f" strokeWidth="3" />
          <path d="M128 116 L152 116" stroke="#3a230f" strokeWidth="3" />
        </>
      ) : pose === 'crowned' ? (
        <>
          <path d="M88 116 Q100 110 112 116" stroke="#3a230f" strokeWidth="3" fill="none" />
          <path d="M128 116 Q140 110 152 116" stroke="#3a230f" strokeWidth="3" fill="none" />
        </>
      ) : (
        <>
          <path d="M88 118 L112 114" stroke="#3a230f" strokeWidth="3" />
          <path d="M128 114 L152 118" stroke="#3a230f" strokeWidth="3" />
        </>
      )}

      {/* Mouth */}
      {pose === 'crowned' ? (
        <path d="M104 158 Q120 174 136 158" stroke="#0d0a07" strokeWidth="3" fill="none" strokeLinecap="round" />
      ) : pose === 'broom' ? (
        <path d="M108 158 Q120 162 132 158" stroke="#0d0a07" strokeWidth="3" fill="none" strokeLinecap="round" />
      ) : pose === 'mixing' ? (
        <path d="M108 158 L132 158" stroke="#0d0a07" strokeWidth="3" strokeLinecap="round" />
      ) : (
        <path d="M108 158 Q120 166 132 158" stroke="#0d0a07" strokeWidth="3" fill="none" strokeLinecap="round" />
      )}

      {/* Lightning scar — always */}
      <path d="M88 92 L82 102 L86 102 L80 114" stroke="#c97a2b" strokeWidth="3" fill="none" strokeLinecap="round" />

      {/* Pose-specific overlays */}
      {pose === 'wand' ? (
        <g>
          {/* Right hand holding wand */}
          <line x1="180" y1="230" x2="220" y2="170" stroke="#5a3a1a" strokeWidth="6" strokeLinecap="round" />
          <circle cx="220" cy="170" r="8" fill="#e8c34a" stroke="#0d0a07" strokeWidth="2" />
          {/* Sparkles */}
          <circle cx="228" cy="156" r="3" fill="#e8c34a" />
          <circle cx="216" cy="148" r="2" fill="#fff" />
          <circle cx="234" cy="174" r="2" fill="#fff" />
        </g>
      ) : null}

      {pose === 'mixing' ? (
        <g>
          {/* Wooden spoon */}
          <line x1="170" y1="225" x2="200" y2="270" stroke="#5a3a1a" strokeWidth="6" strokeLinecap="round" />
          <ellipse cx="204" cy="276" rx="10" ry="8" fill="#5a3a1a" stroke="#0d0a07" strokeWidth="2" />
        </g>
      ) : null}

      {pose === 'reading' ? (
        <g>
          {/* Letter / parchment in hands */}
          <rect x="80" y="220" width="80" height="60" fill="#f8e8c8" stroke="#0d0a07" strokeWidth="3" rx="2" />
          <line x1="92" y1="234" x2="148" y2="234" stroke="#3a230f" strokeWidth="2" />
          <line x1="92" y1="246" x2="140" y2="246" stroke="#3a230f" strokeWidth="2" />
          <line x1="92" y1="258" x2="148" y2="258" stroke="#3a230f" strokeWidth="2" />
          <line x1="92" y1="270" x2="132" y2="270" stroke="#3a230f" strokeWidth="2" />
        </g>
      ) : null}

      {pose === 'broom' ? (
        <g>
          {/* Broom */}
          <line x1="40" y1="320" x2="200" y2="280" stroke="#5a3a1a" strokeWidth="8" strokeLinecap="round" />
          <path d="M200 280 L240 270 L240 290 L200 296 Z" fill="#a06a26" stroke="#0d0a07" strokeWidth="2" />
          {/* Speed lines */}
          <line x1="0" y1="200" x2="60" y2="200" stroke="#e8c34a" strokeWidth="3" />
          <line x1="0" y1="240" x2="50" y2="240" stroke="#e8c34a" strokeWidth="3" opacity="0.6" />
        </g>
      ) : null}

      {pose === 'crowned' ? (
        <g>
          {/* Tiny crown */}
          <path
            d="M88 70 L100 86 L120 64 L140 86 L152 70 L150 92 L90 92 Z"
            fill="#e8c34a"
            stroke="#0d0a07"
            strokeWidth="3"
          />
          <circle cx="120" cy="78" r="4" fill="#c97a2b" />
        </g>
      ) : null}
    </svg>
  )
}
