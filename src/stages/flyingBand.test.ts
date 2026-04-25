import { describe, it, expect } from 'vitest'
import { bandFor } from './flyingBand'

describe('bandFor', () => {
  it('classifies perfect at the inner boundaries', () => {
    expect(bandFor(48)).toBe('perfect')
    expect(bandFor(50)).toBe('perfect')
    expect(bandFor(52)).toBe('perfect')
  })

  it('classifies okay just outside the perfect band', () => {
    expect(bandFor(47)).toBe('okay')
    expect(bandFor(53)).toBe('okay')
    expect(bandFor(35)).toBe('okay')
    expect(bandFor(65)).toBe('okay')
  })

  it('classifies fail outside the okay band', () => {
    expect(bandFor(34)).toBe('fail')
    expect(bandFor(66)).toBe('fail')
    expect(bandFor(0)).toBe('fail')
    expect(bandFor(100)).toBe('fail')
  })
})
