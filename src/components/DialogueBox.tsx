import { useEffect, useRef } from 'react'
import { useTypewriter } from '../hooks/useTypewriter'

type Props = {
  speaker: string
  text: string
  onComplete?: () => void
}

export function DialogueBox({ speaker, text, onComplete }: Props) {
  const { shown, isComplete, skipToEnd } = useTypewriter(text)
  const calledRef = useRef(false)

  useEffect(() => {
    calledRef.current = false
  }, [text])

  useEffect(() => {
    if (isComplete && !calledRef.current) {
      calledRef.current = true
      onComplete?.()
    }
  }, [isComplete, onComplete])

  return (
    <div
      data-testid="dialogue-box"
      onClick={skipToEnd}
      className="absolute inset-x-0 bottom-0 z-20 cursor-pointer border-t-4 border-hud-gold bg-black/75 px-6 py-5 backdrop-blur-sm"
    >
      <div className="mx-auto flex max-w-3xl items-start gap-4">
        <div
          data-testid="dialogue-speaker"
          className="shrink-0 font-rune text-base font-bold uppercase tracking-[0.25em] text-hud-ember"
        >
          {speaker}
        </div>
        <div
          data-testid="dialogue-text"
          className="font-body text-lg leading-snug text-torch-50"
        >
          {shown}
        </div>
      </div>
    </div>
  )
}
