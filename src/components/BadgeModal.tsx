import React, { useState } from 'react';
import { Award, Lock, CheckCircle, Star, Sparkles, Volume2, Flame, BookOpen, Trophy } from 'lucide-react';
import { useProgress } from '../context/ProgressContext';
import { BADGES_DATA, ANIMAL_AVATARS, OLLIE_BADGES_DATA } from '../data/badgesData';
import { OllieCharacter } from './OllieCharacter';
import { OllieBadgeGraphic } from './OllieBadgeGraphic';
import { speakAfrikaans, sounds } from '../utils/audio';

export const BadgeModal: React.FC = () => {
  const { progress, setSelectedAvatar } = useProgress();
  const [activeTab, setActiveTab] = useState<'ollie' | 'avatars' | 'general'>('ollie');

  const handleSelectAvatar = (avatarId: string, unlockStars: number) => {
    if (progress.stars < unlockStars) {
      sounds.playIncorrect();
      return;
    }
    sounds.playVictory();
    setSelectedAvatar(avatarId);
  };

  const handleBadgeClick = (msg: string) => {
    sounds.playPop();
    speakAfrikaans(msg);
  };

  const unlockedOllieCount = (progress.unlockedOllieBadgeIds || []).length;

  return (
    <div className="space-y-6 pb-12">
      {/* Header */}
      <div className="bg-gradient-to-r from-amber-400 via-orange-400 to-amber-500 rounded-3xl p-5 sm:p-6 text-white shadow-sm border-3 border-amber-300">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <div>
            <span className="bg-white/20 text-white text-xs font-black uppercase tracking-wider px-2.5 py-0.5 rounded-full border border-white/30">
              Belonings & Mylepale • Milestone System
            </span>
            <h1 className="font-fun text-2xl sm:text-3xl font-black mt-1">
              Ollie Kentekens & Trofeëkamer 🦉🏆
            </h1>
            <p className="text-amber-100 font-bold text-sm sm:text-base">
              Voltooi spesifieke modules of daaglikse reekse om digitale Ollie-kentekens te verdien!
            </p>
          </div>

          <div className="flex items-center gap-1.5 bg-white/20 backdrop-blur-xs px-3.5 py-2 rounded-2xl border border-white/30 text-white font-fun">
            <Star className="w-5 h-5 text-amber-300 fill-amber-300" />
            <span className="font-black text-sm">{progress.stars} Sterre beskikbaar</span>
          </div>
        </div>
      </div>

      <OllieCharacter
        afrikaansText="Hoo-hoo! Kyk na al my verskillende uitrustings! Elke keer as jy 'n mylpaal voltooi, kry jy 'n spesiale kenteken van my!"
        englishText="Complete milestone modules or keep your daily practice streak going to collect all the special digital Ollie badges!"
        mood="cheering"
      />

      {/* Tabs */}
      <div className="flex items-center gap-2 border-b border-amber-200 pb-2">
        <button
          onClick={() => { setActiveTab('ollie'); sounds.playPop(); }}
          className={`flex items-center gap-2 px-4 py-2.5 rounded-2xl font-fun font-black text-xs sm:text-sm transition-all ${
            activeTab === 'ollie'
              ? 'bg-amber-500 text-white shadow-md'
              : 'bg-white text-amber-950 hover:bg-amber-100 border border-amber-200'
          }`}
        >
          <span>🦉</span>
          <span>Digitale Ollie Kentekens ({unlockedOllieCount}/{OLLIE_BADGES_DATA.length})</span>
        </button>

        <button
          onClick={() => { setActiveTab('avatars'); sounds.playPop(); }}
          className={`flex items-center gap-2 px-4 py-2.5 rounded-2xl font-fun font-black text-xs sm:text-sm transition-all ${
            activeTab === 'avatars'
              ? 'bg-amber-500 text-white shadow-md'
              : 'bg-white text-amber-950 hover:bg-amber-100 border border-amber-200'
          }`}
        >
          <span>🐾</span>
          <span>Diere-Avatars</span>
        </button>

        <button
          onClick={() => { setActiveTab('general'); sounds.playPop(); }}
          className={`flex items-center gap-2 px-4 py-2.5 rounded-2xl font-fun font-black text-xs sm:text-sm transition-all ${
            activeTab === 'general'
              ? 'bg-amber-500 text-white shadow-md'
              : 'bg-white text-amber-950 hover:bg-amber-100 border border-amber-200'
          }`}
        >
          <Trophy className="w-4 h-4" />
          <span>Algemene Trofeë ({progress.unlockedBadges.length}/{BADGES_DATA.length})</span>
        </button>
      </div>

      {/* TAB 1: DIGITAL OLLIE MILESTONE BADGES */}
      {activeTab === 'ollie' && (
        <div className="space-y-4">
          <div className="bg-amber-100/70 p-3.5 rounded-2xl border border-amber-300 flex items-center justify-between text-xs sm:text-sm font-bold text-amber-950">
            <span className="flex items-center gap-2">
              <Sparkles className="w-4 h-4 text-amber-700" />
              <span>Tik op enige ontsluite kenteken om Ollie se boodskap in Afrikaans te hoor!</span>
            </span>
            <span className="text-amber-900 font-black">
              {unlockedOllieCount} van {OLLIE_BADGES_DATA.length} Versamel
            </span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {OLLIE_BADGES_DATA.map((badge) => {
              const isUnlocked = (progress.unlockedOllieBadgeIds || []).includes(badge.id);

              // Progress calculation for display
              let progressLabel = '';
              if (!isUnlocked) {
                if (badge.requiredLessonIds) {
                  const completed = badge.requiredLessonIds.filter((lid) => progress.completedLessonIds.includes(lid)).length;
                  progressLabel = `${completed} / ${badge.requiredLessonIds.length} Lesse voltooi`;
                } else if (badge.requiredStreakDays) {
                  progressLabel = `${progress.streakDays} / ${badge.requiredStreakDays} Dae reeks`;
                } else if (badge.milestoneType === 'curriculum') {
                  progressLabel = `${progress.completedLessonIds.length} / 15 Kurrikulum lesse`;
                }
              }

              return (
                <div
                  key={badge.id}
                  onClick={() => isUnlocked && handleBadgeClick(badge.unlockedMessageAf)}
                  className={`p-4 rounded-3xl border-2 transition-all flex items-start gap-4 select-none ${
                    isUnlocked
                      ? 'bg-gradient-to-br from-amber-50 to-orange-50 border-amber-400 hover:border-amber-500 shadow-sm hover:shadow-md cursor-pointer hover:scale-101'
                      : 'bg-slate-50 border-slate-200 opacity-65'
                  }`}
                  title={isUnlocked ? 'Klik om Ollie se stem te hoor!' : badge.descriptionEn}
                >
                  <OllieBadgeGraphic
                    costume={badge.costume}
                    size="md"
                    isUnlocked={isUnlocked}
                  />

                  <div className="min-w-0 flex-1 space-y-1">
                    <div className="flex items-center justify-between gap-1">
                      <span className="text-[10px] font-black uppercase text-amber-800 bg-amber-100/80 px-2 py-0.5 rounded-md">
                        {badge.roleTitle}
                      </span>
                      {isUnlocked ? (
                        <span className="text-xs font-black text-emerald-700 bg-emerald-100 px-2 py-0.5 rounded-full flex items-center gap-1">
                          <CheckCircle className="w-3 h-3" /> Ontsluit
                        </span>
                      ) : (
                        <span className="text-[11px] font-bold text-slate-500 flex items-center gap-1">
                          <Lock className="w-3 h-3" /> Gesluit
                        </span>
                      )}
                    </div>

                    <h4 className="font-fun font-bold text-base text-slate-900 leading-tight">
                      {badge.titleAf}
                    </h4>
                    <p className="text-[11px] font-semibold text-slate-500 line-clamp-1">
                      {badge.titleEn}
                    </p>

                    <p className="text-xs text-slate-600 font-medium pt-1">
                      {badge.descriptionAf}
                    </p>

                    {isUnlocked ? (
                      <div className="pt-2 flex items-center justify-between text-[11px] text-amber-900 font-bold border-t border-amber-200/60">
                        <span className="truncate italic">"{badge.unlockedMessageAf}"</span>
                        <Volume2 className="w-3.5 h-3.5 text-amber-700 shrink-0 ml-1" />
                      </div>
                    ) : (
                      <div className="pt-2 border-t border-slate-200 text-[11px] text-amber-800 font-bold">
                        Vordering: {progressLabel}
                      </div>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* TAB 2: ANIMAL AVATARS */}
      {activeTab === 'avatars' && (
        <div className="bg-white rounded-3xl p-5 sm:p-6 border-2 border-amber-200 shadow-sm space-y-4">
          <div className="flex items-center justify-between border-b border-amber-100 pb-2">
            <div>
              <h2 className="font-fun text-xl font-black text-slate-900">
                Kies Jou Diere-Karakter (Avatar)
              </h2>
              <p className="text-xs text-slate-500 font-semibold">
                Klik op 'n oopgesluit dier om hom jou aktiewe leergids te maak!
              </p>
            </div>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3">
            {ANIMAL_AVATARS.map((animal) => {
              const isUnlocked = progress.stars >= animal.unlockStars;
              const isSelected = progress.selectedAvatar === animal.id;

              return (
                <div
                  key={animal.id}
                  onClick={() => handleSelectAvatar(animal.id, animal.unlockStars)}
                  className={`p-3.5 rounded-2xl border-2 cursor-pointer transition-all flex flex-col justify-between text-center ${
                    isSelected
                      ? 'bg-amber-100/80 border-amber-500 shadow-md ring-2 ring-amber-400/50'
                      : isUnlocked
                      ? 'bg-slate-50 border-slate-200 hover:border-amber-300 hover:bg-amber-50/50'
                      : 'bg-slate-100 border-slate-200 opacity-60'
                  }`}
                >
                  <div>
                    <div className="w-16 h-16 mx-auto rounded-2xl bg-white border border-amber-200 flex items-center justify-center text-3xl shadow-2xs mb-2">
                      {animal.emoji}
                    </div>
                    <h4 className="font-fun font-bold text-xs sm:text-sm text-slate-900 line-clamp-1">
                      {animal.name}
                    </h4>
                    <p className="text-[10px] text-amber-800 font-bold">{animal.speciesAf}</p>
                  </div>

                  <div className="mt-3 pt-2 border-t border-slate-200/60">
                    {isSelected ? (
                      <span className="text-[11px] font-black text-amber-900 bg-amber-200/80 px-2 py-0.5 rounded-md inline-block">
                        Gekies ✓
                      </span>
                    ) : isUnlocked ? (
                      <span className="text-[11px] font-bold text-emerald-700 bg-emerald-100 px-2 py-0.5 rounded-md inline-block">
                        Kies dier
                      </span>
                    ) : (
                      <span className="text-[10px] font-bold text-slate-500 flex items-center justify-center gap-1">
                        <Lock className="w-3 h-3" /> {animal.unlockStars} ⭐
                      </span>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* TAB 3: GENERAL TROPHIES & BADGES */}
      {activeTab === 'general' && (
        <div className="bg-white rounded-3xl p-5 sm:p-6 border-2 border-amber-200 shadow-sm space-y-4">
          <div className="flex items-center justify-between border-b border-amber-100 pb-2">
            <div>
              <h2 className="font-fun text-xl font-black text-slate-900">
                Jou Avontuur Kentekens (Badges)
              </h2>
              <p className="text-xs text-slate-500 font-semibold">
                Verdien kentekens vir voltooiing van lesse, speletjies en reekse!
              </p>
            </div>
            <span className="text-xs font-black text-amber-800 bg-amber-100 px-3 py-1 rounded-xl">
              {progress.unlockedBadges.length} van {BADGES_DATA.length} ontsluit
            </span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3.5">
            {BADGES_DATA.map((badge) => {
              const isUnlocked = progress.unlockedBadges.includes(badge.id);

              return (
                <div
                  key={badge.id}
                  className={`p-4 rounded-2xl border-2 flex items-center gap-3.5 transition-all ${
                    isUnlocked
                      ? 'bg-gradient-to-r from-amber-50 to-orange-50 border-amber-300 shadow-2xs'
                      : 'bg-slate-50 border-slate-200 opacity-60'
                  }`}
                >
                  <div className={`w-14 h-14 rounded-2xl flex items-center justify-center text-3xl shrink-0 border ${
                    isUnlocked ? 'bg-amber-200 border-amber-400 shadow-inner' : 'bg-slate-200 border-slate-300'
                  }`}>
                    {isUnlocked ? badge.icon : '🔒'}
                  </div>

                  <div className="min-w-0">
                    <div className="flex items-center gap-1.5">
                      <h4 className="font-fun font-bold text-sm text-slate-900 truncate">
                        {badge.titleAf}
                      </h4>
                      {isUnlocked && <CheckCircle className="w-3.5 h-3.5 text-emerald-600 shrink-0" />}
                    </div>
                    <p className="text-xs text-slate-500 font-medium leading-tight mt-0.5">
                      {badge.description}
                    </p>
                    <span className="text-[10px] text-amber-800 font-bold uppercase mt-1 inline-block">
                      {badge.titleEn}
                    </span>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
};
