import { useEffect, useState } from 'react'
import { useGameStore } from './store'
import { LetterStage } from './stages/LetterStage'
import { SortingStage } from './stages/SortingStage'
import { ConnectionsStage } from './stages/ConnectionsStage'
import { CharmsStage } from './stages/CharmsStage'
import { FlyingStage } from './stages/FlyingStage'
import { MazeStage } from './maze/MazeStage'
import { CeremonyStage } from './stages/CeremonyStage'
import { GiftStage } from './stages/GiftStage'
import { TransitionOverlay } from './components/TransitionOverlay'
import { STAGES, type Stage } from './types'

const isStage = (s: string): s is Stage =>
  (STAGES as readonly string[]).includes(s)

function App() {
  const stage = useGameStore((s) => s.stage)
  const [mazeInstant, setMazeInstant] = useState(false)

  useEffect(() => {
    const params = new URLSearchParams(window.location.search)
    const requested = params.get('stage')
    if (requested && isStage(requested)) {
      useGameStore.setState({ stage: requested })
    }
    if (params.has('reset')) {
      useGameStore.getState().reset()
    }
    if (params.get('maze') === 'instant') {
      setMazeInstant(true)
    }
  }, [])

  const renderStage = () => {
    switch (stage) {
      case 'letter':
        return <LetterStage />
      case 'sorting':
        return <SortingStage />
      case 'potions':
        return <ConnectionsStage />
      case 'charms':
        return <CharmsStage />
      case 'flying':
        return <FlyingStage />
      case 'maze':
        return <MazeStage instant={mazeInstant} />
      case 'ceremony':
        return <CeremonyStage />
      case 'gift':
        return <GiftStage />
    }
  }

  return (
    <>
      <div data-testid="current-stage" data-stage={stage} className="hidden" />
      {renderStage()}
      <TransitionOverlay stage={stage} />
    </>
  )
}

export default App
