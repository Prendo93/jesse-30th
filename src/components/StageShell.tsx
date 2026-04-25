import type { ReactNode } from 'react'
import { HudChrome } from './HudChrome'
import { ScanlineOverlay } from './ScanlineOverlay'

type Props = {
  children: ReactNode
  stageName?: string
  backdrop?: string
}

export function StageShell({ children, stageName, backdrop }: Props) {
  return (
    <div
      data-testid="stage-shell"
      className="relative flex h-full w-full flex-col overflow-hidden bg-hud-night text-torch-50 shadow-hud"
      style={
        backdrop
          ? {
              backgroundImage: backdrop,
              backgroundSize: 'cover',
              backgroundPosition: 'center',
            }
          : undefined
      }
    >
      <HudChrome />
      {stageName ? (
        <div
          data-testid="stage-name"
          className="pointer-events-none absolute left-1/2 top-3 z-30 -translate-x-1/2 select-none font-rune text-sm tracking-[0.4em] text-hud-gold drop-shadow-[0_1px_0_#000]"
        >
          {stageName}
        </div>
      ) : null}

      <div className="relative z-10 flex flex-1 items-center justify-center px-6 py-10">
        {children}
      </div>

      <ScanlineOverlay />
    </div>
  )
}
