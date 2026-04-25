import { act, fireEvent, render, screen } from '@testing-library/react'
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest'
import { SortingStage } from './SortingStage'
import { useGameStore } from '../store'
import { sortingQuestions } from '../data/sortingQuestions'

const answerEvery = (pickIndex: (i: number) => number) => {
  for (let i = 0; i < sortingQuestions.length; i += 1) {
    const buttons = screen.getAllByTestId('sorting-answer')
    fireEvent.click(buttons[pickIndex(i)])
  }
}

// Drive all the chained phase timeouts to completion.
const advanceToReveal = () => {
  // Each phase schedules the next one inside its useEffect. We loop a
  // few advances so newly-scheduled timers also fire.
  for (let i = 0; i < 8; i += 1) {
    act(() => {
      vi.advanceTimersByTime(2000)
    })
  }
}

describe('SortingStage', () => {
  beforeEach(() => {
    vi.useFakeTimers()
    useGameStore.getState().reset()
    useGameStore.setState({ stage: 'sorting' })
  })
  afterEach(() => {
    vi.useRealTimers()
  })

  it('renders the first question on mount', () => {
    render(<SortingStage />)
    expect(screen.getByTestId('sorting-prompt')).toHaveTextContent(
      sortingQuestions[0].prompt,
    )
    expect(screen.getAllByTestId('sorting-answer')).toHaveLength(
      sortingQuestions[0].answers.length,
    )
  })

  it('advances to the next question after each answer', () => {
    render(<SortingStage />)
    fireEvent.click(screen.getAllByTestId('sorting-answer')[0])
    expect(screen.getByTestId('sorting-prompt')).toHaveTextContent(
      sortingQuestions[1].prompt,
    )
  })

  it.each([[0], [1], [2], [3]])(
    'always lands on HUFFLEPUFF regardless of answer index %i',
    (idx) => {
      render(<SortingStage />)
      answerEvery(() => idx)

      // After all questions answered, the "deeply concerned" beat appears.
      expect(screen.getByTestId('sorting-thinking')).toBeInTheDocument()

      advanceToReveal()
      expect(screen.getByTestId('sorting-reveal')).toHaveTextContent(
        /HUFFLEPUFF/,
      )
    },
  )

  it('walks through all reveal phases in order', () => {
    render(<SortingStage />)
    answerEvery(() => 0)

    expect(screen.getByTestId('sorting-thinking')).toBeInTheDocument()

    act(() => vi.advanceTimersByTime(1600))
    expect(screen.getByTestId('sorting-concerned-after')).toBeInTheDocument()

    act(() => vi.advanceTimersByTime(1600))
    expect(screen.getByTestId('sorting-analyzing')).toBeInTheDocument()
    expect(screen.getByTestId('sorting-progress-bar')).toBeInTheDocument()
    expect(screen.getByTestId('sorting-flash-house')).toBeInTheDocument()

    act(() => vi.advanceTimersByTime(4100))
    expect(screen.getByTestId('sorting-deliberation')).toBeInTheDocument()

    act(() => vi.advanceTimersByTime(4600))
    expect(screen.getByTestId('sorting-final-pause')).toBeInTheDocument()

    act(() => vi.advanceTimersByTime(1900))
    expect(screen.getByTestId('sorting-reveal')).toHaveTextContent(/HUFFLEPUFF/)
  })

  it("changes Jesse's expression on hovering an answer button", () => {
    render(<SortingStage />)
    const jesse = screen.getByTestId('jesse-character')
    expect(jesse).toHaveAttribute('data-expression', 'neutral')

    const answers = screen.getAllByTestId('sorting-answer')
    fireEvent.mouseEnter(answers[0])
    expect(jesse.getAttribute('data-expression')).not.toBe('neutral')

    fireEvent.mouseLeave(answers[0])
    expect(jesse).toHaveAttribute('data-expression', 'neutral')
  })

  it('clicking continue on the reveal advances the store to potions', () => {
    render(<SortingStage />)
    answerEvery(() => 2)
    advanceToReveal()
    fireEvent.click(screen.getByRole('button', { name: /proceed/i }))
    expect(useGameStore.getState().stage).toBe('potions')
  })
})
