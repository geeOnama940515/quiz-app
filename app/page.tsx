'use client';

import { useState } from 'react';
import { QuizWelcome } from '@/components/quiz-welcome';
import { QuizInterface } from '@/components/quiz-interface';
import { QuizResults } from '@/components/quiz-results';
import { questions, shuffleArray } from '@/lib/questions';

type AppState = 'welcome' | 'quiz' | 'results';

interface QuizData {
  userName: string;
  answers: number[];
  timeSpent: number;
}

export default function Home() {
  const [appState, setAppState] = useState<AppState>('welcome');
  const [quizData, setQuizData] = useState<QuizData>({
    userName: '',
    answers: [],
    timeSpent: 0
  });
  const [shuffledQuestions] = useState(() => shuffleArray(questions));

  const handleStartQuiz = (name: string) => {
    setQuizData(prev => ({ ...prev, userName: name }));
    setAppState('quiz');
  };

  const handleQuizComplete = (answers: number[], timeSpent: number) => {
    setQuizData(prev => ({ ...prev, answers, timeSpent }));
    setAppState('results');
  };

  const handleRestart = () => {
    setQuizData({ userName: '', answers: [], timeSpent: 0 });
    setAppState('welcome');
  };

  switch (appState) {
    case 'welcome':
      return <QuizWelcome onStartQuiz={handleStartQuiz} />;
    
    case 'quiz':
      return (
        <QuizInterface
          questions={shuffledQuestions}
          userName={quizData.userName}
          onComplete={handleQuizComplete}
        />
      );
    
    case 'results':
      return (
        <QuizResults
          questions={shuffledQuestions}
          answers={quizData.answers}
          userName={quizData.userName}
          timeSpent={quizData.timeSpent}
          onRestart={handleRestart}
        />
      );
    
    default:
      return <QuizWelcome onStartQuiz={handleStartQuiz} />;
  }
}