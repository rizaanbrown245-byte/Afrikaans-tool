import React, { useState, useEffect, useMemo } from 'react';
import {
  Sparkles,
  HelpCircle,
  X,
  Volume2,
  VolumeX,
  Lightbulb,
  Heart,
  ChevronRight,
  RotateCcw,
  BookOpen,
  Check,
  Minimize2,
  Maximize2,
  Smile,
  ShieldCheck,
  Award,
  Zap,
  ArrowRight
} from 'lucide-react';
import { LESSONS_DATA } from '../data/curriculumData';
import {
  TOPIC_OLLIE_HELP_DATA,
  SCREEN_OLLIE_HELP,
  OLLIE_ENCOURAGEMENTS,
  TopicOllieHelp
} from '../data/ollieHelperData';
import { speakAfrikaans, stopSpeaking, sounds } from '../utils/audio';

interface OllieFloatingHelperProps {
  currentTab: 'map' | 'lessons' | 'games' | 'stories' | 'daily' | 'printables' | 'parent' | 'trophies' | 'exam';
  activeLessonId: string | null;
  onOpenLesson?: (lessonId: string) => void;
}

export const OllieFloatingHelper: React.FC<OllieFloatingHelperProps> = ({
  currentTab,
  activeLessonId,
  onOpenLesson
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [isMinimized, setIsMinimized] = useState(false);
  const [activeMode, setActiveMode] = useState<'tip' | 'encourage' | 'stuck' | 'audio'>('tip');
  const [tipIndex, setTipIndex] = useState(0);
  const [encourageIndex, setEncourageIndex] = useState(0);
  const [isSpeaking, setIsSpeaking] = useState(false);
  const [hasCelebrated, setHasCelebrated] = useState(false);
  const [hasShownAttentionPulse, setHasShownAttentionPulse] = useState(false);

  // Find active lesson if on lesson tab
  const currentLesson = useMemo(() => {
    if (activeLessonId) {
      return LESSONS_DATA.find((l) => l.id === activeLessonId) || null;
    }
    return null;
  }, [activeLessonId]);

  // Find topic help
  const topicHelp: TopicOllieHelp | null = useMemo(() => {
    if (currentLesson && TOPIC_OLLIE_HELP_DATA[currentLesson.id]) {
      return TOPIC_OLLIE_HELP_DATA[currentLesson.id];
    }
    // Default fallback to STOMPI or general if in lesson mode
    if (currentTab === 'lessons') {
      return TOPIC_OLLIE_HELP_DATA['topic-8-sentence-building-stompi'];
    }
    return null;
  }, [currentLesson, currentTab]);

  // Find screen help
  const screenHelp = useMemo(() => {
    return SCREEN_OLLIE_HELP[currentTab] || SCREEN_OLLIE_HELP.map;
  }, [currentTab]);

  // Reset indices when context shifts
  useEffect(() => {
    setTipIndex(0);
    setHasCelebrated(false);
    stopSpeaking();
    setIsSpeaking(false);
  }, [currentTab, activeLessonId]);

  // Show a gentle beacon pulse when opening a lesson or exam for the first time
  useEffect(() => {
    if (activeLessonId || currentTab === 'exam') {
      setHasShownAttentionPulse(true);
      const timer = setTimeout(() => {
        setHasShownAttentionPulse(false);
      }, 5000);
      return () => clearTimeout(timer);
    }
  }, [activeLessonId, currentTab]);

  // Keyboard shortcut: Press 'h' or 'H' to toggle Ollie helper
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      // Don't trigger if user is typing in an input or textarea
      if (
        e.target instanceof HTMLInputElement ||
        e.target instanceof HTMLTextAreaElement
      ) {
        return;
      }
      if (e.key.toLowerCase() === 'h' && !e.ctrlKey && !e.metaKey && !e.altKey) {
        setIsOpen((prev) => {
          if (!prev) {
            sounds.playPop();
          }
          return !prev;
        });
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  const currentEncouragement = OLLIE_ENCOURAGEMENTS[encourageIndex % OLLIE_ENCOURAGEMENTS.length];

  const currentStuckTip = useMemo(() => {
    if (topicHelp && topicHelp.stuckTips.length > 0) {
      return topicHelp.stuckTips[tipIndex % topicHelp.stuckTips.length];
    }
    if (screenHelp && screenHelp.tips.length > 0) {
      const scrTip = screenHelp.tips[tipIndex % screenHelp.tips.length];
      return {
        tipAf: scrTip.tipAf,
        tipEn: scrTip.tipEn,
        mnemonic: undefined,
        exampleAf: undefined,
        exampleEn: undefined
      };
    }
    return {
      tipAf: 'Lees die sin rustig deur en soek die hoofwerkwoord.',
      tipEn: 'Read the sentence calmly and look for the main verb.'
    };
  }, [topicHelp, screenHelp, tipIndex]);

  const maxTipsCount = topicHelp
    ? topicHelp.stuckTips.length
    : screenHelp
    ? screenHelp.tips.length
    : 1;

  const handleNextTip = () => {
    sounds.playPop();
    setTipIndex((prev) => (prev + 1) % maxTipsCount);
  };

  const handleNextEncouragement = () => {
    sounds.playPop();
    setEncourageIndex((prev) => (prev + 1) % OLLIE_ENCOURAGEMENTS.length);
  };

  const handleSpeakText = (text: string) => {
    if (isSpeaking) {
      stopSpeaking();
      setIsSpeaking(false);
      return;
    }
    sounds.playPop();
    setIsSpeaking(true);
    speakAfrikaans(text, {
      onEnd: () => setIsSpeaking(false),
      onError: () => setIsSpeaking(false)
    });
  };

  const handleCelebrate = () => {
    sounds.playCorrect();
    setHasCelebrated(true);
    setTimeout(() => {
      setHasCelebrated(false);
      setIsMinimized(true);
    }, 1800);
  };

  return (
    <>
      {/* =================================================================== */}
      {/* MINIMIZED STICKY STRIP (When user wants hint open while typing)     */}
      {/* =================================================================== */}
      {isOpen && isMinimized && (
        <aside
          aria-label="Ollie se kitswenk strokie"
          className="fixed bottom-4 left-4 right-4 sm:left-auto sm:right-6 sm:max-w-md z-40 bg-white/95 backdrop-blur-md rounded-2xl border-3 border-amber-400 p-3 shadow-xl flex items-center justify-between gap-3 animate-in slide-in-from-bottom duration-200"
        >
          <div className="flex items-center gap-2.5 overflow-hidden">
            <div className="w-10 h-10 rounded-xl bg-amber-200 border-2 border-amber-400 p-0.5 shrink-0 flex items-center justify-center">
              <span className="text-xl">🦉</span>
            </div>
            <div className="text-xs truncate">
              <span className="font-fun font-black text-amber-900 block truncate">
                {topicHelp ? topicHelp.topicTitleAf : screenHelp.titleAf}
              </span>
              <p className="text-slate-600 truncate font-medium">
                {currentStuckTip.tipAf}
              </p>
            </div>
          </div>

          <div className="flex items-center gap-1.5 shrink-0">
            <button
              onClick={() => handleSpeakText(currentStuckTip.tipAf)}
              className="p-1.5 rounded-lg bg-amber-100 hover:bg-amber-200 text-amber-900"
              title="Luister na Ollie"
              aria-label="Luister na Ollie se wenk"
            >
              <Volume2 className="w-4 h-4" />
            </button>
            <button
              onClick={() => setIsMinimized(false)}
              className="p-1.5 rounded-lg bg-amber-400 hover:bg-amber-500 text-amber-950 font-bold"
              title="Maak Ollie groter"
              aria-label="Vergroot Ollie helper venster"
            >
              <Maximize2 className="w-4 h-4" />
            </button>
            <button
              onClick={() => {
                stopSpeaking();
                setIsSpeaking(false);
                setIsOpen(false);
              }}
              className="p-1.5 rounded-lg bg-slate-100 hover:bg-slate-200 text-slate-500"
              title="Maak toe"
              aria-label="Maak Ollie helper toe"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        </aside>
      )}

      {/* =================================================================== */}
      {/* EXPANDED OLLIE HELPER POPUP                                         */}
      {/* =================================================================== */}
      {isOpen && !isMinimized && (
        <aside
          aria-label="Ollie die Uil Hulpvenster"
          className="fixed bottom-20 right-4 sm:right-6 w-[calc(100vw-2rem)] sm:w-[420px] max-h-[85vh] z-40 bg-white rounded-3xl border-4 border-amber-300 shadow-2xl flex flex-col overflow-hidden animate-in zoom-in-95 duration-200"
        >
          {/* Header with Ollie banner */}
          <div className="bg-gradient-to-r from-amber-400 via-yellow-400 to-amber-500 p-4 border-b-2 border-amber-300 flex items-center justify-between text-amber-950">
            <div className="flex items-center gap-2.5">
              <div className="w-12 h-12 rounded-2xl bg-white/90 border-2 border-amber-300 p-1 flex items-center justify-center shadow-inner relative">
                <span className="text-2xl animate-bounce">🦉</span>
                <span className="absolute -bottom-1 -right-1 w-4 h-4 bg-emerald-500 rounded-full border-2 border-white flex items-center justify-center text-[9px] text-white font-bold">
                  ✓
                </span>
              </div>
              <div>
                <div className="flex items-center gap-1.5">
                  <h3 className="font-fun text-lg font-black text-slate-900 leading-tight">
                    Ollie die Uil
                  </h3>
                  <span className="bg-amber-950/20 text-slate-900 text-[10px] font-black uppercase px-2 py-0.5 rounded-full">
                    Kitshelper
                  </span>
                </div>
                <p className="text-xs text-amber-900 font-bold truncate max-w-[220px]">
                  {currentLesson ? currentLesson.titleAf : screenHelp.titleAf}
                </p>
              </div>
            </div>

            <div className="flex items-center gap-1">
              <button
                onClick={() => setIsMinimized(true)}
                className="p-1.5 rounded-xl bg-white/30 hover:bg-white/50 text-slate-900 transition-colors"
                title="Minimaliseer na strokie"
                aria-label="Minimaliseer Ollie"
              >
                <Minimize2 className="w-4 h-4" />
              </button>
              <button
                onClick={() => {
                  stopSpeaking();
                  setIsSpeaking(false);
                  setIsOpen(false);
                }}
                className="p-1.5 rounded-xl bg-white/30 hover:bg-white/50 text-slate-900 transition-colors"
                title="Maak toe (of druk H)"
                aria-label="Maak toe"
              >
                <X className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* Quick Context Pill Banner */}
          <div className="bg-amber-50/90 px-4 py-2 border-b border-amber-200 flex items-center justify-between text-xs text-amber-900">
            <span className="font-bold flex items-center gap-1 truncate">
              <span>📍</span>
              <span className="truncate">
                {currentLesson
                  ? `Les: ${currentLesson.titleEn}`
                  : `Afdeling: ${screenHelp.titleEn}`}
              </span>
            </span>
            <span className="text-[10px] bg-amber-200/80 px-2 py-0.5 rounded-md font-black shrink-0">
              KABV Graad 4
            </span>
          </div>

          {/* Navigation Tabs */}
          <div className="flex border-b border-slate-100 bg-slate-50/70 p-1.5 gap-1 text-xs font-bold">
            <button
              onClick={() => {
                sounds.playPop();
                setActiveMode('tip');
              }}
              className={`flex-1 py-1.5 px-2 rounded-xl flex items-center justify-center gap-1 transition-all ${
                activeMode === 'tip'
                  ? 'bg-amber-400 text-amber-950 font-black shadow-xs'
                  : 'text-slate-600 hover:bg-slate-200/60'
              }`}
            >
              <Lightbulb className="w-3.5 h-3.5" />
              <span>Wenk</span>
            </button>
            <button
              onClick={() => {
                sounds.playPop();
                setActiveMode('encourage');
              }}
              className={`flex-1 py-1.5 px-2 rounded-xl flex items-center justify-center gap-1 transition-all ${
                activeMode === 'encourage'
                  ? 'bg-amber-400 text-amber-950 font-black shadow-xs'
                  : 'text-slate-600 hover:bg-slate-200/60'
              }`}
            >
              <Heart className="w-3.5 h-3.5" />
              <span>Moed</span>
            </button>
            <button
              onClick={() => {
                sounds.playPop();
                setActiveMode('stuck');
              }}
              className={`flex-1 py-1.5 px-2 rounded-xl flex items-center justify-center gap-1 transition-all ${
                activeMode === 'stuck'
                  ? 'bg-rose-500 text-white font-black shadow-xs'
                  : 'text-rose-700 bg-rose-50 hover:bg-rose-100/70'
              }`}
            >
              <Zap className="w-3.5 h-3.5" />
              <span>SOS! Vas?</span>
            </button>
          </div>

          {/* Body Content */}
          <div className="p-4 overflow-y-auto space-y-4 max-h-[50vh] text-slate-800">
            {/* MODE 1: CONTEXTUAL LESSON TIP & GOLDEN RULE */}
            {activeMode === 'tip' && (
              <div className="space-y-3.5">
                {/* Golden Rule Card */}
                <div className="bg-gradient-to-br from-amber-100/90 via-yellow-50 to-orange-100/70 rounded-2xl p-3.5 border-2 border-amber-300 space-y-1.5 shadow-2xs">
                  <div className="flex items-center justify-between">
                    <span className="font-fun text-xs font-black text-amber-900 uppercase tracking-wide flex items-center gap-1">
                      <span>👑</span>
                      <span>Die Goue Reël (Golden Rule):</span>
                    </span>
                    <button
                      onClick={() =>
                        handleSpeakText(
                          topicHelp ? topicHelp.goldenRuleAf : screenHelp.mainAdviceAf
                        )
                      }
                      className="text-amber-800 hover:text-amber-950 p-1 rounded-lg hover:bg-amber-200/50"
                      title="Luister na die goue reël"
                    >
                      <Volume2 className="w-4 h-4" />
                    </button>
                  </div>
                  <p className="text-xs font-black text-slate-900 leading-relaxed">
                    {topicHelp ? topicHelp.goldenRuleAf : screenHelp.mainAdviceAf}
                  </p>
                  <p className="text-[11px] text-amber-800/90 font-medium">
                    {topicHelp ? topicHelp.goldenRuleEn : screenHelp.mainAdviceEn}
                  </p>
                </div>

                {/* Specific Hint Card with Cycling */}
                <div className="bg-white rounded-2xl p-3.5 border-2 border-slate-200 space-y-2 shadow-2xs">
                  <div className="flex items-center justify-between text-xs text-slate-500 font-bold">
                    <span className="flex items-center gap-1 text-indigo-700 font-black">
                      <Lightbulb className="w-3.5 h-3.5" />
                      <span>Wenk {tipIndex + 1} van {maxTipsCount}</span>
                    </span>
                    <button
                      onClick={() => handleSpeakText(currentStuckTip.tipAf)}
                      className="text-slate-600 hover:text-indigo-600 p-1 rounded-lg hover:bg-slate-100"
                      title="Luister na die wenk"
                    >
                      <Volume2 className="w-3.5 h-3.5" />
                    </button>
                  </div>

                  <p className="text-xs font-black text-slate-900 leading-relaxed">
                    {currentStuckTip.tipAf}
                  </p>
                  <p className="text-[11px] text-slate-500 font-medium leading-relaxed">
                    {currentStuckTip.tipEn}
                  </p>

                  {/* Cartoon Mnemonic trick if available */}
                  {currentStuckTip.mnemonic && (
                    <div className="bg-amber-50 rounded-xl p-2.5 border border-amber-200 text-xs text-amber-950 font-bold flex items-center gap-2">
                      <span className="text-base shrink-0">💡</span>
                      <span className="text-[11px]">{currentStuckTip.mnemonic}</span>
                    </div>
                  )}

                  {/* Concrete example if available */}
                  {currentStuckTip.exampleAf && (
                    <div className="bg-slate-50 rounded-xl p-2.5 border border-slate-200 text-xs space-y-1">
                      <span className="text-[10px] font-black uppercase text-slate-400 block">
                        Voorbeeld:
                      </span>
                      <p className="font-mono font-bold text-slate-800 text-[11px]">
                        {currentStuckTip.exampleAf}
                      </p>
                    </div>
                  )}

                  {/* Next Tip Button */}
                  {maxTipsCount > 1 && (
                    <div className="pt-1">
                      <button
                        onClick={handleNextTip}
                        className="w-full py-2 px-3 rounded-xl bg-slate-100 hover:bg-indigo-50 hover:text-indigo-700 text-slate-700 font-black text-xs flex items-center justify-center gap-1.5 transition-all active:scale-95"
                      >
                        <RotateCcw className="w-3 h-3" />
                        <span>Nog 'n wenk vir hierdie les ({tipIndex + 1}/{maxTipsCount})</span>
                      </button>
                    </div>
                  )}
                </div>
              </div>
            )}

            {/* MODE 2: ENCOURAGEMENT & PEP TALK */}
            {activeMode === 'encourage' && (
              <div className="space-y-3.5">
                <div className="bg-gradient-to-br from-pink-50 via-rose-50 to-amber-50 rounded-2xl p-4 border-2 border-pink-200 text-center space-y-3 shadow-2xs">
                  <div className="w-14 h-14 mx-auto rounded-full bg-white shadow-md border-2 border-pink-300 flex items-center justify-center text-3xl animate-gentle-bounce">
                    {currentEncouragement.badgeEmoji}
                  </div>

                  <div>
                    <span className="text-[10px] font-black uppercase text-pink-600 bg-pink-100 px-2.5 py-0.5 rounded-full">
                      Ollie se Bemoediging
                    </span>
                    <p className="font-fun text-sm sm:text-base font-black text-slate-900 mt-2 leading-relaxed">
                      "{currentEncouragement.messageAf}"
                    </p>
                    <p className="text-xs text-slate-500 font-medium mt-1">
                      "{currentEncouragement.messageEn}"
                    </p>
                  </div>

                  <div className="flex items-center justify-center gap-2 pt-1">
                    <button
                      onClick={() => handleSpeakText(currentEncouragement.messageAf)}
                      className="px-3 py-1.5 rounded-xl bg-white hover:bg-pink-100 text-pink-900 border border-pink-200 font-black text-xs flex items-center gap-1.5 shadow-2xs transition-all active:scale-95"
                    >
                      <Volume2 className="w-3.5 h-3.5" />
                      <span>Hoor vir Ollie praat</span>
                    </button>
                    <button
                      onClick={handleNextEncouragement}
                      className="px-3 py-1.5 rounded-xl bg-pink-500 hover:bg-pink-600 text-white font-black text-xs flex items-center gap-1.5 shadow-2xs transition-all active:scale-95"
                    >
                      <Sparkles className="w-3.5 h-3.5" />
                      <span>Nog 'n hupstootjie!</span>
                    </button>
                  </div>
                </div>

                {/* Positive self-talk reminder */}
                <div className="bg-white rounded-2xl p-3 border border-slate-200 text-xs text-slate-600 space-y-1">
                  <span className="font-black text-slate-900 block flex items-center gap-1">
                    <span>🧠</span>
                    <span>Onthou die slim reël:</span>
                  </span>
                  <p>
                    Wanneer jy foute maak, beteken dit dat jou brein nuwe brûe bou. Moenie skaam wees nie — probeer net weer!
                  </p>
                </div>
              </div>
            )}

            {/* MODE 3: STUCK SOS! */}
            {activeMode === 'stuck' && (
              <div className="space-y-3">
                <div className="bg-rose-50 rounded-2xl p-3.5 border-2 border-rose-300 space-y-2.5">
                  <div className="flex items-center gap-2 text-rose-900">
                    <span className="text-2xl">🆘</span>
                    <div>
                      <h4 className="font-fun font-black text-sm">
                        Vasgevang op 'n vraag? Moenie stres nie!
                      </h4>
                      <p className="text-[11px] text-rose-700 font-medium">
                        Volg hierdie 3 maklike stappe om die regte antwoord te vind:
                      </p>
                    </div>
                  </div>

                  <div className="space-y-2 text-xs">
                    <div className="bg-white p-2.5 rounded-xl border border-rose-200 flex items-start gap-2">
                      <span className="w-5 h-5 rounded-full bg-rose-500 text-white font-black flex items-center justify-center text-[10px] shrink-0 mt-0.5">
                        1
                      </span>
                      <div>
                        <strong className="text-slate-900 block">Haal diep asem</strong>
                        <span className="text-slate-600 text-[11px]">
                          Tel tot 3 in jou kop. Haastige hond verbrand sy mond!
                        </span>
                      </div>
                    </div>

                    <div className="bg-white p-2.5 rounded-xl border border-rose-200 flex items-start gap-2">
                      <span className="w-5 h-5 rounded-full bg-rose-500 text-white font-black flex items-center justify-center text-[10px] shrink-0 mt-0.5">
                        2
                      </span>
                      <div>
                        <strong className="text-slate-900 block">Kry die werkwoord (V1)</strong>
                        <span className="text-slate-600 text-[11px]">
                          Vra jouself: Wat doen die persoon? Die aksiewoord wys altyd die pad.
                        </span>
                      </div>
                    </div>

                    <div className="bg-white p-2.5 rounded-xl border border-rose-200 flex items-start gap-2">
                      <span className="w-5 h-5 rounded-full bg-rose-500 text-white font-black flex items-center justify-center text-[10px] shrink-0 mt-0.5">
                        3
                      </span>
                      <div>
                        <strong className="text-slate-900 block">Skakel verkeerde opsies uit</strong>
                        <span className="text-slate-600 text-[11px]">
                          Daar is altyd een of twee opsies wat heeltemal snaaks klink. Gooi hulle weg!
                        </span>
                      </div>
                    </div>
                  </div>

                  <button
                    onClick={() =>
                      handleSpeakText(
                        'Toemaar maats! Haal diep asem en ontspan. Soek eers die werkwoord in die sin, en skakel die verkeerde opsies uit. Jy het hierdie!'
                      )
                    }
                    className="w-full py-2 rounded-xl bg-rose-600 hover:bg-rose-700 text-white font-black text-xs flex items-center justify-center gap-1.5 transition-all shadow-xs"
                  >
                    <Volume2 className="w-3.5 h-3.5" />
                    <span>Hoor Ollie se kalmerende stem</span>
                  </button>
                </div>
              </div>
            )}
          </div>

          {/* Footer Action Bar */}
          <div className="bg-slate-50 border-t border-slate-200 p-3 flex items-center justify-between gap-2">
            {hasCelebrated ? (
              <div className="w-full py-2 bg-emerald-500 text-white rounded-xl text-center text-xs font-black animate-in zoom-in duration-200 flex items-center justify-center gap-1.5">
                <Sparkles className="w-4 h-4 text-yellow-200" />
                <span>Mooi so, Afrikaans-kampioen! Jy het dit! ⭐</span>
              </div>
            ) : (
              <>
                <button
                  onClick={handleCelebrate}
                  className="flex-1 py-2 px-3 rounded-xl bg-emerald-500 hover:bg-emerald-600 text-white font-black text-xs flex items-center justify-center gap-1.5 shadow-xs transition-all active:scale-95"
                >
                  <Check className="w-4 h-4" />
                  <span>Ek verstaan nou! Dankie Ollie! 🦉</span>
                </button>
                <button
                  onClick={() => setIsMinimized(true)}
                  className="py-2 px-3 rounded-xl bg-white hover:bg-slate-100 text-slate-700 border border-slate-300 font-bold text-xs transition-all"
                  title="Hou oop terwyl jy oefen"
                >
                  Krimp
                </button>
              </>
            )}
          </div>
        </aside>
      )}

      {/* =================================================================== */}
      {/* FLOATING TRIGGER BUTTON (Always visible at bottom-right)             */}
      {/* =================================================================== */}
      <div className="fixed bottom-5 right-5 sm:bottom-6 sm:right-6 z-40 flex flex-col items-end gap-1.5 no-print">
        {/* Helper Tooltip / Speech Bubble Callout if closed and attention needed */}
        {!isOpen && hasShownAttentionPulse && (
          <div
            onClick={() => {
              sounds.playPop();
              setIsOpen(true);
            }}
            className="cursor-pointer bg-white text-slate-900 border-2 border-amber-400 py-1.5 px-3 rounded-2xl shadow-lg text-xs font-black flex items-center gap-1.5 animate-bounce"
          >
            <span className="text-amber-500">💡</span>
            <span>Vasgevang? Vra Ollie! (Druk 'H')</span>
          </div>
        )}

        {/* The Animated Owl Character Trigger Button */}
        <button
          onClick={() => {
            sounds.playPop();
            setIsOpen((prev) => !prev);
            setIsMinimized(false);
          }}
          aria-expanded={isOpen}
          aria-label="Vra vir Ollie die Uil vir hulp of bemoediging"
          title="Klik vir Ollie se goue wenke & bemoediging! (Druk 'H')"
          className={`group relative flex items-center gap-2.5 p-2 sm:p-2.5 rounded-full bg-gradient-to-tr from-amber-400 via-amber-300 to-yellow-400 border-3 border-amber-200 shadow-xl transition-all duration-200 hover:scale-105 active:scale-95 ${
            isOpen ? 'ring-4 ring-amber-400/50' : 'hover:shadow-amber-400/40'
          }`}
        >
          {/* Owl Character Face */}
          <div className="w-12 h-12 sm:w-14 sm:h-14 rounded-full bg-amber-100 border-2 border-amber-400 p-0.5 flex items-center justify-center relative overflow-hidden shadow-inner group-hover:rotate-3 transition-transform">
            {/* Owl SVG Avatar */}
            <svg viewBox="0 0 100 100" className="w-[90%] h-[90%] drop-shadow-xs">
              {/* Body */}
              <ellipse cx="50" cy="55" rx="36" ry="40" fill="#B45309" />
              <ellipse cx="50" cy="62" rx="26" ry="28" fill="#FDE68A" />
              {/* Feathers */}
              <path d="M42 55 Q50 62 58 55" stroke="#D97706" strokeWidth="2.5" fill="none" />
              <path d="M44 64 Q50 71 56 64" stroke="#D97706" strokeWidth="2.5" fill="none" />
              {/* Ears */}
              <polygon points="22,25 32,40 18,42" fill="#92400E" />
              <polygon points="78,25 82,42 68,40" fill="#92400E" />
              {/* Blue Glasses */}
              <circle cx="36" cy="40" r="15" fill="#FEF3C7" stroke="#3B82F6" strokeWidth="3" />
              <circle cx="64" cy="40" r="15" fill="#FEF3C7" stroke="#3B82F6" strokeWidth="3" />
              <line x1="51" y1="40" x2="49" y2="40" stroke="#3B82F6" strokeWidth="3" />
              {/* Eyes */}
              <circle cx="37" cy="40" r="5" fill="#1E293B" />
              <circle cx="63" cy="40" r="5" fill="#1E293B" />
              <circle cx="39" cy="38" r="1.5" fill="#FFFFFF" />
              <circle cx="65" cy="38" r="1.5" fill="#FFFFFF" />
              {/* Beak */}
              <polygon points="50,44 44,53 56,53" fill="#F59E0B" />
            </svg>
          </div>

          {/* Label Badge on Larger Screens */}
          <div className="hidden sm:flex flex-col text-left pr-2">
            <span className="font-fun text-xs font-black text-amber-950 uppercase leading-none tracking-wide flex items-center gap-1">
              <span>Vra Ollie</span>
              <Sparkles className="w-3 h-3 text-amber-700" />
            </span>
            <span className="text-[10px] text-amber-900 font-bold leading-tight">
              Kitswenk & Moed
            </span>
          </div>

          {/* Pulse beacon ring */}
          {!isOpen && (
            <span className="absolute -top-1 -right-1 flex h-4 w-4">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-amber-400 opacity-75" />
              <span className="relative inline-flex rounded-full h-4 w-4 bg-amber-500 border-2 border-white items-center justify-center text-[8px] font-black text-white">
                ?
              </span>
            </span>
          )}
        </button>
      </div>
    </>
  );
};
