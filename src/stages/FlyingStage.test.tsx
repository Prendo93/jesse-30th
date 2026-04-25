import { act, fireEvent, render, screen } from '@testing-library/react'
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest'
import { FlyingStage } from './FlyingStage'
import { useGameStore } from '../store'

const readPosition = () =>
  Number(screen.getByTestId('flying-state').getAttribute('data-position'))

describe('FlyingStage', () => {
  beforeEach(() => {
    vi.useFakeTimers()
    useGameStore.getState().reset()
    useGameStore.setState({ stage: 'flying' })
  })
  afterEach(() => {
    vi.useRealTimers()
  })

  it('starts at position 0 and ticks upward', () => {
    render(<FlyingStage />)
    expect(readPosition()).toBe(0)
    act(() => {
      vi.advanceTimersByTime(50)
    })
    expect(readPosition()).toBeGreaterThan(0)
  })

  it('renders the perfect outcome line when clicked at position 50', () => {
    render(<FlyingStage />)
    // Step is 5 per tick (50ms cadence) → 10 ticks reaches exactly 50.
    act(() => {
      vi.advanceTimersByTime(500)
    })
    expect(readPosition()).toBe(50)
    fireEvent.click(screen.getByRole('button', { name: /mount broom/i }))
    expect(screen.getByTestId('flying-result')).toHaveTextContent(/3cm/)
    expect(useGameStore.getState().player.flyingDone).toBe(true)
  })

  it('renders the fail outcome when clicked at position 0', () => {
    render(<FlyingStage />)
    fireEvent.click(screen.getByRole('button', { name: /mount broom/i }))
    expect(screen.getByTestId('flying-result')).toHaveTextContent(
      /grounded/i,
    )
  })

  it('continue button advances the store to ceremony', () => {
    render(<FlyingStage />)
    fireEvent.click(screen.getByRole('button', { name: /mount broom/i }))
    fireEvent.click(screen.getByRole('button', { name: /continue/i }))
    expect(useGameStore.getState().stage).toBe('ceremony')
  })
})
