
import { StaticImageData } from "next/image";

// Group logos on R2 CDN
const Group1Logo = "https://assets.cuthongminh.com/games/learn-divide/group1.webp";
const Group2Logo = "https://assets.cuthongminh.com/games/learn-divide/group2.webp";
const Group3Logo = "https://assets.cuthongminh.com/games/learn-divide/group3.webp";
const Group4Logo = "https://assets.cuthongminh.com/games/learn-divide/group4.webp";
const Group5Logo = "https://assets.cuthongminh.com/games/learn-divide/group5.webp";

export interface DivideGroupConfig {
  title: string;
  divisor: number | "mixed";
  maxDividend: number;
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
    title: "Bảng Chia 2",
    description: "Chia cho 2",
    subtitle: "÷2",
    variant: "green",
    logo: Group1Logo,
  },
  {
    id: "group2",
    title: "Bảng Chia 3",
    description: "Chia cho 3",
    subtitle: "÷3",
    variant: "orange",
    logo: Group2Logo,
  },
  {
    id: "group3",
    title: "Bảng Chia 4",
    description: "Chia cho 4",
    subtitle: "÷4",
    variant: "purple",
    logo: Group3Logo,
  },
  {
    id: "group4",
    title: "Bảng Chia 5",
    description: "Chia cho 5",
    subtitle: "÷5",
    variant: "blue",
    logo: Group4Logo,
  },
  {
    id: "group5",
    title: "Luyện Tập",
    description: "Chia 2-5",
    subtitle: "Mix",
    variant: "blue",
    logo: Group5Logo,
  },
];

export const GROUP_CONFIG: Record<string, DivideGroupConfig> = {
  group1: {
    title: "Bảng Chia 2",
    divisor: 2,
    maxDividend: 20,
    lessons: [
      { id: "lesson1", title: "Giải thích phép chia", icon: "BookOpen" },
      { id: "lesson2", title: "Chia bằng hình", icon: "Eye" },
      { id: "lesson3", title: "Chia bằng số", icon: "Hash" },
      { id: "lesson4", title: "Điền số thiếu", icon: "PencilLine" },
      { id: "lesson5", title: "Nhân ngược", icon: "ArrowRight" },
    ],
  },
  group2: {
    title: "Bảng Chia 3",
    divisor: 3,
    maxDividend: 30,
    lessons: [
      { id: "lesson1", title: "Giải thích phép chia", icon: "BookOpen" },
      { id: "lesson2", title: "Chia bằng hình", icon: "Eye" },
      { id: "lesson3", title: "Chia bằng số", icon: "Hash" },
      { id: "lesson4", title: "Điền số thiếu", icon: "PencilLine" },
      { id: "lesson5", title: "Nhân ngược", icon: "ArrowRight" },
    ],
  },
  group3: {
    title: "Bảng Chia 4",
    divisor: 4,
    maxDividend: 40,
    lessons: [
      { id: "lesson1", title: "Giải thích phép chia", icon: "BookOpen" },
      { id: "lesson2", title: "Chia bằng hình", icon: "Eye" },
      { id: "lesson3", title: "Chia bằng số", icon: "Hash" },
      { id: "lesson4", title: "Điền số thiếu", icon: "PencilLine" },
      { id: "lesson5", title: "Nhân ngược", icon: "ArrowRight" },
    ],
  },
  group4: {
    title: "Bảng Chia 5",
    divisor: 5,
    maxDividend: 50,
    lessons: [
      { id: "lesson1", title: "Giải thích phép chia", icon: "BookOpen" },
      { id: "lesson2", title: "Chia bằng hình", icon: "Eye" },
      { id: "lesson3", title: "Chia bằng số", icon: "Hash" },
      { id: "lesson4", title: "Điền số thiếu", icon: "PencilLine" },
      { id: "lesson5", title: "Nhân ngược", icon: "ArrowRight" },
    ],
  },
  group5: {
    title: "Luyện Tập",
    divisor: "mixed",
    maxDividend: 50,
    lessons: [
      { id: "lesson1", title: "Chia bằng hình", icon: "Eye" },
      { id: "lesson2", title: "Chia bằng số", icon: "Hash" },
      { id: "lesson3", title: "Điền số thiếu", icon: "PencilLine" },
    ],
  },
};

// Generate a division question where dividend ÷ divisor = quotient (always exact)
export function generateDivideQuestion(
  divisor: number | "mixed",
  maxDividend: number,
  prevQuestion?: string,
): { dividend: number; divisor: number; answer: number; questionKey: string } {
  const div: number = divisor === "mixed" ? [2, 3, 4, 5][Math.floor(Math.random() * 4)] : divisor;

  let dividend: number, answer: number;
  let attempts = 0;
  let questionKey: string;

  do {
    answer = Math.floor(Math.random() * 10) + 1; // 1 to 10
    dividend = div * answer; // ensures exact division
    questionKey = `${dividend}-div-${div}`;
    attempts++;
  } while ((questionKey === prevQuestion || dividend > maxDividend) && attempts < 20);

  return { dividend, divisor: div, answer, questionKey };
}

// Generate fill-the-blank: ___ ÷ 3 = 4  or  12 ÷ ___ = 4
export function generateFillBlankDivideQuestion(
  divisor: number | "mixed",
  maxDividend: number,
  prevQuestion?: string,
): {
  dividend: number;
  divisor: number;
  answer: number;
  missingPosition: "dividend" | "divisor";
  missingValue: number;
  questionKey: string;
} {
  const q = generateDivideQuestion(divisor, maxDividend, prevQuestion);
  const missingPosition = Math.random() > 0.5 ? "dividend" : "divisor";
  const missingValue = missingPosition === "dividend" ? q.dividend : q.divisor;

  return {
    ...q,
    missingPosition,
    missingValue,
    questionKey: `fill-${q.questionKey}-${missingPosition}`,
  };
}

// Generate reverse multiply: given 12 ÷ 3 = 4, ask 4 × 3 = ?
export function generateReverseMultiplyQuestion(
  divisor: number | "mixed",
  maxDividend: number,
  prevQuestion?: string,
): {
  dividend: number;
  divisor: number;
  quotient: number;
  answer: number; // = dividend
  questionKey: string;
} {
  const q = generateDivideQuestion(divisor, maxDividend, prevQuestion);
  return {
    dividend: q.dividend,
    divisor: q.divisor,
    quotient: q.answer,
    answer: q.dividend, // quotient × divisor = dividend
    questionKey: `rev-${q.questionKey}`,
  };
}

// Generate 3 multiple-choice options
export function generateChoices(correctAnswer: number, maxValue: number): number[] {
  const choices = new Set<number>([correctAnswer]);

  while (choices.size < 3) {
    const offset = Math.floor(Math.random() * 8) + 1;
    const wrong = Math.random() > 0.5 ? correctAnswer + offset : correctAnswer - offset;
    if (wrong > 0 && wrong <= maxValue && wrong !== correctAnswer) {
      choices.add(wrong);
    }
  }

  return Array.from(choices).sort(() => Math.random() - 0.5);
}
