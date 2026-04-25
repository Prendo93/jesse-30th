import { useEffect, useMemo, useState } from 'react'
import { StageShell } from '../components/StageShell'
import { ContinueButton } from '../components/ContinueButton'
import { dialogue } from '../data/dialogue'
import { useGameStore } from '../store'
import { Backdrop } from '../art/Backdrop'
import { Jesse } from '../art/Jesse'

const HOUSES = ['Gryffindor', 'Slytherin', 'Ravenclaw'] as const

type Phase = 'tally' | 'lastPlace' | 'twist'

export function CeremonyStage() {
  const advance = useGameStore((s) => s.advance)
  const [phase, setPhase] = useState<Phase>('tally')

  const rivalScores = useMemo(
    () =>
      Object.fromEntries(
        HOUSES.map((h) => [h, Math.floor(80 + Math.random() * 60)]),
      ) as Record<(typeof HOUSES)[number], number>,
    [],
  )

  useEffect(() => {
    const t1 = setTimeout(() => setPhase('lastPlace'), 1500)
    const t2 = setTimeout(() => setPhase('twist'), 3500)
    return () => {
      clearTimeout(t1)
      clearTimeout(t2)
    }
  }, [])

  return (
    <StageShell backdrop={<Backdrop name="ceremony-hall" />}>
      <Jesse
        pose="default"
        className="pointer-events-none absolute bottom-0 right-2 z-10 h-[55%] w-auto drop-shadow-[6px_6px_0_rgba(0,0,0,0.6)]"
      />
      <div className="relative z-20 flex w-full max-w-2xl flex-col items-center gap-6 rounded border-4 border-hud-gold bg-black/70 p-6 backdrop-blur-sm">
        <h2 className="font-rune text-3xl uppercase tracking-[0.4em] text-hud-gold">
          {dialogue.ceremony.title}
        </h2>

        <ul className="flex w-full flex-col gap-2">
          {HOUSES.map((house) => (
            <li
              key={house}
              data-testid={`house-row-${house}`}
              data-score={rivalScores[house]}
              className="flex items-center justify-between border-2 border-hud-gold/40 bg-black/40 px-4 py-2 font-body text-lg"
            >
              <span>{house}</span>
              <span className="font-rune text-hud-gold">
                {rivalScores[house]}
              </span>
            </li>
          ))}
          <li
            data-testid="house-row-Hufflepuff"
            data-score={3}
            className="flex items-center justify-between border-2 border-hud-ember bg-hud-ember/20 px-4 py-2 font-body text-lg"
          >
            <span>Hufflepuff</span>
            <span className="font-rune text-hud-gold">3</span>
          </li>
        </ul>

        {phase !== 'tally' ? (
          <p
            data-testid="ceremony-last-place"
            className="text-center font-rune text-xl uppercase tracking-[0.2em] text-hud-ember"
          >
            {dialogue.ceremony.lastPlace}
          </p>
        ) : null}

        {phase === 'twist' ? (
          <>
            <p
              data-testid="ceremony-twist"
              className="text-center font-body text-lg italic text-torch-50"
            >
              {dialogue.ceremony.twist}
            </p>
            <ContinueButton onClick={() => advance()}>
              Claim Reward
            </ContinueButton>
          </>
        ) : null}
      </div>
    </StageShell>
  )
}
