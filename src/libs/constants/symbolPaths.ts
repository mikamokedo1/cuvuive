// SVG path data for handwriting tracing of comparison symbols
// Each path is designed for a 260x320 viewBox
// Paths are simplified for child-friendly tracing

export interface SymbolPathData {
  path: string; // SVG path d attribute
  startPoint: { x: number; y: number }; // Starting point for the "start dot"
  viewBox: string; // SVG viewBox
  estimatedLength: number; // Approximate path length for validation
}

export const SYMBOL_PATHS: Record<string, SymbolPathData> = {
  ">": {
    // Greater than: Two lines forming >
    path: "M 60 80 L 200 160 L 60 240",
    startPoint: { x: 60, y: 80 },
    viewBox: "0 0 260 320",
    estimatedLength: 320,
  },
  "<": {
    // Less than: Two lines forming <
    path: "M 200 80 L 60 160 L 200 240",
    startPoint: { x: 200, y: 80 },
    viewBox: "0 0 260 320",
    estimatedLength: 320,
  },
  "=": {
    // Equal: Two horizontal lines
    path: "M 60 120 L 200 120 M 60 200 L 200 200",
    startPoint: { x: 60, y: 120 },
    viewBox: "0 0 260 320",
    estimatedLength: 280,
  },
  "+": {
    // Plus: Vertical and horizontal line crossing
    path: "M 130 80 L 130 240 M 50 160 L 210 160",
    startPoint: { x: 130, y: 80 },
    viewBox: "0 0 260 320",
    estimatedLength: 320,
  },
  "−": {
    // Using the minus character used in the project
    // Minus: Single horizontal line
    path: "M 50 160 L 210 160",
    startPoint: { x: 50, y: 160 },
    viewBox: "0 0 260 320",
    estimatedLength: 160,
  },
};

// Vietnamese symbol names for captions
export const SYMBOL_NAMES_VI: Record<string, string> = {
  ">": "Lớn hơn",
  "<": "Nhỏ hơn",
  "=": "Bằng nhau",
  "+": "Cộng",
  "−": "Trừ",
};
