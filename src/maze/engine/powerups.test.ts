import { describe, expect, it } from 'vitest'
import { parseGrid } from '../grid'
import { createInitialState, step } from './step'
import { POWER_DURATION_MS } from '../constants'
import { tileKey } from '../types'

const SMALL = [
  '#######',
  '#P.c..#',
  '#.###.#',
  '#.#C#.#',
  '#.###.#',
  '#....E#',
  '#######',
].join('\n')

const idle = { intent: null }
const right = { intent: 'right' as const }

describe('power-ups', () => {
  it('walking onto a power-up tile activates the matching effect', () => {
    const grid = parseGrid(SMALL)
    let s = createInitialState(grid)
    // Cloak power tile is at (3,1). Walk right twice from (1,1) past pellets.
    for (let i = 0; i < 4; i += 1) s = step(s, 130, right)
    expect(s.activePowers.some((p) => p.kind === 'cloak')).toBe(true)
    expect(s.powers.has(tileKey({ x: 3, y: 1 }))).toBe(false)
  })

  it('cloak prevents enemy collisions from killing the player', () => {
    const grid = parseGrid(SMALL)
    let s = createInitialState(grid)
    s = {
      ...s,
      activePowers: [{ kind: 'cloak', remainingMs: 1000 }],
      enemies: [
        {
          ...s.enemies[0],
          tile: s.player.tile,
          sub: 0,
        },
      ],
    }
    s = step(s, 16, idle)
    expect(s.phase).toBe('play')
    expect(s.deaths).toBe(0)
  })

  it('active powers tick down and expire', () => {
    const grid = parseGrid(SMALL)
    let s = createInitialState(grid)
    s = {
      ...s,
      activePowers: [{ kind: 'time', remainingMs: 200 }],
    }
    s = step(s, 100, idle)
    expect(s.activePowers[0].remainingMs).toBe(100)
    s = step(s, 200, idle)
    expect(s.activePowers).toHaveLength(0)
  })

  it('a fresh pickup is near the configured POWER_DURATION_MS', () => {
    const grid = parseGrid(SMALL)
    let s = createInitialState(grid)
    for (let i = 0; i < 4; i += 1) s = step(s, 130, right)
    const cloak = s.activePowers.find((p) => p.kind === 'cloak')
    // Picked up partway through the loop so it's already ticked down a bit.
    expect(cloak?.remainingMs).toBeGreaterThan(POWER_DURATION_MS.cloak - 600)
    expect(cloak?.remainingMs).toBeLessThanOrEqual(POWER_DURATION_MS.cloak)
  })
})
