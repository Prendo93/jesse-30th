import type { Direction } from '../types'

type Props = {
  facing: Direction
  expression?: 'neutral' | 'afraid'
}

/**
 * Top-down chunky Jesse. 32×32, drawn around origin (16,16). Robe is
 * Hufflepuff black-and-yellow; a yellow H badge sits where the chest
 * faces the camera.
 */
export function JessePacman({ facing, expression = 'neutral' }: Props) {
  // Eyes / scar shift with facing
  const eyes: Record<Direction, { l: [number, number]; r: [number, number] }> = {
    up: { l: [12, 12], r: [20, 12] },
    down: { l: [12, 18], r: [20, 18] },
    left: { l: [10, 14], r: [16, 14] },
    right: { l: [16, 14], r: [22, 14] },
  }
  const e = eyes[facing]

  return (
    <g>
      {/* Robe / body */}
      <circle cx="16" cy="16" r="13" fill="#3a1f0d" stroke="#0d0a07" strokeWidth="1.5" />
      {/* Hufflepuff trim */}
      <circle cx="16" cy="16" r="13" fill="none" stroke="#e8c34a" strokeWidth="1.5" strokeDasharray="2 2" />
      {/* Hair / cap */}
      <path d="M3 16 Q16 -2 29 16 Z" fill="#5a3a1a" stroke="#0d0a07" strokeWidth="1" />
      {/* Eyes */}
      <circle cx={e.l[0]} cy={e.l[1]} r={expression === 'afraid' ? 2.4 : 1.6} fill="#fff" stroke="#0d0a07" strokeWidth="0.8" />
      <circle cx={e.r[0]} cy={e.r[1]} r={expression === 'afraid' ? 2.4 : 1.6} fill="#fff" stroke="#0d0a07" strokeWidth="0.8" />
      <circle cx={e.l[0]} cy={e.l[1]} r="0.9" fill="#0d0a07" />
      <circle cx={e.r[0]} cy={e.r[1]} r="0.9" fill="#0d0a07" />
      {/* Hufflepuff H badge */}
      <circle cx="16" cy="22" r="3" fill="#e8c34a" stroke="#0d0a07" strokeWidth="0.8" />
      <text x="16" y="24" fontFamily="serif" fontSize="4" fontWeight="900" textAnchor="middle" fill="#0d0a07">H</text>
    </g>
  )
}
