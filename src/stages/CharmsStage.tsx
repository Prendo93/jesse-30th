import { useEffect, useMemo, useState } from 'react'
import { StageShell } from '../components/StageShell'
import { ContinueButton } from '../components/ContinueButton'
import { dialogue } from '../data/dialogue'
import { useGameStore } from '../store'
import { Backdrop } from '../art/Backdrop'
import { Jesse } from '../art/Jesse'

const BUTTON_COUNT = 4
const STEP_MS = 600
const SYMBOLS = ['✦', '✧', '✺', '❂'] as const
const ROUND_LENGTHS = [3, 4]
const MAX_ROUNDS = ROUND_LENGTHS.length
const MAX_FAILURES = 2

type Phase = 'show' | 'input' | 'result'

const generateSequence = (length: number) =>
  Array.from({ length }, () => Math.floor(Math.random() * BUTTON_COUNT))

export function CharmsStage() {
  const [round, setRound] = useState(0)
  const [phase, setPhase] = useState<Phase>('show')
  const [failures, setFailures] = useState(0)
  const [sequence, setSequence] = useState<number[]>(() =>
    generateSequence(ROUND_LENGTHS[0]),
  )
  const [highlighted, setHighlighted] = useState<number | null>(null)
  const [playerInput, setPlayerInput] = useState<number[]>([])
  const [outcome, setOutcome] = useState<null | 'success' | 'failure'>(null)
  const advance = useGameStore((s) => s.advance)
  const markComplete = useGameStore((s) => s.markComplete)
  const copy = dialogue.charms

  // Show-phase walkthrough.
  useEffect(() => {
    if (phase !== 'show') return
    let i = 0
    const id = setInterval(() => {
      if (i < sequence.length) {
        setHighlighted(sequence[i])
        i += 1
      } else {
        setHighlighted(null)
        clearInterval(id)
        setPhase('input')
      }
    }, STEP_MS)
    return () => clearInterval(id)
  }, [phase, sequence])

  const startRound = (nextRound: number) => {
    setSequence(generateSequence(ROUND_LENGTHS[nextRound]))
    setPlayerInput([])
    setHighlighted(null)
    setPhase('show')
  }

  const onPress = (idx: number) => {
    if (phase !== 'input' || outcome) return
    const next = [...playerInput, idx]
    const expected = sequence[next.length - 1]
    if (idx !== expected) {
      const newFailures = failures + 1
      setFailures(newFailures)
      if (newFailures >= MAX_FAILURES) {
        setOutcome('failure')
        setPhase('result')
      } else {
        // Restart the same conceptual round with a new sequence.
        startRound(round)
      }
      return
    }
    setPlayerInput(next)
    if (next.length === sequence.length) {
      // Round won.
      const nextRound = round + 1
      if (nextRound >= MAX_ROUNDS) {
        setOutcome('success')
        setPhase('result')
        return
      }
      setRound(nextRound)
      startRound(nextRound)
    }
  }

  const onContinue = () => {
    markComplete('charmsDone')
    advance()
  }

  const stateAttrs = useMemo(
    () => ({
      'data-sequence': sequence.join(','),
      'data-phase': phase,
      'data-round': String(round),
      'data-failures': String(failures),
    }),
    [sequence, phase, round, failures],
  )

  return (
    <StageShell backdrop={<Backdrop name="classroom" />}>
      <Jesse
        pose="wand"
        className="pointer-events-none absolute bottom-0 left-4 z-10 h-[60%] w-auto drop-shadow-[6px_6px_0_rgba(0,0,0,0.6)]"
      />
      <div className="relative z-20 flex w-full max-w-xl flex-col items-center gap-8 rounded border-4 border-hud-gold bg-black/70 p-6 backdrop-blur-sm">
        <div data-testid="charms-state" className="hidden" {...stateAttrs} />

        <p className="font-body text-sm uppercase tracking-[0.3em] text-hud-gold/70">
          Round {round + 1} of {MAX_ROUNDS}
          {failures > 0 ? ` · misfires ${failures}` : null}
        </p>

        <div className="grid grid-cols-2 gap-4">
          {Array.from({ length: BUTTON_COUNT }).map((_, i) => (
            <button
              key={i}
              type="button"
              data-testid={`charm-button-${i}`}
              onClick={() => onPress(i)}
              disabled={phase !== 'input' || !!outcome}
              className={`flex h-24 w-24 items-center justify-center border-4 font-rune text-4xl transition-all duration-150 ${
                highlighted === i
                  ? 'border-hud-gold bg-hud-gold/30 text-hud-night shadow-[0_0_24px_#e8c34a]'
                  : 'border-hud-gold/60 bg-hud-stone/70 text-hud-gold hover:bg-hud-ember/30'
              } disabled:cursor-not-allowed disabled:opacity-60`}
            >
              {SYMBOLS[i]}
            </button>
          ))}
        </div>

        {phase === 'show' ? (
          <p className="font-body italic text-torch-50/80">Watch closely…</p>
        ) : null}
        {phase === 'input' ? (
          <p className="font-body italic text-torch-50/80">Repeat the pattern.</p>
        ) : null}

        {outcome ? (
          <div className="flex flex-col items-center gap-3">
            <p
              data-testid="charms-result"
              className="font-rune text-xl text-hud-gold"
            >
              {outcome === 'success' ? copy.success : copy.failure}
            </p>
            <ContinueButton onClick={onContinue}>Continue</ContinueButton>
          </div>
        ) : null}
      </div>
    </StageShell>
  )
}
