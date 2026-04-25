import {
  DIRECTIONS,
  tileKey,
  type Direction,
  type Grid,
  type Vec,
} from '../types'
import { isWalkable, stepWithTunnel } from '../grid'

export function manhattan(a: Vec, b: Vec): number {
  return Math.abs(a.x - b.x) + Math.abs(a.y - b.y)
}

/**
 * BFS from `from` to `to`. Returns the very first direction the entity
 * should move from `from`, or null if unreachable. Tunnel tiles
 * teleport during traversal so the path can use the wraparound.
 */
export function bfsNextStep(
  grid: Grid,
  from: Vec,
  to: Vec,
): Direction | null {
  if (from.x === to.x && from.y === to.y) return null

  type Step = { pos: Vec; firstDir: Direction }
  const queue: Step[] = []
  const seen = new Set<string>()
  seen.add(tileKey(from))

  for (const dir of DIRECTIONS) {
    const next = stepWithTunnel(grid, from, dir)
    if (!isWalkable(grid, next)) continue
    const k = tileKey(next)
    if (seen.has(k)) continue
    seen.add(k)
    queue.push({ pos: next, firstDir: dir })
  }

  while (queue.length > 0) {
    const cur = queue.shift()!
    if (cur.pos.x === to.x && cur.pos.y === to.y) return cur.firstDir
    for (const dir of DIRECTIONS) {
      const next = stepWithTunnel(grid, cur.pos, dir)
      if (!isWalkable(grid, next)) continue
      const k = tileKey(next)
      if (seen.has(k)) continue
      seen.add(k)
      queue.push({ pos: next, firstDir: cur.firstDir })
    }
  }
  return null
}

/** Returns the BFS distance in tiles from `from` to `to`, or Infinity. */
export function bfsDistance(grid: Grid, from: Vec, to: Vec): number {
  if (from.x === to.x && from.y === to.y) return 0
  const queue: { pos: Vec; depth: number }[] = []
  const seen = new Set<string>()
  seen.add(tileKey(from))
  queue.push({ pos: from, depth: 0 })

  while (queue.length > 0) {
    const cur = queue.shift()!
    if (cur.pos.x === to.x && cur.pos.y === to.y) return cur.depth
    for (const dir of DIRECTIONS) {
      const next = stepWithTunnel(grid, cur.pos, dir)
      if (!isWalkable(grid, next)) continue
      const k = tileKey(next)
      if (seen.has(k)) continue
      seen.add(k)
      queue.push({ pos: next, depth: cur.depth + 1 })
    }
  }
  return Infinity
}
