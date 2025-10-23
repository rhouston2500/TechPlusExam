import React, { useState, useEffect } from 'react';
import { Question, TestSession } from '../types';
import { QuestionDisplay } from './QuestionDisplay';
import { TestNavigation } from './TestNavigation';
import { TestProgress } from './TestProgress';
import { ArrowLeft } from 'lucide-react';

interface TestInterfaceProps {
  questions: Question[];
  testNumber: number;
  onBack: () => void;
}

export const TestInterface: React.FC<TestInterfaceProps> = ({
  questions,
  testNumber,
  onBack,
}) => {
  const questionsPerTest = 90;
  const startIndex = (testNumber - 1) * questionsPerTest;
  const endIndex = Math.min(startIndex + questionsPerTest, questions.length);
  const testQuestions = questions.slice(startIndex, endIndex);

  const [session, setSession] = useState<TestSession>({
    testNumber,
    startQuestion: startIndex + 1,
    endQuestion: endIndex,
    currentQuestion: 0,
    answers: {},
    bookmarks: new Set(),
    startTime: new Date(),
    timeSpent: 0,
  });

  const [selectedAnswer, setSelectedAnswer] = useState<string | number | null>(null);
  const [showExplanation, setShowExplanation] = useState(false);

  const currentQuestion = testQuestions[session.currentQuestion];

  useEffect(() => {
    const timer = setInterval(() => {
      setSession(prev => ({
        ...prev,
        timeSpent: Math.floor((Date.now() - prev.startTime.getTime()) / 1000),
      }));
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  const handleSelectAnswer = (answer: string | number) => {
    setSelectedAnswer(answer);
    setShowExplanation(true);
    
    setSession(prev => ({
      ...prev,
      answers: {
        ...prev.answers,
        [currentQuestion.id]: answer,
      },
    }));
  };

  const handleNextQuestion = () => {
    if (session.currentQuestion < testQuestions.length - 1) {
      setSession(prev => ({
        ...prev,
        currentQuestion: prev.currentQuestion + 1,
      }));
      setSelectedAnswer(null);
      setShowExplanation(false);
    }
  };

  const handlePrevQuestion = () => {
    if (session.currentQuestion > 0) {
      setSession(prev => ({
        ...prev,
        currentQuestion: prev.currentQuestion - 1,
      }));
      
      const prevAnswer = session.answers[testQuestions[session.currentQuestion - 1].id];
      setSelectedAnswer(prevAnswer || null);
      setShowExplanation(!!prevAnswer);
    }
  };

  const handleGoToQuestion = (questionIndex: number) => {
    setSession(prev => ({
      ...prev,
      currentQuestion: questionIndex,
    }));
    
    const answer = session.answers[testQuestions[questionIndex].id];
    setSelectedAnswer(answer || null);
    setShowExplanation(!!answer);
  };

  const toggleBookmark = () => {
    setSession(prev => {
      const newBookmarks = new Set(prev.bookmarks);
      if (newBookmarks.has(currentQuestion.id)) {
        newBookmarks.delete(currentQuestion.id);
      } else {
        newBookmarks.add(currentQuestion.id);
      }
      return { ...prev, bookmarks: newBookmarks };
    });
  };

  const getAnsweredCount = () => {
    return Object.keys(session.answers).length;
  };

  const getCorrectAnswersCount = () => {
    return Object.entries(session.answers).filter(([questionId, answer]) => {
      const question = testQuestions.find(q => q.id === parseInt(questionId));
      return question && question.correctAnswer === answer;
    }).length;
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white shadow-sm border-b border-gray-200 px-6 py-4">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <button
              onClick={onBack}
              className="flex items-center space-x-2 text-gray-600 hover:text-gray-900 transition-colors"
            >
              <ArrowLeft className="w-5 h-5" />
              <span>Back to Tests</span>
            </button>
            <div className="h-6 w-px bg-gray-300"></div>
            <h1 className="text-xl font-semibold text-gray-900">
              Test {testNumber} - Question {session.currentQuestion + 1} of {testQuestions.length}
            </h1>
          </div>
          
          <TestProgress
            current={session.currentQuestion + 1}
            total={testQuestions.length}
            answered={getAnsweredCount()}
            correct={getCorrectAnswersCount()}
            timeSpent={session.timeSpent}
          />
        </div>
      </div>

      <div className="max-w-7xl mx-auto p-6">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
          {/* Question Display */}
          <div className="lg:col-span-3">
            <QuestionDisplay
              question={currentQuestion}
              selectedAnswer={selectedAnswer}
              showExplanation={showExplanation}
              onSelectAnswer={handleSelectAnswer}
            />
          </div>

          {/* Navigation Sidebar */}
          <div className="lg:col-span-1">
            <TestNavigation
              questions={testQuestions}
              currentQuestion={session.currentQuestion}
              answers={session.answers}
              bookmarks={session.bookmarks}
              onGoToQuestion={handleGoToQuestion}
              onPrevQuestion={handlePrevQuestion}
              onNextQuestion={handleNextQuestion}
              onToggleBookmark={toggleBookmark}
              canGoNext={session.currentQuestion < testQuestions.length - 1}
              canGoPrev={session.currentQuestion > 0}
            />
          </div>
        </div>
      </div>
    </div>
  );
};