import { useEffect, useMemo, useRef, useState } from 'react'
import { StageShell } from '../components/StageShell'
import { Backdrop } from '../art/Backdrop'
import { useGameStore } from '../store'
import {
  createInitialState,
  step,
  type StepInput,
} from './engine/step'
import { parseGrid } from './grid'
import {
  MAX_LIVES,
  MAZE_ASCII,
  PLAYER_TILE_MS,
  ENEMY_TILE_MS,
} from './constants'
import { TILE, type GameState } from './types'
import { useDirectionInput } from './hooks/useDirectionInput'
import { useGameLoop } from './hooks/useGameLoop'
import { JessePacman } from './sprites/JessePacman'
import { EnemySprite } from './sprites/EnemySprites'
import {
  HedgeWall,
  Pellet,
  PowerUp,
  TriwizardCup,
} from './sprites/MazeIcons'

const TILE_PX = 24

type Props = {
  /** Test-only: skip the gameplay and immediately mark won. */
  instant?: boolean
}

export function MazeStage({ instant = false }: Props) {
  const advance = useGameStore((s) => s.advance)
  const markComplete = useGameStore((s) => s.markComplete)

  const grid = useMemo(() => parseGrid(MAZE_ASCII), [])
  const stateRef = useRef<GameState>(createInitialState(grid))
  const [, setTick] = useState(0)
  const intent = useDirectionInput()
  const intentRef = useRef<StepInput['intent']>(null)
  intentRef.current = intent

  const wonAdvancedRef = useRef(false)

  const restart = () => {
    stateRef.current = createInitialState(grid)
    wonAdvancedRef.current = false
    setTick((t) => (t + 1) % 1_000_000)
  }

  useGameLoop((dtMs) => {
    const next = step(stateRef.current, dtMs, { intent: intentRef.current })
    stateRef.current = next
    setTick((t) => (t + 1) % 1_000_000)
  }, !instant)

  // Handle won → advance.
  useEffect(() => {
    if (instant) {
      markComplete('mazeDone')
      const id = setTimeout(() => advance(), 50)
      return () => clearTimeout(id)
    }
    return undefined
  }, [instant, advance, markComplete])

  useEffect(() => {
    if (stateRef.current.phase === 'won' && !wonAdvancedRef.current) {
      wonAdvancedRef.current = true
      markComplete('mazeDone')
      setTimeout(() => advance(), 600)
    }
  })

  const state = stateRef.current
  const W = grid.width * TILE_PX
  const H = grid.height * TILE_PX

  // Render lerped entity positions using sub-tile progress.
  const renderEntity = (
    tile: { x: number; y: number },
    facing: 'up' | 'down' | 'left' | 'right',
    sub: number,
    children: React.ReactNode,
  ) => {
    const dx = facing === 'left' ? -1 : facing === 'right' ? 1 : 0
    const dy = facing === 'up' ? -1 : facing === 'down' ? 1 : 0
    const x = (tile.x + dx * sub) * TILE_PX
    const y = (tile.y + dy * sub) * TILE_PX
    return <g transform={`translate(${x} ${y})`}>{children}</g>
  }

  return (
    <StageShell backdrop={<Backdrop name="hedgemaze" />}>
      {/* touch-none stops the browser from interpreting swipes as page
          scroll or zoom on this stage; user-select-none keeps long
          press from triggering text selection. The maze fits in the
          viewport once scaled, so we don't need scroll here. */}
      <div className="relative z-20 flex w-full max-w-[540px] flex-col items-center gap-3 touch-none select-none">
        {state.phase === 'gameover' ? (
          <div
            data-testid="maze-gameover"
            className="absolute inset-0 z-30 flex flex-col items-center justify-center gap-6 bg-hud-night/85"
          >
            <p className="font-rune text-5xl uppercase tracking-[0.3em] text-hud-ember drop-shadow-[2px_2px_0_#000]">
              Game Over
            </p>
            <p className="font-body text-base italic text-torch-50">
              The maze claims another contender.
            </p>
            <button
              type="button"
              data-testid="maze-retry"
              onClick={restart}
              className="border-4 border-hud-gold bg-hud-stone px-6 py-2 font-rune text-lg uppercase tracking-[0.3em] text-hud-gold shadow-[inset_0_0_0_2px_#0d0a07] transition-transform hover:scale-[1.02] active:translate-y-px"
            >
              Try Again
            </button>
          </div>
        ) : null}
        <div
          className="relative aspect-square w-full max-w-[504px] border-4 border-hud-gold bg-black/70 shadow-[6px_6px_0_#000] backdrop-blur-sm"
          data-testid="maze-board"
        >
          <svg
            viewBox={`0 0 ${W} ${H}`}
            preserveAspectRatio="xMidYMid meet"
            xmlns="http://www.w3.org/2000/svg"
            className="absolute inset-0 h-full w-full"
          >
            {/* Walls */}
            {grid.tiles.map((row, y) =>
              row.map((t, x) =>
                t === TILE.WALL ? (
                  <g key={`w-${x}-${y}`} transform={`translate(${x * TILE_PX} ${y * TILE_PX})`}>
                    <HedgeWall />
                  </g>
                ) : null,
              ),
            )}

            {/* Pellets */}
            {[...state.pellets].map((k) => {
              const [px, py] = k.split(',').map(Number)
              return (
                <g key={`p-${k}`} transform={`translate(${px * TILE_PX} ${py * TILE_PX})`}>
                  <Pellet />
                </g>
              )
            })}

            {/* Power-ups */}
            {grid.powerTiles
              .filter(({ pos }) => state.powers.has(`${pos.x},${pos.y}`))
              .map(({ pos, kind }) => (
                <g
                  key={`pw-${pos.x}-${pos.y}`}
                  transform={`translate(${pos.x * TILE_PX} ${pos.y * TILE_PX})`}
                >
                  <PowerUp kind={kind} />
                </g>
              ))}

            {/* Cup */}
            {grid.cup ? (
              <g transform={`translate(${grid.cup.x * TILE_PX} ${grid.cup.y * TILE_PX})`}>
                <TriwizardCup active={state.cupActive} />
              </g>
            ) : null}

            {/* Enemies */}
            {state.enemies.map((e, i) => (
              <g key={`e-${i}`} data-testid={`maze-enemy-${e.kind}`}>
                {renderEntity(e.tile, e.facing, e.sub, <EnemySprite kind={e.kind} />)}
              </g>
            ))}

            {/* Player */}
            <g
              data-testid="maze-player"
              opacity={state.phase === 'dying' ? state.player.deathFadeMs / 1500 : 1}
            >
              {renderEntity(
                state.player.tile,
                state.player.facing,
                state.player.sub,
                <JessePacman
                  facing={state.player.facing}
                  expression={state.phase === 'dying' ? 'afraid' : 'neutral'}
                />,
              )}
            </g>
          </svg>
        </div>

        {/* HUD */}
        <div
          data-testid="maze-hud"
          className="flex w-full max-w-[504px] items-center justify-between gap-4 border-2 border-hud-gold bg-black/80 px-4 py-2 font-rune text-sm uppercase tracking-[0.2em] text-hud-gold"
        >
          <span data-testid="maze-lives">
            Lives: {Math.max(0, MAX_LIVES - state.deaths)}/{MAX_LIVES}
          </span>
          <span data-testid="maze-pellets">
            Pellets {state.pelletsCollected}/{state.pelletsTotal}
          </span>
          <span data-testid="maze-phase">
            {state.phase === 'survive'
              ? `Survive ${(state.surviveLeftMs / 1000).toFixed(1)}s`
              : state.cupActive
              ? 'Cup is live!'
              : 'Find the Cup'}
          </span>
        </div>

        {/* Active power chips */}
        {state.activePowers.length > 0 ? (
          <div className="flex gap-2 text-xs uppercase tracking-[0.2em] text-hud-ember">
            {state.activePowers.map((p) => (
              <span
                key={p.kind}
                className="rounded border border-hud-ember bg-black/70 px-2 py-1"
              >
                {p.kind} {(p.remainingMs / 1000).toFixed(1)}s
              </span>
            ))}
          </div>
        ) : null}
      </div>
    </StageShell>
  )
}

// Suppress unused-export warnings for constants pulled in for typing.
export { ENEMY_TILE_MS, PLAYER_TILE_MS }
