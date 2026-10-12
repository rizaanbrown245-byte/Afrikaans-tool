import React, { useState, useMemo } from 'react';
import {
  Printer,
  Download,
  FileText,
  Scissors,
  CheckCircle,
  Lock,
  Star,
  Sparkles,
  BookOpen,
  Search,
  Filter,
  Eye,
  X,
  Volume2,
  Loader2,
  Check,
  FolderDown,
  Layers,
  HelpCircle,
  ExternalLink
} from 'lucide-react';
import { useProgress } from '../context/ProgressContext';
import { LESSONS_DATA } from '../data/curriculumData';
import { LessonContent, VocabWord } from '../types';
import {
  generateLessonStudyGuidePdf,
  generateLessonFlashcardsPdf,
  generateMasterStudyGuideBundlePdf,
  generateMasterFlashcardsBundlePdf
} from '../utils/printablesPdfGenerator';
import { speakAfrikaans, sounds } from '../utils/audio';
import { fireLessonCompleteConfetti } from '../utils/confetti';

interface PrintablesSectionProps {
  onOpenLesson?: (lessonId: string) => void;
}

export const PrintablesSection: React.FC<PrintablesSectionProps> = ({ onOpenLesson }) => {
  const { progress, setChildName } = useProgress();

  const [activeFilter, setActiveFilter] = useState<'completed' | 'all'>('completed');
  const [categoryFilter, setCategoryFilter] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [learnerName, setLearnerName] = useState(progress.childName || 'Mpho / Sarah');
  const [isEditingName, setIsEditingName] = useState(false);
  const [downloadingId, setDownloadingId] = useState<string | null>(null);
  const [previewLesson, setPreviewLesson] = useState<LessonContent | null>(null);
  const [previewTab, setPreviewTab] = useState<'guide' | 'flashcards'>('flashcards');

  const completedLessonCount = progress.completedLessonIds.length;

  // Filter lessons based on progress, category, and search query
  const filteredLessons = useMemo(() => {
    return LESSONS_DATA.filter((lesson) => {
      const isCompleted = progress.completedLessonIds.includes(lesson.id);

      // Progress filter
      if (activeFilter === 'completed' && !isCompleted && completedLessonCount > 0) {
        return false;
      }

      // Category filter
      if (categoryFilter !== 'all' && lesson.category !== categoryFilter) {
        return false;
      }

      // Search query
      if (searchQuery.trim()) {
        const query = searchQuery.toLowerCase();
        const matchTitle = lesson.titleAf.toLowerCase().includes(query) || lesson.titleEn.toLowerCase().includes(query);
        const matchCaps = lesson.capsTopic.toLowerCase().includes(query);
        const matchVocab = lesson.vocabulary.some(
          (v) => v.afrikaans.toLowerCase().includes(query) || v.english.toLowerCase().includes(query)
        );
        return matchTitle || matchCaps || matchVocab;
      }

      return true;
    });
  }, [activeFilter, categoryFilter, searchQuery, progress.completedLessonIds, completedLessonCount]);

  // Lessons that qualify for bundle download
  const completedLessonsList = useMemo(() => {
    return LESSONS_DATA.filter((l) => progress.completedLessonIds.includes(l.id));
  }, [progress.completedLessonIds]);

  const handleDownloadStudyGuide = (lesson: LessonContent) => {
    sounds.playPop();
    setDownloadingId(`guide-${lesson.id}`);
    setTimeout(() => {
      try {
        generateLessonStudyGuidePdf(lesson, learnerName);
        setDownloadingId(null);
      } catch (err) {
        console.error('Failed to generate study guide PDF', err);
        setDownloadingId(null);
      }
    }, 100);
  };

  const handleDownloadFlashcards = (lesson: LessonContent) => {
    sounds.playPop();
    setDownloadingId(`flash-${lesson.id}`);
    setTimeout(() => {
      try {
        generateLessonFlashcardsPdf(lesson, learnerName);
        setDownloadingId(null);
      } catch (err) {
        console.error('Failed to generate flashcards PDF', err);
        setDownloadingId(null);
      }
    }, 100);
  };

  const handleDownloadMasterStudyGuides = () => {
    const list = completedLessonsList.length > 0 ? completedLessonsList : LESSONS_DATA.slice(0, 5);
    sounds.playVictory();
    fireLessonCompleteConfetti();
    setDownloadingId('master-guides');
    setTimeout(() => {
      try {
        generateMasterStudyGuideBundlePdf(list, learnerName);
        setDownloadingId(null);
      } catch (err) {
        console.error('Failed to generate master study guide bundle', err);
        setDownloadingId(null);
      }
    }, 120);
  };

  const handleDownloadMasterFlashcards = () => {
    const list = completedLessonsList.length > 0 ? completedLessonsList : LESSONS_DATA.slice(0, 5);
    sounds.playVictory();
    fireLessonCompleteConfetti();
    setDownloadingId('master-flash');
    setTimeout(() => {
      try {
        generateMasterFlashcardsBundlePdf(list, learnerName);
        setDownloadingId(null);
      } catch (err) {
        console.error('Failed to generate master flashcard bundle', err);
        setDownloadingId(null);
      }
    }, 120);
  };

  const handleSaveName = () => {
    if (learnerName.trim()) {
      setChildName(learnerName.trim());
      setIsEditingName(false);
      sounds.playPop();
    }
  };

  return (
    <div className="space-y-6 pb-16">
      {/* =================================================================== */}
      {/* HERO BANNER                                                         */}
      {/* =================================================================== */}
      <div className="bg-gradient-to-r from-amber-500 via-orange-500 to-amber-600 rounded-3xl p-5 sm:p-7 text-white shadow-sm border-3 border-amber-300 relative overflow-hidden">
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
          <div className="space-y-2 max-w-2xl">
            <div className="flex flex-wrap items-center gap-2">
              <span className="bg-white/20 text-white text-xs font-black uppercase tracking-wider px-3 py-1 rounded-full border border-white/30 flex items-center gap-1.5">
                <Printer className="w-3.5 h-3.5" />
                <span>KABV Drukstukke • Printables Sentrum</span>
              </span>
              <span className="bg-emerald-500 text-white text-xs font-black px-2.5 py-0.5 rounded-full">
                KABV 2026
              </span>
            </div>

            <h1 className="font-fun text-2xl sm:text-4xl font-black tracking-tight text-white leading-tight">
              Drukbare Studiegidse & Flitskaarte 🖨️📄
            </h1>
            <p className="text-amber-100 font-bold text-xs sm:text-sm leading-relaxed">
              Laai amptelike PDF-studiegidse en uitknip-flitskaarte af vir elke les wat jou kind voltooi het.
              Ideaal vir handgeskrewe papier-oefening, hersiening voor toetse en daaglikse woordeskat-speletjies!
            </p>
          </div>

          {/* Learner Progress Stats Box */}
          <div className="bg-white/15 backdrop-blur-md border border-white/30 rounded-2xl p-4 w-full md:w-auto text-center shrink-0 space-y-1">
            <span className="text-[10px] font-black uppercase tracking-wider text-amber-100 block">
              Vordering vir Drukstukke
            </span>
            <div className="font-fun text-3xl font-black text-yellow-300">
              {completedLessonCount} / 15
            </div>
            <p className="text-[11px] text-white/90 font-bold">
              {completedLessonCount === 15
                ? 'Alle 15 Studiegidse Ontsluit! 🏆'
                : 'Lesse voltooi & gereed om te druk'}
            </p>
          </div>
        </div>

        {/* Learner Name Strip for Customizing Prints */}
        <div className="mt-5 pt-4 border-t border-white/20 flex flex-wrap items-center justify-between gap-3 text-xs">
          <div className="flex items-center gap-2">
            <span className="font-bold text-amber-100">Leerder se naam op drukbare PDF's:</span>
            {isEditingName ? (
              <div className="flex items-center gap-1.5">
                <input
                  type="text"
                  value={learnerName}
                  onChange={(e) => setLearnerName(e.target.value)}
                  className="bg-white text-slate-900 font-bold px-3 py-1 rounded-xl text-xs border border-white focus:outline-hidden"
                  placeholder="bv. Mpho / Sarah"
                  autoFocus
                />
                <button
                  onClick={handleSaveName}
                  className="bg-emerald-600 hover:bg-emerald-700 text-white font-bold px-2.5 py-1 rounded-xl"
                >
                  Stoor
                </button>
              </div>
            ) : (
              <div className="flex items-center gap-2">
                <span className="font-black bg-white/20 px-2.5 py-0.5 rounded-lg border border-white/30">
                  {learnerName}
                </span>
                <button
                  onClick={() => setIsEditingName(true)}
                  className="underline hover:text-white font-semibold text-[11px]"
                >
                  Verander
                </button>
              </div>
            )}
          </div>

          <span className="text-[11px] text-amber-200 font-medium">
            💡 Druk op A4-papier. Flitskaarte kan uitgeknip word op die stippellyne (---).
          </span>
        </div>
      </div>

      {/* =================================================================== */}
      {/* MASTER BUNDLE QUICK DOWNLOADS                                       */}
      {/* =================================================================== */}
      <div className="bg-gradient-to-r from-amber-50 via-orange-50 to-amber-50 rounded-3xl p-5 sm:p-6 border-3 border-amber-300 shadow-xs space-y-4">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
          <div>
            <div className="flex items-center gap-2">
              <FolderDown className="w-5 h-5 text-amber-700" />
              <h2 className="font-fun text-lg sm:text-xl font-black text-amber-950">
                Laai Volledige Bundels Af (Master PDF Bundles)
              </h2>
            </div>
            <p className="text-xs text-amber-800 font-medium mt-0.5">
              Kombineer alle voltooide lesse in een gerieflike, veelsydige PDF-dokument met 'n formele inhoudsopgawe!
            </p>
          </div>

          <span className="text-xs font-black text-amber-900 bg-amber-200/80 px-3 py-1 rounded-full shrink-0">
            {completedLessonsList.length > 0
              ? `${completedLessonsList.length} Voltooide Lesse Ingesluit`
              : 'Voorbeeld: Eerste 5 Lesse'}
          </span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5 pt-1">
          {/* Master Study Guide Booklet */}
          <button
            onClick={handleDownloadMasterStudyGuides}
            disabled={downloadingId === 'master-guides'}
            className="p-4 rounded-2xl bg-white hover:bg-amber-100/50 border-2 border-amber-300 hover:border-amber-500 shadow-sm transition-all text-left flex items-start gap-3.5 group active:scale-98"
          >
            <div className="w-12 h-12 rounded-xl bg-amber-500 text-white flex items-center justify-center text-xl shrink-0 shadow-2xs group-hover:scale-105 transition-transform">
              {downloadingId === 'master-guides' ? (
                <Loader2 className="w-6 h-6 animate-spin text-white" />
              ) : (
                <BookOpen className="w-6 h-6" />
              )}
            </div>
            <div className="flex-1">
              <div className="flex items-center justify-between">
                <h3 className="font-fun font-black text-slate-900 text-sm sm:text-base group-hover:text-amber-950">
                  Volledige Studiegids-Boekie (PDF)
                </h3>
                <Download className="w-4 h-4 text-amber-700" />
              </div>
              <p className="text-xs text-slate-600 font-medium mt-1 leading-relaxed">
                Bevat alle reëls, STOMPI-tabelle, woordeskatlyste en handgeskrewe skryfoefeninge met 'n formele voorblad.
              </p>
              <span className="inline-block mt-2 text-[10px] font-black uppercase text-amber-800 bg-amber-100 px-2 py-0.5 rounded-md">
                Veelbladsy KABV Boekie 📚
              </span>
            </div>
          </button>

          {/* Master Flashcard Sheets */}
          <button
            onClick={handleDownloadMasterFlashcards}
            disabled={downloadingId === 'master-flash'}
            className="p-4 rounded-2xl bg-white hover:bg-blue-50/50 border-2 border-blue-300 hover:border-blue-500 shadow-sm transition-all text-left flex items-start gap-3.5 group active:scale-98"
          >
            <div className="w-12 h-12 rounded-xl bg-blue-500 text-white flex items-center justify-center text-xl shrink-0 shadow-2xs group-hover:scale-105 transition-transform">
              {downloadingId === 'master-flash' ? (
                <Loader2 className="w-6 h-6 animate-spin text-white" />
              ) : (
                <Scissors className="w-6 h-6" />
              )}
            </div>
            <div className="flex-1">
              <div className="flex items-center justify-between">
                <h3 className="font-fun font-black text-slate-900 text-sm sm:text-base group-hover:text-blue-950">
                  Volledige Flitskaart-Pak (PDF)
                </h3>
                <Download className="w-4 h-4 text-blue-700" />
              </div>
              <p className="text-xs text-slate-600 font-medium mt-1 leading-relaxed">
                Drukbare velle met 8 flitskaarte per les. Knip op die stippellyne vir 'n volledige stel woordeskatkaarte.
              </p>
              <span className="inline-block mt-2 text-[10px] font-black uppercase text-blue-800 bg-blue-100 px-2 py-0.5 rounded-md">
                Uitknip-Gereed (---) ✂️
              </span>
            </div>
          </button>
        </div>
      </div>

      {/* =================================================================== */}
      {/* FILTER & SEARCH BAR                                                 */}
      {/* =================================================================== */}
      <div className="bg-white rounded-3xl p-4 sm:p-5 border-2 border-slate-200 shadow-sm space-y-4">
        <div className="flex flex-col md:flex-row items-stretch md:items-center justify-between gap-3">
          {/* Progress Tabs */}
          <div className="flex items-center gap-2 bg-slate-100 p-1 rounded-2xl shrink-0">
            <button
              onClick={() => {
                setActiveFilter('completed');
                sounds.playPop();
              }}
              className={`px-3.5 py-2 rounded-xl font-fun font-black text-xs sm:text-sm flex items-center gap-1.5 transition-all ${
                activeFilter === 'completed'
                  ? 'bg-amber-500 text-white shadow-xs'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              <Star className="w-3.5 h-3.5 fill-current" />
              <span>Voltooide Lesse ({completedLessonCount})</span>
            </button>
            <button
              onClick={() => {
                setActiveFilter('all');
                sounds.playPop();
              }}
              className={`px-3.5 py-2 rounded-xl font-fun font-black text-xs sm:text-sm flex items-center gap-1.5 transition-all ${
                activeFilter === 'all'
                  ? 'bg-amber-500 text-white shadow-xs'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              <span>Alle 15 Lesse</span>
            </button>
          </div>

          {/* Search Box */}
          <div className="relative flex-1 max-w-md">
            <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Soek onderwerp, STOMPI, meervoude, woorde..."
              className="w-full pl-10 pr-4 py-2 rounded-2xl bg-slate-50 border border-slate-200 text-xs sm:text-sm font-medium focus:outline-hidden focus:border-amber-400 focus:bg-white transition-colors"
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery('')}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 text-xs"
              >
                ✕
              </button>
            )}
          </div>
        </div>

        {/* Category Pills */}
        <div className="flex items-center gap-1.5 overflow-x-auto no-scrollbar pt-1 text-xs">
          <span className="text-slate-400 font-bold text-[11px] mr-1 flex items-center gap-1 shrink-0">
            <Filter className="w-3 h-3" />
            <span>Kategorie:</span>
          </span>
          {[
            { id: 'all', label: 'Alle Kategorieë' },
            { id: 'Grammatika', label: 'Grammatika & STOMPI 🚂' },
            { id: 'Woordeskat', label: 'Woordeskat & Diere 🐾' },
            { id: 'Spraak', label: 'Spraak & Groete 👋' },
            { id: 'Lees', label: 'Leesbegrip 📖' },
            { id: 'Skryf', label: 'Skryfwerk & Klanke ✍️' }
          ].map((cat) => (
            <button
              key={cat.id}
              onClick={() => {
                setCategoryFilter(cat.id);
                sounds.playPop();
              }}
              className={`px-3 py-1.5 rounded-xl font-bold whitespace-nowrap transition-all ${
                categoryFilter === cat.id
                  ? 'bg-amber-100 text-amber-950 border border-amber-300 font-black'
                  : 'bg-slate-50 text-slate-600 hover:bg-slate-100 border border-slate-200'
              }`}
            >
              {cat.label}
            </button>
          ))}
        </div>
      </div>

      {/* =================================================================== */}
      {/* LESSON CARDS GRID                                                   */}
      {/* =================================================================== */}
      {filteredLessons.length === 0 ? (
        <div className="bg-white rounded-3xl p-10 text-center border-2 border-slate-200 space-y-3">
          <span className="text-5xl block">📭</span>
          <h3 className="font-fun text-lg font-black text-slate-900">
            Geen drukbare lesse gevind vir hierdie filter nie
          </h3>
          <p className="text-xs text-slate-500 max-w-sm mx-auto">
            {activeFilter === 'completed' && completedLessonCount === 0
              ? 'Jy het nog geen lesse voltooi nie! Skakel oor na "Alle 15 Lesse" of voltooi jou eerste les op die kaart.'
              : 'Probeer om jou soekterme te verander of kies "Alle Kategorieë".'}
          </p>
          {activeFilter === 'completed' && completedLessonCount === 0 && (
            <button
              onClick={() => setActiveFilter('all')}
              className="bg-amber-500 hover:bg-amber-600 text-white font-fun font-black px-4 py-2 rounded-xl text-xs shadow-xs"
            >
              Wys Alle 15 Lesse ➔
            </button>
          )}
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {filteredLessons.map((lesson) => {
            const isCompleted = progress.completedLessonIds.includes(lesson.id);
            const score = progress.lessonScores[lesson.id] || 0;

            return (
              <div
                key={lesson.id}
                className={`bg-white rounded-3xl p-5 border-2 transition-all flex flex-col justify-between space-y-4 shadow-xs hover:shadow-md ${
                  isCompleted
                    ? 'border-emerald-300 hover:border-emerald-400'
                    : 'border-slate-200 hover:border-amber-300'
                }`}
              >
                {/* Header */}
                <div className="space-y-2">
                  <div className="flex items-center justify-between gap-2">
                    <span className="text-[10px] font-black uppercase tracking-wider text-slate-500 bg-slate-100 px-2 py-0.5 rounded-md">
                      Onderwerp {lesson.topicNumber} • Kwartaal {lesson.term}
                    </span>

                    {isCompleted ? (
                      <span className="bg-emerald-100 text-emerald-800 text-[11px] font-black px-2.5 py-0.5 rounded-full flex items-center gap-1 border border-emerald-300">
                        <CheckCircle className="w-3 h-3 text-emerald-600" />
                        <span>Voltooi ({score}%)</span>
                      </span>
                    ) : (
                      <span className="text-[10px] font-bold text-slate-400 flex items-center gap-1">
                        <Lock className="w-3 h-3" />
                        <span>Nog nie voltooi</span>
                      </span>
                    )}
                  </div>

                  <div className="flex items-start gap-2.5">
                    <span className="text-3xl shrink-0 p-1.5 bg-amber-50 rounded-2xl border border-amber-200">
                      {lesson.icon}
                    </span>
                    <div>
                      <h3 className="font-fun text-base font-black text-slate-900 leading-tight">
                        {lesson.titleAf}
                      </h3>
                      <p className="text-xs text-slate-500 font-bold mt-0.5">
                        {lesson.titleEn}
                      </p>
                    </div>
                  </div>

                  {/* Summary & CAPS strand */}
                  <p className="text-xs text-slate-600 font-medium line-clamp-2 leading-relaxed">
                    {lesson.capsTopic}
                  </p>

                  <div className="flex items-center gap-2 pt-1 text-[11px] text-slate-500 font-bold">
                    <span>🗂️ {lesson.vocabulary.length} Woorde</span>
                    <span>•</span>
                    <span>📝 3 Skryfoefeninge</span>
                    {lesson.stompIRule && (
                      <>
                        <span>•</span>
                        <span className="text-indigo-600">🚂 STOMPI</span>
                      </>
                    )}
                  </div>
                </div>

                {/* Download and Preview Action Buttons */}
                <div className="space-y-2 pt-2 border-t border-slate-100">
                  <div className="grid grid-cols-2 gap-2">
                    {/* Study Guide Download */}
                    <button
                      onClick={() => handleDownloadStudyGuide(lesson)}
                      disabled={downloadingId === `guide-${lesson.id}`}
                      className="py-2.5 px-3 rounded-xl bg-amber-50 hover:bg-amber-100 text-amber-950 border border-amber-300 font-fun font-black text-xs flex items-center justify-center gap-1.5 transition-all active:scale-95 shadow-2xs"
                      title="Laai A4 Studiegids af met grammatikareëls en skryfoefeninge"
                    >
                      {downloadingId === `guide-${lesson.id}` ? (
                        <Loader2 className="w-3.5 h-3.5 animate-spin" />
                      ) : (
                        <FileText className="w-3.5 h-3.5 text-amber-700" />
                      )}
                      <span>Studiegids (PDF)</span>
                    </button>

                    {/* Flashcards Download */}
                    <button
                      onClick={() => handleDownloadFlashcards(lesson)}
                      disabled={downloadingId === `flash-${lesson.id}`}
                      className="py-2.5 px-3 rounded-xl bg-blue-50 hover:bg-blue-100 text-blue-950 border border-blue-300 font-fun font-black text-xs flex items-center justify-center gap-1.5 transition-all active:scale-95 shadow-2xs"
                      title="Laai uitknip-flitskaart vel af met stippellyne"
                    >
                      {downloadingId === `flash-${lesson.id}` ? (
                        <Loader2 className="w-3.5 h-3.5 animate-spin" />
                      ) : (
                        <Scissors className="w-3.5 h-3.5 text-blue-700" />
                      )}
                      <span>Flitskaarte (PDF)</span>
                    </button>
                  </div>

                  {/* Quick preview button */}
                  <div className="flex items-center justify-between text-xs pt-1">
                    <button
                      onClick={() => {
                        sounds.playPop();
                        setPreviewLesson(lesson);
                        setPreviewTab('flashcards');
                      }}
                      className="text-slate-500 hover:text-slate-800 font-bold flex items-center gap-1 transition-colors text-[11px]"
                    >
                      <Eye className="w-3.5 h-3.5" />
                      <span>Kitsvoorskou</span>
                    </button>

                    {onOpenLesson && (
                      <button
                        onClick={() => onOpenLesson(lesson.id)}
                        className="text-amber-800 hover:text-amber-950 font-black flex items-center gap-1 transition-colors text-[11px]"
                      >
                        <span>Oefen Les Aanlyn ➔</span>
                      </button>
                    )}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      )}

      {/* =================================================================== */}
      {/* QUICK PREVIEW MODAL                                                 */}
      {/* =================================================================== */}
      {previewLesson && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-slate-900/60 backdrop-blur-xs animate-in fade-in duration-200">
          <div className="bg-white w-full max-w-2xl rounded-3xl border-3 border-amber-300 shadow-2xl overflow-hidden flex flex-col max-h-[90vh]">
            {/* Modal Header */}
            <div className="bg-gradient-to-r from-amber-400 to-orange-400 p-4 text-white flex items-center justify-between">
              <div className="flex items-center gap-2.5">
                <span className="text-2xl">{previewLesson.icon}</span>
                <div>
                  <h3 className="font-fun text-lg font-black leading-tight">
                    {previewLesson.titleAf} ({previewLesson.titleEn})
                  </h3>
                  <span className="text-[11px] text-amber-100 font-bold">
                    Onderwerp {previewLesson.topicNumber} • Voorskou van Drukbare PDF
                  </span>
                </div>
              </div>

              <button
                onClick={() => setPreviewLesson(null)}
                className="p-1.5 rounded-xl bg-white/20 hover:bg-white/30 text-white transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Sub-tabs inside preview */}
            <div className="flex border-b border-slate-200 bg-slate-50 p-2 gap-2 text-xs font-bold">
              <button
                onClick={() => setPreviewTab('flashcards')}
                className={`flex-1 py-2 px-3 rounded-xl flex items-center justify-center gap-1.5 transition-all ${
                  previewTab === 'flashcards'
                    ? 'bg-blue-500 text-white font-black shadow-xs'
                    : 'text-slate-600 hover:bg-slate-200'
                }`}
              >
                <Scissors className="w-3.5 h-3.5" />
                <span>Flitskaarte Voorskou ({previewLesson.vocabulary.length} Kaarte)</span>
              </button>
              <button
                onClick={() => setPreviewTab('guide')}
                className={`flex-1 py-2 px-3 rounded-xl flex items-center justify-center gap-1.5 transition-all ${
                  previewTab === 'guide'
                    ? 'bg-amber-500 text-white font-black shadow-xs'
                    : 'text-slate-600 hover:bg-slate-200'
                }`}
              >
                <FileText className="w-3.5 h-3.5" />
                <span>Studiegids Voorskou</span>
              </button>
            </div>

            {/* Modal Body */}
            <div className="p-4 sm:p-5 overflow-y-auto space-y-4 max-h-[60vh] text-slate-800">
              {previewTab === 'flashcards' ? (
                <div className="space-y-3">
                  <div className="bg-blue-50 border border-blue-200 rounded-2xl p-3 text-xs text-blue-900 font-medium flex items-center gap-2">
                    <span className="text-lg">✂️</span>
                    <span>
                      Hierdie flitskaarte sal op 'n netjiese A4-rooster met stippellyne (---) gedruk word om uit te knip!
                    </span>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    {previewLesson.vocabulary.slice(0, 8).map((v, idx) => (
                      <div
                        key={v.id}
                        className="p-3.5 rounded-2xl border-2 border-dashed border-slate-300 bg-slate-50/70 space-y-1.5 relative"
                      >
                        <span className="absolute right-2 top-2 text-[10px] text-slate-400 font-mono">
                          ✂ [KNIP]
                        </span>
                        <div className="flex items-center justify-between pr-12">
                          <h4 className="font-fun text-base font-black text-slate-900">
                            {v.afrikaans}
                          </h4>
                          <button
                            onClick={() => speakAfrikaans(v.afrikaans)}
                            className="p-1 rounded-lg bg-white border border-slate-200 text-slate-600 hover:text-amber-600"
                            title="Luister na uitspraak"
                          >
                            <Volume2 className="w-3.5 h-3.5" />
                          </button>
                        </div>
                        <p className="text-xs font-mono text-slate-500">
                          [{v.pronunciation}]
                        </p>
                        <p className="text-xs font-bold text-blue-700">
                          Engels: {v.english}
                        </p>
                        <p className="text-[11px] text-slate-600 italic">
                          "{v.exampleSentenceAf}"
                        </p>
                      </div>
                    ))}
                  </div>
                </div>
              ) : (
                <div className="space-y-3">
                  {/* Ollie tip in guide preview */}
                  <div className="bg-emerald-50 border border-emerald-200 rounded-2xl p-3.5 text-xs text-emerald-950 space-y-1">
                    <strong className="block font-black text-emerald-900">
                      👑 Ollie se Goue Reël:
                    </strong>
                    <p className="font-medium">{previewLesson.ollieTip.afrikaans}</p>
                    <p className="text-slate-500 italic">{previewLesson.ollieTip.english}</p>
                  </div>

                  {/* Vocabulary summary table preview */}
                  <div className="border border-slate-200 rounded-2xl overflow-hidden text-xs">
                    <div className="bg-slate-100 p-2 font-black text-slate-700 border-b border-slate-200">
                      Kern Woordeskat Lys
                    </div>
                    <div className="divide-y divide-slate-100 max-h-40 overflow-y-auto">
                      {previewLesson.vocabulary.slice(0, 6).map((v) => (
                        <div key={v.id} className="p-2 flex items-center justify-between">
                          <span className="font-bold text-slate-900">{v.afrikaans}</span>
                          <span className="text-slate-500 font-mono text-[11px]">[{v.pronunciation}]</span>
                          <span className="text-blue-700 font-medium">{v.english}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Practice preview */}
                  <div className="bg-slate-50 border border-slate-200 rounded-2xl p-3 text-xs space-y-2">
                    <strong className="block font-black text-slate-900">
                      📝 Voorbeeld Skryfoefening op Papier:
                    </strong>
                    {previewLesson.questions.slice(0, 2).map((q, qIdx) => (
                      <div key={q.id} className="space-y-1">
                        <p className="font-bold text-slate-800">
                          {qIdx + 1}. {q.promptAf}
                        </p>
                        <div className="border-b border-slate-300 border-dashed py-1 text-[10px] text-slate-400">
                          (Handgeskrewe antwoord reël) ____________________________________
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* Modal Actions */}
            <div className="bg-slate-50 border-t border-slate-200 p-4 flex flex-wrap items-center justify-between gap-3">
              <span className="text-xs text-slate-500 font-medium">
                Gereed om af te laai vir drukker?
              </span>

              <div className="flex items-center gap-2">
                <button
                  onClick={() => handleDownloadStudyGuide(previewLesson)}
                  className="px-4 py-2.5 rounded-xl bg-amber-500 hover:bg-amber-600 text-white font-fun font-black text-xs flex items-center gap-1.5 shadow-xs"
                >
                  <FileText className="w-3.5 h-3.5" />
                  <span>Laai Studiegids Af (PDF)</span>
                </button>
                <button
                  onClick={() => handleDownloadFlashcards(previewLesson)}
                  className="px-4 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-fun font-black text-xs flex items-center gap-1.5 shadow-xs"
                >
                  <Scissors className="w-3.5 h-3.5" />
                  <span>Laai Flitskaarte Af (PDF)</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
