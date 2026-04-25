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
