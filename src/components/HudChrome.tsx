export function HudChrome() {
  return (
    <>
      <div
        data-testid="hud-bolt"
        aria-hidden
        className="pointer-events-none absolute left-3 top-3 z-30 select-none font-rune text-3xl font-extrabold text-hud-gold drop-shadow-[0_0_4px_rgba(0,0,0,0.8)]"
      >
        ⚡
      </div>
      <div
        data-testid="hud-pause"
        aria-hidden
        className="pointer-events-none absolute right-3 top-3 z-30 flex select-none gap-1"
      >
        <span className="block h-5 w-1.5 bg-hud-gold" />
        <span className="block h-5 w-1.5 bg-hud-gold" />
      </div>
    </>
  )
}
