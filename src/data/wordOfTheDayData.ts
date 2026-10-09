export interface DailyWord {
  id: string;
  afrikaans: string;
  english: string;
  pronunciationGuide: string;
  partOfSpeech: string;
  category: string;
  exampleAf: string;
  exampleEn: string;
  funFact: string;
  emoji: string;
}

export const WORDS_OF_THE_DAY: DailyWord[] = [
  {
    id: 'wod-1',
    afrikaans: 'Avontuur',
    english: 'Adventure',
    pronunciationGuide: '[uh-fon-teer]',
    partOfSpeech: 'Selfstandige Naamwoord (Noun)',
    category: 'Pret & Reis',
    exampleAf: 'Ons gaan vandag op \'n opwindende avontuur!',
    exampleEn: 'We are going on an exciting adventure today!',
    funFact: 'Ollie sê: Leer is die grootste avontuur wat daar is!',
    emoji: '🧭'
  },
  {
    id: 'wod-2',
    afrikaans: 'Goeiemôre',
    english: 'Good morning',
    pronunciationGuide: '[gooy-uh moo-ruh]',
    partOfSpeech: 'Groetvorm (Greeting)',
    category: 'Groete',
    exampleAf: 'Goeiemôre juffrou en maats!',
    exampleEn: 'Good morning teacher and friends!',
    funFact: 'Let op die kappie (^) op die ô in môre - dit maak die klank langer!',
    emoji: '🌅'
  },
  {
    id: 'wod-3',
    afrikaans: 'Dankbaar',
    english: 'Grateful / Thankful',
    pronunciationGuide: '[dunk-bahr]',
    partOfSpeech: 'Byvoeglike Naamwoord (Adjective)',
    category: 'Gevoelens',
    exampleAf: 'Ek is baie dankbaar vir my familie en vriende.',
    exampleEn: 'I am very grateful for my family and friends.',
    funFact: 'Die woord kom van "dank" + "baar" (gereed om dankie te sê).',
    emoji: '💖'
  },
  {
    id: 'wod-4',
    afrikaans: 'Kameelperd',
    english: 'Giraffe',
    pronunciationGuide: '[kuh-meel-pert]',
    partOfSpeech: 'Selfstandige Naamwoord (Noun)',
    category: 'Diere',
    exampleAf: 'Die lang kameelperd eet groen blare van die boom.',
    exampleEn: 'The tall giraffe eats green leaves from the tree.',
    funFact: '\'n Kameelperd het sewe nekwerwels – net soos \'n mens!',
    emoji: '🦒'
  },
  {
    id: 'wod-5',
    afrikaans: 'Vriendelik',
    english: 'Friendly',
    pronunciationGuide: '[freen-duh-luhk]',
    partOfSpeech: 'Byvoeglike Naamwoord (Adjective)',
    category: 'Mense & Maats',
    exampleAf: 'Ollie die Uil is altyd vriendelik en behulpsaam.',
    exampleEn: 'Ollie the Owl is always friendly and helpful.',
    funFact: 'In Afrikaans klink die "v" aan die begin van woorde soos \'n "f"!',
    emoji: '😊'
  },
  {
    id: 'wod-6',
    afrikaans: 'Boekewurm',
    english: 'Bookworm (someone who loves reading)',
    pronunciationGuide: '[boo-kuh-vuhrm]',
    partOfSpeech: 'Selfstandige Naamwoord (Noun)',
    category: 'Skool & Lees',
    exampleAf: 'Mia is \'n regte boekewurm wat elke dag stories lees.',
    exampleEn: 'Mia is a real bookworm who reads stories every day.',
    funFact: 'Lees help jou om elke dag 10 nuwe Afrikaanse woorde te leer!',
    emoji: '🐛'
  },
  {
    id: 'wod-7',
    afrikaans: 'Reënboog',
    english: 'Rainbow',
    pronunciationGuide: '[ree-un-boo-uch]',
    partOfSpeech: 'Selfstandige Naamwoord (Noun)',
    category: 'Weer & Natuur',
    exampleAf: 'Kyk na die pragtige reënboog ná die reënbui!',
    exampleEn: 'Look at the beautiful rainbow after the rain shower!',
    funFact: 'Suid-Afrika word die "Reënboognasie" genoem weens al ons tale en kulture!',
    emoji: '🌈'
  },
  {
    id: 'wod-8',
    afrikaans: 'Hardloop',
    english: 'Run',
    pronunciationGuide: '[hart-loop]',
    partOfSpeech: 'Werkwoord (Verb)',
    category: 'Aksies',
    exampleAf: 'Die vinnige hond hardloop vrolik in die tuin.',
    exampleEn: 'The fast dog runs cheerfully in the garden.',
    funFact: 'Onthou: In die verlede tyd sê ons "het gehardloop"!',
    emoji: '🏃'
  },
  {
    id: 'wod-9',
    afrikaans: 'Lekkergoed',
    english: 'Sweets / Candy',
    pronunciationGuide: '[leh-ker-goot]',
    partOfSpeech: 'Selfstandige Naamwoord (Noun)',
    category: 'Kos & Lekkers',
    exampleAf: 'Ons eet lekkergoed by die verjaarsdagpartytjie.',
    exampleEn: 'We eat sweets at the birthday party.',
    funFact: '"Lekker" is seker die gewildste woord in heel Suid-Afrika!',
    emoji: '🍬'
  },
  {
    id: 'wod-10',
    afrikaans: 'Nuuskierig',
    english: 'Curious / Inquisitive',
    pronunciationGuide: '[nees-kee-ruch]',
    partOfSpeech: 'Byvoeglike Naamwoord (Adjective)',
    category: 'Gevoelens & Brein',
    exampleAf: 'Goeie leerders is nuuskierig en vra baie vrae.',
    exampleEn: 'Good learners are curious and ask lots of questions.',
    funFact: 'Dit beteken letterlik dat jy graag nuus wil hoor of weet!',
    emoji: '🧐'
  },
  {
    id: 'wod-11',
    afrikaans: 'Sonstraal',
    english: 'Sunbeam / Ray of sunshine',
    pronunciationGuide: '[son-strahl]',
    partOfSpeech: 'Selfstandige Naamwoord (Noun)',
    category: 'Natuur & Dag',
    exampleAf: '\'n Warm sonstraal skyn deur die klaskamervenster.',
    exampleEn: 'A warm sunbeam shines through the classroom window.',
    funFact: 'Jy is ook \'n sonstraal wanneer jy iemand help glimlag!',
    emoji: '☀️'
  },
  {
    id: 'wod-12',
    afrikaans: 'Plesierig',
    english: 'Enjoyable / Fun',
    pronunciationGuide: '[pluh-see-ruch]',
    partOfSpeech: 'Byvoeglike Naamwoord (Adjective)',
    category: 'Pret',
    exampleAf: 'Afrikaans leer is plesierig saam met Ollie!',
    exampleEn: 'Learning Afrikaans is enjoyable together with Ollie!',
    funFact: 'As iemand dankie sê, kan jy antwoord: "Groot plesier!"',
    emoji: '🎉'
  }
];

export function getWordOfTheDay(date: Date = new Date()): DailyWord {
  // Use day of the year so the word rotates daily for all users
  const startOfYear = new Date(date.getFullYear(), 0, 1);
  const dayOfYear = Math.floor((date.getTime() - startOfYear.getTime()) / (1000 * 60 * 60 * 24));
  const index = Math.abs(dayOfYear) % WORDS_OF_THE_DAY.length;
  return WORDS_OF_THE_DAY[index];
}
