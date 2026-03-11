export interface LineConnectLevel {
  rows: number;
  cols: number;
  dots: {
    color: string;
    positions: [Point, Point];
  }[];
}

type Point = [number, number];

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

  const emptyCells: [number, number][] = [];
  for (let r = 0; r < rows; r++) {
    for (let c = 0; c < cols; c++) emptyCells.push([r, c]);
  }

  for (let i = emptyCells.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [emptyCells[i], emptyCells[j]] = [emptyCells[j], emptyCells[i]];
  }

  for (let i = 0; i < numDots && i < emptyCells.length; i++) {
    const [r, c] = emptyCells[i];
    grid[r][c] = i;
    paths.push([[r, c]]);
  }

  let changed = true;
  while (changed) {
    changed = false;
    const pathIndices = Array.from({ length: paths.length }, (_, i) => i);
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

  const activeDots = paths
    .filter((p) => p.length >= 2)
    .slice(0, numDots)
    .map((p, i) => ({
      color: DOT_COLORS[i % DOT_COLORS.length],
      positions: [p[0], p[p.length - 1]] as [Point, Point],
    }));

  if (activeDots.length < Math.min(numDots, 2)) {
    return generateLineConnectLevel(rows, cols, Math.max(2, numDots - 1));
  }

  return { rows, cols, dots: activeDots };
}

import LogoGroup1 from "@/assets/games/maze-runner/group1.png";

export const GROUPS = [
  {
    id: "logic-connect",
    title: "Nối điểm trí tuệ",
    description: "Nối các cặp màu giống nhau không được chồng chéo",
    variant: "blue" as const,
    logo: LogoGroup1,
  },
];

export function isLineConnectGroup(groupId: string): boolean {
  return groupId === "logic-connect";
}
