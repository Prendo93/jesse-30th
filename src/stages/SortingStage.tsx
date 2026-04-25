import { useEffect, useState } from 'react'
import { StageShell } from '../components/StageShell'
import { ContinueButton } from '../components/ContinueButton'
import { dialogue } from '../data/dialogue'
import { sortingQuestions } from '../data/sortingQuestions'
import { useGameStore } from '../store'
import { Backdrop } from '../art/Backdrop'
import { Jesse, type JesseExpression } from '../art/Jesse'

type Phase = 'asking' | 'thinking' | 'reveal'

const THINKING_MS = 2500
const ANSWER_EXPRESSIONS: JesseExpression[] = [
  'worried',
  'afraid',
  'anxious',
  'sad',
]

export function SortingStage() {
  const [questionIndex, setQuestionIndex] = useState(0)
  const [phase, setPhase] = useState<Phase>('asking')
  const [expression, setExpression] = useState<JesseExpression>('neutral')
  const advance = useGameStore((s) => s.advance)
  const current = sortingQuestions[questionIndex]

  const onAnswer = () => {
    if (questionIndex < sortingQuestions.length - 1) {
      setQuestionIndex(questionIndex + 1)
    } else {
      setPhase('thinking')
    }
  }

  useEffect(() => {
    if (phase !== 'thinking') return
    const id = setTimeout(() => setPhase('reveal'), THINKING_MS)
    return () => clearTimeout(id)
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

        {phase === 'thinking' ? (
          <p
            data-testid="sorting-thinking"
            className="animate-pulse font-rune text-3xl text-hud-gold"
          >
            {dialogue.sorting.thinking}
          </p>
        ) : null}

        {phase === 'reveal' ? (
          <>
            <p
              data-testid="sorting-reveal"
              className="font-rune text-3xl uppercase tracking-[0.2em] text-hud-gold"
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
