'use client';

import { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { Badge } from '@/components/ui/badge';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Label } from '@/components/ui/label';
import { Clock, ChevronLeft, ChevronRight, Flag } from 'lucide-react';
import { Question } from '@/lib/questions';

interface QuizInterfaceProps {
  questions: Question[];
  userName: string;
  onComplete: (answers: number[], timeSpent: number) => void;
}

export function QuizInterface({ questions, userName, onComplete }: QuizInterfaceProps) {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answers, setAnswers] = useState<number[]>(new Array(questions.length).fill(-1));
  const [selectedAnswer, setSelectedAnswer] = useState<string>('');
  const [timeSpent, setTimeSpent] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeSpent(prev => prev + 1);
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  useEffect(() => {
    setSelectedAnswer(answers[currentQuestion] !== -1 ? answers[currentQuestion].toString() : '');
  }, [currentQuestion, answers]);

  const handleAnswerSelect = (answerIndex: string) => {
    setSelectedAnswer(answerIndex);
    const newAnswers = [...answers];
    newAnswers[currentQuestion] = parseInt(answerIndex);
    setAnswers(newAnswers);
  };

  const handleNext = () => {
    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
    }
  };

  const handlePrevious = () => {
    if (currentQuestion > 0) {
      setCurrentQuestion(currentQuestion - 1);
    }
  };

  const handleSubmit = () => {
    onComplete(answers, timeSpent);
  };

  const formatTime = (seconds: number) => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${minutes}:${remainingSeconds.toString().padStart(2, '0')}`;
  };

  const progress = ((currentQuestion + 1) / questions.length) * 100;
  const answeredCount = answers.filter(a => a !== -1).length;
  const currentQ = questions[currentQuestion];

  const getTopicColor = (topic: string) => {
    switch (topic) {
      case 'HTML': return 'bg-blue-100 text-blue-800';
      case 'C#': return 'bg-green-100 text-green-800';
      case 'Algorithm': return 'bg-purple-100 text-purple-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50 p-4">
      <div className="max-w-4xl mx-auto space-y-6">
        {/* Header */}
        <Card>
          <CardContent className="p-6">
            <div className="flex flex-col md:flex-row md:items-center md:justify-between space-y-4 md:space-y-0">
              <div>
                <h1 className="text-2xl font-bold text-gray-900">Programming Assessment</h1>
                <p className="text-gray-600">Welcome, {userName}</p>
              </div>
              <div className="flex items-center space-x-6">
                <div className="flex items-center space-x-2">
                  <Clock className="w-5 h-5 text-gray-500" />
                  <span className="font-mono text-lg">{formatTime(timeSpent)}</span>
                </div>
                <div className="text-sm text-gray-600">
                  {answeredCount}/{questions.length} answered
                </div>
              </div>
            </div>
            <div className="mt-4">
              <Progress value={progress} className="h-2" />
              <p className="text-sm text-gray-500 mt-2">
                Question {currentQuestion + 1} of {questions.length}
              </p>
            </div>
          </CardContent>
        </Card>

        {/* Question */}
        <Card>
          <CardHeader>
            <div className="flex items-center justify-between">
              <Badge className={getTopicColor(currentQ.topic)}>
                {currentQ.topic}
              </Badge>
              <span className="text-sm text-gray-500">
                Question #{currentQ.id}
              </span>
            </div>
            <CardTitle className="text-xl leading-relaxed">
              {currentQ.question}
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <RadioGroup value={selectedAnswer} onValueChange={handleAnswerSelect}>
              {currentQ.options.map((option, index) => (
                <div key={index} className="flex items-center space-x-3 p-4 rounded-lg border hover:bg-gray-50 transition-colors">
                  <RadioGroupItem value={index.toString()} id={`option-${index}`} />
                  <Label 
                    htmlFor={`option-${index}`} 
                    className="flex-1 cursor-pointer text-base leading-relaxed"
                  >
                    {option}
                  </Label>
                </div>
              ))}
            </RadioGroup>
          </CardContent>
        </Card>

        {/* Navigation */}
        <Card>
          <CardContent className="p-6">
            <div className="flex justify-between items-center">
              <Button
                variant="outline"
                onClick={handlePrevious}
                disabled={currentQuestion === 0}
                className="flex items-center space-x-2"
              >
                <ChevronLeft className="w-4 h-4" />
                <span>Previous</span>
              </Button>

              <div className="flex space-x-3">
                {currentQuestion === questions.length - 1 ? (
                  <Button
                    onClick={handleSubmit}
                    className="flex items-center space-x-2 bg-green-600 hover:bg-green-700"
                  >
                    <Flag className="w-4 h-4" />
                    <span>Submit Assessment</span>
                  </Button>
                ) : (
                  <Button
                    onClick={handleNext}
                    disabled={currentQuestion === questions.length - 1}
                    className="flex items-center space-x-2"
                  >
                    <span>Next</span>
                    <ChevronRight className="w-4 h-4" />
                  </Button>
                )}
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Question Navigator */}
        <Card>
          <CardContent className="p-6">
            <h3 className="text-lg font-semibold mb-4">Question Navigator</h3>
            <div className="grid grid-cols-5 md:grid-cols-10 lg:grid-cols-15 gap-2">
              {questions.map((_, index) => (
                <Button
                  key={index}
                  variant={currentQuestion === index ? "default" : answers[index] !== -1 ? "secondary" : "outline"}
                  size="sm"
                  onClick={() => setCurrentQuestion(index)}
                  className={`w-10 h-10 ${
                    answers[index] !== -1 && currentQuestion !== index 
                      ? 'bg-green-100 text-green-800 hover:bg-green-200' 
                      : ''
                  }`}
                >
                  {index + 1}
                </Button>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}