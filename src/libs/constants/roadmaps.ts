/**
 * Roadmap definitions for structured learning paths.
 *
 * DESIGN: Roadmaps are "curated playlists" of courses. All course metadata
 * (title, icon, lessons) lives in courses.ts — roadmaps only reference IDs.
 *
 * COMPACT FORMAT: Games can be specified as:
 *   - "course-id"           → uses course title as label
 *   - "course-id:Label"     → uses custom label override
 */

import { getCourseTitle } from "@/libs/constants/course-helpers";

// ─── Types ───────────────────────────────────────────────────────────────────

/** A game entry in a roadmap — resolved from compact input */
export interface RoadmapGame {
  gameId: string;
  label?: string;
}

export interface RoadmapCategory {
  id: string;
  title: string;
  emoji: string;
  games: RoadmapGame[];
}

export interface RoadmapStage {
  id: string;
  number: number;
  title: string;
  subtitle: string;
  emoji: string;
  color: "green" | "blue" | "orange";
  bgTheme: string;
  categories: RoadmapCategory[];
}

export interface Roadmap {
  id: string;
  slug: string;
  title: string;
  description: string;
  ageRange: [number, number];
  educationalLevel: string;
  heroImage: string;
  stages: RoadmapStage[];
}

// ─── Compact builder helpers ─────────────────────────────────────────────────

/**
 * Parse a compact game string into a RoadmapGame object.
 * Format: "course-id" or "course-id:Custom Label"
 */
function g(input: string): RoadmapGame {
  const colonIdx = input.indexOf(":");
  if (colonIdx === -1) return { gameId: input };
  return { gameId: input.slice(0, colonIdx), label: input.slice(colonIdx + 1) };
}

/** Shorthand to build a category */
function cat(id: string, title: string, emoji: string, games: string[]): RoadmapCategory {
  return { id, title, emoji, games: games.map(g) };
}

/** Shorthand to build a stage */
function stage(
  id: string,
  number: number,
  title: string,
  subtitle: string,
  emoji: string,
  color: "green" | "blue" | "orange",
  bgTheme: string,
  categories: RoadmapCategory[],
): RoadmapStage {
  return { id, number, title, subtitle, emoji, color, bgTheme, categories };
}

// ─── Resolve game label ──────────────────────────────────────────────────────

export function getGameLabel(game: RoadmapGame): string {
  return game.label ?? getCourseTitle(game.gameId);
}

// ─── Bé Khám Phá (3-4 tuổi) ────────────────────────────────────────────────

export const DISCOVERY_ROADMAP: Roadmap = {
  id: "be-kham-pha",
  slug: "be-kham-pha",
  title: "Bé Khám Phá",
  description:
    "Lộ trình khám phá thế giới xung quanh dành cho bé 3-4 tuổi. Nhận biết màu sắc, hình dạng, động vật và phát triển giác quan qua trò chơi tương tác vui nhộn.",
  ageRange: [3, 4],
  educationalLevel: "Preschool",
  heroImage: "https://assets.cuthongminh.com/assets/roadmaps/be-kham-pha-hero.webp",
  stages: [
    stage(
      "nhan-biet",
      1,
      "Nhận Biết",
      "Làm quen với thế giới xung quanh",
      "🌈",
      "green",
      "from-emerald-50 to-green-50",
      [
        cat("mau-sac-hinh-dang", "Màu Sắc & Hình Dạng", "🎨", ["learn-color", "learn-shape"]),
        cat("dong-vat-trai-cay", "Động Vật & Trái Cây", "🐾", ["learn-animal", "learn-fruit"]),
      ],
    ),
    stage("kham-pha", 2, "Khám Phá", "Tìm hiểu cảm xúc, cơ thể và thế giới", "🔍", "blue", "from-blue-50 to-sky-50", [
      cat("cam-xuc-co-the", "Cảm Xúc & Cơ Thể", "💛", ["learn-emotion", "learn-body"]),
      cat("the-gioi", "Thế Giới Quanh Bé", "🌍", ["learn-vehicle", "learn-weather", "learn-flower:Hoa & Cây"]),
    ]),
    stage("sang-tao", 3, "Sáng Tạo", "Phát triển nghệ thuật và âm nhạc", "🎵", "orange", "from-orange-50 to-amber-50", [
      cat("nghe-thuat", "Nghệ Thuật", "🖌️", ["paint-picture", "mix-color"]),
      cat("am-nhac", "Âm Nhạc", "🎹", ["learn-instrument", "mini-piano"]),
    ]),
  ],
};

// ─── Tiền Lớp 1 (5-6 tuổi) ─────────────────────────────────────────────────

export const PRE_GRADE_1_ROADMAP: Roadmap = {
  id: "tien-lop-1",
  slug: "tien-lop-1",
  title: "Tiền Lớp 1",
  description:
    "Lộ trình chuẩn bị vào lớp 1 dành cho bé 5-6 tuổi. Bám sát Bộ chuẩn phát triển trẻ em 5 tuổi (QĐ 4222/2024) — giúp bé tự tin bước vào tiểu học.",
  ageRange: [5, 6],
  educationalLevel: "Pre-primary",
  heroImage:
    "https://vnlppyavpkuerviyszxg.supabase.co/storage/v1/object/public/blog-images/hero_chuan-bi-vao-lop-1-toan-dien-1780659661318.webp",
  stages: [
    stage(
      "lam-quen",
      1,
      "Làm Quen",
      "Nhận biết cơ bản & hình thành thói quen",
      "📗",
      "green",
      "from-emerald-50 to-green-50",
      [
        cat("tieng-viet-1", "Tiếng Việt", "🔤", ["learn-alphabet", "learn-tones"]),
        cat("toan-1", "Toán Học", "🔢", ["learn-numbers", "learn-shape", "compare-quantity"]),
        cat("kham-pha-1", "Khám Phá", "🌟", ["learn-color", "learn-emotion", "learn-body", "learn-animal"]),
      ],
    ),
    stage(
      "nen-tang",
      2,
      "Nền Tảng",
      "Phát triển đọc hiểu & tư duy toán sơ khai",
      "📘",
      "blue",
      "from-blue-50 to-sky-50",
      [
        cat("tieng-viet-2", "Tiếng Việt", "🔤", ["learn-syllable", "learn-word"]),
        cat("toan-2", "Toán Học", "🔢", ["learn-math:Cộng trừ", "find-pattern", "sequence-sort"]),
        cat("ky-nang-2", "Kỹ Năng Sống", "💛", [
          "learn-hygiene",
          "learn-traffic",
          "learn-danger",
          "learn-food:Dinh dưỡng",
        ]),
      ],
    ),
    stage(
      "tang-toc",
      3,
      "Tăng Tốc",
      "Củng cố kiến thức & rèn tư duy nâng cao",
      "📙",
      "orange",
      "from-orange-50 to-amber-50",
      [
        cat("tieng-viet-3", "Tiếng Việt", "🔤", [
          "learn-english-alphabet:ABC Tiếng Anh",
          "learn-english-vocab:Từ vựng Anh",
        ]),
        cat("toan-3", "Toán & Nhận Thức", "🔢", ["learn-clock", "learn-money"]),
        cat("tu-duy-3", "Tư Duy Logic", "🧠", ["mini-sudoku-kids", "odd-one-out", "maze-runner", "find-differences"]),
      ],
    ),
  ],
};

// ─── Tiểu Học Vui (7-8+ tuổi) ──────────────────────────────────────────────

export const PRIMARY_SCHOOL_ROADMAP: Roadmap = {
  id: "tieu-hoc-vui",
  slug: "tieu-hoc-vui",
  title: "Tiểu Học Vui",
  description:
    "Lộ trình học tập nâng cao cho bé từ 7 tuổi trở lên. Đọc viết thành thạo, toán tư duy, tiếng Anh cơ bản và rèn luyện logic — đồng hành cùng bé suốt những năm đầu tiểu học.",
  ageRange: [7, 12],
  educationalLevel: "Primary",
  heroImage: "https://assets.cuthongminh.com/assets/roadmaps/tieu-hoc-vui-hero.webp",
  stages: [
    stage(
      "doc-viet",
      1,
      "Đọc Viết",
      "Đọc hiểu & xây dựng nền tảng ngôn ngữ",
      "📖",
      "green",
      "from-emerald-50 to-green-50",
      [
        cat("tieng-viet-nc", "Tiếng Việt Nâng Cao", "🔤", ["learn-syllable", "learn-word"]),
        cat("tieng-anh", "Tiếng Anh", "🇬🇧", [
          "learn-english-alphabet:Bảng chữ cái Anh",
          "learn-english-vocab:Từ vựng Anh",
        ]),
      ],
    ),
    stage(
      "toan-nhan-thuc",
      2,
      "Toán & Nhận Thức",
      "Phép tính, đo lường và nhận thức thế giới",
      "🔢",
      "blue",
      "from-blue-50 to-sky-50",
      [
        cat("phep-tinh", "Phép Tính", "➕", ["learn-math:Cộng trừ", "learn-multiply", "learn-divide"]),
        cat("nhan-thuc", "Nhận Thức", "🕐", ["learn-clock", "learn-money", "find-pattern", "sequence-sort"]),
      ],
    ),
    stage(
      "tu-duy-logic",
      3,
      "Tư Duy Logic",
      "Rèn luyện tư duy phản biện & giải quyết vấn đề",
      "🧠",
      "orange",
      "from-orange-50 to-amber-50",
      [
        cat("logic-co-ban", "Logic & Giải Đố", "🧩", ["mini-sudoku-kids", "odd-one-out", "maze-runner"]),
        cat("quan-sat", "Quan Sát & Nối", "👁️", ["find-differences", "line-connect"]),
      ],
    ),
  ],
};

// ─── Registry & Lookups ─────────────────────────────────────────────────────

export const ROADMAPS: Roadmap[] = [DISCOVERY_ROADMAP, PRE_GRADE_1_ROADMAP, PRIMARY_SCHOOL_ROADMAP];

export function getRoadmapBySlug(slug: string): Roadmap | undefined {
  return ROADMAPS.find((r) => r.slug === slug);
}

export function getRoadmapForAge(age: number): Roadmap {
  return ROADMAPS.find((r) => age >= r.ageRange[0] && age <= r.ageRange[1]) ?? PRE_GRADE_1_ROADMAP;
}

export function getRoadmapGameIds(roadmap: Roadmap): string[] {
  return roadmap.stages.flatMap((s) => s.categories.flatMap((c) => c.games.map((g) => g.gameId)));
}

export function getRoadmapTotalGames(roadmap: Roadmap): number {
  return getRoadmapGameIds(roadmap).length;
}
