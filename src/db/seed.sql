-- Seed course_access table for freemium model
-- Run this in Supabase SQL Editor: https://supabase.com/dashboard/project/[your-project]/sql/new

-- Clear existing data (optional)
DELETE FROM course_access;

-- Seed learn-numbers course
-- Lesson 1 of each group is FREE
-- Lessons 2, 3, 4 are PREMIUM
INSERT INTO course_access (id, course_id, group_id, lesson_id, access_type) VALUES
  -- Group 1 (1-3)
  (gen_random_uuid(), 'learn-numbers', 'group1', 'lesson1', 'free'),
  (gen_random_uuid(), 'learn-numbers', 'group1', 'lesson2', 'premium'),
  (gen_random_uuid(), 'learn-numbers', 'group1', 'lesson3', 'premium'),
  (gen_random_uuid(), 'learn-numbers', 'group1', 'lesson4', 'premium'),
  -- Group 2 (4-6)
  (gen_random_uuid(), 'learn-numbers', 'group2', 'lesson1', 'free'),
  (gen_random_uuid(), 'learn-numbers', 'group2', 'lesson2', 'premium'),
  (gen_random_uuid(), 'learn-numbers', 'group2', 'lesson3', 'premium'),
  (gen_random_uuid(), 'learn-numbers', 'group2', 'lesson4', 'premium'),
  -- Group 3 (7-9)
  (gen_random_uuid(), 'learn-numbers', 'group3', 'lesson1', 'free'),
  (gen_random_uuid(), 'learn-numbers', 'group3', 'lesson2', 'premium'),
  (gen_random_uuid(), 'learn-numbers', 'group3', 'lesson3', 'premium'),
  (gen_random_uuid(), 'learn-numbers', 'group3', 'lesson4', 'premium');

-- Seed compare-quantity course (4 groups)
-- Lesson 1 of each group is FREE
-- Lessons 2, 3, 4 are PREMIUM
INSERT INTO course_access (id, course_id, group_id, lesson_id, access_type) VALUES
  -- Group 1 (Lớn hơn / Greater)
  (gen_random_uuid(), 'compare-quantity', 'group1', 'lesson1', 'free'),
  (gen_random_uuid(), 'compare-quantity', 'group1', 'lesson2', 'premium'),
  (gen_random_uuid(), 'compare-quantity', 'group1', 'lesson3', 'premium'),
  (gen_random_uuid(), 'compare-quantity', 'group1', 'lesson4', 'premium'),
  -- Group 2 (Nhỏ hơn / Less)
  (gen_random_uuid(), 'compare-quantity', 'group2', 'lesson1', 'free'),
  (gen_random_uuid(), 'compare-quantity', 'group2', 'lesson2', 'premium'),
  (gen_random_uuid(), 'compare-quantity', 'group2', 'lesson3', 'premium'),
  (gen_random_uuid(), 'compare-quantity', 'group2', 'lesson4', 'premium'),
  -- Group 3 (Bằng nhau / Equal)
  (gen_random_uuid(), 'compare-quantity', 'group3', 'lesson1', 'free'),
  (gen_random_uuid(), 'compare-quantity', 'group3', 'lesson2', 'premium'),
  (gen_random_uuid(), 'compare-quantity', 'group3', 'lesson3', 'premium'),
  (gen_random_uuid(), 'compare-quantity', 'group3', 'lesson4', 'premium'),
  -- Group 4 (Luyện tập / Practice)
  (gen_random_uuid(), 'compare-quantity', 'group4', 'lesson1', 'free'),
  (gen_random_uuid(), 'compare-quantity', 'group4', 'lesson2', 'premium'),
  (gen_random_uuid(), 'compare-quantity', 'group4', 'lesson3', 'premium'),
  (gen_random_uuid(), 'compare-quantity', 'group4', 'lesson4', 'premium');

-- Verify the data
SELECT * FROM course_access ORDER BY course_id, group_id, lesson_id;
