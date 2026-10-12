import React, { useState } from 'react';
import {
  Users,
  Printer,
  CheckCircle,
  AlertTriangle,
  BookOpen,
  Star,
  Trophy,
  Award,
  FileText,
  Sparkles,
  Share2,
  Calendar,
  Send,
  Download,
  Check,
  ChevronRight,
  TrendingUp,
  Brain,
  FileDown,
  Loader2
} from 'lucide-react';
import { useProgress } from '../context/ProgressContext';
import { LESSONS_DATA } from '../data/curriculumData';
import { WORKSHEETS_DATA, PrintableWorksheet } from '../data/worksheetsData';
import { sounds } from '../utils/audio';
import {
  generateExamQuestionPaperPdf,
  generateExamMemorandumPdf,
  generateStudentExamResultsPdf
} from '../utils/examPdfGenerator';

interface ParentDashboardProps {
  onPracticeLesson: (lessonId: string) => void;
  onOpenExam?: () => void;
  onOpenPrintables?: () => void;
}

export const ParentDashboard: React.FC<ParentDashboardProps> = ({
  onPracticeLesson,
  onOpenExam,
  onOpenPrintables
}) => {
  const { progress, resetProgress, setChildName } = useProgress();
  const [activeTab, setActiveTab] = useState<'overview' | 'parentUpdate' | 'examReports' | 'worksheets'>('parentUpdate');
  const [selectedWorksheet, setSelectedWorksheet] = useState<PrintableWorksheet | null>(null);
  const [showAnswerMemo, setShowAnswerMemo] = useState(false);
  const [copiedSummary, setCopiedSummary] = useState(false);
  const [learnerName, setLearnerName] = useState(progress.childName || 'Mpho / Sarah');
  const [isEditingName, setIsEditingName] = useState(false);
  const [pdfLoading, setPdfLoading] = useState<string | null>(null);

  const handleDownloadExamPaper = () => {
    sounds.playPop();
    setPdfLoading('paper');
    setTimeout(() => {
      try {
        generateExamQuestionPaperPdf(progress.childName || learnerName || '');
        setPdfLoading(null);
      } catch (e) {
        console.error('Failed to generate exam paper PDF', e);
        setPdfLoading(null);
      }
    }, 80);
  };

  const handleDownloadExamMemo = () => {
    sounds.playPop();
    setPdfLoading('memo');
    setTimeout(() => {
      try {
        generateExamMemorandumPdf();
        setPdfLoading(null);
      } catch (e) {
        console.error('Failed to generate exam memo PDF', e);
        setPdfLoading(null);
      }
    }, 80);
  };

  const handleDownloadAttemptReport = (att: {
    score: number;
    totalMarks: number;
    percentage: number;
    date: string;
    sectionBreakdown: Record<string, { earned: number; total: number }>;
  }) => {
    sounds.playPop();
    setPdfLoading(`attempt-${att.date}`);
    setTimeout(() => {
      try {
        const breakdownWithTitles: Record<string, { earned: number; total: number; titleAf: string }> = {
          A: { earned: att.sectionBreakdown?.A?.earned || 0, total: 10, titleAf: 'Leesbegrip' },
          B: { earned: att.sectionBreakdown?.B?.earned || 0, total: 10, titleAf: 'STOMPI & Sinsbou' },
          C: { earned: att.sectionBreakdown?.C?.earned || 0, total: 10, titleAf: 'Woordsoorte' },
          D: { earned: att.sectionBreakdown?.D?.earned || 0, total: 10, titleAf: 'Morfologie' },
          E: { earned: att.sectionBreakdown?.E?.earned || 0, total: 10, titleAf: 'Tye & Ontkenning' }
        };

        generateStudentExamResultsPdf({
          studentName: progress.childName || learnerName || 'Graad 4 Leerder',
          dateStr: new Date(att.date).toLocaleDateString('af-ZA'),
          userAnswers: {},
          earnedMarks: att.score,
          totalMarks: att.totalMarks,
          percent: att.percentage,
          breakdown: breakdownWithTitles
        });
        setPdfLoading(null);
      } catch (e) {
        console.error('Failed to generate attempt report PDF', e);
        setPdfLoading(null);
      }
    }, 80);
  };

  // Calculations
  const totalLessons = LESSONS_DATA.length;
  const completedCount = progress.completedLessonIds.length;
  const progressPercent = Math.round((completedCount / totalLessons) * 100);

  const completedLessons = LESSONS_DATA.filter((l) => progress.completedLessonIds.includes(l.id));

  const totalWordsLearned = completedLessons.reduce((acc, l) => acc + l.vocabulary.length, 0);

  const scoresList = Object.values(progress.lessonScores);
  const averageScore = scoresList.length > 0
    ? Math.round(scoresList.reduce((a, b) => a + b, 0) / scoresList.length)
    : 0;

  const weakLessonObjects = LESSONS_DATA.filter((l) => progress.weakTopics.includes(l.id));

  // Exam attempts
  const examAttempts = progress.examAttempts || [];
  const latestExam = examAttempts.length > 0 ? examAttempts[0] : null;

  // Key grammar milestones achieved
  const stompiLearned = progress.completedLessonIds.includes('topic-8-sentences-stompi');
  const pluralsLearned = progress.completedLessonIds.includes('topic-10-plurals-diminutives');
  const tensesLearned = progress.completedLessonIds.includes('topic-11-tenses-past-present-future');
  const negativesLearned = progress.completedLessonIds.includes('topic-12-negatives-questions');
  const comprehensionLearned = progress.completedLessonIds.includes('topic-13-reading-comprehension');

  // Generate WhatsApp / Email friendly summary text for parents
  const generateParentSummaryText = () => {
    const dateStr = new Date().toLocaleDateString('af-ZA', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });

    let msg = `🦉 AFRIKAANS TOOL - WEEKLIKE OUER-OPDATERING\n`;
    msg += `----------------------------------------\n`;
    msg += `Leerder: ${learnerName}\n`;
    msg += `Datum: ${dateStr}\n`;
    msg += `Graad: 4 CAPS (Eerste Addisionele Taal)\n`;
    msg += `Totaal Sterre: ${progress.stars} ⭐ | Edelstene: ${progress.gems} 💎\n`;
    msg += `Reeks Opeenvolgende Dae: ${progress.streakDays} dae 🔥\n\n`;

    msg += `📚 WAT DIE KIND HIERDIE WEEK GELEER HET:\n`;
    if (completedLessons.length === 0) {
      msg += `- Pas begin met die reis! Klaarmaak van eerste groete en klanke.\n`;
    } else {
      completedLessons.slice(-5).forEach((l) => {
        msg += `• Onderwerp ${l.topicNumber}: ${l.titleAf} (${l.titleEn}) - Telling: ${progress.lessonScores[l.id] || 85}%\n`;
      });
    }

    msg += `\n🧠 KERN TAALSTRUKTURE BEMEESTER:\n`;
    if (stompiLearned) msg += `✓ STOMPI Reël (Sinsbou & Woordorde)\n`;
    if (pluralsLearned) msg += `✓ Meervoude & Verkleinwoorde (Kort klinker verdubbeling)\n`;
    if (tensesLearned) msg += `✓ Tye (Verlede tyd met "het ... ge-", Toekomende tyd met "sal")\n`;
    if (negativesLearned) msg += `✓ Dubbele Nie & Ontkennende sinne\n`;
    if (comprehensionLearned) msg += `✓ Leesbegrip en storie-ontleding\n`;
    if (!stompiLearned && !pluralsLearned && !tensesLearned) {
      msg += `• Aan die bou aan basiese woordeskat en uitspraak!\n`;
    }

    if (latestExam) {
      msg += `\n📝 HIERDIE WEEK SE EKSAMEN-UITSLAE:\n`;
      msg += `Punt: ${latestExam.score} / ${latestExam.totalMarks} (${latestExam.percentage}%)\n`;
      msg += `Status: ${latestExam.passed ? 'GESLAAG MET LOF! 🌟' : 'Bly Oefen 💪'}\n`;
    }

    if (weakLessonObjects.length > 0) {
      msg += `\n💡 AANDAG-AREAS VIR VOLGENDE WEEK:\n`;
      weakLessonObjects.forEach((w) => {
        msg += `! ${w.titleAf} (${w.titleEn})\n`;
      });
    } else {
      msg += `\n🌟 GEEN SWAK AREAS NIE: Doen uitstekend in alle toetse!\n`;
    }

    msg += `\nOllie se Wenk: Gesels elke dag 5 minute Afrikaans by die etenstafel! 🦉`;
    return msg;
  };

  const handleCopySummary = () => {
    sounds.playPop();
    const text = generateParentSummaryText();
    navigator.clipboard.writeText(text);
    setCopiedSummary(true);
    setTimeout(() => setCopiedSummary(false), 3000);
  };

  const handleSaveName = () => {
    sounds.playPop();
    setChildName(learnerName);
    setIsEditingName(false);
  };

  const handlePrint = () => {
    sounds.playPop();
    window.print();
  };

  return (
    <div className="space-y-6 pb-14 max-w-5xl mx-auto">
      {/* Top Banner */}
      <div className="bg-gradient-to-r from-indigo-600 via-purple-700 to-indigo-800 rounded-3xl p-6 sm:p-8 text-white shadow-lg border-3 border-indigo-400 no-print">
        <div className="flex flex-wrap items-center justify-between gap-4">
          <div>
            <div className="inline-flex items-center gap-2 bg-white/20 backdrop-blur-xs text-white text-xs font-black uppercase tracking-wider px-3 py-1 rounded-full border border-white/30 mb-2">
              <Users className="w-3.5 h-3.5" />
              Ouer & Onderwyser Opdateringsportaal
            </div>
            <h1 className="font-fun text-2xl sm:text-4xl font-black">
              Wat Het Jou Kind Geleer? 👨‍👩‍👧‍👦
            </h1>
            <p className="text-indigo-200 font-bold text-sm sm:text-base max-w-2xl mt-1">
              Volledige CAPS-vorderingsverslag, weeklikse eksamenuitslae, woordeskatontleding,
              en direkte terugvoer om tuis te ondersteun.
            </p>
          </div>

          {/* Child Profile Box */}
          <div className="bg-white/10 backdrop-blur-sm p-4 rounded-2xl border border-white/20 text-right min-w-[200px]">
            <span className="text-[11px] uppercase font-black text-indigo-200 block">
              Leerder Profiel:
            </span>
            {isEditingName ? (
              <div className="flex items-center gap-2 mt-1">
                <input
                  type="text"
                  value={learnerName}
                  onChange={(e) => setLearnerName(e.target.value)}
                  className="bg-white text-slate-900 font-bold px-2 py-1 rounded-lg text-sm w-32"
                  placeholder="Naam"
                />
                <button
                  onClick={handleSaveName}
                  className="bg-indigo-500 hover:bg-indigo-600 text-white px-2 py-1 rounded-lg text-xs font-black"
                >
                  Stoor
                </button>
              </div>
            ) : (
              <div className="flex items-center justify-end gap-2 mt-1">
                <p className="font-fun text-lg font-black text-white">
                  {learnerName}
                </p>
                <button
                  onClick={() => setIsEditingName(true)}
                  className="text-[11px] underline text-indigo-200 hover:text-white"
                >
                  Wysig
                </button>
              </div>
            )}
            <span className="text-xs font-bold text-indigo-100">
              {progress.languageTrack === 'FAL' ? 'Graad 4 Afrikaans (FAL)' : 'Graad 4 Huistaal (HL)'}
            </span>
          </div>
        </div>
      </div>

      {/* Subnavigation Bar */}
      <div className="flex flex-wrap items-center gap-2 border-b-2 border-indigo-100 pb-3 no-print">
        <button
          onClick={() => {
            sounds.playPop();
            setActiveTab('parentUpdate');
          }}
          className={`flex items-center gap-2 px-4 py-2.5 rounded-2xl font-black text-sm transition-all ${
            activeTab === 'parentUpdate'
              ? 'bg-indigo-600 text-white shadow-md'
              : 'bg-white text-slate-700 hover:bg-indigo-50 border border-slate-200'
          }`}
        >
          <Sparkles className="w-4 h-4" />
          <span>Weeklikse Ouer-Opdatering (Wat die Kind Geleer Het)</span>
        </button>

        <button
          onClick={() => {
            sounds.playPop();
            setActiveTab('examReports');
          }}
          className={`flex items-center gap-2 px-4 py-2.5 rounded-2xl font-black text-sm transition-all ${
            activeTab === 'examReports'
              ? 'bg-indigo-600 text-white shadow-md'
              : 'bg-white text-slate-700 hover:bg-indigo-50 border border-slate-200'
          }`}
        >
          <Award className="w-4 h-4" />
          <span>Eksamen & Toets Verslae ({examAttempts.length})</span>
        </button>

        <button
          onClick={() => {
            sounds.playPop();
            setActiveTab('overview');
          }}
          className={`flex items-center gap-2 px-4 py-2.5 rounded-2xl font-black text-sm transition-all ${
            activeTab === 'overview'
              ? 'bg-indigo-600 text-white shadow-md'
              : 'bg-white text-slate-700 hover:bg-indigo-50 border border-slate-200'
          }`}
        >
          <TrendingUp className="w-4 h-4" />
          <span>Statistieke & Swak Areas</span>
        </button>

        <button
          onClick={() => {
            sounds.playPop();
            setActiveTab('worksheets');
          }}
          className={`flex items-center gap-2 px-4 py-2.5 rounded-2xl font-black text-sm transition-all ${
            activeTab === 'worksheets'
              ? 'bg-indigo-600 text-white shadow-md'
              : 'bg-white text-slate-700 hover:bg-indigo-50 border border-slate-200'
          }`}
        >
          <Printer className="w-4 h-4" />
          <span>Drukbare Werkkaarte</span>
        </button>
      </div>

      {/* ========================================================================= */}
      {/* TAB 1: WEEKLY PARENT UPDATE REPORT (WHAT THE CHILD LEARNT)                */}
      {/* ========================================================================= */}
      {activeTab === 'parentUpdate' && (
        <div className="space-y-6">
          {/* Action Bar for Parents */}
          <div className="bg-amber-50 rounded-2xl p-4 sm:p-5 border-2 border-amber-300 flex flex-wrap items-center justify-between gap-4 no-print">
            <div className="flex items-center gap-3">
              <span className="text-3xl">📱</span>
              <div>
                <h3 className="font-fun text-lg font-black text-amber-950">
                  Deel hierdie verslag met Ouer / Onderwyser
                </h3>
                <p className="text-xs text-amber-800 font-bold">
                  Kopieer as 'n WhatsApp / E-pos opsomming of druk 'n formele A4 CAPS sertifikaat uit.
                </p>
              </div>
            </div>

            <div className="flex flex-wrap items-center gap-2.5">
              <button
                onClick={handleCopySummary}
                className="px-4 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-black text-xs shadow-md flex items-center gap-2 transition-transform active:scale-95"
              >
                {copiedSummary ? <Check className="w-4 h-4" /> : <Share2 className="w-4 h-4" />}
                <span>{copiedSummary ? 'Gekopieer vir WhatsApp! ✓' : 'Kopieer vir WhatsApp / E-pos'}</span>
              </button>

              <button
                onClick={handlePrint}
                className="px-4 py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white font-black text-xs shadow-md flex items-center gap-2"
              >
                <Printer className="w-4 h-4" />
                <span>Druk A4 Verslag</span>
              </button>
            </div>
          </div>

          {/* Clean Printable A4 Sheet */}
          <div className="bg-white rounded-3xl p-6 sm:p-9 border-2 border-slate-300 shadow-sm space-y-6 print:border-none print:shadow-none">
            {/* Report Header */}
            <div className="border-b-2 border-slate-900 pb-5">
              <div className="flex flex-wrap items-center justify-between gap-3 text-xs font-bold text-slate-500 uppercase tracking-wider mb-2">
                <span>Departement van Basiese Onderwys • CAPS Graad 4</span>
                <span>Uitgereik: {new Date().toLocaleDateString('af-ZA')}</span>
              </div>
              <div className="flex items-center justify-between">
                <div>
                  <h2 className="font-fun text-2xl sm:text-3xl font-black text-slate-900">
                    Weeklikse Leer- en Vorderingsverslag
                  </h2>
                  <p className="text-sm font-bold text-indigo-700">
                    Afrikaans Eerste Addisionele Taal (FAL) • Leerder: <span className="underline">{learnerName}</span>
                  </p>
                </div>
                <div className="text-right hidden sm:block">
                  <span className="text-3xl">🦉</span>
                  <div className="text-[11px] font-black text-slate-400">Ollie Afrikaans Tool</div>
                </div>
              </div>
            </div>

            {/* Quick Metrics Bar */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 bg-slate-50 p-4 rounded-2xl border border-slate-200">
              <div>
                <span className="text-[11px] font-black uppercase text-slate-500">Lesse Voltooi:</span>
                <div className="font-fun text-xl font-black text-slate-900">
                  {completedCount} / {totalLessons} ({progressPercent}%)
                </div>
              </div>
              <div>
                <span className="text-[11px] font-black uppercase text-slate-500">Woorde Aangeleer:</span>
                <div className="font-fun text-xl font-black text-sky-700">
                  {totalWordsLearned} woorde
                </div>
              </div>
              <div>
                <span className="text-[11px] font-black uppercase text-slate-500">Opeenvolgende Dae:</span>
                <div className="font-fun text-xl font-black text-orange-600">
                  {progress.streakDays} dae 🔥
                </div>
              </div>
              <div>
                <span className="text-[11px] font-black uppercase text-slate-500">Gemiddelde Toetspunt:</span>
                <div className="font-fun text-xl font-black text-emerald-700">
                  {averageScore}% ⭐
                </div>
              </div>
            </div>

            {/* What the Child Learnt Detailed Breakdown */}
            <div className="space-y-4">
              <h3 className="font-fun text-lg font-black text-slate-900 flex items-center gap-2">
                <BookOpen className="w-5 h-5 text-indigo-600" />
                <span>1. Spesifieke Afrikaanse Onderwerpe Wat Aangeleer Is</span>
              </h3>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                {LESSONS_DATA.slice(0, 8).map((lesson) => {
                  const isDone = progress.completedLessonIds.includes(lesson.id);
                  const score = progress.lessonScores[lesson.id];

                  return (
                    <div
                      key={lesson.id}
                      className={`p-3.5 rounded-2xl border ${
                        isDone
                          ? 'border-emerald-300 bg-emerald-50/60'
                          : 'border-slate-200 bg-slate-50/50 opacity-70'
                      } flex items-start justify-between gap-3`}
                    >
                      <div>
                        <div className="flex items-center gap-1.5 mb-1">
                          <span className="text-base">{lesson.icon}</span>
                          <span className="font-fun font-bold text-sm text-slate-900">
                            {lesson.titleAf}
                          </span>
                        </div>
                        <p className="text-xs text-slate-600 font-semibold mb-1">
                          {lesson.titleEn}
                        </p>
                        <p className="text-[11px] text-slate-500 line-clamp-1">
                          📌 CAPS: {lesson.capsTopic}
                        </p>
                      </div>

                      <div className="text-right shrink-0">
                        {isDone ? (
                          <>
                            <span className="inline-flex items-center gap-1 text-[11px] font-black text-emerald-700 bg-emerald-100 px-2 py-0.5 rounded-full">
                              <CheckCircle className="w-3 h-3" /> Voltooi
                            </span>
                            <div className="text-xs font-black text-emerald-900 mt-1">
                              {score ? `${score}%` : '100%'}
                            </div>
                          </>
                        ) : (
                          <span className="text-[11px] font-bold text-slate-400 bg-slate-100 px-2 py-0.5 rounded-full">
                            Nog nie voltooi
                          </span>
                        )}
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Core Grammar Milestones */}
            <div className="space-y-3 pt-2 border-t border-slate-200">
              <h3 className="font-fun text-lg font-black text-slate-900 flex items-center gap-2">
                <Brain className="w-5 h-5 text-indigo-600" />
                <span>2. Kern CAPS Taalstrukture en Reëls Bemeester</span>
              </h3>

              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3">
                <div
                  className={`p-3.5 rounded-2xl border ${
                    stompiLearned
                      ? 'border-emerald-300 bg-emerald-50 text-emerald-950'
                      : 'border-amber-200 bg-amber-50 text-amber-950'
                  }`}
                >
                  <div className="flex items-center justify-between mb-1">
                    <span className="font-black text-xs uppercase">Sinsbou: STOMPI</span>
                    <span>{stompiLearned ? '✅' : '⏳'}</span>
                  </div>
                  <p className="text-xs leading-relaxed">
                    <strong>Reël:</strong> Onderwerp, Werkwoord 1, Tyd, Voorwerp, Wyse, Plek, Werkwoord 2.
                  </p>
                  <p className="text-[11px] text-slate-500 mt-1">
                    {stompiLearned ? 'Leerder verstaan die goue volgorde.' : 'Word tans ingeoefen.'}
                  </p>
                </div>

                <div
                  className={`p-3.5 rounded-2xl border ${
                    pluralsLearned
                      ? 'border-emerald-300 bg-emerald-50 text-emerald-950'
                      : 'border-amber-200 bg-amber-50 text-amber-950'
                  }`}
                >
                  <div className="flex items-center justify-between mb-1">
                    <span className="font-black text-xs uppercase">Meervoude & Verkleining</span>
                    <span>{pluralsLearned ? '✅' : '⏳'}</span>
                  </div>
                  <p className="text-xs leading-relaxed">
                    <strong>Reël:</strong> Kort klinkers verdubbel (katte); lang klinkers verloor een (bome).
                  </p>
                  <p className="text-[11px] text-slate-500 mt-1">
                    {pluralsLearned ? 'Morfologie reëls bemeester.' : 'Bemoedig verdubbelingsreël.'}
                  </p>
                </div>

                <div
                  className={`p-3.5 rounded-2xl border ${
                    tensesLearned
                      ? 'border-emerald-300 bg-emerald-50 text-emerald-950'
                      : 'border-amber-200 bg-amber-50 text-amber-950'
                  }`}
                >
                  <div className="flex items-center justify-between mb-1">
                    <span className="font-black text-xs uppercase">Tye van die Werkwoord</span>
                    <span>{tensesLearned ? '✅' : '⏳'}</span>
                  </div>
                  <p className="text-xs leading-relaxed">
                    <strong>Reël:</strong> Verlede tyd: <em>het ... ge-</em>; Toekomende tyd: <em>sal ...</em>
                  </p>
                  <p className="text-[11px] text-slate-500 mt-1">
                    {tensesLearned ? 'Tye korrek toegepas.' : 'Oefen met daaglikse sinne.'}
                  </p>
                </div>
              </div>
            </div>

            {/* Latest Revision Exam Snapshot */}
            {latestExam ? (
              <div className="bg-gradient-to-r from-emerald-50 to-teal-50 rounded-2xl p-4 sm:p-5 border-2 border-emerald-300 space-y-2">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Award className="w-5 h-5 text-emerald-600" />
                    <h4 className="font-fun text-base font-black text-emerald-950">
                      3. Onlangse Hersieningseksamen Uitslag
                    </h4>
                  </div>
                  <span className="bg-emerald-600 text-white font-black text-xs px-3 py-1 rounded-full">
                    {latestExam.passed ? 'GESLAAG' : 'AANDAG'}
                  </span>
                </div>

                <div className="flex flex-wrap items-center justify-between gap-3 text-xs sm:text-sm font-bold text-slate-800">
                  <div>
                    Puntsyfer: <span className="text-emerald-700 font-black text-base">{latestExam.score} / {latestExam.totalMarks}</span> ({latestExam.percentage}%)
                  </div>
                  <div>
                    Afgelê op: {new Date(latestExam.date).toLocaleDateString('af-ZA')}
                  </div>
                </div>

                <div className="grid grid-cols-2 sm:grid-cols-5 gap-2 pt-2 text-xs">
                  {Object.entries(latestExam.sectionBreakdown).map(([sec, val]) => (
                    <div key={sec} className="bg-white/90 p-2 rounded-xl border border-emerald-200 text-center">
                      <span className="font-black text-slate-500 uppercase text-[10px]">Afd. {sec}</span>
                      <div className="font-fun font-bold text-slate-900">{val.earned}/{val.total}</div>
                    </div>
                  ))}
                </div>

                {/* PDF Download options for parents */}
                <div className="flex flex-wrap items-center justify-between gap-2 pt-3 border-t border-emerald-200/80">
                  <span className="text-xs font-black text-emerald-900 flex items-center gap-1.5">
                    <FileDown className="w-3.5 h-3.5 text-emerald-700" />
                    <span>Aflaaibare KABV PDF Dokumente:</span>
                  </span>
                  <div className="flex flex-wrap items-center gap-2">
                    <button
                      onClick={handleDownloadExamPaper}
                      disabled={pdfLoading === 'paper'}
                      className="px-3 py-1.5 rounded-xl bg-white hover:bg-emerald-100 text-emerald-900 border border-emerald-300 font-black text-xs flex items-center gap-1.5 shadow-2xs transition-all active:scale-95"
                    >
                      {pdfLoading === 'paper' ? (
                        <Loader2 className="w-3.5 h-3.5 animate-spin" />
                      ) : (
                        <Download className="w-3.5 h-3.5 text-emerald-700" />
                      )}
                      <span>Laai Vraestel Af (PDF)</span>
                    </button>
                    <button
                      onClick={handleDownloadExamMemo}
                      disabled={pdfLoading === 'memo'}
                      className="px-3 py-1.5 rounded-xl bg-white hover:bg-emerald-100 text-emerald-900 border border-emerald-300 font-black text-xs flex items-center gap-1.5 shadow-2xs transition-all active:scale-95"
                    >
                      {pdfLoading === 'memo' ? (
                        <Loader2 className="w-3.5 h-3.5 animate-spin" />
                      ) : (
                        <FileText className="w-3.5 h-3.5 text-emerald-700" />
                      )}
                      <span>Laai Memo Af (PDF)</span>
                    </button>
                  </div>
                </div>
              </div>
            ) : (
              <div className="bg-amber-50 rounded-2xl p-4 sm:p-5 border border-amber-300 space-y-3">
                <div className="flex flex-wrap items-center justify-between gap-3">
                  <div className="text-xs text-amber-900 max-w-xl">
                    <strong>Eksamen nog nie aanlyn afgelê nie:</strong> Moedig die leerder aan om die 50-punt
                    Graad 4 CAPS Hersieningseksamen te skryf, of laai die vraestel af as PDF om op papier te voltooi!
                  </div>
                  {onOpenExam && (
                    <button
                      onClick={onOpenExam}
                      className="bg-amber-500 hover:bg-amber-600 text-white font-black text-xs px-3.5 py-2 rounded-xl whitespace-nowrap shadow-xs"
                    >
                      Skryf Eksamen Nou →
                    </button>
                  )}
                </div>
                <div className="flex flex-wrap items-center gap-2 pt-2 border-t border-amber-200">
                  <span className="text-xs font-black text-amber-900">Laai af as PDF:</span>
                  <button
                    onClick={handleDownloadExamPaper}
                    disabled={pdfLoading === 'paper'}
                    className="px-3 py-1.5 rounded-xl bg-white hover:bg-amber-100 text-amber-900 border border-amber-300 font-black text-xs flex items-center gap-1.5 shadow-2xs transition-all active:scale-95"
                  >
                    {pdfLoading === 'paper' ? (
                      <Loader2 className="w-3.5 h-3.5 animate-spin" />
                    ) : (
                      <Download className="w-3.5 h-3.5 text-amber-700" />
                    )}
                    <span>Laai Leë Vraestel Af (PDF)</span>
                  </button>
                  <button
                    onClick={handleDownloadExamMemo}
                    disabled={pdfLoading === 'memo'}
                    className="px-3 py-1.5 rounded-xl bg-white hover:bg-amber-100 text-amber-900 border border-amber-300 font-black text-xs flex items-center gap-1.5 shadow-2xs transition-all active:scale-95"
                  >
                    {pdfLoading === 'memo' ? (
                      <Loader2 className="w-3.5 h-3.5 animate-spin" />
                    ) : (
                      <FileText className="w-3.5 h-3.5 text-amber-700" />
                    )}
                    <span>Laai Memo Af (PDF)</span>
                  </button>
                </div>
              </div>
            )}

            {/* Parent Support Guide for Home */}
            <div className="bg-indigo-50/70 rounded-2xl p-4 sm:p-5 border border-indigo-200 space-y-2">
              <h4 className="font-fun text-sm font-black text-indigo-950 uppercase tracking-wider flex items-center gap-1.5">
                <span>💡 Wenke vir Ouers Tuis (Hoe om te help):</span>
              </h4>
              <ul className="text-xs text-slate-700 space-y-1.5 font-medium list-disc list-inside">
                <li>
                  <strong>STOMPI by die huis:</strong> Vra jou kind om 'n sin te maak oor wat hulle vandag gedoen het (bv. <em>"Ek [S] het [V1] vandag [T] rugby [O] by die skool [P] gespeel [V2]."</em>).
                </li>
                <li>
                  <strong>Luister na die klank:</strong> Moedig die kind aan om op die luidspreker-knoppie te klik om Suid-Afrikaanse uitspraak te hoor.
                </li>
                <li>
                  <strong>Positiewe aanmoediging:</strong> Vier elke ster en edelsteen wat verdien word!
                </li>
              </ul>
            </div>

            {/* Teacher / Parent Sign-off */}
            <div className="grid grid-cols-2 gap-8 pt-6 border-t border-slate-300 text-xs text-slate-600">
              <div>
                <p className="font-bold">Handtekening van Ouer / Voog:</p>
                <div className="border-b border-slate-400 mt-6" />
              </div>
              <div>
                <p className="font-bold">Onderwyser Opmerking:</p>
                <div className="border-b border-slate-400 mt-6" />
              </div>
            </div>
          </div>
        </div>
      )}

      {/* ========================================================================= */}
      {/* TAB 2: EXAM REPORTS & HISTORY                                             */}
      {/* ========================================================================= */}
      {activeTab === 'examReports' && (
        <div className="space-y-6">
          <div className="bg-white rounded-3xl p-6 border-2 border-slate-200 shadow-sm space-y-4">
            <div className="flex flex-wrap items-center justify-between gap-3 border-b border-slate-100 pb-3">
              <div>
                <h2 className="font-fun text-xl font-black text-slate-900">
                  Graad 4 CAPS Hersieningseksamen Geskiedenis
                </h2>
                <p className="text-xs text-slate-500 font-medium">
                  Volledige logboek van alle eksamens wat die kind geskryf het.
                </p>
              </div>

              {onOpenExam && (
                <button
                  onClick={onOpenExam}
                  className="bg-amber-500 hover:bg-amber-600 text-white font-fun font-black px-4 py-2.5 rounded-xl text-xs sm:text-sm shadow-md flex items-center gap-2"
                >
                  <span>Skryf Nuwe Eksamen (50 Punte) 🚀</span>
                </button>
              )}
            </div>

            {/* Quick PDF download strip */}
            <div className="bg-slate-50 border border-slate-200 rounded-2xl p-3.5 flex flex-wrap items-center justify-between gap-3">
              <div className="flex items-center gap-2">
                <FileDown className="w-4 h-4 text-indigo-600" />
                <span className="text-xs font-black text-slate-800">
                  Laai die Graad 4 CAPS Hersieningseksamen af as PDF:
                </span>
              </div>
              <div className="flex flex-wrap items-center gap-2">
                <button
                  onClick={handleDownloadExamPaper}
                  disabled={pdfLoading === 'paper'}
                  className="px-3 py-1.5 rounded-xl bg-white hover:bg-slate-100 text-slate-800 border border-slate-300 font-black text-xs flex items-center gap-1.5 shadow-2xs transition-all active:scale-95"
                >
                  {pdfLoading === 'paper' ? <Loader2 className="w-3.5 h-3.5 animate-spin" /> : <Download className="w-3.5 h-3.5 text-amber-600" />}
                  <span>Laai Vraestel Af (PDF)</span>
                </button>
                <button
                  onClick={handleDownloadExamMemo}
                  disabled={pdfLoading === 'memo'}
                  className="px-3 py-1.5 rounded-xl bg-white hover:bg-slate-100 text-slate-800 border border-slate-300 font-black text-xs flex items-center gap-1.5 shadow-2xs transition-all active:scale-95"
                >
                  {pdfLoading === 'memo' ? <Loader2 className="w-3.5 h-3.5 animate-spin" /> : <FileText className="w-3.5 h-3.5 text-blue-600" />}
                  <span>Laai Memo Af (PDF)</span>
                </button>
              </div>
            </div>

            {examAttempts.length === 0 ? (
              <div className="text-center py-10 text-slate-400 space-y-3">
                <span className="text-5xl">📝</span>
                <p className="font-fun font-bold text-slate-600">
                  Daar is nog geen eksamenuitslae aangeteken nie.
                </p>
                <p className="text-xs text-slate-500 max-w-sm mx-auto">
                  Laat jou kind die 25-vraag hersieningseksamen skryf om 'n formele verslag te genereer!
                </p>
                {onOpenExam && (
                  <button
                    onClick={onOpenExam}
                    className="bg-indigo-600 hover:bg-indigo-700 text-white font-black text-xs px-5 py-2.5 rounded-xl shadow-xs"
                  >
                    Gaan na Eksamen
                  </button>
                )}
              </div>
            ) : (
              <div className="space-y-3">
                {examAttempts.map((att, idx) => (
                  <div
                    key={idx}
                    className="p-4 rounded-2xl border-2 border-slate-200 hover:border-indigo-300 bg-white transition-all space-y-3"
                  >
                    <div className="flex flex-wrap items-center justify-between gap-3">
                      <div>
                        <span className="text-xs font-black uppercase text-indigo-700 bg-indigo-50 px-2 py-0.5 rounded-md border border-indigo-200">
                          Poging #{examAttempts.length - idx}
                        </span>
                        <div className="font-fun text-lg font-black text-slate-900 mt-1">
                          Puntsyfer: {att.score} / {att.totalMarks} ({att.percentage}%)
                        </div>
                        <span className="text-xs text-slate-400">
                          Datum: {new Date(att.date).toLocaleString('af-ZA')}
                        </span>
                      </div>

                      <div className="flex items-center gap-2">
                        <button
                          onClick={() => handleDownloadAttemptReport(att)}
                          disabled={pdfLoading === `attempt-${att.date}`}
                          className="px-2.5 py-1 rounded-lg bg-indigo-50 hover:bg-indigo-100 text-indigo-800 border border-indigo-200 font-black text-xs flex items-center gap-1 transition-all active:scale-95"
                          title="Laai amptelike KABV resultateverslag af as PDF"
                        >
                          {pdfLoading === `attempt-${att.date}` ? (
                            <Loader2 className="w-3 h-3 animate-spin" />
                          ) : (
                            <Download className="w-3 h-3 text-indigo-600" />
                          )}
                          <span>Laai Verslag (PDF)</span>
                        </button>
                        <span
                          className={`px-3 py-1 rounded-full text-xs font-black ${
                            att.passed
                              ? 'bg-emerald-100 text-emerald-900 border border-emerald-300'
                              : 'bg-rose-100 text-rose-900 border border-rose-300'
                          }`}
                        >
                          {att.passed ? '✓ Geslaag' : 'Herprobeer'}
                        </span>
                      </div>
                    </div>

                    {/* Section Breakdown Mini Bar */}
                    <div className="grid grid-cols-2 sm:grid-cols-5 gap-2 pt-2 border-t border-slate-100 text-xs">
                      {Object.entries(att.sectionBreakdown).map(([sec, val]) => (
                        <div key={sec} className="bg-slate-50 p-2 rounded-xl text-center">
                          <span className="text-[10px] font-black text-slate-400 block uppercase">
                            Afdeling {sec}
                          </span>
                          <span className="font-bold text-slate-800">
                            {val.earned} / {val.total}
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      )}

      {/* ========================================================================= */}
      {/* TAB 3: OVERVIEW STATS & WEAK AREAS                                        */}
      {/* ========================================================================= */}
      {activeTab === 'overview' && (
        <div className="space-y-6">
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

          {/* Weak Areas Section */}
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
        </div>
      )}

      {/* ========================================================================= */}
      {/* TAB 4: PRINTABLE CAPS WORKSHEETS                                          */}
      {/* ========================================================================= */}
      {activeTab === 'worksheets' && (
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

            {onOpenPrintables && (
              <button
                onClick={onOpenPrintables}
                className="bg-amber-500 hover:bg-amber-600 text-white font-fun font-black px-4 py-2 rounded-xl text-xs sm:text-sm shadow-sm flex items-center gap-1.5 transition-transform active:scale-95"
              >
                <span>🖨️ Studiegidse & Flitskaarte Sentrum →</span>
              </button>
            )}
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

              {/* Actual Printable Page content */}
              <div className="bg-white p-6 sm:p-8 rounded-2xl border border-slate-300 shadow-sm print:border-none print:shadow-none space-y-6">
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

                <div className="bg-amber-50 p-3.5 rounded-xl border border-amber-200 text-xs font-semibold text-amber-950 space-y-1">
                  <p><strong>Instruksies:</strong> {selectedWorksheet.instructionsAf}</p>
                  <p className="text-slate-600 italic">({selectedWorksheet.instructionsEn})</p>
                </div>

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
      )}

      {/* Reset Progress Section */}
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
