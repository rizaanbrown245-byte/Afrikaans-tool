import React, { useState } from 'react';
import {
  Award,
  Clock,
  Sparkles,
  CheckCircle,
  XCircle,
  HelpCircle,
  RotateCcw,
  BookOpen,
  Volume2,
  Printer,
  TrendingUp,
  FileText,
  AlertCircle,
  Download,
  FileDown,
  Check,
  Loader2
} from 'lucide-react';
import { useProgress } from '../context/ProgressContext';
import {
  REVISION_EXAM_QUESTIONS,
  EXAM_SECTIONS,
  COMPREHENSION_STORY,
  TOTAL_EXAM_MARKS,
  ExamQuestion
} from '../data/revisionExamData';
import { sounds, speakAfrikaans } from '../utils/audio';
import { fireLessonCompleteConfetti } from '../utils/confetti';
import {
  generateExamQuestionPaperPdf,
  generateExamMemorandumPdf,
  generateStudentExamResultsPdf
} from '../utils/examPdfGenerator';

interface RevisionExamViewerProps {
  onBackToDashboard?: () => void;
  onOpenParentUpdate?: () => void;
}

export const RevisionExamViewer: React.FC<RevisionExamViewerProps> = ({
  onBackToDashboard,
  onOpenParentUpdate
}) => {
  const { progress, recordExamResult } = useProgress();

  // Mode: 'cover' | 'taking' | 'completed' | 'memo'
  const [examMode, setExamMode] = useState<'cover' | 'taking' | 'completed' | 'memo'>('cover');
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [userAnswers, setUserAnswers] = useState<Record<string, string>>({});
  const [showStory, setShowStory] = useState(true);
  const [selectedSectionFilter, setSelectedSectionFilter] = useState<string>('ALL');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [downloadStatus, setDownloadStatus] = useState<string | null>(null);
  const [learnerName, setLearnerName] = useState<string>(progress.childName || '');

  const activeQuestion: ExamQuestion = REVISION_EXAM_QUESTIONS[currentQuestionIndex];
  const totalQuestions = REVISION_EXAM_QUESTIONS.length;

  // Track answers and section breakdown
  const calculateResults = () => {
    let earnedMarks = 0;
    const breakdown: Record<string, { earned: number; total: number; titleAf: string }> = {
      A: { earned: 0, total: 10, titleAf: 'Leesbegrip' },
      B: { earned: 0, total: 10, titleAf: 'STOMPI & Sinsbou' },
      C: { earned: 0, total: 10, titleAf: 'Woordsoorte' },
      D: { earned: 0, total: 10, titleAf: 'Morfologie' },
      E: { earned: 0, total: 10, titleAf: 'Tye & Ontkenning' }
    };

    REVISION_EXAM_QUESTIONS.forEach((q) => {
      const userAns = userAnswers[q.id];
      const isCorrect = userAns && userAns.trim().toLowerCase() === q.correctAnswer.trim().toLowerCase();
      if (isCorrect) {
        earnedMarks += q.marks;
        if (breakdown[q.sectionId]) {
          breakdown[q.sectionId].earned += q.marks;
        }
      }
    });

    const percent = Math.round((earnedMarks / TOTAL_EXAM_MARKS) * 100);
    return { earnedMarks, totalMarks: TOTAL_EXAM_MARKS, percent, breakdown };
  };

  const results = calculateResults();

  const handleSelectAnswer = (questionId: string, answer: string) => {
    sounds.playPop();
    setUserAnswers((prev) => ({
      ...prev,
      [questionId]: answer
    }));
  };

  const handleNext = () => {
    sounds.playPop();
    if (currentQuestionIndex < totalQuestions - 1) {
      setCurrentQuestionIndex((prev) => prev + 1);
    }
  };

  const handlePrev = () => {
    sounds.playPop();
    if (currentQuestionIndex > 0) {
      setCurrentQuestionIndex((prev) => prev - 1);
    }
  };

  const handleSubmitExam = () => {
    setIsSubmitting(true);
    const { earnedMarks, totalMarks, breakdown } = calculateResults();

    recordExamResult(earnedMarks, totalMarks, {
      A: { earned: breakdown.A.earned, total: breakdown.A.total },
      B: { earned: breakdown.B.earned, total: breakdown.B.total },
      C: { earned: breakdown.C.earned, total: breakdown.C.total },
      D: { earned: breakdown.D.earned, total: breakdown.D.total },
      E: { earned: breakdown.E.earned, total: breakdown.E.total }
    });

    setTimeout(() => {
      setIsSubmitting(false);
      setExamMode('completed');
      sounds.playVictory();
      fireLessonCompleteConfetti();
    }, 400);
  };

  const handleRestart = () => {
    sounds.playPop();
    setUserAnswers({});
    setCurrentQuestionIndex(0);
    setExamMode('taking');
  };

  const answeredCount = Object.keys(userAnswers).length;
  const progressPercent = Math.round((answeredCount / totalQuestions) * 100);

  // Audio helper
  const handleReadQuestion = (text: string) => {
    speakAfrikaans(text);
  };

  // PDF Download Handlers
  const handleDownloadPaper = (customName?: string) => {
    sounds.playPop();
    setDownloadStatus('paper');
    setTimeout(() => {
      try {
        generateExamQuestionPaperPdf(customName || learnerName || progress.childName || '');
        setDownloadStatus('done-paper');
        setTimeout(() => setDownloadStatus(null), 3000);
      } catch (err) {
        console.error('Failed to generate question paper PDF', err);
        setDownloadStatus(null);
      }
    }, 80);
  };

  const handleDownloadMemo = () => {
    sounds.playPop();
    setDownloadStatus('memo');
    setTimeout(() => {
      try {
        generateExamMemorandumPdf();
        setDownloadStatus('done-memo');
        setTimeout(() => setDownloadStatus(null), 3000);
      } catch (err) {
        console.error('Failed to generate memorandum PDF', err);
        setDownloadStatus(null);
      }
    }, 80);
  };

  const handleDownloadResultsReport = () => {
    sounds.playPop();
    setDownloadStatus('report');
    setTimeout(() => {
      try {
        const { earnedMarks, totalMarks, percent, breakdown } = calculateResults();
        generateStudentExamResultsPdf({
          studentName: learnerName || progress.childName || 'Graad 4 Leerder',
          userAnswers,
          earnedMarks,
          totalMarks,
          percent,
          breakdown
        });
        setDownloadStatus('done-report');
        setTimeout(() => setDownloadStatus(null), 3000);
      } catch (err) {
        console.error('Failed to generate results report PDF', err);
        setDownloadStatus(null);
      }
    }, 80);
  };

  // =========================================================================
  // COVER VIEW
  // =========================================================================
  if (examMode === 'cover') {
    return (
      <div className="space-y-6 pb-12 max-w-5xl mx-auto">
        {/* Exam Title Banner */}
        <div className="bg-gradient-to-r from-amber-600 via-orange-600 to-amber-700 rounded-3xl p-6 sm:p-8 text-white shadow-lg border-4 border-amber-300 relative overflow-hidden">
          <div className="absolute top-2 right-4 text-7xl opacity-15 pointer-events-none select-none">
            🦉
          </div>
          <div className="relative z-10">
            <div className="inline-flex items-center gap-2 bg-white/20 backdrop-blur-xs px-3.5 py-1.5 rounded-full text-xs font-black uppercase tracking-wider mb-3 border border-white/30">
              <Sparkles className="w-4 h-4 text-amber-200" />
              Departement van Basiese Onderwys • CAPS Graad 4 EAT / HT
            </div>
            <h1 className="font-fun text-3xl sm:text-5xl font-black mb-3 text-white drop-shadow-md">
              Graad 4 Afrikaans Hersieningseksamen 📝
            </h1>
            <p className="text-amber-100 font-bold text-base sm:text-lg max-w-2xl mb-4 leading-relaxed">
              Omvattende CAPS Kurrikulum Eksamenvraestel wat alles van Kwartaal 1 tot 4 dek:
              Leesbegrip, STOMPI-sinsbou, Woordsoorte, Meervoude & Verkleinwoorde, en Tye & Ontkenning.
            </p>

            <div className="flex flex-wrap items-center gap-4 text-sm font-black bg-black/20 p-3.5 rounded-2xl border border-white/20 backdrop-blur-xs w-fit">
              <div className="flex items-center gap-2">
                <Clock className="w-4 h-4 text-amber-300" />
                <span>Tyd: 60 - 90 minute (Geen tydsdruk!)</span>
              </div>
              <div className="flex items-center gap-2">
                <Award className="w-4 h-4 text-amber-300" />
                <span>Totaal: {TOTAL_EXAM_MARKS} Punte (5 Afdelings)</span>
              </div>
              <div className="flex items-center gap-2">
                <FileText className="w-4 h-4 text-amber-300" />
                <span>25 Vrae</span>
              </div>
            </div>
          </div>
        </div>

        {/* 5 CAPS Sections Breakdown Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {EXAM_SECTIONS.map((sec) => (
            <div
              key={sec.id}
              className="bg-white rounded-2xl p-5 border-2 border-amber-200 shadow-sm hover:border-amber-400 transition-all flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center justify-between mb-2">
                  <span className="text-3xl">{sec.icon}</span>
                  <span className="bg-amber-100 text-amber-900 font-black text-xs px-2.5 py-1 rounded-full border border-amber-300">
                    {sec.totalMarks} Punte
                  </span>
                </div>
                <h3 className="font-fun text-lg font-black text-slate-800 mb-1">
                  {sec.titleAf}
                </h3>
                <p className="text-xs font-bold text-amber-700 mb-2">
                  {sec.titleEn}
                </p>
                <p className="text-xs text-slate-600 leading-relaxed">
                  {sec.descriptionAf}
                </p>
              </div>
              <div className="mt-4 pt-3 border-t border-slate-100 text-[11px] font-bold text-slate-500">
                📌 {sec.capsFocus}
              </div>
            </div>
          ))}

          {/* Ollie Encouragement Card */}
          <div className="bg-gradient-to-br from-emerald-500 to-teal-600 rounded-2xl p-5 text-white shadow-sm flex flex-col justify-between">
            <div>
              <div className="flex items-center gap-2 mb-2">
                <span className="text-3xl">🦉</span>
                <span className="font-black text-xs uppercase bg-white/20 px-2 py-0.5 rounded-full">
                  Ollie se Wenk
                </span>
              </div>
              <h4 className="font-fun text-lg font-black mb-1">Moenie stres nie!</h4>
              <p className="text-xs text-emerald-100 leading-relaxed font-semibold">
                Hierdie eksamen is ontwerp om jou selfvertroue te bou. Jy kan na die klank luister
                met die luidspreker-knoppie, die vraestel rustig voltooi, en daarna kry jy 'n pragtige
                Ouer-Verslag om vir jou ma of pa te wys!
              </p>
            </div>
            <div className="mt-4 text-xs font-black text-emerald-200">
              ⭐ Verdien goue sterre en edelstene vir jou poging!
            </div>
          </div>
        </div>

        {/* PDF Download Centre */}
        <div className="bg-gradient-to-br from-amber-500/10 via-orange-500/10 to-amber-600/10 rounded-3xl p-6 border-3 border-amber-300 shadow-sm space-y-4">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-amber-500 to-orange-600 text-white flex items-center justify-center text-2xl shadow-md flex-shrink-0">
                📄
              </div>
              <div>
                <span className="inline-flex items-center gap-1.5 text-xs font-black uppercase tracking-wider text-amber-800 bg-amber-100/80 px-2.5 py-0.5 rounded-full border border-amber-300">
                  <FileDown className="w-3.5 h-3.5" />
                  Aflaaibare PDF Vraestelle & Nasienmemo
                </span>
                <h3 className="font-fun text-xl font-black text-slate-900 mt-1">
                  Laai die Hersieningseksamen af as PDF
                </h3>
              </div>
            </div>

            {/* Optional Learner Name field */}
            <div className="w-full sm:w-auto flex items-center gap-2 bg-white px-3 py-1.5 rounded-xl border-2 border-amber-200">
              <span className="text-xs font-black text-slate-500 whitespace-nowrap">Leerder:</span>
              <input
                type="text"
                value={learnerName}
                onChange={(e) => setLearnerName(e.target.value)}
                placeholder="bv. Jabu / Anika"
                className="text-xs font-bold text-slate-800 focus:outline-hidden bg-transparent w-32"
              />
            </div>
          </div>

          <p className="text-xs sm:text-sm text-slate-600 font-medium leading-relaxed">
            Ideaal vir tuiswerk, klaskameroefening of amptelike assessering. Druk die formele 50-punt KABV-vraestel uit met spasies vir antwoorde, of laai die omvattende onderwysers/ouer-memorandum af.
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-1">
            <button
              onClick={() => handleDownloadPaper()}
              disabled={downloadStatus === 'paper'}
              className="p-4 rounded-2xl bg-white hover:bg-amber-50 border-2 border-amber-300 hover:border-amber-400 text-slate-800 shadow-sm transition-all text-left flex items-center justify-between group active:scale-98"
            >
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-amber-100 text-amber-700 flex items-center justify-center font-black group-hover:scale-105 transition-transform">
                  {downloadStatus === 'paper' ? (
                    <Loader2 className="w-5 h-5 animate-spin text-amber-600" />
                  ) : downloadStatus === 'done-paper' ? (
                    <Check className="w-5 h-5 text-emerald-600" />
                  ) : (
                    <Download className="w-5 h-5 text-amber-600" />
                  )}
                </div>
                <div>
                  <div className="font-fun font-black text-sm text-slate-900 flex items-center gap-1.5">
                    <span>1. Laai Leë Vraestel Af (PDF)</span>
                    {downloadStatus === 'done-paper' && (
                      <span className="text-[10px] bg-emerald-100 text-emerald-800 px-2 py-0.5 rounded-full font-black">
                        Afgelaai! ✓
                      </span>
                    )}
                  </div>
                  <p className="text-[11px] text-slate-500 font-bold">
                    Al 25 vrae, leesteks & skryflyne vir die leerder (50 punte)
                  </p>
                </div>
              </div>
            </button>

            <button
              onClick={handleDownloadMemo}
              disabled={downloadStatus === 'memo'}
              className="p-4 rounded-2xl bg-white hover:bg-blue-50 border-2 border-blue-200 hover:border-blue-300 text-slate-800 shadow-sm transition-all text-left flex items-center justify-between group active:scale-98"
            >
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-blue-100 text-blue-700 flex items-center justify-center font-black group-hover:scale-105 transition-transform">
                  {downloadStatus === 'memo' ? (
                    <Loader2 className="w-5 h-5 animate-spin text-blue-600" />
                  ) : downloadStatus === 'done-memo' ? (
                    <Check className="w-5 h-5 text-emerald-600" />
                  ) : (
                    <FileText className="w-5 h-5 text-blue-600" />
                  )}
                </div>
                <div>
                  <div className="font-fun font-black text-sm text-slate-900 flex items-center gap-1.5">
                    <span>2. Laai Nasien-Memorandum Af (PDF)</span>
                    {downloadStatus === 'done-memo' && (
                      <span className="text-[10px] bg-emerald-100 text-emerald-800 px-2 py-0.5 rounded-full font-black">
                        Afgelaai! ✓
                      </span>
                    )}
                  </div>
                  <p className="text-[11px] text-slate-500 font-bold">
                    Modelantwoorde, puntetoekenning & KABV-reëls vir ouers
                  </p>
                </div>
              </div>
            </button>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="bg-amber-50 rounded-3xl p-6 border-3 border-amber-300 flex flex-wrap items-center justify-between gap-4">
          <div>
            <h3 className="font-fun text-xl font-black text-amber-950">
              Gereed om die eksamen te begin?
            </h3>
            <p className="text-sm font-bold text-amber-800">
              Antwoord die 25 vrae teen jou eie pas. Jy kan enige tyd vorentoe of agtertoe beweeg.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-3">
            <button
              onClick={() => {
                sounds.playVictory();
                setExamMode('taking');
              }}
              className="px-6 py-3.5 rounded-2xl bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-600 hover:to-orange-600 text-white font-black text-base shadow-lg transition-transform hover:scale-105 active:scale-95 flex items-center gap-2"
            >
              <Sparkles className="w-5 h-5 text-amber-200" />
              <span>Begin die Eksamen Nou! 🚀</span>
            </button>

            {onBackToDashboard && (
              <button
                onClick={onBackToDashboard}
                className="px-4 py-3 rounded-2xl bg-white hover:bg-slate-100 text-slate-700 font-black text-sm border-2 border-slate-200"
              >
                Terug na Kaart
              </button>
            )}
          </div>
        </div>
      </div>
    );
  }

  // =========================================================================
  // COMPLETED VIEW WITH DETAILED REPORT & MEMO ACCESS
  // =========================================================================
  if (examMode === 'completed') {
    const isPassed = results.percent >= 50;

    return (
      <div className="space-y-6 pb-12 max-w-4xl mx-auto">
        {/* Results Card */}
        <div
          className={`rounded-3xl p-6 sm:p-8 text-white shadow-xl border-4 ${
            isPassed
              ? 'bg-gradient-to-br from-emerald-600 via-teal-700 to-emerald-800 border-emerald-300'
              : 'bg-gradient-to-br from-amber-600 via-orange-700 to-amber-800 border-amber-300'
          }`}
        >
          <div className="text-center max-w-2xl mx-auto">
            <span className="text-6xl mb-3 block">
              {results.percent >= 80 ? '🏆' : isPassed ? '⭐' : '💪'}
            </span>
            <h1 className="font-fun text-3xl sm:text-4xl font-black mb-2">
              {results.percent >= 80
                ? 'Uitstekend gedoen! Jy is \'n Afrikaans-Superster!'
                : isPassed
                ? 'Baie mooi gedoen! Jy het geslaag!'
                : 'Mooi probeer! Hou aan oefen!'}
            </h1>
            <p className="text-white/90 font-bold text-sm sm:text-base mb-6">
              Graad 4 CAPS Afrikaans Kurrikulum Hersieningseksamen Voltooi
            </p>

            {/* Score Big Display */}
            <div className="bg-white/15 backdrop-blur-md rounded-2xl p-6 border border-white/30 inline-block mb-6 min-w-[280px]">
              <div className="text-xs font-black uppercase tracking-wider text-white/80">
                Finale Puntsyfer
              </div>
              <div className="font-fun text-5xl sm:text-6xl font-black text-amber-300 drop-shadow-sm my-1">
                {results.earnedMarks} / {results.totalMarks}
              </div>
              <div className="text-2xl font-black text-white">
                {results.percent}%
              </div>
            </div>

            <p className="text-xs sm:text-sm text-white/90 max-w-lg mx-auto font-medium">
              Jou resultate is outomaties gestoor en kan nou in die{' '}
              <strong className="text-amber-200">Ouer & Juffrou Portaal</strong> gesien word vir
              gedetailleerde vordering.
            </p>
          </div>
        </div>

        {/* Section by Section Breakdown */}
        <div className="bg-white rounded-3xl p-6 border-3 border-amber-200 shadow-sm space-y-4">
          <h2 className="font-fun text-2xl font-black text-slate-800 flex items-center gap-2">
            <TrendingUp className="w-6 h-6 text-amber-600" />
            <span>Uitslae per CAPS Afdeling</span>
          </h2>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3">
            {Object.entries(results.breakdown).map(([secId, secData]) => {
              const secPercent = Math.round((secData.earned / secData.total) * 100);
              const colorClass =
                secPercent >= 80
                  ? 'border-emerald-300 bg-emerald-50 text-emerald-900'
                  : secPercent >= 50
                  ? 'border-amber-300 bg-amber-50 text-amber-900'
                  : 'border-rose-300 bg-rose-50 text-rose-900';

              return (
                <div key={secId} className={`p-4 rounded-2xl border-2 ${colorClass}`}>
                  <div className="flex items-center justify-between mb-1">
                    <span className="font-black text-xs uppercase tracking-wider">
                      Afdeling {secId}
                    </span>
                    <span className="font-black text-sm">
                      {secData.earned}/{secData.total}
                    </span>
                  </div>
                  <div className="font-fun font-black text-base text-slate-800 mb-2">
                    {secData.titleAf}
                  </div>
                  <div className="w-full bg-black/10 rounded-full h-2 overflow-hidden">
                    <div
                      className={`h-full rounded-full ${
                        secPercent >= 80
                          ? 'bg-emerald-500'
                          : secPercent >= 50
                          ? 'bg-amber-500'
                          : 'bg-rose-500'
                      }`}
                      style={{ width: `${secPercent}%` }}
                    />
                  </div>
                  <div className="text-right text-[11px] font-black mt-1">
                    {secPercent}%
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* PDF Download Results Banner */}
        <div className="bg-gradient-to-r from-emerald-500/10 via-teal-500/10 to-indigo-500/10 rounded-3xl p-6 border-3 border-emerald-300 shadow-sm space-y-4">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-emerald-500 to-teal-600 text-white flex items-center justify-center text-2xl shadow-md flex-shrink-0">
                🏆
              </div>
              <div>
                <span className="inline-flex items-center gap-1.5 text-xs font-black uppercase tracking-wider text-emerald-800 bg-emerald-100 px-2.5 py-0.5 rounded-full border border-emerald-300">
                  <FileDown className="w-3.5 h-3.5" />
                  Amptelike Eksamenverslae & PDF
                </span>
                <h3 className="font-fun text-xl font-black text-slate-900 mt-1">
                  Laai Jou Eksamenuitslae & Vraestel Af as PDF
                </h3>
              </div>
            </div>

            <div className="w-full sm:w-auto flex items-center gap-2 bg-white px-3 py-1.5 rounded-xl border-2 border-emerald-200">
              <span className="text-xs font-black text-slate-500 whitespace-nowrap">Leerder:</span>
              <input
                type="text"
                value={learnerName}
                onChange={(e) => setLearnerName(e.target.value)}
                placeholder="bv. Jabu / Anika"
                className="text-xs font-bold text-slate-800 focus:outline-hidden bg-transparent w-32"
              />
            </div>
          </div>

          <p className="text-xs sm:text-sm text-slate-600 font-medium leading-relaxed">
            Stoor 'n permanente PDF-afskrif van jou kind se amptelike 50-punt prestasiekaart met KABV-vlakke, afdeling-ontleding en vraag-vir-vraag nasienverslag vir die skool of ouers.
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            <button
              onClick={handleDownloadResultsReport}
              disabled={downloadStatus === 'report'}
              className="p-4 rounded-2xl bg-gradient-to-br from-emerald-600 to-teal-700 hover:from-emerald-700 hover:to-teal-800 text-white shadow-md transition-all text-left flex flex-col justify-between active:scale-98"
            >
              <div className="flex items-center justify-between mb-2">
                <span className="text-2xl">🏆</span>
                {downloadStatus === 'report' ? (
                  <Loader2 className="w-5 h-5 animate-spin text-emerald-200" />
                ) : downloadStatus === 'done-report' ? (
                  <Check className="w-5 h-5 text-emerald-200" />
                ) : (
                  <Download className="w-5 h-5 text-emerald-200" />
                )}
              </div>
              <div>
                <div className="font-fun font-black text-sm text-white">
                  {downloadStatus === 'done-report' ? 'Uitslae Afgelaai! ✓' : 'Laai Uitslae-Verslag (PDF)'}
                </div>
                <p className="text-[11px] text-emerald-100 font-medium mt-0.5">
                  Prestasiekaart, {results.earnedMarks}/{results.totalMarks} ({results.percent}%) & nasiennotas
                </p>
              </div>
            </button>

            <button
              onClick={() => handleDownloadPaper()}
              disabled={downloadStatus === 'paper'}
              className="p-4 rounded-2xl bg-white hover:bg-slate-50 border-2 border-slate-200 hover:border-amber-400 text-slate-800 shadow-sm transition-all text-left flex flex-col justify-between active:scale-98"
            >
              <div className="flex items-center justify-between mb-2">
                <span className="text-2xl">📄</span>
                {downloadStatus === 'paper' ? (
                  <Loader2 className="w-5 h-5 animate-spin text-amber-600" />
                ) : downloadStatus === 'done-paper' ? (
                  <Check className="w-5 h-5 text-emerald-600" />
                ) : (
                  <Download className="w-5 h-5 text-slate-400" />
                )}
              </div>
              <div>
                <div className="font-fun font-black text-sm text-slate-900">
                  {downloadStatus === 'done-paper' ? 'Vraestel Afgelaai! ✓' : 'Laai Leë Vraestel (PDF)'}
                </div>
                <p className="text-[11px] text-slate-500 font-medium mt-0.5">
                  Druk die leë 25 vrae uit om weer te oefen
                </p>
              </div>
            </button>

            <button
              onClick={handleDownloadMemo}
              disabled={downloadStatus === 'memo'}
              className="p-4 rounded-2xl bg-white hover:bg-slate-50 border-2 border-slate-200 hover:border-blue-400 text-slate-800 shadow-sm transition-all text-left flex flex-col justify-between active:scale-98"
            >
              <div className="flex items-center justify-between mb-2">
                <span className="text-2xl">📖</span>
                {downloadStatus === 'memo' ? (
                  <Loader2 className="w-5 h-5 animate-spin text-blue-600" />
                ) : downloadStatus === 'done-memo' ? (
                  <Check className="w-5 h-5 text-emerald-600" />
                ) : (
                  <FileText className="w-5 h-5 text-slate-400" />
                )}
              </div>
              <div>
                <div className="font-fun font-black text-sm text-slate-900">
                  {downloadStatus === 'done-memo' ? 'Memo Afgelaai! ✓' : 'Laai Memorandum (PDF)'}
                </div>
                <p className="text-[11px] text-slate-500 font-medium mt-0.5">
                  Amptelike modelantwoorde & KABV-riglyne
                </p>
              </div>
            </button>
          </div>
        </div>

        {/* Actions bar: Review memo, Parent Update, Retry */}
        <div className="bg-amber-50 rounded-3xl p-6 border-3 border-amber-300 flex flex-wrap items-center justify-between gap-4">
          <div>
            <h3 className="font-fun text-xl font-black text-amber-950">
              Wat wil jy volgende doen?
            </h3>
            <p className="text-sm font-bold text-amber-800">
              Kyk na die volledige memorandum met verduidelikings of kyk na die Ouer-opdatering.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-3">
            <button
              onClick={() => {
                sounds.playVictory();
                fireLessonCompleteConfetti();
              }}
              className="px-5 py-3 rounded-2xl bg-yellow-400 hover:bg-yellow-500 text-amber-950 font-black text-sm shadow-md flex items-center gap-2 transition-transform active:scale-95"
              title="Vier jou eksamen-uitslae met konfetti!"
            >
              <span>🎉 Skiet Konfetti!</span>
            </button>

            <button
              onClick={() => {
                sounds.playPop();
                setExamMode('memo');
              }}
              className="px-5 py-3 rounded-2xl bg-amber-500 hover:bg-amber-600 text-white font-black text-sm shadow-md flex items-center gap-2"
            >
              <FileText className="w-4 h-4" />
              <span>Sien Volledige Memorandum 📖</span>
            </button>

            {onOpenParentUpdate && (
              <button
                onClick={onOpenParentUpdate}
                className="px-5 py-3 rounded-2xl bg-indigo-600 hover:bg-indigo-700 text-white font-black text-sm shadow-md flex items-center gap-2"
              >
                <span>👨‍👩‍👧‍👦 Ouer-Opdateringsverslag</span>
              </button>
            )}

            <button
              onClick={handleRestart}
              className="px-4 py-3 rounded-2xl bg-white hover:bg-slate-100 text-slate-700 font-black text-sm border-2 border-slate-200 flex items-center gap-2"
            >
              <RotateCcw className="w-4 h-4" />
              <span>Probeer Weer</span>
            </button>
          </div>
        </div>
      </div>
    );
  }

  // =========================================================================
  // MEMO VIEW (Full Answer Key with Explanations)
  // =========================================================================
  if (examMode === 'memo') {
    return (
      <div className="space-y-6 pb-12 max-w-4xl mx-auto">
        {/* Memo Header */}
        <div className="bg-gradient-to-r from-blue-600 to-indigo-700 rounded-3xl p-6 text-white shadow-lg border-4 border-blue-300 flex flex-wrap items-center justify-between gap-4">
          <div>
            <span className="bg-white/20 text-white text-xs font-black uppercase tracking-wider px-2.5 py-0.5 rounded-full">
              Amptelike CAPS Antwoordstel
            </span>
            <h1 className="font-fun text-2xl sm:text-3xl font-black mt-1">
              Volledige Eksamen-Memorandum & Verduidelikings 📖
            </h1>
            <p className="text-blue-100 font-bold text-sm max-w-xl">
              Leer uit elke vraag! Hier is die regte antwoorde, reëls en verduidelikings vir al 25 vrae.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-2">
            <button
              onClick={handleDownloadMemo}
              disabled={downloadStatus === 'memo'}
              className="px-4 py-2.5 rounded-2xl bg-white text-blue-900 hover:bg-blue-50 font-black text-xs shadow-md flex items-center gap-2 transition-all active:scale-95"
            >
              {downloadStatus === 'memo' ? (
                <Loader2 className="w-4 h-4 animate-spin text-blue-600" />
              ) : downloadStatus === 'done-memo' ? (
                <Check className="w-4 h-4 text-emerald-600" />
              ) : (
                <Download className="w-4 h-4 text-blue-600" />
              )}
              <span>{downloadStatus === 'done-memo' ? 'Afgelaai! ✓' : 'Laai PDF Memo Af'}</span>
            </button>
            <button
              onClick={() => window.print()}
              className="px-4 py-2.5 rounded-2xl bg-white/20 hover:bg-white/30 text-white font-black text-xs border border-white/30 flex items-center gap-2"
            >
              <Printer className="w-4 h-4" />
              <span>Druk Uit</span>
            </button>
            <button
              onClick={() => setExamMode('completed')}
              className="px-4 py-2.5 rounded-2xl bg-white/20 hover:bg-white/30 text-white font-black text-xs border border-white/30"
            >
              Terug na Uitslae
            </button>
          </div>
        </div>

        {/* Section Filter */}
        <div className="flex flex-wrap items-center gap-2">
          <span className="text-xs font-black text-slate-500 uppercase">Filtreer:</span>
          {['ALL', 'A', 'B', 'C', 'D', 'E'].map((sec) => (
            <button
              key={sec}
              onClick={() => setSelectedSectionFilter(sec)}
              className={`px-3 py-1.5 rounded-xl font-black text-xs transition-all ${
                selectedSectionFilter === sec
                  ? 'bg-amber-500 text-white shadow-xs'
                  : 'bg-white text-slate-700 border border-slate-200 hover:bg-amber-50'
              }`}
            >
              {sec === 'ALL' ? 'Alle Vrae (25)' : `Afdeling ${sec}`}
            </button>
          ))}
        </div>

        {/* Questions List */}
        <div className="space-y-4">
          {REVISION_EXAM_QUESTIONS.filter(
            (q) => selectedSectionFilter === 'ALL' || q.sectionId === selectedSectionFilter
          ).map((q) => {
            const userAns = userAnswers[q.id];
            const isCorrect =
              userAns && userAns.trim().toLowerCase() === q.correctAnswer.trim().toLowerCase();

            return (
              <div
                key={q.id}
                className={`bg-white rounded-2xl p-5 border-2 ${
                  userAns ? (isCorrect ? 'border-emerald-300' : 'border-rose-300') : 'border-slate-200'
                } shadow-sm`}
              >
                <div className="flex items-start justify-between gap-3 mb-2">
                  <div className="flex items-center gap-2">
                    <span className="bg-amber-100 text-amber-900 font-black text-xs px-2.5 py-0.5 rounded-lg border border-amber-300">
                      Vraag {q.questionNumber}
                    </span>
                    <span className="text-xs font-bold text-slate-500">
                      {q.sectionTitleAf} • ({q.marks} punte)
                    </span>
                  </div>

                  {userAns ? (
                    isCorrect ? (
                      <span className="inline-flex items-center gap-1 text-emerald-600 font-black text-xs bg-emerald-50 px-2.5 py-1 rounded-full border border-emerald-200">
                        <CheckCircle className="w-3.5 h-3.5" /> Korrek ({q.marks}/{q.marks})
                      </span>
                    ) : (
                      <span className="inline-flex items-center gap-1 text-rose-600 font-black text-xs bg-rose-50 px-2.5 py-1 rounded-full border border-rose-200">
                        <XCircle className="w-3.5 h-3.5" /> Verkeerd (0/{q.marks})
                      </span>
                    )
                  ) : (
                    <span className="text-xs font-bold text-slate-400 bg-slate-100 px-2.5 py-1 rounded-full">
                      Nie beantwoord nie
                    </span>
                  )}
                </div>

                <h3 className="font-fun text-base font-black text-slate-800 mb-1">
                  {q.promptAf}
                </h3>
                <p className="text-xs font-bold text-slate-500 mb-3">
                  {q.promptEn}
                </p>

                {/* Scrambled words if applicable */}
                {q.scrambledWords && (
                  <div className="flex flex-wrap gap-2 mb-3">
                    {q.scrambledWords.map((w, idx) => (
                      <span
                        key={idx}
                        className="bg-amber-100 text-amber-950 px-2.5 py-1 rounded-lg font-black text-xs border border-amber-300"
                      >
                        {w}
                      </span>
                    ))}
                  </div>
                )}

                {/* Options with indicator */}
                {q.options && (
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 mb-3">
                    {q.options.map((opt, i) => {
                      const isThisCorrect = opt === q.correctAnswer;
                      const isThisUserAns = userAns === opt;

                      let optClass = 'bg-slate-50 border-slate-200 text-slate-700';
                      if (isThisCorrect) {
                        optClass = 'bg-emerald-50 border-emerald-400 text-emerald-900 font-black';
                      } else if (isThisUserAns && !isThisCorrect) {
                        optClass = 'bg-rose-50 border-rose-300 text-rose-800 line-through';
                      }

                      return (
                        <div
                          key={i}
                          className={`p-2.5 rounded-xl border text-xs flex items-center justify-between ${optClass}`}
                        >
                          <span>{opt}</span>
                          {isThisCorrect && (
                            <span className="text-[10px] bg-emerald-600 text-white font-black px-1.5 py-0.5 rounded-md">
                              ✓ Regte Antwoord
                            </span>
                          )}
                        </div>
                      );
                    })}
                  </div>
                )}

                {/* Explanation Box */}
                <div className="bg-amber-50/70 rounded-xl p-3 border border-amber-200 text-xs space-y-1">
                  <div className="font-black text-amber-950 flex items-center gap-1.5">
                    <HelpCircle className="w-3.5 h-3.5 text-amber-600" />
                    <span>Verduideliking & CAPS Reël:</span>
                  </div>
                  <p className="text-slate-700 leading-relaxed font-semibold">
                    {q.explanationAf}
                  </p>
                  <p className="text-slate-500 text-[11px] italic">
                    {q.explanationEn}
                  </p>
                  <div className="text-[11px] font-black text-amber-800 pt-1 border-t border-amber-200/60">
                    💡 Reël: {q.capsConcept}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    );
  }

  // =========================================================================
  // TAKING EXAM INTERFACE (Interactive 25 Questions)
  // =========================================================================
  return (
    <div className="space-y-5 pb-16 max-w-4xl mx-auto">
      {/* Top Status & Progress Bar */}
      <div className="bg-white rounded-2xl p-4 border-2 border-amber-200 shadow-sm flex flex-wrap items-center justify-between gap-3">
        <div className="flex items-center gap-2">
          <span className="text-2xl">📝</span>
          <div>
            <div className="font-fun text-sm font-black text-slate-800">
              Graad 4 CAPS Afrikaans Hersieningseksamen
            </div>
            <div className="text-xs text-amber-700 font-bold">
              {activeQuestion.sectionTitleAf} • {activeQuestion.capsStrand}
            </div>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <div className="text-right">
            <span className="text-xs font-black text-slate-700">
              Vraag {currentQuestionIndex + 1} van {totalQuestions}
            </span>
            <div className="text-[11px] font-bold text-amber-600">
              {answeredCount} beantwoord ({progressPercent}%)
            </div>
          </div>

          <button
            onClick={() => handleDownloadPaper(learnerName)}
            disabled={downloadStatus === 'paper'}
            className="text-xs font-black text-amber-800 bg-amber-100 hover:bg-amber-200 px-3 py-1.5 rounded-xl flex items-center gap-1.5 transition-colors"
            title="Laai vraestel af as PDF om op papier te voltooi"
          >
            {downloadStatus === 'paper' ? (
              <Loader2 className="w-3.5 h-3.5 animate-spin text-amber-700" />
            ) : (
              <Download className="w-3.5 h-3.5 text-amber-700" />
            )}
            <span className="hidden sm:inline">Laai PDF Vraestel Af</span>
            <span className="sm:hidden">PDF</span>
          </button>

          <button
            onClick={() => {
              if (window.confirm('Is jy seker jy wil die eksamen verlaat?')) {
                setExamMode('cover');
              }
            }}
            className="text-xs font-black text-slate-500 hover:text-slate-800 bg-slate-100 hover:bg-slate-200 px-3 py-1.5 rounded-xl"
          >
            Verlaat
          </button>
        </div>
      </div>

      {/* Progress visual bar */}
      <div className="w-full bg-slate-100 rounded-full h-2.5 overflow-hidden border border-slate-200">
        <div
          className="bg-gradient-to-r from-amber-500 to-orange-500 h-full rounded-full transition-all duration-300"
          style={{ width: `${((currentQuestionIndex + 1) / totalQuestions) * 100}%` }}
        />
      </div>

      {/* If Section A (Reading Comprehension), provide toggleable Reading Passage */}
      {activeQuestion.sectionId === 'A' && (
        <div className="bg-gradient-to-r from-amber-50 to-orange-50 rounded-2xl p-4 sm:p-5 border-2 border-amber-300 shadow-sm">
          <div className="flex items-center justify-between mb-2">
            <div className="flex items-center gap-2">
              <BookOpen className="w-4 h-4 text-amber-600" />
              <h4 className="font-fun font-black text-sm text-amber-950">
                Leesteks: {COMPREHENSION_STORY.title}
              </h4>
            </div>
            <div className="flex items-center gap-2">
              <button
                onClick={() => speakAfrikaans(COMPREHENSION_STORY.textAf)}
                className="inline-flex items-center gap-1 text-[11px] font-black bg-amber-500 hover:bg-amber-600 text-white px-2.5 py-1 rounded-lg"
              >
                <Volume2 className="w-3 h-3" /> Lees Verhaal
              </button>
              <button
                onClick={() => setShowStory(!showStory)}
                className="text-[11px] font-black text-amber-800 underline"
              >
                {showStory ? 'Versteek Teks' : 'Wys Teks'}
              </button>
            </div>
          </div>

          {showStory && (
            <div className="bg-white/80 rounded-xl p-3.5 border border-amber-200 text-xs sm:text-sm text-slate-800 leading-relaxed space-y-2 whitespace-pre-line font-medium max-h-56 overflow-y-auto">
              {COMPREHENSION_STORY.textAf}
            </div>
          )}
        </div>
      )}

      {/* Question Card */}
      <div className="bg-white rounded-3xl p-6 sm:p-8 border-3 border-amber-300 shadow-md space-y-6">
        {/* Question Header */}
        <div className="flex items-start justify-between gap-4">
          <div className="flex items-center gap-2.5">
            <span className="bg-amber-500 text-white font-fun font-black text-sm px-3 py-1 rounded-xl shadow-xs">
              Vraag {activeQuestion.questionNumber}
            </span>
            <span className="bg-amber-100 text-amber-900 font-black text-xs px-2.5 py-1 rounded-lg border border-amber-300">
              {activeQuestion.marks} Punte
            </span>
            <span className="text-xs font-bold text-slate-500 hidden sm:inline">
              Kwartaal {activeQuestion.term}
            </span>
          </div>

          <button
            onClick={() => handleReadQuestion(activeQuestion.promptAf)}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-amber-100 hover:bg-amber-200 text-amber-900 font-black text-xs transition-colors"
            title="Luister na die vraag in Afrikaans"
          >
            <Volume2 className="w-4 h-4 text-amber-700" />
            <span className="hidden sm:inline">Luister</span>
          </button>
        </div>

        {/* Prompt */}
        <div>
          <h2 className="font-fun text-xl sm:text-2xl font-black text-slate-900 mb-1 leading-snug">
            {activeQuestion.promptAf}
          </h2>
          <p className="text-sm font-bold text-amber-800">
            {activeQuestion.promptEn}
          </p>
        </div>

        {/* Scrambled Sentence Words (if type is sentence-order) */}
        {activeQuestion.scrambledWords && (
          <div className="bg-amber-50 p-4 rounded-2xl border-2 border-amber-200">
            <span className="text-xs font-black text-amber-900 block mb-2">
              Woordeblokkies om te rangskik:
            </span>
            <div className="flex flex-wrap gap-2">
              {activeQuestion.scrambledWords.map((w, i) => (
                <span
                  key={i}
                  className="bg-white text-slate-800 px-3 py-1.5 rounded-xl font-black text-sm border-2 border-amber-300 shadow-xs"
                >
                  {w}
                </span>
              ))}
            </div>
          </div>
        )}

        {/* Options */}
        {activeQuestion.options && (
          <div className="space-y-3">
            {activeQuestion.options.map((option, index) => {
              const isSelected = userAnswers[activeQuestion.id] === option;
              const letter = String.fromCharCode(65 + index); // A, B, C, D

              return (
                <button
                  key={index}
                  onClick={() => handleSelectAnswer(activeQuestion.id, option)}
                  className={`w-full text-left p-4 sm:p-4.5 rounded-2xl border-2 font-bold text-sm sm:text-base transition-all flex items-center justify-between ${
                    isSelected
                      ? 'bg-amber-500 text-white border-amber-600 shadow-md scale-[1.01]'
                      : 'bg-slate-50 hover:bg-amber-50/70 border-slate-200 hover:border-amber-300 text-slate-800'
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <span
                      className={`w-7 h-7 rounded-xl flex items-center justify-center font-black text-xs ${
                        isSelected
                          ? 'bg-white text-amber-600'
                          : 'bg-white border border-slate-300 text-slate-700'
                      }`}
                    >
                      {letter}
                    </span>
                    <span>{option}</span>
                  </div>

                  {isSelected && (
                    <CheckCircle className="w-5 h-5 text-white flex-shrink-0" />
                  )}
                </button>
              );
            })}
          </div>
        )}

        {/* Question Selector Quick Dots */}
        <div className="pt-4 border-t border-slate-100">
          <div className="text-[11px] font-black text-slate-400 uppercase tracking-wider mb-2">
            Spring na vraag:
          </div>
          <div className="flex flex-wrap gap-1.5 max-h-24 overflow-y-auto p-1">
            {REVISION_EXAM_QUESTIONS.map((q, idx) => {
              const isAns = !!userAnswers[q.id];
              const isCurr = idx === currentQuestionIndex;

              return (
                <button
                  key={q.id}
                  onClick={() => {
                    sounds.playPop();
                    setCurrentQuestionIndex(idx);
                  }}
                  className={`w-7 h-7 rounded-lg text-xs font-black transition-all ${
                    isCurr
                      ? 'ring-2 ring-amber-500 bg-amber-500 text-white font-black scale-110'
                      : isAns
                      ? 'bg-emerald-100 text-emerald-800 border border-emerald-300'
                      : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                  }`}
                >
                  {idx + 1}
                </button>
              );
            })}
          </div>
        </div>
      </div>

      {/* Navigation Footer */}
      <div className="flex items-center justify-between gap-3">
        <button
          onClick={handlePrev}
          disabled={currentQuestionIndex === 0}
          className={`px-5 py-3 rounded-2xl font-black text-sm flex items-center gap-2 border-2 transition-all ${
            currentQuestionIndex === 0
              ? 'opacity-40 cursor-not-allowed bg-slate-100 text-slate-400 border-slate-200'
              : 'bg-white hover:bg-slate-100 text-slate-700 border-slate-300 shadow-xs'
          }`}
        >
          ← Vorige Vraag
        </button>

        {currentQuestionIndex < totalQuestions - 1 ? (
          <button
            onClick={handleNext}
            className="px-6 py-3 rounded-2xl bg-amber-500 hover:bg-amber-600 text-white font-black text-sm shadow-md flex items-center gap-2 transition-transform hover:scale-105 active:scale-95"
          >
            <span>Volgende Vraag →</span>
          </button>
        ) : (
          <button
            onClick={handleSubmitExam}
            disabled={isSubmitting}
            className="px-6 py-3.5 rounded-2xl bg-gradient-to-r from-emerald-500 to-teal-600 hover:from-emerald-600 hover:to-teal-700 text-white font-black text-base shadow-lg flex items-center gap-2 transition-transform hover:scale-105 active:scale-95"
          >
            <Sparkles className="w-5 h-5 text-amber-200" />
            <span>Voltooi & Lewer In! 🎓</span>
          </button>
        )}
      </div>

      {/* Summary reminder before submitting */}
      {currentQuestionIndex === totalQuestions - 1 && answeredCount < totalQuestions && (
        <div className="bg-amber-50 rounded-2xl p-4 border border-amber-300 text-xs font-bold text-amber-900 flex items-center gap-2">
          <AlertCircle className="w-4 h-4 text-amber-600 flex-shrink-0" />
          <span>
            Let wel: Jy het nog nie al 25 vrae beantwoord nie ({answeredCount}/{totalQuestions} voltooi).
            Jy kan enige tyd op die vraagnommers klik om onbeantwoorde vrae te voltooi!
          </span>
        </div>
      )}
    </div>
  );
};
