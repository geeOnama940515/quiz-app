import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';
import { Question } from './questions';

export interface QuizResultData {
  userName: string;
  score: number;
  correctAnswers: number;
  totalQuestions: number;
  timeSpent: number;
  questions: Question[];
  answers: number[];
  topicStats: {
    [key: string]: {
      correct: number;
      total: number;
    };
  };
}

export const generatePDFReport = async (data: QuizResultData): Promise<void> => {
  const pdf = new jsPDF('p', 'mm', 'a4');
  const pageWidth = pdf.internal.pageSize.getWidth();
  const pageHeight = pdf.internal.pageSize.getHeight();
  const margin = 20;
  let yPosition = margin;

  // Helper function to add new page if needed
  const checkPageBreak = (requiredHeight: number) => {
    if (yPosition + requiredHeight > pageHeight - margin) {
      pdf.addPage();
      yPosition = margin;
    }
  };

  // Header
  pdf.setFontSize(24);
  pdf.setFont('helvetica', 'bold');
  pdf.text('Programming Assessment Report', pageWidth / 2, yPosition, { align: 'center' });
  yPosition += 15;

  // Date
  pdf.setFontSize(10);
  pdf.setFont('helvetica', 'normal');
  const currentDate = new Date().toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit'
  });
  pdf.text(`Generated on: ${currentDate}`, pageWidth / 2, yPosition, { align: 'center' });
  yPosition += 20;

  // Candidate Information
  pdf.setFontSize(16);
  pdf.setFont('helvetica', 'bold');
  pdf.text('Candidate Information', margin, yPosition);
  yPosition += 10;

  pdf.setFontSize(12);
  pdf.setFont('helvetica', 'normal');
  pdf.text(`Name: ${data.userName}`, margin, yPosition);
  yPosition += 8;
  pdf.text(`Assessment Type: Programming Knowledge Assessment`, margin, yPosition);
  yPosition += 8;
  pdf.text(`Duration: ${Math.floor(data.timeSpent / 60)}:${(data.timeSpent % 60).toString().padStart(2, '0')} minutes`, margin, yPosition);
  yPosition += 15;

  // Overall Results
  pdf.setFontSize(16);
  pdf.setFont('helvetica', 'bold');
  pdf.text('Overall Results', margin, yPosition);
  yPosition += 10;

  // Score box
  pdf.setDrawColor(0, 0, 0);
  pdf.setFillColor(240, 248, 255);
  pdf.rect(margin, yPosition, pageWidth - 2 * margin, 25, 'F');
  pdf.rect(margin, yPosition, pageWidth - 2 * margin, 25, 'S');

  pdf.setFontSize(20);
  pdf.setFont('helvetica', 'bold');
  const scoreColor = data.score >= 80 ? [34, 197, 94] : data.score >= 60 ? [234, 179, 8] : [239, 68, 68];
  pdf.setTextColor(scoreColor[0], scoreColor[1], scoreColor[2]);
  pdf.text(`${data.score}%`, margin + 10, yPosition + 15);

  pdf.setTextColor(0, 0, 0);
  pdf.setFontSize(12);
  pdf.setFont('helvetica', 'normal');
  pdf.text(`${data.correctAnswers} out of ${data.totalQuestions} questions correct`, margin + 60, yPosition + 10);

  const getScoreMessage = (score: number) => {
    if (score >= 90) return 'Outstanding! Excellent programming knowledge.';
    if (score >= 80) return 'Great job! Strong understanding of the concepts.';
    if (score >= 70) return 'Good work! Room for improvement in some areas.';
    if (score >= 60) return 'Fair performance. Consider reviewing the topics.';
    return 'Needs improvement. Focus on studying the fundamentals.';
  };

  pdf.text(getScoreMessage(data.score), margin + 60, yPosition + 18);
  yPosition += 35;

  // Topic Performance
  pdf.setFontSize(16);
  pdf.setFont('helvetica', 'bold');
  pdf.text('Topic Performance', margin, yPosition);
  yPosition += 10;

  Object.entries(data.topicStats).forEach(([topic, stats]) => {
    const percentage = Math.round((stats.correct / stats.total) * 100);
    
    pdf.setFontSize(12);
    pdf.setFont('helvetica', 'bold');
    pdf.text(`${topic}:`, margin, yPosition);
    
    pdf.setFont('helvetica', 'normal');
    pdf.text(`${stats.correct}/${stats.total} (${percentage}%)`, margin + 60, yPosition);
    
    // Progress bar
    const barWidth = 80;
    const barHeight = 4;
    pdf.setDrawColor(200, 200, 200);
    pdf.rect(margin + 120, yPosition - 3, barWidth, barHeight, 'S');
    
    const fillWidth = (percentage / 100) * barWidth;
    const barColor = percentage >= 80 ? [34, 197, 94] : percentage >= 60 ? [234, 179, 8] : [239, 68, 68];
    pdf.setFillColor(barColor[0], barColor[1], barColor[2]);
    pdf.rect(margin + 120, yPosition - 3, fillWidth, barHeight, 'F');
    
    yPosition += 12;
  });

  yPosition += 10;

  // Question Review
  checkPageBreak(20);
  pdf.setFontSize(16);
  pdf.setFont('helvetica', 'bold');
  pdf.text('Question Review', margin, yPosition);
  yPosition += 15;

  data.questions.forEach((question, index) => {
    const isCorrect = data.answers[index] === question.correctAnswer;
    const userAnswer = data.answers[index];
    
    checkPageBreak(40);
    
    // Question header
    pdf.setFontSize(12);
    pdf.setFont('helvetica', 'bold');
    pdf.text(`Q${index + 1}. ${question.topic}`, margin, yPosition);
    
    // Correct/Incorrect indicator
    const statusColor = isCorrect ? [34, 197, 94] : [239, 68, 68];
    pdf.setTextColor(statusColor[0], statusColor[1], statusColor[2]);
    pdf.text(isCorrect ? '✓ Correct' : '✗ Incorrect', pageWidth - margin - 30, yPosition);
    pdf.setTextColor(0, 0, 0);
    
    yPosition += 8;
    
    // Question text
    pdf.setFont('helvetica', 'normal');
    const questionLines = pdf.splitTextToSize(question.question, pageWidth - 2 * margin);
    pdf.text(questionLines, margin, yPosition);
    yPosition += questionLines.length * 5 + 5;
    
    // Options
    question.options.forEach((option, optionIndex) => {
      checkPageBreak(6);
      
      const prefix = String.fromCharCode(65 + optionIndex) + '. ';
      let optionText = prefix + option;
      
      if (optionIndex === question.correctAnswer) {
        pdf.setFont('helvetica', 'bold');
        pdf.setTextColor(34, 197, 94);
        optionText += ' (Correct Answer)';
      } else if (optionIndex === userAnswer && !isCorrect) {
        pdf.setFont('helvetica', 'bold');
        pdf.setTextColor(239, 68, 68);
        optionText += ' (Your Answer)';
      } else {
        pdf.setFont('helvetica', 'normal');
        pdf.setTextColor(0, 0, 0);
      }
      
      const optionLines = pdf.splitTextToSize(optionText, pageWidth - 2 * margin - 10);
      pdf.text(optionLines, margin + 5, yPosition);
      yPosition += optionLines.length * 5;
      
      pdf.setTextColor(0, 0, 0);
    });
    
    // Explanation
    if (question.explanation) {
      checkPageBreak(15);
      yPosition += 3;
      pdf.setFontSize(10);
      pdf.setFont('helvetica', 'italic');
      pdf.setTextColor(100, 100, 100);
      const explanationLines = pdf.splitTextToSize(`Explanation: ${question.explanation}`, pageWidth - 2 * margin);
      pdf.text(explanationLines, margin, yPosition);
      yPosition += explanationLines.length * 4;
      pdf.setTextColor(0, 0, 0);
    }
    
    yPosition += 10;
  });

  // Footer
  const totalPages = pdf.getNumberOfPages();
  for (let i = 1; i <= totalPages; i++) {
    pdf.setPage(i);
    pdf.setFontSize(8);
    pdf.setFont('helvetica', 'normal');
    pdf.setTextColor(100, 100, 100);
    pdf.text(`Page ${i} of ${totalPages}`, pageWidth / 2, pageHeight - 10, { align: 'center' });
    pdf.text('Programming Assessment Report - Confidential', pageWidth / 2, pageHeight - 5, { align: 'center' });
  }

  // Save the PDF
  const fileName = `${data.userName.replace(/\s+/g, '_')}_Assessment_Report_${new Date().toISOString().split('T')[0]}.pdf`;
  pdf.save(fileName);
};

export const generateQuickPDF = async (data: QuizResultData): Promise<void> => {
  const pdf = new jsPDF('p', 'mm', 'a4');
  const pageWidth = pdf.internal.pageSize.getWidth();
  let yPosition = 30;

  // Header
  pdf.setFontSize(20);
  pdf.setFont('helvetica', 'bold');
  pdf.text('Quiz Results Summary', pageWidth / 2, yPosition, { align: 'center' });
  yPosition += 20;

  // Basic info
  pdf.setFontSize(12);
  pdf.setFont('helvetica', 'normal');
  pdf.text(`Name: ${data.userName}`, 20, yPosition);
  yPosition += 8;
  pdf.text(`Score: ${data.score}% (${data.correctAnswers}/${data.totalQuestions})`, 20, yPosition);
  yPosition += 8;
  pdf.text(`Time: ${Math.floor(data.timeSpent / 60)}:${(data.timeSpent % 60).toString().padStart(2, '0')}`, 20, yPosition);
  yPosition += 8;
  pdf.text(`Date: ${new Date().toLocaleDateString()}`, 20, yPosition);
  yPosition += 15;

  // Topic breakdown
  pdf.setFont('helvetica', 'bold');
  pdf.text('Topic Performance:', 20, yPosition);
  yPosition += 8;

  pdf.setFont('helvetica', 'normal');
  Object.entries(data.topicStats).forEach(([topic, stats]) => {
    const percentage = Math.round((stats.correct / stats.total) * 100);
    pdf.text(`${topic}: ${stats.correct}/${stats.total} (${percentage}%)`, 25, yPosition);
    yPosition += 6;
  });

  const fileName = `${data.userName.replace(/\s+/g, '_')}_Quiz_Summary.pdf`;
  pdf.save(fileName);
};