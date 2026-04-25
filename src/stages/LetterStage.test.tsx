import { fireEvent, render, screen } from '@testing-library/react'
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest'
import { LetterStage } from './LetterStage'
import { useGameStore } from '../store'

describe('LetterStage', () => {
  beforeEach(() => {
    vi.useFakeTimers()
    useGameStore.getState().reset()
  })
  afterEach(() => {
    vi.useRealTimers()
  })

  it('shows a closed envelope before any interaction', () => {
    render(<LetterStage />)
    expect(screen.getByTestId('letter-envelope')).toBeInTheDocument()
    expect(screen.queryByTestId('dialogue-box')).not.toBeInTheDocument()
  })

  it('opens the envelope on click and reveals the acceptance dialogue', () => {
    render(<LetterStage />)
    fireEvent.click(screen.getByTestId('letter-envelope'))

    expect(screen.getByTestId('dialogue-box')).toBeInTheDocument()
    expect(screen.getByTestId('dialogue-speaker')).toHaveTextContent(
      'HOGWARTS',
    )
  })

  it('clicking "Reluctantly Accept" advances the store from letter to sorting', () => {
    render(<LetterStage />)
    fireEvent.click(screen.getByTestId('letter-envelope'))
    fireEvent.click(screen.getByTestId('dialogue-box'))

    fireEvent.click(screen.getByRole('button', { name: /reluctantly accept/i }))

    expect(useGameStore.getState().stage).toBe('sorting')
  })

  it('only enables the accept button once the dialogue is fully revealed', () => {
    render(<LetterStage />)
    fireEvent.click(screen.getByTestId('letter-envelope'))

    const button = screen.getByRole('button', { name: /reluctantly accept/i })
    expect(button).toBeDisabled()

    fireEvent.click(screen.getByTestId('dialogue-box'))
    expect(button).toBeEnabled()
  })
})
