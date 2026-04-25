import { describe, expect, it } from 'vitest'
import {
  ALL_WORDS,
  categoryFor,
  CONNECTIONS_CATEGORIES,
  MAX_MISTAKES,
  oneAwayCategory,
} from './connections'

describe('connections data', () => {
  it('has 4 categories of 4 words each (16 total)', () => {
    expect(CONNECTIONS_CATEGORIES).toHaveLength(4)
    for (const cat of CONNECTIONS_CATEGORIES) {
      expect(cat.words).toHaveLength(4)
    }
    expect(ALL_WORDS).toHaveLength(16)
  })

  it('all words are unique across categories', () => {
    const set = new Set(ALL_WORDS)
    expect(set.size).toBe(16)
  })

  it('MAX_MISTAKES is 4 (NYT default)', () => {
    expect(MAX_MISTAKES).toBe(4)
  })
})

describe('categoryFor', () => {
  it('matches an exact category', () => {
    expect(categoryFor(['SIRIUS', 'BELLATRIX', 'ANDROMEDA', 'REGULUS'])).toBe(
      'blackFamily',
    )
    expect(categoryFor(['LILY', 'NARCISSA', 'PETUNIA', 'POPPY'])).toBe(
      'flowers',
    )
    expect(categoryFor(['DRACO', 'SCORPIUS', 'LUNA', 'MEROPE'])).toBe(
      'astronomy',
    )
    expect(categoryFor(['MINERVA', 'POMONA', 'ARGUS', 'AURORA'])).toBe('staff')
  })

  it('matches regardless of order', () => {
    expect(categoryFor(['REGULUS', 'BELLATRIX', 'SIRIUS', 'ANDROMEDA'])).toBe(
      'blackFamily',
    )
  })

  it('rejects mixed sets', () => {
    expect(categoryFor(['SIRIUS', 'LILY', 'DRACO', 'MINERVA'])).toBeNull()
  })

  it('rejects sets of the wrong length', () => {
    expect(categoryFor(['SIRIUS', 'BELLATRIX', 'ANDROMEDA'])).toBeNull()
    expect(
      categoryFor(['SIRIUS', 'BELLATRIX', 'ANDROMEDA', 'REGULUS', 'LILY']),
    ).toBeNull()
  })

  it('rejects sets with duplicates', () => {
    expect(categoryFor(['SIRIUS', 'SIRIUS', 'BELLATRIX', 'ANDROMEDA'])).toBeNull()
  })
})

describe('oneAwayCategory', () => {
  it('detects three-of-four overlap with a single category', () => {
    // 3 Black family + 1 flower-named = "one away" from black family.
    expect(
      oneAwayCategory(['SIRIUS', 'BELLATRIX', 'ANDROMEDA', 'LILY']),
    ).toBe('blackFamily')
  })

  it('returns null when the set is correct', () => {
    expect(
      oneAwayCategory(['SIRIUS', 'BELLATRIX', 'ANDROMEDA', 'REGULUS']),
    ).toBeNull()
  })

  it('returns null when more than one swap away', () => {
    expect(
      oneAwayCategory(['SIRIUS', 'BELLATRIX', 'LILY', 'DRACO']),
    ).toBeNull()
  })
})
