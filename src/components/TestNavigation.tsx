import React from 'react';
import { Question } from '../types';
import { ChevronLeft, ChevronRight, Bookmark, BookmarkCheck } from 'lucide-react';

interface TestNavigationProps {
  questions: Question[];
  currentQuestion: number;
  answers: Record<number, string | number>;
  bookmarks: Set<number>;
  onGoToQuestion: (index: number) => void;
  onPrevQuestion: () => void;
  onNextQuestion: () => void;
  onToggleBookmark: () => void;
  canGoNext: boolean;
  canGoPrev: boolean;
}

export const TestNavigation: React.FC<TestNavigationProps> = ({
  questions,
  currentQuestion,
  answers,
  bookmarks,
  onGoToQuestion,
  onPrevQuestion,
  onNextQuestion,
  onToggleBookmark,
  canGoNext,
  canGoPrev,
}) => {
  const currentQuestionId = questions[currentQuestion]?.id;
  const isBookmarked = currentQuestionId && bookmarks.has(currentQuestionId);

  return (
    <div className="space-y-6">
      {/* Navigation Controls */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-4">
        <div className="flex items-center justify-between mb-4">
          <button
            onClick={onPrevQuestion}
            disabled={!canGoPrev}
            className="flex items-center space-x-2 px-3 py-2 bg-gray-100 hover:bg-gray-200 disabled:bg-gray-50 disabled:text-gray-400 text-gray-700 rounded-lg transition-colors"
          >
            <ChevronLeft className="w-4 h-4" />
            <span>Previous</span>
          </button>
          
          <button
            onClick={onToggleBookmark}
            className="p-2 text-gray-600 hover:text-indigo-600 transition-colors"
            title={isBookmarked ? 'Remove bookmark' : 'Add bookmark'}
          >
            {isBookmarked ? (
              <BookmarkCheck className="w-5 h-5 text-indigo-600" />
            ) : (
              <Bookmark className="w-5 h-5" />
            )}
          </button>

          <button
            onClick={onNextQuestion}
            disabled={!canGoNext}
            className="flex items-center space-x-2 px-3 py-2 bg-indigo-600 hover:bg-indigo-700 disabled:bg-gray-300 text-white rounded-lg transition-colors"
          >
            <span>Next</span>
            <ChevronRight className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Question Grid */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-4">
        <h3 className="font-semibold text-gray-900 mb-4">Question Overview</h3>
        <div className="grid grid-cols-5 gap-2">
          {questions.map((question, index) => {
            const isAnswered = answers.hasOwnProperty(question.id);
            const isCurrent = index === currentQuestion;
            const isBookmarked = bookmarks.has(question.id);

            let buttonClasses = "relative w-10 h-10 rounded-lg text-sm font-medium transition-all duration-200 ";
            
            if (isCurrent) {
              buttonClasses += "bg-indigo-600 text-white ring-2 ring-indigo-300 ";
            } else if (isAnswered) {
              buttonClasses += "bg-green-100 text-green-800 hover:bg-green-200 ";
            } else {
              buttonClasses += "bg-gray-100 text-gray-600 hover:bg-gray-200 ";
            }

            return (
              <button
                key={question.id}
                onClick={() => onGoToQuestion(index)}
                className={buttonClasses}
                title={`Question ${index + 1}${isAnswered ? ' (Answered)' : ''}${isBookmarked ? ' (Bookmarked)' : ''}`}
              >
                {index + 1}
                {isBookmarked && (
                  <div className="absolute -top-1 -right-1 w-3 h-3 bg-indigo-500 rounded-full"></div>
                )}
              </button>
            );
          })}
        </div>
      </div>

      {/* Legend */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-4">
        <h3 className="font-semibold text-gray-900 mb-3">Legend</h3>
        <div className="space-y-2 text-sm">
          <div className="flex items-center space-x-3">
            <div className="w-4 h-4 bg-indigo-600 rounded"></div>
            <span className="text-gray-700">Current question</span>
          </div>
          <div className="flex items-center space-x-3">
            <div className="w-4 h-4 bg-green-100 border border-green-300 rounded"></div>
            <span className="text-gray-700">Answered</span>
          </div>
          <div className="flex items-center space-x-3">
            <div className="w-4 h-4 bg-gray-100 border border-gray-300 rounded"></div>
            <span className="text-gray-700">Not answered</span>
          </div>
          <div className="flex items-center space-x-3">
            <div className="w-4 h-4 bg-gray-100 border border-gray-300 rounded relative">
              <div className="absolute -top-0.5 -right-0.5 w-2 h-2 bg-indigo-500 rounded-full"></div>
            </div>
            <span className="text-gray-700">Bookmarked</span>
          </div>
        </div>
      </div>
    </div>
  );
};