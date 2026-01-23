// SVG path data for handwriting tracing of numbers 1-9
// Each path is designed for a 260x320 viewBox
// Paths are simplified for child-friendly tracing

export interface NumberPathData {
  path: string; // SVG path d attribute
  startPoint: { x: number; y: number }; // Starting point for the "start dot"
  viewBox: string; // SVG viewBox
  estimatedLength: number; // Approximate path length for validation
}

export const NUMBER_PATHS: Record<number, NumberPathData> = {
  1: {
    path: "M 100 60 L 130 40 L 130 280",
    startPoint: { x: 100, y: 60 },
    viewBox: "0 0 260 320",
    estimatedLength: 280,
  },
  2: {
    path: "M 60 100 Q 60 40 130 40 Q 200 40 200 100 Q 200 160 130 200 L 50 280 L 210 280",
    startPoint: { x: 60, y: 100 },
    viewBox: "0 0 260 320",
    estimatedLength: 480,
  },
  3: {
    path: "M 60 60 L 180 60 Q 200 60 200 100 Q 200 150 130 160 Q 200 170 200 220 Q 200 280 130 280 Q 60 280 60 250",
    startPoint: { x: 60, y: 60 },
    viewBox: "0 0 260 320",
    estimatedLength: 500,
  },
  4: {
    path: "M 160 40 L 50 200 L 210 200 M 160 120 L 160 280",
    startPoint: { x: 160, y: 40 },
    viewBox: "0 0 260 320",
    estimatedLength: 480,
  },
  5: {
    path: "M 180 40 L 80 40 L 70 140 Q 70 140 130 140 Q 200 140 200 210 Q 200 280 130 280 Q 60 280 60 250",
    startPoint: { x: 180, y: 40 },
    viewBox: "0 0 260 320",
    estimatedLength: 520,
  },
  6: {
    path: "M 180 60 Q 130 40 80 80 Q 40 140 50 200 Q 60 280 130 280 Q 200 280 200 220 Q 200 160 130 160 Q 60 160 50 200",
    startPoint: { x: 180, y: 60 },
    viewBox: "0 0 260 320",
    estimatedLength: 540,
  },
  7: {
    path: "M 50 40 L 200 40 L 110 280",
    startPoint: { x: 50, y: 40 },
    viewBox: "0 0 260 320",
    estimatedLength: 420,
  },
  8: {
    path: "M 130 160 Q 60 160 60 100 Q 60 40 130 40 Q 200 40 200 100 Q 200 160 130 160 Q 50 160 50 220 Q 50 280 130 280 Q 210 280 210 220 Q 210 160 130 160",
    startPoint: { x: 130, y: 160 },
    viewBox: "0 0 260 320",
    estimatedLength: 600,
  },
  9: {
    path: "M 200 120 Q 200 60 130 60 Q 60 60 60 120 Q 60 180 130 180 Q 200 180 200 120 L 200 220 Q 180 280 100 280",
    startPoint: { x: 200, y: 120 },
    viewBox: "0 0 260 320",
    estimatedLength: 520,
  },
};

// Vietnamese number names for captions
export const NUMBER_NAMES_VI: Record<number, string> = {
  1: "Một",
  2: "Hai",
  3: "Ba",
  4: "Bốn",
  5: "Năm",
  6: "Sáu",
  7: "Bảy",
  8: "Tám",
  9: "Chín",
};
