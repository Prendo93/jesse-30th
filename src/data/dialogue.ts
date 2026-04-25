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
      body: 'Sit still. I will be the judge of you. Answer honestly. Or don\'t. It will not matter.',
    },
    thinking: 'Hmmm…',
    reveal: {
      speaker: 'THE HAT',
      body:
        'Ah yes… I see… absolutely no ambiguity here… You belong in… HUFFLEPUFF.',
    },
  },
  potions: {
    intro: {
      speaker: 'SNAPE',
      body:
        'Brew the Potion of Adequate Competence. Drag three ingredients into the cauldron. The order matters. Probably.',
    },
    correct: 'Correct… though I fail to see why that matters.',
    incorrect: 'Incorrect. Impressively so.',
    correctOutcome: 'Potion of Mild Disappointment',
    incorrectOutcome: 'Potion of Slightly Different Disappointment',
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
