'use client';

import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Badge } from '@/components/ui/badge';
import { BookOpen, Code, Cpu, Clock, Users } from 'lucide-react';

interface QuizWelcomeProps {
  onStartQuiz: (name: string) => void;
}

export function QuizWelcome({ onStartQuiz }: QuizWelcomeProps) {
  const [name, setName] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (name.trim()) {
      onStartQuiz(name.trim());
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center p-4">
      <Card className="w-full max-w-2xl shadow-xl">
        <CardHeader className="text-center space-y-4">
          <div className="mx-auto w-16 h-16 bg-blue-600 rounded-full flex items-center justify-center">
            <Code className="w-8 h-8 text-white" />
          </div>
          <CardTitle className="text-3xl font-bold text-gray-900">
            Programming Knowledge Assessment
          </CardTitle>
          <CardDescription className="text-lg text-gray-600">
            Test your knowledge in HTML, C# basics, and algorithm fundamentals
          </CardDescription>
        </CardHeader>
        
        <CardContent className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="flex items-center space-x-3 p-4 bg-blue-50 rounded-lg">
              <BookOpen className="w-6 h-6 text-blue-600" />
              <div>
                <h3 className="font-semibold text-blue-900">HTML Basics</h3>
                <p className="text-sm text-blue-700">5 questions</p>
              </div>
            </div>
            <div className="flex items-center space-x-3 p-4 bg-green-50 rounded-lg">
              <Code className="w-6 h-6 text-green-600" />
              <div>
                <h3 className="font-semibold text-green-900">C# Fundamentals</h3>
                <p className="text-sm text-green-700">5 questions</p>
              </div>
            </div>
            <div className="flex items-center space-x-3 p-4 bg-purple-50 rounded-lg">
              <Cpu className="w-6 h-6 text-purple-600" />
              <div>
                <h3 className="font-semibold text-purple-900">Algorithms</h3>
                <p className="text-sm text-purple-700">5 questions</p>
              </div>
            </div>
          </div>

          <div className="bg-amber-50 border border-amber-200 rounded-lg p-4">
            <div className="flex items-start space-x-3">
              <Clock className="w-5 h-5 text-amber-600 mt-0.5" />
              <div>
                <h4 className="font-semibold text-amber-900">Assessment Details</h4>
                <ul className="text-sm text-amber-800 mt-2 space-y-1">
                  <li>• 15 multiple-choice questions total</li>
                  <li>• Approximately 20-30 minutes to complete</li>
                  <li>• Each question has one correct answer</li>
                  <li>• Results provided immediately upon completion</li>
                </ul>
              </div>
            </div>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="name" className="text-base font-medium">
                Enter your full name to begin
              </Label>
              <Input
                id="name"
                type="text"
                placeholder="e.g., John Doe"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="text-lg h-12"
                required
              />
            </div>
            
            <Button 
              type="submit" 
              className="w-full h-12 text-lg font-semibold bg-blue-600 hover:bg-blue-700 transition-colors"
              disabled={!name.trim()}
            >
              Start Assessment
            </Button>
          </form>

          <div className="flex items-center justify-center space-x-2 text-sm text-gray-500">
            <Users className="w-4 h-4" />
            <span>Designed for programming interns</span>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}