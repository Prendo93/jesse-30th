export type JessePose =
  | 'default'
  | 'reading'
  | 'wand'
  | 'mixing'
  | 'broom'
  | 'crowned'

export type JesseExpression =
  | 'neutral'
  | 'worried'
  | 'sad'
  | 'afraid'
  | 'anxious'
  | 'crying'

export type JesseHouse = 'Hufflepuff' | null

type Props = {
  pose?: JessePose
  expression?: JesseExpression
  chub?: number // 0..5
  house?: JesseHouse
  className?: string
}

/**
 * Jesse — chunky low-poly cartoon character recurring across stages.
 * 240x360 viewbox; styled via the Tailwind/HUD palette.
 */
export function Jesse({
  pose = 'default',
  expression = 'neutral',
  chub = 0,
  house = null,
  className = 'h-72 w-auto',
}: Props) {
  const c = Math.max(0, Math.min(5, chub))
  // Each step of chub widens the body by ~6%.
  const widen = c * 6 // px outward per side on the robe outer
  const robeLeft = 70 - widen
  const robeRight = 170 + widen
  const robeBottomLeft = 60 - widen
  const robeBottomRight = 180 + widen
  // Head softens slightly with chub.
  const headRx = 52 + c * 1.4
  const headRy = 56 + c * 1.2

  return (
    <svg
      viewBox="0 0 240 360"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      data-testid="jesse-character"
      data-pose={pose}
      data-expression={expression}
      data-chub={String(c)}
      data-house={house ?? ''}
      aria-label="Jesse, a Hogwarts first-year"
    >
      {/* Floor shadow grows with chub */}
      <ellipse cx="120" cy="345" rx={64 + c * 4} ry="6" fill="#000" opacity="0.4" />

      {/* Robes (school cloak) */}
      <path
        d={`M${robeLeft} 200 L${robeBottomLeft} 340 L${robeBottomRight} 340 L${robeRight} 200 Q120 ${230 + c * 2} ${robeLeft} 200 Z`}
        fill="#3a1f0d"
        stroke="#0d0a07"
        strokeWidth="3"
      />
      {/* Robe trim — Hufflepuff yellow */}
      <path
        d={`M${robeBottomLeft} 340 L${robeBottomRight} 340 L${robeBottomRight - 5} 326 L${robeBottomLeft + 5} 326 Z`}
        fill="#e8c34a"
      />
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

      {/* House badge on chest */}
      {house === 'Hufflepuff' ? (
        <g data-testid="jesse-house-badge" transform="translate(96 224)">
          <circle cx="0" cy="0" r="11" fill="#e8c34a" stroke="#0d0a07" strokeWidth="2" />
          <text
            x="0"
            y="4"
            fontFamily="serif"
            fontWeight="900"
            fontSize="14"
            textAnchor="middle"
            fill="#0d0a07"
          >
            H
          </text>
        </g>
      ) : null}

      {/* Neck */}
      <rect x="106" y="170" width="28" height="22" fill="#f1c8a0" stroke="#0d0a07" strokeWidth="2" />

      {/* Head */}
      <ellipse cx="120" cy="130" rx={headRx} ry={headRy} fill="#f1c8a0" stroke="#0d0a07" strokeWidth="3" />

      {/* Hair — short brown */}
      <path
        d={`M${120 - headRx + 0} 100 Q120 60 ${120 + headRx + 0} 100 Q${120 + headRx} 120 ${110 + headRx} 122 Q${100 + headRx} 96 120 92 Q${140 - headRx} 96 ${130 - headRx} 122 Q${120 - headRx} 120 ${120 - headRx} 100 Z`}
        fill="#5a3a1a"
        stroke="#0d0a07"
        strokeWidth="3"
      />

      {/* Glasses */}
      <circle cx="100" cy="130" r="12" fill="#fff" stroke="#0d0a07" strokeWidth="3" />
      <circle cx="140" cy="130" r="12" fill="#fff" stroke="#0d0a07" strokeWidth="3" />
      <line x1="112" y1="130" x2="128" y2="130" stroke="#0d0a07" strokeWidth="3" />

      {/* Eyes — vary slightly by expression */}
      {expression === 'crying' ? (
        <>
          <line x1="94" y1="130" x2="106" y2="130" stroke="#1a0e06" strokeWidth="3" />
          <line x1="134" y1="130" x2="146" y2="130" stroke="#1a0e06" strokeWidth="3" />
          {/* Tear streams */}
          <path d="M100 144 Q98 156 100 168" stroke="#5a90c0" strokeWidth="2" fill="none" strokeLinecap="round" />
          <path d="M140 144 Q142 156 140 168" stroke="#5a90c0" strokeWidth="2" fill="none" strokeLinecap="round" />
        </>
      ) : expression === 'afraid' ? (
        <>
          <circle cx="100" cy="128" r="5" fill="#fff" />
          <circle cx="140" cy="128" r="5" fill="#fff" />
          <circle cx="100" cy="130" r="3" fill="#1a0e06" />
          <circle cx="140" cy="130" r="3" fill="#1a0e06" />
        </>
      ) : (
        <>
          <circle cx="100" cy="130" r="4" fill="#1a0e06" />
          <circle cx="140" cy="130" r="4" fill="#1a0e06" />
        </>
      )}

      {/* Eyebrows — dictated by expression */}
      {expression === 'worried' ? (
        <>
          <path d="M88 116 Q100 122 112 116" stroke="#3a230f" strokeWidth="3" fill="none" />
          <path d="M128 116 Q140 122 152 116" stroke="#3a230f" strokeWidth="3" fill="none" />
        </>
      ) : expression === 'sad' ? (
        <>
          <path d="M88 114 L112 120" stroke="#3a230f" strokeWidth="3" />
          <path d="M128 120 L152 114" stroke="#3a230f" strokeWidth="3" />
        </>
      ) : expression === 'anxious' ? (
        <>
          <path d="M88 116 L100 110 L112 116" stroke="#3a230f" strokeWidth="3" fill="none" />
          <path d="M128 116 L140 110 L152 116" stroke="#3a230f" strokeWidth="3" fill="none" />
        </>
      ) : expression === 'afraid' || expression === 'crying' ? (
        <>
          <path d="M88 110 L112 118" stroke="#3a230f" strokeWidth="3" />
          <path d="M128 118 L152 110" stroke="#3a230f" strokeWidth="3" />
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

      {/* Mouth — dictated by expression first, pose second */}
      {expression === 'sad' || expression === 'worried' ? (
        <path d="M104 162 Q120 152 136 162" stroke="#0d0a07" strokeWidth="3" fill="none" strokeLinecap="round" />
      ) : expression === 'afraid' ? (
        <ellipse cx="120" cy="160" rx="6" ry="8" fill="#1a0e06" />
      ) : expression === 'anxious' ? (
        <path d="M108 162 Q114 158 120 162 Q126 158 132 162" stroke="#0d0a07" strokeWidth="3" fill="none" strokeLinecap="round" />
      ) : expression === 'crying' ? (
        <path d="M104 164 Q120 154 136 164" stroke="#0d0a07" strokeWidth="3" fill="none" strokeLinecap="round" />
      ) : pose === 'crowned' ? (
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
          <line x1="180" y1="230" x2="220" y2="170" stroke="#5a3a1a" strokeWidth="6" strokeLinecap="round" />
          <circle cx="220" cy="170" r="8" fill="#e8c34a" stroke="#0d0a07" strokeWidth="2" />
          <circle cx="228" cy="156" r="3" fill="#e8c34a" />
          <circle cx="216" cy="148" r="2" fill="#fff" />
          <circle cx="234" cy="174" r="2" fill="#fff" />
        </g>
      ) : null}

      {pose === 'mixing' ? (
        <g>
          <line x1="170" y1="225" x2="200" y2="270" stroke="#5a3a1a" strokeWidth="6" strokeLinecap="round" />
          <ellipse cx="204" cy="276" rx="10" ry="8" fill="#5a3a1a" stroke="#0d0a07" strokeWidth="2" />
        </g>
      ) : null}

      {pose === 'reading' ? (
        <g>
          <rect x="80" y="220" width="80" height="60" fill="#f8e8c8" stroke="#0d0a07" strokeWidth="3" rx="2" />
          <line x1="92" y1="234" x2="148" y2="234" stroke="#3a230f" strokeWidth="2" />
          <line x1="92" y1="246" x2="140" y2="246" stroke="#3a230f" strokeWidth="2" />
          <line x1="92" y1="258" x2="148" y2="258" stroke="#3a230f" strokeWidth="2" />
          <line x1="92" y1="270" x2="132" y2="270" stroke="#3a230f" strokeWidth="2" />
        </g>
      ) : null}

      {pose === 'broom' ? (
        <g>
          <line x1="40" y1="320" x2="200" y2="280" stroke="#5a3a1a" strokeWidth="8" strokeLinecap="round" />
          <path d="M200 280 L240 270 L240 290 L200 296 Z" fill="#a06a26" stroke="#0d0a07" strokeWidth="2" />
          <line x1="0" y1="200" x2="60" y2="200" stroke="#e8c34a" strokeWidth="3" />
          <line x1="0" y1="240" x2="50" y2="240" stroke="#e8c34a" strokeWidth="3" opacity="0.6" />
        </g>
      ) : null}

      {pose === 'crowned' ? (
        <g>
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
