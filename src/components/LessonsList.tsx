import React, { useState } from 'react';
import { Search, CheckCircle, Star, Filter, BookOpen, Volume2 } from 'lucide-react';
import { LessonContent, Term } from '../types';
import { LESSONS_DATA } from '../data/curriculumData';
import { useProgress } from '../context/ProgressContext';
import { OllieCharacter } from './OllieCharacter';
import { speakAfrikaans, sounds } from '../utils/audio';

interface LessonsListProps {
  onSelectLesson: (lessonId: string) => void;
}

export const LessonsList: React.FC<LessonsListProps> = ({ onSelectLesson }) => {
  const { progress } = useProgress();
  const [selectedTerm, setSelectedTerm] = useState<number | 'all'>('all');
  const [searchQuery, setSearchQuery] = useState('');

  const filteredLessons = LESSONS_DATA.filter((l) => {
    if (selectedTerm !== 'all' && l.term !== selectedTerm) return false;
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      const matchTitle = l.titleAf.toLowerCase().includes(q) || l.titleEn.toLowerCase().includes(q);
      const matchTopic = l.capsTopic.toLowerCase().includes(q) || l.summaryEn.toLowerCase().includes(q);
      const matchVocab = l.vocabulary.some((v) => v.afrikaans.toLowerCase().includes(q) || v.english.toLowerCase().includes(q));
      return matchTitle || matchTopic || matchVocab;
    }
    return true;
  });

  return (
    <div className="space-y-6 pb-12">
      {/* Header */}
      <div className="bg-gradient-to-r from-amber-400 via-orange-400 to-amber-500 rounded-3xl p-5 sm:p-6 text-white shadow-sm border-3 border-amber-300">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <div>
            <span className="bg-white/20 text-white text-xs font-black uppercase tracking-wider px-2.5 py-0.5 rounded-full border border-white/30">
              Graad 4 CAPS Kurrikulum 2026
            </span>
            <h1 className="font-fun text-2xl sm:text-3xl font-black mt-1">
              Al die 15 Afrikaans Lesse 📚
            </h1>
            <p className="text-amber-100 font-bold text-sm sm:text-base">
              Volledige lesse van Kwartaal 1 tot Kwartaal 4 met tweetalige verduidelikings en flitskaarte.
            </p>
          </div>
          <span className="bg-white/20 px-3.5 py-1.5 rounded-2xl font-fun font-black text-sm">
            {progress.completedLessonIds.length} / 15 Voltooi
          </span>
        </div>
      </div>

      <OllieCharacter
        afrikaansText="Kies enige les waaroor jy wil leer. Jy kan soek vir woorde soos 'STOMPI', 'diere', of 'meervoude'!"
        englishText="Filter by school term or search for any topic below. Each lesson includes simple English tips and flashcards!"
        mood="happy"
      />

      {/* Filter and Search Bar */}
      <div className="bg-white p-4 rounded-2xl border-2 border-amber-200 shadow-2xs flex flex-wrap items-center justify-between gap-3">
        {/* Term Tabs */}
        <div className="flex items-center gap-1.5 overflow-x-auto text-xs font-black">
          <button
            onClick={() => { setSelectedTerm('all'); sounds.playPop(); }}
            className={`px-3 py-1.5 rounded-xl transition-all ${
              selectedTerm === 'all'
                ? 'bg-amber-500 text-white'
                : 'bg-amber-50 text-amber-900 hover:bg-amber-100 border border-amber-200'
            }`}
          >
            Almal (15)
          </button>
          {[1, 2, 3, 4].map((t) => (
            <button
              key={t}
              onClick={() => { setSelectedTerm(t); sounds.playPop(); }}
              className={`px-3 py-1.5 rounded-xl transition-all ${
                selectedTerm === t
                  ? 'bg-amber-500 text-white'
                  : 'bg-amber-50 text-amber-900 hover:bg-amber-100 border border-amber-200'
              }`}
            >
              Kwartaal {t}
            </button>
          ))}
        </div>

        {/* Search Input */}
        <div className="relative min-w-[220px] flex-1 sm:flex-initial">
          <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            placeholder="Soek onderwerp of woord..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-9 pr-3 py-1.5 rounded-xl border border-slate-300 text-xs sm:text-sm font-semibold focus:outline-hidden focus:ring-2 focus:ring-amber-400 focus:border-amber-400"
          />
        </div>
      </div>

      {/* Lessons Cards Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {filteredLessons.map((lesson) => {
          const isDone = progress.completedLessonIds.includes(lesson.id);
          const score = progress.lessonScores[lesson.id];
          const isWeak = progress.weakTopics.includes(lesson.id);

          return (
            <div
              key={lesson.id}
              onClick={() => onSelectLesson(lesson.id)}
              className={`p-4 rounded-3xl border-2 cursor-pointer transition-all flex flex-col justify-between hover:shadow-md hover:-translate-y-1 ${
                isDone
                  ? 'bg-emerald-50/30 border-emerald-300 hover:border-emerald-500'
                  : 'bg-white border-amber-200 hover:border-amber-400'
              }`}
            >
              <div>
                <div className="flex items-start justify-between gap-2 mb-2">
                  <div className="w-12 h-12 rounded-2xl bg-amber-100 border border-amber-300 flex items-center justify-center text-2xl shadow-2xs">
                    {lesson.icon}
                  </div>
                  <div className="flex items-center gap-1.5">
                    <span className="text-[10px] font-black uppercase text-amber-800 bg-amber-100 px-2 py-0.5 rounded-md">
                      Kwartaal {lesson.term}
                    </span>
                    {isDone && (
                      <span className="flex items-center gap-1 text-[11px] font-black text-emerald-800 bg-emerald-100 px-2 py-0.5 rounded-md border border-emerald-300">
                        <CheckCircle className="w-3 h-3 text-emerald-600" />
                        {score || 100}%
                      </span>
                    )}
                  </div>
                </div>

                <span className="text-[11px] font-black text-amber-700 uppercase">
                  Onderwerp {lesson.topicNumber} • {lesson.category}
                </span>
                <h3 className="font-fun text-lg font-black text-slate-900 leading-snug">
                  {lesson.titleAf}
                </h3>
                <p className="text-xs font-bold text-slate-500 mb-2">
                  {lesson.titleEn}
                </p>

                <p className="text-xs text-slate-600 line-clamp-2 bg-slate-50 p-2 rounded-xl border border-slate-100">
                  {lesson.summaryEn}
                </p>

                {/* Sample Clickable Vocabulary Chips with Audio */}
                <div className="mt-2.5 flex flex-wrap gap-1">
                  {lesson.vocabulary.slice(0, 3).map((v) => (
                    <button
                      key={v.id}
                      type="button"
                      onClick={(e) => {
                        e.stopPropagation();
                        sounds.playPop();
                        speakAfrikaans(v.afrikaans);
                      }}
                      className="text-[11px] font-bold text-amber-950 bg-amber-100/80 hover:bg-amber-200 border border-amber-300 px-2 py-0.5 rounded-lg flex items-center gap-1 transition-transform active:scale-95"
                      title={`Klik om "${v.afrikaans}" te hoor!`}
                    >
                      <span>{v.afrikaans}</span>
                      <Volume2 className="w-2.5 h-2.5 text-amber-700" />
                    </button>
                  ))}
                </div>
              </div>

              {isWeak && (
                <div className="mt-2 text-[11px] font-black text-rose-700 bg-rose-50 px-2 py-0.5 rounded-md border border-rose-200">
                  ⚠️ Swakker area: benodig oefening
                </div>
              )}

              <div className="mt-3 pt-2 border-t border-slate-100 flex items-center justify-between text-xs">
                <span className="text-slate-500 font-bold">
                  {lesson.vocabulary.length} woorde • {lesson.questions.length} vrae
                </span>
                <span className="font-black text-amber-600 hover:underline">
                  Open Les →
                </span>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
