export const STAGES = [
  'letter',
  'sorting',
  'potions',
  'charms',
  'flying',
  'ceremony',
  'gift',
] as const

export type Stage = (typeof STAGES)[number]

export type Player = {
  house: 'Hufflepuff'
  potionsDone: boolean
  charmsDone: boolean
  flyingDone: boolean
}

export type ClassFlag = Exclude<keyof Player, 'house'>
