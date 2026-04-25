import { useGameStore } from './store'
import { LetterStage } from './stages/LetterStage'
import { StageShell } from './components/StageShell'

function PlaceholderStage({ name }: { name: string }) {
  return (
    <StageShell stageName={name.toUpperCase()}>
      <div className="font-rune text-2xl text-hud-gold">{name} stage</div>
    </StageShell>
  )
}

function App() {
  const stage = useGameStore((s) => s.stage)

  switch (stage) {
    case 'letter':
      return <LetterStage />
    case 'sorting':
      return <PlaceholderStage name="sorting" />
    case 'potions':
      return <PlaceholderStage name="potions" />
    case 'charms':
      return <PlaceholderStage name="charms" />
    case 'flying':
      return <PlaceholderStage name="flying" />
    case 'ceremony':
      return <PlaceholderStage name="ceremony" />
    case 'gift':
      return <PlaceholderStage name="gift" />
  }
}

export default App
