import { StaticImageData } from "next/image";
import { GroupData } from "@/features/games/learn-vehicle/constants";

// Import logos
import LogoGroup1 from "@/assets/games/find-pattern/group1.png";
import LogoGroup2 from "@/assets/games/find-pattern/group2.png";

// ============ SHAPE & COLOR DEFINITIONS ============

export type PatternShapeType = "circle" | "square" | "triangle" | "star" | "hexagon" | "diamond";

export interface PatternItem {
  shape: PatternShapeType;
  color: (typeof PATTERN_COLORS)[number];
}

// Colors used in patterns
export const PATTERN_COLORS = [
  {
    name: "màu đỏ",
    code: "#EF4444",
  },
  {
    name: "màu xanh dương",
    code: "#3B82F6",
  },
  {
    name: "màu vàng",
    code: "#EAB308",
  },
  {
    name: "màu xanh lá",
    code: "#22C55E",
  },
  {
    name: "màu tím",
    code: "#A855F7",
  },
  {
    name: "màu cam",
    code: "#F97316",
  },
];

// Shapes used in patterns
export const PATTERN_SHAPES: PatternShapeType[] = ["circle", "square", "triangle", "star", "hexagon", "diamond"];

// ============ PATTERN GENERATION ============

export interface PatternDef {
  id: string;
  /** The repeating unit, e.g. [A, B] for ABABAB */
  unit: PatternItem[];
  /** How many times the unit repeats in a full sequence */
  repeats: number;
  name: string;
}

/**
 * Build the full sequence from a pattern def
 */
export function buildSequence(pattern: PatternDef): PatternItem[] {
  const seq: PatternItem[] = [];
  for (let r = 0; r < pattern.repeats; r++) {
    seq.push(...pattern.unit);
  }
  return seq;
}

// ============ GROUP 1: COLOR PATTERNS (same shape, different colors) ============

const COLOR_PATTERNS: PatternDef[] = [
  // AB patterns
  {
    id: "color-ab-1",
    unit: [
      { shape: "circle", color: PATTERN_COLORS[0] },
      { shape: "circle", color: PATTERN_COLORS[1] },
    ],
    repeats: 4,
    name: "1 đỏ, 1 xanh dương",
  },
  {
    id: "color-ab-2",
    unit: [
      { shape: "circle", color: PATTERN_COLORS[2] },
      { shape: "circle", color: PATTERN_COLORS[4] },
    ],
    repeats: 4,
    name: "1 vàng, 1 tím",
  },
  {
    id: "color-ab-3",
    unit: [
      { shape: "square", color: PATTERN_COLORS[3] },
      { shape: "square", color: PATTERN_COLORS[5] },
    ],
    repeats: 4,
    name: "1 xanh lá, 1 cam",
  },
  // ABB patterns
  {
    id: "color-abb-1",
    unit: [
      { shape: "circle", color: PATTERN_COLORS[0] },
      { shape: "circle", color: PATTERN_COLORS[1] },
      { shape: "circle", color: PATTERN_COLORS[1] },
    ],
    repeats: 3,
    name: "1 đỏ, 2 xanh dương",
  },
  {
    id: "color-abb-2",
    unit: [
      { shape: "square", color: PATTERN_COLORS[2] },
      { shape: "square", color: PATTERN_COLORS[3] },
      { shape: "square", color: PATTERN_COLORS[3] },
    ],
    repeats: 3,
    name: "1 vàng, 2 xanh lá",
  },
  // AAB patterns
  {
    id: "color-aab-1",
    unit: [
      { shape: "circle", color: PATTERN_COLORS[0] },
      { shape: "circle", color: PATTERN_COLORS[0] },
      { shape: "circle", color: PATTERN_COLORS[3] },
    ],
    repeats: 3,
    name: "2 đỏ, 1 xanh lá",
  },
  // ABC patterns
  {
    id: "color-abc-1",
    unit: [
      { shape: "circle", color: PATTERN_COLORS[0] },
      { shape: "circle", color: PATTERN_COLORS[1] },
      { shape: "circle", color: PATTERN_COLORS[2] },
    ],
    repeats: 3,
    name: "1 đỏ, 1 xanh dương, 1 vàng",
  },
  {
    id: "color-abc-2",
    unit: [
      { shape: "square", color: PATTERN_COLORS[3] },
      { shape: "square", color: PATTERN_COLORS[4] },
      { shape: "square", color: PATTERN_COLORS[5] },
    ],
    repeats: 3,
    name: "1 xanh lá, 1 tím, 1 cam",
  },
];

// ============ GROUP 2: SHAPE PATTERNS (same color, different shapes) ============

const SHAPE_PATTERNS: PatternDef[] = [
  // AB patterns
  {
    id: "shape-ab-1",
    unit: [
      { shape: "circle", color: PATTERN_COLORS[0] },
      { shape: "triangle", color: PATTERN_COLORS[0] },
    ],
    repeats: 4,
    name: "1 hình tròn, 1 hình tam giác",
  },
  {
    id: "shape-ab-2",
    unit: [
      { shape: "star", color: PATTERN_COLORS[1] },
      { shape: "square", color: PATTERN_COLORS[1] },
    ],
    repeats: 4,
    name: "1 hình ngôi sao, 1 hình vuông",
  },
  {
    id: "shape-ab-3",
    unit: [
      { shape: "hexagon", color: PATTERN_COLORS[4] },
      { shape: "diamond", color: PATTERN_COLORS[4] },
    ],
    repeats: 4,
    name: "1 hình lục giác, 1 hình thoi",
  },
  // ABB patterns
  {
    id: "shape-abb-1",
    unit: [
      { shape: "star", color: PATTERN_COLORS[2] },
      { shape: "triangle", color: PATTERN_COLORS[2] },
      { shape: "triangle", color: PATTERN_COLORS[2] },
    ],
    repeats: 3,
    name: "1 hình ngôi sao, 2 hình tam giác",
  },

  // ABC patterns
  {
    id: "shape-abc-1",
    unit: [
      { shape: "circle", color: PATTERN_COLORS[3] },
      { shape: "triangle", color: PATTERN_COLORS[3] },
      { shape: "star", color: PATTERN_COLORS[3] },
    ],
    repeats: 3,
    name: "1 hình tròn, 1 hình tam giác, 1 hình ngôi sao",
  },
  {
    id: "shape-abc-2",
    unit: [
      { shape: "square", color: PATTERN_COLORS[5] },
      { shape: "hexagon", color: PATTERN_COLORS[5] },
      { shape: "diamond", color: PATTERN_COLORS[5] },
    ],
    repeats: 3,
    name: "1 hình vuông, 1 hình lục giác, 1 hình thoi",
  },
  // ABAC patterns
  {
    id: "shape-abac-1",
    unit: [
      { shape: "circle", color: PATTERN_COLORS[1] },
      { shape: "star", color: PATTERN_COLORS[1] },
      { shape: "circle", color: PATTERN_COLORS[1] },
      { shape: "triangle", color: PATTERN_COLORS[1] },
    ],
    repeats: 2,
    name: "1 hình tròn, 1 hình ngôi sao, 1 hình tam giác",
  },
  // AABB patterns
  {
    id: "shape-aabb-1",
    unit: [
      { shape: "star", color: PATTERN_COLORS[4] },
      { shape: "star", color: PATTERN_COLORS[4] },
      { shape: "diamond", color: PATTERN_COLORS[4] },
      { shape: "diamond", color: PATTERN_COLORS[4] },
    ],
    repeats: 2,
    name: "2 hình ngôi sao, 2 hình thoi",
  },
];

// ============ GROUPS ============

export const PATTERN_GROUPS: Record<string, PatternDef[]> = {
  group1: COLOR_PATTERNS,
  group2: SHAPE_PATTERNS,
};

export const GROUPS: GroupData[] = [
  {
    id: "group1",
    title: "Quy luật màu sắc",
    description: "Tìm quy luật với các màu sắc",
    logo: LogoGroup1,
    variant: "green" as const,
  },
  {
    id: "group2",
    title: "Quy luật hình dạng",
    description: "Tìm quy luật với các hình dạng",
    logo: LogoGroup2,
    variant: "blue" as const,
  },
];

/**
 * Get a random selection of patterns for a group
 */
export function getPatternsForGroup(groupId: string): PatternDef[] {
  return PATTERN_GROUPS[groupId] || [];
}

/**
 * Pick N random patterns from a group, excluding any with given IDs
 */
export function pickRandomPatterns(groupId: string, count: number, excludeIds: string[] = []): PatternDef[] {
  const all = getPatternsForGroup(groupId).filter((p) => !excludeIds.includes(p.id));
  const shuffled = [...all].sort(() => Math.random() - 0.5);
  return shuffled.slice(0, count);
}

/**
 * Generate wrong options for a "what comes next" quiz.
 * - Group 1 (color patterns): same shape, different color
 * - Group 2 (shape patterns): same color, different shape
 */
export function generateDistractors(correctItem: PatternItem, groupId: string, count: number = 2): PatternItem[] {
  const seen = new Set<string>();
  seen.add(`${correctItem.shape}-${correctItem.color.code}`);
  const distractors: PatternItem[] = [];

  if (groupId === "group1") {
    // Same shape, different colors
    const availableColors = PATTERN_COLORS.filter((c) => c.code !== correctItem.color.code);
    const shuffledColors = [...availableColors].sort(() => Math.random() - 0.5);
    for (const color of shuffledColors) {
      if (distractors.length >= count) break;
      const key = `${correctItem.shape}-${color.code}`;
      if (!seen.has(key)) {
        seen.add(key);
        distractors.push({ shape: correctItem.shape, color });
      }
    }
  } else {
    // Same color, different shapes
    const availableShapes = PATTERN_SHAPES.filter((s) => s !== correctItem.shape);
    const shuffledShapes = [...availableShapes].sort(() => Math.random() - 0.5);
    for (const shape of shuffledShapes) {
      if (distractors.length >= count) break;
      const key = `${shape}-${correctItem.color.code}`;
      if (!seen.has(key)) {
        seen.add(key);
        distractors.push({ shape, color: correctItem.color });
      }
    }
  }

  return distractors;
}
