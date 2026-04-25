import { useEffect, useRef, useState } from 'react'
import { StageShell } from '../components/StageShell'
import { ContinueButton } from '../components/ContinueButton'
import { dialogue } from '../data/dialogue'
import { useGameStore } from '../store'
import { bandFor, type Band } from './flyingBand'
import { Backdrop } from '../art/Backdrop'
import { Jesse } from '../art/Jesse'

const TICK_MS = 50
const STEP = 5

export function FlyingStage() {
  const [position, setPosition] = useState(0)
  const directionRef = useRef<1 | -1>(1)
  const [result, setResult] = useState<Band | null>(null)
  const advance = useGameStore((s) => s.advance)
  const markComplete = useGameStore((s) => s.markComplete)
  const copy = dialogue.flying

  useEffect(() => {
    if (result) return
    const id = setInterval(() => {
      setPosition((p) => {
        let next = p + STEP * directionRef.current
        if (next >= 100) {
          next = 100
          directionRef.current = -1
        } else if (next <= 0) {
          next = 0
          directionRef.current = 1
        }
        return next
      })
    }, TICK_MS)
    return () => clearInterval(id)
  }, [result])

  const onMount = () => {
    if (result) return
    const band = bandFor(position)
    setResult(band)
    markComplete('flyingDone')
  }

  const outcomeLine =
    result === 'perfect'
      ? copy.perfect
      : result === 'okay'
      ? copy.okay
      : copy.fail

  return (
    <StageShell backdrop={<Backdrop name="quidditch-sky" />}>
      <Jesse
        pose="broom"
        className="pointer-events-none absolute bottom-4 left-2 z-10 h-[55%] w-auto drop-shadow-[6px_6px_0_rgba(0,0,0,0.6)]"
      />
      <div className="relative z-20 flex w-full max-w-md flex-col items-center gap-6 rounded border-4 border-hud-gold bg-black/70 p-6 backdrop-blur-sm">
        <div data-testid="flying-state" data-position={position} className="hidden" />

        <div className="relative h-72 w-12 border-4 border-hud-gold bg-hud-night/80">
          {/* perfect band 48-52 */}
          <div
            className="absolute inset-x-0 bg-hud-gold/20"
            style={{ bottom: '48%', height: '4%' }}
          />
          {/* okay band 35-65 (but not perfect) — drawn behind */}
          <div
            className="absolute inset-x-0 bg-hud-ember/15"
            style={{ bottom: '35%', height: '30%' }}
          />
          {/* indicator */}
          <div
            className="absolute inset-x-0 h-2 bg-hud-gold shadow-[0_0_12px_#e8c34a]"
            style={{ bottom: `calc(${position}% - 4px)` }}
          />
        </div>

        {!result ? (
          <button
            type="button"
            onClick={onMount}
            className="border-4 border-hud-gold bg-hud-stone px-6 py-2 font-rune text-lg uppercase tracking-[0.3em] text-hud-gold"
          >
            Mount Broom
          </button>
        ) : (
          <div className="flex flex-col items-center gap-3">
            <p
              data-testid="flying-result"
              className="font-rune text-xl text-hud-gold"
            >
              {outcomeLine}
            </p>
            <ContinueButton onClick={() => advance()}>Continue</ContinueButton>
          </div>
        )}
      </div>
    </StageShell>
  )
}
