import { useState } from 'react'
import { StageShell } from '../components/StageShell'
import { dialogue } from '../data/dialogue'

export function GiftStage() {
  const [opened, setOpened] = useState(false)
  const copy = dialogue.gift

  return (
    <StageShell stageName="REWARD">
      <div className="flex w-full max-w-2xl flex-col items-center gap-8 text-center">
        {!opened ? (
          <button
            type="button"
            data-testid="gift-chest"
            onClick={() => setOpened(true)}
            aria-label="Open the chest"
            className="group relative h-48 w-72 cursor-pointer transition-transform hover:scale-105"
          >
            <div className="absolute inset-x-0 bottom-0 h-2/3 border-4 border-hud-gold bg-torch-200 shadow-[8px_8px_0_#000]" />
            <div className="absolute inset-x-0 top-0 h-1/2 origin-bottom border-4 border-hud-gold bg-torch-100 transition-transform group-hover:-rotate-x-12" />
            <div
              aria-hidden
              className="absolute left-1/2 top-1/2 h-10 w-10 -translate-x-1/2 -translate-y-1/2 bg-hud-night shadow-inner"
            />
          </button>
        ) : (
          <div
            data-testid="gift-message"
            className="flex flex-col items-center gap-6"
          >
            <p className="font-body text-lg italic text-torch-50/80">
              {copy.intro}
            </p>
            <h1
              className="bg-gradient-to-b from-hud-gold to-torch-200 bg-clip-text font-rune text-5xl text-transparent drop-shadow-[0_2px_0_#000]"
            >
              {copy.headline}
            </h1>
            <div
              data-testid="gift-ticket"
              className="relative grid grid-cols-[1fr_auto] items-center gap-4 border-4 border-hud-gold bg-hud-stone px-6 py-5 text-left shadow-[8px_8px_0_#000]"
              style={{
                clipPath:
                  'polygon(0 8%, 4% 0, 96% 0, 100% 8%, 100% 92%, 96% 100%, 4% 100%, 0 92%)',
              }}
            >
              <div>
                <p className="font-rune text-xs uppercase tracking-[0.4em] text-hud-ember">
                  Admit One
                </p>
                <p className="mt-1 font-rune text-2xl text-hud-gold">
                  Harry Potter and the Cursed Child
                </p>
                <p className="mt-1 font-body text-sm text-torch-50/80">
                  {copy.body}
                </p>
              </div>
              <div className="border-l-2 border-dashed border-hud-gold/60 pl-4 font-rune text-3xl text-hud-gold">
                30
              </div>
            </div>
          </div>
        )}
      </div>
    </StageShell>
  )
}
