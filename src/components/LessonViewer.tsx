import React, { useState, useEffect } from 'react';
import { Volume2, VolumeX, ChevronLeft, ChevronRight, HelpCircle, Check, Award, BookOpen, Lightbulb, Train, Play, Square, Gauge, Settings, Mic } from 'lucide-react';
import { LessonContent, VocabWord } from '../types';
import { LESSONS_DATA } from '../data/curriculumData';
import { OllieCharacter } from './OllieCharacter';
import { QuizModal } from './QuizModal';
import { speakAfrikaans, stopSpeaking, sounds, getCurrentVoiceInfo, testSouthAfricanVoice } from '../utils/audio';
import { VoiceSettingsModal } from './VoiceSettingsModal';
import { SentenceAudioPlayer } from './SentenceAudioPlayer';

interface LessonViewerProps {
  lessonId: string;
  onBackToMap: () => void;
  onSelectLesson: (lessonId: string) => void;
}

export const LessonViewer: React.FC<LessonViewerProps> = ({
  lessonId,
  onBackToMap,
  onSelectLesson
}) => {
  const lesson = LESSONS_DATA.find((l) => l.id === lessonId) || LESSONS_DATA[0];
  const currentIndex = LESSONS_DATA.findIndex((l) => l.id === lesson.id);

  const prevLesson = currentIndex > 0 ? LESSONS_DATA[currentIndex - 1] : null;
  const nextLesson = currentIndex < LESSONS_DATA.length - 1 ? LESSONS_DATA[currentIndex + 1] : null;

  const [activeTab, setActiveTab] = useState<'learn' | 'vocab' | 'sentences' | 'stompi'>('learn');
  const [showQuiz, setShowQuiz] = useState(false);
  const [showVoiceModal, setShowVoiceModal] = useState(false);
  const [flippedCards, setFlippedCards] = useState<Record<string, boolean>>({});
  
  // Web Speech API state
  const [speakingId, setSpeakingId] = useState<string | null>(null);
  const [speechRate, setSpeechRate] = useState<number>(0.82); // 0.82 = normal clear, 0.68 = slow & steady
  const [isPlayingAll, setIsPlayingAll] = useState(false);

  useEffect(() => {
    // Stop any ongoing speech when navigating lessons or unmounting
    return () => {
      stopSpeaking();
    };
  }, [lessonId]);

  const toggleFlip = (e: React.MouseEvent, id: string) => {
    e.stopPropagation();
    sounds.playPop();
    setFlippedCards((prev) => ({ ...prev, [id]: !prev[id] }));
  };

  const handlePronounce = (id: string, text: string) => {
    sounds.playPop();
    setSpeakingId(id);
    speakAfrikaans(text, {
      rate: speechRate,
      onStart: () => setSpeakingId(id),
      onEnd: () => setSpeakingId((curr) => (curr === id ? null : curr)),
      onError: () => setSpeakingId(null)
    });
  };

  // Play through all vocabulary in sequence with Web Speech API
  const handlePlayAllVocab = async () => {
    if (isPlayingAll) {
      stopSpeaking();
      setIsPlayingAll(false);
      setSpeakingId(null);
      return;
    }

    setIsPlayingAll(true);
    for (let i = 0; i < lesson.vocabulary.length; i++) {
      const v = lesson.vocabulary[i];
      setSpeakingId(v.id);
      
      await new Promise<void>((resolve) => {
        const spoken = speakAfrikaans(v.afrikaans, {
          rate: speechRate,
          onEnd: () => {
            setTimeout(resolve, 600); // Small pause between words
          },
          onError: () => resolve()
        });
        if (!spoken) resolve();
      });
    }

    setIsPlayingAll(false);
    setSpeakingId(null);
  };

  const toggleSpeechSpeed = () => {
    sounds.playPop();
    setSpeechRate((prev) => (prev > 0.75 ? 0.68 : 0.82));
  };

  return (
    <div className="space-y-6 pb-12">
      {/* Top Navigation Bar */}
      <div className="flex items-center justify-between gap-3 bg-white p-3 sm:p-4 rounded-2xl border-2 border-amber-200 shadow-2xs">
        <button
          onClick={onBackToMap}
          className="flex items-center gap-1.5 text-xs sm:text-sm font-black text-amber-950 bg-amber-100 hover:bg-amber-200 px-3 py-1.5 rounded-xl transition-colors"
        >
          <ChevronLeft className="w-4 h-4" />
          <span>Terug na Kaart</span>
        </button>

        <div className="flex items-center gap-2">
          {prevLesson && (
            <button
              onClick={() => onSelectLesson(prevLesson.id)}
              className="p-1.5 rounded-xl border border-amber-300 hover:bg-amber-50 text-amber-900 transition-colors"
              title={`Vorige: ${prevLesson.titleAf}`}
            >
              <ChevronLeft className="w-4 h-4" />
            </button>
          )}
          <span className="text-xs font-black text-amber-900 bg-amber-50 border border-amber-200 px-2.5 py-1 rounded-lg">
            Les {lesson.topicNumber} van 15
          </span>
          {nextLesson && (
            <button
              onClick={() => onSelectLesson(nextLesson.id)}
              className="p-1.5 rounded-xl border border-amber-300 hover:bg-amber-50 text-amber-900 transition-colors"
              title={`Volgende: ${nextLesson.titleAf}`}
            >
              <ChevronRight className="w-4 h-4" />
            </button>
          )}
        </div>
      </div>

      {/* Lesson Header Banner */}
      <div className="bg-gradient-to-r from-amber-400 via-orange-400 to-amber-500 rounded-3xl p-5 sm:p-6 text-white shadow-sm border-3 border-amber-300 relative overflow-hidden">
        <div className="flex flex-wrap items-center justify-between gap-4 relative z-10">
          <div className="flex items-center gap-4">
            <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-2xl bg-white/20 backdrop-blur-xs border-2 border-white/40 flex items-center justify-center text-4xl shadow-inner">
              {lesson.icon}
            </div>
            <div>
              <div className="flex flex-wrap items-center gap-2 mb-1">
                <span className="bg-white/25 text-white text-[11px] font-black uppercase tracking-wider px-2.5 py-0.5 rounded-full border border-white/30">
                  Kwartaal {lesson.term} • {lesson.category}
                </span>
                <span className="bg-amber-900/40 text-amber-100 text-[11px] font-bold px-2 py-0.5 rounded-full">
                  CAPS 2026
                </span>
              </div>
              <div className="flex items-center gap-2">
                <h1 className="font-fun text-2xl sm:text-3xl font-black text-white leading-tight">
                  {lesson.titleAf}
                </h1>
                <button
                  onClick={() => handlePronounce(`header-${lesson.id}`, lesson.titleAf)}
                  className={`p-2 rounded-xl backdrop-blur-xs border transition-all ${
                    speakingId === `header-${lesson.id}`
                      ? 'bg-white text-amber-900 border-white ring-2 ring-white scale-110 animate-pulse'
                      : 'bg-white/20 hover:bg-white/30 text-white border-white/40'
                  }`}
                  title="Luister na die les-titel"
                >
                  <Volume2 className="w-5 h-5" />
                </button>
              </div>
              <p className="text-amber-100 font-bold text-sm sm:text-base">
                {lesson.titleEn}
              </p>
            </div>
          </div>

          <div className="flex flex-wrap items-center gap-2">
            <button
              onClick={() => setShowQuiz(true)}
              className="bg-white text-amber-950 hover:bg-amber-100 px-5 py-3 rounded-2xl font-black text-sm shadow-md flex items-center gap-2 transition-transform hover:scale-105 active:scale-95"
            >
              <Award className="w-5 h-5 text-amber-600 fill-amber-500" />
              <span>Doen Oefentoets & Kry Sterre! ⭐</span>
            </button>
          </div>
        </div>
      </div>

      {/* Ollie's Tip */}
      <OllieCharacter
        afrikaansText={lesson.ollieTip.afrikaans}
        englishText={lesson.ollieTip.english}
        mood="explaining"
      />

      {/* Navigation Sub-Tabs & Pronunciation Speed Controls */}
      <div className="flex flex-wrap items-center justify-between gap-2 border-b border-amber-200 pb-2">
        <div className="flex items-center gap-2">
          <button
            onClick={() => { setActiveTab('learn'); sounds.playPop(); }}
            className={`flex items-center gap-2 px-4 py-2 rounded-xl font-black text-sm transition-all ${
              activeTab === 'learn'
                ? 'bg-amber-500 text-white shadow-sm'
                : 'text-amber-950 bg-white hover:bg-amber-100 border border-amber-200'
            }`}
          >
            <BookOpen className="w-4 h-4" />
            <span>Verduideliking (Learn)</span>
          </button>

          <button
            onClick={() => { setActiveTab('vocab'); sounds.playPop(); }}
            className={`flex items-center gap-2 px-4 py-2 rounded-xl font-black text-sm transition-all ${
              activeTab === 'vocab'
                ? 'bg-amber-500 text-white shadow-sm'
                : 'text-amber-950 bg-white hover:bg-amber-100 border border-amber-200'
            }`}
          >
            <span>🗂️</span>
            <span>Flitskaarte ({lesson.vocabulary.length})</span>
          </button>

          <button
            onClick={() => { setActiveTab('sentences'); sounds.playPop(); }}
            className={`flex items-center gap-2 px-4 py-2 rounded-xl font-black text-sm transition-all ${
              activeTab === 'sentences'
                ? 'bg-amber-500 text-white shadow-sm'
                : 'text-amber-950 bg-white hover:bg-amber-100 border border-amber-200'
            }`}
          >
            <Mic className="w-4 h-4" />
            <span>Sin-Lees & Praat 🎙️</span>
          </button>

          {lesson.stompIRule && (
            <button
              onClick={() => { setActiveTab('stompi'); sounds.playPop(); }}
              className={`flex items-center gap-2 px-4 py-2 rounded-xl font-black text-sm transition-all ${
                activeTab === 'stompi'
                  ? 'bg-cyan-600 text-white shadow-sm'
                  : 'text-cyan-900 bg-white hover:bg-cyan-50 border border-cyan-300'
              }`}
            >
              <Train className="w-4 h-4" />
              <span>STOMPI Trein</span>
            </button>
          )}
        </div>

        {/* Audio helper controls */}
        <div className="flex items-center gap-2 ml-auto">
          <button
            onClick={() => setShowVoiceModal(true)}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl border border-emerald-400 bg-emerald-50 hover:bg-emerald-100 text-emerald-950 text-xs font-bold transition-all shadow-2xs"
            title="Suid-Afrikaanse stem-instellings (Geen Nederlands)"
          >
            <span>🇿🇦</span>
            <span className="hidden sm:inline">Stem-instellings</span>
          </button>

          <button
            onClick={toggleSpeechSpeed}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl border border-amber-300 bg-amber-50 hover:bg-amber-100 text-amber-900 text-xs font-bold transition-all"
            title="Wissel spoed van Afrikaanse uitspraak"
          >
            <Gauge className="w-3.5 h-3.5 text-amber-700" />
            <span>Spoed: {speechRate > 0.75 ? 'Normaal 🔊' : 'Stadiger 🐢'}</span>
          </button>

          <button
            onClick={() => setShowQuiz(true)}
            className="flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl font-black text-xs sm:text-sm bg-emerald-500 hover:bg-emerald-600 text-white shadow-sm transition-transform active:scale-95"
          >
            <span>📝</span>
            <span>Oefen Vrae</span>
          </button>
        </div>
      </div>

      {/* TAB 1: LEARN / EXPLANATION */}
      {activeTab === 'learn' && (
        <div className="space-y-6">
          <div className="bg-emerald-50 border border-emerald-300 p-3.5 rounded-2xl flex items-center justify-between text-xs sm:text-sm font-bold text-emerald-950">
            <span className="flex items-center gap-2">
              <Volume2 className="w-4 h-4 text-emerald-700 animate-pulse" />
              <span>Klik op enige voorbeeld om die korrekte Afrikaanse uitspraak te hoor!</span>
            </span>
            <span className="bg-emerald-200 text-emerald-900 text-[11px] px-2 py-0.5 rounded-full font-extrabold hidden sm:inline">
              🇿🇦 Suid-Afrikaanse Stem (Geen Nederlands)
            </span>
          </div>

          {lesson.explanationBlocks.map((block, idx) => (
            <div
              key={idx}
              className="bg-white rounded-3xl p-5 sm:p-6 border-2 border-amber-200 shadow-2xs space-y-4"
            >
              {/* Header */}
              <div className="flex items-center justify-between border-b border-amber-100 pb-3">
                <div className="flex items-center gap-3">
                  <div className="w-9 h-9 rounded-xl bg-amber-100 text-amber-900 flex items-center justify-center font-black text-sm border border-amber-300">
                    {idx + 1}
                  </div>
                  <div>
                    <h3 className="font-fun text-lg sm:text-xl font-black text-slate-900">
                      {block.headingAf}
                    </h3>
                    <p className="text-xs sm:text-sm font-bold text-amber-800">
                      {block.headingEn}
                    </p>
                  </div>
                </div>

                <button
                  onClick={() => handlePronounce(`block-heading-${idx}`, block.headingAf)}
                  className="p-2 rounded-xl bg-amber-50 hover:bg-amber-100 text-amber-900 border border-amber-200 text-xs font-bold flex items-center gap-1"
                  title="Luister na opskrif"
                >
                  <Volume2 className="w-3.5 h-3.5" />
                  <span className="hidden sm:inline">Luister</span>
                </button>
              </div>

              {/* Explanatory text */}
              <div className="bg-amber-50/70 p-3.5 rounded-2xl border border-amber-200/80 text-sm leading-relaxed text-slate-700">
                <p className="font-semibold text-slate-800 mb-1">{block.contentEn}</p>
                <p className="text-xs text-amber-900 italic font-medium">{block.contentAf}</p>
              </div>

              {/* Examples Grid */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-1">
                {block.examples.map((ex, exIdx) => {
                  const exId = `ex-${idx}-${exIdx}`;
                  const isSpeaking = speakingId === exId;

                  return (
                    <div
                      key={exIdx}
                      onClick={() => handlePronounce(exId, ex.afrikaans)}
                      className={`p-3.5 rounded-2xl border-2 transition-all cursor-pointer flex items-start justify-between gap-3 group select-none ${
                        isSpeaking
                          ? 'bg-amber-100 border-amber-500 ring-2 ring-amber-400 shadow-md scale-101'
                          : 'bg-slate-50 border-slate-200 hover:border-amber-400 hover:bg-amber-50/50'
                      }`}
                      title="Klik om te luister!"
                    >
                      <div className="min-w-0">
                        <div className="flex items-center gap-2">
                          <span className="font-fun text-base font-bold text-amber-950 group-hover:text-amber-800 transition-colors">
                            {ex.afrikaans}
                          </span>
                          {ex.highlight && (
                            <span className="text-[11px] font-bold bg-amber-100 text-amber-900 px-1.5 py-0.5 rounded border border-amber-300">
                              {ex.highlight}
                            </span>
                          )}
                          {isSpeaking && (
                            <span className="text-[10px] font-black uppercase text-amber-900 bg-amber-200 px-1.5 py-0.5 rounded-md animate-pulse">
                              Praat...
                            </span>
                          )}
                        </div>
                        <p className="text-xs font-semibold text-slate-600 mt-0.5">
                          {ex.english}
                        </p>
                        {ex.note && (
                          <p className="text-[11px] text-amber-800 mt-1 italic">
                            💡 {ex.note}
                          </p>
                        )}
                      </div>

                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          handlePronounce(exId, ex.afrikaans);
                        }}
                        className={`shrink-0 p-2.5 rounded-xl border transition-all ${
                          isSpeaking
                            ? 'bg-amber-500 text-white border-amber-600 scale-110 shadow-sm'
                            : 'bg-white border-amber-200 text-amber-800 hover:bg-amber-100 hover:text-amber-950 shadow-2xs'
                        }`}
                        title="Klik om uitspraak te hoor"
                      >
                        <Volume2 className={`w-4 h-4 ${isSpeaking ? 'animate-bounce' : ''}`} />
                      </button>
                    </div>
                  );
                })}
              </div>
            </div>
          ))}
        </div>
      )}

      {/* TAB 2: VOCABULARY FLASHCARDS */}
      {activeTab === 'vocab' && (
        <div className="space-y-4">
          {/* Action Bar */}
          <div className="bg-amber-100/70 p-4 rounded-3xl border border-amber-300 flex flex-wrap items-center justify-between gap-3">
            <div className="flex items-center gap-2 text-xs sm:text-sm font-bold text-amber-950">
              <Lightbulb className="w-4 h-4 text-amber-700" />
              <span>Tik op enige woord om die uitspraak te hoor! Tik "Draai om" vir Engels.</span>
            </div>

            <div className="flex items-center gap-2">
              <button
                onClick={handlePlayAllVocab}
                className={`flex items-center gap-1.5 px-4 py-2 rounded-xl text-xs font-black transition-all shadow-sm ${
                  isPlayingAll
                    ? 'bg-rose-500 text-white hover:bg-rose-600'
                    : 'bg-amber-600 text-white hover:bg-amber-700'
                }`}
              >
                {isPlayingAll ? <Square className="w-3.5 h-3.5 fill-current" /> : <Play className="w-3.5 h-3.5 fill-current" />}
                <span>{isPlayingAll ? 'Stop Uitspraak' : 'Luister na Almal 🔊'}</span>
              </button>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
            {lesson.vocabulary.map((v) => {
              const isFlipped = !!flippedCards[v.id];
              const isSpeaking = speakingId === v.id;

              return (
                <div
                  key={v.id}
                  onClick={() => handlePronounce(v.id, v.afrikaans)}
                  className={`min-h-[185px] p-4 rounded-3xl border-2 cursor-pointer transition-all flex flex-col justify-between shadow-2xs select-none hover:shadow-md ${
                    isSpeaking
                      ? 'bg-gradient-to-br from-amber-100 to-yellow-100 border-amber-500 ring-3 ring-amber-400/60 scale-102 shadow-md'
                      : isFlipped
                      ? 'bg-gradient-to-br from-amber-50 to-orange-100 border-amber-400'
                      : 'bg-white border-amber-200 hover:border-amber-400'
                  }`}
                  title="Klik om uitspraak te hoor!"
                >
                  {/* Top Bar */}
                  <div className="flex items-center justify-between">
                    <span className="text-3xl">{v.emoji || '📖'}</span>

                    <div className="flex items-center gap-1.5">
                      <button
                        onClick={(e) => toggleFlip(e, v.id)}
                        className="text-[11px] font-bold text-amber-900 bg-amber-50 hover:bg-amber-200 border border-amber-300 px-2 py-1 rounded-lg"
                        title="Wys Engelse vertaling"
                      >
                        {isFlipped ? 'Wys Afrikaans' : 'Draai om 🔄'}
                      </button>

                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          handlePronounce(v.id, v.afrikaans);
                        }}
                        className={`p-2 rounded-xl border transition-all ${
                          isSpeaking
                            ? 'bg-amber-500 text-white border-amber-600 scale-110'
                            : 'bg-amber-100 hover:bg-amber-200 text-amber-900 border-amber-300'
                        }`}
                        title="Luister na die woord"
                      >
                        <Volume2 className={`w-4 h-4 ${isSpeaking ? 'animate-bounce' : ''}`} />
                      </button>
                    </div>
                  </div>

                  {/* Main Word */}
                  <div className="my-2">
                    {!isFlipped ? (
                      <>
                        <div className="flex items-center gap-2">
                          <h4 className="font-fun text-xl font-black text-amber-950 hover:text-amber-700 transition-colors">
                            {v.afrikaans}
                          </h4>
                          {isSpeaking && (
                            <span className="w-2.5 h-2.5 rounded-full bg-amber-500 animate-ping" />
                          )}
                        </div>
                        <p className="text-xs font-bold text-amber-800 bg-amber-100/70 inline-block px-2 py-0.5 rounded-md mt-1">
                          [{v.pronunciation}]
                        </p>
                      </>
                    ) : (
                      <>
                        <span className="text-[11px] font-black uppercase text-amber-700 tracking-wider">
                          Engels vertaling:
                        </span>
                        <h4 className="font-fun text-xl font-black text-slate-900">
                          {v.english}
                        </h4>
                      </>
                    )}
                  </div>

                  {/* Bottom Example */}
                  <div 
                    onClick={(e) => {
                      e.stopPropagation();
                      handlePronounce(`sent-${v.id}`, v.exampleSentenceAf);
                    }}
                    className="pt-2 border-t border-amber-100/80 text-[11px] hover:text-amber-900 flex items-center justify-between"
                    title="Klik om voorbeeldsin te hoor"
                  >
                    {!isFlipped ? (
                      <p className="text-slate-600 italic truncate">
                        "{v.exampleSentenceAf}"
                      </p>
                    ) : (
                      <p className="text-slate-600 font-medium truncate">
                        "{v.exampleSentenceEn}"
                      </p>
                    )}
                    <Volume2 className="w-3 h-3 text-amber-600 shrink-0 ml-1 opacity-70" />
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* TAB: SENTENCE READING & VOICE-TO-TEXT PRACTICE */}
      {activeTab === 'sentences' && (
        <div className="space-y-5">
          <div className="bg-gradient-to-r from-amber-500 via-orange-500 to-amber-600 rounded-3xl p-5 sm:p-6 text-white shadow-sm border-2 border-amber-300">
            <div className="flex flex-wrap items-center justify-between gap-3">
              <div>
                <span className="bg-white/20 text-white text-[11px] font-black uppercase tracking-wider px-2.5 py-0.5 rounded-full">
                  Luister & Praat Saam
                </span>
                <h3 className="font-fun text-xl sm:text-2xl font-black mt-1">
                  Oefen Sinne Lees & Praat 🎙️
                </h3>
                <p className="text-amber-100 text-xs sm:text-sm font-semibold max-w-xl">
                  Luister hoe Ollie elke sin met natuurlike asemhaling-pouses en klousules lees. Klik op <strong>"Praat Saam"</strong> om self in die mikrofoon te praat en jou uitspraak te toets!
                </p>
              </div>

              <button
                onClick={() => setShowVoiceModal(true)}
                className="bg-white/20 hover:bg-white/30 text-white font-fun font-bold text-xs px-3.5 py-2 rounded-xl border border-white/40 flex items-center gap-1.5 transition-colors"
              >
                <Settings className="w-3.5 h-3.5" />
                <span>Verstel Leesspoed & Mikrofoon</span>
              </button>
            </div>
          </div>

          <div className="space-y-3">
            <span className="text-xs font-black uppercase text-slate-500 block">
              Sinne van hierdie les ({lesson.titleAf}):
            </span>

            {/* List all example sentences from explanation blocks and vocabulary */}
            <div className="space-y-3">
              {lesson.vocabulary.map((v, vIdx) => (
                <SentenceAudioPlayer
                  key={`v-sent-${vIdx}`}
                  sentenceAf={v.exampleSentenceAf}
                  sentenceEn={v.exampleSentenceEn}
                  label={`Voorbeeld ${vIdx + 1}: ${v.afrikaans}`}
                  highlightWords={[v.afrikaans]}
                />
              ))}

              {lesson.explanationBlocks.flatMap((b) => b.examples).slice(0, 4).map((ex, exIdx) => (
                <SentenceAudioPlayer
                  key={`ex-sent-${exIdx}`}
                  sentenceAf={ex.afrikaans}
                  sentenceEn={ex.english}
                  label={`Klousule-Sin: ${ex.highlight || 'Les-voorbeeld'}`}
                  highlightWords={ex.highlight ? [ex.highlight] : []}
                />
              ))}
            </div>
          </div>
        </div>
      )}

      {/* TAB 3: STOMPI TRAIN VISUALIZER (if applicable) */}
      {activeTab === 'stompi' && lesson.stompIRule && (
        <div className="bg-white rounded-3xl p-5 sm:p-6 border-2 border-cyan-300 shadow-sm space-y-6">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-2xl bg-cyan-500 text-white flex items-center justify-center text-2xl shadow-sm">
              🚂
            </div>
            <div>
              <h3 className="font-fun text-xl font-black text-cyan-950">
                Die Magiese STOMPI Trein
              </h3>
              <p className="text-xs sm:text-sm font-bold text-cyan-800">
                Die geheime formule vir korrekte Afrikaanse sinsbou! Klik enige waentjie om te luister.
              </p>
            </div>
          </div>

          {/* Train Carriages */}
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3">
            {lesson.stompIRule.map((c, cIdx) => (
              <div
                key={cIdx}
                onClick={() => handlePronounce(`stompi-${cIdx}`, c.example)}
                className="bg-gradient-to-b from-cyan-50 to-blue-50 border-2 border-cyan-300 hover:border-cyan-500 rounded-2xl p-3 flex flex-col justify-between text-center shadow-2xs transition-all cursor-pointer group"
                title="Klik om voorbeeld te hoor"
              >
                <div>
                  <div className="w-10 h-10 mx-auto rounded-full bg-cyan-600 text-white font-black text-xl flex items-center justify-center shadow-2xs mb-2">
                    {c.letter}
                  </div>
                  <h4 className="font-fun text-xs font-black text-cyan-950 mb-0.5">
                    {c.afrikaans}
                  </h4>
                  <p className="text-[11px] font-bold text-slate-500 leading-tight">
                    {c.english}
                  </p>
                </div>
                <div className="mt-3 bg-white p-1.5 rounded-xl border border-cyan-200 text-[11px] font-bold text-cyan-900 group-hover:bg-cyan-100 flex items-center justify-center gap-1">
                  <span>{c.example}</span>
                  <Volume2 className="w-3 h-3 text-cyan-600" />
                </div>
              </div>
            ))}
          </div>

          <div className="bg-amber-50 p-4 rounded-2xl border border-amber-300 flex items-start gap-3">
            <span className="text-2xl">💡</span>
            <div className="text-xs sm:text-sm text-amber-950 font-bold leading-relaxed">
              <span className="font-black">Ollie se STOMPI-reël:</span> In Afrikaans is Werkwoord 1 ALTYD in die tweede posisie!
              Byvoorbeeld: <span className="underline decoration-amber-500 cursor-pointer" onClick={() => handlePronounce('stompi-ex', 'Die kinders eet nou appels')}>Die kinders (S) EET (V1) nou (T) appels (O). 🔊</span>
            </div>
          </div>
        </div>
      )}

      {/* QUIZ MODAL */}
      {showQuiz && (
        <QuizModal
          lesson={lesson}
          onClose={() => setShowQuiz(false)}
        />
      )}

      {/* VOICE SETTINGS MODAL */}
      {showVoiceModal && (
        <VoiceSettingsModal
          onClose={() => setShowVoiceModal(false)}
        />
      )}
    </div>
  );
};

