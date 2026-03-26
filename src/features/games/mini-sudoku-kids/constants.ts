import { GroupData } from "@/features/games/learn-vehicle/constants";

// ── Emoji sets for each theme ──
export const EMOJI_FRUITS = ["🍎", "🍌", "🍊", "🍇"];
export const EMOJI_SHAPES = ["🔴", "🟡", "🔵", "🟢"];
export const EMOJI_ANIMALS = ["🐱", "🐶", "🐰", "🐻"];
export const EMOJI_OBJECTS = ["⭐", "🌙", "☀️", "❤️"];

// ── Types ──
export interface SudokuCell {
  value: string | null; // emoji string or null for empty
  isGiven: boolean;
}

export interface SudokuPuzzle {
  grid: SudokuCell[][];
  size: number;
  answers: { row: number; col: number; value: string }[];
}

// ── Latin square generator ──
// Generates a valid NxN Latin square where each symbol appears exactly once per row and column.
function generateLatinSquare(size: number, symbols: string[]): string[][] {
  const selected = symbols.slice(0, size);
  // Start with a random permutation for the first row
  const firstRow = shuffleArray([...selected]);
  const grid: string[][] = [firstRow];

  // Each subsequent row is a cyclic shift
  for (let i = 1; i < size; i++) {
    const row = grid[0].map((_, col) => grid[0][(col + i) % size]);
    grid.push(row);
  }

  // Shuffle rows (except keep structure valid — shuffling full rows preserves Latin square property)
  const shuffledRows = shuffleArray(grid);

  // Shuffle columns
  const colOrder = shuffleArray([...Array(size).keys()]);
  const result = shuffledRows.map((row) => colOrder.map((c) => row[c]));

  return result;
}

function shuffleArray<T>(arr: T[]): T[] {
  const a = [...arr];
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

// ── Puzzle generator ──
export function generateSudokuPuzzle(
  size: 2 | 3,
  blanks: number,
  emojiSet: string[],
): SudokuPuzzle {
  const solution = generateLatinSquare(size, emojiSet);

  // Pick random cells to blank out
  const allCells: { row: number; col: number }[] = [];
  for (let r = 0; r < size; r++) {
    for (let c = 0; c < size; c++) {
      allCells.push({ row: r, col: c });
    }
  }
  const blankCells = shuffleArray(allCells).slice(0, blanks);

  const grid: SudokuCell[][] = solution.map((row, r) =>
    row.map((value, c) => {
      const isBlank = blankCells.some((b) => b.row === r && b.col === c);
      return {
        value: isBlank ? null : value,
        isGiven: !isBlank,
      };
    }),
  );

  const answers = blankCells.map((cell) => ({
    row: cell.row,
    col: cell.col,
    value: solution[cell.row][cell.col],
  }));

  return { grid, size, answers };
}

// ── Lesson config ──
export interface LessonConfig {
  size: 2 | 3;
  blanks: number;
  emojiSet: string[];
  rounds: number;
}

export function getLessonConfig(groupId: string, lessonId: string): LessonConfig {
  const configs: Record<string, Record<string, LessonConfig>> = {
    group1: {
      // Làm quen 2×2: progressive from easy to medium
      lesson1: { size: 2, blanks: 1, emojiSet: EMOJI_FRUITS, rounds: 3 },   // intro: 1 blank
      lesson2: { size: 2, blanks: 1, emojiSet: EMOJI_OBJECTS, rounds: 5 },   // practice: different emojis
      lesson3: { size: 2, blanks: 2, emojiSet: EMOJI_SHAPES, rounds: 3 },   // harder: 2 blanks!
      lesson4: { size: 2, blanks: 2, emojiSet: EMOJI_ANIMALS, rounds: 5 },  // challenge: 2 blanks, more rounds
    },
    group2: {
      // Sudoku hình ảnh 3×3: upgrade to larger grid
      lesson1: { size: 3, blanks: 1, emojiSet: EMOJI_FRUITS, rounds: 3 },   // intro 3×3
      lesson2: { size: 3, blanks: 2, emojiSet: EMOJI_FRUITS, rounds: 3 },   // 2 blanks
      lesson3: { size: 3, blanks: 2, emojiSet: EMOJI_OBJECTS, rounds: 5 },  // more rounds
      lesson4: { size: 3, blanks: 3, emojiSet: EMOJI_OBJECTS, rounds: 5 },  // 3 blanks!
    },
    group3: {
      // Sudoku màu sắc: color-themed
      lesson1: { size: 2, blanks: 1, emojiSet: EMOJI_SHAPES, rounds: 3 },   // easy intro
      lesson2: { size: 3, blanks: 1, emojiSet: EMOJI_SHAPES, rounds: 5 },   // upgrade to 3×3
      lesson3: { size: 3, blanks: 2, emojiSet: EMOJI_SHAPES, rounds: 5 },   // 2 blanks
      lesson4: { size: 3, blanks: 3, emojiSet: EMOJI_SHAPES, rounds: 5 },   // 3 blanks challenge
    },
    group4: {
      // Sudoku con vật: animal-themed
      lesson1: { size: 2, blanks: 1, emojiSet: EMOJI_ANIMALS, rounds: 3 },  // easy intro
      lesson2: { size: 3, blanks: 1, emojiSet: EMOJI_ANIMALS, rounds: 5 },  // upgrade to 3×3
      lesson3: { size: 3, blanks: 2, emojiSet: EMOJI_ANIMALS, rounds: 5 },  // 2 blanks
      lesson4: { size: 3, blanks: 3, emojiSet: EMOJI_ANIMALS, rounds: 5 },  // 3 blanks challenge
    },
  };

  return (
    configs[groupId]?.[lessonId] ?? {
      size: 2,
      blanks: 1,
      emojiSet: EMOJI_FRUITS,
      rounds: 3,
    }
  );
}

// ── Group logos ──
const LogoGroup1 = "https://assets.cuthongminh.com/games/mini-sudoku-kids/group1.webp";
const LogoGroup2 = "https://assets.cuthongminh.com/games/mini-sudoku-kids/group2.webp";
const LogoGroup3 = "https://assets.cuthongminh.com/games/mini-sudoku-kids/group3.webp";
const LogoGroup4 = "https://assets.cuthongminh.com/games/mini-sudoku-kids/group4.webp";

export const GROUPS: GroupData[] = [
  {
    id: "group1",
    title: "Làm quen 2×2",
    description: "Bé làm quen với bảng sudoku nhỏ 2×2",
    logo: LogoGroup1,
    variant: "orange" as const,
  },
  {
    id: "group2",
    title: "Sudoku hình ảnh 3×3",
    description: "Bé giải bảng sudoku 3×3 với hình ảnh",
    logo: LogoGroup2,
    variant: "purple" as const,
  },
  {
    id: "group3",
    title: "Sudoku màu sắc",
    description: "Bé điền màu sắc vào bảng sudoku",
    logo: LogoGroup3,
    variant: "blue" as const,
  },
  {
    id: "group4",
    title: "Sudoku con vật",
    description: "Bé điền con vật vào bảng sudoku",
    logo: LogoGroup4,
    variant: "green" as const,
  },
];
