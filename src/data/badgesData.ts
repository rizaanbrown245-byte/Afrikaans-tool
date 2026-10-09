import { Badge, AnimalAvatar, OllieMilestoneBadge } from '../types';

export const OLLIE_BADGES_DATA: OllieMilestoneBadge[] = [
  {
    id: 'ollie-conductor',
    titleAf: 'Treindrywer Ollie',
    titleEn: 'Conductor Ollie',
    roleTitle: 'STOMPI Meester',
    ollieCostumeEmoji: '🚂🦉',
    costume: 'conductor',
    descriptionAf: 'Bemeester die STOMPI sinsbou-module (Onderwerp 8)!',
    descriptionEn: 'Master the STOMPI sentence building module (Topic 8)!',
    milestoneType: 'module',
    requiredLessonIds: ['topic-8-sentence-building-stompi'],
    unlockedMessageAf: 'Tjoek-tjoek! Jy bestuur nou die Afrikaanse sinnetrein soos \'n baas!',
    unlockedMessageEn: 'Choo-choo! You conquered the famous STOMPI sentence train!',
    accentColor: 'from-cyan-500 to-blue-600'
  },
  {
    id: 'ollie-safari',
    titleAf: 'Safari-Gids Ollie',
    titleEn: 'Ranger Ollie',
    roleTitle: 'Bosveld Kenner',
    ollieCostumeEmoji: '🦁🦉',
    costume: 'safari',
    descriptionAf: 'Voltooi die Diere van Suid-Afrika module (Onderwerp 5)!',
    descriptionEn: 'Complete the Animals of South Africa module (Topic 5)!',
    milestoneType: 'module',
    requiredLessonIds: ['topic-5-animals'],
    unlockedMessageAf: 'Die leeu brul en die bokkies spring! Jy ken al ons wilde diere!',
    unlockedMessageEn: 'The lions roar for you! You learned all South African wildlife names!',
    accentColor: 'from-amber-500 to-orange-600'
  },
  {
    id: 'ollie-chef',
    titleAf: 'Meestersjef Ollie',
    titleEn: 'Chef Ollie',
    roleTitle: 'Kos & Smul Meester',
    ollieCostumeEmoji: '👨‍🍳🦉',
    costume: 'chef',
    descriptionAf: 'Voltooi die Kos en Drankies module (Onderwerp 6)!',
    descriptionEn: 'Complete the Food & Drinks module (Topic 6)!',
    milestoneType: 'module',
    requiredLessonIds: ['topic-6-food-and-drinks'],
    unlockedMessageAf: 'Mmm, dis heerlik! Jy ken nou al die lekker kos en drankies!',
    unlockedMessageEn: 'Delicious! You know your South African lunchbox and braai words!',
    accentColor: 'from-orange-500 to-red-600'
  },
  {
    id: 'ollie-detective',
    titleAf: 'Speurder Ollie',
    titleEn: 'Detective Ollie',
    roleTitle: 'Ontkenning Ondersoeker',
    ollieCostumeEmoji: '🕵️🦉',
    costume: 'detective',
    descriptionAf: 'Los die geheim van Ontkenning (nie...nie) en Vraagwoorde op (Onderwerp 12)!',
    descriptionEn: 'Solve the mystery of Negatives (nie...nie) and Question Words (Topic 12)!',
    milestoneType: 'module',
    requiredLessonIds: ['topic-12-negatives-and-questions'],
    unlockedMessageAf: 'Wie? Wat? Waar? Jy mis nie \'n enkele leidraad of \'n tweede "nie" nie!',
    unlockedMessageEn: 'Case closed! You mastered question words and the double nie...nie!',
    accentColor: 'from-rose-500 to-pink-600'
  },
  {
    id: 'ollie-timetraveler',
    titleAf: 'Tydreisiger Ollie',
    titleEn: 'Time Traveler Ollie',
    roleTitle: 'Meester van Tye',
    ollieCostumeEmoji: '⏳🦉',
    costume: 'timetraveler',
    descriptionAf: 'Bemeester Teenwoordige, Verlede (het...ge-) en Toekomende (sal...) tyd (Onderwerp 11)!',
    descriptionEn: 'Master Present, Past (het...ge-), and Future (sal...) tenses (Topic 11)!',
    milestoneType: 'module',
    requiredLessonIds: ['topic-11-tenses'],
    unlockedMessageAf: 'Gister het jy geleer, vandag weet jy dit, en môre sal jy floreer!',
    unlockedMessageEn: 'You can travel through past, present, and future tenses in Afrikaans!',
    accentColor: 'from-violet-500 to-purple-600'
  },
  {
    id: 'ollie-storyteller',
    titleAf: 'Storieverteller Ollie',
    titleEn: 'Storyteller Ollie',
    roleTitle: 'Leesbegrip Kampioen',
    ollieCostumeEmoji: '📖🦉',
    costume: 'storyteller',
    descriptionAf: 'Voltooi die Leesbegrip module en beantwoord al die begripsvrae (Onderwerp 13)!',
    descriptionEn: 'Complete the Reading Comprehension module and answer all story questions (Topic 13)!',
    milestoneType: 'module',
    requiredLessonIds: ['topic-13-reading-comprehension'],
    unlockedMessageAf: 'Fluit-fluit, my storie is uit! Jy verstaan Afrikaanse stories wonderlik!',
    unlockedMessageEn: 'You understand Afrikaans reading passages and comprehend like a champ!',
    accentColor: 'from-emerald-500 to-teal-600'
  },
  {
    id: 'ollie-author',
    titleAf: 'Skrywer Ollie',
    titleEn: 'Author Ollie',
    roleTitle: 'Kreatiewe Skrywer',
    ollieCostumeEmoji: '✍️🦉',
    costume: 'author',
    descriptionAf: 'Voltooi Paragrawe en Kreatiewe Skryfwerk (Onderwerp 15)!',
    descriptionEn: 'Complete Short Paragraphs & Creative Writing (Topic 15)!',
    milestoneType: 'module',
    requiredLessonIds: ['topic-15-creative-writing-paragraphs'],
    unlockedMessageAf: 'Begin met \'n hoofletter en eindig met \'n punt! Jy is \'n ware skrywer!',
    unlockedMessageEn: 'You can construct beautiful Grade 4 Afrikaans paragraphs with punctuation!',
    accentColor: 'from-amber-500 to-rose-600'
  },
  {
    id: 'ollie-professor',
    titleAf: 'Professor Ollie',
    titleEn: 'Scholar Ollie',
    roleTitle: 'Kwartaal 1 Meester',
    ollieCostumeEmoji: '🎓🦉',
    costume: 'professor',
    descriptionAf: 'Voltooi al 5 basiese grondslagmodules van Kwartaal 1 (Lesse 1 tot 5)!',
    descriptionEn: 'Complete all 5 foundation modules of Term 1 (Lessons 1 to 5)!',
    milestoneType: 'term',
    requiredLessonIds: [
      'topic-1-greetings',
      'topic-2-numbers-days-months',
      'topic-3-colours-and-shapes',
      'topic-4-family-and-friends',
      'topic-5-animals'
    ],
    unlockedMessageAf: 'Hoo-hoo! Al 5 Kwartaal 1 modules voltooi! Jy is \'n ware professor!',
    unlockedMessageEn: 'Hoo-hoo! All Term 1 foundation modules completed! Pure brilliance!',
    accentColor: 'from-amber-400 to-yellow-500'
  },
  {
    id: 'ollie-streak3',
    titleAf: 'Vlam-Ollie (3-Dag Reeks)',
    titleEn: 'Blaze Ollie (3-Day Streak)',
    roleTitle: 'Ywerige Leerder',
    ollieCostumeEmoji: '🔥🦉',
    costume: 'streak3',
    descriptionAf: 'Oefen Afrikaans vir 3 dae in \'n ry!',
    descriptionEn: 'Practice Afrikaans for 3 days in a row!',
    milestoneType: 'streak',
    requiredStreakDays: 3,
    unlockedMessageAf: 'Sjoe, die vlamme brand helder! Jou 3-dag reeks wys ware toewyding!',
    unlockedMessageEn: 'Your streak flame is blazing! 3 days in a row of daily Afrikaans practice!',
    accentColor: 'from-orange-500 to-amber-500'
  },
  {
    id: 'ollie-streak7',
    titleAf: 'Super-Ollie (7-Dag Reeks)',
    titleEn: 'Legend Ollie (7-Day Streak)',
    roleTitle: 'Weeklikse Kampioen',
    ollieCostumeEmoji: '⚡🦉',
    costume: 'streak7',
    descriptionAf: 'Handhaaf \'n volle 7-dag daaglikse leer-reeks!',
    descriptionEn: 'Maintain a full 7-day daily learning streak!',
    milestoneType: 'streak',
    requiredStreakDays: 7,
    unlockedMessageAf: 'Onstuitbaar! \'n Volle week van Afrikaans elke dag! Jy is \'n superster!',
    unlockedMessageEn: 'Unstoppable! A whole week of daily practice! You are an inspiration!',
    accentColor: 'from-purple-500 to-indigo-600'
  },
  {
    id: 'ollie-champion',
    titleAf: 'Groot Kampioen Ollie',
    titleEn: 'Grand Master Ollie',
    roleTitle: 'Graad 4 Afrikaans Meester',
    ollieCostumeEmoji: '🏆🦉',
    costume: 'champion',
    descriptionAf: 'Voltooi al 15 CAPS Graad 4 kurrikulum lesse!',
    descriptionEn: 'Complete all 15 CAPS Grade 4 curriculum lessons!',
    milestoneType: 'curriculum',
    unlockedMessageAf: 'Die kroon pas jou perfek! Jy het die hele Graad 4 Afrikaans kurrikulum voltooi!',
    unlockedMessageEn: 'The crown fits you! You completed all 15 Grade 4 CAPS modules!',
    accentColor: 'from-amber-400 via-yellow-400 to-amber-500'
  }
];

export const BADGES_DATA: Badge[] = [
  {
    id: 'badge-first-step',
    titleAf: 'Eerste Stappe',
    titleEn: 'First Steps',
    description: 'Completed your very first Afrikaans lesson!',
    icon: '🌱',
    category: 'lessons',
    unlocked: false,
    requiredCount: 1
  },
  {
    id: 'badge-stompi',
    titleAf: 'STOMPI Treindrywer',
    titleEn: 'STOMPI Train Driver',
    description: 'Mastered the STOMPI sentence building rule!',
    icon: '🚂',
    category: 'quiz',
    unlocked: false,
    requiredCount: 1
  },
  {
    id: 'badge-safari',
    titleAf: 'Bosveld Safari Ontdekker',
    titleEn: 'Bushveld Safari Explorer',
    description: 'Learned all pet and wild animal names in Afrikaans!',
    icon: '🦁',
    category: 'lessons',
    unlocked: false,
    requiredCount: 5
  },
  {
    id: 'badge-games',
    titleAf: 'Woordspeletjie Kampioen',
    titleEn: 'Word Game Champion',
    description: 'Played 5 interactive Afrikaans learning games!',
    icon: '🎮',
    category: 'games',
    unlocked: false,
    requiredCount: 5
  },
  {
    id: 'badge-stars-50',
    titleAf: 'Goue Ster Versamelaar',
    titleEn: 'Golden Star Collector',
    description: 'Earned 50 shining adventure stars!',
    icon: '⭐',
    category: 'special',
    unlocked: false,
    requiredCount: 50
  },
  {
    id: 'badge-reader',
    titleAf: 'Super Storie Leser',
    titleEn: 'Super Story Reader',
    description: 'Completed a full reading comprehension with top marks!',
    icon: '📖',
    category: 'quiz',
    unlocked: false,
    requiredCount: 1
  },
  {
    id: 'badge-master',
    titleAf: 'Afrikaans Avonturier',
    titleEn: 'Afrikaans Champion',
    description: 'Completed 10 CAPS Grade 4 curriculum topics!',
    icon: '🏆',
    category: 'lessons',
    unlocked: false,
    requiredCount: 10
  }
];

export const ANIMAL_AVATARS: AnimalAvatar[] = [
  {
    id: 'ollie-owl',
    name: 'Ollie die Uil',
    speciesAf: 'Wyse Uil',
    speciesEn: 'Wise Owl',
    emoji: '🦉',
    unlockStars: 0,
    descriptionEn: 'Your encouraging teacher who knows all the Afrikaans grammar secrets!'
  },
  {
    id: 'bennie-bokkie',
    name: 'Bennie die Bokkie',
    speciesAf: 'Springbokkie',
    speciesEn: 'Springbok',
    emoji: '🦌',
    unlockStars: 10,
    descriptionEn: 'Bounces high and loves practicing verbs and action words!'
  },
  {
    id: 'zoe-zebra',
    name: 'Zoë die Sebra',
    speciesAf: 'Sebra',
    speciesEn: 'Zebra',
    emoji: '🦓',
    unlockStars: 25,
    descriptionEn: 'Her black and white stripes love colours and opposites!'
  },
  {
    id: 'simphiwe-lion',
    name: 'Simphiwe die Leeu',
    speciesAf: 'Kalahari Leeu',
    speciesEn: 'Lion',
    emoji: '🦁',
    unlockStars: 45,
    descriptionEn: 'The brave king of the bushveld who roars proudly in Afrikaans!'
  },
  {
    id: 'gerry-giraffe',
    name: 'Gerry die Kameelperd',
    speciesAf: 'Kameelperd',
    speciesEn: 'Giraffe',
    emoji: '🦒',
    unlockStars: 70,
    descriptionEn: 'Tall enough to reach the highest vocabulary trees!'
  },
  {
    id: 'pip-penguin',
    name: 'Pip die Pikkewyn',
    speciesAf: 'Kaapse Pikkewyn',
    speciesEn: 'African Penguin',
    emoji: '🐧',
    unlockStars: 100,
    descriptionEn: 'Swims around Table Bay and wears a dapper tuxedo to school!'
  }
];

export interface AdventureWorld {
  id: number;
  term: 1 | 2 | 3 | 4;
  titleAf: string;
  titleEn: string;
  themeColor: string;
  bgColor: string;
  descriptionEn: string;
  icon: string;
  lessonIds: string[];
}

export const ADVENTURE_WORLDS: AdventureWorld[] = [
  {
    id: 1,
    term: 1,
    titleAf: 'Wêreld 1: Kalahari Kamp',
    titleEn: 'World 1: Kalahari Camp (Term 1)',
    themeColor: 'from-amber-400 to-orange-500',
    bgColor: 'bg-amber-50',
    icon: '⛺',
    descriptionEn: 'Begin your journey! Learn warm greetings, counting, colours, family, and amazing animals.',
    lessonIds: [
      'topic-1-greetings',
      'topic-2-numbers-days-months',
      'topic-3-colours-and-shapes',
      'topic-4-family-and-friends',
      'topic-5-animals'
    ]
  },
  {
    id: 2,
    term: 2,
    titleAf: 'Wêreld 2: Bosveld Safari',
    titleEn: 'World 2: Bushveld Safari (Term 2)',
    themeColor: 'from-emerald-500 to-teal-600',
    bgColor: 'bg-emerald-50',
    icon: '🦒',
    descriptionEn: 'Explore food, classroom gear, the legendary STOMPI sentence train, and parts of speech.',
    lessonIds: [
      'topic-6-food-and-drinks',
      'topic-7-school-and-classroom',
      'topic-8-sentence-building-stompi',
      'topic-9-nouns-verbs-adjectives'
    ]
  },
  {
    id: 3,
    term: 3,
    titleAf: 'Wêreld 3: Tafelberg Vallei',
    titleEn: 'World 3: Table Mountain Valley (Term 3)',
    themeColor: 'from-sky-500 to-indigo-600',
    bgColor: 'bg-sky-50',
    icon: '⛰️',
    descriptionEn: 'Conquer tricky plurals, cute diminutives, time travel tenses, and the double "nie...nie"!',
    lessonIds: [
      'topic-10-plurals-and-diminutives',
      'topic-11-tenses',
      'topic-12-negatives-and-questions'
    ]
  },
  {
    id: 4,
    term: 4,
    titleAf: 'Wêreld 4: Protea Kasteel',
    titleEn: 'World 4: Protea Castle (Term 4)',
    themeColor: 'from-purple-500 to-pink-600',
    bgColor: 'bg-purple-50',
    icon: '🏰',
    descriptionEn: 'Master reading comprehension, secret spelling sound rules, and creative writing paragraphs!',
    lessonIds: [
      'topic-13-reading-comprehension',
      'topic-14-spelling-and-sounds',
      'topic-15-creative-writing-paragraphs'
    ]
  }
];
