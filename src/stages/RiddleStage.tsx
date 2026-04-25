import { useState, type FormEvent } from 'react'
import { motion } from 'framer-motion'
import { StageShell } from '../components/StageShell'
import { ContinueButton } from '../components/ContinueButton'
import { dialogue } from '../data/dialogue'
import { useGameStore } from '../store'
import { Backdrop } from '../art/Backdrop'
import { Jesse, type JesseExpression } from '../art/Jesse'

const normalise = (s: string) =>
  s
    .trim()
    .toUpperCase()
    .replace(/[^A-Z]/g, '')

export function RiddleStage() {
  const advance = useGameStore((s) => s.advance)
  const markComplete = useGameStore((s) => s.markComplete)
  const copy = dialogue.riddle
  const total = copy.riddles.length

  const [riddleIdx, setRiddleIdx] = useState(0)
  const [guess, setGuess] = useState('')
  const [attempts, setAttempts] = useState(0)
  const [solvedAll, setSolvedAll] = useState(false)
  const [shake, setShake] = useState(0)
  const [feedback, setFeedback] = useState<'idle' | 'wrong' | 'rightStep'>('idle')
  const [expression, setExpression] = useState<JesseExpression>('worried')

  const currentRiddle = copy.riddles[riddleIdx]

  const onSubmit = (e: FormEvent) => {
    e.preventDefault()
    if (solvedAll) return
    const ok = normalise(guess) === normalise(currentRiddle.answer)
    setAttempts(attempts + 1)
    if (!ok) {
      setShake((n) => n + 1)
      setExpression('afraid')
      setFeedback('wrong')
      return
    }
    if (riddleIdx < total - 1) {
      setRiddleIdx(riddleIdx + 1)
      setGuess('')
      setAttempts(0)
      setFeedback('rightStep')
      setExpression('worried')
    } else {
      setSolvedAll(true)
      setExpression('neutral')
      setFeedback('idle')
    }
  }

  const onContinue = () => {
    markComplete('riddleDone')
    advance()
  }

  return (
    <StageShell backdrop={<Backdrop name="classroom" />}>
      <Jesse
        pose="reading"
        chub={2}
        house="Hufflepuff"
        expression={expression}
        className="pointer-events-none absolute bottom-0 left-4 z-10 h-[60%] w-auto drop-shadow-[6px_6px_0_rgba(0,0,0,0.6)]"
      />

      <motion.div
        key={shake}
        animate={shake > 0 ? { x: [0, -8, 8, -6, 6, -3, 3, 0] } : { x: 0 }}
        transition={{ duration: 0.4 }}
        className="relative z-20 flex w-full max-w-2xl flex-col items-center gap-5 rounded border-4 border-hud-gold bg-black/75 p-6 text-center backdrop-blur-sm"
      >
        <div className="border-l-4 border-hud-ember bg-black/50 px-4 py-3 text-left">
          <p className="font-rune text-xs uppercase tracking-[0.3em] text-hud-ember">
            {copy.intro.speaker}
          </p>
          <p className="font-body text-base italic text-torch-50/90">
            “{copy.intro.body}”
          </p>
        </div>

        {!solvedAll ? (
          <>
            <p
              data-testid="riddle-progress"
              className="font-body text-sm uppercase tracking-[0.3em] text-hud-gold/70"
            >
              Clue {riddleIdx + 1} of {total}
            </p>
            <p
              data-testid="riddle-clue"
              className="font-rune text-2xl uppercase tracking-[0.15em] text-hud-gold drop-shadow-[2px_2px_0_#000]"
            >
              “{currentRiddle.clue}”
            </p>

            <p className="font-body text-base text-torch-50/80">
              {copy.instructions}
            </p>

            <form onSubmit={onSubmit} className="flex w-full max-w-md flex-col gap-3">
              <input
                type="text"
                data-testid="riddle-input"
                autoFocus
                value={guess}
                onChange={(e) => setGuess(e.target.value)}
                aria-label="Riddle answer"
                className="border-2 border-hud-gold bg-hud-night/80 px-3 py-2 text-center font-rune text-xl uppercase tracking-[0.3em] text-hud-gold outline-none focus:border-hud-ember"
                placeholder="?"
              />
              <button
                type="submit"
                data-testid="riddle-submit"
                disabled={guess.trim().length === 0}
                className="border-4 border-hud-gold bg-hud-stone px-5 py-2 font-rune text-sm uppercase tracking-[0.3em] text-hud-gold disabled:cursor-not-allowed disabled:opacity-40"
              >
                Answer
              </button>
              {feedback === 'wrong' && attempts > 0 ? (
                <p
                  data-testid="riddle-feedback"
                  className="font-body text-sm italic text-hud-ember"
                >
                  {copy.wrong}
                </p>
              ) : null}
              {feedback === 'rightStep' ? (
                <p
                  data-testid="riddle-step-correct"
                  className="font-body text-sm italic text-hud-gold"
                >
                  {copy.intermediateCorrect}
                </p>
              ) : null}
            </form>
          </>
        ) : (
          <div className="flex flex-col items-center gap-3">
            <p
              data-testid="riddle-correct"
              className="font-body text-base italic text-torch-50"
            >
              {copy.finalCorrect}
            </p>
            <ContinueButton onClick={onContinue}>Continue</ContinueButton>
          </div>
        )}
      </motion.div>
    </StageShell>
  )
}
