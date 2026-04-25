import { useState } from 'react'
import { StageShell } from '../components/StageShell'
import { ContinueButton } from '../components/ContinueButton'
import { dialogue } from '../data/dialogue'
import {
  arePotionIngredientsCorrect,
  POTION_INGREDIENTS,
  type Ingredient,
} from '../data/potionsRecipe'
import { useGameStore } from '../store'

const SLOT_COUNT = 3

export function PotionsStage() {
  const [dropped, setDropped] = useState<Ingredient[]>([])
  const [outcome, setOutcome] = useState<null | {
    correct: boolean
  }>(null)
  const advance = useGameStore((s) => s.advance)
  const markComplete = useGameStore((s) => s.markComplete)
  const copy = dialogue.potions

  const addIngredient = (i: Ingredient) => {
    if (outcome) return
    if (dropped.length >= SLOT_COUNT) return
    setDropped([...dropped, i])
  }

  const removeAt = (idx: number) => {
    if (outcome) return
    setDropped(dropped.filter((_, i) => i !== idx))
  }

  const onBrew = () => {
    setOutcome({ correct: arePotionIngredientsCorrect(dropped) })
  }

  const onContinue = () => {
    markComplete('potionsDone')
    advance()
  }

  return (
    <StageShell>
      <div className="grid w-full max-w-4xl gap-8 md:grid-cols-[1fr_auto_1fr]">
        <section>
          <h3 className="mb-3 font-rune text-xl uppercase tracking-[0.3em] text-hud-gold">
            Ingredients
          </h3>
          <ul className="flex flex-col gap-2">
            {POTION_INGREDIENTS.map((i) => (
              <li key={i}>
                <button
                  type="button"
                  data-testid={`ingredient-${i}`}
                  onClick={() => addIngredient(i)}
                  disabled={!!outcome || dropped.length >= SLOT_COUNT}
                  className="w-full border-2 border-hud-gold/60 bg-hud-stone/70 px-3 py-2 text-left font-body text-base text-torch-50 transition hover:bg-hud-ember/40 disabled:cursor-not-allowed disabled:opacity-40"
                >
                  {i}
                </button>
              </li>
            ))}
          </ul>
        </section>

        <section className="flex flex-col items-center gap-4">
          <div
            data-testid="cauldron"
            className="relative h-44 w-44 rounded-full border-4 border-hud-gold bg-gradient-to-b from-torch-700 to-hud-night shadow-[inset_0_-12px_30px_rgba(0,0,0,0.7)]"
          >
            <div className="absolute inset-x-2 top-2 flex flex-col gap-1">
              {dropped.map((i, idx) => (
                <button
                  key={idx}
                  type="button"
                  data-testid="cauldron-slot-filled"
                  onClick={() => removeAt(idx)}
                  className="border border-hud-gold/60 bg-black/60 px-2 py-1 text-xs text-torch-50 transition hover:bg-hud-ember/30"
                >
                  {i}
                </button>
              ))}
              {Array.from({ length: SLOT_COUNT - dropped.length }).map((_, i) => (
                <div
                  key={`empty-${i}`}
                  className="h-7 border border-dashed border-hud-gold/40"
                />
              ))}
            </div>
          </div>

          {!outcome ? (
            <button
              type="button"
              onClick={onBrew}
              disabled={dropped.length < SLOT_COUNT}
              className="border-4 border-hud-gold bg-hud-stone px-5 py-2 font-rune text-lg uppercase tracking-[0.3em] text-hud-gold disabled:cursor-not-allowed disabled:opacity-40"
            >
              Brew
            </button>
          ) : (
            <ContinueButton onClick={onContinue}>Continue</ContinueButton>
          )}
        </section>

        <section>
          <h3 className="mb-3 font-rune text-xl uppercase tracking-[0.3em] text-hud-gold">
            Recipe Hint
          </h3>
          <p className="font-body text-base italic text-torch-50/70">
            {copy.intro.body}
          </p>
        </section>
      </div>

      {outcome ? (
        <div className="absolute inset-x-0 bottom-0 z-20 border-t-4 border-hud-gold bg-black/80 px-6 py-5">
          <div className="mx-auto flex max-w-3xl flex-col gap-1">
            <p
              data-testid="potion-outcome"
              className="font-rune text-xl uppercase tracking-[0.2em] text-hud-gold"
            >
              {outcome.correct ? copy.correctOutcome : copy.incorrectOutcome}
            </p>
            <p
              data-testid="snape-line"
              className="font-body text-lg text-torch-50"
            >
              {outcome.correct ? copy.correct : copy.incorrect}
            </p>
          </div>
        </div>
      ) : null}
    </StageShell>
  )
}
