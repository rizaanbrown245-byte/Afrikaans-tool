export interface TopicOllieHelp {
  topicId: string;
  topicTitleAf: string;
  topicTitleEn: string;
  goldenRuleAf: string;
  goldenRuleEn: string;
  stuckTips: {
    tipAf: string;
    tipEn: string;
    mnemonic?: string;
    exampleAf?: string;
    exampleEn?: string;
  }[];
}

export interface GeneralScreenHelp {
  screenId: string;
  titleAf: string;
  titleEn: string;
  mainAdviceAf: string;
  mainAdviceEn: string;
  tips: {
    tipAf: string;
    tipEn: string;
  }[];
}

export interface EncouragementItem {
  id: string;
  messageAf: string;
  messageEn: string;
  badgeEmoji: string;
  mood: 'cheerful' | 'proud' | 'calm' | 'superhero';
}

export const OLLIE_ENCOURAGEMENTS: EncouragementItem[] = [
  {
    id: 'enc-1',
    messageAf: 'Toemaar! Selfs die wysste uile moes eers leer vlieg voor hulle kon sweef! Foute help jou brein groei.',
    messageEn: "Don't worry! Even the wisest owls had to practice flapping before they could soar! Mistakes help your brain grow.",
    badgeEmoji: '🦉',
    mood: 'calm'
  },
  {
    id: 'enc-2',
    messageAf: 'Haal diep asem, rol jou skouers, en probeer weer. Jy is baie slimmer as wat jy dink!',
    messageEn: 'Take a deep breath, roll your shoulders, and try again. You are so much smarter than you think!',
    badgeEmoji: '🌟',
    mood: 'calm'
  },
  {
    id: 'enc-3',
    messageAf: 'Onthou die goue geheim: Oefening baart kuns! Elke sin wat jy oefen, maak jou brein sterker.',
    messageEn: 'Remember the golden rule: Practice makes perfect! Every sentence you try makes your brain stronger.',
    badgeEmoji: '💪',
    mood: 'cheerful'
  },
  {
    id: 'enc-4',
    messageAf: "Jy is 'n ware Afrikaans-avonturier! Kyk net hoeveel woorde jy al bemeester het. Ek is trots op jou!",
    messageEn: "You are a true Afrikaans adventurer! Look how many words you've already conquered. I am so proud of you!",
    badgeEmoji: '🏆',
    mood: 'proud'
  },
  {
    id: 'enc-5',
    messageAf: "Moenie haastig wees nie. Lees die sin stadig deur soos 'n speurder wat leidrade soek.",
    messageEn: "No need to rush! Read the sentence slowly like a clever detective hunting for clues.",
    badgeEmoji: '🔍',
    mood: 'calm'
  },
  {
    id: 'enc-6',
    messageAf: 'Hoo-hoo! Jy kan dit doen! Sit jou denkpet op en glo in jouself!',
    messageEn: 'Hoo-hoo! You can do this! Put on your thinking cap and believe in yourself!',
    badgeEmoji: '🎓',
    mood: 'superhero'
  },
  {
    id: 'enc-7',
    messageAf: "As 'n vraag moeilik lyk, breek dit in twee kleiner stukkies op. Jy het hierdie!",
    messageEn: 'If a question looks tough, break it into two smaller pieces. You totally got this!',
    badgeEmoji: '🧩',
    mood: 'cheerful'
  },
  {
    id: 'enc-8',
    messageAf: "Wonderlike werk dat jy aanhou probeer! Dapper leerders wat nooit opgee nie, word die beste lesers.",
    messageEn: 'Awesome job keeping at it! Brave learners who never give up become the best readers and writers.',
    badgeEmoji: '🦁',
    mood: 'superhero'
  }
];

export const TOPIC_OLLIE_HELP_DATA: Record<string, TopicOllieHelp> = {
  'topic-1-greetings': {
    topicId: 'topic-1-greetings',
    topicTitleAf: 'Groete en Bekendstelling',
    topicTitleEn: 'Greetings & Introductions',
    goldenRuleAf: "Gebruik 'Goeiemôre' tot 12:00, 'Goeiemiddag' na 12:00, en sê altyd 'asseblief' en 'dankie'!",
    goldenRuleEn: "Use 'Goeiemôre' before 12:00, 'Goeiemiddag' after 12:00, and always say 'asseblief' and 'dankie'!",
    stuckTips: [
      {
        tipAf: "Onthou: 'Môre' beteken oggend! Dus is 'Goeiemôre' vir die oggend voor pouse.",
        tipEn: "Remember: 'Môre' means morning, so 'Goeiemôre' is for the morning before break.",
        mnemonic: 'Môre = Oggend ☀️',
        exampleAf: 'Goeiemôre, Juffrou! (Good morning, Teacher!)'
      },
      {
        tipAf: "Om jouself voor te stel: Begin met 'My naam is...' of 'Ek is...'.",
        tipEn: "To introduce yourself: Start with 'My naam is...' or 'Ek is...'.",
        exampleAf: 'My naam is Pieter en ek is nege jaar oud.'
      },
      {
        tipAf: "'Totsiens' beteken dat ons mekaar weer gaan sien! ('Tot ons mekaar weer sien').",
        tipEn: "'Totsiens' literally means 'until we see each other again' (goodbye).",
        mnemonic: 'Tot-sien-ons-weer = Totsiens 👋'
      }
    ]
  },
  'topic-2-numbers-days-months': {
    topicId: 'topic-2-numbers-days-months',
    topicTitleAf: 'Getalle, Dae en Maande',
    topicTitleEn: 'Numbers, Days & Months',
    goldenRuleAf: "In Afrikaans sê ons die ene eers, dan 'en', dan die tiene: 'drie-en-twintig' (23).",
    goldenRuleEn: "In Afrikaans numbers, say units first, then 'en', then tens: 'drie-en-twintig' (23).",
    stuckTips: [
      {
        tipAf: "Dae van die week kry 'n hoofletter en eindig altyd op '-dag'.",
        tipEn: "Days of the week are capitalised and always end with '-dag'.",
        mnemonic: 'Maandag, Dinsdag, Woensdag, Donderdag, Vrydag, Saterdag, Sondag 📅',
        exampleAf: 'Vandag is Woensdag. (Today is Wednesday.)'
      },
      {
        tipAf: "Vir getalle: 14 is 'veertien', maar 40 is 'veertig'. Onthou: '-tien' = 10-reeks, '-tig' = 10-talle!",
        tipEn: "For numbers: '-tien' is teens (14 = veertien), while '-tig' is tens (40 = veertig).",
        mnemonic: '-tien = tiener (13-19) | -tig = groot getal (20, 30, 40...)'
      },
      {
        tipAf: "Die maande van die jaar begin met Januarie en eindig met Desember. Altyd met 'n hoofletter!",
        tipEn: "Months of the year always start with a capital letter in Afrikaans too.",
        exampleAf: 'My verjaarsdag is in Julie. (My birthday is in July.)'
      }
    ]
  },
  'topic-3-colours-and-shapes': {
    topicId: 'topic-3-colours-and-shapes',
    topicTitleAf: 'Kleure en Vorms',
    topicTitleEn: 'Colours & Shapes',
    goldenRuleAf: "Wanneer 'n kleur voor 'n naamwoord staan, kry sommige 'n '-e' (blou bly blou, maar geel word 'geel' of 'geel lint', rooi bly rooi).",
    goldenRuleEn: "Colours describe things. Match the colour with objects you know in South Africa!",
    stuckTips: [
      {
        tipAf: "Suid-Afrikaanse vlag kleure: rooi (bo), blou (onder), groen (die Y), geel/goud, swart en wit!",
        tipEn: "South African flag colours: rooi, blou, groen, geel, swart en wit!",
        mnemonic: 'Rooi bo soos die son, blou onder soos die see 🇿🇦'
      },
      {
        tipAf: "Vorms: Sirkel (rond soos 'n bal), Vierkant (4 gelyke sye), Reghoek (2 lang en 2 kort sye), Driehoek (3 hoeke!).",
        tipEn: "Shapes: Sirkel (round), Vierkant (square), Reghoek (rectangle), Driehoek (3 corners = triangle).",
        mnemonic: 'Drie hoeke = Driehoek 📐'
      }
    ]
  },
  'topic-4-family-and-friends': {
    topicId: 'topic-4-family-and-friends',
    topicTitleAf: 'Familie en Vriende',
    topicTitleEn: 'Family & Friends',
    goldenRuleAf: "Onthou: 'Oupa' en 'Ouma' vir grootouers; 'Oom' en 'Tannie' vir oom en tante of volwassenes.",
    goldenRuleEn: "Family words: 'Pa/Vader', 'Ma/Moeder', 'Boetie/Broer', 'Sussie/Suster', 'Oupa' and 'Ouma'.",
    stuckTips: [
      {
        tipAf: "'Boetie' is 'n klein broer, en 'sussie' is 'n klein suster.",
        tipEn: "'Boetie' is a younger brother, and 'sussie' is a younger sister.",
        exampleAf: 'My boetie speel met sy karretjie.'
      },
      {
        tipAf: "In Suid-Afrika noem ons ouer mense hoflik 'Oom' en 'Tannie'.",
        tipEn: "In South Africa, it's polite to address adult family friends as 'Oom' and 'Tannie'.",
        mnemonic: 'Oom = Uncle | Tannie = Auntie'
      }
    ]
  },
  'topic-5-animals': {
    topicId: 'topic-5-animals',
    topicTitleAf: 'Diere en Hul Geluide',
    topicTitleEn: 'Animals & Their Sounds',
    goldenRuleAf: "Diere het spesifieke name vir mannetjie, wyfie en kleintjie, en elkeen maak 'n eie geluid!",
    goldenRuleEn: "Animals have male, female and baby names, plus unique sound verbs (hond blaf, kat miaau, leeu brul).",
    stuckTips: [
      {
        tipAf: "Die hond blaf, die kat miaau, die leeu brul, die koei bulk, en die perd runnik!",
        tipEn: "Dog barks (blaf), cat meows (miaau), lion roars (brul), cow moos (bulk), horse neighs (runnik).",
        mnemonic: 'Leeu = Brul 🦁 | Perd = Runnik 🐴 | Haan = Kraai 🐓'
      },
      {
        tipAf: "Kleintjies: Hond -> hondjie / werpsel, Kat -> katjie, Perd -> vulletjie, Skaap -> lammetjie, Leeu -> welpie.",
        tipEn: "Baby animals: hondjie (puppy), katjie (kitten), vulletjie (foal), lammetjie (lamb), welpie (cub)."
      }
    ]
  },
  'topic-6-food-and-drinks': {
    topicId: 'topic-6-food-and-drinks',
    topicTitleAf: 'Kos en Etes',
    topicTitleEn: 'Food & Meals',
    goldenRuleAf: "Ontbyt is in die oggend, middagete is om 12:00-13:00, en aandete is saans saam met die gesin.",
    goldenRuleEn: "Three meals: Ontbyt (breakfast), Middagete (lunch), Aandete (dinner).",
    stuckTips: [
      {
        tipAf: "Dink aan 'Ontbyt' as die byt wat die dag oopbreek (breakfast).",
        tipEn: "Remember: 'Ontbyt' is breakfast, 'Aandete' is evening dinner.",
        mnemonic: 'Oggend = Ontbyt 🥞 | Aand = Aandete 🍲'
      },
      {
        tipAf: "Ek is honger (I am hungry) -> Ek wil EET (I want to eat). Ek is dors (thirsty) -> Ek wil DRINK.",
        tipEn: "Honger = hungry (eet). Dors = thirsty (drink).",
        exampleAf: 'Ek is baie dors, mag ek asseblief water drink?'
      }
    ]
  },
  'topic-7-school-and-classroom': {
    topicId: 'topic-7-school-and-classroom',
    topicTitleAf: 'Skool en Klaskamer',
    topicTitleEn: 'School & Classroom',
    goldenRuleAf: "Woorde in die klaskamer: potlood (pencil), pen, liniaal (ruler), uitveër (eraser), skooltas (school bag).",
    goldenRuleEn: "Classroom stationery: potlood, liniaal, uitveër, skêr (scissors), gom (glue).",
    stuckTips: [
      {
        tipAf: "'Uitveër' vee jou foute uit! 'Skerpmaker' maak jou potlood skerp.",
        tipEn: "'Uitveër' wipes errors out (eraser); 'skerpmaker' sharpens pencils.",
        mnemonic: 'Vee uit = Uitveër 🧼 | Maak skerp = Skerpmaker ✏️'
      },
      {
        tipAf: "'Onderwyser' is 'n manlike meneer, 'Onderwyseres' of 'Juffrou' is 'n vroulike onderwyser.",
        tipEn: "'Onderwyseres / Juffrou' is female teacher, 'Meneer' is male teacher."
      }
    ]
  },
  'topic-8-sentence-building-stompi': {
    topicId: 'topic-8-sentence-building-stompi',
    topicTitleAf: 'Sinsbou: Die STOMPI-Trein',
    topicTitleEn: 'Sentence Building: STOMPI',
    goldenRuleAf: "S - Subjek (Wie?), V1 - Werkwoord 1 (Doen wat?), T - Tyd (Wanneer?), O - Objek (Wat?), M - Manier (Hoe?), P - Plek (Waar?), V2 - Werkwoord 2 (Aan die einde!).",
    goldenRuleEn: "Subject, Verb 1, Time, Object, Manner, Place, Verb 2. V1 is ALWAYS in position 2, and Time comes BEFORE Place!",
    stuckTips: [
      {
        tipAf: "DIE GROOTSTE REËL: Werkwoord 1 (V1) MOET ALTYD in die tweede plek staan!",
        tipEn: "THE BIGGEST RULE: Verb 1 (V1) must ALWAYS be the second element in the sentence!",
        mnemonic: 'V1 staan altyd nommer 2 op die spoor! 🚂',
        exampleAf: 'Sipho (S) speel (V1) vandag (T) sokker (O) vinnig (M) by die skool (P).'
      },
      {
        tipAf: "Tyd kom altyd VOOR Plek! Onthou: T kom voor P in STOMPI.",
        tipEn: "Time comes BEFORE Place! T before P in STOMPI.",
        mnemonic: 'Horlosie (Tyd) ry voor die Huis (Plek) ⏰ ➔ 🏠'
      },
      {
        tipAf: "As daar twee werkwoorde is (bv. 'wil speel' of 'het gesien'), gaan die tweede een (V2) heel na die EINDE!",
        tipEn: "If there are two verbs (e.g. 'wil speel' or 'het gespeel'), the second verb jumps to the VERY END of the sentence!",
        exampleAf: "Ek [S] wil [V1] vandag [T] 'n appel [O] eet [V2]."
      }
    ]
  },
  'topic-9-nouns-verbs-adjectives': {
    topicId: 'topic-9-nouns-verbs-adjectives',
    topicTitleAf: 'Woordsoorte: Naamwoorde, Werkwoorde & Byvoeglike Naamwoorde',
    topicTitleEn: 'Parts of Speech: Nouns, Verbs, Adjectives',
    goldenRuleAf: "Selfstandige naamwoord = ding wat jy kan sien/raak. Werkwoord = aksie wat jy kan doen. Byvoeglike naamwoord = beskryf die ding!",
    goldenRuleEn: "Noun = person/place/thing. Verb = action word. Adjective = describing word (colours, sizes, feelings).",
    stuckTips: [
      {
        tipAf: "WERKWOORD TOETS: Kan jy dit DOEN? Kan jy spring? Ja! Kan jy tafel? Nee! Dus is spring 'n werkwoord.",
        tipEn: "VERB TEST: Can you DO it? Can you run? Yes! Can you chair? No! So run is a verb.",
        mnemonic: 'Werkwoord = Werk en doen! 🏃‍♂️'
      },
      {
        tipAf: "BYVOEGLIKE NAAMWOORD TOETS: Vra 'Watter soort?' of 'Hoe lyk dit?' (bv. die GROOT, ROOI bal).",
        tipEn: "ADJECTIVE TEST: Ask 'What kind?' or 'What does it look like?' (e.g. the BIG, RED ball).",
        exampleAf: 'Die oulike (b.nw) hondjie hardloop (ww) vinnig na die bal (s.nw).'
      },
      {
        tipAf: "Eiename kry ALTYD 'n hoofletter (bv. Kaapstad, Sipho, Tafelberg).",
        tipEn: "Proper nouns always get a capital letter (cities, names, mountains)."
      }
    ]
  },
  'topic-10-plurals-and-diminutives': {
    topicId: 'topic-10-plurals-and-diminutives',
    topicTitleAf: 'Meervoude en Verkleinwoorde',
    topicTitleEn: 'Plurals & Diminutives',
    goldenRuleAf: "Kort klinker = verdubbel die konsonant (kat -> katte). Lang klinker = verloor een klinker (boom -> bome). -f word -we (duif -> duiwe).",
    goldenRuleEn: "Short vowel: double consonant + e (kat -> katte). Twin vowel: drop one + e (boom -> bome). -f becomes -we (stoof -> stowe).",
    stuckTips: [
      {
        tipAf: "KORT KLINKER REËL: As die klinker kort klink (a, e, i, o, u), verdubbel die laaste letter en sit 'e' by!",
        tipEn: "SHORT VOWEL RULE: Short vowel (kat, bus, pen) -> double consonant + e (katte, busse, penne).",
        mnemonic: 'Kort klinker = Dubbel konsonant! 🐱 -> 🐱🐱 (katte)'
      },
      {
        tipAf: "LANG / TWEELING KLINKER REËL: As daar twee van dieselfde klinkers is (aa, ee, oo, uu), val een weg!",
        tipEn: "TWIN VOWEL RULE: Drop one letter when adding 'e' (boom -> bome, been -> bene, muur -> mure).",
        mnemonic: 'Tweeling skrik vir die -e en een hardloop weg! 🌳 (boom -> bome)'
      },
      {
        tipAf: "VERKLEINWOORDE: Eindig dit op -t of -d? Sit net '-jie' by! (hond -> hondjie, kat -> katjie).",
        tipEn: "DIMINUTIVES: Words ending on -t or -d just take '-jie' (hond -> hondjie, kat -> katjie, perd -> perdjie).",
        mnemonic: 'd of t kry net -jie! 🐶'
      },
      {
        tipAf: "Eindig dit op -m? Sit '-pie' by! (boom -> boompie, arm -> armpie).",
        tipEn: "Words ending on -m take '-pie' (boom -> boompie, besem -> besempie).",
        mnemonic: 'Mmmm lekker pie! -m kry -pie! 🥧'
      }
    ]
  },
  'topic-11-tenses': {
    topicId: 'topic-11-tenses',
    topicTitleAf: 'Tye van die Werkwoord (Teenwoordig, Verlede & Toekomende)',
    topicTitleEn: 'Tenses (Present, Past & Future)',
    goldenRuleAf: "Verlede tyd: V1 word 'het', hoofwerkwoord gaan na die einde met 'ge-'. Toekomende tyd: V1 word 'sal', hoofwerkwoord na einde SONDER 'ge-'.",
    goldenRuleEn: "Past: replace V1 with 'het', move main verb to end with 'ge-'. Future: replace V1 with 'sal', move verb to end without 'ge-'.",
    stuckTips: [
      {
        tipAf: "VERLEDE TYD STAPPE: 1) Soek V1. 2) Vervang dit met 'het'. 3) Vat daardie werkwoord na die heel einde en sit 'ge-' voor hom!",
        tipEn: "PAST TENSE 3 STEPS: 1) Find V1. 2) Replace with 'het'. 3) Kick main verb to the end with 'ge-'!",
        mnemonic: 'Verlede tyd = HET + GE- aan die einde! ⏪',
        exampleAf: "Ek eet 'n appel. ➔ Ek HET 'n appel GE-eet."
      },
      {
        tipAf: "TOEKOMENDE TYD: Geen 'ge-' nie! Net 'sal' in posisie 2, en die werkwoord aan die einde.",
        tipEn: "FUTURE TENSE: Never use 'ge-'! Just 'sal' at V1 and verb at the end.",
        mnemonic: 'Toekoms = SAL ... doen (geen ge-!) ⏩',
        exampleAf: "Ek eet 'n appel. ➔ Ek SAL 'n appel eet."
      },
      {
        tipAf: "Uitsondering: Werkwoorde wat reeds begin met be-, ge-, her-, er-, ont-, ver- kry NOOIT nog 'n 'ge-' nie!",
        tipEn: "Never add 'ge-' to verbs starting with be-, ge-, her-, er-, ont-, ver- (e.g. betaal -> het betaal).",
        mnemonic: 'Onthou: Be-Ge-Her-Er-Ont-Ver kry geen ekstra ge- meer!'
      }
    ]
  },
  'topic-12-negatives-and-questions': {
    topicId: 'topic-12-negatives-and-questions',
    topicTitleAf: 'Ontkennende Vorm en Vraagsinne',
    topicTitleEn: 'Negatives (Ontkenning) & Questions',
    goldenRuleAf: "Die goue dubbele 'nie': Sit die eerste 'nie' na die werkwoord, en die tweede 'nie' aan die heel einde van die sin!",
    goldenRuleEn: "Afrikaans DOUBLE NEGATIVE: First 'nie' after the verb, second 'nie' at the very end of the sentence!",
    stuckTips: [
      {
        tipAf: "DUBBELE NIE: 'Ek speel sokker.' ➔ 'Ek speel NIE sokker NIE.' Altyd twee keer 'nie'!",
        tipEn: "DOUBLE NIE: Always bracket the rest of the sentence with two 'nie's!",
        mnemonic: 'Nie nommer 1 na die werkwoord, Nie nommer 2 sluit die hek aan die einde! 🚫'
      },
      {
        tipAf: "Spesiale woorde verander in die ontkenning: 'iets' word 'niks ... nie', 'iemand' word 'niemand ... nie', 'altyd' word 'nooit ... nie'.",
        tipEn: "Special words: 'iets' -> 'niks ... nie', 'iemand' -> 'niemand ... nie', 'oral' -> 'nêrens ... nie'.",
        exampleAf: 'Ek sien iemand. ➔ Ek sien NIEMAND NIE.'
      },
      {
        tipAf: "Vraagsinne: Begin met die werkwoord of 'n vraagwoord (Wie, Wat, Waar, Wanneer, Waarom, Hoe).",
        tipEn: "Questions: Put the verb first, or use a question word (Wie, Wat, Waar, Wanneer).",
        exampleAf: 'Speel jy sokker? / Waar is my tas?'
      }
    ]
  },
  'topic-13-reading-comprehension': {
    topicId: 'topic-13-reading-comprehension',
    topicTitleAf: 'Leesbegrip en Storiebegrip',
    topicTitleEn: 'Reading Comprehension',
    goldenRuleAf: "Lees die vrae EERSTE! Dan weet jou brein presies watter leidrade en antwoorde om in die storie te soek.",
    goldenRuleEn: "Read the questions FIRST! That way your brain already knows which clues to look for in the passage.",
    stuckTips: [
      {
        tipAf: "Vraagwoorde help jou: 'Wie' soek 'n persoon; 'Waar' soek 'n plek; 'Wanneer' soek 'n tyd; 'Hoekom' soek 'n rede.",
        tipEn: "Question words: 'Wie' = Who (person), 'Waar' = Where (place), 'Wanneer' = When (time), 'Hoekom' = Why (reason).",
        mnemonic: 'Wie = Mense 👤 | Waar = Plek 📍 | Wanneer = Tyd ⏰'
      },
      {
        tipAf: "Die antwoord skuil gewoonlik in dieselfde volgorde as die storie. Vraag 1 se antwoord is bo in paragraaf 1!",
        tipEn: "Answers usually follow story order. Question 1 is almost always near the beginning of paragraph 1."
      },
      {
        tipAf: "As jy 'n woord nie ken nie, lees die hele sin. Die ander woorde gee vir jou 'n leidraad van wat dit beteken.",
        tipEn: "Context clues: Read the whole sentence if you hit an unfamiliar word to guess its meaning."
      }
    ]
  },
  'topic-14-spelling-and-sounds': {
    topicId: 'topic-14-spelling-and-sounds',
    topicTitleAf: 'Spelling, Klanke en Leestekens',
    topicTitleEn: 'Spelling, Phonics & Punctuation',
    goldenRuleAf: "Klanke: 'ou' soek koud; 'ei' en 'y' klink dieselfde; Kappie (^) rek die klank (wêreld, môre); Deelteken (¨) breek twee klanke (hoër, geëet).",
    goldenRuleEn: "Punctuation & Phonics: Kappie (^) lengthens vowels (môre); Deelteken (¨) splits syllables (geëet, hoër).",
    stuckTips: [
      {
        tipAf: "KAPPIE (^): Sit 'n kappie op 'e' of 'o' as die klank lank en gerek getrek word (wêreld, sê, môre, brûe).",
        tipEn: "KAPPIE (^): The little hat stretches the sound out long (wêreld = world, môre = morning).",
        mnemonic: "Kappie is 'n hoedjie wat die klank langer maak! 🎩"
      },
      {
        tipAf: "DEELTEKEN (¨): Die twee ogies breek twee klinkers uitmekaar sodat jy albei kan uitspreek (ge-eet word geëet).",
        tipEn: "DEELTEKEN (¨): The two dots separate vowel sounds so both are pronounced (ge-eet -> geëet, ho-er -> hoër).",
        mnemonic: 'Twee ogies kyk tussen twee klinkers! 👀'
      },
      {
        tipAf: "Leestekens: Elke sin begin met 'n HOOFLETTER en eindig met 'n punt (.), vraagteken (?) of uitroepteken (!).",
        tipEn: "Punctuation: Every sentence needs a capital letter and end punctuation (. ? !)."
      }
    ]
  },
  'topic-15-creative-writing-paragraphs': {
    topicId: 'topic-15-creative-writing-paragraphs',
    topicTitleAf: 'Kreatiewe Skryfwerk en Paragrawe',
    topicTitleEn: 'Creative Writing & Paragraphs',
    goldenRuleAf: "Bou 'n hamburger-paragraaf: Boonste broodjie = Onderwerpsin; Vleis & blaarslaai = 3 sappige besonderhede; Onderste broodjie = Slot-sin!",
    goldenRuleEn: "Hamburger paragraph: Top bun = Topic sentence; Meat & salad = 3 exciting details; Bottom bun = Concluding sentence!",
    stuckTips: [
      {
        tipAf: "HAMBURGER MODEL: Moenie net een sin skryf nie! Grade 4 CAPS vra vir 'n netjiese paragraaf van 4 tot 6 sinne.",
        tipEn: "HAMBURGER MODEL: Aim for 4 to 6 connected sentences: intro, details, and conclusion.",
        mnemonic: 'Broodjie bo 🍔 + Sappige besonderhede + Broodjie onder!'
      },
      {
        tipAf: "Gebruik koppelwoorde soos 'want' (because), 'maar' (but), 'daarna' (afterwards), 'toe' (then) om sinne te bind.",
        tipEn: "Use connectors: 'want', 'maar', 'en', 'daarna', 'uiteindelik' to make your writing flow smoothly."
      },
      {
        tipAf: "Kyk na jou spelling en STOMPI voor jy inhandig. Lees jou paragraaf hardop vir jouself!",
        tipEn: "Proofread: Read your paragraph out loud to hear if the STOMPI rhythm sounds right."
      }
    ]
  }
};

export const SCREEN_OLLIE_HELP: Record<string, GeneralScreenHelp> = {
  exam: {
    screenId: 'exam',
    titleAf: 'KABV Hersieningseksamen Hulp',
    titleEn: 'CAPS Revision Exam Strategy',
    mainAdviceAf: "Moenie jaag nie! Jy het 45 minute vir 25 vrae. Dit is byna 2 minute per vraag. Lees rustig en dink mooi.",
    mainAdviceEn: "Don't rush! You have plenty of time for all 25 questions. Read each option carefully and eliminate clear mistakes.",
    tips: [
      {
        tipAf: "Uitskakel-metode: As jy nie dadelik die antwoord weet nie, skakel die twee opsies uit wat heeltemal verkeerd lyk.",
        tipEn: "Process of elimination: Cross out the two options that are definitely wrong first, then pick the best one."
      },
      {
        tipAf: "STOMPI vrae: Kyk dadelik waar die werkwoord (V1) staan. As dit nie tweede is nie, is dit verkeerd!",
        tipEn: "STOMPI check: Immediately look at Verb 1. If it's not in second position, that option is wrong!"
      },
      {
        tipAf: "Meervoude & Verkleining: Kyk na die klinker. Is dit kort (kat -> katte) of lank (boom -> bome)?",
        tipEn: "Plurals check: Is the vowel short (double the consonant) or twin (drop one vowel)?"
      },
      {
        tipAf: "Jy kan enige tyd die vraestel en memorandum as PDF aflaai om op papier te oefen!",
        tipEn: "You can download the full printable exam question paper and answer memo as a PDF too!"
      }
    ]
  },
  stories: {
    screenId: 'stories',
    titleAf: 'Leesbegrip & Stories Hulp',
    titleEn: 'Stories & Comprehension Help',
    mainAdviceAf: "Lees die storie twee keer: Eers om die storie te geniet, en dan weer om die antwoorde op die vrae te vind.",
    mainAdviceEn: "Read the story twice: First to enjoy the adventure, then again to locate the exact answers to the questions.",
    tips: [
      {
        tipAf: "Klik op die klank-knoppie om die storie in 'n egte Suid-Afrikaanse stem te hoor!",
        tipEn: "Click the audio speaker button to listen to the story read aloud in a clear South African voice."
      },
      {
        tipAf: "Kyk na die prentjies en titel — dit gee vir jou dadelik 'n idee waaroor die storie gaan.",
        tipEn: "Look at the pictures and title — they give you instant clues about what happens."
      }
    ]
  },
  games: {
    screenId: 'games',
    titleAf: 'Speletjies & Oefening Hulp',
    titleEn: 'Games Hub Strategy',
    mainAdviceAf: "Speletjies is die vinnigste manier om woordeskat en reëls in jou langtermyngeheue vas te lê!",
    mainAdviceEn: "Games are the fastest, most fun way to lock new vocabulary into your long-term memory!",
    tips: [
      {
        tipAf: "STOMPI Bouer: Sleep die treintjie se waentjies in die regte volgorde. V1 altyd op spoor 2!",
        tipEn: "STOMPI Builder game: Drag train carriages in order. V1 is always on carriage #2!"
      },
      {
        tipAf: "Woordsoek & Flitskaarte: Sê die woorde hardop soos jy hulle kry om jou uitspraak te oefen.",
        tipEn: "Word search & flashcards: Say the words out loud as you spot them to master pronunciation."
      }
    ]
  },
  daily: {
    screenId: 'daily',
    titleAf: 'Daaglikse Uitdaging Hulp',
    titleEn: 'Daily Challenge Tips',
    mainAdviceAf: "Net 5 minute per dag hou jou Afrikaans vlymskerp! Bou jou daaglikse wentrajek op.",
    mainAdviceEn: "Just 5 minutes a day keeps your Afrikaans razor-sharp! Keep your streak burning bright.",
    tips: [
      {
        tipAf: "Moenie stres oor foute in die daaglikse uitdaging nie — dit gee vir jou ekstra edelstene en punte!",
        tipEn: "Don't stress over mistakes — completing the daily challenge earns extra gems and stars."
      }
    ]
  },
  parent: {
    screenId: 'parent',
    titleAf: 'Ouer & Onderwyser Paneel Hulp',
    titleEn: 'Parent & Teacher Dashboard Help',
    mainAdviceAf: "Hier kan ouers presies sien wat die leerder geleer het, PDF werkskaarte en eksamens aflaai, en vordering volg.",
    mainAdviceEn: "Parents and teachers can view learned skills, download printable CAPS exam PDFs, and send weekly reports.",
    tips: [
      {
        tipAf: "Gebruik die 'Laai Vraestel Af (PDF)' knoppie om 'n amptelike 50-punt toets uit te druk.",
        tipEn: "Use the 'Download Exam (PDF)' button to print a formal 50-mark revision test."
      },
      {
        tipAf: "Deel die vorderingsverslag via WhatsApp of e-pos om die kind se prestasies te vier!",
        tipEn: "Share the progress report via WhatsApp or email to celebrate your learner's achievements!"
      }
    ]
  },
  map: {
    screenId: 'map',
    titleAf: 'Avontuurkaart Hulp',
    titleEn: 'Adventure Map Tips',
    mainAdviceAf: "Kies enige goue stasie op die kaart om 'n nuwe les te begin! Voltooi lesse om sterre en trofeë te ontsluit.",
    mainAdviceEn: "Pick any golden station on the map to begin a lesson! Complete lessons to earn stars and unlock Ollie badges.",
    tips: [
      {
        tipAf: "Begin by Onderwerp 1 as jy nuut is, of spring reguit na STOMPI (Onderwerp 8) as jy grammatika wil oefen.",
        tipEn: "Start at Topic 1 if you are new, or jump straight to STOMPI (Topic 8) for grammar practice."
      },
      {
        tipAf: "Druk Ctrl+K om enige les of onderwerp blitsvinnig op te soek!",
        tipEn: "Press Ctrl+K anytime to quickly search across all 15 CAPS topics."
      }
    ]
  },
  printables: {
    screenId: 'printables',
    titleAf: 'Drukstukke & Studiegidse Hulp',
    titleEn: 'Printables & Study Guides Help',
    mainAdviceAf: "Druk die studiegidse en flitskaarte uit om vanlyn op papier te oefen of saam met ouers deur te werk!",
    mainAdviceEn: "Print the study guides and cut-out flashcards to practice offline or review together with parents!",
    tips: [
      {
        tipAf: "Flitskaarte kan langs die stippellyne (---) uitgeknip word vir daaglikse woordeskat-speletjies.",
        tipEn: "Flashcards can be cut along the dotted lines for daily vocabulary practice games."
      },
      {
        tipAf: "Voltooi lesse op die kaart om nuwe amptelike KABV studiegidse te ontsluit!",
        tipEn: "Complete lessons on the adventure map to unlock new official CAPS study guides!"
      },
      {
        tipAf: "Gebruik die 'Laai Volledige Bundel Af' knoppie om alle studiegidse in een slag te kry.",
        tipEn: "Use the master bundle button to download all completed study guides in one go."
      }
    ]
  }
};
