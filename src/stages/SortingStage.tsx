import { useEffect, useState } from 'react'
import { StageShell } from '../components/StageShell'
import { ContinueButton } from '../components/ContinueButton'
import { dialogue } from '../data/dialogue'
import { sortingQuestions } from '../data/sortingQuestions'
import { useGameStore } from '../store'
import { Backdrop } from '../art/Backdrop'
import { Jesse, type JesseExpression } from '../art/Jesse'

type Phase =
  | 'asking'
  | 'concerned'
  | 'concernedAfter'
  | 'analyzing'
  | 'deliberation'
  | 'finalPause'
  | 'reveal'

const ANSWER_EXPRESSIONS: JesseExpression[] = [
  'worried',
  'afraid',
  'anxious',
  'sad',
]

const FLASH_HOUSES = ['Gryffindor', 'Ravenclaw', 'Slytherin'] as const

const PHASE_DURATIONS: Record<Exclude<Phase, 'asking' | 'reveal'>, number> = {
  concerned: 1500,
  concernedAfter: 1500,
  analyzing: 4000,
  deliberation: 4500,
  finalPause: 1800,
}

export function SortingStage() {
  const [questionIndex, setQuestionIndex] = useState(0)
  const [phase, setPhase] = useState<Phase>('asking')
  const [expression, setExpression] = useState<JesseExpression>('neutral')
  const [flashHouseIdx, setFlashHouseIdx] = useState(0)
  const [analyzeProgress, setAnalyzeProgress] = useState(0)
  const advance = useGameStore((s) => s.advance)
  const current = sortingQuestions[questionIndex]

  const onAnswer = () => {
    if (questionIndex < sortingQuestions.length - 1) {
      setQuestionIndex(questionIndex + 1)
    } else {
      setPhase('concerned')
    }
  }

  // Phase machine: each phase auto-advances after its duration.
  useEffect(() => {
    if (phase === 'asking' || phase === 'reveal') return
    const next: Record<typeof phase, Phase> = {
      concerned: 'concernedAfter',
      concernedAfter: 'analyzing',
      analyzing: 'deliberation',
      deliberation: 'finalPause',
      finalPause: 'reveal',
    }
    const id = setTimeout(() => setPhase(next[phase]), PHASE_DURATIONS[phase])
    return () => clearTimeout(id)
  }, [phase])

  // Analyzing phase: animate progress bar and flash houses.
  useEffect(() => {
    if (phase !== 'analyzing') return
    const start = Date.now()
    const total = PHASE_DURATIONS.analyzing
    const progressId = setInterval(() => {
      const pct = Math.min(100, ((Date.now() - start) / total) * 100)
      setAnalyzeProgress(pct)
    }, 50)
    const flashId = setInterval(() => {
      setFlashHouseIdx((i) => (i + 1) % FLASH_HOUSES.length)
    }, 400)
    return () => {
      clearInterval(progressId)
      clearInterval(flashId)
      setAnalyzeProgress(0)
    }
  }, [phase])

  return (
    <StageShell backdrop={<Backdrop name="great-hall" />}>
      <Jesse
        pose="default"
        chub={0}
        expression={expression}
        className="pointer-events-none absolute bottom-0 left-4 z-10 h-[55%] w-auto drop-shadow-[6px_6px_0_rgba(0,0,0,0.6)]"
      />
      <div className="relative z-20 flex w-full max-w-2xl flex-col items-center gap-6 rounded border-4 border-hud-gold bg-black/70 p-6 text-center backdrop-blur-sm">
        {phase === 'asking' ? (
          <>
            <p
              data-testid="sorting-prompt"
              className="font-rune text-2xl text-hud-gold"
            >
              {current.prompt}
            </p>
            <div className="flex flex-col gap-3 self-stretch">
              {current.answers.map((answer, i) => (
                <button
                  key={i}
                  type="button"
                  data-testid="sorting-answer"
                  onClick={onAnswer}
                  onMouseEnter={() =>
                    setExpression(ANSWER_EXPRESSIONS[i % ANSWER_EXPRESSIONS.length])
                  }
                  onMouseLeave={() => setExpression('neutral')}
                  className="border-2 border-hud-gold bg-hud-stone/80 px-4 py-3 font-body text-lg text-torch-50 transition hover:bg-hud-ember/40"
                >
                  {answer}
                </button>
              ))}
            </div>
            <p className="text-sm text-torch-50/60">
              Question {questionIndex + 1} of {sortingQuestions.length}
            </p>
          </>
        ) : null}

        {phase === 'concerned' ? (
          <p
            data-testid="sorting-thinking"
            className="font-rune text-2xl italic text-hud-gold"
          >
            {dialogue.sorting.concerned}
          </p>
        ) : null}

        {phase === 'concernedAfter' ? (
          <>
            <p
              data-testid="sorting-thinking"
              className="font-rune text-2xl italic text-hud-gold"
            >
              {dialogue.sorting.concerned}
            </p>
            <p
              data-testid="sorting-concerned-after"
              className="font-rune text-2xl uppercase tracking-[0.2em] text-hud-ember"
            >
              {dialogue.sorting.concernedAfter}
            </p>
          </>
        ) : null}

        {phase === 'analyzing' ? (
          <div
            data-testid="sorting-analyzing"
            className="flex w-full flex-col items-center gap-4"
          >
            <p className="font-rune text-xl uppercase tracking-[0.2em] text-hud-gold">
              {dialogue.sorting.analyzing}
            </p>
            <div className="h-3 w-full max-w-md border-2 border-hud-gold bg-hud-night/80">
              <div
                data-testid="sorting-progress-bar"
                className="h-full bg-hud-gold transition-[width] duration-75"
                style={{ width: `${analyzeProgress}%` }}
              />
            </div>
            <p
              data-testid="sorting-flash-house"
              className="font-rune text-3xl uppercase tracking-[0.3em] text-hud-ember"
            >
              {FLASH_HOUSES[flashHouseIdx]}…
            </p>
          </div>
        ) : null}

        {phase === 'deliberation' ? (
          <p
            data-testid="sorting-deliberation"
            className="font-body text-lg italic text-torch-50"
          >
            {dialogue.sorting.deliberation}
          </p>
        ) : null}

        {phase === 'finalPause' ? (
          <p
            data-testid="sorting-final-pause"
            className="font-rune text-2xl italic text-hud-gold"
          >
            {dialogue.sorting.finalPause}
          </p>
        ) : null}

        {phase === 'reveal' ? (
          <>
            <p
              data-testid="sorting-reveal"
              className="font-rune text-5xl uppercase tracking-[0.3em] text-hud-gold drop-shadow-[2px_2px_0_#000]"
            >
              {dialogue.sorting.reveal.body}
            </p>
            <ContinueButton onClick={() => advance()}>
              Proceed to your first class
            </ContinueButton>
          </>
        ) : null}
      </div>
    </StageShell>
  )
}
