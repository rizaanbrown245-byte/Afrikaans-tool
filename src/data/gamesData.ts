export type GameDifficulty = 'easy' | 'medium' | 'hard';

export interface DifficultyConfig {
  id: GameDifficulty;
  nameAf: string;
  nameEn: string;
  badge: string;
  color: string;
  borderColor: string;
  bgColor: string;
  starsAwarded: number;
  gemsAwarded: number;
  description: string;
}

export const DIFFICULTY_CONFIGS: Record<GameDifficulty, DifficultyConfig> = {
  easy: {
    id: 'easy',
    nameAf: 'Maklik 🟢',
    nameEn: 'Easy',
    badge: 'Graad 1-3 • Aanvangs',
    color: 'text-emerald-700',
    borderColor: 'border-emerald-300',
    bgColor: 'bg-emerald-50',
    starsAwarded: 3,
    gemsAwarded: 0,
    description: 'Korter woorde, eenvoudige sinne en ekstra leidrade!'
  },
  medium: {
    id: 'medium',
    nameAf: 'Gemiddeld 🟡',
    nameEn: 'Medium',
    badge: 'Graad 4-5 • Standaard',
    color: 'text-amber-700',
    borderColor: 'border-amber-300',
    bgColor: 'bg-amber-50',
    starsAwarded: 5,
    gemsAwarded: 1,
    description: 'Volle STOMPI-reëls, meervoude en vinniger reaksies!'
  },
  hard: {
    id: 'hard',
    nameAf: 'Moeilik 🔴',
    nameEn: 'Hard / Expert',
    badge: 'Graad 6-7+ • Kampioen',
    color: 'text-rose-700',
    borderColor: 'border-rose-300',
    bgColor: 'bg-rose-50',
    starsAwarded: 8,
    gemsAwarded: 2,
    description: 'Saamgestelde sinne, moeilike uitsonderings en vinnige tydsbeperkings!'
  }
};

/* -------------------------------------------------------------
   1. STOMPI SENTENCE BUILDER DATA
------------------------------------------------------------- */
export interface StompiRound {
  targetEn: string;
  correctSentence: string;
  scrambled: string[];
  explanationEn: string;
}

export const STOMPI_DATA: Record<GameDifficulty, StompiRound[]> = {
  easy: [
    {
      targetEn: 'The boy eats an apple.',
      correctSentence: "Die seun eet 'n appel.",
      scrambled: ["'n appel", 'eet', 'Die seun'],
      explanationEn: "S (Die seun) + V1 (eet) + O ('n appel). Remember: Verb 1 is in 2nd place!"
    },
    {
      targetEn: 'The cat drinks milk.',
      correctSentence: 'Die kat drink melk.',
      scrambled: ['melk', 'drink', 'Die kat'],
      explanationEn: 'S (Die kat) + V1 (drink) + O (melk).'
    },
    {
      targetEn: 'We play outside.',
      correctSentence: 'Ons speel buite.',
      scrambled: ['buite', 'speel', 'Ons'],
      explanationEn: 'S (Ons) + V1 (speel) + P (buite).'
    },
    {
      targetEn: 'My sister reads a book.',
      correctSentence: "My suster lees 'n boek.",
      scrambled: ['lees', "My suster", "'n boek"],
      explanationEn: "S (My suster) + V1 (lees) + O ('n boek)."
    }
  ],
  medium: [
    {
      targetEn: 'The boy plays soccer today at school.',
      correctSentence: 'Die seun speel vandag sokker by die skool.',
      scrambled: ['sokker', 'speel', 'Die seun', 'by die skool', 'vandag'],
      explanationEn: 'S (Die seun) + V1 (speel) + T (vandag) + O (sokker) + P (by die skool).'
    },
    {
      targetEn: 'The children eat apples now at home.',
      correctSentence: 'Die kinders eet nou appels by die huis.',
      scrambled: ['by die huis', 'eet', 'appels', 'Die kinders', 'nou'],
      explanationEn: 'S (Die kinders) + V1 (eet) + T (nou) + O (appels) + P (by die huis).'
    },
    {
      targetEn: 'The dog runs fast in the garden every morning.',
      correctSentence: 'Die hond hardloop elke oggend vinnig in die tuin.',
      scrambled: ['elke oggend', 'in die tuin', 'hardloop', 'Die hond', 'vinnig'],
      explanationEn: 'S (Die hond) + V1 (hardloop) + T (elke oggend) + M (vinnig) + P (in die tuin).'
    },
    {
      targetEn: 'Father buys fresh bread at the bakery on Mondays.',
      correctSentence: 'Pa koop Maandae vars brood by die bakkery.',
      scrambled: ['by die bakkery', 'koop', 'vars brood', 'Maandae', 'Pa'],
      explanationEn: 'S (Pa) + V1 (koop) + T (Maandae) + O (vars brood) + P (by die bakkery).'
    }
  ],
  hard: [
    {
      targetEn: 'Mom bakes delicious pancakes early every Sunday in the kitchen.',
      correctSentence: 'My ma bak elke Sondag vroeg heerlike pannekoek in die kombuis.',
      scrambled: ['in die kombuis', 'heerlike pannekoek', 'bak', 'elke Sondag', 'My ma', 'vroeg'],
      explanationEn: 'S (My ma) + V1 (bak) + T (elke Sondag) + M (vroeg) + O (heerlike pannekoek) + P (in die kombuis).'
    },
    {
      targetEn: 'The teacher read a story patiently to the children this morning.',
      correctSentence: "Die onderwyser het vanoggend geduldig 'n storie vir die kinders gelees.",
      scrambled: ['gelees', 'het', "'n storie", 'Die onderwyser', 'vir die kinders', 'vanoggend', 'geduldig'],
      explanationEn: "S (Die onderwyser) + V1 (het) + T (vanoggend) + M (geduldig) + O ('n storie) + P (vir die kinders) + V2 (gelees) at the end!"
    },
    {
      targetEn: 'We must quietly do our homework in the library tomorrow afternoon.',
      correctSentence: 'Ons moet môremiddag stil ons huiswerk in die biblioteek doen.',
      scrambled: ['stil', 'in die biblioteek', 'ons huiswerk', 'doen', 'moet', 'Ons', 'môremiddag'],
      explanationEn: 'S (Ons) + V1 (moet) + T (môremiddag) + M (stil) + O (ons huiswerk) + P (in die biblioteek) + V2 (doen).'
    },
    {
      targetEn: 'The athlete ran extremely fast on the track yesterday to win the gold medal.',
      correctSentence: "Die atleet het gister blitsvinnig op die baan gehardloop.",
      scrambled: ['Die atleet', 'gehardloop', 'gister', 'op die baan', 'het', 'blitsvinnig'],
      explanationEn: 'S (Die atleet) + V1 (het) + T (gister) + M (blitsvinnig) + P (op die baan) + V2 (gehardloop).'
    }
  ]
};

/* -------------------------------------------------------------
   2. PICTURE MATCH DATA
------------------------------------------------------------- */
export interface PictureItem {
  emoji: string;
  correctAf: string;
  english: string;
  options: string[];
}

export const PICTURE_DATA: Record<GameDifficulty, PictureItem[]> = {
  easy: [
    { emoji: '🦁', correctAf: 'leeu', english: 'lion', options: ['leeu', 'hond', 'olifant'] },
    { emoji: '🍎', correctAf: 'appel', english: 'apple', options: ['appel', 'piesang', 'brood'] },
    { emoji: '🏠', correctAf: 'huis', english: 'house', options: ['huis', 'skool', 'tuin'] },
    { emoji: '🐱', correctAf: 'kat', english: 'cat', options: ['kat', 'hond', 'voël'] },
    { emoji: '🚗', correctAf: 'kar', english: 'car', options: ['kar', 'fiets', 'trein'] },
    { emoji: '☀️', correctAf: 'son', english: 'sun', options: ['son', 'maan', 'ster'] }
  ],
  medium: [
    { emoji: '🦒', correctAf: 'kameelperd', english: 'giraffe', options: ['kameelperd', 'koei', 'perd', 'skaap'] },
    { emoji: '✏️', correctAf: 'potlood', english: 'pencil', options: ['skêr', 'liniaal', 'potlood', 'uitveër'] },
    { emoji: '🥛', correctAf: 'melk', english: 'milk', options: ['water', 'tee', 'melk', 'sap'] },
    { emoji: '🦋', correctAf: 'skoenlapper', english: 'butterfly', options: ['skoenlapper', 'by', 'kewer', 'mot'] },
    { emoji: '🚲', correctAf: 'fiets', english: 'bicycle', options: ['kar', 'fiets', 'bus', 'boot'] },
    { emoji: '🎒', correctAf: 'skooltas', english: 'schoolbag', options: ['boek', 'skooltas', 'kas', 'tafel'] },
    { emoji: '🌳', correctAf: 'boom', english: 'tree', options: ['blom', 'boom', 'bos', 'gras'] },
    { emoji: '🥪', correctAf: 'toebroodjie', english: 'sandwich', options: ['brood', 'koek', 'toebroodjie', 'kaas'] }
  ],
  hard: [
    { emoji: '🦓', correctAf: 'kwagga', english: 'zebra (quagga)', options: ['sebra', 'kwagga', 'kameelperd', 'wildsbok'] },
    { emoji: '🦗', correctAf: 'sprinkaan', english: 'grasshopper / locust', options: ['sprinkaan', 'skerpioen', 'skoenlapper', 'spinnekop'] },
    { emoji: '🦏', correctAf: 'renoster', english: 'rhinoceros', options: ['renoster', 'seekoei', 'olifant', 'buffel'] },
    { emoji: '🦔', correctAf: 'krimpvarkie', english: 'hedgehog / porcupine', options: ['ystervark', 'krimpvarkie', 'otter', 'mol'] },
    { emoji: '🌈', correctAf: 'reënboog', english: 'rainbow', options: ['reënboog', 'wolk', 'weerlig', 'donderweer'] },
    { emoji: '🕯️', correctAf: 'kers', english: 'candle', options: ['kers', 'lamp', 'flits', 'lig'] },
    { emoji: '🧲', correctAf: 'magneet', english: 'magnet', options: ['magneet', 'yster', 'metaal', 'kompas'] },
    { emoji: '⚖️', correctAf: 'skaal', english: 'scale / balance', options: ['skaal', 'liniaal', 'horlosie', 'meter'] }
  ]
};

/* -------------------------------------------------------------
   3. MEMORY MATCH CARDS DATA
------------------------------------------------------------- */
export interface MemoryPair {
  id: string;
  af: string;
  en: string;
}

export const MEMORY_DATA: Record<GameDifficulty, MemoryPair[]> = {
  easy: [
    { id: '1', af: 'hond', en: 'dog' },
    { id: '2', af: 'kat', en: 'cat' },
    { id: '3', af: 'son', en: 'sun' }
  ],
  medium: [
    { id: '1', af: 'hond', en: 'dog' },
    { id: '2', af: 'kat', en: 'cat' },
    { id: '3', af: 'brood', en: 'bread' },
    { id: '4', af: 'groot', en: 'big' }
  ],
  hard: [
    { id: '1', af: 'vriendelik', en: 'friendly' },
    { id: '2', af: 'skoenlapper', en: 'butterfly' },
    { id: '3', af: 'kameelperd', en: 'giraffe' },
    { id: '4', af: 'skooltas', en: 'schoolbag' },
    { id: '5', af: 'blitsvinnig', en: 'lightning fast' },
    { id: '6', af: 'gelukkig', en: 'happy' }
  ]
};

/* -------------------------------------------------------------
   4. SPELLING BEE DATA
------------------------------------------------------------- */
export interface SpellingWord {
  word: string;
  english: string;
  hint: string;
}

export const SPELLING_DATA: Record<GameDifficulty, SpellingWord[]> = {
  easy: [
    { word: 'kat', english: 'cat', hint: 'Drie letters: k - a - t' },
    { word: 'hond', english: 'dog', hint: 'Eindig op -d (klink soos t)!' },
    { word: 'boom', english: 'tree', hint: 'Twee o-letters in die middel!' },
    { word: 'boek', english: 'book', hint: 'Kyk na die oe-klank!' }
  ],
  medium: [
    { word: 'skooltas', english: 'schoolbag', hint: 'Begin met skool-...' },
    { word: 'vriendelik', english: 'friendly', hint: 'Eindig op -lik.' },
    { word: 'skoenlapper', english: 'butterfly', hint: 'Kyk na die klinker: oe!' },
    { word: 'kameelperd', english: 'giraffe', hint: 'Kameel + perd' },
    { word: 'toebroodjie', english: 'sandwich', hint: 'Eindig op die verkleining -jie!' }
  ],
  hard: [
    { word: 'skeidsregter', english: 'referee / umpire', hint: 'Skeids + regter (ei klank!)' },
    { word: 'teleurstelling', english: 'disappointment', hint: 'Teleur + stelling met dubbel l!' },
    { word: 'elektrisiteit', english: 'electricity', hint: 'Eindig op -teit met ei!' },
    { word: 'veiligheidsgordel', english: 'seatbelt', hint: 'Veiligheid + s + gordel' },
    { word: 'verantwoordelik', english: 'responsible', hint: 'Ver + antwoord + e + lik' }
  ]
};

/* -------------------------------------------------------------
   5. BEAT THE CLOCK QUESTIONS DATA
------------------------------------------------------------- */
export interface ClockQuestion {
  af: string;
  en: string;
}

export const CLOCK_DATA: Record<GameDifficulty, { timeSeconds: number; questions: ClockQuestion[] }> = {
  easy: {
    timeSeconds: 40,
    questions: [
      { af: 'Hallo', en: 'Hello' },
      { af: 'Dankie', en: 'Thank you' },
      { af: 'Asseblief', en: 'Please' },
      { af: 'Ja', en: 'Yes' },
      { af: 'Nee', en: 'No' },
      { af: 'Hond', en: 'Dog' },
      { af: 'Kat', en: 'Cat' },
      { af: 'Son', en: 'Sun' },
      { af: 'Water', en: 'Water' },
      { af: 'Brood', en: 'Bread' }
    ]
  },
  medium: {
    timeSeconds: 30,
    questions: [
      { af: 'Goeiemôre', en: 'Good morning' },
      { af: 'Asseblief', en: 'Please' },
      { af: 'Dankie', en: 'Thank you' },
      { af: 'Hond', en: 'Dog' },
      { af: 'Kat', en: 'Cat' },
      { af: 'Brood', en: 'Bread' },
      { af: 'Water', en: 'Water' },
      { af: 'Groot', en: 'Big' },
      { af: 'Vinnig', en: 'Fast' },
      { af: 'Totsiens', en: 'Goodbye' },
      { af: 'Pragtig', en: 'Beautiful' },
      { af: 'Gister', en: 'Yesterday' }
    ]
  },
  hard: {
    timeSeconds: 20,
    questions: [
      { af: 'Blitsvinnig', en: 'Lightning fast' },
      { af: 'Onderwyser', en: 'Teacher' },
      { af: 'Geduldig', en: 'Patiently' },
      { af: 'Aandagtig', en: 'Attentively' },
      { af: 'Verleë', en: 'Embarrassed' },
      { af: 'Eenvoudig', en: 'Simple' },
      { af: 'Onmiddellik', en: 'Immediately' },
      { af: 'Skoenlapper', en: 'Butterfly' },
      { af: 'Môremiddag', en: 'Tomorrow afternoon' },
      { af: 'Gewoontlik', en: 'Usually' },
      { af: 'Nuuskierig', en: 'Curious' },
      { af: 'Versigtig', en: 'Carefully' }
    ]
  }
};

/* -------------------------------------------------------------
   6. NEW GAME: DUBBELE "NIE" JAGTER (NEGATION MASTER) 🚫
------------------------------------------------------------- */
export interface NegationQuestion {
  id: string;
  contextEn: string;
  incompleteSentence: string;
  missingPart: string;
  options: string[];
  explanation: string;
}

export const NEGATION_DATA: Record<GameDifficulty, NegationQuestion[]> = {
  easy: [
    {
      id: 'n1',
      contextEn: 'I do not eat the apple.',
      incompleteSentence: 'Ek eet nie die appel ___',
      missingPart: 'nie.',
      options: ['nie.', 'geen.', 'nooit.', 'niks.'],
      explanation: 'In Afrikaans, negative sentences take a second "nie" right at the end of the sentence!'
    },
    {
      id: 'n2',
      contextEn: 'The boy is not sleeping.',
      incompleteSentence: 'Die seun slaap nie ___',
      missingPart: 'nie.',
      options: ['nie.', 'wel.', 'nog.', 'al.'],
      explanation: 'Subject + Verb + nie + ... + nie.'
    },
    {
      id: 'n3',
      contextEn: 'We do not like cold milk.',
      incompleteSentence: 'Ons hou nie van koue melk ___',
      missingPart: 'nie.',
      options: ['nie.', 'wel.', 'daar.', 'geen.'],
      explanation: 'Second "nie" closes the sentence: "hou nie van koue melk nie".'
    },
    {
      id: 'n4',
      contextEn: 'The cat is not outside.',
      incompleteSentence: 'Die kat is nie buite ___',
      missingPart: 'nie.',
      options: ['nie.', 'geen.', 'niks.', 'toe.'],
      explanation: 'Afrikaans double negative rule: 1st "nie" after the verb, 2nd "nie" at the very end.'
    }
  ],
  medium: [
    {
      id: 'nm1',
      contextEn: 'The children do not want to do their homework now.',
      incompleteSentence: 'Die kinders wil ___ nou hul huiswerk doen nie.',
      missingPart: 'nie',
      options: ['nie', 'geen', 'niks', 'niemand'],
      explanation: 'First "nie" comes directly after the modal verb "wil" or the time word!'
    },
    {
      id: 'nm2',
      contextEn: 'Father is not driving the red car today.',
      incompleteSentence: 'Pa bestuur ___ vandag die rooi kar nie.',
      missingPart: 'nie',
      options: ['nie', 'geen', 'glad', 'ooit'],
      explanation: 'Pa bestuur [nie] vandag die rooi kar [nie].'
    },
    {
      id: 'nm3',
      contextEn: 'She can not find her new schoolbag anywhere.',
      incompleteSentence: 'Sy kan haar nuwe skooltas nêrens vind ___',
      missingPart: 'nie.',
      options: ['nie.', 'wel.', 'toe.', 'sommer.'],
      explanation: 'Words like "nêrens" (nowhere) still require the final closing "nie"!'
    },
    {
      id: 'nm4',
      contextEn: 'There is no water in the glass.',
      incompleteSentence: 'Daar is geen water in die glas ___',
      missingPart: 'nie.',
      options: ['nie.', 'wel.', 'reeds.', 'dan.'],
      explanation: 'Even when "geen" is used, standard Afrikaans grammar adds the closing "nie" at the end.'
    }
  ],
  hard: [
    {
      id: 'nh1',
      contextEn: 'Nobody knows where the lost keys are.',
      incompleteSentence: 'Niemand weet waar die verlore sleutels is ___',
      missingPart: 'nie.',
      options: ['nie.', 'alweer.', 'toe.', 'niks.'],
      explanation: 'When starting with negative words like "Niemand", the sentence MUST still close with "nie"!'
    },
    {
      id: 'nh2',
      contextEn: 'He knows nothing because he did not listen.',
      incompleteSentence: 'Hy weet niks omdat hy nie geluister het ___',
      missingPart: 'nie.',
      options: ['nie.', 'oor.', 'geen.', 'tot.'],
      explanation: 'In subordinate clauses with "omdat", the second "nie" comes after the final verb "het".'
    },
    {
      id: 'nh3',
      contextEn: 'The athlete was not able to run the race yesterday because of rain.',
      incompleteSentence: 'Die atleet kon gister nie die wedloop hardloop ___',
      missingPart: 'nie.',
      options: ['nie.', 'glad.', 'geen.', 'feit.'],
      explanation: 'Modal verb past form "kon" + "nie" + object + main verb "hardloop" + closing "nie".'
    },
    {
      id: 'nh4',
      contextEn: 'She will never give up on her dream.',
      incompleteSentence: 'Sy sal nooit haar droom opgee ___',
      missingPart: 'nie.',
      options: ['nie.', 'geen.', 'nog.', 'ook.'],
      explanation: 'Negative word "nooit" (never) triggers the closing "nie" at the end of the sentence!'
    }
  ]
};

/* -------------------------------------------------------------
   7. NEW GAME: TYE-MEESTER (TENSES TIME MACHINE) ⏳
------------------------------------------------------------- */
export interface TensesQuestion {
  id: string;
  presentAf: string;
  presentEn: string;
  targetTense: 'past' | 'future';
  targetTenseLabelAf: string;
  options: string[];
  correct: string;
  explanation: string;
}

export const TENSES_DATA: Record<GameDifficulty, TensesQuestion[]> = {
  easy: [
    {
      id: 't1',
      presentAf: 'Die seun speel sokker.',
      presentEn: 'The boy plays soccer.',
      targetTense: 'past',
      targetTenseLabelAf: 'Verlede Tyd (Past Tense)',
      options: [
        'Die seun het sokker gespeel.',
        'Die seun sal sokker speel.',
        'Die seun speel het sokker.',
        'Die seun gespeel sokker.'
      ],
      correct: 'Die seun het sokker gespeel.',
      explanation: 'Regular verbs: replace Verb 1 with "het", and place "ge- + verb" at the very end!'
    },
    {
      id: 't2',
      presentAf: 'Die kat drink melk.',
      presentEn: 'The cat drinks milk.',
      targetTense: 'past',
      targetTenseLabelAf: 'Verlede Tyd (Past Tense)',
      options: [
        'Die kat het melk gedrink.',
        'Die kat drink het melk.',
        'Die kat sal melk drink.',
        'Die kat gedrink melk.'
      ],
      correct: 'Die kat het melk gedrink.',
      explanation: '"drink" becomes "het ... gedrink" in the past tense!'
    },
    {
      id: 't3',
      presentAf: "Ons lees 'n boek.",
      presentEn: 'We read a book.',
      targetTense: 'future',
      targetTenseLabelAf: 'Toekomende Tyd (Future Tense)',
      options: [
        "Ons sal 'n boek lees.",
        "Ons het 'n boek gelees.",
        "Ons gaan 'n boek gelees.",
        "Ons sal lees 'n boek."
      ],
      correct: "Ons sal 'n boek lees.",
      explanation: 'Future tense uses "sal" as Verb 1, and the base verb moves to the end.'
    },
    {
      id: 't4',
      presentAf: 'Die kinders hardloop vinnig.',
      presentEn: 'The children run fast.',
      targetTense: 'past',
      targetTenseLabelAf: 'Verlede Tyd (Past Tense)',
      options: [
        'Die kinders het vinnig gehardloop.',
        'Die kinders hardloop het vinnig.',
        'Die kinders sal vinnig gehardloop.',
        'Die kinders is vinnig gehardloop.'
      ],
      correct: 'Die kinders het vinnig gehardloop.',
      explanation: 'Past tense in Afrikaans uses "het", NEVER "is" for running!'
    }
  ],
  medium: [
    {
      id: 'tm1',
      presentAf: "Jan eet 'n rooi appel.",
      presentEn: 'Jan eats a red apple.',
      targetTense: 'past',
      targetTenseLabelAf: 'Verlede Tyd (Past Tense)',
      options: [
        "Jan het 'n rooi appel geëet.",
        "Jan het 'n rooi appel ge-eet.",
        "Jan het 'n rooi appel geeet.",
        "Jan eet het 'n rooi appel."
      ],
      correct: "Jan het 'n rooi appel geëet.",
      explanation: 'Spelling rule: "eet" takes a deëls / trema on the second e: "geëet"!'
    },
    {
      id: 'tm2',
      presentAf: 'Die seun maak die venster oop.',
      presentEn: 'The boy opens the window.',
      targetTense: 'past',
      targetTenseLabelAf: 'Verlede Tyd (Past Tense - Skeibare Werkwoord)',
      options: [
        'Die seun het die venster oopgemaak.',
        'Die seun het oop die venster gemaak.',
        'Die seun het die venster gemaak oop.',
        'Die seun oopgemaak die venster.'
      ],
      correct: 'Die seun het die venster oopgemaak.',
      explanation: 'Separable verb "oopmaak": the "ge-" is inserted between the parts: "oop-ge-maak"!'
    },
    {
      id: 'tm3',
      presentAf: 'Sy wil haar maatjie help.',
      presentEn: 'She wants to help her friend.',
      targetTense: 'past',
      targetTenseLabelAf: 'Verlede Tyd (Hulpwerkwoord "wil")',
      options: [
        'Sy wou haar maatjie help.',
        'Sy het haar maatjie gehelp wil.',
        'Sy wil het haar maatjie gehelp.',
        'Sy het gewil haar maatjie help.'
      ],
      correct: 'Sy wou haar maatjie help.',
      explanation: 'Modal verbs have past forms: "wil" -> "wou", "kan" -> "kon", "moet" -> "moes"!'
    },
    {
      id: 'tm4',
      presentAf: 'Die atleet wen die goue medalje.',
      presentEn: 'The athlete wins the gold medal.',
      targetTense: 'future',
      targetTenseLabelAf: 'Toekomende Tyd (Future Tense)',
      options: [
        'Die atleet sal die goue medalje wen.',
        'Die atleet sal wen die goue medalje.',
        'Die atleet het die goue medalje gewen.',
        'Die atleet sal die goue medalje gewen.'
      ],
      correct: 'Die atleet sal die goue medalje wen.',
      explanation: 'Future tense: "sal" in Verb 1 position, base verb ("wen") at the end without "ge-".'
    }
  ],
  hard: [
    {
      id: 'th1',
      presentAf: 'Die leerder verstaan die moeilike som.',
      presentEn: 'The learner understands the difficult sum.',
      targetTense: 'past',
      targetTenseLabelAf: 'Verlede Tyd (Inseparable Prefix ver-)',
      options: [
        'Die leerder het die moeilike som verstaan.',
        'Die leerder het die moeilike som geverstaan.',
        'Die leerder het die moeilike som verge-staan.',
        'Die leerder verstaan het die moeilike som.'
      ],
      correct: 'Die leerder het die moeilike som verstaan.',
      explanation: 'Golden Rule: Verbs starting with be-, ge-, her-, er-, ont-, ver- DO NOT get "ge-" in the past tense!'
    },
    {
      id: 'th2',
      presentAf: 'Die onderwyser beantwoord al die vrae.',
      presentEn: 'The teacher answers all the questions.',
      targetTense: 'past',
      targetTenseLabelAf: 'Verlede Tyd (Inseparable Prefix be-)',
      options: [
        'Die onderwyser het al die vrae beantwoord.',
        'Die onderwyser het al die vrae gebeantwoord.',
        'Die onderwyser het al die vrae begeantwoord.',
        'Die onderwyser beantwoord het al die vrae.'
      ],
      correct: 'Die onderwyser het al die vrae beantwoord.',
      explanation: 'Prefix "be-": No extra "ge-"! "Die onderwyser het al die vrae beantwoord."'
    },
    {
      id: 'th3',
      presentAf: 'Die polisie ontdek die geheime pad.',
      presentEn: 'The police discover the secret road.',
      targetTense: 'past',
      targetTenseLabelAf: 'Verlede Tyd (Inseparable Prefix ont-)',
      options: [
        'Die polisie het die geheime pad ontdek.',
        'Die polisie het die geheime pad geontdek.',
        'Die polisie het die geheime pad ontgedek.',
        'Die polisie ontdek het die geheime pad.'
      ],
      correct: 'Die polisie het die geheime pad ontdek.',
      explanation: 'Prefix "ont-": Never add "ge-"! Simply: "het ontdek".'
    },
    {
      id: 'th4',
      presentAf: 'Hy kan nie die toets skryf nie.',
      presentEn: 'He cannot write the test.',
      targetTense: 'past',
      targetTenseLabelAf: 'Verlede Tyd (Modal "kan" in Negation)',
      options: [
        'Hy kon nie die toets skryf nie.',
        'Hy het nie die toets geskryf kan nie.',
        'Hy kan nie die toets geskryf het nie.',
        'Hy gekan nie die toets skryf nie.'
      ],
      correct: 'Hy kon nie die toets skryf nie.',
      explanation: '"kan" changes to its past tense form "kon", preserving both "nie"s.'
    }
  ]
};

/* -------------------------------------------------------------
   8. NEW GAME: MEERVOUDE & VERKLEINWOORDE 🪄
------------------------------------------------------------- */
export interface PluralDiminutiveQuestion {
  id: string;
  baseWord: string;
  englishMeaning: string;
  type: 'meervoud' | 'verkleinwoord';
  typeLabelAf: string;
  options: string[];
  correct: string;
  explanation: string;
}

export const PLURALS_DIMINUTIVES_DATA: Record<GameDifficulty, PluralDiminutiveQuestion[]> = {
  easy: [
    {
      id: 'p1',
      baseWord: 'hond',
      englishMeaning: 'dog',
      type: 'meervoud',
      typeLabelAf: 'Meervoud (Plural)',
      options: ['honde', 'honds', 'hondte', 'hondies'],
      correct: 'honde',
      explanation: 'Simple plural: add -e to "hond" -> "honde".'
    },
    {
      id: 'p2',
      baseWord: 'kat',
      englishMeaning: 'cat',
      type: 'verkleinwoord',
      typeLabelAf: 'Verkleinwoord (Diminutive)',
      options: ['katjie', 'kattie', 'katetjie', 'katjie'],
      correct: 'katjie',
      explanation: 'Words ending in -t simply take -jie: "kat" -> "katjie".'
    },
    {
      id: 'p3',
      baseWord: 'boek',
      englishMeaning: 'book',
      type: 'meervoud',
      typeLabelAf: 'Meervoud (Plural)',
      options: ['boeke', 'boeks', 'boekies', 'boekte'],
      correct: 'boeke',
      explanation: 'Simple plural with double vowel: add -e -> "boeke".'
    },
    {
      id: 'p4',
      baseWord: 'hond',
      englishMeaning: 'dog',
      type: 'verkleinwoord',
      typeLabelAf: 'Verkleinwoord (Diminutive)',
      options: ['hondjie', 'hondie', 'hondtjie', 'hondpie'],
      correct: 'hondjie',
      explanation: 'Words ending in -d take -jie: "hond" -> "hondjie".'
    }
  ],
  medium: [
    {
      id: 'pm1',
      baseWord: 'boom',
      englishMeaning: 'tree',
      type: 'meervoud',
      typeLabelAf: 'Meervoud (Plural - Dubbelvokaal reël)',
      options: ['bome', 'boome', 'booms', 'boomte'],
      correct: 'bome',
      explanation: 'Twin vowel rule: When adding -e to twin vowels (aa, ee, oo, uu), one vowel drops: "boom" -> "bome"!'
    },
    {
      id: 'pm2',
      baseWord: 'kat',
      englishMeaning: 'cat',
      type: 'meervoud',
      typeLabelAf: 'Meervoud (Plural - Kort vokaal reël)',
      options: ['katte', 'kate', 'kats', 'kattie'],
      correct: 'katte',
      explanation: 'Short vowel rule: Short vowel followed by a single consonant doubles the consonant: "kat" -> "katte"!'
    },
    {
      id: 'pm3',
      baseWord: 'stoel',
      englishMeaning: 'chair',
      type: 'verkleinwoord',
      typeLabelAf: 'Verkleinwoord (Diminutive)',
      options: ['stoeltjie', 'stoelie', 'stoeljie', 'stoelpie'],
      correct: 'stoeltjie',
      explanation: 'Words ending in -l preceded by a long vowel/diphthong take -tjie: "stoeltjie".'
    },
    {
      id: 'pm4',
      baseWord: 'koppie',
      englishMeaning: 'cup',
      type: 'meervoud',
      typeLabelAf: 'Meervoud (Plural - Eindig op -ie)',
      options: ['koppies', 'koppieë', 'koppiee', 'koppiede'],
      correct: 'koppies',
      explanation: 'Words already ending on -ie take -s in plural: "koppie" -> "koppies"!'
    }
  ],
  hard: [
    {
      id: 'ph1',
      baseWord: 'oog',
      englishMeaning: 'eye',
      type: 'meervoud',
      typeLabelAf: 'Meervoud (Plural - Deelteken / Trema reël)',
      options: ['oë', 'ooge', 'oogs', 'ogies'],
      correct: 'oë',
      explanation: 'Irregular plural: "oog" drops the g and gains a trema on the e: "oë"!'
    },
    {
      id: 'ph2',
      baseWord: 'pad',
      englishMeaning: 'road / path',
      type: 'meervoud',
      typeLabelAf: 'Meervoud (Plural - Onreëlmatig)',
      options: ['paaie', 'padde', 'pade', 'pads'],
      correct: 'paaie',
      explanation: 'Irregular plural: "pad" becomes "paaie" (the d changes to ie with vowel lengthening)!'
    },
    {
      id: 'ph3',
      baseWord: 'wiel',
      englishMeaning: 'wheel',
      type: 'verkleinwoord',
      typeLabelAf: 'Verkleinwoord (Diminutive - -etjie reël)',
      options: ['wieletjie', 'wieltjie', 'wielie', 'wieljie'],
      correct: 'wieletjie',
      explanation: 'Short sounding -el endings or single syllables often take -etjie: "wiel" -> "wieletjie".'
    },
    {
      id: 'ph4',
      baseWord: 'nooi',
      englishMeaning: 'young lady / maiden',
      type: 'verkleinwoord',
      typeLabelAf: 'Verkleinwoord (Diminutive - -entjie uitsondering)',
      options: ['nooientjie', 'nooitjie', 'nooipie', 'nooietjie'],
      correct: 'nooientjie',
      explanation: 'Special rule: words like nooi, vrou, wa, pa take -ntjie: "nooi" -> "nooientjie"!'
    }
  ]
};

/* -------------------------------------------------------------
   9. WOORDSOEK-AVONTUUR (AFRIKAANS WORD SEARCH)
------------------------------------------------------------- */
export interface WordSearchItem {
  word: string;
  english: string;
  emoji: string;
  coords: [number, number][]; // [row, col] list
}

export interface WordSearchPuzzle {
  id: string;
  themeAf: string;
  themeEn: string;
  gridSize: number;
  grid: string[][];
  words: WordSearchItem[];
}

export const WORDSEARCH_DATA: Record<GameDifficulty, WordSearchPuzzle[]> = {
  easy: [
    {
      id: 'ws-easy-1',
      themeAf: 'Plaasdiere & Troeteldiere 🐾',
      themeEn: 'Farm & Pet Animals',
      gridSize: 7,
      grid: [
        ['H', 'O', 'N', 'D', 'P', 'L', 'K'],
        ['K', 'A', 'T', 'R', 'O', 'O', 'S'],
        ['K', 'O', 'E', 'I', 'M', 'E', 'R'],
        ['H', 'A', 'A', 'S', 'V', 'I', 'S'],
        ['B', 'O', 'K', 'P', 'E', 'R', 'D'],
        ['V', 'A', 'E', 'B', 'Y', 'S', 'T'],
        ['L', 'E', 'E', 'U', 'W', 'M', 'N']
      ],
      words: [
        { word: 'HOND', english: 'Dog', emoji: '🐶', coords: [[0, 0], [0, 1], [0, 2], [0, 3]] },
        { word: 'KAT', english: 'Cat', emoji: '🐱', coords: [[1, 0], [1, 1], [1, 2]] },
        { word: 'KOEI', english: 'Cow', emoji: '🐮', coords: [[2, 0], [2, 1], [2, 2], [2, 3]] },
        { word: 'HAAS', english: 'Hare / Rabbit', emoji: '🐰', coords: [[3, 0], [3, 1], [3, 2], [3, 3]] },
        { word: 'VIS', english: 'Fish', emoji: '🐟', coords: [[3, 4], [3, 5], [3, 6]] },
        { word: 'BOK', english: 'Goat / Antelope', emoji: '🐐', coords: [[4, 0], [4, 1], [4, 2]] },
        { word: 'PERD', english: 'Horse', emoji: '🐴', coords: [[4, 3], [4, 4], [4, 5], [4, 6]] },
        { word: 'LEEU', english: 'Lion', emoji: '🦁', coords: [[6, 0], [6, 1], [6, 2], [6, 3]] }
      ]
    },
    {
      id: 'ws-easy-2',
      themeAf: 'Kleure & Natuur 🌈',
      themeEn: 'Colours & Nature',
      gridSize: 7,
      grid: [
        ['R', 'O', 'O', 'I', 'B', 'L', 'S'],
        ['B', 'L', 'O', 'U', 'G', 'E', 'L'],
        ['G', 'E', 'E', 'L', 'W', 'I', 'T'],
        ['G', 'R', 'O', 'E', 'N', 'S', 'N'],
        ['S', 'W', 'A', 'R', 'T', 'A', 'N'],
        ['B', 'O', 'O', 'M', 'L', 'U', 'G'],
        ['S', 'O', 'N', 'S', 'E', 'E', 'T']
      ],
      words: [
        { word: 'ROOI', english: 'Red', emoji: '🔴', coords: [[0, 0], [0, 1], [0, 2], [0, 3]] },
        { word: 'BLOU', english: 'Blue', emoji: '🔵', coords: [[1, 0], [1, 1], [1, 2], [1, 3]] },
        { word: 'GEEL', english: 'Yellow', emoji: '🟡', coords: [[2, 0], [2, 1], [2, 2], [2, 3]] },
        { word: 'WIT', english: 'White', emoji: '⚪', coords: [[2, 4], [2, 5], [2, 6]] },
        { word: 'GROEN', english: 'Green', emoji: '🟢', coords: [[3, 0], [3, 1], [3, 2], [3, 3], [3, 4]] },
        { word: 'SWART', english: 'Black', emoji: '⚫', coords: [[4, 0], [4, 1], [4, 2], [4, 3], [4, 4]] },
        { word: 'BOOM', english: 'Tree', emoji: '🌳', coords: [[5, 0], [5, 1], [5, 2], [5, 3]] },
        { word: 'SON', english: 'Sun', emoji: '☀️', coords: [[6, 0], [6, 1], [6, 2]] }
      ]
    }
  ],
  medium: [
    {
      id: 'ws-med-1',
      themeAf: 'In die Klaskamer 🏫',
      themeEn: 'In the Classroom',
      gridSize: 8,
      grid: [
        ['B', 'O', 'E', 'K', 'P', 'E', 'N', 'N'],
        ['T', 'A', 'F', 'E', 'L', 'T', 'A', 'S'],
        ['S', 'T', 'O', 'E', 'L', 'K', 'R', 'T'],
        ['K', 'L', 'A', 'S', 'M', 'A', 'A', 'T'],
        ['B', 'O', 'R', 'D', 'L', 'I', 'N', 'G'],
        ['S', 'K', 'A', 'A', 'R', 'P', 'O', 'T'],
        ['P', 'O', 'T', 'L', 'O', 'O', 'D', 'S'],
        ['W', 'Y', 'S', 'E', 'R', 'E', 'E', 'N']
      ],
      words: [
        { word: 'BOEK', english: 'Book', emoji: '📖', coords: [[0, 0], [0, 1], [0, 2], [0, 3]] },
        { word: 'PEN', english: 'Pen', emoji: '🖊️', coords: [[0, 4], [0, 5], [0, 6]] },
        { word: 'TAFEL', english: 'Table / Desk', emoji: '🪑', coords: [[1, 0], [1, 1], [1, 2], [1, 3], [1, 4]] },
        { word: 'TAS', english: 'School bag', emoji: '🎒', coords: [[1, 5], [1, 6], [1, 7]] },
        { word: 'STOEL', english: 'Chair', emoji: '🪑', coords: [[2, 0], [2, 1], [2, 2], [2, 3], [2, 4]] },
        { word: 'KLAS', english: 'Classroom', emoji: '🏫', coords: [[3, 0], [3, 1], [3, 2], [3, 3]] },
        { word: 'MAAT', english: 'Friend / Classmate', emoji: '👫', coords: [[3, 4], [3, 5], [3, 6], [3, 7]] },
        { word: 'BORD', english: 'Chalkboard', emoji: '📋', coords: [[4, 0], [4, 1], [4, 2], [4, 3]] },
        { word: 'POTLOOD', english: 'Pencil', emoji: '✏️', coords: [[6, 0], [6, 1], [6, 2], [6, 3], [6, 4], [6, 5], [6, 6]] }
      ]
    }
  ],
  hard: [
    {
      id: 'ws-hard-1',
      themeAf: 'Suid-Afrikaanse Lekkernye & Natuur 🇿🇦',
      themeEn: 'South African Treats & Heritage',
      gridSize: 9,
      grid: [
        ['B', 'O', 'E', 'R', 'E', 'W', 'O', 'R', 'S'],
        ['B', 'I', 'L', 'T', 'O', 'N', 'G', 'K', 'A'],
        ['B', 'R', 'A', 'A', 'I', 'V', 'L', 'E', 'I'],
        ['B', 'O', 'E', 'T', 'I', 'E', 'S', 'U', 'S'],
        ['P', 'R', 'O', 'T', 'E', 'A', 'B', 'L', 'O'],
        ['S', 'P', 'R', 'I', 'N', 'G', 'B', 'O', 'K'],
        ['R', 'O', 'O', 'I', 'B', 'O', 'S', 'T', 'E'],
        ['V', 'E', 'L', 'D', 'B', 'L', 'O', 'M', 'K'],
        ['M', 'E', 'L', 'K', 'T', 'E', 'R', 'T', 'P']
      ],
      words: [
        { word: 'BOEREWORS', english: 'Traditional sausage', emoji: '🌭', coords: [[0, 0], [0, 1], [0, 2], [0, 3], [0, 4], [0, 5], [0, 6], [0, 7], [0, 8]] },
        { word: 'BILTONG', english: 'Dried spiced meat', emoji: '🥩', coords: [[1, 0], [1, 1], [1, 2], [1, 3], [1, 4], [1, 5], [1, 6]] },
        { word: 'BRAAI', english: 'Barbecue', emoji: '🔥', coords: [[2, 0], [2, 1], [2, 2], [2, 3], [2, 4]] },
        { word: 'PROTEA', english: 'National flower', emoji: '🌸', coords: [[4, 0], [4, 1], [4, 2], [4, 3], [4, 4], [4, 5]] },
        { word: 'SPRINGBOK', english: 'National animal', emoji: '🦌', coords: [[5, 0], [5, 1], [5, 2], [5, 3], [5, 4], [5, 5], [5, 6], [5, 7], [5, 8]] },
        { word: 'ROOIBOS', english: 'Indigenous red tea', emoji: '🍵', coords: [[6, 0], [6, 1], [6, 2], [6, 3], [6, 4], [6, 5], [6, 6]] },
        { word: 'VELD', english: 'Open wilderness', emoji: '🌾', coords: [[7, 0], [7, 1], [7, 2], [7, 3]] },
        { word: 'MELKTERT', english: 'Milk tart dessert', emoji: '🥧', coords: [[8, 0], [8, 1], [8, 2], [8, 3], [8, 4], [8, 5], [8, 6], [8, 7]] }
      ]
    }
  ]
};

/* -------------------------------------------------------------
   10. TEENOORGESTELDES & SINONIEME (OPPOSITES & SYNONYMS)
------------------------------------------------------------- */
export interface OppositeSynonymRound {
  id: string;
  word: string;
  englishMeaning: string;
  mode: 'antoniem' | 'sinoniem';
  modeLabelAf: string;
  targetLabelEn: string;
  options: string[];
  correct: string;
  explanation: string;
  emoji: string;
}

export const OPPOSITES_SYNONYMS_DATA: Record<GameDifficulty, OppositeSynonymRound[]> = {
  easy: [
    {
      id: 'os-e1',
      word: 'warm',
      englishMeaning: 'warm / hot',
      mode: 'antoniem',
      modeLabelAf: 'Teenoorgestelde (Antoniem)',
      targetLabelEn: 'Find the OPPOSITE of warm:',
      options: ['koud', 'vinnig', 'sag', 'mooi'],
      correct: 'koud',
      explanation: 'Die teenoorgestelde van warm is koud (hot vs cold)!',
      emoji: '🔥'
    },
    {
      id: 'os-e2',
      word: 'groot',
      englishMeaning: 'big / large',
      mode: 'antoniem',
      modeLabelAf: 'Teenoorgestelde (Antoniem)',
      targetLabelEn: 'Find the OPPOSITE of big:',
      options: ['klein', 'swaar', 'lank', 'hard'],
      correct: 'klein',
      explanation: 'Die teenoorgestelde van groot is klein (big vs small)!',
      emoji: '🐘'
    },
    {
      id: 'os-e3',
      word: 'bly',
      englishMeaning: 'happy / cheerful',
      mode: 'sinoniem',
      modeLabelAf: 'Sinoniem (Dieselfde betekenis)',
      targetLabelEn: 'Find the SYNONYM of happy:',
      options: ['gelukkig', 'hartseer', 'kwaad', 'moeg'],
      correct: 'gelukkig',
      explanation: 'Bly en gelukkig beteken albei happy!',
      emoji: '😊'
    },
    {
      id: 'os-e4',
      word: 'dag',
      englishMeaning: 'day',
      mode: 'antoniem',
      modeLabelAf: 'Teenoorgestelde (Antoniem)',
      targetLabelEn: 'Find the OPPOSITE of day:',
      options: ['nag', 'middag', 'oggend', 'son'],
      correct: 'nag',
      explanation: 'Die teenoorgestelde van dag is nag (day vs night)!',
      emoji: '☀️'
    },
    {
      id: 'os-e5',
      word: 'lag',
      englishMeaning: 'laugh',
      mode: 'antoniem',
      modeLabelAf: 'Teenoorgestelde (Antoniem)',
      targetLabelEn: 'Find the OPPOSITE of laugh:',
      options: ['huil', 'praat', 'sing', 'dans'],
      correct: 'huil',
      explanation: 'Die teenoorgestelde van lag is huil (laugh vs cry)!',
      emoji: '😄'
    },
    {
      id: 'os-e6',
      word: 'praat',
      englishMeaning: 'talk / speak',
      mode: 'sinoniem',
      modeLabelAf: 'Sinoniem (Dieselfde betekenis)',
      targetLabelEn: 'Find the SYNONYM of speak:',
      options: ['gesels', 'slaap', 'hardloop', 'eet'],
      correct: 'gesels',
      explanation: 'Praat en gesels beteken albei to chat or speak!',
      emoji: '🗣️'
    }
  ],
  medium: [
    {
      id: 'os-m1',
      word: 'vinnig',
      englishMeaning: 'fast / quickly',
      mode: 'antoniem',
      modeLabelAf: 'Teenoorgestelde (Antoniem)',
      targetLabelEn: 'Find the OPPOSITE of fast:',
      options: ['stadig', 'fluks', 'hard', 'gou'],
      correct: 'stadig',
      explanation: 'Die teenoorgestelde van vinnig is stadig (fast vs slow)!',
      emoji: '⚡'
    },
    {
      id: 'os-m2',
      word: 'pragtig',
      englishMeaning: 'beautiful / gorgeous',
      mode: 'sinoniem',
      modeLabelAf: 'Sinoniem (Dieselfde betekenis)',
      targetLabelEn: 'Find the SYNONYM of beautiful:',
      options: ['mooi', 'lelik', 'donker', 'koud'],
      correct: 'mooi',
      explanation: 'Pragtig en mooi het dieselfde betekenis (beautiful)!',
      emoji: '🌸'
    },
    {
      id: 'os-m3',
      word: 'begin',
      englishMeaning: 'begin / start',
      mode: 'antoniem',
      modeLabelAf: 'Teenoorgestelde (Antoniem)',
      targetLabelEn: 'Find the OPPOSITE of start:',
      options: ['eindig', 'spring', 'stap', 'oopmaak'],
      correct: 'eindig',
      explanation: 'Die teenoorgestelde van begin is eindig / klaarmaak (start vs end)!',
      emoji: '🏁'
    },
    {
      id: 'os-m4',
      word: 'kwaad',
      englishMeaning: 'angry',
      mode: 'sinoniem',
      modeLabelAf: 'Sinoniem (Dieselfde betekenis)',
      targetLabelEn: 'Find the SYNONYM of angry:',
      options: ['woedend', 'vrolik', 'bang', 'dapper'],
      correct: 'woedend',
      explanation: 'Kwaad en woedend beteken albei cross/angry!',
      emoji: '😡'
    },
    {
      id: 'os-m5',
      word: 'maklik',
      englishMeaning: 'easy',
      mode: 'antoniem',
      modeLabelAf: 'Teenoorgestelde (Antoniem)',
      targetLabelEn: 'Find the OPPOSITE of easy:',
      options: ['moeilik', 'eenvoudig', 'lekker', 'kort'],
      correct: 'moeilik',
      explanation: 'Die teenoorgestelde van maklik is moeilik (easy vs difficult)!',
      emoji: '🧩'
    },
    {
      id: 'os-m6',
      word: 'fluks',
      englishMeaning: 'hardworking / diligent',
      mode: 'antoniem',
      modeLabelAf: 'Teenoorgestelde (Antoniem)',
      targetLabelEn: 'Find the OPPOSITE of hardworking:',
      options: ['lui', 'slim', 'vroeg', 'moeg'],
      correct: 'lui',
      explanation: 'Die teenoorgestelde van fluks is lui (diligent vs lazy)!',
      emoji: '🐝'
    }
  ],
  hard: [
    {
      id: 'os-h1',
      word: 'dikwels',
      englishMeaning: 'often / frequently',
      mode: 'sinoniem',
      modeLabelAf: 'Sinoniem (Dieselfde betekenis)',
      targetLabelEn: 'Find the SYNONYM of often:',
      options: ['gereeld', 'selde', 'nooit', 'onlangs'],
      correct: 'gereeld',
      explanation: 'Dikwels en gereeld beteken albei often/regularly!',
      emoji: '🔄'
    },
    {
      id: 'os-h2',
      word: 'dapper',
      englishMeaning: 'brave / courageous',
      mode: 'antoniem',
      modeLabelAf: 'Teenoorgestelde (Antoniem)',
      targetLabelEn: 'Find the OPPOSITE of brave:',
      options: ['lafhartig', 'moedig', 'kragtig', 'sterk'],
      correct: 'lafhartig',
      explanation: 'Die teenoorgestelde van dapper is lafhartig (brave vs cowardly)!',
      emoji: '🦁'
    },
    {
      id: 'os-h3',
      word: 'waarheid',
      englishMeaning: 'truth',
      mode: 'antoniem',
      modeLabelAf: 'Teenoorgestelde (Antoniem)',
      targetLabelEn: 'Find the OPPOSITE of truth:',
      options: ['leuen', 'feit', 'storie', 'antwoord'],
      correct: 'leuen',
      explanation: 'Die teenoorgestelde van waarheid is leuen (truth vs lie)!',
      emoji: '⚖️'
    },
    {
      id: 'os-h4',
      word: 'moedig',
      englishMeaning: 'courageous',
      mode: 'sinoniem',
      modeLabelAf: 'Sinoniem (Dieselfde betekenis)',
      targetLabelEn: 'Find the SYNONYM of courageous:',
      options: ['dapper', 'bang', 'onseker', 'swak'],
      correct: 'dapper',
      explanation: 'Moedig en dapper het dieselfde betekenis (courageous/brave)!',
      emoji: '🛡️'
    },
    {
      id: 'os-h5',
      word: 'skelm',
      englishMeaning: 'cunning / crafty',
      mode: 'sinoniem',
      modeLabelAf: 'Sinoniem (Dieselfde betekenis)',
      targetLabelEn: 'Find the SYNONYM of sneaky/crafty:',
      options: ['slonsig', 'bedrieglik', 'eerlik', 'sag'],
      correct: 'bedrieglik',
      explanation: 'Skelm en bedrieglik verwys na dishonest or crafty behaviour!',
      emoji: '🦊'
    }
  ]
};

/* -------------------------------------------------------------
   11. VOORSETSEL-AVONTUUR (PREPOSITIONS & POSITIONS)
------------------------------------------------------------- */
export interface PrepositionRound {
  id: string;
  preposition: string;
  sentenceWithBlank: string;
  sentenceEn: string;
  correctWord: string;
  options: string[];
  visualScene: string;
  itemPlacementText: string;
  explanation: string;
}

export const PREPOSITIONS_DATA: Record<GameDifficulty, PrepositionRound[]> = {
  easy: [
    {
      id: 'prep-e1',
      preposition: 'op',
      sentenceWithBlank: 'Ollie sit ___ die stoel.',
      sentenceEn: 'Ollie sits on the chair.',
      correctWord: 'op',
      options: ['op', 'onder', 'in', 'langs'],
      visualScene: '🦁🪑',
      itemPlacementText: 'Ollie is bo-op die sitplek van die stoel.',
      explanation: '"Op" beteken on / on top of.'
    },
    {
      id: 'prep-e2',
      preposition: 'onder',
      sentenceWithBlank: 'Die kat slaap ___ die tafel.',
      sentenceEn: 'The cat sleeps under the table.',
      correctWord: 'onder',
      options: ['onder', 'op', 'langs', 'in'],
      visualScene: '🐱🪑',
      itemPlacementText: 'Die kat is onder die tafel op die mat.',
      explanation: '"Onder" beteken underneath / under.'
    },
    {
      id: 'prep-e3',
      preposition: 'in',
      sentenceWithBlank: 'Die potlood lê ___ die tassie.',
      sentenceEn: 'The pencil lies in the pencil case.',
      correctWord: 'in',
      options: ['in', 'op', 'onder', 'oor'],
      visualScene: '✏️👝',
      itemPlacementText: 'Die potlood is binne-in die potloodsak.',
      explanation: '"In" beteken inside / in.'
    },
    {
      id: 'prep-e4',
      preposition: 'langs',
      sentenceWithBlank: 'Die hond sit ___ sy baas.',
      sentenceEn: 'The dog sits next to his owner.',
      correctWord: 'langs',
      options: ['langs', 'oor', 'in', 'onder'],
      visualScene: '🐶🧍',
      itemPlacementText: 'Die hond sit reg langs die seuntjie.',
      explanation: '"Langs" beteken next to / beside.'
    }
  ],
  medium: [
    {
      id: 'prep-m1',
      preposition: 'agter',
      sentenceWithBlank: 'Die seun kruip ___ die boom weg.',
      sentenceEn: 'The boy hides behind the tree.',
      correctWord: 'agter',
      options: ['agter', 'voor', 'op', 'onder'],
      visualScene: '👦🌳',
      itemPlacementText: 'Die seun is weggesteek agter die stam van die boom.',
      explanation: '"Agter" beteken behind.'
    },
    {
      id: 'prep-m2',
      preposition: 'voor',
      sentenceWithBlank: 'Die motor staan ___ die huis.',
      sentenceEn: 'The car stands in front of the house.',
      correctWord: 'voor',
      options: ['voor', 'agter', 'in', 'oor'],
      visualScene: '🚗🏡',
      itemPlacementText: 'Die kar is reg voor die voordeur geparkeer.',
      explanation: '"Voor" beteken in front of / before.'
    },
    {
      id: 'prep-m3',
      preposition: 'tussen',
      sentenceWithBlank: 'Die voël sit ___ die twee takke.',
      sentenceEn: 'The bird sits between the two branches.',
      correctWord: 'tussen',
      options: ['tussen', 'langs', 'onder', 'in'],
      visualScene: '🌿🐦🌿',
      itemPlacementText: 'Die voëltjie sit presies tussen die twee takkies.',
      explanation: '"Tussen" beteken between.'
    },
    {
      id: 'prep-m4',
      preposition: 'oor',
      sentenceWithBlank: 'Die perd spring ___ die heining.',
      sentenceEn: 'The horse jumps over the fence.',
      correctWord: 'oor',
      options: ['oor', 'deur', 'teen', 'langs'],
      visualScene: '🐴🚧',
      itemPlacementText: 'Die perd spring hoog bo-oor die heining.',
      explanation: '"Oor" beteken over / across.'
    }
  ],
  hard: [
    {
      id: 'prep-h1',
      preposition: 'deur',
      sentenceWithBlank: 'Die trein ry ___ die donker tonnel.',
      sentenceEn: 'The train drives through the dark tunnel.',
      correctWord: 'deur',
      options: ['deur', 'teen', 'langs', 'oor'],
      visualScene: '🚂🚇',
      itemPlacementText: 'Die trein gaan regdeur die bergtonnel.',
      explanation: '"Deur" beteken through.'
    },
    {
      id: 'prep-h2',
      preposition: 'teen',
      sentenceWithBlank: 'Die leer staan skuins ___ die muur.',
      sentenceEn: 'The ladder stands leaning against the wall.',
      correctWord: 'teen',
      options: ['teen', 'onder', 'deur', 'tussen'],
      visualScene: '🪜🧱',
      itemPlacementText: 'Die leer leun reg teen die baksteenmuur.',
      explanation: '"Teen" beteken against.'
    },
    {
      id: 'prep-h3',
      preposition: 'teenoor',
      sentenceWithBlank: 'Die skool is ___ die groot park geleë.',
      sentenceEn: 'The school is situated opposite the big park.',
      correctWord: 'teenoor',
      options: ['teenoor', 'tussen', 'deur', 'agter'],
      visualScene: '🏫🛣️🌳',
      itemPlacementText: 'Die skool en die park kyk reg na mekaar oor die straat.',
      explanation: '"Teenoor" beteken opposite / across from.'
    },
    {
      id: 'prep-h4',
      preposition: 'tydens',
      sentenceWithBlank: 'Ons eet lekker braaivleis ___ die vakansie.',
      sentenceEn: 'We eat delicious braaivleis during the holidays.',
      correctWord: 'tydens',
      options: ['tydens', 'deur', 'teen', 'voor'],
      visualScene: '🥩⛺☀️',
      itemPlacementText: 'Tydens die vakansieperiode (during the holidays).',
      explanation: '"Tydens" beteken during (time preposition).'
    }
  ]
};
