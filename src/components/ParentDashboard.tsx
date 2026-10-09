import React, { useState } from 'react';
import { Users, Printer, CheckCircle, AlertTriangle, BookOpen, Star, Trophy, RotateCcw, Award, ChevronRight, FileText } from 'lucide-react';
import { useProgress } from '../context/ProgressContext';
import { LESSONS_DATA } from '../data/curriculumData';
import { WORKSHEETS_DATA, PrintableWorksheet } from '../data/worksheetsData';
import { sounds } from '../utils/audio';

interface ParentDashboardProps {
  onPracticeLesson: (lessonId: string) => void;
}

export const ParentDashboard: React.FC<ParentDashboardProps> = ({ onPracticeLesson }) => {
  const { progress, resetProgress, removeWeakTopic } = useProgress();
  const [selectedWorksheet, setSelectedWorksheet] = useState<PrintableWorksheet | null>(null);
  const [showAnswerMemo, setShowAnswerMemo] = useState(false);

  // Calculations
  const totalLessons = LESSONS_DATA.length;
  const completedCount = progress.completedLessonIds.length;
  const progressPercent = Math.round((completedCount / totalLessons) * 100);

  const totalWordsLearned = LESSONS_DATA
    .filter((l) => progress.completedLessonIds.includes(l.id))
    .reduce((acc, l) => acc + l.vocabulary.length, 0);

  const scoresList = Object.values(progress.lessonScores);
  const averageScore = scoresList.length > 0
    ? Math.round(scoresList.reduce((a, b) => a + b, 0) / scoresList.length)
    : 0;

  const weakLessonObjects = LESSONS_DATA.filter((l) => progress.weakTopics.includes(l.id));

  const handlePrint = () => {
    sounds.playPop();
    window.print();
  };

  return (
    <div className="space-y-6 pb-12">
      {/* Header */}
      <div className="bg-gradient-to-r from-indigo-600 via-indigo-700 to-purple-700 rounded-3xl p-5 sm:p-7 text-white shadow-sm border-3 border-indigo-400 no-print">
        <div className="flex flex-wrap items-center justify-between gap-4">
          <div>
            <span className="bg-white/20 text-white text-xs font-black uppercase tracking-wider px-2.5 py-0.5 rounded-full border border-white/30">
              Ouer & Onderwyser Beheerpaneel
            </span>
            <h1 className="font-fun text-2xl sm:text-3xl font-black mt-1">
              Vordering & Werkkaarte 👨‍👩‍👧‍👦
            </h1>
            <p className="text-indigo-200 font-bold text-sm sm:text-base max-w-xl">
              Volg jou kind se Afrikaanse taalreis, identifiseer moeilike areas en druk CAPS Graad 4 werkkaarte met antwoordstelle uit.
            </p>
          </div>

          <div className="bg-white/10 backdrop-blur-xs p-3 rounded-2xl border border-white/20 text-center">
            <span className="text-xs uppercase font-black text-indigo-200">Gekose Taalspoor:</span>
            <p className="font-fun text-lg font-black text-white">
              {progress.languageTrack === 'FAL' ? 'Eerste Addisionele Taal (FAL)' : 'Huistaal (HL)'}
            </p>
          </div>
        </div>
      </div>

      {/* Overview Stats Cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4 no-print">
        <div className="bg-white p-4 rounded-2xl border-2 border-slate-200 shadow-2xs">
          <div className="flex items-center justify-between mb-1">
            <span className="text-xs font-black text-slate-500 uppercase">Lesse Voltooi</span>
            <BookOpen className="w-4 h-4 text-amber-500" />
          </div>
          <div className="font-fun text-2xl font-black text-slate-900">
            {completedCount} <span className="text-xs text-slate-400 font-normal">/ {totalLessons}</span>
          </div>
          <div className="w-full bg-slate-100 rounded-full h-2 mt-2 overflow-hidden">
            <div className="bg-amber-500 h-2 rounded-full transition-all" style={{ width: `${progressPercent}%` }} />
          </div>
        </div>

        <div className="bg-white p-4 rounded-2xl border-2 border-slate-200 shadow-2xs">
          <div className="flex items-center justify-between mb-1">
            <span className="text-xs font-black text-slate-500 uppercase">Gemiddelde Punt</span>
            <Trophy className="w-4 h-4 text-emerald-500" />
          </div>
          <div className="font-fun text-2xl font-black text-emerald-700">
            {averageScore}%
          </div>
          <span className="text-[11px] font-bold text-slate-500">Oor alle vasvrae</span>
        </div>

        <div className="bg-white p-4 rounded-2xl border-2 border-slate-200 shadow-2xs">
          <div className="flex items-center justify-between mb-1">
            <span className="text-xs font-black text-slate-500 uppercase">Woorde Geleer</span>
            <span className="text-base">📖</span>
          </div>
          <div className="font-fun text-2xl font-black text-sky-700">
            {totalWordsLearned}
          </div>
          <span className="text-[11px] font-bold text-slate-500">In 15 onderwerpe</span>
        </div>

        <div className="bg-white p-4 rounded-2xl border-2 border-slate-200 shadow-2xs">
          <div className="flex items-center justify-between mb-1">
            <span className="text-xs font-black text-slate-500 uppercase">Totaal Sterre</span>
            <Star className="w-4 h-4 text-amber-500 fill-amber-400" />
          </div>
          <div className="font-fun text-2xl font-black text-amber-900">
            {progress.stars} ⭐
          </div>
          <span className="text-[11px] font-bold text-slate-500">{progress.gems} Edelstene verdien</span>
        </div>
      </div>

      {/* Weak Areas / Needs Practice Section */}
      <div className="bg-white rounded-3xl p-5 sm:p-6 border-2 border-slate-200 shadow-sm space-y-4 no-print">
        <div className="flex items-center justify-between border-b border-slate-100 pb-3">
          <div className="flex items-center gap-2.5">
            <AlertTriangle className="w-5 h-5 text-amber-500" />
            <div>
              <h2 className="font-fun text-lg sm:text-xl font-black text-slate-900">
                Onderwerpe wat ekstra aandag benodig (Weak Areas)
              </h2>
              <p className="text-xs text-slate-500 font-medium">
                Onderwerpe waar die leerder minder as 70% behaal het of foute gemaak het.
              </p>
            </div>
          </div>

          {weakLessonObjects.length > 0 && (
            <button
              onClick={() => onPracticeLesson(weakLessonObjects[0].id)}
              className="bg-amber-500 hover:bg-amber-600 text-white font-fun font-black px-4 py-2 rounded-xl text-xs sm:text-sm shadow-sm transition-transform active:scale-95"
            >
              Oefen Swak Areas Nou →
            </button>
          )}
        </div>

        {weakLessonObjects.length === 0 ? (
          <div className="bg-emerald-50 border border-emerald-200 p-4 rounded-2xl flex items-center gap-3 text-emerald-900">
            <CheckCircle className="w-6 h-6 text-emerald-600 shrink-0" />
            <div>
              <p className="font-fun font-bold text-sm">Uitstekend! Geen probleemareas opgespoor nie.</p>
              <p className="text-xs text-emerald-700">Die leerder behaal 70%+ in alle voltooide oefentoetse!</p>
            </div>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {weakLessonObjects.map((l) => (
              <div
                key={l.id}
                className="p-3.5 rounded-2xl bg-orange-50 border border-orange-200 flex items-center justify-between gap-3"
              >
                <div>
                  <span className="text-[11px] font-black text-orange-900 uppercase">
                    Les {l.topicNumber}
                  </span>
                  <h4 className="font-fun font-bold text-sm text-slate-900">
                    {l.titleAf}
                  </h4>
                  <p className="text-xs text-slate-500 font-semibold">{l.titleEn}</p>
                </div>

                <button
                  onClick={() => onPracticeLesson(l.id)}
                  className="bg-white hover:bg-orange-100 text-orange-900 border border-orange-300 px-3 py-1.5 rounded-xl font-bold text-xs shrink-0"
                >
                  Oefen Weer
                </button>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* PRINTABLE CAPS WORKSHEETS SECTION */}
      <div className="bg-white rounded-3xl p-5 sm:p-6 border-2 border-slate-200 shadow-sm space-y-5">
        <div className="flex flex-wrap items-center justify-between gap-3 border-b border-slate-100 pb-3 no-print">
          <div className="flex items-center gap-2.5">
            <Printer className="w-6 h-6 text-indigo-600" />
            <div>
              <h2 className="font-fun text-xl font-black text-slate-900">
                Drukbare CAPS Graad 4 Werkkaarte
              </h2>
              <p className="text-xs text-slate-500 font-medium">
                Gereed vir die klaskamer of huiswerk. Klik "Druk uit" om op papier te voltooi!
              </p>
            </div>
          </div>
        </div>

        {/* Worksheet Selector Tabs */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-2.5 no-print">
          {WORKSHEETS_DATA.map((ws) => (
            <button
              key={ws.id}
              onClick={() => {
                setSelectedWorksheet(ws);
                setShowAnswerMemo(false);
                sounds.playPop();
              }}
              className={`p-3 rounded-2xl border-2 text-left transition-all ${
                selectedWorksheet?.id === ws.id
                  ? 'bg-indigo-50 border-indigo-500 shadow-2xs'
                  : 'bg-white border-slate-200 hover:border-indigo-300'
              }`}
            >
              <div className="flex items-center justify-between mb-1">
                <span className="text-[10px] font-black uppercase text-indigo-700 bg-indigo-100 px-2 py-0.5 rounded-md">
                  CAPS
                </span>
                <FileText className="w-4 h-4 text-indigo-500" />
              </div>
              <h4 className="font-fun font-bold text-xs sm:text-sm text-slate-900 line-clamp-1">
                {ws.titleAf}
              </h4>
              <p className="text-[11px] text-slate-500 line-clamp-1">{ws.titleEn}</p>
            </button>
          ))}
        </div>

        {/* Selected Worksheet Preview / Print Container */}
        {selectedWorksheet && (
          <div className="border-2 border-indigo-200 rounded-3xl p-6 bg-slate-50/50 space-y-6">
            {/* Action Bar */}
            <div className="flex flex-wrap items-center justify-between gap-3 bg-white p-3.5 rounded-2xl border border-indigo-200 no-print">
              <div>
                <span className="text-xs font-black text-indigo-900 uppercase">Gekose Werkkaart:</span>
                <h3 className="font-fun text-base font-bold text-slate-900">
                  {selectedWorksheet.titleAf}
                </h3>
              </div>

              <div className="flex items-center gap-2">
                <button
                  onClick={() => setShowAnswerMemo(!showAnswerMemo)}
                  className="px-3.5 py-2 rounded-xl border border-indigo-300 bg-indigo-50 text-indigo-900 font-bold text-xs hover:bg-indigo-100"
                >
                  {showAnswerMemo ? 'Steek Antwoordstel Weg' : 'Wys Memo / Antwoorde 🔑'}
                </button>

                <button
                  onClick={handlePrint}
                  className="bg-indigo-600 hover:bg-indigo-700 text-white font-fun font-black px-4 py-2 rounded-xl text-xs sm:text-sm flex items-center gap-1.5 shadow-sm"
                >
                  <Printer className="w-4 h-4" />
                  <span>Druk Werkkaart Uit</span>
                </button>
              </div>
            </div>

            {/* Actual Printable Page content (formatted cleanly for paper) */}
            <div className="bg-white p-6 sm:p-8 rounded-2xl border border-slate-300 shadow-sm print:border-none print:shadow-none space-y-6">
              {/* Worksheet Header */}
              <div className="border-b-2 border-slate-800 pb-4 space-y-2">
                <div className="flex items-center justify-between text-xs font-bold text-slate-600">
                  <span>{selectedWorksheet.grade}</span>
                  <span>{selectedWorksheet.capsStrand}</span>
                </div>
                <h2 className="font-fun text-xl sm:text-2xl font-black text-slate-900 text-center">
                  {selectedWorksheet.titleAf}
                </h2>
                <div className="flex items-center justify-between text-xs font-bold pt-3 border-t border-slate-200">
                  <span>Naam & Van: ____________________________________</span>
                  <span>Datum: ________________</span>
                </div>
              </div>

              {/* Instructions */}
              <div className="bg-amber-50 p-3.5 rounded-xl border border-amber-200 text-xs font-semibold text-amber-950 space-y-1">
                <p><strong>Instruksies:</strong> {selectedWorksheet.instructionsAf}</p>
                <p className="text-slate-600 italic">({selectedWorksheet.instructionsEn})</p>
              </div>

              {/* Questions */}
              <div className="space-y-6">
                {selectedWorksheet.questions.map((q) => (
                  <div key={q.number} className="space-y-2">
                    <p className="font-fun font-bold text-sm sm:text-base text-slate-900">
                      {q.number}. {q.questionText}
                    </p>
                    <div className="space-y-2 pt-1">
                      {Array.from({ length: q.linesCount }).map((_, lIdx) => (
                        <div key={lIdx} className="border-b border-dotted border-slate-400 h-6 w-full" />
                      ))}
                    </div>
                  </div>
                ))}
              </div>

              {/* Answer Memo (Shown only if toggled or in memo section) */}
              {showAnswerMemo && (
                <div className="mt-8 pt-6 border-t-2 border-dashed border-emerald-500 bg-emerald-50/70 p-4 rounded-xl space-y-3">
                  <h4 className="font-fun text-sm font-black text-emerald-950 uppercase tracking-wide">
                    🔑 Ouer & Onderwyser Antwoordstel (Memo):
                  </h4>
                  <div className="space-y-2 text-xs text-slate-800">
                    {selectedWorksheet.questions.map((q) => (
                      <div key={q.number} className="border-b border-emerald-200/60 pb-1.5">
                        <span className="font-bold text-emerald-900">Vraag {q.number}:</span>{' '}
                        <span className="font-mono text-emerald-950">{q.answerKey}</span>
                        <p className="text-[11px] text-slate-500 italic mt-0.5">{q.explanation}</p>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>
        )}
      </div>

      {/* Reset Progress Section (Safety for parents) */}
      <div className="bg-slate-100 p-4 rounded-2xl border border-slate-200 flex items-center justify-between no-print text-xs">
        <div>
          <span className="font-bold text-slate-700">Herstel leerder se data:</span>
          <p className="text-slate-500">Stel alle lesse en sterre terug na beginposisie.</p>
        </div>
        <button
          onClick={() => {
            if (window.confirm('Is jy seker jy wil die vordering terugstel?')) {
              resetProgress();
            }
          }}
          className="text-rose-600 hover:text-rose-800 font-bold px-3 py-1.5 rounded-lg border border-rose-300 hover:bg-rose-50"
        >
          Herstel Vordering
        </button>
      </div>
    </div>
  );
};
