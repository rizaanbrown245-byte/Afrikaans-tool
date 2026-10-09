export interface PrintableWorksheet {
  id: string;
  titleAf: string;
  titleEn: string;
  grade: string;
  capsStrand: string;
  instructionsEn: string;
  instructionsAf: string;
  questions: {
    number: number;
    questionText: string;
    linesCount: number;
    options?: string[];
    answerKey: string;
    explanation: string;
  }[];
}

export const WORKSHEETS_DATA: PrintableWorksheet[] = [
  {
    id: 'ws-stompi',
    titleAf: 'Werkkaart: Sinsbou en STOMPI-reël',
    titleEn: 'Worksheet: Sentence Construction & STOMPI Rule',
    grade: 'Graad 4 (Grade 4 FAL / HL)',
    capsStrand: 'Taalstrukture en -konvensies: Woordorde',
    instructionsEn: 'Rewrite each scrambled sentence into the correct Afrikaans word order according to the STOMPI rule (Subject - Verb 1 - Time - Object - Manner - Place - Verb 2).',
    instructionsAf: 'Herorganiseer die woorde om \'n korrekte Afrikaanse sin te bou volgens die STOMPI-reël.',
    questions: [
      {
        number: 1,
        questionText: '[elke dag] [Die kinders] [hardloop] [in die tuin]',
        linesCount: 2,
        answerKey: 'Die kinders hardloop elke dag in die tuin.',
        explanation: 'S (Die kinders) + V1 (hardloop) + T (elke dag) + P (in die tuin).'
      },
      {
        number: 2,
        questionText: '[skryf] [Sipho] [met \'n potlood] [vandag] [\'n storie]',
        linesCount: 2,
        answerKey: 'Sipho skryf vandag \'n storie met \'n potlood.',
        explanation: 'S (Sipho) + V1 (skryf) + T (vandag) + O (\'n storie) + M (met \'n potlood).'
      },
      {
        number: 3,
        questionText: '[eet] [Die kat] [melk] [nou] [by die deur]',
        linesCount: 2,
        answerKey: 'Die kat eet nou melk by die deur.',
        explanation: 'S (Die kat) + V1 (eet) + T (nou) + O (melk) + P (by die deur).'
      },
      {
        number: 4,
        questionText: '[Ons] [gaan] [môre] [skool toe]',
        linesCount: 2,
        answerKey: 'Ons gaan môre skool toe.',
        explanation: 'S (Ons) + V1 (gaan) + T (môre) + P (skool toe).'
      }
    ]
  },
  {
    id: 'ws-meervoude',
    titleAf: 'Werkkaart: Meervoude en Verkleinwoorde',
    titleEn: 'Worksheet: Plurals & Diminutives',
    grade: 'Graad 4 (Grade 4 FAL / HL)',
    capsStrand: 'Taalstrukture en -konvensies: Morfologie',
    instructionsEn: 'Complete the table by writing the plural (meervoud) and the diminutive (verkleinwoord) for each word.',
    instructionsAf: 'Voltooi die tabel deur die meervoud en verkleinwoord van elke woord neer te skryf.',
    questions: [
      {
        number: 1,
        questionText: 'hond (dog) -> Meervoud: ________ | Verkleinwoord: ________',
        linesCount: 2,
        answerKey: 'Meervoud: honde | Verkleinwoord: hondjie',
        explanation: 'hond + e = honde; hond + jie = hondjie'
      },
      {
        number: 2,
        questionText: 'kat (cat) -> Meervoud: ________ | Verkleinwoord: ________',
        linesCount: 2,
        answerKey: 'Meervoud: katte | Verkleinwoord: katjie',
        explanation: 'Kort klinker "a" verdubbel die t: katte; kat + jie = katjie'
      },
      {
        number: 3,
        questionText: 'boom (tree) -> Meervoud: ________ | Verkleinwoord: ________',
        linesCount: 2,
        answerKey: 'Meervoud: bome | Verkleinwoord: boompie',
        explanation: 'Lang klinker verloor een o: bome; woorde op m kry -pie: boompie'
      },
      {
        number: 4,
        questionText: 'vis (fish) -> Meervoud: ________ | Verkleinwoord: ________',
        linesCount: 2,
        answerKey: 'Meervoud: visse | Verkleinwoord: vissie',
        explanation: 'Kort klinker "i" verdubbel die s: visse; vis + ie = vissie'
      }
    ]
  },
  {
    id: 'ws-tye',
    titleAf: 'Werkkaart: Tye van die Werkwoord',
    titleEn: 'Worksheet: Tenses (Present, Past & Future)',
    grade: 'Graad 4 (Grade 4 FAL / HL)',
    capsStrand: 'Taalstrukture: Teenwoordige, Verlede en Toekomende Tyd',
    instructionsEn: 'Change each sentence into (a) Verlede tyd (Past: het ... ge-) and (b) Toekomende tyd (Future: sal ...).',
    instructionsAf: 'Skryf elke sin oor in die verlede tyd en die toekomende tyd.',
    questions: [
      {
        number: 1,
        questionText: 'Die seun speel sokker. (The boy plays soccer.)\na) Verlede tyd: ______________________\nb) Toekomende tyd: ______________________',
        linesCount: 3,
        answerKey: 'a) Die seun het sokker gespeel. | b) Die seun sal sokker speel.',
        explanation: 'Verlede tyd: het + gespeel. Toekomende tyd: sal + speel.'
      },
      {
        number: 2,
        questionText: 'Ma bak \'n koek. (Mom bakes a cake.)\na) Verlede tyd: ______________________\nb) Toekomende tyd: ______________________',
        linesCount: 3,
        answerKey: 'a) Ma het \'n koek gebak. | b) Ma sal \'n koek bak.',
        explanation: 'Verlede tyd: het + gebak. Toekomende tyd: sal + bak.'
      },
      {
        number: 3,
        questionText: 'Ons lees \'n storie. (We read a story.)\na) Verlede tyd: ______________________\nb) Toekomende tyd: ______________________',
        linesCount: 3,
        answerKey: 'a) Ons het \'n storie gelees. | b) Ons sal \'n storie lees.',
        explanation: 'Verlede tyd: het + gelees. Toekomende tyd: sal + lees.'
      }
    ]
  },
  {
    id: 'ws-ontkenning',
    titleAf: 'Werkkaart: Ontkenning (Nie...nie) en Vraagwoorde',
    titleEn: 'Worksheet: Negation & Question Words',
    grade: 'Graad 4 (Grade 4 FAL / HL)',
    capsStrand: 'Taalstrukture: Ontkennende vorm en Vraagwoorde',
    instructionsEn: 'Rewrite the sentences in the negative form using the double "nie...nie", then fill in the missing question words.',
    instructionsAf: 'Skryf die sinne in die ontkennende vorm (nie...nie) en vul die regte vraagwoorde in.',
    questions: [
      {
        number: 1,
        questionText: 'Verander na die ontkennende vorm: "Ek hou van melk."',
        linesCount: 2,
        answerKey: 'Ek hou nie van melk nie.',
        explanation: 'Plaas eerste "nie" na hou, en tweede "nie" heel aan die einde.'
      },
      {
        number: 2,
        questionText: 'Verander na die ontkennende vorm: "Die hond blaf vir die kat."',
        linesCount: 2,
        answerKey: 'Die hond blaf nie vir die kat nie.',
        explanation: 'blaf nie vir die kat nie.'
      },
      {
        number: 3,
        questionText: 'Kies die regte vraagwoord (Wie / Wat / Waar): "________ is jou juffrou?"',
        linesCount: 2,
        answerKey: 'Wie',
        explanation: 'Wie vra na \'n persoon (juffrou).'
      },
      {
        number: 4,
        questionText: 'Kies die regte vraagwoord (Wie / Wat / Waar): "________ lê my skooltas?"',
        linesCount: 2,
        answerKey: 'Waar',
        explanation: 'Waar vra na \'n plek.'
      }
    ]
  }
];
