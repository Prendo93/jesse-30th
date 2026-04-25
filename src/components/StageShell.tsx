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

      <div className="relative z-10 flex flex-1 items-center justify-center px-6 py-10">
        {children}
      </div>

      <ScanlineOverlay />
    </div>
  )
}
