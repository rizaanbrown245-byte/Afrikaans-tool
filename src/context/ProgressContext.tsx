import React, { createContext, useContext, useState, useEffect } from 'react';
import confetti from 'canvas-confetti';
import { UserProgress, LanguageTrack, OllieMilestoneBadge } from '../types';
import { BADGES_DATA, OLLIE_BADGES_DATA } from '../data/badgesData';
import { sounds, setGlobalAudioEnabled } from '../utils/audio';

interface ProgressContextType {
  progress: UserProgress;
  latestUnlockedOllieBadge: OllieMilestoneBadge | null;
  clearLatestUnlockedOllieBadge: () => void;
  addStars: (count: number) => void;
  addGems: (count: number) => void;
  completeLesson: (lessonId: string, scorePercent: number) => void;
  recordQuizResult: (lessonId: string, score: number, total: number) => void;
  recordGamePlayed: () => void;
  setLanguageTrack: (track: LanguageTrack) => void;
  setSelectedAvatar: (avatarId: string) => void;
  toggleSound: () => void;
  completeDailyChallenge: () => void;
  resetProgress: () => void;
  removeWeakTopic: (lessonId: string) => void;
  triggerConfetti: () => void;
}

const STORAGE_KEY = 'afrikaans_adventure_progress_v1';

const defaultProgress: UserProgress = {
  stars: 15, // Starting gift to encourage the learner!
  gems: 5,
  streakDays: 1,
  lastActiveDate: new Date().toISOString().split('T')[0],
  selectedAvatar: 'ollie-owl',
  languageTrack: 'FAL',
  completedLessonIds: [],
  lessonScores: {},
  quizResults: [],
  gamesPlayed: 0,
  unlockedBadges: ['badge-first-step'],
  unlockedOllieBadgeIds: [],
  weakTopics: [],
  dailyChallengeDoneDate: '',
  soundEnabled: true
};

const ProgressContext = createContext<ProgressContextType | undefined>(undefined);

export const ProgressProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [latestUnlockedOllieBadge, setLatestUnlockedOllieBadge] = useState<OllieMilestoneBadge | null>(null);

  const [progress, setProgress] = useState<UserProgress>(() => {
    if (typeof window === 'undefined') return defaultProgress;
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (saved) {
        const parsed = JSON.parse(saved);
        // Check streak
        const today = new Date().toISOString().split('T')[0];
        if (parsed.lastActiveDate !== today) {
          const lastDate = new Date(parsed.lastActiveDate);
          const currDate = new Date(today);
          const diffDays = Math.round((currDate.getTime() - lastDate.getTime()) / (1000 * 3600 * 24));
          if (diffDays === 1) {
            parsed.streakDays = (parsed.streakDays || 1) + 1;
          } else if (diffDays > 1) {
            parsed.streakDays = 1;
          }
          parsed.lastActiveDate = today;
        }
        return { 
          ...defaultProgress, 
          ...parsed,
          unlockedOllieBadgeIds: parsed.unlockedOllieBadgeIds || []
        };
      }
    } catch {
      // fallback
    }
    return defaultProgress;
  });

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(progress));
    } catch {
      // storage error
    }
    setGlobalAudioEnabled(progress.soundEnabled);
  }, [progress]);

  const triggerConfetti = () => {
    try {
      confetti({
        particleCount: 70,
        spread: 60,
        origin: { y: 0.6 }
      });
    } catch {
      // ignore
    }
  };

  const checkBadgeUnlocks = (newProg: UserProgress): { badges: string[]; ollieBadges: string[] } => {
    const newlyUnlocked: string[] = [...newProg.unlockedBadges];
    const newlyUnlockedOllie: string[] = [...(newProg.unlockedOllieBadgeIds || [])];

    // 1. Standard badges
    BADGES_DATA.forEach((b) => {
      if (newlyUnlocked.includes(b.id)) return;

      let shouldUnlock = false;
      if (b.id === 'badge-first-step' && newProg.completedLessonIds.length >= 1) shouldUnlock = true;
      if (b.id === 'badge-stompi' && newProg.completedLessonIds.includes('topic-8-sentence-building-stompi')) shouldUnlock = true;
      if (b.id === 'badge-safari' && newProg.completedLessonIds.includes('topic-5-animals')) shouldUnlock = true;
      if (b.id === 'badge-games' && newProg.gamesPlayed >= 5) shouldUnlock = true;
      if (b.id === 'badge-stars-50' && newProg.stars >= 50) shouldUnlock = true;
      if (b.id === 'badge-reader' && newProg.completedLessonIds.includes('topic-13-reading-comprehension')) shouldUnlock = true;
      if (b.id === 'badge-master' && newProg.completedLessonIds.length >= 10) shouldUnlock = true;

      if (shouldUnlock) {
        newlyUnlocked.push(b.id);
        sounds.playVictory();
        triggerConfetti();
      }
    });

    // 2. Digital 'Ollie' milestone badges
    OLLIE_BADGES_DATA.forEach((ob) => {
      if (newlyUnlockedOllie.includes(ob.id)) return;

      let shouldUnlock = false;

      // Module-specific milestones
      if (ob.requiredLessonIds) {
        const hasAllLessons = ob.requiredLessonIds.every((lid) => newProg.completedLessonIds.includes(lid));
        if (hasAllLessons) shouldUnlock = true;
      }

      // Streak milestones
      if (ob.requiredStreakDays && newProg.streakDays >= ob.requiredStreakDays) {
        shouldUnlock = true;
      }

      // Grand Champion (all 15 curriculum lessons)
      if (ob.milestoneType === 'curriculum' && newProg.completedLessonIds.length >= 15) {
        shouldUnlock = true;
      }

      if (shouldUnlock) {
        newlyUnlockedOllie.push(ob.id);
        setLatestUnlockedOllieBadge(ob);
        sounds.playVictory();
        triggerConfetti();
      }
    });

    return { badges: newlyUnlocked, ollieBadges: newlyUnlockedOllie };
  };

  const addStars = (count: number) => {
    setProgress((prev) => {
      const nextStars = prev.stars + count;
      sounds.playCorrect();
      const updated = { ...prev, stars: nextStars };
      const { badges, ollieBadges } = checkBadgeUnlocks(updated);
      updated.unlockedBadges = badges;
      updated.unlockedOllieBadgeIds = ollieBadges;
      return updated;
    });
  };

  const addGems = (count: number) => {
    setProgress((prev) => ({
      ...prev,
      gems: prev.gems + count
    }));
  };

  const completeLesson = (lessonId: string, scorePercent: number) => {
    setProgress((prev) => {
      const completed = prev.completedLessonIds.includes(lessonId)
        ? prev.completedLessonIds
        : [...prev.completedLessonIds, lessonId];

      const bestScore = Math.max(prev.lessonScores[lessonId] || 0, scorePercent);
      const weak = scorePercent < 70
        ? Array.from(new Set([...prev.weakTopics, lessonId]))
        : prev.weakTopics.filter((id) => id !== lessonId);

      const starsEarned = scorePercent >= 90 ? 5 : scorePercent >= 70 ? 3 : 2;

      const nextProg: UserProgress = {
        ...prev,
        stars: prev.stars + starsEarned,
        gems: prev.gems + (scorePercent === 100 ? 2 : 1),
        completedLessonIds: completed,
        lessonScores: { ...prev.lessonScores, [lessonId]: bestScore },
        weakTopics: weak
      };

      const { badges, ollieBadges } = checkBadgeUnlocks(nextProg);
      nextProg.unlockedBadges = badges;
      nextProg.unlockedOllieBadgeIds = ollieBadges;
      sounds.playVictory();
      triggerConfetti();
      return nextProg;
    });
  };

  const recordQuizResult = (lessonId: string, score: number, total: number) => {
    const percent = Math.round((score / total) * 100);
    setProgress((prev) => {
      const newResult = {
        lessonId,
        score,
        total,
        date: new Date().toISOString()
      };
      const weak = percent < 70
        ? Array.from(new Set([...prev.weakTopics, lessonId]))
        : prev.weakTopics.filter((id) => id !== lessonId);

      const bestScore = Math.max(prev.lessonScores[lessonId] || 0, percent);
      const nextProg: UserProgress = {
        ...prev,
        quizResults: [newResult, ...prev.quizResults.slice(0, 49)],
        lessonScores: { ...prev.lessonScores, [lessonId]: bestScore },
        weakTopics: weak
      };
      return nextProg;
    });
  };

  const recordGamePlayed = () => {
    setProgress((prev) => {
      const nextCount = prev.gamesPlayed + 1;
      const nextProg = {
        ...prev,
        gamesPlayed: nextCount,
        stars: prev.stars + 2
      };
      const { badges, ollieBadges } = checkBadgeUnlocks(nextProg);
      nextProg.unlockedBadges = badges;
      nextProg.unlockedOllieBadgeIds = ollieBadges;
      return nextProg;
    });
  };

  const setLanguageTrack = (track: LanguageTrack) => {
    setProgress((prev) => ({
      ...prev,
      languageTrack: track
    }));
    sounds.playPop();
  };

  const setSelectedAvatar = (avatarId: string) => {
    setProgress((prev) => ({
      ...prev,
      selectedAvatar: avatarId
    }));
    sounds.playPop();
  };

  const toggleSound = () => {
    setProgress((prev) => {
      const next = !prev.soundEnabled;
      setGlobalAudioEnabled(next);
      if (next) {
        sounds.playPop();
      }
      return { ...prev, soundEnabled: next };
    });
  };

  const completeDailyChallenge = () => {
    const today = new Date().toISOString().split('T')[0];
    setProgress((prev) => {
      if (prev.dailyChallengeDoneDate === today) return prev;
      const updated = {
        ...prev,
        stars: prev.stars + 10,
        gems: prev.gems + 5,
        dailyChallengeDoneDate: today
      };
      const { badges, ollieBadges } = checkBadgeUnlocks(updated);
      updated.unlockedBadges = badges;
      updated.unlockedOllieBadgeIds = ollieBadges;
      sounds.playVictory();
      triggerConfetti();
      return updated;
    });
  };

  const removeWeakTopic = (lessonId: string) => {
    setProgress((prev) => ({
      ...prev,
      weakTopics: prev.weakTopics.filter((id) => id !== lessonId)
    }));
  };

  const resetProgress = () => {
    setProgress(defaultProgress);
    setLatestUnlockedOllieBadge(null);
    try {
      localStorage.removeItem(STORAGE_KEY);
    } catch {
      // ignore
    }
  };

  const clearLatestUnlockedOllieBadge = () => {
    setLatestUnlockedOllieBadge(null);
  };

  return (
    <ProgressContext.Provider
      value={{
        progress,
        latestUnlockedOllieBadge,
        clearLatestUnlockedOllieBadge,
        addStars,
        addGems,
        completeLesson,
        recordQuizResult,
        recordGamePlayed,
        setLanguageTrack,
        setSelectedAvatar,
        toggleSound,
        completeDailyChallenge,
        resetProgress,
        removeWeakTopic,
        triggerConfetti
      }}
    >
      {children}
    </ProgressContext.Provider>
  );
};

export const useProgress = () => {
  const context = useContext(ProgressContext);
  if (!context) {
    throw new Error('useProgress must be used within a ProgressProvider');
  }
  return context;
};
