import { act, fireEvent, render, screen } from '@testing-library/react'
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest'
import { CeremonyStage } from './CeremonyStage'
import { useGameStore } from '../store'

describe('CeremonyStage', () => {
  beforeEach(() => {
    vi.useFakeTimers()
    // Deterministic random for consistent rival-house scores
    vi.spyOn(Math, 'random').mockReturnValue(0.5)
    useGameStore.getState().reset()
    useGameStore.setState({ stage: 'ceremony' })
  })
  afterEach(() => {
    vi.useRealTimers()
    vi.restoreAllMocks()
  })

  it('renders the four houses with HUFFLEPUFF score equal to classes survived', () => {
    useGameStore.getState().markComplete('potionsDone')
    useGameStore.getState().markComplete('charmsDone')
    useGameStore.getState().markComplete('flyingDone')
    useGameStore.getState().markComplete('mazeDone')
    render(<CeremonyStage />)
    const huffle = screen.getByTestId('house-row-Hufflepuff')
    expect(huffle).toHaveTextContent('Hufflepuff')
    expect(huffle).toHaveTextContent('4')
  })

  it('rival houses each have a score of at least 80', () => {
    render(<CeremonyStage />)
    for (const house of ['Gryffindor', 'Slytherin', 'Ravenclaw']) {
      const row = screen.getByTestId(`house-row-${house}`)
      const score = Number(row.getAttribute('data-score'))
      expect(score).toBeGreaterThanOrEqual(80)
    }
  })

  it('declares Hufflepuff in last place and then offers the twist reveal', () => {
    render(<CeremonyStage />)

    act(() => {
      vi.advanceTimersByTime(2000)
    })
    expect(screen.getByTestId('ceremony-last-place')).toHaveTextContent(
      /HUFFLEPUFF/,
    )

    act(() => {
      vi.advanceTimersByTime(2000)
    })
    expect(screen.getByTestId('ceremony-twist')).toHaveTextContent(
      /unlocked a reward/i,
    )
  })

  it('clicking continue advances the store to gift', () => {
    render(<CeremonyStage />)
    act(() => {
      vi.advanceTimersByTime(4000)
    })
    fireEvent.click(screen.getByRole('button', { name: /claim reward/i }))
    expect(useGameStore.getState().stage).toBe('gift')
  })
})
