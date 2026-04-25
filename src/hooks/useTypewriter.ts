import { useEffect, useRef, useState } from 'react'

/**
 * Reveals `text` one character at a time. When the cursor crosses a
 * paragraph break (the second '\n' of a `\n\n` sequence), the next
 * character waits `paragraphPauseMs` milliseconds before it appears.
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

    let i = 0
    let cancelled = false
    let timer: ReturnType<typeof setTimeout> | null = null

    const tick = () => {
      if (cancelled) return
      if (skipRef.current) {
        setShown(text)
        return
      }
      i += 1
      const slice = text.slice(0, i)
      setShown(slice)
      if (i >= text.length) return

      // If we've just emitted the second of a paired '\n\n', pause longer
      // before the next character.
      const justEmitted = text[i - 1]
      const prev = text[i - 2]
      const isParagraphBreak = justEmitted === '\n' && prev === '\n'
      const delay = isParagraphBreak ? paragraphPauseMs : charMs

      timer = setTimeout(tick, delay)
    }

    timer = setTimeout(tick, charMs)

    return () => {
      cancelled = true
      if (timer) clearTimeout(timer)
    }
  }, [text, charMs, paragraphPauseMs])

  const skipToEnd = () => {
    skipRef.current = true
    setShown(text)
  }

  const isComplete = shown === text && text.length > 0

  return { shown, isComplete, skipToEnd }
}
