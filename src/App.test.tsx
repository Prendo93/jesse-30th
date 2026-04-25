import { fireEvent, render, screen } from '@testing-library/react'
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest'
import App from './App'
import { useGameStore } from './store'

describe('App router', () => {
  beforeEach(() => {
    vi.useFakeTimers()
    useGameStore.getState().reset()
  })
  afterEach(() => {
    vi.useRealTimers()
  })

  it('renders the letter stage when the store is at "letter"', () => {
    render(<App />)
    expect(screen.getByTestId('letter-envelope')).toBeInTheDocument()
  })

  it('routes to the next stage when the store advances', () => {
    render(<App />)
    fireEvent.click(screen.getByTestId('letter-envelope'))
    fireEvent.click(screen.getByTestId('letter-parchment'))
    fireEvent.click(screen.getByRole('button', { name: /^accept$/i }))
    expect(useGameStore.getState().stage).toBe('sorting')
  })
})
