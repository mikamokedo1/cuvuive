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
  ('learn-animal', 'Học động vật', 'Bé làm quen với các loài động vật qua hình ảnh và âm thanh.', '/assets/courses/animals.png', 5),
  ('learn-vehicle', 'Học phương tiện', 'Bé làm quen với các phương tiện giao thông đường bộ, đường thủy và hàng không.', '/assets/courses/vehicles.png', 6),
  ('learn-fruit', 'Học trái cây', 'Bé nhận biết tên và hình dạng của các loại trái cây quen thuộc.', '/assets/courses/fruits.png', 7),
  ('learn-food', 'Học món ăn', 'Bé học tên các món ăn sáng, món chính và món tráng miệng.', '/assets/courses/foods.png', 8),
  ('learn-dinosaur', 'Học khủng long', 'Khám phá thế giới của các loài khủng long.', '/assets/courses/dinosaurs.png', 9),
  ('learn-instrument', 'Học nhạc cụ', 'Bé làm quen với các loại nhạc cụ và âm thanh của chúng.', '/assets/courses/instruments.png', 10),
  ('learn-occupation', 'Học nghề nghiệp', 'Tìm hiểu về các nghề nghiệp phổ biến trong xã hội.', '/assets/courses/occupations.png', 11),
  ('learn-flower', 'Học Hoa & Cây', 'Khám phá các loài hoa và cây quen thuộc ở Việt Nam.', '/assets/courses/flowers.png', 12),
  ('learn-weather', 'Học thời tiết', 'Bé làm quen với các hiện tượng thời tiết và khí hậu qua hình ảnh vui nhộn.', '/assets/courses/weather.png', 13),
  ('learn-hygiene', 'Học vệ sinh cá nhân', 'Bé học giữ gìn vệ sinh và thói quen sạch sẽ gọn gàng.', '/assets/games/learn-hygiene/logo.png', 14),
  ('learn-flag', 'Học cờ quốc gia', 'Bé nhận biết quốc kỳ các nước trên thế giới.', '/assets/games/learn-flag/logo.webp', 15),
  ('learn-math', 'Học toán đơn giản', 'Bé học phép cộng và phép trừ với các con số đến 20.', '/assets/games/learn-math/logo.png', 16),
  ('learn-alphabet', 'Bảng chữ cái', 'Bé học bảng chữ cái tiếng Việt qua hình ảnh và trò chơi.', '/assets/games/learn-alphabet/logo.png', 17),
  ('odd-one-out', 'Tìm hình khác biệt', 'Bé luyện nhãn quan bằng cách tìm ra hình khác với các hình còn lại.', '/assets/games/odd-one-out/logo.png', 18),
  ('maze-runner', 'Mê Cung Phiêu Lưu', 'Bé điều hướng qua các mê cung để tìm ngôi sao.', '/assets/games/maze-runner/logo.png', 19)
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
  ('learn-numbers-group4', 'group4', 'learn-numbers', 'Làm quen 10-20', 4),
  ('learn-numbers-group5', 'group5', 'learn-numbers', 'Luyện tập', 5)
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

-- Learn Vehicle Groups
INSERT INTO groups (id, slug, course_id, title, sort_index) VALUES
  ('learn-vehicle-group1', 'group1', 'learn-vehicle', 'Phương tiện đường bộ', 1),
  ('learn-vehicle-group2', 'group2', 'learn-vehicle', 'Phương tiện đường thủy', 2),
  ('learn-vehicle-group3', 'group3', 'learn-vehicle', 'Phương tiện hàng không', 3),
  ('learn-vehicle-group4', 'group4', 'learn-vehicle', 'Luyện tập', 4)
ON CONFLICT (id) DO UPDATE SET
  title = EXCLUDED.title,
  sort_index = EXCLUDED.sort_index;

-- Learn Fruit Groups
INSERT INTO groups (id, slug, course_id, title, sort_index) VALUES
  ('learn-fruit-group1', 'group1', 'learn-fruit', 'Trái cây phổ biến', 1),
  ('learn-fruit-group2', 'group2', 'learn-fruit', 'Trái cây nhiệt đới', 2),
  ('learn-fruit-group3', 'group3', 'learn-fruit', 'Trái cây khác', 3)
ON CONFLICT (id) DO UPDATE SET
  title = EXCLUDED.title,
  sort_index = EXCLUDED.sort_index;

-- Learn Food Groups
INSERT INTO groups (id, slug, course_id, title, sort_index) VALUES
  ('learn-food-group1', 'group1', 'learn-food', 'Món ăn sáng', 1),
  ('learn-food-group2', 'group2', 'learn-food', 'Món chính', 2),
  ('learn-food-group3', 'group3', 'learn-food', 'Món tráng miệng', 3)
ON CONFLICT (id) DO UPDATE SET
  title = EXCLUDED.title,
  sort_index = EXCLUDED.sort_index;

-- Learn Dinosaur Groups
INSERT INTO groups (id, slug, course_id, title, sort_index) VALUES
  ('learn-dinosaur-group1', 'group1', 'learn-dinosaur', 'Khủng long ăn cỏ', 1),
  ('learn-dinosaur-group2', 'group2', 'learn-dinosaur', 'Khủng long ăn thịt', 2),
  ('learn-dinosaur-group3', 'group3', 'learn-dinosaur', 'Khủng long bay & biển', 3)
ON CONFLICT (id) DO UPDATE SET
  title = EXCLUDED.title,
  sort_index = EXCLUDED.sort_index;

-- Learn Instrument Groups
INSERT INTO groups (id, slug, course_id, title, sort_index) VALUES
  ('learn-instrument-group1', 'group1', 'learn-instrument', 'Nhạc cụ dây', 1),
  ('learn-instrument-group2', 'group2', 'learn-instrument', 'Nhạc cụ gõ', 2),
  ('learn-instrument-group3', 'group3', 'learn-instrument', 'Nhạc cụ hơi', 3)
ON CONFLICT (id) DO UPDATE SET
  title = EXCLUDED.title,
  sort_index = EXCLUDED.sort_index;

-- Learn Occupation Groups
INSERT INTO groups (id, slug, course_id, title, sort_index) VALUES
  ('learn-occupation-group1', 'group1', 'learn-occupation', 'Nghề cộng đồng', 1),
  ('learn-occupation-group2', 'group2', 'learn-occupation', 'Nghề y tế & khoa học', 2),
  ('learn-occupation-group3', 'group3', 'learn-occupation', 'Nghề nghệ thuật', 3)
ON CONFLICT (id) DO UPDATE SET
  title = EXCLUDED.title,
  sort_index = EXCLUDED.sort_index;

-- Learn Flower Groups
INSERT INTO groups (id, slug, course_id, title, sort_index) VALUES
  ('learn-flower-group1', 'group1', 'learn-flower', 'Hoa phổ biến', 1),
  ('learn-flower-group2', 'group2', 'learn-flower', 'Hoa Tết & Trang trí', 2),
  ('learn-flower-group3', 'group3', 'learn-flower', 'Cây ăn quả', 3)
ON CONFLICT (id) DO UPDATE SET
  title = EXCLUDED.title,
  sort_index = EXCLUDED.sort_index;

-- Learn Weather Groups
INSERT INTO groups (id, slug, course_id, title, sort_index) VALUES
  ('learn-weather-group1', 'group1', 'learn-weather', 'Thời tiết cơ bản', 1),
  ('learn-weather-group2', 'group2', 'learn-weather', 'Thời tiết đặc biệt', 2),
  ('learn-weather-group3', 'group3', 'learn-weather', 'Mùa và khí hậu', 3)
ON CONFLICT (id) DO UPDATE SET
  title = EXCLUDED.title,
  sort_index = EXCLUDED.sort_index;

-- Learn Hygiene Groups
INSERT INTO groups (id, slug, course_id, title, sort_index) VALUES
  ('learn-hygiene-group1', 'group1', 'learn-hygiene', 'Vệ sinh hàng ngày', 1),
  ('learn-hygiene-group2', 'group2', 'learn-hygiene', 'Giữ gìn sức khoẻ', 2),
  ('learn-hygiene-group3', 'group3', 'learn-hygiene', 'Sạch sẽ gọn gàng', 3)
ON CONFLICT (id) DO UPDATE SET
  title = EXCLUDED.title,
  sort_index = EXCLUDED.sort_index;

-- Learn Flag Groups
INSERT INTO groups (id, slug, course_id, title, sort_index) VALUES
  ('learn-flag-group1', 'group1', 'learn-flag', 'Châu Á', 1),
  ('learn-flag-group2', 'group2', 'learn-flag', 'Châu Âu', 2),
  ('learn-flag-group3', 'group3', 'learn-flag', 'Châu Mỹ', 3),
  ('learn-flag-group4', 'group4', 'learn-flag', 'Khác', 4)
ON CONFLICT (id) DO UPDATE SET
  title = EXCLUDED.title,
  sort_index = EXCLUDED.sort_index;

-- Learn Math Groups
INSERT INTO groups (id, slug, course_id, title, sort_index) VALUES
  ('learn-math-group1', 'group1', 'learn-math', 'Phép Cộng', 1),
  ('learn-math-group2', 'group2', 'learn-math', 'Phép Trừ', 2),
  ('learn-math-group3', 'group3', 'learn-math', 'Luyện tập', 3)
ON CONFLICT (id) DO UPDATE SET
  title = EXCLUDED.title,
  sort_index = EXCLUDED.sort_index;

-- Learn Alphabet Groups
INSERT INTO groups (id, slug, course_id, title, sort_index) VALUES
  ('learn-alphabet-group1', 'group1', 'learn-alphabet', 'Nguyên âm', 1),
  ('learn-alphabet-group2', 'group2', 'learn-alphabet', 'Phụ âm 1', 2),
  ('learn-alphabet-group3', 'group3', 'learn-alphabet', 'Phụ âm 2', 3)
ON CONFLICT (id) DO UPDATE SET
  title = EXCLUDED.title,
  sort_index = EXCLUDED.sort_index;

-- Odd One Out Groups
INSERT INTO groups (id, slug, course_id, title, sort_index) VALUES
  ('odd-one-out-group1', 'group1', 'odd-one-out', 'Tìm màu khác biệt', 1),
  ('odd-one-out-group2', 'group2', 'odd-one-out', 'Tìm hình khác biệt', 2),
  ('odd-one-out-group3', 'group3', 'odd-one-out', 'Tìm hình khác loại', 3)
ON CONFLICT (id) DO UPDATE SET
  title = EXCLUDED.title,
  sort_index = EXCLUDED.sort_index;

-- Maze Runner Groups
INSERT INTO groups (id, slug, course_id, title, sort_index) VALUES
  ('maze-runner-group1', 'group1', 'maze-runner', 'Mê cung dễ', 1),
  ('maze-runner-group2', 'group2', 'maze-runner', 'Mê cung vừa', 2),
  ('maze-runner-group3', 'group3', 'maze-runner', 'Mê cung khó', 3)
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
  -- Group 4 (10-20)
  ('learn-numbers-g4-l1', 'lesson1', 'learn-numbers-group4', 'learn-numbers', 'Học số 10-20', true, 1),
  ('learn-numbers-g4-l2', 'lesson2', 'learn-numbers-group4', 'learn-numbers', 'Số nào đúng?', false, 2),
  ('learn-numbers-g4-l3', 'lesson3', 'learn-numbers-group4', 'learn-numbers', 'Đếm đồ vật', false, 3),
  ('learn-numbers-g4-l4', 'lesson4', 'learn-numbers-group4', 'learn-numbers', 'Ghép số', false, 4),
  -- Group 5 (Practice)
  ('learn-numbers-g5-l1', 'lesson1', 'learn-numbers-group5', 'learn-numbers', 'Luyện tập', true, 1),
  ('learn-numbers-g5-l2', 'lesson2', 'learn-numbers-group5', 'learn-numbers', 'Trò chơi tổng hợp', false, 2)
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
  ('learn-animal-g1-l2', 'lesson2', 'learn-animal-group1', 'learn-animal', 'Tập nói', false, 2),
  ('learn-animal-g1-l3', 'lesson3', 'learn-animal-group1', 'learn-animal', 'Đây là con gì?', false, 3),
  ('learn-animal-g1-l4', 'lesson4', 'learn-animal-group1', 'learn-animal', 'Ghép đôi', false, 4),
  -- Group 2 (Wild Animals)
  ('learn-animal-g2-l1', 'lesson1', 'learn-animal-group2', 'learn-animal', 'Học tên động vật', true, 1),
  ('learn-animal-g2-l2', 'lesson2', 'learn-animal-group2', 'learn-animal', 'Tập nói', false, 2),
  ('learn-animal-g2-l3', 'lesson3', 'learn-animal-group2', 'learn-animal', 'Đây là con gì?', false, 3),
  ('learn-animal-g2-l4', 'lesson4', 'learn-animal-group2', 'learn-animal', 'Ghép đôi', false, 4),
  -- Group 3 (Ocean Animals)
  ('learn-animal-g3-l1', 'lesson1', 'learn-animal-group3', 'learn-animal', 'Học tên động vật', true, 1),
  ('learn-animal-g3-l2', 'lesson2', 'learn-animal-group3', 'learn-animal', 'Tập nói', false, 2),
  ('learn-animal-g3-l3', 'lesson3', 'learn-animal-group3', 'learn-animal', 'Đây là con gì?', false, 3),
  ('learn-animal-g3-l4', 'lesson4', 'learn-animal-group3', 'learn-animal', 'Ghép đôi', false, 4)
ON CONFLICT (id) DO UPDATE SET
  title = EXCLUDED.title,
  is_free = EXCLUDED.is_free,
  sort_index = EXCLUDED.sort_index;

-- Learn Vehicle Lessons
INSERT INTO lessons (id, slug, group_id, course_id, title, is_free, sort_index) VALUES
  -- Group 1 (Land Vehicles) - 3 lessons
  ('learn-vehicle-g1-l1', 'lesson1', 'learn-vehicle-group1', 'learn-vehicle', 'Học tên phương tiện', true, 1),
  ('learn-vehicle-g1-l2', 'lesson2', 'learn-vehicle-group1', 'learn-vehicle', 'Đây là gì?', false, 2),
  ('learn-vehicle-g1-l3', 'lesson3', 'learn-vehicle-group1', 'learn-vehicle', 'Ghép đôi', false, 3),
  -- Group 2 (Water Vehicles) - 3 lessons
  ('learn-vehicle-g2-l1', 'lesson1', 'learn-vehicle-group2', 'learn-vehicle', 'Học tên phương tiện', true, 1),
  ('learn-vehicle-g2-l2', 'lesson2', 'learn-vehicle-group2', 'learn-vehicle', 'Đây là gì?', false, 2),
  ('learn-vehicle-g2-l3', 'lesson3', 'learn-vehicle-group2', 'learn-vehicle', 'Ghép đôi', false, 3),
  -- Group 3 (Air Vehicles) - 3 lessons
  ('learn-vehicle-g3-l1', 'lesson1', 'learn-vehicle-group3', 'learn-vehicle', 'Học tên phương tiện', true, 1),
  ('learn-vehicle-g3-l2', 'lesson2', 'learn-vehicle-group3', 'learn-vehicle', 'Đây là gì?', false, 2),
  ('learn-vehicle-g3-l3', 'lesson3', 'learn-vehicle-group3', 'learn-vehicle', 'Ghép đôi', false, 3),
  -- Group 4 (Practice) - 3 lessons
  ('learn-vehicle-g4-l1', 'lesson1', 'learn-vehicle-group4', 'learn-vehicle', 'Đây là gì?', true, 1),
  ('learn-vehicle-g4-l2', 'lesson2', 'learn-vehicle-group4', 'learn-vehicle', 'Ghép đôi', false, 2),
  ('learn-vehicle-g4-l3', 'lesson3', 'learn-vehicle-group4', 'learn-vehicle', 'Xe đi đâu?', false, 3)
ON CONFLICT (id) DO UPDATE SET
  title = EXCLUDED.title,
  is_free = EXCLUDED.is_free,
  sort_index = EXCLUDED.sort_index;

-- Learn Fruit Lessons
INSERT INTO lessons (id, slug, group_id, course_id, title, is_free, sort_index) VALUES
  ('learn-fruit-g1-l1', 'lesson1', 'learn-fruit-group1', 'learn-fruit', 'Học tên trái cây', true, 1),
  ('learn-fruit-g1-l2', 'lesson2', 'learn-fruit-group1', 'learn-fruit', 'Đây là gì?', false, 2),
  ('learn-fruit-g1-l3', 'lesson3', 'learn-fruit-group1', 'learn-fruit', 'Ghép đôi', false, 3),
  ('learn-fruit-g2-l1', 'lesson1', 'learn-fruit-group2', 'learn-fruit', 'Học tên trái cây', true, 1),
  ('learn-fruit-g2-l2', 'lesson2', 'learn-fruit-group2', 'learn-fruit', 'Đây là gì?', false, 2),
  ('learn-fruit-g2-l3', 'lesson3', 'learn-fruit-group2', 'learn-fruit', 'Ghép đôi', false, 3),
  ('learn-fruit-g3-l1', 'lesson1', 'learn-fruit-group3', 'learn-fruit', 'Học tên trái cây', true, 1),
  ('learn-fruit-g3-l2', 'lesson2', 'learn-fruit-group3', 'learn-fruit', 'Đây là gì?', false, 2),
  ('learn-fruit-g3-l3', 'lesson3', 'learn-fruit-group3', 'learn-fruit', 'Ghép đôi', false, 3)
ON CONFLICT (id) DO UPDATE SET
  title = EXCLUDED.title,
  is_free = EXCLUDED.is_free,
  sort_index = EXCLUDED.sort_index;

-- Learn Food Lessons
INSERT INTO lessons (id, slug, group_id, course_id, title, is_free, sort_index) VALUES
  ('learn-food-g1-l1', 'lesson1', 'learn-food-group1', 'learn-food', 'Học tên món ăn', true, 1),
  ('learn-food-g1-l2', 'lesson2', 'learn-food-group1', 'learn-food', 'Đây là gì?', false, 2),
  ('learn-food-g1-l3', 'lesson3', 'learn-food-group1', 'learn-food', 'Ghép đôi', false, 3),
  ('learn-food-g2-l1', 'lesson1', 'learn-food-group2', 'learn-food', 'Học tên món ăn', true, 1),
  ('learn-food-g2-l2', 'lesson2', 'learn-food-group2', 'learn-food', 'Đây là gì?', false, 2),
  ('learn-food-g2-l3', 'lesson3', 'learn-food-group2', 'learn-food', 'Ghép đôi', false, 3),
  ('learn-food-g3-l1', 'lesson1', 'learn-food-group3', 'learn-food', 'Học tên món ăn', true, 1),
  ('learn-food-g3-l2', 'lesson2', 'learn-food-group3', 'learn-food', 'Đây là gì?', false, 2),
  ('learn-food-g3-l3', 'lesson3', 'learn-food-group3', 'learn-food', 'Ghép đôi', false, 3)
ON CONFLICT (id) DO UPDATE SET
  title = EXCLUDED.title,
  is_free = EXCLUDED.is_free,
  sort_index = EXCLUDED.sort_index;

-- Learn Dinosaur Lessons
INSERT INTO lessons (id, slug, group_id, course_id, title, is_free, sort_index) VALUES
  ('learn-dinosaur-g1-l1', 'lesson1', 'learn-dinosaur-group1', 'learn-dinosaur', 'Học tên khủng long', true, 1),
  ('learn-dinosaur-g1-l2', 'lesson2', 'learn-dinosaur-group1', 'learn-dinosaur', 'Đây là gì?', false, 2),
  ('learn-dinosaur-g1-l3', 'lesson3', 'learn-dinosaur-group1', 'learn-dinosaur', 'Ghép đôi', false, 3),
  ('learn-dinosaur-g2-l1', 'lesson1', 'learn-dinosaur-group2', 'learn-dinosaur', 'Học tên khủng long', true, 1),
  ('learn-dinosaur-g2-l2', 'lesson2', 'learn-dinosaur-group2', 'learn-dinosaur', 'Đây là gì?', false, 2),
  ('learn-dinosaur-g2-l3', 'lesson3', 'learn-dinosaur-group2', 'learn-dinosaur', 'Ghép đôi', false, 3),
  ('learn-dinosaur-g3-l1', 'lesson1', 'learn-dinosaur-group3', 'learn-dinosaur', 'Học tên khủng long', true, 1),
  ('learn-dinosaur-g3-l2', 'lesson2', 'learn-dinosaur-group3', 'learn-dinosaur', 'Đây là gì?', false, 2),
  ('learn-dinosaur-g3-l3', 'lesson3', 'learn-dinosaur-group3', 'learn-dinosaur', 'Ghép đôi', false, 3)
ON CONFLICT (id) DO UPDATE SET
  title = EXCLUDED.title,
  is_free = EXCLUDED.is_free,
  sort_index = EXCLUDED.sort_index;

-- Learn Instrument Lessons
INSERT INTO lessons (id, slug, group_id, course_id, title, is_free, sort_index) VALUES
  ('learn-instrument-g1-l1', 'lesson1', 'learn-instrument-group1', 'learn-instrument', 'Học nhạc cụ', true, 1),
  ('learn-instrument-g1-l2', 'lesson2', 'learn-instrument-group1', 'learn-instrument', 'Đây là gì?', false, 2),
  ('learn-instrument-g1-l3', 'lesson3', 'learn-instrument-group1', 'learn-instrument', 'Ghép đôi', false, 3),
  ('learn-instrument-g2-l1', 'lesson1', 'learn-instrument-group2', 'learn-instrument', 'Học nhạc cụ', true, 1),
  ('learn-instrument-g2-l2', 'lesson2', 'learn-instrument-group2', 'learn-instrument', 'Đây là gì?', false, 2),
  ('learn-instrument-g2-l3', 'lesson3', 'learn-instrument-group2', 'learn-instrument', 'Ghép đôi', false, 3),
  ('learn-instrument-g3-l1', 'lesson1', 'learn-instrument-group3', 'learn-instrument', 'Học nhạc cụ', true, 1),
  ('learn-instrument-g3-l2', 'lesson2', 'learn-instrument-group3', 'learn-instrument', 'Đây là gì?', false, 2),
  ('learn-instrument-g3-l3', 'lesson3', 'learn-instrument-group3', 'learn-instrument', 'Ghép đôi', false, 3)
ON CONFLICT (id) DO UPDATE SET
  title = EXCLUDED.title,
  is_free = EXCLUDED.is_free,
  sort_index = EXCLUDED.sort_index;

-- Learn Occupation Lessons
INSERT INTO lessons (id, slug, group_id, course_id, title, is_free, sort_index) VALUES
  ('learn-occupation-g1-l1', 'lesson1', 'learn-occupation-group1', 'learn-occupation', 'Học tên nghề', true, 1),
  ('learn-occupation-g1-l2', 'lesson2', 'learn-occupation-group1', 'learn-occupation', 'Đây là gì?', false, 2),
  ('learn-occupation-g1-l3', 'lesson3', 'learn-occupation-group1', 'learn-occupation', 'Nối dụng cụ', false, 3),
  ('learn-occupation-g2-l1', 'lesson1', 'learn-occupation-group2', 'learn-occupation', 'Học tên nghề', true, 1),
  ('learn-occupation-g2-l2', 'lesson2', 'learn-occupation-group2', 'learn-occupation', 'Đây là gì?', false, 2),
  ('learn-occupation-g2-l3', 'lesson3', 'learn-occupation-group2', 'learn-occupation', 'Nối dụng cụ', false, 3),
  ('learn-occupation-g3-l1', 'lesson1', 'learn-occupation-group3', 'learn-occupation', 'Học tên nghề', true, 1),
  ('learn-occupation-g3-l2', 'lesson2', 'learn-occupation-group3', 'learn-occupation', 'Đây là gì?', false, 2),
  ('learn-occupation-g3-l3', 'lesson3', 'learn-occupation-group3', 'learn-occupation', 'Nối dụng cụ', false, 3)
ON CONFLICT (id) DO UPDATE SET
  title = EXCLUDED.title,
  is_free = EXCLUDED.is_free,
  sort_index = EXCLUDED.sort_index;

-- Learn Flower Lessons
INSERT INTO lessons (id, slug, group_id, course_id, title, is_free, sort_index) VALUES
  ('learn-flower-g1-l1', 'lesson1', 'learn-flower-group1', 'learn-flower', 'Học tên hoa', true, 1),
  ('learn-flower-g1-l2', 'lesson2', 'learn-flower-group1', 'learn-flower', 'Đây là gì?', false, 2),
  ('learn-flower-g1-l3', 'lesson3', 'learn-flower-group1', 'learn-flower', 'Ghép đôi', false, 3),
  ('learn-flower-g2-l1', 'lesson1', 'learn-flower-group2', 'learn-flower', 'Học tên hoa', true, 1),
  ('learn-flower-g2-l2', 'lesson2', 'learn-flower-group2', 'learn-flower', 'Đây là gì?', false, 2),
  ('learn-flower-g2-l3', 'lesson3', 'learn-flower-group2', 'learn-flower', 'Ghép đôi', false, 3),
  ('learn-flower-g3-l1', 'lesson1', 'learn-flower-group3', 'learn-flower', 'Học tên cây', true, 1),
  ('learn-flower-g3-l2', 'lesson2', 'learn-flower-group3', 'learn-flower', 'Đây là gì?', false, 2),
  ('learn-flower-g3-l3', 'lesson3', 'learn-flower-group3', 'learn-flower', 'Ghép đôi', false, 3)
ON CONFLICT (id) DO UPDATE SET
  title = EXCLUDED.title,
  is_free = EXCLUDED.is_free,
  sort_index = EXCLUDED.sort_index;

-- Learn Weather Lessons
INSERT INTO lessons (id, slug, group_id, course_id, title, is_free, sort_index) VALUES
  ('learn-weather-g1-l1', 'lesson1', 'learn-weather-group1', 'learn-weather', 'Học tên thời tiết', true, 1),
  ('learn-weather-g1-l2', 'lesson2', 'learn-weather-group1', 'learn-weather', 'Tập nói', false, 2),
  ('learn-weather-g1-l3', 'lesson3', 'learn-weather-group1', 'learn-weather', 'Đây là gì?', false, 3),
  ('learn-weather-g1-l4', 'lesson4', 'learn-weather-group1', 'learn-weather', 'Ghép đôi', false, 4),
  ('learn-weather-g2-l1', 'lesson1', 'learn-weather-group2', 'learn-weather', 'Học tên thời tiết', true, 1),
  ('learn-weather-g2-l2', 'lesson2', 'learn-weather-group2', 'learn-weather', 'Tập nói', false, 2),
  ('learn-weather-g2-l3', 'lesson3', 'learn-weather-group2', 'learn-weather', 'Đây là gì?', false, 3),
  ('learn-weather-g2-l4', 'lesson4', 'learn-weather-group2', 'learn-weather', 'Ghép đôi', false, 4),
  ('learn-weather-g3-l1', 'lesson1', 'learn-weather-group3', 'learn-weather', 'Học tên mùa', true, 1),
  ('learn-weather-g3-l2', 'lesson2', 'learn-weather-group3', 'learn-weather', 'Tập nói', false, 2),
  ('learn-weather-g3-l3', 'lesson3', 'learn-weather-group3', 'learn-weather', 'Đây là gì?', false, 3),
  ('learn-weather-g3-l4', 'lesson4', 'learn-weather-group3', 'learn-weather', 'Ghép đôi', false, 4),
  ('learn-weather-g3-l5', 'lesson5', 'learn-weather-group3', 'learn-weather', 'Mặc gì cho đúng mùa?', false, 5)
ON CONFLICT (id) DO UPDATE SET
  title = EXCLUDED.title,
  is_free = EXCLUDED.is_free,
  sort_index = EXCLUDED.sort_index;

-- Learn Hygiene Lessons
INSERT INTO lessons (id, slug, group_id, course_id, title, is_free, sort_index) VALUES
  ('learn-hygiene-g1-l1', 'lesson1', 'learn-hygiene-group1', 'learn-hygiene', 'Học tên', true, 1),
  ('learn-hygiene-g1-l2', 'lesson2', 'learn-hygiene-group1', 'learn-hygiene', 'Tập nói', false, 2),
  ('learn-hygiene-g1-l3', 'lesson3', 'learn-hygiene-group1', 'learn-hygiene', 'Đúng hay Sai?', false, 3),
  ('learn-hygiene-g1-l4', 'lesson4', 'learn-hygiene-group1', 'learn-hygiene', 'Sắp xếp thứ tự', false, 4),
  ('learn-hygiene-g2-l1', 'lesson1', 'learn-hygiene-group2', 'learn-hygiene', 'Học tên', true, 1),
  ('learn-hygiene-g2-l2', 'lesson2', 'learn-hygiene-group2', 'learn-hygiene', 'Tập nói', false, 2),
  ('learn-hygiene-g2-l3', 'lesson3', 'learn-hygiene-group2', 'learn-hygiene', 'Đúng hay Sai?', false, 3),
  ('learn-hygiene-g2-l4', 'lesson4', 'learn-hygiene-group2', 'learn-hygiene', 'Sắp xếp thứ tự', false, 4),
  ('learn-hygiene-g3-l1', 'lesson1', 'learn-hygiene-group3', 'learn-hygiene', 'Học tên', true, 1),
  ('learn-hygiene-g3-l2', 'lesson2', 'learn-hygiene-group3', 'learn-hygiene', 'Tập nói', false, 2),
  ('learn-hygiene-g3-l3', 'lesson3', 'learn-hygiene-group3', 'learn-hygiene', 'Đúng hay Sai?', false, 3),
  ('learn-hygiene-g3-l4', 'lesson4', 'learn-hygiene-group3', 'learn-hygiene', 'Sắp xếp thứ tự', false, 4)
ON CONFLICT (id) DO UPDATE SET
  title = EXCLUDED.title,
  is_free = EXCLUDED.is_free,
  sort_index = EXCLUDED.sort_index;

-- Learn Flag Lessons
INSERT INTO lessons (id, slug, group_id, course_id, title, is_free, sort_index) VALUES
  ('learn-flag-g1-l1', 'lesson1', 'learn-flag-group1', 'learn-flag', 'Học tên quốc kỳ', true, 1),
  ('learn-flag-g1-l2', 'lesson2', 'learn-flag-group1', 'learn-flag', 'Chọn quốc kỳ đúng', false, 2),
  ('learn-flag-g1-l3', 'lesson3', 'learn-flag-group1', 'learn-flag', 'Lật hình ghi nhớ', false, 3),
  ('learn-flag-g1-l4', 'lesson4', 'learn-flag-group1', 'learn-flag', 'Ghép hình', false, 4),
  ('learn-flag-g2-l1', 'lesson1', 'learn-flag-group2', 'learn-flag', 'Học tên quốc kỳ', true, 1),
  ('learn-flag-g2-l2', 'lesson2', 'learn-flag-group2', 'learn-flag', 'Chọn quốc kỳ đúng', false, 2),
  ('learn-flag-g2-l3', 'lesson3', 'learn-flag-group2', 'learn-flag', 'Lật hình ghi nhớ', false, 3),
  ('learn-flag-g2-l4', 'lesson4', 'learn-flag-group2', 'learn-flag', 'Ghép hình', false, 4),
  ('learn-flag-g3-l1', 'lesson1', 'learn-flag-group3', 'learn-flag', 'Học tên quốc kỳ', true, 1),
  ('learn-flag-g3-l2', 'lesson2', 'learn-flag-group3', 'learn-flag', 'Chọn quốc kỳ đúng', false, 2),
  ('learn-flag-g3-l3', 'lesson3', 'learn-flag-group3', 'learn-flag', 'Lật hình ghi nhớ', false, 3),
  ('learn-flag-g3-l4', 'lesson4', 'learn-flag-group3', 'learn-flag', 'Ghép hình', false, 4),
  ('learn-flag-g4-l1', 'lesson1', 'learn-flag-group4', 'learn-flag', 'Học tên quốc kỳ', true, 1),
  ('learn-flag-g4-l2', 'lesson2', 'learn-flag-group4', 'learn-flag', 'Chọn quốc kỳ đúng', false, 2),
  ('learn-flag-g4-l3', 'lesson3', 'learn-flag-group4', 'learn-flag', 'Lật hình ghi nhớ', false, 3),
  ('learn-flag-g4-l4', 'lesson4', 'learn-flag-group4', 'learn-flag', 'Ghép hình', false, 4)
ON CONFLICT (id) DO UPDATE SET
  title = EXCLUDED.title,
  is_free = EXCLUDED.is_free,
  sort_index = EXCLUDED.sort_index;

-- Learn Math Lessons
INSERT INTO lessons (id, slug, group_id, course_id, title, is_free, sort_index) VALUES
  ('learn-math-g1-l1', 'lesson1', 'learn-math-group1', 'learn-math', 'Giải thích phép cộng', true, 1),
  ('learn-math-g1-l2', 'lesson2', 'learn-math-group1', 'learn-math', 'Cộng bằng hình', false, 2),
  ('learn-math-g1-l3', 'lesson3', 'learn-math-group1', 'learn-math', 'Cộng bằng số', false, 3),
  ('learn-math-g1-l4', 'lesson4', 'learn-math-group1', 'learn-math', 'Tập viết dấu', false, 4),
  ('learn-math-g2-l1', 'lesson1', 'learn-math-group2', 'learn-math', 'Giải thích phép trừ', true, 1),
  ('learn-math-g2-l2', 'lesson2', 'learn-math-group2', 'learn-math', 'Trừ bằng hình', false, 2),
  ('learn-math-g2-l3', 'lesson3', 'learn-math-group2', 'learn-math', 'Trừ bằng số', false, 3),
  ('learn-math-g2-l4', 'lesson4', 'learn-math-group2', 'learn-math', 'Tập viết dấu', false, 4),
  ('learn-math-g3-l1', 'lesson1', 'learn-math-group3', 'learn-math', 'Cộng trừ bằng hình', true, 1),
  ('learn-math-g3-l2', 'lesson2', 'learn-math-group3', 'learn-math', 'Cộng trừ bằng số', false, 2)
ON CONFLICT (id) DO UPDATE SET
  title = EXCLUDED.title,
  is_free = EXCLUDED.is_free,
  sort_index = EXCLUDED.sort_index;

-- Learn Alphabet Lessons
INSERT INTO lessons (id, slug, group_id, course_id, title, is_free, sort_index) VALUES
  -- Group 1 (Vowels)
  ('learn-alphabet-g1-l1', 'lesson1', 'learn-alphabet-group1', 'learn-alphabet', 'Học chữ cái', true, 1),
  ('learn-alphabet-g1-l2', 'lesson2', 'learn-alphabet-group1', 'learn-alphabet', 'Tập nói', false, 2),
  ('learn-alphabet-g1-l3', 'lesson3', 'learn-alphabet-group1', 'learn-alphabet', 'Tập viết', false, 3),
  ('learn-alphabet-g1-l4', 'lesson4', 'learn-alphabet-group1', 'learn-alphabet', 'Chữ nào đúng?', false, 4),
  ('learn-alphabet-g1-l5', 'lesson5', 'learn-alphabet-group1', 'learn-alphabet', 'Ghép đôi', false, 5),
  -- Group 2 (Consonants 1)
  ('learn-alphabet-g2-l1', 'lesson1', 'learn-alphabet-group2', 'learn-alphabet', 'Học chữ cái', true, 1),
  ('learn-alphabet-g2-l2', 'lesson2', 'learn-alphabet-group2', 'learn-alphabet', 'Tập nói', false, 2),
  ('learn-alphabet-g2-l3', 'lesson3', 'learn-alphabet-group2', 'learn-alphabet', 'Tập viết', false, 3),
  ('learn-alphabet-g2-l4', 'lesson4', 'learn-alphabet-group2', 'learn-alphabet', 'Chữ nào đúng?', false, 4),
  ('learn-alphabet-g2-l5', 'lesson5', 'learn-alphabet-group2', 'learn-alphabet', 'Ghép đôi', false, 5),
  -- Group 3 (Consonants 2)
  ('learn-alphabet-g3-l1', 'lesson1', 'learn-alphabet-group3', 'learn-alphabet', 'Học chữ cái', true, 1),
  ('learn-alphabet-g3-l2', 'lesson2', 'learn-alphabet-group3', 'learn-alphabet', 'Tập nói', false, 2),
  ('learn-alphabet-g3-l3', 'lesson3', 'learn-alphabet-group3', 'learn-alphabet', 'Tập viết', false, 3),
  ('learn-alphabet-g3-l4', 'lesson4', 'learn-alphabet-group3', 'learn-alphabet', 'Chữ nào đúng?', false, 4),
  ('learn-alphabet-g3-l5', 'lesson5', 'learn-alphabet-group3', 'learn-alphabet', 'Ghép đôi', false, 5)
ON CONFLICT (id) DO UPDATE SET
  title = EXCLUDED.title,
  is_free = EXCLUDED.is_free,
  sort_index = EXCLUDED.sort_index;

-- Odd One Out Lessons
INSERT INTO lessons (id, slug, group_id, course_id, title, is_free, sort_index) VALUES
  ('odd-one-out-g1-l1', 'lesson1', 'odd-one-out-group1', 'odd-one-out', 'Tìm thử', true, 1),
  ('odd-one-out-g2-l1', 'lesson1', 'odd-one-out-group2', 'odd-one-out', 'Tìm thử', true, 1),
  ('odd-one-out-g3-l1', 'lesson1', 'odd-one-out-group3', 'odd-one-out', 'Khác loại', true, 1)
ON CONFLICT (id) DO UPDATE SET
  title = EXCLUDED.title,
  is_free = EXCLUDED.is_free,
  sort_index = EXCLUDED.sort_index;

-- Maze Runner Lessons
INSERT INTO lessons (id, slug, group_id, course_id, title, is_free, sort_index) VALUES
  ('maze-runner-g1-l1', 'lesson1', 'maze-runner-group1', 'maze-runner', 'Bắt đầu', true, 1),
  ('maze-runner-g2-l1', 'lesson1', 'maze-runner-group2', 'maze-runner', 'Bắt đầu', true, 1),
  ('maze-runner-g3-l1', 'lesson1', 'maze-runner-group3', 'maze-runner', 'Bắt đầu', true, 1)
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

