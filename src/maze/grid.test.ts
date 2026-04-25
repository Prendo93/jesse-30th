import { describe, expect, it } from 'vitest'
import {
  isWalkable,
  parseGrid,
  pelletKeys,
  powerKeys,
  stepTile,
  stepWithTunnel,
  tileAt,
} from './grid'
import { MAZE_ASCII } from './constants'
import { TILE } from './types'

const TINY = ['#####', '#P.E#', '#.C.#', 'T...T', '#####'].join('\n')

describe('parseGrid', () => {
  it('parses width / height', () => {
    const g = parseGrid(TINY)
    expect(g.width).toBe(5)
    expect(g.height).toBe(5)
  })

  it('finds the player spawn', () => {
    const g = parseGrid(TINY)
    expect(g.playerSpawn).toEqual({ x: 1, y: 1 })
  })

  it('finds enemy spawns', () => {
    const g = parseGrid(TINY)
    expect(g.enemySpawns).toEqual([{ x: 3, y: 1 }])
  })

  it('finds the cup', () => {
    const g = parseGrid(TINY)
    expect(g.cup).toEqual({ x: 2, y: 2 })
  })

  it('finds tunnel pairs at the row edges', () => {
    const g = parseGrid(TINY)
    expect(g.tunnels).toHaveLength(2)
    expect(g.tunnels.map((t) => t.x)).toEqual([0, 4])
  })

  it('counts pellet dots', () => {
    const g = parseGrid(TINY)
    expect(g.dotCount).toBe(6)
  })

  it('builds power-up entries from c/s/t/l characters', () => {
    const g = parseGrid('####\n#cP#\n####')
    expect(g.powerTiles).toEqual([{ pos: { x: 1, y: 1 }, kind: 'cloak' }])
  })

  it('rejects grids missing a P spawn', () => {
    expect(() => parseGrid('###\n#.#\n###')).toThrow(/player spawn/i)
  })
})

describe('walkability', () => {
  it('treats walls as non-walkable', () => {
    const g = parseGrid(TINY)
    expect(isWalkable(g, { x: 0, y: 0 })).toBe(false)
    expect(isWalkable(g, { x: 1, y: 1 })).toBe(true) // player spawn (PATH)
    expect(isWalkable(g, { x: 1, y: 2 })).toBe(true) // dot
  })

  it('treats out-of-bounds as non-walkable', () => {
    const g = parseGrid(TINY)
    expect(isWalkable(g, { x: -1, y: 0 })).toBe(false)
    expect(isWalkable(g, { x: 100, y: 100 })).toBe(false)
  })
})

describe('tunnel wraparound', () => {
  it('wraps when stepping off the edge from a tunnel tile', () => {
    const g = parseGrid(TINY)
    // Tunnel at (0,3); stepping left lands off-grid → wrap to (4,3).
    expect(stepWithTunnel(g, { x: 0, y: 3 }, 'left')).toEqual({ x: 4, y: 3 })
    // Tunnel at (4,3); stepping right lands off-grid → wrap to (0,3).
    expect(stepWithTunnel(g, { x: 4, y: 3 }, 'right')).toEqual({ x: 0, y: 3 })
  })

  it('does not wrap from non-tunnel tiles', () => {
    const g = parseGrid(TINY)
    expect(stepWithTunnel(g, { x: 1, y: 1 }, 'left')).toEqual({ x: 0, y: 1 })
  })

  it('does not wrap when stepping inward from a tunnel', () => {
    const g = parseGrid(TINY)
    expect(stepWithTunnel(g, { x: 0, y: 3 }, 'right')).toEqual({ x: 1, y: 3 })
  })
})

describe('stepTile', () => {
  it('returns adjacent positions in each direction', () => {
    expect(stepTile({ x: 5, y: 5 }, 'up')).toEqual({ x: 5, y: 4 })
    expect(stepTile({ x: 5, y: 5 }, 'down')).toEqual({ x: 5, y: 6 })
    expect(stepTile({ x: 5, y: 5 }, 'left')).toEqual({ x: 4, y: 5 })
    expect(stepTile({ x: 5, y: 5 }, 'right')).toEqual({ x: 6, y: 5 })
  })
})

describe('full MAZE_ASCII grid', () => {
  it('parses without errors and exposes a player spawn, cup, and enemy spawns', () => {
    const g = parseGrid(MAZE_ASCII)
    expect(g.width).toBe(21)
    expect(g.height).toBe(21)
    expect(g.cup).not.toBeNull()
    expect(g.enemySpawns.length).toBeGreaterThanOrEqual(1)
    expect(g.dotCount).toBeGreaterThan(50)
    expect(g.powerTiles.length).toBe(4)
  })

  it('all power-ups are reachable as path tiles in the grid', () => {
    const g = parseGrid(MAZE_ASCII)
    for (const { pos } of g.powerTiles) {
      expect(isWalkable(g, pos)).toBe(true)
    }
  })

  it('cup is a non-wall tile', () => {
    const g = parseGrid(MAZE_ASCII)
    if (!g.cup) throw new Error('cup missing')
    expect(tileAt(g, g.cup)).toBe(TILE.CUP)
  })

  it('pellet and power key sets sized correctly', () => {
    const g = parseGrid(MAZE_ASCII)
    expect(pelletKeys(g).size).toBe(g.dotCount)
    expect(powerKeys(g).size).toBe(4)
  })
})
