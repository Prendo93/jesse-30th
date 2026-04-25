export type Vec = { x: number; y: number }

export type Direction = 'up' | 'down' | 'left' | 'right'

export const DIRECTIONS: readonly Direction[] = [
  'up',
  'down',
  'left',
  'right',
] as const

export const DIR_DELTA: Record<Direction, Vec> = {
  up: { x: 0, y: -1 },
  down: { x: 0, y: 1 },
  left: { x: -1, y: 0 },
  right: { x: 1, y: 0 },
}

export const OPPOSITE: Record<Direction, Direction> = {
  up: 'down',
  down: 'up',
  left: 'right',
  right: 'left',
}

export const TILE = {
  WALL: 'WALL',
  PATH: 'PATH',
  DOT: 'DOT',
  POWER_CLOAK: 'POWER_CLOAK',
  POWER_STUPEFY: 'POWER_STUPEFY',
  POWER_TIME: 'POWER_TIME',
  POWER_LUMOS: 'POWER_LUMOS',
  CUP: 'CUP',
  TUNNEL: 'TUNNEL',
} as const
export type Tile = (typeof TILE)[keyof typeof TILE]

export type EnemyKind = 'dementor' | 'basilisk' | 'rival' | 'hedge'

export type PowerKind = 'cloak' | 'stupefy' | 'time' | 'lumos'

export const POWER_TILE_TO_KIND: Record<string, PowerKind> = {
  POWER_CLOAK: 'cloak',
  POWER_STUPEFY: 'stupefy',
  POWER_TIME: 'time',
  POWER_LUMOS: 'lumos',
}

export type Grid = {
  width: number
  height: number
  tiles: Tile[][] // tiles[y][x]
  playerSpawn: Vec
  enemySpawns: Vec[]
  cup: Vec | null
  tunnels: Vec[]
  powerTiles: { pos: Vec; kind: PowerKind }[]
  dotCount: number
}

export type Phase = 'play' | 'survive' | 'won' | 'dying' | 'gameover'

export type Enemy = {
  kind: EnemyKind
  tile: Vec
  facing: Direction
  sub: number // 0..1 between current tile and next
  spawn: Vec
  // Per-AI scratch state. Loose typing here keeps the AIs decoupled.
  ai?: Record<string, unknown>
}

export type ActivePower = {
  kind: PowerKind
  remainingMs: number
}

export type GameState = {
  grid: Grid
  phase: Phase
  tickMs: number
  player: {
    tile: Vec
    facing: Direction
    intent: Direction | null
    sub: number
    alive: boolean
    deathFadeMs: number
  }
  enemies: Enemy[]
  pellets: Set<string> // keyed "x,y"
  powers: Set<string> // remaining power-up tile keys
  activePowers: ActivePower[]
  cupActive: boolean
  surviveLeftMs: number
  deaths: number
  pelletsCollected: number
  pelletsTotal: number
  rng: () => number
}

export const tileKey = (v: Vec) => `${v.x},${v.y}`
