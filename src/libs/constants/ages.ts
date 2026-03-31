export type AgeGroupType = "3-tuoi" | "4-tuoi" | "5-tuoi" | "6-8-tuoi";

export interface AgeGroupDef {
  id: AgeGroupType;
  slug: string;
  title: string;
  shortTitle: string;
  description: string;
  keywords: string[];
  heroDescription: string;
  gameIds: string[]; // List of course IDs suitable for this age
  blogTags: string[]; // Tags to pull related blogs
}

export const AGE_GROUPS: AgeGroupDef[] = [
  {
    id: "3-tuoi",
    slug: "3-tuoi",
    title: "Trò Chơi Giáo Dục Cho Bé 3 Tuổi",
    shortTitle: "Bé 3 Tuổi",
    description: "Khám phá các trò chơi tương tác giúp bé 3 tuổi nhận biết màu sắc, động vật, hình khối và làm quen với số đếm trên Cú Thông Minh.",
    keywords: [
      "trò chơi cho bé 3 tuổi",
      "ứng dụng học tập cho trẻ 3 tuổi",
      "bé 3 tuổi học gì",
      "game giáo dục mầm non",
      "trò chơi học màu sắc",
      "trò chơi nhận biết động vật",
    ],
    heroDescription: "Giai đoạn 3 tuổi là lúc bé bắt đầu tò mò khám phá thế giới xung quanh. Các trò chơi thiết kế riêng giúp bé phát triển thị giác, thính giác qua việc nhận biết màu sắc, âm thanh, động vật và hình khối một cách tự nhiên nhất.",
    gameIds: [
      "learn-color",
      "learn-animal",
      "learn-fruit",
      "learn-shape",
      "learn-emotion",
      "learn-vehicle",
      "learn-weather",
      "mini-piano",
      "paint-picture"
    ],
    blogTags: ["trẻ 3 tuổi", "nhận thức", "giáo dục sớm", "phát triển ngôn ngữ", "mầm non"],
  },
  {
    id: "4-tuoi",
    slug: "4-tuoi",
    title: "Trò Chơi Giáo Dục Cho Bé 4 Tuổi",
    shortTitle: "Bé 4 Tuổi",
    description: "Bộ trò chơi phát triển tư duy, học bảng chữ cái và số đếm cơ bản được thiết kế chuyên biệt cho bé 4 tuổi tại Cú Thông Minh.",
    keywords: [
      "trò chơi cho bé 4 tuổi",
      "học chữ cái cho bé 4 tuổi",
      "toán cho bé 4 tuổi",
      "phát triển tư duy cho trẻ mầm non",
      "trò chơi tìm quy luật",
    ],
    heroDescription: "Ở tuổi lên 4, bé đã sẵn sàng cho những thử thách mới. Cùng con khám phá bảng chữ cái, đếm số từ 1-10 và rèn luyện tư duy logic qua các bài học tương tác sinh động.",
    gameIds: [
      "learn-alphabet",
      "learn-numbers",
      "learn-word",
      "learn-food",
      "find-pattern",
      "learn-hygiene",
      "learn-danger",
      "line-connect",
      "learn-body"
    ],
    blogTags: ["trẻ 4 tuổi", "phát triển tư duy", "kỹ năng sống", "toán học", "dạy bé học chữ"],
  },
  {
    id: "5-tuoi",
    slug: "5-tuoi",
    title: "Trò Chơi Chuẩn Bị Vào Lớp 1 Cho Bé 5 Tuổi",
    shortTitle: "Bé 5 Tuổi",
    description: "Các trò chơi tiền tiểu học học ghép vần, dấu thanh, cộng trừ cơ bản từ 1-20 giúp bé 5 tuổi trang bị kiến thức vững vàng trước khi vào lớp 1.",
    keywords: [
      "trò chơi cho bé 5 tuổi",
      "chuẩn bị vào lớp 1",
      "toán lớp 1 cho bé",
      "ghép vần tiếng việt cho bé 5 tuổi",
      "tiền tiểu học",
      "dạy bé môn toán",
    ],
    heroDescription: "Năm 5 tuổi là bước đệm vô cùng quan trọng trước khi bước vào Tiểu học. Hệ thống bài học 'Tiền tiểu học' này giúp con nắm vững bảng chữ cái, dấu thanh, ghép vần và các phép tính cộng trừ cơ bản.",
    gameIds: [
      "learn-tones",
      "learn-syllable",
      "compare-quantity",
      "learn-traffic",
      "learn-occupation",
      "learn-clock",
      "odd-one-out",
      "learn-instrument",
      "mini-sudoku-kids",
      "find-differences"
    ],
    blogTags: ["tiền tiểu học", "chuẩn bị vào lớp 1", "trẻ 5 tuổi", "dạy con học toán", "sự tự tin"],
  },
  {
    id: "6-8-tuoi",
    slug: "6-8-tuoi",
    title: "Trò Chơi Khám Phá Thế Giới Cho Bé 6-8 Tuổi",
    shortTitle: "Bé 6-8 Tuổi",
    description: "Tranh tài toán học có nhớ, đọc hiểu, khoa học tự nhiên, và khám phá kiến thức tự nhiên, địa lý giúp trẻ 6-8 tuổi học tốt ở trường.",
    keywords: [
      "trò chơi toán học lớp 1",
      "trò chơi toán lớp 2",
      "ứng dụng học tập lớp 2",
      "khoa học cho bé 7 tuổi",
      "tìm hiểu cờ các nước",
      "trò chơi giáo dục cấp 1",
    ],
    heroDescription: "Khi con đã vào cấp 1, bài học sẽ vượt ra khỏi những giới hạn cơ bản, mở rộng sang khám phá thiên nhiên, sinh học, các quốc gia trên thế giới và rèn luyện tư duy toán học có nhớ (phép nhân, phép chia).",
    gameIds: [
      "learn-math",
      "learn-multiply",
      "learn-divide",
      "learn-dinosaur",
      "learn-flag",
      "learn-landmark",
      "learn-terrain",
      "learn-flower",
      "learn-costume",
      "learn-notes"
    ],
    blogTags: ["trẻ tiểu học", "học toán", "trẻ 6 tuổi", "khám phá khoa học", "kỹ năng mềm"],
  }
];
