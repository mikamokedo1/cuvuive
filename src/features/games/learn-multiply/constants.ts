
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
    title: "Luyện Tập",
    description: "Nhân 2-5",
    subtitle: "Mix",
    variant: "blue",
    logo: Group5Logo,
  },
];

export const GROUP_CONFIG: Record<string, MultiplyGroupConfig> = {
  group1: {
    title: "Bảng Nhân 2",
    multiplier: 2,
    maxProduct: 20,
    lessons: [
      { id: "lesson1", title: "Giải thích phép nhân", icon: "BookOpen" },
      { id: "lesson2", title: "Nhân bằng hình", icon: "Eye" },
      { id: "lesson3", title: "Nhân bằng số", icon: "Hash" },
      { id: "lesson4", title: "Điền số thiếu", icon: "PencilLine" },
      { id: "lesson5", title: "Nhảy số", icon: "ArrowRight" },
    ],
  },
  group2: {
    title: "Bảng Nhân 3",
    multiplier: 3,
    maxProduct: 30,
    lessons: [
      { id: "lesson1", title: "Giải thích phép nhân", icon: "BookOpen" },
      { id: "lesson2", title: "Nhân bằng hình", icon: "Eye" },
      { id: "lesson3", title: "Nhân bằng số", icon: "Hash" },
      { id: "lesson4", title: "Điền số thiếu", icon: "PencilLine" },
      { id: "lesson5", title: "Nhảy số", icon: "ArrowRight" },
    ],
  },
  group3: {
    title: "Bảng Nhân 4",
    multiplier: 4,
    maxProduct: 40,
    lessons: [
      { id: "lesson1", title: "Giải thích phép nhân", icon: "BookOpen" },
      { id: "lesson2", title: "Nhân bằng hình", icon: "Eye" },
      { id: "lesson3", title: "Nhân bằng số", icon: "Hash" },
      { id: "lesson4", title: "Điền số thiếu", icon: "PencilLine" },
      { id: "lesson5", title: "Nhảy số", icon: "ArrowRight" },
    ],
  },
  group4: {
    title: "Bảng Nhân 5",
    multiplier: 5,
    maxProduct: 50,
    lessons: [
      { id: "lesson1", title: "Giải thích phép nhân", icon: "BookOpen" },
      { id: "lesson2", title: "Nhân bằng hình", icon: "Eye" },
      { id: "lesson3", title: "Nhân bằng số", icon: "Hash" },
      { id: "lesson4", title: "Điền số thiếu", icon: "PencilLine" },
      { id: "lesson5", title: "Nhảy số", icon: "ArrowRight" },
    ],
  },
  group5: {
    title: "Luyện Tập",
    multiplier: "mixed",
    maxProduct: 50,
    lessons: [
      { id: "lesson1", title: "Nhân bằng hình", icon: "Eye" },
      { id: "lesson2", title: "Nhân bằng số", icon: "Hash" },
      { id: "lesson3", title: "Điền số thiếu", icon: "PencilLine" },
    ],
  },
};

// Generate a random multiplication question
export function generateMultiplyQuestion(
  multiplier: number | "mixed",
  maxProduct: number,
  prevQuestion?: string,
): { a: number; b: number; answer: number; questionKey: string } {
  const mult: number = multiplier === "mixed" ? [2, 3, 4, 5][Math.floor(Math.random() * 4)] : multiplier;

  let a: number, b: number, answer: number;
  let attempts = 0;
  let questionKey: string;

  do {
    // a × b = answer  (a is the multiplier, b is 1..10)
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
  const mult: number = multiplier === "mixed" ? [2, 3, 4, 5][Math.floor(Math.random() * 4)] : multiplier;

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
    if (wrong > 0 && wrong <= maxProduct && wrong !== correctAnswer) {
      choices.add(wrong);
    }
  }

  return Array.from(choices).sort(() => Math.random() - 0.5);
}
