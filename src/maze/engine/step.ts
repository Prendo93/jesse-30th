import {
  CUP_ACTIVATION_MS,
  CUP_PELLET_FRACTION,
  DEATH_FADE_MS,
  ENEMY_TILE_MS,
  PLAYER_TILE_MS,
  POWER_DURATION_MS,
  SURVIVE_DURATION_MS,
  SURVIVE_SPEED_FACTOR,
  TIME_TURNER_FACTOR,
} from '../constants'
import { isWalkable, pelletKeys, powerKeys, stepWithTunnel } from '../grid'
import {
  DIR_DELTA,
  TILE,
  tileKey,
  type ActivePower,
  type Direction,
  type EnemyKind,
  type GameState,
  type Grid,
  type Vec,
} from '../types'
import { dementorPick } from './ai/dementor'
import { basiliskPick } from './ai/basilisk'
import { rivalPick } from './ai/rival'

export type StepInput = {
  intent: Direction | null
}

const samePos = (a: Vec, b: Vec) => a.x === b.x && a.y === b.y

const ENEMY_KINDS: EnemyKind[] = ['dementor', 'basilisk', 'rival']

export function createInitialState(
  grid: Grid,
  rng: () => number = Math.random,
): GameState {
  const enemies = grid.enemySpawns.map((spawn, i) => ({
    kind: ENEMY_KINDS[i % ENEMY_KINDS.length],
    tile: spawn,
    facing: 'up' as Direction,
    sub: 0,
    spawn,
  }))

  return {
    grid,
    phase: 'play',
    tickMs: 0,
    player: {
      tile: grid.playerSpawn,
      facing: 'left',
      intent: null,
      sub: 0,
      alive: true,
      deathFadeMs: 0,
    },
    enemies,
    pellets: pelletKeys(grid),
    powers: powerKeys(grid),
    activePowers: [],
    cupActive: false,
    surviveLeftMs: 0,
    deaths: 0,
    pelletsCollected: 0,
    pelletsTotal: grid.dotCount,
    rng,
  }
}

const enemySpeedFactor = (state: GameState): number => {
  let f = 1
  if (state.activePowers.some((p) => p.kind === 'time')) f *= TIME_TURNER_FACTOR
  if (state.phase === 'survive') f *= SURVIVE_SPEED_FACTOR
  return f
}

const stupefyFreezesEnemy = (state: GameState, enemyTile: Vec): boolean => {
  const stupefy = state.activePowers.find((p) => p.kind === 'stupefy')
  if (!stupefy) return false
  // Stupefy freezes nearby enemies; here "nearby" is approximated by
  // tile-Manhattan ≤ 5 from the player at activation time. We check it
  // every frame against the current player tile for simplicity — the
  // power is short-lived, so the difference is negligible.
  const dx = state.player.tile.x - enemyTile.x
  const dy = state.player.tile.y - enemyTile.y
  return Math.abs(dx) + Math.abs(dy) <= 5
}

function moveEntity(
  grid: Grid,
  tile: Vec,
  facing: Direction,
  intent: Direction | null,
  sub: number,
  dtMs: number,
  tileMs: number,
): { tile: Vec; facing: Direction; sub: number; arrived: boolean } {
  // At the start of a tile traversal, prefer the intent direction if it's
  // walkable from `tile`. Once we're partway through a tile we commit to
  // `facing` so the visual interpolation doesn't snap.
  let dir: Direction = facing
  if (sub === 0 && intent) {
    const tryNext = stepWithTunnel(grid, tile, intent)
    if (isWalkable(grid, tryNext)) dir = intent
  }
  const candidate = stepWithTunnel(grid, tile, dir)
  if (!isWalkable(grid, candidate)) {
    // Blocked — idle in place. Snap sub to 0 so the next tick re-checks
    // intent immediately rather than waiting another tile.
    return { tile, facing: dir, sub: 0, arrived: false }
  }
  const advance = dtMs / tileMs
  const newSub = sub + advance
  if (newSub >= 1) {
    // Arrived at the next tile. Re-evaluate intent now so the next
    // traversal uses the latest input — without this, `sub` is rarely
    // exactly 0 again and intent gets ignored for the rest of the run.
    let nextFacing = dir
    if (intent) {
      const after = stepWithTunnel(grid, candidate, intent)
      if (isWalkable(grid, after)) nextFacing = intent
    }
    return {
      tile: candidate,
      facing: nextFacing,
      sub: Math.min(newSub - 1, 0.999),
      arrived: true,
    }
  }
  return { tile, facing: dir, sub: newSub, arrived: false }
}

function pickEnemyDirection(
  state: GameState,
  kind: EnemyKind,
  tile: Vec,
  facing: Direction,
): Direction {
  const cloaked = state.activePowers.some((p) => p.kind === 'cloak')
  // While cloaked, enemies still target the spawn (the player's last "known" tile
  // approximated as the player spawn for simplicity).
  const target = cloaked ? state.grid.playerSpawn : state.player.tile
  switch (kind) {
    case 'dementor':
      return dementorPick(state.grid, tile, facing, target)
    case 'basilisk':
      return basiliskPick(state.grid, tile, facing, target, state.player.facing)
    case 'rival':
      return rivalPick(state.grid, tile, facing, target, state.rng)
    case 'hedge':
      return facing
  }
}

function applyPowerPickup(
  state: GameState,
  kind: ActivePower['kind'],
): GameState {
  if (kind === 'stupefy') {
    // Stupefy is essentially instantaneous freeze radius — represent as a
    // short timer.
  }
  const filtered = state.activePowers.filter((p) => p.kind !== kind)
  return {
    ...state,
    activePowers: [
      ...filtered,
      { kind, remainingMs: POWER_DURATION_MS[kind] },
    ],
  }
}

function expireActivePowers(
  active: ActivePower[],
  dtMs: number,
): ActivePower[] {
  return active
    .map((p) => ({ ...p, remainingMs: p.remainingMs - dtMs }))
    .filter((p) => p.remainingMs > 0)
}

const POWER_TILE_TO_KIND: Record<string, ActivePower['kind']> = {
  POWER_CLOAK: 'cloak',
  POWER_STUPEFY: 'stupefy',
  POWER_TIME: 'time',
  POWER_LUMOS: 'lumos',
}

export function step(
  state: GameState,
  dtMs: number,
  input: StepInput,
): GameState {
  if (state.phase === 'won') return state

  if (state.phase === 'dying') {
    const remaining = state.player.deathFadeMs - dtMs
    if (remaining > 0) {
      return {
        ...state,
        tickMs: state.tickMs + dtMs,
        player: { ...state.player, deathFadeMs: remaining },
      }
    }
    // Respawn
    return {
      ...state,
      phase: 'play',
      tickMs: state.tickMs + dtMs,
      player: {
        tile: state.grid.playerSpawn,
        facing: 'left',
        intent: null,
        sub: 0,
        alive: true,
        deathFadeMs: 0,
      },
      enemies: state.enemies.map((e) => ({
        ...e,
        tile: e.spawn,
        facing: 'up',
        sub: 0,
      })),
      activePowers: [],
    }
  }

  const wasSurvive = state.phase === 'survive'

  // PLAY or SURVIVE — same movement loop, different speed factors.
  let next: GameState = {
    ...state,
    tickMs: state.tickMs + dtMs,
    activePowers: expireActivePowers(state.activePowers, dtMs),
  }

  // Update intent
  if (input.intent) {
    next = { ...next, player: { ...next.player, intent: input.intent } }
  }

  // Move player
  const movedPlayer = moveEntity(
    next.grid,
    next.player.tile,
    next.player.facing,
    next.player.intent,
    next.player.sub,
    dtMs,
    PLAYER_TILE_MS,
  )
  next = {
    ...next,
    player: { ...next.player, ...movedPlayer },
  }

  // Pellet eating on tile arrival
  if (movedPlayer.arrived) {
    const k = tileKey(next.player.tile)
    if (next.pellets.has(k)) {
      const pellets = new Set(next.pellets)
      pellets.delete(k)
      next = {
        ...next,
        pellets,
        pelletsCollected: next.pelletsCollected + 1,
      }
    }
    // Power-up pickup
    if (next.powers.has(k)) {
      const tile = next.grid.tiles[next.player.tile.y][next.player.tile.x]
      const kind = POWER_TILE_TO_KIND[tile]
      if (kind) {
        const powers = new Set(next.powers)
        powers.delete(k)
        next = applyPowerPickup({ ...next, powers }, kind)
      }
    }
  }

  // Cup activation gating
  if (!next.cupActive) {
    const byTime = next.tickMs >= CUP_ACTIVATION_MS
    const byPellets =
      next.pelletsTotal > 0 &&
      next.pelletsCollected / next.pelletsTotal >= CUP_PELLET_FRACTION
    if (byTime || byPellets) next = { ...next, cupActive: true }
  }

  // Cup grab → survive
  if (
    next.phase === 'play' &&
    next.cupActive &&
    next.grid.cup &&
    samePos(next.player.tile, next.grid.cup)
  ) {
    next = {
      ...next,
      phase: 'survive',
      surviveLeftMs: SURVIVE_DURATION_MS,
    }
  }

  // Move enemies
  const speedFactor = enemySpeedFactor(next)
  next = {
    ...next,
    enemies: next.enemies.map((e) => {
      if (stupefyFreezesEnemy(next, e.tile)) {
        return { ...e, sub: 0 }
      }
      const tileMs = ENEMY_TILE_MS[e.kind] / speedFactor
      const moved = moveEntity(
        next.grid,
        e.tile,
        e.facing,
        // Re-pick direction on arrival; otherwise keep facing.
        e.sub === 0
          ? pickEnemyDirection(next, e.kind, e.tile, e.facing)
          : null,
        e.sub,
        dtMs,
        tileMs,
      )
      return { ...e, tile: moved.tile, facing: moved.facing, sub: moved.sub }
    }),
  }

  // Collision detection
  const cloaked = next.activePowers.some((p) => p.kind === 'cloak')
  if (!cloaked) {
    const hit = next.enemies.some((e) => samePos(e.tile, next.player.tile))
    if (hit && next.phase !== 'won') {
      return {
        ...next,
        phase: 'dying',
        deaths: next.deaths + 1,
        player: { ...next.player, deathFadeMs: DEATH_FADE_MS, alive: false },
      }
    }
  }

  // Survive countdown → won. Skip the decrement on the tick that
  // transitioned into SURVIVE so the timer reads as SURVIVE_DURATION_MS
  // for one observable frame.
  if (next.phase === 'survive' && wasSurvive) {
    const left = next.surviveLeftMs - dtMs
    if (left <= 0) {
      next = { ...next, phase: 'won', surviveLeftMs: 0 }
    } else {
      next = { ...next, surviveLeftMs: left }
    }
  }

  return next
}

// Re-export DIR_DELTA in case consumers want it (suppress unused-import lint).
export { DIR_DELTA, TILE }
