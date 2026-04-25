import { useEffect, useRef, useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import type { Stage } from '../types'
import { Jesse, type JessePose, type JesseHouse } from '../art/Jesse'

type Fanfare = {
  caption: string
  line: string
  pose: JessePose
  chub: number
  house: JesseHouse
}

const STAGE_FANFARE: Record<Stage, Fanfare> = {
  letter: {
    caption: 'You\'ve got mail',
    line: 'A letter, of dubious provenance, has arrived.',
    pose: 'reading',
    chub: 0,
    house: null,
  },
  sorting: {
    caption: 'To the Great Hall',
    line: 'The Sorting Hat awaits. Try not to think too hard.',
    pose: 'default',
    chub: 0,
    house: null,
  },
  potions: {
    caption: 'Down to the Dungeon',
    line: 'Snape has been waiting. Ominously.',
    pose: 'mixing',
    chub: 1,
    house: 'Hufflepuff',
  },
  charms: {
    caption: 'Charms classroom',
    line: 'Wave the wand. Mean it. Almost.',
    pose: 'wand',
    chub: 2,
    house: 'Hufflepuff',
  },
  flying: {
    caption: 'Out to the Pitch',
    line: 'The brooms are mostly cooperative today.',
    pose: 'broom',
    chub: 3,
    house: 'Hufflepuff',
  },
  maze: {
    caption: 'The Triwizard Maze',
    line: "Reach the cup. Don't get caught. Don't think about it.",
    pose: 'default',
    chub: 4,
    house: 'Hufflepuff',
  },
  ceremony: {
    caption: 'End-of-year Ceremony',
    line: 'Time to tally the carnage.',
    pose: 'default',
    chub: 5,
    house: 'Hufflepuff',
  },
  gift: {
    caption: 'A Reward Approaches',
    line: 'Inexplicable, but happening.',
    pose: 'crowned',
    chub: 5,
    house: 'Hufflepuff',
  },
}

const HOLD_MS = 1700

export function TransitionOverlay({ stage }: { stage: Stage }) {
  const firstRender = useRef(true)
  const [showFor, setShowFor] = useState<Stage | null>(null)

  useEffect(() => {
    // Don't fanfare the very first render — that's just the app booting.
    if (firstRender.current) {
      firstRender.current = false
      return
    }
    setShowFor(stage)
    const id = setTimeout(() => setShowFor(null), HOLD_MS)
    return () => clearTimeout(id)
  }, [stage])

  return (
    <AnimatePresence>
      {showFor ? (
        <motion.div
          key={showFor}
          data-testid="transition-overlay"
          aria-hidden
          className="pointer-events-none absolute inset-0 z-50 flex flex-col items-center justify-center"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.2 }}
        >
          {/* Vignette */}
          <div
            className="absolute inset-0"
            style={{
              background:
                'radial-gradient(circle at center, rgba(13,10,7,0.6) 0%, rgba(13,10,7,0.92) 60%, #0d0a07 100%)',
            }}
          />

          {/* Sparkle particles */}
          <div className="pointer-events-none absolute inset-0 overflow-hidden">
            {Array.from({ length: 16 }).map((_, i) => (
              <motion.span
                key={i}
                className="absolute h-2 w-2 bg-hud-gold"
                style={{
                  left: `${(i * 73) % 100}%`,
                  top: `${(i * 41) % 100}%`,
                  borderRadius: '50%',
                  boxShadow: '0 0 8px #e8c34a',
                }}
                initial={{ opacity: 0, scale: 0 }}
                animate={{ opacity: [0, 1, 0], scale: [0, 1.4, 0] }}
                transition={{
                  duration: 1.4,
                  delay: (i % 8) * 0.07,
                  repeat: Infinity,
                  repeatType: 'loop',
                }}
              />
            ))}
          </div>

          {/* Caption */}
          <motion.h2
            initial={{ y: -30, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: -30, opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="relative z-10 font-rune text-4xl uppercase tracking-[0.3em] text-hud-gold drop-shadow-[2px_2px_0_#000]"
          >
            {STAGE_FANFARE[showFor].caption}
          </motion.h2>

          {/* Jesse running across */}
          <motion.div
            initial={{ x: -200, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            exit={{ x: 200, opacity: 0 }}
            transition={{ duration: 0.6, ease: 'easeOut' }}
            className="relative z-10 my-4 h-48"
          >
            <Jesse
              pose={STAGE_FANFARE[showFor].pose}
              chub={STAGE_FANFARE[showFor].chub}
              house={STAGE_FANFARE[showFor].house}
              className="h-48 w-auto drop-shadow-[6px_6px_0_rgba(0,0,0,0.8)]"
            />
          </motion.div>

          {/* Dialogue line */}
          <motion.p
            initial={{ y: 30, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: 30, opacity: 0 }}
            transition={{ duration: 0.3, delay: 0.1 }}
            className="relative z-10 max-w-md text-center font-body text-lg italic text-torch-50"
          >
            {STAGE_FANFARE[showFor].line}
          </motion.p>
        </motion.div>
      ) : null}
    </AnimatePresence>
  )
}
