import React, { useState, useEffect } from 'react';
import { Star, Trophy, Sparkles, RotateCcw, Volume2, Timer, CheckCircle, AlertCircle, ArrowRight, Settings, ShieldCheck } from 'lucide-react';
import { useProgress } from '../context/ProgressContext';
import { OllieCharacter } from './OllieCharacter';
import { speakAfrikaans, sounds, getCurrentVoiceInfo, testSouthAfricanVoice, stopSpeaking } from '../utils/audio';
import { VoiceSettingsModal } from './VoiceSettingsModal';

type GameMode = 'stompi' | 'picture' | 'memory' | 'clock' | 'spelling';

export const GamesHub: React.FC = () => {
  const { addStars, addGems, recordGamePlayed, triggerConfetti } = useProgress();
  const [selectedGame, setSelectedGame] = useState<GameMode>('stompi');
  const [showVoiceModal, setShowVoiceModal] = useState(false);
  const [voiceInfo, setVoiceInfo] = useState(getCurrentVoiceInfo());

  useEffect(() => {
    setVoiceInfo(getCurrentVoiceInfo());
    return () => {
      stopSpeaking();
    };
  }, [showVoiceModal]);

  return (
    <div className="space-y-6 pb-12">
      {/* Games Header */}
      <div className="bg-gradient-to-r from-emerald-500 via-teal-500 to-cyan-500 rounded-3xl p-5 sm:p-6 text-white shadow-sm border-3 border-emerald-300">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <div>
            <span className="bg-white/20 text-white text-xs font-black uppercase tracking-wider px-2.5 py-0.5 rounded-full border border-white/30">
              Pret Speletjies & Uitdagings
            </span>
            <h1 className="font-fun text-2xl sm:text-3xl font-black mt-1">
              Afrikaans Speletjies-Sentrum 🎮
            </h1>
            <p className="text-emerald-100 font-bold text-sm sm:text-base">
              Kies 'n speletjie, beantwoord vrae, verdien bonus-sterre en daag jouself uit!
            </p>
          </div>
          <div className="flex items-center gap-2 bg-white/20 backdrop-blur-xs px-3.5 py-2 rounded-2xl border border-white/30 text-white font-fun">
            <Trophy className="w-5 h-5 text-amber-300" />
            <span className="font-black text-sm">Wen Sterre & Trofeë!</span>
          </div>
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

      {/* Game Mode Selector Buttons */}
      <div className="grid grid-cols-2 sm:grid-cols-5 gap-2 sm:gap-3">
        <button
          onClick={() => { setSelectedGame('stompi'); sounds.playPop(); }}
          className={`p-3 rounded-2xl border-2 font-fun font-black text-xs sm:text-sm flex flex-col items-center gap-1.5 transition-all ${
            selectedGame === 'stompi'
              ? 'bg-cyan-500 border-cyan-600 text-white shadow-md scale-102'
              : 'bg-white border-cyan-200 text-cyan-950 hover:bg-cyan-50'
          }`}
        >
          <span className="text-2xl">🚂</span>
          <span>STOMPI Sinsbou</span>
        </button>

        <button
          onClick={() => { setSelectedGame('picture'); sounds.playPop(); }}
          className={`p-3 rounded-2xl border-2 font-fun font-black text-xs sm:text-sm flex flex-col items-center gap-1.5 transition-all ${
            selectedGame === 'picture'
              ? 'bg-amber-500 border-amber-600 text-white shadow-md scale-102'
              : 'bg-white border-amber-200 text-amber-950 hover:bg-amber-50'
          }`}
        >
          <span className="text-2xl">🖼️</span>
          <span>Prentjie-Pas</span>
        </button>

        <button
          onClick={() => { setSelectedGame('memory'); sounds.playPop(); }}
          className={`p-3 rounded-2xl border-2 font-fun font-black text-xs sm:text-sm flex flex-col items-center gap-1.5 transition-all ${
            selectedGame === 'memory'
              ? 'bg-purple-500 border-purple-600 text-white shadow-md scale-102'
              : 'bg-white border-purple-200 text-purple-950 hover:bg-purple-50'
          }`}
        >
          <span className="text-2xl">🃏</span>
          <span>Geheue-Pare</span>
        </button>

        <button
          onClick={() => { setSelectedGame('spelling'); sounds.playPop(); }}
          className={`p-3 rounded-2xl border-2 font-fun font-black text-xs sm:text-sm flex flex-col items-center gap-1.5 transition-all ${
            selectedGame === 'spelling'
              ? 'bg-emerald-500 border-emerald-600 text-white shadow-md scale-102'
              : 'bg-white border-emerald-200 text-emerald-950 hover:bg-emerald-50'
          }`}
        >
          <span className="text-2xl">🐝</span>
          <span>Spelby (Spelling)</span>
        </button>

        <button
          onClick={() => { setSelectedGame('clock'); sounds.playPop(); }}
          className={`p-3 rounded-2xl border-2 font-fun font-black text-xs sm:text-sm flex flex-col items-center gap-1.5 transition-all col-span-2 sm:col-span-1 ${
            selectedGame === 'clock'
              ? 'bg-rose-500 border-rose-600 text-white shadow-md scale-102'
              : 'bg-white border-rose-200 text-rose-950 hover:bg-rose-50'
          }`}
        >
          <span className="text-2xl">⚡</span>
          <span>60-Sekonde Spoed</span>
        </button>
      </div>

      {/* Render Active Mini Game */}
      <div className="bg-white rounded-3xl p-5 sm:p-7 border-2 border-slate-200 shadow-sm min-h-[420px]">
        {selectedGame === 'stompi' && <StompiGame onWin={() => { addStars(4); recordGamePlayed(); }} />}
        {selectedGame === 'picture' && <PictureMatchGame onWin={() => { addStars(3); recordGamePlayed(); }} />}
        {selectedGame === 'memory' && <MemoryPairsGame onWin={() => { addStars(5); addGems(1); recordGamePlayed(); }} />}
        {selectedGame === 'spelling' && <SpellingBeeGame onWin={() => { addStars(4); recordGamePlayed(); }} />}
        {selectedGame === 'clock' && <BeatTheClockGame onWin={() => { addStars(6); addGems(2); recordGamePlayed(); }} />}
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
const STOMPI_ROUNDS = [
  {
    targetEn: 'The boy plays soccer today at school.',
    correctSentence: 'Die seun speel vandag sokker by die skool.',
    scrambled: ['sokker', 'speel', 'Die seun', 'by die skool', 'vandag'],
    explanationEn: 'S (Die seun) + V1 (speel - Verb 1 in 2nd place!) + T (vandag) + O (sokker) + P (by die skool).'
  },
  {
    targetEn: 'The children eat apples now at home.',
    correctSentence: 'Die kinders eet nou appels by die huis.',
    scrambled: ['by die huis', 'eet', 'appels', 'Die kinders', 'nou'],
    explanationEn: 'S (Die kinders) + V1 (eet) + T (nou) + O (appels) + P (by die huis).'
  },
  {
    targetEn: 'The dog runs fast in the garden every morning.',
    correctSentence: 'Die hond hardloop elke oggend vinnig in die tuin.',
    scrambled: ['elke oggend', 'in die tuin', 'hardloop', 'Die hond', 'vinnig'],
    explanationEn: 'S (Die hond) + V1 (hardloop) + T (elke oggend) + M (vinnig) + P (in die tuin).'
  }
];

const StompiGame: React.FC<{ onWin: () => void }> = ({ onWin }) => {
  const [roundIdx, setRoundIdx] = useState(0);
  const current = STOMPI_ROUNDS[roundIdx];
  const [selectedWords, setSelectedWords] = useState<string[]>([]);
  const [availableWords, setAvailableWords] = useState<string[]>(current.scrambled);
  const [checked, setChecked] = useState(false);
  const [isCorrect, setIsCorrect] = useState(false);

  useEffect(() => {
    setSelectedWords([]);
    setAvailableWords(current.scrambled);
    setChecked(false);
    setIsCorrect(false);
  }, [roundIdx]);

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
    setRoundIdx((prev) => (prev + 1) % STOMPI_ROUNDS.length);
  };

  return (
    <div className="space-y-5">
      <div className="flex items-center justify-between border-b border-cyan-100 pb-3">
        <div className="flex items-center gap-2">
          <span className="text-2xl">🚂</span>
          <h2 className="font-fun text-xl font-black text-cyan-950">
            STOMPI Trein: Bou die Sinne!
          </h2>
        </div>
        <span className="text-xs font-black text-cyan-800 bg-cyan-100 px-3 py-1 rounded-xl">
          Ronde {roundIdx + 1} van {STOMPI_ROUNDS.length}
        </span>
      </div>

      <OllieCharacter
        afrikaansText="Onthou die STOMPI-reël: Werkwoord 1 kom ALTYD tweede!"
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
            setAvailableWords(current.scrambled);
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
const PICTURE_ITEMS = [
  { emoji: '🦁', correctAf: 'leeu', english: 'lion', options: ['leeu', 'hond', 'olifant', 'sebra'] },
  { emoji: '🍎', correctAf: 'appel', english: 'apple', options: ['piesang', 'appel', 'lemoen', 'brood'] },
  { emoji: '✏️', correctAf: 'potlood', english: 'pencil', options: ['skêr', 'liniaal', 'potlood', 'uitveër'] },
  { emoji: '🦒', correctAf: 'kameelperd', english: 'giraffe', options: ['kameelperd', 'koei', 'perd', 'skaap'] },
  { emoji: '🥛', correctAf: 'melk', english: 'milk', options: ['water', 'tee', 'melk', 'sap'] },
  { emoji: '🏠', correctAf: 'huis', english: 'house', options: ['skool', 'huis', 'tuin', 'boom'] }
];

const PictureMatchGame: React.FC<{ onWin: () => void }> = ({ onWin }) => {
  const [currentIdx, setCurrentIdx] = useState(0);
  const current = PICTURE_ITEMS[currentIdx];
  const [selected, setSelected] = useState<string | null>(null);
  const [checked, setChecked] = useState(false);

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
    setCurrentIdx((prev) => (prev + 1) % PICTURE_ITEMS.length);
  };

  return (
    <div className="space-y-5 text-center max-w-lg mx-auto">
      <div className="flex items-center justify-between border-b border-amber-100 pb-2">
        <h2 className="font-fun text-xl font-black text-amber-950">
          Kies die Regte Afrikaanse Woord! 🖼️
        </h2>
        <span className="text-xs font-black text-amber-800 bg-amber-100 px-3 py-1 rounded-xl">
          {currentIdx + 1} / {PICTURE_ITEMS.length}
        </span>
      </div>

      <div className="w-32 h-32 mx-auto rounded-3xl bg-amber-100 border-4 border-amber-300 flex items-center justify-center text-7xl shadow-inner animate-gentle-bounce">
        {current.emoji}
      </div>

      <p className="text-sm font-bold text-slate-600">
        English: <span className="text-slate-900 font-black">{current.english}</span>
      </p>

      <div className="grid grid-cols-2 gap-3">
        {current.options.map((opt) => {
          let style = 'bg-white border-amber-200 hover:border-amber-400 text-amber-950';
          if (checked) {
            if (opt === current.correctAf) {
              style = 'bg-emerald-100 border-emerald-500 text-emerald-950 font-black';
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
const MEMORY_CARDS = [
  { id: '1', text: 'hond', matchKey: 'dog', isAf: true },
  { id: '2', text: 'dog', matchKey: 'dog', isAf: false },
  { id: '3', text: 'kat', matchKey: 'cat', isAf: true },
  { id: '4', text: 'cat', matchKey: 'cat', isAf: false },
  { id: '5', text: 'brood', matchKey: 'bread', isAf: true },
  { id: '6', text: 'bread', matchKey: 'bread', isAf: false },
  { id: '7', text: 'groot', matchKey: 'big', isAf: true },
  { id: '8', text: 'big', matchKey: 'big', isAf: false }
];

const MemoryPairsGame: React.FC<{ onWin: () => void }> = ({ onWin }) => {
  const [cards, setCards] = useState(() => [...MEMORY_CARDS].sort(() => Math.random() - 0.5));
  const [flipped, setFlipped] = useState<string[]>([]);
  const [matched, setMatched] = useState<string[]>([]);

  const handleCardClick = (id: string, matchKey: string) => {
    if (flipped.length === 2 || matched.includes(matchKey) || flipped.includes(id)) return;
    sounds.playPop();

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
          if (next.length === MEMORY_CARDS.length / 2) {
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
    setCards([...MEMORY_CARDS].sort(() => Math.random() - 0.5));
    setFlipped([]);
    setMatched([]);
  };

  const isAllMatched = matched.length === MEMORY_CARDS.length / 2;

  return (
    <div className="space-y-5 text-center max-w-md mx-auto">
      <div className="flex items-center justify-between border-b border-purple-100 pb-2">
        <h2 className="font-fun text-xl font-black text-purple-950">
          Geheue-Kaarte: Pas die Pare! 🃏
        </h2>
        <button onClick={restart} className="text-xs font-bold text-purple-800 hover:underline">
          Herstel
        </button>
      </div>

      <p className="text-xs sm:text-sm font-semibold text-slate-600">
        Vind die Afrikaanse woord en sy ooreenstemmende Engelse vertaling!
      </p>

      <div className="grid grid-cols-4 gap-2.5">
        {cards.map((card) => {
          const isCardFlipped = flipped.includes(card.id) || matched.includes(card.matchKey);
          const isCardMatched = matched.includes(card.matchKey);

          return (
            <button
              key={card.id}
              onClick={() => handleCardClick(card.id, card.matchKey)}
              disabled={isCardMatched}
              className={`h-20 rounded-2xl border-2 font-fun font-black text-sm flex items-center justify-center p-2 transition-all ${
                isCardMatched
                  ? 'bg-emerald-100 border-emerald-400 text-emerald-900 opacity-90'
                  : isCardFlipped
                  ? 'bg-purple-100 border-purple-400 text-purple-950 shadow-inner'
                  : 'bg-purple-500 border-purple-600 text-white hover:bg-purple-600'
              }`}
            >
              {isCardFlipped ? (
                <span>{card.text}</span>
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
const SPELLING_WORDS = [
  { word: 'skoenlapper', english: 'butterfly', hint: 'Kyk na die klinker: oe!' },
  { word: 'skooltas', english: 'schoolbag', hint: 'Begin met skool-...' },
  { word: 'vriendelik', english: 'friendly', hint: 'Eindig op -lik.' },
  { word: 'kameelperd', english: 'giraffe', hint: 'Kameel + perd' }
];

const SpellingBeeGame: React.FC<{ onWin: () => void }> = ({ onWin }) => {
  const [idx, setIdx] = useState(0);
  const current = SPELLING_WORDS[idx];
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
  }, [idx]);

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
    setIdx((prev) => (prev + 1) % SPELLING_WORDS.length);
  };

  const spelledText = chosen.map((i) => letters[i]).join('');

  return (
    <div className="space-y-5 text-center max-w-md mx-auto">
      <div className="flex items-center justify-between border-b border-emerald-100 pb-2">
        <h2 className="font-fun text-xl font-black text-emerald-950">
          Afrikaans Spelby (Spelling Bee) 🐝
        </h2>
        <span className="text-xs font-black text-emerald-800 bg-emerald-100 px-3 py-1 rounded-xl">
          {idx + 1} / {SPELLING_WORDS.length}
        </span>
      </div>

      <div className="bg-emerald-50 p-4 rounded-2xl border border-emerald-200">
        <span className="text-xs font-black text-emerald-900 uppercase">Engelse betekenis:</span>
        <h3 className="font-fun text-2xl font-black text-slate-900 mt-1">
          "{current.english}"
        </h3>
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
                  : 'bg-white hover:bg-emerald-50 text-emerald-950 border-emerald-300 shadow-2xs hover:scale-105'
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
const CLOCK_QUESTIONS = [
  { af: 'Goeiemôre', en: 'Good morning' },
  { af: 'Asseblief', en: 'Please' },
  { af: 'Dankie', en: 'Thank you' },
  { af: 'Hond', en: 'Dog' },
  { af: 'Kat', en: 'Cat' },
  { af: 'Brood', en: 'Bread' },
  { af: 'Water', en: 'Water' },
  { af: 'Groot', en: 'Big' },
  { af: 'Vinnig', en: 'Fast' },
  { af: 'Totsiens', en: 'Goodbye' }
];

const BeatTheClockGame: React.FC<{ onWin: () => void }> = ({ onWin }) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [timeLeft, setTimeLeft] = useState(30);
  const [score, setScore] = useState(0);
  const [qIdx, setQIdx] = useState(0);
  const [gameOver, setGameOver] = useState(false);

  const current = CLOCK_QUESTIONS[qIdx % CLOCK_QUESTIONS.length];

  // Generate 3 choices (1 correct, 2 fake)
  const choices = React.useMemo(() => {
    const wrong = CLOCK_QUESTIONS.filter((q) => q.en !== current.en)
      .sort(() => Math.random() - 0.5)
      .slice(0, 2)
      .map((q) => q.en);
    return [current.en, ...wrong].sort(() => Math.random() - 0.5);
  }, [qIdx]);

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
    setTimeLeft(30);
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
        <h2 className="font-fun text-xl font-black text-rose-950">
          60-Sekonde Spoedtoets! ⚡
        </h2>
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
            Kits-Afrikaans Uitdaging!
          </h3>
          <p className="text-xs sm:text-sm font-semibold text-slate-600 max-w-sm mx-auto">
            Hoeveel Afrikaanse woorde kan jy binne 30 sekondes korrek vertaal?
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
