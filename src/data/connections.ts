export type CategoryKey = 'blackFamily' | 'flowers' | 'astronomy' | 'staff'

export type Category = {
  key: CategoryKey
  label: string
  words: readonly string[]
  /** CSS colour used for the solved row. */
  color: string
}

export const CONNECTIONS_CATEGORIES: readonly Category[] = [
  {
    key: 'blackFamily',
    label: 'Members of the Black Family',
    words: ['SIRIUS', 'BELLATRIX', 'ANDROMEDA', 'REGULUS'],
    color: '#7a1a1a',
  },
  {
    key: 'flowers',
    label: 'Flower-named characters',
    words: ['LILY', 'NARCISSA', 'PETUNIA', 'POPPY'],
    color: '#a060c0',
  },
  {
    key: 'astronomy',
    label: 'Astronomy first names (non-Black)',
    words: ['DRACO', 'SCORPIUS', 'LUNA', 'MEROPE'],
    color: '#3a4a8a',
  },
  {
    key: 'staff',
    label: 'Hogwarts staff with Greco-Roman names',
    words: ['MINERVA', 'POMONA', 'ARGUS', 'AURORA'],
    color: '#a06028',
  },
] as const

export const ALL_WORDS: readonly string[] = CONNECTIONS_CATEGORIES.flatMap(
  (c) => [...c.words],
)

export const MAX_MISTAKES = 4

/**
 * Returns the category key if the four words exactly match one of the
 * categories, otherwise null.
 */
export function categoryFor(words: readonly string[]): CategoryKey | null {
  if (words.length !== 4) return null
  const set = new Set(words)
  if (set.size !== 4) return null
  for (const cat of CONNECTIONS_CATEGORIES) {
    if (cat.words.every((w) => set.has(w))) return cat.key
  }
  return null
}

/**
 * "One away" hint: if 3 of the 4 picked words belong to a single
 * category, return that category key; otherwise null. Useful for the
 * "One away…" beat after a wrong submission.
 */
export function oneAwayCategory(
  words: readonly string[],
): CategoryKey | null {
  if (words.length !== 4) return null
  for (const cat of CONNECTIONS_CATEGORIES) {
    const overlap = words.filter((w) => cat.words.includes(w)).length
    if (overlap === 3) return cat.key
  }
  return null
}

export function categoryByKey(key: CategoryKey): Category {
  const cat = CONNECTIONS_CATEGORIES.find((c) => c.key === key)
  if (!cat) throw new Error(`Unknown category ${key}`)
  return cat
}
