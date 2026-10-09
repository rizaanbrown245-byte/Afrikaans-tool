import React, { useEffect } from 'react';
import { Sparkles, Trophy, X, Volume2 } from 'lucide-react';
import { OllieMilestoneBadge } from '../types';
import { OllieBadgeGraphic } from './OllieBadgeGraphic';
import { speakAfrikaans, sounds } from '../utils/audio';

interface OllieMilestoneModalProps {
  badge: OllieMilestoneBadge;
  onClose: () => void;
}

export const OllieMilestoneModal: React.FC<OllieMilestoneModalProps> = ({ badge, onClose }) => {
  useEffect(() => {
    sounds.playVictory();
    // Speak congratulatory message in South African voice
    const timer = setTimeout(() => {
      speakAfrikaans(badge.unlockedMessageAf);
    }, 600);
    return () => clearTimeout(timer);
  }, [badge]);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-xs animate-in fade-in duration-300">
      <div className="bg-white w-full max-w-md rounded-3xl border-4 border-amber-300 shadow-2xl overflow-hidden p-6 text-center space-y-5 relative animate-in zoom-in-95 duration-300">
        <button
          onClick={onClose}
          className="absolute right-4 top-4 p-2 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-500 transition-colors"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Celebration Tag */}
        <div className="inline-flex items-center gap-1.5 bg-gradient-to-r from-amber-500 to-orange-500 text-white text-xs font-black uppercase tracking-wider px-3.5 py-1 rounded-full shadow-sm">
          <Sparkles className="w-4 h-4 text-yellow-200" />
          <span>Nuwe Ollie Kenteken Ontsluit!</span>
        </div>

        {/* Big Ollie Badge Graphic */}
        <div className="flex justify-center py-2">
          <div className="animate-gentle-bounce">
            <OllieBadgeGraphic costume={badge.costume} size="lg" isUnlocked={true} />
          </div>
        </div>

        <div>
          <span className="text-xs font-black text-amber-800 uppercase tracking-wide">
            {badge.roleTitle}
          </span>
          <h2 className="font-fun text-2xl sm:text-3xl font-black text-slate-900 mt-0.5">
            {badge.titleAf}
          </h2>
          <p className="text-xs font-bold text-slate-500">
            {badge.titleEn}
          </p>
        </div>

        {/* Ollie speech box */}
        <div className="bg-amber-50 border-2 border-amber-200 p-4 rounded-2xl text-left space-y-1.5">
          <div className="flex items-center justify-between">
            <span className="text-xs font-black text-amber-900 flex items-center gap-1 font-fun">
              <span>🦉 Ollie sê:</span>
            </span>
            <button
              onClick={() => speakAfrikaans(badge.unlockedMessageAf)}
              className="p-1.5 rounded-lg bg-white border border-amber-300 text-amber-900 hover:bg-amber-100 transition-colors text-xs flex items-center gap-1 font-bold"
              title="Luister na Ollie"
            >
              <Volume2 className="w-3.5 h-3.5" />
              <span>Luister</span>
            </button>
          </div>
          <p className="text-sm font-bold text-amber-950 font-fun leading-snug">
            "{badge.unlockedMessageAf}"
          </p>
          <p className="text-xs text-slate-600 font-medium">
            {badge.unlockedMessageEn}
          </p>
        </div>

        {/* Close and Celebrate */}
        <button
          onClick={onClose}
          className="w-full bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-600 hover:to-orange-600 text-white font-fun font-black py-3.5 rounded-2xl shadow-md text-base transition-transform active:scale-95"
        >
          Fantasties! Voeg by my Trofeë! 🏆
        </button>
      </div>
    </div>
  );
};
