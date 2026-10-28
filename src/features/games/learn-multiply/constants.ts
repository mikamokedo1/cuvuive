import { StaticImageData } from "next/image";

// Group logos on R2 CDN
const Group1Logo = "https://assets.cuthongminh.com/games/learn-multiply/group1.webp";
const Group2Logo = "https://assets.cuthongminh.com/games/learn-multiply/group2.webp";
const Group3Logo = "https://assets.cuthongminh.com/games/learn-multiply/group3.webp";
const Group4Logo = "https://assets.cuthongminh.com/games/learn-multiply/group4.webp";
const Group5Logo = "https://assets.cuthongminh.com/games/learn-multiply/group5.webp";

export interface MultiplyGroupConfig {
  title: string;
  multiplier: number | "mixed";
  maxProduct: number;
  lessons: Array<{ id: string; title: string; icon: string }>;
}

export interface GroupData {
  id: string;
  title: string;
  description: string;
  subtitle?: string;
  variant: "green" | "orange" | "purple" | "blue";
  logo: string | StaticImageData;
}

const STANDARD_LESSONS = [
  { id: "lesson1", title: "Khám phá bảng nhân", icon: "BookOpen" },
  { id: "lesson2", title: "Cân thăng bằng", icon: "Scale" },
  { id: "lesson3", title: "Đại chiến pháo bóng", icon: "Crosshair" },
  { id: "lesson4", title: "Thác Plinko hứng quả", icon: "Sparkles" },
  { id: "lesson5", title: "Tìm số bí ẩn", icon: "PencilLine" },
];

export const GROUPS: GroupData[] = [
  {
    id: "group1",
    title: "Bảng Nhân 2",
    description: "Nhân với 2",
    subtitle: "×2",
    variant: "green",
    logo: Group1Logo,
  },
  {
    id: "group2",
    title: "Bảng Nhân 3",
    description: "Nhân với 3",
    subtitle: "×3",
    variant: "orange",
    logo: Group2Logo,
  },
  {
    id: "group3",
    title: "Bảng Nhân 4",
    description: "Nhân với 4",
    subtitle: "×4",
    variant: "purple",
    logo: Group3Logo,
  },
  {
    id: "group4",
    title: "Bảng Nhân 5",
    description: "Nhân với 5",
    subtitle: "×5",
    variant: "blue",
    logo: Group4Logo,
  },
  {
    id: "group5",
    title: "Bảng Nhân 6",
    description: "Nhân với 6",
    subtitle: "×6",
    variant: "green",
    logo: Group1Logo,
  },
  {
    id: "group6",
    title: "Bảng Nhân 7",
    description: "Nhân với 7",
    subtitle: "×7",
    variant: "orange",
    logo: Group2Logo,
  },
  {
    id: "group7",
    title: "Bảng Nhân 8",
    description: "Nhân với 8",
    subtitle: "×8",
    variant: "purple",
    logo: Group3Logo,
  },
  {
    id: "group8",
    title: "Bảng Nhân 9",
    description: "Nhân với 9",
    subtitle: "×9",
    variant: "blue",
    logo: Group4Logo,
  },
  {
    id: "group9",
    title: "Đấu Trường 2-9",
    description: "Tổng hợp 2-9",
    subtitle: "Mix",
    variant: "purple",
    logo: Group5Logo,
  },
];

export const GROUP_CONFIG: Record<string, MultiplyGroupConfig> = {
  group1: {
    title: "Bảng Nhân 2",
    multiplier: 2,
    maxProduct: 20,
    lessons: STANDARD_LESSONS,
  },
  group2: {
    title: "Bảng Nhân 3",
    multiplier: 3,
    maxProduct: 30,
    lessons: STANDARD_LESSONS,
  },
  group3: {
    title: "Bảng Nhân 4",
    multiplier: 4,
    maxProduct: 40,
    lessons: STANDARD_LESSONS,
  },
  group4: {
    title: "Bảng Nhân 5",
    multiplier: 5,
    maxProduct: 50,
    lessons: STANDARD_LESSONS,
  },
  group5: {
    title: "Bảng Nhân 6",
    multiplier: 6,
    maxProduct: 60,
    lessons: STANDARD_LESSONS,
  },
  group6: {
    title: "Bảng Nhân 7",
    multiplier: 7,
    maxProduct: 70,
    lessons: STANDARD_LESSONS,
  },
  group7: {
    title: "Bảng Nhân 8",
    multiplier: 8,
    maxProduct: 80,
    lessons: STANDARD_LESSONS,
  },
  group8: {
    title: "Bảng Nhân 9",
    multiplier: 9,
    maxProduct: 90,
    lessons: STANDARD_LESSONS,
  },
  group9: {
    title: "Đấu Trường 2-9",
    multiplier: "mixed",
    maxProduct: 90,
    lessons: [
      { id: "lesson1", title: "Cân thăng bằng", icon: "Scale" },
      { id: "lesson2", title: "Đại chiến pháo bóng", icon: "Crosshair" },
      { id: "lesson3", title: "Thác Plinko hứng quả", icon: "Sparkles" },
      { id: "lesson4", title: "Tìm số bí ẩn", icon: "PencilLine" },
    ],
  },
};

const ALL_MULTIPLIERS = [2, 3, 4, 5, 6, 7, 8, 9];

// Generate a random multiplication question
export function generateMultiplyQuestion(
  multiplier: number | "mixed",
  maxProduct: number,
  prevQuestion?: string,
): { a: number; b: number; answer: number; questionKey: string } {
  let a: number, b: number, answer: number;
  let attempts = 0;
  let questionKey: string;

  do {
    const mult: number =
      multiplier === "mixed"
        ? ALL_MULTIPLIERS[Math.floor(Math.random() * ALL_MULTIPLIERS.length)]
        : multiplier;
    a = mult;
    b = Math.floor(Math.random() * 10) + 1; // 1 to 10
    answer = a * b;
    questionKey = `${a}-x-${b}`;
    attempts++;
  } while ((questionKey === prevQuestion || answer > maxProduct) && attempts < 20);

  return { a, b, answer, questionKey };
}

// Generate a fill-the-blank question: A × ___ = C  or  ___ × B = C
export function generateFillBlankQuestion(
  multiplier: number | "mixed",
  maxProduct: number,
  prevQuestion?: string,
): { a: number; b: number; answer: number; missingPosition: "a" | "b"; missingValue: number; questionKey: string } {
  const q = generateMultiplyQuestion(multiplier, maxProduct, prevQuestion);
  const missingPosition = Math.random() > 0.5 ? "a" : "b";
  const missingValue = missingPosition === "a" ? q.a : q.b;

  return {
    ...q,
    missingPosition,
    missingValue,
    questionKey: `fill-${q.questionKey}-${missingPosition}`,
  };
}

// Generate a skip counting sequence with one blank
export function generateSkipCountQuestion(
  multiplier: number | "mixed",
  prevQuestion?: string,
): { sequence: (number | null)[]; multiplierUsed: number; missingIndex: number; answer: number; questionKey: string } {
  const mult: number =
    multiplier === "mixed"
      ? ALL_MULTIPLIERS[Math.floor(Math.random() * ALL_MULTIPLIERS.length)]
      : multiplier;

  let startMultiple: number;
  let attempts = 0;
  let questionKey: string;

  // Generate 5 consecutive multiples, e.g. 6, 9, 12, 15, 18
  do {
    startMultiple = Math.floor(Math.random() * 6) + 1; // start from 1st to 6th multiple
    questionKey = `skip-${mult}-${startMultiple}`;
    attempts++;
  } while (questionKey === prevQuestion && attempts < 10);

  const fullSequence = Array.from({ length: 5 }, (_, i) => (startMultiple + i) * mult);
  const missingIndex = Math.floor(Math.random() * 5);
  const answer = fullSequence[missingIndex];

  const sequence: (number | null)[] = fullSequence.map((v, i) => (i === missingIndex ? null : v));

  return { sequence, multiplierUsed: mult, missingIndex, answer, questionKey };
}

// Generate multiple-choice options (3 choices)
export function generateChoices(correctAnswer: number, maxProduct: number): number[] {
  const choices = new Set<number>([correctAnswer]);

  while (choices.size < 3) {
    const offset = Math.floor(Math.random() * 8) + 1;
    const wrong = Math.random() > 0.5 ? correctAnswer + offset : correctAnswer - offset;
    if (wrong > 0 && wrong <= Math.max(maxProduct, 90) && wrong !== correctAnswer) {
      choices.add(wrong);
    }
  }

  return Array.from(choices).sort(() => Math.random() - 0.5);
}
