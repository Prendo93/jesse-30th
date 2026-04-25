import { create } from 'zustand'
import type { ClassFlag, Player, Stage } from './types'
import { STAGES } from './types'

const initialPlayer: Player = {
  house: 'Hufflepuff',
  potionsDone: false,
  charmsDone: false,
  flyingDone: false,
  mazeDone: false,
}

type GameStore = {
  stage: Stage
  player: Player
  advance: () => void
  markComplete: (flag: ClassFlag) => void
  reset: () => void
}

export const useGameStore = create<GameStore>((set) => ({
  stage: 'letter',
  player: { ...initialPlayer },
  advance: () =>
    set((s) => {
      const i = STAGES.indexOf(s.stage)
      const next = STAGES[i + 1]
      return next ? { stage: next } : {}
    }),
  markComplete: (flag) =>
    set((s) => ({ player: { ...s.player, [flag]: true } })),
  reset: () => set({ stage: 'letter', player: { ...initialPlayer } }),
}))
