import { useEffect, useRef, useState } from 'react'

export function useTypewriter(text: string, charMs = 30) {
  const [shown, setShown] = useState('')
  const indexRef = useRef(0)

  useEffect(() => {
    indexRef.current = 0
    setShown('')

    const id = setInterval(() => {
      indexRef.current += 1
      if (indexRef.current >= text.length) {
        setShown(text)
        clearInterval(id)
        return
      }
      setShown(text.slice(0, indexRef.current))
    }, charMs)

    return () => clearInterval(id)
  }, [text, charMs])

  const skipToEnd = () => setShown(text)
  const isComplete = shown === text && text.length > 0

  return { shown, isComplete, skipToEnd }
}
