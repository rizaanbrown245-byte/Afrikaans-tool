import { LessonContent } from '../types';

export const LESSONS_DATA: LessonContent[] = [
  // --- TOPIC 1 ---
  {
    id: 'topic-1-greetings',
    topicNumber: 1,
    titleAf: 'Groete en Bekendstelling',
    titleEn: 'Greetings & Introductions',
    term: 1,
    category: 'Spraak',
    icon: '👋',
    color: 'from-amber-400 to-orange-400',
    capsTopic: 'Luister en praat: Informele en formele groetvorme',
    summaryEn: 'Learn how to greet your friends, your teacher, say please and thank you, and introduce yourself in Afrikaans!',
    ollieTip: {
      english: "Hoo-hoo! I'm Ollie the Owl! In Afrikaans, greeting people is super polite. To say good morning, remember 'Goeiemôre'—it sounds like 'Ghooy-uh-mor-ruh'! Let's try it together!",
      afrikaans: "Hallo maats! Ek is Ollie die Uil. Kom ons leer hoe om mekaar vriendelik te groet!"
    },
    explanationBlocks: [
      {
        headingEn: 'Common Greetings in South Africa',
        headingAf: 'Algemene Groete',
        contentEn: "When you walk into school or greet someone, use these friendly phrases. In Afrikaans, we use 'Goeiemôre' for adults in the morning, and a quick 'Hallo' for friends!",
        contentAf: "Ons gebruik verskillende groete gedurende die dag.",
        examples: [
          { afrikaans: 'Hallo / Haai', english: 'Hello / Hi (friendly)', note: 'For your classmates' },
          { afrikaans: 'Goeiemôre', english: 'Good morning', highlight: '[ghooy-uh-MOR-uh]', note: 'Used until 12:00 noon' },
          { afrikaans: 'Goeiemiddag', english: 'Good afternoon', highlight: '[ghooy-uh-MID-dakh]', note: 'After 12:00' },
          { afrikaans: 'Goeienaand', english: 'Good evening', highlight: '[ghooy-uh-NAHNT]', note: 'When it gets dark' },
          { afrikaans: 'Totsiens', english: 'Goodbye', highlight: '[toht-SEENS]', note: 'Polite way to leave' }
        ]
      },
      {
        headingEn: 'Introducing Yourself (Wie is jy?)',
        headingAf: 'Stel jouself voor',
        contentEn: "To tell someone your name and age, use these easy sentence starters:",
        contentAf: "Vertel vir iemand wat jou naam is en hoe oud jy is.",
        examples: [
          { afrikaans: 'My naam is...', english: 'My name is...', note: 'e.g. My naam is Sipho.' },
          { afrikaans: 'Wat is jou naam?', english: 'What is your name?', note: 'Asking a friend' },
          { afrikaans: 'Ek is nege jaar oud.', english: 'I am nine years old.', note: 'Grade 4 age' },
          { afrikaans: 'Aangename kennis!', english: 'Pleased to meet you!', note: 'Very polite!' }
        ]
      },
      {
        headingEn: 'Magic Manners (Goeie Maniere)',
        headingAf: 'Goeie Maniere',
        contentEn: "South African teachers love polite learners! Always remember these golden words:",
        contentAf: "Onthou altyd hierdie belangrike hoflikheidswoorde.",
        examples: [
          { afrikaans: 'Asseblief', english: 'Please', highlight: '[us-suh-BLEEF]' },
          { afrikaans: 'Dankie', english: 'Thank you', highlight: '[DUN-kee]' },
          { afrikaans: 'Groot asseblief / Baie dankie', english: 'You are welcome / Thank you very much' },
          { afrikaans: 'Jammer / Ekskuus', english: 'Sorry / Excuse me' }
        ]
      }
    ],
    vocabulary: [
      { id: 'v1-1', afrikaans: 'Hallo', english: 'Hello', pronunciation: 'Hul-loh', category: 'Greetings', emoji: '👋', exampleSentenceAf: 'Hallo, hoe gaan dit?', exampleSentenceEn: 'Hello, how are you?' },
      { id: 'v1-2', afrikaans: 'Goeiemôre', english: 'Good morning', pronunciation: 'Ghooy-uh-mor-uh', category: 'Greetings', emoji: '🌅', exampleSentenceAf: 'Goeiemôre juffrou!', exampleSentenceEn: 'Good morning teacher!' },
      { id: 'v1-3', afrikaans: 'Goeiemiddag', english: 'Good afternoon', pronunciation: 'Ghooy-uh-mid-dukh', category: 'Greetings', emoji: '☀️', exampleSentenceAf: 'Goeiemiddag maats.', exampleSentenceEn: 'Good afternoon friends.' },
      { id: 'v1-4', afrikaans: 'Totsiens', english: 'Goodbye', pronunciation: 'Toht-seens', category: 'Greetings', emoji: '🏃‍♂️', exampleSentenceAf: 'Totsiens, sien jou môre!', exampleSentenceEn: 'Goodbye, see you tomorrow!' },
      { id: 'v1-5', afrikaans: 'Asseblief', english: 'Please', pronunciation: 'Us-suh-bleef', category: 'Manners', emoji: '🙏', exampleSentenceAf: 'Mag ek asseblief water drink?', exampleSentenceEn: 'May I please drink water?' },
      { id: 'v1-6', afrikaans: 'Dankie', english: 'Thank you', pronunciation: 'Dun-kee', category: 'Manners', emoji: '🎁', exampleSentenceAf: 'Baie dankie vir die hulp.', exampleSentenceEn: 'Thank you very much for the help.' },
      { id: 'v1-7', afrikaans: 'Jammer', english: 'Sorry', pronunciation: 'Yum-muhr', category: 'Manners', emoji: '🥺', exampleSentenceAf: 'Jammer, ek het my potlood vergeet.', exampleSentenceEn: 'Sorry, I forgot my pencil.' },
      { id: 'v1-8', afrikaans: 'Hoe gaan dit?', english: 'How are you?', pronunciation: 'Hoo khahn dit?', category: 'Greetings', emoji: '💬', exampleSentenceAf: 'Goed dankie, en met jou?', exampleSentenceEn: 'Good thank you, and with you?' }
    ],
    questions: [
      {
        id: 'q1-1',
        level: 'easy',
        type: 'multiple-choice',
        promptAf: 'Wat sê jy vir jou onderwyser om 08:00 die oggend?',
        promptEn: 'What do you say to your teacher at 08:00 in the morning?',
        options: ['Goeienaand', 'Goeiemôre', 'Totsiens', 'Lekker slaap'],
        correctAnswer: 'Goeiemôre',
        hint: 'In the morning we say "Good morning" which starts with Goeie...',
        explanationEn: 'Goeiemôre means "Good morning" in Afrikaans. We use it before midday.',
        explanationAf: 'Goeiemôre is die regte groet vir die oggend voor 12:00.'
      },
      {
        id: 'q1-2',
        level: 'easy',
        type: 'multiple-choice',
        promptAf: 'Kies die regte Engelse woord vir "Dankie":',
        promptEn: 'Choose the correct English word for "Dankie":',
        options: ['Please', 'Thank you', 'Goodbye', 'Sorry'],
        correctAnswer: 'Thank you',
        hint: 'You say this when someone gives you a sweet or a pencil.',
        explanationEn: '"Dankie" translates directly to "Thank you". "Asseblief" means "Please".',
        explanationAf: 'Dankie beteken Thank you in Engels.'
      },
      {
        id: 'q1-3',
        level: 'medium',
        type: 'fill-blank',
        promptAf: 'Vul die ontbrekende woord in: "Mag ek ________ water kry?" (Please)',
        promptEn: 'Fill in the missing word: "Mag ek ________ water kry?" (Please)',
        options: ['asseblief', 'dankie', 'totsiens', 'hallo'],
        correctAnswer: 'asseblief',
        hint: 'The magic polite word for "please" begins with an "a".',
        explanationEn: 'Asseblief means "please" in Afrikaans. Always say asseblief when requesting something.',
        explanationAf: 'Ons gebruik asseblief as ons mooi vir iets vra.'
      },
      {
        id: 'q1-4',
        level: 'challenge',
        type: 'translation',
        promptAf: 'Hoe sê jy "My name is Thabo and I am ten years old" in Afrikaans?',
        promptEn: 'How do you say "My name is Thabo and I am ten years old" in Afrikaans?',
        options: [
          'My naam is Thabo en ek is tien jaar oud.',
          'Ek heet Thabo en hy is tien jaar oud.',
          'Thabo is my broer en ek is nege jaar oud.',
          'My van is Thabo en ek hou van skool.'
        ],
        correctAnswer: 'My naam is Thabo en ek is tien jaar oud.',
        hint: 'Look for "naam" (name) and "tien" (ten).',
        explanationEn: '"My naam is..." = My name is... and "ek is tien jaar oud" = I am ten years old.',
        explanationAf: 'Korrek! Dit is die natuurlike Afrikaanse sin om jouself voor te stel.'
      }
    ]
  },

  // --- TOPIC 2 ---
  {
    id: 'topic-2-numbers-days-months',
    topicNumber: 2,
    titleAf: 'Nommers, Dae en Maande',
    titleEn: 'Numbers, Days & Months',
    term: 1,
    category: 'Woordeskat',
    icon: '📅',
    color: 'from-sky-400 to-blue-500',
    capsTopic: 'Woordeskat: Getalle 1-20, dae van die week en maande van die jaar',
    summaryEn: 'Count from 1 to 20, name the 7 days of the school week, and master the 12 months in Afrikaans!',
    ollieTip: {
      english: "Counting in Afrikaans is like a catchy song: een, twee, drie, vier, vyf! And remember: all days of the week end in '-dag' (day), just like in English!",
      afrikaans: "Tel saam met my! Een, twee, drie... En onthou elke dag van die week eindig op -dag!"
    },
    explanationBlocks: [
      {
        headingEn: 'Numbers 1 to 10 (Getalle 1 tot 10)',
        headingAf: 'Getalle 1 tot 10',
        contentEn: 'Let us master the first ten counting numbers. Notice how "drie" sounds like "dree" and "vier" sounds like "feer"!',
        contentAf: 'Tel van een tot tien in Afrikaans.',
        examples: [
          { afrikaans: '1 = een', english: 'one [ee-uh-n]' },
          { afrikaans: '2 = twee', english: 'two [tvee]' },
          { afrikaans: '3 = drie', english: 'three [dree]' },
          { afrikaans: '4 = vier', english: 'four [feer]' },
          { afrikaans: '5 = vyf', english: 'five [fayf]' },
          { afrikaans: '6 = ses', english: 'six [ses]' },
          { afrikaans: '7 = sewe', english: 'seven [see-vuh]' },
          { afrikaans: '8 = agt', english: 'eight [ukht]' },
          { afrikaans: '9 = nege', english: 'nine [nee-khuh]' },
          { afrikaans: '10 = tien', english: 'ten [teen]' }
        ]
      },
      {
        headingEn: 'Days of the Week (Dae van die Week)',
        headingAf: 'Dae van die Week',
        contentEn: 'There are seven days in a week. School starts on Maandag!',
        contentAf: 'Daar is sewe dae in \'n week.',
        examples: [
          { afrikaans: 'Maandag', english: 'Monday (Moon day)' },
          { afrikaans: 'Dinsdag', english: 'Tuesday' },
          { afrikaans: 'Woensdag', english: 'Wednesday' },
          { afrikaans: 'Donderdag', english: 'Thursday' },
          { afrikaans: 'Vrydag', english: 'Friday (Weekend starts!)' },
          { afrikaans: 'Saterdag', english: 'Saturday' },
          { afrikaans: 'Sondag', english: 'Sunday' }
        ]
      },
      {
        headingEn: 'The 12 Months (Die 12 Maande)',
        headingAf: 'Die Twaalf Maande',
        contentEn: 'The Afrikaans names for months are very similar to English, making them fun and easy to recognise!',
        contentAf: 'Die maande van die jaar.',
        examples: [
          { afrikaans: 'Januarie, Februarie, Maart, April', english: 'January, February, March, April' },
          { afrikaans: 'Mei, Junie, Julie, Augustus', english: 'May, June, July, August' },
          { afrikaans: 'September, Oktober, November, Desember', english: 'September, October, November, December' }
        ]
      }
    ],
    vocabulary: [
      { id: 'v2-1', afrikaans: 'een', english: 'one', pronunciation: 'Ee-uhn', category: 'Numbers', emoji: '1️⃣', exampleSentenceAf: 'Ek het een suster.', exampleSentenceEn: 'I have one sister.' },
      { id: 'v2-2', afrikaans: 'vyf', english: 'five', pronunciation: 'Fayf', category: 'Numbers', emoji: '5️⃣', exampleSentenceAf: 'Daar is vyf appels.', exampleSentenceEn: 'There are five apples.' },
      { id: 'v2-3', afrikaans: 'tien', english: 'ten', pronunciation: 'Teen', category: 'Numbers', emoji: '🔟', exampleSentenceAf: 'Ek het tien vingers.', exampleSentenceEn: 'I have ten fingers.' },
      { id: 'v2-4', afrikaans: 'Maandag', english: 'Monday', pronunciation: 'Mahn-dukh', category: 'Days', emoji: '🎒', exampleSentenceAf: 'Maandag gaan ons skool toe.', exampleSentenceEn: 'Monday we go to school.' },
      { id: 'v2-5', afrikaans: 'Vrydag', english: 'Friday', pronunciation: 'Fray-dukh', category: 'Days', emoji: '🎉', exampleSentenceAf: 'Vrydag is naweek-tyd!', exampleSentenceEn: 'Friday is weekend time!' },
      { id: 'v2-6', afrikaans: 'Sondag', english: 'Sunday', pronunciation: 'Sohn-dukh', category: 'Days', emoji: '☀️', exampleSentenceAf: 'Sondag rus die familie.', exampleSentenceEn: 'Sunday the family rests.' },
      { id: 'v2-7', afrikaans: 'Januarie', english: 'January', pronunciation: 'Yuhn-ew-ah-ree', category: 'Months', emoji: '🗓️', exampleSentenceAf: 'Skool begin in Januarie.', exampleSentenceEn: 'School starts in January.' },
      { id: 'v2-8', afrikaans: 'Desember', english: 'December', pronunciation: 'Duh-sem-buhr', category: 'Months', emoji: '🏖️', exampleSentenceAf: 'Desember is somervakansie.', exampleSentenceEn: 'December is summer holiday.' }
    ],
    questions: [
      {
        id: 'q2-1',
        level: 'easy',
        type: 'multiple-choice',
        promptAf: 'Wat is die Afrikaanse woord vir "Wednesday"?',
        promptEn: 'What is the Afrikaans word for "Wednesday"?',
        options: ['Dinsdag', 'Woensdag', 'Donderdag', 'Vrydag'],
        correctAnswer: 'Woensdag',
        hint: 'It starts with the letter "W".',
        explanationEn: 'Woensdag is Wednesday in Afrikaans.',
        explanationAf: 'Woensdag volg na Dinsdag en kom voor Donderdag.'
      },
      {
        id: 'q2-2',
        level: 'easy',
        type: 'multiple-choice',
        promptAf: 'Hoeveel is 4 + 4 in Afrikaans?',
        promptEn: 'How much is 4 + 4 in Afrikaans?',
        options: ['ses', 'sewe', 'agt', 'nege'],
        correctAnswer: 'agt',
        hint: '4 plus 4 = 8. What is eight in Afrikaans?',
        explanationEn: '4 + 4 = 8, which is "agt" in Afrikaans.',
        explanationAf: 'Vier plus vier is agt (8).'
      },
      {
        id: 'q2-3',
        level: 'medium',
        type: 'fill-blank',
        promptAf: 'Die dag na Vrydag is ________.',
        promptEn: 'The day after Friday is ________.',
        options: ['Sondag', 'Saterdag', 'Maandag', 'Donderdag'],
        correctAnswer: 'Saterdag',
        hint: 'It is the first day of the weekend!',
        explanationEn: 'The day after Friday (Vrydag) is Saturday (Saterdag).',
        explanationAf: 'Saterdag is die eerste dag van die naweek.'
      },
      {
        id: 'q2-4',
        level: 'challenge',
        type: 'multiple-choice',
        promptAf: 'In watter maand vier Suid-Afrikaners Kersfees en somervakansie?',
        promptEn: 'In which month do South Africans celebrate Christmas and summer holidays?',
        options: ['Junie', 'Desember', 'Maart', 'Augustus'],
        correctAnswer: 'Desember',
        hint: 'The 12th month of the year!',
        explanationEn: 'In South Africa, Christmas and summer holidays happen in December (Desember).',
        explanationAf: 'Desember is die twaalfde maand en vakansietyd.'
      }
    ]
  },

  // --- TOPIC 3 ---
  {
    id: 'topic-3-colours-and-shapes',
    topicNumber: 3,
    titleAf: 'Kleure en Vorms',
    titleEn: 'Colours & Shapes',
    term: 1,
    category: 'Woordeskat',
    icon: '🎨',
    color: 'from-emerald-400 to-teal-500',
    capsTopic: 'Woordeskat & Beskrywende woorde: Kleure en meetkundige vorms',
    summaryEn: 'Discover the rainbow of Afrikaans colours and learn to describe circles, squares, and triangles!',
    ollieTip: {
      english: "Colours in Afrikaans are easy to spot: 'rooi' is red, 'geel' is yellow, and 'blou' is blue. Notice how 'oranje' sounds almost like orange!",
      afrikaans: "Kyk na die reënboog! Rooi, oranje, geel, groen, blou, pers... Watter kleur is jou gunsteling?"
    },
    explanationBlocks: [
      {
        headingEn: 'Colours (Die Kleure)',
        headingAf: 'Die Kleure',
        contentEn: 'Let us paint our Afrikaans world with vibrant colours!',
        contentAf: 'Hier is die belangrikste kleure wat ons elke dag sien.',
        examples: [
          { afrikaans: 'rooi', english: 'red [roy]' },
          { afrikaans: 'blou', english: 'blue [blow]' },
          { afrikaans: 'geel', english: 'yellow [kheel]' },
          { afrikaans: 'groen', english: 'green [krhoon]' },
          { afrikaans: 'oranje', english: 'orange [oh-RUN-yuh]' },
          { afrikaans: 'pers', english: 'purple [pehrs]' },
          { afrikaans: 'swart & wit', english: 'black & white [svurt & vit]' },
          { afrikaans: 'bruin & pienk', english: 'brown & pink [brayn & peenk]' }
        ]
      },
      {
        headingEn: 'Shapes (Die Vorms)',
        headingAf: 'Die Vorms',
        contentEn: 'Shapes help us describe everything from a rugby ball to a classroom clock.',
        contentAf: 'Vorms help ons om dinge te beskryf.',
        examples: [
          { afrikaans: '\'n sirkel', english: 'a circle (round like a coin)' },
          { afrikaans: '\'n vierkant', english: 'a square (four equal sides: vier = four!)' },
          { afrikaans: '\'n driehoek', english: 'a triangle (three corners: drie = three!)' },
          { afrikaans: '\'n reghoek', english: 'a rectangle (like a door or book)' },
          { afrikaans: '\'n ster', english: 'a star (in the night sky)' }
        ]
      }
    ],
    vocabulary: [
      { id: 'v3-1', afrikaans: 'rooi', english: 'red', pronunciation: 'Roy', category: 'Colours', emoji: '🔴', exampleSentenceAf: 'Die appel is rooi.', exampleSentenceEn: 'The apple is red.' },
      { id: 'v3-2', afrikaans: 'blou', english: 'blue', pronunciation: 'Blow', category: 'Colours', emoji: '🔵', exampleSentenceAf: 'Die lug is blou.', exampleSentenceEn: 'The sky is blue.' },
      { id: 'v3-3', afrikaans: 'geel', english: 'yellow', pronunciation: 'Kheel', category: 'Colours', emoji: '🟡', exampleSentenceAf: 'Die son is helder geel.', exampleSentenceEn: 'The sun is bright yellow.' },
      { id: 'v3-4', afrikaans: 'groen', english: 'green', pronunciation: 'Krhoon', category: 'Colours', emoji: '🟢', exampleSentenceAf: 'Die gras is vars en groen.', exampleSentenceEn: 'The grass is fresh and green.' },
      { id: 'v3-5', afrikaans: 'sirkel', english: 'circle', pronunciation: 'Sehr-kuhl', category: 'Shapes', emoji: '⭕', exampleSentenceAf: '\'n Bal is \'n sirkel.', exampleSentenceEn: 'A ball is a circle.' },
      { id: 'v3-6', afrikaans: 'vierkant', english: 'square', pronunciation: 'Feer-kunt', category: 'Shapes', emoji: '⏹️', exampleSentenceAf: '\'n Blokkie het \'n vierkantige vorm.', exampleSentenceEn: 'A block has a square shape.' },
      { id: 'v3-7', afrikaans: 'driehoek', english: 'triangle', pronunciation: 'Dree-hook', category: 'Shapes', emoji: '🔺', exampleSentenceAf: '\'n Driehoek het drie hoeke.', exampleSentenceEn: 'A triangle has three corners.' }
    ],
    questions: [
      {
        id: 'q3-1',
        level: 'easy',
        type: 'multiple-choice',
        promptAf: 'Watter kleur is gras gewoonlik?',
        promptEn: 'What colour is grass usually?',
        options: ['rooi', 'blou', 'groen', 'pers'],
        correctAnswer: 'groen',
        hint: 'Grass is green. Look for "groen".',
        explanationEn: 'Gras is groen (Grass is green).',
        explanationAf: 'Gras is groen van kleur.'
      },
      {
        id: 'q3-2',
        level: 'medium',
        type: 'multiple-choice',
        promptAf: 'Watter vorm het vier gelyke sye?',
        promptEn: 'Which shape has four equal sides?',
        options: ['sirkel', 'driehoek', 'vierkant', 'ster'],
        correctAnswer: 'vierkant',
        hint: 'Remember: "vier" means four in Afrikaans!',
        explanationEn: 'A square is "vierkant" in Afrikaans because "vier" = 4 sides!',
        explanationAf: '\'n Vierkant het vier gelyke sye.'
      },
      {
        id: 'q3-3',
        level: 'challenge',
        type: 'fill-blank',
        promptAf: 'Die son is ________ en die see is ________.',
        promptEn: 'The sun is ________ and the sea is ________.',
        options: ['geel, blou', 'rooi, groen', 'swart, wit', 'pers, oranje'],
        correctAnswer: 'geel, blou',
        hint: 'The sun is yellow (geel) and the sea is blue (blou).',
        explanationEn: 'The sun is yellow (geel) and the sea is blue (blou).',
        explanationAf: 'Die son is geel en die see is blou.'
      }
    ]
  },

  // --- TOPIC 4 ---
  {
    id: 'topic-4-family-and-friends',
    topicNumber: 4,
    titleAf: 'Familie en Vriende',
    titleEn: 'Family & Friends',
    term: 1,
    category: 'Woordeskat',
    icon: '👨‍👩‍👧‍👦',
    color: 'from-pink-400 to-rose-500',
    capsTopic: 'Luister en praat: My familie en my vriende',
    summaryEn: 'Talk about your mother, father, brother, sister, grandparents, and best friends in Afrikaans!',
    ollieTip: {
      english: "In South Africa, family is everything! In Afrikaans, mom is 'ma' or 'moeder', dad is 'pa' or 'vader', and granny is affectionately called 'ouma'!",
      afrikaans: "Familie is kosbaar. Ouma bak die lekkerste koekies en oupa vertel stories!"
    },
    explanationBlocks: [
      {
        headingEn: 'Immediate Family (Die Gesin)',
        headingAf: 'Die Gesin',
        contentEn: 'Here are the members of your home family:',
        contentAf: 'Die lede van ons gesin.',
        examples: [
          { afrikaans: 'Pa / Vader', english: 'Father / Dad' },
          { afrikaans: 'Ma / Moeder', english: 'Mother / Mom' },
          { afrikaans: 'Broer', english: 'Brother' },
          { afrikaans: 'Suster', english: 'Sister' },
          { afrikaans: 'Baba', english: 'Baby' }
        ]
      },
      {
        headingEn: 'Extended Family & Friends (Familie en Maats)',
        headingAf: 'Oupa, Ouma en Vriende',
        contentEn: 'Grandparents, aunts, uncles, and best friends:',
        contentAf: 'Ander geliefdes in ons lewe.',
        examples: [
          { afrikaans: 'Oupa & Ouma', english: 'Grandfather & Grandmother' },
          { afrikaans: 'Oom & Tannie', english: 'Uncle & Aunt' },
          { afrikaans: 'Neef & Niggie', english: 'Male cousin & Female cousin' },
          { afrikaans: 'Vriend / Maat', english: 'Friend / Pal' },
          { afrikaans: 'Beste maatjie', english: 'Best friend' }
        ]
      }
    ],
    vocabulary: [
      { id: 'v4-1', afrikaans: 'pa', english: 'dad / father', pronunciation: 'Pah', category: 'Family', emoji: '👨', exampleSentenceAf: 'My pa lees die koerant.', exampleSentenceEn: 'My dad reads the newspaper.' },
      { id: 'v4-2', afrikaans: 'ma', english: 'mom / mother', pronunciation: 'Mah', category: 'Family', emoji: '👩', exampleSentenceAf: 'My ma kook lekker kos.', exampleSentenceEn: 'My mom cooks delicious food.' },
      { id: 'v4-3', afrikaans: 'broer', english: 'brother', pronunciation: 'Broor', category: 'Family', emoji: '👦', exampleSentenceAf: 'My broer speel sokker.', exampleSentenceEn: 'My brother plays soccer.' },
      { id: 'v4-4', afrikaans: 'suster', english: 'sister', pronunciation: 'Sehs-tuhr', category: 'Family', emoji: '👧', exampleSentenceAf: 'My suster teken \'n prentjie.', exampleSentenceEn: 'My sister draws a picture.' },
      { id: 'v4-5', afrikaans: 'ouma', english: 'grandmother', pronunciation: 'Oh-mah', category: 'Family', emoji: '👵', exampleSentenceAf: 'Ouma gee vir my \'n drukkie.', exampleSentenceEn: 'Granny gives me a hug.' },
      { id: 'v4-6', afrikaans: 'oupa', english: 'grandfather', pronunciation: 'Oh-pah', category: 'Family', emoji: '👴', exampleSentenceAf: 'Oupa werk in die tuin.', exampleSentenceEn: 'Grandpa works in the garden.' },
      { id: 'v4-7', afrikaans: 'beste maatjie', english: 'best friend', pronunciation: 'Behs-tuh maht-yee', category: 'Friends', emoji: '🤝', exampleSentenceAf: 'Lindiwe is my beste maatjie.', exampleSentenceEn: 'Lindiwe is my best friend.' }
    ],
    questions: [
      {
        id: 'q4-1',
        level: 'easy',
        type: 'multiple-choice',
        promptAf: 'Wat noem jy jou ma se ma in Afrikaans?',
        promptEn: 'What do you call your mom\'s mom in Afrikaans?',
        options: ['Ouma', 'Oupa', 'Tannie', 'Suster'],
        correctAnswer: 'Ouma',
        hint: 'Grandmother in Afrikaans starts with "Ou...".',
        explanationEn: 'Ouma is grandmother in Afrikaans.',
        explanationAf: 'Jou ma se ma is jou ouma.'
      },
      {
        id: 'q4-2',
        level: 'medium',
        type: 'fill-blank',
        promptAf: 'My ma se broer is my ________.',
        promptEn: 'My mom\'s brother is my ________ (uncle).',
        options: ['oom', 'neef', 'oupa', 'broer'],
        correctAnswer: 'oom',
        hint: 'Uncle in Afrikaans is "oom".',
        explanationEn: 'Your mother\'s brother is your uncle, which is "oom".',
        explanationAf: 'Jou ma se broer is jou oom.'
      },
      {
        id: 'q4-3',
        level: 'challenge',
        type: 'multiple-choice',
        promptAf: 'Vertaal: "My best friend plays outside with me."',
        promptEn: 'Translate: "My best friend plays outside with me."',
        options: [
          'My beste maatjie speel buite saam met my.',
          'My suster sit binne die huis.',
          'My broer hardloop vinnig skool toe.',
          'My oupa ry met die trekker.'
        ],
        correctAnswer: 'My beste maatjie speel buite saam met my.',
        hint: 'Look for "beste maatjie" and "speel buite".',
        explanationEn: '"Beste maatjie" = best friend, "speel buite" = plays outside.',
        explanationAf: 'Hierdie sin vertaal korrek: "My beste maatjie speel buite saam met my."'
      }
    ]
  },

  // --- TOPIC 5 ---
  {
    id: 'topic-5-animals',
    topicNumber: 5,
    titleAf: 'Diere (Troeteldiere, Plaasdiere en Wilde Diere)',
    titleEn: 'Animals (Pets, Farm & Wild Safari Animals)',
    term: 1,
    category: 'Woordeskat',
    icon: '🦁',
    color: 'from-amber-500 to-yellow-600',
    capsTopic: 'Lees en kyk / Woordeskat: Diere in Suid-Afrika',
    summaryEn: 'Explore pets at home, farm animals, and South Africa\'s famous wild safari animals like lions, elephants, and springboks!',
    ollieTip: {
      english: "South Africa has the coolest animals on earth! In Afrikaans, a dog is 'hond', a cat is 'kat', an elephant is 'olifant', and a lion is 'leeu' (say it like 'lee-uh')!",
      afrikaans: "Die leeu brul, die hond blaf en die voëltjie sing! Kom ontdek al die diere."
    },
    explanationBlocks: [
      {
        headingEn: 'Pets at Home (Troeteldiere)',
        headingAf: 'Troeteldiere',
        contentEn: 'Animals that live happily in our homes as companions:',
        contentAf: 'Diere wat saam met ons in die huis woon.',
        examples: [
          { afrikaans: '\'n hond', english: 'a dog (barks: Die hond blaf)' },
          { afrikaans: '\'n kat', english: 'a cat (purrs: Die kat spin)' },
          { afrikaans: '\'n voël / voëltjie', english: 'a bird (sings: Die voël sing)' },
          { afrikaans: '\'n vis', english: 'a fish (swims: Die vis swem)' }
        ]
      },
      {
        headingEn: 'Farm Animals (Plaasdiere)',
        headingAf: 'Plaasdiere',
        contentEn: 'Animals that help us and live on farms:',
        contentAf: 'Diere wat op die plaas woon.',
        examples: [
          { afrikaans: '\'n koei', english: 'a cow (gives milk)' },
          { afrikaans: '\'n perd', english: 'a horse (fast runner)' },
          { afrikaans: '\'n skaap', english: 'a sheep (gives wool)' },
          { afrikaans: '\'n vark', english: 'a pig' },
          { afrikaans: '\'n hoender / haan', english: 'a chicken / rooster' }
        ]
      },
      {
        headingEn: 'Wild Safari Animals (Wilde Diere)',
        headingAf: 'Wilde Diere van die Krugerwildtuin',
        contentEn: 'The famous Big 5 and African wildlife:',
        contentAf: 'Wilde diere in die bosveld.',
        examples: [
          { afrikaans: '\'n leeu', english: 'a lion (the king of beasts)' },
          { afrikaans: '\'n olifant', english: 'an elephant (big trunk)' },
          { afrikaans: '\'n kameelperd', english: 'a giraffe (long neck: camel-horse!)' },
          { afrikaans: '\'n sebra', english: 'a zebra (black and white stripes)' },
          { afrikaans: '\'n springbok', english: 'a springbok (South Africa\'s national animal!)' }
        ]
      }
    ],
    vocabulary: [
      { id: 'v5-1', afrikaans: 'hond', english: 'dog', pronunciation: 'Hohnt', category: 'Animals', emoji: '🐶', exampleSentenceAf: 'Die hond speel met \'n bal.', exampleSentenceEn: 'The dog plays with a ball.' },
      { id: 'v5-2', afrikaans: 'kat', english: 'cat', pronunciation: 'Cut', category: 'Animals', emoji: '🐱', exampleSentenceAf: 'Die kat slaap op die mat.', exampleSentenceEn: 'The cat sleeps on the mat.' },
      { id: 'v5-3', afrikaans: 'leeu', english: 'lion', pronunciation: 'Lee-uh', category: 'Animals', emoji: '🦁', exampleSentenceAf: 'Die leeu brul baie hard.', exampleSentenceEn: 'The lion roars very loudly.' },
      { id: 'v5-4', afrikaans: 'olifant', english: 'elephant', pronunciation: 'Oh-lee-funt', category: 'Animals', emoji: '🐘', exampleSentenceAf: 'Die olifant het \'n lang slurp.', exampleSentenceEn: 'The elephant has a long trunk.' },
      { id: 'v5-5', afrikaans: 'kameelperd', english: 'giraffe', pronunciation: 'Kuh-meel-pehrt', category: 'Animals', emoji: '🦒', exampleSentenceAf: 'Die kameelperd eet blare van die boom.', exampleSentenceEn: 'The giraffe eats leaves from the tree.' },
      { id: 'v5-6', afrikaans: 'springbok', english: 'springbok', pronunciation: 'Spring-bok', category: 'Animals', emoji: '🦌', exampleSentenceAf: 'Die springbok spring hoog.', exampleSentenceEn: 'The springbok jumps high.' },
      { id: 'v5-7', afrikaans: 'koei', english: 'cow', pronunciation: 'Kooy', category: 'Animals', emoji: '🐮', exampleSentenceAf: 'Die koei wei in die groen gras.', exampleSentenceEn: 'The cow grazes in the green grass.' }
    ],
    questions: [
      {
        id: 'q5-1',
        level: 'easy',
        type: 'multiple-choice',
        promptAf: 'Wat noem ons \'n "giraffe" in Afrikaans?',
        promptEn: 'What do we call a "giraffe" in Afrikaans?',
        options: ['kameelperd', 'olifant', 'sebra', 'renoster'],
        correctAnswer: 'kameelperd',
        hint: 'It combines the words for camel and horse!',
        explanationEn: 'In Afrikaans, giraffe is called "kameelperd" (camel-horse).',
        explanationAf: '\'n Giraffe is \'n kameelperd in Afrikaans.'
      },
      {
        id: 'q5-2',
        level: 'easy',
        type: 'multiple-choice',
        promptAf: 'Watter geluid maak \'n hond?',
        promptEn: 'What sound does a dog make in Afrikaans?',
        options: ['Die hond blaf', 'Die hond miaau', 'Die hond krys', 'Die hond kraai'],
        correctAnswer: 'Die hond blaf',
        hint: 'Bark in Afrikaans is "blaf".',
        explanationEn: 'Die hond blaf (The dog barks). Miaau is for a cat!',
        explanationAf: '\'n Hond blaf woef-woef!'
      },
      {
        id: 'q5-3',
        level: 'medium',
        type: 'fill-blank',
        promptAf: 'Die nasionale dier van Suid-Afrika is die ________.',
        promptEn: 'The national animal of South Africa is the ________.',
        options: ['springbok', 'leeu', 'olifant', 'kat'],
        correctAnswer: 'springbok',
        hint: 'Just like our famous rugby team!',
        explanationEn: 'The springbok is South Africa\'s national animal.',
        explanationAf: 'Die springbok is ons trots en nasionale dier.'
      },
      {
        id: 'q5-4',
        level: 'challenge',
        type: 'sentence-order',
        promptAf: 'Pak die sin in die regte volgorde: [hardloop] [Die] [vinnig] [perd]',
        promptEn: 'Arrange the sentence in correct order: [The] [horse] [runs] [fast]',
        options: [
          'Die perd hardloop vinnig.',
          'Perd die hardloop vinnig.',
          'Vinnig perd die hardloop.',
          'Hardloop die perd vinnig.'
        ],
        correctAnswer: 'Die perd hardloop vinnig.',
        hint: 'Start with "Die" (The) + Subject (perd) + Verb (hardloop) + Adverb (vinnig).',
        explanationEn: 'In Afrikaans: "Die perd hardloop vinnig" = The horse runs fast.',
        explanationAf: 'Onderwerp + werkwoord + bywoord is die korrekte sinsbou.'
      }
    ]
  },

  // --- TOPIC 6 ---
  {
    id: 'topic-6-food-and-drinks',
    topicNumber: 6,
    titleAf: 'Kos en Drankies',
    titleEn: 'Food & Drinks',
    term: 2,
    category: 'Woordeskat',
    icon: '🍎',
    color: 'from-orange-400 to-red-500',
    capsTopic: 'Taalstrukture en woordeskat: Kos, vrugte, groente en etes',
    summaryEn: 'Name tasty South African food: apples, bread, milk, water, and braaivleis, and talk about breakfast, lunch, and dinner!',
    ollieTip: {
      english: "Mmm, lekker kos! In South Africa, 'lemoen' is an orange (fruit), 'appel' is apple, 'brood' is bread, and 'melk' is milk. To say something tastes delicious, say 'Dit smaak heerlik!'",
      afrikaans: "Kos is heerlik! Wat sit jou ma in jou kosblik vir pouse?"
    },
    explanationBlocks: [
      {
        headingEn: 'Everyday Food (Kos vir elke dag)',
        headingAf: 'Kos vir elke dag',
        contentEn: 'Things we eat for breakfast (ontbyt), lunch (middagete), and supper (aandete):',
        contentAf: 'Belangrike kosse op die tafel.',
        examples: [
          { afrikaans: 'brood', english: 'bread [broht]' },
          { afrikaans: 'botter & konfyt', english: 'butter & jam' },
          { afrikaans: 'kaas', english: 'cheese [kahs]' },
          { afrikaans: 'eiers', english: 'eggs [ay-uhrs]' },
          { afrikaans: 'vleis / hoender', english: 'meat / chicken' }
        ]
      },
      {
        headingEn: 'Fruit & Veggies (Vrugte en Groente)',
        headingAf: 'Vrugte en Groente',
        contentEn: 'Healthy snacks for your school lunchbox (kosblik):',
        contentAf: 'Gesonde peuselhappies.',
        examples: [
          { afrikaans: '\'n appel', english: 'an apple' },
          { afrikaans: '\'n piesang', english: 'a banana' },
          { afrikaans: '\'n lemoen', english: 'an orange' },
          { afrikaans: 'wortels', english: 'carrots' },
          { afrikaans: 'aartappels', english: 'potatoes (earth-apples!)' }
        ]
      },
      {
        headingEn: 'Drinks (Drankies)',
        headingAf: 'Drankies om te drink',
        contentEn: 'What do you drink when you are thirsty (dors)?',
        contentAf: 'Lekker drankies as jy dors is.',
        examples: [
          { afrikaans: 'water', english: 'water' },
          { afrikaans: 'melk', english: 'milk' },
          { afrikaans: 'vrugtesap', english: 'fruit juice' },
          { afrikaans: 'tee met heuning', english: 'tea with honey' }
        ]
      }
    ],
    vocabulary: [
      { id: 'v6-1', afrikaans: 'appel', english: 'apple', pronunciation: 'Up-puhl', category: 'Food', emoji: '🍎', exampleSentenceAf: 'Ek eet \'n rooi appel.', exampleSentenceEn: 'I eat a red apple.' },
      { id: 'v6-2', afrikaans: 'piesang', english: 'banana', pronunciation: 'Pee-sung', category: 'Food', emoji: '🍌', exampleSentenceAf: 'Die apie hou van \'n piesang.', exampleSentenceEn: 'The little monkey likes a banana.' },
      { id: 'v6-3', afrikaans: 'brood', english: 'bread', pronunciation: 'Broht', category: 'Food', emoji: '🍞', exampleSentenceAf: 'Ma sny twee snye brood.', exampleSentenceEn: 'Mom cuts two slices of bread.' },
      { id: 'v6-4', afrikaans: 'water', english: 'water', pronunciation: 'Vah-tuhr', category: 'Drinks', emoji: '💧', exampleSentenceAf: 'Drink elke dag baie water.', exampleSentenceEn: 'Drink plenty of water every day.' },
      { id: 'v6-5', afrikaans: 'melk', english: 'milk', pronunciation: 'Melk', category: 'Drinks', emoji: '🥛', exampleSentenceAf: 'Koeie gee vir ons vars melk.', exampleSentenceEn: 'Cows give us fresh milk.' },
      { id: 'v6-6', afrikaans: 'kosblik', english: 'lunchbox', pronunciation: 'Kos-blik', category: 'School', emoji: '🍱', exampleSentenceAf: 'My kosblik is in my skooltas.', exampleSentenceEn: 'My lunchbox is in my schoolbag.' }
    ],
    questions: [
      {
        id: 'q6-1',
        level: 'easy',
        type: 'multiple-choice',
        promptAf: 'Wat beteken "Ek is honger" in Engels?',
        promptEn: 'What does "Ek is honger" mean in English?',
        options: ['I am thirsty', 'I am hungry', 'I am tired', 'I am happy'],
        correctAnswer: 'I am hungry',
        hint: '"Honger" sounds like hungry!',
        explanationEn: '"Ek is honger" means "I am hungry". "Ek is dors" means "I am thirsty".',
        explanationAf: 'Honger beteken dat jy wil eet.'
      },
      {
        id: 'q6-2',
        level: 'medium',
        type: 'fill-blank',
        promptAf: 'As jy dors is, drink jy koue ________.',
        promptEn: 'When you are thirsty, you drink cold ________.',
        options: ['water', 'brood', 'kaas', 'appel'],
        correctAnswer: 'water',
        hint: 'A drink that quenches your thirst.',
        explanationEn: 'When you are thirsty (dors), you drink cold water (water).',
        explanationAf: 'Water les jou dors.'
      },
      {
        id: 'q6-3',
        level: 'challenge',
        type: 'multiple-choice',
        promptAf: 'Watter een is \'n vrug (fruit)?',
        promptEn: 'Which one is a fruit?',
        options: ['aartappel', 'lemoen', 'wortel', 'vleis'],
        correctAnswer: 'lemoen',
        hint: 'An orange is a citrus fruit.',
        explanationEn: '\'n Lemoen (an orange) is \'n vrug. Aartappel is a potato (vegetable).',
        explanationAf: '\'n Lemoen is \'n soet sitrusvrug.'
      }
    ]
  },

  // --- TOPIC 7 ---
  {
    id: 'topic-7-school-and-classroom',
    topicNumber: 7,
    titleAf: 'Skool en Klaskamer',
    titleEn: 'School & Classroom Objects',
    term: 2,
    category: 'Woordeskat',
    icon: '🏫',
    color: 'from-indigo-400 to-purple-500',
    capsTopic: 'Lees en praat: Skoolbenodigdhede en klaskamerreëls',
    summaryEn: 'Learn words for your schoolbag, pencil, ruler, eraser, teacher, and chalkboard!',
    ollieTip: {
      english: "Inside your 'skooltas' (schoolbag), you keep a 'potlood' (pencil), a 'liniaal' (ruler), and an 'uitveër' (eraser). 'Uitveër' literally means wipe-outer!",
      afrikaans: "In die klaskamer leer ons lees en skryf. Pak jou skooltas netjies uit!"
    },
    explanationBlocks: [
      {
        headingEn: 'Stationery in Your Pencil Case (Skryfbehoeftes)',
        headingAf: 'In jou potloodsakkie',
        contentEn: 'Every Grade 4 learner needs these tools on their desk (bank):',
        contentAf: 'Gereedskap wat ons elke dag gebruik.',
        examples: [
          { afrikaans: '\'n potlood', english: 'a pencil' },
          { afrikaans: '\'n pen', english: 'a pen' },
          { afrikaans: '\'n liniaal', english: 'a ruler' },
          { afrikaans: '\'n uitveër', english: 'an eraser / rubber' },
          { afrikaans: '\'n skêr', english: 'scissors' },
          { afrikaans: 'gom', english: 'glue' }
        ]
      },
      {
        headingEn: 'Classroom Furniture & People (In die Klaskamer)',
        headingAf: 'Mense en Meubels',
        contentEn: 'Who and what is in the room?',
        contentAf: 'Die klaskamer omgewing.',
        examples: [
          { afrikaans: 'die onderwyser / juffrou', english: 'the teacher (male / female)' },
          { afrikaans: 'die leerder / maat', english: 'the learner / classmate' },
          { afrikaans: 'die skoolbank & stoel', english: 'the desk & chair' },
          { afrikaans: 'die swartbord / witbord', english: 'the chalkboard / whiteboard' },
          { afrikaans: 'die handboek & skrif', english: 'the textbook & exercise book' }
        ]
      }
    ],
    vocabulary: [
      { id: 'v7-1', afrikaans: 'potlood', english: 'pencil', pronunciation: 'Pot-loot', category: 'Classroom', emoji: '✏️', exampleSentenceAf: 'Ek skryf met my potlood.', exampleSentenceEn: 'I write with my pencil.' },
      { id: 'v7-2', afrikaans: 'skooltas', english: 'schoolbag', pronunciation: 'Skool-tuhs', category: 'Classroom', emoji: '🎒', exampleSentenceAf: 'My skooltas is swaar.', exampleSentenceEn: 'My schoolbag is heavy.' },
      { id: 'v7-3', afrikaans: 'liniaal', english: 'ruler', pronunciation: 'Lee-nee-ahl', category: 'Classroom', emoji: '📏', exampleSentenceAf: 'Trek \'n reguit lyn met jou liniaal.', exampleSentenceEn: 'Draw a straight line with your ruler.' },
      { id: 'v7-4', afrikaans: 'uitveër', english: 'eraser', pronunciation: 'Ayt-fee-uhr', category: 'Classroom', emoji: '🧼', exampleSentenceAf: 'Vee die fout uit met jou uitveër.', exampleSentenceEn: 'Erase the mistake with your eraser.' },
      { id: 'v7-5', afrikaans: 'skêr', english: 'scissors', pronunciation: 'Skehr', category: 'Classroom', emoji: '✂️', exampleSentenceAf: 'Knip die prentjie met \'n skêr uit.', exampleSentenceEn: 'Cut the picture out with scissors.' },
      { id: 'v7-6', afrikaans: 'onderwyser / juffrou', english: 'teacher', pronunciation: 'Ohn-duhr-vay-suhr / Yuwf-row', category: 'Classroom', emoji: '👩‍🏫', exampleSentenceAf: 'Juffrou lees vir ons \'n mooi storie.', exampleSentenceEn: 'Teacher reads us a beautiful story.' }
    ],
    questions: [
      {
        id: 'q7-1',
        level: 'easy',
        type: 'multiple-choice',
        promptAf: 'Waarmee skryf jy in jou werkboek?',
        promptEn: 'What do you write with in your workbook?',
        options: ['liniaal', 'potlood', 'skêr', 'gom'],
        correctAnswer: 'potlood',
        hint: 'You write with a pencil!',
        explanationEn: 'Jy skryf met \'n potlood (You write with a pencil).',
        explanationAf: '\'n Potlood word gebruik om mee te skryf.'
      },
      {
        id: 'q7-2',
        level: 'medium',
        type: 'fill-blank',
        promptAf: 'As jy \'n fout maak, gebruik jy \'n ________.',
        promptEn: 'When you make a mistake, you use an ________ (eraser).',
        options: ['uitveër', 'liniaal', 'skêr', 'stoel'],
        correctAnswer: 'uitveër',
        hint: 'The word literally means "wipe-out-er".',
        explanationEn: 'Uitveër = eraser. It wipes away pencil marks.',
        explanationAf: '\'n Uitveër vee foute uit.'
      },
      {
        id: 'q7-3',
        level: 'challenge',
        type: 'multiple-choice',
        promptAf: 'Vertaal: "The teacher writes on the chalkboard."',
        promptEn: 'Translate: "The teacher writes on the chalkboard."',
        options: [
          'Die juffrou skryf op die swartbord.',
          'Die leerder sit op die tafel.',
          'Die skooltas lê op die vloer.',
          'Die juffrou lees \'n storieboek.'
        ],
        correctAnswer: 'Die juffrou skryf op die swartbord.',
        hint: 'Look for "juffrou", "skryf" (writes), and "swartbord" (chalkboard).',
        explanationEn: '"Die juffrou skryf op die swartbord" is the exact translation.',
        explanationAf: 'Korrek! Juffrou = teacher, skryf = writes, swartbord = chalkboard.'
      }
    ]
  },

  // --- TOPIC 8 ---
  {
    id: 'topic-8-sentence-building-stompi',
    topicNumber: 8,
    titleAf: 'Sinsbou en die STOMPI-reël',
    titleEn: 'Sentence Building & the STOMPI Rule',
    term: 2,
    category: 'Grammatika',
    icon: '🚂',
    color: 'from-blue-500 to-cyan-500',
    capsTopic: 'Taalstrukture: Korrekte woordorde in eenvoudige en saamgestelde sinne (STOMPI)',
    summaryEn: 'Master the magical STOMPI train rule! This is the #1 secret to building perfect Afrikaans sentences every time.',
    ollieTip: {
      english: "Listen closely! STOMPI is the secret train of Afrikaans. S = Subjek (Who), T = Tyd (When), O = Opperate / Verb 1 (What do they do), M = Manier (How), P = Plek (Where), I = Infinitief / Verb 2 (End of the sentence). Remember: Verb 1 is ALWAYS in position 2!",
      afrikaans: "STOMPI is die geheime trein van Afrikaanse sinne! Onthou: Werkwoord 1 kom ALTYD tweede!"
    },
    stompIRule: [
      { letter: 'S', afrikaans: 'Subjek (Onderwerp)', english: 'Subject (Who is doing it?)', example: 'Die seun (The boy)' },
      { letter: 'T', afrikaans: 'Tyd', english: 'Time (When?)', example: 'elke oggend (every morning)' },
      { letter: 'O / V1', afrikaans: 'Werkwoord 1', english: 'Verb 1 (Action / doing word)', example: 'hardloop (runs)' },
      { letter: 'M', afrikaans: 'Manier', english: 'Manner (How?)', example: 'vinnig (fast)' },
      { letter: 'P', afrikaans: 'Plek', english: 'Place (Where?)', example: 'skool toe (to school)' },
      { letter: 'I / V2', afrikaans: 'Werkwoord 2 / Infinitief', english: 'Verb 2 (Extra action)', example: 'om te leer (to learn)' }
    ],
    explanationBlocks: [
      {
        headingEn: 'The Golden Rule: Verb 1 is in 2nd Place!',
        headingAf: 'Die Goue Reël: Werkwoord 1 staan TWEEDE',
        contentEn: 'In English, you can say "Yesterday the boy ran outside." But in Afrikaans, Verb 1 MUST stay in 2nd place! Example: "Gister HET die seun buite gehardloop."',
        contentAf: 'In Afrikaans staan die eerste werkwoord altyd in die tweede posisie van die sin.',
        examples: [
          { afrikaans: 'Die meisie (S) lees (V1) \'n boek (Voorwerp).', english: 'The girl reads a book.', note: 'Basic S-V-O sentence' },
          { afrikaans: 'Sipho (S) speel (V1) vandag (Tyd) sokker (Voorwerp) by die skool (Plek).', english: 'Sipho plays soccer today at school.' },
          { afrikaans: 'Ons (S) eet (V1) nou (Tyd) lekker (Manier) by die huis (Plek).', english: 'We eat nicely now at home.' }
        ]
      },
      {
        headingEn: 'Connecting Sentences (Voegwoorde)',
        headingAf: 'Voegwoorde (en, maar, want)',
        contentEn: 'You can join two short sentences together using "en" (and), "maar" (but), or "want" (because). With Group 1 conjunctions, word order stays normal!',
        contentAf: 'Verbind sinne met en, maar, of want.',
        examples: [
          { afrikaans: 'Ek hou van appels EN my broer hou van pere.', english: 'I like apples AND my brother likes pears.' },
          { afrikaans: 'Ek wil buite speel, MAAR dit reën.', english: 'I want to play outside, BUT it is raining.' },
          { afrikaans: 'Sipho drink water, WANT hy is dors.', english: 'Sipho drinks water, BECAUSE he is thirsty.' }
        ]
      }
    ],
    vocabulary: [
      { id: 'v8-1', afrikaans: 'subjek', english: 'subject (who)', pronunciation: 'Suhb-yek', category: 'Grammar', emoji: '🧑', exampleSentenceAf: 'Die subjek doen die aksie.', exampleSentenceEn: 'The subject does the action.' },
      { id: 'v8-2', afrikaans: 'werkwoord', english: 'verb (doing word)', pronunciation: 'Vehrk-voort', category: 'Grammar', emoji: '🏃', exampleSentenceAf: '\'n Werkwoord is \'n doewoord.', exampleSentenceEn: 'A verb is an action word.' },
      { id: 'v8-3', afrikaans: 'tyd', english: 'time (when)', pronunciation: 'Tayt', category: 'Grammar', emoji: '⏰', exampleSentenceAf: 'Gister en vandag is tydwoorde.', exampleSentenceEn: 'Yesterday and today are time words.' },
      { id: 'v8-4', afrikaans: 'plek', english: 'place (where)', pronunciation: 'Plek', category: 'Grammar', emoji: '📍', exampleSentenceAf: 'By die skool is \'n plek.', exampleSentenceEn: 'At school is a place.' },
      { id: 'v8-5', afrikaans: 'want', english: 'because', pronunciation: 'Vunt', category: 'Conjunction', emoji: '💡', exampleSentenceAf: 'Ek slaap, want ek is moeg.', exampleSentenceEn: 'I sleep, because I am tired.' },
      { id: 'v8-6', afrikaans: 'maar', english: 'but', pronunciation: 'Mahr', category: 'Conjunction', emoji: '⚖️', exampleSentenceAf: 'Ek soek my pen, maar dit is weg.', exampleSentenceEn: 'I am looking for my pen, but it is lost.' }
    ],
    questions: [
      {
        id: 'q8-1',
        level: 'easy',
        type: 'multiple-choice',
        promptAf: 'In watter posisie staan Werkwoord 1 gewoonlik in \'n Afrikaanse sin?',
        promptEn: 'In which position does Verb 1 usually stand in an Afrikaans sentence?',
        options: ['Eerste (1st)', 'Tweede (2nd)', 'Laaste (Last)', 'Enige plek'],
        correctAnswer: 'Tweede (2nd)',
        hint: 'Remember the STOMPI train: S, then Verb 1!',
        explanationEn: 'In Afrikaans, Verb 1 is always in the 2nd position of a standard sentence.',
        explanationAf: 'Werkwoord 1 staan altyd in die 2de posisie.'
      },
      {
        id: 'q8-2',
        level: 'medium',
        type: 'sentence-order',
        promptAf: 'Rangskik volgens STOMPI: [rugby] [speel] [Die kinders] [vandag]',
        promptEn: 'Arrange according to STOMPI: [rugby] [play] [The children] [today]',
        options: [
          'Die kinders speel vandag rugby.',
          'Die kinders rugby speel vandag.',
          'Vandag rugby die kinders speel.',
          'Speel vandag rugby die kinders.'
        ],
        correctAnswer: 'Die kinders speel vandag rugby.',
        hint: 'Subject (Die kinders) + Verb (speel) + Time (vandag) + Object (rugby).',
        explanationEn: 'S (Die kinders) + V1 (speel) + T (vandag) + O (rugby) = Die kinders speel vandag rugby.',
        explanationAf: 'Korrekte volgorde volgens STOMPI.'
      },
      {
        id: 'q8-3',
        level: 'challenge',
        type: 'fill-blank',
        promptAf: 'Kies die regte voegwoord: "Ek eet my kos, ________ ek is honger."',
        promptEn: 'Choose the correct conjunction: "Ek eet my kos, ________ ek is honger." (because)',
        options: ['want', 'maar', 'en', 'of'],
        correctAnswer: 'want',
        hint: '"Want" means because in Afrikaans.',
        explanationEn: '"Want" means because. "Ek eet my kos, want ek is honger."',
        explanationAf: 'Ons gebruik want om \'n rede te gee.'
      }
    ]
  },

  // --- TOPIC 9 ---
  {
    id: 'topic-9-nouns-verbs-adjectives',
    topicNumber: 9,
    titleAf: 'Naamwoorde, Werkwoorde en Byvoeglike Naamwoorde',
    titleEn: 'Nouns, Verbs & Adjectives',
    term: 2,
    category: 'Grammatika',
    icon: '📚',
    color: 'from-teal-400 to-emerald-500',
    capsTopic: 'Taalstrukture: Woordsoorte - Selfstandige naamwoorde, werkwoorde en byvoeglike naamwoorde',
    summaryEn: 'Discover the three powerhouse word types: Naming words (Nouns), Doing words (Verbs), and Describing words (Adjectives)!',
    ollieTip: {
      english: "Think of words as a superhero team! Nouns (Selfstandige naamwoorde) name people, animals and things. Verbs (Werkwoorde) are ACTION words like run and jump! Adjectives (Byvoeglike naamwoorde) describe the noun, like 'groot' or 'vinnig'!",
      afrikaans: "Naamwoorde noem dinge, werkwoorde doen dinge, en byvoeglike naamwoorde versier die sin!"
    },
    explanationBlocks: [
      {
        headingEn: 'Nouns (Selfstandige Naamwoorde)',
        headingAf: 'Selfstandige Naamwoorde (Dinge wat jy kan sien/raak)',
        contentEn: 'A noun is a naming word for a person, animal, place, or object. You can put "die" (the) or "\'n" (a) in front of it!',
        contentAf: 'Woorde wat name is van mense, diere en voorwerpe.',
        examples: [
          { afrikaans: 'die hond', english: 'the dog' },
          { afrikaans: 'die tafel', english: 'the table' },
          { afrikaans: 'die skool', english: 'the school' },
          { afrikaans: '\'n boom', english: 'a tree' }
        ]
      },
      {
        headingEn: 'Verbs (Werkwoorde - Doenwoorde)',
        headingAf: 'Werkwoorde (Doewoorde)',
        contentEn: 'A verb tells you what someone is DOING. If you can physically act it out, it is a verb!',
        contentAf: 'Woorde wat aksie wys.',
        examples: [
          { afrikaans: 'hardloop', english: 'run' },
          { afrikaans: 'spring', english: 'jump' },
          { afrikaans: 'eet & drink', english: 'eat & drink' },
          { afrikaans: 'lees & skryf', english: 'read & write' }
        ]
      },
      {
        headingEn: 'Adjectives (Byvoeglike Naamwoorde - Beskrywende Woorde)',
        headingAf: 'Byvoeglike Naamwoorde (Beskryf die naamwoord)',
        contentEn: 'Adjectives tell you WHAT the noun is like: colour, size, shape, or feeling.',
        contentAf: 'Hierdie woorde beskryf die selfstandige naamwoord.',
        examples: [
          { afrikaans: '\'n GROOT olifant', english: 'a BIG elephant' },
          { afrikaans: '\'n VINNIGE haas', english: 'a FAST rabbit' },
          { afrikaans: '\'n ROOI appel', english: 'a RED apple' },
          { afrikaans: '\'n MOOI prentjie', english: 'a PRETTY picture' }
        ]
      }
    ],
    vocabulary: [
      { id: 'v9-1', afrikaans: 'hardloop', english: 'run (verb)', pronunciation: 'Hahrt-loop', category: 'Verbs', emoji: '🏃‍♂️', exampleSentenceAf: 'Die seun hardloop vinnig.', exampleSentenceEn: 'The boy runs fast.' },
      { id: 'v9-2', afrikaans: 'spring', english: 'jump (verb)', pronunciation: 'Spring', category: 'Verbs', emoji: '🦘', exampleSentenceAf: 'Die padda spring in die water.', exampleSentenceEn: 'The frog jumps into the water.' },
      { id: 'v9-3', afrikaans: 'slaap', english: 'sleep (verb)', pronunciation: 'Slahp', category: 'Verbs', emoji: '😴', exampleSentenceAf: 'Die baba slaap rustig.', exampleSentenceEn: 'The baby sleeps peacefully.' },
      { id: 'v9-4', afrikaans: 'groot', english: 'big (adjective)', pronunciation: 'Khrooht', category: 'Adjectives', emoji: '🐘', exampleSentenceAf: '\'n Olifant is baie groot.', exampleSentenceEn: 'An elephant is very big.' },
      { id: 'v9-5', afrikaans: 'klein', english: 'small (adjective)', pronunciation: 'Klayn', category: 'Adjectives', emoji: '🐭', exampleSentenceAf: '\'n Muis is baie klein.', exampleSentenceEn: 'A mouse is very small.' },
      { id: 'v9-6', afrikaans: 'vinnig', english: 'fast (adjective)', pronunciation: 'Fuh-nukh', category: 'Adjectives', emoji: '⚡', exampleSentenceAf: 'Die jagluiperd is vinnig.', exampleSentenceEn: 'The cheetah is fast.' }
    ],
    questions: [
      {
        id: 'q9-1',
        level: 'easy',
        type: 'multiple-choice',
        promptAf: 'Watter woord is \'n werkwoord (verb/doing word)?',
        promptEn: 'Which word is a verb (doing word)?',
        options: ['tafel', 'blou', 'swem', 'stoel'],
        correctAnswer: 'swem',
        hint: 'Which word describes an action you can do in water?',
        explanationEn: '"Swem" (swim) is a verb because it is an action you can perform.',
        explanationAf: 'Swem is \'n doewoord (werkwoord).'
      },
      {
        id: 'q9-2',
        level: 'medium',
        type: 'multiple-choice',
        promptAf: 'In die sin "Die vinnige hond vang die bal", wat is "vinnige"?',
        promptEn: 'In the sentence "Die vinnige hond vang die bal", what is "vinnige"?',
        options: ['Selfstandige naamwoord', 'Werkwoord', 'Byvoeglike naamwoord', 'Voornaamwoord'],
        correctAnswer: 'Byvoeglike naamwoord',
        hint: 'It describes HOW the dog is (fast).',
        explanationEn: '"Vinnige" describes the dog (hond), so it is an adjective (byvoeglike naamwoord).',
        explanationAf: 'Vinnige beskryf die hond, so dit is \'n byvoeglike naamwoord.'
      },
      {
        id: 'q9-3',
        level: 'challenge',
        type: 'fill-blank',
        promptAf: 'Voltooi met die regte byvoeglike naamwoord: "\'n Muis is ________, maar \'n olifant is ________."',
        promptEn: 'Complete with the right adjectives: "A mouse is ________, but an elephant is ________."',
        options: ['klein, groot', 'groot, klein', 'blou, rooi', 'vinnig, vinnig'],
        correctAnswer: 'klein, groot',
        hint: 'Mouse = small (klein), Elephant = big (groot).',
        explanationEn: '\'n Muis is klein (small), en \'n olifant is groot (big).',
        explanationAf: 'Muis is klein en olifant is groot.'
      }
    ]
  },

  // --- TOPIC 10 ---
  {
    id: 'topic-10-plurals-and-diminutives',
    topicNumber: 10,
    titleAf: 'Meervoude en Verkleinwoorde',
    titleEn: 'Plurals & Diminutives',
    term: 3,
    category: 'Grammatika',
    icon: '🔍',
    color: 'from-amber-400 to-green-500',
    capsTopic: 'Taalstrukture: Meervoude (-e, -s, -te) en Verkleinings (-ie, -tjie, -jie, -pie, -kie)',
    summaryEn: 'Turn one thing into many (Plurals / Meervoude) and make big things cute and tiny (Diminutives / Verkleinwoorde)!',
    ollieTip: {
      english: "Here is Ollie's magic trick! Plural means MORE THAN ONE. Most words add '-e' (hond -> honde). Short vowels with twin consonants double up: kat -> katte! Diminutives make things little and cute, like boom -> boompie!",
      afrikaans: "Een kat, twee katte! Een hond, \'n klein hondjie! Leer die maklike reëls saam met my."
    },
    explanationBlocks: [
      {
        headingEn: 'Plurals: Making More Than One (Meervoude)',
        headingAf: 'Meervoude (Meer as een)',
        contentEn: 'Rules for Grade 4 CAPS plurals:',
        contentAf: 'Hoe om woorde meer as een te maak.',
        examples: [
          { afrikaans: 'Gewone woorde: hond -> honde, boek -> boeke', english: 'Just add -e' },
          { afrikaans: 'Kort klinker (Short vowel doubles consonant): kat -> katte, vis -> visse, pen -> penne', english: 'Double the consonant + e' },
          { afrikaans: 'Lang klinker (Long vowel loses one twin): boom -> bome, been -> bene, muur -> mure', english: 'Twin vowel loses one + e' },
          { afrikaans: 'Familielede & diere wat op -er/-el/-en eindig kry -s: maats, tafels, oumas, broers', english: 'Words ending in -el, -er, -en get -s' }
        ]
      },
      {
        headingEn: 'Diminutives: Making Things Small (Verkleinwoorde)',
        headingAf: 'Verkleinwoorde (Maak dit klein en oulik)',
        contentEn: 'In Afrikaans, we add special little tails to show something is small, cute, or young:',
        contentAf: 'Om te wys dat iets klein of jonk is.',
        examples: [
          { afrikaans: 'Woorde wat eindig op -d of -t kry -jie: hond -> hondjie, kat -> katjie', english: 'Ends in d or t -> adds -jie' },
          { afrikaans: 'Gewone woorde kry -ie: vis -> vissie, perd -> perdjie', english: 'Short words add -ie or -jie' },
          { afrikaans: 'Woorde wat eindig op -m kry -pie: boom -> boompie, arm -> armpie', english: 'Ends in m -> adds -pie' },
          { afrikaans: 'Woorde wat eindig op klinkers kry -tjie: koei -> koeitjie, ma -> maatjie', english: 'Ends in vowel -> adds -tjie' }
        ]
      }
    ],
    vocabulary: [
      { id: 'v10-1', afrikaans: 'hond -> honde', english: 'dog -> dogs', pronunciation: 'Hohnt -> Hohn-duh', category: 'Plurals', emoji: '🐕🐕', exampleSentenceAf: 'Daar is twee honde in die tuin.', exampleSentenceEn: 'There are two dogs in the garden.' },
      { id: 'v10-2', afrikaans: 'kat -> katte', english: 'cat -> cats', pronunciation: 'Cut -> Cut-tuh', category: 'Plurals', emoji: '🐱🐱', exampleSentenceAf: 'Drie katte drink melk.', exampleSentenceEn: 'Three cats drink milk.' },
      { id: 'v10-3', afrikaans: 'boom -> bome', english: 'tree -> trees', pronunciation: 'Boom -> Boo-muh', category: 'Plurals', emoji: '🌳🌳', exampleSentenceAf: 'Die bome is groen.', exampleSentenceEn: 'The trees are green.' },
      { id: 'v10-4', afrikaans: 'hondjie', english: 'puppy / little dog', pronunciation: 'Hohnt-yee', category: 'Diminutives', emoji: '🐶', exampleSentenceAf: 'Die hondjie speel lekker.', exampleSentenceEn: 'The puppy plays nicely.' },
      { id: 'v10-5', afrikaans: 'boompie', english: 'little tree / sapling', pronunciation: 'Boom-pee', category: 'Diminutives', emoji: '🌱', exampleSentenceAf: 'Ek plant \'n klein boompie.', exampleSentenceEn: 'I plant a little tree.' },
      { id: 'v10-6', afrikaans: 'katjie', english: 'kitten / little cat', pronunciation: 'Cut-yee', category: 'Diminutives', emoji: '🐱', exampleSentenceAf: 'Die katjie spin saggies.', exampleSentenceEn: 'The kitten purrs softly.' }
    ],
    questions: [
      {
        id: 'q10-1',
        level: 'easy',
        type: 'multiple-choice',
        promptAf: 'Wat is die meervoud van "hond"?',
        promptEn: 'What is the plural of "hond" (dog)?',
        options: ['honds', 'honde', 'hondte', 'hondies'],
        correctAnswer: 'honde',
        hint: 'Most standard words simply add an "-e" at the end.',
        explanationEn: 'In Afrikaans, hond + e = honde (dogs).',
        explanationAf: 'Hond kry \'n -e in die meervoud: honde.'
      },
      {
        id: 'q10-2',
        level: 'medium',
        type: 'multiple-choice',
        promptAf: 'Wat is die meervoud van "kat"? (Kyk na die kort klinker!)',
        promptEn: 'What is the plural of "kat"? (Watch the short vowel rule!)',
        options: ['kate', 'katte', 'kats', 'katens'],
        correctAnswer: 'katte',
        hint: 'Short vowel "a" means the "t" doubles!',
        explanationEn: 'Because "a" in "kat" is a short vowel, the consonant doubles: katte!',
        explanationAf: 'Kort klinker reël: verdubbel die konsonant (k-a-t-t-e).'
      },
      {
        id: 'q10-3',
        level: 'medium',
        type: 'fill-blank',
        promptAf: 'Wat is die verkleinwoord van "boom"? \'n Klein ________.',
        promptEn: 'What is the diminutive of "boom" (tree)? A small ________.',
        options: ['boompie', 'boomtjie', 'boomie', 'boomkie'],
        correctAnswer: 'boompie',
        hint: 'Words ending in "m" get -pie!',
        explanationEn: 'Words ending in "m" take "-pie": boom -> boompie, arm -> armpie.',
        explanationAf: 'Woorde wat op m eindig kry -pie: boompie.'
      },
      {
        id: 'q10-4',
        level: 'challenge',
        type: 'multiple-choice',
        promptAf: 'Wat is die meervoud van "boom"?',
        promptEn: 'What is the plural of "boom"?',
        options: ['boome', 'bome', 'booms', 'boomte'],
        correctAnswer: 'bome',
        hint: 'Long twin vowels lose one "o" when adding -e!',
        explanationEn: 'Twin vowel rule: "oo" drops one "o" when adding "-e": boom -> bome!',
        explanationAf: 'Lang klinker verloor een vokaal: boom word bome.'
      }
    ]
  },

  // --- TOPIC 11 ---
  {
    id: 'topic-11-tenses',
    topicNumber: 11,
    titleAf: 'Tye: Teenwoordige, Verlede en Toekomende Tyd',
    titleEn: 'Tenses: Present, Past & Future',
    term: 3,
    category: 'Grammatika',
    icon: '⏳',
    color: 'from-violet-500 to-purple-600',
    capsTopic: 'Taalstrukture: Tydsvorme - Teenwoordige tyd (nou), Verlede tyd (het...ge-), Toekomende tyd (sal...)',
    summaryEn: 'Travel through time! Learn what is happening right now, what happened in the past (het ge-), and what will happen in the future (sal)!',
    ollieTip: {
      english: "Time travel is so easy in Afrikaans! Past tense: Put 'het' where Verb 1 was, and kick the main verb to the end with a 'ge-' in front of it! Future tense: Replace Verb 1 with 'sal' and kick the verb to the very end!",
      afrikaans: "Gister HET ek GEhardloop. Môre SAL ek hardloop! Onthou die twee goue geheime!"
    },
    explanationBlocks: [
      {
        headingEn: 'Present Tense (Teenwoordige Tyd - Dit gebeur NOU)',
        headingAf: 'Teenwoordige Tyd (Nou)',
        contentEn: 'Happening right now in front of you:',
        contentAf: 'Aksies wat vandag of nou plaasvind.',
        examples: [
          { afrikaans: 'Die seun speel sokker.', english: 'The boy plays soccer.' },
          { afrikaans: 'Ollie lees \'n boek.', english: 'Ollie reads a book.' }
        ]
      },
      {
        headingEn: 'Past Tense (Verlede Tyd - Gister / Dit het reeds gebeur)',
        headingAf: 'Verlede Tyd (Gister: HET + GE-)',
        contentEn: 'Step 1: Put "het" in position 2. Step 2: Put "ge-" on the verb and move it to the END of the sentence!',
        contentAf: 'Die formule: Subjek + HET + res van sin + GE-werkwoord.',
        examples: [
          { afrikaans: 'Die seun HET sokker GEspeel.', english: 'The boy played soccer.', note: 'speel -> het gespeel' },
          { afrikaans: 'Ollie HET \'n boek GElees.', english: 'Ollie read a book.', note: 'lees -> het gelees' },
          { afrikaans: 'Uitsondering: "is" word "was" (Die seun WAS siek).', english: 'Exception: "is" becomes "was"' }
        ]
      },
      {
        headingEn: 'Future Tense (Toekomende Tyd - Môre: SAL + werkwoord)',
        headingAf: 'Toekomende Tyd (Môre: SAL)',
        contentEn: 'Step 1: Put "sal" in position 2. Step 2: Move the plain verb to the END of the sentence (no "ge-"!).',
        contentAf: 'Die formule: Subjek + SAL + res van sin + werkwoord heel aan die einde.',
        examples: [
          { afrikaans: 'Die seun SAL môre sokker speel.', english: 'The boy will play soccer tomorrow.' },
          { afrikaans: 'Ollie SAL die boek lees.', english: 'Ollie will read the book.' }
        ]
      }
    ],
    vocabulary: [
      { id: 'v11-1', afrikaans: 'nou / vandag', english: 'now / today', pronunciation: 'Noh / Fun-dukh', category: 'Time', emoji: '⏰', exampleSentenceAf: 'Ons leer nou Afrikaans.', exampleSentenceEn: 'We are learning Afrikaans now.' },
      { id: 'v11-2', afrikaans: 'gister', english: 'yesterday (past)', pronunciation: 'Khis-tuhr', category: 'Time', emoji: '⏪', exampleSentenceAf: 'Gister het dit gereën.', exampleSentenceEn: 'Yesterday it rained.' },
      { id: 'v11-3', afrikaans: 'môre', english: 'tomorrow (future)', pronunciation: 'Mor-ruh', category: 'Time', emoji: '⏩', exampleSentenceAf: 'Môre sal ons swem.', exampleSentenceEn: 'Tomorrow we will swim.' },
      { id: 'v11-4', afrikaans: 'het geëet', english: 'ate / have eaten', pronunciation: 'Het khuh-eet', category: 'Past Verbs', emoji: '🍽️', exampleSentenceAf: 'Ek het \'n appel geëet.', exampleSentenceEn: 'I ate an apple.' },
      { id: 'v11-5', afrikaans: 'sal speel', english: 'will play', pronunciation: 'Sul speel', category: 'Future Verbs', emoji: '⚽', exampleSentenceAf: 'Ons sal môre speel.', exampleSentenceEn: 'We will play tomorrow.' }
    ],
    questions: [
      {
        id: 'q11-1',
        level: 'easy',
        type: 'multiple-choice',
        promptAf: 'Verander na die verlede tyd (Past tense): "Die hond blaf."',
        promptEn: 'Change to past tense: "The dog barks."',
        options: [
          'Die hond het geblaf.',
          'Die hond sal blaf.',
          'Die hond was blaf.',
          'Die hond is geblaf.'
        ],
        correctAnswer: 'Die hond het geblaf.',
        hint: 'Use "het" + "geblaf"!',
        explanationEn: 'In past tense: blaf -> het geblaf (The dog barked).',
        explanationAf: 'Verlede tyd gebruik HET + GE-blaf.'
      },
      {
        id: 'q11-2',
        level: 'medium',
        type: 'multiple-choice',
        promptAf: 'Verander na toekomende tyd (Future tense): "Sipho drink water."',
        promptEn: 'Change to future tense: "Sipho drinks water."',
        options: [
          'Sipho sal water drink.',
          'Sipho het water gedrink.',
          'Sipho was water drink.',
          'Sipho drink sal water.'
        ],
        correctAnswer: 'Sipho sal water drink.',
        hint: 'Future tense uses "sal" + the verb at the very end.',
        explanationEn: '"Sipho sal water drink" = Sipho will drink water. Notice drink goes to the end!',
        explanationAf: 'Toekomende tyd gebruik SAL en die werkwoord skuif na die einde.'
      },
      {
        id: 'q11-3',
        level: 'challenge',
        type: 'fill-blank',
        promptAf: 'Gister ________ die meisie \'n mooi prentjie ________.',
        promptEn: 'Yesterday the girl ________ a pretty picture ________. (drew)',
        options: ['het, geteken', 'sal, teken', 'is, teken', 'was, geteken'],
        correctAnswer: 'het, geteken',
        hint: 'Past tense pair: "het" and "ge-" prefix.',
        explanationEn: '"Gister het die meisie \'n mooi prentjie geteken" (Yesterday the girl drew a pretty picture).',
        explanationAf: 'Gister dui op verlede tyd: HET ... GETEKEN.'
      }
    ]
  },

  // --- TOPIC 12 ---
  {
    id: 'topic-12-negatives-and-questions',
    topicNumber: 12,
    titleAf: 'Ontkenning en Vraagwoorde',
    titleEn: 'Negatives (Nie...nie) & Question Words',
    term: 3,
    category: 'Grammatika',
    icon: '❓',
    color: 'from-rose-500 to-red-600',
    capsTopic: 'Taalstrukture: Ontkennende vorm (Dubbele nie) en Vraagwoorde (Wie, Wat, Waar, Wanneer, Waarom, Hoe)',
    summaryEn: 'Say NO like a pro with the famous double "nie...nie" and ask great questions with Who, What, Where, When, Why, and How!',
    ollieTip: {
      english: "Afrikaans has a very special habit: it loves to say 'nie' TWICE! One 'nie' after the verb, and another 'nie' at the very end of the sentence: 'Ek hou NIE van spinasie NIE!' And question words all start with W or H!",
      afrikaans: "Die dubbele 'nie...nie' is uniek aan Afrikaans! Wie? Wat? Waar? Vra vir Ollie as jy wonder!"
    },
    explanationBlocks: [
      {
        headingEn: 'The Double "Nie...Nie" Rule (Ontkenning)',
        headingAf: 'Die Dubbele Nie-reël',
        contentEn: 'To make a sentence negative (saying "not" or "does not"), you usually need TWO "nie"s in Afrikaans!',
        contentAf: 'Ons gebruik twee keer \'nie\' om \'n sin negatief te maak.',
        examples: [
          { afrikaans: 'Positief: Die hond slaap.', english: 'The dog sleeps.' },
          { afrikaans: 'Negatief: Die hond slaap NIE.', english: 'The dog does not sleep (one word sentence ends with nie).' },
          { afrikaans: 'Positief: Ek eet die groen appel.', english: 'I eat the green apple.' },
          { afrikaans: 'Negatief: Ek eet NIE die groen appel NIE.', english: 'I do NOT eat the green apple.' },
          { afrikaans: 'Bevel: Moenie hardloop nie!', english: 'Don\'t run! (Moenie = Moet nie)' }
        ]
      },
      {
        headingEn: 'The Big 6 Question Words (Die Vraagwoorde)',
        headingAf: 'Die Belangrike Vraagwoorde',
        contentEn: 'Every detective and learner needs these words to ask questions:',
        contentAf: 'Gebruik hierdie woorde om vrae te vra.',
        examples: [
          { afrikaans: 'Wie?', english: 'Who? (Wie is jou juffrou?)' },
          { afrikaans: 'Wat?', english: 'What? (Wat doen jy?)' },
          { afrikaans: 'Waar?', english: 'Where? (Waar is my tas?)' },
          { afrikaans: 'Wanneer?', english: 'When? (Wanneer begin die klas?)' },
          { afrikaans: 'Waarom / Hoekom?', english: 'Why? (Hoekom huil die baba?)' },
          { afrikaans: 'Hoe?', english: 'How? (Hoe gaan dit met jou?)' }
        ]
      }
    ],
    vocabulary: [
      { id: 'v12-1', afrikaans: 'nie ... nie', english: 'not ... not (double negative)', pronunciation: 'Nee ... nee', category: 'Negation', emoji: '🙅', exampleSentenceAf: 'Ek weet nie die antwoord nie.', exampleSentenceEn: 'I do not know the answer.' },
      { id: 'v12-2', afrikaans: 'moenie ... nie', english: 'do not ... (instruction)', pronunciation: 'Moo-nee ... nee', category: 'Negation', emoji: '⛔', exampleSentenceAf: 'Moenie op die bank staan nie!', exampleSentenceEn: 'Don\'t stand on the desk!' },
      { id: 'v12-3', afrikaans: 'Wie', english: 'Who', pronunciation: 'Vee', category: 'Questions', emoji: '👤', exampleSentenceAf: 'Wie het my potlood?', exampleSentenceEn: 'Who has my pencil?' },
      { id: 'v12-4', afrikaans: 'Wat', english: 'What', pronunciation: 'Vut', category: 'Questions', emoji: '❓', exampleSentenceAf: 'Wat eet jy vir middagete?', exampleSentenceEn: 'What are you eating for lunch?' },
      { id: 'v12-5', afrikaans: 'Waar', english: 'Where', pronunciation: 'Vahr', category: 'Questions', emoji: '🗺️', exampleSentenceAf: 'Waar is die badkamer?', exampleSentenceEn: 'Where is the bathroom?' },
      { id: 'v12-6', afrikaans: 'Wanneer', english: 'When', pronunciation: 'Vun-neer', category: 'Questions', emoji: '📅', exampleSentenceAf: 'Wanneer is dit pouse?', exampleSentenceEn: 'When is it break time?' },
      { id: 'v12-7', afrikaans: 'Hoekom', english: 'Why', pronunciation: 'Hoo-kohm', category: 'Questions', emoji: '🤔', exampleSentenceAf: 'Hoekom lag jy?', exampleSentenceEn: 'Why are you laughing?' }
    ],
    questions: [
      {
        id: 'q12-1',
        level: 'easy',
        type: 'multiple-choice',
        promptAf: 'Maak hierdie sin ontkennend (negatief): "Ek hou van vis."',
        promptEn: 'Make this sentence negative: "I like fish."',
        options: [
          'Ek hou nie van vis nie.',
          'Ek hou geen van vis.',
          'Ek nie hou van vis.',
          'Ek hou van vis nie.'
        ],
        correctAnswer: 'Ek hou nie van vis nie.',
        hint: 'Remember the double "nie...nie"!',
        explanationEn: 'In Afrikaans we place "nie" after "hou" AND another "nie" at the end: "Ek hou nie van vis nie."',
        explanationAf: 'Korrek! Die dubbele nie omsluit die voorwerpsdeel van die sin.'
      },
      {
        id: 'q12-2',
        level: 'medium',
        type: 'multiple-choice',
        promptAf: 'Watter vraagwoord gebruik jy as jy wil weet WAAR iemand woon?',
        promptEn: 'Which question word do you use when you want to know WHERE someone lives?',
        options: ['Wat', 'Waar', 'Wie', 'Wanneer'],
        correctAnswer: 'Waar',
        hint: 'It sounds very close to where!',
        explanationEn: '"Waar" means Where in Afrikaans. "Waar woon jy?" = Where do you live?',
        explanationAf: 'Waar vra na die plek.'
      },
      {
        id: 'q12-3',
        level: 'challenge',
        type: 'fill-blank',
        promptAf: '"________ kom jy vandag laat by die skool?" - "Want die bus was stukkend."',
        promptEn: '"________ are you late for school today?" - "Because the bus was broken."',
        options: ['Hoekom', 'Wie', 'Waar', 'Wat'],
        correctAnswer: 'Hoekom',
        hint: 'The answer starts with "Want" (Because), so the question asks WHY!',
        explanationEn: '"Hoekom" (or Waarom) asks WHY. When someone answers with "Want...", the question was "Hoekom?".',
        explanationAf: 'Hoekom vra na die rede.'
      }
    ]
  },

  // --- TOPIC 13 ---
  {
    id: 'topic-13-reading-comprehension',
    topicNumber: 13,
    titleAf: 'Leesbegrip (Short Stories & Questions)',
    titleEn: 'Reading Comprehension',
    term: 4,
    category: 'Lees',
    icon: '📖',
    color: 'from-amber-500 to-emerald-600',
    capsTopic: 'Lees en kyk: Lees van verhalende en inligtingstekste met begripstoetsvrae',
    summaryEn: 'Read a cute Grade 4 adventure story, learn new words from the story glossary, and answer comprehension questions like a champ!',
    ollieTip: {
      english: "Reading comprehension (Leesbegrip) is like solving a puzzle! Read the story twice, look at the pictures, check the glossary for tricky words, and find the answers hiding right in the text!",
      afrikaans: "Lees die storie mooi deur. Die antwoorde kruip in die paragrawe weg!"
    },
    explanationBlocks: [
      {
        headingEn: 'Top Tips for Reading in Afrikaans (Leeswenke)',
        headingAf: 'Leeswenke vir Graad 4',
        contentEn: 'How to score top marks in comprehension tests:',
        contentAf: 'Hoe om volpunte in \'n begripstoets te behaal.',
        examples: [
          { afrikaans: '1. Lees die titel: Dit sê waaroor die storie gaan.', english: 'Read the title: It tells you what the story is about.' },
          { afrikaans: '2. Lees die vrae eers: Dan weet jy waarna om te soek.', english: 'Read the questions first so you know what clues to look for!' },
          { afrikaans: '3. Kyk na die vraagwoorde: Wie? Waar? Wanneer?', english: 'Spot the question words (Who, Where, When).' },
          { afrikaans: '4. Skryf in volsinne as dit gevra word.', english: 'Answer in full sentences when requested.' }
        ]
      }
    ],
    vocabulary: [
      { id: 'v13-1', afrikaans: 'titel', english: 'title', pronunciation: 'Tee-tuhl', category: 'Reading', emoji: '🏷️', exampleSentenceAf: 'Die titel van die storie is bo-aan.', exampleSentenceEn: 'The title of the story is at the top.' },
      { id: 'v13-2', afrikaans: 'hoofkarakter', english: 'main character', pronunciation: 'Hoof-kuh-ruk-tuhr', category: 'Reading', emoji: '🦸', exampleSentenceAf: 'Bongi is die hoofkarakter.', exampleSentenceEn: 'Bongi is the main character.' },
      { id: 'v13-3', afrikaans: 'paragraaf', english: 'paragraph', pronunciation: 'Puh-ruh-khrahf', category: 'Reading', emoji: '📄', exampleSentenceAf: 'Kyk in paragraaf twee vir die antwoord.', exampleSentenceEn: 'Look in paragraph two for the answer.' },
      { id: 'v13-4', afrikaans: 'begrip', english: 'understanding / comprehension', pronunciation: 'Buh-khrup', category: 'Reading', emoji: '💡', exampleSentenceAf: 'Leesbegrip toets wat jy verstaan.', exampleSentenceEn: 'Reading comprehension tests what you understand.' }
    ],
    questions: [
      {
        id: 'q13-1',
        level: 'easy',
        type: 'multiple-choice',
        promptAf: 'Wat noem ons die persoon waaroor \'n storie hoofsaaklik gaan?',
        promptEn: 'What do we call the person the story is mainly about?',
        options: ['die skrywer', 'die hoofkarakter', 'die titel', 'die illustreerder'],
        correctAnswer: 'die hoofkarakter',
        hint: 'Main character in Afrikaans starts with "hoof...".',
        explanationEn: '"Die hoofkarakter" means the main character of a story.',
        explanationAf: 'Die storie handel oor die hoofkarakter.'
      },
      {
        id: 'q13-2',
        level: 'medium',
        type: 'multiple-choice',
        promptAf: 'Lees die kort sin: "Kagiso speel sokker in die reën en word baie nat." Waarom is Kagiso nat?',
        promptEn: 'Read the short sentence: "Kagiso plays soccer in the rain and gets very wet." Why is Kagiso wet?',
        options: ['Hy het in die swembad gespring', 'Hy speel in die reën', 'Hy drink te veel water', 'Hy was sy hande'],
        correctAnswer: 'Hy speel in die reën',
        hint: 'Look at the sentence: "speel sokker in die reën".',
        explanationEn: 'The sentence says Kagiso plays soccer in the rain ("in die reën"), which made him wet.',
        explanationAf: 'Hy het in die reën sokker gespeel.'
      },
      {
        id: 'q13-3',
        level: 'challenge',
        type: 'multiple-choice',
        promptAf: 'Wat moet jy eerste doen voor jy die vrae van \'n begripstoets beantwoord?',
        promptEn: 'What should you do before answering comprehension questions?',
        options: [
          'Lees die storie aandagtig deur',
          'Teken \'n prentjie op die toets',
          'Raai die antwoorde sonder om te lees',
          'Los al die vrae oop'
        ],
        correctAnswer: 'Lees die storie aandagtig deur',
        hint: 'Always read the story carefully first!',
        explanationEn: 'Always read the story carefully first so you understand what happened.',
        explanationAf: 'Lees die storie altyd deeglik voor jy vrae beantwoord.'
      }
    ]
  },

  // --- TOPIC 14 ---
  {
    id: 'topic-14-spelling-and-sounds',
    topicNumber: 14,
    titleAf: 'Spelling, Klinkers en Klanke',
    titleEn: 'Spelling, Vowels & Sound Rules',
    term: 4,
    category: 'Woordeskat',
    icon: '🔤',
    color: 'from-fuchsia-500 to-pink-500',
    capsTopic: 'Taalstrukture en konvensies: Klinkers (a, e, i, o, u), dubbelklinkers (aa, ee, oo, uu) en tweeklanke (ou, ui, ei, y)',
    summaryEn: 'Crack the Afrikaans spelling code! Learn the difference between short vowels, twin vowels (aa, ee, oo, uu), and diphthongs (ou, ui, ei)!',
    ollieTip: {
      english: "Afrikaans spelling is phonetic, which means words are spelled almost exactly as they sound! Once you know the vowel sounds—like 'ui' (sounds like 'ay') and 'oo' (sounds like 'oar')—you can spell anything!",
      afrikaans: "Klanke is die boustene van Afrikaans! Luister na die klank en skryf dit neer!"
    },
    explanationBlocks: [
      {
        headingEn: 'Single Short Vowels (Kort Klinkers)',
        headingAf: 'Kort Klinkers (a, e, i, o, u)',
        contentEn: 'Short, sharp sounds in single syllable words:',
        contentAf: 'Kort klanke wat vinnig uitgespreek word.',
        examples: [
          { afrikaans: 'a: kat, mat, sap', english: 'short "a" like cup' },
          { afrikaans: 'e: pen, bed, mes', english: 'short "e" like pet' },
          { afrikaans: 'i: vis, sit, wind', english: 'short "i" like hit' },
          { afrikaans: 'o: hond, pot, dop', english: 'short "o" like pot' },
          { afrikaans: 'u: bus, lug, mus', english: 'short "u" like foot' }
        ]
      },
      {
        headingEn: 'Twin Long Vowels (Dubbelklinkers: aa, ee, oo, uu)',
        headingAf: 'Dubbelklinkers (aa, ee, oo, uu)',
        contentEn: 'Two twin vowels holding hands make a long, strong sound:',
        contentAf: 'Twee klinkers langs mekaar.',
        examples: [
          { afrikaans: 'aa: maan, haas, raak', english: 'long "aa" like car' },
          { afrikaans: 'ee: been, been, eet', english: 'long "ee" like ear' },
          { afrikaans: 'oo: boom, boot, oog', english: 'long "oo" like core' },
          { afrikaans: 'uu: vuur, muur, suur', english: 'long "uu" like pure' }
        ]
      },
      {
        headingEn: 'Diphthongs / Double Sounds (Tweeklanke: ou, ui, ei, y)',
        headingAf: 'Tweeklanke (Twee klanke gly saam)',
        contentEn: 'When two different vowels blend together:',
        contentAf: 'Klanke wat in mekaar gly.',
        examples: [
          { afrikaans: 'ou: koud, vrou, blou', english: 'sounds like "oh" in boat' },
          { afrikaans: 'ui: huis, muis, tuin', english: 'unique Afrikaans sound' },
          { afrikaans: 'ei / y: trein, reis / rys, ys', english: 'sound identical in Afrikaans!' }
        ]
      }
    ],
    vocabulary: [
      { id: 'v14-1', afrikaans: 'huis', english: 'house', pronunciation: 'Hays', category: 'Sounds', emoji: '🏠', exampleSentenceAf: 'Ons woon in \'n mooi huis.', exampleSentenceEn: 'We live in a pretty house.' },
      { id: 'v14-2', afrikaans: 'muis', english: 'mouse', pronunciation: 'Mays', category: 'Sounds', emoji: '🐭', exampleSentenceAf: 'Die klein muis eet kaas.', exampleSentenceEn: 'The little mouse eats cheese.' },
      { id: 'v14-3', afrikaans: 'vuur', english: 'fire', pronunciation: 'Feer', category: 'Sounds', emoji: '🔥', exampleSentenceAf: 'Die vuur brand warm by die braai.', exampleSentenceEn: 'The fire burns hot at the braai.' },
      { id: 'v14-4', afrikaans: 'trein', english: 'train', pronunciation: 'Trayn', category: 'Sounds', emoji: '🚆', exampleSentenceAf: 'Die trein ry op die spoor.', exampleSentenceEn: 'The train rides on the track.' },
      { id: 'v14-5', afrikaans: 'blou', english: 'blue', pronunciation: 'Blow', category: 'Sounds', emoji: '🔷', exampleSentenceAf: 'Die lug is mooi blou.', exampleSentenceEn: 'The sky is beautifully blue.' }
    ],
    questions: [
      {
        id: 'q14-1',
        level: 'easy',
        type: 'multiple-choice',
        promptAf: 'Watter woord bevat die "ui"-klank?',
        promptEn: 'Which word contains the "ui" sound?',
        options: ['huis', 'hond', 'maan', 'trein'],
        correctAnswer: 'huis',
        hint: 'Look for the letters "u" and "i" together.',
        explanationEn: '"Huis" (house) contains the "ui" diphthong.',
        explanationAf: 'Huis het die tweeklank ui.'
      },
      {
        id: 'q14-2',
        level: 'medium',
        type: 'multiple-choice',
        promptAf: 'Kies die korrek gespelde Afrikaanse woord vir "train":',
        promptEn: 'Choose the correctly spelled Afrikaans word for "train":',
        options: ['trein', 'train', 'tryn', 'trayn'],
        correctAnswer: 'trein',
        hint: 'In Afrikaans it is spelled with "ei".',
        explanationEn: 'In Afrikaans, train is spelled "trein" with "ei".',
        explanationAf: 'Trein word met \'n ei geskryf.'
      },
      {
        id: 'q14-3',
        level: 'challenge',
        type: 'fill-blank',
        promptAf: 'Kies die regte spelling: "In die nag skyn die helder ________." (moon)',
        promptEn: 'Choose the correct spelling: "In die nag skyn die helder ________." (moon)',
        options: ['maan', 'man', 'mahn', 'mane'],
        correctAnswer: 'maan',
        hint: 'Moon has a twin long vowel "aa".',
        explanationEn: '"Maan" is the moon. "Man" means a male adult.',
        explanationAf: 'Maan het die dubbelklinker aa.'
      }
    ]
  },

  // --- TOPIC 15 ---
  {
    id: 'topic-15-creative-writing-paragraphs',
    topicNumber: 15,
    titleAf: 'Kort Paragrawe en Kreatiewe Skryfwerk',
    titleEn: 'Short Paragraphs & Creative Writing',
    term: 4,
    category: 'Skryf',
    icon: '✍️',
    color: 'from-amber-500 to-rose-600',
    capsTopic: 'Skryf en aanbied: Skryf van eenvoudige paragrawe (3-5 sinne) met hoofletters en leestekens',
    summaryEn: 'Write your very own Afrikaans paragraph! Learn how to use capital letters, full stops, question marks, and connect sentences with "en", "want", and "maar"!',
    ollieTip: {
      english: "You are now a real Afrikaans author! A good Grade 4 paragraph has 3 to 5 sentences. Always start each sentence with a Hoofletter (Capital letter) and end with a Punt (Full stop). Ollie is so proud of you!",
      afrikaans: "Jy kan nou jou eie paragraaf skryf! Begin met \'n hoofletter en eindig met \'n punt!"
    },
    explanationBlocks: [
      {
        headingEn: 'Punctuation Marks (Leestekens)',
        headingAf: 'Leestekens vir Graad 4',
        contentEn: 'Punctuation marks are like traffic signs for your reader:',
        contentAf: 'Leestekens help ons om sinne reg te lees.',
        examples: [
          { afrikaans: 'Hoofletter (A, B, C)', english: 'Capital letter at the start of every sentence & for names' },
          { afrikaans: 'Punt (.)', english: 'Full stop at the end of a telling sentence' },
          { afrikaans: 'Vraagteken (?)', english: 'Question mark when asking a question' },
          { afrikaans: 'Uitroepteken (!)', english: 'Exclamation mark when shouting or warning' },
          { afrikaans: 'Komma (,)', english: 'Comma for taking a small breath or listing items' }
        ]
      },
      {
        headingEn: 'How to Build a Paragraph: "My Troeteldier" (My Pet)',
        headingAf: 'Voorbeeldparagraaf: My Troeteldier',
        contentEn: 'Look how easy it is to write 4 sentences about a pet:',
        contentAf: '\'n Eenvoudige paragraaf van 4 sinne.',
        examples: [
          { afrikaans: 'Sin 1 (Wie is dit?): Ek het \'n oulike hond met die naam Bruno.', english: 'Sentence 1: I have a cute dog named Bruno.' },
          { afrikaans: 'Sin 2 (Hoe lyk hy?): Bruno het sagte bruin ore en \'n kort stertjie.', english: 'Sentence 2: Bruno has soft brown ears and a short tail.' },
          { afrikaans: 'Sin 3 (Wat doen hy?): Hy hardloop elke middag agter sy bal aan.', english: 'Sentence 3: He runs after his ball every afternoon.' },
          { afrikaans: 'Sin 4 (Hoe voel jy?): Ek is baie lief vir my hond.', english: 'Sentence 4: I love my dog very much.' }
        ]
      }
    ],
    vocabulary: [
      { id: 'v15-1', afrikaans: 'hoofletter', english: 'capital letter', pronunciation: 'Hoof-leht-tuhr', category: 'Writing', emoji: '🔠', exampleSentenceAf: 'Begin elke sin met \'n hoofletter.', exampleSentenceEn: 'Start every sentence with a capital letter.' },
      { id: 'v15-2', afrikaans: 'punt', english: 'full stop', pronunciation: 'Puhnt', category: 'Writing', emoji: '⏺️', exampleSentenceAf: 'Sit \'n punt aan die einde van die sin.', exampleSentenceEn: 'Put a full stop at the end of the sentence.' },
      { id: 'v15-3', afrikaans: 'vraagteken', english: 'question mark', pronunciation: 'Frahkh-tee-kuhn', category: 'Writing', emoji: '❓', exampleSentenceAf: '\'n Vraag eindig met \'n vraagteken.', exampleSentenceEn: 'A question ends with a question mark.' },
      { id: 'v15-4', afrikaans: 'paragraaf', english: 'paragraph', pronunciation: 'Puh-ruh-khrahf', category: 'Writing', emoji: '📝', exampleSentenceAf: 'Skryf vier sinne in jou paragraaf.', exampleSentenceEn: 'Write four sentences in your paragraph.' },
      { id: 'v15-5', afrikaans: 'leestekens', english: 'punctuation', pronunciation: 'Lees-tee-kuhns', category: 'Writing', emoji: '✍️', exampleSentenceAf: 'Gebruik die regte leestekens.', exampleSentenceEn: 'Use the correct punctuation.' }
    ],
    questions: [
      {
        id: 'q15-1',
        level: 'easy',
        type: 'multiple-choice',
        promptAf: 'Watter leesteken hoort aan die einde van hierdie sin: "Waar is my skooltas"',
        promptEn: 'Which punctuation mark belongs at the end of this sentence: "Waar is my skooltas"',
        options: ['Punt (.)', 'Vraagteken (?)', 'Uitroepteken (!)', 'Komma (,)'],
        correctAnswer: 'Vraagteken (?)',
        hint: '"Waar is my skooltas" is asking a question!',
        explanationEn: 'Because "Waar" is a question word, the sentence must end with a question mark (?).',
        explanationAf: 'Dit is \'n vraag, so dit kort \'n vraagteken (?).'
      },
      {
        id: 'q15-2',
        level: 'medium',
        type: 'multiple-choice',
        promptAf: 'Watter sin is KORREK geskryf met hoofletters en leestekens?',
        promptEn: 'Which sentence is written CORRECTLY with capital letters and punctuation?',
        options: [
          'die hond blaf',
          'Die hond blaf.',
          'die Hond blaf?',
          'DIE HOND BLAF,'
        ],
        correctAnswer: 'Die hond blaf.',
        hint: 'Look for capital letter at the beginning and a full stop at the end.',
        explanationEn: '"Die hond blaf." starts with a capital letter "D" and ends with a full stop ".".',
        explanationAf: 'Begin met \'n hoofletter en eindig met \'n punt.'
      },
      {
        id: 'q15-3',
        level: 'challenge',
        type: 'multiple-choice',
        promptAf: 'Wat is die beste slot-sin (closing sentence) vir \'n paragraaf oor "My Skool"?',
        promptEn: 'What is the best closing sentence for a paragraph about "My School"?',
        options: [
          'Ek hou baie van my skool en my maats.',
          'Gister het ek vis geëet.',
          'Die hond slaap onder die boom.',
          'Wat is jou naam?'
        ],
        correctAnswer: 'Ek hou baie van my skool en my maats.',
        hint: 'It should express feelings about school!',
        explanationEn: '"Ek hou baie van my skool en my maats" wraps up the topic nicely.',
        explanationAf: 'Hierdie sin pas perfek by die tema van \'n skool.'
      }
    ]
  }
];
