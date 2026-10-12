export interface ExamQuestion {
  id: string;
  questionNumber: number;
  sectionId: 'A' | 'B' | 'C' | 'D' | 'E';
  sectionTitleAf: string;
  sectionTitleEn: string;
  capsStrand: string; // e.g. "Taalstrukture: STOMPI", "Morfologie: Meervoude"
  term: 1 | 2 | 3 | 4;
  type: 'multiple-choice' | 'fill-blank' | 'true-false' | 'sentence-order';
  marks: number;
  promptAf: string;
  promptEn: string;
  passage?: {
    title: string;
    textAf: string;
    textEn: string;
  };
  options?: string[];
  scrambledWords?: string[]; // for sentence ordering
  correctAnswer: string;
  explanationAf: string;
  explanationEn: string;
  capsConcept: string; // rule reminder
}

export interface ExamSection {
  id: 'A' | 'B' | 'C' | 'D' | 'E';
  titleAf: string;
  titleEn: string;
  descriptionAf: string;
  descriptionEn: string;
  icon: string;
  totalMarks: number;
  capsFocus: string;
}

export const EXAM_SECTIONS: ExamSection[] = [
  {
    id: 'A',
    titleAf: 'Afdeling A: Leesbegrip & Begrip',
    titleEn: 'Section A: Reading Comprehension',
    descriptionAf: 'Lees die kort Suid-Afrikaanse storie en beantwoord die vrae.',
    descriptionEn: 'Read the short South African story and answer comprehension questions.',
    icon: '📖',
    totalMarks: 10,
    capsFocus: 'CAPS Kwartaal 1-4 Begrip, Hoofgedagte en Woordeskat in konteks'
  },
  {
    id: 'B',
    titleAf: 'Afdeling B: STOMPI & Sinsbou',
    titleEn: 'Section B: STOMPI & Sentence Structure',
    descriptionAf: 'Pas die goue STOMPI-woordorde toe (Onderwerp, Werkwoord 1, Tyd, Voorwerp, Wyse, Plek, Werkwoord 2).',
    descriptionEn: 'Apply the golden STOMPI rule for Afrikaans word order.',
    icon: '🚂',
    totalMarks: 10,
    capsFocus: 'CAPS Kwartaal 2 & 4 Taalstrukture: Woordorde en Tye'
  },
  {
    id: 'C',
    titleAf: 'Afdeling C: Woordsoorte & Grammatika',
    titleEn: 'Section C: Parts of Speech & Grammar',
    descriptionAf: 'Toets jou kennis van selfstandige naamwoorde, werkwoorde, byvoeglike naamwoorde en voornaamwoorde.',
    descriptionEn: 'Nouns, verbs, adjectives, and pronouns across the curriculum.',
    icon: '🏷️',
    totalMarks: 10,
    capsFocus: 'CAPS Kwartaal 1-3 Taalstrukture: Woordsoorte en Funksies'
  },
  {
    id: 'D',
    titleAf: 'Afdeling D: Morfologie (Meervoude & Verkleinwoorde)',
    titleEn: 'Section D: Morphology (Plurals & Diminutives)',
    descriptionAf: 'Kort klinkers verdubbel, lang klinkers verloor een klinker, en verkleining met -ie, -jie, -pie, -kie.',
    descriptionEn: 'Plurals, diminutives, and spelling adjustments.',
    icon: '✨',
    totalMarks: 10,
    capsFocus: 'CAPS Kwartaal 3 Morfologie en Spelling'
  },
  {
    id: 'E',
    titleAf: 'Afdeling E: Tye, Ontkenning (Dubbele Nie) & Vraagwoorde',
    titleEn: 'Section E: Tenses, Negatives & Questions',
    descriptionAf: 'Teenwoordige tyd, Verlede tyd (het... ge-), Toekomende tyd (sal...), ontkenning met dubbele nie, en vraagwoorde.',
    descriptionEn: 'Present, past, and future tenses, double negative, and question words.',
    icon: '⏳',
    totalMarks: 10,
    capsFocus: 'CAPS Kwartaal 3 & 4 Tye, Vraagsinne en Ontkennende Vorm'
  }
];

export const COMPREHENSION_STORY = {
  title: 'Ollie en Jabu se Skoolprojek by die Krugerwildtuin',
  textAf: `Vandag is Vrydagoggend by Laerskool Protea. Jabu en sy vriendin Anika werk saam aan 'n groot Afrikaans-projek oor diere van Suid-Afrika.
Ollie die Wyse Uil sit op die boekrak in die klaskamer en hou hulle dop.

"Kyk na hierdie prentjie van 'n olifant," sê Jabu met 'n glimlag. "Die groot grys olifant drink elke oggend water by die rivier."
Anika knik haar kop. "Ja, en die vinnige jagluiperd slaap nou rustig onder die doringboom want dit is baie warm."

Meneer Van Wyk, hulle vriendelike onderwyser, stap na hulle tafel toe. "Mooi so, julle twee! Onthou om die STOMPI-reël te gebruik as julle die byskrifte skryf. Wie kan vir my sê wat die tydwoord in Jabu se sin is?"

"Dit is 'elke oggend'!" antwoord Anika vinnig.
Meneer Van Wyk gee vir hulle 'n goue ster. Jabu en Anika is baie trots op hulle werk. Toe die skoolklok lui, pak hulle hulle skooltasse en sê: "Totsiens Meneer, ons sien u Maandag!"`,
  textEn: `Today is Friday morning at Protea Primary School. Jabu and his friend Anika are working together on a big Afrikaans project about the animals of South Africa.
Ollie the Wise Owl sits on the bookshelf in the classroom and watches them.

"Look at this picture of an elephant," says Jabu with a smile. "The big grey elephant drinks water at the river every morning."
Anika nods her head. "Yes, and the fast cheetah is now sleeping peacefully under the thorn tree because it is very hot."

Mr Van Wyk, their friendly teacher, walks over to their table. "Well done, you two! Remember to use the STOMPI rule when you write your captions. Who can tell me what the time word in Jabu's sentence is?"

"It is 'every morning'!" answers Anika quickly.
Mr Van Wyk gives them a gold star. Jabu and Anika are very proud of their work. When the school bell rings, they pack their schoolbags and say: "Goodbye Sir, we will see you Monday!"`
};

export const REVISION_EXAM_QUESTIONS: ExamQuestion[] = [
  // ==========================================
  // SECTION A: LEESBEGRIP (10 MARKS)
  // ==========================================
  {
    id: 'rev-q1',
    questionNumber: 1,
    sectionId: 'A',
    sectionTitleAf: 'Afdeling A: Leesbegrip',
    sectionTitleEn: 'Section A: Reading Comprehension',
    capsStrand: 'Lees en Kyk: Feitelike besonderhede',
    term: 4,
    type: 'multiple-choice',
    marks: 2,
    promptAf: 'Op watter dag van die week speel die storie af?',
    promptEn: 'On which day of the week does the story take place?',
    options: ['Maandagoggend', 'Woensdagmiddag', 'Vrydagoggend', 'Saterdagoggend'],
    correctAnswer: 'Vrydagoggend',
    explanationAf: 'Die eerste sin sê duidelik: "Vandag is Vrydagoggend by Laerskool Protea."',
    explanationEn: 'The first sentence states clearly: "Vandag is Vrydagoggend by Laerskool Protea." (Friday morning).',
    capsConcept: 'Lees noukeurig vir tyd en plek besonderhede.'
  },
  {
    id: 'rev-q2',
    questionNumber: 2,
    sectionId: 'A',
    sectionTitleAf: 'Afdeling A: Leesbegrip',
    sectionTitleEn: 'Section A: Reading Comprehension',
    capsStrand: 'Lees en Kyk: Hoofkarakters en handeling',
    term: 4,
    type: 'multiple-choice',
    marks: 2,
    promptAf: 'Waaraan werk Jabu en Anika saam in die klaskamer?',
    promptEn: 'What are Jabu and Anika working on together in the classroom?',
    options: [
      '\'n Wiskunde-toets oor breuke',
      '\'n Afrikaans-projek oor Suid-Afrikaanse diere',
      'Hulle eet toebroodjies tydens pouse',
      'Hulle speel sokker op die sportveld'
    ],
    correctAnswer: '\'n Afrikaans-projek oor Suid-Afrikaanse diere',
    explanationAf: 'Die storie meld: "...werk saam aan \'n groot Afrikaans-projek oor diere van Suid-Afrika."',
    explanationEn: 'The story notes they are working on a big Afrikaans project about South African animals.',
    capsConcept: 'Identifiseer die hoofaktiwiteit van die karakters.'
  },
  {
    id: 'rev-q3',
    questionNumber: 3,
    sectionId: 'A',
    sectionTitleAf: 'Afdeling A: Leesbegrip',
    sectionTitleEn: 'Section A: Reading Comprehension',
    capsStrand: 'Taal in konteks: Woordeskat en Byvoeglike Naamwoorde',
    term: 1,
    type: 'multiple-choice',
    marks: 2,
    promptAf: 'Watter TWEE kleure word in die storie gebruik om die olifant en die ster te beskryf?',
    promptEn: 'Which two colours are used to describe the elephant and the star in the story?',
    options: ['grys en goue', 'blou en rooi', 'swart en geel', 'groen en pers'],
    correctAnswer: 'grys en goue',
    explanationAf: 'Die olifant is "grys" (grey) en Meneer Van Wyk gee \'n "goue ster" (gold star).',
    explanationEn: 'The text describes the elephant as "grys" (grey) and the star as "goue" (gold).',
    capsConcept: 'Kleure as beskrywende woorde (byvoeglike naamwoorde).'
  },
  {
    id: 'rev-q4',
    questionNumber: 4,
    sectionId: 'A',
    sectionTitleAf: 'Afdeling A: Leesbegrip',
    sectionTitleEn: 'Section A: Reading Comprehension',
    capsStrand: 'Begrip: Oorsaak en gevolg',
    term: 4,
    type: 'multiple-choice',
    marks: 2,
    promptAf: 'Waarom slaap die jagluiperd onder die doringboom?',
    promptEn: 'Why is the cheetah sleeping under the thorn tree?',
    options: [
      'Omdat hy baie honger is',
      'Omdat dit baie warm is',
      'Omdat hy bang is vir die olifant',
      'Omdat dit reën'
    ],
    correctAnswer: 'Omdat dit baie warm is',
    explanationAf: 'Anika sê: "...slaap nou rustig onder die doringboom want dit is baie warm."',
    explanationEn: 'The passage explains: "...under the thorn tree because it is very hot (warm)."',
    capsConcept: 'Begrip van verbindingswoorde soos "want" en "omdat".'
  },
  {
    id: 'rev-q5',
    questionNumber: 5,
    sectionId: 'A',
    sectionTitleAf: 'Afdeling A: Leesbegrip',
    sectionTitleEn: 'Section A: Reading Comprehension',
    capsStrand: 'Sosiale en formele taalgebruik: Groete',
    term: 1,
    type: 'multiple-choice',
    marks: 2,
    promptAf: 'Wat sê die kinders toe die skoolklok lui en hulle huistoe gaan?',
    promptEn: 'What do the children say when the school bell rings and they go home?',
    options: [
      '"Goeiemôre Meneer!"',
      '"Totsiens Meneer, ons sien u Maandag!"',
      '"Baie dankie vir die ontbyt."',
      '"Wat is jou naam?"'
    ],
    correctAnswer: '"Totsiens Meneer, ons sien u Maandag!"',
    explanationAf: '"Totsiens" is die beleefde manier om te groet wanneer jy weggaan.',
    explanationEn: '"Totsiens" means goodbye. They also use the polite pronoun "u" for their teacher!',
    capsConcept: 'Beleefde groetvorme aan die einde van die skooldag.'
  },

  // ==========================================
  // SECTION B: STOMPI & SINSBOU (10 MARKS)
  // ==========================================
  {
    id: 'rev-q6',
    questionNumber: 6,
    sectionId: 'B',
    sectionTitleAf: 'Afdeling B: STOMPI & Sinsbou',
    sectionTitleEn: 'Section B: STOMPI & Sentence Building',
    capsStrand: 'Taalstrukture: Die STOMPI-formule',
    term: 2,
    type: 'multiple-choice',
    marks: 2,
    promptAf: 'Wat staan die letter "T" voor in die Afrikaanse STOMPI-woordorde?',
    promptEn: 'What does the letter "T" stand for in the Afrikaans STOMPI word order?',
    options: ['Tyd (Time)', 'Tafel (Table)', 'Trekker (Tractor)', 'Toets (Test)'],
    correctAnswer: 'Tyd (Time)',
    explanationAf: 'STOMPI staan vir: Subjek (S), Werkwoord 1 (V1), Tyd (T), Voorwerp/Objek (O), Manier/Wyse (M), Plek (P), Werkwoord 2 (V2 / Infinitief).',
    explanationEn: 'In STOMPI: S = Subject, V1 = Verb 1, T = Time, O = Object, M = Manner, P = Place, V2 = Verb 2 / Infinitief.',
    capsConcept: 'Die goue reël vir sinsbou in Afrikaans.'
  },
  {
    id: 'rev-q7',
    questionNumber: 7,
    sectionId: 'B',
    sectionTitleAf: 'Afdeling B: STOMPI & Sinsbou',
    sectionTitleEn: 'Section B: STOMPI & Sentence Building',
    capsStrand: 'Taalstrukture: STOMPI Posisionering van Werkwoord 1',
    term: 2,
    type: 'multiple-choice',
    marks: 2,
    promptAf: 'Waar staan die eerste werkwoord (V1) altyd in \'n gewone Afrikaanse stelsin?',
    promptEn: 'Where does the first verb (V1) always stand in a standard Afrikaans declarative sentence?',
    options: [
      'Heel aan die einde van die sin',
      'In die tweede posisie (na die Onderwerp)',
      'Aan die begin van die sin',
      'Net voor die punt'
    ],
    correctAnswer: 'In die tweede posisie (na die Onderwerp)',
    explanationAf: 'In Afrikaans staan Werkwoord 1 ALTYD in die tweede posisie in \'n gewone sin (bv. Sipho [S] eet [V1] nou [T] \'n appel [O]).',
    explanationEn: 'Verb 1 (V1) is strictly in position 2 directly after the subject in a normal statement.',
    capsConcept: 'Posisionering van die hoofwerkwoord in stelsinne.'
  },
  {
    id: 'rev-q8',
    questionNumber: 8,
    sectionId: 'B',
    sectionTitleAf: 'Afdeling B: STOMPI & Sinsbou',
    sectionTitleEn: 'Section B: STOMPI & Sentence Building',
    capsStrand: 'Sinsbou: Rangskikking volgens STOMPI',
    term: 2,
    type: 'sentence-order',
    marks: 2,
    promptAf: 'Rangskik hierdie woorde in die regte STOMPI-volgorde:',
    promptEn: 'Arrange these words in the correct STOMPI order:',
    scrambledWords: ['[Die leerders]', '[hardloop]', '[elke pouse]', '[op die sportveld]'],
    options: [
      'Die leerders hardloop elke pouse op die sportveld.',
      'Elke pouse die leerders hardloop op die sportveld.',
      'Die leerders op die sportveld hardloop elke pouse.',
      'Hardloop die leerders elke pouse op die sportveld.'
    ],
    correctAnswer: 'Die leerders hardloop elke pouse op die sportveld.',
    explanationAf: 'S (Die leerders) + V1 (hardloop) + T (elke pouse) + P (op die sportveld).',
    explanationEn: 'Subject: Die leerders | Verb 1: hardloop | Time: elke pouse | Place: op die sportveld.',
    capsConcept: 'STOMPI: S + V1 + T + P.'
  },
  {
    id: 'rev-q9',
    questionNumber: 9,
    sectionId: 'B',
    sectionTitleAf: 'Afdeling B: STOMPI & Sinsbou',
    sectionTitleEn: 'Section B: STOMPI & Sentence Building',
    capsStrand: 'Sinsbou: Tyd voor Plek',
    term: 2,
    type: 'multiple-choice',
    marks: 2,
    promptAf: 'Watter sin volg die STOMPI-reël KORREK (Tyd kom VOOR Plek)?',
    promptEn: 'Which sentence follows the STOMPI rule CORRECTLY (Time comes BEFORE Place)?',
    options: [
      'Anika lees vanaand \'n boek in haar slaapkamer.',
      'Anika lees in haar slaapkamer vanaand \'n boek.',
      'Anika in haar slaapkamer lees vanaand \'n boek.',
      'Lees Anika vanaand \'n boek in haar slaapkamer.'
    ],
    correctAnswer: 'Anika lees vanaand \'n boek in haar slaapkamer.',
    explanationAf: 'Tyd (vanaand) moet VOOR Voorwerp (\'n boek) en Plek (in haar slaapkamer) staan.',
    explanationEn: 'In Afrikaans, Time ("vanaand") always precedes Object ("\'n boek") and Place ("in haar slaapkamer").',
    capsConcept: 'Tyd kom altyd voor Plek in Afrikaans (Time before Place).'
  },
  {
    id: 'rev-q10',
    questionNumber: 10,
    sectionId: 'B',
    sectionTitleAf: 'Afdeling B: STOMPI & Sinsbou',
    sectionTitleEn: 'Section B: STOMPI & Sentence Building',
    capsStrand: 'Sinsbou: Inversie wanneer sin met Tyd begin',
    term: 2,
    type: 'multiple-choice',
    marks: 2,
    promptAf: 'As die sin begin met die tydwoord "Gister", wat gebeur met die werkwoord?',
    promptEn: 'If the sentence begins with the time word "Gister", what happens to the verb?',
    options: [
      'Die werkwoord skuif dadelik na posisie 2 (bv. "Gister het...")',
      'Die werkwoord bly aan die einde van die sin',
      'Ons skrap die werkwoord heeltemal',
      'Die onderwerp moet voor die tydwoord staan'
    ],
    correctAnswer: 'Die werkwoord skuif dadelik na posisie 2 (bv. "Gister het...")',
    explanationAf: 'Wanneer \'n sin met Tyd begin, ruil die werkwoord en onderwerp plekke sodat V1 steeds in die tweede posisie bly (bv. Gister [T] het [V1] ons [S] gespeel).',
    explanationEn: 'Inversion rule: when starting with Time, the verb remains strictly in the second spot (e.g. Gister HET ons gespeel).',
    capsConcept: 'Inversie: T + V1 + S + O + M + P + V2.'
  },

  // ==========================================
  // SECTION C: WOORDSOORTE (10 MARKS)
  // ==========================================
  {
    id: 'rev-q11',
    questionNumber: 11,
    sectionId: 'C',
    sectionTitleAf: 'Afdeling C: Woordsoorte & Grammatika',
    sectionTitleEn: 'Section C: Parts of Speech & Grammar',
    capsStrand: 'Woordsoorte: Selfstandige Naamwoorde (Nouns)',
    term: 2,
    type: 'multiple-choice',
    marks: 2,
    promptAf: 'Wat is die selfstandige naamwoord (noun) in hierdie sin: "Die vinnige hond vang die bal."',
    promptEn: 'What are the common nouns in this sentence: "Die vinnige hond vang die bal."',
    options: [
      'hond en bal',
      'vinnige en vang',
      'die en die',
      'vang en vinnige'
    ],
    correctAnswer: 'hond en bal',
    explanationAf: '\'n Selfstandige naamwoord is \'n mens, dier, plek of ding (hond = dier, bal = ding). Jy kan "die" of "\'n" voor dit sit.',
    explanationEn: 'Nouns are naming words for people, animals, or objects (hond = dog, bal = ball).',
    capsConcept: 'Selfstandige naamwoorde kry lidwoorde ("die" of "\'n").'
  },
  {
    id: 'rev-q12',
    questionNumber: 12,
    sectionId: 'C',
    sectionTitleAf: 'Afdeling C: Woordsoorte & Grammatika',
    sectionTitleEn: 'Section C: Parts of Speech & Grammar',
    capsStrand: 'Woordsoorte: Werkwoorde (Verbs)',
    term: 2,
    type: 'multiple-choice',
    marks: 2,
    promptAf: 'Watter woord is die aksiewoord of werkwoord (verb) in: "Die kinders sing \'n mooi liedjie."',
    promptEn: 'Which word is the action word / verb in: "Die kinders sing \'n mooi liedjie."',
    options: ['sing', 'kinders', 'mooi', 'liedjie'],
    correctAnswer: 'sing',
    explanationAf: '\'n Werkwoord (verb) is \'n aksiewoord wat wys wat iemand doen ("sing").',
    explanationEn: '"sing" (singing) is the action verb showing what the children are doing.',
    capsConcept: 'Werkwoorde wys aksie of toestand.'
  },
  {
    id: 'rev-q13',
    questionNumber: 13,
    sectionId: 'C',
    sectionTitleAf: 'Afdeling C: Woordsoorte & Grammatika',
    sectionTitleEn: 'Section C: Parts of Speech & Grammar',
    capsStrand: 'Woordsoorte: Byvoeglike Naamwoorde (Adjectives)',
    term: 2,
    type: 'multiple-choice',
    marks: 2,
    promptAf: 'Watter woord is die byvoeglike naamwoord (adjective) wat die boom beskryf in: "Die hoë boom staan in die tuin."',
    promptEn: 'Which word is the adjective describing the tree in: "Die hoë boom staan in die tuin."',
    options: ['hoë', 'boom', 'staan', 'tuin'],
    correctAnswer: 'hoë',
    explanationAf: '\'n Byvoeglike naamwoord beskryf die selfstandige naamwoord ("hoë" beskryf die boom).',
    explanationEn: '"hoë" (tall/high) is the adjective describing the tree.',
    capsConcept: 'Byvoeglike naamwoorde vertel meer van \'n selfstandige naamwoord.'
  },
  {
    id: 'rev-q14',
    questionNumber: 14,
    sectionId: 'C',
    sectionTitleAf: 'Afdeling C: Woordsoorte & Grammatika',
    sectionTitleEn: 'Section C: Parts of Speech & Grammar',
    capsStrand: 'Woordsoorte: Voornaamwoorde (Pronouns)',
    term: 2,
    type: 'fill-blank',
    marks: 2,
    promptAf: 'Kies die regte voornaamwoord: "Sipho is siek, daarom bly ________ vandag by die huis."',
    promptEn: 'Choose the correct pronoun: "Sipho is sick, therefore ________ stays home today."',
    options: ['hy', 'sy', 'hulle', 'ons'],
    correctAnswer: 'hy',
    explanationAf: 'Sipho is \'n seun, so ons gebruik die persoonlike voornaamwoord "hy" (he).',
    explanationEn: 'Sipho is male, so we use "hy" (he). For a girl we would use "sy" (she).',
    capsConcept: 'Persoonlike voornaamwoorde vervang die naam van \'n persoon.'
  },
  {
    id: 'rev-q15',
    questionNumber: 15,
    sectionId: 'C',
    sectionTitleAf: 'Afdeling C: Woordsoorte & Grammatika',
    sectionTitleEn: 'Section C: Parts of Speech & Grammar',
    capsStrand: 'Woordsoorte: Voorsetsels (Prepositions)',
    term: 2,
    type: 'multiple-choice',
    marks: 2,
    promptAf: 'Watter voorsetsel (preposition) pas die beste: "Die boek lê ________ die tafel."',
    promptEn: 'Which preposition fits best: "Die boek lê ________ die tafel." (on the table)',
    options: ['op', 'met', 'sonder', 'want'],
    correctAnswer: 'op',
    explanationAf: '"op" beteken "on top of". "Die boek lê op die tafel."',
    explanationEn: '"op" is the preposition for "on". "met" = with, "sonder" = without.',
    capsConcept: 'Voorsetsels dui posisie of verhouding aan.'
  },

  // ==========================================
  // SECTION D: MORFOLOGIE (MEERVOUDE & VERKLEINWOORDE) (10 MARKS)
  // ==========================================
  {
    id: 'rev-q16',
    questionNumber: 16,
    sectionId: 'D',
    sectionTitleAf: 'Afdeling D: Morfologie',
    sectionTitleEn: 'Section D: Morphology',
    capsStrand: 'Morfologie: Meervoude met kort klinkers (Verdubbeling)',
    term: 3,
    type: 'multiple-choice',
    marks: 2,
    promptAf: 'Wat is die meervoud (plural) van die woord "kat"?',
    promptEn: 'What is the plural of the word "kat"?',
    options: ['katte', 'kate', 'kats', 'katters'],
    correctAnswer: 'katte',
    explanationAf: 'Kort klinker "a" kry \'n verdubbeling van die laaste konsonant: kat -> katte.',
    explanationEn: 'Short vowel rule: short "a" causes doubling of the consonant "t" to keep the vowel short (kat -> katte).',
    capsConcept: 'Kort klinker + e = verdubbel die konsonant (katte, visse, busse).'
  },
  {
    id: 'rev-q17',
    questionNumber: 17,
    sectionId: 'D',
    sectionTitleAf: 'Afdeling D: Morfologie',
    sectionTitleEn: 'Section D: Morphology',
    capsStrand: 'Morfologie: Meervoude met lang klinkers (Verloor een)',
    term: 3,
    type: 'multiple-choice',
    marks: 2,
    promptAf: 'Wat is die meervoud van "boom"?',
    promptEn: 'What is the plural of "boom" (tree)?',
    options: ['bome', 'boome', 'boomse', 'bompies'],
    correctAnswer: 'bome',
    explanationAf: 'Lang dubbelklinker "oo" verloor een "o" in die oop lettergreep: boom -> bome.',
    explanationEn: 'Twin vowel rule: "oo" drops one vowel in open syllable when adding -e (boom -> bome, oog -> oë, muur -> mure).',
    capsConcept: 'Lang dubbelklinker verloor een klinker (boom -> bome).'
  },
  {
    id: 'rev-q18',
    questionNumber: 18,
    sectionId: 'D',
    sectionTitleAf: 'Afdeling D: Morfologie',
    sectionTitleEn: 'Section D: Morphology',
    capsStrand: 'Morfologie: Meervoude wat eindig op -s',
    term: 3,
    type: 'multiple-choice',
    marks: 2,
    promptAf: 'Watter woord kry \'n "-s" in die meervoud (pleks van \'-e\')?',
    promptEn: 'Which word takes an "-s" in the plural (instead of \'-e\')?',
    options: ['tafel (tafels)', 'hond (honde)', 'vis (visse)', 'deur (deure)'],
    correctAnswer: 'tafel (tafels)',
    explanationAf: 'Woorde wat eindig op -el, -er, -em kry meestal \'n -s in die meervoud (tafel -> tafels, lemoen -> lemoene, broer -> broers).',
    explanationEn: 'Words ending in -el, -er often take "-s" in the plural (tafel -> tafels, seun -> seuns).',
    capsConcept: 'Meervoude op -s (tafels, vaders, susters).'
  },
  {
    id: 'rev-q19',
    questionNumber: 19,
    sectionId: 'D',
    sectionTitleAf: 'Afdeling D: Morfologie',
    sectionTitleEn: 'Section D: Morphology',
    capsStrand: 'Morfologie: Verkleinwoorde met -tjie of -jie',
    term: 3,
    type: 'multiple-choice',
    marks: 2,
    promptAf: 'Wat is die verkleinwoord (diminutive) van "hond"?',
    promptEn: 'What is the diminutive of "hond" (small dog)?',
    options: ['hondjie', 'hondtjie', 'hondpie', 'hondie'],
    correctAnswer: 'hondjie',
    explanationAf: 'Woorde wat op d of t eindig, kry net "-jie": hond -> hondjie, kat -> katjie.',
    explanationEn: 'Words ending on "d" or "t" take "-jie": hond -> hondjie, kat -> katjie.',
    capsConcept: 'Woorde op d/t kry -jie.'
  },
  {
    id: 'rev-q20',
    questionNumber: 20,
    sectionId: 'D',
    sectionTitleAf: 'Afdeling D: Morfologie',
    sectionTitleEn: 'Section D: Morphology',
    capsStrand: 'Morfologie: Verkleinwoorde met -pie (woorde op -m)',
    term: 3,
    type: 'multiple-choice',
    marks: 2,
    promptAf: 'Wat is die verkleinwoord van "boom"?',
    promptEn: 'What is the diminutive of "boom"?',
    options: ['boompie', 'boomtjie', 'boomie', 'boompje'],
    correctAnswer: 'boompie',
    explanationAf: 'Woorde wat eindig op "m" voorafgegaan deur \'n lang klinker kry "-pie": boom -> boompie, arm -> armpie.',
    explanationEn: 'Words ending on "m" preceded by a long vowel take "-pie": boom -> boompie.',
    capsConcept: 'Woorde op -m kry -pie (boompie, droompie).'
  },

  // ==========================================
  // SECTION E: TYE, DUBBELE NIE & VRAAGWOORDE (10 MARKS)
  // ==========================================
  {
    id: 'rev-q21',
    questionNumber: 21,
    sectionId: 'E',
    sectionTitleAf: 'Afdeling E: Tye, Ontkenning & Vraagwoorde',
    sectionTitleEn: 'Section E: Tenses, Negatives & Questions',
    capsStrand: 'Tye: Verlede Tyd (Past Tense met het ... ge-)',
    term: 3,
    type: 'multiple-choice',
    marks: 2,
    promptAf: 'Verander die sin na die VERLEDE TYD: "Die seun skop die bal."',
    promptEn: 'Change the sentence to the PAST TENSE: "Die seun skop die bal."',
    options: [
      'Die seun het die bal geskop.',
      'Die seun sal die bal skop.',
      'Die seun skop gister die bal.',
      'Die seun was die bal skop.'
    ],
    correctAnswer: 'Die seun het die bal geskop.',
    explanationAf: 'In die Verlede Tyd verander die werkwoord na "het" in posisie 2, en "ge-" + werkwoord aan die einde van die sin (het ... geskop).',
    explanationEn: 'Past Tense rule: Verb 1 becomes "het", and the main verb gets "ge-" and moves to the end of the sentence.',
    capsConcept: 'Verlede Tyd: Subjek + HET + res + GE-[werkwoord].'
  },
  {
    id: 'rev-q22',
    questionNumber: 22,
    sectionId: 'E',
    sectionTitleAf: 'Afdeling E: Tye, Ontkenning & Vraagwoorde',
    sectionTitleEn: 'Section E: Tenses, Negatives & Questions',
    capsStrand: 'Tye: Toekomende Tyd (Future Tense met sal ...)',
    term: 3,
    type: 'multiple-choice',
    marks: 2,
    promptAf: 'Verander die sin na die TOEKOMENDE TYD: "Ons lees \'n boek."',
    promptEn: 'Change the sentence to the FUTURE TENSE: "Ons lees \'n boek."',
    options: [
      'Ons sal \'n boek lees.',
      'Ons het \'n boek gelees.',
      'Ons gaan \'n boek gelees.',
      'Ons sal \'n boek gelees.'
    ],
    correctAnswer: 'Ons sal \'n boek lees.',
    explanationAf: 'In die Toekomende Tyd gebruik ons "sal" in posisie 2 en die onveranderde werkwoord "lees" aan die einde.',
    explanationEn: 'Future Tense rule: "sal" goes in position 2, and the original infinitive verb moves to the end without "ge-".',
    capsConcept: 'Toekomende Tyd: Subjek + SAL + res + [werkwoord].'
  },
  {
    id: 'rev-q23',
    questionNumber: 23,
    sectionId: 'E',
    sectionTitleAf: 'Afdeling E: Tye, Ontkenning & Vraagwoorde',
    sectionTitleEn: 'Section E: Tenses, Negatives & Questions',
    capsStrand: 'Ontkenning: Die Dubbele Nie (Double Negative)',
    term: 3,
    type: 'multiple-choice',
    marks: 2,
    promptAf: 'Maak die sin ontkennend (negatief): "Ek hou van spinasie."',
    promptEn: 'Make the sentence negative: "Ek hou van spinasie."',
    options: [
      'Ek hou nie van spinasie nie.',
      'Ek nie hou van spinasie.',
      'Ek hou geen van spinasie nie.',
      'Ek hou van nie spinasie.'
    ],
    correctAnswer: 'Ek hou nie van spinasie nie.',
    explanationAf: 'In Afrikaans gebruik ons die Dubbele Nie: die eerste "nie" kom na die eerste werkwoord/onderwerp, en die tweede "nie" kom aan die heel einde van die sin.',
    explanationEn: 'Afrikaans always uses a double negative: "nie ... nie". The second "nie" must be placed at the end of the sentence.',
    capsConcept: 'Die Dubbele Nie: ... nie ... nie.'
  },
  {
    id: 'rev-q24',
    questionNumber: 24,
    sectionId: 'E',
    sectionTitleAf: 'Afdeling E: Tye, Ontkenning & Vraagwoorde',
    sectionTitleEn: 'Section E: Tenses, Negatives & Questions',
    capsStrand: 'Ontkenning: Verandering van woorde (iets -> niks ... nie)',
    term: 3,
    type: 'multiple-choice',
    marks: 2,
    promptAf: 'Wat word van die woord "iemand" in die ontkennende vorm?',
    promptEn: 'What does the word "iemand" (someone) become in the negative form?',
    options: [
      'niemand ... nie',
      'niks ... nie',
      'nêrens ... nie',
      'nooit ... nie'
    ],
    correctAnswer: 'niemand ... nie',
    explanationAf: 'iemand (someone) -> niemand ... nie (no one). iets (something) -> niks ... nie. êrens -> nêrens ... nie.',
    explanationEn: '"iemand" becomes "niemand ... nie". (Note: still requires the second "nie" at the end of the clause!)',
    capsConcept: 'Ontkennende woorde: iemand -> niemand ... nie.'
  },
  {
    id: 'rev-q25',
    questionNumber: 25,
    sectionId: 'E',
    sectionTitleAf: 'Afdeling E: Tye, Ontkenning & Vraagwoorde',
    sectionTitleEn: 'Section E: Tenses, Negatives & Questions',
    capsStrand: 'Vraagwoorde (Question Words)',
    term: 1,
    type: 'fill-blank',
    marks: 2,
    promptAf: 'Kies die regte vraagwoord: "________ is jou gunsteling onderwyser?" (Who)',
    promptEn: 'Choose the correct question word: "________ is your favourite teacher?" (Who)',
    options: ['Wie', 'Waar', 'Wat', 'Hoekom'],
    correctAnswer: 'Wie',
    explanationAf: '"Wie" beteken "Who". "Waar" = Where, "Wat" = What, "Hoekom" = Why.',
    explanationEn: '"Wie" translates to "Who" when asking about people.',
    capsConcept: 'Vraagwoorde: Wie (Who), Waar (Where), Wat (What), Wanneer (When).'
  }
];

export const TOTAL_EXAM_MARKS = REVISION_EXAM_QUESTIONS.reduce((sum, q) => sum + q.marks, 0); // 50 marks
