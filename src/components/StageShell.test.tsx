import { render, screen } from '@testing-library/react'
import { describe, it, expect } from 'vitest'
import { StageShell } from './StageShell'

describe('StageShell', () => {
  it('renders its children inside the framed shell', () => {
    render(
      <StageShell>
        <p>Stage content</p>
      </StageShell>,
    )
    expect(screen.getByTestId('stage-shell')).toBeInTheDocument()
    expect(screen.getByText('Stage content')).toBeInTheDocument()
  })

  it('always renders the persistent HUD chrome (lightning-bolt + pause)', () => {
    render(
      <StageShell>
        <span />
      </StageShell>,
    )
    expect(screen.getByTestId('hud-bolt')).toBeInTheDocument()
    expect(screen.getByTestId('hud-pause')).toBeInTheDocument()
  })

  it('does not render a visible stage-name banner', () => {
    render(
      <StageShell>
        <span />
      </StageShell>,
    )
    expect(screen.queryByTestId('stage-name')).not.toBeInTheDocument()
  })
})
