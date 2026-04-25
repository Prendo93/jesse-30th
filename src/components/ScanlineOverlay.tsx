export function ScanlineOverlay() {
  return (
    <div
      aria-hidden
      data-testid="scanline-overlay"
      className="pointer-events-none absolute inset-0 z-40 mix-blend-overlay opacity-30"
      style={{
        backgroundImage:
          'repeating-linear-gradient(to bottom, rgba(0,0,0,0.45) 0px, rgba(0,0,0,0.45) 1px, transparent 1px, transparent 3px)',
      }}
    />
  )
}
