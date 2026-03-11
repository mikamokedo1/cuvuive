export interface TonePathData {
  path: string;
  startPoint: { x: number; y: number };
  viewBox: string;
  estimatedLength: number;
}

export const TONE_PATHS: Record<string, TonePathData> = {
  sac: {
    // Sắc (´): bottom-left to top-right
    path: "M 100 160 L 160 120",
    startPoint: { x: 100, y: 160 },
    viewBox: "0 0 260 320",
    estimatedLength: 72,
  },
  huyen: {
    // Huyền (`): top-left to bottom-right
    path: "M 100 120 L 160 160",
    startPoint: { x: 100, y: 120 },
    viewBox: "0 0 260 320",
    estimatedLength: 72,
  },
  hoi: {
    // Hỏi (?): hook shape
    path: "M 110 130 C 130 110, 160 130, 140 160 C 130 175, 130 185, 130 190",
    startPoint: { x: 110, y: 130 },
    viewBox: "0 0 260 320",
    estimatedLength: 120,
  },
  nga: {
    // Ngã (~): wave shape
    path: "M 100 150 C 115 130, 130 160, 160 140",
    startPoint: { x: 100, y: 150 },
    viewBox: "0 0 260 320",
    estimatedLength: 80,
  },
  nang: {
    // Nặng (.): a dot (we will represent it as a tiny circle path)
    path: "M 125 180 A 5 5 0 1 0 135 180 A 5 5 0 1 0 125 180",
    startPoint: { x: 130, y: 180 },
    viewBox: "0 0 260 320",
    estimatedLength: 32,
  },
};
