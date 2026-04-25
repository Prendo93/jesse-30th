import { isWalkable, stepWithTunnel } from '../../grid'
import { DIRECTIONS, OPPOSITE, type Direction, type Grid, type Vec } from '../../types'
import { bfsNextStep } from '../pathfind'

const DASH_PROBABILITY = 0.05

/**
 * Rival Champion — random walker. Picks a random non-reverse direction
 * at each intersection. Occasionally dashes toward the player using
 * BFS to add pressure.
 */
export function rivalPick(
  grid: Grid,
  self: Vec,
  facing: Direction,
  target: Vec,
  rng: () => number,
): Direction {
  if (rng() < DASH_PROBABILITY) {
    const dash = bfsNextStep(grid, self, target)
    if (dash && dash !== OPPOSITE[facing]) return dash
  }
  const candidates = DIRECTIONS.filter((dir) => {
    if (dir === OPPOSITE[facing]) return false
    const cand = stepWithTunnel(grid, self, dir)
    return isWalkable(grid, cand)
  })
  if (candidates.length === 0) return OPPOSITE[facing] // dead-end reverse
  const idx = Math.floor(rng() * candidates.length) % candidates.length
  return candidates[idx]
}
