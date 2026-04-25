import { fireEvent, render, screen } from '@testing-library/react'
import { describe, expect, it, beforeEach } from 'vitest'
import { GiftStage } from './GiftStage'
import { useGameStore } from '../store'

describe('GiftStage', () => {
  beforeEach(() => {
    useGameStore.getState().reset()
    useGameStore.setState({ stage: 'gift' })
  })

  it('shows a closed treasure chest by default', () => {
    render(<GiftStage />)
    expect(screen.getByTestId('gift-chest')).toBeInTheDocument()
    expect(screen.queryByTestId('gift-message')).not.toBeInTheDocument()
  })

  it('opens the chest on click and reveals the gift message', () => {
    render(<GiftStage />)
    fireEvent.click(screen.getByTestId('gift-chest'))
    const message = screen.getByTestId('gift-message')
    expect(message).toHaveTextContent(/Jesse/)
    expect(message).toHaveTextContent(/Cursed Child/)
  })

  it('reveal includes a styled ticket-stub element', () => {
    render(<GiftStage />)
    fireEvent.click(screen.getByTestId('gift-chest'))
    expect(screen.getByTestId('gift-ticket')).toBeInTheDocument()
  })
})
