import React from 'react';
import { Question } from '../types';
import { Image, Monitor } from 'lucide-react';

interface QuestionDisplayProps {
  question: Question;
  selectedAnswer: string | number | null;
  showExplanation: boolean;
  onSelectAnswer: (answer: string | number) => void;
}

export const QuestionDisplay: React.FC<QuestionDisplayProps> = ({
  question,
  selectedAnswer,
  showExplanation,
  onSelectAnswer,
}) => {
  const isCorrect = selectedAnswer === question.correctAnswer;

  const renderQuestionContent = () => {
    switch (question.type) {
      case 'simulation':
        return (
          <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-6">
            <div className="flex items-center space-x-2 mb-3">
              <Monitor className="w-5 h-5 text-blue-600" />
              <span className="text-blue-800 font-medium">Simulation Question</span>
            </div>
            <p className="text-blue-700 mb-3">{question.simulation?.instructions}</p>
            {question.simulation?.assets && question.simulation.assets.length > 0 && (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {question.simulation.assets.map((asset, index) => (
                  <img
                    key={index}
                    src={asset}
                    alt={`Simulation asset ${index + 1}`}
                    className="w-full h-48 object-cover rounded-lg border border-blue-300"
                  />
                ))}
              </div>
            )}
          </div>
        );
      
      case 'drag-drop':
        return (
          <div className="bg-amber-50 border border-amber-200 rounded-lg p-4 mb-6">
            <div className="flex items-center space-x-2 mb-3">
              <Image className="w-5 h-5 text-amber-600" />
              <span className="text-amber-800 font-medium">Drag & Drop Question</span>
            </div>
            {question.image && (
              <img
                src={question.image}
                alt="Question illustration"
                className="w-full max-w-md mx-auto h-64 object-cover rounded-lg border border-amber-300"
              />
            )}
          </div>
        );
      
      default:
        return question.image ? (
          <div className="mb-6">
            <img
              src={question.image}
              alt="Question illustration"
              className="w-full max-w-md mx-auto h-48 object-cover rounded-lg border border-gray-300"
            />
          </div>
        ) : null;
    }
  };

  const renderOptions = () => {
    if (!question.options) return null;

    return (
      <div className="space-y-3">
        {question.options.map((option, index) => {
          const isSelected = selectedAnswer === index;
          const isCorrectOption = question.correctAnswer === index;
          
          let buttonClasses = "w-full text-left p-4 rounded-lg border transition-all duration-200 ";
          
          if (showExplanation) {
            if (isCorrectOption) {
              buttonClasses += "border-green-300 bg-green-50 text-green-800";
            } else if (isSelected && !isCorrectOption) {
              buttonClasses += "border-red-300 bg-red-50 text-red-800";
            } else {
              buttonClasses += "border-gray-200 bg-gray-50 text-gray-600";
            }
          } else {
            if (isSelected) {
              buttonClasses += "border-indigo-300 bg-indigo-50 text-indigo-800 ring-2 ring-indigo-200";
            } else {
              buttonClasses += "border-gray-200 bg-white text-gray-700 hover:border-indigo-200 hover:bg-indigo-25";
            }
          }

          return (
            <button
              key={index}
              className={buttonClasses}
              onClick={() => !showExplanation && onSelectAnswer(index)}
              disabled={showExplanation}
            >
              <div className="flex items-center justify-between">
                <span className="flex-1">{option}</span>
                {showExplanation && isCorrectOption && (
                  <div className="w-6 h-6 bg-green-500 text-white rounded-full flex items-center justify-center text-sm font-bold">
                    ✓
                  </div>
                )}
                {showExplanation && isSelected && !isCorrectOption && (
                  <div className="w-6 h-6 bg-red-500 text-white rounded-full flex items-center justify-center text-sm font-bold">
                    ✗
                  </div>
                )}
              </div>
            </button>
          );
        })}
      </div>
    );
  };

  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
      {renderQuestionContent()}
      
      <h2 className="text-xl font-semibold text-gray-900 mb-6">{question.text}</h2>
      
      {renderOptions()}
      
      {showExplanation && (
        <div className={`mt-6 p-4 rounded-lg ${isCorrect ? 'bg-green-50 border border-green-200' : 'bg-red-50 border border-red-200'}`}>
          <div className="flex items-start space-x-3">
            <div className={`w-6 h-6 rounded-full flex items-center justify-center text-sm font-bold text-white ${isCorrect ? 'bg-green-500' : 'bg-red-500'}`}>
              {isCorrect ? '✓' : '✗'}
            </div>
            <div>
              <h3 className={`font-medium mb-2 ${isCorrect ? 'text-green-800' : 'text-red-800'}`}>
                {isCorrect ? 'Correct!' : 'Incorrect'}
              </h3>
              <p className={`${isCorrect ? 'text-green-700' : 'text-red-700'}`}>
                {question.explanation}
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};