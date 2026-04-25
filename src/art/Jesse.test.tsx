import { render, screen } from '@testing-library/react'
import { describe, expect, it } from 'vitest'
import { Jesse } from './Jesse'

describe('Jesse', () => {
  it('renders the lightning scar and exposes the pose as data-pose', () => {
    render(<Jesse pose="wand" />)
    const node = screen.getByTestId('jesse-character')
    expect(node).toHaveAttribute('data-pose', 'wand')
  })

  it('exposes chub and expression on data-attrs', () => {
    render(<Jesse pose="default" chub={3} expression="anxious" />)
    const node = screen.getByTestId('jesse-character')
    expect(node).toHaveAttribute('data-chub', '3')
    expect(node).toHaveAttribute('data-expression', 'anxious')
  })

  it('renders a Hufflepuff badge when house is Hufflepuff', () => {
    render(<Jesse pose="default" house="Hufflepuff" />)
    expect(screen.getByTestId('jesse-house-badge')).toBeInTheDocument()
  })

  it('omits the house badge when no house is set', () => {
    render(<Jesse pose="default" />)
    expect(screen.queryByTestId('jesse-house-badge')).not.toBeInTheDocument()
  })
})
