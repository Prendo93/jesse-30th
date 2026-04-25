import { fireEvent, render, screen } from '@testing-library/react'
import { beforeEach, describe, expect, it } from 'vitest'
import { RiddleStage } from './RiddleStage'
import { useGameStore } from '../store'
import { dialogue } from '../data/dialogue'

const submitGuess = (text: string) => {
  fireEvent.change(screen.getByTestId('riddle-input'), {
    target: { value: text },
  })
  fireEvent.click(screen.getByTestId('riddle-submit'))
}

const allAnswers = dialogue.riddle.riddles.map((r) => r.answer)

describe('RiddleStage', () => {
  beforeEach(() => {
    useGameStore.getState().reset()
    useGameStore.setState({ stage: 'riddle' })
  })

  it('shows the first cryptic clue and Peeves intro on mount', () => {
    render(<RiddleStage />)
    expect(screen.getByTestId('riddle-clue')).toHaveTextContent(
      /Welsh estuary leads forth to kid enthusiast/i,
    )
    expect(screen.getByTestId('riddle-progress')).toHaveTextContent(/1 of 4/)
  })

  it('rejects a wrong answer with feedback and stays on the same clue', () => {
    render(<RiddleStage />)
    submitGuess('SNAPE')
    expect(screen.getByTestId('riddle-feedback')).toBeInTheDocument()
    expect(screen.getByTestId('riddle-clue')).toHaveTextContent(/Welsh estuary/i)
  })

  it('a correct answer advances to the next clue', () => {
    render(<RiddleStage />)
    submitGuess(allAnswers[0])
    expect(screen.getByTestId('riddle-progress')).toHaveTextContent(/2 of 4/)
    expect(screen.getByTestId('riddle-clue')).toHaveTextContent(
      /Soundly angled supplies district/i,
    )
  })

  it('answers are case- and whitespace-insensitive', () => {
    render(<RiddleStage />)
    submitGuess('  aberforth  ')
    expect(screen.getByTestId('riddle-progress')).toHaveTextContent(/2 of 4/)
  })

  it('"DIAGON ALLEY" can be entered as "diagonalley" or "diagon alley"', () => {
    render(<RiddleStage />)
    submitGuess(allAnswers[0])
    submitGuess('diagon alley')
    expect(screen.getByTestId('riddle-progress')).toHaveTextContent(/3 of 4/)
  })

  it('solving all four riddles shows the final correct line and continue button', () => {
    render(<RiddleStage />)
    for (const answer of allAnswers) {
      submitGuess(answer)
    }
    expect(screen.getByTestId('riddle-correct')).toBeInTheDocument()
    expect(
      screen.getByRole('button', { name: /continue/i }),
    ).toBeInTheDocument()
  })

  it('clicking continue marks riddleDone and advances to maze', () => {
    render(<RiddleStage />)
    for (const answer of allAnswers) {
      submitGuess(answer)
    }
    fireEvent.click(screen.getByRole('button', { name: /continue/i }))
    expect(useGameStore.getState().player.riddleDone).toBe(true)
    expect(useGameStore.getState().stage).toBe('maze')
  })

  it('disables the submit button when the input is empty', () => {
    render(<RiddleStage />)
    expect(screen.getByTestId('riddle-submit')).toBeDisabled()
    fireEvent.change(screen.getByTestId('riddle-input'), {
      target: { value: 'a' },
    })
    expect(screen.getByTestId('riddle-submit')).toBeEnabled()
  })
})
