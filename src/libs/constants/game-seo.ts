/**
 * SEO data for all game pages.
 * Used to generate metadata, JSON-LD, and SEO description sections.
 */

import { COURSES } from "@/libs/constants/courses";
import { GROUPS } from "@/libs/constants/groups";

export interface GameSeoData {
  title: string;
  description: string;
  keywords: string[];
  seoText: string;
  seoFeatures: string[];
  ogImage: string;
  relatedGames: string[];
  relatedBlogs: { slug: string; title: string }[];
  videoUrl?: string;
}

type SeoOverride = Partial<Pick<GameSeoData, "title" | "description">>;

function stripBrandSuffix(title: string): string {
  return title.replace(/\s*-\s*Trò chơi giáo dục Cú Thông Minh$/i, "").trim();
}

function buildMetaTitle(gameId: string, title: string): string {
  const course = COURSES.find((item) => item.id === gameId);
  const topic = course ? GROUPS.find((group) => group.id === course.type) : undefined;

  if (!topic) {
    return stripBrandSuffix(title);
  }

  return `${stripBrandSuffix(title)} | Chủ đề ${topic.title}`;
}

function buildMetaDescription(gameId: string, description: string): string {
  const MAX_LENGTH = 155;
  const course = COURSES.find((item) => item.id === gameId);
  if (!course) {
    return description.length > MAX_LENGTH ? description.slice(0, MAX_LENGTH - 1).trimEnd() + "…" : description;
  }

  const lessonThemes = course.groups
    .slice(0, 3)
    .map((group) => group.title)
    .join(", ");

  if (!lessonThemes) {
    return description.length > MAX_LENGTH ? description.slice(0, MAX_LENGTH - 1).trimEnd() + "…" : description;
  }

  const normalizedDescription = description.endsWith(".") ? description.slice(0, -1) : description;
  const full = `${normalizedDescription}. Chủ đề nổi bật: ${lessonThemes}.`;

  if (full.length <= MAX_LENGTH) {
    return full;
  }

  // If too long, return just the base description (truncated if needed)
  const base = normalizedDescription + ".";
  return base.length > MAX_LENGTH ? base.slice(0, MAX_LENGTH - 1).trimEnd() + "…" : base;
}

const SEO_OVERRIDES: Record<string, SeoOverride> = {
  "learn-numbers": {
    title: "Bé Học Đếm Số 1-20 | Trò Chơi Toán Cho Trẻ Mầm Non",
    description: "Game học số giúp bé nhận biết số 1-20, đếm đồ vật và tập viết số qua 5 cấp độ từ dễ đến khó.",
  },
  "compare-quantity": {
    title: "So Sánh Lớn Hơn Nhỏ Hơn | Game Toán Tư Duy Cho Bé",
    description:
      "Bé học so sánh nhiều hơn, ít hơn và bằng nhau qua hình ảnh trực quan, luyện phản xạ và tư duy toán học sớm.",
  },
  "learn-math": {
    title: "Phép Cộng Trừ Đơn Giản | Game Toán Cho Bé 3-8 Tuổi",
    description:
      "Bé học phép cộng trừ trong phạm vi 20 bằng hình ảnh minh họa, bài tập tương tác và phần luyện tập theo nhóm.",
  },
  "learn-alphabet": {
    title: "Bảng Chữ Cái Tiếng Việt | Game Học Chữ Cho Bé",
    description:
      "Giúp bé học nguyên âm, phụ âm, tập nói, tập viết và nhận diện chữ cái tiếng Việt qua trò chơi tương tác.",
  },
  "learn-syllable": {
    title: "Ghép Vần Tiếng Việt | Game Tập Đọc Cho Bé",
    description:
      "Bé học ghép vần ie, uo, ươ, oa, uy và nhiều vần khác qua bài học ngắn, dễ nhớ và trò chơi chọn vần đúng.",
  },
  "learn-word": {
    title: "Học Từ Vựng Tiếng Việt | Game Học Tiếng Việt Cho Bé",
    description: "Giúp bé 3-6 tuổi học từ vựng tiếng Việt qua các chủ đề gia đình, trường học, thiên nhiên và đồ dùng.",
  },
  "learn-color": {
    title: "Học Màu Sắc | Trò Chơi Nhận Biết Màu Cho Bé",
    description:
      "Bé nhận biết màu cơ bản và nâng cao, nghe phát âm tên màu và chơi trò tìm màu giống nhau qua hình ảnh sinh động.",
  },
  "learn-shape": {
    title: "Nhận Biết Hình Dạng | Game Hình Học Mầm Non Cho Bé",
    description: "Giúp bé học hình tròn, vuông, tam giác và liên hệ với đồ vật thực tế qua trò chơi hình học vui nhộn.",
  },
  "learn-animal": {
    title: "Học Động Vật | Game Nhận Biết Con Vật Cho Bé",
    description:
      "Bé khám phá động vật nuôi, hoang dã và biển, nghe tên gọi, nhận diện qua hình ảnh và chơi ghép đôi con vật.",
  },
  "learn-vehicle": {
    title: "Phương Tiện Giao Thông | Trò Chơi Nhận Biết Xe Cộ Cho Bé",
    description:
      "Bé học tên các phương tiện đường bộ, đường thủy, hàng không và nhận biết công dụng qua trò chơi tương tác.",
  },
  "learn-weather": {
    title: "Học Thời Tiết Cho Bé | Game Khám Phá Thiên Nhiên",
    description:
      "Bé nhận biết nắng, mưa, gió, cầu vồng và 4 mùa trong năm qua hình ảnh, âm thanh và trò chơi mặc đồ đúng mùa.",
  },
  "find-pattern": {
    title: "Tìm Quy Luật | Game Tư Duy Logic Cho Bé",
    description:
      "Bé rèn tư duy logic bằng cách tìm quy luật màu sắc và hình dạng, điền phần còn thiếu và đoán bước tiếp theo.",
  },
  "find-differences": {
    title: "Tìm Điểm Khác Biệt | Game Quan Sát Cho Bé",
    description:
      "Trò chơi luyện mắt và tăng khả năng quan sát cho bé qua các bức tranh nhiều chủ đề từ dễ đến trung bình.",
  },
  "maze-runner": {
    title: "Mê Cung Cho Bé | Game Phát Triển Tư Duy Không Gian",
    description: "Bé tìm đường trong mê cung từ dễ đến khó, rèn kỹ năng định hướng, lập kế hoạch và giải quyết vấn đề.",
  },
  "learn-money": {
    title: "Bé Học Tiền Việt Nam | Game Tính Tiền Cho Trẻ Mầm Non",
    description:
      "Bé nhận biết 9 mệnh giá tiền giấy Việt Nam từ 1.000đ đến 500.000đ và tập tính tiền qua trò chơi đi chợ.",
  },
  "learn-clock": {
    title: "Học Xem Đồng Hồ | Game Kỹ Năng Sống Cho Bé",
    description:
      "Giúp bé đọc đồng hồ kim, đồng hồ điện tử, chọn đúng giờ và luyện kỹ năng xem giờ qua tương tác trực quan.",
  },
  "learn-english-vocab": {
    title: "Học Từ Vựng Tiếng Anh | Game Tiếng Anh Cho Bé 3-8 Tuổi",
    description:
      "Bé học từ vựng tiếng Anh cơ bản qua flashcard, nghe phát âm và ghép chữ. 7 chủ đề sinh động: động vật, trái cây, màu sắc, số đếm, gia đình, giao thông...",
  },
  "learn-english-alphabet": {
    title: "Bảng Chữ Cái Tiếng Anh | Game Học Chữ Cho Bé",
    description: "Bé học bảng chữ cái tiếng Anh từ A-Z qua hình ảnh minh họa sinh động, nghe phát âm và tập đánh vần từ vựng.",
  },
  "learn-multiply": {
    title: "Trò Chơi Học Toán Phép Nhân | Bảng Cửu Chương 2-9 Cho Bé",
    description:
      "Trò chơi học toán phép nhân và bảng cửu chương từ 2 đến 9 miễn phí cho bé: Cân thăng bằng vật lý, Đại chiến pháo bóng, Thác Plinko hứng quả cực vui!",
  },
  "mini-sudoku-kids": {
    title: "Sudoku Dễ Cho Bé 4-8 Tuổi | Trò Chơi Toán Tư Duy Mầm Non",
    description:
      "Game toán Sudoku dễ cho bé 4, 5, 6 tuổi với lưới 3x3 và 4x4 bằng hình ảnh và con số. Rèn luyện tư duy logic, suy luận miễn phí mỗi ngày.",
  },
  "learn-tones": {
    title: "Học 5 Dấu Thanh Tiếng Việt | Trò Chơi Học Chữ Cho Bé",
    description:
      "Giúp bé 3-6 tuổi nhận biết, phát âm và tập viết 5 dấu thanh tiếng Việt (sắc, huyền, hỏi, ngã, nặng) qua trò chơi tương tác sinh động.",
  },
  "talk-with-owl": {
    title: "Luyện Nói Tiếng Anh Với AI | Game Giao Tiếp Cho Bé 3-8 Tuổi",
    description:
      "Bé luyện nói và giao tiếp tiếng Anh trực tiếp với cô giáo AI Cú Thông Minh qua 10 chủ đề quen thuộc. Sửa phát âm nhẹ nhàng, tự nhiên.",
  },
  "sequence-sort": {
    title: "Trò Chơi Sắp Xếp Thứ Tự | Rèn Tư Duy Logic Cho Bé 3-6 Tuổi",
    description:
      "Bé học sắp xếp từ nhỏ đến lớn, ít đến nhiều và nhạt đến đậm qua trò chơi tương tác vui nhộn, phát triển tư duy so sánh và logic.",
  },
};

const RAW_GAME_SEO: Record<string, GameSeoData> = {
  "learn-tones": {
    title: "Học Dấu Tiếng Việt cho bé - Trò chơi giáo dục Cú Thông Minh",
    description:
      "Bé học nhận biết và phát âm 5 dấu thanh tiếng Việt: sắc, huyền, hỏi, ngã, nặng qua trò chơi tương tác với hình ảnh và âm thanh sinh động.",
    keywords: [
      "học dấu tiếng việt",
      "dấu thanh cho bé",
      "tập viết dấu",
      "giáo dục tiếng việt",
      "5 dấu thanh tiếng việt cho bé",
      "bé tập phát âm dấu sắc huyền hỏi ngã nặng",
      "dạy bé nhận biết dấu thanh",
      "trò chơi học dấu tiếng việt online",
    ],
    seoText:
      "Trò chơi Học Dấu Tiếng Việt giúp bé từ 3-6 tuổi làm quen với 5 dấu thanh: sắc, huyền, hỏi, ngã, nặng. Bé sẽ được nghe phát âm chuẩn, tập nói theo, tập viết dấu và chơi trò chơi nhận diện chữ đúng. Mỗi bài học được thiết kế ngắn gọn, phù hợp với khả năng tập trung của trẻ nhỏ, giúp bé tiếp thu kiến thức một cách tự nhiên và vui vẻ.",
    seoFeatures: [
      "Học phát âm 5 dấu thanh tiếng Việt",
      "Tập viết dấu qua hình ảnh hướng dẫn",
      "Trò chơi nhận diện chữ đúng",
      "Phù hợp bé 3-6 tuổi",
    ],
    ogImage: "https://assets.cuthongminh.com/games/learn-tones/logo.webp",
    relatedGames: ["learn-alphabet", "learn-syllable"],
    relatedBlogs: [
      { slug: "dau-tieng-viet-cho-be", title: "Dấu Tiếng Việt Cho Bé" },
      { slug: "day-be-hoc-bang-chu-cai-tai-nha", title: "Dạy Bé Học Bảng Chữ Cái Tại Nhà" },
    ],
  },
  "learn-word": {
    title: "Học Từ Vựng Tiếng Việt cho bé - Trò chơi giáo dục Cú Thông Minh",
    description:
      "Bé học từ vựng tiếng Việt qua các chủ đề quen thuộc: gia đình, trường học, thiên nhiên, quần áo. Phát triển kỹ năng nghe, nói, đọc, viết toàn diện.",
    keywords: ["học từ vựng tiếng việt", "bé học nói", "trò chơi học chữ cho bé", "từ vựng mầm non"],
    seoText:
      "Trò chơi Học Từ Vựng giúp bé từ 3-6 tuổi làm quen với vô vàn từ vựng tiếng Việt thông qua hình ảnh sinh động và âm thanh chuẩn xác. Bé sẽ được trải nghiệm các bài học đa dạng như học từ, tập phát âm, ghép từ thành tiếng và nghe hiểu, qua đó giúp bé giao tiếp tự tin hơn trong cuộc sống hàng ngày.",
    seoFeatures: [
      "Học từ vựng qua 5 chủ đề thân thuộc",
      "Phát triển kỹ năng nói và phát âm",
      "Trò chơi ghép vần sinh động",
      "Bài tập nghe hiểu trực quan",
    ],
    ogImage: "https://assets.cuthongminh.com/games/learn-word/logo.webp",
    relatedGames: ["learn-syllable", "learn-alphabet", "learn-tones"],
    relatedBlogs: [
      { slug: "day-be-hoc-tu-vung-tieng-viet", title: "5 Cách Dạy Bé Học Từ Vựng Tiếng Việt Ghi Nhớ Nhanh, Phản Xạ Tốt" }
    ],
  },
  "learn-numbers": {
    title: "Học Đếm Số cho bé - Trò chơi giáo dục Cú Thông Minh",
    description:
      "Bé học đếm số từ 1 đến 20 qua hình ảnh sinh động và trò chơi tương tác. Rèn luyện kỹ năng nhận biết số, đếm đồ vật và tập viết số.",
    keywords: [
      "học đếm số",
      "bé học số",
      "đếm 1 đến 20",
      "toán cho bé mầm non",
      "bé tập đếm 1-20 online",
      "dạy trẻ nhận biết con số",
      "bài tập đếm cho trẻ mẫu giáo",
      "tập viết số cho bé 3 tuổi",
      "trò chơi học đếm miễn phí",
    ],
    seoText:
      "Trò chơi Học Đếm Số giúp bé từ 3-6 tuổi làm quen với các con số từ 1 đến 20. Qua các bài học tương tác, bé sẽ học nhận biết số, đếm đồ vật, chọn số đúng và tập viết số. Chương trình chia thành 5 nhóm từ dễ đến khó, giúp bé tiến bộ dần dần theo khả năng của mình.",
    seoFeatures: ["Học nhận biết số từ 1 đến 20", "Đếm đồ vật qua hình ảnh", "Tập viết số", "5 cấp độ từ dễ đến khó"],
    ogImage: "https://assets.cuthongminh.com/games/learn-numbers/number-logo.webp",
    relatedGames: ["compare-quantity", "learn-shape", "learn-math"],
    relatedBlogs: [
      { slug: "cach-day-be-hoc-so", title: "Cách Dạy Bé Học Số" },
      { slug: "day-be-hoc-dem", title: "Cách Dạy Trẻ Mầm Non Học Số" },
      { slug: "be-5-tuoi-can-biet-nhung-gi", title: "Bé 5 Tuổi Cần Biết Những Gì Trước Khi Vào Lớp 1" },
      { slug: "day-be-hoc-qua-tro-choi", title: "Dạy Bé Học Qua Trò Chơi: 7 Phương Pháp Play-Based Learning" },
      { slug: "ap-dung-montessori-tai-nha", title: "Phương Pháp Montessori Tại Nhà Cho Trẻ 3-6 Tuổi" },
    ],
  },
  "compare-quantity": {
    title: "Học So Sánh Số Lượng cho bé - Trò chơi giáo dục Cú Thông Minh",
    description:
      "Bé học so sánh lớn hơn, nhỏ hơn, bằng nhau qua trò chơi tương tác với hình ảnh vui nhộn. Phát triển tư duy toán học sớm cho trẻ.",
    keywords: [
      "so sánh số lượng",
      "lớn hơn nhỏ hơn",
      "toán mầm non",
      "tư duy toán học cho bé",
      "bé học so sánh nhiều ít",
      "bài tập lớn hơn nhỏ hơn bằng nhau",
      "trò chơi toán tư duy cho trẻ 3-6 tuổi",
      "dạy bé so sánh số lượng đồ vật",
    ],
    seoText:
      "Trò chơi So Sánh Số Lượng giúp bé từ 3-6 tuổi hiểu các khái niệm lớn hơn, nhỏ hơn và bằng nhau thông qua hình ảnh trực quan. Bé sẽ so sánh các nhóm đồ vật, luyện tập phản xạ và thử thách bản thân qua các trò chơi hấp dẫn.",
    seoFeatures: [
      "Học khái niệm lớn hơn, nhỏ hơn, bằng nhau",
      "So sánh nhóm đồ vật bằng hình ảnh",
      "Luyện tập và thử thách tư duy",
      "Phù hợp bé 3-6 tuổi",
    ],
    ogImage: "https://assets.cuthongminh.com/games/game-3-logo.webp",
    relatedGames: ["learn-numbers", "learn-shape", "learn-math"],
    relatedBlogs: [
      { slug: "so-sanh-so-luong", title: "Dạy Bé So Sánh Số Lượng" },
      { slug: "so-sanh-lon-nho-nhieu-it-cho-be", title: "So Sánh Lớn Nhỏ, Nhiều Ít Cho Bé" },
    ],
  },
  "learn-color": {
    title: "Học Màu Sắc cho bé - Trò chơi giáo dục Cú Thông Minh",
    description:
      "Bé nhận biết và phân biệt các màu sắc cơ bản và nâng cao qua trò chơi tương tác với hình ảnh sinh động và phát âm chuẩn.",
    keywords: [
      "học màu sắc",
      "bé nhận biết màu",
      "trò chơi màu sắc",
      "giáo dục mầm non",
      "bé học nhận biết màu sắc online",
      "trò chơi nhận biết màu cho trẻ 3 tuổi",
      "dạy bé phân biệt màu đỏ xanh vàng",
      "game học màu sắc cho trẻ mầm non",
      "bé 3 tuổi học màu gì trước",
    ],
    seoText:
      "Trò chơi Học Màu Sắc giúp bé từ 3-6 tuổi nhận biết và phân biệt các màu sắc cơ bản như đỏ, xanh, vàng, cùng các màu nâng cao. Bé sẽ được nghe phát âm tên màu, tìm màu giống nhau và chơi các trò chơi thú vị về màu sắc. Hình ảnh sinh động với các đồ vật quen thuộc giúp bé ghi nhớ dễ dàng.",
    seoFeatures: [
      "Nhận biết màu sắc cơ bản và nâng cao",
      "Phát âm chuẩn tên các màu",
      "Trò chơi tìm màu giống nhau",
      "Hình ảnh đồ vật sinh động",
    ],
    ogImage: "https://assets.cuthongminh.com/games/learn-color-color.webp",
    relatedGames: ["mix-color", "paint-picture"],
    relatedBlogs: [
      { slug: "mau-sac-cho-tre-mau-giao", title: "Màu Sắc Cho Trẻ Mẫu Giáo" },
    ],
  },
  "learn-shape": {
    title: "Học Hình Dạng cho bé - Trò chơi giáo dục Cú Thông Minh",
    description:
      "Bé nhận biết các hình dạng cơ bản và nâng cao qua đồ vật thực tế. Tìm hình giống, ghép hình và chơi trò chơi hình dạng vui nhộn.",
    keywords: [
      "học hình dạng",
      "nhận biết hình",
      "hình tròn vuông tam giác",
      "toán mầm non",
      "bé học nhận biết hình học cơ bản",
      "trò chơi nhận biết hình dạng online",
      "dạy trẻ phân biệt hình tròn vuông",
      "bài tập hình dạng cho bé mẫu giáo",
      "game hình dạng cho trẻ 3-6 tuổi",
    ],
    seoText:
      "Trò chơi Học Hình Dạng giúp bé từ 3-6 tuổi nhận biết các hình dạng như tròn, vuông, tam giác, chữ nhật qua đồ vật thực tế xung quanh. Bé sẽ tìm hình giống nhau, tìm đồ vật có hình dạng tương ứng và chơi trò chơi hình dạng thú vị.",
    seoFeatures: [
      "Nhận biết hình dạng cơ bản và nâng cao",
      "Liên hệ hình dạng với đồ vật thực tế",
      "Trò chơi tìm hình và ghép hình",
      "Phù hợp bé 3-6 tuổi",
    ],
    ogImage: "https://assets.cuthongminh.com/games/learn-shape/learn-shape-logo.webp",
    relatedGames: ["learn-numbers", "compare-quantity", "learn-math"],
    relatedBlogs: [
      { slug: "nhan-biet-hinh-dang", title: "Nhận Biết Hình Dạng Cho Trẻ Mầm Non" },
      { slug: "ap-dung-montessori-tai-nha", title: "Phương Pháp Montessori Tại Nhà Cho Trẻ 3-6 Tuổi" },
    ],
  },
  "learn-animal": {
    title: "Học Động Vật cho bé - Trò chơi giáo dục Cú Thông Minh",
    description:
      "Bé làm quen với các loài động vật nuôi, hoang dã và biển qua hình ảnh và âm thanh. Tập nói tên, nhận diện và ghép đôi động vật.",
    keywords: [
      "học động vật",
      "con vật cho bé",
      "động vật hoang dã",
      "khoa học cho bé",
      "bé học tên động vật bằng tiếng việt",
      "trò chơi nhận biết con vật cho trẻ mầm non",
      "động vật nuôi và hoang dã cho bé",
      "game khám phá động vật online",
      "dạy bé nhận biết con vật qua hình ảnh",
    ],
    seoText:
      "Trò chơi Học Động Vật giúp bé từ 3-6 tuổi khám phá thế giới động vật phong phú: từ động vật nuôi quen thuộc, động vật hoang dã đến các loài sinh vật biển. Bé được nghe tên, tập nói, nhận diện qua hình ảnh và chơi trò ghép đôi hấp dẫn.",
    seoFeatures: [
      "Học tên động vật nuôi, hoang dã và biển",
      "Nghe phát âm và tập nói tên",
      "Trò chơi nhận diện và ghép đôi",
      "Hình ảnh minh họa sinh động",
    ],
    ogImage: "https://assets.cuthongminh.com/games/learn-animal/logo.webp",
    relatedGames: ["learn-fruit", "learn-food", "learn-dinosaur"],
    relatedBlogs: [
      { slug: "kham-pha-the-gioi-dong-vat", title: "Khám Phá Thế Giới Động Vật" },
      { slug: "day-be-yeu-dong-vat", title: "Dạy Bé Yêu Động Vật" },
    ],
  },
  "learn-vehicle": {
    title: "Học Phương Tiện Giao Thông cho bé - Trò chơi giáo dục Cú Thông Minh",
    description:
      "Bé nhận biết phương tiện giao thông đường bộ, đường thủy và hàng không. Tập nói tên, nhận diện và ghép đôi phương tiện.",
    keywords: [
      "phương tiện giao thông",
      "xe ô tô cho bé",
      "học phương tiện",
      "giáo dục bé",
      "bé học nhận biết xe cộ",
      "phương tiện đường bộ đường thủy hàng không",
      "trò chơi nhận biết phương tiện cho trẻ",
      "dạy bé tên các loại xe",
      "game học phương tiện giao thông online",
    ],
    seoText:
      "Trò chơi Học Phương Tiện Giao Thông giúp bé từ 3-6 tuổi nhận biết các phương tiện đường bộ (ô tô, xe máy, xe buýt), đường thủy (tàu, thuyền) và hàng không (máy bay, trực thăng). Bé sẽ học tên, chơi trò nhận diện, ghép đôi và tìm hiểu xe đi đâu.",
    seoFeatures: [
      "Phương tiện đường bộ, thủy và hàng không",
      "Tập nói tên phương tiện",
      "Trò chơi nhận diện và ghép đôi",
      "Tìm hiểu công dụng phương tiện",
    ],
    ogImage: "https://assets.cuthongminh.com/games/learn-vehicle/logo.webp",
    relatedGames: ["learn-occupation", "learn-hygiene", "learn-traffic"],
    relatedBlogs: [{ slug: "hoc-phuong-tien-giao-thong", title: "Tìm Hiểu Phương Tiện Giao Thông" }],
  },
  "learn-fruit": {
    title: "Học Trái Cây cho bé - Trò chơi giáo dục Cú Thông Minh",
    description:
      "Bé nhận biết tên và hình dạng các loại trái cây phổ biến, nhiệt đới qua trò chơi tương tác với hình ảnh đẹp mắt.",
    keywords: [
      "học trái cây",
      "nhận biết trái cây",
      "trái cây cho bé",
      "khoa học cho bé",
      "bé học nhận biết trái cây rau củ",
      "trò chơi nhận biết hoa quả online",
      "dạy bé tên trái cây bằng tiếng việt",
      "game trái cây cho trẻ mầm non",
    ],
    seoText:
      "Trò chơi Học Trái Cây giúp bé từ 3-6 tuổi nhận biết các loại trái cây phổ biến và nhiệt đới: táo, chuối, cam, xoài, dưa hấu và nhiều loại khác. Bé sẽ học tên, chơi trò nhận diện và ghép đôi trái cây qua hình ảnh sắc nét, dễ thương.",
    seoFeatures: [
      "Nhận biết trái cây phổ biến và nhiệt đới",
      "Học tên trái cây bằng tiếng Việt",
      "Trò chơi nhận diện và ghép đôi",
      "Hình ảnh trái cây sống động",
    ],
    ogImage: "https://assets.cuthongminh.com/games/learn-fruit/logo.webp",
    relatedGames: ["learn-animal", "learn-food", "learn-dinosaur"],
    relatedBlogs: [
      { slug: "nhan-biet-trai-cay", title: "Nhận Biết Trái Cây Cho Bé" },
      { slug: "day-be-nhan-biet-trai-cay-rau-cu", title: "Dạy Bé Nhận Biết Trái Cây Rau Củ" },
    ],
  },
  "learn-food": {
    title: "Học Món Ăn cho bé - Trò chơi giáo dục Cú Thông Minh",
    description:
      "Bé học tên các món ăn sáng, món chính và món tráng miệng qua trò chơi tương tác với hình ảnh hấp dẫn.",
    keywords: [
      "học món ăn",
      "nhận biết thức ăn",
      "món ăn cho bé",
      "giáo dục dinh dưỡng",
      "bé học tên các món ăn việt nam",
      "trò chơi nhận biết đồ ăn cho trẻ",
      "dạy bé phân biệt thức ăn",
      "game học món ăn online cho bé mầm non",
    ],
    seoText:
      "Trò chơi Học Món Ăn giúp bé từ 3-6 tuổi nhận biết các loại thức ăn: món sáng (phở, bún, xôi), món chính (cơm, canh, thịt) và món tráng miệng (bánh, kẹo, kem). Bé sẽ học tên, nhận diện và ghép đôi qua hình ảnh món ăn đẹp mắt.",
    seoFeatures: [
      "Học tên món ăn sáng, chính, tráng miệng",
      "Hình ảnh thức ăn hấp dẫn",
      "Trò chơi nhận diện và ghép đôi",
      "Phù hợp bé 3-6 tuổi",
    ],
    ogImage: "https://assets.cuthongminh.com/games/learn-food/logo.webp",
    relatedGames: ["learn-animal", "learn-fruit", "learn-dinosaur"],
    relatedBlogs: [{ slug: "kham-pha-mon-an", title: "Khám Phá Thế Giới Món Ăn" }],
  },
  "learn-dinosaur": {
    title: "Học Khủng Long cho bé - Trò chơi giáo dục Cú Thông Minh",
    description:
      "Bé khám phá thế giới khủng long: khủng long ăn cỏ, ăn thịt, khủng long bay và biển qua trò chơi tương tác hấp dẫn.",
    keywords: [
      "khủng long cho bé",
      "học khủng long",
      "thế giới khủng long",
      "khoa học cho bé",
      "tên các loài khủng long cho trẻ em",
      "T-Rex Triceratops cho bé",
      "trò chơi khủng long online",
      "bé khám phá thế giới tiền sử",
      "game học khủng long miễn phí",
    ],
    seoText:
      "Trò chơi Học Khủng Long giúp bé từ 3-6 tuổi khám phá thế giới tiền sử đầy thú vị. Bé sẽ học tên các loài khủng long ăn cỏ (Brachiosaurus, Triceratops), ăn thịt (T-Rex, Velociraptor), cùng khủng long bay và biển. Mỗi bài học có hình ảnh minh họa sống động và trò chơi ghép đôi hấp dẫn.",
    seoFeatures: [
      "Khám phá khủng long ăn cỏ, ăn thịt, bay, biển",
      "Hình ảnh minh họa sống động",
      "Trò chơi nhận diện và ghép đôi",
      "Phù hợp bé yêu thích khám phá",
    ],
    ogImage: "https://assets.cuthongminh.com/games/learn-dinosaur/logo.webp",
    relatedGames: ["learn-animal", "learn-fruit", "learn-food"],
    relatedBlogs: [{ slug: "the-gioi-khung-long", title: "Thế Giới Khủng Long" }],
  },
  "learn-instrument": {
    title: "Học Nhạc Cụ cho bé - Trò chơi giáo dục Cú Thông Minh",
    description:
      "Bé làm quen với nhạc cụ dây, gõ và hơi qua hình ảnh và âm thanh thực tế. Nghe, nhận diện và ghép đôi nhạc cụ.",
    keywords: [
      "học nhạc cụ",
      "nhạc cụ cho bé",
      "âm nhạc cho bé",
      "giáo dục âm nhạc",
      "bé nhận biết nhạc cụ dây gõ hơi",
      "trò chơi nghe âm thanh nhạc cụ",
      "dạy bé tên nhạc cụ bằng tiếng việt",
      "game nhạc cụ online cho trẻ mầm non",
    ],
    seoText:
      "Trò chơi Học Nhạc Cụ giúp bé từ 3-6 tuổi làm quen với các loại nhạc cụ: nhạc cụ dây (guitar, violin, đàn bầu), nhạc cụ gõ (trống, xylophone) và nhạc cụ hơi (sáo, kèn). Bé sẽ nghe âm thanh thực tế, học tên và chơi trò ghép đôi nhạc cụ.",
    seoFeatures: [
      "Nhạc cụ dây, gõ và hơi",
      "Nghe âm thanh nhạc cụ thực tế",
      "Trò chơi nhận diện và ghép đôi",
      "Phát triển khả năng nghe nhạc",
    ],
    ogImage: "https://assets.cuthongminh.com/games/learn-instrument/logo.webp",
    relatedGames: ["mini-piano", "learn-notes"],
    relatedBlogs: [
      { slug: "lam-quen-voi-nhac-cu", title: "Làm Quen Với Nhạc Cụ" },
      { slug: "am-nhac-cho-tre-mam-non", title: "Âm Nhạc Cho Trẻ Mầm Non" },
    ],
  },
  "learn-occupation": {
    title: "Học Nghề Nghiệp cho bé - Trò chơi giáo dục Cú Thông Minh",
    description:
      "Bé tìm hiểu các nghề nghiệp phổ biến: cộng đồng, y tế, khoa học và nghệ thuật. Học tên nghề, nhận diện và nối dụng cụ.",
    keywords: [
      "học nghề nghiệp",
      "nghề nghiệp cho bé",
      "bác sĩ cảnh sát",
      "giáo dục kỹ năng sống",
      "dạy bé tên các nghề nghiệp",
      "trò chơi nghề nghiệp cho trẻ mầm non",
      "bé tìm hiểu nghề bác sĩ giáo viên",
      "game học nghề nghiệp online cho bé",
    ],
    seoText:
      "Trò chơi Học Nghề Nghiệp giúp bé từ 3-6 tuổi tìm hiểu về các nghề cộng đồng (cảnh sát, lính cứu hỏa, giáo viên), nghề y tế & khoa học (bác sĩ, y tá, nhà khoa học) và nghề nghệ thuật (ca sĩ, họa sĩ, nhiếp ảnh gia). Bé sẽ học tên nghề, nhận diện qua hình ảnh và nối nghề với dụng cụ làm việc.",
    seoFeatures: [
      "Nghề cộng đồng, y tế, khoa học, nghệ thuật",
      "Học tên nghề và nhận diện",
      "Nối nghề với dụng cụ làm việc",
      "Hình ảnh minh họa dễ thương",
    ],
    ogImage: "https://assets.cuthongminh.com/games/learn-occupation/logo.webp",
    relatedGames: ["learn-vehicle", "learn-hygiene", "learn-traffic"],
    relatedBlogs: [
      { slug: "hoc-nghe-nghiep", title: "Định Hướng Nghề Nghiệp Sớm Cho Bé" },
      { slug: "day-be-biet-cac-nghe-nghiep", title: "Dạy Bé Biết Các Nghề Nghiệp" },
    ],
  },
  "learn-flower": {
    title: "Học Hoa và Cây cho bé - Trò chơi giáo dục Cú Thông Minh",
    description:
      "Bé khám phá các loài hoa phổ biến, hoa Tết và cây ăn quả quen thuộc ở Việt Nam qua trò chơi tương tác sinh động.",
    keywords: [
      "học hoa",
      "nhận biết cây",
      "hoa cho bé",
      "thiên nhiên cho bé",
      "bé học nhận biết hoa và cây",
      "hoa tết cho bé biết",
      "trò chơi khám phá thiên nhiên online",
      "dạy bé tên các loài hoa việt nam",
    ],
    seoText:
      "Trò chơi Học Hoa và Cây giúp bé từ 3-6 tuổi khám phá thiên nhiên Việt Nam: hoa phổ biến (hoa hồng, hoa cúc), hoa Tết & trang trí (mai, đào, hướng dương) và cây ăn quả (xoài, mít, bưởi). Bé sẽ học tên, nhận diện và ghép đôi qua hình ảnh đẹp mắt.",
    seoFeatures: [
      "Hoa phổ biến, hoa Tết và cây ăn quả",
      "Khám phá thiên nhiên Việt Nam",
      "Trò chơi nhận diện và ghép đôi",
      "Hình ảnh thiên nhiên tươi đẹp",
    ],
    ogImage: "https://assets.cuthongminh.com/games/learn-flower/logo.webp",
    relatedGames: ["learn-animal", "learn-fruit", "learn-weather"],
    relatedBlogs: [{ slug: "tim-hieu-hoa-va-cay", title: "Tìm Hiểu Hoa & Cây" }],
  },
  "learn-weather": {
    title: "Học Thời Tiết cho bé - Trò chơi giáo dục Cú Thông Minh",
    description:
      "Bé làm quen với các hiện tượng thời tiết, mùa và khí hậu qua hình ảnh vui nhộn. Học tên, tập nói, nhận diện và ghép đôi.",
    keywords: [
      "học thời tiết",
      "thời tiết cho bé",
      "mùa trong năm",
      "khoa học tự nhiên",
      "bé học nhận biết thời tiết nắng mưa",
      "4 mùa trong năm cho trẻ mầm non",
      "trò chơi thời tiết online cho bé",
      "dạy bé về khí hậu và thời tiết",
    ],
    seoText:
      "Trò chơi Học Thời Tiết giúp bé từ 3-6 tuổi làm quen với thời tiết cơ bản (nắng, mưa, gió), thời tiết đặc biệt (tuyết, sấm, cầu vồng) và các mùa trong năm. Bé sẽ học tên thời tiết, tập nói, nhận diện qua hình ảnh và chơi trò chơi mặc đồ đúng mùa.",
    seoFeatures: [
      "Thời tiết cơ bản và đặc biệt",
      "Học về 4 mùa trong năm",
      "Tập nói tên thời tiết",
      "Trò chơi mặc đồ đúng mùa",
    ],
    ogImage: "https://assets.cuthongminh.com/games/learn-weather/logo.webp",
    relatedGames: ["learn-animal", "learn-fruit", "learn-flower"],
    relatedBlogs: [
      { slug: "hoc-thoi-tiet-va-khi-hau", title: "Bé Học Thời Tiết Và Khí Hậu" },
      { slug: "kham-pha-thoi-tiet-cung-be", title: "Khám Phá Thời Tiết Cùng Bé" },
    ],
  },
  "learn-hygiene": {
    title: "Học Vệ Sinh Cá Nhân cho bé - Trò chơi giáo dục Cú Thông Minh",
    description:
      "Bé học thói quen vệ sinh hàng ngày, giữ gìn sức khỏe và sạch sẽ gọn gàng qua trò chơi tương tác với tình huống thực tế.",
    keywords: [
      "vệ sinh cá nhân",
      "thói quen sạch sẽ",
      "kỹ năng sống cho bé",
      "sức khỏe cho bé",
      "dạy bé rửa tay đánh răng đúng cách",
      "thói quen vệ sinh cho trẻ mầm non",
      "trò chơi kỹ năng sống online cho bé",
      "bé học giữ gìn sạch sẽ gọn gàng",
    ],
    seoText:
      "Trò chơi Học Vệ Sinh Cá Nhân giúp bé từ 3-6 tuổi xây dựng thói quen tốt: vệ sinh hàng ngày (đánh răng, rửa tay), giữ gìn sức khỏe (ăn uống sạch sẽ) và sạch sẽ gọn gàng (dọn phòng, xếp đồ). Bé sẽ học qua tình huống thực tế, trả lời đúng/sai và sắp xếp thứ tự các bước.",
    seoFeatures: [
      "Thói quen vệ sinh hàng ngày",
      "Giữ gìn sức khỏe và sạch sẽ",
      "Tình huống thực tế sinh động",
      "Sắp xếp thứ tự các bước vệ sinh",
    ],
    ogImage: "https://assets.cuthongminh.com/games/learn-hygiene/logo.webp",
    relatedGames: ["learn-vehicle", "learn-occupation", "learn-traffic"],
    relatedBlogs: [
      { slug: "ky-nang-ve-sinh-ca-nhan", title: "Kỹ Năng Vệ Sinh Cá Nhân" },
      { slug: "day-be-giu-ve-sinh-ca-nhan", title: "Dạy Bé Giữ Vệ Sinh Cá Nhân" },
    ],
  },
  "learn-traffic": {
    title: "Học An Toàn Giao Thông cho bé - Trò chơi giáo dục Cú Thông Minh",
    description:
      "Bé học quy tắc an toàn giao thông: đèn & biển báo, đi bộ an toàn, đi xe an toàn qua trò chơi tương tác và phiêu lưu.",
    keywords: [
      "an toàn giao thông",
      "biển báo giao thông",
      "kỹ năng sống",
      "giáo dục an toàn",
      "dạy bé luật giao thông đường bộ",
      "trò chơi an toàn giao thông cho trẻ",
      "bé học nhận biết đèn xanh đèn đỏ",
      "game an toàn giao thông online cho trẻ mầm non",
    ],
    seoText:
      "Trò chơi An Toàn Giao Thông giúp bé từ 3-6 tuổi học các quy tắc quan trọng: nhận biết đèn giao thông & biển báo, quy tắc đi bộ an toàn và quy tắc đi xe an toàn. Bé sẽ khám phá phố, xử lý tình huống và lắp ráp biển báo qua trò chơi phiêu lưu hấp dẫn.",
    seoFeatures: [
      "Nhận biết đèn và biển báo giao thông",
      "Quy tắc đi bộ và đi xe an toàn",
      "Trò chơi phiêu lưu và tình huống",
      "Lắp ráp biển báo",
    ],
    ogImage: "https://assets.cuthongminh.com/games/learn-traffic/logo.webp",
    relatedGames: ["learn-vehicle", "learn-occupation", "learn-hygiene"],
    relatedBlogs: [
      { slug: "an-toan-giao-thong-cho-be", title: "An Toàn Giao Thông Cho Bé" },
      { slug: "hoc-phuong-tien-giao-thong", title: "Tìm Hiểu Phương Tiện Giao Thông" },
    ],
  },
  "learn-emotion": {
    title: "Học Cảm Xúc cho bé - Trò chơi giáo dục Cú Thông Minh",
    description: "Bé học nhận biết và gọi tên cảm xúc cơ bản qua hình ảnh khuôn mặt và tình huống kịch bản sinh động.",
    keywords: [
      "học cảm xúc",
      "quản lý cảm xúc",
      "kỹ năng sống",
      "trí tuệ cảm xúc cho bé",
      "dạy bé gọi tên cảm xúc vui buồn",
      "trò chơi nhận biết cảm xúc cho trẻ",
      "bé học biểu cảm khuôn mặt",
      "phát triển EQ cho trẻ mầm non",
    ],
    seoText:
      "Trò chơi Học Cảm Xúc giúp bé từ 3-6 tuổi nhận biết và gọi tên các cảm xúc: vui, buồn, tức giận, sợ hãi, ngạc nhiên và xấu hổ. Bé sẽ học qua hình ảnh khuôn mặt biểu cảm, tập nói tên cảm xúc, phán đoán đúng/sai và chọn cảm xúc phù hợp với tình huống.",
    seoFeatures: [
      "Nhận biết cảm xúc cơ bản",
      "Gọi tên và tập nói cảm xúc",
      "Tình huống kịch bản sinh động",
      "Phát triển trí tuệ cảm xúc",
    ],
    ogImage: "https://assets.cuthongminh.com/games/learn-emotion/logo.webp",
    relatedGames: ["learn-vehicle", "learn-occupation", "learn-hygiene"],
    relatedBlogs: [
      { slug: "day-be-quan-ly-cam-xuc", title: "Dạy Bé Quản Lý Cảm Xúc" },
      { slug: "goi-ten-cam-xuc", title: "Gọi Tên Cảm Xúc: Giúp Bé Làm Chủ EQ" },
    ],
  },
  "learn-flag": {
    title: "Học Cờ Quốc Gia cho bé - Trò chơi giáo dục Cú Thông Minh",
    description: "Bé nhận biết quốc kỳ các nước Châu Á, Châu Âu, Châu Mỹ qua trò chơi lật hình ghi nhớ và ghép hình.",
    keywords: [
      "học cờ quốc gia",
      "quốc kỳ cho bé",
      "địa lý cho bé",
      "cờ các nước",
      "bé nhận biết cờ các nước châu á châu âu",
      "trò chơi ghép hình quốc kỳ online",
      "dạy bé tên cờ các quốc gia",
      "game lật hình ghi nhớ quốc kỳ cho trẻ",
    ],
    seoText:
      "Trò chơi Học Cờ Quốc Gia giúp bé từ 3-8 tuổi nhận biết quốc kỳ các nước trên thế giới, chia theo châu lục: Châu Á, Châu Âu và Châu Mỹ. Bé sẽ học tên quốc kỳ, chọn cờ đúng, chơi trò lật hình ghi nhớ và ghép hình quốc kỳ.",
    seoFeatures: [
      "Quốc kỳ Châu Á, Châu Âu, Châu Mỹ",
      "Trò chơi lật hình ghi nhớ",
      "Ghép hình quốc kỳ",
      "Mở rộng kiến thức địa lý",
    ],
    ogImage: "https://assets.cuthongminh.com/games/learn-flag/logo.webp",
    relatedGames: ["learn-landmark", "learn-costume", "learn-terrain"],
    relatedBlogs: [{ slug: "nhan-biet-quoc-ky", title: "Nhận Biết Quốc Kỳ Các Nước" }],
  },
  "learn-landmark": {
    title: "Học Địa Danh Nổi Tiếng cho bé - Trò chơi giáo dục Cú Thông Minh",
    description:
      "Bé khám phá các địa danh nổi tiếng thế giới: tháp Eiffel, Vạn Lý Trường Thành, Kim tự tháp qua trò chơi tương tác.",
    keywords: [
      "địa danh nổi tiếng",
      "kỳ quan thế giới",
      "địa lý cho bé",
      "khám phá thế giới",
      "tháp eiffel kim tự tháp cho bé",
      "trò chơi khám phá địa danh online",
      "dạy bé về các kỳ quan thế giới",
      "bé học địa danh nổi tiếng bằng trò chơi",
    ],
    seoText:
      "Trò chơi Địa Danh Nổi Tiếng giúp bé từ 3-8 tuổi khám phá các kỳ quan và địa danh trên thế giới, chia theo châu lục. Bé sẽ học tên địa danh, chơi trò nhận diện, ghép đôi và xếp hình các công trình nổi tiếng.",
    seoFeatures: [
      "Địa danh Châu Á, Châu Âu, Châu Mỹ",
      "Hình ảnh các kỳ quan thế giới",
      "Trò chơi nhận diện và xếp hình",
      "Mở rộng kiến thức địa lý",
    ],
    ogImage: "https://assets.cuthongminh.com/games/learn-landmark/logo.webp",
    relatedGames: ["learn-flag", "learn-costume", "learn-terrain"],
    relatedBlogs: [{ slug: "kham-pha-dia-danh", title: "Khám Phá Địa Danh Nổi Tiếng" }],
  },
  "learn-costume": {
    title: "Học Trang Phục Thế Giới cho bé - Trò chơi giáo dục Cú Thông Minh",
    description:
      "Bé tìm hiểu trang phục truyền thống các quốc gia: áo dài Việt Nam, kimono Nhật, hanbok Hàn qua trò chơi tương tác.",
    keywords: [
      "trang phục truyền thống",
      "trang phục các nước",
      "văn hóa cho bé",
      "địa lý",
      "áo dài kimono hanbok cho bé biết",
      "trò chơi trang phục các quốc gia online",
      "dạy bé về văn hóa thế giới",
      "bé nhận biết trang phục truyền thống châu á",
    ],
    seoText:
      "Trò chơi Trang Phục Thế Giới giúp bé từ 3-8 tuổi khám phá trang phục truyền thống các quốc gia. Từ áo dài Việt Nam, kimono Nhật Bản đến hanbok Hàn Quốc, bé sẽ học tên trang phục, nhận biết trang phục nước nào và chơi trò mặc đúng cho bạn.",
    seoFeatures: [
      "Trang phục Châu Á, Châu Âu, Châu Mỹ",
      "Nhận biết trang phục các quốc gia",
      "Trò chơi mặc đúng cho bạn",
      "Tìm hiểu văn hóa thế giới",
    ],
    ogImage: "https://assets.cuthongminh.com/games/learn-costume/logo.webp",
    relatedGames: ["learn-flag", "learn-landmark", "learn-terrain"],
    relatedBlogs: [{ slug: "trang-phuc-cac-quoc-gia", title: "Trang Phục Các Quốc Gia" }],
  },
  "learn-math": {
    title: "Học Toán Đơn Giản cho bé - Trò chơi giáo dục Cú Thông Minh",
    description:
      "Bé học phép cộng và phép trừ đơn giản với các số đến 20 qua hình ảnh minh họa và trò chơi tương tác vui nhộn.",
    keywords: [
      "phép cộng trừ",
      "toán cho bé",
      "toán mầm non",
      "học cộng trừ đơn giản",
      "bài tập phép cộng trừ cho bé lớp 1",
      "toán tư duy cho bé 5-6 tuổi",
      "trò chơi học cộng trừ online miễn phí",
      "dạy bé phép tính đơn giản tại nhà",
      "game toán cộng trừ cho trẻ mầm non",
    ],
    seoText:
      "Trò chơi Toán Đơn Giản giúp bé từ 3-8 tuổi học phép cộng và phép trừ với các con số đến 20. Bé sẽ hiểu khái niệm qua hình ảnh minh họa, thực hành cộng/trừ bằng hình và bằng số, tập viết dấu cộng trừ và luyện tập tổng hợp.",
    seoFeatures: [
      "Phép cộng và phép trừ đơn giản",
      "Giải thích bằng hình ảnh minh họa",
      "Tập viết dấu cộng và trừ",
      "Luyện tập tổng hợp",
    ],
    ogImage: "https://assets.cuthongminh.com/games/learn-math/logo.webp",
    relatedGames: ["learn-numbers", "compare-quantity", "learn-multiply"],
    relatedBlogs: [
      { slug: "phep-cong-tru-don-gian", title: "Bé Học Phép Cộng Trừ Đơn Giản" },
      { slug: "phep-tinh-don-gian-cho-be-mau-giao", title: "Phép Tính Cho Bé Mẫu Giáo" },
      { slug: "be-5-tuoi-can-biet-nhung-gi", title: "Bé 5 Tuổi Cần Biết Những Gì Trước Khi Vào Lớp 1" },
      { slug: "day-be-hoc-qua-tro-choi", title: "Dạy Bé Học Qua Trò Chơi: 7 Phương Pháp Play-Based Learning" },
    ],
  },
  "learn-multiply": {
    title: "Học Phép Nhân & Bảng Cửu Chương 2-9 - Trò chơi giáo dục Cú Thông Minh",
    description:
      "Trò chơi học toán phép nhân và bảng cửu chương từ 2 đến 9 qua 3 mini-game vật lý tương tác: Cân thăng bằng, Đại chiến pháo bóng và Thác Plinko hứng quả.",
    keywords: [
      "trò chơi học toán phép nhân",
      "trò chơi phép nhân",
      "trò chơi bảng nhân",
      "game bảng nhân",
      "bảng cửu chương cho bé",
      "toán lớp 2",
      "học bảng nhân 2 3 4 5 6 7 8 9",
      "trò chơi bảng cửu chương online",
      "game học phép nhân miễn phí",
    ],
    seoText:
      "Trò chơi Học Phép Nhân giúp bé từ 5-9 tuổi chinh phục trọn bộ bảng cửu chương từ 2 đến 9 một cách tự nhiên, không học vẹt. Mỗi bảng nhân có 5 bài học tương tác: Khám phá bảng nhân có giọng đọc, Cân thăng bằng vật lý giúp hiểu bản chất phép nhân, Đại chiến pháo bóng rèn phản xạ, Thác Plinko hứng quả và Tìm thừa số bí ẩn.",
    seoFeatures: [
      "Trọn bộ Bảng nhân từ 2 đến 9 & Đấu trường tổng hợp",
      "Game vật lý: Cân thăng bằng, Pháo bóng, Thác Plinko",
      "Bảng cửu chương phát âm tương tác",
      "Hiểu bản chất phép nhân thay vì học vẹt",
    ],
    ogImage: "https://assets.cuthongminh.com/games/learn-multiply/logo.webp",
    relatedGames: ["learn-math", "learn-divide", "learn-numbers", "mini-sudoku-kids"],
    relatedBlogs: [
      { slug: "bang-cuu-chuong-cho-be", title: "Trò Chơi Học Toán Phép Nhân & Bảng Cửu Chương Cho Bé" },
      { slug: "phep-cong-tru-don-gian", title: "Bé Học Phép Cộng Trừ Đơn Giản" },
      { slug: "cach-day-be-hoc-so", title: "Cách Dạy Bé Học Số" },
    ],
  },
  "learn-divide": {
    title: "Học Phép Chia cho bé - Trò chơi giáo dục Cú Thông Minh",
    description:
      "Bé học bảng chia 2-5 qua hình ảnh và trò chơi tương tác: chia bằng hình, chia bằng số, điền số thiếu và nhân ngược.",
    keywords: [
      "phép chia cho bé",
      "bảng chia",
      "toán lớp 2",
      "chia đều",
      "học bảng chia 2 3 4 5 cho bé",
      "trò chơi phép chia online",
      "dạy bé chia đều bằng hình ảnh",
      "bài tập chia cho trẻ lớp 2",
      "game toán phép chia vui nhộn",
    ],
    seoText:
      "Trò chơi Học Phép Chia giúp bé từ 5-8 tuổi làm quen với bảng chia từ 2 đến 5. Mỗi bảng chia có 5 bài học: giải thích khái niệm chia đều, chia bằng hình ảnh, chia bằng số, điền số thiếu và nhân ngược để kiểm tra. Phương pháp trực quan giúp bé hiểu sâu.",
    seoFeatures: [
      "Bảng chia 2, 3, 4, 5",
      "Giải thích chia đều bằng hình ảnh",
      "Điền số thiếu và nhân ngược",
      "Phương pháp trực quan",
    ],
    ogImage: "https://assets.cuthongminh.com/games/learn-divide/logo.webp",
    relatedGames: ["learn-math", "learn-multiply", "learn-numbers"],
    relatedBlogs: [
      { slug: "phep-cong-tru-don-gian", title: "Bé Học Phép Cộng Trừ Đơn Giản" },
      { slug: "cach-day-be-hoc-so", title: "Cách Dạy Bé Học Số" },
    ],
  },
  "learn-money": {
    title: "Học Tiền Việt Nam cho bé - Trò chơi giáo dục Cú Thông Minh",
    description:
      "Bé học nhận biết 9 mệnh giá tiền giấy Việt Nam và tập tính tiền qua trò chơi đi chợ cùng Cú.",
    keywords: [
      "học tiền việt nam",
      "dạy bé nhận biết tiền",
      "tiền giấy việt nam cho bé",
      "tập tính tiền cho trẻ",
      "trò chơi đi chợ cho bé",
      "mệnh giá tiền việt nam",
      "dạy bé dùng tiền",
      "toán thực tế cho trẻ mầm non",
      "game học tiền cho bé 5 tuổi",
    ],
    seoText:
      "Trò chơi Học Tiền Việt Nam giúp bé 5-8 tuổi nhận biết 9 mệnh giá tiền giấy từ 1.000đ đến 500.000đ. Bé bắt đầu với việc học nhận biết, rồi tiến dần lên xếp tiền, đổi tiền và so sánh. Phần 'Đi Chợ Cùng Cú' giúp bé ứng dụng vào mua bán thực tế: chọn tờ tiền đúng, tính tổng và tính tiền thừa.",
    seoFeatures: [
      "Nhận biết 9 mệnh giá tiền giấy Việt Nam",
      "Xếp tiền, đổi tiền và so sánh giá trị",
      "Trò chơi đi chợ tính tiền thực tế",
    ],
    ogImage: "https://assets.cuthongminh.com/games/learn-money/logo.webp",
    relatedGames: ["learn-math", "learn-numbers", "compare-quantity"],
    relatedBlogs: [],
  },
  "find-pattern": {
    title: "Học Tìm Quy Luật cho bé - Trò chơi giáo dục Cú Thông Minh",
    description:
      "Bé học tìm quy luật logic qua các bài tập hình dạng và màu sắc. Phát triển tư duy logic và khả năng quan sát.",
    keywords: [
      "tìm quy luật",
      "tư duy logic",
      "trò chơi trí tuệ",
      "phát triển tư duy",
      "bài tập tìm quy luật cho bé mẫu giáo",
      "trò chơi tìm quy luật online miễn phí",
      "rèn luyện tư duy logic cho trẻ 3-6 tuổi",
      "game phát triển trí tuệ cho bé",
    ],
    seoText:
      "Trò chơi Tìm Quy Luật giúp bé từ 3-6 tuổi phát triển tư duy logic qua việc tìm quy luật màu sắc và hình dạng. Bé sẽ quan sát dãy hình, tìm phần tiếp theo và điền vào chỗ trống. Đây là nền tảng quan trọng cho tư duy toán học và khoa học sau này.",
    seoFeatures: [
      "Quy luật màu sắc và hình dạng",
      "Tìm phần tiếp theo trong dãy",
      "Điền vào chỗ trống",
      "Phát triển tư duy logic",
    ],
    ogImage: "https://assets.cuthongminh.com/games/find-pattern/logo.webp",
    relatedGames: ["find-differences", "odd-one-out", "maze-runner"],
    relatedBlogs: [
      { slug: "hoc-quy-luat-logic", title: "Bé Học Quy Luật Logic" },
      { slug: "day-be-tu-duy-logic", title: "Dạy Bé Tư Duy Logic" },
      { slug: "cach-ren-luyen-su-tap-trung-cho-tre-mam-non", title: "Cách Rèn Luyện Sự Tập Trung Cho Trẻ Mầm Non" },
    ],
  },
  "learn-alphabet": {
    title: "Học Bảng Chữ Cái Tiếng Việt cho bé - Trò chơi giáo dục Cú Thông Minh",
    description:
      "Bé học bảng chữ cái tiếng Việt: nguyên âm và phụ âm qua hình ảnh, tập nói, tập viết và trò chơi nhận diện chữ.",
    keywords: [
      "bảng chữ cái",
      "học chữ cái tiếng việt",
      "tập viết chữ",
      "giáo dục ngôn ngữ",
      "học bảng chữ cái tiếng việt cho bé 4 tuổi",
      "tập viết chữ cái abc online",
      "dạy bé phát âm chữ cái chuẩn",
      "trò chơi học chữ cho trẻ mầm non",
      "game học bảng chữ cái miễn phí",
    ],
    seoText:
      "Trò chơi Học Bảng Chữ Cái giúp bé từ 3-6 tuổi học bảng chữ cái tiếng Việt đầy đủ, chia thành nhóm nguyên âm và phụ âm. Mỗi nhóm có 5 bài: học chữ cái, tập nói phát âm, tập viết theo nét, nhận diện chữ đúng và ghép đôi. Phương pháp đa giác quan giúp bé ghi nhớ nhanh và lâu.",
    seoFeatures: [
      "Nguyên âm và phụ âm tiếng Việt",
      "Tập nói phát âm chuẩn",
      "Tập viết theo nét hướng dẫn",
      "Nhận diện chữ và ghép đôi",
    ],
    ogImage: "https://assets.cuthongminh.com/games/learn-alphabet/logo.webp",
    relatedGames: ["learn-tones", "learn-syllable"],
    relatedBlogs: [
      { slug: "hoc-bang-chu-cai-tieng-viet", title: "Bé Học Bảng Chữ Cái Tiếng Việt" },
      { slug: "day-be-hoc-bang-chu-cai-tai-nha", title: "Dạy Bé Học Bảng Chữ Cái Tại Nhà" },
      { slug: "game-hoc-chu-cho-be", title: "Top 7 Game Học Chữ Cho Bé" },
      { slug: "ap-dung-montessori-tai-nha", title: "Phương Pháp Montessori Tại Nhà Cho Trẻ 3-6 Tuổi" },
    ],
  },
  "find-differences": {
    title: "Tìm Điểm Khác Biệt cho bé - Trò chơi giáo dục Cú Thông Minh",
    description:
      "Bé luyện khả năng quan sát bằng cách tìm điểm khác biệt giữa hai bức tranh. Nhiều chủ đề: phòng khách, khu vườn, bãi biển.",
    keywords: [
      "tìm điểm khác biệt",
      "trò chơi quan sát",
      "phát triển tư duy",
      "trí tuệ cho bé",
      "trò chơi tìm điểm khác biệt online cho bé",
      "game tìm sự khác nhau giữa 2 hình",
      "bài tập rèn luyện quan sát cho trẻ",
      "tìm điểm khác nhau miễn phí cho trẻ em",
    ],
    seoText:
      "Trò chơi Tìm Điểm Khác Biệt giúp bé rèn luyện khả năng quan sát tỉ mỉ. So sánh hai bức tranh cùng chủ đề (phòng khách vui nhộn, khu vườn thú vị, bãi biển đầy nắng, vũ trụ, đại dương) để tìm ra các chi tiết khác nhau. Có 2 cấp độ: dễ và trung bình, phù hợp với mọi lứa tuổi.",
    seoFeatures: [
      "So sánh hai bức tranh",
      "Nhiều chủ đề hấp dẫn",
      "2 cấp độ: dễ và trung bình",
      "Rèn luyện khả năng quan sát",
    ],
    ogImage: "https://assets.cuthongminh.com/games/game-4-logo.webp",
    relatedGames: ["find-pattern", "odd-one-out", "maze-runner"],
    relatedBlogs: [
      { slug: "tro-choi-tim-diem-khac-biet", title: "Trò Chơi Tìm Điểm Khác Biệt" },
      { slug: "cach-ren-luyen-su-tap-trung-cho-tre-mam-non", title: "Cách Rèn Luyện Sự Tập Trung Cho Trẻ Mầm Non" },
    ],
  },
  "odd-one-out": {
    title: "Tìm Hình Khác Biệt cho bé - Trò chơi giáo dục Cú Thông Minh",
    description:
      "Bé luyện nhãn quan bằng cách tìm hình khác với các hình còn lại. Tìm màu khác, hình khác và hình khác loại.",
    keywords: [
      "tìm hình khác biệt",
      "trò chơi tư duy",
      "luyện mắt",
      "trí tuệ cho bé",
      "trò chơi tìm hình khác loại online",
      "game odd one out cho trẻ em",
      "bài tập phân loại hình cho bé",
      "rèn luyện tư duy phân loại cho trẻ mầm non",
    ],
    seoText:
      "Trò chơi Tìm Hình Khác Biệt giúp bé rèn luyện nhãn quan và tư duy phân loại. Bé sẽ tìm ra hình khác với các hình còn lại trong nhóm: tìm màu khác biệt, tìm hình khác biệt và tìm hình khác loại. Trò chơi giúp phát triển khả năng quan sát và tư duy logic.",
    seoFeatures: ["Tìm màu khác biệt", "Tìm hình khác biệt", "Tìm hình khác loại", "Rèn luyện tư duy phân loại"],
    ogImage: "https://assets.cuthongminh.com/games/odd-one-out/logo.webp",
    relatedGames: ["find-pattern", "find-differences", "maze-runner"],
    relatedBlogs: [
      { slug: "bai-tap-tu-duy-tim-hinh-khac-loai", title: "Bài Tập Tư Duy Tìm Hình Khác Loại" },
      { slug: "loi-ich-tro-choi-tri-tue", title: "Lợi Ích Của Trò Chơi Trí Tuệ" },
    ],
  },
  "maze-runner": {
    title: "Mê Cung Phiêu Lưu cho bé - Trò chơi giáo dục Cú Thông Minh",
    description:
      "Bé điều hướng qua các mê cung với 3 cấp độ: dễ, vừa và khó. Phát triển tư duy không gian và kỹ năng giải quyết vấn đề.",
    keywords: [
      "mê cung cho bé",
      "trò chơi mê cung",
      "tư duy không gian",
      "giải quyết vấn đề",
      "trò chơi mê cung online cho trẻ em",
      "game giải mê cung miễn phí",
      "mê cung nhiều cấp độ cho bé",
      "rèn luyện tư duy không gian cho trẻ",
    ],
    seoText:
      "Trò chơi Mê Cung Phiêu Lưu giúp bé phát triển tư duy không gian và kỹ năng giải quyết vấn đề. Bé sẽ điều hướng qua các mê cung với 3 cấp độ từ dễ đến khó, tìm đường đi đến ngôi sao. Trò chơi rèn luyện sự kiên nhẫn và khả năng lập kế hoạch.",
    seoFeatures: [
      "3 cấp độ: dễ, vừa, khó",
      "Điều hướng tìm đường trong mê cung",
      "Phát triển tư duy không gian",
      "Rèn luyện sự kiên nhẫn",
    ],
    ogImage: "https://assets.cuthongminh.com/games/maze-runner/logo.webp",
    relatedGames: ["find-pattern", "find-differences", "line-connect"],
    relatedBlogs: [
      { slug: "me-cung-cho-be", title: "Mê Cung Cho Bé: Rèn Luyện IQ" },
      { slug: "cach-ren-luyen-su-tap-trung-cho-tre-mam-non", title: "Cách Rèn Luyện Sự Tập Trung Cho Trẻ Mầm Non" },
    ],
  },
  "line-connect": {
    title: "Nối Điểm Trí Tuệ cho bé - Trò chơi giáo dục Cú Thông Minh",
    description:
      "Bé nối các điểm cùng màu để lấp đầy bảng. Phát triển tư duy logic, lập kế hoạch và khả năng quan sát.",
    keywords: [
      "nối điểm",
      "trò chơi trí tuệ",
      "tư duy logic",
      "puzzle cho bé",
      "trò chơi nối điểm online cho bé",
      "game flow free cho trẻ em",
      "bài tập nối điểm lấp đầy bảng",
      "puzzle tư duy logic cho trẻ mầm non",
    ],
    seoText:
      "Trò chơi Nối Điểm Trí Tuệ thử thách bé nối các điểm cùng màu sao cho đường nối lấp đầy toàn bộ bảng. Với 3 cấp độ từ dễ đến khó, trò chơi giúp bé phát triển tư duy logic, khả năng lập kế hoạch và sự kiên nhẫn.",
    seoFeatures: [
      "Nối điểm cùng màu lấp đầy bảng",
      "3 cấp độ từ dễ đến khó",
      "Phát triển tư duy logic",
      "Rèn luyện lập kế hoạch",
    ],
    ogImage: "https://assets.cuthongminh.com/games/line-connect/logo.webp",
    relatedGames: ["find-pattern", "maze-runner", "odd-one-out"],
    relatedBlogs: [
      { slug: "loi-ich-tro-choi-tri-tue", title: "Lợi Ích Của Trò Chơi Trí Tuệ" },
      { slug: "day-be-tu-duy-logic", title: "Dạy Bé Tư Duy Logic" },
    ],
  },
  "mix-color": {
    title: "Học Pha Màu cho bé - Trò chơi giáo dục Cú Thông Minh",
    description:
      "Bé học cách pha trộn các màu cơ bản để tạo ra màu mới. Khám phá nghệ thuật phối màu qua trò chơi tương tác.",
    keywords: [
      "pha màu",
      "trộn màu sắc",
      "mỹ thuật cho bé",
      "nghệ thuật cho bé",
      "bé học pha trộn màu sắc online",
      "trò chơi phối màu cho trẻ",
      "dạy bé cách pha màu cơ bản",
      "game sáng tạo nghệ thuật cho trẻ mầm non",
    ],
    seoText:
      "Trò chơi Pha Màu giúp bé từ 3-6 tuổi khám phá nghệ thuật pha trộn màu sắc. Bé sẽ học cách kết hợp các màu cơ bản (đỏ + vàng = cam, xanh + vàng = xanh lá) và thử thách pha màu nâng cao. Trò chơi kích thích sáng tạo và phát triển khả năng mỹ thuật.",
    seoFeatures: [
      "Pha trộn màu cơ bản và nâng cao",
      "Khám phá nghệ thuật phối màu",
      "Thử thách sáng tạo",
      "Phát triển khả năng mỹ thuật",
    ],
    ogImage: "https://assets.cuthongminh.com/games/learn-color-color.webp",
    relatedGames: ["learn-color", "paint-picture"],
    relatedBlogs: [
      { slug: "be-hoc-pha-mau-nghe-thuat", title: "Bé Học Pha Màu Nghệ Thuật" },
      { slug: "mau-sac-cho-tre-mau-giao", title: "Màu Sắc Cho Trẻ Mẫu Giáo" },
    ],
  },
  "paint-picture": {
    title: "Tô Màu Sáng Tạo cho bé - Trò chơi giáo dục Cú Thông Minh",
    description: "Bé tô màu các hình vẽ dễ thương: động vật, thiên nhiên, đồ chơi. Chế độ tô tự do và hoạ khám phá.",
    keywords: [
      "tô màu cho bé",
      "tô tranh",
      "mỹ thuật cho bé",
      "sáng tạo nghệ thuật",
      "tô màu online cho bé miễn phí",
      "game tô màu tranh cho trẻ mầm non",
      "bé tô màu động vật thiên nhiên",
      "trò chơi vẽ và tô màu cho bé 3-6 tuổi",
    ],
    seoText:
      "Trò chơi Tô Màu Sáng Tạo giúp bé từ 3-6 tuổi thỏa sức sáng tạo với các hình vẽ dễ thương theo chủ đề: động vật, thiên nhiên và đồ chơi. Bé có thể tô tự do theo ý thích hoặc chơi chế độ Hoạ Khám Phá để tô theo hướng dẫn. Phát triển khả năng phối màu và thẩm mỹ.",
    seoFeatures: [
      "Tô màu động vật, thiên nhiên, đồ chơi",
      "Chế độ tô tự do",
      "Chế độ Hoạ Khám Phá",
      "Phát triển thẩm mỹ và sáng tạo",
    ],
    ogImage: "https://assets.cuthongminh.com/games/paint-picture/logo.webp",
    relatedGames: ["learn-color", "mix-color"],
    relatedBlogs: [
      { slug: "be-tap-to-mau-sang-tao", title: "Bé Tập Tô Màu Sáng Tạo" },
      { slug: "day-be-to-mau-dung-cach", title: "Dạy Bé Tô Màu Đúng Cách" },
      { slug: "day-be-ve-tranh-don-gian", title: "Dạy Bé Vẽ Tranh Đơn Giản" },
    ],
  },
  "learn-clock": {
    title: "Học Xem Đồng Hồ cho bé - Trò chơi giáo dục Cú Thông Minh",
    description: "Bé học cách xem đồng hồ kim và đồng hồ điện tử. Làm quen, chọn đúng giờ và chỉnh kim đồng hồ.",
    keywords: [
      "học xem đồng hồ",
      "đồng hồ cho bé",
      "xem giờ",
      "kỹ năng sống cho bé",
      "dạy bé xem đồng hồ kim",
      "bé tập đọc giờ online",
      "trò chơi đồng hồ cho trẻ 4-8 tuổi",
      "học cách xem giờ cho bé lớp 1",
      "game học xem đồng hồ miễn phí",
    ],
    seoText:
      "Trò chơi Xem Đồng Hồ giúp bé từ 4-8 tuổi học cách đọc giờ trên đồng hồ kim và đồng hồ điện tử. Bé sẽ làm quen với các bộ phận đồng hồ, chọn đúng giờ theo yêu cầu và tự tay chỉnh kim đồng hồ. Kỹ năng thiết yếu cho cuộc sống hàng ngày.",
    seoFeatures: [
      "Đồng hồ kim và đồng hồ điện tử",
      "Làm quen các bộ phận đồng hồ",
      "Chọn đúng giờ theo yêu cầu",
      "Chỉnh kim đồng hồ tương tác",
    ],
    ogImage: "https://assets.cuthongminh.com/games/learn-clock/logo-main.webp",
    relatedGames: ["learn-numbers", "compare-quantity", "learn-math"],
    relatedBlogs: [
      { slug: "hoc-xem-dong-ho-cho-be", title: "Học Xem Đồng Hồ Cho Bé" },
      { slug: "be-5-tuoi-can-biet-nhung-gi", title: "Bé 5 Tuổi Cần Biết Những Gì Trước Khi Vào Lớp 1" },
      { slug: "day-be-hoc-qua-tro-choi", title: "Dạy Bé Học Qua Trò Chơi: 7 Phương Pháp Play-Based Learning" },
    ],
  },
  "mini-piano": {
    title: "Đàn Piano Tí Hon cho bé - Trò chơi giáo dục Cú Thông Minh",
    description:
      "Bé học chơi đàn piano, chơi theo bài hát vui nhộn và thử thách trí nhớ âm thanh. Khám phá âm nhạc vui vẻ.",
    keywords: [
      "đàn piano cho bé",
      "học chơi đàn",
      "âm nhạc cho bé",
      "bài hát thiếu nhi",
      "đàn piano online cho bé chơi miễn phí",
      "game chơi đàn piano cho trẻ em",
      "bé tập chơi piano đơn giản",
      "trò chơi âm nhạc cho trẻ mầm non",
    ],
    seoText:
      "Trò chơi Đàn Piano Tí Hon giúp bé từ 3-8 tuổi khám phá âm nhạc qua 3 chế độ: Học Đàn (chơi piano cổ điển tự do), Nhạc Công Nhí (chơi theo bài hát Kìa Con Bướm Vàng, Chúc Mừng Sinh Nhật...) và Đôi Tai Tinh Anh (thử thách tìm nốt đúng và lặp lại giai điệu).",
    seoFeatures: [
      "Piano cổ điển tương tác",
      "Chơi theo bài hát thiếu nhi",
      "Thử thách trí nhớ âm thanh",
      "Phát triển tai nghe nhạc",
    ],
    ogImage: "https://assets.cuthongminh.com/games/mini-piano/logo.webp",
    relatedGames: ["learn-instrument", "learn-notes"],
    relatedBlogs: [
      { slug: "dan-piano-ti-hon", title: "Đàn Piano Tí Hon" },
      { slug: "am-nhac-cho-tre-mam-non", title: "Âm Nhạc Cho Trẻ Mầm Non" },
    ],
  },
  "learn-syllable": {
    title: "Học Ghép Vần cho bé - Trò chơi giáo dục Cú Thông Minh",
    description: "Bé học cách kết hợp nguyên âm và phụ âm để tạo thành vần: ie, uo, ươ, oa, uy qua trò chơi tương tác.",
    keywords: [
      "ghép vần",
      "học vần tiếng việt",
      "nguyên âm phụ âm",
      "tập đọc cho bé",
      "bé học ghép vần tiếng việt online",
      "trò chơi học vần cho trẻ 4-7 tuổi",
      "dạy bé ghép nguyên âm phụ âm",
      "game học vần miễn phí cho trẻ mầm non",
    ],
    seoText:
      "Trò chơi Ghép Vần giúp bé từ 4-7 tuổi học cách kết hợp nguyên âm và phụ âm để tạo thành tiếng. Bé sẽ học các vần ie, uo, ươ, oa, uy và nhiều vần khác. Mỗi vần có bài học giới thiệu và trò chơi chọn vần đúng để luyện tập.",
    seoFeatures: [
      "Học vần ie, uo, ươ, oa, uy",
      "Kết hợp nguyên âm và phụ âm",
      "Trò chơi chọn vần đúng",
      "Nền tảng cho kỹ năng đọc",
    ],
    ogImage: "https://assets.cuthongminh.com/games/learn-syllable/logo.webp",
    relatedGames: ["learn-tones", "learn-alphabet"],
    relatedBlogs: [
      { slug: "be-hoc-ghep-van", title: "Bé Học Ghép Vần" },
    ],
  },
  "learn-terrain": {
    title: "Học Địa Hình cho bé - Trò chơi giáo dục Cú Thông Minh",
    description:
      "Bé khám phá các dạng địa hình tự nhiên: núi, sông, biển, sa mạc qua trò chơi tương tác sáng tạo và phiêu lưu.",
    keywords: [
      "địa hình tự nhiên",
      "núi sông biển",
      "địa lý cho bé",
      "khám phá tự nhiên",
      "bé học về núi sông biển sa mạc",
      "trò chơi khám phá địa hình online",
      "dạy trẻ về các dạng địa hình tự nhiên",
      "game phiêu lưu khám phá thiên nhiên cho bé",
    ],
    seoText:
      "Trò chơi Học Địa Hình giúp bé từ 3-8 tuổi khám phá các dạng địa hình tự nhiên: trên cạn (núi, đồi, đồng bằng), dưới nước (sông, biển, hồ) và địa hình đặc biệt (sa mạc, hang động). Bé sẽ nghe mô tả, xếp lớp địa hình, tìm hiểu ai sống ở đây và phiêu lưu khám phá.",
    seoFeatures: [
      "Địa hình trên cạn, dưới nước, đặc biệt",
      "Nghe đoán và xếp lớp địa hình",
      "Tìm hiểu sinh vật ở mỗi địa hình",
      "Phiêu lưu khám phá tự nhiên",
    ],
    ogImage: "https://assets.cuthongminh.com/games/learn-terrain/logo.webp",
    relatedGames: ["learn-flag", "learn-landmark", "learn-costume"],
    relatedBlogs: [{ slug: "kham-pha-dia-hinh", title: "Khám Phá Địa Hình Tự Nhiên" }],
  },
  "learn-body": {
    title: "Học Bộ Phận Cơ Thể cho bé - Trò chơi giáo dục Cú Thông Minh",
    description:
      "Bé nhận biết và gọi tên các bộ phận cơ thể: đầu & mặt, thân mình, bàn tay & chân qua trò chơi tương tác vui nhộn.",
    keywords: [
      "bộ phận cơ thể",
      "cơ thể người cho bé",
      "khoa học cho bé",
      "giáo dục sức khỏe",
      "bé học nhận biết bộ phận cơ thể",
      "dạy trẻ tên các bộ phận cơ thể người",
      "trò chơi khám phá cơ thể online cho bé",
      "bé 3 tuổi học về mắt mũi miệng",
    ],
    seoText:
      "Trò chơi Học Bộ Phận Cơ Thể giúp bé từ 3-6 tuổi nhận biết và gọi tên các bộ phận: đầu & mặt (mắt, mũi, miệng, tai), thân mình (vai, bụng, lưng) và bàn tay & bàn chân. Bé sẽ khám phá qua hình ảnh, chạm và nói, tập nói tên, nhận diện và chơi trò ghép đôi.",
    seoFeatures: [
      "Đầu & mặt, thân mình, bàn tay & chân",
      "Khám phá cơ thể qua hình ảnh",
      "Chạm và nói tên bộ phận",
      "Tìm hiểu chức năng cơ thể",
    ],
    ogImage: "https://assets.cuthongminh.com/games/learn-body/logo.webp",
    relatedGames: ["learn-animal", "learn-fruit", "learn-food"],
    relatedBlogs: [
      { slug: "be-hoc-bo-phan-co-the", title: "Bé Học Bộ Phận Cơ Thể" },
      { slug: "be-hoc-ve-co-the-nguoi", title: "Bé Học Về Cơ Thể Người" },
    ],
  },
  "learn-notes": {
    title: "Học Nốt Nhạc cho bé - Trò chơi giáo dục Cú Thông Minh",
    description: "Bé làm quen với nốt nhạc Đồ Rê Mi Fa Sol La Si trên khuông nhạc qua hình ảnh và âm thanh sinh động.",
    keywords: [
      "học nốt nhạc",
      "đồ rê mi",
      "khuông nhạc cho bé",
      "âm nhạc giáo dục",
      "bé học nốt nhạc đồ rê mi fa sol la si",
      "trò chơi học nốt nhạc online",
      "dạy bé đọc nốt nhạc trên khuông",
      "game âm nhạc cho trẻ 4-8 tuổi",
    ],
    seoText:
      "Trò chơi Học Nốt Nhạc giúp bé từ 4-8 tuổi làm quen với các nốt nhạc Đồ, Rê, Mi, Fa, Sol, La, Si trên khuông nhạc. Chia thành nhóm cơ bản (Đồ-Fa) và nâng cao (Sol-Đố), bé sẽ nghe âm thanh, chọn nốt đúng, sắp xếp nốt và luyện tập tổng hợp.",
    seoFeatures: [
      "Nốt nhạc cơ bản: Đồ, Rê, Mi, Fa",
      "Nốt nhạc nâng cao: Sol, La, Si, Đố",
      "Nghe âm thanh và chọn nốt đúng",
      "Sắp xếp nốt trên khuông nhạc",
    ],
    ogImage: "https://assets.cuthongminh.com/games/learn-notes/logo.webp",
    relatedGames: ["learn-instrument", "mini-piano"],
    relatedBlogs: [
      { slug: "am-nhac-cho-tre-mam-non", title: "Âm Nhạc Cho Trẻ Mầm Non" },
      { slug: "lam-quen-voi-nhac-cu", title: "Làm Quen Với Nhạc Cụ" },
    ],
  },
  "learn-danger": {
    title: "Học Đồ Vật Nguy Hiểm cho bé - Trò chơi giáo dục Cú Thông Minh",
    description:
      "Bé học nhận biết đồ vật nguy hiểm trong bếp, phòng tắm và đồ điện. Rèn kỹ năng an toàn qua tình huống thực tế.",
    keywords: [
      "đồ vật nguy hiểm",
      "an toàn cho bé",
      "kỹ năng sống",
      "phòng tránh tai nạn",
      "dạy bé nhận biết đồ vật nguy hiểm trong nhà",
      "trò chơi an toàn cho trẻ mầm non",
      "bé học phòng tránh tai nạn gia đình",
      "game kỹ năng sống an toàn cho bé",
    ],
    seoText:
      "Trò chơi Đồ Vật Nguy Hiểm giúp bé từ 3-6 tuổi nhận biết các đồ vật nguy hiểm trong nhà: trong bếp (dao, bếp lửa), phòng tắm & xung quanh (hóa chất, sàn trơn) và đồ điện (ổ cắm, dây điện). Bé sẽ học tên, khám phá ngôi nhà, xử lý tình huống và trả lời đúng/sai.",
    seoFeatures: [
      "Đồ nguy hiểm trong bếp, phòng tắm, đồ điện",
      "Khám phá ngôi nhà tương tác",
      "Xử lý tình huống an toàn",
      "Rèn kỹ năng phòng tránh tai nạn",
    ],
    ogImage: "https://assets.cuthongminh.com/games/learn-danger/logo.webp",
    relatedGames: ["learn-vehicle", "learn-occupation", "learn-hygiene"],
    relatedBlogs: [
      { slug: "day-be-nhan-biet-nguoi-la", title: "Dạy Bé Nhận Biết Người Lạ" },
      { slug: "ky-nang-tu-phuc-vu-cho-be", title: "Kỹ Năng Tự Phục Vụ Cho Bé" },
    ],
  },
  "learn-cleaning": {
    title: "Học Dọn Dẹp cho bé - Trò chơi giáo dục Cú Thông Minh",
    description:
      "Bé học cách dọn dẹp phòng, dọn bếp gọn gàng và phân loại rác đúng cách qua các tình huống tương tác thực tế.",
    keywords: [
      "dạy bé làm việc nhà",
      "bé tự dọn dẹp đồ chơi",
      "kỹ năng sống cho bé",
      "phân loại rác",
      "dạy trẻ ngăn nắp",
      "trò chơi dọn dẹp nhà cửa",
      "giáo dục trẻ mầm non",
    ],
    seoText:
      "Trò chơi Học Dọn Dẹp giúp bé từ 3-6 tuổi rèn luyện kỹ năng sống tự lập thông qua việc làm quen với các công việc nhà phù hợp lứa tuổi. Bé học cách dọn dẹp phòng ngủ, sắp xếp đồ vật trong bếp và quan trọng nhất là biết cách phân loại rác bảo vệ môi trường.",
    seoFeatures: [
      "Biết cách dọn dẹp và sắp xếp phòng",
      "Phân loại rác đúng cách",
      "Rèn luyện kỹ năng sống tự lập",
      "Hình thành thói quen ngăn nắp",
    ],
    ogImage: "https://assets.cuthongminh.com/games/learn-cleaning/logo.webp",
    relatedGames: ["learn-hygiene", "learn-danger", "learn-occupation"],
    relatedBlogs: [
      { slug: "day-be-lam-viec-nha", title: "Cách Dạy Bé Làm Việc Nhà Theo Độ Tuổi: Bí Quyết Để Con Tự Giác" },
    ],
  },
  "mini-sudoku-kids": {
    title: "Sudoku cho bé - Trò chơi giáo dục Cú Thông Minh",
    description:
      "Bé học suy luận logic qua bảng hình đơn giản 2×2 và 3×3. Điền hình, màu sắc, con vật vào ô trống theo quy luật hàng và cột.",
    keywords: [
      "sudoku cho bé",
      "trò chơi logic",
      "tư duy logic cho bé",
      "sudoku hình ảnh",
      "bảng sudoku trẻ em",
      "game logic cho trẻ mầm non",
      "rèn tư duy logic cho bé 3-6 tuổi",
    ],
    seoText:
      "Trò chơi Sudoku giúp bé từ 3-6 tuổi rèn tư duy logic qua các bảng hình đơn giản. Thay vì số như sudoku người lớn, bé sẽ điền hình ảnh, màu sắc và con vật vào ô trống sao cho không lặp lại trong cùng hàng và cột. Bắt đầu với bảng 2×2 dễ hiểu, sau đó nâng dần lên bảng 3×3 với nhiều ô trống hơn.",
    seoFeatures: [
      "Bảng sudoku 2×2 cho người mới bắt đầu",
      "Bảng sudoku 3×3 nâng cao",
      "Điền hình, màu sắc, con vật",
      "Rèn tư duy logic và suy luận",
    ],
    ogImage: "https://assets.cuthongminh.com/games/mini-sudoku-kids/logo.webp",
    relatedGames: ["find-pattern", "odd-one-out", "line-connect"],
    relatedBlogs: [
      { slug: "day-be-tu-duy-logic", title: "Dạy Bé Tư Duy Logic" },
      { slug: "loi-ich-tro-choi-tri-tue", title: "Lợi Ích Của Trò Chơi Trí Tuệ" },
    ],
  },
  "learn-english-vocab": {
    title: "Học Từ Vựng Tiếng Anh cho bé - Trò chơi giáo dục Cú Thông Minh",
    description:
      "Bé học từ vựng tiếng Anh cơ bản qua hình ảnh và phát âm: động vật, trái cây, màu sắc, số đếm, gia đình, giao thông. Trò chơi flashcard, nghe chọn và ghép từ tương tác.",
    keywords: [
      "học tiếng anh cho bé",
      "từ vựng tiếng anh trẻ em",
      "bé học tiếng anh",
      "english for kids",
      "tiếng anh mầm non",
      "game học tiếng anh cho bé online",
      "bé học từ vựng tiếng anh qua hình ảnh",
      "trò chơi tiếng anh cho trẻ 3-6 tuổi",
    ],
    seoText:
      "Trò chơi Học Từ Vựng Tiếng Anh giúp bé từ 3-8 tuổi làm quen với tiếng Anh qua 7 chủ đề quen thuộc: Động Vật, Trái Cây, Màu Sắc, Số Đếm, Giao Thông, Gia Đình và Cơ Thể Người. Mỗi chủ đề có các bài học tương tác: flashcard học từ, tập phát âm giọng bản ngữ, nghe phát âm chọn hình đúng, ghép chữ cái thành từ và bài kiểm tra tổng hợp.",
    seoFeatures: [
      "Học từ vựng tiếng Anh qua 7 chủ đề",
      "Phát âm chuẩn bằng giọng bản ngữ",
      "Trò chơi ghép chữ cái thành từ",
      "Quiz kiểm tra tổng hợp",
    ],
    ogImage: "https://assets.cuthongminh.com/games/learn-english-vocab/logo.webp",
    relatedGames: ["learn-animal", "learn-fruit", "learn-color"],
    relatedBlogs: [],
  },
  "learn-english-alphabet": {
    title: "Bảng Chữ Cái Tiếng Anh cho bé - Trò chơi giáo dục Cú Thông Minh",
    description: "Bé học bảng chữ cái tiếng Anh từ A-Z qua hình ảnh minh họa sinh động, nghe phát âm và tập đánh vần từ vựng.",
    keywords: [
      "bảng chữ cái tiếng anh",
      "alphabet for kids",
      "học chữ cái tiếng anh online",
      "tiếng anh mầm non",
      "học tiếng anh cho bé",
      "bé học bảng chữ cái tiếng anh",
      "trò chơi bảng chữ cái tiếng anh",
      "english alphabet for kids"
    ],
    seoText: "Trò chơi Bảng Chữ Cái Tiếng Anh giúp bé nhận diện 26 chữ cái từ A đến Z. Mỗi chữ cái đi kèm với một từ vựng minh họa, giúp bé không chỉ nhớ mặt chữ mà còn mở rộng vốn từ vựng cơ bản.",
    seoFeatures: ["Học 26 chữ cái tiếng Anh", "Phát âm chuẩn từng chữ cái", "Hình ảnh minh họa sinh động", "Trò chơi ghép chữ cái"],
    ogImage: "https://assets.cuthongminh.com/games/learn-english-alphabet/logo.webp",
    relatedGames: ["learn-english-vocab", "learn-alphabet"],
    relatedBlogs: [
      { slug: "day-be-hoc-bang-chu-cai-tieng-anh", title: "Cách Dạy Bé Học Bảng Chữ Cái Tiếng Anh Tại Nhà" },
    ],
  },
  "talk-with-owl": {
    title: "Giao Tiếp Tiếng Anh với AI - Trò chơi giáo dục Cú Thông Minh",
    description: "Bé luyện nói tiếng Anh với cô giáo AI Cú Thông Minh qua 3 bài học: Học từ mới, Học câu, Hỏi đáp giao tiếp. 10 chủ đề: Chào hỏi, Trái cây, Màu sắc, Số đếm, Con vật, Đồ ăn, Giao thông, Gia đình, Cơ thể, Dụng cụ học tập.",
    keywords: [
      "học giao tiếp tiếng anh cho bé",
      "luyện nói tiếng anh trẻ em",
      "tiếng anh giao tiếp mầm non",
      "trò chuyện tiếng anh AI",
      "học tiếng anh online cho bé",
      "cô giáo AI dạy tiếng anh",
      "tập nói tiếng anh cho trẻ",
      "learn english speaking for kids",
      "english conversation for children",
      "tiếng anh cho bé 3-8 tuổi",
    ],
    seoText:
      "Trò chơi Giao Tiếp Tiếng Anh giúp bé từ 3-8 tuổi luyện nói tiếng Anh qua 3 bài học AI với cô giáo Cú Thông Minh: Bài 1 — Học Từ Mới (AI dạy từng từ vựng), Bài 2 — Học Câu (AI dạy câu giao tiếp trong ngữ cảnh thực tế), Bài 3 — Hỏi Đáp (AI hội thoại tự do, đóng vai tình huống). 10 chủ đề quen thuộc: Chào Hỏi, Trái Cây, Màu Sắc, Số Đếm, Con Vật, Đồ Ăn, Giao Thông, Gia Đình, Cơ Thể Người và Dụng Cụ Học Tập.",
    seoFeatures: [
      "3 bài học AI: Học Từ Mới → Học Câu → Hỏi Đáp",
      "10 chủ đề từ vựng phong phú",
      "Cô giáo AI nói tiếng Việt xen tiếng Anh",
      "Luyện phát âm và giao tiếp thực tế",
    ],
    ogImage: "https://assets.cuthongminh.com/assets/logo.webp",
    relatedGames: ["learn-english-vocab", "learn-english-alphabet", "learn-animal"],
    relatedBlogs: [
      { slug: "luyen-noi-tieng-anh-cho-be-voi-ai", title: "Luyện Nói Tiếng Anh Cho Bé Với AI: Phương Pháp Vượt Trội" },
    ],
  },
  "sequence-sort": {
    title: "Sắp Xếp Thứ Tự cho bé - Trò chơi giáo dục Cú Thông Minh",
    description:
      "Bé học sắp xếp theo kích thước, số lượng và màu sắc qua trò chơi tương tác vui nhộn. Phát triển tư duy logic và khả năng so sánh.",
    keywords: [
      "sắp xếp thứ tự",
      "trò chơi sắp xếp cho bé",
      "so sánh kích thước",
      "tư duy logic cho bé",
      "bé học sắp xếp nhỏ lớn online",
      "trò chơi so sánh số lượng cho trẻ",
      "game tư duy sắp xếp cho trẻ mầm non",
      "rèn luyện tư duy logic cho bé 3-6 tuổi",
    ],
    seoText:
      "Trò chơi Sắp Xếp giúp bé từ 3-6 tuổi phát triển tư duy logic qua 3 dạng bài tập: sắp xếp theo kích thước (nhỏ đến lớn), sắp xếp theo số lượng (ít đến nhiều) và sắp xếp theo màu sắc (nhạt đến đậm). Bé sẽ quan sát, so sánh và nhấn chọn đúng thứ tự. Mỗi dạng có 3 bài học từ dễ đến thử thách.",
    seoFeatures: [
      "Sắp xếp theo kích thước",
      "Sắp xếp theo số lượng",
      "Sắp xếp theo màu sắc",
      "Phát triển tư duy so sánh và logic",
    ],
    ogImage: "https://assets.cuthongminh.com/games/sequence-sort/logo.webp",
    relatedGames: ["find-pattern", "odd-one-out", "mini-sudoku-kids"],
    relatedBlogs: [
      { slug: "day-be-tu-duy-logic", title: "Dạy Bé Tư Duy Logic" },
      { slug: "loi-ich-tro-choi-tri-tue", title: "Lợi Ích Của Trò Chơi Trí Tuệ" },
    ],
  },
};

export const GAME_SEO: Record<string, GameSeoData> = Object.fromEntries(
  Object.entries(RAW_GAME_SEO).map(([gameId, seo]) => [
    gameId,
    {
      ...seo,
      title: SEO_OVERRIDES[gameId]?.title ?? buildMetaTitle(gameId, seo.title),
      description: SEO_OVERRIDES[gameId]?.description ?? buildMetaDescription(gameId, seo.description),
    },
  ]),
);
