import { useEffect, useRef, useState } from 'react'

/**
 * Reveals `text` one character at a time. A '\f' (form-feed) character
 * acts as an invisible pause sentinel: when the cursor reaches one, it
 * is consumed (never rendered) and the next visible character waits
 * `paragraphPauseMs` milliseconds before appearing.
 */
export function useTypewriter(
  text: string,
  charMs = 30,
  paragraphPauseMs = 0,
) {
  const [shown, setShown] = useState('')
  const skipRef = useRef(false)

  useEffect(() => {
    skipRef.current = false
    if (text.length === 0) {
      setShown('')
      return
    }
    setShown('')

    const visible = text.replace(/\f/g, '')
    let i = 0
    let cancelled = false
    let timer: ReturnType<typeof setTimeout> | null = null

    const visibleSoFar = () => text.slice(0, i).replace(/\f/g, '')

    const scheduleNext = () => {
      if (i >= text.length) return
      // Peek: if the next char is the pause sentinel, swallow it and
      // schedule the following character with the pause delay instead
      // of the per-char delay.
      if (text[i] === '\f') {
        i += 1
        if (i >= text.length) return
        timer = setTimeout(tick, paragraphPauseMs)
      } else {
        timer = setTimeout(tick, charMs)
      }
    }

    const tick = () => {
      if (cancelled) return
      if (skipRef.current) {
        setShown(visible)
        return
      }
      if (i >= text.length) return

      i += 1
      setShown(visibleSoFar())
      scheduleNext()
    }

    timer = setTimeout(tick, charMs)

    return () => {
      cancelled = true
      if (timer) clearTimeout(timer)
    }
  }, [text, charMs, paragraphPauseMs])

  const visible = text.replace(/\f/g, '')

  const skipToEnd = () => {
    skipRef.current = true
    setShown(visible)
  }

  const isComplete = shown === visible && visible.length > 0

  return { shown, isComplete, skipToEnd }
}
