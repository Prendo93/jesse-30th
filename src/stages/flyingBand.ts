export type Band = 'perfect' | 'okay' | 'fail'

export function bandFor(position: number): Band {
  if (position >= 48 && position <= 52) return 'perfect'
  if (position >= 35 && position <= 65) return 'okay'
  return 'fail'
}
