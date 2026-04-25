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
      'Today you will sort sixteen names into four kindreds:',
    shuffle: 'Shuffle',
    correct: 'Acceptable. Barely.',
    incorrect:
      'Predictable. Four attempts squandered on the most rudimentary of pedigrees. I suppose you will need a Time-Turner — assuming you can pronounce it.',
    correctOutcome: 'All four groups solved',
    incorrectOutcome: 'Game Over',
    retry: 'Use Time-Turner',
  },
  riddle: {
    intro: {
      speaker: 'PEEVES',
      body:
        "Oooh, ickle firstie wants to pass! Not before old Peevesy here. Solve all four cluesies or sit in the corridor forever!",
    },
    instructions:
      'Type the answer below. Peeves will not let you past until you guess every one.',
    wrong: 'PEEVES cackles: "Wrong! Wrong! Wrongity-wrong!"',
    finalCorrect:
      'PEEVES (sulking): "Lucky guesses. LUCKY GUESSES! …fine. Pass through. Boring."',
    intermediateCorrect:
      'PEEVES (twitching): "Hmph. Next one, then. Better be ready."',
    riddles: [
      {
        clue: 'Welsh estuary leads forth to kid enthusiast.',
        answer: 'ABERFORTH',
      },
      {
        clue: 'Soundly angled supplies district.',
        answer: 'DIAGON ALLEY',
      },
      {
        clue: 'First president troubled with lower vampire expert.',
        answer: 'WORPLE',
      },
      {
        clue: 'Tell-tale wins most games.',
        answer: 'SNITCH',
      },
    ],
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
