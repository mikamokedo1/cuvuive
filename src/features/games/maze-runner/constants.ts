import { GroupData } from "@/features/games/learn-vehicle/constants";

// Logos
const LogoGroup1 = "https://assets.cuthongminh.com/games/maze-runner/group1.webp";
const LogoGroup2 = "https://assets.cuthongminh.com/games/maze-runner/group2.webp";
const LogoGroup3 = "https://assets.cuthongminh.com/games/maze-runner/group3.webp";

// ═══════════════════════════════════════════
// Types
// ═══════════════════════════════════════════

/** Each cell has 4 wall flags (true = wall present) */
export interface MazeCell {
  top: boolean;
  right: boolean;
  bottom: boolean;
  left: boolean;
}

export interface MazeData {
  rows: number;
  cols: number;
  grid: MazeCell[][];
  start: [number, number]; // [row, col]
  goal: [number, number]; // [row, col]
}

export interface LineConnectLevel {
  rows: number;
  cols: number;
  dots: {
    color: string;
    positions: [Point, Point];
  }[];
}

type Point = [number, number];

// ═══════════════════════════════════════════
// Maze Generator (Recursive Backtracking / DFS)
// ═══════════════════════════════════════════
// Guarantees a perfect maze where every cell
// is reachable and there is exactly ONE path
// between any two cells.

function seededRandom(seed: number) {
  // Simple LCG pseudo-random for reproducible mazes
  let s = seed;
  return () => {
    s = (s * 1664525 + 1013904223) & 0xffffffff;
    return (s >>> 0) / 0xffffffff;
  };
}

function shuffleArray<T>(arr: T[], rand: () => number): T[] {
  const result = [...arr];
  for (let i = result.length - 1; i > 0; i--) {
    const j = Math.floor(rand() * (i + 1));
    [result[i], result[j]] = [result[j], result[i]];
  }
  return result;
}

export function generateMaze(rows: number, cols: number, seed: number): MazeData {
  const rand = seededRandom(seed);

  // Initialize grid with all walls
  const grid: MazeCell[][] = [];
  for (let r = 0; r < rows; r++) {
    const row: MazeCell[] = [];
    for (let c = 0; c < cols; c++) {
      row.push({ top: true, right: true, bottom: true, left: true });
    }
    grid.push(row);
  }

  // Track visited cells
  const visited: boolean[][] = Array.from({ length: rows }, () => Array(cols).fill(false));

  // Direction offsets: [dRow, dCol, wallToRemoveFromCurrent, wallToRemoveFromNeighbor]
  const directions: [number, number, keyof MazeCell, keyof MazeCell][] = [
    [-1, 0, "top", "bottom"], // up
    [1, 0, "bottom", "top"], // down
    [0, -1, "left", "right"], // left
    [0, 1, "right", "left"], // right
  ];

  // DFS carve
  function carve(r: number, c: number) {
    visited[r][c] = true;
    const shuffled = shuffleArray(directions, rand);

    for (const [dr, dc, wall, opposite] of shuffled) {
      const nr = r + dr;
      const nc = c + dc;

      if (nr >= 0 && nr < rows && nc >= 0 && nc < cols && !visited[nr][nc]) {
        // Remove walls between current cell and neighbor
        grid[r][c][wall] = false;
        grid[nr][nc][opposite] = false;
        carve(nr, nc);
      }
    }
  }

  // Start carving from (0, 0)
  carve(0, 0);

  return {
    rows,
    cols,
    grid,
    start: [0, 0],
    goal: [rows - 1, cols - 1],
  };
}

// ═══════════════════════════════════════════
// Pre-generated mazes with fixed seeds
// (Ensures the same mazes every time)
// ═══════════════════════════════════════════

// Group 1: Easy 5×5
export const MAZES_GROUP1: MazeData[] = [
  generateMaze(5, 5, 1001),
  generateMaze(5, 5, 2002),
  generateMaze(5, 5, 3003),
  generateMaze(5, 5, 4004),
  generateMaze(5, 5, 5005),
];

// Group 2: Medium 6×6
export const MAZES_GROUP2: MazeData[] = [
  generateMaze(6, 6, 6006),
  generateMaze(6, 6, 7007),
  generateMaze(6, 6, 8008),
  generateMaze(6, 6, 9009),
  generateMaze(6, 6, 1010),
];

// Group 3: Hard 7×7
export const MAZES_GROUP3: MazeData[] = [
  generateMaze(7, 7, 1111),
  generateMaze(7, 7, 2222),
  generateMaze(7, 7, 3333),
  generateMaze(7, 7, 4444),
  generateMaze(7, 7, 5555),
];

// ═══════════════════════════════════════════
// Get maze helper
// ═══════════════════════════════════════════

export function getMaze(groupId: string, index: number): MazeData {
  let mazes: MazeData[];
  if (groupId === "group1") mazes = MAZES_GROUP1;
  else if (groupId === "group2") mazes = MAZES_GROUP2;
  else mazes = MAZES_GROUP3;
  return mazes[index % mazes.length];
}

// ═══════════════════════════════════════════
// Groups
// ═══════════════════════════════════════════

export const GROUPS: GroupData[] = [
  {
    id: "group1",
    title: "Mê cung dễ",
    description: "Điều hướng qua mê cung 5×5 đơn giản",
    logo: LogoGroup1,
    variant: "green" as const,
  },
  {
    id: "group2",
    title: "Mê cung vừa",
    description: "Mê cung 6×6 với nhiều đường rẽ hơn",
    logo: LogoGroup2,
    variant: "orange" as const,
  },
  {
    id: "group3",
    title: "Mê cung khó",
    description: "Mê cung 7×7 để thử thách tư duy",
    logo: LogoGroup3,
    variant: "purple" as const,
  },
];
