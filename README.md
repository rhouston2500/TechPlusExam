# CompTIA Tech+ Interactive Test Engine

An interactive exam practice application built with React, TypeScript, and Supabase that provides instant feedback and detailed explanations for CompTIA Tech+ certification questions.

## Features

- **Interactive Question Display**: Clean, modern interface for taking practice exams
- **Instant Feedback**: Immediate visual feedback when selecting answers
- **Detailed Explanations**: Comprehensive explanations appear after each answer selection
- **Progress Tracking**: Real-time score tracking and progress indicators
- **Navigation**: Easy navigation between questions with Previous/Next buttons
- **Visual Indicators**: Color-coded feedback showing correct (green) and incorrect (red) answers
- **Database-Driven**: Questions stored in Supabase for easy management and updates
- **Responsive Design**: Works seamlessly across desktop and mobile devices

## Technology Stack

- **Frontend**: React 18 with TypeScript
- **Styling**: Tailwind CSS for modern, responsive design
- **Icons**: Lucide React for clean, scalable icons
- **Database**: Supabase (PostgreSQL) for question storage
- **Build Tool**: Vite for fast development and optimized builds

## Database Schema

The application uses a single `questions` table with the following structure:

```sql
CREATE TABLE questions (
  id uuid PRIMARY KEY,
  question_number integer UNIQUE,
  question_text text,
  option_a text,
  option_b text,
  option_c text,
  option_d text,
  option_e text (optional),
  option_f text (optional),
  correct_answer text,
  explanation text,
  has_image boolean,
  created_at timestamptz
);
```

## Setup Instructions

1. **Environment Variables**: The Supabase connection is pre-configured in your `.env` file
   - `VITE_SUPABASE_URL`: Your Supabase project URL
   - `VITE_SUPABASE_ANON_KEY`: Your Supabase anonymous key

2. **Install Dependencies**:
   ```bash
   npm install
   ```

3. **Run Development Server**:
   ```bash
   npm run dev
   ```

4. **Build for Production**:
   ```bash
   npm run build
   ```

## How It Works

1. **Question Loading**: On app start, questions are fetched from Supabase and ordered by question number
2. **Answer Selection**: When a user clicks an answer:
   - The selected answer is highlighted
   - Correct answer is shown in green
   - Incorrect selection (if any) is shown in red
   - Explanation panel appears with detailed reasoning
3. **Navigation**: Users can move through questions using Previous/Next buttons
4. **Progress Tracking**: Score and completion percentage update in real-time
5. **Test Completion**: When all questions are answered, a completion summary appears

## Special Features

- **Question 2 Visual**: Includes a recreated database table visualization matching the PDF
- **Multiple Answer Support**: Handles questions with 4-6 answer options
- **Score Calculation**: Tracks correct answers and displays percentage
- **Reset Functionality**: Users can restart the test at any time

## Component Structure

```
src/
├── App.tsx                    # Main application entry
├── components/
│   ├── TestEngine.tsx        # Main test orchestration component
│   └── Question.tsx          # Individual question display with answer logic
├── lib/
│   └── supabase.ts           # Supabase client and database functions
└── index.css                 # Global styles and Tailwind imports
```

## Question Format

Each question includes:
- Question number and text
- 4-6 multiple choice options (A-F)
- Correct answer designation
- Detailed explanation of why the answer is correct
- Optional image/visualization support

## Database Security

- Row Level Security (RLS) is enabled on the questions table
- Public read access is granted for the practice test use case
- Questions can only be modified through authorized database access

## Future Enhancements

Potential additions to expand functionality:
- Question filtering by topic/category
- Timed test mode
- Performance analytics and weak area identification
- Bookmark difficult questions
- Export results as PDF
- Additional question sets for other IT certifications

## Question Bank

Includes all **108 questions** from the CompTIA Tech+ exam covering topics such as:
- File systems and extensions
- Database fundamentals (relational databases, primary keys, queries)
- Networking concepts (LAN, VPN, Wi-Fi, protocols)
- Security principles (encryption, authentication, authorization, RLS)
- Hardware components (CPU, RAM, GPU, storage)
- Software types and licensing (open-source, proprietary, SaaS)
- Data types and programming concepts (variables, loops, branching, pseudocode)
- Troubleshooting methodologies
- Operating systems (embedded, virtualization, process management)
- Internet connectivity (fiber, satellite, DSL, cable)
- Data protection and privacy (PII, encryption, backups)
- Cloud computing and storage
- Development tools and languages (markup, compiled, scripting, query)

All questions include detailed explanations and are stored in the Supabase database for easy management.
