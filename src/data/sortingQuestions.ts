export type SortingQuestion = {
  prompt: string
  answers: string[]
}

export const sortingQuestions: SortingQuestion[] = [
  {
    prompt: 'A troll is in the castle. You—',
    answers: [
      'Run, but in a heroic direction.',
      'Find a snack first.',
      'Pretend you are also a troll.',
      'File a complaint.',
    ],
  },
  {
    prompt: 'Your wand picks up an owl-pellet. You—',
    answers: [
      'Examine it for clues.',
      'Apologise to the wand.',
      'Throw the wand.',
      'Eat it for confidence.',
    ],
  },
  {
    prompt: 'Choose a virtue.',
    answers: [
      'Loyalty (specifically to lunch).',
      'Cunning, but only on Tuesdays.',
      'Bravery, until things get hard.',
      'A vague sense of being there.',
    ],
  },
  {
    prompt: 'A ghost asks for your homework. You—',
    answers: [
      'Hand it over without question.',
      'Negotiate for ghost secrets.',
      'Ask if it counts as published work.',
      'Cry, mildly.',
    ],
  },
  {
    prompt: 'Pick a snack.',
    answers: [
      'A slightly damp biscuit.',
      'Whatever fell on the floor.',
      'Pumpkin juice (room temperature).',
      'Pure ambition.',
    ],
  },
]
