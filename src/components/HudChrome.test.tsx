import { render, screen } from '@testing-library/react'
import { describe, it, expect } from 'vitest'
import { HudChrome } from './HudChrome'

describe('HudChrome', () => {
  it('renders the lightning-bolt player glyph', () => {
    render(<HudChrome />)
    expect(screen.getByTestId('hud-bolt')).toBeInTheDocument()
  })

  it('renders the pause/menu corner glyph', () => {
    render(<HudChrome />)
    expect(screen.getByTestId('hud-pause')).toBeInTheDocument()
  })
})
