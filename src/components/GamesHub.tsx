import React, { useState, useEffect, useMemo } from 'react';
import {
  Star,
  Trophy,
  Sparkles,
  RotateCcw,
  Volume2,
  Timer,
  CheckCircle,
  AlertCircle,
  ArrowRight,
  Settings,
  ShieldCheck,
  Zap,
  Flame,
  Award,
  Layers,
  HelpCircle,
  Search,
  Scale,
  MapPin,
  Check
} from 'lucide-react';
import { useProgress } from '../context/ProgressContext';
import { OllieCharacter } from './OllieCharacter';
import { speakAfrikaans, sounds, getCurrentVoiceInfo, testSouthAfricanVoice, stopSpeaking } from '../utils/audio';
import { VoiceSettingsModal } from './VoiceSettingsModal';
import {
  GameDifficulty,
  DIFFICULTY_CONFIGS,
  STOMPI_DATA,
  PICTURE_DATA,
  MEMORY_DATA,
  SPELLING_DATA,
  CLOCK_DATA,
  NEGATION_DATA,
  TENSES_DATA,
  PLURALS_DIMINUTIVES_DATA,
  WORDSEARCH_DATA,
  OPPOSITES_SYNONYMS_DATA,
  PREPOSITIONS_DATA
} from '../data/gamesData';

export type GameMode =
  | 'stompi'
  | 'picture'
  | 'memory'
  | 'spelling'
  | 'clock'
  | 'negation'
  | 'tenses'
  | 'plurals'
  | 'wordsearch'
  | 'opposites'
  | 'prepositions';

export const GamesHub: React.FC = () => {
  const { addStars, addGems, recordGamePlayed, triggerConfetti } = useProgress();
  const [selectedGame, setSelectedGame] = useState<GameMode>('stompi');
  const [difficulty, setDifficulty] = useState<GameDifficulty>('medium');
  const [showVoiceModal, setShowVoiceModal] = useState(false);
  const [voiceInfo, setVoiceInfo] = useState(getCurrentVoiceInfo());

  useEffect(() => {
    setVoiceInfo(getCurrentVoiceInfo());
    return () => {
      stopSpeaking();
    };
  }, [showVoiceModal]);

  const diffConfig = DIFFICULTY_CONFIGS[difficulty];

  const handleWin = () => {
    addStars(diffConfig.starsAwarded);
    if (diffConfig.gemsAwarded > 0) {
      addGems(diffConfig.gemsAwarded);
    }
    recordGamePlayed();
    if (difficulty === 'hard') {
      triggerConfetti();
    }
  };

  return (
    <div className="space-y-6 pb-12">
      {/* Games Header */}
      <div className="bg-gradient-to-r from-emerald-500 via-teal-500 to-cyan-500 rounded-3xl p-5 sm:p-6 text-white shadow-sm border-3 border-emerald-300">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <div>
            <span className="bg-white/20 text-white text-xs font-black uppercase tracking-wider px-2.5 py-0.5 rounded-full border border-white/30">
              Pret Speletjies & Uitdagings • 11 Speletjies
            </span>
            <h1 className="font-fun text-2xl sm:text-3xl font-black mt-1">
              Afrikaans Speletjies-Sentrum 🎮
            </h1>
            <p className="text-emerald-100 font-bold text-sm sm:text-base">
              Kies jou moeilikheidsgraad, beantwoord vrae, verdien bonus-sterre en daag jouself uit!
            </p>
          </div>
          <div className="flex items-center gap-2 bg-white/20 backdrop-blur-xs px-3.5 py-2 rounded-2xl border border-white/30 text-white font-fun">
            <Trophy className="w-5 h-5 text-amber-300" />
            <div className="text-right">
              <span className="block font-black text-xs sm:text-sm">Belonings:</span>
              <span className="text-amber-200 text-xs font-extrabold">
                +{diffConfig.starsAwarded} ⭐ {diffConfig.gemsAwarded > 0 ? `+${diffConfig.gemsAwarded} 💎` : ''}
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Difficulty Level Bar */}
      <div className="bg-white rounded-3xl p-4 sm:p-5 border-2 border-slate-200 shadow-sm space-y-3">
        <div className="flex flex-wrap items-center justify-between gap-2">
          <div className="flex items-center gap-2">
            <Flame className="w-5 h-5 text-amber-500" />
            <span className="font-fun font-black text-slate-800 text-sm sm:text-base">
              Kies Moeilikheidsgraad:
            </span>
            <span className={`text-xs font-black px-2.5 py-0.5 rounded-full border ${diffConfig.bgColor} ${diffConfig.color} ${diffConfig.borderColor}`}>
              {diffConfig.badge}
            </span>
          </div>
          <span className="text-xs font-bold text-slate-500">
            {diffConfig.description}
          </span>
        </div>

        <div className="grid grid-cols-3 gap-2 sm:gap-3">
          {(['easy', 'medium', 'hard'] as GameDifficulty[]).map((level) => {
            const conf = DIFFICULTY_CONFIGS[level];
            const isSelected = difficulty === level;
            return (
              <button
                key={level}
                onClick={() => {
                  setDifficulty(level);
                  sounds.playPop();
                }}
                className={`py-2.5 px-3 rounded-2xl border-2 font-fun font-black text-xs sm:text-sm transition-all flex flex-col items-center gap-1 ${
                  isSelected
                    ? `${conf.bgColor} ${conf.borderColor} ${conf.color} shadow-sm scale-102 ring-2 ring-offset-1 ring-current`
                    : 'bg-slate-50 border-slate-200 text-slate-600 hover:bg-slate-100'
                }`}
              >
                <span>{conf.nameAf}</span>
                <span className="text-[10px] sm:text-xs font-extrabold opacity-80">
                  +{conf.starsAwarded} ⭐ {conf.gemsAwarded > 0 ? `+${conf.gemsAwarded} 💎` : ''}
                </span>
              </button>
            );
          })}
        </div>
      </div>

      {/* South African Voice Status in Games Hub */}
      <div className="bg-emerald-50 border border-emerald-300 rounded-2xl px-4 py-2.5 flex flex-wrap items-center justify-between gap-3 text-xs">
        <div className="flex items-center gap-2">
          <span className="text-lg">🇿🇦</span>
          <div>
            <div className="flex items-center gap-2">
              <span className="font-fun font-bold text-emerald-950">
                Suid-Afrikaanse Uitspraak Aktief:
              </span>
              <span className="text-emerald-900 font-extrabold bg-emerald-100 px-2 py-0.5 rounded-md border border-emerald-200">
                {voiceInfo.name}
              </span>
              <span className="bg-emerald-200 text-emerald-900 text-[10px] font-black px-2 py-0.5 rounded-full uppercase hidden sm:inline">
                Geen Nederlands ✓
              </span>
            </div>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={() => testSouthAfricanVoice()}
            className="flex items-center gap-1 font-bold text-emerald-900 bg-emerald-100 hover:bg-emerald-200 border border-emerald-300 px-3 py-1.5 rounded-xl transition-colors"
            title="Toets die stem"
          >
            <Volume2 className="w-3.5 h-3.5 text-emerald-700" />
            <span>Toets Stem 🔊</span>
          </button>

          <button
            onClick={() => setShowVoiceModal(true)}
            className="flex items-center gap-1 font-bold text-slate-700 hover:text-slate-900 bg-white hover:bg-slate-50 border border-slate-300 px-3 py-1.5 rounded-xl transition-colors"
            title="Verander stem-instellings"
          >
            <Settings className="w-3.5 h-3.5 text-slate-600" />
            <span>Stem-instellings ⚙️</span>
          </button>
        </div>
      </div>

      {/* Game Mode Selector Buttons - 11 Exciting Games */}
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 xl:grid-cols-11 gap-2 sm:gap-2.5">
        <button
          onClick={() => { setSelectedGame('stompi'); sounds.playPop(); }}
          className={`p-2.5 sm:p-3 rounded-2xl border-2 font-fun font-black text-xs flex flex-col items-center gap-1 transition-all ${
            selectedGame === 'stompi'
              ? 'bg-cyan-500 border-cyan-600 text-white shadow-md scale-102'
              : 'bg-white border-cyan-200 text-cyan-950 hover:bg-cyan-50'
          }`}
        >
          <span className="text-2xl">🚂</span>
          <span className="text-center leading-tight">STOMPI</span>
        </button>

        <button
          onClick={() => { setSelectedGame('picture'); sounds.playPop(); }}
          className={`p-2.5 sm:p-3 rounded-2xl border-2 font-fun font-black text-xs flex flex-col items-center gap-1 transition-all ${
            selectedGame === 'picture'
              ? 'bg-amber-500 border-amber-600 text-white shadow-md scale-102'
              : 'bg-white border-amber-200 text-amber-950 hover:bg-amber-50'
          }`}
        >
          <span className="text-2xl">🖼️</span>
          <span className="text-center leading-tight">Prentjie-Pas</span>
        </button>

        <button
          onClick={() => { setSelectedGame('memory'); sounds.playPop(); }}
          className={`p-2.5 sm:p-3 rounded-2xl border-2 font-fun font-black text-xs flex flex-col items-center gap-1 transition-all ${
            selectedGame === 'memory'
              ? 'bg-purple-500 border-purple-600 text-white shadow-md scale-102'
              : 'bg-white border-purple-200 text-purple-950 hover:bg-purple-50'
          }`}
        >
          <span className="text-2xl">🃏</span>
          <span className="text-center leading-tight">Geheue-Pare</span>
        </button>

        <button
          onClick={() => { setSelectedGame('spelling'); sounds.playPop(); }}
          className={`p-2.5 sm:p-3 rounded-2xl border-2 font-fun font-black text-xs flex flex-col items-center gap-1 transition-all ${
            selectedGame === 'spelling'
              ? 'bg-emerald-500 border-emerald-600 text-white shadow-md scale-102'
              : 'bg-white border-emerald-200 text-emerald-950 hover:bg-emerald-50'
          }`}
        >
          <span className="text-2xl">🐝</span>
          <span className="text-center leading-tight">Spelby</span>
        </button>

        <button
          onClick={() => { setSelectedGame('clock'); sounds.playPop(); }}
          className={`p-2.5 sm:p-3 rounded-2xl border-2 font-fun font-black text-xs flex flex-col items-center gap-1 transition-all ${
            selectedGame === 'clock'
              ? 'bg-rose-500 border-rose-600 text-white shadow-md scale-102'
              : 'bg-white border-rose-200 text-rose-950 hover:bg-rose-50'
          }`}
        >
          <span className="text-2xl">⚡</span>
          <span className="text-center leading-tight">Spoedtoets</span>
        </button>

        <button
          onClick={() => { setSelectedGame('negation'); sounds.playPop(); }}
          className={`p-2.5 sm:p-3 rounded-2xl border-2 font-fun font-black text-xs flex flex-col items-center gap-1 transition-all ${
            selectedGame === 'negation'
              ? 'bg-indigo-600 border-indigo-700 text-white shadow-md scale-102'
              : 'bg-white border-indigo-200 text-indigo-950 hover:bg-indigo-50'
          }`}
        >
          <span className="text-2xl">🚫</span>
          <span className="text-center leading-tight">Dubbel "Nie"</span>
        </button>

        <button
          onClick={() => { setSelectedGame('tenses'); sounds.playPop(); }}
          className={`p-2.5 sm:p-3 rounded-2xl border-2 font-fun font-black text-xs flex flex-col items-center gap-1 transition-all ${
            selectedGame === 'tenses'
              ? 'bg-blue-600 border-blue-700 text-white shadow-md scale-102'
              : 'bg-white border-blue-200 text-blue-950 hover:bg-blue-50'
          }`}
        >
          <span className="text-2xl">⏳</span>
          <span className="text-center leading-tight">Tye-Meester</span>
        </button>

        <button
          onClick={() => { setSelectedGame('plurals'); sounds.playPop(); }}
          className={`p-2.5 sm:p-3 rounded-2xl border-2 font-fun font-black text-xs flex flex-col items-center gap-1 transition-all ${
            selectedGame === 'plurals'
              ? 'bg-teal-600 border-teal-700 text-white shadow-md scale-102'
              : 'bg-white border-teal-200 text-teal-950 hover:bg-teal-50'
          }`}
        >
          <span className="text-2xl">🪄</span>
          <span className="text-center leading-tight">Meervoude</span>
        </button>

        <button
          onClick={() => { setSelectedGame('wordsearch'); sounds.playPop(); }}
          className={`p-2.5 sm:p-3 rounded-2xl border-2 font-fun font-black text-xs flex flex-col items-center gap-1 transition-all ${
            selectedGame === 'wordsearch'
              ? 'bg-amber-600 border-amber-700 text-white shadow-md scale-102 ring-2 ring-amber-300'
              : 'bg-white border-amber-200 text-amber-950 hover:bg-amber-50'
          }`}
        >
          <span className="text-2xl">🔍</span>
          <span className="text-center leading-tight">Woordsoek</span>
        </button>

        <button
          onClick={() => { setSelectedGame('opposites'); sounds.playPop(); }}
          className={`p-2.5 sm:p-3 rounded-2xl border-2 font-fun font-black text-xs flex flex-col items-center gap-1 transition-all ${
            selectedGame === 'opposites'
              ? 'bg-violet-600 border-violet-700 text-white shadow-md scale-102 ring-2 ring-violet-300'
              : 'bg-white border-violet-200 text-violet-950 hover:bg-violet-50'
          }`}
        >
          <span className="text-2xl">⚖️</span>
          <span className="text-center leading-tight">Teenoor</span>
        </button>

        <button
          onClick={() => { setSelectedGame('prepositions'); sounds.playPop(); }}
          className={`p-2.5 sm:p-3 rounded-2xl border-2 font-fun font-black text-xs flex flex-col items-center gap-1 transition-all ${
            selectedGame === 'prepositions'
              ? 'bg-pink-600 border-pink-700 text-white shadow-md scale-102 ring-2 ring-pink-300'
              : 'bg-white border-pink-200 text-pink-950 hover:bg-pink-50'
          }`}
        >
          <span className="text-2xl">📍</span>
          <span className="text-center leading-tight">Voorsetsels</span>
        </button>
      </div>

      {/* Render Active Mini Game with Difficulty Props */}
      <div className="bg-white rounded-3xl p-5 sm:p-7 border-2 border-slate-200 shadow-sm min-h-[440px]">
        {selectedGame === 'stompi' && <StompiGame difficulty={difficulty} onWin={handleWin} />}
        {selectedGame === 'picture' && <PictureMatchGame difficulty={difficulty} onWin={handleWin} />}
        {selectedGame === 'memory' && <MemoryPairsGame difficulty={difficulty} onWin={handleWin} />}
        {selectedGame === 'spelling' && <SpellingBeeGame difficulty={difficulty} onWin={handleWin} />}
        {selectedGame === 'clock' && <BeatTheClockGame difficulty={difficulty} onWin={handleWin} />}
        {selectedGame === 'negation' && <NegationMasterGame difficulty={difficulty} onWin={handleWin} />}
        {selectedGame === 'tenses' && <TensesMasterGame difficulty={difficulty} onWin={handleWin} />}
        {selectedGame === 'plurals' && <PluralsDiminutivesGame difficulty={difficulty} onWin={handleWin} />}
        {selectedGame === 'wordsearch' && <WordSearchGame difficulty={difficulty} onWin={handleWin} />}
        {selectedGame === 'opposites' && <OppositesSynonymsGame difficulty={difficulty} onWin={handleWin} />}
        {selectedGame === 'prepositions' && <PrepositionsGame difficulty={difficulty} onWin={handleWin} />}
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

/* =========================================================================
   1. STOMPI SENTENCE BUILDER GAME
   ========================================================================= */
const StompiGame: React.FC<{ difficulty: GameDifficulty; onWin: () => void }> = ({ difficulty, onWin }) => {
  const rounds = STOMPI_DATA[difficulty];
  const [roundIdx, setRoundIdx] = useState(0);
  const current = rounds[roundIdx % rounds.length];
  const [selectedWords, setSelectedWords] = useState<string[]>([]);
  const [availableWords, setAvailableWords] = useState<string[]>(current.scrambled);
  const [checked, setChecked] = useState(false);
  const [isCorrect, setIsCorrect] = useState(false);

  useEffect(() => {
    setSelectedWords([]);
    setAvailableWords([...current.scrambled].sort(() => Math.random() - 0.5));
    setChecked(false);
    setIsCorrect(false);
  }, [roundIdx, difficulty]);

  const addWord = (word: string, index: number) => {
    if (checked) return;
    sounds.playPop();
    setSelectedWords((prev) => [...prev, word]);
    setAvailableWords((prev) => prev.filter((_, i) => i !== index));
  };

  const removeWord = (word: string, index: number) => {
    if (checked) return;
    sounds.playPop();
    setAvailableWords((prev) => [...prev, word]);
    setSelectedWords((prev) => prev.filter((_, i) => i !== index));
  };

  const checkSentence = () => {
    const constructed = selectedWords.join(' ').trim();
    const correct = constructed === current.correctSentence;
    setChecked(true);
    setIsCorrect(correct);
    if (correct) {
      sounds.playCorrect();
      onWin();
    } else {
      sounds.playIncorrect();
    }
  };

  const nextRound = () => {
    sounds.playPop();
    setRoundIdx((prev) => (prev + 1) % rounds.length);
  };

  return (
    <div className="space-y-5">
      <div className="flex items-center justify-between border-b border-cyan-100 pb-3">
        <div className="flex items-center gap-2">
          <span className="text-2xl">🚂</span>
          <div>
            <h2 className="font-fun text-xl font-black text-cyan-950">
              STOMPI Trein: Bou die Sinne!
            </h2>
            <span className="text-[11px] font-bold text-cyan-700">
              Vlak: {DIFFICULTY_CONFIGS[difficulty].nameAf}
            </span>
          </div>
        </div>
        <span className="text-xs font-black text-cyan-800 bg-cyan-100 px-3 py-1 rounded-xl">
          Ronde {(roundIdx % rounds.length) + 1} van {rounds.length}
        </span>
      </div>

      <OllieCharacter
        afrikaansText={
          difficulty === 'hard'
            ? 'In moeilike sinne kom Hulpwerkwoorde en Voegwoorde by. Hou Werkwoord 1 altyd in die 2de posisie!'
            : 'Onthou die STOMPI-reël: Werkwoord 1 kom ALTYD tweede!'
        }
        englishText="Click the word blocks in the right order to form the Afrikaans sentence. In Afrikaans, Verb 1 must stay in second place!"
        mood="explaining"
      />

      <div className="bg-cyan-50 p-4 rounded-2xl border border-cyan-200">
        <span className="text-xs font-black text-cyan-900 uppercase">Doelsin (English meaning):</span>
        <p className="font-fun text-base sm:text-lg font-bold text-slate-800 mt-0.5">
          "{current.targetEn}"
        </p>
      </div>

      {/* Assembled Sentence Area */}
      <div className="min-h-[70px] p-3 rounded-2xl border-2 border-dashed border-cyan-300 bg-slate-50/70 flex flex-wrap items-center gap-2">
        {selectedWords.length === 0 ? (
          <span className="text-sm font-bold text-slate-400 italic">
            Klik op die blokkies hieronder om jou sin te bou...
          </span>
        ) : (
          selectedWords.map((word, idx) => (
            <button
              key={idx}
              onClick={() => removeWord(word, idx)}
              disabled={checked}
              className="bg-cyan-500 hover:bg-cyan-600 text-white font-fun font-bold px-3 py-1.5 rounded-xl shadow-2xs text-sm transition-transform active:scale-95 flex items-center gap-1.5"
            >
              <span>{word}</span>
              <span className="text-xs text-cyan-200">✕</span>
            </button>
          ))
        )}
      </div>

      {/* Available Word Blocks */}
      <div>
        <span className="text-xs font-black text-slate-500 uppercase">Beskikbare Woorde:</span>
        <div className="flex flex-wrap gap-2 mt-2">
          {availableWords.map((word, idx) => (
            <button
              key={idx}
              onClick={() => addWord(word, idx)}
              disabled={checked}
              className="bg-white hover:bg-cyan-50 border-2 border-cyan-200 hover:border-cyan-400 text-cyan-950 font-fun font-bold px-3.5 py-2 rounded-2xl shadow-2xs text-sm transition-transform active:scale-95"
            >
              {word}
            </button>
          ))}
        </div>
      </div>

      {/* Result feedback */}
      {checked && (
        <div className={`p-4 rounded-2xl border-2 ${isCorrect ? 'bg-emerald-50 border-emerald-300' : 'bg-orange-50 border-orange-300'}`}>
          <div className="flex items-center gap-2 font-fun font-black mb-1">
            {isCorrect ? (
              <span className="text-emerald-700 flex items-center gap-1">
                <CheckCircle className="w-5 h-5 text-emerald-600" /> Uitstekend gedoen! STOMPI-meester!
              </span>
            ) : (
              <span className="text-amber-800 flex items-center gap-1">
                <AlertCircle className="w-5 h-5 text-amber-600" /> Nie heeltemal nie. Kyk na die reël:
              </span>
            )}
          </div>
          <p className="text-xs sm:text-sm text-slate-700 font-semibold">{current.explanationEn}</p>
          <div className="flex items-center gap-2 mt-1">
            <span className="text-xs text-slate-500 font-bold">Korrekte sin:</span>
            <button
              onClick={() => speakAfrikaans(current.correctSentence)}
              className="text-xs font-bold text-emerald-800 bg-emerald-100 hover:bg-emerald-200 border border-emerald-300 px-2.5 py-1 rounded-lg flex items-center gap-1.5 transition-colors"
              title="Klik om die hele sin te hoor"
            >
              <span>{current.correctSentence}</span>
              <Volume2 className="w-3.5 h-3.5 text-emerald-700" />
            </button>
          </div>
        </div>
      )}

      {/* Buttons */}
      <div className="flex items-center justify-between pt-2">
        <button
          onClick={() => {
            setSelectedWords([]);
            setAvailableWords([...current.scrambled].sort(() => Math.random() - 0.5));
            setChecked(false);
          }}
          className="text-xs font-bold text-slate-500 hover:text-slate-800 flex items-center gap-1 px-3 py-1.5 rounded-xl border border-slate-200"
        >
          <RotateCcw className="w-3.5 h-3.5" />
          <span>Begin oor</span>
        </button>

        {!checked ? (
          <button
            onClick={checkSentence}
            disabled={availableWords.length > 0}
            className="bg-cyan-600 hover:bg-cyan-700 disabled:opacity-50 text-white font-black px-5 py-2.5 rounded-2xl shadow-sm text-sm"
          >
            Toets Sin! ✓
          </button>
        ) : (
          <button
            onClick={nextRound}
            className="bg-emerald-500 hover:bg-emerald-600 text-white font-black px-5 py-2.5 rounded-2xl shadow-sm text-sm flex items-center gap-1.5"
          >
            <span>Volgende Ronde</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        )}
      </div>
    </div>
  );
};

/* =========================================================================
   2. PICTURE MATCH GAME
   ========================================================================= */
const PictureMatchGame: React.FC<{ difficulty: GameDifficulty; onWin: () => void }> = ({ difficulty, onWin }) => {
  const items = PICTURE_DATA[difficulty];
  const [currentIdx, setCurrentIdx] = useState(0);
  const current = items[currentIdx % items.length];
  const [selected, setSelected] = useState<string | null>(null);
  const [checked, setChecked] = useState(false);

  useEffect(() => {
    setSelected(null);
    setChecked(false);
  }, [difficulty]);

  const handleSelect = (opt: string) => {
    if (checked) return;
    speakAfrikaans(opt);
    setSelected(opt);
    setChecked(true);
    if (opt === current.correctAf) {
      sounds.playCorrect();
      onWin();
    } else {
      sounds.playIncorrect();
    }
  };

  const next = () => {
    sounds.playPop();
    setSelected(null);
    setChecked(false);
    setCurrentIdx((prev) => (prev + 1) % items.length);
  };

  return (
    <div className="space-y-5 text-center max-w-lg mx-auto">
      <div className="flex items-center justify-between border-b border-amber-100 pb-2">
        <h2 className="font-fun text-xl font-black text-amber-950">
          Kies die Regte Afrikaanse Woord! 🖼️
        </h2>
        <span className="text-xs font-black text-amber-800 bg-amber-100 px-3 py-1 rounded-xl">
          {(currentIdx % items.length) + 1} / {items.length}
        </span>
      </div>

      <div className="w-32 h-32 mx-auto rounded-3xl bg-amber-100 border-4 border-amber-300 flex items-center justify-center text-7xl shadow-inner animate-gentle-bounce">
        {current.emoji}
      </div>

      <p className="text-sm font-bold text-slate-600">
        English: <span className="text-slate-900 font-black">{current.english}</span>
      </p>

      <div className={`grid gap-3 ${current.options.length <= 3 ? 'grid-cols-3' : 'grid-cols-2'}`}>
        {current.options.map((opt) => {
          let style = 'bg-white border-amber-200 hover:border-amber-400 text-amber-950';
          if (checked) {
            if (opt === current.correctAf) {
              style = 'bg-emerald-100 border-emerald-500 text-emerald-950 font-black ring-2 ring-emerald-400';
            } else if (opt === selected) {
              style = 'bg-rose-100 border-rose-400 text-rose-950';
            }
          }
          return (
            <button
              key={opt}
              onClick={() => handleSelect(opt)}
              disabled={checked}
              className={`p-4 rounded-2xl border-2 font-fun font-bold text-base transition-all ${style}`}
            >
              {opt}
            </button>
          );
        })}
      </div>

      {checked && (
        <div className="pt-2">
          <p className="text-xs text-slate-600 mb-3">
            {selected === current.correctAf
              ? `Mooi so! "${current.correctAf}" is die regte Afrikaanse woord vir ${current.english}.`
              : `Nie heeltemal nie. ${current.english} in Afrikaans is "${current.correctAf}".`}
          </p>
          <button
            onClick={next}
            className="bg-amber-500 hover:bg-amber-600 text-white font-black px-6 py-2.5 rounded-2xl shadow-sm text-sm"
          >
            Volgende Prentjie →
          </button>
        </div>
      )}
    </div>
  );
};

/* =========================================================================
   3. MEMORY MATCH WORD PAIRS GAME
   ========================================================================= */
const MemoryPairsGame: React.FC<{ difficulty: GameDifficulty; onWin: () => void }> = ({ difficulty, onWin }) => {
  const pairs = MEMORY_DATA[difficulty];

  const generateCards = (pList: typeof pairs) => {
    const list: Array<{ id: string; text: string; matchKey: string; isAf: boolean }> = [];
    pList.forEach((p) => {
      list.push({ id: `${p.id}-af`, text: p.af, matchKey: p.id, isAf: true });
      list.push({ id: `${p.id}-en`, text: p.en, matchKey: p.id, isAf: false });
    });
    return list.sort(() => Math.random() - 0.5);
  };

  const [cards, setCards] = useState(() => generateCards(pairs));
  const [flipped, setFlipped] = useState<string[]>([]);
  const [matched, setMatched] = useState<string[]>([]);

  useEffect(() => {
    setCards(generateCards(pairs));
    setFlipped([]);
    setMatched([]);
  }, [difficulty]);

  const handleCardClick = (id: string, matchKey: string, text: string, isAf: boolean) => {
    if (flipped.length === 2 || matched.includes(matchKey) || flipped.includes(id)) return;
    sounds.playPop();
    if (isAf) {
      speakAfrikaans(text);
    }

    const newFlipped = [...flipped, id];
    setFlipped(newFlipped);

    if (newFlipped.length === 2) {
      const firstCard = cards.find((c) => c.id === newFlipped[0]);
      const secondCard = cards.find((c) => c.id === newFlipped[1]);

      if (firstCard && secondCard && firstCard.matchKey === secondCard.matchKey) {
        // Matched!
        sounds.playCorrect();
        setMatched((prev) => {
          const next = [...prev, firstCard.matchKey];
          if (next.length === pairs.length) {
            sounds.playVictory();
            onWin();
          }
          return next;
        });
        setFlipped([]);
      } else {
        // Not matched
        sounds.playIncorrect();
        setTimeout(() => setFlipped([]), 1000);
      }
    }
  };

  const restart = () => {
    sounds.playPop();
    setCards(generateCards(pairs));
    setFlipped([]);
    setMatched([]);
  };

  const isAllMatched = matched.length === pairs.length;

  return (
    <div className="space-y-5 text-center max-w-xl mx-auto">
      <div className="flex items-center justify-between border-b border-purple-100 pb-2">
        <div>
          <h2 className="font-fun text-xl font-black text-purple-950">
            Geheue-Kaarte: Pas die Pare! 🃏
          </h2>
          <span className="text-[11px] font-bold text-purple-700">
            {pairs.length} Pare • {DIFFICULTY_CONFIGS[difficulty].nameAf}
          </span>
        </div>
        <button onClick={restart} className="text-xs font-bold text-purple-800 hover:underline">
          Herstel
        </button>
      </div>

      <p className="text-xs sm:text-sm font-semibold text-slate-600">
        Vind die Afrikaanse woord en sy ooreenstemmende Engelse betekenis!
      </p>

      <div className={`grid gap-2.5 ${cards.length <= 6 ? 'grid-cols-3' : cards.length <= 8 ? 'grid-cols-4' : 'grid-cols-4 sm:grid-cols-6'}`}>
        {cards.map((card) => {
          const isCardFlipped = flipped.includes(card.id) || matched.includes(card.matchKey);
          const isCardMatched = matched.includes(card.matchKey);

          return (
            <button
              key={card.id}
              onClick={() => handleCardClick(card.id, card.matchKey, card.text, card.isAf)}
              disabled={isCardMatched}
              className={`h-20 rounded-2xl border-2 font-fun font-black text-xs sm:text-sm flex items-center justify-center p-2 transition-all ${
                isCardMatched
                  ? 'bg-emerald-100 border-emerald-400 text-emerald-900 opacity-90'
                  : isCardFlipped
                  ? 'bg-purple-100 border-purple-400 text-purple-950 shadow-inner'
                  : 'bg-purple-500 border-purple-600 text-white hover:bg-purple-600'
              }`}
            >
              {isCardFlipped ? (
                <span className="break-words leading-tight">{card.text}</span>
              ) : (
                <span className="text-2xl">🦉</span>
              )}
            </button>
          );
        })}
      </div>

      {isAllMatched && (
        <div className="bg-emerald-50 p-4 rounded-2xl border border-emerald-300 space-y-2">
          <p className="font-fun text-lg font-black text-emerald-900">
            🎉 Fantasties! Al die pare gevind!
          </p>
          <button
            onClick={restart}
            className="bg-emerald-500 hover:bg-emerald-600 text-white font-black px-5 py-2 rounded-xl text-sm"
          >
            Speel Weer
          </button>
        </div>
      )}
    </div>
  );
};

/* =========================================================================
   4. SPELLING BEE GAME
   ========================================================================= */
const SpellingBeeGame: React.FC<{ difficulty: GameDifficulty; onWin: () => void }> = ({ difficulty, onWin }) => {
  const words = SPELLING_DATA[difficulty];
  const [idx, setIdx] = useState(0);
  const current = words[idx % words.length];
  const [letters, setLetters] = useState<string[]>([]);
  const [chosen, setChosen] = useState<number[]>([]);
  const [checked, setChecked] = useState(false);
  const [isCorrect, setIsCorrect] = useState(false);

  useEffect(() => {
    const chars = current.word.split('').sort(() => Math.random() - 0.5);
    setLetters(chars);
    setChosen([]);
    setChecked(false);
    setIsCorrect(false);
  }, [idx, difficulty]);

  const toggleLetter = (letterIdx: number) => {
    if (checked) return;
    sounds.playPop();
    if (chosen.includes(letterIdx)) {
      setChosen((prev) => prev.filter((i) => i !== letterIdx));
    } else {
      setChosen((prev) => [...prev, letterIdx]);
    }
  };

  const handleCheck = () => {
    const spelled = chosen.map((i) => letters[i]).join('');
    const correct = spelled === current.word;
    setChecked(true);
    setIsCorrect(correct);
    if (correct) {
      sounds.playCorrect();
      onWin();
    } else {
      sounds.playIncorrect();
    }
  };

  const next = () => {
    sounds.playPop();
    setIdx((prev) => (prev + 1) % words.length);
  };

  const spelledText = chosen.map((i) => letters[i]).join('');

  return (
    <div className="space-y-5 text-center max-w-lg mx-auto">
      <div className="flex items-center justify-between border-b border-emerald-100 pb-2">
        <div>
          <h2 className="font-fun text-xl font-black text-emerald-950">
            Afrikaans Spelby (Spelling Bee) 🐝
          </h2>
          <span className="text-[11px] font-bold text-emerald-700">
            {DIFFICULTY_CONFIGS[difficulty].nameAf} ({current.word.length} letters)
          </span>
        </div>
        <span className="text-xs font-black text-emerald-800 bg-emerald-100 px-3 py-1 rounded-xl">
          {(idx % words.length) + 1} / {words.length}
        </span>
      </div>

      <div className="bg-emerald-50 p-4 rounded-2xl border border-emerald-200">
        <span className="text-xs font-black text-emerald-900 uppercase">Engelse betekenis:</span>
        <h3 className="font-fun text-2xl font-black text-slate-900 mt-1">
          "{current.english}"
        </h3>
        <p className="text-xs text-emerald-800 font-bold mt-1">
          💡 Leidraad: {current.hint}
        </p>
        <button
          onClick={() => speakAfrikaans(current.word)}
          className="mt-2 inline-flex items-center gap-1.5 text-xs font-bold text-emerald-800 bg-white border border-emerald-300 px-3 py-1 rounded-xl hover:bg-emerald-100"
        >
          <Volume2 className="w-3.5 h-3.5" /> Luister na uitspraak
        </button>
      </div>

      {/* Current spelled letters */}
      <div className="min-h-[55px] p-3 rounded-2xl border-2 border-emerald-400 bg-slate-50 flex items-center justify-center gap-1.5 flex-wrap">
        {spelledText.length === 0 ? (
          <span className="text-sm font-bold text-slate-400 italic">
            Klik op die letters om die woord te spel...
          </span>
        ) : (
          spelledText.split('').map((char, cIdx) => (
            <span
              key={cIdx}
              className="w-8 h-8 rounded-xl bg-emerald-600 text-white font-fun font-black flex items-center justify-center text-lg shadow-2xs"
            >
              {char}
            </span>
          ))
        )}
      </div>

      {/* Scrambled letter tiles */}
      <div className="flex flex-wrap justify-center gap-2">
        {letters.map((char, lIdx) => {
          const isUsed = chosen.includes(lIdx);
          return (
            <button
              key={lIdx}
              onClick={() => toggleLetter(lIdx)}
              disabled={isUsed || checked}
              className={`w-10 h-10 rounded-xl font-fun font-black text-lg border-2 transition-all ${
                isUsed
                  ? 'bg-slate-200 text-slate-400 border-slate-300'
                  : 'bg-white hover:bg-emerald-50 text-emerald-950 border-emerald-300 shadow-2xs hover:scale-105 active:scale-95'
              }`}
            >
              {char}
            </button>
          );
        })}
      </div>

      {/* Feedback & Actions */}
      {checked ? (
        <div className="space-y-3">
          <p className="text-sm font-bold">
            {isCorrect ? (
              <span className="text-emerald-700">🎉 Goed gespel! "{current.word}" is 100% reg!</span>
            ) : (
              <span className="text-rose-700">Die regte spelling is: <span className="font-black">{current.word}</span></span>
            )}
          </p>
          <button
            onClick={next}
            className="bg-emerald-500 hover:bg-emerald-600 text-white font-black px-6 py-2.5 rounded-2xl shadow-sm text-sm"
          >
            Volgende Woord →
          </button>
        </div>
      ) : (
        <button
          onClick={handleCheck}
          disabled={spelledText.length === 0}
          className="bg-emerald-600 hover:bg-emerald-700 disabled:opacity-50 text-white font-black px-6 py-2.5 rounded-2xl shadow-sm text-sm"
        >
          Toets Spelling! ✓
        </button>
      )}
    </div>
  );
};

/* =========================================================================
   5. BEAT THE CLOCK VOCABULARY DASH
   ========================================================================= */
const BeatTheClockGame: React.FC<{ difficulty: GameDifficulty; onWin: () => void }> = ({ difficulty, onWin }) => {
  const clockConfig = CLOCK_DATA[difficulty];
  const questions = clockConfig.questions;

  const [isPlaying, setIsPlaying] = useState(false);
  const [timeLeft, setTimeLeft] = useState(clockConfig.timeSeconds);
  const [score, setScore] = useState(0);
  const [qIdx, setQIdx] = useState(0);
  const [gameOver, setGameOver] = useState(false);

  useEffect(() => {
    setIsPlaying(false);
    setGameOver(false);
    setTimeLeft(clockConfig.timeSeconds);
  }, [difficulty]);

  const current = questions[qIdx % questions.length];

  // Generate choices
  const choices = useMemo(() => {
    const wrongCount = difficulty === 'hard' ? 3 : 2;
    const wrong = questions
      .filter((q) => q.en !== current.en)
      .sort(() => Math.random() - 0.5)
      .slice(0, wrongCount)
      .map((q) => q.en);
    return [current.en, ...wrong].sort(() => Math.random() - 0.5);
  }, [qIdx, difficulty]);

  useEffect(() => {
    let timer: NodeJS.Timeout;
    if (isPlaying && timeLeft > 0) {
      timer = setInterval(() => {
        setTimeLeft((prev) => prev - 1);
      }, 1000);
    } else if (isPlaying && timeLeft === 0) {
      setIsPlaying(false);
      setGameOver(true);
      sounds.playVictory();
      onWin();
    }
    return () => clearInterval(timer);
  }, [isPlaying, timeLeft]);

  const startGame = () => {
    sounds.playPop();
    setTimeLeft(clockConfig.timeSeconds);
    setScore(0);
    setQIdx(0);
    setGameOver(false);
    setIsPlaying(true);
  };

  const handleChoice = (opt: string) => {
    if (!isPlaying) return;
    if (opt === current.en) {
      sounds.playCorrect();
      setScore((prev) => prev + 1);
    } else {
      sounds.playIncorrect();
    }
    setQIdx((prev) => prev + 1);
  };

  return (
    <div className="space-y-5 text-center max-w-md mx-auto">
      <div className="flex items-center justify-between border-b border-rose-100 pb-2">
        <div>
          <h2 className="font-fun text-xl font-black text-rose-950">
            Spoedtoets! ⚡
          </h2>
          <span className="text-[11px] font-bold text-rose-700">
            {DIFFICULTY_CONFIGS[difficulty].nameAf} • {clockConfig.timeSeconds}s
          </span>
        </div>
        <div className="flex items-center gap-1.5 font-fun font-black text-rose-900 bg-rose-100 px-3 py-1 rounded-xl">
          <Timer className="w-4 h-4 text-rose-600" />
          <span>{timeLeft}s</span>
        </div>
      </div>

      {!isPlaying && !gameOver && (
        <div className="py-6 space-y-4">
          <div className="w-20 h-20 mx-auto rounded-3xl bg-rose-100 flex items-center justify-center text-4xl shadow-sm">
            ⚡
          </div>
          <h3 className="font-fun text-xl font-black text-slate-900">
            Kits-Afrikaans Spoedtoets!
          </h3>
          <p className="text-xs sm:text-sm font-semibold text-slate-600 max-w-sm mx-auto">
            Hoeveel Afrikaanse woorde kan jy binne {clockConfig.timeSeconds} sekondes korrek vertaal?
          </p>
          <button
            onClick={startGame}
            className="bg-rose-500 hover:bg-rose-600 text-white font-fun font-black px-8 py-3 rounded-2xl shadow-md text-base"
          >
            Begin Nou! ⏱️
          </button>
        </div>
      )}

      {isPlaying && (
        <div className="space-y-4 py-2">
          <span className="text-xs font-black text-rose-800 bg-rose-50 px-3 py-1 rounded-full border border-rose-200">
            Telling: {score} punte
          </span>

          <div className="bg-rose-50/80 p-5 rounded-3xl border-2 border-rose-300">
            <span className="text-xs font-black text-rose-900 uppercase">Afrikaanse Woord:</span>
            <h3 className="font-fun text-3xl font-black text-slate-900 mt-1">
              {current.af}
            </h3>
          </div>

          <div className="grid grid-cols-1 gap-2.5">
            {choices.map((opt) => (
              <button
                key={opt}
                onClick={() => handleChoice(opt)}
                className="p-3.5 rounded-2xl border-2 border-slate-200 hover:border-rose-400 bg-white text-slate-900 font-fun font-bold text-base transition-transform active:scale-95"
              >
                {opt}
              </button>
            ))}
          </div>
        </div>
      )}

      {gameOver && (
        <div className="py-6 space-y-4">
          <div className="w-20 h-20 mx-auto rounded-3xl bg-amber-100 flex items-center justify-center text-4xl">
            🏆
          </div>
          <h3 className="font-fun text-2xl font-black text-slate-900">
            Tyd is verby! Goed gedoen!
          </h3>
          <p className="text-sm font-bold text-slate-600">
            Jou finale telling: <span className="text-rose-600 font-black text-lg">{score}</span> woorde korrek!
          </p>
          <button
            onClick={startGame}
            className="bg-rose-500 hover:bg-rose-600 text-white font-fun font-black px-6 py-2.5 rounded-2xl text-sm"
          >
            Speel Weer
          </button>
        </div>
      )}
    </div>
  );
};

/* =========================================================================
   6. NEW GAME: DUBBELE "NIE" JAGTER (NEGATION MASTER) 🚫
   ========================================================================= */
const NegationMasterGame: React.FC<{ difficulty: GameDifficulty; onWin: () => void }> = ({ difficulty, onWin }) => {
  const questions = NEGATION_DATA[difficulty];
  const [idx, setIdx] = useState(0);
  const current = questions[idx % questions.length];
  const [selectedOpt, setSelectedOpt] = useState<string | null>(null);
  const [checked, setChecked] = useState(false);

  useEffect(() => {
    setSelectedOpt(null);
    setChecked(false);
  }, [idx, difficulty]);

  const handleSelect = (opt: string) => {
    if (checked) return;
    sounds.playPop();
    setSelectedOpt(opt);
    setChecked(true);

    const isCorrect = opt === current.missingPart;
    if (isCorrect) {
      sounds.playCorrect();
      onWin();
    } else {
      sounds.playIncorrect();
    }
  };

  const next = () => {
    sounds.playPop();
    setIdx((prev) => (prev + 1) % questions.length);
  };

  return (
    <div className="space-y-5 text-center max-w-lg mx-auto">
      <div className="flex items-center justify-between border-b border-indigo-100 pb-2">
        <div>
          <h2 className="font-fun text-xl font-black text-indigo-950">
            Dubbele "Nie" Jagter 🚫
          </h2>
          <span className="text-[11px] font-bold text-indigo-700">
            Ontkenning • {DIFFICULTY_CONFIGS[difficulty].nameAf}
          </span>
        </div>
        <span className="text-xs font-black text-indigo-800 bg-indigo-100 px-3 py-1 rounded-xl">
          {(idx % questions.length) + 1} / {questions.length}
        </span>
      </div>

      <OllieCharacter
        afrikaansText="In Afrikaans gebruik ons 'n dubbele ontkenning! Die eerste 'nie' kom na die werkwoord, en die tweede 'nie' sluit die sin af."
        englishText="Afrikaans requires the double negative (nie ... nie). Complete the sentence correctly!"
        mood="explaining"
      />

      <div className="bg-indigo-50/80 p-5 rounded-3xl border-2 border-indigo-200 text-left space-y-2">
        <span className="text-xs font-black text-indigo-900 uppercase">Engelse Betekenis:</span>
        <p className="font-fun text-base font-bold text-slate-800">
          "{current.contextEn}"
        </p>

        <span className="text-xs font-black text-indigo-900 uppercase block pt-2">Voltooi die Afrikaanse sin:</span>
        <div className="p-3 bg-white rounded-2xl border-2 border-indigo-300 font-fun text-lg font-black text-slate-900">
          {current.incompleteSentence.replace('___', '___')}
        </div>
      </div>

      {/* Option Buttons */}
      <div className="grid grid-cols-2 gap-3">
        {current.options.map((opt) => {
          let style = 'bg-white border-indigo-200 hover:border-indigo-400 text-indigo-950';
          if (checked) {
            if (opt === current.missingPart) {
              style = 'bg-emerald-100 border-emerald-500 text-emerald-950 font-black ring-2 ring-emerald-400';
            } else if (opt === selectedOpt) {
              style = 'bg-rose-100 border-rose-400 text-rose-950';
            }
          }
          return (
            <button
              key={opt}
              onClick={() => handleSelect(opt)}
              disabled={checked}
              className={`p-3.5 rounded-2xl border-2 font-fun font-bold text-base transition-all ${style}`}
            >
              {opt}
            </button>
          );
        })}
      </div>

      {/* Explanation & Next */}
      {checked && (
        <div className="pt-2 space-y-3">
          <div className="bg-indigo-50 border border-indigo-200 rounded-2xl p-3 text-left">
            <span className="text-xs font-black text-indigo-950 uppercase block">💡 Grammatika-Reël:</span>
            <p className="text-xs text-slate-700 font-semibold mt-1">
              {current.explanation}
            </p>
          </div>
          <button
            onClick={next}
            className="bg-indigo-600 hover:bg-indigo-700 text-white font-black px-6 py-2.5 rounded-2xl shadow-sm text-sm"
          >
            Volgende Sin →
          </button>
        </div>
      )}
    </div>
  );
};

/* =========================================================================
   7. NEW GAME: TYE-MEESTER (TENSES TIME MACHINE) ⏳
   ========================================================================= */
const TensesMasterGame: React.FC<{ difficulty: GameDifficulty; onWin: () => void }> = ({ difficulty, onWin }) => {
  const questions = TENSES_DATA[difficulty];
  const [idx, setIdx] = useState(0);
  const current = questions[idx % questions.length];
  const [selectedOpt, setSelectedOpt] = useState<string | null>(null);
  const [checked, setChecked] = useState(false);

  useEffect(() => {
    setSelectedOpt(null);
    setChecked(false);
  }, [idx, difficulty]);

  const handleSelect = (opt: string) => {
    if (checked) return;
    sounds.playPop();
    setSelectedOpt(opt);
    setChecked(true);

    const isCorrect = opt === current.correct;
    if (isCorrect) {
      sounds.playCorrect();
      onWin();
    } else {
      sounds.playIncorrect();
    }
  };

  const next = () => {
    sounds.playPop();
    setIdx((prev) => (prev + 1) % questions.length);
  };

  return (
    <div className="space-y-5 text-center max-w-lg mx-auto">
      <div className="flex items-center justify-between border-b border-blue-100 pb-2">
        <div>
          <h2 className="font-fun text-xl font-black text-blue-950">
            Tye-Meester Tydmasjien ⏳
          </h2>
          <span className="text-[11px] font-bold text-blue-700">
            {current.targetTenseLabelAf} • {DIFFICULTY_CONFIGS[difficulty].nameAf}
          </span>
        </div>
        <span className="text-xs font-black text-blue-800 bg-blue-100 px-3 py-1 rounded-xl">
          {(idx % questions.length) + 1} / {questions.length}
        </span>
      </div>

      <div className="bg-blue-50/80 p-5 rounded-3xl border-2 border-blue-200 text-left space-y-2">
        <span className="text-xs font-black text-blue-900 uppercase">Huidige Sin (Teenwoordige Tyd):</span>
        <div className="p-3 bg-white rounded-2xl border-2 border-blue-300 font-fun text-lg font-black text-slate-900 flex items-center justify-between">
          <span>{current.presentAf}</span>
          <button
            onClick={() => speakAfrikaans(current.presentAf)}
            className="text-xs font-bold text-blue-800 bg-blue-50 hover:bg-blue-100 border border-blue-200 p-1.5 rounded-lg"
            title="Luister"
          >
            <Volume2 className="w-4 h-4" />
          </button>
        </div>
        <p className="text-xs text-slate-500 font-bold">
          English: "{current.presentEn}"
        </p>

        <div className="mt-2 bg-blue-100/70 text-blue-950 font-black text-xs px-3 py-1.5 rounded-xl border border-blue-300 inline-block">
          Verander na: <span className="underline">{current.targetTenseLabelAf}</span>
        </div>
      </div>

      {/* Option Buttons */}
      <div className="grid grid-cols-1 gap-2.5">
        {current.options.map((opt) => {
          let style = 'bg-white border-blue-200 hover:border-blue-400 text-blue-950';
          if (checked) {
            if (opt === current.correct) {
              style = 'bg-emerald-100 border-emerald-500 text-emerald-950 font-black ring-2 ring-emerald-400';
            } else if (opt === selectedOpt) {
              style = 'bg-rose-100 border-rose-400 text-rose-950';
            }
          }
          return (
            <button
              key={opt}
              onClick={() => handleSelect(opt)}
              disabled={checked}
              className={`p-3.5 rounded-2xl border-2 font-fun font-bold text-sm sm:text-base text-left transition-all ${style}`}
            >
              {opt}
            </button>
          );
        })}
      </div>

      {/* Explanation & Next */}
      {checked && (
        <div className="pt-2 space-y-3">
          <div className="bg-blue-50 border border-blue-200 rounded-2xl p-3 text-left">
            <span className="text-xs font-black text-blue-950 uppercase block">💡 Reël van die Tye:</span>
            <p className="text-xs text-slate-700 font-semibold mt-1">
              {current.explanation}
            </p>
          </div>
          <button
            onClick={next}
            className="bg-blue-600 hover:bg-blue-700 text-white font-black px-6 py-2.5 rounded-2xl shadow-sm text-sm"
          >
            Volgende Sin →
          </button>
        </div>
      )}
    </div>
  );
};

/* =========================================================================
   8. NEW GAME: MEERVOUDE & VERKLEINWOORDE 🪄
   ========================================================================= */
const PluralsDiminutivesGame: React.FC<{ difficulty: GameDifficulty; onWin: () => void }> = ({ difficulty, onWin }) => {
  const questions = PLURALS_DIMINUTIVES_DATA[difficulty];
  const [idx, setIdx] = useState(0);
  const current = questions[idx % questions.length];
  const [selectedOpt, setSelectedOpt] = useState<string | null>(null);
  const [checked, setChecked] = useState(false);

  useEffect(() => {
    setSelectedOpt(null);
    setChecked(false);
  }, [idx, difficulty]);

  const handleSelect = (opt: string) => {
    if (checked) return;
    sounds.playPop();
    speakAfrikaans(opt);
    setSelectedOpt(opt);
    setChecked(true);

    const isCorrect = opt === current.correct;
    if (isCorrect) {
      sounds.playCorrect();
      onWin();
    } else {
      sounds.playIncorrect();
    }
  };

  const next = () => {
    sounds.playPop();
    setIdx((prev) => (prev + 1) % questions.length);
  };

  return (
    <div className="space-y-5 text-center max-w-lg mx-auto">
      <div className="flex items-center justify-between border-b border-teal-100 pb-2">
        <div>
          <h2 className="font-fun text-xl font-black text-teal-950">
            Meervoude & Verkleinwoorde 🪄
          </h2>
          <span className="text-[11px] font-bold text-teal-700">
            {current.typeLabelAf} • {DIFFICULTY_CONFIGS[difficulty].nameAf}
          </span>
        </div>
        <span className="text-xs font-black text-teal-800 bg-teal-100 px-3 py-1 rounded-xl">
          {(idx % questions.length) + 1} / {questions.length}
        </span>
      </div>

      <div className="bg-teal-50/80 p-5 rounded-3xl border-2 border-teal-200 space-y-2">
        <span className="text-xs font-black text-teal-900 uppercase">Basiswoord:</span>
        <h3 className="font-fun text-3xl font-black text-slate-900">
          "{current.baseWord}"
        </h3>
        <p className="text-xs text-slate-600 font-bold">
          English: {current.englishMeaning}
        </p>

        <div className="mt-2 bg-teal-100/80 text-teal-950 font-black text-xs px-3 py-1.5 rounded-xl border border-teal-300 inline-block">
          Wat is die regte <span className="underline">{current.typeLabelAf}</span>?
        </div>
      </div>

      {/* Option Buttons */}
      <div className="grid grid-cols-2 gap-3">
        {current.options.map((opt) => {
          let style = 'bg-white border-teal-200 hover:border-teal-400 text-teal-950';
          if (checked) {
            if (opt === current.correct) {
              style = 'bg-emerald-100 border-emerald-500 text-emerald-950 font-black ring-2 ring-emerald-400';
            } else if (opt === selectedOpt) {
              style = 'bg-rose-100 border-rose-400 text-rose-950';
            }
          }
          return (
            <button
              key={opt}
              onClick={() => handleSelect(opt)}
              disabled={checked}
              className={`p-4 rounded-2xl border-2 font-fun font-bold text-base transition-all ${style}`}
            >
              {opt}
            </button>
          );
        })}
      </div>

      {/* Explanation & Next */}
      {checked && (
        <div className="pt-2 space-y-3">
          <div className="bg-teal-50 border border-teal-200 rounded-2xl p-3 text-left">
            <span className="text-xs font-black text-teal-950 uppercase block">💡 Taalreël:</span>
            <p className="text-xs text-slate-700 font-semibold mt-1">
              {current.explanation}
            </p>
          </div>
          <button
            onClick={next}
            className="bg-teal-600 hover:bg-teal-700 text-white font-black px-6 py-2.5 rounded-2xl shadow-sm text-sm"
          >
            Volgende Vraag →
          </button>
        </div>
      )}
    </div>
  );
};

/* =========================================================================
   9. WOORDSOEK-AVONTUUR (AFRIKAANS WORD SEARCH)
   ========================================================================= */
const WORD_COLORS = [
  'bg-amber-200 text-amber-950 border-amber-400 font-black',
  'bg-emerald-200 text-emerald-950 border-emerald-400 font-black',
  'bg-sky-200 text-sky-950 border-sky-400 font-black',
  'bg-purple-200 text-purple-950 border-purple-400 font-black',
  'bg-rose-200 text-rose-950 border-rose-400 font-black',
  'bg-lime-200 text-lime-950 border-lime-400 font-black',
  'bg-teal-200 text-teal-950 border-teal-400 font-black',
  'bg-indigo-200 text-indigo-950 border-indigo-400 font-black'
];

const WordSearchGame: React.FC<{ difficulty: GameDifficulty; onWin: () => void }> = ({ difficulty, onWin }) => {
  const puzzles = WORDSEARCH_DATA[difficulty];
  const [puzzleIdx, setPuzzleIdx] = useState(0);
  const currentPuzzle = puzzles[puzzleIdx % puzzles.length];

  const [selectedCoords, setSelectedCoords] = useState<[number, number][]>([]);
  const [foundWords, setFoundWords] = useState<string[]>([]);
  const [foundCoordsMap, setFoundCoordsMap] = useState<Record<string, number>>({});
  const [isCompleted, setIsCompleted] = useState(false);

  // Reset when difficulty or puzzle changes
  useEffect(() => {
    setSelectedCoords([]);
    setFoundWords([]);
    setFoundCoordsMap({});
    setIsCompleted(false);
  }, [difficulty, puzzleIdx]);

  const currentSelectionWord = useMemo(() => {
    return selectedCoords
      .map(([r, c]) => currentPuzzle.grid[r]?.[c] || '')
      .join('');
  }, [selectedCoords, currentPuzzle]);

  const handleCellClick = (r: number, c: number) => {
    if (isCompleted) return;
    sounds.playPop();

    // Check if clicking last selected cell to undo
    if (selectedCoords.length > 0) {
      const last = selectedCoords[selectedCoords.length - 1];
      if (last[0] === r && last[1] === c) {
        setSelectedCoords((prev) => prev.slice(0, -1));
        return;
      }
    }

    // Check if already selected in current selection
    const alreadySelected = selectedCoords.some(([sr, sc]) => sr === r && sc === c);
    if (alreadySelected) {
      // Clear and start fresh from this cell
      setSelectedCoords([[r, c]]);
      return;
    }

    const nextCoords: [number, number][] = [...selectedCoords, [r, c]];
    const candidateWord = nextCoords.map(([cr, cc]) => currentPuzzle.grid[cr]?.[cc] || '').join('');
    const candidateReversed = candidateWord.split('').reverse().join('');

    // Check if matches any unfound word
    const matched = currentPuzzle.words.find(
      (w) =>
        !foundWords.includes(w.word) &&
        (w.word === candidateWord || w.word === candidateReversed)
    );

    if (matched) {
      const colorIdx = foundWords.length % WORD_COLORS.length;
      const newMap = { ...foundCoordsMap };
      nextCoords.forEach(([cr, cc]) => {
        newMap[`${cr},${cc}`] = colorIdx;
      });

      const updatedFound = [...foundWords, matched.word];
      setFoundCoordsMap(newMap);
      setFoundWords(updatedFound);
      setSelectedCoords([]);

      sounds.playCorrect();
      speakAfrikaans(matched.word);

      if (updatedFound.length >= currentPuzzle.words.length) {
        setIsCompleted(true);
        sounds.playVictory();
        onWin();
      }
    } else {
      // Keep selecting if under length of longest word, else reset to this click
      const maxWordLen = Math.max(...currentPuzzle.words.map((w) => w.word.length), 8);
      if (nextCoords.length > maxWordLen) {
        setSelectedCoords([[r, c]]);
      } else {
        setSelectedCoords(nextCoords);
      }
    }
  };

  const handleClearSelection = () => {
    sounds.playPop();
    setSelectedCoords([]);
  };

  const handleNextPuzzle = () => {
    sounds.playPop();
    setPuzzleIdx((prev) => (prev + 1) % puzzles.length);
  };

  return (
    <div className="space-y-6 max-w-2xl mx-auto">
      {/* Header */}
      <div className="flex flex-wrap items-center justify-between gap-2 border-b border-amber-100 pb-3">
        <div>
          <div className="flex items-center gap-2">
            <span className="text-xl">🔍</span>
            <h2 className="font-fun text-xl sm:text-2xl font-black text-amber-950">
              Woordsoek-Avontuur
            </h2>
            <span className="text-xs font-black bg-amber-100 text-amber-800 px-2.5 py-0.5 rounded-full border border-amber-200">
              {currentPuzzle.themeAf}
            </span>
          </div>
          <p className="text-xs text-amber-800 font-bold mt-0.5">
            Tik op die letters in volgorde om die Afrikaanse woorde te vind!
          </p>
        </div>

        <div className="flex items-center gap-2">
          <span className="text-xs font-black bg-amber-500 text-white px-3 py-1 rounded-xl shadow-xs">
            {foundWords.length} / {currentPuzzle.words.length} Gevind
          </span>
          <button
            onClick={handleNextPuzzle}
            className="text-xs font-black text-amber-900 bg-amber-100 hover:bg-amber-200 border border-amber-300 px-2.5 py-1 rounded-xl transition-all"
            title="Volgende Kaart"
          >
            Ander Kaart 🔀
          </button>
        </div>
      </div>

      {/* Current Selection Bar */}
      <div className="bg-amber-50/90 border-2 border-amber-200 rounded-2xl p-3 flex items-center justify-between gap-2">
        <div className="flex items-center gap-2 overflow-x-auto py-1">
          <span className="text-xs font-black text-amber-900 whitespace-nowrap">Gekose Letters:</span>
          {selectedCoords.length === 0 ? (
            <span className="text-xs text-slate-400 italic">Tik op letters in die rooster...</span>
          ) : (
            <div className="flex items-center gap-1">
              {selectedCoords.map(([r, c], i) => (
                <span
                  key={`${r}-${c}-${i}`}
                  className="w-7 h-7 flex items-center justify-center font-fun font-black text-sm bg-amber-500 text-white rounded-lg shadow-xs"
                >
                  {currentPuzzle.grid[r][c]}
                </span>
              ))}
              <span className="font-fun font-black text-amber-900 text-xs ml-1">
                ({currentSelectionWord})
              </span>
            </div>
          )}
        </div>

        {selectedCoords.length > 0 && (
          <button
            onClick={handleClearSelection}
            className="text-xs font-bold text-rose-700 bg-rose-50 hover:bg-rose-100 border border-rose-200 px-2.5 py-1 rounded-xl whitespace-nowrap"
          >
            Vee Uit ✕
          </button>
        )}
      </div>

      {/* Grid Container */}
      <div className="flex justify-center">
        <div
          className="inline-grid gap-1.5 p-3 sm:p-4 bg-gradient-to-br from-amber-100 to-orange-100 rounded-3xl border-3 border-amber-300 shadow-md select-none touch-manipulation"
          style={{
            gridTemplateColumns: `repeat(${currentPuzzle.gridSize}, minmax(0, 1fr))`
          }}
        >
          {currentPuzzle.grid.map((row, r) =>
            row.map((letter, c) => {
              const key = `${r},${c}`;
              const isFound = key in foundCoordsMap;
              const isSelected = selectedCoords.some(([sr, sc]) => sr === r && sc === c);
              const colorClass = isFound
                ? WORD_COLORS[foundCoordsMap[key]]
                : isSelected
                ? 'bg-amber-500 text-white font-black scale-105 shadow-sm ring-2 ring-amber-400'
                : 'bg-white hover:bg-amber-50 text-slate-800 font-bold border border-amber-200 shadow-2xs';

              return (
                <button
                  key={key}
                  onClick={() => handleCellClick(r, c)}
                  className={`w-9 h-9 sm:w-11 sm:h-11 rounded-xl flex items-center justify-center font-fun text-sm sm:text-base transition-all duration-150 ${colorClass}`}
                >
                  {letter}
                </button>
              );
            })
          )}
        </div>
      </div>

      {/* Completed celebration banner */}
      {isCompleted && (
        <div className="bg-gradient-to-r from-emerald-500 to-teal-500 text-white p-5 rounded-3xl text-center space-y-3 shadow-md animate-fade-in border-2 border-emerald-300">
          <div className="text-4xl">🎉 🦁 ⭐</div>
          <h3 className="font-fun text-2xl font-black">
            Baie Geluk! Jy het al die woorde gekry!
          </h3>
          <p className="text-emerald-100 font-bold text-sm">
            Jy is 'n ware Afrikaans Woordsoek-Kampioen!
          </p>
          <div className="flex justify-center gap-3 pt-1">
            <button
              onClick={handleNextPuzzle}
              className="bg-white text-emerald-900 font-fun font-black px-5 py-2.5 rounded-2xl shadow-sm text-sm hover:bg-emerald-50 transition-transform active:scale-95"
            >
              Speel Volgende Kaart →
            </button>
          </div>
        </div>
      )}

      {/* Word Bank */}
      <div className="bg-white rounded-3xl p-4 sm:p-5 border-2 border-slate-200 space-y-3 shadow-2xs">
        <div className="flex items-center justify-between">
          <span className="font-fun font-black text-slate-800 text-sm flex items-center gap-1.5">
            <span>📋</span> Woordelys om te soek ({currentPuzzle.words.length}):
          </span>
          <span className="text-[11px] text-slate-500 font-bold">
            Tik 🔊 om die uitspraak te hoor
          </span>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
          {currentPuzzle.words.map((w) => {
            const isFound = foundWords.includes(w.word);
            return (
              <div
                key={w.word}
                className={`p-2.5 rounded-2xl border transition-all flex items-center justify-between ${
                  isFound
                    ? 'bg-emerald-50 border-emerald-300 text-emerald-900 line-through opacity-70'
                    : 'bg-slate-50 border-slate-200 text-slate-800 hover:border-amber-300'
                }`}
              >
                <div className="flex items-center gap-1.5 overflow-hidden">
                  <span className="text-lg">{w.emoji}</span>
                  <div className="leading-tight truncate">
                    <span className="font-fun font-black text-xs block truncate">
                      {w.word}
                    </span>
                    <span className="text-[10px] text-slate-500 block truncate">
                      {w.english}
                    </span>
                  </div>
                </div>

                <div className="flex items-center gap-1 shrink-0 ml-1">
                  {isFound ? (
                    <Check className="w-4 h-4 text-emerald-600" />
                  ) : (
                    <button
                      onClick={() => speakAfrikaans(w.word)}
                      className="p-1 rounded-lg hover:bg-amber-100 text-amber-700 transition-colors"
                      title="Luister na uitspraak"
                    >
                      <Volume2 className="w-3.5 h-3.5" />
                    </button>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

/* =========================================================================
   10. TEENOORGESTELDES & SINONIEME (OPPOSITES & SYNONYMS)
   ========================================================================= */
const OppositesSynonymsGame: React.FC<{ difficulty: GameDifficulty; onWin: () => void }> = ({
  difficulty,
  onWin
}) => {
  const rounds = OPPOSITES_SYNONYMS_DATA[difficulty];
  const [roundIdx, setRoundIdx] = useState(0);
  const current = rounds[roundIdx % rounds.length];

  const [selectedOpt, setSelectedOpt] = useState<string | null>(null);
  const [checked, setChecked] = useState(false);
  const [streak, setStreak] = useState(0);

  useEffect(() => {
    setSelectedOpt(null);
    setChecked(false);
  }, [roundIdx, difficulty]);

  const handleSelect = (opt: string) => {
    if (checked) return;
    setSelectedOpt(opt);
    setChecked(true);

    const isCorrect = opt === current.correct;
    if (isCorrect) {
      sounds.playCorrect();
      setStreak((prev) => prev + 1);
      onWin();
    } else {
      sounds.playIncorrect();
      setStreak(0);
    }
  };

  const handleNext = () => {
    sounds.playPop();
    setRoundIdx((prev) => (prev + 1) % rounds.length);
  };

  const isAntoniem = current.mode === 'antoniem';

  return (
    <div className="space-y-5 text-center max-w-lg mx-auto">
      {/* Top Bar */}
      <div className="flex items-center justify-between border-b border-violet-100 pb-2">
        <div className="text-left">
          <h2 className="font-fun text-xl font-black text-violet-950 flex items-center gap-1.5">
            <span>⚖️</span> Teenoorgesteldes & Sinonieme
          </h2>
          <span className="text-[11px] font-bold text-violet-700">
            {isAntoniem ? 'Antonieme (Teenoorgestelde woorde)' : 'Sinonieme (Dieselfde betekenis)'} • {DIFFICULTY_CONFIGS[difficulty].nameAf}
          </span>
        </div>

        <div className="flex items-center gap-2">
          {streak > 1 && (
            <span className="text-xs font-black text-amber-700 bg-amber-100 border border-amber-300 px-2.5 py-1 rounded-xl flex items-center gap-1 animate-pulse">
              <Flame className="w-3.5 h-3.5 text-amber-500 fill-amber-500" />
              {streak} Streak!
            </span>
          )}
          <span className="text-xs font-black text-violet-800 bg-violet-100 px-3 py-1 rounded-xl">
            {(roundIdx % rounds.length) + 1} / {rounds.length}
          </span>
        </div>
      </div>

      {/* Target Word Card */}
      <div
        className={`p-6 rounded-3xl border-2 space-y-3 shadow-xs ${
          isAntoniem
            ? 'bg-gradient-to-br from-amber-50 to-orange-50 border-amber-200'
            : 'bg-gradient-to-br from-violet-50 to-purple-50 border-violet-200'
        }`}
      >
        <div className="flex justify-center">
          <span
            className={`text-xs font-black px-3 py-1 rounded-full uppercase tracking-wider ${
              isAntoniem
                ? 'bg-amber-200 text-amber-900 border border-amber-300'
                : 'bg-violet-200 text-violet-900 border border-violet-300'
            }`}
          >
            {current.modeLabelAf}
          </span>
        </div>

        <div className="flex items-center justify-center gap-2">
          <span className="text-3xl">{current.emoji}</span>
          <h3 className="font-fun text-4xl font-black text-slate-900">
            "{current.word}"
          </h3>
          <button
            onClick={() => speakAfrikaans(current.word)}
            className="p-2 rounded-xl bg-white hover:bg-slate-100 text-slate-700 shadow-xs border border-slate-200 transition-transform active:scale-90"
            title="Luister na uitspraak"
          >
            <Volume2 className="w-5 h-5 text-violet-700" />
          </button>
        </div>

        <p className="text-xs text-slate-600 font-bold">
          English: {current.englishMeaning}
        </p>

        <div className="pt-1 text-slate-800 font-black text-sm">
          {current.targetLabelEn}
        </div>
      </div>

      {/* Options Grid */}
      <div className="grid grid-cols-2 gap-3">
        {current.options.map((opt) => {
          let style = 'bg-white border-violet-200 hover:border-violet-400 text-slate-800';
          if (checked) {
            if (opt === current.correct) {
              style = 'bg-emerald-100 border-emerald-500 text-emerald-950 font-black ring-2 ring-emerald-400';
            } else if (opt === selectedOpt) {
              style = 'bg-rose-100 border-rose-400 text-rose-950';
            } else {
              style = 'bg-slate-50 border-slate-200 text-slate-400 opacity-60';
            }
          }
          return (
            <button
              key={opt}
              onClick={() => handleSelect(opt)}
              disabled={checked}
              className={`p-4 rounded-2xl border-2 font-fun font-bold text-base transition-all ${style}`}
            >
              {opt}
            </button>
          );
        })}
      </div>

      {/* Explanation & Next */}
      {checked && (
        <div className="pt-2 space-y-3 animate-fade-in">
          <div className="bg-violet-50 border border-violet-200 rounded-2xl p-3.5 text-left flex items-start justify-between gap-2">
            <div>
              <span className="text-xs font-black text-violet-950 uppercase block">💡 Uitleg:</span>
              <p className="text-xs text-slate-700 font-semibold mt-1">
                {current.explanation}
              </p>
            </div>
            <button
              onClick={() => speakAfrikaans(current.correct)}
              className="p-1.5 rounded-lg bg-violet-100 hover:bg-violet-200 text-violet-800 transition-colors shrink-0"
              title="Luister na korrekte antwoord"
            >
              <Volume2 className="w-4 h-4" />
            </button>
          </div>

          <button
            onClick={handleNext}
            className="bg-violet-600 hover:bg-violet-700 text-white font-black px-6 py-2.5 rounded-2xl shadow-sm text-sm transition-transform active:scale-95"
          >
            Volgende Vraag →
          </button>
        </div>
      )}
    </div>
  );
};

/* =========================================================================
   11. VOORSETSEL-AVONTUUR (PREPOSITIONS & POSITIONS)
   ========================================================================= */
const PrepositionsGame: React.FC<{ difficulty: GameDifficulty; onWin: () => void }> = ({
  difficulty,
  onWin
}) => {
  const rounds = PREPOSITIONS_DATA[difficulty];
  const [roundIdx, setRoundIdx] = useState(0);
  const current = rounds[roundIdx % rounds.length];

  const [selectedOpt, setSelectedOpt] = useState<string | null>(null);
  const [checked, setChecked] = useState(false);

  useEffect(() => {
    setSelectedOpt(null);
    setChecked(false);
  }, [roundIdx, difficulty]);

  const handleSelect = (opt: string) => {
    if (checked) return;
    setSelectedOpt(opt);
    setChecked(true);

    const isCorrect = opt === current.correctWord;
    if (isCorrect) {
      sounds.playCorrect();
      onWin();
    } else {
      sounds.playIncorrect();
    }
  };

  const handleNext = () => {
    sounds.playPop();
    setRoundIdx((prev) => (prev + 1) % rounds.length);
  };

  const completedSentence = current.sentenceWithBlank.replace('___', current.correctWord);

  return (
    <div className="space-y-5 text-center max-w-lg mx-auto">
      {/* Top Bar */}
      <div className="flex items-center justify-between border-b border-pink-100 pb-2">
        <div className="text-left">
          <h2 className="font-fun text-xl font-black text-pink-950 flex items-center gap-1.5">
            <span>📍</span> Voorsetsel-Avontuur
          </h2>
          <span className="text-[11px] font-bold text-pink-700">
            Waar is die voorwerp? (Prepositions) • {DIFFICULTY_CONFIGS[difficulty].nameAf}
          </span>
        </div>

        <span className="text-xs font-black text-pink-800 bg-pink-100 px-3 py-1 rounded-xl">
          {(roundIdx % rounds.length) + 1} / {rounds.length}
        </span>
      </div>

      {/* Visual Scene Box */}
      <div className="bg-gradient-to-br from-pink-50 via-rose-50 to-amber-50 p-6 rounded-3xl border-2 border-pink-200 space-y-3 shadow-xs">
        <div className="text-5xl py-1 filter drop-shadow-xs">
          {current.visualScene}
        </div>

        <div className="text-xs font-bold text-pink-900 bg-pink-100/80 px-3 py-1.5 rounded-xl border border-pink-200 inline-block">
          👀 Leidraad: {current.itemPlacementText}
        </div>

        {/* Sentence with blank */}
        <div className="pt-2">
          <div className="flex items-center justify-center gap-2 flex-wrap">
            <h3 className="font-fun text-2xl font-black text-slate-900">
              {current.sentenceWithBlank.split('___')[0]}
              <span className="inline-block px-3 py-0.5 rounded-xl bg-pink-200 text-pink-950 border border-pink-400 mx-1 underline decoration-wavy">
                {checked ? selectedOpt || '___' : '___'}
              </span>
              {current.sentenceWithBlank.split('___')[1]}
            </h3>
            <button
              onClick={() => speakAfrikaans(completedSentence)}
              className="p-1.5 rounded-xl bg-white hover:bg-slate-100 text-pink-700 border border-pink-200 shadow-2xs"
              title="Luister na hele sin"
            >
              <Volume2 className="w-4 h-4" />
            </button>
          </div>

          <p className="text-xs text-slate-500 font-bold mt-1">
            English: {current.sentenceEn}
          </p>
        </div>
      </div>

      {/* Preposition Options */}
      <div className="grid grid-cols-2 gap-3">
        {current.options.map((opt) => {
          let style = 'bg-white border-pink-200 hover:border-pink-400 text-slate-800';
          if (checked) {
            if (opt === current.correctWord) {
              style = 'bg-emerald-100 border-emerald-500 text-emerald-950 font-black ring-2 ring-emerald-400';
            } else if (opt === selectedOpt) {
              style = 'bg-rose-100 border-rose-400 text-rose-950';
            } else {
              style = 'bg-slate-50 border-slate-200 text-slate-400 opacity-60';
            }
          }
          return (
            <button
              key={opt}
              onClick={() => handleSelect(opt)}
              disabled={checked}
              className={`p-4 rounded-2xl border-2 font-fun font-black text-lg transition-all ${style}`}
            >
              {opt}
            </button>
          );
        })}
      </div>

      {/* Explanation & Next */}
      {checked && (
        <div className="pt-2 space-y-3 animate-fade-in">
          <div className="bg-pink-50 border border-pink-200 rounded-2xl p-3.5 text-left">
            <span className="text-xs font-black text-pink-950 uppercase block">💡 Voorsetsel-Reël:</span>
            <p className="text-xs text-slate-700 font-semibold mt-1">
              {current.explanation}
            </p>
          </div>

          <button
            onClick={handleNext}
            className="bg-pink-600 hover:bg-pink-700 text-white font-black px-6 py-2.5 rounded-2xl shadow-sm text-sm transition-transform active:scale-95"
          >
            Volgende Vraag →
          </button>
        </div>
      )}
    </div>
  );
};
