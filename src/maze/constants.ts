// Triwizard Maze grid. Spec:
//   #  wall                  T  tunnel (wraps to matching tunnel in same row)
//   .  pellet                P  player spawn (treated as PATH)
//   ' '  empty path          E  enemy spawn (treated as PATH)
//   c  Invisibility Cloak    C  Triwizard Cup (centre)
//   s  Stupefy Burst
//   t  Time Turner
//   l  Lumos Pulse
//
// 21 columns × 21 rows.
export const MAZE_ASCII = [
  '#####################',
  '#.........#.........#',
  '#.##.####.#.####.##.#',
  '#c.......#.#.......t#',
  '#.#.#.##.#.#.##.#.#.#',
  '#.#.......E.......#.#',
  '#.#.#.###.#.###.#.#.#',
  '#.#.#.#.......#.#.#.#',
  '#.#.#.#.##.##.#.#.#.#',
  'T...#.#.#...#.#.#...T',
  '###.#.....C.....#.###',
  'T...#.#.#...#.#.#...T',
  '#.#.#.#.##.##.#.#.#.#',
  '#.#.#.#.......#.#.#.#',
  '#.#.#.###.#.###.#.#.#',
  '#.#.......E.......#.#',
  '#.#.#.##.#.#.##.#.#.#',
  '#s.......#.#.......l#',
  '#.##.####.#.####.##.#',
  '#.........P.........#',
  '#####################',
].join('\n')

// Fixed move duration in ms per tile, by entity kind.
export const PLAYER_TILE_MS = 130
export const ENEMY_TILE_MS = {
  dementor: 200,
  basilisk: 170,
  rival: 180,
  hedge: 9999, // hedges don't traverse tiles; they toggle in place
} as const

// Phase / scoring tuning.
export const SURVIVE_DURATION_MS = 7_000
export const CUP_ACTIVATION_MS = 30_000
export const CUP_PELLET_FRACTION = 0.75
export const DEATH_FADE_MS = 1_500
export const MAX_LIVES = 3

// Power-up effect durations.
export const POWER_DURATION_MS = {
  cloak: 5_000,
  stupefy: 3_000,
  time: 8_000,
  lumos: 4_000,
} as const

// Stupefy radius in tiles.
export const STUPEFY_RADIUS = 5

// Time-Turner enemy speed multiplier.
export const TIME_TURNER_FACTOR = 0.5

// Survive-phase enemy speed multiplier (everyone gets angry once you grab the cup).
export const SURVIVE_SPEED_FACTOR = 1.5
