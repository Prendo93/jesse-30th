import { useEffect, useRef, useState } from 'react'
import type { Direction } from '../types'

const KEY_MAP: Record<string, Direction> = {
  ArrowUp: 'up',
  ArrowDown: 'down',
  ArrowLeft: 'left',
  ArrowRight: 'right',
  w: 'up',
  W: 'up',
  s: 'down',
  S: 'down',
  a: 'left',
  A: 'left',
  d: 'right',
  D: 'right',
}

const SWIPE_THRESHOLD = 30

/**
 * Tracks the player's intended direction from keyboard / WASD / swipe
 * gestures. The direction persists until a new input changes it
 * (classic Pac-Man feel: the input is an *intent*, not a per-frame
 * action).
 */
export function useDirectionInput(): Direction | null {
  const [direction, setDirection] = useState<Direction | null>(null)
  const touchStart = useRef<{ x: number; y: number } | null>(null)

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      const next = KEY_MAP[e.key]
      if (next) {
        setDirection(next)
        e.preventDefault()
      }
    }
    const onTouchStart = (e: TouchEvent) => {
      const t = e.touches[0]
      if (t) touchStart.current = { x: t.clientX, y: t.clientY }
    }
    const onTouchEnd = (e: TouchEvent) => {
      const start = touchStart.current
      touchStart.current = null
      if (!start) return
      const t = e.changedTouches[0]
      if (!t) return
      const dx = t.clientX - start.x
      const dy = t.clientY - start.y
      if (Math.abs(dx) < SWIPE_THRESHOLD && Math.abs(dy) < SWIPE_THRESHOLD) {
        return
      }
      if (Math.abs(dx) > Math.abs(dy)) {
        setDirection(dx > 0 ? 'right' : 'left')
      } else {
        setDirection(dy > 0 ? 'down' : 'up')
      }
    }

    window.addEventListener('keydown', onKey)
    window.addEventListener('touchstart', onTouchStart, { passive: true })
    window.addEventListener('touchend', onTouchEnd, { passive: true })
    return () => {
      window.removeEventListener('keydown', onKey)
      window.removeEventListener('touchstart', onTouchStart)
      window.removeEventListener('touchend', onTouchEnd)
    }
  }, [])

  return direction
}
