import { StaticImageData } from "next/image";
import { GroupData } from "@/features/games/learn-vehicle/constants";
import { ANIMALS } from "@/features/games/learn-animal/constants";
import { FRUITS } from "@/features/games/learn-fruit/constants";
import { ThingImages } from "@/libs/constants/thingImages";
import { PatternShapeType } from "@/features/games/find-pattern/constants";

// ============ GROUP LOGOS ============
const LogoGroup1 = "https://assets.cuthongminh.com/games/sequence-sort/group1.webp";
const LogoGroup2 = "https://assets.cuthongminh.com/games/sequence-sort/group2.webp";
const LogoGroup3 = "https://assets.cuthongminh.com/games/sequence-sort/group3.webp";

// ============ TYPES ============

export type SortItemType = "size" | "height" | "quantity" | "color";

export interface SortableItem {
  id: string;
  type: SortItemType;
  sortValue: number;
  label: string;
  // Size group
  image?: string | StaticImageData;
  displayScale?: number;
  // Quantity group
  quantity?: number;
  quantityImage?: string;
  // Color group
  color?: string;
  shape?: PatternShapeType;
}

export interface SortPuzzle {
  items: SortableItem[];
  correctOrder: string[];
  instruction: string;
  direction: "asc" | "desc";
}

// ============ HELPERS ============

function pickRandom<T>(arr: T[]): T {
  return arr[Math.floor(Math.random() * arr.length)];
}

function shuffle<T>(arr: T[]): T[] {
  const a = [...arr];
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

// Ensure shuffled order is not already correct
function shuffleUntilDifferent<T>(arr: T[], getKey: (item: T) => string): T[] {
  const correctKeys = arr.map(getKey).join(",");
  let shuffled = shuffle(arr);
  let attempts = 0;
  while (shuffled.map(getKey).join(",") === correctKeys && attempts < 10) {
    shuffled = shuffle(arr);
    attempts++;
  }
  return shuffled;
}

// ============ SIZE PUZZLES (Group 1) ============

const SIZE_SCALES_3 = [0.55, 0.8, 1.1];
const SIZE_SCALES_4 = [0.45, 0.65, 0.85, 1.1];
const SIZE_LABELS = ["bé xíu", "nhỏ", "vừa", "lớn"];

const SIZE_POOL = [
  ...ANIMALS.filter((a) => ["cat", "dog", "elephant", "lion", "bear", "monkey", "fish", "duck"].includes(a.id)),
  ...FRUITS.filter((f) => ["apple", "banana", "strawberry", "watermelon", "orange", "grape"].includes(f.id)),
];

export function generateSizePuzzle(
  direction: "asc" | "desc",
  itemCount: 3 | 4 = 3,
): SortPuzzle {
  const entity = pickRandom(SIZE_POOL);
  const scales = itemCount === 3 ? SIZE_SCALES_3 : SIZE_SCALES_4;
  const labels = itemCount === 3 ? SIZE_LABELS.slice(0, 3) : SIZE_LABELS;

  // Build items in ascending order
  const sortedItems: SortableItem[] = scales.map((scale, i) => ({
    id: `size-${i}`,
    type: "size" as const,
    sortValue: i,
    label: labels[i],
    image: entity.image,
    displayScale: scale,
  }));

  const correctOrder =
    direction === "asc"
      ? sortedItems.map((item) => item.id)
      : [...sortedItems].reverse().map((item) => item.id);

  const shuffled = shuffleUntilDifferent(sortedItems, (i) => i.id);

  return {
    items: shuffled,
    correctOrder,
    instruction: direction === "asc" ? "Xếp từ nhỏ đến lớn" : "Xếp từ lớn đến nhỏ",
    direction,
  };
}

// ============ HEIGHT PUZZLES (Group 1 - lessons 3,4) ============
// Uses actual generated images showing objects at different heights

interface HeightSet {
  name: string;
  images: string[]; // [short, medium, tall]
}

const HEIGHT_SETS: HeightSet[] = [
  {
    name: "cây",
    images: [
      "https://assets.cuthongminh.com/games/sequence-sort/tree-short.webp",
      "https://assets.cuthongminh.com/games/sequence-sort/tree-medium.webp",
      "https://assets.cuthongminh.com/games/sequence-sort/tree-tall.webp",
    ],
  },
  {
    name: "hoa",
    images: [
      "https://assets.cuthongminh.com/games/sequence-sort/flower-short.webp",
      "https://assets.cuthongminh.com/games/sequence-sort/flower-medium.webp",
      "https://assets.cuthongminh.com/games/sequence-sort/flower-tall.webp",
    ],
  },
  {
    name: "nhà",
    images: [
      "https://assets.cuthongminh.com/games/sequence-sort/building-short.webp",
      "https://assets.cuthongminh.com/games/sequence-sort/building-medium.webp",
      "https://assets.cuthongminh.com/games/sequence-sort/building-tall.webp",
    ],
  },
  {
    name: "bút chì",
    images: [
      "https://assets.cuthongminh.com/games/sequence-sort/pencil-short.webp",
      "https://assets.cuthongminh.com/games/sequence-sort/pencil-medium.webp",
      "https://assets.cuthongminh.com/games/sequence-sort/pencil-tall.webp",
    ],
  },
  {
    name: "con vật",
    images: [
      "https://assets.cuthongminh.com/games/learn-animal/turtle.webp",
      "https://assets.cuthongminh.com/games/learn-animal/cow.webp",
      "https://assets.cuthongminh.com/games/learn-animal/giraffe.webp",
    ],
  },
  {
    name: "người",
    images: [
      "https://assets.cuthongminh.com/games/learn-family/baby.webp",
      "https://assets.cuthongminh.com/games/learn-family/son.webp",
      "https://assets.cuthongminh.com/games/learn-family/father.webp",
    ],
  },
];

const HEIGHT_LABELS_3 = ["thấp", "vừa", "cao"];

export function generateHeightPuzzle(
  direction: "asc" | "desc",
): SortPuzzle {
  const set = pickRandom(HEIGHT_SETS);

  const sortedItems: SortableItem[] = set.images.map((img, i) => ({
    id: `height-${i}`,
    type: "height" as const,
    sortValue: i,
    label: `${set.name} ${HEIGHT_LABELS_3[i]}`,
    image: img,
  }));

  const correctOrder =
    direction === "asc"
      ? sortedItems.map((item) => item.id)
      : [...sortedItems].reverse().map((item) => item.id);

  const shuffled = shuffleUntilDifferent(sortedItems, (i) => i.id);

  return {
    items: shuffled,
    correctOrder,
    instruction: direction === "asc" ? "Xếp từ thấp đến cao" : "Xếp từ cao đến thấp",
    direction,
  };
}

// ============ QUANTITY PUZZLES (Group 2) ============

const QUANTITY_SETS_3 = [
  [1, 3, 5],
  [2, 4, 6],
  [1, 2, 4],
  [2, 3, 5],
  [1, 4, 7],
];
const QUANTITY_SETS_4 = [
  [1, 2, 4, 6],
  [1, 3, 5, 7],
  [2, 3, 4, 6],
  [1, 2, 3, 5],
];

export function generateQuantityPuzzle(
  direction: "asc" | "desc",
  itemCount: 3 | 4 = 3,
): SortPuzzle {
  const thing = pickRandom(ThingImages);
  const sets = itemCount === 3 ? QUANTITY_SETS_3 : QUANTITY_SETS_4;
  const quantities = pickRandom(sets);

  const sortedItems: SortableItem[] = quantities.map((qty, i) => ({
    id: `qty-${i}`,
    type: "quantity" as const,
    sortValue: qty,
    label: `${qty}`,
    quantity: qty,
    quantityImage: thing.icon,
  }));

  const correctOrder =
    direction === "asc"
      ? sortedItems.map((item) => item.id)
      : [...sortedItems].reverse().map((item) => item.id);

  const shuffled = shuffleUntilDifferent(sortedItems, (i) => i.id);

  return {
    items: shuffled,
    correctOrder,
    instruction: direction === "asc" ? "Xếp từ ít đến nhiều" : "Xếp từ nhiều đến ít",
    direction,
  };
}

// ============ COLOR PUZZLES (Group 3) ============

interface ColorFamily {
  name: string;
  shades3: string[];
  shades4: string[];
}

const COLOR_FAMILIES: ColorFamily[] = [
  {
    name: "đỏ",
    shades3: ["#FECACA", "#EF4444", "#991B1B"],
    shades4: ["#FEE2E2", "#FCA5A5", "#EF4444", "#991B1B"],
  },
  {
    name: "xanh dương",
    shades3: ["#BFDBFE", "#3B82F6", "#1E3A8A"],
    shades4: ["#DBEAFE", "#93C5FD", "#3B82F6", "#1E3A8A"],
  },
  {
    name: "xanh lá",
    shades3: ["#BBF7D0", "#22C55E", "#166534"],
    shades4: ["#DCFCE7", "#86EFAC", "#22C55E", "#166534"],
  },
  {
    name: "tím",
    shades3: ["#E9D5FF", "#A855F7", "#581C87"],
    shades4: ["#F3E8FF", "#C084FC", "#A855F7", "#581C87"],
  },
  {
    name: "cam",
    shades3: ["#FED7AA", "#F97316", "#9A3412"],
    shades4: ["#FFEDD5", "#FDBA74", "#F97316", "#9A3412"],
  },
  {
    name: "vàng",
    shades3: ["#FEF08A", "#EAB308", "#854D0E"],
    shades4: ["#FEF9C3", "#FDE047", "#EAB308", "#854D0E"],
  },
];

const SHAPES: PatternShapeType[] = ["circle", "square", "star", "hexagon", "diamond"];

export function generateColorPuzzle(
  direction: "asc" | "desc",
  itemCount: 3 | 4 = 3,
): SortPuzzle {
  const family = pickRandom(COLOR_FAMILIES);
  const shape = pickRandom(SHAPES);
  const shades = itemCount === 3 ? family.shades3 : family.shades4;

  // shades are already ordered light→dark (asc)
  const sortedItems: SortableItem[] = shades.map((color, i) => ({
    id: `color-${i}`,
    type: "color" as const,
    sortValue: i,
    label: `${family.name} ${i + 1}`,
    color,
    shape,
  }));

  const correctOrder =
    direction === "asc"
      ? sortedItems.map((item) => item.id)
      : [...sortedItems].reverse().map((item) => item.id);

  const shuffled = shuffleUntilDifferent(sortedItems, (i) => i.id);

  return {
    items: shuffled,
    correctOrder,
    instruction: direction === "asc" ? "Xếp từ nhạt đến đậm" : "Xếp từ đậm đến nhạt",
    direction,
  };
}

// ============ MAIN GENERATOR ============

export function generatePuzzle(
  groupId: string,
  lessonId: string,
): SortPuzzle {
  if (groupId === "group1") {
    // Size + Height group
    if (lessonId === "lesson1") return generateSizePuzzle("asc", 3);
    if (lessonId === "lesson2") return generateSizePuzzle("desc", 3);
    if (lessonId === "lesson3") return generateHeightPuzzle("asc");
    if (lessonId === "lesson4") return generateHeightPuzzle("desc");
    // lesson5 = challenge: random size or height
    const useHeight = Math.random() > 0.5;
    const dir = Math.random() > 0.5 ? "asc" : "desc";
    return useHeight ? generateHeightPuzzle(dir) : generateSizePuzzle(dir, 4);
  }

  if (groupId === "group2") {
    // Quantity group
    if (lessonId === "lesson1") return generateQuantityPuzzle("asc", 3);
    if (lessonId === "lesson2") return generateQuantityPuzzle("desc", 3);
    return generateQuantityPuzzle(Math.random() > 0.5 ? "asc" : "desc", 4);
  }

  // group3 = Color group
  if (lessonId === "lesson1") return generateColorPuzzle("asc", 3);
  if (lessonId === "lesson2") return generateColorPuzzle("desc", 3);
  return generateColorPuzzle(Math.random() > 0.5 ? "asc" : "desc", 4);
}

// ============ GROUPS ============

export const GROUPS: GroupData[] = [
  {
    id: "group1",
    title: "Kích Thước",
    description: "Sắp xếp theo kích thước nhỏ đến lớn",
    logo: LogoGroup1,
    variant: "green" as const,
  },
  {
    id: "group2",
    title: "Số Lượng",
    description: "Sắp xếp theo số lượng ít đến nhiều",
    logo: LogoGroup2,
    variant: "orange" as const,
  },
  {
    id: "group3",
    title: "Màu Sắc",
    description: "Sắp xếp theo màu sắc nhạt đến đậm",
    logo: LogoGroup3,
    variant: "purple" as const,
  },
];

// ============ LESSON CONFIG ============

export interface LessonConfig {
  id: string;
  title: string;
  icon: string;
  isPremium: boolean;
}

export const LESSON_CONFIGS: Record<string, LessonConfig[]> = {
  group1: [
    { id: "lesson1", title: "Nhỏ → Lớn", icon: "↗️", isPremium: false },
    { id: "lesson2", title: "Lớn → Nhỏ", icon: "↘️", isPremium: false },
    { id: "lesson3", title: "Thấp → Cao", icon: "📏", isPremium: false },
    { id: "lesson4", title: "Cao → Thấp", icon: "📐", isPremium: true },
    { id: "lesson5", title: "Thử thách", icon: "⚡", isPremium: true },
  ],
  group2: [
    { id: "lesson1", title: "Ít → Nhiều", icon: "📈", isPremium: false },
    { id: "lesson2", title: "Nhiều → Ít", icon: "📉", isPremium: true },
    { id: "lesson3", title: "Thử thách", icon: "⚡", isPremium: true },
  ],
  group3: [
    { id: "lesson1", title: "Nhạt → Đậm", icon: "🎨", isPremium: false },
    { id: "lesson2", title: "Đậm → Nhạt", icon: "🌈", isPremium: true },
    { id: "lesson3", title: "Thử thách", icon: "⚡", isPremium: true },
  ],
};
