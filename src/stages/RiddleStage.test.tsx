import { fireEvent, render, screen } from '@testing-library/react'
import { beforeEach, describe, expect, it } from 'vitest'
import { RiddleStage } from './RiddleStage'
import { useGameStore } from '../store'

const submitGuess = (text: string) => {
  fireEvent.change(screen.getByTestId('riddle-input'), {
    target: { value: text },
  })
  fireEvent.click(screen.getByTestId('riddle-submit'))
}

describe('RiddleStage', () => {
  beforeEach(() => {
    useGameStore.getState().reset()
    useGameStore.setState({ stage: 'riddle' })
  })

  it('shows the cryptic clue and Peeves intro', () => {
    render(<RiddleStage />)
    expect(screen.getByTestId('riddle-clue')).toHaveTextContent(
      /Welsh estuary leads forth to kid enthusiast/i,
    )
  })

  it('rejects a wrong answer with feedback and stays on the input', () => {
    render(<RiddleStage />)
    submitGuess('SNAPE')
    expect(screen.getByTestId('riddle-feedback')).toBeInTheDocument()
    expect(screen.queryByTestId('riddle-correct')).not.toBeInTheDocument()
  })

  it('accepts ABERFORTH (case- and whitespace-insensitive)', () => {
    render(<RiddleStage />)
    submitGuess('  aberforth  ')
    expect(screen.getByTestId('riddle-correct')).toBeInTheDocument()
  })

  it('clicking continue marks riddleDone and advances to maze', () => {
    render(<RiddleStage />)
    submitGuess('Aberforth')
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
