import React, { useState, useEffect } from 'react';
import { BookOpen, Volume2, CheckCircle, AlertCircle, HelpCircle, Award, Eye, EyeOff, Square, Settings, Mic } from 'lucide-react';
import { READING_STORIES } from '../data/storiesData';
import { useProgress } from '../context/ProgressContext';
import { OllieCharacter } from './OllieCharacter';
import { speakAfrikaans, speakAfrikaansSentence, stopSpeaking, sounds } from '../utils/audio';
import { VoiceSettingsModal } from './VoiceSettingsModal';
import { SentenceAudioPlayer } from './SentenceAudioPlayer';

export const StoriesViewer: React.FC = () => {
  const { addStars, addGems, triggerConfetti } = useProgress();
  const [activeStoryIdx, setActiveStoryIdx] = useState(0);
  const story = READING_STORIES[activeStoryIdx];

  const [showEnglishStory, setShowEnglishStory] = useState(false);
  const [readingMode, setReadingMode] = useState<'paragraph' | 'sentences'>('paragraph');
  const [isPlayingStory, setIsPlayingStory] = useState(false);
  const [activeSentenceIdx, setActiveSentenceIdx] = useState<number>(-1);
  const [showVoiceModal, setShowVoiceModal] = useState(false);
  const [selectedAnswers, setSelectedAnswers] = useState<Record<string, string>>({});
  const [checkedAnswers, setCheckedAnswers] = useState(false);

  // Split story text into individual sentences
  const storySentences = story.storyAf
    .split(/(?<=[.!?])\s+/)
    .map((s) => s.trim())
    .filter((s) => s.length > 0);

  useEffect(() => {
    return () => {
      stopSpeaking();
    };
  }, [activeStoryIdx]);

  const handlePlayWholeStory = async () => {
    sounds.playPop();
    if (isPlayingStory) {
      stopSpeaking();
      setIsPlayingStory(false);
      setActiveSentenceIdx(-1);
      return;
    }

    setIsPlayingStory(true);
    for (let i = 0; i < storySentences.length; i++) {
      setActiveSentenceIdx(i);
      const ok = await speakAfrikaansSentence(storySentences[i], {
        pauseBetweenClauses: 250
      });
      if (!ok) break;
      await new Promise((r) => setTimeout(r, 350));
    }

    setIsPlayingStory(false);
    setActiveSentenceIdx(-1);
  };

  const handleSelect = (qId: string, opt: string) => {
    if (checkedAnswers) return;
    sounds.playPop();
    setSelectedAnswers((prev) => ({ ...prev, [qId]: opt }));
  };

  const handleCheck = () => {
    sounds.playVictory();
    setCheckedAnswers(true);
    let correctCount = 0;
    story.questions.forEach((q) => {
      if (selectedAnswers[q.id] === q.correctAnswer) {
        correctCount += q.marks;
      }
    });

    if (correctCount >= 6) {
      addStars(5);
      addGems(2);
      triggerConfetti();
    } else {
      addStars(2);
    }
  };

  const resetQuiz = () => {
    sounds.playPop();
    setSelectedAnswers({});
    setCheckedAnswers(false);
  };

  const scoreEarned = story.questions.reduce((acc, q) => {
    return acc + (selectedAnswers[q.id] === q.correctAnswer ? q.marks : 0);
  }, 0);

  return (
    <div className="space-y-6 pb-12">
      {/* Header */}
      <div className="bg-gradient-to-r from-amber-500 via-orange-500 to-rose-500 rounded-3xl p-5 sm:p-6 text-white shadow-sm border-3 border-amber-300">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <div>
            <span className="bg-white/20 text-white text-xs font-black uppercase tracking-wider px-2.5 py-0.5 rounded-full border border-white/30">
              Lees en Kyk • Begripstoetse
            </span>
            <h1 className="font-fun text-2xl sm:text-3xl font-black mt-1">
              Graad 4 Leesbegrip Stories 📖
            </h1>
            <p className="text-amber-100 font-bold text-sm sm:text-base">
              Lees 'n Suid-Afrikaanse storie, leer nuwe woorde en beantwoord die vrae!
            </p>
          </div>

          {/* Story Selector tabs */}
          <div className="flex items-center gap-2 bg-white/20 backdrop-blur-xs p-1 rounded-2xl border border-white/30">
            {READING_STORIES.map((s, idx) => (
              <button
                key={s.id}
                onClick={() => {
                  setActiveStoryIdx(idx);
                  resetQuiz();
                }}
                className={`px-3 py-1.5 rounded-xl font-fun font-bold text-xs sm:text-sm transition-all ${
                  activeStoryIdx === idx
                    ? 'bg-white text-amber-950 shadow-sm'
                    : 'text-white hover:bg-white/10'
                }`}
              >
                Storie {idx + 1}
              </button>
            ))}
          </div>
        </div>
      </div>

      <OllieCharacter
        afrikaansText="Lees die storie mooi rustig deur. As 'n woord jou vashaak, kyk na die woordelys aan die kant!"
        englishText="Take your time reading! You can also toggle the English translation below if you get stuck on any tricky words."
        mood="explaining"
      />

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left 2 Cols: The Reading Passage */}
        <div className="lg:col-span-2 space-y-4">
          <div className="bg-white rounded-3xl p-5 sm:p-7 border-2 border-amber-200 shadow-sm space-y-4">
            <div className="flex flex-wrap items-center justify-between gap-3 border-b border-amber-100 pb-3">
              <div>
                <h2 className="font-fun text-2xl font-black text-amber-950">
                  {story.titleAf}
                </h2>
                <p className="text-xs sm:text-sm font-bold text-amber-800">
                  {story.titleEn} • {story.wordCount} woorde
                </p>
              </div>

              <div className="flex flex-wrap items-center gap-2">
                {/* Mode toggle */}
                <div className="bg-amber-100 p-0.5 rounded-xl border border-amber-300 flex items-center text-xs font-bold">
                  <button
                    onClick={() => { setReadingMode('paragraph'); sounds.playPop(); }}
                    className={`px-2.5 py-1 rounded-lg transition-all ${
                      readingMode === 'paragraph'
                        ? 'bg-amber-500 text-white shadow-2xs'
                        : 'text-amber-900 hover:text-amber-950'
                    }`}
                  >
                    Storie-Teks
                  </button>
                  <button
                    onClick={() => { setReadingMode('sentences'); sounds.playPop(); }}
                    className={`px-2.5 py-1 rounded-lg transition-all flex items-center gap-1 ${
                      readingMode === 'sentences'
                        ? 'bg-amber-500 text-white shadow-2xs'
                        : 'text-amber-900 hover:text-amber-950'
                    }`}
                  >
                    <Mic className="w-3 h-3" />
                    <span>Sin-vir-Sin & Praat</span>
                  </button>
                </div>

                <button
                  onClick={handlePlayWholeStory}
                  className={`p-2 rounded-xl border flex items-center gap-1 text-xs font-bold transition-all ${
                    isPlayingStory
                      ? 'bg-rose-500 text-white border-rose-600 animate-pulse'
                      : 'bg-amber-100 hover:bg-amber-200 text-amber-900 border-amber-300'
                  }`}
                  title={isPlayingStory ? 'Stop lees' : 'Luister hoe Ollie die hele storie met klousules lees'}
                >
                  {isPlayingStory ? <Square className="w-4 h-4 fill-white" /> : <Volume2 className="w-4 h-4" />}
                  <span className="hidden sm:inline">{isPlayingStory ? 'Stop' : 'Lees Alles'}</span>
                </button>

                <button
                  onClick={() => setShowVoiceModal(true)}
                  className="p-2 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 border border-slate-300"
                  title="Stel spraak- en mikrofoongevoeligheid in"
                >
                  <Settings className="w-4 h-4" />
                </button>

                <button
                  onClick={() => setShowEnglishStory(!showEnglishStory)}
                  className="flex items-center gap-1.5 text-xs font-bold bg-slate-100 hover:bg-slate-200 text-slate-700 px-3 py-1.5 rounded-xl border border-slate-300"
                >
                  {showEnglishStory ? <EyeOff className="w-3.5 h-3.5" /> : <Eye className="w-3.5 h-3.5" />}
                  <span>{showEnglishStory ? 'Steek Engels weg' : 'Wys Engels'}</span>
                </button>
              </div>
            </div>

            {/* Paragraph Mode */}
            {readingMode === 'paragraph' && (
              <div className="space-y-3 font-fun text-slate-800 text-base leading-relaxed whitespace-pre-line">
                <div className="bg-amber-50/40 p-4 sm:p-5 rounded-2xl border border-amber-200/60 leading-relaxed">
                  {storySentences.map((sentence, sIdx) => {
                    const isSentenceActive = isPlayingStory && activeSentenceIdx === sIdx;
                    return (
                      <span
                        key={sIdx}
                        className={`transition-all rounded px-1 py-0.5 inline ${
                          isSentenceActive
                            ? 'bg-amber-200 text-amber-950 font-black shadow-xs ring-2 ring-amber-300'
                            : 'hover:bg-amber-100/50 cursor-pointer'
                        }`}
                        onClick={() => speakAfrikaansSentence(sentence)}
                        title="Klik om net hierdie sin te hoor"
                      >
                        {sentence}{' '}
                      </span>
                    );
                  })}
                </div>

                {showEnglishStory && (
                  <div className="bg-sky-50/60 p-4 rounded-2xl border border-sky-200 text-sm text-slate-600 space-y-2">
                    <span className="text-xs font-black uppercase text-sky-800">Engelse Vertaling:</span>
                    <p>{story.storyEn}</p>
                  </div>
                )}
              </div>
            )}

            {/* Sentence-by-Sentence Mode with Mic / Voice to Text practice */}
            {readingMode === 'sentences' && (
              <div className="space-y-3">
                <div className="p-3 bg-amber-50 rounded-2xl border border-amber-200 text-xs text-amber-900 font-bold flex items-center justify-between">
                  <span>📖 Lees elke sin rustig deur, luister na Ollie, of praat self in die mikrofoon!</span>
                  <span className="text-amber-800">{storySentences.length} Sinne</span>
                </div>

                <div className="space-y-2.5 max-h-[500px] overflow-y-auto pr-1">
                  {storySentences.map((sent, sIdx) => (
                    <SentenceAudioPlayer
                      key={`story-sent-${sIdx}`}
                      sentenceAf={sent}
                      label={`Sin ${sIdx + 1}`}
                    />
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Comprehension Questions */}
          <div className="bg-white rounded-3xl p-5 sm:p-6 border-2 border-amber-200 shadow-sm space-y-5">
            <div className="flex items-center justify-between border-b border-amber-100 pb-3">
              <h3 className="font-fun text-xl font-black text-slate-900">
                Begripstoets Vrae ({story.questions.length} Vrae • {story.totalMarks} Punte)
              </h3>
              {checkedAnswers && (
                <span className="font-fun font-black text-emerald-700 bg-emerald-100 px-3 py-1 rounded-xl text-sm">
                  Jou Punt: {scoreEarned} / {story.totalMarks}
                </span>
              )}
            </div>

            <div className="space-y-4">
              {story.questions.map((q, qIdx) => {
                const selected = selectedAnswers[q.id];
                const isCorrect = checkedAnswers && selected === q.correctAnswer;

                return (
                  <div key={q.id} className="p-4 rounded-2xl bg-slate-50/70 border border-slate-200 space-y-2">
                    <div className="flex items-start justify-between gap-2">
                      <p className="font-fun font-bold text-sm sm:text-base text-slate-900">
                        {qIdx + 1}. {q.questionAf}
                      </p>
                      <span className="text-[11px] font-black text-amber-800 bg-amber-100 px-2 py-0.5 rounded-md shrink-0">
                        [{q.marks} punte]
                      </span>
                    </div>
                    <p className="text-xs text-slate-500 font-medium">
                      ({q.questionEn})
                    </p>

                    {/* Options */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 pt-1">
                      {q.options.map((opt) => {
                        let btnStyle = 'bg-white border-slate-200 hover:border-amber-300 text-slate-800';
                        if (checkedAnswers) {
                          if (opt === q.correctAnswer) {
                            btnStyle = 'bg-emerald-100 border-emerald-500 text-emerald-950 font-bold';
                          } else if (opt === selected) {
                            btnStyle = 'bg-rose-100 border-rose-400 text-rose-950';
                          }
                        } else if (selected === opt) {
                          btnStyle = 'bg-amber-100 border-amber-500 text-amber-950 font-bold';
                        }

                        return (
                          <button
                            key={opt}
                            onClick={() => handleSelect(q.id, opt)}
                            disabled={checkedAnswers}
                            className={`p-2.5 rounded-xl border text-xs sm:text-sm font-fun text-left transition-all ${btnStyle}`}
                          >
                            {opt}
                          </button>
                        );
                      })}
                    </div>

                    {/* Explanation */}
                    {checkedAnswers && (
                      <div className="pt-1 text-xs text-slate-600 bg-white p-2 rounded-lg border border-slate-200">
                        💡 <span className="font-bold">Memo verduideliking:</span> {q.explanationEn}
                      </div>
                    )}
                  </div>
                );
              })}
            </div>

            {/* Check button */}
            <div className="flex items-center justify-between pt-2">
              <button
                onClick={resetQuiz}
                className="text-xs font-bold text-slate-500 hover:underline"
              >
                Herstel Vrae
              </button>

              {!checkedAnswers ? (
                <button
                  onClick={handleCheck}
                  disabled={Object.keys(selectedAnswers).length < story.questions.length}
                  className="bg-emerald-500 hover:bg-emerald-600 disabled:opacity-50 text-white font-fun font-black px-6 py-2.5 rounded-2xl shadow-sm text-sm"
                >
                  Merk My Begripstoets! ✓
                </button>
              ) : (
                <div className="text-sm font-black text-emerald-700 flex items-center gap-1">
                  <CheckCircle className="w-5 h-5 text-emerald-600" />
                  <span>Begripstoets Nagesien!</span>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Right Col: Story Glossary */}
        <div className="space-y-4">
          <div className="bg-white rounded-3xl p-5 border-2 border-amber-200 shadow-sm space-y-4 sticky top-24">
            <div className="flex items-center gap-2 border-b border-amber-100 pb-2">
              <span className="text-2xl">📚</span>
              <div>
                <h3 className="font-fun text-lg font-black text-amber-950">
                  Storie-Woordelys
                </h3>
                <p className="text-xs text-amber-800 font-bold">
                  Belangrike woorde om te ken
                </p>
              </div>
            </div>

            <div className="space-y-2.5">
              {story.glossary.map((g, gIdx) => (
                <div
                  key={gIdx}
                  onClick={() => {
                    sounds.playPop();
                    speakAfrikaans(g.af);
                  }}
                  className="p-3 rounded-2xl bg-amber-50/70 border border-amber-200/80 hover:border-amber-400 hover:bg-amber-100/60 transition-all flex items-center justify-between gap-2 cursor-pointer group"
                  title="Klik om uitspraak te hoor!"
                >
                  <div>
                    <span className="font-fun font-bold text-amber-950 text-sm group-hover:text-amber-800 transition-colors">
                      {g.af}
                    </span>
                    <p className="text-xs font-semibold text-slate-600">
                      {g.en}
                    </p>
                    <span className="text-[10px] text-amber-800 font-mono">
                      [{g.pronunciation}]
                    </span>
                  </div>

                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      sounds.playPop();
                      speakAfrikaans(g.af);
                    }}
                    className="p-1.5 rounded-xl bg-white text-amber-800 hover:bg-amber-100 group-hover:scale-105 border border-amber-300 transition-transform shadow-2xs"
                    title="Luister na die woord"
                  >
                    <Volume2 className="w-3.5 h-3.5" />
                  </button>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
