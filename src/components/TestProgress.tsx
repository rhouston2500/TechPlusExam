import React from 'react';
import { Clock, CheckCircle, Target } from 'lucide-react';

interface TestProgressProps {
  current: number;
  total: number;
  answered: number;
  correct: number;
  timeSpent: number;
}

export const TestProgress: React.FC<TestProgressProps> = ({
  current,
  total,
  answered,
  correct,
  timeSpent,
}) => {
  const progressPercentage = (current / total) * 100;
  const answeredPercentage = (answered / total) * 100;
  const accuracy = answered > 0 ? Math.round((correct / answered) * 100) : 0;

  const formatTime = (seconds: number) => {
    const hours = Math.floor(seconds / 3600);
    const minutes = Math.floor((seconds % 3600) / 60);
    const secs = seconds % 60;
    
    if (hours > 0) {
      return `${hours}:${minutes.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
    }
    return `${minutes}:${secs.toString().padStart(2, '0')}`;
  };

  return (
    <div className="flex items-center space-x-6">
      {/* Progress Bar */}
      <div className="flex items-center space-x-3">
        <div className="text-sm text-gray-600">Progress:</div>
        <div className="w-32 bg-gray-200 rounded-full h-2">
          <div 
            className="bg-indigo-600 h-2 rounded-full transition-all duration-300"
            style={{ width: `${progressPercentage}%` }}
          ></div>
        </div>
        <div className="text-sm font-medium text-gray-900">
          {current}/{total}
        </div>
      </div>

      {/* Stats */}
      <div className="flex items-center space-x-4 text-sm">
        <div className="flex items-center space-x-2">
          <CheckCircle className="w-4 h-4 text-green-600" />
          <span className="text-gray-600">Answered:</span>
          <span className="font-medium text-gray-900">{answered}</span>
        </div>
        
        <div className="flex items-center space-x-2">
          <Target className="w-4 h-4 text-blue-600" />
          <span className="text-gray-600">Accuracy:</span>
          <span className="font-medium text-gray-900">{accuracy}%</span>
        </div>
        
        <div className="flex items-center space-x-2">
          <Clock className="w-4 h-4 text-orange-600" />
          <span className="text-gray-600">Time:</span>
          <span className="font-medium text-gray-900">{formatTime(timeSpent)}</span>
        </div>
      </div>
    </div>
  );
};