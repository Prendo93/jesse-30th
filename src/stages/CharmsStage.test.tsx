import { act, fireEvent, render, screen } from '@testing-library/react'
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest'
import { CharmsStage } from './CharmsStage'
import { useGameStore } from '../store'

const readSequence = () =>
  screen
    .getByTestId('charms-state')
    .getAttribute('data-sequence')!
    .split(',')
    .filter(Boolean)
    .map(Number)

const phase = () =>
  screen.getByTestId('charms-state').getAttribute('data-phase')

const playSequence = (seq: number[]) => {
  for (const idx of seq) {
    fireEvent.click(screen.getByTestId(`charm-button-${idx}`))
  }
}

const advanceShowPhase = (length: number) => {
  // 600ms per step + a final tick to flip to input
  act(() => {
    vi.advanceTimersByTime(600 * (length + 1))
  })
}

describe('CharmsStage', () => {
  beforeEach(() => {
    vi.useFakeTimers()
    useGameStore.getState().reset()
    useGameStore.setState({ stage: 'charms' })
  })
  afterEach(() => {
    vi.useRealTimers()
    vi.restoreAllMocks()
  })

  it('starts in show phase with a 3-step sequence on round 0', () => {
    render(<CharmsStage />)
    expect(phase()).toBe('show')
    expect(readSequence()).toHaveLength(3)
  })

  it('transitions to input phase after the sequence has been shown', () => {
    render(<CharmsStage />)
    advanceShowPhase(3)
    expect(phase()).toBe('input')
  })

  it('advances to round 1 (length 4) after a correct round 0', () => {
    render(<CharmsStage />)
    advanceShowPhase(3)
    const seq = readSequence()
    playSequence(seq)
    expect(screen.getByTestId('charms-state').getAttribute('data-round')).toBe(
      '1',
    )
    expect(readSequence()).toHaveLength(4)
  })

  it('shows the success line and advances after two correct rounds', () => {
    render(<CharmsStage />)

    advanceShowPhase(3)
    playSequence(readSequence())

    advanceShowPhase(4)
    playSequence(readSequence())

    expect(screen.getByTestId('charms-result')).toHaveTextContent(/Lumos/)
    fireEvent.click(screen.getByRole('button', { name: /continue/i }))
    expect(useGameStore.getState().stage).toBe('flying')
    expect(useGameStore.getState().player.charmsDone).toBe(true)
  })

  it('shows the failure line and advances after two failures', () => {
    render(<CharmsStage />)
    advanceShowPhase(3)

    // First failure: pick a button that does not match index 0 of the sequence.
    const seq1 = readSequence()
    const wrong1 = (seq1[0] + 1) % 4
    fireEvent.click(screen.getByTestId(`charm-button-${wrong1}`))

    // Game restarts the sequence on failure (still in failed-out result, then re-show).
    advanceShowPhase(3)
    const seq2 = readSequence()
    const wrong2 = (seq2[0] + 1) % 4
    fireEvent.click(screen.getByTestId(`charm-button-${wrong2}`))

    expect(screen.getByTestId('charms-result')).toHaveTextContent(
      /We're choosing to move on/,
    )
    fireEvent.click(screen.getByRole('button', { name: /continue/i }))
    expect(useGameStore.getState().stage).toBe('flying')
  })
})
