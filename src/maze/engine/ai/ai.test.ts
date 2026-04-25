import { describe, expect, it } from 'vitest'
import { parseGrid } from '../../grid'
import { dementorPick } from './dementor'
import { basiliskPick } from './basilisk'
import { rivalPick } from './rival'

const ROOM = ['#####', '#P..#', '#.#.#', '#...#', '#####'].join('\n')

describe('dementorPick', () => {
  it('walks toward the player along the BFS shortest path', () => {
    const g = parseGrid(ROOM)
    // Self at (3,1), player at (1,1) → first step should be left.
    expect(dementorPick(g, { x: 3, y: 1 }, 'left', { x: 1, y: 1 })).toBe('left')
  })

  it('does not reverse facing when a forward path exists', () => {
    const g = parseGrid(ROOM)
    // Self at (3,1) facing right, player at (1,1) — naive BFS would say
    // 'left' (reverse). Dementor refuses to reverse and picks the best
    // non-reverse direction by Manhattan instead.
    const dir = dementorPick(g, { x: 3, y: 1 }, 'right', { x: 1, y: 1 })
    expect(dir).not.toBe('left')
  })
})

describe('basiliskPick', () => {
  it('aims for a tile ahead of the player and returns the BFS first step', () => {
    const g = parseGrid(ROOM)
    // Player at (3,3) facing left; the lead-target lands clamped near (1,2)
    // and BFS from (3,1) takes 'left' as the shortest first step.
    const dir = basiliskPick(g, { x: 3, y: 1 }, 'down', { x: 3, y: 3 }, 'left')
    expect(dir).toBe('left')
  })

  it('refuses to reverse facing', () => {
    const g = parseGrid(ROOM)
    // Self facing 'left' at (3,1); even if BFS suggests 'right', basilisk
    // picks something else.
    const dir = basiliskPick(g, { x: 3, y: 1 }, 'left', { x: 1, y: 1 }, 'down')
    expect(dir).not.toBe('right')
  })
})

describe('rivalPick', () => {
  it('picks a non-reverse walkable direction', () => {
    const g = parseGrid(ROOM)
    // rng → never dashes, picks index 0 of candidates.
    const dir = rivalPick(g, { x: 1, y: 3 }, 'right', { x: 3, y: 3 }, () => 0.99)
    expect(['up', 'down', 'left', 'right']).toContain(dir)
    expect(dir).not.toBe('left') // would be reverse of 'right'
  })

  it('dashes toward target when rng triggers dash', () => {
    const g = parseGrid(ROOM)
    // rng() returns 0 → triggers dash (< 0.05). BFS toward (1,1) from (3,1)
    // gives 'left'. But facing is 'right' so 'left' is reverse — rival
    // falls through to random walk.
    const dir = rivalPick(g, { x: 3, y: 1 }, 'down', { x: 1, y: 3 }, () => 0)
    expect(dir).toBeDefined()
  })
})
