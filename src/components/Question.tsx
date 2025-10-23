import { useState } from 'react';
import { Check, X } from 'lucide-react';
import type { Question as QuestionType } from '../lib/supabase';

interface QuestionProps {
  question: QuestionType;
  onAnswer: (isCorrect: boolean, selectedAnswer?: string) => void;
}

export function Question({ question, onAnswer }: QuestionProps) {
  const [selectedAnswers, setSelectedAnswers] = useState<string[]>([]);
  const [showExplanation, setShowExplanation] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const options = [
    { label: 'A', text: question.option_a },
    { label: 'B', text: question.option_b },
    { label: 'C', text: question.option_c },
    { label: 'D', text: question.option_d },
    question.option_e ? { label: 'E', text: question.option_e } : null,
    question.option_f ? { label: 'F', text: question.option_f } : null,
  ].filter(Boolean);

  const isMultiAnswer = question.correct_answer.includes(',');
  const correctAnswersArray = question.correct_answer.split(',').map(a => a.trim());

  const handleAnswerSelect = (answer: string) => {
    if (submitted) return;

    if (isMultiAnswer) {
      if (selectedAnswers.includes(answer)) {
        setSelectedAnswers(selectedAnswers.filter(a => a !== answer));
      } else {
        setSelectedAnswers([...selectedAnswers, answer]);
      }
    } else {
      setSelectedAnswers([answer]);
      setSubmitted(true);
      setShowExplanation(true);
      onAnswer(answer === question.correct_answer, answer);
    }
  };

  const handleSubmitMultiAnswer = () => {
    if (submitted || selectedAnswers.length === 0) return;

    setSubmitted(true);
    setShowExplanation(true);

    const sortedSelected = [...selectedAnswers].sort().join(',');
    const sortedCorrect = [...correctAnswersArray].sort().join(',');
    const isCorrect = sortedSelected === sortedCorrect;

    onAnswer(isCorrect, selectedAnswers.join(','));
  };

  const getOptionClass = (label: string) => {
    if (!submitted) {
      const isSelected = selectedAnswers.includes(label);
      if (isSelected) {
        return 'bg-blue-100 border-blue-500 cursor-pointer';
      }
      return 'bg-white hover:bg-blue-50 border-gray-300 cursor-pointer';
    }

    if (correctAnswersArray.includes(label)) {
      return 'bg-green-50 border-green-500';
    }

    if (selectedAnswers.includes(label) && !correctAnswersArray.includes(label)) {
      return 'bg-red-50 border-red-500';
    }

    return 'bg-gray-50 border-gray-300 opacity-60';
  };

  const getOptionIcon = (label: string) => {
    if (!submitted) {
      if (selectedAnswers.includes(label)) {
        return <Check className="w-5 h-5 text-blue-600" />;
      }
      return null;
    }

    if (correctAnswersArray.includes(label)) {
      return <Check className="w-5 h-5 text-green-600" />;
    }

    if (selectedAnswers.includes(label) && !correctAnswersArray.includes(label)) {
      return <X className="w-5 h-5 text-red-600" />;
    }

    return null;
  };

  return (
    <div className="bg-white rounded-lg shadow-lg p-8 max-w-4xl mx-auto">
      <div className="mb-6">
        <div className="text-sm font-semibold text-blue-600 mb-2">
          Question {question.question_number}
        </div>
        <h2 className="text-xl font-medium text-gray-900 leading-relaxed">
          {question.question_text}
        </h2>

        {question.has_image && question.question_number === 2 && (
          <div className="mt-4 p-4 bg-gray-50 rounded border border-gray-200">
            <div className="text-sm font-medium text-gray-700 mb-2">Database Schema:</div>
            <table className="min-w-full border-collapse">
              <thead>
                <tr className="bg-gray-200">
                  <th className="border border-gray-400 px-4 py-2 text-left">ID</th>
                  <th className="border border-gray-400 px-4 py-2 text-left">Name</th>
                  <th className="border border-gray-400 px-4 py-2 text-left">Age</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td className="border border-gray-400 px-4 py-2">2</td>
                  <td className="border border-gray-400 px-4 py-2">John</td>
                  <td className="border border-gray-400 px-4 py-2">36</td>
                </tr>
                <tr>
                  <td className="border border-gray-400 px-4 py-2">6</td>
                  <td className="border border-gray-400 px-4 py-2">Jane</td>
                  <td className="border border-gray-400 px-4 py-2">39</td>
                </tr>
                <tr>
                  <td className="border border-gray-400 px-4 py-2">12</td>
                  <td className="border border-gray-400 px-4 py-2">Allison</td>
                  <td className="border border-gray-400 px-4 py-2">42</td>
                </tr>
                <tr>
                  <td className="border border-gray-400 px-4 py-2">21</td>
                  <td className="border border-gray-400 px-4 py-2">Anna</td>
                  <td className="border border-gray-400 px-4 py-2">29</td>
                </tr>
              </tbody>
            </table>
          </div>
        )}
      </div>

      <div className="space-y-3">
        {isMultiAnswer && !submitted && (
          <div className="mb-4 p-3 bg-yellow-50 border border-yellow-200 rounded-lg">
            <p className="text-sm font-medium text-yellow-800">
              This question requires multiple answers. Select all correct options and click Submit.
            </p>
          </div>
        )}
        {options.map((option) => {
          if (!option) return null;

          return (
            <button
              key={option.label}
              onClick={() => handleAnswerSelect(option.label)}
              disabled={submitted}
              className={`w-full text-left p-4 rounded-lg border-2 transition-all flex items-start gap-3 ${getOptionClass(
                option.label
              )}`}
            >
              <div className="flex items-center gap-3 flex-1">
                <span className="font-semibold text-gray-700 min-w-[24px]">
                  {option.label}.
                </span>
                <span className="text-gray-800">{option.text}</span>
              </div>
              {getOptionIcon(option.label)}
            </button>
          );
        })}
        {isMultiAnswer && !submitted && selectedAnswers.length > 0 && (
          <button
            onClick={handleSubmitMultiAnswer}
            className="w-full mt-4 px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-medium"
          >
            Submit Answer{selectedAnswers.length > 1 ? 's' : ''} ({selectedAnswers.length} selected)
          </button>
        )}
      </div>

      {showExplanation && (
        <div className="mt-6 p-5 bg-blue-50 rounded-lg border border-blue-200">
          <h3 className="font-semibold text-blue-900 mb-2 flex items-center gap-2">
            <Check className="w-5 h-5" />
            Explanation
          </h3>
          <p className="text-gray-700 leading-relaxed">{question.explanation}</p>
          <div className="mt-3 text-sm font-medium text-blue-700">
            Correct Answer: {question.correct_answer}
          </div>
        </div>
      )}
    </div>
  );
}
