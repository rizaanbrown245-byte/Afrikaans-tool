import { jsPDF } from 'jspdf';
import {
  REVISION_EXAM_QUESTIONS,
  EXAM_SECTIONS,
  COMPREHENSION_STORY,
  TOTAL_EXAM_MARKS,
  ExamQuestion
} from '../data/revisionExamData';

export interface StudentExamPdfData {
  studentName: string;
  dateStr?: string;
  userAnswers: Record<string, string>;
  earnedMarks: number;
  totalMarks: number;
  percent: number;
  breakdown: Record<string, { earned: number; total: number; titleAf: string }>;
}

/**
 * Utility to generate PDF documents for the Grade 4 Afrikaans CAPS Revision Exam
 */

// Helper to sanitize any unsupported unicode characters while preserving Afrikaans accents
function cleanText(text: string): string {
  if (!text) return '';
  return text
    .replace(/[–—]/g, '-')
    .replace(/[“”]/g, '"')
    .replace(/[‘’]/g, "'")
    .replace(/[•]/g, '-')
    .replace(/…/g, '...');
}

// Draw standard document header on first page
function drawFirstPageHeader(
  doc: jsPDF,
  title: string,
  subtitle: string,
  isMemo = false,
  isReport = false
): number {
  const pageWidth = doc.internal.pageSize.getWidth();

  // Top header banner box
  if (isMemo) {
    doc.setFillColor(30, 64, 175); // Dark blue
  } else if (isReport) {
    doc.setFillColor(15, 118, 110); // Teal / emerald
  } else {
    doc.setFillColor(180, 83, 9); // Amber / orange
  }
  doc.rect(14, 12, pageWidth - 28, 26, 'F');

  // Subtitle / Curriculum header
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(8.5);
  doc.setTextColor(255, 255, 255);
  doc.text(
    cleanText('DEPARTEMENT VAN BASIESE ONDERWYS • KABV / CAPS GRAAD 4 EAT & HUISTAAL'),
    pageWidth / 2,
    18,
    { align: 'center' }
  );

  // Main Title
  doc.setFontSize(13);
  doc.text(cleanText(title), pageWidth / 2, 26, { align: 'center' });

  // Secondary label
  doc.setFont('helvetica', 'normal');
  doc.setFontSize(9);
  doc.text(cleanText(subtitle), pageWidth / 2, 33, { align: 'center' });

  // Reset text color
  doc.setTextColor(30, 41, 59);

  return 44;
}

// Draw running footer on each page
function drawPageFooters(doc: jsPDF, docTitle: string) {
  const totalPages = doc.getNumberOfPages();
  const pageWidth = doc.internal.pageSize.getWidth();
  const pageHeight = doc.internal.pageSize.getHeight();

  for (let p = 1; p <= totalPages; p++) {
    doc.setPage(p);
    doc.setDrawColor(203, 213, 225);
    doc.setLineWidth(0.3);
    doc.line(14, pageHeight - 12, pageWidth - 14, pageHeight - 12);

    doc.setFont('helvetica', 'normal');
    doc.setFontSize(7.5);
    doc.setTextColor(100, 116, 139);
    doc.text(
      cleanText(`Ollie Afrikaans Avontuur • ${docTitle}`),
      14,
      pageHeight - 7
    );
    doc.text(
      cleanText(`Bladsy ${p} van ${totalPages}`),
      pageWidth - 14,
      pageHeight - 7,
      { align: 'right' }
    );
  }
}

/**
 * 1. DOWNLOAD CLEAN EXAM QUESTION PAPER (FOR STUDENT TO WRITE)
 */
export function generateExamQuestionPaperPdf(studentName = ''): void {
  const doc = new jsPDF({
    orientation: 'portrait',
    unit: 'mm',
    format: 'a4'
  });

  const pageWidth = doc.internal.pageSize.getWidth();
  const pageHeight = doc.internal.pageSize.getHeight();
  const margin = 14;
  const contentWidth = pageWidth - margin * 2;
  const bottomMargin = 16;

  let y = drawFirstPageHeader(
    doc,
    'GRAAD 4 AFRIKAANS KURRIKULUM HERSIENINGSEKSAMEN',
    `Kwartaal 1 - 4 Omvattende Vraestel • Totaal: ${TOTAL_EXAM_MARKS} Punte • Tyd: 90 Minute`,
    false
  );

  // Student Info Box
  doc.setDrawColor(217, 119, 6);
  doc.setFillColor(254, 243, 199);
  doc.roundedRect(margin, y, contentWidth, 22, 2, 2, 'FD');

  doc.setFont('helvetica', 'bold');
  doc.setFontSize(9);
  doc.setTextColor(120, 53, 15);
  doc.text('LEERDER SE BESONDERHEDE (Learner Details):', margin + 3, y + 5);

  doc.setFont('helvetica', 'normal');
  doc.setFontSize(8.5);
  doc.setTextColor(30, 41, 59);

  // Line 1: Naam & Datum
  const displayName = studentName ? studentName : '____________________________________';
  doc.text(cleanText(`Naam & Van: ${displayName}`), margin + 3, y + 12);
  doc.text(cleanText(`Datum: ________________________`), margin + 110, y + 12);

  // Line 2: Skool / Klas & Punte
  doc.text(cleanText(`Graad / Klas: Graad 4 ____`), margin + 3, y + 18);
  doc.text(cleanText(`Punte Behaal: _____ / 50    (____ %)   Vlak: ____`), margin + 80, y + 18);

  y += 26;

  // Instructions Box
  doc.setDrawColor(203, 213, 225);
  doc.setFillColor(248, 250, 252);
  doc.roundedRect(margin, y, contentWidth, 18, 2, 2, 'FD');

  doc.setFont('helvetica', 'bold');
  doc.setFontSize(8);
  doc.setTextColor(51, 65, 85);
  doc.text('INSTRUKSIES EN INLIGTING VIR DIE LEERDER:', margin + 3, y + 4.5);

  doc.setFont('helvetica', 'normal');
  doc.setFontSize(7.5);
  doc.setTextColor(71, 85, 105);
  doc.text('1. Beantwoord AL 25 vrae in Afdelings A tot E.', margin + 3, y + 8.5);
  doc.text('2. Lees die leesstuk in Afdeling A deeglik voor jy die vrae beantwoord.', margin + 3, y + 12);
  doc.text('3. Skryf netjies en leesbaar. Onthou om STOMPI en korrekte spelling toe te pas. Sterkte!', margin + 3, y + 15.5);

  y += 22;

  // Helper to ensure page break if needed
  const checkPageBreak = (neededHeight: number) => {
    if (y + neededHeight > pageHeight - bottomMargin) {
      doc.addPage();
      y = 16;
      return true;
    }
    return false;
  };

  // Render Section by Section
  EXAM_SECTIONS.forEach((section) => {
    const sectionQuestions = REVISION_EXAM_QUESTIONS.filter((q) => q.sectionId === section.id);

    checkPageBreak(18);

    // Section Banner
    doc.setFillColor(241, 245, 249);
    doc.setDrawColor(148, 163, 184);
    doc.roundedRect(margin, y, contentWidth, 9, 1.5, 1.5, 'FD');

    doc.setFont('helvetica', 'bold');
    doc.setFontSize(9.5);
    doc.setTextColor(15, 23, 42);
    doc.text(cleanText(`${section.titleAf.toUpperCase()} [${section.totalMarks} PUNTE]`), margin + 3, y + 6);

    doc.setFont('helvetica', 'italic');
    doc.setFontSize(7.5);
    doc.setTextColor(100, 116, 139);
    doc.text(cleanText(section.titleEn), pageWidth - margin - 3, y + 6, { align: 'right' });

    y += 12;

    // Special Comprehension Story for Section A
    if (section.id === 'A') {
      checkPageBreak(40);

      doc.setDrawColor(226, 232, 240);
      doc.setFillColor(255, 255, 255);

      const storyLines = doc.splitTextToSize(cleanText(COMPREHENSION_STORY.textAf), contentWidth - 8);
      const storyBoxHeight = storyLines.length * 3.6 + 10;

      checkPageBreak(storyBoxHeight + 4);

      doc.roundedRect(margin, y, contentWidth, storyBoxHeight, 2, 2, 'FD');

      doc.setFont('helvetica', 'bold');
      doc.setFontSize(8.5);
      doc.setTextColor(180, 83, 9);
      doc.text(cleanText(`Leesstuk: "${COMPREHENSION_STORY.title}"`), margin + 4, y + 5);

      doc.setFont('helvetica', 'normal');
      doc.setFontSize(7.5);
      doc.setTextColor(30, 41, 59);
      doc.text(storyLines, margin + 4, y + 10);

      y += storyBoxHeight + 5;
    }

    // Questions in this section
    sectionQuestions.forEach((q) => {
      // Calculate question block height
      const promptLines = doc.splitTextToSize(
        cleanText(`Vraag ${q.questionNumber}. ${q.promptAf}`),
        contentWidth - 20
      );
      const enLines = doc.splitTextToSize(cleanText(`(${q.promptEn})`), contentWidth - 20);

      let optionsHeight = 0;
      if (q.options && q.options.length > 0) {
        optionsHeight = q.options.length * 4.5;
      }
      const answerSpace = 8; // space for written answer line
      const estHeight = promptLines.length * 4 + enLines.length * 3.2 + optionsHeight + answerSpace + 6;

      checkPageBreak(estHeight);

      // Question Number & Prompt
      doc.setFont('helvetica', 'bold');
      doc.setFontSize(8.5);
      doc.setTextColor(15, 23, 42);
      doc.text(promptLines, margin, y);

      // Marks tag on right
      doc.setFont('helvetica', 'bold');
      doc.setFontSize(8);
      doc.setTextColor(180, 83, 9);
      doc.text(cleanText(`[${q.marks} punt${q.marks > 1 ? 'e' : ''}]`), pageWidth - margin, y, { align: 'right' });

      y += promptLines.length * 4;

      // English prompt in italics
      doc.setFont('helvetica', 'italic');
      doc.setFontSize(7.5);
      doc.setTextColor(100, 116, 139);
      doc.text(enLines, margin, y);
      y += enLines.length * 3.4;

      // Scrambled words if present
      if (q.scrambledWords && q.scrambledWords.length > 0) {
        doc.setFont('helvetica', 'bold');
        doc.setFontSize(8);
        doc.setTextColor(79, 70, 229);
        doc.text(cleanText(`Woorde: ${q.scrambledWords.join('  •  ')}`), margin + 4, y);
        y += 4.5;
      }

      // Multiple choice options with tick boxes
      if (q.options && q.options.length > 0) {
        doc.setFont('helvetica', 'normal');
        doc.setFontSize(7.8);
        doc.setTextColor(51, 65, 85);

        const letters = ['A', 'B', 'C', 'D'];
        q.options.forEach((opt, idx) => {
          const letter = letters[idx] || `${idx + 1}`;
          // Draw square checkbox
          doc.setDrawColor(148, 163, 184);
          doc.rect(margin + 4, y - 2.8, 3, 3);
          doc.text(cleanText(`${letter})  ${opt}`), margin + 9, y);
          y += 4.2;
        });
      }

      // Write-in answer line
      doc.setFont('helvetica', 'normal');
      doc.setFontSize(7.5);
      doc.setTextColor(148, 163, 184);
      doc.text('Antwoord: _________________________________________________________________________', margin + 4, y + 1);

      y += 7;
    });

    y += 2;
  });

  // End of exam note
  checkPageBreak(16);
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(9);
  doc.setTextColor(22, 101, 52);
  doc.text(cleanText('--- EINDE VAN DIE VRAESTEL • BAIE GELUK! ---'), pageWidth / 2, y + 4, { align: 'center' });

  // Add footers on every page
  drawPageFooters(doc, 'Graad 4 CAPS Hersieningseksamen (Vraestel)');

  // Save the document
  const fileName = `Graad_4_Afrikaans_Hersieningseksamen_Vraestel_${studentName ? studentName.replace(/\s+/g, '_') : 'Leerder'}.pdf`;
  doc.save(fileName);
}

/**
 * 2. DOWNLOAD OFFICIAL MEMORANDUM & MARKING GUIDELINES
 */
export function generateExamMemorandumPdf(): void {
  const doc = new jsPDF({
    orientation: 'portrait',
    unit: 'mm',
    format: 'a4'
  });

  const pageWidth = doc.internal.pageSize.getWidth();
  const pageHeight = doc.internal.pageSize.getHeight();
  const margin = 14;
  const contentWidth = pageWidth - margin * 2;
  const bottomMargin = 16;

  let y = drawFirstPageHeader(
    doc,
    'AMPTELIKE NASIENMEMORANDUM & RIGLYNE',
    `Graad 4 CAPS Afrikaans EAT & Huistaal • Totaal: ${TOTAL_EXAM_MARKS} Punte • Al 25 Vrae`,
    true
  );

  // Memo Notice Box
  doc.setDrawColor(147, 197, 253);
  doc.setFillColor(239, 246, 255);
  doc.roundedRect(margin, y, contentWidth, 16, 2, 2, 'FD');

  doc.setFont('helvetica', 'bold');
  doc.setFontSize(8.5);
  doc.setTextColor(30, 58, 138);
  doc.text('NASIENRIGLYNE VIR OUERS EN ONDERWYSERS:', margin + 3, y + 4.5);

  doc.setFont('helvetica', 'normal');
  doc.setFontSize(7.5);
  doc.setTextColor(51, 65, 85);
  doc.text('• Hierdie memorandum bevat die modelantwoorde, reëlverduidelikings en CAPS-fokus vir elke vraag.', margin + 3, y + 8.5);
  doc.text('• Ken 2 punte toe vir elke volkome korrekte antwoord (of soos aangedui). Aanvaar toepaslike spelfoute indien betekenis duidelik is.', margin + 3, y + 12.5);

  y += 20;

  const checkPageBreak = (neededHeight: number) => {
    if (y + neededHeight > pageHeight - bottomMargin) {
      doc.addPage();
      y = 16;
      return true;
    }
    return false;
  };

  EXAM_SECTIONS.forEach((section) => {
    const sectionQuestions = REVISION_EXAM_QUESTIONS.filter((q) => q.sectionId === section.id);

    checkPageBreak(16);

    // Section Header
    doc.setFillColor(238, 242, 255);
    doc.setDrawColor(165, 180, 252);
    doc.roundedRect(margin, y, contentWidth, 8, 1.5, 1.5, 'FD');

    doc.setFont('helvetica', 'bold');
    doc.setFontSize(9);
    doc.setTextColor(49, 46, 129);
    doc.text(cleanText(`${section.titleAf.toUpperCase()} • MEMORANDUM (${section.totalMarks} PUNTE)`), margin + 3, y + 5.5);

    y += 11;

    sectionQuestions.forEach((q) => {
      const promptLines = doc.splitTextToSize(cleanText(`Vraag ${q.questionNumber}: ${q.promptAf}`), contentWidth - 10);
      const explLines = doc.splitTextToSize(cleanText(`Verduideliking & Reël: ${q.explanationAf}`), contentWidth - 14);

      const estHeight = promptLines.length * 4 + explLines.length * 3.4 + 16;
      checkPageBreak(estHeight);

      // Question line
      doc.setFont('helvetica', 'bold');
      doc.setFontSize(8);
      doc.setTextColor(15, 23, 42);
      doc.text(promptLines, margin, y);
      y += promptLines.length * 3.8;

      // Answer Box
      doc.setDrawColor(187, 247, 208);
      doc.setFillColor(240, 253, 244);
      const ansBoxH = explLines.length * 3.4 + 10;
      doc.roundedRect(margin + 2, y, contentWidth - 4, ansBoxH, 1.5, 1.5, 'FD');

      doc.setFont('helvetica', 'bold');
      doc.setFontSize(8.5);
      doc.setTextColor(21, 128, 61);
      doc.text(cleanText(`Modelantwoord: ${q.correctAnswer}   [${q.marks} Punte]`), margin + 5, y + 4.5);

      doc.setFont('helvetica', 'normal');
      doc.setFontSize(7.5);
      doc.setTextColor(51, 65, 85);
      doc.text(explLines, margin + 5, y + 8.5);

      y += ansBoxH + 4;
    });

    y += 2;
  });

  drawPageFooters(doc, 'Graad 4 CAPS Hersieningseksamen (Memorandum)');

  doc.save('Graad_4_Afrikaans_Hersieningseksamen_Memorandum.pdf');
}

/**
 * 3. DOWNLOAD LEARNER'S MARKED RESULTS REPORT (REPORT CARD & FEEDBACK)
 */
export function generateStudentExamResultsPdf(data: StudentExamPdfData): void {
  const doc = new jsPDF({
    orientation: 'portrait',
    unit: 'mm',
    format: 'a4'
  });

  const pageWidth = doc.internal.pageSize.getWidth();
  const pageHeight = doc.internal.pageSize.getHeight();
  const margin = 14;
  const contentWidth = pageWidth - margin * 2;
  const bottomMargin = 16;

  const dateStr = data.dateStr || new Date().toLocaleDateString('af-ZA');
  const isPassed = data.percent >= 50;

  // Determine CAPS Achievement Level
  let capsLevel = 'Vlak 1: Nie behaal nie (0-29%)';
  if (data.percent >= 80) capsLevel = 'Vlak 7: Uitstaande prestasie (80-100%)';
  else if (data.percent >= 70) capsLevel = 'Vlak 6: Verdienstelike prestasie (70-79%)';
  else if (data.percent >= 60) capsLevel = 'Vlak 5: Beduidende prestasie (60-69%)';
  else if (data.percent >= 50) capsLevel = 'Vlak 4: Voldoende prestasie (50-59%)';
  else if (data.percent >= 40) capsLevel = 'Vlak 3: Basiese prestasie (40-49%)';
  else if (data.percent >= 30) capsLevel = 'Vlak 2: Elementere prestasie (30-39%)';

  let y = drawFirstPageHeader(
    doc,
    'AMPTELIKE LEERDER-UITSLAE & EKSAMENVERSLAG',
    `Graad 4 CAPS Afrikaans EAT & Huistaal • Hersieningseksamen Verslagkaart`,
    false,
    true
  );

  // Student Scorecard Hero Box
  if (isPassed) {
    doc.setDrawColor(16, 185, 129);
    doc.setFillColor(236, 253, 245);
  } else {
    doc.setDrawColor(245, 158, 11);
    doc.setFillColor(254, 243, 199);
  }
  doc.roundedRect(margin, y, contentWidth, 26, 2.5, 2.5, 'FD');

  doc.setFont('helvetica', 'bold');
  doc.setFontSize(10);
  if (isPassed) {
    doc.setTextColor(6, 95, 70);
  } else {
    doc.setTextColor(146, 64, 14);
  }
  doc.text(cleanText(`Leerder: ${data.studentName || 'Graad 4 Leerder'}`), margin + 4, y + 6);

  doc.setFont('helvetica', 'normal');
  doc.setFontSize(8.5);
  doc.text(cleanText(`Datum Voltooi: ${dateStr}`), margin + 4, y + 12);
  doc.text(cleanText(`KABV Prestasievlak: ${capsLevel}`), margin + 4, y + 18);

  // Big score badge on right
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(18);
  if (isPassed) {
    doc.setTextColor(4, 120, 87);
  } else {
    doc.setTextColor(180, 83, 9);
  }
  doc.text(cleanText(`${data.earnedMarks} / ${data.totalMarks}`), pageWidth - margin - 6, y + 11, { align: 'right' });

  doc.setFontSize(11);
  doc.text(cleanText(`${data.percent}%  (${isPassed ? 'GESLAAG' : 'HOU AAN OEFEN'})`), pageWidth - margin - 6, y + 19, { align: 'right' });

  y += 30;

  // Section Breakdown Table
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(9);
  doc.setTextColor(15, 23, 42);
  doc.text('UITSLAE PER KABV AFDELING:', margin, y);
  y += 4;

  // Table header
  doc.setFillColor(241, 245, 249);
  doc.rect(margin, y, contentWidth, 6, 'F');
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(7.5);
  doc.setTextColor(71, 85, 105);
  doc.text('Afdeling & Kurrikulumfokus', margin + 2, y + 4);
  doc.text('Totaal', margin + 110, y + 4);
  doc.text('Behaal', margin + 130, y + 4);
  doc.text('Persentasie', margin + 155, y + 4);
  y += 6;

  // Table rows
  Object.entries(data.breakdown).forEach(([secId, secData]) => {
    const secPercent = Math.round((secData.earned / secData.total) * 100);
    doc.setFont('helvetica', 'normal');
    doc.setFontSize(7.5);
    doc.setTextColor(30, 41, 59);

    doc.text(cleanText(`Afdeling ${secId}: ${secData.titleAf}`), margin + 2, y + 4);
    doc.text(`${secData.total}`, margin + 112, y + 4);
    doc.text(`${secData.earned}`, margin + 132, y + 4);

    doc.setFont('helvetica', 'bold');
    if (secPercent >= 80) doc.setTextColor(22, 101, 52);
    else if (secPercent >= 50) doc.setTextColor(180, 83, 9);
    else doc.setTextColor(185, 28, 28);

    doc.text(`${secPercent}%`, margin + 158, y + 4);

    doc.setDrawColor(241, 245, 249);
    doc.line(margin, y + 5.5, pageWidth - margin, y + 5.5);
    y += 6;
  });

  y += 4;

  const checkPageBreak = (neededHeight: number) => {
    if (y + neededHeight > pageHeight - bottomMargin) {
      doc.addPage();
      y = 16;
      return true;
    }
    return false;
  };

  // Detailed Question-by-Question Marking Review
  checkPageBreak(14);
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(9);
  doc.setTextColor(15, 23, 42);
  doc.text('VOLLEDIGE VRAAG-VIR-VRAAG NASIENVERSLAG:', margin, y);
  y += 5;

  REVISION_EXAM_QUESTIONS.forEach((q) => {
    const userAns = data.userAnswers[q.id];
    const isCorrect = userAns && userAns.trim().toLowerCase() === q.correctAnswer.trim().toLowerCase();

    const promptLines = doc.splitTextToSize(cleanText(`Vraag ${q.questionNumber}: ${q.promptAf}`), contentWidth - 25);
    const explLines = doc.splitTextToSize(cleanText(`Nota: ${q.explanationAf}`), contentWidth - 12);

    const estHeight = promptLines.length * 3.8 + explLines.length * 3.2 + 16;
    checkPageBreak(estHeight);

    // Box border
    if (isCorrect) {
      doc.setDrawColor(187, 247, 208);
      doc.setFillColor(240, 253, 244);
    } else {
      doc.setDrawColor(254, 202, 202);
      doc.setFillColor(254, 242, 242);
    }
    const boxH = promptLines.length * 3.8 + explLines.length * 3.2 + 13;
    doc.roundedRect(margin, y, contentWidth, boxH, 1.5, 1.5, 'FD');

    // Question
    doc.setFont('helvetica', 'bold');
    doc.setFontSize(8);
    doc.setTextColor(15, 23, 42);
    doc.text(promptLines, margin + 3, y + 4);

    // Correct / Incorrect Tag
    doc.setFont('helvetica', 'bold');
    doc.setFontSize(8);
    if (isCorrect) {
      doc.setTextColor(21, 128, 61);
      doc.text(cleanText(`[KORREK +${q.marks}]`), pageWidth - margin - 4, y + 4, { align: 'right' });
    } else {
      doc.setTextColor(185, 28, 28);
      doc.text(cleanText(`[0 / ${q.marks}]`), pageWidth - margin - 4, y + 4, { align: 'right' });
    }

    const currentY = y + promptLines.length * 3.8 + 4;

    // Student answer vs Correct answer
    doc.setFont('helvetica', 'normal');
    doc.setFontSize(7.5);
    doc.setTextColor(51, 65, 85);
    const studentAnsText = userAns ? userAns : '(Nie beantwoord nie)';
    doc.text(cleanText(`Leerder se antwoord: "${studentAnsText}"`), margin + 3, currentY);

    if (!isCorrect) {
      doc.setFont('helvetica', 'bold');
      doc.setTextColor(21, 128, 61);
      doc.text(cleanText(`Korrekte antwoord: "${q.correctAnswer}"`), margin + 85, currentY);
    }

    // Explanation
    doc.setFont('helvetica', 'italic');
    doc.setFontSize(7);
    doc.setTextColor(100, 116, 139);
    doc.text(explLines, margin + 3, currentY + 4.5);

    y += boxH + 3.5;
  });

  // Parent / Teacher Signature box
  checkPageBreak(25);
  doc.setDrawColor(203, 213, 225);
  doc.setFillColor(248, 250, 252);
  doc.roundedRect(margin, y, contentWidth, 20, 2, 2, 'FD');

  doc.setFont('helvetica', 'bold');
  doc.setFontSize(8);
  doc.setTextColor(51, 65, 85);
  doc.text('KOMMENTAAR & HANDTEKENING (Parent / Teacher Sign-off):', margin + 3, y + 4.5);

  doc.setFont('helvetica', 'normal');
  doc.setFontSize(7.5);
  doc.text('Onderwyser / Ouer Handtekening: _____________________________', margin + 3, y + 11);
  doc.text('Datum: _____________________', margin + 110, y + 11);
  doc.text('Kommentaar: ____________________________________________________________________________________', margin + 3, y + 16);

  drawPageFooters(doc, `Uitslae-Verslag: ${data.studentName || 'Leerder'}`);

  const safeName = (data.studentName || 'Leerder').replace(/\s+/g, '_');
  doc.save(`Graad_4_Afrikaans_Eksamenuitslag_${safeName}.pdf`);
}
