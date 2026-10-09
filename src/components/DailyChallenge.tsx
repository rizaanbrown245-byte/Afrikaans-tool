import React, { useState } from 'react';
import { Target, Star, Flame, Diamond, Volume2, CheckCircle, Sparkles } from 'lucide-react';
import { useProgress } from '../context/ProgressContext';
import { OllieCharacter } from './OllieCharacter';
import { speakAfrikaans, sounds } from '../utils/audio';

export const DailyChallenge: React.FC = () => {
  const { progress, completeDailyChallenge } = useProgress();
  const today = new Date().toISOString().split('T')[0];
  const isDoneToday = progress.dailyChallengeDoneDate === today;

  const [step, setStep] = useState(1);
  const [selectedWord, setSelectedWord] = useState('');
  const [checked, setChecked] = useState(false);

  // Today's challenge content
  const challengeWord = 'Blink';
  const challengeSentenceAf = 'Die goue ster skyn blink in die donker lug.';
  const challengeSentenceEn = 'The golden star shines bright in the dark sky.';

  const handleAnswer = (choice: string) => {
    sounds.playPop();
    setSelectedWord(choice);
    setChecked(true);
    if (choice === 'bright / shiny') {
      sounds.playCorrect();
    } else {
      sounds.playIncorrect();
    }
  };

  const handleFinish = () => {
    completeDailyChallenge();
  };

  return (
    <div className="space-y-6 pb-12 max-w-2xl mx-auto">
      {/* Header */}
      <div className="bg-gradient-to-r from-orange-500 via-amber-500 to-yellow-500 rounded-3xl p-5 sm:p-6 text-white shadow-sm border-3 border-amber-300">
        <div className="flex items-center justify-between gap-3">
          <div>
            <span className="bg-white/20 text-white text-xs font-black uppercase tracking-wider px-2.5 py-0.5 rounded-full border border-white/30">
              Daaglikse Missie • Daily Quest
            </span>
            <h1 className="font-fun text-2xl sm:text-3xl font-black mt-1">
              Vandag se Afrikaans Avontuur 🎯
            </h1>
            <p className="text-amber-100 font-bold text-sm">
              Voltooi vandag se missie vir +10 bonus sterre en hou jou reeks aan die gang!
            </p>
          </div>

          <div className="flex items-center gap-1.5 bg-white/25 px-3 py-1.5 rounded-2xl border border-white/40">
            <Flame className="w-5 h-5 text-yellow-300 fill-yellow-300 animate-pulse-subtle" />
            <span className="font-fun font-black text-sm">{progress.streakDays} Dae</span>
          </div>
        </div>
      </div>

      <OllieCharacter
        afrikaansText="Elke dag 'n bietjie Afrikaans maak jou teen die einde van die jaar 'n superkampioen!"
        englishText="Just 5 minutes a day builds confidence faster than anything else! Try today's mini quest!"
        mood="cheering"
      />

      <div className="bg-white rounded-3xl p-6 border-2 border-amber-200 shadow-sm space-y-6">
        {isDoneToday ? (
          <div className="text-center py-8 space-y-4">
            <div className="w-20 h-20 mx-auto rounded-3xl bg-emerald-100 border-3 border-emerald-400 flex items-center justify-center text-4xl shadow-sm animate-gentle-bounce">
              🎉
            </div>
            <h2 className="font-fun text-2xl font-black text-slate-900">
              Jy het vandag se uitdaging voltooi!
            </h2>
            <p className="text-sm font-bold text-slate-600 max-w-sm mx-auto">
              Jou daaglikse reeks is veilig. Kom môre weer terug vir 'n splinternuwe uitdaging en meer sterre!
            </p>
            <div className="flex items-center justify-center gap-4 text-sm font-black text-amber-900 bg-amber-50 p-3 rounded-2xl max-w-xs mx-auto border border-amber-200">
              <span className="flex items-center gap-1">⭐ +10 Sterre</span>
              <span className="flex items-center gap-1">💎 +5 Edelstene</span>
            </div>
          </div>
        ) : (
          <div className="space-y-6">
            {/* Step 1: Woord van die dag */}
            <div className="bg-amber-50 p-5 rounded-3xl border border-amber-300 space-y-3">
              <span className="text-xs font-black uppercase text-amber-800 tracking-wider">
                Deel 1: Woord van die Dag
              </span>
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="font-fun text-3xl font-black text-amber-950">
                    "{challengeWord}"
                  </h3>
                  <p className="text-xs font-bold text-amber-800">
                    Uitspraak: [Blink]
                  </p>
                </div>
                <button
                  onClick={() => speakAfrikaans(challengeWord)}
                  className="p-3 rounded-2xl bg-white border border-amber-300 text-amber-900 hover:bg-amber-100 shadow-2xs"
                  title="Luister na die woord"
                >
                  <Volume2 className="w-5 h-5" />
                </button>
              </div>

              <div className="p-3 bg-white rounded-xl border border-amber-200 text-sm flex items-center justify-between gap-2">
                <div>
                  <p className="font-fun font-bold text-slate-900">"{challengeSentenceAf}"</p>
                  <p className="text-xs text-slate-500 mt-0.5">"{challengeSentenceEn}"</p>
                </div>
                <button
                  onClick={() => speakAfrikaans(challengeSentenceAf)}
                  className="p-2 rounded-xl bg-amber-50 hover:bg-amber-100 text-amber-900 border border-amber-200 shrink-0"
                  title="Luister na voorbeeldsin"
                >
                  <Volume2 className="w-4 h-4" />
                </button>
              </div>
            </div>

            {/* Step 2: Mini question */}
            <div className="space-y-3">
              <h4 className="font-fun text-lg font-bold text-slate-900">
                Deel 2: Wat beteken "blink" in Engels?
              </h4>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                {['cold / frosty', 'bright / shiny', 'slow / heavy', 'noisy / loud'].map((opt) => {
                  let style = 'bg-white border-slate-200 hover:border-amber-400 text-slate-800';
                  if (checked) {
                    if (opt === 'bright / shiny') {
                      style = 'bg-emerald-100 border-emerald-500 text-emerald-950 font-black';
                    } else if (opt === selectedWord) {
                      style = 'bg-rose-100 border-rose-400 text-rose-950';
                    }
                  } else if (selectedWord === opt) {
                    style = 'bg-amber-100 border-amber-500 text-amber-950 font-bold';
                  }

                  return (
                    <button
                      key={opt}
                      onClick={() => handleAnswer(opt)}
                      disabled={checked}
                      className={`p-3.5 rounded-2xl border-2 font-fun text-sm text-left transition-all ${style}`}
                    >
                      {opt}
                    </button>
                  );
                })}
              </div>

              {checked && (
                <div className="pt-2">
                  <p className="text-xs font-bold text-slate-600 mb-3">
                    {selectedWord === 'bright / shiny'
                      ? 'Goed gedoen! "Blink" beteken helder of blinkend (shiny/bright).'
                      : 'Nie heeltemal nie. "Blink" beteken shiny or bright!'}
                  </p>

                  <button
                    onClick={handleFinish}
                    className="w-full bg-emerald-500 hover:bg-emerald-600 text-white font-fun font-black py-3 rounded-2xl shadow-md text-base flex items-center justify-center gap-2"
                  >
                    <Sparkles className="w-5 h-5 text-amber-200" />
                    <span>Eis +10 Sterre en Voltooi Uitdaging! ⭐</span>
                  </button>
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
