import React from 'react';
import { BookOpen, Clock, Users } from 'lucide-react';

interface TestSelectorProps {
  totalQuestions: number;
  onSelectTest: (testNumber: number) => void;
}

export const TestSelector: React.FC<TestSelectorProps> = ({ totalQuestions, onSelectTest }) => {
  const questionsPerTest = 90;
  const totalTests = Math.ceil(totalQuestions / questionsPerTest);

  const getTestRange = (testNumber: number) => {
    const start = (testNumber - 1) * questionsPerTest + 1;
    const end = Math.min(testNumber * questionsPerTest, totalQuestions);
    return { start, end };
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 p-6">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-12">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-indigo-600 text-white rounded-full mb-4">
            <BookOpen className="w-8 h-8" />
          </div>
          <h1 className="text-4xl font-bold text-gray-900 mb-4">Interactive Test Engine</h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Choose your test session. Each test contains up to 90 questions with immediate explanations and progress tracking.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
          {Array.from({ length: totalTests }, (_, index) => {
            const testNumber = index + 1;
            const { start, end } = getTestRange(testNumber);
            const questionCount = end - start + 1;
            
            return (
              <div
                key={testNumber}
                className="bg-white rounded-xl shadow-md hover:shadow-lg transition-all duration-300 p-6 border border-gray-200 hover:border-indigo-300 cursor-pointer group"
                onClick={() => onSelectTest(testNumber)}
              >
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center space-x-3">
                    <div className="w-12 h-12 bg-indigo-100 group-hover:bg-indigo-200 rounded-lg flex items-center justify-center transition-colors">
                      <span className="text-indigo-600 font-bold text-lg">{testNumber}</span>
                    </div>
                    <div>
                      <h3 className="text-lg font-semibold text-gray-900">Test {testNumber}</h3>
                      <p className="text-sm text-gray-500">Questions {start}-{end}</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="flex items-center text-sm text-gray-500 mb-1">
                      <Users className="w-4 h-4 mr-1" />
                      {questionCount} questions
                    </div>
                    <div className="flex items-center text-sm text-gray-500">
                      <Clock className="w-4 h-4 mr-1" />
                      ~{Math.ceil(questionCount * 1.5)} min
                    </div>
                  </div>
                </div>
                
                <div className="bg-gray-50 rounded-lg p-3">
                  <div className="w-full bg-gray-200 rounded-full h-2 mb-2">
                    <div 
                      className="bg-indigo-600 h-2 rounded-full transition-all duration-500"
                      style={{ width: `${(questionCount / 90) * 100}%` }}
                    ></div>
                  </div>
                  <p className="text-xs text-gray-600 text-center">{questionCount} of 90 questions</p>
                </div>
              </div>
            );
          })}
        </div>

        <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-200">
          <h2 className="text-xl font-semibold text-gray-900 mb-4">Test Features</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="flex items-center space-x-3">
              <div className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center">
                <div className="w-4 h-4 bg-green-500 rounded-full"></div>
              </div>
              <span className="text-gray-700">Immediate explanations after each answer</span>
            </div>
            <div className="flex items-center space-x-3">
              <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center">
                <div className="w-4 h-4 bg-blue-500 rounded-full"></div>
              </div>
              <span className="text-gray-700">Progress tracking and bookmarks</span>
            </div>
            <div className="flex items-center space-x-3">
              <div className="w-8 h-8 bg-purple-100 rounded-full flex items-center justify-center">
                <div className="w-4 h-4 bg-purple-500 rounded-full"></div>
              </div>
              <span className="text-gray-700">Support for simulations and images</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};