export const STAGES = [
  'letter',
  'sorting',
  'potions',
  'charms',
  'flying',
  'maze',
  'ceremony',
  'gift',
] as const

export type Stage = (typeof STAGES)[number]

export type Player = {
  house: 'Hufflepuff'
  potionsDone: boolean
  charmsDone: boolean
  flyingDone: boolean
  mazeDone: boolean
}

export type ClassFlag = Exclude<keyof Player, 'house'>
