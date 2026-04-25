import { describe, expect, it } from 'vitest'
import { parseGrid } from '../grid'
import { bfsDistance, bfsNextStep, manhattan } from './pathfind'

const ROOM = ['#####', '#P..#', '#.#.#', '#...#', '#####'].join('\n')

describe('manhattan', () => {
  it('computes |dx| + |dy|', () => {
    expect(manhattan({ x: 0, y: 0 }, { x: 3, y: 4 })).toBe(7)
    expect(manhattan({ x: 5, y: 5 }, { x: 5, y: 5 })).toBe(0)
  })
})

describe('bfsNextStep', () => {
  it('returns null when from === to', () => {
    const g = parseGrid(ROOM)
    expect(bfsNextStep(g, { x: 1, y: 1 }, { x: 1, y: 1 })).toBeNull()
  })

  it('finds a one-step direction', () => {
    const g = parseGrid(ROOM)
    expect(bfsNextStep(g, { x: 1, y: 1 }, { x: 2, y: 1 })).toBe('right')
    expect(bfsNextStep(g, { x: 1, y: 1 }, { x: 1, y: 2 })).toBe('down')
  })

  it('routes around walls', () => {
    const g = parseGrid(ROOM)
    // Wall at (2,2). From (1,2), direct right is blocked — detour up or down.
    const dir = bfsNextStep(g, { x: 1, y: 2 }, { x: 3, y: 2 })
    expect(dir === 'up' || dir === 'down').toBe(true)
  })

  it('returns null when target is unreachable', () => {
    // Two rooms separated by wall, no path between.
    const g = parseGrid(['####', '#P##', '####', '#..#', '####'].join('\n'))
    expect(bfsNextStep(g, { x: 1, y: 1 }, { x: 1, y: 3 })).toBeNull()
  })
})

describe('bfsDistance', () => {
  it('returns 0 for same tile', () => {
    const g = parseGrid(ROOM)
    expect(bfsDistance(g, { x: 1, y: 1 }, { x: 1, y: 1 })).toBe(0)
  })

  it('returns the shortest hop count', () => {
    const g = parseGrid(ROOM)
    expect(bfsDistance(g, { x: 1, y: 1 }, { x: 1, y: 3 })).toBe(2)
    expect(bfsDistance(g, { x: 1, y: 1 }, { x: 3, y: 1 })).toBe(2)
  })

  it('returns Infinity when unreachable', () => {
    const g = parseGrid(['####', '#P##', '####', '#..#', '####'].join('\n'))
    expect(bfsDistance(g, { x: 1, y: 1 }, { x: 1, y: 3 })).toBe(Infinity)
  })
})

describe('tunnel-aware BFS', () => {
  // Two tunnels at (0,1) and (4,1) on a row whose interior is also walkable.
  const G = ['#####', 'T.P.T', '#####'].join('\n')

  it('uses the tunnel for shortest path', () => {
    const g = parseGrid(G)
    // From (0,1), walking left through the tunnel lands on (4,1) in 1 hop.
    expect(bfsDistance(g, { x: 0, y: 1 }, { x: 4, y: 1 })).toBe(1)
  })
})
