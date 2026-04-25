import { fireEvent, render, screen } from '@testing-library/react'
import { beforeEach, describe, expect, it } from 'vitest'
import { PotionsStage } from './PotionsStage'
import { useGameStore } from '../store'
import { CORRECT_RECIPE, POTION_INGREDIENTS } from '../data/potionsRecipe'

const addIngredient = (name: string) => {
  fireEvent.click(screen.getByTestId(`ingredient-${name}`))
}

describe('PotionsStage', () => {
  beforeEach(() => {
    useGameStore.getState().reset()
    useGameStore.setState({ stage: 'potions' })
  })

  it('shows all 6 ingredients and an empty cauldron', () => {
    render(<PotionsStage />)
    for (const ingredient of POTION_INGREDIENTS) {
      expect(screen.getByTestId(`ingredient-${ingredient}`)).toBeInTheDocument()
    }
    expect(screen.queryAllByTestId('cauldron-slot-filled')).toHaveLength(0)
  })

  it('disables the Brew button until 3 ingredients are in the cauldron', () => {
    render(<PotionsStage />)
    const brewBtn = screen.getByRole('button', { name: /brew/i })
    expect(brewBtn).toBeDisabled()

    addIngredient(POTION_INGREDIENTS[0])
    addIngredient(POTION_INGREDIENTS[1])
    expect(brewBtn).toBeDisabled()

    addIngredient(POTION_INGREDIENTS[2])
    expect(brewBtn).toBeEnabled()
  })

  it('shows Snape\'s correct line when the recipe matches', () => {
    render(<PotionsStage />)
    for (const ingredient of CORRECT_RECIPE) {
      addIngredient(ingredient)
    }
    fireEvent.click(screen.getByRole('button', { name: /brew/i }))
    expect(screen.getByTestId('potion-outcome')).toHaveTextContent(
      /Mild Disappointment/,
    )
    expect(screen.getByTestId('snape-line')).toHaveTextContent(
      /Correct/,
    )
  })

  it('shows Snape\'s incorrect line when the recipe is wrong', () => {
    render(<PotionsStage />)
    addIngredient('Slimy Leaf')
    addIngredient('Something Glowing')
    addIngredient('Questionable Liquid')
    fireEvent.click(screen.getByRole('button', { name: /brew/i }))
    expect(screen.getByTestId('potion-outcome')).toHaveTextContent(
      /Slightly Different Disappointment/,
    )
    expect(screen.getByTestId('snape-line')).toHaveTextContent(
      /Incorrect/,
    )
  })

  it('marks potions complete and continues to charms regardless of correctness', () => {
    render(<PotionsStage />)
    addIngredient('Slimy Leaf')
    addIngredient('Something Glowing')
    addIngredient('Questionable Liquid')
    fireEvent.click(screen.getByRole('button', { name: /brew/i }))
    fireEvent.click(screen.getByRole('button', { name: /continue/i }))

    expect(useGameStore.getState().player.potionsDone).toBe(true)
    expect(useGameStore.getState().stage).toBe('charms')
  })

  it('lets the player remove an ingredient by clicking its slot', () => {
    render(<PotionsStage />)
    addIngredient('Slimy Leaf')
    expect(screen.getAllByTestId('cauldron-slot-filled')).toHaveLength(1)
    fireEvent.click(screen.getAllByTestId('cauldron-slot-filled')[0])
    expect(screen.queryAllByTestId('cauldron-slot-filled')).toHaveLength(0)
  })
})
