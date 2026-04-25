import { act, render, screen } from '@testing-library/react'
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest'
import { useTypewriter } from './useTypewriter'

function Probe({
  text,
  charMs,
  paragraphPauseMs,
}: {
  text: string
  charMs?: number
  paragraphPauseMs?: number
}) {
  const { shown } = useTypewriter(text, charMs, paragraphPauseMs)
  return <div data-testid="probe">{shown}</div>
}

describe('useTypewriter', () => {
  beforeEach(() => {
    vi.useFakeTimers()
  })
  afterEach(() => {
    vi.useRealTimers()
  })

  it('reveals characters at the configured cadence', () => {
    render(<Probe text="abc" charMs={30} />)
    act(() => {
      vi.advanceTimersByTime(30)
    })
    expect(screen.getByTestId('probe').textContent).toBe('a')
    act(() => {
      vi.advanceTimersByTime(60)
    })
    expect(screen.getByTestId('probe').textContent).toBe('abc')
  })

  it('pauses for paragraphPauseMs when it hits a paragraph break', () => {
    // "ab\n\ncd": after "ab" there is a paragraph break; the hook should
    // emit "ab\n\n", then pause, then start typing "cd".
    render(
      <Probe text={'ab\n\ncd'} charMs={30} paragraphPauseMs={3000} />,
    )

    // Type "a", then "b", then the two newlines should reveal together
    // without immediate progression onto "c".
    act(() => {
      vi.advanceTimersByTime(30 * 4)
    })
    expect(screen.getByTestId('probe').textContent).toBe('ab\n\n')

    // During the pause window, no further characters should appear.
    act(() => {
      vi.advanceTimersByTime(2900)
    })
    expect(screen.getByTestId('probe').textContent).toBe('ab\n\n')

    // After the pause, "c" then "d".
    act(() => {
      vi.advanceTimersByTime(120)
    })
    expect(screen.getByTestId('probe').textContent).toBe('ab\n\nc')
    act(() => {
      vi.advanceTimersByTime(30)
    })
    expect(screen.getByTestId('probe').textContent).toBe('ab\n\ncd')
  })
})
