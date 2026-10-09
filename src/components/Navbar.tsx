import React, { useState } from 'react';
import { Star, Flame, Diamond, Volume2, VolumeX, Award, Users, Settings } from 'lucide-react';
import { useProgress } from '../context/ProgressContext';
import { ANIMAL_AVATARS } from '../data/badgesData';
import { VoiceSettingsModal } from './VoiceSettingsModal';

interface NavbarProps {
  currentTab: 'map' | 'lessons' | 'games' | 'stories' | 'daily' | 'parent' | 'trophies';
  setCurrentTab: (tab: 'map' | 'lessons' | 'games' | 'stories' | 'daily' | 'parent' | 'trophies') => void;
}

export const Navbar: React.FC<NavbarProps> = ({ currentTab, setCurrentTab }) => {
  const { progress, setLanguageTrack, toggleSound } = useProgress();
  const [showVoiceModal, setShowVoiceModal] = useState(false);

  const currentAvatar = ANIMAL_AVATARS.find((a) => a.id === progress.selectedAvatar) || ANIMAL_AVATARS[0];

  return (
    <header className="sticky top-0 z-40 bg-white/95 backdrop-blur-md border-b-2 border-amber-200 shadow-sm no-print">
      {/* Top Banner: Logo + Currency & Settings */}
      <div className="max-w-7xl mx-auto px-3 sm:px-6 py-2.5 flex items-center justify-between gap-2">
        {/* Brand Logo */}
        <div 
          onClick={() => setCurrentTab('map')}
          className="flex items-center gap-2 sm:gap-3 cursor-pointer group select-none"
        >
          <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-2xl bg-amber-400 border-2 border-amber-500 flex items-center justify-center text-2xl shadow-sm group-hover:scale-105 transition-transform">
            🦉
          </div>
          <div>
            <div className="flex items-center gap-1.5">
              <span className="font-fun text-lg sm:text-2xl font-black text-amber-950 tracking-tight">
                Afrikaans Avontuur
              </span>
              <span className="text-[10px] sm:text-xs font-black bg-emerald-500 text-white px-1.5 sm:px-2 py-0.5 rounded-full uppercase tracking-wider">
                Gr. 4
              </span>
            </div>
            <p className="text-[11px] text-amber-800 font-bold hidden sm:block">
              CAPS 2026 • Bilingual Fun with Ollie the Owl
            </p>
          </div>
        </div>

        {/* Currency & Tracker stats */}
        <div className="flex items-center gap-1.5 sm:gap-3">
          {/* Language Track Toggle FAL / HL */}
          <div className="bg-amber-100 p-0.5 rounded-xl border border-amber-300 flex items-center text-xs font-black">
            <button
              onClick={() => setLanguageTrack('FAL')}
              className={`px-2 py-1 rounded-lg transition-all ${
                progress.languageTrack === 'FAL'
                  ? 'bg-amber-500 text-white shadow-2xs font-bold'
                  : 'text-amber-900 hover:text-amber-950'
              }`}
              title="First Additional Language (Tweede Addisionele Taal - extra English support)"
            >
              FAL
            </button>
            <button
              onClick={() => setLanguageTrack('HL')}
              className={`px-2 py-1 rounded-lg transition-all ${
                progress.languageTrack === 'HL'
                  ? 'bg-amber-500 text-white shadow-2xs font-bold'
                  : 'text-amber-900 hover:text-amber-950'
              }`}
              title="Home Language (Huistaal - more immersion)"
            >
              HL
            </button>
          </div>

          {/* Stars */}
          <div 
            className="flex items-center gap-1 bg-amber-50 border border-amber-300 px-2 sm:px-2.5 py-1 rounded-xl shadow-2xs cursor-pointer hover:bg-amber-100 transition-colors"
            onClick={() => setCurrentTab('trophies')}
            title="Jou Goue Sterre!"
          >
            <Star className="w-4 h-4 sm:w-5 sm:h-5 text-amber-500 fill-amber-400 animate-pulse-subtle" />
            <span className="text-xs sm:text-sm font-black text-amber-950">{progress.stars}</span>
          </div>

          {/* Gems */}
          <div 
            className="hidden sm:flex items-center gap-1 bg-sky-50 border border-sky-300 px-2.5 py-1 rounded-xl shadow-2xs cursor-pointer hover:bg-sky-100 transition-colors"
            onClick={() => setCurrentTab('trophies')}
            title="Jou Edelstene!"
          >
            <Diamond className="w-4 h-4 text-sky-500 fill-sky-400" />
            <span className="text-xs sm:text-sm font-black text-sky-950">{progress.gems}</span>
          </div>

          {/* Streak */}
          <div 
            className="flex items-center gap-1 bg-orange-50 border border-orange-300 px-2 sm:px-2.5 py-1 rounded-xl shadow-2xs"
            title="Daaglikse Reeks (Daily Streak)"
          >
            <Flame className="w-4 h-4 sm:w-5 sm:h-5 text-orange-500 fill-orange-400" />
            <span className="text-xs sm:text-sm font-black text-orange-950">{progress.streakDays}</span>
          </div>

          {/* Global Sound & Speech Settings Toggle */}
          <button
            onClick={toggleSound}
            className={`flex items-center gap-1.5 px-2.5 sm:px-3 py-1 sm:py-1.5 rounded-xl border-2 transition-all font-fun text-xs font-black shadow-2xs active:scale-95 ${
              progress.soundEnabled
                ? 'bg-emerald-50 border-emerald-400 text-emerald-950 hover:bg-emerald-100 hover:border-emerald-500 ring-2 ring-emerald-300/40'
                : 'bg-rose-50 border-rose-300 text-rose-900 hover:bg-rose-100'
            }`}
            title={
              progress.soundEnabled
                ? 'Klank en spraak is AAN (Klik om klank & spraak af te skakel)'
                : 'Klank en spraak is AF (Klik om klank & spraak aan te skakel)'
            }
          >
            {progress.soundEnabled ? (
              <>
                <Volume2 className="w-4 h-4 text-emerald-600 animate-pulse" />
                <span className="hidden sm:inline">Klank: Aan</span>
                <span className="sm:hidden">Aan</span>
              </>
            ) : (
              <>
                <VolumeX className="w-4 h-4 text-rose-600" />
                <span className="hidden sm:inline">Klank: Af</span>
                <span className="sm:hidden">Af</span>
              </>
            )}
          </button>

          {/* South African Voice Settings Button */}
          <button
            onClick={() => setShowVoiceModal(true)}
            className="flex items-center gap-1.5 px-2.5 sm:px-3 py-1 sm:py-1.5 rounded-xl border-2 border-emerald-400 bg-white hover:bg-emerald-50 text-emerald-950 font-fun text-xs font-black shadow-2xs transition-all active:scale-95"
            title="Suid-Afrikaanse stem-instellings (Geen Nederlandse aksent)"
          >
            <span>🇿🇦</span>
            <span className="hidden md:inline">Stem</span>
          </button>

          {/* Avatar button */}
          <button
            onClick={() => setCurrentTab('trophies')}
            className="w-8 h-8 sm:w-9 sm:h-9 rounded-xl bg-amber-200 border-2 border-amber-400 flex items-center justify-center text-lg shadow-2xs hover:scale-105 transition-transform"
            title="Kies jou dierekarakter"
          >
            {currentAvatar.emoji}
          </button>
        </div>
      </div>

      {/* Main Navigation Tabs */}
      <nav className="max-w-7xl mx-auto px-2 sm:px-6 flex items-center overflow-x-auto no-scrollbar border-t border-amber-100 bg-amber-50/50 py-1 gap-1 sm:gap-2">
        <button
          onClick={() => setCurrentTab('map')}
          className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl font-black text-xs sm:text-sm whitespace-nowrap transition-all ${
            currentTab === 'map'
              ? 'bg-amber-500 text-white shadow-sm'
              : 'text-amber-950 hover:bg-amber-200/70'
          }`}
        >
          <span>🗺️</span>
          <span>Avontuur-Kaart</span>
        </button>

        <button
          onClick={() => setCurrentTab('lessons')}
          className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl font-black text-xs sm:text-sm whitespace-nowrap transition-all ${
            currentTab === 'lessons'
              ? 'bg-amber-500 text-white shadow-sm'
              : 'text-amber-950 hover:bg-amber-200/70'
          }`}
        >
          <span>📚</span>
          <span>Lesse (15 Onderwerpe)</span>
        </button>

        <button
          onClick={() => setCurrentTab('games')}
          className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl font-black text-xs sm:text-sm whitespace-nowrap transition-all ${
            currentTab === 'games'
              ? 'bg-amber-500 text-white shadow-sm'
              : 'text-amber-950 hover:bg-amber-200/70'
          }`}
        >
          <span>🎮</span>
          <span>Speletjies & STOMPI</span>
        </button>

        <button
          onClick={() => setCurrentTab('stories')}
          className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl font-black text-xs sm:text-sm whitespace-nowrap transition-all ${
            currentTab === 'stories'
              ? 'bg-amber-500 text-white shadow-sm'
              : 'text-amber-950 hover:bg-amber-200/70'
          }`}
        >
          <span>📖</span>
          <span>Leesbegrip</span>
        </button>

        <button
          onClick={() => setCurrentTab('daily')}
          className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl font-black text-xs sm:text-sm whitespace-nowrap transition-all ${
            currentTab === 'daily'
              ? 'bg-amber-500 text-white shadow-sm'
              : 'text-amber-950 hover:bg-amber-200/70'
          }`}
        >
          <span>🎯</span>
          <span>Daaglikse Uitdaging</span>
        </button>

        <button
          onClick={() => setCurrentTab('trophies')}
          className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl font-black text-xs sm:text-sm whitespace-nowrap transition-all ${
            currentTab === 'trophies'
              ? 'bg-amber-500 text-white shadow-sm'
              : 'text-amber-950 hover:bg-amber-200/70'
          }`}
        >
          <Award className="w-4 h-4 text-amber-600" />
          <span>Trofeë & Diere</span>
        </button>

        <button
          onClick={() => setCurrentTab('parent')}
          className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl font-black text-xs sm:text-sm whitespace-nowrap transition-all ml-auto ${
            currentTab === 'parent'
              ? 'bg-indigo-600 text-white shadow-sm'
              : 'text-indigo-900 bg-indigo-100/70 hover:bg-indigo-200/70'
          }`}
        >
          <Users className="w-4 h-4" />
          <span>Ouer & Juffrou Portaal</span>
        </button>
      </nav>

      {/* Voice Settings Modal */}
      {showVoiceModal && (
        <VoiceSettingsModal onClose={() => setShowVoiceModal(false)} />
      )}
    </header>
  );
};
