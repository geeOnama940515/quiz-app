'use client';

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Separator } from '@/components/ui/separator';
import { Trophy, Clock, Target, BookOpen, RotateCcw, CheckCircle, XCircle, Download, FileText } from 'lucide-react';
import { Question } from '@/lib/questions';
import type { QuizResultData } from '@/lib/pdf-generator';

interface QuizResultsProps {
  questions: Question[];
  answers: number[];
  userName: string;
  timeSpent: number;
  onRestart: () => void;
}

export function QuizResults({ questions, answers, userName, timeSpent, onRestart }: QuizResultsProps) {
  const correctAnswers = answers.filter((answer, index) => answer === questions[index].correctAnswer).length;
  const score = Math.round((correctAnswers / questions.length) * 100);
  
  const getScoreColor = (score: number) => {
    if (score >= 80) return 'text-green-600';
    if (score >= 60) return 'text-yellow-600';
    return 'text-red-600';
  };

  const getScoreMessage = (score: number) => {
    if (score >= 90) return 'Outstanding! Excellent programming knowledge.';
    if (score >= 80) return 'Great job! Strong understanding of the concepts.';
    if (score >= 70) return 'Good work! Room for improvement in some areas.';
    if (score >= 60) return 'Fair performance. Consider reviewing the topics.';
    return 'Needs improvement. Focus on studying the fundamentals.';
  };

  const formatTime = (seconds: number) => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${minutes}:${remainingSeconds.toString().padStart(2, '0')}`;
  };

  const topicStats = {
    'HTML': { correct: 0, total: 0 },
    'C#': { correct: 0, total: 0 },
    'PHP': { correct: 0, total: 0 },
    'Algorithm': { correct: 0, total: 0 }
  };

  questions.forEach((question, index) => {
    topicStats[question.topic].total++;
    if (answers[index] === question.correctAnswer) {
      topicStats[question.topic].correct++;
    }
  });

  const getTopicColor = (topic: string) => {
    switch (topic) {
      case 'HTML': return 'bg-blue-100 text-blue-800';
      case 'C#': return 'bg-green-100 text-green-800';
      case 'PHP': return 'bg-orange-100 text-orange-800';
      case 'Algorithm': return 'bg-purple-100 text-purple-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const handleDownloadDetailedReport = async () => {
    const resultData: QuizResultData = {
      userName,
      score,
      correctAnswers,
      totalQuestions: questions.length,
      timeSpent,
      questions,
      answers,
      topicStats
    };

    try {
      const { generatePDFReport } = await import('@/lib/pdf-generator');
      await generatePDFReport(resultData);
    } catch (error) {
      console.error('Error generating PDF report:', error);
      alert('Error generating PDF report. Please try again.');
    }
  };

  const handleDownloadSummary = async () => {
    const resultData: QuizResultData = {
      userName,
      score,
      correctAnswers,
      totalQuestions: questions.length,
      timeSpent,
      questions,
      answers,
      topicStats
    };

    try {
      const { generateQuickPDF } = await import('@/lib/pdf-generator');
      await generateQuickPDF(resultData);
    } catch (error) {
      console.error('Error generating PDF summary:', error);
      alert('Error generating PDF summary. Please try again.');
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50 p-4">
      <div className="max-w-4xl mx-auto space-y-6">
        {/* Header */}
        <Card className="text-center">
          <CardHeader>
            <div className="mx-auto w-20 h-20 bg-blue-600 rounded-full flex items-center justify-center mb-4">
              <Trophy className="w-10 h-10 text-white" />
            </div>
            <CardTitle className="text-3xl font-bold">Assessment Complete!</CardTitle>
            <p className="text-xl text-gray-600">Congratulations, {userName}</p>
          </CardHeader>
          
          <CardContent className="space-y-6">
            <div className="text-center">
              <div className={`text-6xl font-bold ${getScoreColor(score)} mb-2`}>
                {score}%
              </div>
              <p className="text-lg text-gray-600 mb-4">
                {correctAnswers} out of {questions.length} questions correct
              </p>
              <p className="text-base text-gray-700 font-medium">
                {getScoreMessage(score)}
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="flex items-center justify-center space-x-3 p-4 bg-blue-50 rounded-lg">
                <Target className="w-6 h-6 text-blue-600" />
                <div className="text-center">
                  <div className="font-semibold text-blue-900">Score</div>
                  <div className="text-2xl font-bold text-blue-600">{score}%</div>
                </div>
              </div>
              <div className="flex items-center justify-center space-x-3 p-4 bg-green-50 rounded-lg">
                <CheckCircle className="w-6 h-6 text-green-600" />
                <div className="text-center">
                  <div className="font-semibold text-green-900">Correct</div>
                  <div className="text-2xl font-bold text-green-600">{correctAnswers}</div>
                </div>
              </div>
              <div className="flex items-center justify-center space-x-3 p-4 bg-amber-50 rounded-lg">
                <Clock className="w-6 h-6 text-amber-600" />
                <div className="text-center">
                  <div className="font-semibold text-amber-900">Time</div>
                  <div className="text-2xl font-bold text-amber-600">{formatTime(timeSpent)}</div>
                </div>
              </div>
            </div>

            {/* Download Options */}
            <div className="flex flex-col sm:flex-row gap-3 justify-center">
              <Button 
                onClick={handleDownloadDetailedReport}
                className="flex items-center space-x-2 bg-blue-600 hover:bg-blue-700"
              >
                <Download className="w-4 h-4" />
                <span>Download Detailed Report</span>
              </Button>
              <Button 
                onClick={handleDownloadSummary}
                variant="outline"
                className="flex items-center space-x-2"
              >
                <FileText className="w-4 h-4" />
                <span>Download Summary</span>
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Topic Breakdown */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <BookOpen className="w-5 h-5" />
              <span>Topic Performance</span>
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {Object.entries(topicStats).map(([topic, stats]) => {
              const percentage = Math.round((stats.correct / stats.total) * 100);
              return (
                <div key={topic} className="space-y-2">
                  <div className="flex items-center justify-between">
                    <Badge className={getTopicColor(topic)}>{topic}</Badge>
                    <span className="font-semibold">
                      {stats.correct}/{stats.total} ({percentage}%)
                    </span>
                  </div>
                  <Progress value={percentage} className="h-2" />
                </div>
              );
            })}
          </CardContent>
        </Card>

        {/* Detailed Results */}
        <Card>
          <CardHeader>
            <CardTitle>Question Review</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {questions.map((question, index) => {
              const isCorrect = answers[index] === question.correctAnswer;
              const userAnswer = answers[index];
              
              return (
                <div key={question.id} className="border rounded-lg p-4">
                  <div className="flex items-start justify-between mb-3">
                    <div className="flex items-center space-x-3">
                      <Badge className={getTopicColor(question.topic)}>
                        {question.topic}
                      </Badge>
                      {isCorrect ? (
                        <CheckCircle className="w-5 h-5 text-green-600" />
                      ) : (
                        <XCircle className="w-5 h-5 text-red-600" />
                      )}
                    </div>
                    <span className="text-sm text-gray-500">#{question.id}</span>
                  </div>
                  
                  <h4 className="font-semibold text-gray-900 mb-3">
                    {question.question}
                  </h4>
                  
                  <div className="space-y-2">
                    {question.options.map((option, optionIndex) => {
                      let className = "p-3 rounded border text-sm";
                      
                      if (optionIndex === question.correctAnswer) {
                        className += " bg-green-50 border-green-200 text-green-800";
                      } else if (optionIndex === userAnswer && !isCorrect) {
                        className += " bg-red-50 border-red-200 text-red-800";
                      } else {
                        className += " bg-gray-50";
                      }
                      
                      return (
                        <div key={optionIndex} className={className}>
                          <div className="flex items-center space-x-2">
                            <span className="font-medium">
                              {String.fromCharCode(65 + optionIndex)}.
                            </span>
                            <span>{option}</span>
                            {optionIndex === question.correctAnswer && (
                              <Badge variant="secondary" className="ml-auto text-xs">Correct</Badge>
                            )}
                            {optionIndex === userAnswer && userAnswer !== question.correctAnswer && (
                              <Badge variant="destructive" className="ml-auto text-xs">Your Answer</Badge>
                            )}
                          </div>
                        </div>
                      );
                    })}
                  </div>
                  
                  {question.explanation && (
                    <div className="mt-3 p-3 bg-blue-50 border border-blue-200 rounded">
                      <p className="text-sm text-blue-800">
                        <strong>Explanation:</strong> {question.explanation}
                      </p>
                    </div>
                  )}
                </div>
              );
            })}
          </CardContent>
        </Card>

        {/* Actions */}
        <Card>
          <CardContent className="p-6 text-center">
            <Button 
              onClick={onRestart}
              size="lg"
              className="flex items-center space-x-2"
            >
              <RotateCcw className="w-5 h-5" />
              <span>Take Assessment Again</span>
            </Button>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}