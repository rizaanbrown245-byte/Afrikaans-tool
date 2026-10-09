import { ReadingPassage } from '../types';

export const READING_STORIES: ReadingPassage[] = [
  {
    id: 'story-1-ollie-verlore-hondjie',
    titleAf: 'Ollie en die Verlore Hondjie',
    titleEn: 'Ollie & the Lost Puppy',
    wordCount: 145,
    storyAf: `Dit is 'n warm Saterdagoggend in die Karoo. Ollie die wyse uil sit hoog in 'n groen doringboom.
Skielik hoor hy 'n sagte gehuil onder die bos. Ollie kyk af en sien 'n klein bruin hondjie. Die hondjie se naam is Wagter, maar Wagter is baie bang en dors. Hy het sy pad huis toe verloor.

Ollie vlieg saggies af na die grond. "Moenie bang wees nie," koer Ollie vriendelik. "Ek sal jou help om jou baas te vind."
Ollie bring vir Wagter koel water in 'n skotteltjie. Daarna vlieg Ollie vooruit oor die plaaswerf.
By die groot rooi hek staan 'n seuntjie met die naam Luan. Luan soek al die hele oggend na sy troeteldier.
Toe Wagter vir Luan sien, swaai sy stertjie vinnig en hy hardloop vrolik na hom toe. Luan tel Wagter op en gee vir hom 'n groot drukkie. "Baie dankie, wyse Ollie!" roep Luan bly.`,
    storyEn: `It is a warm Saturday morning in the Karoo. Ollie the wise owl sits high up in a green thorn tree.
Suddenly he hears a soft whimpering under the bush. Ollie looks down and sees a small brown puppy. The puppy's name is Wagter, but Wagter is very scared and thirsty. He lost his way home.

Ollie flies gently down to the ground. "Don't be scared," coos Ollie kindly. "I will help you find your owner."
Ollie brings Wagter cool water in a small dish. Then Ollie flies ahead over the farmyard.
At the big red gate stands a little boy named Luan. Luan has been searching for his pet all morning.
When Wagter sees Luan, his little tail wags fast and he runs happily to him. Luan picks up Wagter and gives him a big hug. "Thank you so much, wise Ollie!" calls Luan happily.`,
    glossary: [
      { af: 'wyse uil', en: 'wise owl', pronunciation: 'Vay-suh ayl' },
      { af: 'verlore', en: 'lost', pronunciation: 'Fuhr-lor-uh' },
      { af: 'gehuil', en: 'whimpering / crying', pronunciation: 'Khuh-hayl' },
      { af: 'stertjie', en: 'little tail (diminutive)', pronunciation: 'Stehr-yee' },
      { af: 'plaaswerf', en: 'farmyard', pronunciation: 'Plahs-vehrf' }
    ],
    totalMarks: 10,
    questions: [
      {
        id: 'sq-1-1',
        questionAf: 'Watter dag van die week speel die storie af?',
        questionEn: 'On which day of the week does the story take place?',
        options: ['Sondagmiddag', 'Saterdagoggend', 'Vrydagaand', 'Maandagoggend'],
        correctAnswer: 'Saterdagoggend',
        marks: 2,
        explanationEn: 'The first sentence says: "Dit is \'n warm Saterdagoggend in die Karoo." (Saturday morning).'
      },
      {
        id: 'sq-1-2',
        questionAf: 'Waar sit Ollie die wyse uil aan die begin?',
        questionEn: 'Where is Ollie the wise owl sitting at the beginning?',
        options: ['In \'n groen doringboom', 'Op die dak van die huis', 'In die rooi trekker', 'Onder die hek'],
        correctAnswer: 'In \'n groen doringboom',
        marks: 2,
        explanationEn: 'Ollie is sitting high up in a green thorn tree ("in \'n groen doringboom").'
      },
      {
        id: 'sq-1-3',
        questionAf: 'Wat is die hondjie se naam?',
        questionEn: 'What is the puppy\'s name?',
        options: ['Bruno', 'Wagter', 'Luan', 'Kruger'],
        correctAnswer: 'Wagter',
        marks: 2,
        explanationEn: 'The story mentions: "Die hondjie se naam is Wagter."'
      },
      {
        id: 'sq-1-4',
        questionAf: 'Wat bring Ollie vir die dors hondjie?',
        questionEn: 'What does Ollie bring for the thirsty puppy?',
        options: ['Warm melk', 'Koel water in \'n skotteltjie', '\'n Groot been', '\'n Sny brood'],
        correctAnswer: 'Koel water in \'n skotteltjie',
        marks: 2,
        explanationEn: 'Ollie brings cool water in a little dish ("koel water in \'n skotteltjie").'
      },
      {
        id: 'sq-1-5',
        questionAf: 'Wie het die hele oggend na Wagter gesoek?',
        questionEn: 'Who had been looking for Wagter all morning?',
        options: ['Luan', 'Die onderwyser', 'Oupa', 'Die bure'],
        correctAnswer: 'Luan',
        marks: 2,
        explanationEn: 'Luan, the little boy at the red gate, was searching for his pet.'
      }
    ]
  },
  {
    id: 'story-2-skoolkonsert',
    titleAf: 'Die Groot Skoolkonsert',
    titleEn: 'The Big School Concert',
    wordCount: 160,
    storyAf: `Vandag is 'n spesiale dag by Laerskool Protea. Dit is die jaarlikse skoolkonsert in die groot saal.
Al die leerders van Graad 4 dra helder kostuums. Amogelang dra 'n geel sonneblomhoed, en Thabo is aangetrek soos 'n vinnige jagluiperd met swart kolle.

Die saal is vol ouers, oumas en oupas. Toe die ligte dof word, begin die musiek speel.
Die kinders sing 'n vrolike Afrikaanse liedjie oor die reënboognasie. Hulle dans en klap hande.
Amogelang vergeet vir een oomblik haar woorde, maar Thabo fluister saggies vir haar: "Jy kan dit doen!"
Sy glimlag en sing dadelik weer kliphard saam.
Aan die einde van die konsert staan al die ouers op en hande klap baie hard. Juffrou Venter vee 'n traan van blydskap van haar wang af. Dit was die beste konsert ooit!`,
    storyEn: `Today is a special day at Protea Primary School. It is the annual school concert in the big hall.
All the Grade 4 learners are wearing bright costumes. Amogelang wears a yellow sunflower hat, and Thabo is dressed like a fast cheetah with black spots.

The hall is full of parents, grandmothers, and grandfathers. When the lights dim, the music begins to play.
The children sing a cheerful Afrikaans song about the rainbow nation. They dance and clap hands.
For a moment Amogelang forgets her words, but Thabo whispers softly to her: "You can do it!"
She smiles and immediately sings loudly along again.
At the end of the concert all the parents stand up and applaud loudly. Teacher Venter wipes a tear of joy from her cheek. It was the best concert ever!`,
    glossary: [
      { af: 'skoolkonsert', en: 'school concert', pronunciation: 'Skool-kohn-sehrt' },
      { af: 'kostuums', en: 'costumes', pronunciation: 'Kahs-tewms' },
      { af: 'jagluiperd', en: 'cheetah', pronunciation: 'Yukh-lay-pehrt' },
      { af: 'saal', en: 'hall', pronunciation: 'Sahl' },
      { af: 'blydskap', en: 'joy / happiness', pronunciation: 'Blayt-skup' }
    ],
    totalMarks: 10,
    questions: [
      {
        id: 'sq-2-1',
        questionAf: 'By watter skool vind die konsert plaas?',
        questionEn: 'At which school does the concert take place?',
        options: ['Laerskool Protea', 'Laerskool Kremetart', 'Hoërskool Kaapstad', 'Laerskool Kruger'],
        correctAnswer: 'Laerskool Protea',
        marks: 2,
        explanationEn: 'The story states it takes place at "Laerskool Protea".'
      },
      {
        id: 'sq-2-2',
        questionAf: 'Soos watter dier is Thabo aangetrek?',
        questionEn: 'Like which animal is Thabo dressed up?',
        options: ['\'n Leeu', '\'n Olifant', '\'n Vinnige jagluiperd', '\'n Sebra'],
        correctAnswer: '\'n Vinnige jagluiperd',
        marks: 2,
        explanationEn: 'Thabo is dressed up like a fast cheetah with black spots ("vinnige jagluiperd").'
      },
      {
        id: 'sq-2-3',
        questionAf: 'Wat het Thabo gedoen toe Amogelang haar woorde vergeet?',
        questionEn: 'What did Thabo do when Amogelang forgot her words?',
        options: ['Hy het gelag', 'Hy het vir haar gefluister: "Jy kan dit doen!"', 'Hy het van die verhoog af gehardloop', 'Hy het opgehou sing'],
        correctAnswer: 'Hy het vir haar gefluister: "Jy kan dit doen!"',
        marks: 2,
        explanationEn: 'Thabo kindly encouraged her by whispering: "Jy kan dit doen!" (You can do it).'
      },
      {
        id: 'sq-2-4',
        questionAf: 'Wie is die onderwyser wat so trots was?',
        questionEn: 'Who is the teacher who was so proud?',
        options: ['Juffrou Venter', 'Meneer Khumalo', 'Juffrou Smith', 'Ouma Bester'],
        correctAnswer: 'Juffrou Venter',
        marks: 2,
        explanationEn: 'Teacher Venter ("Juffrou Venter") wiped a tear of joy from her cheek.'
      },
      {
        id: 'sq-2-5',
        questionAf: 'Waaroor het die kinders gesing?',
        questionEn: 'What did the children sing about?',
        options: ['Oor die reënboognasie', 'Oor sneeu en winter', 'Oor kos en roomys', 'Oor rugby'],
        correctAnswer: 'Oor die reënboognasie',
        marks: 2,
        explanationEn: 'They sang a cheerful song about the rainbow nation ("oor die reënboognasie").'
      }
    ]
  }
];
