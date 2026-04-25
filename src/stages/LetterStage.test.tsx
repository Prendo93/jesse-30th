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

  it('shows a sealed envelope before any interaction', () => {
    render(<LetterStage />)
    expect(screen.getByTestId('letter-envelope')).toBeInTheDocument()
    expect(screen.queryByTestId('letter-parchment')).not.toBeInTheDocument()
  })

  it('opens the envelope on click and reveals the parchment + handwritten content', () => {
    render(<LetterStage />)
    fireEvent.click(screen.getByTestId('letter-envelope'))

    expect(screen.getByTestId('letter-parchment')).toBeInTheDocument()
    expect(screen.getByTestId('letter-content')).toBeInTheDocument()
  })

  it('does not show the accept button until the writing has finished', () => {
    render(<LetterStage />)
    fireEvent.click(screen.getByTestId('letter-envelope'))

    expect(
      screen.queryByRole('button', { name: /^accept$/i }),
    ).not.toBeInTheDocument()

    // Click on the parchment skips the handwriting to the end, which
    // mounts the button.
    fireEvent.click(screen.getByTestId('letter-parchment'))
    expect(
      screen.getByRole('button', { name: /^accept$/i }),
    ).toBeInTheDocument()
  })

  it('clicking "Accept" advances the store to sorting', () => {
    render(<LetterStage />)
    fireEvent.click(screen.getByTestId('letter-envelope'))
    fireEvent.click(screen.getByTestId('letter-parchment'))
    fireEvent.click(screen.getByRole('button', { name: /^accept$/i }))
    expect(useGameStore.getState().stage).toBe('sorting')
  })
})
