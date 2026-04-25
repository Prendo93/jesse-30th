export type SortingQuestion = {
  prompt: string
  answers: string[]
}

export const sortingQuestions: SortingQuestion[] = [
  {
    prompt: 'When faced with a challenge, you tend to:',
    answers: [
      'Face it head-on',
      'Think things through carefully',
      'Ask for help',
      'Adapt as you go',
    ],
  },
  {
    prompt: 'Which quality do you value most?',
    answers: ['Courage', 'Intelligence', 'Loyalty', 'Ambition'],
  },
  {
    prompt: 'In a team, what role do you naturally take?',
    answers: ['Leader', 'Planner', 'Supporter', 'Independent worker'],
  },
  {
    prompt: 'What kind of environment do you prefer?',
    answers: [
      'Busy and energetic',
      'Quiet and calm',
      'Structured and organised',
      'Flexible and open',
    ],
  },
  {
    prompt: 'You find a wallet on the ground. What do you do?',
    answers: ['Try to return it', 'Hand it in', 'Leave it', 'Keep it, but feel guilty'],
  },
  {
    prompt: 'You are given a task you don’t fully understand. You:',
    answers: [
      'Ask questions',
      'Try to work it out',
      'Start and adjust as you go',
      'Delay starting',
    ],
  },
  {
    prompt: 'Which item would you choose?',
    answers: [
      'A book of knowledge',
      'A powerful wand',
      'A protective charm',
      'A key to unknown places',
    ],
  },
  {
    prompt: 'You hear a strange noise at night. You:',
    answers: ['Investigate', 'Stay where you are', 'Leave the area', 'Assume it’s nothing'],
  },
  {
    prompt: 'Which would you rather have?',
    answers: [
      'A map that is slightly outdated',
      'A clock that is usually correct',
      'A key that opens something, eventually',
      'A chair that is almost comfortable',
    ],
  },
  {
    prompt: 'You wake up feeling:',
    answers: ['Ready', 'Unsure', 'Like something is missing', 'Present'],
  },
  {
    prompt: 'Which animal do you feel most connected to?',
    answers: ['A dog', 'A cat', 'A bird', 'A horse that seems tired'],
  },
  {
    prompt: 'You encounter a locked door. You:',
    answers: ['Try to open it', 'Look for another way', 'Wait nearby', 'Accept that it is locked'],
  },
  {
    prompt: 'Which of these would you find most satisfying?',
    answers: [
      'A drawer that closes properly',
      'A sock that matches',
      'A chair that doesn’t move when you sit down',
      'A door that opens on the first try',
    ],
  },
  {
    prompt: 'You are given an important message to deliver. You:',
    answers: [
      'Deliver it immediately',
      'Read it once more before delivering',
      'Hold onto it for a bit',
      'Wonder briefly what makes a message important',
    ],
  },
  {
    prompt: 'Which situation do you prefer?',
    answers: [
      'Knowing what is happening',
      'Having a general idea',
      'Figuring things out as you go',
      'Realising later what happened',
    ],
  },
  {
    prompt: 'You notice something slightly out of place. You:',
    answers: [
      'Fix it',
      'Make a note of it',
      'Leave it',
      'Accept that things can be slightly out of place',
    ],
  },
  {
    prompt: 'Which object feels most reassuring?',
    answers: [
      'A working pen',
      'A full battery',
      'A stable surface',
      'A cup that doesn’t leak',
    ],
  },
  {
    prompt: 'You enter a room and forget why. You:',
    answers: [
      'Try to remember',
      'Retrace your steps',
      'Stand there briefly',
      'Accept that the moment has passed',
    ],
  },
  {
    prompt: 'Which object seems most useful?',
    answers: ['A reliable tool', 'A notebook', 'A compass', 'A rock with potential'],
  },
  {
    prompt: 'How do you approach problems?',
    answers: ['Solve them', 'Work around them', 'Take time to understand them', 'Experience them'],
  },
  {
    prompt: 'What time of day suits you best?',
    answers: ['Morning', 'Afternoon', 'Evening', 'Not now'],
  },
  {
    prompt: 'Choose a number:',
    answers: ['4', '9', 'A different 4', 'Approximately 9'],
  },
  {
    prompt: 'You see an old lady struggling with her shopping bags. Do you:',
    answers: [
      'Kick her',
      'Yell at her to hurry up',
      'Take one bag and leave',
      'Trip near her and pretend nothing happened',
    ],
  },
  {
    prompt: 'A friend asks you for help moving house. You:',
    answers: [
      'Agree and help',
      'Say you’re busy',
      'Show up briefly, then leave',
      'Hide nearby and observe',
    ],
  },
  {
    prompt: 'You are responsible for looking after a pet. You:',
    answers: [
      'Take great care of it',
      'Do the minimum required',
      'Forget once',
      'Let it figure things out',
    ],
  },
  {
    prompt: 'Which sound do you prefer?',
    answers: [
      'Music',
      'Silence',
      'Background noise',
      'A hum that may be coming from you',
    ],
  },
  {
    prompt: 'You are being watched. You:',
    answers: ['Look around', 'Ignore it', 'Accept it', 'Wave slightly'],
  },
  {
    prompt: 'Which statement feels most true?',
    answers: ['Things happen for a reason', 'Things happen', 'Some things happen', 'Things'],
  },
  {
    prompt: 'If you could communicate with one creature, which would you choose?',
    answers: [
      'A slug',
      'A slightly larger slug',
      'A slug that seems busy',
      'A slug you don’t trust',
    ],
  },
  {
    prompt: 'Which animal best represents your inner self?',
    answers: [
      'A damp pigeon',
      'A confused ferret',
      'A tired goat',
      'A horse that has given up',
    ],
  },
  {
    prompt: 'You encounter a magical creature in the forest. What do you do?',
    answers: [
      'Nod at it',
      'Avoid eye contact',
      'Apologise quietly',
      'Assume it’s judging you',
    ],
  },
  {
    prompt: 'You see someone drop their wallet in the street. You:',
    answers: [
      'Take the cash and discard the wallet',
      'Keep the wallet and everything in it',
      'Pick it up, check if anyone saw, then keep it',
      'Move it further away so they can’t find it',
    ],
  },
  {
    prompt: 'You are given credit for someone else’s work. You:',
    answers: [
      'Accept it without hesitation',
      'Expand on the lie to make it more convincing',
      'Pretend to correct it, but don’t',
      'Downplay their contribution entirely',
    ],
  },
  {
    prompt: 'A colleague makes a mistake that will cause problems later. You:',
    answers: [
      'Say nothing and wait for it to unfold',
      'Quietly make it worse',
      'Point it out publicly at the worst moment',
      'Document it for future use',
    ],
  },
  {
    prompt: 'A friend tells you a secret. You:',
    answers: [
      'Share it immediately',
      'Share it selectively',
      'Hint at it until someone asks directly',
      'Rephrase it as your own story',
    ],
  },
  {
    prompt: 'You are responsible for bringing snacks to an event. You:',
    answers: [
      'Bring nothing and eat first',
      'Bring something clearly inedible',
      'Bring less than needed and keep some aside',
      'Arrive late and take what remains',
    ],
  },
  {
    prompt: 'You see someone clearly in need of help. You:',
    answers: [
      'Ignore them',
      'Watch briefly, then leave',
      'Offer unhelpful advice and leave',
      'Make the situation more confusing',
    ],
  },
  {
    prompt: 'You are late to an important meeting. You:',
    answers: [
      'Interrupt and take over',
      'Blame someone else immediately',
      'Join without acknowledging it',
      'Criticise others upon arrival',
    ],
  },
  {
    prompt: 'Someone asks for your opinion on something important to them. You:',
    answers: [
      'Dismiss it immediately',
      'Undermine their confidence',
      'Give vague but negative feedback',
      'Pretend to care, then disengage',
    ],
  },
  {
    prompt: 'You see a queue forming. You:',
    answers: [
      'Cut in confidently',
      'Drift in near the front',
      'Pretend to join someone ahead',
      'Question whether the queue applies to you',
    ],
  },
  {
    prompt: 'You are asked to take responsibility for something minor. You:',
    answers: [
      'Avoid answering',
      'Accept, then do nothing',
      'Redirect blame',
      'Agree, then disappear',
    ],
  },
  {
    prompt: 'Someone else seems to be the centre of attention at a party, you:',
    answers: [
      'Sit back and watch, enjoying it',
      'Heckle them obviously, attempting to discredit them',
      'Sing the song from Hamilton that they were attempting to sing, but force them to sit and watch you do it better',
      'Leave in a huff',
    ],
  },
]
