import React, { useState } from 'react';
import { Sparkles, Volume2, CheckCircle, ArrowRight, Lightbulb, Star, RotateCcw } from 'lucide-react';
import { getWordOfTheDay, WORDS_OF_THE_DAY, DailyWord } from '../data/wordOfTheDayData';
import { speakAfrikaans, sounds } from '../utils/audio';
import { useProgress } from '../context/ProgressContext';

export const WordOfTheDay: React.FC = () => {
  const { addStars, triggerConfetti } = useProgress();
  const [currentWordIndex, setCurrentWordIndex] = useState<number>(() => {
    const today = new Date();
    const startOfYear = new Date(today.getFullYear(), 0, 1);
    const dayOfYear = Math.floor((today.getTime() - startOfYear.getTime()) / (1000 * 60 * 60 * 24));
    return Math.abs(dayOfYear) % WORDS_OF_THE_DAY.length;
  });

  const [isPlayingWord, setIsPlayingWord] = useState(false);
  const [isPlayingSentence, setIsPlayingSentence] = useState(false);
  const [hasPracticed, setHasPracticed] = useState(false);

  const word: DailyWord = WORDS_OF_THE_DAY[currentWordIndex];

  const handlePlayWord = () => {
    sounds.playPop();
    setIsPlayingWord(true);
    speakAfrikaans(word.afrikaans, {
      onEnd: () => setIsPlayingWord(false),
      onError: () => setIsPlayingWord(false)
    });

    if (!hasPracticed) {
      setHasPracticed(true);
      addStars(1);
      sounds.playCorrect();
    }
  };

  const handlePlaySentence = () => {
    sounds.playPop();
    setIsPlayingSentence(true);
    speakAfrikaans(word.exampleAf, {
      onEnd: () => setIsPlayingSentence(false),
      onError: () => setIsPlayingSentence(false)
    });
  };

  const handleNextWord = () => {
    sounds.playPop();
    setCurrentWordIndex((prev) => (prev + 1) % WORDS_OF_THE_DAY.length);
    setIsPlayingWord(false);
    setIsPlayingSentence(false);
  };

  return (
    <div className="bg-gradient-to-r from-amber-100 via-orange-50 to-amber-100 border-3 border-amber-300 rounded-3xl p-5 sm:p-6 shadow-sm relative overflow-hidden">
      {/* Decorative background watermark */}
      <div className="absolute -right-4 -bottom-4 text-7xl opacity-20 select-none pointer-events-none">
        {word.emoji}
      </div>

      <div className="flex flex-wrap items-center justify-between gap-3 mb-3 border-b border-amber-200/80 pb-3">
        <div className="flex items-center gap-2">
          <span className="w-9 h-9 rounded-2xl bg-amber-500 text-white flex items-center justify-center text-lg shadow-2xs">
            🌟
          </span>
          <div>
            <div className="flex items-center gap-2">
              <span className="text-[11px] font-black uppercase tracking-wider text-amber-900 bg-amber-200/80 px-2 py-0.5 rounded-full">
                Vandag se Woord • Word of the Day
              </span>
              <span className="text-[10px] font-bold text-amber-800 bg-white/80 px-2 py-0.5 rounded-md border border-amber-200">
                {word.category}
              </span>
            </div>
          </div>
        </div>

        <button
          onClick={handleNextWord}
          className="text-xs font-bold text-amber-900 hover:text-amber-950 bg-white hover:bg-amber-50 border border-amber-300 px-3 py-1.5 rounded-xl flex items-center gap-1.5 transition-colors shadow-2xs"
          title="Verken nog 'n woord van die dag"
        >
          <RotateCcw className="w-3.5 h-3.5 text-amber-600" />
          <span>Nog 'n Woord</span>
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-12 gap-4 items-center">
        {/* Main word display */}
        <div className="md:col-span-5 flex items-start gap-3.5">
          <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-2xl bg-white border-2 border-amber-300 flex items-center justify-center text-4xl sm:text-5xl shadow-sm shrink-0">
            {word.emoji}
          </div>

          <div className="space-y-1">
            <div className="flex items-center gap-2 flex-wrap">
              <h2 className="font-fun text-2xl sm:text-3xl font-black text-slate-900 tracking-tight">
                {word.afrikaans}
              </h2>
              <button
                onClick={handlePlayWord}
                className={`p-2 rounded-xl border transition-all ${
                  isPlayingWord
                    ? 'bg-amber-500 text-white border-amber-600 scale-105 shadow-sm'
                    : 'bg-amber-200 hover:bg-amber-300 text-amber-950 border-amber-400 active:scale-95'
                }`}
                title="Luister na die uitspraak"
              >
                <Volume2 className={`w-4 h-4 ${isPlayingWord ? 'animate-bounce' : ''}`} />
              </button>
            </div>

            <p className="text-sm font-extrabold text-amber-900">
              English: <span className="text-slate-800">{word.english}</span>
            </p>

            <div className="flex items-center gap-2 text-xs">
              <span className="font-mono text-[11px] bg-white px-2 py-0.5 rounded-md border border-amber-200 text-slate-600 font-bold">
                {word.pronunciationGuide}
              </span>
              <span className="text-slate-500 text-[11px] italic">
                {word.partOfSpeech}
              </span>
            </div>
          </div>
        </div>

        {/* Example Sentence & Ollie Tip */}
        <div className="md:col-span-7 bg-white/90 backdrop-blur-xs border border-amber-200 rounded-2xl p-3.5 sm:p-4 space-y-2.5">
          <div>
            <div className="flex items-center justify-between gap-2">
              <span className="text-[11px] font-black uppercase text-amber-900">
                Voorbeeld in 'n Sin:
              </span>
              <button
                onClick={handlePlaySentence}
                className="text-[11px] font-bold text-amber-800 hover:text-amber-950 flex items-center gap-1 bg-amber-50 hover:bg-amber-100 border border-amber-200 px-2 py-0.5 rounded-lg transition-colors"
                title="Hoor die hele sin"
              >
                <Volume2 className="w-3 h-3 text-amber-700" />
                <span>Hoor Sin</span>
              </button>
            </div>
            <p className="font-fun text-sm sm:text-base font-bold text-slate-900 mt-0.5">
              "{word.exampleAf}"
            </p>
            <p className="text-xs text-slate-500 font-semibold italic">
              "{word.exampleEn}"
            </p>
          </div>

          <div className="bg-amber-50/70 p-2.5 rounded-xl border border-amber-200 flex items-start gap-2 text-xs text-amber-950 font-medium">
            <Lightbulb className="w-4 h-4 text-amber-600 shrink-0 mt-0.5" />
            <span className="leading-snug">{word.funFact}</span>
          </div>
        </div>
      </div>

      {/* Daily reward notification */}
      {hasPracticed && (
        <div className="mt-3 flex items-center justify-end gap-1.5 text-xs font-black text-emerald-800 animate-in fade-in">
          <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-500" />
          <span>+1 Dagster verdien vir vandag se woord! 🎉</span>
        </div>
      )}
    </div>
  );
};
