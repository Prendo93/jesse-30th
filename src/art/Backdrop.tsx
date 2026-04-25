import type { ComponentType } from 'react'
import { CastleExterior } from './backdrops/CastleExterior'
import { GreatHall } from './backdrops/GreatHall'
import { Dungeon } from './backdrops/Dungeon'
import { Classroom } from './backdrops/Classroom'
import { QuidditchSky } from './backdrops/QuidditchSky'
import { CeremonyHall } from './backdrops/CeremonyHall'
import { TreasureRoom } from './backdrops/TreasureRoom'

export type BackdropName =
  | 'castle-exterior'
  | 'great-hall'
  | 'dungeon'
  | 'classroom'
  | 'quidditch-sky'
  | 'ceremony-hall'
  | 'treasure-room'

const MAP: Record<BackdropName, ComponentType> = {
  'castle-exterior': CastleExterior,
  'great-hall': GreatHall,
  dungeon: Dungeon,
  classroom: Classroom,
  'quidditch-sky': QuidditchSky,
  'ceremony-hall': CeremonyHall,
  'treasure-room': TreasureRoom,
}

export function Backdrop({ name }: { name: BackdropName }) {
  const Cmp = MAP[name]
  return (
    <div data-testid={`backdrop-${name}`} className="absolute inset-0">
      <Cmp />
    </div>
  )
}
