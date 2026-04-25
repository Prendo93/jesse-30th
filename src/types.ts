export const STAGES = [
  'letter',
  'sorting',
  'potions',
  'riddle',
  'maze',
  'ceremony',
  'gift',
] as const

export type Stage = (typeof STAGES)[number]

export type Player = {
  house: 'Hufflepuff'
  potionsDone: boolean
  riddleDone: boolean
  mazeDone: boolean
}

export type ClassFlag = Exclude<keyof Player, 'house'>
