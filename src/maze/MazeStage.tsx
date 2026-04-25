import { StageShell } from '../components/StageShell'
import { ContinueButton } from '../components/ContinueButton'
import { useGameStore } from '../store'

// Placeholder while the full Pac-Man-style maze is being built up step by step.
// Step 8 replaces this with the real game; for now it's just a routable shell
// so TypeScript exhaustiveness holds and the prior stages can advance.
export function MazeStage() {
  const advance = useGameStore((s) => s.advance)
  const markComplete = useGameStore((s) => s.markComplete)

  return (
    <StageShell>
      <div className="relative z-20 flex flex-col items-center gap-6 rounded border-4 border-hud-gold bg-black/70 p-8 text-center backdrop-blur-sm">
        <h2 className="font-rune text-3xl uppercase tracking-[0.3em] text-hud-gold">
          Triwizard Maze
        </h2>
        <p className="font-body text-lg italic text-torch-50/80">
          A hedge labyrinth. The cup glints in the distance.
          <br />
          (Construction in progress.)
        </p>
        <ContinueButton
          data-testid="maze-skip"
          onClick={() => {
            markComplete('mazeDone')
            advance()
          }}
        >
          Skip the Maze
        </ContinueButton>
      </div>
    </StageShell>
  )
}
