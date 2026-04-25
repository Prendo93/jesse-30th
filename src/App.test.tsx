import { render, screen } from '@testing-library/react'
import { describe, it, expect } from 'vitest'
import App from './App'

describe('canary', () => {
  it('renders the canary heading so the test harness is wired up', () => {
    render(<App />)
    expect(screen.getByTestId('canary')).toHaveTextContent(/Hogwarts/i)
  })
})
