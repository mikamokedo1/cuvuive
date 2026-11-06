import { COURSES } from "@/libs/constants/courses";

export const TOTAL_GAMES = COURSES.length;
export const TOTAL_LESSONS = COURSES.reduce(
  (sum, course) => sum + course.groups.reduce((groupSum, group) => groupSum + group.lessons.length, 0),
  0,
);

/**
 * Hand-written selling points for the games that bring in most signups or sales.
 * Every line must describe content that exists today: check courses.ts before adding one.
 */
const HIGHLIGHTS: Record<string, string[]> = {
  "learn-numbers": [
    "Đếm, nhận biết và tập viết số từ 0 đến 20",
    "4 kiểu chơi: học số, chọn số, đếm đồ vật, tập viết",
    "Học đếm số bằng tiếng Anh, nói chuyện trực tiếp với Cú",
  ],
  "learn-alphabet": [
    "Học đủ phụ âm tiếng Việt: nghe, tập nói, tập viết",
    "Học tiếp Ghép Vần và Học Dấu Tiếng Việt để bé tập đọc",
  ],
  "learn-color": [
    "Học thêm màu cam, tím, hồng, nâu, đen, trắng",
    "Chơi tiếp Pha Màu và Tô Màu",
  ],
  "learn-money": [
    "Xếp tiền, đổi tiền và tập tiết kiệm",
    "Đi chợ cùng Cú: mua đồ, gộp tiền, tính tiền thừa",
  ],
};

export interface PaywallPitch {
  courseId: string;
  courseTitle: string;
  groupId: string | null;
  /** Titles of the groups that still have locked lessons, in course order. */
  lockedGroupTitles: string[];
  lockedLessonCount: number;
  highlights: string[];
}

const GAME_PATH = /^\/games\/([^/?#]+)(?:\/([^/?#]+))?/;

export function parseGamePath(url: string | null | undefined): { courseId: string; groupId: string | null } | null {
  if (!url) return null;
  const match = GAME_PATH.exec(url);
  if (!match) return null;
  return { courseId: match[1], groupId: match[2] ?? null };
}

/** Builds the game-specific paywall content, or null when the URL is not a known game. */
export function buildPaywallPitch(url: string | null | undefined): PaywallPitch | null {
  const parsed = parseGamePath(url);
  if (!parsed) return null;

  const course = COURSES.find((c) => c.id === parsed.courseId);
  if (!course) return null;

  const lockedGroups = course.groups.filter((group) => group.lessons.some((lesson) => !lesson.isFree));

  return {
    courseId: course.id,
    courseTitle: course.title,
    groupId: parsed.groupId,
    lockedGroupTitles: lockedGroups.map((group) => group.title),
    lockedLessonCount: course.groups.reduce(
      (sum, group) => sum + group.lessons.filter((lesson) => !lesson.isFree).length,
      0,
    ),
    highlights: HIGHLIGHTS[course.id] ?? [],
  };
}
