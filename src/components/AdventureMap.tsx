import React from 'react';
import { Star, CheckCircle, Lock, Play, Sparkles, Search } from 'lucide-react';
import { useProgress } from '../context/ProgressContext';
import { ADVENTURE_WORLDS } from '../data/badgesData';
import { LESSONS_DATA } from '../data/curriculumData';
import { OllieCharacter } from './OllieCharacter';
import { WordOfTheDay } from './WordOfTheDay';

interface AdventureMapProps {
  onSelectLesson: (lessonId: string) => void;
  onOpenGames: () => void;
  onOpenExam?: () => void;
  onOpenSearch?: () => void;
}

export const AdventureMap: React.FC<AdventureMapProps> = ({ onSelectLesson, onOpenGames, onOpenExam, onOpenSearch }) => {
  const { progress } = useProgress();

  // Find next uncompleted lesson
  const nextLesson = LESSONS_DATA.find((l) => !progress.completedLessonIds.includes(l.id)) || LESSONS_DATA[0];

  return (
    <div className="space-y-6 pb-12">
      {/* Hero Welcome with Ollie */}
      <div className="bg-gradient-to-br from-amber-400 via-orange-400 to-amber-500 rounded-3xl p-5 sm:p-7 text-white shadow-md relative overflow-hidden border-4 border-amber-300">
        <div className="absolute -right-6 -bottom-6 text-8xl opacity-15 select-none pointer-events-none">
          🇿🇦
        </div>
        
        <div className="max-w-3xl">
          <div className="inline-flex items-center gap-1.5 bg-amber-600/40 backdrop-blur-xs px-3 py-1 rounded-full text-xs font-black uppercase tracking-wider mb-2 border border-amber-300/40">
            <Sparkles className="w-3.5 h-3.5" />
            Suid-Afrikaanse Graad 4 Avontuur • CAPS 2026
          </div>
          <h1 className="font-fun text-2xl sm:text-4xl font-black mb-2 text-white drop-shadow-xs">
            Welkom by jou Afrikaans Reis! 🦉
          </h1>
          <p className="text-amber-100 text-sm sm:text-base font-bold mb-4 max-w-xl">
            Stap deur vier pret wêrelde, versamel goue sterre, bemeester die STOMPI-trein en praat Afrikaans soos 'n kampioen!
          </p>

          <div className="flex flex-wrap items-center gap-2.5">
            <button
              onClick={() => onSelectLesson(nextLesson.id)}
              className="bg-white text-amber-950 hover:bg-amber-100 px-5 py-2.5 rounded-2xl font-black text-sm shadow-md flex items-center gap-2 transition-transform hover:scale-105 active:scale-95"
            >
              <Play className="w-4 h-4 text-amber-600 fill-amber-500" />
              <span>Gaan voort: {nextLesson.titleAf}</span>
            </button>
            <button
              onClick={onOpenGames}
              className="bg-amber-600/60 hover:bg-amber-600/80 text-white border border-amber-300/40 px-4 py-2.5 rounded-2xl font-black text-sm flex items-center gap-2 transition-transform hover:scale-105 active:scale-95"
            >
              <span>🎮 Speel Speletjies</span>
            </button>
            {onOpenExam && (
              <button
                onClick={onOpenExam}
                className="bg-rose-500 hover:bg-rose-600 text-white border border-rose-300/60 px-4 py-2.5 rounded-2xl font-black text-sm flex items-center gap-2 transition-transform hover:scale-105 active:scale-95 shadow-xs"
              >
                <span>📝 Hersieningseksamen</span>
              </button>
            )}
            {onOpenSearch && (
              <button
                onClick={onOpenSearch}
                className="bg-white/20 hover:bg-white/30 text-white border border-white/40 px-4 py-2.5 rounded-2xl font-black text-sm flex items-center gap-2 transition-transform hover:scale-105 active:scale-95 backdrop-blur-xs"
              >
                <Search className="w-4 h-4 text-white" />
                <span>Soek Lesse</span>
              </button>
            )}
          </div>
        </div>
      </div>

      {/* Quick Lesson Search Bar */}
      {onOpenSearch && (
        <div
          onClick={onOpenSearch}
          className="bg-white rounded-3xl p-4 sm:p-5 border-3 border-amber-200 hover:border-amber-400 shadow-2xs hover:shadow-md cursor-pointer transition-all flex flex-col sm:flex-row items-center justify-between gap-3 group"
        >
          <div className="flex items-center gap-3 w-full sm:w-auto">
            <div className="w-12 h-12 rounded-2xl bg-amber-100 border border-amber-300 flex items-center justify-center text-amber-700 text-xl group-hover:scale-110 transition-transform">
              <Search className="w-6 h-6 text-amber-600" />
            </div>
            <div>
              <div className="flex flex-wrap items-center gap-2">
                <h3 className="font-fun text-base sm:text-lg font-black text-slate-900 group-hover:text-amber-700 transition-colors">
                  Soek vinnig enige les of grammatika-reël
                </h3>
                <span className="text-[10px] font-black bg-amber-100 text-amber-900 px-2 py-0.5 rounded-full border border-amber-300 hidden sm:inline-block">
                  STOMPI • Tye • Meervoude
                </span>
              </div>
              <p className="text-xs text-slate-500 font-semibold">
                Klik hier om deur al 15 CAPS-lesse, flitskaarte en woorde te soek...
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2 w-full sm:w-auto justify-end">
            <span className="text-xs font-black text-amber-700 bg-amber-50 group-hover:bg-amber-100 px-3.5 py-2 rounded-xl border border-amber-200 transition-colors flex items-center gap-1.5">
              <span>Maak Soek-Paneel Oop</span>
              <span>→</span>
            </span>
          </div>
        </div>
      )}

      {/* Word of the Day Component */}
      <WordOfTheDay />

      {/* Ollie's friendly advice */}
      <OllieCharacter
        afrikaansText="Jy vorder wonderlik! Onthou, elke foutjie is net 'n kans om slimmer te word!"
        englishText="You are making awesome progress! Follow the trail below through each school term. Click any bubble to start a lesson or test your skills!"
        mood="happy"
      />

      {/* 4 Themed Worlds */}
      <div className="space-y-8">
        {ADVENTURE_WORLDS.map((world, wIdx) => {
          const worldLessons = LESSONS_DATA.filter((l) => world.lessonIds.includes(l.id));
          const completedInWorld = worldLessons.filter((l) => progress.completedLessonIds.includes(l.id)).length;
          const isWorldCompleted = completedInWorld === worldLessons.length;

          return (
            <div
              key={world.id}
              className={`${world.bgColor} rounded-3xl p-5 sm:p-6 border-3 border-amber-200/80 shadow-sm relative`}
            >
              {/* World Header */}
              <div className="flex flex-wrap items-center justify-between gap-3 mb-6 pb-4 border-b border-amber-200">
                <div className="flex items-center gap-3">
                  <div className={`w-14 h-14 rounded-2xl bg-gradient-to-tr ${world.themeColor} text-white flex items-center justify-center text-3xl shadow-sm border-2 border-white`}>
                    {world.icon}
                  </div>
                  <div>
                    <div className="flex items-center gap-2">
                      <h2 className="font-fun text-xl sm:text-2xl font-black text-slate-900">
                        {world.titleAf}
                      </h2>
                      {isWorldCompleted && (
                        <span className="bg-emerald-500 text-white text-xs px-2 py-0.5 rounded-full font-black flex items-center gap-1">
                          <CheckCircle className="w-3 h-3" /> Klaar!
                        </span>
                      )}
                    </div>
                    <p className="text-xs sm:text-sm font-bold text-slate-600">
                      {world.descriptionEn}
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-2 bg-white px-3 py-1.5 rounded-2xl border border-amber-200 text-xs font-black text-slate-700 shadow-2xs">
                  <span>Voltooi:</span>
                  <span className="text-amber-600 text-sm">
                    {completedInWorld} / {worldLessons.length}
                  </span>
                </div>
              </div>

              {/* Trail of Lesson Nodes */}
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                {worldLessons.map((lesson, idx) => {
                  const isCompleted = progress.completedLessonIds.includes(lesson.id);
                  const isWeak = progress.weakTopics.includes(lesson.id);
                  const score = progress.lessonScores[lesson.id];
                  const isCurrent = nextLesson.id === lesson.id;

                  return (
                    <div
                      key={lesson.id}
                      onClick={() => onSelectLesson(lesson.id)}
                      className={`group relative bg-white p-4 rounded-2xl border-2 transition-all cursor-pointer hover:shadow-md hover:-translate-y-1 ${
                        isCompleted
                          ? 'border-emerald-300 hover:border-emerald-500 bg-emerald-50/20'
                          : isCurrent
                          ? 'border-amber-400 ring-2 ring-amber-400/50 shadow-sm'
                          : 'border-slate-200 hover:border-amber-300'
                      }`}
                    >
                      {/* Top icon and badge */}
                      <div className="flex items-start justify-between gap-2 mb-2">
                        <div className="w-12 h-12 rounded-xl bg-amber-100 border border-amber-300 flex items-center justify-center text-2xl group-hover:scale-110 transition-transform">
                          {lesson.icon}
                        </div>
                        <div className="flex items-center gap-1">
                          {isCompleted ? (
                            <div className="flex items-center gap-1 bg-emerald-100 text-emerald-800 px-2 py-0.5 rounded-lg text-xs font-black border border-emerald-300">
                              <CheckCircle className="w-3.5 h-3.5 text-emerald-600" />
                              <span>{score || 100}%</span>
                            </div>
                          ) : isCurrent ? (
                            <div className="bg-amber-100 text-amber-900 px-2 py-0.5 rounded-lg text-xs font-black animate-pulse border border-amber-300">
                              Volgende! 🎯
                            </div>
                          ) : (
                            <div className="bg-slate-100 text-slate-500 px-2 py-0.5 rounded-lg text-xs font-bold">
                              Oop
                            </div>
                          )}
                        </div>
                      </div>

                      {/* Lesson title */}
                      <div className="mb-2">
                        <span className="text-[11px] font-black text-amber-700 uppercase tracking-wide">
                          Onderwerp {lesson.topicNumber} • Kwartaal {lesson.term}
                        </span>
                        <h3 className="font-fun text-base font-bold text-slate-900 leading-snug group-hover:text-amber-800 transition-colors">
                          {lesson.titleAf}
                        </h3>
                        <p className="text-xs font-bold text-slate-500 line-clamp-1">
                          {lesson.titleEn}
                        </p>
                      </div>

                      {/* Weak topic indicator if learner struggled */}
                      {isWeak && (
                        <div className="bg-rose-50 text-rose-700 text-[11px] font-black px-2 py-0.5 rounded-md border border-rose-200 mb-2">
                          ⚠️ Oefen hierdie onderwerp weer!
                        </div>
                      )}

                      {/* Action Bar */}
                      <div className="flex items-center justify-between text-xs pt-2 border-t border-slate-100">
                        <span className="text-slate-500 font-bold">
                          {lesson.vocabulary.length} woorde • {lesson.questions.length} vrae
                        </span>
                        <span className="font-black text-amber-600 group-hover:underline flex items-center gap-0.5">
                          Leer nou →
                        </span>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
