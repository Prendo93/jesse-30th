import { useState } from 'react'
import { StageShell } from '../components/StageShell'
import { DialogueBox } from '../components/DialogueBox'
import { ContinueButton } from '../components/ContinueButton'
import { dialogue } from '../data/dialogue'
import { useGameStore } from '../store'

export function LetterStage() {
  const [opened, setOpened] = useState(false)
  const [dialogueDone, setDialogueDone] = useState(false)
  const advance = useGameStore((s) => s.advance)
  const copy = dialogue.letter

  return (
    <StageShell>
      <div className="flex flex-col items-center gap-12">
        {!opened ? (
          <button
            type="button"
            data-testid="letter-envelope"
            onClick={() => setOpened(true)}
            aria-label="Open the Hogwarts letter"
            className="group relative h-44 w-72 cursor-pointer transition-transform hover:scale-105"
          >
            <div className="absolute inset-0 border-4 border-hud-gold bg-torch-50 shadow-[8px_8px_0_#000]" />
            <div className="absolute inset-x-0 top-0 h-1/2 origin-bottom border-b-4 border-hud-gold bg-torch-100/90 transition-transform group-hover:-rotate-x-12" />
            <div
              aria-hidden
              className="absolute left-1/2 top-1/2 h-12 w-12 -translate-x-1/2 -translate-y-1/2 rotate-45 bg-hud-ember shadow-[0_0_8px_#000]"
            />
          </button>
        ) : (
          <ContinueButton
            data-testid="letter-accept"
            disabled={!dialogueDone}
            onClick={() => advance()}
          >
            {copy.accept}
          </ContinueButton>
        )}
      </div>

      {opened ? (
        <DialogueBox
          speaker={copy.speaker}
          text={copy.body}
          onComplete={() => setDialogueDone(true)}
        />
      ) : null}
    </StageShell>
  )
}
