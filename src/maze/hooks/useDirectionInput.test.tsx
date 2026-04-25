import { act, render, screen } from '@testing-library/react'
import { describe, expect, it } from 'vitest'
import { useDirectionInput } from './useDirectionInput'

function Probe() {
  const dir = useDirectionInput()
  return <div data-testid="dir">{dir ?? 'none'}</div>
}

const dispatchKey = (key: string) => {
  act(() => {
    window.dispatchEvent(new KeyboardEvent('keydown', { key }))
  })
}

const dispatchSwipe = (dx: number, dy: number) => {
  const start = new TouchEvent('touchstart', {
    touches: [
      // @ts-expect-error: jsdom Touch is loose
      { clientX: 100, clientY: 100, identifier: 0 },
    ],
  })
  const end = new TouchEvent('touchend', {
    changedTouches: [
      // @ts-expect-error: jsdom Touch is loose
      { clientX: 100 + dx, clientY: 100 + dy, identifier: 0 },
    ],
  })
  act(() => {
    window.dispatchEvent(start)
    window.dispatchEvent(end)
  })
}

describe('useDirectionInput', () => {
  it('returns null with no input', () => {
    render(<Probe />)
    expect(screen.getByTestId('dir').textContent).toBe('none')
  })

  it('maps arrow keys to directions', () => {
    render(<Probe />)
    dispatchKey('ArrowRight')
    expect(screen.getByTestId('dir').textContent).toBe('right')
    dispatchKey('ArrowUp')
    expect(screen.getByTestId('dir').textContent).toBe('up')
  })

  it('maps WASD to directions', () => {
    render(<Probe />)
    dispatchKey('w')
    expect(screen.getByTestId('dir').textContent).toBe('up')
    dispatchKey('a')
    expect(screen.getByTestId('dir').textContent).toBe('left')
    dispatchKey('s')
    expect(screen.getByTestId('dir').textContent).toBe('down')
    dispatchKey('d')
    expect(screen.getByTestId('dir').textContent).toBe('right')
  })

  it('horizontal swipe → left/right', () => {
    render(<Probe />)
    dispatchSwipe(60, 5)
    expect(screen.getByTestId('dir').textContent).toBe('right')
    dispatchSwipe(-60, 5)
    expect(screen.getByTestId('dir').textContent).toBe('left')
  })

  it('vertical swipe → up/down', () => {
    render(<Probe />)
    dispatchSwipe(5, 60)
    expect(screen.getByTestId('dir').textContent).toBe('down')
    dispatchSwipe(5, -60)
    expect(screen.getByTestId('dir').textContent).toBe('up')
  })

  it('ignores swipes shorter than the threshold', () => {
    render(<Probe />)
    dispatchSwipe(5, 5)
    expect(screen.getByTestId('dir').textContent).toBe('none')
  })
})
