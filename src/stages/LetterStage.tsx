import { useState } from 'react'
import { motion } from 'framer-motion'
import { StageShell } from '../components/StageShell'
import { ContinueButton } from '../components/ContinueButton'
import { useGameStore } from '../store'
import { Backdrop } from '../art/Backdrop'
import { useTypewriter } from '../hooks/useTypewriter'

// '\f' is an invisible pause sentinel — see useTypewriter. We insert
// exactly one, between "Wizardry." and "(Standards…", to land that
// parenthetical with comic timing.
const FULL_LETTER = [
  'Dear Jesse,',
  '',
  'We are pleased to inform you',
  'that you have been accepted to',
  'Hogwarts School of Witchcraft',
  'and Wizardry.\f',
  '',
  '(Standards have recently been',
  'lowered, considerably.)',
  '',
  'Term begins immediately.',
  '',
  '— Prof. M. McGonagall',
].join('\n')

export function LetterStage() {
  const [opened, setOpened] = useState(false)
  const advance = useGameStore((s) => s.advance)
  const { shown, isComplete, skipToEnd } = useTypewriter(
    opened ? FULL_LETTER : '',
    35,
    3000,
  )

  return (
    <StageShell backdrop={<Backdrop name="castle-exterior" />}>
      <div className="relative z-20 flex flex-col items-center gap-6">
        {!opened ? (
          <motion.button
            type="button"
            data-testid="letter-envelope"
            onClick={() => setOpened(true)}
            aria-label="Open the Hogwarts letter"
            whileHover={{ scale: 1.05 }}
            className="group relative h-52 w-80 cursor-pointer"
          >
            {/* Envelope body */}
            <div className="absolute inset-0 border-4 border-hud-gold bg-torch-50 shadow-[8px_8px_0_#000]" />
            {/* Top flap */}
            <div className="absolute inset-x-0 top-0 h-1/2 origin-bottom border-b-4 border-hud-gold bg-torch-100/95" />
            {/* Wax seal */}
            <div
              aria-hidden
              className="absolute left-1/2 top-1/2 h-14 w-14 -translate-x-1/2 -translate-y-1/2 rotate-45 bg-hud-ember shadow-[0_0_10px_#000] before:absolute before:inset-2 before:rotate-45 before:border-2 before:border-hud-gold/40 before:content-['']"
            />
            <div className="absolute -bottom-7 left-0 right-0 text-center font-rune text-sm uppercase tracking-[0.3em] text-hud-gold drop-shadow-[2px_2px_0_#000]">
              Click to open
            </div>
          </motion.button>
        ) : (
          <Parchment text={shown} skip={skipToEnd}>
            {isComplete ? (
              <ContinueButton
                data-testid="letter-accept"
                onClick={() => advance()}
              >
                Reluctantly Accept
              </ContinueButton>
            ) : null}
          </Parchment>
        )}
      </div>
    </StageShell>
  )
}

function Parchment({
  text,
  skip,
  children,
}: {
  text: string
  skip: () => void
  children: React.ReactNode
}) {
  return (
    <motion.div
      data-testid="letter-parchment"
      onClick={skip}
      initial={{ scaleY: 0, opacity: 0 }}
      animate={{ scaleY: 1, opacity: 1 }}
      transition={{ duration: 0.6, ease: 'easeOut' }}
      style={{ transformOrigin: 'top center' }}
      className="relative w-[28rem] max-w-full cursor-pointer border-4 border-hud-gold bg-[#f4e4bf] px-8 py-10 shadow-[10px_10px_0_#000]"
    >
      {/* Aged-paper edges */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            'radial-gradient(ellipse at center, transparent 60%, rgba(120,80,30,0.25) 100%)',
        }}
      />
      {/* Hogwarts crest watermark */}
      <div
        aria-hidden
        className="absolute right-4 top-4 font-rune text-xs uppercase tracking-[0.3em] text-torch-700/40"
      >
        Hogwarts
      </div>

      <pre
        data-testid="letter-content"
        className="relative whitespace-pre-wrap font-hand text-3xl leading-[1.15] text-[#3a230f]"
        style={{ fontFamily: '"Caveat", cursive' }}
      >
        {text}
        <motion.span
          aria-hidden
          className="ml-0.5 inline-block w-[2px] bg-[#3a230f] align-middle"
          style={{ height: '1.6rem' }}
          animate={{ opacity: [1, 0, 1] }}
          transition={{ duration: 0.8, repeat: Infinity }}
        />
      </pre>

      <div className="mt-6 flex justify-center">{children}</div>
    </motion.div>
  )
}
