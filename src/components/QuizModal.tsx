import React, { useState, useEffect } from 'react';
import { X, CheckCircle, AlertCircle, HelpCircle, Star, Volume2, ArrowRight, RotateCcw, Settings, ShieldCheck } from 'lucide-react';
import { LessonContent, QuizQuestion, DifficultyLevel } from '../types';
import { useProgress } from '../context/ProgressContext';
import { speakAfrikaans, sounds, getCurrentVoiceInfo, testSouthAfricanVoice, stopSpeaking } from '../utils/audio';
import { VoiceSettingsModal } from './VoiceSettingsModal';

interface QuizModalProps {
  lesson: LessonContent;
  onClose: () => void;
}

export const QuizModal: React.FC<QuizModalProps> = ({ lesson, onClose }) => {
  const { completeLesson, recordQuizResult } = useProgress();

  const [selectedDifficulty, setSelectedDifficulty] = useState<'all' | DifficultyLevel>('all');
  const [currentIndex, setCurrentIndex] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<string>('');
  const [isAnswerChecked, setIsAnswerChecked] = useState(false);
  const [showHint, setShowHint] = useState(false);
  const [score, setScore] = useState(0);
  const [quizFinished, setQuizFinished] = useState(false);
  const [showVoiceModal, setShowVoiceModal] = useState(false);
  const [voiceInfo, setVoiceInfo] = useState(getCurrentVoiceInfo());
  const [speakingId, setSpeakingId] = useState<string | null>(null);

  useEffect(() => {
    setVoiceInfo(getCurrentVoiceInfo());
    return () => {
      stopSpeaking();
    };
  }, [showVoiceModal]);

  const handleSpeak = (id: string, text: string) => {
    sounds.playPop();
    setSpeakingId(id);
    speakAfrikaans(text, {
      onStart: () => setSpeakingId(id),
      onEnd: () => setSpeakingId((curr) => (curr === id ? null : curr)),
      onError: () => setSpeakingId(null)
    });
  };

  // Filter questions based on difficulty
  const questions = selectedDifficulty === 'all'
    ? lesson.questions
    : lesson.questions.filter((q) => q.level === selectedDifficulty);

  const activeQuestions = questions.length > 0 ? questions : lesson.questions;
  const currentQ = activeQuestions[currentIndex];

  const handleSelectOption = (opt: string) => {
    if (isAnswerChecked) return;
    sounds.playPop();
    setSelectedAnswer(opt);
  };

  const handleCheckAnswer = () => {
    if (!selectedAnswer || isAnswerChecked) return;
    setIsAnswerChecked(true);

    const isCorrect = selectedAnswer.trim().toLowerCase() === currentQ.correctAnswer.trim().toLowerCase();
    if (isCorrect) {
      sounds.playCorrect();
      setScore((prev) => prev + 1);
    } else {
      sounds.playIncorrect();
    }
  };

  const handleNext = () => {
    sounds.playPop();
    if (currentIndex < activeQuestions.length - 1) {
      setCurrentIndex((prev) => prev + 1);
      setSelectedAnswer('');
      setIsAnswerChecked(false);
      setShowHint(false);
    } else {
      // Finished quiz!
      const finalScore = score + (selectedAnswer.trim().toLowerCase() === currentQ.correctAnswer.trim().toLowerCase() ? 0 : 0);
      const total = activeQuestions.length;
      const percent = Math.round((finalScore / total) * 100);

      recordQuizResult(lesson.id, finalScore, total);
      completeLesson(lesson.id, percent);
      setQuizFinished(true);
    }
  };

  const restartQuiz = () => {
    sounds.playPop();
    setCurrentIndex(0);
    setSelectedAnswer('');
    setIsAnswerChecked(false);
    setShowHint(false);
    setScore(0);
    setQuizFinished(false);
  };

  const isCurrentCorrect = isAnswerChecked && selectedAnswer.trim().toLowerCase() === currentQ?.correctAnswer.trim().toLowerCase();

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-slate-900/60 backdrop-blur-xs animate-in fade-in duration-200">
      <div className="bg-white w-full max-w-2xl rounded-3xl border-3 border-amber-300 shadow-2xl overflow-hidden flex flex-col max-h-[92vh]">
        {/* Header */}
        <div className="bg-gradient-to-r from-amber-400 to-orange-400 p-4 sm:p-5 text-white flex items-center justify-between">
          <div className="flex items-center gap-3">
            <span className="text-3xl">{lesson.icon}</span>
            <div>
              <span className="text-[11px] font-black uppercase tracking-wider bg-white/20 px-2 py-0.5 rounded-full">
                Oefentoets • Les {lesson.topicNumber}
              </span>
              <h2 className="font-fun text-xl sm:text-2xl font-black leading-tight text-white">
                {lesson.titleAf}
              </h2>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-2 rounded-2xl bg-white/20 hover:bg-white/30 text-white transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Difficulty Filter Tabs (if not finished) */}
        {!quizFinished && (
          <div className="bg-amber-50 px-4 py-2 border-b border-amber-200 flex items-center justify-between text-xs font-bold text-amber-900">
            <div className="flex items-center gap-1.5">
              <span>Moeilikheid:</span>
              {(['all', 'easy', 'medium', 'challenge'] as const).map((lvl) => (
                <button
                  key={lvl}
                  onClick={() => {
                    setSelectedDifficulty(lvl);
                    setCurrentIndex(0);
                    setSelectedAnswer('');
                    setIsAnswerChecked(false);
                  }}
                  className={`px-2 py-0.5 rounded-lg capitalize transition-colors ${
                    selectedDifficulty === lvl
                      ? 'bg-amber-500 text-white font-black'
                      : 'bg-white hover:bg-amber-100 border border-amber-300'
                  }`}
                >
                  {lvl === 'all' ? 'Almal' : lvl === 'easy' ? 'Maklik' : lvl === 'medium' ? 'Gemiddeld' : 'Uitdaging'}
                </button>
              ))}
            </div>

            <span className="font-black">
              Vraag {currentIndex + 1} van {activeQuestions.length}
            </span>
          </div>
        )}

        {/* Content Body */}
        <div className="p-4 sm:p-6 overflow-y-auto flex-1 space-y-4">
          {!quizFinished ? (
            <>
              {/* South African Voice Indicator Bar */}
              <div className="bg-emerald-50/90 border border-emerald-300 rounded-2xl px-3.5 py-2 flex flex-wrap items-center justify-between gap-2 text-xs">
                <div className="flex items-center gap-2">
                  <span className="text-base">🇿🇦</span>
                  <div className="flex flex-wrap items-center gap-1.5">
                    <span className="font-fun font-bold text-emerald-950">
                      Suid-Afrikaanse Stem:
                    </span>
                    <span className="text-emerald-900 font-extrabold bg-emerald-100 px-2 py-0.5 rounded-md border border-emerald-200">
                      {voiceInfo.name}
                    </span>
                    <span className="bg-emerald-200/80 text-emerald-900 text-[10px] font-black px-2 py-0.5 rounded-full uppercase tracking-wider hidden sm:inline">
                      Geen Nederlands ✓
                    </span>
                  </div>
                </div>

                <div className="flex items-center gap-1.5 ml-auto">
                  <button
                    onClick={() => testSouthAfricanVoice()}
                    className="flex items-center gap-1 text-[11px] font-bold text-emerald-900 bg-emerald-100 hover:bg-emerald-200 border border-emerald-300 px-2.5 py-1 rounded-xl transition-colors"
                    title="Toets Ollie se Suid-Afrikaanse stem"
                  >
                    <Volume2 className="w-3 h-3 text-emerald-700" />
                    <span>Toets Stem</span>
                  </button>

                  <button
                    onClick={() => setShowVoiceModal(true)}
                    className="flex items-center gap-1 text-[11px] font-bold text-slate-700 hover:text-slate-900 bg-white hover:bg-slate-100 border border-slate-300 px-2.5 py-1 rounded-xl transition-colors"
                    title="Verander of kies 'n ander Suid-Afrikaanse stem"
                  >
                    <Settings className="w-3 h-3 text-slate-600" />
                    <span>Stel In</span>
                  </button>
                </div>
              </div>

              {/* Question Box */}
              <div className="bg-amber-50/60 p-4 sm:p-5 rounded-2xl border-2 border-amber-200">
                <div className="flex items-start justify-between gap-3">
                  <div className="space-y-1 min-w-0">
                    <span className="text-[11px] font-extrabold uppercase px-2 py-0.5 rounded-md bg-amber-200 text-amber-900">
                      Vlak: {currentQ.level === 'easy' ? 'Maklik ⭐' : currentQ.level === 'medium' ? 'Gemiddeld ⭐⭐' : 'Uitdaging 🏆'}
                    </span>
                    <h3 className="font-fun text-lg sm:text-xl font-bold text-slate-900 pt-1">
                      {currentQ.promptAf}
                    </h3>
                    <p className="text-xs sm:text-sm font-semibold text-slate-500">
                      {currentQ.promptEn}
                    </p>
                  </div>

                  <button
                    onClick={() => handleSpeak('q-prompt', currentQ.promptAf)}
                    className={`p-2.5 rounded-xl border transition-all shrink-0 ${
                      speakingId === 'q-prompt'
                        ? 'bg-amber-500 text-white border-amber-600 scale-105 shadow-sm'
                        : 'bg-amber-100 hover:bg-amber-200 text-amber-900 border-amber-300'
                    }`}
                    title="Luister na die vraag in Suid-Afrikaanse Afrikaans"
                  >
                    <Volume2 className={`w-5 h-5 ${speakingId === 'q-prompt' ? 'animate-bounce' : ''}`} />
                  </button>
                </div>
              </div>

              {/* Options */}
              <div className="space-y-2.5">
                {currentQ.options?.map((opt, oIdx) => {
                  const isSelected = selectedAnswer === opt;
                  const optId = `opt-${oIdx}`;
                  const isOptSpeaking = speakingId === optId;
                  let optStyle = 'bg-white border-slate-200 hover:border-amber-400 text-slate-800';

                  if (isAnswerChecked) {
                    if (opt === currentQ.correctAnswer) {
                      optStyle = 'bg-emerald-50 border-emerald-500 text-emerald-950 font-black ring-2 ring-emerald-400/50';
                    } else if (isSelected) {
                      optStyle = 'bg-rose-50 border-rose-400 text-rose-950';
                    }
                  } else if (isSelected) {
                    optStyle = 'bg-amber-100 border-amber-500 text-amber-950 font-bold ring-2 ring-amber-400/40';
                  }

                  return (
                    <button
                      key={oIdx}
                      onClick={() => handleSelectOption(opt)}
                      disabled={isAnswerChecked}
                      className={`w-full text-left p-3.5 sm:p-4 rounded-2xl border-2 transition-all flex items-center justify-between text-sm sm:text-base font-fun ${optStyle}`}
                    >
                      <div className="flex items-center justify-between w-full">
                        <span className="flex items-center gap-3">
                          <span className="w-7 h-7 rounded-xl bg-amber-100 border border-amber-300 flex items-center justify-center text-xs font-black text-amber-900 shrink-0">
                            {String.fromCharCode(65 + oIdx)}
                          </span>
                          <span>{opt}</span>
                        </span>

                        <div className="flex items-center gap-2">
                          <button
                            type="button"
                            onClick={(e) => {
                              e.stopPropagation();
                              handleSpeak(optId, opt);
                            }}
                            className={`p-1.5 rounded-lg border transition-all ${
                              isOptSpeaking
                                ? 'bg-amber-500 text-white border-amber-600 scale-110 shadow-xs'
                                : 'bg-amber-50 hover:bg-amber-200 text-amber-900 border border-amber-200'
                            }`}
                            title="Luister na opsie met Suid-Afrikaanse uitspraak"
                          >
                            <Volume2 className="w-3.5 h-3.5" />
                          </button>

                          {isAnswerChecked && opt === currentQ.correctAnswer && (
                            <CheckCircle className="w-5 h-5 text-emerald-600 shrink-0" />
                          )}
                          {isAnswerChecked && isSelected && opt !== currentQ.correctAnswer && (
                            <AlertCircle className="w-5 h-5 text-rose-600 shrink-0" />
                          )}
                        </div>
                      </div>
                    </button>
                  );
                })}
              </div>

              {/* Hint Box (if toggled) */}
              {showHint && (
                <div className="bg-sky-50 border border-sky-300 p-3.5 rounded-2xl flex items-start justify-between gap-2.5 text-xs sm:text-sm text-sky-950">
                  <div className="flex items-start gap-2.5">
                    <span className="text-xl">🦉</span>
                    <div>
                      <span className="font-black text-sky-900">Ollie se Wenk:</span>
                      <p className="mt-0.5 font-medium">{currentQ.hint}</p>
                    </div>
                  </div>

                  <button
                    onClick={() => handleSpeak('hint', currentQ.hint)}
                    className="p-1.5 rounded-lg bg-sky-100 hover:bg-sky-200 text-sky-900 border border-sky-300 shrink-0 transition-colors"
                    title="Luister na wenk"
                  >
                    <Volume2 className="w-4 h-4 text-sky-800" />
                  </button>
                </div>
              )}

              {/* Feedback Explanation (after checking answer) */}
              {isAnswerChecked && (
                <div className={`p-4 rounded-2xl border-2 ${
                  isCurrentCorrect ? 'bg-emerald-50 border-emerald-300' : 'bg-orange-50 border-orange-300'
                }`}>
                  <div className="flex items-center justify-between gap-2 mb-1.5 font-fun font-bold text-sm sm:text-base">
                    <div>
                      {isCurrentCorrect ? (
                        <span className="text-emerald-700 flex items-center gap-1">
                          🎉 Goed gedoen! Mooi so!
                        </span>
                      ) : (
                        <span className="text-amber-800 flex items-center gap-1">
                          💡 Goeie poging! Kom ons kyk hoekom:
                        </span>
                      )}
                    </div>

                    <button
                      onClick={() => handleSpeak('feedback', currentQ.explanationAf || currentQ.explanationEn)}
                      className="p-1.5 rounded-lg bg-white/80 hover:bg-white text-slate-800 border border-slate-300 text-xs font-bold flex items-center gap-1 transition-all"
                      title="Luister na verduideliking"
                    >
                      <Volume2 className="w-3.5 h-3.5 text-emerald-700" />
                      <span>Luister</span>
                    </button>
                  </div>
                  <p className="text-xs sm:text-sm text-slate-700 leading-relaxed font-medium">
                    {currentQ.explanationEn}
                  </p>
                  <p className="text-xs text-amber-900 italic mt-1 font-semibold">
                    Afrikaans: {currentQ.explanationAf}
                  </p>
                </div>
              )}
            </>
          ) : (
            /* Results Screen */
            <div className="py-8 px-4 text-center space-y-5">
              <div className="w-24 h-24 mx-auto rounded-3xl bg-amber-100 border-4 border-amber-400 flex items-center justify-center text-5xl shadow-md animate-gentle-bounce">
                {score >= activeQuestions.length * 0.8 ? '🏆' : '⭐'}
              </div>

              <div>
                <h3 className="font-fun text-2xl sm:text-3xl font-black text-slate-900">
                  {score >= activeQuestions.length * 0.8 ? 'Fantasties gedoen!' : 'Mooi probeer!'}
                </h3>
                <p className="text-sm font-bold text-slate-600 mt-1">
                  Jy het {score} uit {activeQuestions.length} punte behaal ({Math.round((score / activeQuestions.length) * 100)}%)!
                </p>
              </div>

              {/* Ollie praise */}
              <div className="bg-amber-50 p-4 rounded-2xl border border-amber-300 max-w-md mx-auto text-xs sm:text-sm text-amber-950 font-bold flex items-center gap-3">
                <span className="text-3xl">🦉</span>
                <p className="text-left">
                  "Hoo-hoo! Jy leer so vinnig! Onthou, oefening maak 'n meester. Gaan voort met die avontuur!"
                </p>
              </div>

              <div className="flex items-center justify-center gap-3 pt-4">
                <button
                  onClick={restartQuiz}
                  className="bg-amber-100 hover:bg-amber-200 text-amber-950 font-black px-4 py-2.5 rounded-2xl border border-amber-300 flex items-center gap-2 text-sm transition-transform active:scale-95"
                >
                  <RotateCcw className="w-4 h-4" />
                  <span>Probeer Weer</span>
                </button>
                <button
                  onClick={onClose}
                  className="bg-emerald-500 hover:bg-emerald-600 text-white font-black px-5 py-2.5 rounded-2xl shadow-sm flex items-center gap-2 text-sm transition-transform active:scale-95"
                >
                  <span>Klaar! Terug na Les</span>
                </button>
              </div>
            </div>
          )}
        </div>

        {/* Footer Actions (while in quiz) */}
        {!quizFinished && (
          <div className="bg-slate-50 p-3.5 sm:p-4 border-t border-slate-200 flex items-center justify-between gap-3">
            {!isAnswerChecked ? (
              <>
                <button
                  onClick={() => setShowHint((prev) => !prev)}
                  className="text-xs font-bold text-amber-900 hover:text-amber-950 flex items-center gap-1.5 px-3 py-1.5 rounded-xl border border-amber-300 bg-amber-50 hover:bg-amber-100 transition-colors"
                >
                  <HelpCircle className="w-4 h-4 text-amber-600" />
                  <span>{showHint ? 'Steek Wenk Weg' : 'Wys Wenk 💡'}</span>
                </button>

                <button
                  onClick={handleCheckAnswer}
                  disabled={!selectedAnswer}
                  className="bg-amber-500 hover:bg-amber-600 disabled:opacity-50 text-white font-black px-5 py-2.5 rounded-2xl shadow-sm text-sm transition-transform active:scale-95"
                >
                  Toets My Antwoord! ✓
                </button>
              </>
            ) : (
              <button
                onClick={handleNext}
                className="ml-auto bg-emerald-500 hover:bg-emerald-600 text-white font-black px-6 py-2.5 rounded-2xl shadow-sm text-sm flex items-center gap-2 transition-transform active:scale-95"
              >
                <span>{currentIndex < activeQuestions.length - 1 ? 'Volgende Vraag' : 'Sien Uitslae'}</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            )}
          </div>
        )}
      </div>

      {/* Voice Settings Modal */}
      {showVoiceModal && (
        <VoiceSettingsModal
          onClose={() => {
            setShowVoiceModal(false);
            setVoiceInfo(getCurrentVoiceInfo());
          }}
        />
      )}
    </div>
  );
};
