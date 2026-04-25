import { useEffect } from 'react'
import { useGameStore } from './store'
import { LetterStage } from './stages/LetterStage'
import { SortingStage } from './stages/SortingStage'
import { CeremonyStage } from './stages/CeremonyStage'
import { GiftStage } from './stages/GiftStage'
import { StageShell } from './components/StageShell'
import { STAGES, type Stage } from './types'

function PlaceholderStage({ name }: { name: string }) {
  return (
    <StageShell stageName={name.toUpperCase()}>
      <div className="font-rune text-2xl text-hud-gold">{name} stage</div>
    </StageShell>
  )
}

const isStage = (s: string): s is Stage => (STAGES as readonly string[]).includes(s)

function App() {
  const stage = useGameStore((s) => s.stage)

  useEffect(() => {
    const params = new URLSearchParams(window.location.search)
    const requested = params.get('stage')
    if (requested && isStage(requested)) {
      useGameStore.setState({ stage: requested })
    }
  }, [])

  switch (stage) {
    case 'letter':
      return <LetterStage />
    case 'sorting':
      return <SortingStage />
    case 'potions':
      return <PlaceholderStage name="potions" />
    case 'charms':
      return <PlaceholderStage name="charms" />
    case 'flying':
      return <PlaceholderStage name="flying" />
    case 'ceremony':
      return <CeremonyStage />
    case 'gift':
      return <GiftStage />
  }
}

export default App
