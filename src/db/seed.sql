-- =============================================
-- AUTO-GENERATED from constants/courses.ts
-- Generated at: 2026-05-28T04:04:03.730Z
-- Do NOT edit manually. Run: npm run db:generate-seed
-- =============================================

-- ============================================
-- 1. INSERT COURSES
-- ============================================
INSERT INTO courses (id, title, description, thumbnail, sort_index) VALUES
  ('learn-word', 'Học Từ Vựng', 'Bé học từ vựng tiếng Việt qua các chủ đề quen thuộc hàng ngày.', 'https://assets.cuthongminh.com/games/learn-word/logo.webp', 1),
  ('learn-tones', 'Học Dấu Tiếng Việt', 'Bé học nhận biết và phát âm các dấu thanh trong tiếng Việt.', 'https://assets.cuthongminh.com/games/learn-tones/logo.webp', 2),
  ('learn-numbers', 'Đếm số', 'Bé học đếm từ 1-9 qua hình ảnh và trò chơi.', 'https://assets.cuthongminh.com/games/learn-numbers/number-logo.webp', 3),
  ('compare-quantity', 'So sánh', 'Bé học so sánh nhiều hơn, ít hơn, bằng nhau.', 'https://assets.cuthongminh.com/games/game-3-logo.webp', 4),
  ('learn-color', 'Học Màu Sắc', 'Bé làm quen với các màu sắc cơ bản.', 'https://assets.cuthongminh.com/games/learn-color-color.webp', 5),
  ('learn-shape', 'Hình dạng', 'Bé nhận biết các hình dạng qua đồ vật.', 'https://assets.cuthongminh.com/games/learn-shape/learn-shape-logo.webp', 6),
  ('learn-animal', 'Động vật', 'Bé làm quen với các loài động vật qua hình ảnh và âm thanh.', 'https://assets.cuthongminh.com/games/learn-animal/logo.webp', 7),
  ('learn-vehicle', 'Phương tiện', 'Bé làm quen với các phương tiện giao thông đường bộ, đường thủy và hàng không.', 'https://assets.cuthongminh.com/games/learn-vehicle/logo.webp', 8),
  ('learn-fruit', 'Trái cây', 'Bé nhận biết tên và hình dạng của các loại trái cây quen thuộc.', 'https://assets.cuthongminh.com/games/learn-fruit/logo.webp', 9),
  ('learn-food', 'Món ăn', 'Bé học tên các món ăn sáng, món chính và món tráng miệng.', 'https://assets.cuthongminh.com/games/learn-food/logo.webp', 10),
  ('learn-dinosaur', 'Khủng long', 'Khám phá thế giới của các loài khủng long.', 'https://assets.cuthongminh.com/games/learn-dinosaur/logo.webp', 11),
  ('learn-instrument', 'Nhạc cụ', 'Bé làm quen với các loại nhạc cụ và âm thanh của chúng.', 'https://assets.cuthongminh.com/games/learn-instrument/logo.webp', 12),
  ('learn-occupation', 'Nghề nghiệp', 'Tìm hiểu về các nghề nghiệp phổ biến trong xã hội.', 'https://assets.cuthongminh.com/games/learn-occupation/logo.webp', 13),
  ('learn-flower', 'Hoa & Cây', 'Khám phá các loài hoa và cây quen thuộc ở Việt Nam.', 'https://assets.cuthongminh.com/games/learn-flower/logo.webp', 14),
  ('learn-weather', 'Thời tiết', 'Bé làm quen với các hiện tượng thời tiết và khí hậu qua hình ảnh vui nhộn.', 'https://assets.cuthongminh.com/games/learn-weather/logo.webp', 15),
  ('learn-hygiene', 'Vệ sinh cá nhân', 'Bé học giữ gìn vệ sinh và thói quen sạch sẽ gọn gàng.', 'https://assets.cuthongminh.com/games/learn-hygiene/logo.webp', 16),
  ('learn-traffic', 'An Toàn Giao Thông', 'Bé học các quy tắc an toàn giao thông qua trò chơi tương tác, phiêu lưu và lắp ráp.', 'https://assets.cuthongminh.com/games/learn-traffic/logo.webp', 17),
  ('learn-emotion', 'Cảm Xúc', 'Bé học cách nhận biết và gọi tên cảm xúc qua hình ảnh và tình huống kịch bản.', 'https://assets.cuthongminh.com/games/learn-emotion/logo.webp', 18),
  ('learn-flag', 'Cờ quốc gia', 'Bé nhận biết quốc kỳ các nước trên thế giới.', 'https://assets.cuthongminh.com/games/learn-flag/logo.webp', 19),
  ('learn-landmark', 'Địa Danh Nổi Tiếng', 'Bé nhận biết các địa danh nổi tiếng trên thế giới.', 'https://assets.cuthongminh.com/games/learn-landmark/logo.webp', 20),
  ('learn-costume', 'Trang Phục Thế Giới', 'Bé tìm hiểu về trang phục truyền thống của các quốc gia trên thế giới.', 'https://assets.cuthongminh.com/games/learn-costume/logo.webp', 21),
  ('learn-math', 'Toán đơn giản', 'Bé học phép cộng và phép trừ với các con số đến 20.', 'https://assets.cuthongminh.com/games/learn-math/logo.webp', 22),
  ('learn-multiply', 'Phép Nhân', 'Bé học bảng nhân 2-5 qua hình ảnh và trò chơi tương tác.', 'https://assets.cuthongminh.com/games/learn-multiply/logo.webp', 23),
  ('learn-divide', 'Phép Chia', 'Bé học bảng chia 2-5 qua hình ảnh và trò chơi tương tác.', 'https://assets.cuthongminh.com/games/learn-divide/logo.webp', 24),
  ('learn-money', 'Tiền Việt Nam', 'Bé học nhận biết tiền giấy Việt Nam và tập tính tiền qua trò chơi đi chợ.', 'https://assets.cuthongminh.com/games/learn-money/logo.webp', 25),
  ('find-pattern', 'Quy Luật', 'Bé học tìm quy luật qua các hình dạng và màu sắc vui nhộn.', 'https://assets.cuthongminh.com/games/find-pattern/logo.webp', 26),
  ('learn-alphabet', 'Bảng chữ cái', 'Bé học bảng chữ cái tiếng Việt qua hình ảnh và trò chơi.', 'https://assets.cuthongminh.com/games/learn-alphabet/logo.webp', 27),
  ('find-differences', 'Điểm khác biệt', 'Bé học cách quan sát và phát hiện ra chi tiết khác thường.', 'https://assets.cuthongminh.com/games/game-4-logo.webp', 28),
  ('odd-one-out', 'Hình khác biệt', 'Bé luyện nhãn quan bằng cách tìm ra hình khác với các hình còn lại.', 'https://assets.cuthongminh.com/games/odd-one-out/logo.webp', 29),
  ('maze-runner', 'Mê Cung', 'Bé điều hướng qua các mê cung để tìm ngôi sao.', 'https://assets.cuthongminh.com/games/maze-runner/logo.webp', 30),
  ('line-connect', 'Nối Điểm Trí Tuệ', 'Nối các điểm cùng màu để lấp đầy bảng.', 'https://assets.cuthongminh.com/games/line-connect/logo.webp', 31),
  ('mix-color', 'Pha Màu', 'Bé học cách pha trộn màu sắc để tạo ra màu mới.', 'https://assets.cuthongminh.com/games/learn-color-color.webp', 32),
  ('paint-picture', 'Tô Màu', 'Bé tô màu các hình vẽ dễ thương qua các trò chơi nghệ thuật.', 'https://assets.cuthongminh.com/games/paint-picture/logo.webp', 33),
  ('learn-clock', 'Xem Đồng Hồ', 'Bé học cách xem đồng hồ kim và đồng hồ điện tử.', 'https://assets.cuthongminh.com/games/learn-clock/logo-main.webp', 34),
  ('mini-piano', 'Đàn Piano Tí Hon', 'Bé học chơi đàn và khám phá âm thanh cùng các bài hát vui nhộn.', 'https://assets.cuthongminh.com/games/mini-piano/logo.webp', 35),
  ('learn-syllable', 'Ghép Vần', 'Bé học cách kết hợp nguyên âm và phụ âm để tạo thành tiếng.', 'https://assets.cuthongminh.com/games/learn-syllable/logo.webp', 36),
  ('learn-terrain', 'Địa Hình', 'Bé khám phá các dạng địa hình tự nhiên qua trò chơi tương tác sáng tạo.', 'https://assets.cuthongminh.com/games/learn-terrain/logo.webp', 37),
  ('learn-body', 'Bộ Phận Cơ Thể', 'Bé học nhận biết và gọi tên các bộ phận trên cơ thể qua hình ảnh vui nhộn.', 'https://assets.cuthongminh.com/games/learn-body/logo.webp', 38),
  ('learn-cleaning', 'Dọn Dẹp', 'Bé học cách dọn dẹp nhà cửa gọn gàng và phân loại rác đúng cách.', 'https://assets.cuthongminh.com/games/learn-cleaning/logo.webp', 39),
  ('learn-notes', 'Học Nốt Nhạc', 'Bé làm quen với các nốt nhạc Đồ Rê Mi trên khuông nhạc qua hình ảnh và âm thanh.', 'https://assets.cuthongminh.com/games/learn-notes/logo.webp', 40),
  ('learn-danger', 'Đồ Vật Nguy Hiểm', 'Bé học nhận biết các đồ vật nguy hiểm trong nhà và cách giữ an toàn.', 'https://assets.cuthongminh.com/games/learn-danger/logo.webp', 41),
  ('mini-sudoku-kids', 'Sudoku', 'Bé học suy luận logic qua bảng hình đơn giản, tìm ô còn thiếu theo quy luật hàng và cột.', 'https://assets.cuthongminh.com/games/mini-sudoku-kids/logo.webp', 42),
  ('learn-english-vocab', 'Học Từ Vựng', 'Bé học từ vựng tiếng Anh cơ bản qua hình ảnh và phát âm: động vật, trái cây, màu sắc, số đếm.', 'https://assets.cuthongminh.com/games/learn-english-vocab/logo.webp', 43),
  ('learn-english-alphabet', 'Bảng Chữ Cái', 'Bé học bảng chữ cái tiếng Anh từ A-Z qua các từ vựng sinh động.', 'https://assets.cuthongminh.com/games/learn-english-alphabet/logo.webp', 44),
  ('talk-with-owl', 'Giao Tiếp', 'Bé luyện giao tiếp tiếng Anh trực tiếp với Cú Thông Minh qua giọng nói AI. Cú dạy bé chào hỏi, hỏi đáp và trò chuyện bằng tiếng Anh.', 'https://assets.cuthongminh.com/games/talk-with-owl/logo.webp', 45)
ON CONFLICT (id) DO UPDATE SET
  title = EXCLUDED.title,
  description = EXCLUDED.description,
  thumbnail = EXCLUDED.thumbnail,
  sort_index = EXCLUDED.sort_index;

-- ============================================
-- 2. INSERT GROUPS FOR EACH COURSE
-- ============================================

-- Học Từ Vựng Groups
INSERT INTO groups (id, slug, course_id, title, sort_index) VALUES
  ('learn-word-group1', 'group1', 'learn-word', 'Gia Đình', 1),
  ('learn-word-group2', 'group2', 'learn-word', 'Trường Học', 2),
  ('learn-word-group3', 'group3', 'learn-word', 'Thiên Nhiên', 3),
  ('learn-word-group4', 'group4', 'learn-word', 'Đồ Dùng', 4),
  ('learn-word-group5', 'group5', 'learn-word', 'Quần Áo', 5)
ON CONFLICT (id) DO UPDATE SET
  title = EXCLUDED.title,
  sort_index = EXCLUDED.sort_index;

-- Học Dấu Tiếng Việt Groups
INSERT INTO groups (id, slug, course_id, title, sort_index) VALUES
  ('learn-tones-group_sac', 'group_sac', 'learn-tones', 'Thanh Sắc', 1),
  ('learn-tones-group_huyen', 'group_huyen', 'learn-tones', 'Thanh Huyền', 2),
  ('learn-tones-group_hoi', 'group_hoi', 'learn-tones', 'Thanh Hỏi', 3),
  ('learn-tones-group_nga', 'group_nga', 'learn-tones', 'Thanh Ngã', 4),
  ('learn-tones-group_nang', 'group_nang', 'learn-tones', 'Thanh Nặng', 5)
ON CONFLICT (id) DO UPDATE SET
  title = EXCLUDED.title,
  sort_index = EXCLUDED.sort_index;

-- Đếm số Groups
INSERT INTO groups (id, slug, course_id, title, sort_index) VALUES
  ('learn-numbers-group1', 'group1', 'learn-numbers', 'Làm quen 1-3', 1),
  ('learn-numbers-group2', 'group2', 'learn-numbers', 'Làm quen 4-6', 2),
  ('learn-numbers-group3', 'group3', 'learn-numbers', 'Làm quen 7-9', 3),
  ('learn-numbers-group4', 'group4', 'learn-numbers', 'Làm quen 10-20', 4),
  ('learn-numbers-group5', 'group5', 'learn-numbers', 'Luyện tập', 5)
ON CONFLICT (id) DO UPDATE SET
  title = EXCLUDED.title,
  sort_index = EXCLUDED.sort_index;

-- So sánh Groups
INSERT INTO groups (id, slug, course_id, title, sort_index) VALUES
  ('compare-quantity-group1', 'group1', 'compare-quantity', 'Lớn hơn', 1),
  ('compare-quantity-group2', 'group2', 'compare-quantity', 'Nhỏ hơn', 2),
  ('compare-quantity-group3', 'group3', 'compare-quantity', 'Bằng nhau', 3),
  ('compare-quantity-group4', 'group4', 'compare-quantity', 'Luyện tập', 4)
ON CONFLICT (id) DO UPDATE SET
  title = EXCLUDED.title,
  sort_index = EXCLUDED.sort_index;

-- Học Màu Sắc Groups
INSERT INTO groups (id, slug, course_id, title, sort_index) VALUES
  ('learn-color-group1', 'group1', 'learn-color', 'Màu cơ bản', 1),
  ('learn-color-group2', 'group2', 'learn-color', 'Màu nâng cao', 2),
  ('learn-color-group3', 'group3', 'learn-color', 'Luyện tập', 3)
ON CONFLICT (id) DO UPDATE SET
  title = EXCLUDED.title,
  sort_index = EXCLUDED.sort_index;

-- Hình dạng Groups
INSERT INTO groups (id, slug, course_id, title, sort_index) VALUES
  ('learn-shape-group1', 'group1', 'learn-shape', 'Hình cơ bản', 1),
  ('learn-shape-group2', 'group2', 'learn-shape', 'Hình nâng cao', 2),
  ('learn-shape-group3', 'group3', 'learn-shape', 'Luyện tập', 3)
ON CONFLICT (id) DO UPDATE SET
  title = EXCLUDED.title,
  sort_index = EXCLUDED.sort_index;

-- Động vật Groups
INSERT INTO groups (id, slug, course_id, title, sort_index) VALUES
  ('learn-animal-group1', 'group1', 'learn-animal', 'Động vật nuôi', 1),
  ('learn-animal-group2', 'group2', 'learn-animal', 'Động vật hoang dã', 2),
  ('learn-animal-group3', 'group3', 'learn-animal', 'Động vật biển', 3)
ON CONFLICT (id) DO UPDATE SET
  title = EXCLUDED.title,
  sort_index = EXCLUDED.sort_index;

-- Phương tiện Groups
INSERT INTO groups (id, slug, course_id, title, sort_index) VALUES
  ('learn-vehicle-group1', 'group1', 'learn-vehicle', 'Phương tiện đường bộ', 1),
  ('learn-vehicle-group2', 'group2', 'learn-vehicle', 'Phương tiện đường thủy', 2),
  ('learn-vehicle-group3', 'group3', 'learn-vehicle', 'Phương tiện hàng không', 3),
  ('learn-vehicle-group4', 'group4', 'learn-vehicle', 'Luyện tập', 4)
ON CONFLICT (id) DO UPDATE SET
  title = EXCLUDED.title,
  sort_index = EXCLUDED.sort_index;

-- Trái cây Groups
INSERT INTO groups (id, slug, course_id, title, sort_index) VALUES
  ('learn-fruit-group1', 'group1', 'learn-fruit', 'Trái cây phổ biến', 1),
  ('learn-fruit-group2', 'group2', 'learn-fruit', 'Trái cây nhiệt đới', 2),
  ('learn-fruit-group3', 'group3', 'learn-fruit', 'Trái cây khác', 3)
ON CONFLICT (id) DO UPDATE SET
  title = EXCLUDED.title,
  sort_index = EXCLUDED.sort_index;

-- Món ăn Groups
INSERT INTO groups (id, slug, course_id, title, sort_index) VALUES
  ('learn-food-group1', 'group1', 'learn-food', 'Món ăn sáng', 1),
  ('learn-food-group2', 'group2', 'learn-food', 'Món chính', 2),
  ('learn-food-group3', 'group3', 'learn-food', 'Món tráng miệng', 3)
ON CONFLICT (id) DO UPDATE SET
  title = EXCLUDED.title,
  sort_index = EXCLUDED.sort_index;

-- Khủng long Groups
INSERT INTO groups (id, slug, course_id, title, sort_index) VALUES
  ('learn-dinosaur-group1', 'group1', 'learn-dinosaur', 'Khủng long ăn cỏ', 1),
  ('learn-dinosaur-group2', 'group2', 'learn-dinosaur', 'Khủng long ăn thịt', 2),
  ('learn-dinosaur-group3', 'group3', 'learn-dinosaur', 'Khủng long bay & biển', 3)
ON CONFLICT (id) DO UPDATE SET
  title = EXCLUDED.title,
  sort_index = EXCLUDED.sort_index;

-- Nhạc cụ Groups
INSERT INTO groups (id, slug, course_id, title, sort_index) VALUES
  ('learn-instrument-group1', 'group1', 'learn-instrument', 'Nhạc cụ dây', 1),
  ('learn-instrument-group2', 'group2', 'learn-instrument', 'Nhạc cụ gõ', 2),
  ('learn-instrument-group3', 'group3', 'learn-instrument', 'Nhạc cụ hơi', 3)
ON CONFLICT (id) DO UPDATE SET
  title = EXCLUDED.title,
  sort_index = EXCLUDED.sort_index;

-- Nghề nghiệp Groups
INSERT INTO groups (id, slug, course_id, title, sort_index) VALUES
  ('learn-occupation-group1', 'group1', 'learn-occupation', 'Nghề cộng đồng', 1),
  ('learn-occupation-group2', 'group2', 'learn-occupation', 'Nghề y tế & khoa học', 2),
  ('learn-occupation-group3', 'group3', 'learn-occupation', 'Nghề nghệ thuật', 3)
ON CONFLICT (id) DO UPDATE SET
  title = EXCLUDED.title,
  sort_index = EXCLUDED.sort_index;

-- Hoa & Cây Groups
INSERT INTO groups (id, slug, course_id, title, sort_index) VALUES
  ('learn-flower-group1', 'group1', 'learn-flower', 'Hoa phổ biến', 1),
  ('learn-flower-group2', 'group2', 'learn-flower', 'Hoa Tết & Trang trí', 2),
  ('learn-flower-group3', 'group3', 'learn-flower', 'Cây ăn quả', 3)
ON CONFLICT (id) DO UPDATE SET
  title = EXCLUDED.title,
  sort_index = EXCLUDED.sort_index;

-- Thời tiết Groups
INSERT INTO groups (id, slug, course_id, title, sort_index) VALUES
  ('learn-weather-group1', 'group1', 'learn-weather', 'Thời tiết cơ bản', 1),
  ('learn-weather-group2', 'group2', 'learn-weather', 'Thời tiết đặc biệt', 2),
  ('learn-weather-group3', 'group3', 'learn-weather', 'Mùa và khí hậu', 3)
ON CONFLICT (id) DO UPDATE SET
  title = EXCLUDED.title,
  sort_index = EXCLUDED.sort_index;

-- Vệ sinh cá nhân Groups
INSERT INTO groups (id, slug, course_id, title, sort_index) VALUES
  ('learn-hygiene-group1', 'group1', 'learn-hygiene', 'Vệ sinh hàng ngày', 1),
  ('learn-hygiene-group2', 'group2', 'learn-hygiene', 'Giữ gìn sức khoẻ', 2),
  ('learn-hygiene-group3', 'group3', 'learn-hygiene', 'Sạch sẽ gọn gàng', 3)
ON CONFLICT (id) DO UPDATE SET
  title = EXCLUDED.title,
  sort_index = EXCLUDED.sort_index;

-- An Toàn Giao Thông Groups
INSERT INTO groups (id, slug, course_id, title, sort_index) VALUES
  ('learn-traffic-group1', 'group1', 'learn-traffic', 'Đèn & Biển Báo', 1),
  ('learn-traffic-group2', 'group2', 'learn-traffic', 'Đi Bộ An Toàn', 2),
  ('learn-traffic-group3', 'group3', 'learn-traffic', 'Đi Xe An Toàn', 3)
ON CONFLICT (id) DO UPDATE SET
  title = EXCLUDED.title,
  sort_index = EXCLUDED.sort_index;

-- Cảm Xúc Groups
INSERT INTO groups (id, slug, course_id, title, sort_index) VALUES
  ('learn-emotion-group1', 'group1', 'learn-emotion', 'Cảm xúc cơ bản', 1),
  ('learn-emotion-group2', 'group2', 'learn-emotion', 'Cảm xúc khác', 2)
ON CONFLICT (id) DO UPDATE SET
  title = EXCLUDED.title,
  sort_index = EXCLUDED.sort_index;

-- Cờ quốc gia Groups
INSERT INTO groups (id, slug, course_id, title, sort_index) VALUES
  ('learn-flag-group1', 'group1', 'learn-flag', 'Châu Á', 1),
  ('learn-flag-group2', 'group2', 'learn-flag', 'Châu Âu', 2),
  ('learn-flag-group3', 'group3', 'learn-flag', 'Châu Mỹ', 3),
  ('learn-flag-group4', 'group4', 'learn-flag', 'Khác', 4)
ON CONFLICT (id) DO UPDATE SET
  title = EXCLUDED.title,
  sort_index = EXCLUDED.sort_index;

-- Địa Danh Nổi Tiếng Groups
INSERT INTO groups (id, slug, course_id, title, sort_index) VALUES
  ('learn-landmark-group1', 'group1', 'learn-landmark', 'Châu Á', 1),
  ('learn-landmark-group2', 'group2', 'learn-landmark', 'Châu Âu', 2),
  ('learn-landmark-group3', 'group3', 'learn-landmark', 'Châu Mỹ & Khác', 3)
ON CONFLICT (id) DO UPDATE SET
  title = EXCLUDED.title,
  sort_index = EXCLUDED.sort_index;

-- Trang Phục Thế Giới Groups
INSERT INTO groups (id, slug, course_id, title, sort_index) VALUES
  ('learn-costume-group1', 'group1', 'learn-costume', 'Châu Á', 1),
  ('learn-costume-group2', 'group2', 'learn-costume', 'Châu Âu', 2),
  ('learn-costume-group3', 'group3', 'learn-costume', 'Châu Mỹ & Khác', 3)
ON CONFLICT (id) DO UPDATE SET
  title = EXCLUDED.title,
  sort_index = EXCLUDED.sort_index;

-- Toán đơn giản Groups
INSERT INTO groups (id, slug, course_id, title, sort_index) VALUES
  ('learn-math-group1', 'group1', 'learn-math', 'Phép Cộng', 1),
  ('learn-math-group2', 'group2', 'learn-math', 'Phép Trừ', 2),
  ('learn-math-group3', 'group3', 'learn-math', 'Luyện tập', 3)
ON CONFLICT (id) DO UPDATE SET
  title = EXCLUDED.title,
  sort_index = EXCLUDED.sort_index;

-- Phép Nhân Groups
INSERT INTO groups (id, slug, course_id, title, sort_index) VALUES
  ('learn-multiply-group1', 'group1', 'learn-multiply', 'Bảng nhân 2', 1),
  ('learn-multiply-group2', 'group2', 'learn-multiply', 'Bảng nhân 3', 2),
  ('learn-multiply-group3', 'group3', 'learn-multiply', 'Bảng nhân 4', 3),
  ('learn-multiply-group4', 'group4', 'learn-multiply', 'Bảng nhân 5', 4),
  ('learn-multiply-group5', 'group5', 'learn-multiply', 'Luyện tập', 5)
ON CONFLICT (id) DO UPDATE SET
  title = EXCLUDED.title,
  sort_index = EXCLUDED.sort_index;

-- Phép Chia Groups
INSERT INTO groups (id, slug, course_id, title, sort_index) VALUES
  ('learn-divide-group1', 'group1', 'learn-divide', 'Bảng chia 2', 1),
  ('learn-divide-group2', 'group2', 'learn-divide', 'Bảng chia 3', 2),
  ('learn-divide-group3', 'group3', 'learn-divide', 'Bảng chia 4', 3),
  ('learn-divide-group4', 'group4', 'learn-divide', 'Bảng chia 5', 4),
  ('learn-divide-group5', 'group5', 'learn-divide', 'Luyện tập', 5)
ON CONFLICT (id) DO UPDATE SET
  title = EXCLUDED.title,
  sort_index = EXCLUDED.sort_index;

-- Tiền Việt Nam Groups
INSERT INTO groups (id, slug, course_id, title, sort_index) VALUES
  ('learn-money-group1', 'group1', 'learn-money', 'Nhận Biết Tiền', 1),
  ('learn-money-group2', 'group2', 'learn-money', 'Kỹ Năng Tiền', 2),
  ('learn-money-group3', 'group3', 'learn-money', 'Đi Chợ Cùng Cú', 3)
ON CONFLICT (id) DO UPDATE SET
  title = EXCLUDED.title,
  sort_index = EXCLUDED.sort_index;

-- Quy Luật Groups
INSERT INTO groups (id, slug, course_id, title, sort_index) VALUES
  ('find-pattern-group1', 'group1', 'find-pattern', 'Quy luật màu sắc', 1),
  ('find-pattern-group2', 'group2', 'find-pattern', 'Quy luật hình dạng', 2)
ON CONFLICT (id) DO UPDATE SET
  title = EXCLUDED.title,
  sort_index = EXCLUDED.sort_index;

-- Bảng chữ cái Groups
INSERT INTO groups (id, slug, course_id, title, sort_index) VALUES
  ('learn-alphabet-group1', 'group1', 'learn-alphabet', 'Nguyên âm', 1),
  ('learn-alphabet-group2', 'group2', 'learn-alphabet', 'Phụ âm 1', 2),
  ('learn-alphabet-group3', 'group3', 'learn-alphabet', 'Phụ âm 2', 3)
ON CONFLICT (id) DO UPDATE SET
  title = EXCLUDED.title,
  sort_index = EXCLUDED.sort_index;

-- Điểm khác biệt Groups
INSERT INTO groups (id, slug, course_id, title, sort_index) VALUES
  ('find-differences-group1', 'group1', 'find-differences', 'Dễ', 1),
  ('find-differences-group2', 'group2', 'find-differences', 'Trung bình', 2)
ON CONFLICT (id) DO UPDATE SET
  title = EXCLUDED.title,
  sort_index = EXCLUDED.sort_index;

-- Hình khác biệt Groups
INSERT INTO groups (id, slug, course_id, title, sort_index) VALUES
  ('odd-one-out-group1', 'group1', 'odd-one-out', 'Tìm màu khác biệt', 1),
  ('odd-one-out-group2', 'group2', 'odd-one-out', 'Tìm hình khác biệt', 2),
  ('odd-one-out-group3', 'group3', 'odd-one-out', 'Tìm hình khác loại', 3)
ON CONFLICT (id) DO UPDATE SET
  title = EXCLUDED.title,
  sort_index = EXCLUDED.sort_index;

-- Mê Cung Groups
INSERT INTO groups (id, slug, course_id, title, sort_index) VALUES
  ('maze-runner-group1', 'group1', 'maze-runner', 'Mê cung dễ', 1),
  ('maze-runner-group2', 'group2', 'maze-runner', 'Mê cung vừa', 2),
  ('maze-runner-group3', 'group3', 'maze-runner', 'Mê cung khó', 3)
ON CONFLICT (id) DO UPDATE SET
  title = EXCLUDED.title,
  sort_index = EXCLUDED.sort_index;

-- Nối Điểm Trí Tuệ Groups
INSERT INTO groups (id, slug, course_id, title, sort_index) VALUES
  ('line-connect-group1', 'group1', 'line-connect', 'Nối điểm dễ', 1),
  ('line-connect-group2', 'group2', 'line-connect', 'Nối điểm vừa', 2),
  ('line-connect-group3', 'group3', 'line-connect', 'Nối điểm khó', 3)
ON CONFLICT (id) DO UPDATE SET
  title = EXCLUDED.title,
  sort_index = EXCLUDED.sort_index;

-- Pha Màu Groups
INSERT INTO groups (id, slug, course_id, title, sort_index) VALUES
  ('mix-color-group1', 'group1', 'mix-color', 'Màu cơ bản', 1),
  ('mix-color-group2', 'group2', 'mix-color', 'Màu nâng cao', 2),
  ('mix-color-group3', 'group3', 'mix-color', 'Luyện tập', 3)
ON CONFLICT (id) DO UPDATE SET
  title = EXCLUDED.title,
  sort_index = EXCLUDED.sort_index;

-- Tô Màu Groups
INSERT INTO groups (id, slug, course_id, title, sort_index) VALUES
  ('paint-picture-group1', 'group1', 'paint-picture', 'Động vật', 1),
  ('paint-picture-group2', 'group2', 'paint-picture', 'Thiên nhiên', 2),
  ('paint-picture-group3', 'group3', 'paint-picture', 'Đồ chơi', 3)
ON CONFLICT (id) DO UPDATE SET
  title = EXCLUDED.title,
  sort_index = EXCLUDED.sort_index;

-- Xem Đồng Hồ Groups
INSERT INTO groups (id, slug, course_id, title, sort_index) VALUES
  ('learn-clock-group1', 'group1', 'learn-clock', 'Đồng hồ kim', 1),
  ('learn-clock-group2', 'group2', 'learn-clock', 'Đồng hồ điện tử', 2)
ON CONFLICT (id) DO UPDATE SET
  title = EXCLUDED.title,
  sort_index = EXCLUDED.sort_index;

-- Đàn Piano Tí Hon Groups
INSERT INTO groups (id, slug, course_id, title, sort_index) VALUES
  ('mini-piano-creative-sounds', 'creative-sounds', 'mini-piano', 'Học đàn', 1),
  ('mini-piano-mini-musician', 'mini-musician', 'mini-piano', 'Nhạc Công Nhí', 2),
  ('mini-piano-ear-training', 'ear-training', 'mini-piano', 'Đôi Tai Tinh Anh', 3)
ON CONFLICT (id) DO UPDATE SET
  title = EXCLUDED.title,
  sort_index = EXCLUDED.sort_index;

-- Ghép Vần Groups
INSERT INTO groups (id, slug, course_id, title, sort_index) VALUES
  ('learn-syllable-group1', 'group1', 'learn-syllable', 'Vần ie', 1),
  ('learn-syllable-group2', 'group2', 'learn-syllable', 'Vần uo', 2),
  ('learn-syllable-group3', 'group3', 'learn-syllable', 'Vần ươ', 3),
  ('learn-syllable-group4', 'group4', 'learn-syllable', 'Vần oa', 4),
  ('learn-syllable-group5', 'group5', 'learn-syllable', 'Vần uy', 5),
  ('learn-syllable-group6', 'group6', 'learn-syllable', 'Vần khác', 6)
ON CONFLICT (id) DO UPDATE SET
  title = EXCLUDED.title,
  sort_index = EXCLUDED.sort_index;

-- Địa Hình Groups
INSERT INTO groups (id, slug, course_id, title, sort_index) VALUES
  ('learn-terrain-group1', 'group1', 'learn-terrain', 'Trên cạn', 1),
  ('learn-terrain-group2', 'group2', 'learn-terrain', 'Dưới nước', 2),
  ('learn-terrain-group3', 'group3', 'learn-terrain', 'Đặc biệt', 3)
ON CONFLICT (id) DO UPDATE SET
  title = EXCLUDED.title,
  sort_index = EXCLUDED.sort_index;

-- Bộ Phận Cơ Thể Groups
INSERT INTO groups (id, slug, course_id, title, sort_index) VALUES
  ('learn-body-group1', 'group1', 'learn-body', 'Đầu & Mặt', 1),
  ('learn-body-group2', 'group2', 'learn-body', 'Thân Mình', 2),
  ('learn-body-group3', 'group3', 'learn-body', 'Bàn Tay & Bàn Chân', 3)
ON CONFLICT (id) DO UPDATE SET
  title = EXCLUDED.title,
  sort_index = EXCLUDED.sort_index;

-- Dọn Dẹp Groups
INSERT INTO groups (id, slug, course_id, title, sort_index) VALUES
  ('learn-cleaning-group1', 'group1', 'learn-cleaning', 'Dọn phòng', 1),
  ('learn-cleaning-group2', 'group2', 'learn-cleaning', 'Dọn bếp', 2),
  ('learn-cleaning-group3', 'group3', 'learn-cleaning', 'Phân loại rác', 3)
ON CONFLICT (id) DO UPDATE SET
  title = EXCLUDED.title,
  sort_index = EXCLUDED.sort_index;

-- Học Nốt Nhạc Groups
INSERT INTO groups (id, slug, course_id, title, sort_index) VALUES
  ('learn-notes-basic-notes', 'basic-notes', 'learn-notes', 'Nốt Nhạc Cơ Bản', 1),
  ('learn-notes-advanced-notes', 'advanced-notes', 'learn-notes', 'Nốt Nhạc Nâng Cao', 2),
  ('learn-notes-practice', 'practice', 'learn-notes', 'Luyện Tập', 3)
ON CONFLICT (id) DO UPDATE SET
  title = EXCLUDED.title,
  sort_index = EXCLUDED.sort_index;

-- Đồ Vật Nguy Hiểm Groups
INSERT INTO groups (id, slug, course_id, title, sort_index) VALUES
  ('learn-danger-group1', 'group1', 'learn-danger', 'Trong bếp', 1),
  ('learn-danger-group2', 'group2', 'learn-danger', 'Phòng tắm & xung quanh', 2),
  ('learn-danger-group3', 'group3', 'learn-danger', 'Đồ điện', 3)
ON CONFLICT (id) DO UPDATE SET
  title = EXCLUDED.title,
  sort_index = EXCLUDED.sort_index;

-- Sudoku Groups
INSERT INTO groups (id, slug, course_id, title, sort_index) VALUES
  ('mini-sudoku-kids-group1', 'group1', 'mini-sudoku-kids', 'Làm quen 2×2', 1),
  ('mini-sudoku-kids-group2', 'group2', 'mini-sudoku-kids', 'Sudoku hình ảnh 3×3', 2),
  ('mini-sudoku-kids-group3', 'group3', 'mini-sudoku-kids', 'Sudoku màu sắc', 3),
  ('mini-sudoku-kids-group4', 'group4', 'mini-sudoku-kids', 'Sudoku con vật', 4)
ON CONFLICT (id) DO UPDATE SET
  title = EXCLUDED.title,
  sort_index = EXCLUDED.sort_index;

-- Học Từ Vựng Groups
INSERT INTO groups (id, slug, course_id, title, sort_index) VALUES
  ('learn-english-vocab-group1', 'group1', 'learn-english-vocab', 'Động Vật', 1),
  ('learn-english-vocab-group2', 'group2', 'learn-english-vocab', 'Trái Cây', 2),
  ('learn-english-vocab-group3', 'group3', 'learn-english-vocab', 'Màu Sắc', 3),
  ('learn-english-vocab-group4', 'group4', 'learn-english-vocab', 'Số Đếm', 4),
  ('learn-english-vocab-group5', 'group5', 'learn-english-vocab', 'Giao Thông', 5),
  ('learn-english-vocab-group6', 'group6', 'learn-english-vocab', 'Gia Đình', 6),
  ('learn-english-vocab-group7', 'group7', 'learn-english-vocab', 'Cơ Thể Người', 7)
ON CONFLICT (id) DO UPDATE SET
  title = EXCLUDED.title,
  sort_index = EXCLUDED.sort_index;

-- Bảng Chữ Cái Groups
INSERT INTO groups (id, slug, course_id, title, sort_index) VALUES
  ('learn-english-alphabet-group1', 'group1', 'learn-english-alphabet', 'Bảng Chữ Cái (A-M)', 1),
  ('learn-english-alphabet-group2', 'group2', 'learn-english-alphabet', 'Bảng Chữ Cái (N-Z)', 2)
ON CONFLICT (id) DO UPDATE SET
  title = EXCLUDED.title,
  sort_index = EXCLUDED.sort_index;

-- Giao Tiếp Groups
INSERT INTO groups (id, slug, course_id, title, sort_index) VALUES
  ('talk-with-owl-group1', 'group1', 'talk-with-owl', 'Chào hỏi', 1),
  ('talk-with-owl-group2', 'group2', 'talk-with-owl', 'Trái Cây', 2),
  ('talk-with-owl-group3', 'group3', 'talk-with-owl', 'Màu Sắc', 3),
  ('talk-with-owl-group4', 'group4', 'talk-with-owl', 'Số Đếm', 4),
  ('talk-with-owl-group5', 'group5', 'talk-with-owl', 'Động Vật', 5),
  ('talk-with-owl-group6', 'group6', 'talk-with-owl', 'Đồ ăn', 6),
  ('talk-with-owl-group7', 'group7', 'talk-with-owl', 'Giao thông', 7),
  ('talk-with-owl-group8', 'group8', 'talk-with-owl', 'Gia Đình', 8),
  ('talk-with-owl-group9', 'group9', 'talk-with-owl', 'Cơ thể', 9),
  ('talk-with-owl-group10', 'group10', 'talk-with-owl', 'Dụng cụ học tập', 10)
ON CONFLICT (id) DO UPDATE SET
  title = EXCLUDED.title,
  sort_index = EXCLUDED.sort_index;

-- ============================================
-- 3. INSERT LESSONS (lesson1 is typically FREE)
-- ============================================

-- Học Từ Vựng Lessons
INSERT INTO lessons (id, slug, group_id, course_id, title, is_free, sort_index) VALUES
  ('learn-word-group1-lesson1', 'lesson1', 'learn-word-group1', 'learn-word', 'Học từ vựng', true, 1),
  ('learn-word-group1-lesson2', 'lesson2', 'learn-word-group1', 'learn-word', 'Tập nói', true, 2),
  ('learn-word-group1-lesson3', 'lesson3', 'learn-word-group1', 'learn-word', 'Ghép từ', true, 3),
  ('learn-word-group1-lesson4', 'lesson4', 'learn-word-group1', 'learn-word', 'Nghe hiểu', true, 4),
  ('learn-word-group2-lesson1', 'lesson1', 'learn-word-group2', 'learn-word', 'Học từ vựng', true, 1),
  ('learn-word-group2-lesson2', 'lesson2', 'learn-word-group2', 'learn-word', 'Tập nói', false, 2),
  ('learn-word-group2-lesson3', 'lesson3', 'learn-word-group2', 'learn-word', 'Ghép từ', false, 3),
  ('learn-word-group2-lesson4', 'lesson4', 'learn-word-group2', 'learn-word', 'Nghe hiểu', false, 4),
  ('learn-word-group3-lesson1', 'lesson1', 'learn-word-group3', 'learn-word', 'Học từ vựng', true, 1),
  ('learn-word-group3-lesson2', 'lesson2', 'learn-word-group3', 'learn-word', 'Tập nói', false, 2),
  ('learn-word-group3-lesson3', 'lesson3', 'learn-word-group3', 'learn-word', 'Ghép từ', false, 3),
  ('learn-word-group3-lesson4', 'lesson4', 'learn-word-group3', 'learn-word', 'Nghe hiểu', false, 4),
  ('learn-word-group4-lesson1', 'lesson1', 'learn-word-group4', 'learn-word', 'Học từ vựng', true, 1),
  ('learn-word-group4-lesson2', 'lesson2', 'learn-word-group4', 'learn-word', 'Tập nói', false, 2),
  ('learn-word-group4-lesson3', 'lesson3', 'learn-word-group4', 'learn-word', 'Ghép từ', false, 3),
  ('learn-word-group4-lesson4', 'lesson4', 'learn-word-group4', 'learn-word', 'Nghe hiểu', false, 4),
  ('learn-word-group5-lesson1', 'lesson1', 'learn-word-group5', 'learn-word', 'Học từ vựng', true, 1),
  ('learn-word-group5-lesson2', 'lesson2', 'learn-word-group5', 'learn-word', 'Tập nói', false, 2),
  ('learn-word-group5-lesson3', 'lesson3', 'learn-word-group5', 'learn-word', 'Ghép từ', false, 3),
  ('learn-word-group5-lesson4', 'lesson4', 'learn-word-group5', 'learn-word', 'Nghe hiểu', false, 4)
ON CONFLICT (id) DO UPDATE SET
  title = EXCLUDED.title,
  is_free = EXCLUDED.is_free,
  sort_index = EXCLUDED.sort_index;

-- Học Dấu Tiếng Việt Lessons
INSERT INTO lessons (id, slug, group_id, course_id, title, is_free, sort_index) VALUES
  ('learn-tones-group_sac-lesson1', 'lesson1', 'learn-tones-group_sac', 'learn-tones', 'Học dấu', true, 1),
  ('learn-tones-group_sac-lesson2', 'lesson2', 'learn-tones-group_sac', 'learn-tones', 'Tập nói', true, 2),
  ('learn-tones-group_sac-lesson3', 'lesson3', 'learn-tones-group_sac', 'learn-tones', 'Tập viết', true, 3),
  ('learn-tones-group_sac-lesson4', 'lesson4', 'learn-tones-group_sac', 'learn-tones', 'Chữ nào đúng', false, 4),
  ('learn-tones-group_huyen-lesson1', 'lesson1', 'learn-tones-group_huyen', 'learn-tones', 'Học dấu', true, 1),
  ('learn-tones-group_huyen-lesson2', 'lesson2', 'learn-tones-group_huyen', 'learn-tones', 'Tập nói', false, 2),
  ('learn-tones-group_huyen-lesson3', 'lesson3', 'learn-tones-group_huyen', 'learn-tones', 'Tập viết', false, 3),
  ('learn-tones-group_huyen-lesson4', 'lesson4', 'learn-tones-group_huyen', 'learn-tones', 'Chữ nào đúng', false, 4),
  ('learn-tones-group_hoi-lesson1', 'lesson1', 'learn-tones-group_hoi', 'learn-tones', 'Học dấu', true, 1),
  ('learn-tones-group_hoi-lesson2', 'lesson2', 'learn-tones-group_hoi', 'learn-tones', 'Tập nói', false, 2),
  ('learn-tones-group_hoi-lesson3', 'lesson3', 'learn-tones-group_hoi', 'learn-tones', 'Tập viết', false, 3),
  ('learn-tones-group_hoi-lesson4', 'lesson4', 'learn-tones-group_hoi', 'learn-tones', 'Chữ nào đúng', false, 4),
  ('learn-tones-group_nga-lesson1', 'lesson1', 'learn-tones-group_nga', 'learn-tones', 'Học dấu', true, 1),
  ('learn-tones-group_nga-lesson2', 'lesson2', 'learn-tones-group_nga', 'learn-tones', 'Tập nói', false, 2),
  ('learn-tones-group_nga-lesson3', 'lesson3', 'learn-tones-group_nga', 'learn-tones', 'Tập viết', false, 3),
  ('learn-tones-group_nga-lesson4', 'lesson4', 'learn-tones-group_nga', 'learn-tones', 'Chữ nào đúng', false, 4),
  ('learn-tones-group_nang-lesson1', 'lesson1', 'learn-tones-group_nang', 'learn-tones', 'Học dấu', true, 1),
  ('learn-tones-group_nang-lesson2', 'lesson2', 'learn-tones-group_nang', 'learn-tones', 'Tập nói', false, 2),
  ('learn-tones-group_nang-lesson3', 'lesson3', 'learn-tones-group_nang', 'learn-tones', 'Tập viết', false, 3),
  ('learn-tones-group_nang-lesson4', 'lesson4', 'learn-tones-group_nang', 'learn-tones', 'Chữ nào đúng', false, 4)
ON CONFLICT (id) DO UPDATE SET
  title = EXCLUDED.title,
  is_free = EXCLUDED.is_free,
  sort_index = EXCLUDED.sort_index;

-- Đếm số Lessons
INSERT INTO lessons (id, slug, group_id, course_id, title, is_free, sort_index) VALUES
  ('learn-numbers-group1-lesson1', 'lesson1', 'learn-numbers-group1', 'learn-numbers', 'Học số 1-3', true, 1),
  ('learn-numbers-group1-lesson2', 'lesson2', 'learn-numbers-group1', 'learn-numbers', 'Số nào đúng?', true, 2),
  ('learn-numbers-group1-lesson3', 'lesson3', 'learn-numbers-group1', 'learn-numbers', 'Đếm đồ vật', true, 3),
  ('learn-numbers-group1-lesson4', 'lesson4', 'learn-numbers-group1', 'learn-numbers', 'Tập viết', false, 4),
  ('learn-numbers-group2-lesson1', 'lesson1', 'learn-numbers-group2', 'learn-numbers', 'Học số 4-6', true, 1),
  ('learn-numbers-group2-lesson2', 'lesson2', 'learn-numbers-group2', 'learn-numbers', 'Số nào đúng?', false, 2),
  ('learn-numbers-group2-lesson3', 'lesson3', 'learn-numbers-group2', 'learn-numbers', 'Đếm đồ vật', false, 3),
  ('learn-numbers-group2-lesson4', 'lesson4', 'learn-numbers-group2', 'learn-numbers', 'Tập viết', false, 4),
  ('learn-numbers-group3-lesson1', 'lesson1', 'learn-numbers-group3', 'learn-numbers', 'Học số 7-9', true, 1),
  ('learn-numbers-group3-lesson2', 'lesson2', 'learn-numbers-group3', 'learn-numbers', 'Số nào đúng?', false, 2),
  ('learn-numbers-group3-lesson3', 'lesson3', 'learn-numbers-group3', 'learn-numbers', 'Đếm đồ vật', false, 3),
  ('learn-numbers-group3-lesson4', 'lesson4', 'learn-numbers-group3', 'learn-numbers', 'Tập viết', false, 4),
  ('learn-numbers-group4-lesson1', 'lesson1', 'learn-numbers-group4', 'learn-numbers', 'Học số 10-20', true, 1),
  ('learn-numbers-group4-lesson2', 'lesson2', 'learn-numbers-group4', 'learn-numbers', 'Số nào đúng?', false, 2),
  ('learn-numbers-group4-lesson3', 'lesson3', 'learn-numbers-group4', 'learn-numbers', 'Đếm đồ vật', false, 3),
  ('learn-numbers-group4-lesson4', 'lesson4', 'learn-numbers-group4', 'learn-numbers', 'Tập viết', false, 4),
  ('learn-numbers-group5-lesson1', 'lesson1', 'learn-numbers-group5', 'learn-numbers', 'Số nào đúng?', true, 1),
  ('learn-numbers-group5-lesson2', 'lesson2', 'learn-numbers-group5', 'learn-numbers', 'Đếm đồ vật', false, 2)
ON CONFLICT (id) DO UPDATE SET
  title = EXCLUDED.title,
  is_free = EXCLUDED.is_free,
  sort_index = EXCLUDED.sort_index;

-- So sánh Lessons
INSERT INTO lessons (id, slug, group_id, course_id, title, is_free, sort_index) VALUES
  ('compare-quantity-group1-lesson1', 'lesson1', 'compare-quantity-group1', 'compare-quantity', 'Học lớn hơn', true, 1),
  ('compare-quantity-group1-lesson2', 'lesson2', 'compare-quantity-group1', 'compare-quantity', 'Luyện tập', true, 2),
  ('compare-quantity-group1-lesson3', 'lesson3', 'compare-quantity-group1', 'compare-quantity', 'Thử thách', true, 3),
  ('compare-quantity-group1-lesson4', 'lesson4', 'compare-quantity-group1', 'compare-quantity', 'Trò chơi', false, 4),
  ('compare-quantity-group2-lesson1', 'lesson1', 'compare-quantity-group2', 'compare-quantity', 'Học nhỏ hơn', true, 1),
  ('compare-quantity-group2-lesson2', 'lesson2', 'compare-quantity-group2', 'compare-quantity', 'Luyện tập', false, 2),
  ('compare-quantity-group2-lesson3', 'lesson3', 'compare-quantity-group2', 'compare-quantity', 'Thử thách', false, 3),
  ('compare-quantity-group2-lesson4', 'lesson4', 'compare-quantity-group2', 'compare-quantity', 'Trò chơi', false, 4),
  ('compare-quantity-group3-lesson1', 'lesson1', 'compare-quantity-group3', 'compare-quantity', 'Học bằng nhau', true, 1),
  ('compare-quantity-group3-lesson2', 'lesson2', 'compare-quantity-group3', 'compare-quantity', 'Luyện tập', false, 2),
  ('compare-quantity-group3-lesson3', 'lesson3', 'compare-quantity-group3', 'compare-quantity', 'Thử thách', false, 3),
  ('compare-quantity-group3-lesson4', 'lesson4', 'compare-quantity-group3', 'compare-quantity', 'Trò chơi', false, 4),
  ('compare-quantity-group4-lesson1', 'lesson1', 'compare-quantity-group4', 'compare-quantity', 'Luyện tập tổng hợp', true, 1),
  ('compare-quantity-group4-lesson2', 'lesson2', 'compare-quantity-group4', 'compare-quantity', 'Thử thách cuối', false, 2)
ON CONFLICT (id) DO UPDATE SET
  title = EXCLUDED.title,
  is_free = EXCLUDED.is_free,
  sort_index = EXCLUDED.sort_index;

-- Học Màu Sắc Lessons
INSERT INTO lessons (id, slug, group_id, course_id, title, is_free, sort_index) VALUES
  ('learn-color-group1-lesson1', 'lesson1', 'learn-color-group1', 'learn-color', 'Học màu sắc', true, 1),
  ('learn-color-group1-lesson2', 'lesson2', 'learn-color-group1', 'learn-color', 'Tìm màu giống', true, 2),
  ('learn-color-group1-lesson3', 'lesson3', 'learn-color-group1', 'learn-color', 'Trò chơi màu', true, 3),
  ('learn-color-group2-lesson1', 'lesson1', 'learn-color-group2', 'learn-color', 'Học màu sắc', true, 1),
  ('learn-color-group2-lesson2', 'lesson2', 'learn-color-group2', 'learn-color', 'Tìm màu giống', false, 2),
  ('learn-color-group2-lesson3', 'lesson3', 'learn-color-group2', 'learn-color', 'Trò chơi màu', false, 3),
  ('learn-color-group3-lesson1', 'lesson1', 'learn-color-group3', 'learn-color', 'Học màu sắc', true, 1),
  ('learn-color-group3-lesson2', 'lesson2', 'learn-color-group3', 'learn-color', 'Tìm màu giống', false, 2),
  ('learn-color-group3-lesson3', 'lesson3', 'learn-color-group3', 'learn-color', 'Trò chơi màu', false, 3)
ON CONFLICT (id) DO UPDATE SET
  title = EXCLUDED.title,
  is_free = EXCLUDED.is_free,
  sort_index = EXCLUDED.sort_index;

-- Hình dạng Lessons
INSERT INTO lessons (id, slug, group_id, course_id, title, is_free, sort_index) VALUES
  ('learn-shape-group1-lesson1', 'lesson1', 'learn-shape-group1', 'learn-shape', 'Học hình dạng', true, 1),
  ('learn-shape-group1-lesson2', 'lesson2', 'learn-shape-group1', 'learn-shape', 'Tìm hình giống', true, 2),
  ('learn-shape-group1-lesson3', 'lesson3', 'learn-shape-group1', 'learn-shape', 'Tìm đồ vật', true, 3),
  ('learn-shape-group1-lesson4', 'lesson4', 'learn-shape-group1', 'learn-shape', 'Trò chơi hình', false, 4),
  ('learn-shape-group2-lesson1', 'lesson1', 'learn-shape-group2', 'learn-shape', 'Học hình dạng', true, 1),
  ('learn-shape-group2-lesson2', 'lesson2', 'learn-shape-group2', 'learn-shape', 'Tìm hình giống', false, 2),
  ('learn-shape-group2-lesson3', 'lesson3', 'learn-shape-group2', 'learn-shape', 'Tìm đồ vật', false, 3),
  ('learn-shape-group2-lesson4', 'lesson4', 'learn-shape-group2', 'learn-shape', 'Trò chơi hình', false, 4),
  ('learn-shape-group3-lesson1', 'lesson1', 'learn-shape-group3', 'learn-shape', 'Luyện tập hình', true, 1),
  ('learn-shape-group3-lesson2', 'lesson2', 'learn-shape-group3', 'learn-shape', 'Thử thách hình', false, 2)
ON CONFLICT (id) DO UPDATE SET
  title = EXCLUDED.title,
  is_free = EXCLUDED.is_free,
  sort_index = EXCLUDED.sort_index;

-- Động vật Lessons
INSERT INTO lessons (id, slug, group_id, course_id, title, is_free, sort_index) VALUES
  ('learn-animal-group1-lesson1', 'lesson1', 'learn-animal-group1', 'learn-animal', 'Học tên động vật', true, 1),
  ('learn-animal-group1-lesson2', 'lesson2', 'learn-animal-group1', 'learn-animal', 'Tập nói', true, 2),
  ('learn-animal-group1-lesson3', 'lesson3', 'learn-animal-group1', 'learn-animal', 'Đây là con gì?', true, 3),
  ('learn-animal-group1-lesson4', 'lesson4', 'learn-animal-group1', 'learn-animal', 'Ghép đôi', false, 4),
  ('learn-animal-group2-lesson1', 'lesson1', 'learn-animal-group2', 'learn-animal', 'Học tên động vật', true, 1),
  ('learn-animal-group2-lesson2', 'lesson2', 'learn-animal-group2', 'learn-animal', 'Tập nói', false, 2),
  ('learn-animal-group2-lesson3', 'lesson3', 'learn-animal-group2', 'learn-animal', 'Đây là con gì?', false, 3),
  ('learn-animal-group2-lesson4', 'lesson4', 'learn-animal-group2', 'learn-animal', 'Ghép đôi', false, 4),
  ('learn-animal-group3-lesson1', 'lesson1', 'learn-animal-group3', 'learn-animal', 'Học tên động vật', true, 1),
  ('learn-animal-group3-lesson2', 'lesson2', 'learn-animal-group3', 'learn-animal', 'Tập nói', false, 2),
  ('learn-animal-group3-lesson3', 'lesson3', 'learn-animal-group3', 'learn-animal', 'Đây là con gì?', false, 3),
  ('learn-animal-group3-lesson4', 'lesson4', 'learn-animal-group3', 'learn-animal', 'Ghép đôi', false, 4)
ON CONFLICT (id) DO UPDATE SET
  title = EXCLUDED.title,
  is_free = EXCLUDED.is_free,
  sort_index = EXCLUDED.sort_index;

-- Phương tiện Lessons
INSERT INTO lessons (id, slug, group_id, course_id, title, is_free, sort_index) VALUES
  ('learn-vehicle-group1-lesson1', 'lesson1', 'learn-vehicle-group1', 'learn-vehicle', 'Học tên phương tiện', true, 1),
  ('learn-vehicle-group1-lesson2', 'lesson2', 'learn-vehicle-group1', 'learn-vehicle', 'Đây là gì?', true, 2),
  ('learn-vehicle-group1-lesson3', 'lesson3', 'learn-vehicle-group1', 'learn-vehicle', 'Ghép đôi', true, 3),
  ('learn-vehicle-group2-lesson1', 'lesson1', 'learn-vehicle-group2', 'learn-vehicle', 'Học tên phương tiện', true, 1),
  ('learn-vehicle-group2-lesson2', 'lesson2', 'learn-vehicle-group2', 'learn-vehicle', 'Đây là gì?', false, 2),
  ('learn-vehicle-group2-lesson3', 'lesson3', 'learn-vehicle-group2', 'learn-vehicle', 'Ghép đôi', false, 3),
  ('learn-vehicle-group3-lesson1', 'lesson1', 'learn-vehicle-group3', 'learn-vehicle', 'Học tên phương tiện', true, 1),
  ('learn-vehicle-group3-lesson2', 'lesson2', 'learn-vehicle-group3', 'learn-vehicle', 'Đây là gì?', false, 2),
  ('learn-vehicle-group3-lesson3', 'lesson3', 'learn-vehicle-group3', 'learn-vehicle', 'Ghép đôi', false, 3),
  ('learn-vehicle-group4-lesson1', 'lesson1', 'learn-vehicle-group4', 'learn-vehicle', 'Đây là gì?', true, 1),
  ('learn-vehicle-group4-lesson2', 'lesson2', 'learn-vehicle-group4', 'learn-vehicle', 'Ghép đôi', false, 2),
  ('learn-vehicle-group4-lesson3', 'lesson3', 'learn-vehicle-group4', 'learn-vehicle', 'Xe đi đâu?', false, 3)
ON CONFLICT (id) DO UPDATE SET
  title = EXCLUDED.title,
  is_free = EXCLUDED.is_free,
  sort_index = EXCLUDED.sort_index;

-- Trái cây Lessons
INSERT INTO lessons (id, slug, group_id, course_id, title, is_free, sort_index) VALUES
  ('learn-fruit-group1-lesson1', 'lesson1', 'learn-fruit-group1', 'learn-fruit', 'Học tên trái cây', true, 1),
  ('learn-fruit-group1-lesson2', 'lesson2', 'learn-fruit-group1', 'learn-fruit', 'Đây là gì?', true, 2),
  ('learn-fruit-group1-lesson3', 'lesson3', 'learn-fruit-group1', 'learn-fruit', 'Ghép đôi', true, 3),
  ('learn-fruit-group2-lesson1', 'lesson1', 'learn-fruit-group2', 'learn-fruit', 'Học tên trái cây', true, 1),
  ('learn-fruit-group2-lesson2', 'lesson2', 'learn-fruit-group2', 'learn-fruit', 'Đây là gì?', false, 2),
  ('learn-fruit-group2-lesson3', 'lesson3', 'learn-fruit-group2', 'learn-fruit', 'Ghép đôi', false, 3),
  ('learn-fruit-group3-lesson1', 'lesson1', 'learn-fruit-group3', 'learn-fruit', 'Học tên trái cây', true, 1),
  ('learn-fruit-group3-lesson2', 'lesson2', 'learn-fruit-group3', 'learn-fruit', 'Đây là gì?', false, 2),
  ('learn-fruit-group3-lesson3', 'lesson3', 'learn-fruit-group3', 'learn-fruit', 'Ghép đôi', false, 3)
ON CONFLICT (id) DO UPDATE SET
  title = EXCLUDED.title,
  is_free = EXCLUDED.is_free,
  sort_index = EXCLUDED.sort_index;

-- Món ăn Lessons
INSERT INTO lessons (id, slug, group_id, course_id, title, is_free, sort_index) VALUES
  ('learn-food-group1-lesson1', 'lesson1', 'learn-food-group1', 'learn-food', 'Học tên món ăn', true, 1),
  ('learn-food-group1-lesson2', 'lesson2', 'learn-food-group1', 'learn-food', 'Đây là gì?', true, 2),
  ('learn-food-group1-lesson3', 'lesson3', 'learn-food-group1', 'learn-food', 'Ghép đôi', true, 3),
  ('learn-food-group2-lesson1', 'lesson1', 'learn-food-group2', 'learn-food', 'Học tên món ăn', true, 1),
  ('learn-food-group2-lesson2', 'lesson2', 'learn-food-group2', 'learn-food', 'Đây là gì?', false, 2),
  ('learn-food-group2-lesson3', 'lesson3', 'learn-food-group2', 'learn-food', 'Ghép đôi', false, 3),
  ('learn-food-group3-lesson1', 'lesson1', 'learn-food-group3', 'learn-food', 'Học tên món ăn', true, 1),
  ('learn-food-group3-lesson2', 'lesson2', 'learn-food-group3', 'learn-food', 'Đây là gì?', false, 2),
  ('learn-food-group3-lesson3', 'lesson3', 'learn-food-group3', 'learn-food', 'Ghép đôi', false, 3)
ON CONFLICT (id) DO UPDATE SET
  title = EXCLUDED.title,
  is_free = EXCLUDED.is_free,
  sort_index = EXCLUDED.sort_index;

-- Khủng long Lessons
INSERT INTO lessons (id, slug, group_id, course_id, title, is_free, sort_index) VALUES
  ('learn-dinosaur-group1-lesson1', 'lesson1', 'learn-dinosaur-group1', 'learn-dinosaur', 'Học tên khủng long', true, 1),
  ('learn-dinosaur-group1-lesson2', 'lesson2', 'learn-dinosaur-group1', 'learn-dinosaur', 'Đây là gì?', true, 2),
  ('learn-dinosaur-group1-lesson3', 'lesson3', 'learn-dinosaur-group1', 'learn-dinosaur', 'Ghép đôi', true, 3),
  ('learn-dinosaur-group2-lesson1', 'lesson1', 'learn-dinosaur-group2', 'learn-dinosaur', 'Học tên khủng long', true, 1),
  ('learn-dinosaur-group2-lesson2', 'lesson2', 'learn-dinosaur-group2', 'learn-dinosaur', 'Đây là gì?', false, 2),
  ('learn-dinosaur-group2-lesson3', 'lesson3', 'learn-dinosaur-group2', 'learn-dinosaur', 'Ghép đôi', false, 3),
  ('learn-dinosaur-group3-lesson1', 'lesson1', 'learn-dinosaur-group3', 'learn-dinosaur', 'Học tên khủng long', true, 1),
  ('learn-dinosaur-group3-lesson2', 'lesson2', 'learn-dinosaur-group3', 'learn-dinosaur', 'Đây là gì?', false, 2),
  ('learn-dinosaur-group3-lesson3', 'lesson3', 'learn-dinosaur-group3', 'learn-dinosaur', 'Ghép đôi', false, 3)
ON CONFLICT (id) DO UPDATE SET
  title = EXCLUDED.title,
  is_free = EXCLUDED.is_free,
  sort_index = EXCLUDED.sort_index;

-- Nhạc cụ Lessons
INSERT INTO lessons (id, slug, group_id, course_id, title, is_free, sort_index) VALUES
  ('learn-instrument-group1-lesson1', 'lesson1', 'learn-instrument-group1', 'learn-instrument', 'Học nhạc cụ', true, 1),
  ('learn-instrument-group1-lesson2', 'lesson2', 'learn-instrument-group1', 'learn-instrument', 'Đây là gì?', true, 2),
  ('learn-instrument-group1-lesson3', 'lesson3', 'learn-instrument-group1', 'learn-instrument', 'Ghép đôi', true, 3),
  ('learn-instrument-group2-lesson1', 'lesson1', 'learn-instrument-group2', 'learn-instrument', 'Học nhạc cụ', true, 1),
  ('learn-instrument-group2-lesson2', 'lesson2', 'learn-instrument-group2', 'learn-instrument', 'Đây là gì?', false, 2),
  ('learn-instrument-group2-lesson3', 'lesson3', 'learn-instrument-group2', 'learn-instrument', 'Ghép đôi', false, 3),
  ('learn-instrument-group3-lesson1', 'lesson1', 'learn-instrument-group3', 'learn-instrument', 'Học nhạc cụ', true, 1),
  ('learn-instrument-group3-lesson2', 'lesson2', 'learn-instrument-group3', 'learn-instrument', 'Đây là gì?', false, 2),
  ('learn-instrument-group3-lesson3', 'lesson3', 'learn-instrument-group3', 'learn-instrument', 'Ghép đôi', false, 3)
ON CONFLICT (id) DO UPDATE SET
  title = EXCLUDED.title,
  is_free = EXCLUDED.is_free,
  sort_index = EXCLUDED.sort_index;

-- Nghề nghiệp Lessons
INSERT INTO lessons (id, slug, group_id, course_id, title, is_free, sort_index) VALUES
  ('learn-occupation-group1-lesson1', 'lesson1', 'learn-occupation-group1', 'learn-occupation', 'Học tên nghề', true, 1),
  ('learn-occupation-group1-lesson2', 'lesson2', 'learn-occupation-group1', 'learn-occupation', 'Đây là gì?', true, 2),
  ('learn-occupation-group1-lesson3', 'lesson3', 'learn-occupation-group1', 'learn-occupation', 'Nối dụng cụ', true, 3),
  ('learn-occupation-group2-lesson1', 'lesson1', 'learn-occupation-group2', 'learn-occupation', 'Học tên nghề', true, 1),
  ('learn-occupation-group2-lesson2', 'lesson2', 'learn-occupation-group2', 'learn-occupation', 'Đây là gì?', false, 2),
  ('learn-occupation-group2-lesson3', 'lesson3', 'learn-occupation-group2', 'learn-occupation', 'Nối dụng cụ', false, 3),
  ('learn-occupation-group3-lesson1', 'lesson1', 'learn-occupation-group3', 'learn-occupation', 'Học tên nghề', true, 1),
  ('learn-occupation-group3-lesson2', 'lesson2', 'learn-occupation-group3', 'learn-occupation', 'Đây là gì?', false, 2),
  ('learn-occupation-group3-lesson3', 'lesson3', 'learn-occupation-group3', 'learn-occupation', 'Nối dụng cụ', false, 3)
ON CONFLICT (id) DO UPDATE SET
  title = EXCLUDED.title,
  is_free = EXCLUDED.is_free,
  sort_index = EXCLUDED.sort_index;

-- Hoa & Cây Lessons
INSERT INTO lessons (id, slug, group_id, course_id, title, is_free, sort_index) VALUES
  ('learn-flower-group1-lesson1', 'lesson1', 'learn-flower-group1', 'learn-flower', 'Học tên hoa', true, 1),
  ('learn-flower-group1-lesson2', 'lesson2', 'learn-flower-group1', 'learn-flower', 'Đây là gì?', true, 2),
  ('learn-flower-group1-lesson3', 'lesson3', 'learn-flower-group1', 'learn-flower', 'Ghép đôi', true, 3),
  ('learn-flower-group2-lesson1', 'lesson1', 'learn-flower-group2', 'learn-flower', 'Học tên hoa', true, 1),
  ('learn-flower-group2-lesson2', 'lesson2', 'learn-flower-group2', 'learn-flower', 'Đây là gì?', false, 2),
  ('learn-flower-group2-lesson3', 'lesson3', 'learn-flower-group2', 'learn-flower', 'Ghép đôi', false, 3),
  ('learn-flower-group3-lesson1', 'lesson1', 'learn-flower-group3', 'learn-flower', 'Học tên cây', true, 1),
  ('learn-flower-group3-lesson2', 'lesson2', 'learn-flower-group3', 'learn-flower', 'Đây là gì?', false, 2),
  ('learn-flower-group3-lesson3', 'lesson3', 'learn-flower-group3', 'learn-flower', 'Ghép đôi', false, 3)
ON CONFLICT (id) DO UPDATE SET
  title = EXCLUDED.title,
  is_free = EXCLUDED.is_free,
  sort_index = EXCLUDED.sort_index;

-- Thời tiết Lessons
INSERT INTO lessons (id, slug, group_id, course_id, title, is_free, sort_index) VALUES
  ('learn-weather-group1-lesson1', 'lesson1', 'learn-weather-group1', 'learn-weather', 'Học tên thời tiết', true, 1),
  ('learn-weather-group1-lesson2', 'lesson2', 'learn-weather-group1', 'learn-weather', 'Tập nói', true, 2),
  ('learn-weather-group1-lesson3', 'lesson3', 'learn-weather-group1', 'learn-weather', 'Đây là gì?', true, 3),
  ('learn-weather-group1-lesson4', 'lesson4', 'learn-weather-group1', 'learn-weather', 'Ghép đôi', false, 4),
  ('learn-weather-group2-lesson1', 'lesson1', 'learn-weather-group2', 'learn-weather', 'Học tên thời tiết', true, 1),
  ('learn-weather-group2-lesson2', 'lesson2', 'learn-weather-group2', 'learn-weather', 'Tập nói', false, 2),
  ('learn-weather-group2-lesson3', 'lesson3', 'learn-weather-group2', 'learn-weather', 'Đây là gì?', false, 3),
  ('learn-weather-group2-lesson4', 'lesson4', 'learn-weather-group2', 'learn-weather', 'Ghép đôi', false, 4),
  ('learn-weather-group3-lesson1', 'lesson1', 'learn-weather-group3', 'learn-weather', 'Học tên mùa', true, 1),
  ('learn-weather-group3-lesson2', 'lesson2', 'learn-weather-group3', 'learn-weather', 'Tập nói', false, 2),
  ('learn-weather-group3-lesson3', 'lesson3', 'learn-weather-group3', 'learn-weather', 'Đây là gì?', false, 3),
  ('learn-weather-group3-lesson4', 'lesson4', 'learn-weather-group3', 'learn-weather', 'Ghép đôi', false, 4),
  ('learn-weather-group3-lesson5', 'lesson5', 'learn-weather-group3', 'learn-weather', 'Mặc gì cho đúng mùa?', false, 5)
ON CONFLICT (id) DO UPDATE SET
  title = EXCLUDED.title,
  is_free = EXCLUDED.is_free,
  sort_index = EXCLUDED.sort_index;

-- Vệ sinh cá nhân Lessons
INSERT INTO lessons (id, slug, group_id, course_id, title, is_free, sort_index) VALUES
  ('learn-hygiene-group1-lesson1', 'lesson1', 'learn-hygiene-group1', 'learn-hygiene', 'Học tên', true, 1),
  ('learn-hygiene-group1-lesson2', 'lesson2', 'learn-hygiene-group1', 'learn-hygiene', 'Tập nói', true, 2),
  ('learn-hygiene-group1-lesson3', 'lesson3', 'learn-hygiene-group1', 'learn-hygiene', 'Đúng hay Sai?', true, 3),
  ('learn-hygiene-group1-lesson4', 'lesson4', 'learn-hygiene-group1', 'learn-hygiene', 'Sắp xếp thứ tự', false, 4),
  ('learn-hygiene-group2-lesson1', 'lesson1', 'learn-hygiene-group2', 'learn-hygiene', 'Học tên', true, 1),
  ('learn-hygiene-group2-lesson2', 'lesson2', 'learn-hygiene-group2', 'learn-hygiene', 'Tập nói', false, 2),
  ('learn-hygiene-group2-lesson3', 'lesson3', 'learn-hygiene-group2', 'learn-hygiene', 'Đúng hay Sai?', false, 3),
  ('learn-hygiene-group2-lesson4', 'lesson4', 'learn-hygiene-group2', 'learn-hygiene', 'Sắp xếp thứ tự', false, 4),
  ('learn-hygiene-group3-lesson1', 'lesson1', 'learn-hygiene-group3', 'learn-hygiene', 'Học tên', true, 1),
  ('learn-hygiene-group3-lesson2', 'lesson2', 'learn-hygiene-group3', 'learn-hygiene', 'Tập nói', false, 2),
  ('learn-hygiene-group3-lesson3', 'lesson3', 'learn-hygiene-group3', 'learn-hygiene', 'Đúng hay Sai?', false, 3),
  ('learn-hygiene-group3-lesson4', 'lesson4', 'learn-hygiene-group3', 'learn-hygiene', 'Sắp xếp thứ tự', false, 4)
ON CONFLICT (id) DO UPDATE SET
  title = EXCLUDED.title,
  is_free = EXCLUDED.is_free,
  sort_index = EXCLUDED.sort_index;

-- An Toàn Giao Thông Lessons
INSERT INTO lessons (id, slug, group_id, course_id, title, is_free, sort_index) VALUES
  ('learn-traffic-group1-lesson1', 'lesson1', 'learn-traffic-group1', 'learn-traffic', 'Học biển báo', true, 1),
  ('learn-traffic-group1-lesson2', 'lesson2', 'learn-traffic-group1', 'learn-traffic', 'Khám phá phố', true, 2),
  ('learn-traffic-group1-lesson3', 'lesson3', 'learn-traffic-group1', 'learn-traffic', 'Tìm biển đúng', true, 3),
  ('learn-traffic-group1-lesson4', 'lesson4', 'learn-traffic-group1', 'learn-traffic', 'Chọn hành động', false, 4),
  ('learn-traffic-group1-lesson5', 'lesson5', 'learn-traffic-group1', 'learn-traffic', 'Lắp biển báo', false, 5),
  ('learn-traffic-group2-lesson1', 'lesson1', 'learn-traffic-group2', 'learn-traffic', 'Học quy tắc đi bộ', true, 1),
  ('learn-traffic-group2-lesson2', 'lesson2', 'learn-traffic-group2', 'learn-traffic', 'Khám phá đường', false, 2),
  ('learn-traffic-group2-lesson3', 'lesson3', 'learn-traffic-group2', 'learn-traffic', 'Tình huống đi bộ', false, 3),
  ('learn-traffic-group2-lesson4', 'lesson4', 'learn-traffic-group2', 'learn-traffic', 'An toàn đi bộ', false, 4),
  ('learn-traffic-group2-lesson5', 'lesson5', 'learn-traffic-group2', 'learn-traffic', 'Lắp biển đi bộ', false, 5),
  ('learn-traffic-group3-lesson1', 'lesson1', 'learn-traffic-group3', 'learn-traffic', 'Học quy tắc đi xe', true, 1),
  ('learn-traffic-group3-lesson2', 'lesson2', 'learn-traffic-group3', 'learn-traffic', 'Khám phá xe cộ', false, 2),
  ('learn-traffic-group3-lesson3', 'lesson3', 'learn-traffic-group3', 'learn-traffic', 'Tình huống trên xe', false, 3),
  ('learn-traffic-group3-lesson4', 'lesson4', 'learn-traffic-group3', 'learn-traffic', 'Hành khách an toàn', false, 4),
  ('learn-traffic-group3-lesson5', 'lesson5', 'learn-traffic-group3', 'learn-traffic', 'Lắp biển xe', false, 5)
ON CONFLICT (id) DO UPDATE SET
  title = EXCLUDED.title,
  is_free = EXCLUDED.is_free,
  sort_index = EXCLUDED.sort_index;

-- Cảm Xúc Lessons
INSERT INTO lessons (id, slug, group_id, course_id, title, is_free, sort_index) VALUES
  ('learn-emotion-group1-lesson1', 'lesson1', 'learn-emotion-group1', 'learn-emotion', 'Học cảm xúc', true, 1),
  ('learn-emotion-group1-lesson2', 'lesson2', 'learn-emotion-group1', 'learn-emotion', 'Tập nói', true, 2),
  ('learn-emotion-group1-lesson3', 'lesson3', 'learn-emotion-group1', 'learn-emotion', 'Đúng hay Sai?', true, 3),
  ('learn-emotion-group1-lesson4', 'lesson4', 'learn-emotion-group1', 'learn-emotion', 'Chọn cảm xúc đúng', false, 4),
  ('learn-emotion-group2-lesson1', 'lesson1', 'learn-emotion-group2', 'learn-emotion', 'Học cảm xúc', true, 1),
  ('learn-emotion-group2-lesson2', 'lesson2', 'learn-emotion-group2', 'learn-emotion', 'Tập nói', false, 2),
  ('learn-emotion-group2-lesson3', 'lesson3', 'learn-emotion-group2', 'learn-emotion', 'Đúng hay Sai?', false, 3),
  ('learn-emotion-group2-lesson4', 'lesson4', 'learn-emotion-group2', 'learn-emotion', 'Chọn cảm xúc đúng', false, 4)
ON CONFLICT (id) DO UPDATE SET
  title = EXCLUDED.title,
  is_free = EXCLUDED.is_free,
  sort_index = EXCLUDED.sort_index;

-- Cờ quốc gia Lessons
INSERT INTO lessons (id, slug, group_id, course_id, title, is_free, sort_index) VALUES
  ('learn-flag-group1-lesson1', 'lesson1', 'learn-flag-group1', 'learn-flag', 'Học tên quốc kỳ', true, 1),
  ('learn-flag-group1-lesson2', 'lesson2', 'learn-flag-group1', 'learn-flag', 'Chọn quốc kỳ đúng', true, 2),
  ('learn-flag-group1-lesson3', 'lesson3', 'learn-flag-group1', 'learn-flag', 'Lật hình ghi nhớ', true, 3),
  ('learn-flag-group1-lesson4', 'lesson4', 'learn-flag-group1', 'learn-flag', 'Ghép hình', false, 4),
  ('learn-flag-group2-lesson1', 'lesson1', 'learn-flag-group2', 'learn-flag', 'Học tên quốc kỳ', true, 1),
  ('learn-flag-group2-lesson2', 'lesson2', 'learn-flag-group2', 'learn-flag', 'Chọn quốc kỳ đúng', false, 2),
  ('learn-flag-group2-lesson3', 'lesson3', 'learn-flag-group2', 'learn-flag', 'Lật hình ghi nhớ', false, 3),
  ('learn-flag-group2-lesson4', 'lesson4', 'learn-flag-group2', 'learn-flag', 'Ghép hình', false, 4),
  ('learn-flag-group3-lesson1', 'lesson1', 'learn-flag-group3', 'learn-flag', 'Học tên quốc kỳ', true, 1),
  ('learn-flag-group3-lesson2', 'lesson2', 'learn-flag-group3', 'learn-flag', 'Chọn quốc kỳ đúng', false, 2),
  ('learn-flag-group3-lesson3', 'lesson3', 'learn-flag-group3', 'learn-flag', 'Lật hình ghi nhớ', false, 3),
  ('learn-flag-group3-lesson4', 'lesson4', 'learn-flag-group3', 'learn-flag', 'Ghép hình', false, 4),
  ('learn-flag-group4-lesson1', 'lesson1', 'learn-flag-group4', 'learn-flag', 'Học tên quốc kỳ', true, 1),
  ('learn-flag-group4-lesson2', 'lesson2', 'learn-flag-group4', 'learn-flag', 'Chọn quốc kỳ đúng', false, 2),
  ('learn-flag-group4-lesson3', 'lesson3', 'learn-flag-group4', 'learn-flag', 'Lật hình ghi nhớ', false, 3),
  ('learn-flag-group4-lesson4', 'lesson4', 'learn-flag-group4', 'learn-flag', 'Ghép hình', false, 4)
ON CONFLICT (id) DO UPDATE SET
  title = EXCLUDED.title,
  is_free = EXCLUDED.is_free,
  sort_index = EXCLUDED.sort_index;

-- Địa Danh Nổi Tiếng Lessons
INSERT INTO lessons (id, slug, group_id, course_id, title, is_free, sort_index) VALUES
  ('learn-landmark-group1-lesson1', 'lesson1', 'learn-landmark-group1', 'learn-landmark', 'Học địa danh', true, 1),
  ('learn-landmark-group1-lesson2', 'lesson2', 'learn-landmark-group1', 'learn-landmark', 'Đây là đâu?', true, 2),
  ('learn-landmark-group1-lesson3', 'lesson3', 'learn-landmark-group1', 'learn-landmark', 'Ghép đôi', true, 3),
  ('learn-landmark-group1-lesson4', 'lesson4', 'learn-landmark-group1', 'learn-landmark', 'Xếp hình', false, 4),
  ('learn-landmark-group2-lesson1', 'lesson1', 'learn-landmark-group2', 'learn-landmark', 'Học địa danh', true, 1),
  ('learn-landmark-group2-lesson2', 'lesson2', 'learn-landmark-group2', 'learn-landmark', 'Đây là đâu?', false, 2),
  ('learn-landmark-group2-lesson3', 'lesson3', 'learn-landmark-group2', 'learn-landmark', 'Ghép đôi', false, 3),
  ('learn-landmark-group2-lesson4', 'lesson4', 'learn-landmark-group2', 'learn-landmark', 'Xếp hình', false, 4),
  ('learn-landmark-group3-lesson1', 'lesson1', 'learn-landmark-group3', 'learn-landmark', 'Học địa danh', true, 1),
  ('learn-landmark-group3-lesson2', 'lesson2', 'learn-landmark-group3', 'learn-landmark', 'Đây là đâu?', false, 2),
  ('learn-landmark-group3-lesson3', 'lesson3', 'learn-landmark-group3', 'learn-landmark', 'Ghép đôi', false, 3),
  ('learn-landmark-group3-lesson4', 'lesson4', 'learn-landmark-group3', 'learn-landmark', 'Xếp hình', false, 4)
ON CONFLICT (id) DO UPDATE SET
  title = EXCLUDED.title,
  is_free = EXCLUDED.is_free,
  sort_index = EXCLUDED.sort_index;

-- Trang Phục Thế Giới Lessons
INSERT INTO lessons (id, slug, group_id, course_id, title, is_free, sort_index) VALUES
  ('learn-costume-group1-lesson1', 'lesson1', 'learn-costume-group1', 'learn-costume', 'Học trang phục', true, 1),
  ('learn-costume-group1-lesson2', 'lesson2', 'learn-costume-group1', 'learn-costume', 'Trang phục nước nào?', true, 2),
  ('learn-costume-group1-lesson3', 'lesson3', 'learn-costume-group1', 'learn-costume', 'Mặc Đúng Cho Bạn', true, 3),
  ('learn-costume-group1-lesson4', 'lesson4', 'learn-costume-group1', 'learn-costume', 'Ghép đôi', false, 4),
  ('learn-costume-group2-lesson1', 'lesson1', 'learn-costume-group2', 'learn-costume', 'Học trang phục', true, 1),
  ('learn-costume-group2-lesson2', 'lesson2', 'learn-costume-group2', 'learn-costume', 'Trang phục nước nào?', false, 2),
  ('learn-costume-group2-lesson3', 'lesson3', 'learn-costume-group2', 'learn-costume', 'Mặc Đúng Cho Bạn', false, 3),
  ('learn-costume-group2-lesson4', 'lesson4', 'learn-costume-group2', 'learn-costume', 'Ghép đôi', false, 4),
  ('learn-costume-group3-lesson1', 'lesson1', 'learn-costume-group3', 'learn-costume', 'Học trang phục', true, 1),
  ('learn-costume-group3-lesson2', 'lesson2', 'learn-costume-group3', 'learn-costume', 'Trang phục nước nào?', false, 2),
  ('learn-costume-group3-lesson3', 'lesson3', 'learn-costume-group3', 'learn-costume', 'Mặc Đúng Cho Bạn', false, 3),
  ('learn-costume-group3-lesson4', 'lesson4', 'learn-costume-group3', 'learn-costume', 'Ghép đôi', false, 4)
ON CONFLICT (id) DO UPDATE SET
  title = EXCLUDED.title,
  is_free = EXCLUDED.is_free,
  sort_index = EXCLUDED.sort_index;

-- Toán đơn giản Lessons
INSERT INTO lessons (id, slug, group_id, course_id, title, is_free, sort_index) VALUES
  ('learn-math-group1-lesson1', 'lesson1', 'learn-math-group1', 'learn-math', 'Giải thích phép cộng', true, 1),
  ('learn-math-group1-lesson2', 'lesson2', 'learn-math-group1', 'learn-math', 'Cộng bằng hình', true, 2),
  ('learn-math-group1-lesson3', 'lesson3', 'learn-math-group1', 'learn-math', 'Cộng bằng số', true, 3),
  ('learn-math-group1-lesson4', 'lesson4', 'learn-math-group1', 'learn-math', 'Tập viết dấu', false, 4),
  ('learn-math-group2-lesson1', 'lesson1', 'learn-math-group2', 'learn-math', 'Giải thích phép trừ', true, 1),
  ('learn-math-group2-lesson2', 'lesson2', 'learn-math-group2', 'learn-math', 'Trừ bằng hình', false, 2),
  ('learn-math-group2-lesson3', 'lesson3', 'learn-math-group2', 'learn-math', 'Trừ bằng số', false, 3),
  ('learn-math-group2-lesson4', 'lesson4', 'learn-math-group2', 'learn-math', 'Tập viết dấu', false, 4),
  ('learn-math-group3-lesson1', 'lesson1', 'learn-math-group3', 'learn-math', 'Cộng trừ bằng hình', true, 1),
  ('learn-math-group3-lesson2', 'lesson2', 'learn-math-group3', 'learn-math', 'Cộng trừ bằng số', false, 2)
ON CONFLICT (id) DO UPDATE SET
  title = EXCLUDED.title,
  is_free = EXCLUDED.is_free,
  sort_index = EXCLUDED.sort_index;

-- Phép Nhân Lessons
INSERT INTO lessons (id, slug, group_id, course_id, title, is_free, sort_index) VALUES
  ('learn-multiply-group1-lesson1', 'lesson1', 'learn-multiply-group1', 'learn-multiply', 'Giải thích phép nhân', true, 1),
  ('learn-multiply-group1-lesson2', 'lesson2', 'learn-multiply-group1', 'learn-multiply', 'Nhân bằng hình', true, 2),
  ('learn-multiply-group1-lesson3', 'lesson3', 'learn-multiply-group1', 'learn-multiply', 'Nhân bằng số', true, 3),
  ('learn-multiply-group1-lesson4', 'lesson4', 'learn-multiply-group1', 'learn-multiply', 'Điền số thiếu', false, 4),
  ('learn-multiply-group1-lesson5', 'lesson5', 'learn-multiply-group1', 'learn-multiply', 'Nhảy số', false, 5),
  ('learn-multiply-group2-lesson1', 'lesson1', 'learn-multiply-group2', 'learn-multiply', 'Giải thích phép nhân', true, 1),
  ('learn-multiply-group2-lesson2', 'lesson2', 'learn-multiply-group2', 'learn-multiply', 'Nhân bằng hình', false, 2),
  ('learn-multiply-group2-lesson3', 'lesson3', 'learn-multiply-group2', 'learn-multiply', 'Nhân bằng số', false, 3),
  ('learn-multiply-group2-lesson4', 'lesson4', 'learn-multiply-group2', 'learn-multiply', 'Điền số thiếu', false, 4),
  ('learn-multiply-group2-lesson5', 'lesson5', 'learn-multiply-group2', 'learn-multiply', 'Nhảy số', false, 5),
  ('learn-multiply-group3-lesson1', 'lesson1', 'learn-multiply-group3', 'learn-multiply', 'Giải thích phép nhân', true, 1),
  ('learn-multiply-group3-lesson2', 'lesson2', 'learn-multiply-group3', 'learn-multiply', 'Nhân bằng hình', false, 2),
  ('learn-multiply-group3-lesson3', 'lesson3', 'learn-multiply-group3', 'learn-multiply', 'Nhân bằng số', false, 3),
  ('learn-multiply-group3-lesson4', 'lesson4', 'learn-multiply-group3', 'learn-multiply', 'Điền số thiếu', false, 4),
  ('learn-multiply-group3-lesson5', 'lesson5', 'learn-multiply-group3', 'learn-multiply', 'Nhảy số', false, 5),
  ('learn-multiply-group4-lesson1', 'lesson1', 'learn-multiply-group4', 'learn-multiply', 'Giải thích phép nhân', true, 1),
  ('learn-multiply-group4-lesson2', 'lesson2', 'learn-multiply-group4', 'learn-multiply', 'Nhân bằng hình', false, 2),
  ('learn-multiply-group4-lesson3', 'lesson3', 'learn-multiply-group4', 'learn-multiply', 'Nhân bằng số', false, 3),
  ('learn-multiply-group4-lesson4', 'lesson4', 'learn-multiply-group4', 'learn-multiply', 'Điền số thiếu', false, 4),
  ('learn-multiply-group4-lesson5', 'lesson5', 'learn-multiply-group4', 'learn-multiply', 'Nhảy số', false, 5),
  ('learn-multiply-group5-lesson1', 'lesson1', 'learn-multiply-group5', 'learn-multiply', 'Nhân bằng hình', true, 1),
  ('learn-multiply-group5-lesson2', 'lesson2', 'learn-multiply-group5', 'learn-multiply', 'Nhân bằng số', false, 2),
  ('learn-multiply-group5-lesson3', 'lesson3', 'learn-multiply-group5', 'learn-multiply', 'Điền số thiếu', false, 3)
ON CONFLICT (id) DO UPDATE SET
  title = EXCLUDED.title,
  is_free = EXCLUDED.is_free,
  sort_index = EXCLUDED.sort_index;

-- Phép Chia Lessons
INSERT INTO lessons (id, slug, group_id, course_id, title, is_free, sort_index) VALUES
  ('learn-divide-group1-lesson1', 'lesson1', 'learn-divide-group1', 'learn-divide', 'Giải thích phép chia', true, 1),
  ('learn-divide-group1-lesson2', 'lesson2', 'learn-divide-group1', 'learn-divide', 'Chia bằng hình', true, 2),
  ('learn-divide-group1-lesson3', 'lesson3', 'learn-divide-group1', 'learn-divide', 'Chia bằng số', true, 3),
  ('learn-divide-group1-lesson4', 'lesson4', 'learn-divide-group1', 'learn-divide', 'Điền số thiếu', false, 4),
  ('learn-divide-group1-lesson5', 'lesson5', 'learn-divide-group1', 'learn-divide', 'Nhân ngược', false, 5),
  ('learn-divide-group2-lesson1', 'lesson1', 'learn-divide-group2', 'learn-divide', 'Giải thích phép chia', true, 1),
  ('learn-divide-group2-lesson2', 'lesson2', 'learn-divide-group2', 'learn-divide', 'Chia bằng hình', false, 2),
  ('learn-divide-group2-lesson3', 'lesson3', 'learn-divide-group2', 'learn-divide', 'Chia bằng số', false, 3),
  ('learn-divide-group2-lesson4', 'lesson4', 'learn-divide-group2', 'learn-divide', 'Điền số thiếu', false, 4),
  ('learn-divide-group2-lesson5', 'lesson5', 'learn-divide-group2', 'learn-divide', 'Nhân ngược', false, 5),
  ('learn-divide-group3-lesson1', 'lesson1', 'learn-divide-group3', 'learn-divide', 'Giải thích phép chia', true, 1),
  ('learn-divide-group3-lesson2', 'lesson2', 'learn-divide-group3', 'learn-divide', 'Chia bằng hình', false, 2),
  ('learn-divide-group3-lesson3', 'lesson3', 'learn-divide-group3', 'learn-divide', 'Chia bằng số', false, 3),
  ('learn-divide-group3-lesson4', 'lesson4', 'learn-divide-group3', 'learn-divide', 'Điền số thiếu', false, 4),
  ('learn-divide-group3-lesson5', 'lesson5', 'learn-divide-group3', 'learn-divide', 'Nhân ngược', false, 5),
  ('learn-divide-group4-lesson1', 'lesson1', 'learn-divide-group4', 'learn-divide', 'Giải thích phép chia', true, 1),
  ('learn-divide-group4-lesson2', 'lesson2', 'learn-divide-group4', 'learn-divide', 'Chia bằng hình', false, 2),
  ('learn-divide-group4-lesson3', 'lesson3', 'learn-divide-group4', 'learn-divide', 'Chia bằng số', false, 3),
  ('learn-divide-group4-lesson4', 'lesson4', 'learn-divide-group4', 'learn-divide', 'Điền số thiếu', false, 4),
  ('learn-divide-group4-lesson5', 'lesson5', 'learn-divide-group4', 'learn-divide', 'Nhân ngược', false, 5),
  ('learn-divide-group5-lesson1', 'lesson1', 'learn-divide-group5', 'learn-divide', 'Chia bằng hình', true, 1),
  ('learn-divide-group5-lesson2', 'lesson2', 'learn-divide-group5', 'learn-divide', 'Chia bằng số', false, 2),
  ('learn-divide-group5-lesson3', 'lesson3', 'learn-divide-group5', 'learn-divide', 'Điền số thiếu', false, 3)
ON CONFLICT (id) DO UPDATE SET
  title = EXCLUDED.title,
  is_free = EXCLUDED.is_free,
  sort_index = EXCLUDED.sort_index;

-- Tiền Việt Nam Lessons
INSERT INTO lessons (id, slug, group_id, course_id, title, is_free, sort_index) VALUES
  ('learn-money-group1-lesson1', 'lesson1', 'learn-money-group1', 'learn-money', 'Học nhận biết', true, 1),
  ('learn-money-group1-lesson2', 'lesson2', 'learn-money-group1', 'learn-money', 'Đây là bao nhiêu?', true, 2),
  ('learn-money-group2-lesson1', 'lesson1', 'learn-money-group2', 'learn-money', 'Xếp tiền nhỏ→lớn', true, 1),
  ('learn-money-group2-lesson2', 'lesson2', 'learn-money-group2', 'learn-money', 'Đổi tiền', false, 2),
  ('learn-money-group2-lesson3', 'lesson3', 'learn-money-group2', 'learn-money', 'Ai nhiều hơn?', false, 3),
  ('learn-money-group2-lesson4', 'lesson4', 'learn-money-group2', 'learn-money', 'Tiết kiệm', false, 4),
  ('learn-money-group3-lesson1', 'lesson1', 'learn-money-group3', 'learn-money', 'Mua 1 món', true, 1),
  ('learn-money-group3-lesson2', 'lesson2', 'learn-money-group3', 'learn-money', 'Gộp tiền', false, 2),
  ('learn-money-group3-lesson3', 'lesson3', 'learn-money-group3', 'learn-money', 'Tiền thừa', false, 3)
ON CONFLICT (id) DO UPDATE SET
  title = EXCLUDED.title,
  is_free = EXCLUDED.is_free,
  sort_index = EXCLUDED.sort_index;

-- Quy Luật Lessons
INSERT INTO lessons (id, slug, group_id, course_id, title, is_free, sort_index) VALUES
  ('find-pattern-group1-lesson1', 'lesson1', 'find-pattern-group1', 'find-pattern', 'Học quy luật', true, 1),
  ('find-pattern-group1-lesson2', 'lesson2', 'find-pattern-group1', 'find-pattern', 'Phần tiếp theo?', true, 2),
  ('find-pattern-group1-lesson3', 'lesson3', 'find-pattern-group1', 'find-pattern', 'Điền vào chỗ trống', true, 3),
  ('find-pattern-group2-lesson1', 'lesson1', 'find-pattern-group2', 'find-pattern', 'Học quy luật', true, 1),
  ('find-pattern-group2-lesson2', 'lesson2', 'find-pattern-group2', 'find-pattern', 'Phần tiếp theo?', false, 2),
  ('find-pattern-group2-lesson3', 'lesson3', 'find-pattern-group2', 'find-pattern', 'Điền vào chỗ trống', false, 3)
ON CONFLICT (id) DO UPDATE SET
  title = EXCLUDED.title,
  is_free = EXCLUDED.is_free,
  sort_index = EXCLUDED.sort_index;

-- Bảng chữ cái Lessons
INSERT INTO lessons (id, slug, group_id, course_id, title, is_free, sort_index) VALUES
  ('learn-alphabet-group1-lesson1', 'lesson1', 'learn-alphabet-group1', 'learn-alphabet', 'Học chữ cái', true, 1),
  ('learn-alphabet-group1-lesson2', 'lesson2', 'learn-alphabet-group1', 'learn-alphabet', 'Tập nói', true, 2),
  ('learn-alphabet-group1-lesson3', 'lesson3', 'learn-alphabet-group1', 'learn-alphabet', 'Tập viết', true, 3),
  ('learn-alphabet-group1-lesson4', 'lesson4', 'learn-alphabet-group1', 'learn-alphabet', 'Chữ nào đúng?', false, 4),
  ('learn-alphabet-group1-lesson5', 'lesson5', 'learn-alphabet-group1', 'learn-alphabet', 'Ghép đôi', false, 5),
  ('learn-alphabet-group2-lesson1', 'lesson1', 'learn-alphabet-group2', 'learn-alphabet', 'Học chữ cái', true, 1),
  ('learn-alphabet-group2-lesson2', 'lesson2', 'learn-alphabet-group2', 'learn-alphabet', 'Tập nói', false, 2),
  ('learn-alphabet-group2-lesson3', 'lesson3', 'learn-alphabet-group2', 'learn-alphabet', 'Tập viết', false, 3),
  ('learn-alphabet-group2-lesson4', 'lesson4', 'learn-alphabet-group2', 'learn-alphabet', 'Chữ nào đúng?', false, 4),
  ('learn-alphabet-group2-lesson5', 'lesson5', 'learn-alphabet-group2', 'learn-alphabet', 'Ghép đôi', false, 5),
  ('learn-alphabet-group3-lesson1', 'lesson1', 'learn-alphabet-group3', 'learn-alphabet', 'Học chữ cái', true, 1),
  ('learn-alphabet-group3-lesson2', 'lesson2', 'learn-alphabet-group3', 'learn-alphabet', 'Tập nói', false, 2),
  ('learn-alphabet-group3-lesson3', 'lesson3', 'learn-alphabet-group3', 'learn-alphabet', 'Tập viết', false, 3),
  ('learn-alphabet-group3-lesson4', 'lesson4', 'learn-alphabet-group3', 'learn-alphabet', 'Chữ nào đúng?', false, 4),
  ('learn-alphabet-group3-lesson5', 'lesson5', 'learn-alphabet-group3', 'learn-alphabet', 'Ghép đôi', false, 5)
ON CONFLICT (id) DO UPDATE SET
  title = EXCLUDED.title,
  is_free = EXCLUDED.is_free,
  sort_index = EXCLUDED.sort_index;

-- Điểm khác biệt Lessons
INSERT INTO lessons (id, slug, group_id, course_id, title, is_free, sort_index) VALUES
  ('find-differences-group1-lesson1', 'lesson1', 'find-differences-group1', 'find-differences', 'Phòng khách vui nhộn', true, 1),
  ('find-differences-group1-lesson2', 'lesson2', 'find-differences-group1', 'find-differences', 'Khu vườn thú vị', true, 2),
  ('find-differences-group1-lesson3', 'lesson3', 'find-differences-group1', 'find-differences', 'Bãi biển đầy nắng', true, 3),
  ('find-differences-group1-lesson4', 'lesson4', 'find-differences-group1', 'find-differences', 'Căn bếp ấm cúng', false, 4),
  ('find-differences-group1-lesson5', 'lesson5', 'find-differences-group1', 'find-differences', 'Sân chơi nhộn nhịp', false, 5),
  ('find-differences-group2-lesson1', 'lesson1', 'find-differences-group2', 'find-differences', 'Bầu trời đêm', false, 1),
  ('find-differences-group2-lesson2', 'lesson2', 'find-differences-group2', 'find-differences', 'Thám hiểm vũ trụ', false, 2),
  ('find-differences-group2-lesson3', 'lesson3', 'find-differences-group2', 'find-differences', 'Đại dương sâu thẳm', false, 3),
  ('find-differences-group2-lesson4', 'lesson4', 'find-differences-group2', 'find-differences', 'Khu rừng bí ẩn', false, 4),
  ('find-differences-group2-lesson5', 'lesson5', 'find-differences-group2', 'find-differences', 'Tháp hoa hồng', false, 5)
ON CONFLICT (id) DO UPDATE SET
  title = EXCLUDED.title,
  is_free = EXCLUDED.is_free,
  sort_index = EXCLUDED.sort_index;

-- Hình khác biệt Lessons
INSERT INTO lessons (id, slug, group_id, course_id, title, is_free, sort_index) VALUES
  ('odd-one-out-group1-lesson1', 'lesson1', 'odd-one-out-group1', 'odd-one-out', 'Tìm thử', true, 1),
  ('odd-one-out-group2-lesson1', 'lesson1', 'odd-one-out-group2', 'odd-one-out', 'Tìm thử', true, 1),
  ('odd-one-out-group3-lesson1', 'lesson1', 'odd-one-out-group3', 'odd-one-out', 'Khác loại', true, 1)
ON CONFLICT (id) DO UPDATE SET
  title = EXCLUDED.title,
  is_free = EXCLUDED.is_free,
  sort_index = EXCLUDED.sort_index;

-- Mê Cung Lessons
INSERT INTO lessons (id, slug, group_id, course_id, title, is_free, sort_index) VALUES
  ('maze-runner-group1-lesson1', 'lesson1', 'maze-runner-group1', 'maze-runner', 'Bắt đầu', true, 1),
  ('maze-runner-group2-lesson1', 'lesson1', 'maze-runner-group2', 'maze-runner', 'Bắt đầu', true, 1),
  ('maze-runner-group3-lesson1', 'lesson1', 'maze-runner-group3', 'maze-runner', 'Bắt đầu', true, 1)
ON CONFLICT (id) DO UPDATE SET
  title = EXCLUDED.title,
  is_free = EXCLUDED.is_free,
  sort_index = EXCLUDED.sort_index;

-- Nối Điểm Trí Tuệ Lessons
INSERT INTO lessons (id, slug, group_id, course_id, title, is_free, sort_index) VALUES
  ('line-connect-group1-lesson1', 'lesson1', 'line-connect-group1', 'line-connect', 'Bắt đầu', true, 1),
  ('line-connect-group2-lesson1', 'lesson1', 'line-connect-group2', 'line-connect', 'Bắt đầu', true, 1),
  ('line-connect-group3-lesson1', 'lesson1', 'line-connect-group3', 'line-connect', 'Bắt đầu', true, 1)
ON CONFLICT (id) DO UPDATE SET
  title = EXCLUDED.title,
  is_free = EXCLUDED.is_free,
  sort_index = EXCLUDED.sort_index;

-- Pha Màu Lessons
INSERT INTO lessons (id, slug, group_id, course_id, title, is_free, sort_index) VALUES
  ('mix-color-group1-lesson1', 'lesson1', 'mix-color-group1', 'mix-color', 'Học pha màu', true, 1),
  ('mix-color-group1-lesson2', 'lesson2', 'mix-color-group1', 'mix-color', 'Pha màu nào?', true, 2),
  ('mix-color-group1-lesson3', 'lesson3', 'mix-color-group1', 'mix-color', 'Thử thách pha màu', true, 3),
  ('mix-color-group2-lesson1', 'lesson1', 'mix-color-group2', 'mix-color', 'Học pha màu', true, 1),
  ('mix-color-group2-lesson2', 'lesson2', 'mix-color-group2', 'mix-color', 'Pha màu nào?', false, 2),
  ('mix-color-group2-lesson3', 'lesson3', 'mix-color-group2', 'mix-color', 'Thử thách pha màu', false, 3),
  ('mix-color-group3-lesson1', 'lesson1', 'mix-color-group3', 'mix-color', 'Học pha màu', true, 1),
  ('mix-color-group3-lesson2', 'lesson2', 'mix-color-group3', 'mix-color', 'Pha màu nào?', false, 2),
  ('mix-color-group3-lesson3', 'lesson3', 'mix-color-group3', 'mix-color', 'Thử thách pha màu', false, 3)
ON CONFLICT (id) DO UPDATE SET
  title = EXCLUDED.title,
  is_free = EXCLUDED.is_free,
  sort_index = EXCLUDED.sort_index;

-- Tô Màu Lessons
INSERT INTO lessons (id, slug, group_id, course_id, title, is_free, sort_index) VALUES
  ('paint-picture-group1-lesson1', 'lesson1', 'paint-picture-group1', 'paint-picture', 'Tô tự do', true, 1),
  ('paint-picture-group1-lesson2', 'lesson2', 'paint-picture-group1', 'paint-picture', 'Hoạ Khám Phá', true, 2),
  ('paint-picture-group2-lesson1', 'lesson1', 'paint-picture-group2', 'paint-picture', 'Tô tự do', true, 1),
  ('paint-picture-group2-lesson2', 'lesson2', 'paint-picture-group2', 'paint-picture', 'Hoạ Khám Phá', false, 2),
  ('paint-picture-group3-lesson1', 'lesson1', 'paint-picture-group3', 'paint-picture', 'Tô tự do', true, 1),
  ('paint-picture-group3-lesson2', 'lesson2', 'paint-picture-group3', 'paint-picture', 'Hoạ Khám Phá', false, 2)
ON CONFLICT (id) DO UPDATE SET
  title = EXCLUDED.title,
  is_free = EXCLUDED.is_free,
  sort_index = EXCLUDED.sort_index;

-- Xem Đồng Hồ Lessons
INSERT INTO lessons (id, slug, group_id, course_id, title, is_free, sort_index) VALUES
  ('learn-clock-group1-lesson1', 'lesson1', 'learn-clock-group1', 'learn-clock', 'Làm quen đồng hồ', true, 1),
  ('learn-clock-group1-lesson2', 'lesson2', 'learn-clock-group1', 'learn-clock', 'Chọn đúng giờ', true, 2),
  ('learn-clock-group1-lesson3', 'lesson3', 'learn-clock-group1', 'learn-clock', 'Chỉnh kim đồng hồ', true, 3),
  ('learn-clock-group1-lesson4', 'lesson4', 'learn-clock-group1', 'learn-clock', 'Giờ nào làm gì?', true, 4),
  ('learn-clock-group2-lesson1', 'lesson1', 'learn-clock-group2', 'learn-clock', 'Làm quen đồng hồ', true, 1),
  ('learn-clock-group2-lesson2', 'lesson2', 'learn-clock-group2', 'learn-clock', 'Chọn đúng giờ', false, 2)
ON CONFLICT (id) DO UPDATE SET
  title = EXCLUDED.title,
  is_free = EXCLUDED.is_free,
  sort_index = EXCLUDED.sort_index;

-- Đàn Piano Tí Hon Lessons
INSERT INTO lessons (id, slug, group_id, course_id, title, is_free, sort_index) VALUES
  ('mini-piano-creative-sounds-classic-piano', 'classic-piano', 'mini-piano-creative-sounds', 'mini-piano', 'Piano cổ điển', true, 1),
  ('mini-piano-mini-musician-kia-con-buom-vang', 'kia-con-buom-vang', 'mini-piano-mini-musician', 'mini-piano', 'Kìa con bướm vàng', true, 1),
  ('mini-piano-mini-musician-happy-birthday', 'happy-birthday', 'mini-piano-mini-musician', 'mini-piano', 'Chúc mừng sinh nhật', true, 2),
  ('mini-piano-mini-musician-ngoi-sao-lap-lanh', 'ngoi-sao-lap-lanh', 'mini-piano-mini-musician', 'mini-piano', 'Ngôi sao lấp lánh', true, 3),
  ('mini-piano-mini-musician-ba-oi-ba', 'ba-oi-ba', 'mini-piano-mini-musician', 'mini-piano', 'Bà ơi bà', false, 4),
  ('mini-piano-mini-musician-doi-ken-ti-hon', 'doi-ken-ti-hon', 'mini-piano-mini-musician', 'mini-piano', 'Đội kèn tí hon', false, 5),
  ('mini-piano-ear-training-find-the-note', 'find-the-note', 'mini-piano-ear-training', 'mini-piano', 'Tìm nốt nhạc đúng', true, 1),
  ('mini-piano-ear-training-repeat-melody', 'repeat-melody', 'mini-piano-ear-training', 'mini-piano', 'Lặp lại giai điệu', false, 2)
ON CONFLICT (id) DO UPDATE SET
  title = EXCLUDED.title,
  is_free = EXCLUDED.is_free,
  sort_index = EXCLUDED.sort_index;

-- Ghép Vần Lessons
INSERT INTO lessons (id, slug, group_id, course_id, title, is_free, sort_index) VALUES
  ('learn-syllable-group1-lesson1', 'lesson1', 'learn-syllable-group1', 'learn-syllable', 'Học vần', true, 1),
  ('learn-syllable-group1-lesson2', 'lesson2', 'learn-syllable-group1', 'learn-syllable', 'Chọn vần đúng', true, 2),
  ('learn-syllable-group1-lesson3', 'lesson3', 'learn-syllable-group1', 'learn-syllable', 'Tập phát âm', true, 3),
  ('learn-syllable-group2-lesson1', 'lesson1', 'learn-syllable-group2', 'learn-syllable', 'Học vần', true, 1),
  ('learn-syllable-group2-lesson2', 'lesson2', 'learn-syllable-group2', 'learn-syllable', 'Chọn vần đúng', false, 2),
  ('learn-syllable-group2-lesson3', 'lesson3', 'learn-syllable-group2', 'learn-syllable', 'Tập phát âm', false, 3),
  ('learn-syllable-group3-lesson1', 'lesson1', 'learn-syllable-group3', 'learn-syllable', 'Học vần', true, 1),
  ('learn-syllable-group3-lesson2', 'lesson2', 'learn-syllable-group3', 'learn-syllable', 'Chọn vần đúng', false, 2),
  ('learn-syllable-group3-lesson3', 'lesson3', 'learn-syllable-group3', 'learn-syllable', 'Tập phát âm', false, 3),
  ('learn-syllable-group4-lesson1', 'lesson1', 'learn-syllable-group4', 'learn-syllable', 'Học vần', true, 1),
  ('learn-syllable-group4-lesson2', 'lesson2', 'learn-syllable-group4', 'learn-syllable', 'Chọn vần đúng', false, 2),
  ('learn-syllable-group4-lesson3', 'lesson3', 'learn-syllable-group4', 'learn-syllable', 'Tập phát âm', false, 3),
  ('learn-syllable-group5-lesson1', 'lesson1', 'learn-syllable-group5', 'learn-syllable', 'Học vần', true, 1),
  ('learn-syllable-group5-lesson2', 'lesson2', 'learn-syllable-group5', 'learn-syllable', 'Chọn vần đúng', false, 2),
  ('learn-syllable-group5-lesson3', 'lesson3', 'learn-syllable-group5', 'learn-syllable', 'Tập phát âm', false, 3),
  ('learn-syllable-group6-lesson1', 'lesson1', 'learn-syllable-group6', 'learn-syllable', 'Học vần', true, 1),
  ('learn-syllable-group6-lesson2', 'lesson2', 'learn-syllable-group6', 'learn-syllable', 'Chọn vần đúng', false, 2),
  ('learn-syllable-group6-lesson3', 'lesson3', 'learn-syllable-group6', 'learn-syllable', 'Tập phát âm', false, 3)
ON CONFLICT (id) DO UPDATE SET
  title = EXCLUDED.title,
  is_free = EXCLUDED.is_free,
  sort_index = EXCLUDED.sort_index;

-- Địa Hình Lessons
INSERT INTO lessons (id, slug, group_id, course_id, title, is_free, sort_index) VALUES
  ('learn-terrain-group1-lesson1', 'lesson1', 'learn-terrain-group1', 'learn-terrain', 'Khám phá địa hình', true, 1),
  ('learn-terrain-group1-lesson2', 'lesson2', 'learn-terrain-group1', 'learn-terrain', 'Nghe đoán địa hình', true, 2),
  ('learn-terrain-group1-lesson3', 'lesson3', 'learn-terrain-group1', 'learn-terrain', 'Xếp lớp địa hình', true, 3),
  ('learn-terrain-group1-lesson4', 'lesson4', 'learn-terrain-group1', 'learn-terrain', 'Ai sống ở đây?', false, 4),
  ('learn-terrain-group1-lesson5', 'lesson5', 'learn-terrain-group1', 'learn-terrain', 'Phiêu lưu địa hình', false, 5),
  ('learn-terrain-group2-lesson1', 'lesson1', 'learn-terrain-group2', 'learn-terrain', 'Khám phá địa hình', true, 1),
  ('learn-terrain-group2-lesson2', 'lesson2', 'learn-terrain-group2', 'learn-terrain', 'Nghe đoán địa hình', false, 2),
  ('learn-terrain-group2-lesson3', 'lesson3', 'learn-terrain-group2', 'learn-terrain', 'Xếp lớp địa hình', false, 3),
  ('learn-terrain-group2-lesson4', 'lesson4', 'learn-terrain-group2', 'learn-terrain', 'Ai sống ở đây?', false, 4),
  ('learn-terrain-group2-lesson5', 'lesson5', 'learn-terrain-group2', 'learn-terrain', 'Phiêu lưu địa hình', false, 5),
  ('learn-terrain-group3-lesson1', 'lesson1', 'learn-terrain-group3', 'learn-terrain', 'Khám phá địa hình', true, 1),
  ('learn-terrain-group3-lesson2', 'lesson2', 'learn-terrain-group3', 'learn-terrain', 'Nghe đoán địa hình', false, 2),
  ('learn-terrain-group3-lesson3', 'lesson3', 'learn-terrain-group3', 'learn-terrain', 'Xếp lớp địa hình', false, 3),
  ('learn-terrain-group3-lesson4', 'lesson4', 'learn-terrain-group3', 'learn-terrain', 'Ai sống ở đây?', false, 4),
  ('learn-terrain-group3-lesson5', 'lesson5', 'learn-terrain-group3', 'learn-terrain', 'Phiêu lưu địa hình', false, 5)
ON CONFLICT (id) DO UPDATE SET
  title = EXCLUDED.title,
  is_free = EXCLUDED.is_free,
  sort_index = EXCLUDED.sort_index;

-- Bộ Phận Cơ Thể Lessons
INSERT INTO lessons (id, slug, group_id, course_id, title, is_free, sort_index) VALUES
  ('learn-body-group1-lesson1', 'lesson1', 'learn-body-group1', 'learn-body', 'Khám phá cơ thể', true, 1),
  ('learn-body-group1-lesson2', 'lesson2', 'learn-body-group1', 'learn-body', 'Chạm và nói', true, 2),
  ('learn-body-group1-lesson3', 'lesson3', 'learn-body-group1', 'learn-body', 'Tập nói', true, 3),
  ('learn-body-group1-lesson4', 'lesson4', 'learn-body-group1', 'learn-body', 'Đây là gì?', false, 4),
  ('learn-body-group1-lesson5', 'lesson5', 'learn-body-group1', 'learn-body', 'Cơ thể làm gì?', false, 5),
  ('learn-body-group1-lesson6', 'lesson6', 'learn-body-group1', 'learn-body', 'Ghép đôi', false, 6),
  ('learn-body-group2-lesson1', 'lesson1', 'learn-body-group2', 'learn-body', 'Khám phá cơ thể', true, 1),
  ('learn-body-group2-lesson2', 'lesson2', 'learn-body-group2', 'learn-body', 'Chạm và nói', false, 2),
  ('learn-body-group2-lesson3', 'lesson3', 'learn-body-group2', 'learn-body', 'Tập nói', false, 3),
  ('learn-body-group2-lesson4', 'lesson4', 'learn-body-group2', 'learn-body', 'Đây là gì?', false, 4),
  ('learn-body-group2-lesson5', 'lesson5', 'learn-body-group2', 'learn-body', 'Cơ thể làm gì?', false, 5),
  ('learn-body-group2-lesson6', 'lesson6', 'learn-body-group2', 'learn-body', 'Ghép đôi', false, 6),
  ('learn-body-group3-lesson1', 'lesson1', 'learn-body-group3', 'learn-body', 'Khám phá cơ thể', true, 1),
  ('learn-body-group3-lesson2', 'lesson2', 'learn-body-group3', 'learn-body', 'Chạm và nói', false, 2),
  ('learn-body-group3-lesson3', 'lesson3', 'learn-body-group3', 'learn-body', 'Tập nói', false, 3),
  ('learn-body-group3-lesson4', 'lesson4', 'learn-body-group3', 'learn-body', 'Đây là gì?', false, 4),
  ('learn-body-group3-lesson5', 'lesson5', 'learn-body-group3', 'learn-body', 'Cơ thể làm gì?', false, 5),
  ('learn-body-group3-lesson6', 'lesson6', 'learn-body-group3', 'learn-body', 'Ghép đôi', false, 6)
ON CONFLICT (id) DO UPDATE SET
  title = EXCLUDED.title,
  is_free = EXCLUDED.is_free,
  sort_index = EXCLUDED.sort_index;

-- Dọn Dẹp Lessons
INSERT INTO lessons (id, slug, group_id, course_id, title, is_free, sort_index) VALUES
  ('learn-cleaning-group1-lesson1', 'lesson1', 'learn-cleaning-group1', 'learn-cleaning', 'Học dọn dẹp', true, 1),
  ('learn-cleaning-group1-lesson2', 'lesson2', 'learn-cleaning-group1', 'learn-cleaning', 'Tập nói', true, 2),
  ('learn-cleaning-group1-lesson3', 'lesson3', 'learn-cleaning-group1', 'learn-cleaning', 'Đúng hay Sai?', true, 3),
  ('learn-cleaning-group1-lesson4', 'lesson4', 'learn-cleaning-group1', 'learn-cleaning', 'Sắp xếp thứ tự', true, 4),
  ('learn-cleaning-group2-lesson1', 'lesson1', 'learn-cleaning-group2', 'learn-cleaning', 'Học dọn dẹp', true, 1),
  ('learn-cleaning-group2-lesson2', 'lesson2', 'learn-cleaning-group2', 'learn-cleaning', 'Tập nói', false, 2),
  ('learn-cleaning-group2-lesson3', 'lesson3', 'learn-cleaning-group2', 'learn-cleaning', 'Đúng hay Sai?', false, 3),
  ('learn-cleaning-group2-lesson4', 'lesson4', 'learn-cleaning-group2', 'learn-cleaning', 'Sắp xếp thứ tự', false, 4),
  ('learn-cleaning-group3-lesson1', 'lesson1', 'learn-cleaning-group3', 'learn-cleaning', 'Học phân loại', true, 1),
  ('learn-cleaning-group3-lesson2', 'lesson2', 'learn-cleaning-group3', 'learn-cleaning', 'Tập nói', false, 2),
  ('learn-cleaning-group3-lesson3', 'lesson3', 'learn-cleaning-group3', 'learn-cleaning', 'Đúng hay Sai?', false, 3),
  ('learn-cleaning-group3-lesson4', 'lesson4', 'learn-cleaning-group3', 'learn-cleaning', 'Sắp xếp thứ tự', false, 4)
ON CONFLICT (id) DO UPDATE SET
  title = EXCLUDED.title,
  is_free = EXCLUDED.is_free,
  sort_index = EXCLUDED.sort_index;

-- Học Nốt Nhạc Lessons
INSERT INTO lessons (id, slug, group_id, course_id, title, is_free, sort_index) VALUES
  ('learn-notes-basic-notes-lesson1', 'lesson1', 'learn-notes-basic-notes', 'learn-notes', 'Học nốt nhạc', true, 1),
  ('learn-notes-basic-notes-lesson2', 'lesson2', 'learn-notes-basic-notes', 'learn-notes', 'Nghe và chọn', true, 2),
  ('learn-notes-basic-notes-lesson3', 'lesson3', 'learn-notes-basic-notes', 'learn-notes', 'Nốt nào đúng?', true, 3),
  ('learn-notes-basic-notes-lesson4', 'lesson4', 'learn-notes-basic-notes', 'learn-notes', 'Sắp xếp nốt', false, 4),
  ('learn-notes-advanced-notes-lesson1', 'lesson1', 'learn-notes-advanced-notes', 'learn-notes', 'Học nốt nhạc', true, 1),
  ('learn-notes-advanced-notes-lesson2', 'lesson2', 'learn-notes-advanced-notes', 'learn-notes', 'Nghe và chọn', false, 2),
  ('learn-notes-advanced-notes-lesson3', 'lesson3', 'learn-notes-advanced-notes', 'learn-notes', 'Nốt nào đúng?', false, 3),
  ('learn-notes-advanced-notes-lesson4', 'lesson4', 'learn-notes-advanced-notes', 'learn-notes', 'Sắp xếp nốt', false, 4),
  ('learn-notes-practice-lesson1', 'lesson1', 'learn-notes-practice', 'learn-notes', 'Nghe và chọn', true, 1),
  ('learn-notes-practice-lesson2', 'lesson2', 'learn-notes-practice', 'learn-notes', 'Sắp xếp giai điệu', false, 2)
ON CONFLICT (id) DO UPDATE SET
  title = EXCLUDED.title,
  is_free = EXCLUDED.is_free,
  sort_index = EXCLUDED.sort_index;

-- Đồ Vật Nguy Hiểm Lessons
INSERT INTO lessons (id, slug, group_id, course_id, title, is_free, sort_index) VALUES
  ('learn-danger-group1-lesson1', 'lesson1', 'learn-danger-group1', 'learn-danger', 'Học tên đồ vật', true, 1),
  ('learn-danger-group1-lesson2', 'lesson2', 'learn-danger-group1', 'learn-danger', 'Khám phá ngôi nhà', true, 2),
  ('learn-danger-group1-lesson3', 'lesson3', 'learn-danger-group1', 'learn-danger', 'Tình huống', true, 3),
  ('learn-danger-group1-lesson4', 'lesson4', 'learn-danger-group1', 'learn-danger', 'Hành động an toàn', false, 4),
  ('learn-danger-group1-lesson5', 'lesson5', 'learn-danger-group1', 'learn-danger', 'Đúng hay Sai?', false, 5),
  ('learn-danger-group2-lesson1', 'lesson1', 'learn-danger-group2', 'learn-danger', 'Học tên đồ vật', true, 1),
  ('learn-danger-group2-lesson2', 'lesson2', 'learn-danger-group2', 'learn-danger', 'Khám phá ngôi nhà', false, 2),
  ('learn-danger-group2-lesson3', 'lesson3', 'learn-danger-group2', 'learn-danger', 'Tình huống', false, 3),
  ('learn-danger-group2-lesson4', 'lesson4', 'learn-danger-group2', 'learn-danger', 'Hành động an toàn', false, 4),
  ('learn-danger-group2-lesson5', 'lesson5', 'learn-danger-group2', 'learn-danger', 'Đúng hay Sai?', false, 5),
  ('learn-danger-group3-lesson1', 'lesson1', 'learn-danger-group3', 'learn-danger', 'Học tên đồ vật', true, 1),
  ('learn-danger-group3-lesson2', 'lesson2', 'learn-danger-group3', 'learn-danger', 'Khám phá ngôi nhà', false, 2),
  ('learn-danger-group3-lesson3', 'lesson3', 'learn-danger-group3', 'learn-danger', 'Tình huống', false, 3),
  ('learn-danger-group3-lesson4', 'lesson4', 'learn-danger-group3', 'learn-danger', 'Hành động an toàn', false, 4),
  ('learn-danger-group3-lesson5', 'lesson5', 'learn-danger-group3', 'learn-danger', 'Đúng hay Sai?', false, 5)
ON CONFLICT (id) DO UPDATE SET
  title = EXCLUDED.title,
  is_free = EXCLUDED.is_free,
  sort_index = EXCLUDED.sort_index;

-- Sudoku Lessons
INSERT INTO lessons (id, slug, group_id, course_id, title, is_free, sort_index) VALUES
  ('mini-sudoku-kids-group1-lesson1', 'lesson1', 'mini-sudoku-kids-group1', 'mini-sudoku-kids', 'Học luật chơi', true, 1),
  ('mini-sudoku-kids-group1-lesson2', 'lesson2', 'mini-sudoku-kids-group1', 'mini-sudoku-kids', 'Điền ô còn thiếu', true, 2),
  ('mini-sudoku-kids-group1-lesson3', 'lesson3', 'mini-sudoku-kids-group1', 'mini-sudoku-kids', 'Chọn đáp án đúng', true, 3),
  ('mini-sudoku-kids-group1-lesson4', 'lesson4', 'mini-sudoku-kids-group1', 'mini-sudoku-kids', 'Thử thách nhanh', false, 4),
  ('mini-sudoku-kids-group2-lesson1', 'lesson1', 'mini-sudoku-kids-group2', 'mini-sudoku-kids', 'Tìm hình còn thiếu', true, 1),
  ('mini-sudoku-kids-group2-lesson2', 'lesson2', 'mini-sudoku-kids-group2', 'mini-sudoku-kids', 'Điền theo hàng và cột', false, 2),
  ('mini-sudoku-kids-group2-lesson3', 'lesson3', 'mini-sudoku-kids-group2', 'mini-sudoku-kids', 'Luyện phản xạ', false, 3),
  ('mini-sudoku-kids-group2-lesson4', 'lesson4', 'mini-sudoku-kids-group2', 'mini-sudoku-kids', 'Vượt màn logic', false, 4),
  ('mini-sudoku-kids-group3-lesson1', 'lesson1', 'mini-sudoku-kids-group3', 'mini-sudoku-kids', 'Điền màu đúng', true, 1),
  ('mini-sudoku-kids-group3-lesson2', 'lesson2', 'mini-sudoku-kids-group3', 'mini-sudoku-kids', 'Tránh trùng màu', false, 2),
  ('mini-sudoku-kids-group3-lesson3', 'lesson3', 'mini-sudoku-kids-group3', 'mini-sudoku-kids', 'Màn hỗn hợp', false, 3),
  ('mini-sudoku-kids-group3-lesson4', 'lesson4', 'mini-sudoku-kids-group3', 'mini-sudoku-kids', 'Thử thách cuối', false, 4),
  ('mini-sudoku-kids-group4-lesson1', 'lesson1', 'mini-sudoku-kids-group4', 'mini-sudoku-kids', 'Nhận diện con vật', true, 1),
  ('mini-sudoku-kids-group4-lesson2', 'lesson2', 'mini-sudoku-kids-group4', 'mini-sudoku-kids', 'Tìm ô đúng', false, 2),
  ('mini-sudoku-kids-group4-lesson3', 'lesson3', 'mini-sudoku-kids-group4', 'mini-sudoku-kids', 'Suy luận nhanh', false, 3),
  ('mini-sudoku-kids-group4-lesson4', 'lesson4', 'mini-sudoku-kids-group4', 'mini-sudoku-kids', 'Bé siêu logic', false, 4)
ON CONFLICT (id) DO UPDATE SET
  title = EXCLUDED.title,
  is_free = EXCLUDED.is_free,
  sort_index = EXCLUDED.sort_index;

-- Học Từ Vựng Lessons
INSERT INTO lessons (id, slug, group_id, course_id, title, is_free, sort_index) VALUES
  ('learn-english-vocab-group1-lesson1', 'lesson1', 'learn-english-vocab-group1', 'learn-english-vocab', 'Học từ vựng', true, 1),
  ('learn-english-vocab-group1-lesson2', 'lesson2', 'learn-english-vocab-group1', 'learn-english-vocab', 'Tập nói', true, 2),
  ('learn-english-vocab-group1-lesson3', 'lesson3', 'learn-english-vocab-group1', 'learn-english-vocab', 'Nghe & Chọn', true, 3),
  ('learn-english-vocab-group1-lesson4', 'lesson4', 'learn-english-vocab-group1', 'learn-english-vocab', 'Ghép từ', false, 4),
  ('learn-english-vocab-group1-lesson5', 'lesson5', 'learn-english-vocab-group1', 'learn-english-vocab', 'Kiểm tra', false, 5),
  ('learn-english-vocab-group2-lesson1', 'lesson1', 'learn-english-vocab-group2', 'learn-english-vocab', 'Học từ vựng', true, 1),
  ('learn-english-vocab-group2-lesson2', 'lesson2', 'learn-english-vocab-group2', 'learn-english-vocab', 'Tập nói', false, 2),
  ('learn-english-vocab-group2-lesson3', 'lesson3', 'learn-english-vocab-group2', 'learn-english-vocab', 'Nghe & Chọn', false, 3),
  ('learn-english-vocab-group2-lesson4', 'lesson4', 'learn-english-vocab-group2', 'learn-english-vocab', 'Ghép từ', false, 4),
  ('learn-english-vocab-group2-lesson5', 'lesson5', 'learn-english-vocab-group2', 'learn-english-vocab', 'Kiểm tra', false, 5),
  ('learn-english-vocab-group3-lesson1', 'lesson1', 'learn-english-vocab-group3', 'learn-english-vocab', 'Học từ vựng', true, 1),
  ('learn-english-vocab-group3-lesson2', 'lesson2', 'learn-english-vocab-group3', 'learn-english-vocab', 'Tập nói', false, 2),
  ('learn-english-vocab-group3-lesson3', 'lesson3', 'learn-english-vocab-group3', 'learn-english-vocab', 'Nghe & Chọn', false, 3),
  ('learn-english-vocab-group3-lesson4', 'lesson4', 'learn-english-vocab-group3', 'learn-english-vocab', 'Ghép từ', false, 4),
  ('learn-english-vocab-group3-lesson5', 'lesson5', 'learn-english-vocab-group3', 'learn-english-vocab', 'Kiểm tra', false, 5),
  ('learn-english-vocab-group4-lesson1', 'lesson1', 'learn-english-vocab-group4', 'learn-english-vocab', 'Học từ vựng', true, 1),
  ('learn-english-vocab-group4-lesson2', 'lesson2', 'learn-english-vocab-group4', 'learn-english-vocab', 'Tập nói', false, 2),
  ('learn-english-vocab-group4-lesson3', 'lesson3', 'learn-english-vocab-group4', 'learn-english-vocab', 'Nghe & Chọn', false, 3),
  ('learn-english-vocab-group4-lesson4', 'lesson4', 'learn-english-vocab-group4', 'learn-english-vocab', 'Ghép từ', false, 4),
  ('learn-english-vocab-group4-lesson5', 'lesson5', 'learn-english-vocab-group4', 'learn-english-vocab', 'Kiểm tra', false, 5),
  ('learn-english-vocab-group5-lesson1', 'lesson1', 'learn-english-vocab-group5', 'learn-english-vocab', 'Học từ vựng', true, 1),
  ('learn-english-vocab-group5-lesson2', 'lesson2', 'learn-english-vocab-group5', 'learn-english-vocab', 'Tập nói', false, 2),
  ('learn-english-vocab-group5-lesson3', 'lesson3', 'learn-english-vocab-group5', 'learn-english-vocab', 'Nghe & Chọn', false, 3),
  ('learn-english-vocab-group5-lesson4', 'lesson4', 'learn-english-vocab-group5', 'learn-english-vocab', 'Ghép từ', false, 4),
  ('learn-english-vocab-group5-lesson5', 'lesson5', 'learn-english-vocab-group5', 'learn-english-vocab', 'Kiểm tra', false, 5),
  ('learn-english-vocab-group6-lesson1', 'lesson1', 'learn-english-vocab-group6', 'learn-english-vocab', 'Học từ vựng', true, 1),
  ('learn-english-vocab-group6-lesson2', 'lesson2', 'learn-english-vocab-group6', 'learn-english-vocab', 'Tập nói', false, 2),
  ('learn-english-vocab-group6-lesson3', 'lesson3', 'learn-english-vocab-group6', 'learn-english-vocab', 'Nghe & Chọn', false, 3),
  ('learn-english-vocab-group6-lesson4', 'lesson4', 'learn-english-vocab-group6', 'learn-english-vocab', 'Ghép từ', false, 4),
  ('learn-english-vocab-group6-lesson5', 'lesson5', 'learn-english-vocab-group6', 'learn-english-vocab', 'Kiểm tra', false, 5),
  ('learn-english-vocab-group7-lesson1', 'lesson1', 'learn-english-vocab-group7', 'learn-english-vocab', 'Học từ vựng', true, 1),
  ('learn-english-vocab-group7-lesson2', 'lesson2', 'learn-english-vocab-group7', 'learn-english-vocab', 'Tập nói', false, 2),
  ('learn-english-vocab-group7-lesson3', 'lesson3', 'learn-english-vocab-group7', 'learn-english-vocab', 'Nghe & Chọn', false, 3),
  ('learn-english-vocab-group7-lesson4', 'lesson4', 'learn-english-vocab-group7', 'learn-english-vocab', 'Ghép từ', false, 4),
  ('learn-english-vocab-group7-lesson5', 'lesson5', 'learn-english-vocab-group7', 'learn-english-vocab', 'Kiểm tra', false, 5)
ON CONFLICT (id) DO UPDATE SET
  title = EXCLUDED.title,
  is_free = EXCLUDED.is_free,
  sort_index = EXCLUDED.sort_index;

-- Bảng Chữ Cái Lessons
INSERT INTO lessons (id, slug, group_id, course_id, title, is_free, sort_index) VALUES
  ('learn-english-alphabet-group1-lesson1', 'lesson1', 'learn-english-alphabet-group1', 'learn-english-alphabet', 'Học chữ cái', true, 1),
  ('learn-english-alphabet-group1-lesson2', 'lesson2', 'learn-english-alphabet-group1', 'learn-english-alphabet', 'Tập nói', true, 2),
  ('learn-english-alphabet-group1-lesson3', 'lesson3', 'learn-english-alphabet-group1', 'learn-english-alphabet', 'Nghe & Chọn', true, 3),
  ('learn-english-alphabet-group1-lesson4', 'lesson4', 'learn-english-alphabet-group1', 'learn-english-alphabet', 'Ghép từ', false, 4),
  ('learn-english-alphabet-group1-lesson5', 'lesson5', 'learn-english-alphabet-group1', 'learn-english-alphabet', 'Kiểm tra', false, 5),
  ('learn-english-alphabet-group2-lesson1', 'lesson1', 'learn-english-alphabet-group2', 'learn-english-alphabet', 'Học chữ cái', true, 1),
  ('learn-english-alphabet-group2-lesson2', 'lesson2', 'learn-english-alphabet-group2', 'learn-english-alphabet', 'Tập nói', false, 2),
  ('learn-english-alphabet-group2-lesson3', 'lesson3', 'learn-english-alphabet-group2', 'learn-english-alphabet', 'Nghe & Chọn', false, 3),
  ('learn-english-alphabet-group2-lesson4', 'lesson4', 'learn-english-alphabet-group2', 'learn-english-alphabet', 'Ghép từ', false, 4),
  ('learn-english-alphabet-group2-lesson5', 'lesson5', 'learn-english-alphabet-group2', 'learn-english-alphabet', 'Kiểm tra', false, 5)
ON CONFLICT (id) DO UPDATE SET
  title = EXCLUDED.title,
  is_free = EXCLUDED.is_free,
  sort_index = EXCLUDED.sort_index;

-- Giao Tiếp Lessons
INSERT INTO lessons (id, slug, group_id, course_id, title, is_free, sort_index) VALUES
  ('talk-with-owl-group1-lesson1', 'lesson1', 'talk-with-owl-group1', 'talk-with-owl', 'Chào hỏi', true, 1),
  ('talk-with-owl-group2-lesson1', 'lesson1', 'talk-with-owl-group2', 'talk-with-owl', 'Trái cây', true, 1),
  ('talk-with-owl-group3-lesson1', 'lesson1', 'talk-with-owl-group3', 'talk-with-owl', 'Màu sắc', true, 1),
  ('talk-with-owl-group4-lesson1', 'lesson1', 'talk-with-owl-group4', 'talk-with-owl', 'Số đếm', true, 1),
  ('talk-with-owl-group5-lesson1', 'lesson1', 'talk-with-owl-group5', 'talk-with-owl', 'Động vật', true, 1),
  ('talk-with-owl-group6-lesson1', 'lesson1', 'talk-with-owl-group6', 'talk-with-owl', 'Đồ ăn', true, 1),
  ('talk-with-owl-group7-lesson1', 'lesson1', 'talk-with-owl-group7', 'talk-with-owl', 'Giao thông', true, 1),
  ('talk-with-owl-group8-lesson1', 'lesson1', 'talk-with-owl-group8', 'talk-with-owl', 'Gia đình', true, 1),
  ('talk-with-owl-group9-lesson1', 'lesson1', 'talk-with-owl-group9', 'talk-with-owl', 'Cơ thể', true, 1),
  ('talk-with-owl-group10-lesson1', 'lesson1', 'talk-with-owl-group10', 'talk-with-owl', 'Dụng cụ học tập', true, 1)
ON CONFLICT (id) DO UPDATE SET
  title = EXCLUDED.title,
  is_free = EXCLUDED.is_free,
  sort_index = EXCLUDED.sort_index;

-- ============================================
-- VERIFY DATA
-- ============================================
SELECT
  c.title as course,
  g.title as "group",
  l.title as lesson,
  l.is_free,
  l.sort_index
FROM lessons l
JOIN groups g ON l.group_id = g.id
JOIN courses c ON l.course_id = c.id
ORDER BY c.sort_index, g.sort_index, l.sort_index;
