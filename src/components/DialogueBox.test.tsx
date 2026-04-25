import { act, fireEvent, render, screen } from '@testing-library/react'
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest'
import { DialogueBox } from './DialogueBox'

describe('DialogueBox', () => {
  beforeEach(() => {
    vi.useFakeTimers()
  })
  afterEach(() => {
    vi.useRealTimers()
  })

  it('renders the speaker name in the dialogue band', () => {
    render(<DialogueBox speaker="HAT" text="Hello." />)
    expect(screen.getByTestId('dialogue-speaker')).toHaveTextContent('HAT')
  })

  it('reveals text character by character via the typewriter', () => {
    render(<DialogueBox speaker="HAT" text="abc" />)

    // Nothing typed yet on the first frame
    expect(screen.getByTestId('dialogue-text').textContent).toBe('')

    act(() => {
      vi.advanceTimersByTime(30)
    })
    expect(screen.getByTestId('dialogue-text').textContent).toBe('a')

    act(() => {
      vi.advanceTimersByTime(30)
    })
    expect(screen.getByTestId('dialogue-text').textContent).toBe('ab')

    act(() => {
      vi.advanceTimersByTime(30)
    })
    expect(screen.getByTestId('dialogue-text').textContent).toBe('abc')
  })

  it('clicking skips the typewriter to the full text immediately', () => {
    render(<DialogueBox speaker="HAT" text="abcdef" />)

    fireEvent.click(screen.getByTestId('dialogue-box'))

    expect(screen.getByTestId('dialogue-text').textContent).toBe('abcdef')
  })

  it('fires onComplete once the full line has been revealed', () => {
    const onComplete = vi.fn()
    render(
      <DialogueBox speaker="HAT" text="ab" onComplete={onComplete} />,
    )

    act(() => {
      vi.advanceTimersByTime(30)
    })
    expect(onComplete).not.toHaveBeenCalled()

    act(() => {
      vi.advanceTimersByTime(30)
    })
    expect(onComplete).toHaveBeenCalledTimes(1)
  })
})
