import { fireEvent, render, screen } from '@testing-library/react'
import { beforeEach, describe, expect, it } from 'vitest'
import { ConnectionsStage } from './ConnectionsStage'
import { useGameStore } from '../store'
import { CONNECTIONS_CATEGORIES } from '../data/connections'

const click = (word: string) => {
  fireEvent.click(screen.getByTestId(`connections-word-${word}`))
}

const submit = () => {
  fireEvent.click(screen.getByTestId('connections-submit'))
}

describe('ConnectionsStage', () => {
  beforeEach(() => {
    useGameStore.getState().reset()
    useGameStore.setState({ stage: 'potions' })
  })

  it('renders all 16 words and a submit button', () => {
    render(<ConnectionsStage />)
    for (const cat of CONNECTIONS_CATEGORIES) {
      for (const word of cat.words) {
        expect(screen.getByTestId(`connections-word-${word}`)).toBeInTheDocument()
      }
    }
    expect(screen.getByTestId('connections-submit')).toBeDisabled()
  })

  it('shows the Snape intro explaining why the class must be passed', () => {
    render(<ConnectionsStage />)
    const intro = screen.getByTestId('connections-intro')
    expect(intro).toHaveTextContent('SNAPE')
    expect(intro).toHaveTextContent(/Most Ancient and Most Noble House of Black/)
    expect(intro).toHaveTextContent(/four kindreds/)
  })

  it('shuffles the word grid (not in canonical category order)', () => {
    // Math.random is mocked to a fixed sequence so the shuffle is
    // deterministic but not the canonical [Black, flowers, astronomy, staff]
    // order.
    const seq = [0.9, 0.1, 0.7, 0.3, 0.5, 0.2, 0.8, 0.4, 0.6, 0.05, 0.55, 0.35, 0.25, 0.65, 0.15]
    let i = 0
    vi.spyOn(Math, 'random').mockImplementation(() => seq[i++ % seq.length])

    render(<ConnectionsStage />)
    const buttons = screen.getAllByRole('button')
    const wordButtons = buttons.filter((b) =>
      b.getAttribute('data-testid')?.startsWith('connections-word-'),
    )
    const renderedOrder = wordButtons.map((b) => b.textContent?.trim())

    // The canonical order would put Sirius/Bellatrix/Andromeda/Regulus first.
    // The shuffled order should put something different first.
    expect(renderedOrder[0]).not.toBe('SIRIUS')
    vi.restoreAllMocks()
  })

  it('shuffle button reorders the remaining words', () => {
    render(<ConnectionsStage />)
    const before = screen
      .getAllByRole('button')
      .filter((b) => b.getAttribute('data-testid')?.startsWith('connections-word-'))
      .map((b) => b.textContent?.trim())
      .join(',')

    // Mock Math.random for the shuffle click to a different sequence.
    vi.spyOn(Math, 'random').mockReturnValue(0.123)
    fireEvent.click(screen.getByTestId('connections-shuffle'))

    const after = screen
      .getAllByRole('button')
      .filter((b) => b.getAttribute('data-testid')?.startsWith('connections-word-'))
      .map((b) => b.textContent?.trim())
      .join(',')

    expect(after).not.toBe(before)
    vi.restoreAllMocks()
  })

  it('shuffle button clears the current selection', () => {
    render(<ConnectionsStage />)
    click('SIRIUS')
    expect(
      screen.getByTestId('connections-word-SIRIUS').getAttribute('data-selected'),
    ).toBe('true')
    fireEvent.click(screen.getByTestId('connections-shuffle'))
    expect(
      screen.getByTestId('connections-word-SIRIUS').getAttribute('data-selected'),
    ).toBe('false')
  })

  it('selecting four words enables submit', () => {
    render(<ConnectionsStage />)
    click('SIRIUS')
    click('BELLATRIX')
    click('ANDROMEDA')
    expect(screen.getByTestId('connections-submit')).toBeDisabled()
    click('REGULUS')
    expect(screen.getByTestId('connections-submit')).toBeEnabled()
  })

  it('a correct group locks into a solved row', () => {
    render(<ConnectionsStage />)
    click('SIRIUS')
    click('BELLATRIX')
    click('ANDROMEDA')
    click('REGULUS')
    submit()
    expect(screen.getByTestId('connections-solved-blackFamily')).toBeInTheDocument()
    // Those words are no longer selectable in the grid.
    expect(screen.queryByTestId('connections-word-SIRIUS')).not.toBeInTheDocument()
  })

  it('a wrong submission increments the mistake counter and clears selection', () => {
    render(<ConnectionsStage />)
    click('SIRIUS')
    click('LILY')
    click('DRACO')
    click('MINERVA')
    submit()
    expect(screen.getByTestId('connections-mistakes')).toHaveTextContent('1/4')
    expect(screen.getByTestId('connections-message')).toHaveTextContent(/Not quite/)
    // Selection cleared.
    expect(
      screen.getByTestId('connections-word-SIRIUS').getAttribute('data-selected'),
    ).toBe('false')
  })

  it('three-of-four overlap surfaces a "One away…" hint', () => {
    render(<ConnectionsStage />)
    click('SIRIUS')
    click('BELLATRIX')
    click('ANDROMEDA')
    click('LILY')
    submit()
    expect(screen.getByTestId('connections-message')).toHaveTextContent(
      /One away/,
    )
  })

  it('solving all four categories shows the won outcome and continues to charms', () => {
    render(<ConnectionsStage />)

    for (const cat of CONNECTIONS_CATEGORIES) {
      for (const word of cat.words) click(word)
      submit()
    }

    expect(screen.getByTestId('connections-outcome')).toHaveTextContent(
      /All four groups solved/i,
    )
    fireEvent.click(screen.getByRole('button', { name: /continue/i }))
    expect(useGameStore.getState().player.potionsDone).toBe(true)
    expect(useGameStore.getState().stage).toBe('charms')
  })

  it('hitting MAX_MISTAKES still advances to charms', () => {
    render(<ConnectionsStage />)

    for (let i = 0; i < 4; i += 1) {
      // Pick four words that don't form a category.
      click('SIRIUS')
      click('LILY')
      click('DRACO')
      click('MINERVA')
      submit()
    }

    expect(screen.getByTestId('connections-outcome')).toHaveTextContent(
      /Incomplete/i,
    )
    fireEvent.click(screen.getByRole('button', { name: /continue/i }))
    expect(useGameStore.getState().stage).toBe('charms')
  })
})
