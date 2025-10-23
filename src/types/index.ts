export interface Question {
  id: number;
  text: string;
  type: 'multiple-choice' | 'true-false' | 'simulation' | 'drag-drop';
  options?: string[];
  correctAnswer: string | number;
  explanation: string;
  image?: string;
  simulation?: {
    type: string;
    instructions: string;
    assets: string[];
  };
}

export interface TestSession {
  testNumber: number;
  startQuestion: number;
  endQuestion: number;
  currentQuestion: number;
  answers: Record<number, string | number>;
  bookmarks: Set<number>;
  startTime: Date;
  timeSpent: number;
}

export interface TestState {
  questions: Question[];
  currentSession: TestSession | null;
  showExplanation: boolean;
  selectedAnswer: string | number | null;
}