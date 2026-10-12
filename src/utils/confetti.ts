import confetti from 'canvas-confetti';

// Cheerful South African & Grade 4 celebration color palette
const CELEBRATION_COLORS = [
  '#F59E0B', // Golden Amber
  '#10B981', // Emerald Green
  '#3B82F6', // Royal Blue
  '#EF4444', // Bright Red
  '#F97316', // Orange
  '#8B5CF6', // Purple
  '#FDE047', // Sunny Yellow
  '#EC4899'  // Pink
];

const GOLDEN_BADGE_COLORS = [
  '#F59E0B', // Gold
  '#FBBF24', // Amber
  '#FDE68A', // Light Gold
  '#D97706', // Dark Gold
  '#FFFFFF'  // White Sparkle
];

/**
 * Grand celebration when a student completes a lesson.
 * Fires a dual-cannon crossfire from both sides of the screen, followed by gentle falling confetti.
 */
export const fireLessonCompleteConfetti = () => {
  try {
    // 1. Initial central blast
    confetti({
      particleCount: 80,
      spread: 70,
      origin: { y: 0.6 },
      colors: CELEBRATION_COLORS,
      disableForReducedMotion: true
    });

    // 2. Left cannon burst
    setTimeout(() => {
      confetti({
        particleCount: 50,
        angle: 60,
        spread: 55,
        origin: { x: 0, y: 0.7 },
        colors: CELEBRATION_COLORS,
        disableForReducedMotion: true
      });
    }, 200);

    // 3. Right cannon burst
    setTimeout(() => {
      confetti({
        particleCount: 50,
        angle: 120,
        spread: 55,
        origin: { x: 1, y: 0.7 },
        colors: CELEBRATION_COLORS,
        disableForReducedMotion: true
      });
    }, 400);

    // 4. Cascade rain from the sky
    setTimeout(() => {
      confetti({
        particleCount: 60,
        spread: 100,
        startVelocity: 25,
        origin: { y: 0.2 },
        colors: CELEBRATION_COLORS,
        disableForReducedMotion: true
      });
    }, 650);
  } catch (err) {
    console.error('Confetti animation error:', err);
  }
};

/**
 * Spectacular fireworks and golden shower when a student earns a badge or Ollie milestone.
 */
export const fireBadgeUnlockConfetti = () => {
  try {
    // Central golden fountain
    confetti({
      particleCount: 100,
      spread: 90,
      origin: { y: 0.5 },
      colors: GOLDEN_BADGE_COLORS,
      startVelocity: 45,
      scalar: 1.2,
      disableForReducedMotion: true
    });

    // Staggered starbursts
    const end = Date.now() + 1500;

    const frame = () => {
      confetti({
        particleCount: 5,
        angle: 60,
        spread: 45,
        origin: { x: 0.1, y: 0.6 },
        colors: GOLDEN_BADGE_COLORS,
        disableForReducedMotion: true
      });
      confetti({
        particleCount: 5,
        angle: 120,
        spread: 45,
        origin: { x: 0.9, y: 0.6 },
        colors: GOLDEN_BADGE_COLORS,
        disableForReducedMotion: true
      });

      if (Date.now() < end) {
        requestAnimationFrame(frame);
      }
    };
    frame();
  } catch (err) {
    console.error('Badge confetti animation error:', err);
  }
};

/**
 * Quick reward burst for correct quiz answers or streak milestones.
 */
export const fireQuickRewardConfetti = () => {
  try {
    confetti({
      particleCount: 40,
      spread: 50,
      origin: { y: 0.7 },
      colors: CELEBRATION_COLORS,
      disableForReducedMotion: true
    });
  } catch {
    // ignore
  }
};
