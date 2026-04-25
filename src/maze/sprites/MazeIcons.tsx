import type { PowerKind } from '../types'

/** Pellet — a small bright dot in the centre of a 32x32 tile. */
export function Pellet() {
  return (
    <circle cx="16" cy="16" r="2" fill="#e8c34a" stroke="#0d0a07" strokeWidth="0.5" />
  )
}

/** Power-up sprite, chunky and glowing per kind. */
export function PowerUp({ kind }: { kind: PowerKind }) {
  const colours: Record<PowerKind, { fill: string; glyph: string; text: string }> = {
    cloak: { fill: '#9a9a9a', glyph: 'C', text: '#0d0a07' },
    stupefy: { fill: '#c0c0e8', glyph: 'S', text: '#0d0a07' },
    time: { fill: '#e8c34a', glyph: 'T', text: '#0d0a07' },
    lumos: { fill: '#f8e8c8', glyph: 'L', text: '#0d0a07' },
  }
  const c = colours[kind]
  return (
    <g>
      <circle cx="16" cy="16" r="6" fill={c.fill} stroke="#0d0a07" strokeWidth="1" />
      <text
        x="16"
        y="19"
        fontFamily="serif"
        fontWeight="900"
        fontSize="8"
        textAnchor="middle"
        fill={c.text}
      >
        {c.glyph}
      </text>
      {/* Soft glow */}
      <circle cx="16" cy="16" r="11" fill={c.fill} opacity="0.18" />
    </g>
  )
}

/** Triwizard Cup — gold trophy when active, dull bronze when dormant. */
export function TriwizardCup({ active }: { active: boolean }) {
  const body = active ? '#e8c34a' : '#7a5a28'
  const stroke = '#0d0a07'
  return (
    <g>
      {active ? (
        <circle cx="16" cy="16" r="14" fill="#e8c34a" opacity="0.25" />
      ) : null}
      {/* Bowl */}
      <path d="M8 8 L24 8 L22 18 L10 18 Z" fill={body} stroke={stroke} strokeWidth="1" />
      {/* Handles */}
      <path d="M8 10 Q4 13 8 16" fill="none" stroke={stroke} strokeWidth="1" />
      <path d="M24 10 Q28 13 24 16" fill="none" stroke={stroke} strokeWidth="1" />
      {/* Stem */}
      <rect x="14" y="18" width="4" height="5" fill={body} stroke={stroke} strokeWidth="1" />
      {/* Base */}
      <rect x="11" y="23" width="10" height="3" fill={body} stroke={stroke} strokeWidth="1" />
    </g>
  )
}

/** Hedge tile — a chunky low-poly hedge wall block. */
export function HedgeWall() {
  return (
    <g>
      <rect x="0" y="0" width="32" height="32" fill="#1a3a14" />
      <rect x="0" y="0" width="32" height="32" fill="none" stroke="#0d2008" strokeWidth="1" />
      <circle cx="8" cy="8" r="3.5" fill="#2a5a1e" />
      <circle cx="24" cy="9" r="3" fill="#2a5a1e" />
      <circle cx="9" cy="24" r="3" fill="#2a5a1e" />
      <circle cx="22" cy="22" r="3.5" fill="#2a5a1e" />
      <circle cx="16" cy="16" r="2" fill="#3a7a28" />
    </g>
  )
}
