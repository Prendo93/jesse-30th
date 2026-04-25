import { DIR_DELTA, OPPOSITE, type Direction, type Grid, type Vec } from '../../types'
import { isWalkable, stepWithTunnel } from '../../grid'
import { bfsNextStep, manhattan } from '../pathfind'

const LEAD_TILES = 4

/**
 * Basilisk Echo — ambusher. Targets a tile `LEAD_TILES` ahead of the
 * player along the player's facing direction (clamped to in-bounds /
 * walkable). BFS toward that target.
 */
export function basiliskPick(
  grid: Grid,
  self: Vec,
  facing: Direction,
  playerTile: Vec,
  playerFacing: Direction,
): Direction {
  const d = DIR_DELTA[playerFacing]
  const target = clampToWalkable(grid, {
    x: playerTile.x + d.x * LEAD_TILES,
    y: playerTile.y + d.y * LEAD_TILES,
  })
  const next = bfsNextStep(grid, self, target)
  if (next && next !== OPPOSITE[facing]) return next
  // Fallback: closest non-reverse direction by Manhattan.
  let best: Direction = facing
  let bestDist = Infinity
  for (const dir of ['up', 'down', 'left', 'right'] as Direction[]) {
    if (dir === OPPOSITE[facing]) continue
    const cand = stepWithTunnel(grid, self, dir)
    if (!isWalkable(grid, cand)) continue
    const dist = manhattan(cand, target)
    if (dist < bestDist) {
      bestDist = dist
      best = dir
    }
  }
  return best
}

function clampToWalkable(grid: Grid, pos: Vec): Vec {
  const x = Math.min(Math.max(pos.x, 0), grid.width - 1)
  const y = Math.min(Math.max(pos.y, 0), grid.height - 1)
  if (isWalkable(grid, { x, y })) return { x, y }
  // Walk back toward the centre until we hit a walkable tile.
  let cx = x
  let cy = y
  for (let i = 0; i < grid.width + grid.height; i += 1) {
    if (cx > grid.width / 2) cx -= 1
    else if (cx < grid.width / 2) cx += 1
    if (cy > grid.height / 2) cy -= 1
    else if (cy < grid.height / 2) cy += 1
    if (isWalkable(grid, { x: cx, y: cy })) return { x: cx, y: cy }
  }
  return { x: Math.floor(grid.width / 2), y: Math.floor(grid.height / 2) }
}
