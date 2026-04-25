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

  it('does not pause on plain blank lines (\\n\\n)', () => {
    render(<Probe text={'a\n\nb'} charMs={30} paragraphPauseMs={3000} />)
    // 4 ticks at 30ms each: 'a', '\n', '\n', 'b' — total 120ms.
    act(() => {
      vi.advanceTimersByTime(30 * 4)
    })
    expect(screen.getByTestId('probe').textContent).toBe('a\n\nb')
  })

  it('pauses on the explicit \\f sentinel and never renders it visibly', () => {
    render(<Probe text={'ab\fcd'} charMs={30} paragraphPauseMs={3000} />)

    // After 60ms we should have "ab" — the \f is consumed without being emitted
    // and triggers the pause, so progression halts here.
    act(() => {
      vi.advanceTimersByTime(60)
    })
    expect(screen.getByTestId('probe').textContent).toBe('ab')

    // During the pause window, no further characters appear.
    act(() => {
      vi.advanceTimersByTime(2900)
    })
    expect(screen.getByTestId('probe').textContent).toBe('ab')

    // After the pause, "c" then "d".
    act(() => {
      vi.advanceTimersByTime(120)
    })
    expect(screen.getByTestId('probe').textContent).toBe('abc')
    act(() => {
      vi.advanceTimersByTime(30)
    })
    expect(screen.getByTestId('probe').textContent).toBe('abcd')
  })
})
