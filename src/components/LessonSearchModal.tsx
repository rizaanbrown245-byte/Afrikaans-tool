import React, { useState, useEffect, useMemo, useRef } from 'react';
import {
  Search,
  X,
  BookOpen,
  Volume2,
  CheckCircle,
  Sparkles,
  ArrowRight,
  Filter,
  GraduationCap,
  Layers,
  HelpCircle,
  Tag
} from 'lucide-react';
import { LESSONS_DATA } from '../data/curriculumData';
import { LessonContent, VocabWord } from '../types';
import { useProgress } from '../context/ProgressContext';
import { speakAfrikaans, sounds } from '../utils/audio';

interface LessonSearchModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSelectLesson: (lessonId: string) => void;
  initialQuery?: string;
}

interface SearchMatch {
  lesson: LessonContent;
  score: number;
  matchType: 'title' | 'topic' | 'vocab' | 'grammar' | 'category';
  matchDetail?: string;
  matchedVocab?: VocabWord[];
}

const POPULAR_SEARCHES = [
  { label: '🚂 STOMPI Sinsbou', query: 'STOMPI' },
  { label: '👥 Meervoude', query: 'Meervoude' },
  { label: '🐣 Verkleinwoorde', query: 'Verkleinwoorde' },
  { label: '⏰ Verlede Tyd (Past)', query: 'Verlede tyd' },
  { label: '🚀 Toekomende Tyd', query: 'Toekomende' },
  { label: '🚫 Dubbele Nie (Ontkenning)', query: 'nie' },
  { label: '📏 Trappe van Vergelyking', query: 'vergelyking' },
  { label: '🐾 Diere & Troeteldiere', query: 'diere' },
  { label: '🍎 Kos & Drinkgoed', query: 'kos' },
  { label: '👋 Groete & Maniere', query: 'groete' },
  { label: '📍 Voorsetsels (Prepositions)', query: 'voorsetsels' }
];

export const LessonSearchModal: React.FC<LessonSearchModalProps> = ({
  isOpen,
  onClose,
  onSelectLesson,
  initialQuery = ''
}) => {
  const { progress } = useProgress();
  const [searchQuery, setSearchQuery] = useState(initialQuery);
  const [selectedTerm, setSelectedTerm] = useState<number | 'all'>('all');
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [playingWordId, setPlayingWordId] = useState<string | null>(null);

  const inputRef = useRef<HTMLInputElement>(null);

  // Sync initial query when opened
  useEffect(() => {
    if (isOpen) {
      setSearchQuery(initialQuery);
      setTimeout(() => {
        inputRef.current?.focus();
        inputRef.current?.select();
      }, 50);
    }
  }, [isOpen, initialQuery]);

  // Handle ESC key to close
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (!isOpen) return;
      if (e.key === 'Escape') {
        onClose();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  // Deep search algorithm
  const searchResults = useMemo<SearchMatch[]>(() => {
    const q = searchQuery.trim().toLowerCase();
    const matches: SearchMatch[] = [];

    for (const lesson of LESSONS_DATA) {
      // Term filter
      if (selectedTerm !== 'all' && lesson.term !== selectedTerm) {
        continue;
      }
      // Category filter
      if (selectedCategory !== 'all' && lesson.category !== selectedCategory) {
        continue;
      }

      // If no query, return all matching the filters
      if (!q) {
        matches.push({
          lesson,
          score: 1,
          matchType: 'topic',
          matchedVocab: []
        });
        continue;
      }

      let score = 0;
      let matchType: SearchMatch['matchType'] = 'topic';
      let matchDetail = '';
      const matchedVocab: VocabWord[] = [];

      // 1. Exact or partial match on Afrikaans Title (highest weight)
      if (lesson.titleAf.toLowerCase() === q) {
        score += 120;
        matchType = 'title';
        matchDetail = `Presiese titel: "${lesson.titleAf}"`;
      } else if (lesson.titleAf.toLowerCase().includes(q)) {
        score += 80;
        matchType = 'title';
        matchDetail = `Titel: "${lesson.titleAf}"`;
      }

      // 2. Match on English Title
      if (lesson.titleEn.toLowerCase().includes(q)) {
        score += 70;
        if (!matchDetail) {
          matchType = 'title';
          matchDetail = `Engelse titel: "${lesson.titleEn}"`;
        }
      }

      // 3. Match on CAPS topic or category
      if (lesson.capsTopic.toLowerCase().includes(q)) {
        score += 50;
        if (!matchDetail) {
          matchType = 'topic';
          matchDetail = `CAPS kurrikulum onderwerp`;
        }
      }

      if (lesson.category.toLowerCase().includes(q)) {
        score += 40;
        if (!matchDetail) {
          matchType = 'category';
          matchDetail = `Kategorie: ${lesson.category}`;
        }
      }

      // 4. Match on Vocabulary (Af, En, category, examples)
      lesson.vocabulary.forEach((v) => {
        const afMatch = v.afrikaans.toLowerCase().includes(q);
        const enMatch = v.english.toLowerCase().includes(q);
        const sentAfMatch = v.exampleSentenceAf?.toLowerCase().includes(q);
        const sentEnMatch = v.exampleSentenceEn?.toLowerCase().includes(q);

        if (afMatch || enMatch || sentAfMatch || sentEnMatch) {
          matchedVocab.push(v);
          score += afMatch ? 35 : enMatch ? 30 : 15;
          if (!matchDetail) {
            matchType = 'vocab';
            matchDetail = `Woord gevind: "${v.afrikaans}" (${v.english})`;
          }
        }
      });

      // 5. Match on Grammar Explanation Blocks & Examples
      lesson.explanationBlocks.forEach((block) => {
        if (
          block.headingAf.toLowerCase().includes(q) ||
          block.headingEn.toLowerCase().includes(q) ||
          block.contentAf.toLowerCase().includes(q) ||
          block.contentEn.toLowerCase().includes(q)
        ) {
          score += 25;
          if (!matchDetail) {
            matchType = 'grammar';
            matchDetail = `Grammatikareël: "${block.headingAf}"`;
          }
        }

        block.examples.forEach((ex) => {
          if (
            ex.afrikaans.toLowerCase().includes(q) ||
            ex.english.toLowerCase().includes(q) ||
            (ex.note && ex.note.toLowerCase().includes(q))
          ) {
            score += 20;
            if (!matchDetail) {
              matchType = 'grammar';
              matchDetail = `Voorbeeld: "${ex.afrikaans}"`;
            }
          }
        });
      });

      // 6. Match on STOMPI rules
      if (lesson.stompIRule) {
        lesson.stompIRule.forEach((r) => {
          if (
            r.afrikaans.toLowerCase().includes(q) ||
            r.english.toLowerCase().includes(q) ||
            r.letter.toLowerCase() === q ||
            r.example.toLowerCase().includes(q)
          ) {
            score += 45;
            if (!matchDetail) {
              matchType = 'grammar';
              matchDetail = `STOMPI Reël (${r.letter}): ${r.afrikaans}`;
            }
          }
        });
      }

      // 7. Match on Summary or Ollie Tip
      if (
        lesson.summaryEn.toLowerCase().includes(q) ||
        lesson.ollieTip.afrikaans.toLowerCase().includes(q) ||
        lesson.ollieTip.english.toLowerCase().includes(q)
      ) {
        score += 15;
      }

      if (score > 0) {
        matches.push({
          lesson,
          score,
          matchType,
          matchDetail,
          matchedVocab
        });
      }
    }

    return matches.sort((a, b) => b.score - a.score);
  }, [searchQuery, selectedTerm, selectedCategory]);

  const handleSelect = (lessonId: string) => {
    sounds.playCorrect();
    onSelectLesson(lessonId);
  };

  const handlePlayWord = (e: React.MouseEvent, word: VocabWord) => {
    e.stopPropagation();
    sounds.playPop();
    setPlayingWordId(word.id);
    speakAfrikaans(word.afrikaans, {
      onEnd: () => setPlayingWordId(null),
      onError: () => setPlayingWordId(null)
    });
  };

  const handlePopularSearchClick = (q: string) => {
    sounds.playPop();
    setSearchQuery(q);
    inputRef.current?.focus();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-slate-900/60 backdrop-blur-xs flex items-start justify-center p-3 sm:p-4 md:p-6 animate-fadeIn">
      {/* Search Dialog Box */}
      <div 
        className="bg-white w-full max-w-4xl rounded-3xl border-3 border-amber-300 shadow-2xl overflow-hidden my-auto max-h-[92vh] flex flex-col"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Top Header */}
        <div className="p-4 sm:p-6 bg-gradient-to-r from-amber-400 via-orange-400 to-amber-500 text-white relative">
          <div className="flex items-center justify-between gap-3 mb-3">
            <div className="flex items-center gap-2">
              <span className="text-2xl sm:text-3xl">🔍</span>
              <div>
                <h2 className="font-fun text-xl sm:text-2xl font-black text-white leading-tight">
                  Soek 'n Les of Onderwerp
                </h2>
                <p className="text-xs sm:text-sm font-bold text-amber-100">
                  Vind vinnig grammatikareëls, STOMPI, tye, meervoude of Afrikaanse woorde
                </p>
              </div>
            </div>

            <button
              onClick={() => {
                sounds.playPop();
                onClose();
              }}
              className="w-10 h-10 rounded-2xl bg-white/20 hover:bg-white/30 text-white flex items-center justify-center transition-all active:scale-95"
              title="Maak toe (ESC)"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Search Input Bar */}
          <div className="relative mt-2">
            <Search className="w-5 h-5 text-amber-700 absolute left-4 top-1/2 -translate-y-1/2" />
            <input
              ref={inputRef}
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Tik 'n onderwerp, reël of woord (bv. STOMPI, meervoude, hond, verlede tyd)..."
              className="w-full pl-12 pr-12 py-3.5 sm:py-4 rounded-2xl bg-white text-slate-900 placeholder:text-slate-400 text-sm sm:text-base font-bold shadow-inner focus:outline-hidden focus:ring-4 focus:ring-amber-200"
            />
            {searchQuery && (
              <button
                onClick={() => {
                  setSearchQuery('');
                  inputRef.current?.focus();
                }}
                className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-700 p-1"
                title="Maak soektog skoon"
              >
                <X className="w-4 h-4" />
              </button>
            )}
          </div>

          {/* Popular search quick-chips */}
          <div className="mt-3 flex items-center gap-1.5 overflow-x-auto no-scrollbar pb-1 text-xs font-black">
            <span className="text-white/80 whitespace-nowrap text-[11px] uppercase tracking-wider mr-1">
              Gewild:
            </span>
            {POPULAR_SEARCHES.slice(0, 6).map((pop) => (
              <button
                key={pop.query}
                type="button"
                onClick={() => handlePopularSearchClick(pop.query)}
                className="bg-white/20 hover:bg-white/35 active:scale-95 text-white px-2.5 py-1 rounded-xl whitespace-nowrap border border-white/25 transition-all text-xs"
              >
                {pop.label}
              </button>
            ))}
          </div>
        </div>

        {/* Filter Toolbar (Terms & Categories) */}
        <div className="px-4 sm:px-6 py-2.5 bg-amber-50/80 border-b border-amber-200 flex flex-wrap items-center justify-between gap-2 text-xs font-black">
          {/* Term Filter */}
          <div className="flex items-center gap-1 overflow-x-auto">
            <span className="text-amber-950 text-[11px] uppercase tracking-wider mr-1">Kwartaal:</span>
            <button
              onClick={() => setSelectedTerm('all')}
              className={`px-2.5 py-1 rounded-lg transition-all ${
                selectedTerm === 'all'
                  ? 'bg-amber-500 text-white shadow-2xs'
                  : 'bg-white text-amber-900 border border-amber-200 hover:bg-amber-100'
              }`}
            >
              Almal
            </button>
            {[1, 2, 3, 4].map((t) => (
              <button
                key={t}
                onClick={() => setSelectedTerm(t)}
                className={`px-2.5 py-1 rounded-lg transition-all ${
                  selectedTerm === t
                    ? 'bg-amber-500 text-white shadow-2xs'
                    : 'bg-white text-amber-900 border border-amber-200 hover:bg-amber-100'
                }`}
              >
                Kw. {t}
              </button>
            ))}
          </div>

          {/* Category Filter */}
          <div className="flex items-center gap-1 overflow-x-auto">
            <span className="text-amber-950 text-[11px] uppercase tracking-wider mr-1">Tipe:</span>
            {['all', 'Grammatika', 'Woordeskat', 'Spraak', 'Lees'].map((cat) => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`px-2.5 py-1 rounded-lg transition-all ${
                  selectedCategory === cat
                    ? 'bg-amber-500 text-white shadow-2xs'
                    : 'bg-white text-amber-900 border border-amber-200 hover:bg-amber-100'
                }`}
              >
                {cat === 'all' ? 'Almal' : cat}
              </button>
            ))}
          </div>

          {/* Matches Count */}
          <div className="text-[11px] font-bold text-slate-500 ml-auto">
            {searchResults.length} {searchResults.length === 1 ? 'les' : 'lesse'} gevind
          </div>
        </div>

        {/* Results List */}
        <div className="flex-1 overflow-y-auto p-4 sm:p-6 space-y-3.5 bg-slate-50/50">
          {searchResults.length > 0 ? (
            searchResults.map(({ lesson, matchDetail, matchedVocab }) => {
              const isCompleted = progress.completedLessonIds.includes(lesson.id);
              const score = progress.lessonScores[lesson.id];

              return (
                <div
                  key={lesson.id}
                  onClick={() => handleSelect(lesson.id)}
                  className="bg-white hover:bg-amber-50/40 p-4 sm:p-5 rounded-2xl border-2 border-amber-200 hover:border-amber-400 shadow-2xs hover:shadow-md transition-all cursor-pointer group flex flex-col md:flex-row md:items-center justify-between gap-4"
                >
                  {/* Left: Info */}
                  <div className="flex-1 space-y-1.5">
                    {/* Badges */}
                    <div className="flex flex-wrap items-center gap-2">
                      <span className="text-[11px] font-black uppercase tracking-wider bg-amber-100 text-amber-900 px-2 py-0.5 rounded-md border border-amber-200">
                        Kwartaal {lesson.term} • Onderwerp {lesson.topicNumber}
                      </span>
                      <span className="text-[11px] font-black uppercase tracking-wider bg-sky-100 text-sky-900 px-2 py-0.5 rounded-md border border-sky-200">
                        {lesson.category}
                      </span>
                      {isCompleted && (
                        <span className="flex items-center gap-1 text-[11px] font-black bg-emerald-100 text-emerald-800 px-2 py-0.5 rounded-md border border-emerald-300">
                          <CheckCircle className="w-3 h-3 text-emerald-600" />
                          Voltooi ({score || 100}%)
                        </span>
                      )}
                      {matchDetail && (
                        <span className="text-[11px] font-black bg-amber-500 text-white px-2 py-0.5 rounded-md flex items-center gap-1">
                          <Sparkles className="w-3 h-3" />
                          {matchDetail}
                        </span>
                      )}
                    </div>

                    {/* Lesson Title */}
                    <div className="flex items-baseline gap-2">
                      <span className="text-2xl mr-1 select-none">{lesson.icon}</span>
                      <h3 className="font-fun text-lg sm:text-xl font-black text-slate-900 group-hover:text-amber-700 transition-colors">
                        {lesson.titleAf}
                      </h3>
                      <span className="text-xs sm:text-sm font-bold text-slate-500">
                        ({lesson.titleEn})
                      </span>
                    </div>

                    {/* CAPS Topic & Summary */}
                    <p className="text-xs sm:text-sm text-slate-600 font-semibold leading-relaxed">
                      {lesson.summaryEn}
                    </p>

                    {/* Matched or Sample Vocabulary Chips with Pronunciation Audio */}
                    {(matchedVocab && matchedVocab.length > 0
                      ? matchedVocab
                      : lesson.vocabulary.slice(0, 4)
                    ).length > 0 && (
                      <div className="pt-1.5 flex flex-wrap items-center gap-1.5">
                        <span className="text-[11px] font-bold text-slate-400 mr-1">
                          {matchedVocab && matchedVocab.length > 0 ? 'Woorde gevind:' : 'Voorbeelde:'}
                        </span>
                        {(matchedVocab && matchedVocab.length > 0
                          ? matchedVocab.slice(0, 5)
                          : lesson.vocabulary.slice(0, 4)
                        ).map((v) => (
                          <button
                            key={v.id}
                            type="button"
                            onClick={(e) => handlePlayWord(e, v)}
                            className={`text-xs font-bold px-2 py-1 rounded-xl border flex items-center gap-1.5 transition-transform active:scale-95 ${
                              playingWordId === v.id
                                ? 'bg-emerald-500 text-white border-emerald-600 animate-pulse'
                                : 'bg-amber-50 hover:bg-amber-100 text-amber-950 border-amber-300'
                            }`}
                            title={`Luister na "${v.afrikaans}" in Afrikaans!`}
                          >
                            <span>{v.emoji || '🗣️'}</span>
                            <span className="font-black">{v.afrikaans}</span>
                            <span className="text-[10px] text-amber-700 font-normal">({v.english})</span>
                            <Volume2 className="w-3 h-3 text-amber-600" />
                          </button>
                        ))}
                      </div>
                    )}
                  </div>

                  {/* Right: Action Button */}
                  <div className="flex md:flex-col items-center md:items-end justify-between md:justify-center gap-2 pt-2 md:pt-0 border-t md:border-t-0 border-slate-100">
                    <span className="text-xs font-black text-slate-400 hidden md:block">
                      {lesson.vocabulary.length} woorde • {lesson.questions.length} vrae
                    </span>
                    <button
                      type="button"
                      onClick={() => handleSelect(lesson.id)}
                      className="bg-amber-500 hover:bg-amber-600 text-white px-4 py-2 sm:py-2.5 rounded-xl font-fun font-black text-xs sm:text-sm flex items-center gap-1.5 shadow-sm group-hover:scale-105 transition-all"
                    >
                      <span>Begin Les</span>
                      <ArrowRight className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              );
            })
          ) : (
            /* Empty State */
            <div className="py-12 px-4 text-center space-y-4">
              <div className="w-20 h-20 mx-auto rounded-3xl bg-amber-100 border-2 border-amber-300 flex items-center justify-center text-4xl shadow-inner">
                🦉
              </div>
              <div className="max-w-md mx-auto space-y-1">
                <h3 className="font-fun text-xl font-black text-slate-800">
                  Oeps! Geen lesse gevind vir "{searchQuery}" nie
                </h3>
                <p className="text-xs sm:text-sm text-slate-500 font-bold">
                  Probeer soek vir 'n algemene term soos STOMPI, meervoude, tye, diere of groete.
                </p>
              </div>

              {/* Suggestions */}
              <div className="pt-2 flex flex-wrap justify-center gap-2 max-w-lg mx-auto">
                {POPULAR_SEARCHES.map((pop) => (
                  <button
                    key={pop.query}
                    onClick={() => handlePopularSearchClick(pop.query)}
                    className="bg-amber-100/80 hover:bg-amber-200 text-amber-950 border border-amber-300 px-3 py-1.5 rounded-xl text-xs font-black transition-all active:scale-95"
                  >
                    {pop.label}
                  </button>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Footer shortcuts tip */}
        <div className="px-4 py-2.5 bg-amber-100/60 border-t border-amber-200 flex items-center justify-between text-xs text-amber-950 font-bold">
          <div className="flex items-center gap-1.5">
            <span>💡 Wenk:</span>
            <span>Tik enige Afrikaanse of Engelse woord om direk na daardie les te spring.</span>
          </div>
          <button
            onClick={onClose}
            className="text-amber-800 hover:text-amber-950 font-black hover:underline"
          >
            Maak toe (ESC)
          </button>
        </div>
      </div>
    </div>
  );
};
