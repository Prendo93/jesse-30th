import { isWalkable, stepWithTunnel } from '../../grid'
import { DIRECTIONS, OPPOSITE, type Direction, type Grid, type Vec } from '../../types'
import { bfsNextStep, manhattan } from '../pathfind'

/**
 * Dementor — slow chaser. BFS toward the player tile; never reverses
 * unless dead-ended.
 */
export function dementorPick(
  grid: Grid,
  self: Vec,
  facing: Direction,
  target: Vec,
): Direction {
  const next = bfsNextStep(grid, self, target)
  if (next && next !== OPPOSITE[facing]) return next
  // Fallback: any walkable non-reverse direction toward target by Manhattan.
  return chooseBestNonReverse(grid, self, facing, target)
}

function chooseBestNonReverse(
  grid: Grid,
  self: Vec,
  facing: Direction,
  target: Vec,
): Direction {
  let best: Direction = facing
  let bestDist = Infinity
  for (const dir of DIRECTIONS) {
    if (dir === OPPOSITE[facing]) continue
    const next = stepWithTunnel(grid, self, dir)
    if (!isWalkable(grid, next)) continue
    const d = manhattan(next, target)
    if (d < bestDist) {
      bestDist = d
      best = dir
    }
  }
  return best
}
