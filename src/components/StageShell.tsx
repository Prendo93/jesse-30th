import type { ReactNode } from 'react'
import { HudChrome } from './HudChrome'
import { ScanlineOverlay } from './ScanlineOverlay'

type Props = {
  children: ReactNode
  backdrop?: ReactNode
}

export function StageShell({ children, backdrop }: Props) {
  return (
    <div
      data-testid="stage-shell"
      className="relative flex h-full w-full flex-col overflow-hidden bg-hud-night text-torch-50 shadow-hud"
    >
      {backdrop ? (
        <div className="pointer-events-none absolute inset-0 z-0">
          {backdrop}
        </div>
      ) : null}

      <HudChrome />

      {/* Scroll wrapper: outer is the scroll container so the HUD chrome
          and scanline overlay stay fixed, while the inner pads and
          centres content with min-h-full so short stages stay
          centred and tall stages scroll into view. */}
      <div className="relative z-10 flex-1 overflow-y-auto overflow-x-hidden">
        <div className="flex min-h-full items-center justify-center px-3 py-6 sm:px-6 sm:py-10">
          {children}
        </div>
      </div>

      <ScanlineOverlay />
    </div>
  )
}
