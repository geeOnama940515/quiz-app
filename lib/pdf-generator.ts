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

// Simple PDF generation using browser's print functionality
export const generatePDFReport = async (data: QuizResultData): Promise<void> => {
  try {
    // Create a new window with the report content
    const reportWindow = window.open('', '_blank');
    if (!reportWindow) {
      throw new Error('Popup blocked. Please allow popups for this site.');
    }

    const formatTime = (seconds: number) => {
      const minutes = Math.floor(seconds / 60);
      const remainingSeconds = seconds % 60;
      return `${minutes}:${remainingSeconds.toString().padStart(2, '0')}`;
    };

    const getScoreMessage = (score: number) => {
      if (score >= 90) return 'Outstanding! Excellent programming knowledge.';
      if (score >= 80) return 'Great job! Strong understanding of the concepts.';
      if (score >= 70) return 'Good work! Room for improvement in some areas.';
      if (score >= 60) return 'Fair performance. Consider reviewing the topics.';
      return 'Needs improvement. Focus on studying the fundamentals.';
    };

    const getTopicColor = (topic: string) => {
      switch (topic) {
        case 'HTML': return '#3b82f6';
        case 'C#': return '#10b981';
        case 'Algorithm': return '#8b5cf6';
        default: return '#6b7280';
      }
    };

    const html = `
      <!DOCTYPE html>
      <html>
      <head>
        <title>Programming Assessment Report - ${data.userName}</title>
        <style>
          body {
            font-family: Arial, sans-serif;
            line-height: 1.6;
            margin: 0;
            padding: 20px;
            color: #333;
          }
          .header {
            text-align: center;
            margin-bottom: 30px;
            border-bottom: 2px solid #e5e7eb;
            padding-bottom: 20px;
          }
          .header h1 {
            color: #1f2937;
            margin: 0;
            font-size: 28px;
          }
          .header .date {
            color: #6b7280;
            font-size: 14px;
            margin-top: 10px;
          }
          .section {
            margin-bottom: 30px;
            page-break-inside: avoid;
          }
          .section h2 {
            color: #1f2937;
            border-bottom: 1px solid #e5e7eb;
            padding-bottom: 10px;
            margin-bottom: 15px;
          }
          .candidate-info {
            background: #f9fafb;
            padding: 20px;
            border-radius: 8px;
            margin-bottom: 20px;
          }
          .score-box {
            background: linear-gradient(135deg, #dbeafe 0%, #bfdbfe 100%);
            padding: 20px;
            border-radius: 8px;
            text-align: center;
            margin-bottom: 20px;
          }
          .score-number {
            font-size: 48px;
            font-weight: bold;
            color: ${data.score >= 80 ? '#059669' : data.score >= 60 ? '#d97706' : '#dc2626'};
            margin: 0;
          }
          .score-details {
            font-size: 16px;
            color: #374151;
            margin: 10px 0;
          }
          .score-message {
            font-style: italic;
            color: #6b7280;
          }
          .topic-performance {
            display: grid;
            gap: 15px;
            margin-bottom: 20px;
          }
          .topic-item {
            display: flex;
            align-items: center;
            justify-content: space-between;
            padding: 15px;
            background: #f9fafb;
            border-radius: 8px;
            border-left: 4px solid var(--topic-color);
          }
          .topic-name {
            font-weight: bold;
            font-size: 16px;
          }
          .topic-score {
            font-size: 14px;
            color: #6b7280;
          }
          .question-review {
            margin-top: 30px;
          }
          .question-item {
            border: 1px solid #e5e7eb;
            border-radius: 8px;
            padding: 20px;
            margin-bottom: 20px;
            page-break-inside: avoid;
          }
          .question-header {
            display: flex;
            justify-content: space-between;
            align-items: center;
            margin-bottom: 15px;
          }
          .question-topic {
            background: var(--topic-color);
            color: white;
            padding: 4px 12px;
            border-radius: 20px;
            font-size: 12px;
            font-weight: bold;
          }
          .question-status {
            font-weight: bold;
            font-size: 14px;
          }
          .correct { color: #059669; }
          .incorrect { color: #dc2626; }
          .question-text {
            font-weight: bold;
            margin-bottom: 15px;
            font-size: 16px;
          }
          .options {
            margin-bottom: 15px;
          }
          .option {
            padding: 8px 12px;
            margin: 5px 0;
            border-radius: 4px;
            font-size: 14px;
          }
          .option.correct-answer {
            background: #d1fae5;
            border: 1px solid #10b981;
            color: #065f46;
          }
          .option.user-answer {
            background: #fee2e2;
            border: 1px solid #ef4444;
            color: #991b1b;
          }
          .option.normal {
            background: #f9fafb;
            border: 1px solid #e5e7eb;
          }
          .explanation {
            background: #eff6ff;
            border: 1px solid #3b82f6;
            border-radius: 4px;
            padding: 12px;
            font-size: 14px;
            color: #1e40af;
            margin-top: 10px;
          }
          .explanation strong {
            color: #1e3a8a;
          }
          @media print {
            body { margin: 0; }
            .no-print { display: none; }
            .page-break { page-break-before: always; }
          }
          .print-button {
            position: fixed;
            top: 20px;
            right: 20px;
            background: #3b82f6;
            color: white;
            border: none;
            padding: 12px 24px;
            border-radius: 6px;
            cursor: pointer;
            font-size: 14px;
            font-weight: bold;
            box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
          }
          .print-button:hover {
            background: #2563eb;
          }
        </style>
      </head>
      <body>
        <button class="print-button no-print" onclick="window.print()">Print/Save as PDF</button>
        
        <div class="header">
          <h1>Programming Assessment Report</h1>
          <div class="date">Generated on: ${new Date().toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'long',
            day: 'numeric',
            hour: '2-digit',
            minute: '2-digit'
          })}</div>
        </div>

        <div class="section">
          <h2>Candidate Information</h2>
          <div class="candidate-info">
            <p><strong>Name:</strong> ${data.userName}</p>
            <p><strong>Assessment Type:</strong> Programming Knowledge Assessment</p>
            <p><strong>Duration:</strong> ${formatTime(data.timeSpent)} minutes</p>
          </div>
        </div>

        <div class="section">
          <h2>Overall Results</h2>
          <div class="score-box">
            <div class="score-number">${data.score}%</div>
            <div class="score-details">${data.correctAnswers} out of ${data.totalQuestions} questions correct</div>
            <div class="score-message">${getScoreMessage(data.score)}</div>
          </div>
        </div>

        <div class="section">
          <h2>Topic Performance</h2>
          <div class="topic-performance">
            ${Object.entries(data.topicStats).map(([topic, stats]) => {
              const percentage = Math.round((stats.correct / stats.total) * 100);
              return `
                <div class="topic-item" style="--topic-color: ${getTopicColor(topic)}">
                  <div>
                    <div class="topic-name">${topic}</div>
                    <div class="topic-score">${stats.correct}/${stats.total} questions</div>
                  </div>
                  <div style="font-weight: bold; font-size: 18px; color: ${getTopicColor(topic)}">${percentage}%</div>
                </div>
              `;
            }).join('')}
          </div>
        </div>

        <div class="section page-break">
          <h2>Question Review</h2>
          <div class="question-review">
            ${data.questions.map((question, index) => {
              const isCorrect = data.answers[index] === question.correctAnswer;
              const userAnswer = data.answers[index];
              
              return `
                <div class="question-item" style="--topic-color: ${getTopicColor(question.topic)}">
                  <div class="question-header">
                    <div class="question-topic" style="background: ${getTopicColor(question.topic)}">${question.topic}</div>
                    <div class="question-status ${isCorrect ? 'correct' : 'incorrect'}">
                      ${isCorrect ? '✓ Correct' : '✗ Incorrect'}
                    </div>
                  </div>
                  
                  <div class="question-text">Q${index + 1}. ${question.question}</div>
                  
                  <div class="options">
                    ${question.options.map((option, optionIndex) => {
                      let className = 'option normal';
                      let suffix = '';
                      
                      if (optionIndex === question.correctAnswer) {
                        className = 'option correct-answer';
                        suffix = ' (Correct Answer)';
                      } else if (optionIndex === userAnswer && !isCorrect) {
                        className = 'option user-answer';
                        suffix = ' (Your Answer)';
                      }
                      
                      return `
                        <div class="${className}">
                          ${String.fromCharCode(65 + optionIndex)}. ${option}${suffix}
                        </div>
                      `;
                    }).join('')}
                  </div>
                  
                  ${question.explanation ? `
                    <div class="explanation">
                      <strong>Explanation:</strong> ${question.explanation}
                    </div>
                  ` : ''}
                </div>
              `;
            }).join('')}
          </div>
        </div>

        <script>
          // Auto-focus for better printing experience
          window.onload = function() {
            document.querySelector('.print-button').focus();
          };
        </script>
      </body>
      </html>
    `;

    reportWindow.document.write(html);
    reportWindow.document.close();
    
    // Focus the new window
    reportWindow.focus();
    
  } catch (error) {
    console.error('Error generating PDF report:', error);
    throw new Error('Failed to generate PDF report. Please try again.');
  }
};

export const generateQuickPDF = async (data: QuizResultData): Promise<void> => {
  try {
    const reportWindow = window.open('', '_blank');
    if (!reportWindow) {
      throw new Error('Popup blocked. Please allow popups for this site.');
    }

    const formatTime = (seconds: number) => {
      const minutes = Math.floor(seconds / 60);
      const remainingSeconds = seconds % 60;
      return `${minutes}:${remainingSeconds.toString().padStart(2, '0')}`;
    };

    const html = `
      <!DOCTYPE html>
      <html>
      <head>
        <title>Quiz Summary - ${data.userName}</title>
        <style>
          body {
            font-family: Arial, sans-serif;
            line-height: 1.6;
            margin: 0;
            padding: 40px;
            color: #333;
            max-width: 600px;
            margin: 0 auto;
          }
          .header {
            text-align: center;
            margin-bottom: 40px;
            border-bottom: 2px solid #3b82f6;
            padding-bottom: 20px;
          }
          .header h1 {
            color: #1f2937;
            margin: 0;
            font-size: 24px;
          }
          .summary-box {
            background: linear-gradient(135deg, #dbeafe 0%, #bfdbfe 100%);
            padding: 30px;
            border-radius: 12px;
            text-align: center;
            margin-bottom: 30px;
          }
          .score {
            font-size: 48px;
            font-weight: bold;
            color: ${data.score >= 80 ? '#059669' : data.score >= 60 ? '#d97706' : '#dc2626'};
            margin: 0;
          }
          .details {
            margin: 20px 0;
            font-size: 16px;
          }
          .info-grid {
            display: grid;
            grid-template-columns: 1fr 1fr;
            gap: 20px;
            margin-bottom: 30px;
          }
          .info-item {
            background: #f9fafb;
            padding: 20px;
            border-radius: 8px;
            text-align: center;
          }
          .info-label {
            font-size: 14px;
            color: #6b7280;
            margin-bottom: 5px;
          }
          .info-value {
            font-size: 20px;
            font-weight: bold;
            color: #1f2937;
          }
          .topics {
            margin-bottom: 30px;
          }
          .topic-item {
            display: flex;
            justify-content: space-between;
            align-items: center;
            padding: 15px;
            margin: 10px 0;
            background: #f9fafb;
            border-radius: 8px;
            border-left: 4px solid var(--color);
          }
          .print-button {
            background: #3b82f6;
            color: white;
            border: none;
            padding: 12px 24px;
            border-radius: 6px;
            cursor: pointer;
            font-size: 14px;
            font-weight: bold;
            width: 100%;
            margin-bottom: 20px;
          }
          .print-button:hover {
            background: #2563eb;
          }
          @media print {
            .print-button { display: none; }
          }
        </style>
      </head>
      <body>
        <button class="print-button" onclick="window.print()">Print/Save as PDF</button>
        
        <div class="header">
          <h1>Quiz Results Summary</h1>
        </div>

        <div class="summary-box">
          <div class="score">${data.score}%</div>
          <div class="details">
            ${data.correctAnswers} out of ${data.totalQuestions} questions correct
          </div>
        </div>

        <div class="info-grid">
          <div class="info-item">
            <div class="info-label">Candidate</div>
            <div class="info-value">${data.userName}</div>
          </div>
          <div class="info-item">
            <div class="info-label">Time Taken</div>
            <div class="info-value">${formatTime(data.timeSpent)}</div>
          </div>
        </div>

        <div class="topics">
          <h3>Topic Performance</h3>
          ${Object.entries(data.topicStats).map(([topic, stats]) => {
            const percentage = Math.round((stats.correct / stats.total) * 100);
            const color = topic === 'HTML' ? '#3b82f6' : topic === 'C#' ? '#10b981' : '#8b5cf6';
            return `
              <div class="topic-item" style="--color: ${color}">
                <div>
                  <strong>${topic}</strong><br>
                  <small>${stats.correct}/${stats.total} questions</small>
                </div>
                <div style="font-weight: bold; font-size: 18px; color: ${color}">${percentage}%</div>
              </div>
            `;
          }).join('')}
        </div>

        <div style="text-align: center; color: #6b7280; font-size: 12px; margin-top: 40px;">
          Generated on ${new Date().toLocaleDateString()}
        </div>
      </body>
      </html>
    `;

    reportWindow.document.write(html);
    reportWindow.document.close();
    reportWindow.focus();
    
  } catch (error) {
    console.error('Error generating PDF summary:', error);
    throw new Error('Failed to generate PDF summary. Please try again.');
  }
};