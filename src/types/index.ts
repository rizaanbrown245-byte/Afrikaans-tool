export type LanguageTrack = 'FAL' | 'HL'; // First Additional Language vs Home Language

export type Term = 1 | 2 | 3 | 4;

export type DifficultyLevel = 'easy' | 'medium' | 'challenge';

export interface VocabWord {
  id: string;
  afrikaans: string;
  english: string;
  pronunciation: string; // e.g. "Goe-yuh-mor-ruh"
  category: string;
  emoji?: string;
  iconType?: string;
  exampleSentenceAf: string;
  exampleSentenceEn: string;
}

export interface QuizQuestion {
  id: string;
  level: DifficultyLevel;
  type: 'multiple-choice' | 'fill-blank' | 'sentence-order' | 'translation';
  promptAf: string;
  promptEn: string;
  options?: string[];
  correctAnswer: string;
  hint: string;
  explanationEn: string;
  explanationAf: string;
  audioText?: string;
}

export interface LessonContent {
  id: string;
  topicNumber: number;
  titleAf: string;
  titleEn: string;
  term: Term;
  category: 'Spraak' | 'Woordeskat' | 'Grammatika' | 'Lees' | 'Skryf';
  icon: string;
  color: string;
  ollieTip: {
    english: string;
    afrikaans: string;
  };
  capsTopic: string;
  summaryEn: string;
  explanationBlocks: {
    headingEn: string;
    headingAf: string;
    contentEn: string;
    contentAf: string;
    examples: {
      afrikaans: string;
      english: string;
      highlight?: string;
      note?: string;
    }[];
  }[];
  vocabulary: VocabWord[];
  stompIRule?: {
    letter: string;
    afrikaans: string;
    english: string;
    example: string;
  }[];
  questions: QuizQuestion[];
}

export interface ReadingPassage {
  id: string;
  titleAf: string;
  titleEn: string;
  storyAf: string;
  storyEn: string;
  wordCount: number;
  glossary: { af: string; en: string; pronunciation: string }[];
  questions: {
    id: string;
    questionAf: string;
    questionEn: string;
    options: string[];
    correctAnswer: string;
    marks: number;
    explanationEn: string;
  }[];
  totalMarks: number;
}

export interface Badge {
  id: string;
  titleAf: string;
  titleEn: string;
  description: string;
  icon: string;
  category: 'lessons' | 'games' | 'quiz' | 'streak' | 'special';
  unlocked: boolean;
  requiredCount: number;
}

export interface OllieMilestoneBadge {
  id: string;
  titleAf: string;
  titleEn: string;
  roleTitle: string;
  ollieCostumeEmoji: string;
  costume: 'professor' | 'conductor' | 'safari' | 'chef' | 'detective' | 'timetraveler' | 'storyteller' | 'author' | 'streak3' | 'streak7' | 'champion';
  descriptionAf: string;
  descriptionEn: string;
  milestoneType: 'module' | 'streak' | 'term' | 'curriculum';
  requiredLessonIds?: string[];
  requiredStreakDays?: number;
  unlockedMessageAf: string;
  unlockedMessageEn: string;
  accentColor: string;
}

export interface AnimalAvatar {
  id: string;
  name: string;
  speciesAf: string;
  speciesEn: string;
  emoji: string;
  unlockStars: number;
  descriptionEn: string;
}

export interface UserProgress {
  stars: number;
  gems: number;
  streakDays: number;
  lastActiveDate: string;
  selectedAvatar: string;
  languageTrack: LanguageTrack;
  completedLessonIds: string[];
  lessonScores: Record<string, number>; // lessonId -> highest score percentage
  quizResults: {
    lessonId: string;
    score: number;
    total: number;
    date: string;
  }[];
  gamesPlayed: number;
  unlockedBadges: string[];
  unlockedOllieBadgeIds: string[];
  weakTopics: string[]; // lessonIds where user scored below 70%
  dailyChallengeDoneDate: string;
  soundEnabled: boolean;
}
