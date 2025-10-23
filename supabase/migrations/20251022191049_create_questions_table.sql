/*
  # Create Questions Database Schema

  1. New Tables
    - `questions`
      - `id` (uuid, primary key)
      - `question_number` (integer, unique)
      - `question_text` (text)
      - `option_a` (text)
      - `option_b` (text)
      - `option_c` (text)
      - `option_d` (text)
      - `option_e` (text, nullable)
      - `option_f` (text, nullable)
      - `correct_answer` (text)
      - `explanation` (text)
      - `has_image` (boolean)
      - `created_at` (timestamptz)

  2. Security
    - Enable RLS on `questions` table
    - Add policy for public read access (since this is a public exam practice tool)
*/

CREATE TABLE IF NOT EXISTS questions (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  question_number integer UNIQUE NOT NULL,
  question_text text NOT NULL,
  option_a text NOT NULL,
  option_b text NOT NULL,
  option_c text NOT NULL,
  option_d text NOT NULL,
  option_e text,
  option_f text,
  correct_answer text NOT NULL,
  explanation text NOT NULL,
  has_image boolean DEFAULT false,
  created_at timestamptz DEFAULT now()
);

ALTER TABLE questions ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Allow public read access to questions"
  ON questions
  FOR SELECT
  TO anon, authenticated
  USING (true);