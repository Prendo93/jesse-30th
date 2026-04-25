export const dialogue = {
  letter: {
    speaker: 'HOGWARTS',
    body:
      'We are pleased to inform you that you have been accepted into Hogwarts School of Witchcraft and Wizardry. Standards have recently been lowered.',
    accept: 'Reluctantly Accept',
  },
  sorting: {
    intro: {
      speaker: 'THE HAT',
      body:
        'Sit still. I will be the judge of you. Answer honestly. Or don\'t. It will not matter.',
    },
    thinking: 'Hmmm…',
    concerned: 'The Sorting Hat pauses…',
    concernedAfter: '…deeply concerned.',
    analyzing: 'Analyzing traits…',
    deliberation:
      'Hmm… challenging… very complex… I see courage… intelligence… hesitation… questionable ethics…',
    finalPause: 'This is not an easy decision…',
    reveal: {
      speaker: 'THE HAT',
      body: 'HUFFLEPUFF!',
    },
  },
  potions: {
    intro: {
      speaker: 'SNAPE',
      body:
        'A wizard who cannot place a name within a lineage is a wizard who cannot be trusted with a wand.',
    },
    why:
      'Today you will sort sixteen names into four kindreds: the Most Ancient and Most Noble House of Black; characters whose names belong to flowers; first names plucked from the night sky — exclusive of the Black family, who hoard the constellations; and members of the Hogwarts staff whose parents reached for Greco-Roman antiquity. Identify all four groups before exhausting your attempts, or do not bother coming back.',
    shuffle: 'Shuffle',
    correct: 'Acceptable. Barely.',
    incorrect: 'You have run out of attempts. As expected.',
    correctOutcome: 'All four groups solved',
    incorrectOutcome: 'Sorting Incomplete',
  },
  charms: {
    intro: {
      speaker: 'FLITWICK',
      body: 'Repeat the wand pattern. Ideally before I lose interest.',
    },
    success: 'You cast Lumos… illuminating an area you are not in.',
    failure: "You cast something. We're choosing to move on.",
  },
  flying: {
    intro: {
      speaker: 'HOOCH',
      body: 'Mount your broom when the meter feels right. It will not.',
    },
    perfect: 'You achieved a hover of approximately 3cm.',
    okay: 'The broom acknowledges your presence.',
    fail: 'You remain grounded. Spiritually and physically.',
  },
  maze: {
    intro: {
      speaker: 'TOURNAMENT',
      body:
        'Reach the cup. Don\'t get caught. Don\'t think about it. The hedges are watching.',
    },
    win: 'You held the cup for long enough that nobody could prove it was an accident.',
    death: 'The dementor said hello. You said something less polite.',
  },
  ceremony: {
    title: 'House Points',
    lastPlace: 'And in last place… with a commendable lack of achievement… HUFFLEPUFF!',
    twist: 'However… for reasons unclear… you have unlocked a reward.',
  },
  gift: {
    title: 'Your Reward',
    intro: 'Your real reward is something actually good.',
    headline: 'Happy 30th, Jesse.',
    body: "You're going to see Harry Potter and the Cursed Child.",
  },
} as const

export type Dialogue = typeof dialogue
