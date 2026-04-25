import { useEffect, useRef } from 'react'

/**
 * Calls `onFrame(dtMs)` on each requestAnimationFrame, with the time
 * delta clamped to a sensible upper bound so a long pause (tab
 * backgrounded) doesn't fast-forward the world.
 */
export function useGameLoop(
  onFrame: (dtMs: number) => void,
  enabled = true,
  maxDtMs = 50,
) {
  const lastRef = useRef<number | null>(null)
  const onFrameRef = useRef(onFrame)
  onFrameRef.current = onFrame

  useEffect(() => {
    if (!enabled) {
      lastRef.current = null
      return
    }
    let raf = 0
    const tick = (t: number) => {
      const last = lastRef.current ?? t
      const dt = Math.min(maxDtMs, t - last)
      lastRef.current = t
      if (dt > 0) onFrameRef.current(dt)
      raf = requestAnimationFrame(tick)
    }
    raf = requestAnimationFrame(tick)
    return () => {
      cancelAnimationFrame(raf)
      lastRef.current = null
    }
  }, [enabled, maxDtMs])
}
