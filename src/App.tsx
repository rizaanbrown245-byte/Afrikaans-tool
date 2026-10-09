/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { ProgressProvider, useProgress } from './context/ProgressContext';
import { Navbar } from './components/Navbar';
import { AdventureMap } from './components/AdventureMap';
import { LessonViewer } from './components/LessonViewer';
import { LessonsList } from './components/LessonsList';
import { GamesHub } from './components/GamesHub';
import { StoriesViewer } from './components/StoriesViewer';
import { DailyChallenge } from './components/DailyChallenge';
import { ParentDashboard } from './components/ParentDashboard';
import { BadgeModal } from './components/BadgeModal';
import { OllieMilestoneModal } from './components/OllieMilestoneModal';
import { LESSONS_DATA } from './data/curriculumData';

function AppContent() {
  const { latestUnlockedOllieBadge, clearLatestUnlockedOllieBadge } = useProgress();
  const [currentTab, setCurrentTab] = useState<'map' | 'lessons' | 'games' | 'stories' | 'daily' | 'parent' | 'trophies'>('map');
  const [activeLessonId, setActiveLessonId] = useState<string | null>(null);

  const handleSelectLesson = (lessonId: string) => {
    setActiveLessonId(lessonId);
    setCurrentTab('lessons');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleBackToMap = () => {
    setActiveLessonId(null);
    setCurrentTab('map');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="min-h-screen bg-amber-50/50 flex flex-col font-sans selection:bg-amber-200">
      {/* Main Top Navigation */}
      <Navbar
        currentTab={currentTab}
        setCurrentTab={(tab) => {
          if (tab === 'lessons' && !activeLessonId) {
            // Keep on lessons directory
          } else if (tab !== 'lessons') {
            setActiveLessonId(null);
          }
          setCurrentTab(tab);
          window.scrollTo({ top: 0, behavior: 'smooth' });
        }}
      />

      {/* Main Content Area */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-3 sm:px-6 pt-5 sm:pt-6">
        {/* Render Map */}
        {currentTab === 'map' && (
          <AdventureMap
            onSelectLesson={handleSelectLesson}
            onOpenGames={() => setCurrentTab('games')}
          />
        )}

        {/* Render Lessons (either specific LessonViewer or LessonsList directory) */}
        {currentTab === 'lessons' && (
          activeLessonId ? (
            <LessonViewer
              lessonId={activeLessonId}
              onBackToMap={() => {
                setActiveLessonId(null);
                setCurrentTab('lessons');
              }}
              onSelectLesson={(id) => setActiveLessonId(id)}
            />
          ) : (
            <LessonsList onSelectLesson={handleSelectLesson} />
          )
        )}

        {/* Render Games Hub */}
        {currentTab === 'games' && <GamesHub />}

        {/* Render Reading Comprehension */}
        {currentTab === 'stories' && <StoriesViewer />}

        {/* Render Daily Challenge */}
        {currentTab === 'daily' && <DailyChallenge />}

        {/* Render Parent & Teacher Dashboard */}
        {currentTab === 'parent' && (
          <ParentDashboard
            onPracticeLesson={(id) => {
              setActiveLessonId(id);
              setCurrentTab('lessons');
            }}
          />
        )}

        {/* Render Trophies & Avatars */}
        {currentTab === 'trophies' && <BadgeModal />}
      </main>

      {/* Ollie Milestone Celebration Modal */}
      {latestUnlockedOllieBadge && (
        <OllieMilestoneModal
          badge={latestUnlockedOllieBadge}
          onClose={clearLatestUnlockedOllieBadge}
        />
      )}

      {/* Footer */}
      <footer className="bg-white border-t-2 border-amber-200 py-6 px-4 text-center text-xs text-slate-500 font-bold space-y-1 no-print">
        <p className="flex items-center justify-center gap-1.5 text-amber-950 font-fun text-sm">
          <span>🦉 Afrikaans Avontuur – Graad 4</span>
          <span className="text-[10px] bg-emerald-500 text-white px-2 py-0.5 rounded-full">CAPS 2026</span>
        </p>
        <p className="text-slate-500 max-w-md mx-auto">
          Aligned with South African CAPS curriculum for Grade 4 Afrikaans First Additional Language (FAL) and Home Language (HL). English explanations with cartoon characters.
        </p>
        <p className="text-[11px] text-amber-800">
          Met liefde gemaak vir Suid-Afrikaanse leerders, ouers en juffrous! 🇿🇦
        </p>
      </footer>
    </div>
  );
}

export default function App() {
  return (
    <ProgressProvider>
      <AppContent />
    </ProgressProvider>
  );
}
