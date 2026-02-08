-- Complete Database Seed for All Courses
-- Run this in Supabase SQL Editor to seed/reset all course data
-- This uses the NEW database structure (courses, groups, lessons tables)

-- ============================================
-- 1. INSERT COURSES
-- ============================================
INSERT INTO courses (id, title, description, thumbnail, sort_index) VALUES
  ('learn-numbers', 'Học đếm số', 'Bé học đếm từ 1-9 qua hình ảnh và trò chơi.', '/assets/courses/numbers.png', 1),
  ('compare-quantity', 'So sánh số lượng', 'Bé học so sánh nhiều hơn, ít hơn, bằng nhau.', '/assets/courses/compare.png', 2),
  ('learn-color', 'Học màu sắc', 'Bé làm quen với các màu sắc cơ bản.', '/assets/courses/colors.png', 3),
  ('learn-shape', 'Học hình dạng', 'Bé nhận biết các hình dạng qua đồ vật.', '/assets/courses/shapes.png', 4),
  ('learn-animal', 'Học động vật', 'Bé làm quen với các loài động vật qua hình ảnh và âm thanh.', '/assets/courses/animals.png', 5)
ON CONFLICT (id) DO UPDATE SET
  title = EXCLUDED.title,
  description = EXCLUDED.description,
  thumbnail = EXCLUDED.thumbnail,
  sort_index = EXCLUDED.sort_index;

-- ============================================
-- 2. INSERT GROUPS FOR EACH COURSE
-- ============================================

-- Learn Numbers Groups
INSERT INTO groups (id, slug, course_id, title, sort_index) VALUES
  ('learn-numbers-group1', 'group1', 'learn-numbers', 'Làm quen 1-3', 1),
  ('learn-numbers-group2', 'group2', 'learn-numbers', 'Làm quen 4-6', 2),
  ('learn-numbers-group3', 'group3', 'learn-numbers', 'Làm quen 7-9', 3),
  ('learn-numbers-group4', 'group4', 'learn-numbers', 'Luyện tập', 4)
ON CONFLICT (id) DO UPDATE SET
  title = EXCLUDED.title,
  sort_index = EXCLUDED.sort_index;

-- Compare Quantity Groups
INSERT INTO groups (id, slug, course_id, title, sort_index) VALUES
  ('compare-quantity-group1', 'group1', 'compare-quantity', 'Lớn hơn', 1),
  ('compare-quantity-group2', 'group2', 'compare-quantity', 'Nhỏ hơn', 2),
  ('compare-quantity-group3', 'group3', 'compare-quantity', 'Bằng nhau', 3),
  ('compare-quantity-group4', 'group4', 'compare-quantity', 'Luyện tập', 4)
ON CONFLICT (id) DO UPDATE SET
  title = EXCLUDED.title,
  sort_index = EXCLUDED.sort_index;

-- Learn Color Groups
INSERT INTO groups (id, slug, course_id, title, sort_index) VALUES
  ('learn-color-group1', 'group1', 'learn-color', 'Màu cơ bản', 1),
  ('learn-color-group2', 'group2', 'learn-color', 'Màu nâng cao', 2),
  ('learn-color-group3', 'group3', 'learn-color', 'Luyện tập', 3)
ON CONFLICT (id) DO UPDATE SET
  title = EXCLUDED.title,
  sort_index = EXCLUDED.sort_index;

-- Learn Shape Groups
INSERT INTO groups (id, slug, course_id, title, sort_index) VALUES
  ('learn-shape-group1', 'group1', 'learn-shape', 'Hình cơ bản', 1),
  ('learn-shape-group2', 'group2', 'learn-shape', 'Hình nâng cao', 2),
  ('learn-shape-group3', 'group3', 'learn-shape', 'Luyện tập', 3)
ON CONFLICT (id) DO UPDATE SET
  title = EXCLUDED.title,
  sort_index = EXCLUDED.sort_index;

-- Learn Animal Groups
INSERT INTO groups (id, slug, course_id, title, sort_index) VALUES
  ('learn-animal-group1', 'group1', 'learn-animal', 'Động vật nuôi', 1),
  ('learn-animal-group2', 'group2', 'learn-animal', 'Động vật hoang dã', 2),
  ('learn-animal-group3', 'group3', 'learn-animal', 'Động vật biển', 3)
ON CONFLICT (id) DO UPDATE SET
  title = EXCLUDED.title,
  sort_index = EXCLUDED.sort_index;

-- ============================================
-- 3. INSERT LESSONS (lesson1 is FREE, rest are PREMIUM)
-- ============================================

-- Learn Numbers Lessons
INSERT INTO lessons (id, slug, group_id, course_id, title, is_free, sort_index) VALUES
  -- Group 1 (1-3)
  ('learn-numbers-g1-l1', 'lesson1', 'learn-numbers-group1', 'learn-numbers', 'Học số 1-3', true, 1),
  ('learn-numbers-g1-l2', 'lesson2', 'learn-numbers-group1', 'learn-numbers', 'Số nào đúng?', false, 2),
  ('learn-numbers-g1-l3', 'lesson3', 'learn-numbers-group1', 'learn-numbers', 'Đếm đồ vật', false, 3),
  ('learn-numbers-g1-l4', 'lesson4', 'learn-numbers-group1', 'learn-numbers', 'Ghép số', false, 4),
  -- Group 2 (4-6)
  ('learn-numbers-g2-l1', 'lesson1', 'learn-numbers-group2', 'learn-numbers', 'Học số 4-6', true, 1),
  ('learn-numbers-g2-l2', 'lesson2', 'learn-numbers-group2', 'learn-numbers', 'Số nào đúng?', false, 2),
  ('learn-numbers-g2-l3', 'lesson3', 'learn-numbers-group2', 'learn-numbers', 'Đếm đồ vật', false, 3),
  ('learn-numbers-g2-l4', 'lesson4', 'learn-numbers-group2', 'learn-numbers', 'Ghép số', false, 4),
  -- Group 3 (7-9)
  ('learn-numbers-g3-l1', 'lesson1', 'learn-numbers-group3', 'learn-numbers', 'Học số 7-9', true, 1),
  ('learn-numbers-g3-l2', 'lesson2', 'learn-numbers-group3', 'learn-numbers', 'Số nào đúng?', false, 2),
  ('learn-numbers-g3-l3', 'lesson3', 'learn-numbers-group3', 'learn-numbers', 'Đếm đồ vật', false, 3),
  ('learn-numbers-g3-l4', 'lesson4', 'learn-numbers-group3', 'learn-numbers', 'Ghép số', false, 4),
  -- Group 4 (Practice)
  ('learn-numbers-g4-l1', 'lesson1', 'learn-numbers-group4', 'learn-numbers', 'Luyện tập 1-9', true, 1),
  ('learn-numbers-g4-l2', 'lesson2', 'learn-numbers-group4', 'learn-numbers', 'Trò chơi tổng hợp', false, 2)
ON CONFLICT (id) DO UPDATE SET
  title = EXCLUDED.title,
  is_free = EXCLUDED.is_free,
  sort_index = EXCLUDED.sort_index;

-- Compare Quantity Lessons
INSERT INTO lessons (id, slug, group_id, course_id, title, is_free, sort_index) VALUES
  -- Group 1 (Greater)
  ('compare-quantity-g1-l1', 'lesson1', 'compare-quantity-group1', 'compare-quantity', 'Học lớn hơn', true, 1),
  ('compare-quantity-g1-l2', 'lesson2', 'compare-quantity-group1', 'compare-quantity', 'Luyện tập', false, 2),
  ('compare-quantity-g1-l3', 'lesson3', 'compare-quantity-group1', 'compare-quantity', 'Thử thách', false, 3),
  ('compare-quantity-g1-l4', 'lesson4', 'compare-quantity-group1', 'compare-quantity', 'Trò chơi', false, 4),
  -- Group 2 (Less)
  ('compare-quantity-g2-l1', 'lesson1', 'compare-quantity-group2', 'compare-quantity', 'Học nhỏ hơn', true, 1),
  ('compare-quantity-g2-l2', 'lesson2', 'compare-quantity-group2', 'compare-quantity', 'Luyện tập', false, 2),
  ('compare-quantity-g2-l3', 'lesson3', 'compare-quantity-group2', 'compare-quantity', 'Thử thách', false, 3),
  ('compare-quantity-g2-l4', 'lesson4', 'compare-quantity-group2', 'compare-quantity', 'Trò chơi', false, 4),
  -- Group 3 (Equal)
  ('compare-quantity-g3-l1', 'lesson1', 'compare-quantity-group3', 'compare-quantity', 'Học bằng nhau', true, 1),
  ('compare-quantity-g3-l2', 'lesson2', 'compare-quantity-group3', 'compare-quantity', 'Luyện tập', false, 2),
  ('compare-quantity-g3-l3', 'lesson3', 'compare-quantity-group3', 'compare-quantity', 'Thử thách', false, 3),
  ('compare-quantity-g3-l4', 'lesson4', 'compare-quantity-group3', 'compare-quantity', 'Trò chơi', false, 4),
  -- Group 4 (Practice)
  ('compare-quantity-g4-l1', 'lesson1', 'compare-quantity-group4', 'compare-quantity', 'Luyện tập tổng hợp', true, 1),
  ('compare-quantity-g4-l2', 'lesson2', 'compare-quantity-group4', 'compare-quantity', 'Thử thách cuối', false, 2)
ON CONFLICT (id) DO UPDATE SET
  title = EXCLUDED.title,
  is_free = EXCLUDED.is_free,
  sort_index = EXCLUDED.sort_index;

-- Learn Color Lessons
INSERT INTO lessons (id, slug, group_id, course_id, title, is_free, sort_index) VALUES
  -- Group 1 (Basic Colors)
  ('learn-color-g1-l1', 'lesson1', 'learn-color-group1', 'learn-color', 'Học màu sắc', true, 1),
  ('learn-color-g1-l2', 'lesson2', 'learn-color-group1', 'learn-color', 'Tìm màu giống', false, 2),
  ('learn-color-g1-l3', 'lesson3', 'learn-color-group1', 'learn-color', 'Trò chơi màu', false, 3),
  -- Group 2 (Advanced Colors)
  ('learn-color-g2-l1', 'lesson1', 'learn-color-group2', 'learn-color', 'Học màu sắc', true, 1),
  ('learn-color-g2-l2', 'lesson2', 'learn-color-group2', 'learn-color', 'Tìm màu giống', false, 2),
  ('learn-color-g2-l3', 'lesson3', 'learn-color-group2', 'learn-color', 'Trò chơi màu', false, 3),
  -- Group 3 (Practice)
  ('learn-color-g3-l1', 'lesson1', 'learn-color-group3', 'learn-color', 'Luyện tập màu', true, 1),
  ('learn-color-g3-l2', 'lesson2', 'learn-color-group3', 'learn-color', 'Thử thách màu', false, 2)
ON CONFLICT (id) DO UPDATE SET
  title = EXCLUDED.title,
  is_free = EXCLUDED.is_free,
  sort_index = EXCLUDED.sort_index;

-- Learn Shape Lessons
INSERT INTO lessons (id, slug, group_id, course_id, title, is_free, sort_index) VALUES
  -- Group 1 (Basic Shapes)
  ('learn-shape-g1-l1', 'lesson1', 'learn-shape-group1', 'learn-shape', 'Học hình dạng', true, 1),
  ('learn-shape-g1-l2', 'lesson2', 'learn-shape-group1', 'learn-shape', 'Tìm hình giống', false, 2),
  ('learn-shape-g1-l3', 'lesson3', 'learn-shape-group1', 'learn-shape', 'Tìm đồ vật', false, 3),
  ('learn-shape-g1-l4', 'lesson4', 'learn-shape-group1', 'learn-shape', 'Trò chơi hình', false, 4),
  -- Group 2 (Advanced Shapes)
  ('learn-shape-g2-l1', 'lesson1', 'learn-shape-group2', 'learn-shape', 'Học hình dạng', true, 1),
  ('learn-shape-g2-l2', 'lesson2', 'learn-shape-group2', 'learn-shape', 'Tìm hình giống', false, 2),
  ('learn-shape-g2-l3', 'lesson3', 'learn-shape-group2', 'learn-shape', 'Tìm đồ vật', false, 3),
  ('learn-shape-g2-l4', 'lesson4', 'learn-shape-group2', 'learn-shape', 'Trò chơi hình', false, 4),
  -- Group 3 (Practice)
  ('learn-shape-g3-l1', 'lesson1', 'learn-shape-group3', 'learn-shape', 'Luyện tập hình', true, 1),
  ('learn-shape-g3-l2', 'lesson2', 'learn-shape-group3', 'learn-shape', 'Thử thách hình', false, 2)
ON CONFLICT (id) DO UPDATE SET
  title = EXCLUDED.title,
  is_free = EXCLUDED.is_free,
  sort_index = EXCLUDED.sort_index;

-- Learn Animal Lessons
INSERT INTO lessons (id, slug, group_id, course_id, title, is_free, sort_index) VALUES
  -- Group 1 (Farm Animals)
  ('learn-animal-g1-l1', 'lesson1', 'learn-animal-group1', 'learn-animal', 'Học tên động vật', true, 1),
  ('learn-animal-g1-l2', 'lesson2', 'learn-animal-group1', 'learn-animal', 'Đây là con gì?', false, 2),
  ('learn-animal-g1-l3', 'lesson3', 'learn-animal-group1', 'learn-animal', 'Nghe tiếng kêu', false, 3),
  -- Group 2 (Wild Animals)
  ('learn-animal-g2-l1', 'lesson1', 'learn-animal-group2', 'learn-animal', 'Học tên động vật', true, 1),
  ('learn-animal-g2-l2', 'lesson2', 'learn-animal-group2', 'learn-animal', 'Đây là con gì?', false, 2),
  ('learn-animal-g2-l3', 'lesson3', 'learn-animal-group2', 'learn-animal', 'Nghe tiếng kêu', false, 3),
  -- Group 3 (Ocean Animals)
  ('learn-animal-g3-l1', 'lesson1', 'learn-animal-group3', 'learn-animal', 'Học tên động vật', true, 1),
  ('learn-animal-g3-l2', 'lesson2', 'learn-animal-group3', 'learn-animal', 'Đây là con gì?', false, 2),
  ('learn-animal-g3-l3', 'lesson3', 'learn-animal-group3', 'learn-animal', 'Nghe tiếng kêu', false, 3)
ON CONFLICT (id) DO UPDATE SET
  title = EXCLUDED.title,
  is_free = EXCLUDED.is_free,
  sort_index = EXCLUDED.sort_index;

-- ============================================
-- VERIFY DATA
-- ============================================
SELECT 
  c.title as course, 
  g.title as group, 
  l.title as lesson, 
  l.is_free,
  l.sort_index
FROM lessons l
JOIN groups g ON l.group_id = g.id
JOIN courses c ON l.course_id = c.id
ORDER BY c.sort_index, g.sort_index, l.sort_index;
