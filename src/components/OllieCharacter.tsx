import React, { useState } from 'react';
import { Volume2, Sparkles, MessageCircle } from 'lucide-react';
import { speakAfrikaans } from '../utils/audio';

interface OllieCharacterProps {
  englishText: string;
  afrikaansText?: string;
  mood?: 'happy' | 'thinking' | 'cheering' | 'explaining';
  showAudioButton?: boolean;
  className?: string;
}

export const OllieCharacter: React.FC<OllieCharacterProps> = ({
  englishText,
  afrikaansText,
  mood = 'happy',
  showAudioButton = true,
  className = ''
}) => {
  const [isSpeaking, setIsSpeaking] = useState(false);

  const handleSpeak = () => {
    if (afrikaansText) {
      setIsSpeaking(true);
      speakAfrikaans(afrikaansText);
      setTimeout(() => setIsSpeaking(false), 2500);
    }
  };

  return (
    <div className={`flex items-start gap-3 md:gap-4 bg-gradient-to-r from-amber-100/90 via-orange-50/90 to-yellow-100/90 p-3.5 md:p-4 rounded-2xl md:rounded-3xl border-2 border-amber-300 shadow-sm ${className}`}>
      {/* Ollie Owl Illustration */}
      <div className="relative shrink-0 flex flex-col items-center">
        <div
          className={`w-16 h-16 md:w-20 md:h-20 rounded-2xl bg-amber-200 border-2 border-amber-400 p-1 flex items-center justify-center shadow-inner cursor-pointer transition-transform hover:scale-105 active:scale-95 ${
            isSpeaking ? 'animate-bounce' : 'animate-gentle-bounce'
          }`}
          onClick={handleSpeak}
          title="Klik op Ollie om te luister!"
        >
          {/* Friendly SVG Ollie the Owl */}
          <svg viewBox="0 0 100 100" className="w-full h-full drop-shadow-sm">
            {/* Body */}
            <ellipse cx="50" cy="55" rx="36" ry="40" fill="#B45309" />
            <ellipse cx="50" cy="62" rx="26" ry="28" fill="#FDE68A" />
            {/* Feathers on belly */}
            <path d="M42 55 Q50 62 58 55" stroke="#D97706" strokeWidth="2.5" fill="none" />
            <path d="M44 64 Q50 71 56 64" stroke="#D97706" strokeWidth="2.5" fill="none" />
            <path d="M46 73 Q50 80 54 73" stroke="#D97706" strokeWidth="2.5" fill="none" />
            
            {/* Owl Ears / Tufts */}
            <polygon points="22,25 32,40 18,42" fill="#92400E" />
            <polygon points="78,25 82,42 68,40" fill="#92400E" />

            {/* Wings */}
            <path d="M15,50 C12,65 24,78 28,80 C26,70 24,58 20,48 Z" fill="#92400E" />
            <path d="M85,50 C88,65 76,78 72,80 C74,70 76,58 80,48 Z" fill="#92400E" />

            {/* Glasses frame (Wise Owl) */}
            <circle cx="36" cy="40" r="15" fill="#FEF3C7" stroke="#3B82F6" strokeWidth="3" />
            <circle cx="64" cy="40" r="15" fill="#FEF3C7" stroke="#3B82F6" strokeWidth="3" />
            <line x1="51" y1="40" x2="49" y2="40" stroke="#3B82F6" strokeWidth="3" />

            {/* Eyes */}
            <circle cx="37" cy="40" r="6" fill="#1E293B" />
            <circle cx="63" cy="40" r="6" fill="#1E293B" />
            <circle cx="39" cy="38" r="2" fill="#FFFFFF" />
            <circle cx="65" cy="38" r="2" fill="#FFFFFF" />

            {/* Beak */}
            <polygon points="50,44 44,53 56,53" fill="#F59E0B" />

            {/* Teacher Mortarboard cap */}
            <polygon points="50,10 82,20 50,30 18,20" fill="#1E293B" />
            <rect x="42" y="24" width="16" height="7" rx="3" fill="#334155" />
            <circle cx="50" cy="19" r="2" fill="#EAB308" />
            <path d="M50,19 C62,21 72,24 74,32" stroke="#EAB308" strokeWidth="2" fill="none" />
            <circle cx="74" cy="33" r="2.5" fill="#EAB308" />
          </svg>
        </div>
        <span className="text-[11px] font-extrabold text-amber-900 bg-amber-200/90 px-2 py-0.5 rounded-full mt-1 border border-amber-300">
          Uil Ollie 🦉
        </span>
      </div>

      {/* Speech Bubble */}
      <div className="flex-1 min-w-0">
        <div className="flex items-center justify-between gap-2 mb-1">
          <div className="flex items-center gap-1.5">
            <span className="text-xs font-black uppercase tracking-wider text-amber-800 flex items-center gap-1 font-fun">
              <Sparkles className="w-3.5 h-3.5 text-amber-600" />
              Ollie sê:
            </span>
            {mood === 'cheering' && (
              <span className="text-xs font-bold text-emerald-700 bg-emerald-100 px-2 py-0.5 rounded-md">
                🎉 Goed gedoen!
              </span>
            )}
          </div>

          {afrikaansText && showAudioButton && (
            <button
              onClick={handleSpeak}
              className="text-xs font-bold flex items-center gap-1 text-amber-900 bg-white/80 hover:bg-amber-100 border border-amber-300 px-2.5 py-1 rounded-xl transition-all shadow-2xs hover:shadow active:scale-95"
              title="Luister na Afrikaans"
            >
              <Volume2 className="w-3.5 h-3.5 text-amber-700" />
              <span>Praat</span>
            </button>
          )}
        </div>

        {/* Afrikaans Quote if present */}
        {afrikaansText && (
          <p className="text-sm md:text-base font-bold text-amber-950 mb-1 leading-snug">
            "{afrikaansText}"
          </p>
        )}

        {/* English Explanation in simple words for Grade 4 */}
        <p className="text-xs md:text-sm text-slate-700 leading-relaxed bg-white/60 p-2 rounded-xl border border-amber-200/60">
          {englishText}
        </p>
      </div>
    </div>
  );
};
