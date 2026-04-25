import { describe, it, expect } from 'vitest'
import {
  arePotionIngredientsCorrect,
  CORRECT_RECIPE,
} from './potionsRecipe'

describe('arePotionIngredientsCorrect', () => {
  it('returns true for the canonical recipe', () => {
    expect(arePotionIngredientsCorrect([...CORRECT_RECIPE])).toBe(true)
  })

  it('returns false when the order is shuffled', () => {
    const shuffled = [...CORRECT_RECIPE].reverse()
    expect(arePotionIngredientsCorrect(shuffled)).toBe(false)
  })

  it('returns false when the length is wrong', () => {
    expect(arePotionIngredientsCorrect(CORRECT_RECIPE.slice(0, 2))).toBe(false)
    expect(
      arePotionIngredientsCorrect([...CORRECT_RECIPE, 'A Bean'] as never),
    ).toBe(false)
  })

  it('returns false for an empty order', () => {
    expect(arePotionIngredientsCorrect([])).toBe(false)
  })
})
