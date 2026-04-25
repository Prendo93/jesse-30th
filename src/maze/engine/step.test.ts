import { describe, expect, it } from 'vitest'
import { parseGrid } from '../grid'
import { createInitialState, step } from './step'
import {
  CUP_ACTIVATION_MS,
  DEATH_FADE_MS,
  PLAYER_TILE_MS,
  SURVIVE_DURATION_MS,
} from '../constants'
import type { GameState } from '../types'

const SMALL = [
  '#######',
  '#P....#',
  '#.###.#',
  '#.#C#.#',
  '#.###.#',
  '#....E#',
  '#######',
].join('\n')

const idle = { intent: null }
const right = { intent: 'right' as const }

const fast = (state: GameState, ms: number) =>
  step(state, ms, idle)

describe('step reducer', () => {
  it('starts at the player spawn with no pellets eaten', () => {
    const grid = parseGrid(SMALL)
    const s = createInitialState(grid)
    expect(s.player.tile).toEqual(grid.playerSpawn)
    expect(s.pelletsCollected).toBe(0)
    expect(s.phase).toBe('play')
  })

  it('moves the player one tile after PLAYER_TILE_MS with intent=right', () => {
    const grid = parseGrid(SMALL)
    let s = createInitialState(grid)
    s = step(s, PLAYER_TILE_MS, right)
    expect(s.player.tile).toEqual({ x: 2, y: 1 })
  })

  it('eats a pellet on tile arrival', () => {
    const grid = parseGrid(SMALL)
    let s = createInitialState(grid)
    expect(s.pelletsCollected).toBe(0)
    s = step(s, PLAYER_TILE_MS, right)
    expect(s.pelletsCollected).toBe(1)
  })

  it('does not move into a wall', () => {
    const grid = parseGrid(SMALL)
    let s = createInitialState(grid)
    // Try to move up — wall above spawn.
    s = step(s, PLAYER_TILE_MS, { intent: 'up' })
    expect(s.player.tile).toEqual(grid.playerSpawn)
  })

  it('cup is dormant until activation condition is met', () => {
    const grid = parseGrid(SMALL)
    let s = createInitialState(grid)
    expect(s.cupActive).toBe(false)
    // Advance past CUP_ACTIVATION_MS.
    s = fast(s, CUP_ACTIVATION_MS + 100)
    expect(s.cupActive).toBe(true)
  })

  it('grabbing the cup transitions PLAY → SURVIVE', () => {
    const grid = parseGrid(SMALL)
    let s = createInitialState(grid)
    // Force cup active and place player on the cup tile.
    s = {
      ...s,
      cupActive: true,
      player: { ...s.player, tile: grid.cup!, sub: 0 },
    }
    s = step(s, 16, idle)
    expect(s.phase).toBe('survive')
    expect(s.surviveLeftMs).toBe(SURVIVE_DURATION_MS)
  })

  it('SURVIVE → WON after the survive timer expires', () => {
    const grid = parseGrid(SMALL)
    let s = createInitialState(grid)
    s = {
      ...s,
      phase: 'survive',
      surviveLeftMs: 100,
    }
    s = step(s, 200, idle)
    expect(s.phase).toBe('won')
  })

  it('enemy collision in PLAY transitions to DYING and increments death count', () => {
    const grid = parseGrid(SMALL)
    let s = createInitialState(grid)
    // Place an enemy on the player's tile.
    s = {
      ...s,
      enemies: [
        {
          ...s.enemies[0],
          tile: s.player.tile,
          sub: 0,
        },
      ],
    }
    s = step(s, 16, idle)
    expect(s.phase).toBe('dying')
    expect(s.deaths).toBe(1)
    expect(s.player.deathFadeMs).toBe(DEATH_FADE_MS)
  })

  it('respawns player at spawn after the death fade', () => {
    const grid = parseGrid(SMALL)
    let s = createInitialState(grid)
    s = {
      ...s,
      phase: 'dying',
      player: { ...s.player, tile: { x: 5, y: 1 }, deathFadeMs: 100 },
    }
    s = step(s, 200, idle)
    expect(s.phase).toBe('play')
    expect(s.player.tile).toEqual(grid.playerSpawn)
  })

  it('WON is terminal — further ticks are no-ops', () => {
    const grid = parseGrid(SMALL)
    let s = createInitialState(grid)
    s = { ...s, phase: 'won', tickMs: 1234 }
    const next = step(s, 1000, idle)
    expect(next).toBe(s)
  })
})
