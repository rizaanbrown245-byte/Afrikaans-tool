import React from 'react';
import { OllieMilestoneBadge } from '../types';

interface OllieBadgeGraphicProps {
  costume: OllieMilestoneBadge['costume'];
  size?: 'sm' | 'md' | 'lg';
  isUnlocked?: boolean;
  className?: string;
}

export const OllieBadgeGraphic: React.FC<OllieBadgeGraphicProps> = ({
  costume,
  size = 'md',
  isUnlocked = true,
  className = ''
}) => {
  const sizeClasses = {
    sm: 'w-12 h-12',
    md: 'w-20 h-20',
    lg: 'w-28 h-28'
  }[size];

  return (
    <div className={`relative ${sizeClasses} flex items-center justify-center shrink-0 ${className}`}>
      {/* Outer Golden / Themed Medallion */}
      <div
        className={`w-full h-full rounded-3xl p-1 flex items-center justify-center shadow-md transition-transform ${
          isUnlocked
            ? 'bg-gradient-to-tr from-amber-400 via-yellow-300 to-amber-500 border-3 border-amber-300'
            : 'bg-slate-200 border-2 border-slate-300 opacity-60 grayscale'
        }`}
      >
        <div className="w-full h-full rounded-2xl bg-amber-100/90 border border-amber-200/80 flex items-center justify-center overflow-hidden relative">
          {/* Ollie the Owl Character SVG Base */}
          <svg viewBox="0 0 100 100" className="w-[85%] h-[85%] drop-shadow-sm">
            {/* Body */}
            <ellipse cx="50" cy="56" rx="35" ry="38" fill={isUnlocked ? '#B45309' : '#64748B'} />
            <ellipse cx="50" cy="62" rx="25" ry="26" fill={isUnlocked ? '#FDE68A' : '#CBD5E1'} />

            {/* Belly feathers */}
            <path d="M42 56 Q50 62 58 56" stroke={isUnlocked ? '#D97706' : '#94A3B8'} strokeWidth="2.5" fill="none" />
            <path d="M44 65 Q50 71 56 65" stroke={isUnlocked ? '#D97706' : '#94A3B8'} strokeWidth="2.5" fill="none" />

            {/* Wings */}
            <path d="M15,50 C12,65 24,78 28,80 C26,70 24,58 20,48 Z" fill={isUnlocked ? '#92400E' : '#475569'} />
            <path d="M85,50 C88,65 76,78 72,80 C74,70 76,58 80,48 Z" fill={isUnlocked ? '#92400E' : '#475569'} />

            {/* Glasses frame */}
            <circle cx="36" cy="40" r="14" fill="#FEF3C7" stroke="#3B82F6" strokeWidth="2.5" />
            <circle cx="64" cy="40" r="14" fill="#FEF3C7" stroke="#3B82F6" strokeWidth="2.5" />
            <line x1="50" y1="40" x2="50" y2="40" stroke="#3B82F6" strokeWidth="2.5" />

            {/* Eyes */}
            <circle cx="37" cy="40" r="5" fill="#1E293B" />
            <circle cx="63" cy="40" r="5" fill="#1E293B" />
            <circle cx="39" cy="38" r="1.5" fill="#FFFFFF" />
            <circle cx="65" cy="38" r="1.5" fill="#FFFFFF" />

            {/* Beak */}
            <polygon points="50,44 45,52 55,52" fill="#F59E0B" />

            {/* --- COSTUME HEADPIECE OVERLAYS --- */}
            {costume === 'conductor' && (
              /* Train Conductor Hat */
              <g>
                <path d="M26 22 Q50 14 74 22 L72 14 Q50 8 28 14 Z" fill="#0284C7" />
                <rect x="22" y="20" width="56" height="5" rx="2" fill="#0369A1" />
                <path d="M20 24 Q50 28 80 24 L78 27 Q50 31 22 27 Z" fill="#0F172A" />
                <circle cx="50" cy="17" r="3" fill="#FDE047" />
              </g>
            )}

            {costume === 'safari' && (
              /* Safari Ranger Pith Helmet */
              <g>
                <path d="M30 20 Q50 10 70 20 L72 25 Q50 22 28 25 Z" fill="#A16207" />
                <ellipse cx="50" cy="24" rx="36" ry="7" fill="#CA8A04" />
                <rect x="36" y="21" width="28" height="3" fill="#713F12" />
              </g>
            )}

            {costume === 'chef' && (
              /* Masterchef Toque Hat */
              <g>
                <ellipse cx="50" cy="14" rx="22" ry="12" fill="#FFFFFF" stroke="#E2E8F0" strokeWidth="1" />
                <circle cx="36" cy="12" r="8" fill="#FFFFFF" />
                <circle cx="64" cy="12" r="8" fill="#FFFFFF" />
                <rect x="34" y="18" width="32" height="7" rx="2" fill="#F1F5F9" stroke="#CBD5E1" strokeWidth="1" />
              </g>
            )}

            {costume === 'detective' && (
              /* Detective Fedora / Sherlock Hat */
              <g>
                <ellipse cx="50" cy="23" rx="34" ry="7" fill="#78350F" />
                <path d="M32 22 Q50 12 68 22 L65 14 Q50 8 35 14 Z" fill="#92400E" />
                <rect x="33" y="19" width="34" height="3" fill="#D97706" />
              </g>
            )}

            {costume === 'timetraveler' && (
              /* Time Traveler Brass Goggles / Gear */
              <g>
                <circle cx="36" cy="22" r="8" fill="#F59E0B" stroke="#78350F" strokeWidth="2" />
                <circle cx="64" cy="22" r="8" fill="#F59E0B" stroke="#78350F" strokeWidth="2" />
                <line x1="44" y1="22" x2="56" y2="22" stroke="#78350F" strokeWidth="3" />
                <circle cx="36" cy="22" r="4" fill="#38BDF8" />
                <circle cx="64" cy="22" r="4" fill="#38BDF8" />
              </g>
            )}

            {costume === 'storyteller' && (
              /* Storyteller Laurels & Bookmark */
              <g>
                <path d="M22 24 Q34 16 46 22" stroke="#16A34A" strokeWidth="3" fill="none" />
                <path d="M78 24 Q66 16 54 22" stroke="#16A34A" strokeWidth="3" fill="none" />
                <circle cx="50" cy="16" r="3" fill="#EAB308" />
              </g>
            )}

            {costume === 'author' && (
              /* Author Quill & Feather */
              <g>
                <path d="M68 6 Q76 14 62 30 L59 28 Q70 14 68 6 Z" fill="#DC2626" />
                <line x1="59" y1="28" x2="52" y2="35" stroke="#FFFFFF" strokeWidth="1.5" />
                <polygon points="50,14 74,22 50,30 26,22" fill="#1E293B" />
              </g>
            )}

            {costume === 'professor' && (
              /* Professor Graduation Cap */
              <g>
                <polygon points="50,10 82,20 50,30 18,20" fill="#1E293B" />
                <rect x="42" y="24" width="16" height="6" rx="2" fill="#334155" />
                <circle cx="50" cy="19" r="2.5" fill="#EAB308" />
                <path d="M50,19 C62,21 72,24 74,32" stroke="#EAB308" strokeWidth="2" fill="none" />
              </g>
            )}

            {costume === 'streak3' && (
              /* Flame Aura */
              <g>
                <path d="M50 4 Q58 14 52 20 Q56 22 50 25 Q44 22 48 20 Q42 14 50 4 Z" fill="#EA580C" />
                <path d="M50 10 Q54 16 50 22 Q46 16 50 10 Z" fill="#FDE047" />
              </g>
            )}

            {costume === 'streak7' && (
              /* Electric Lightning Crown */
              <g>
                <polygon points="50,4 56,16 48,16 54,26 44,14 50,14" fill="#EAB308" stroke="#CA8A04" strokeWidth="1" />
              </g>
            )}

            {costume === 'champion' && (
              /* Grand Champion Golden Royal Crown */
              <g>
                <polygon points="26,22 34,10 50,18 66,10 74,22" fill="#FACC15" stroke="#CA8A04" strokeWidth="2" />
                <circle cx="34" cy="9" r="2.5" fill="#EF4444" />
                <circle cx="50" cy="17" r="2.5" fill="#3B82F6" />
                <circle cx="66" cy="9" r="2.5" fill="#10B981" />
              </g>
            )}
          </svg>
        </div>
      </div>

      {/* Floating mini status badge */}
      {isUnlocked && (
        <span className="absolute -bottom-1 -right-1 text-sm bg-amber-400 border border-white rounded-full p-0.5 shadow-sm">
          ⭐
        </span>
      )}
    </div>
  );
};
