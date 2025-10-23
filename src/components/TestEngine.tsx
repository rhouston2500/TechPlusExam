import { useState, useEffect } from 'react';
import { Question } from './Question';
import { getQuestions, type Question as QuestionType } from '../lib/supabase';
import { BookOpen, ChevronLeft, ChevronRight, RotateCcw, CheckCircle, XCircle } from 'lucide-react';

export function TestEngine() {
  const [questions, setQuestions] = useState<QuestionType[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [answers, setAnswers] = useState<Map<number, boolean>>(new Map());
  const [userAnswers, setUserAnswers] = useState<Map<number, string>>(new Map());
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadQuestions();
  }, []);

  const loadQuestions = async () => {
    setLoading(true);
    const data = await getQuestions();
    setQuestions(data);
    setLoading(false);
  };

  const handleAnswer = (isCorrect: boolean, selectedAnswer?: string) => {
    setAnswers(new Map(answers.set(currentIndex, isCorrect)));
    if (selectedAnswer) {
      setUserAnswers(new Map(userAnswers.set(currentIndex, selectedAnswer)));
    }
  };

  const goToNext = () => {
    if (currentIndex < questions.length - 1) {
      setCurrentIndex(currentIndex + 1);
    }
  };

  const goToPrevious = () => {
    if (currentIndex > 0) {
      setCurrentIndex(currentIndex - 1);
    }
  };

  const resetTest = () => {
    setAnswers(new Map());
    setUserAnswers(new Map());
    setCurrentIndex(0);
  };

  const getScore = () => {
    const correct = Array.from(answers.values()).filter(Boolean).length;
    return { correct, total: answers.size };
  };

  const getPercentage = (correct: number, total: number) => {
    return total > 0 ? Math.round((correct / total) * 100) : 0;
  };

  const getMissedQuestions = () => {
    const missed: QuestionType[] = [];
    answers.forEach((isCorrect, index) => {
      if (!isCorrect) {
        missed.push(questions[index]);
      }
    });
    return missed;
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading questions...</p>
        </div>
      </div>
    );
  }

  if (questions.length === 0) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center">
        <div className="text-center bg-white p-8 rounded-lg shadow-lg">
          <p className="text-gray-600 mb-4">No questions available</p>
          <button
            onClick={loadQuestions}
            className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
          >
            Retry
          </button>
        </div>
      </div>
    );
  }

  const currentQuestion = questions[currentIndex];
  const score = getScore();
  const progress = ((currentIndex + 1) / questions.length) * 100;

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 py-8 px-4">
      <div className="max-w-5xl mx-auto">
        <div className="bg-white rounded-lg shadow-lg p-6 mb-6">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-3">
              <BookOpen className="w-8 h-8 text-blue-600" />
              <div>
                <h1 className="text-2xl font-bold text-gray-900">
                  CompTIA Tech+ Practice Test
                </h1>
                <p className="text-sm text-gray-600">
                  108 Questions Total
                </p>
              </div>
            </div>
            <div className="text-right">
              <div className="text-sm text-gray-600">Score</div>
              <div className="text-2xl font-bold text-blue-600">
                {score.correct}/{score.total}
              </div>
            </div>
          </div>

          <div className="relative">
            <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
              <div
                className="h-full bg-blue-600 transition-all duration-300"
                style={{ width: `${progress}%` }}
              ></div>
            </div>
            <div className="flex justify-between mt-2 text-sm text-gray-600">
              <span>Question {currentIndex + 1} of {questions.length}</span>
              <span>{Math.round(progress)}% Complete</span>
            </div>
          </div>
        </div>

        <Question
          key={currentQuestion.id}
          question={currentQuestion}
          onAnswer={handleAnswer}
        />

        <div className="mt-6 flex items-center justify-between bg-white rounded-lg shadow-lg p-4">
          <button
            onClick={goToPrevious}
            disabled={currentIndex === 0}
            className="flex items-center gap-2 px-4 py-2 bg-gray-100 text-gray-700 rounded hover:bg-gray-200 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
          >
            <ChevronLeft className="w-5 h-5" />
            Previous
          </button>

          <button
            onClick={resetTest}
            className="flex items-center gap-2 px-4 py-2 bg-gray-100 text-gray-700 rounded hover:bg-gray-200 transition-colors"
          >
            <RotateCcw className="w-5 h-5" />
            Reset Test
          </button>

          <button
            onClick={goToNext}
            disabled={currentIndex === questions.length - 1}
            className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
          >
            Next
            <ChevronRight className="w-5 h-5" />
          </button>
        </div>

        {score.total > 0 && score.total === questions.length && (() => {
          const percentage = getPercentage(score.correct, score.total);
          const passed = percentage >= 75;
          const missedQuestions = getMissedQuestions();

          let performanceMessage = '';
          let performanceTitle = '';

          if (percentage >= 90) {
            performanceMessage = 'Excellent!';
            performanceTitle = 'Outstanding Performance!';
          } else if (percentage >= 80) {
            performanceMessage = 'Good Job!';
            performanceTitle = 'Great Work!';
          } else if (percentage >= 75) {
            performanceMessage = 'You exceeded the 75% pass threshold!';
            performanceTitle = 'Congratulations! You Passed!';
          } else {
            performanceMessage = `You need 75% to pass. You scored ${percentage}%.`;
            performanceTitle = 'Test Complete';
          }

          return (
            <div className="mt-6 space-y-6">
              <div className={`border-2 rounded-lg p-6 text-center ${
                passed
                  ? 'bg-green-50 border-green-200'
                  : 'bg-red-50 border-red-200'
              }`}>
                <div className="flex items-center justify-center mb-4">
                  {passed ? (
                    <CheckCircle className="w-16 h-16 text-green-600" />
                  ) : (
                    <XCircle className="w-16 h-16 text-red-600" />
                  )}
                </div>
                <h2 className={`text-3xl font-bold mb-2 ${
                  passed ? 'text-green-800' : 'text-red-800'
                }`}>
                  {performanceTitle}
                </h2>
                <p className={`text-xl mb-4 ${
                  passed ? 'text-green-700' : 'text-red-700'
                }`}>
                  You scored {score.correct} out of {score.total} ({percentage}%)
                </p>
                <p className={`text-md mb-6 ${
                  passed ? 'text-green-600' : 'text-red-600'
                }`}>
                  {performanceMessage}
                </p>
                <button
                  onClick={resetTest}
                  className={`px-6 py-3 text-white rounded-lg transition-colors ${
                    passed
                      ? 'bg-green-600 hover:bg-green-700'
                      : 'bg-red-600 hover:bg-red-700'
                  }`}
                >
                  Restart Test
                </button>
              </div>

              {missedQuestions.length > 0 && (
                <div className="bg-white border-2 border-gray-200 rounded-lg p-6">
                  <h3 className="text-2xl font-bold text-gray-900 mb-4 flex items-center gap-2">
                    <XCircle className="w-6 h-6 text-red-600" />
                    Missed Questions Report ({missedQuestions.length} incorrect)
                  </h3>
                  <div className="space-y-6">
                    {missedQuestions.map((q) => {
                      const userAnswer = userAnswers.get(questions.indexOf(q));
                      return (
                        <div key={q.id} className="border-l-4 border-red-400 pl-4 py-2">
                          <div className="flex items-start gap-2 mb-2">
                            <span className="font-bold text-red-600 min-w-[80px]">
                              Question {q.question_number}
                            </span>
                            <p className="text-gray-900 font-medium">{q.question_text}</p>
                          </div>
                          <div className="ml-[88px] space-y-2">
                            {userAnswer && (
                              <p className="text-sm">
                                <span className="font-semibold text-red-600">Your Answer:</span>{' '}
                                <span className="text-red-700">{userAnswer}</span>
                              </p>
                            )}
                            <p className="text-sm">
                              <span className="font-semibold text-green-600">Correct Answer:</span>{' '}
                              <span className="text-green-700">{q.correct_answer}</span>
                            </p>
                            <div className="bg-blue-50 border border-blue-200 rounded p-3 mt-2">
                              <p className="text-sm font-semibold text-blue-900 mb-1">Explanation:</p>
                              <p className="text-sm text-blue-800">{q.explanation}</p>
                            </div>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>
              )}
            </div>
          );
        })()}
      </div>
    </div>
  );
}
