import { beforeEach, describe, expect, it } from 'vitest'
import { useGameStore } from './store'
import { STAGES } from './types'

describe('useGameStore', () => {
  beforeEach(() => {
    useGameStore.getState().reset()
  })

  it('starts at the letter stage with Hufflepuff and no class flags set', () => {
    const { stage, player } = useGameStore.getState()
    expect(stage).toBe('letter')
    expect(player).toEqual({
      house: 'Hufflepuff',
      potionsDone: false,
      charmsDone: false,
      flyingDone: false,
    })
  })

  it('advances through every stage in order and stops at gift', () => {
    for (let i = 0; i < STAGES.length - 1; i += 1) {
      expect(useGameStore.getState().stage).toBe(STAGES[i])
      useGameStore.getState().advance()
    }
    expect(useGameStore.getState().stage).toBe('gift')
    // calling advance at the terminus is a no-op
    useGameStore.getState().advance()
    expect(useGameStore.getState().stage).toBe('gift')
  })

  it('markComplete flips the matching class flag without touching others', () => {
    useGameStore.getState().markComplete('potionsDone')
    expect(useGameStore.getState().player.potionsDone).toBe(true)
    expect(useGameStore.getState().player.charmsDone).toBe(false)
    expect(useGameStore.getState().player.flyingDone).toBe(false)

    useGameStore.getState().markComplete('charmsDone')
    expect(useGameStore.getState().player.charmsDone).toBe(true)

    useGameStore.getState().markComplete('flyingDone')
    expect(useGameStore.getState().player.flyingDone).toBe(true)
  })

  it('house is always Hufflepuff and cannot be changed by advancing', () => {
    for (let i = 0; i < STAGES.length; i += 1) {
      expect(useGameStore.getState().player.house).toBe('Hufflepuff')
      useGameStore.getState().advance()
    }
  })

  it('reset returns the store to its initial state', () => {
    useGameStore.getState().advance()
    useGameStore.getState().advance()
    useGameStore.getState().markComplete('potionsDone')
    useGameStore.getState().reset()

    const { stage, player } = useGameStore.getState()
    expect(stage).toBe('letter')
    expect(player.potionsDone).toBe(false)
  })
})
