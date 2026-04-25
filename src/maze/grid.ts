import {
  DIR_DELTA,
  TILE,
  type Direction,
  type Grid,
  type PowerKind,
  type Tile,
  type Vec,
  tileKey,
} from './types'

const POWER_CHARS: Record<string, PowerKind> = {
  c: 'cloak',
  s: 'stupefy',
  t: 'time',
  l: 'lumos',
}

const POWER_KIND_TO_TILE: Record<PowerKind, Tile> = {
  cloak: TILE.POWER_CLOAK,
  stupefy: TILE.POWER_STUPEFY,
  time: TILE.POWER_TIME,
  lumos: TILE.POWER_LUMOS,
}

export function parseGrid(ascii: string): Grid {
  const lines = ascii.split('\n').filter((l) => l.length > 0)
  const height = lines.length
  const width = Math.max(...lines.map((l) => l.length))

  const tiles: Tile[][] = []
  let playerSpawn: Vec | null = null
  const enemySpawns: Vec[] = []
  let cup: Vec | null = null
  const tunnels: Vec[] = []
  const powerTiles: { pos: Vec; kind: PowerKind }[] = []
  let dotCount = 0

  for (let y = 0; y < height; y += 1) {
    const row: Tile[] = []
    const line = lines[y]
    for (let x = 0; x < width; x += 1) {
      const ch = line[x] ?? '#'
      let tile: Tile
      switch (ch) {
        case '#':
          tile = TILE.WALL
          break
        case ' ':
          tile = TILE.PATH
          break
        case '.':
          tile = TILE.DOT
          dotCount += 1
          break
        case 'T':
          tile = TILE.TUNNEL
          tunnels.push({ x, y })
          break
        case 'P':
          tile = TILE.PATH
          playerSpawn = { x, y }
          break
        case 'E':
          tile = TILE.PATH
          enemySpawns.push({ x, y })
          break
        case 'C':
          tile = TILE.CUP
          cup = { x, y }
          break
        default: {
          const kind = POWER_CHARS[ch]
          if (kind) {
            tile = POWER_KIND_TO_TILE[kind]
            powerTiles.push({ pos: { x, y }, kind })
          } else {
            tile = TILE.WALL
          }
        }
      }
      row.push(tile)
    }
    tiles.push(row)
  }

  if (!playerSpawn) {
    throw new Error('Grid is missing a player spawn (P).')
  }

  return {
    width,
    height,
    tiles,
    playerSpawn,
    enemySpawns,
    cup,
    tunnels,
    powerTiles,
    dotCount,
  }
}

export function tileAt(grid: Grid, pos: Vec): Tile {
  if (pos.y < 0 || pos.y >= grid.height || pos.x < 0 || pos.x >= grid.width) {
    return TILE.WALL
  }
  return grid.tiles[pos.y][pos.x]
}

export function isWalkable(grid: Grid, pos: Vec): boolean {
  return tileAt(grid, pos) !== TILE.WALL
}

export function stepTile(pos: Vec, dir: Direction): Vec {
  const d = DIR_DELTA[dir]
  return { x: pos.x + d.x, y: pos.y + d.y }
}

const inBounds = (grid: Grid, p: Vec) =>
  p.y >= 0 && p.y < grid.height && p.x >= 0 && p.x < grid.width

/**
 * Take one tile step from `from` in `dir`, applying the tunnel
 * wraparound: if you step off the edge from a tunnel tile, jump to the
 * matching tunnel tile on the opposite side of the same row.
 */
export function stepWithTunnel(
  grid: Grid,
  from: Vec,
  dir: Direction,
): Vec {
  const next = stepTile(from, dir)
  if (!inBounds(grid, next) && tileAt(grid, from) === TILE.TUNNEL) {
    const same = grid.tunnels.filter((t) => t.y === from.y && t.x !== from.x)
    if (same.length > 0) return same[0]
  }
  return next
}

/** Build the initial pellet set from the parsed grid. */
export function pelletKeys(grid: Grid): Set<string> {
  const keys = new Set<string>()
  for (let y = 0; y < grid.height; y += 1) {
    for (let x = 0; x < grid.width; x += 1) {
      if (grid.tiles[y][x] === TILE.DOT) keys.add(tileKey({ x, y }))
    }
  }
  return keys
}

/** Build the initial power-up tile-key set. */
export function powerKeys(grid: Grid): Set<string> {
  const keys = new Set<string>()
  for (const { pos } of grid.powerTiles) keys.add(tileKey(pos))
  return keys
}
