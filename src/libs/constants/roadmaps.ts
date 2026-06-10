/**
 * Roadmap definitions for structured learning paths.
 * Each roadmap organizes existing games (COURSES) into stages and categories.
 */

export interface RoadmapGame {
  /** Must match a course id from COURSES */
  gameId: string;
  /** Short label shown on the node */
  label: string;
}

export interface RoadmapCategory {
  id: string;
  title: string;
  emoji: string;
  games: RoadmapGame[];
}

export interface RoadmapStage {
  id: string;
  /** Display number (1, 2, 3…) */
  number: number;
  title: string;
  subtitle: string;
  emoji: string;
  /** Accent colour for the stage pill and progress bar */
  color: "green" | "blue" | "orange";
  /** Background theme gradient classes */
  bgTheme: string;
  /** Decorative icon/class for the stage zone */
  categories: RoadmapCategory[];
}

export interface Roadmap {
  id: string;
  slug: string;
  title: string;
  description: string;
  stages: RoadmapStage[];
}

// ─── Pre-Grade 1 Roadmap ────────────────────────────────────────────────────

export const PRE_GRADE_1_ROADMAP: Roadmap = {
  id: "tien-lop-1",
  slug: "tien-lop-1",
  title: "Tiền Lớp 1",
  description:
    "Lộ trình chuẩn bị vào lớp 1 dành cho bé 5-6 tuổi. Bám sát Bộ chuẩn phát triển trẻ em 5 tuổi (QĐ 4222/2024) — giúp bé tự tin bước vào tiểu học.",

  stages: [
    // ── Stage 1: Làm Quen ──────────────────────────────────────────────
    {
      id: "lam-quen",
      number: 1,
      title: "Làm Quen",
      subtitle: "Nhận biết cơ bản & hình thành thói quen",
      emoji: "📗",
      color: "green",
      bgTheme: "from-emerald-50 to-green-50",
      categories: [
        {
          id: "tieng-viet-1",
          title: "Tiếng Việt",
          emoji: "🔤",
          games: [
            { gameId: "learn-alphabet", label: "Bảng chữ cái" },
            { gameId: "learn-tones", label: "Dấu thanh" },
          ],
        },
        {
          id: "toan-1",
          title: "Toán Học",
          emoji: "🔢",
          games: [
            { gameId: "learn-numbers", label: "Số đếm" },
            { gameId: "learn-shape", label: "Hình dạng" },
            { gameId: "compare-quantity", label: "So sánh" },
          ],
        },
        {
          id: "kham-pha-1",
          title: "Khám Phá",
          emoji: "🌟",
          games: [
            { gameId: "learn-color", label: "Màu sắc" },
            { gameId: "learn-emotion", label: "Cảm xúc" },
            { gameId: "learn-body", label: "Cơ thể" },
            { gameId: "learn-animal", label: "Động vật" },
          ],
        },
      ],
    },

    // ── Stage 2: Nền Tảng ──────────────────────────────────────────────
    {
      id: "nen-tang",
      number: 2,
      title: "Nền Tảng",
      subtitle: "Phát triển đọc hiểu & tư duy toán sơ khai",
      emoji: "📘",
      color: "blue",
      bgTheme: "from-blue-50 to-sky-50",
      categories: [
        {
          id: "tieng-viet-2",
          title: "Tiếng Việt",
          emoji: "🔤",
          games: [
            { gameId: "learn-syllable", label: "Ghép vần" },
            { gameId: "learn-word", label: "Từ vựng" },
          ],
        },
        {
          id: "toan-2",
          title: "Toán Học",
          emoji: "🔢",
          games: [
            { gameId: "learn-math", label: "Cộng trừ" },
            { gameId: "find-pattern", label: "Quy luật" },
            { gameId: "sequence-sort", label: "Sắp xếp" },
          ],
        },
        {
          id: "ky-nang-2",
          title: "Kỹ Năng Sống",
          emoji: "💛",
          games: [
            { gameId: "learn-hygiene", label: "Vệ sinh" },
            { gameId: "learn-traffic", label: "Giao thông" },
            { gameId: "learn-danger", label: "An toàn" },
            { gameId: "learn-food", label: "Dinh dưỡng" },
          ],
        },
      ],
    },

    // ── Stage 3: Tăng Tốc ──────────────────────────────────────────────
    {
      id: "tang-toc",
      number: 3,
      title: "Tăng Tốc",
      subtitle: "Củng cố kiến thức & rèn tư duy nâng cao",
      emoji: "📙",
      color: "orange",
      bgTheme: "from-orange-50 to-amber-50",
      categories: [
        {
          id: "tieng-viet-3",
          title: "Tiếng Việt",
          emoji: "🔤",
          games: [
            { gameId: "learn-english-alphabet", label: "ABC Tiếng Anh" },
            { gameId: "learn-english-vocab", label: "Từ vựng Anh" },
          ],
        },
        {
          id: "toan-3",
          title: "Toán & Nhận Thức",
          emoji: "🔢",
          games: [
            { gameId: "learn-clock", label: "Xem giờ" },
            { gameId: "learn-money", label: "Tiền tệ" },
          ],
        },
        {
          id: "tu-duy-3",
          title: "Tư Duy Logic",
          emoji: "🧠",
          games: [
            { gameId: "mini-sudoku-kids", label: "Sudoku" },
            { gameId: "odd-one-out", label: "Tìm khác biệt" },
            { gameId: "maze-runner", label: "Mê cung" },
            { gameId: "find-differences", label: "Soi khác" },
          ],
        },
      ],
    },
  ],
};

/** All available roadmaps – extend this array for future roadmaps */
export const ROADMAPS: Roadmap[] = [PRE_GRADE_1_ROADMAP];

/**
 * Flatten all game IDs referenced in a roadmap for quick lookups.
 */
export function getRoadmapGameIds(roadmap: Roadmap): string[] {
  return roadmap.stages.flatMap((stage) =>
    stage.categories.flatMap((cat) => cat.games.map((g) => g.gameId)),
  );
}

/**
 * Count total games in a roadmap.
 */
export function getRoadmapTotalGames(roadmap: Roadmap): number {
  return getRoadmapGameIds(roadmap).length;
}
