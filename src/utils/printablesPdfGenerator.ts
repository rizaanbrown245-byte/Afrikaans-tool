import { jsPDF } from 'jspdf';
import { LessonContent, VocabWord } from '../types';

/**
 * Clean text helper to prevent font encoding glitches with special unicode characters in jsPDF
 */
function cleanText(text: string): string {
  if (!text) return '';
  return text
    .replace(/[–—]/g, '-')
    .replace(/[“”]/g, '"')
    .replace(/[‘’]/g, "'")
    .replace(/[•]/g, '-')
    .replace(/…/g, '...')
    .replace(/[\u200B-\u200D\uFEFF]/g, '');
}

/**
 * Standard Header for Study Guide
 */
function drawStudyGuideHeader(
  doc: jsPDF,
  lesson: LessonContent,
  studentName: string,
  pageNumber: number,
  totalPages?: number
): number {
  const pageWidth = doc.internal.pageSize.getWidth();
  const margin = 12;
  const contentWidth = pageWidth - margin * 2;
  let y = 10;

  // Top header banner background
  doc.setFillColor(245, 158, 11); // Amber
  doc.roundedRect(margin, y, contentWidth, 24, 3, 3, 'F');

  // DBE / CAPS label
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(8);
  doc.setTextColor(255, 255, 255);
  doc.text(
    cleanText('DEPARTEMENT VAN BASIESE ONDERWYS • GRAAD 4 KABV / CAPS 2026'),
    margin + 6,
    y + 6
  );

  // Main Subject & Topic Title
  doc.setFontSize(13);
  doc.text(
    cleanText(`AFRIKAANS STUDIEGIDS: ONDERWERP ${lesson.topicNumber} - ${lesson.titleAf.toUpperCase()}`),
    margin + 6,
    y + 13
  );

  // Subtitle (English)
  doc.setFont('helvetica', 'normal');
  doc.setFontSize(8.5);
  doc.setTextColor(255, 251, 235);
  doc.text(
    cleanText(`Official Grade 4 Study Guide: ${lesson.titleEn} • ${lesson.capsTopic}`),
    margin + 6,
    y + 19
  );

  y += 28;

  // Learner metadata strip
  doc.setFillColor(254, 243, 199); // Soft yellow
  doc.setDrawColor(245, 158, 11);
  doc.setLineWidth(0.3);
  doc.roundedRect(margin, y, contentWidth, 10, 1.5, 1.5, 'FD');

  doc.setFont('helvetica', 'bold');
  doc.setFontSize(8);
  doc.setTextColor(120, 53, 15);
  const displayName = studentName.trim() ? studentName : 'Mpho / Sarah';
  doc.text(cleanText(`Leerder: ${displayName}`), margin + 4, y + 6.5);
  doc.text(cleanText(`Kwartaal: ${lesson.term}`), margin + 65, y + 6.5);
  doc.text(cleanText(`Kategorie: ${lesson.category}`), margin + 105, y + 6.5);
  const todayStr = new Date().toLocaleDateString('af-ZA');
  doc.text(cleanText(`Datum: ${todayStr}`), margin + 145, y + 6.5);

  y += 14;
  return y;
}

/**
 * Standard Footer for Printable Documents
 */
function drawPageFooter(doc: jsPDF, pageNum: number, totalPages?: number) {
  const pageWidth = doc.internal.pageSize.getWidth();
  const pageHeight = doc.internal.pageSize.getHeight();
  const margin = 12;

  doc.setDrawColor(226, 232, 240);
  doc.setLineWidth(0.3);
  doc.line(margin, pageHeight - 12, pageWidth - margin, pageHeight - 12);

  doc.setFont('helvetica', 'normal');
  doc.setFontSize(7.5);
  doc.setTextColor(148, 163, 184);
  doc.text(
    cleanText('Afrikaans Avontuur • Belyn met Suid-Afrikaanse KABV Graad 4 kurrikulum • www.afrikaansavontuur.co.za'),
    margin,
    pageHeight - 7
  );

  const pageStr = totalPages ? `Bladsy ${pageNum} van ${totalPages}` : `Bladsy ${pageNum}`;
  doc.text(cleanText(pageStr), pageWidth - margin - 22, pageHeight - 7);
}

/**
 * 1. GENERATE STUDY GUIDE PDF FOR A LESSON
 */
export function generateLessonStudyGuidePdf(lesson: LessonContent, studentName = ''): void {
  const doc = new jsPDF({
    orientation: 'portrait',
    unit: 'mm',
    format: 'a4'
  });

  const pageWidth = doc.internal.pageSize.getWidth();
  const pageHeight = doc.internal.pageSize.getHeight();
  const margin = 12;
  const contentWidth = pageWidth - margin * 2;
  let y = drawStudyGuideHeader(doc, lesson, studentName, 1);

  // Section 1: Ollie's Golden Rule & Overview Callout
  doc.setFillColor(236, 253, 245); // Mint emerald
  doc.setDrawColor(16, 185, 129);
  doc.setLineWidth(0.4);
  doc.roundedRect(margin, y, contentWidth, 24, 2, 2, 'FD');

  doc.setFont('helvetica', 'bold');
  doc.setFontSize(9);
  doc.setTextColor(6, 95, 70);
  doc.text(cleanText("OLLIE SE GOEIE WENKE & GOUE REËL (GOLDEN RULE):"), margin + 4, y + 6);

  doc.setFont('helvetica', 'bold');
  doc.setFontSize(8.5);
  doc.setTextColor(15, 23, 42);
  const splitOllieAf = doc.splitTextToSize(cleanText(lesson.ollieTip.afrikaans), contentWidth - 8);
  doc.text(splitOllieAf, margin + 4, y + 11);

  doc.setFont('helvetica', 'italic');
  doc.setFontSize(7.5);
  doc.setTextColor(71, 85, 105);
  const splitOllieEn = doc.splitTextToSize(cleanText(lesson.ollieTip.english), contentWidth - 8);
  doc.text(splitOllieEn, margin + 4, y + 19);

  y += 28;

  // Section 2: Core Vocabulary Table
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(10);
  doc.setTextColor(30, 41, 59);
  doc.text(cleanText(`1. Belangrike Woordeskat (Key Vocabulary - Onderwerp ${lesson.topicNumber})`), margin, y);
  y += 4;

  // Table header
  doc.setFillColor(241, 245, 249);
  doc.setDrawColor(203, 213, 225);
  doc.setLineWidth(0.2);
  doc.rect(margin, y, contentWidth, 7, 'FD');

  doc.setFont('helvetica', 'bold');
  doc.setFontSize(8);
  doc.setTextColor(51, 65, 85);
  doc.text(cleanText('Afrikaans'), margin + 3, y + 5);
  doc.text(cleanText('Uitspraak (Phonics)'), margin + 45, y + 5);
  doc.text(cleanText('Engels (English)'), margin + 90, y + 5);
  doc.text(cleanText('Voorbeeldsin (Sentence)'), margin + 130, y + 5);
  y += 7;

  // Table rows (up to 8 vocab words)
  const vocabSample = lesson.vocabulary.slice(0, 8);
  vocabSample.forEach((v, idx) => {
    const isEven = idx % 2 === 0;
    if (isEven) {
      doc.setFillColor(248, 250, 252);
      doc.rect(margin, y, contentWidth, 6.5, 'F');
    }
    doc.setDrawColor(226, 232, 240);
    doc.line(margin, y + 6.5, margin + contentWidth, y + 6.5);

    doc.setFont('helvetica', 'bold');
    doc.setFontSize(8);
    doc.setTextColor(15, 23, 42);
    doc.text(cleanText(v.afrikaans), margin + 3, y + 4.5);

    doc.setFont('helvetica', 'normal');
    doc.setFontSize(7.5);
    doc.setTextColor(71, 85, 105);
    doc.text(cleanText(`[${v.pronunciation}]`), margin + 45, y + 4.5);

    doc.setFont('helvetica', 'normal');
    doc.setFontSize(8);
    doc.setTextColor(30, 41, 59);
    doc.text(cleanText(v.english), margin + 90, y + 4.5);

    doc.setFont('helvetica', 'italic');
    doc.setFontSize(7.5);
    doc.setTextColor(100, 116, 139);
    const exTrunc = v.exampleSentenceAf.length > 35 ? v.exampleSentenceAf.substring(0, 32) + '...' : v.exampleSentenceAf;
    doc.text(cleanText(exTrunc), margin + 130, y + 4.5);

    y += 6.5;
  });

  y += 5;

  // Section 3: Grammar / Language Structures Rule Box
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(10);
  doc.setTextColor(30, 41, 59);
  doc.text(cleanText("2. Grammatika en Taalreëls (Grammar & Rules)"), margin, y);
  y += 4;

  const explBlock = lesson.explanationBlocks[0];
  if (explBlock) {
    doc.setFillColor(254, 242, 242); // Soft red/rose
    doc.setDrawColor(248, 113, 113);
    doc.roundedRect(margin, y, contentWidth, 24, 2, 2, 'FD');

    doc.setFont('helvetica', 'bold');
    doc.setFontSize(8.5);
    doc.setTextColor(153, 27, 27);
    doc.text(cleanText(`${explBlock.headingAf} (${explBlock.headingEn})`), margin + 4, y + 5.5);

    doc.setFont('helvetica', 'normal');
    doc.setFontSize(8);
    doc.setTextColor(30, 41, 59);
    const contentSplit = doc.splitTextToSize(cleanText(explBlock.contentAf), contentWidth - 8);
    doc.text(contentSplit, margin + 4, y + 11);

    if (explBlock.examples && explBlock.examples.length > 0) {
      const ex1 = explBlock.examples[0];
      doc.setFont('helvetica', 'bold');
      doc.setFontSize(7.5);
      doc.setTextColor(185, 28, 28);
      doc.text(cleanText(`Voorbeeld: ${ex1.afrikaans} -> ${ex1.english}`), margin + 4, y + 20);
    }
    y += 28;
  }

  // Section 4: STOMPI or Special Rule Table if applicable
  if (lesson.stompIRule && lesson.stompIRule.length > 0) {
    doc.setFont('helvetica', 'bold');
    doc.setFontSize(10);
    doc.setTextColor(30, 41, 59);
    doc.text(cleanText("3. Die Goue STOMPI-Tabel (Sentence Order)"), margin, y);
    y += 4;

    const colWidth = contentWidth / 6;
    doc.setFillColor(238, 242, 255);
    doc.roundedRect(margin, y, contentWidth, 16, 2, 2, 'FD');

    lesson.stompIRule.forEach((carriage, cIdx) => {
      const cx = margin + cIdx * colWidth;
      doc.setFont('helvetica', 'bold');
      doc.setFontSize(9);
      doc.setTextColor(67, 56, 202);
      doc.text(cleanText(carriage.letter), cx + colWidth / 2 - 2, y + 5);

      doc.setFontSize(7);
      doc.setTextColor(30, 41, 59);
      doc.text(cleanText(carriage.afrikaans), cx + 2, y + 9);

      doc.setFont('helvetica', 'italic');
      doc.setTextColor(100, 116, 139);
      doc.text(cleanText(carriage.example), cx + 2, y + 13);
    });

    y += 20;
  }

  // Section 5: Written Practice Drills (Handgeskrewe Oefeninge)
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(10);
  doc.setTextColor(30, 41, 59);
  doc.text(cleanText("4. Skryfoefening vir die Leerder (Paper Practice Drills)"), margin, y);
  y += 5;

  const sampleQuestions = lesson.questions.slice(0, 3);
  sampleQuestions.forEach((q, qIdx) => {
    doc.setFont('helvetica', 'bold');
    doc.setFontSize(8);
    doc.setTextColor(15, 23, 42);
    doc.text(cleanText(`${qIdx + 1}. ${q.promptAf} (${q.promptEn})`), margin, y);
    y += 4;

    // Handwriting guide lines for student
    doc.setDrawColor(203, 213, 225);
    doc.setLineDashPattern([1, 1], 0);
    doc.line(margin + 5, y + 2, margin + contentWidth, y + 2);
    doc.setLineDashPattern([], 0); // reset
    y += 7;
  });

  y += 3;

  // Teacher / Parent Sign-off box
  doc.setDrawColor(148, 163, 184);
  doc.setLineWidth(0.3);
  doc.line(margin, y, margin + 80, y);
  doc.line(margin + 105, y, margin + contentWidth, y);

  doc.setFont('helvetica', 'bold');
  doc.setFontSize(7.5);
  doc.setTextColor(71, 85, 105);
  doc.text(cleanText("Handtekening van Ouer / Voog"), margin, y + 4);
  doc.text(cleanText("Onderwyser / Juffrou Kommentaar & Punte"), margin + 105, y + 4);

  drawPageFooter(doc, 1, 1);

  // Trigger download
  const cleanTitle = lesson.titleAf.replace(/[^a-zA-Z0-9]/g, '_');
  doc.save(`Graad_4_Afrikaans_Studiegids_Onderwerp_${lesson.topicNumber}_${cleanTitle}.pdf`);
}

/**
 * 2. GENERATE VOCABULARY FLASHCARDS PDF FOR A LESSON
 * Formatted as clean, printable, cut-out flashcard grids with scissors and dotted lines!
 */
export function generateLessonFlashcardsPdf(lesson: LessonContent, studentName = ''): void {
  const doc = new jsPDF({
    orientation: 'portrait',
    unit: 'mm',
    format: 'a4'
  });

  const pageWidth = doc.internal.pageSize.getWidth();
  const pageHeight = doc.internal.pageSize.getHeight();
  const margin = 12;
  const contentWidth = pageWidth - margin * 2;

  // Top header banner
  doc.setFillColor(59, 130, 246); // Blue
  doc.roundedRect(margin, 10, contentWidth, 20, 2.5, 2.5, 'F');

  doc.setFont('helvetica', 'bold');
  doc.setFontSize(8);
  doc.setTextColor(255, 255, 255);
  doc.text(cleanText('AFRIKAANS AVONTUUR • GRAAD 4 KABV DRUKBARE FLITSKAARTE'), margin + 5, 16);

  doc.setFontSize(12);
  doc.text(
    cleanText(`FLITSKAARTE: ONDERWERP ${lesson.topicNumber} - ${lesson.titleAf.toUpperCase()}`),
    margin + 5,
    22
  );

  doc.setFont('helvetica', 'normal');
  doc.setFontSize(7.5);
  doc.setTextColor(224, 242, 254);
  const displayName = studentName.trim() ? studentName : 'Mpho / Sarah';
  doc.text(
    cleanText(`Leerder: ${displayName} • Knip op die stippellyne (---) vir handige flitskaarte!`),
    margin + 5,
    27
  );

  let y = 35;

  // Flashcards Grid: 2 columns x 4 rows = 8 cards per page
  const cardsPerPage = 8;
  const cardWidth = (contentWidth - 6) / 2; // ~90mm
  const cardHeight = 54; // ~54mm each

  const vocabWords = lesson.vocabulary.slice(0, 8);

  vocabWords.forEach((word, idx) => {
    const col = idx % 2;
    const row = Math.floor(idx / 2);
    const cardX = margin + col * (cardWidth + 6);
    const cardY = y + row * (cardHeight + 4);

    // Card outer border (dotted cut line)
    doc.setDrawColor(148, 163, 184);
    doc.setLineWidth(0.3);
    doc.setLineDashPattern([2, 2], 0);
    doc.roundedRect(cardX, cardY, cardWidth, cardHeight, 2, 2, 'D');
    doc.setLineDashPattern([], 0);

    // Card Inner Content Box
    doc.setFillColor(248, 250, 252);
    doc.roundedRect(cardX + 1, cardY + 1, cardWidth - 2, cardHeight - 2, 1.5, 1.5, 'F');

    // Scissor cut icon text on top-right
    doc.setFont('helvetica', 'bold');
    doc.setFontSize(7);
    doc.setTextColor(148, 163, 184);
    doc.text(cleanText(`[KNIP HIER]`), cardX + cardWidth - 20, cardY + 4.5);

    // Topic & Card Tag
    doc.setFillColor(219, 234, 254);
    doc.roundedRect(cardX + 3, cardY + 3, 24, 4.5, 1, 1, 'F');
    doc.setFont('helvetica', 'bold');
    doc.setFontSize(6.5);
    doc.setTextColor(30, 64, 175);
    doc.text(cleanText(`OND. ${lesson.topicNumber} #${idx + 1}`), cardX + 5, cardY + 6.2);

    // Large Afrikaans Word
    doc.setFont('helvetica', 'bold');
    doc.setFontSize(13);
    doc.setTextColor(15, 23, 42);
    doc.text(cleanText(word.afrikaans), cardX + 4, cardY + 14);

    // Pronunciation Guide
    doc.setFont('helvetica', 'normal');
    doc.setFontSize(8);
    doc.setTextColor(100, 116, 139);
    doc.text(cleanText(`[${word.pronunciation}]`), cardX + 4, cardY + 19);

    // Dividing rule inside card
    doc.setDrawColor(226, 232, 240);
    doc.setLineWidth(0.2);
    doc.line(cardX + 3, cardY + 22, cardX + cardWidth - 3, cardY + 22);

    // English Meaning
    doc.setFont('helvetica', 'bold');
    doc.setFontSize(9);
    doc.setTextColor(37, 99, 235);
    doc.text(cleanText(`Engels: ${word.english}`), cardX + 4, cardY + 28);

    // Category / Part of Speech
    doc.setFont('helvetica', 'normal');
    doc.setFontSize(7);
    doc.setTextColor(100, 116, 139);
    doc.text(cleanText(`Kategorie: ${word.category}`), cardX + 4, cardY + 33);

    // Example Sentence (Afrikaans)
    doc.setFont('helvetica', 'bold');
    doc.setFontSize(7.5);
    doc.setTextColor(51, 65, 85);
    const exAfSplit = doc.splitTextToSize(cleanText(`Sin: "${word.exampleSentenceAf}"`), cardWidth - 8);
    doc.text(exAfSplit, cardX + 4, cardY + 38);

    // Example Sentence Translation (English)
    doc.setFont('helvetica', 'italic');
    doc.setFontSize(7);
    doc.setTextColor(148, 163, 184);
    const exEnSplit = doc.splitTextToSize(cleanText(`"${word.exampleSentenceEn}"`), cardWidth - 8);
    doc.text(exEnSplit, cardX + 4, cardY + 46);
  });

  drawPageFooter(doc, 1, 1);

  const cleanTitle = lesson.titleAf.replace(/[^a-zA-Z0-9]/g, '_');
  doc.save(`Graad_4_Afrikaans_Flitskaarte_Onderwerp_${lesson.topicNumber}_${cleanTitle}.pdf`);
}

/**
 * 3. MASTER STUDY GUIDE BUNDLE (ALL COMPLETED LESSONS COMBINED)
 */
export function generateMasterStudyGuideBundlePdf(lessons: LessonContent[], studentName = ''): void {
  if (lessons.length === 0) return;

  const doc = new jsPDF({
    orientation: 'portrait',
    unit: 'mm',
    format: 'a4'
  });

  const pageWidth = doc.internal.pageSize.getWidth();
  const pageHeight = doc.internal.pageSize.getHeight();
  const margin = 12;
  const contentWidth = pageWidth - margin * 2;
  const totalPages = lessons.length + 1; // 1 cover page + 1 page per lesson

  // ==========================================
  // COVER PAGE (BLADSY 1)
  // ==========================================
  // Border
  doc.setDrawColor(245, 158, 11);
  doc.setLineWidth(1);
  doc.roundedRect(margin, margin, contentWidth, pageHeight - margin * 2, 4, 4, 'D');

  // Title Box
  doc.setFillColor(245, 158, 11);
  doc.roundedRect(margin + 5, margin + 20, contentWidth - 10, 40, 3, 3, 'F');

  doc.setFont('helvetica', 'bold');
  doc.setFontSize(11);
  doc.setTextColor(255, 255, 255);
  doc.text(cleanText('REPUBLIEK VAN SUID-AFRIKA • KABV KURRIKULUM 2026'), margin + 12, margin + 30);

  doc.setFontSize(18);
  doc.text(cleanText('VOLLEDIGE GRAAD 4 STUDIEGIDS-BUNDEL'), margin + 12, margin + 42);

  doc.setFont('helvetica', 'normal');
  doc.setFontSize(10);
  doc.text(cleanText('Afrikaans Eerste Addisionele Taal & Huistaal • Saamgestel uit Voltooide Modules'), margin + 12, margin + 50);

  // Student Name & Achievement Box
  doc.setFillColor(254, 243, 199);
  doc.roundedRect(margin + 15, margin + 75, contentWidth - 30, 28, 2, 2, 'FD');

  const displayName = studentName.trim() ? studentName : 'Graad 4 Leerder';
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(12);
  doc.setTextColor(120, 53, 15);
  doc.text(cleanText(`Leerder: ${displayName}`), margin + 20, margin + 86);

  doc.setFontSize(9);
  doc.setFont('helvetica', 'normal');
  doc.text(cleanText(`Voltooide Modules Ingesluit: ${lessons.length} van 15 KABV Onderwerpe`), margin + 20, margin + 94);
  const todayStr = new Date().toLocaleDateString('af-ZA');
  doc.text(cleanText(`Uitgereik op: ${todayStr} • www.afrikaansavontuur.co.za`), margin + 20, margin + 100);

  // Table of Contents
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(11);
  doc.setTextColor(30, 41, 59);
  doc.text(cleanText('INHOUDSOPGAWE VAN HIERDIE BUNDEL:'), margin + 15, margin + 120);

  let tocY = margin + 128;
  lessons.forEach((l, idx) => {
    doc.setFont('helvetica', 'bold');
    doc.setFontSize(8.5);
    doc.setTextColor(15, 23, 42);
    doc.text(cleanText(`• Onderwerp ${l.topicNumber}: ${l.titleAf}`), margin + 18, tocY);

    doc.setFont('helvetica', 'italic');
    doc.setTextColor(100, 116, 139);
    doc.text(cleanText(`(${l.titleEn})`), margin + 85, tocY);

    doc.setFont('helvetica', 'normal');
    doc.text(cleanText(`Bladsy ${idx + 2}`), margin + contentWidth - 35, tocY);
    tocY += 7.5;
  });

  drawPageFooter(doc, 1, totalPages);

  // ==========================================
  // SUBSEQUENT PAGES: EACH LESSON'S GUIDE
  // ==========================================
  lessons.forEach((lesson, index) => {
    doc.addPage();
    const pageNum = index + 2;
    let y = drawStudyGuideHeader(doc, lesson, studentName, pageNum, totalPages);

    // Golden rule
    doc.setFillColor(236, 253, 245);
    doc.setDrawColor(16, 185, 129);
    doc.setLineWidth(0.4);
    doc.roundedRect(margin, y, contentWidth, 22, 2, 2, 'FD');

    doc.setFont('helvetica', 'bold');
    doc.setFontSize(8.5);
    doc.setTextColor(6, 95, 70);
    doc.text(cleanText("OLLIE SE GOEIE WENKE & GOUE REËL:"), margin + 4, y + 5.5);

    doc.setFont('helvetica', 'bold');
    doc.setFontSize(8);
    doc.setTextColor(15, 23, 42);
    const splitAf = doc.splitTextToSize(cleanText(lesson.ollieTip.afrikaans), contentWidth - 8);
    doc.text(splitAf, margin + 4, y + 10.5);

    y += 26;

    // Vocab Table
    doc.setFont('helvetica', 'bold');
    doc.setFontSize(9.5);
    doc.setTextColor(30, 41, 59);
    doc.text(cleanText(`1. Belangrike Woordeskat (Onderwerp ${lesson.topicNumber})`), margin, y);
    y += 4;

    doc.setFillColor(241, 245, 249);
    doc.setDrawColor(203, 213, 225);
    doc.rect(margin, y, contentWidth, 6, 'FD');

    doc.setFont('helvetica', 'bold');
    doc.setFontSize(7.5);
    doc.setTextColor(51, 65, 85);
    doc.text(cleanText('Afrikaans'), margin + 3, y + 4.5);
    doc.text(cleanText('Uitspraak'), margin + 45, y + 4.5);
    doc.text(cleanText('Engels'), margin + 90, y + 4.5);
    doc.text(cleanText('Voorbeeld'), margin + 130, y + 4.5);
    y += 6;

    lesson.vocabulary.slice(0, 7).forEach((v, vIdx) => {
      if (vIdx % 2 === 0) {
        doc.setFillColor(248, 250, 252);
        doc.rect(margin, y, contentWidth, 6, 'F');
      }
      doc.setDrawColor(226, 232, 240);
      doc.line(margin, y + 6, margin + contentWidth, y + 6);

      doc.setFont('helvetica', 'bold');
      doc.setFontSize(7.5);
      doc.setTextColor(15, 23, 42);
      doc.text(cleanText(v.afrikaans), margin + 3, y + 4.2);

      doc.setFont('helvetica', 'normal');
      doc.setFontSize(7);
      doc.setTextColor(71, 85, 105);
      doc.text(cleanText(`[${v.pronunciation}]`), margin + 45, y + 4.2);

      doc.setFont('helvetica', 'normal');
      doc.setFontSize(7.5);
      doc.setTextColor(30, 41, 59);
      doc.text(cleanText(v.english), margin + 90, y + 4.2);

      doc.setFont('helvetica', 'italic');
      doc.setFontSize(7);
      doc.setTextColor(100, 116, 139);
      const exTr = v.exampleSentenceAf.length > 35 ? v.exampleSentenceAf.substring(0, 32) + '...' : v.exampleSentenceAf;
      doc.text(cleanText(exTr), margin + 130, y + 4.2);

      y += 6;
    });

    y += 6;

    // Grammar & Practice
    const expl = lesson.explanationBlocks[0];
    if (expl) {
      doc.setFillColor(254, 242, 242);
      doc.setDrawColor(248, 113, 113);
      doc.roundedRect(margin, y, contentWidth, 22, 2, 2, 'FD');

      doc.setFont('helvetica', 'bold');
      doc.setFontSize(8);
      doc.setTextColor(153, 27, 27);
      doc.text(cleanText(`2. ${expl.headingAf} (${expl.headingEn})`), margin + 4, y + 5);

      doc.setFont('helvetica', 'normal');
      doc.setFontSize(7.5);
      doc.setTextColor(30, 41, 59);
      const cs = doc.splitTextToSize(cleanText(expl.contentAf), contentWidth - 8);
      doc.text(cs, margin + 4, y + 10);

      y += 26;
    }

    // Practice drill questions
    doc.setFont('helvetica', 'bold');
    doc.setFontSize(9.5);
    doc.setTextColor(30, 41, 59);
    doc.text(cleanText("3. Handgeskrewe Inoefening (Practice Drills)"), margin, y);
    y += 5;

    lesson.questions.slice(0, 3).forEach((q, qIdx) => {
      doc.setFont('helvetica', 'bold');
      doc.setFontSize(7.5);
      doc.setTextColor(15, 23, 42);
      doc.text(cleanText(`${qIdx + 1}. ${q.promptAf} (${q.promptEn})`), margin, y);
      y += 4;

      doc.setDrawColor(203, 213, 225);
      doc.setLineDashPattern([1, 1], 0);
      doc.line(margin + 5, y + 2, margin + contentWidth, y + 2);
      doc.setLineDashPattern([], 0);
      y += 7;
    });

    drawPageFooter(doc, pageNum, totalPages);
  });

  const cleanName = studentName.trim() ? studentName.replace(/[^a-zA-Z0-9]/g, '_') : 'Leerder';
  doc.save(`Graad_4_Afrikaans_Volledige_Studiegids_Bundel_${cleanName}.pdf`);
}

/**
 * 4. MASTER FLASHCARDS BUNDLE (ALL COMPLETED LESSONS COMBINED)
 */
export function generateMasterFlashcardsBundlePdf(lessons: LessonContent[], studentName = ''): void {
  if (lessons.length === 0) return;

  const doc = new jsPDF({
    orientation: 'portrait',
    unit: 'mm',
    format: 'a4'
  });

  const pageWidth = doc.internal.pageSize.getWidth();
  const pageHeight = doc.internal.pageSize.getHeight();
  const margin = 12;
  const contentWidth = pageWidth - margin * 2;
  const cardWidth = (contentWidth - 6) / 2;
  const cardHeight = 54;
  const totalPages = lessons.length;

  lessons.forEach((lesson, lIdx) => {
    if (lIdx > 0) doc.addPage();

    // Top Header
    doc.setFillColor(59, 130, 246);
    doc.roundedRect(margin, 10, contentWidth, 20, 2.5, 2.5, 'F');

    doc.setFont('helvetica', 'bold');
    doc.setFontSize(8);
    doc.setTextColor(255, 255, 255);
    doc.text(cleanText('AFRIKAANS AVONTUUR • GRAAD 4 KABV FLITSKAARTE BUNDEL'), margin + 5, 16);

    doc.setFontSize(12);
    doc.text(
      cleanText(`FLITSKAARTE: ONDERWERP ${lesson.topicNumber} - ${lesson.titleAf.toUpperCase()}`),
      margin + 5,
      22
    );

    doc.setFont('helvetica', 'normal');
    doc.setFontSize(7.5);
    doc.setTextColor(224, 242, 254);
    const displayName = studentName.trim() ? studentName : 'Mpho / Sarah';
    doc.text(
      cleanText(`Leerder: ${displayName} • Bladsy ${lIdx + 1} van ${totalPages} • Knip op die stippellyne!`),
      margin + 5,
      27
    );

    const y = 35;
    const vocabSample = lesson.vocabulary.slice(0, 8);

    vocabSample.forEach((word, idx) => {
      const col = idx % 2;
      const row = Math.floor(idx / 2);
      const cardX = margin + col * (cardWidth + 6);
      const cardY = y + row * (cardHeight + 4);

      // Card outer cut border
      doc.setDrawColor(148, 163, 184);
      doc.setLineWidth(0.3);
      doc.setLineDashPattern([2, 2], 0);
      doc.roundedRect(cardX, cardY, cardWidth, cardHeight, 2, 2, 'D');
      doc.setLineDashPattern([], 0);

      // Card body
      doc.setFillColor(248, 250, 252);
      doc.roundedRect(cardX + 1, cardY + 1, cardWidth - 2, cardHeight - 2, 1.5, 1.5, 'F');

      doc.setFont('helvetica', 'bold');
      doc.setFontSize(6.5);
      doc.setTextColor(148, 163, 184);
      doc.text(cleanText(`[KNIP HIER]`), cardX + cardWidth - 20, cardY + 4.5);

      doc.setFillColor(219, 234, 254);
      doc.roundedRect(cardX + 3, cardY + 3, 24, 4.5, 1, 1, 'F');
      doc.setFont('helvetica', 'bold');
      doc.setFontSize(6.5);
      doc.setTextColor(30, 64, 175);
      doc.text(cleanText(`OND. ${lesson.topicNumber} #${idx + 1}`), cardX + 5, cardY + 6.2);

      // Word
      doc.setFont('helvetica', 'bold');
      doc.setFontSize(13);
      doc.setTextColor(15, 23, 42);
      doc.text(cleanText(word.afrikaans), cardX + 4, cardY + 14);

      // Pronunciation
      doc.setFont('helvetica', 'normal');
      doc.setFontSize(8);
      doc.setTextColor(100, 116, 139);
      doc.text(cleanText(`[${word.pronunciation}]`), cardX + 4, cardY + 19);

      // Line
      doc.setDrawColor(226, 232, 240);
      doc.setLineWidth(0.2);
      doc.line(cardX + 3, cardY + 22, cardX + cardWidth - 3, cardY + 22);

      // English
      doc.setFont('helvetica', 'bold');
      doc.setFontSize(9);
      doc.setTextColor(37, 99, 235);
      doc.text(cleanText(`Engels: ${word.english}`), cardX + 4, cardY + 28);

      // Example Af
      doc.setFont('helvetica', 'bold');
      doc.setFontSize(7.5);
      doc.setTextColor(51, 65, 85);
      const exAfSplit = doc.splitTextToSize(cleanText(`Sin: "${word.exampleSentenceAf}"`), cardWidth - 8);
      doc.text(exAfSplit, cardX + 4, cardY + 38);

      // Example En
      doc.setFont('helvetica', 'italic');
      doc.setFontSize(7);
      doc.setTextColor(148, 163, 184);
      const exEnSplit = doc.splitTextToSize(cleanText(`"${word.exampleSentenceEn}"`), cardWidth - 8);
      doc.text(exEnSplit, cardX + 4, cardY + 46);
    });

    drawPageFooter(doc, lIdx + 1, totalPages);
  });

  const cleanName = studentName.trim() ? studentName.replace(/[^a-zA-Z0-9]/g, '_') : 'Leerder';
  doc.save(`Graad_4_Afrikaans_Volledige_Flitskaarte_Bundel_${cleanName}.pdf`);
}
