-- Add course_id column to progress table
ALTER TABLE progress ADD COLUMN course_id TEXT NOT NULL DEFAULT 'learn-numbers';
