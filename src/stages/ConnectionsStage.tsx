import { useState } from 'react'
import { motion } from 'framer-motion'
import { StageShell } from '../components/StageShell'
import { ContinueButton } from '../components/ContinueButton'
import { dialogue } from '../data/dialogue'
import {
  ALL_WORDS,
  categoryByKey,
  categoryFor,
  CONNECTIONS_CATEGORIES,
  MAX_MISTAKES,
  oneAwayCategory,
  type CategoryKey,
} from '../data/connections'
import { useGameStore } from '../store'
import { Backdrop } from '../art/Backdrop'
import { Jesse, type JesseExpression } from '../art/Jesse'

type Phase = 'play' | 'won' | 'lost'

export function ConnectionsStage() {
  const advance = useGameStore((s) => s.advance)
  const markComplete = useGameStore((s) => s.markComplete)
  const [selected, setSelected] = useState<string[]>([])
  const [solved, setSolved] = useState<CategoryKey[]>([])
  const [mistakes, setMistakes] = useState(0)
  const [message, setMessage] = useState<string | null>(null)
  const [shake, setShake] = useState(0)
  const [expression, setExpression] = useState<JesseExpression>('neutral')
  const copy = dialogue.potions

  const phase: Phase =
    solved.length === CONNECTIONS_CATEGORIES.length
      ? 'won'
      : mistakes >= MAX_MISTAKES
      ? 'lost'
      : 'play'

  const solvedWords = new Set(
    solved.flatMap((k) => categoryByKey(k).words),
  )
  const remaining = ALL_WORDS.filter((w) => !solvedWords.has(w))

  const toggle = (word: string) => {
    if (phase !== 'play') return
    if (selected.includes(word)) {
      setSelected(selected.filter((w) => w !== word))
      return
    }
    if (selected.length >= 4) return
    setSelected([...selected, word])
  }

  const submit = () => {
    if (selected.length !== 4 || phase !== 'play') return
    const match = categoryFor(selected)
    if (match) {
      setSolved([...solved, match])
      setSelected([])
      setMessage(`Got it: ${categoryByKey(match).label}.`)
      return
    }
    const oneAway = oneAwayCategory(selected)
    setMistakes(mistakes + 1)
    setMessage(oneAway ? 'One away…' : 'Not quite.')
    setShake((n) => n + 1)
    setSelected([])
  }

  const onContinue = () => {
    markComplete('potionsDone')
    advance()
  }

  const onShuffle = () => {
    // Selection clear acts as a "shuffle/reset selection".
    setSelected([])
  }

  return (
    <StageShell backdrop={<Backdrop name="dungeon" />}>
      <Jesse
        pose="mixing"
        chub={1}
        house="Hufflepuff"
        expression={expression}
        className="pointer-events-none absolute bottom-2 right-4 z-10 h-[55%] w-auto drop-shadow-[6px_6px_0_rgba(0,0,0,0.6)]"
      />
      <div className="relative z-20 flex w-full max-w-3xl flex-col items-center gap-4 rounded border-4 border-hud-gold bg-black/75 p-6 backdrop-blur-sm">
        <header className="flex w-full items-center justify-between">
          <h2 className="font-rune text-xl uppercase tracking-[0.3em] text-hud-gold">
            Connections — Wizarding World
          </h2>
          <span
            data-testid="connections-mistakes"
            className="font-rune text-sm uppercase tracking-[0.2em] text-hud-ember"
          >
            Mistakes: {mistakes}/{MAX_MISTAKES}
          </span>
        </header>

        {/* Solved category rows */}
        <div className="flex w-full flex-col gap-2">
          {solved.map((key) => {
            const cat = categoryByKey(key)
            return (
              <div
                key={key}
                data-testid={`connections-solved-${key}`}
                className="flex flex-col items-center justify-center gap-1 rounded border-2 border-hud-gold px-3 py-3 text-center"
                style={{ backgroundColor: cat.color }}
              >
                <p className="font-rune text-sm uppercase tracking-[0.3em] text-hud-gold drop-shadow-[1px_1px_0_#000]">
                  {cat.label}
                </p>
                <p className="font-rune text-base tracking-[0.15em] text-torch-50">
                  {cat.words.join(' · ')}
                </p>
              </div>
            )
          })}
        </div>

        {/* Remaining word grid */}
        {remaining.length > 0 ? (
          <motion.div
            key={shake}
            animate={
              shake > 0
                ? { x: [0, -8, 8, -6, 6, -3, 3, 0] }
                : { x: 0 }
            }
            transition={{ duration: 0.4 }}
            className="grid w-full grid-cols-4 gap-2"
          >
            {remaining.map((word) => {
              const isSelected = selected.includes(word)
              return (
                <button
                  key={word}
                  type="button"
                  data-testid={`connections-word-${word}`}
                  data-selected={isSelected ? 'true' : 'false'}
                  onClick={() => toggle(word)}
                  onMouseEnter={() =>
                    setExpression(isSelected ? 'sad' : 'worried')
                  }
                  onMouseLeave={() => setExpression('neutral')}
                  disabled={phase !== 'play'}
                  className={`min-h-[3.5rem] border-2 px-2 py-3 font-rune text-sm uppercase tracking-[0.15em] transition disabled:cursor-not-allowed ${
                    isSelected
                      ? 'border-hud-gold bg-hud-ember text-hud-night shadow-[inset_0_0_0_2px_#0d0a07]'
                      : 'border-hud-gold/60 bg-hud-stone/80 text-torch-50 hover:bg-hud-ember/30'
                  }`}
                >
                  {word}
                </button>
              )
            })}
          </motion.div>
        ) : null}

        {/* Status / controls */}
        {message ? (
          <p
            data-testid="connections-message"
            className="font-body text-base italic text-torch-50/90"
          >
            {message}
          </p>
        ) : null}

        {phase === 'play' ? (
          <div className="flex gap-3">
            <button
              type="button"
              onClick={onShuffle}
              className="border-2 border-hud-gold/60 bg-hud-stone px-4 py-2 font-rune text-sm uppercase tracking-[0.2em] text-torch-50/80 transition hover:bg-hud-ember/30"
            >
              Deselect
            </button>
            <button
              type="button"
              data-testid="connections-submit"
              onClick={submit}
              disabled={selected.length !== 4}
              className="border-4 border-hud-gold bg-hud-stone px-5 py-2 font-rune text-sm uppercase tracking-[0.2em] text-hud-gold disabled:cursor-not-allowed disabled:opacity-40"
            >
              Submit ({selected.length}/4)
            </button>
          </div>
        ) : (
          <div className="flex flex-col items-center gap-3 pt-2">
            <p
              data-testid="connections-outcome"
              className="font-rune text-xl uppercase tracking-[0.2em] text-hud-gold"
            >
              {phase === 'won' ? copy.correctOutcome : copy.incorrectOutcome}
            </p>
            <p
              data-testid="snape-line"
              className="font-body text-base italic text-torch-50"
            >
              {phase === 'won' ? copy.correct : copy.incorrect}
            </p>
            <ContinueButton onClick={onContinue}>Continue</ContinueButton>
          </div>
        )}
      </div>
    </StageShell>
  )
}
