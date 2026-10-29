import { StaticImageData } from "next/image";

const Group1Logo = "https://assets.cuthongminh.com/games/learn-math/group-1-logo.webp";
const Group2Logo = "https://assets.cuthongminh.com/games/learn-math/group-2-logo.webp";
const Group3Logo = "https://assets.cuthongminh.com/games/learn-math/group-3-logo.webp";
const Group4Logo = "https://assets.cuthongminh.com/games/learn-math/group-4-logo.webp";
const Group5Logo = "https://assets.cuthongminh.com/games/learn-math/group-5-logo.webp";

export type MathOperator = "add" | "sub";
export type MathMode = "visual" | "number";

export const SymbolToText = (symbol: string) => (symbol === "+" ? "dấu cộng" : "dấu trừ");

export interface MathGroupConfig {
  title: string;
  operator: MathOperator | "mixed";
  maxSum: number; // max result for addition, max minuend for subtraction
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
    title: "Cộng Phạm Vi 10",
    description: "Cộng đến 10",
    subtitle: "+10",
    variant: "green",
    logo: Group1Logo,
  },
  {
    id: "group2",
    title: "Trừ Phạm Vi 10",
    description: "Trừ đến 10",
    subtitle: "−10",
    variant: "orange",
    logo: Group2Logo,
  },
  {
    id: "group3",
    title: "Cộng Phạm Vi 20",
    description: "Cộng đến 20",
    subtitle: "+20",
    variant: "purple",
    logo: Group3Logo,
  },
  {
    id: "group4",
    title: "Trừ Phạm Vi 20",
    description: "Trừ đến 20",
    subtitle: "−20",
    variant: "blue",
    logo: Group4Logo,
  },
  {
    id: "group5",
    title: "Cộng Trừ Đến 100",
    description: "Toán Lớp 1 (Không nhớ)",
    subtitle: "100",
    variant: "green",
    logo: Group1Logo,
  },
  {
    id: "group6",
    title: "Đấu Trường Cộng Trừ",
    description: "Tổng hợp Cộng & Trừ",
    subtitle: "Mix",
    variant: "purple",
    logo: Group5Logo,
  },
];

export const GROUP_CONFIG: Record<string, MathGroupConfig> = {
  group1: {
    title: "Cộng Phạm Vi 10",
    operator: "add",
    maxSum: 10,
    lessons: [
      { id: "lesson1", title: "Giải thích phép cộng", icon: "BookOpen" },
      { id: "lesson2", title: "Cộng bằng hình", icon: "Eye" },
      { id: "lesson3", title: "Cân thăng bằng", icon: "Scale" },
      { id: "lesson4", title: "Đại chiến pháo bóng", icon: "Crosshair" },
      { id: "lesson5", title: "Thác Plinko hứng quả", icon: "Sparkles" },
      { id: "lesson6", title: "Tập viết dấu cộng", icon: "Pencil" },
    ],
  },
  group2: {
    title: "Trừ Phạm Vi 10",
    operator: "sub",
    maxSum: 10,
    lessons: [
      { id: "lesson1", title: "Giải thích phép trừ", icon: "BookOpen" },
      { id: "lesson2", title: "Trừ bằng hình", icon: "Eye" },
      { id: "lesson3", title: "Cân thăng bằng", icon: "Scale" },
      { id: "lesson4", title: "Đại chiến pháo bóng", icon: "Crosshair" },
      { id: "lesson5", title: "Thác Plinko hứng quả", icon: "Sparkles" },
      { id: "lesson6", title: "Tập viết dấu trừ", icon: "Pencil" },
    ],
  },
  group3: {
    title: "Cộng Phạm Vi 20",
    operator: "add",
    maxSum: 20,
    lessons: [
      { id: "lesson1", title: "Cộng bằng hình", icon: "Eye" },
      { id: "lesson2", title: "Cộng bằng số", icon: "Hash" },
      { id: "lesson3", title: "Cân thăng bằng", icon: "Scale" },
      { id: "lesson4", title: "Đại chiến pháo bóng", icon: "Crosshair" },
      { id: "lesson5", title: "Thác Plinko hứng quả", icon: "Sparkles" },
    ],
  },
  group4: {
    title: "Trừ Phạm Vi 20",
    operator: "sub",
    maxSum: 20,
    lessons: [
      { id: "lesson1", title: "Trừ bằng hình", icon: "Eye" },
      { id: "lesson2", title: "Trừ bằng số", icon: "Hash" },
      { id: "lesson3", title: "Cân thăng bằng", icon: "Scale" },
      { id: "lesson4", title: "Đại chiến pháo bóng", icon: "Crosshair" },
      { id: "lesson5", title: "Thác Plinko hứng quả", icon: "Sparkles" },
    ],
  },
  group5: {
    title: "Cộng Trừ Phạm Vi 100 (Lớp 1)",
    operator: "mixed",
    maxSum: 100,
    lessons: [
      { id: "lesson1", title: "Cộng trừ bằng số", icon: "Hash" },
      { id: "lesson2", title: "Cân thăng bằng", icon: "Scale" },
      { id: "lesson3", title: "Đại chiến pháo bóng", icon: "Crosshair" },
      { id: "lesson4", title: "Thác Plinko hứng quả", icon: "Sparkles" },
    ],
  },
  group6: {
    title: "Đấu Trường Cộng Trừ",
    operator: "mixed",
    maxSum: 20,
    lessons: [
      { id: "lesson1", title: "Cộng trừ bằng hình", icon: "Eye" },
      { id: "lesson2", title: "Cân thăng bằng", icon: "Scale" },
      { id: "lesson3", title: "Đại chiến pháo bóng", icon: "Crosshair" },
      { id: "lesson4", title: "Thác Plinko hứng quả", icon: "Sparkles" },
    ],
  },
};

// Generate a random math question
export function generateMathQuestion(
  operator: MathOperator | "mixed",
  maxSum: number,
  prevQuestion?: string,
): { a: number; b: number; op: MathOperator; answer: number; questionKey: string } {
  const op: MathOperator = operator === "mixed" ? (Math.random() > 0.5 ? "add" : "sub") : operator;

  let a: number, b: number, answer: number;
  let attempts = 0;
  let questionKey: string;

  do {
    if (maxSum > 20) {
      // Grade 1 (Lớp 1): Addition & Subtraction within 100 without regrouping
      if (Math.random() < 0.4) {
        if (op === "add") {
          const tAns = Math.floor(Math.random() * 8) + 2; // 20..90
          const tA = Math.floor(Math.random() * (tAns - 1)) + 1;
          a = tA * 10;
          b = (tAns - tA) * 10;
          answer = tAns * 10;
        } else {
          const tA = Math.floor(Math.random() * 8) + 2;
          const tB = Math.floor(Math.random() * (tA - 1)) + 1;
          a = tA * 10;
          b = tB * 10;
          answer = (tA - tB) * 10;
        }
      } else {
        if (op === "add") {
          const t1 = Math.floor(Math.random() * 6) + 1;
          const t2 = Math.floor(Math.random() * (9 - t1)) + 1;
          const u1 = Math.floor(Math.random() * 7) + 1;
          const u2 = Math.floor(Math.random() * (9 - u1)) + 1;
          a = t1 * 10 + u1;
          b = t2 * 10 + u2;
          answer = a + b;
        } else {
          const t1 = Math.floor(Math.random() * 7) + 2;
          const t2 = Math.floor(Math.random() * (t1 - 1)) + 1;
          const u1 = Math.floor(Math.random() * 7) + 2;
          const u2 = Math.floor(Math.random() * u1);
          a = t1 * 10 + u1;
          b = t2 * 10 + u2;
          answer = a - b;
        }
      }
    } else if (op === "add") {
      // a + b = answer, answer <= maxSum
      answer = Math.floor(Math.random() * (maxSum - 1)) + 2; // at least 2
      a = Math.floor(Math.random() * (answer - 1)) + 1; // at least 1
      b = answer - a;
    } else {
      // a - b = answer, a <= maxSum, answer >= 0
      a = Math.floor(Math.random() * (maxSum - 1)) + 2; // at least 2
      b = Math.floor(Math.random() * (a - 1)) + 1; // at least 1, less than a
      answer = a - b;
    }
    questionKey = `${a}-${op}-${b}`;
    attempts++;
  } while (questionKey === prevQuestion && attempts < 10);

  return { a, b, op, answer, questionKey };
}

// Generate multiple-choice options (3 choices)
export function generateChoices(correctAnswer: number, maxSum: number): number[] {
  const choices = new Set<number>([correctAnswer]);

  while (choices.size < 3) {
    const offset =
      maxSum > 20 && Math.random() > 0.5
        ? (Math.floor(Math.random() * 2) + 1) * 10
        : Math.floor(Math.random() * 5) + 1;
    const wrong = Math.random() > 0.5 ? correctAnswer + offset : correctAnswer - offset;
    if (wrong >= 0 && wrong <= maxSum && wrong !== correctAnswer) {
      choices.add(wrong);
    }
  }

  return Array.from(choices).sort(() => Math.random() - 0.5);
}
