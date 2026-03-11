import { GroupData } from "@/features/games/learn-vehicle/constants";

// Logos
import LogoGroup1 from "@/assets/games/maze-runner/group1.png";
import LogoGroup2 from "@/assets/games/maze-runner/group2.png";
import LogoGroup3 from "@/assets/games/maze-runner/group3.png";

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
// Line Connect Levels & Generator
// ═══════════════════════════════════════════

export const DOT_COLORS = [
  "#ef4444", // Red
  "#3b82f6", // Blue
  "#22c55e", // Green
  "#eab308", // Yellow
  "#a855f7", // Purple
  "#f97316", // Orange
  "#ec4899", // Pink
  "#06b6d4", // Cyan
  "#8b5cf6", // Violet
  "#10b981", // Emerald
];

export function generateLineConnectLevel(rows: number, cols: number, numDots: number): LineConnectLevel {
  const grid: (number | null)[][] = Array.from({ length: rows }, () => Array(cols).fill(null));
  const paths: [number, number][][] = [];

  // 1. Pick starting points
  const emptyCells: [number, number][] = [];
  for (let r = 0; r < rows; r++) {
    for (let c = 0; c < cols; c++) emptyCells.push([r, c]);
  }

  // Shuffle empty cells
  for (let i = emptyCells.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [emptyCells[i], emptyCells[j]] = [emptyCells[j], emptyCells[i]];
  }

  for (let i = 0; i < numDots && i < emptyCells.length; i++) {
    const [r, c] = emptyCells[i];
    grid[r][c] = i;
    paths.push([[r, c]]);
  }

  // 2. Grow paths randomly
  let changed = true;
  while (changed) {
    changed = false;
    const pathIndices = Array.from({ length: paths.length }, (_, i) => i);
    // Shuffle growth order
    for (let i = pathIndices.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [pathIndices[i], pathIndices[j]] = [pathIndices[j], pathIndices[i]];
    }

    for (const idx of pathIndices) {
      const path = paths[idx];
      const last = path[path.length - 1];
      const neighbors: [number, number][] = [
        [last[0] - 1, last[1]],
        [last[0] + 1, last[1]],
        [last[0], last[1] - 1],
        [last[0], last[1] + 1],
      ].filter(([nr, nc]) => nr >= 0 && nr < rows && nc >= 0 && nc < cols && grid[nr][nc] === null) as [number, number][];

      if (neighbors.length > 0) {
        const next = neighbors[Math.floor(Math.random() * neighbors.length)];
        grid[next[0]][next[1]] = idx;
        path.push(next);
        changed = true;
      }
    }
  }

  // 3. Prepare final dots
  const activeDots = paths
    .filter((p) => p.length >= 2) // Must have at least two points
    .slice(0, numDots)
    .map((p, i) => ({
      color: DOT_COLORS[i % DOT_COLORS.length],
      positions: [p[0], p[p.length - 1]] as [Point, Point],
    }));

  // If we couldn't generate enough paths, retry once with smaller count or simpler grid
  if (activeDots.length < Math.min(numDots, 2)) {
    return generateLineConnectLevel(rows, cols, Math.max(2, numDots - 1));
  }

  return { rows, cols, dots: activeDots };
}

export const LINE_CONNECT_LEVELS: LineConnectLevel[] = [
  {
    rows: 4,
    cols: 4,
    dots: [
      { color: "#ef4444", positions: [[0, 0], [3, 0]] }, // Red
      { color: "#3b82f6", positions: [[0, 1], [3, 1]] }, // Blue
      { color: "#22c55e", positions: [[0, 2], [3, 2]] }, // Green
      { color: "#eab308", positions: [[0, 3], [3, 3]] }, // Yellow
    ],
  },
  {
    rows: 5,
    cols: 5,
    dots: [
      { color: "#ef4444", positions: [[0, 0], [0, 4]] },
      { color: "#3b82f6", positions: [[1, 0], [1, 4]] },
      { color: "#22c55e", positions: [[2, 0], [2, 4]] },
      { color: "#eab308", positions: [[3, 0], [3, 4]] },
      { color: "#a855f7", positions: [[4, 0], [4, 4]] },
    ],
  },
  {
    rows: 6,
    cols: 6,
    dots: [
      { color: "#ef4444", positions: [[0, 0], [5, 0]] }, // Red
      { color: "#3b82f6", positions: [[1, 1], [4, 1]] }, // Blue
      { color: "#22c55e", positions: [[1, 2], [4, 2]] }, // Green
      { color: "#eab308", positions: [[1, 3], [4, 3]] }, // Yellow
      { color: "#a855f7", positions: [[1, 4], [4, 4]] }, // Purple
      { color: "#f97316", positions: [[0, 5], [5, 5]] }, // Orange
    ],
  },
];

export function isLineConnectGroup(groupId: string): boolean {
  return groupId === "group4";
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
  {
    id: "group4",
    title: "Nối điểm",
    description: "Nối các cặp màu giống nhau",
    logo: LogoGroup1, // Placeholder
    variant: "blue" as const,
  },
];
