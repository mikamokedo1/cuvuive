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
    title: "Phép Cộng",
    description: "Cộng đến 20",
    subtitle: "+",
    variant: "green",
    logo: Group1Logo,
  },
  {
    id: "group2",
    title: "Phép Trừ",
    description: "Trừ đến 20",
    subtitle: "−",
    variant: "orange",
    logo: Group2Logo,
  },
  {
    id: "group3",
    title: "Luyện tập",
    description: "Cộng và Trừ",
    subtitle: "Mix",
    variant: "blue",
    logo: Group5Logo,
  },
];

export const GROUP_CONFIG: Record<string, MathGroupConfig> = {
  group1: {
    title: "Phép Cộng (đến 20)",
    operator: "add",
    maxSum: 20,
    lessons: [
      { id: "lesson1", title: "Giải thích phép cộng", icon: "BookOpen" },
      { id: "lesson2", title: "Cộng bằng hình", icon: "Eye" },
      { id: "lesson3", title: "Cộng bằng số", icon: "Hash" },
      { id: "lesson4", title: "Tập viết dấu", icon: "Pencil" },
    ],
  },
  group2: {
    title: "Phép Trừ (đến 20)",
    operator: "sub",
    maxSum: 20,
    lessons: [
      { id: "lesson1", title: "Giải thích phép trừ", icon: "BookOpen" },
      { id: "lesson2", title: "Trừ bằng hình", icon: "Eye" },
      { id: "lesson3", title: "Trừ bằng số", icon: "Hash" },
      { id: "lesson4", title: "Tập viết dấu", icon: "Pencil" },
    ],
  },
  group3: {
    title: "Luyện tập",
    operator: "mixed",
    maxSum: 20,
    lessons: [
      { id: "lesson1", title: "Cộng trừ bằng hình", icon: "Eye" },
      { id: "lesson2", title: "Cộng trừ bằng số", icon: "Hash" },
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
    if (op === "add") {
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
    const offset = Math.floor(Math.random() * 5) + 1;
    const wrong = Math.random() > 0.5 ? correctAnswer + offset : correctAnswer - offset;
    if (wrong >= 0 && wrong <= maxSum && wrong !== correctAnswer) {
      choices.add(wrong);
    }
  }

  return Array.from(choices).sort(() => Math.random() - 0.5);
}
