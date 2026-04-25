import type { EnemyKind } from '../types'

/** 32×32 stylised silhouette per enemy kind. Drawn around origin (16,16). */
export function EnemySprite({ kind }: { kind: EnemyKind }) {
  switch (kind) {
    case 'dementor':
      return (
        <g>
          {/* Robe wisp */}
          <path
            d="M16 2 Q4 8 4 22 Q4 30 8 30 L10 26 L13 30 L16 26 L19 30 L22 26 L24 30 Q28 30 28 22 Q28 8 16 2 Z"
            fill="#0d0a07"
            stroke="#3a3a3a"
            strokeWidth="0.8"
          />
          {/* Eyes */}
          <ellipse cx="12" cy="14" rx="1.5" ry="2.2" fill="#5af0ff" />
          <ellipse cx="20" cy="14" rx="1.5" ry="2.2" fill="#5af0ff" />
          {/* Hand */}
          <circle cx="22" cy="20" r="1.5" fill="#f1c8a0" stroke="#0d0a07" strokeWidth="0.5" />
        </g>
      )
    case 'basilisk':
      return (
        <g>
          <ellipse cx="16" cy="16" rx="13" ry="10" fill="#1a4a3a" stroke="#0d0a07" strokeWidth="1" />
          <ellipse cx="16" cy="16" rx="13" ry="10" fill="none" stroke="#3a8a5a" strokeWidth="0.6" strokeDasharray="2 2" />
          {/* Slit-pupil eye */}
          <circle cx="16" cy="14" r="5" fill="#e8c34a" />
          <ellipse cx="16" cy="14" rx="0.8" ry="4" fill="#0d0a07" />
          {/* Fangs */}
          <path d="M12 22 L13 26 L14 22 Z" fill="#fff" stroke="#0d0a07" strokeWidth="0.4" />
          <path d="M18 22 L19 26 L20 22 Z" fill="#fff" stroke="#0d0a07" strokeWidth="0.4" />
        </g>
      )
    case 'rival':
      return (
        <g>
          {/* Slytherin-green robe */}
          <circle cx="16" cy="16" r="13" fill="#1a4a3a" stroke="#0d0a07" strokeWidth="1" />
          <path d="M3 16 Q16 -1 29 16 Z" fill="#3a230f" stroke="#0d0a07" strokeWidth="0.6" />
          <circle cx="13" cy="14" r="1.4" fill="#0d0a07" />
          <circle cx="19" cy="14" r="1.4" fill="#0d0a07" />
          <path d="M12 19 Q16 21 20 19" stroke="#0d0a07" strokeWidth="1" fill="none" />
          {/* Slytherin S badge */}
          <circle cx="16" cy="23" r="3" fill="#aac0aa" stroke="#0d0a07" strokeWidth="0.6" />
          <text x="16" y="25" fontFamily="serif" fontSize="4" fontWeight="900" textAnchor="middle" fill="#0d0a07">S</text>
        </g>
      )
    case 'hedge':
      return (
        <g>
          <rect x="2" y="2" width="28" height="28" fill="#1a3a14" stroke="#0d0a07" strokeWidth="1" />
          <circle cx="9" cy="9" r="2.5" fill="#3a6a2a" />
          <circle cx="23" cy="9" r="2.5" fill="#3a6a2a" />
          <circle cx="9" cy="23" r="2.5" fill="#3a6a2a" />
          <circle cx="23" cy="23" r="2.5" fill="#3a6a2a" />
          <circle cx="16" cy="16" r="3" fill="#5a8a3a" />
        </g>
      )
  }
}
