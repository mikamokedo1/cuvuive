// SVG path data for shape tracing
// Each path is designed for a 260x320 viewBox
// Paths are simplified for child-friendly tracing

export interface ShapePathData {
  path: string; // SVG path d attribute
  startPoint: { x: number; y: number }; // Starting point for the "start dot"
  viewBox: string; // SVG viewBox
  estimatedLength: number; // Approximate path length for validation
}

export const SHAPE_PATHS: Record<string, ShapePathData> = {
  circle: {
    // Center (130, 160), Radius 100 -> nice large circle
    path: "M 130 60 Q 230 60 230 160 Q 230 260 130 260 Q 30 260 30 160 Q 30 60 130 60",
    startPoint: { x: 130, y: 60 },
    viewBox: "0 0 260 320",
    estimatedLength: 628, // 2 * pi * 100
  },
  square: {
    // 160x160 square centered
    path: "M 50 80 L 210 80 L 210 240 L 50 240 L 50 80",
    startPoint: { x: 50, y: 80 },
    viewBox: "0 0 260 320",
    estimatedLength: 640,
  },
  triangle: {
    path: "M 130 40 L 210 260 L 50 260 L 130 40",
    startPoint: { x: 130, y: 40 },
    viewBox: "0 0 260 320",
    estimatedLength: 600,
  },
  rectangle: {
    // 200x120 rectangle -> clearly rectangular
    path: "M 30 100 L 230 100 L 230 220 L 30 220 L 30 100",
    startPoint: { x: 30, y: 100 },
    viewBox: "0 0 260 320",
    estimatedLength: 640,
  },
  hexagon: {
    path: "M 130 40 L 200 100 L 200 220 L 130 280 L 60 220 L 60 100 L 130 40",
    startPoint: { x: 130, y: 40 },
    viewBox: "0 0 260 320",
    estimatedLength: 700,
  },
  star: {
    path: "M 130 40 L 150 120 L 230 120 L 170 170 L 190 260 L 130 210 L 70 260 L 90 170 L 30 120 L 110 120 L 130 40",
    startPoint: { x: 130, y: 40 },
    viewBox: "0 0 260 320",
    estimatedLength: 800,
  },
  heart: {
    path: "M 130 280 Q 40 200 40 140 Q 40 60 90 60 Q 130 60 130 100 Q 130 60 170 60 Q 220 60 220 140 Q 220 200 130 280",
    startPoint: { x: 130, y: 280 },
    viewBox: "0 0 260 320",
    estimatedLength: 600,
  },
  diamond: {
    path: "M 130 40 L 210 160 L 130 280 L 50 160 L 130 40",
    startPoint: { x: 130, y: 40 },
    viewBox: "0 0 260 320",
    estimatedLength: 560,
  },
  oval: {
    path: "M 130 60 Q 200 60 200 160 Q 200 260 130 260 Q 60 260 60 160 Q 60 60 130 60",
    startPoint: { x: 130, y: 60 },
    viewBox: "0 0 260 320",
    estimatedLength: 480,
  },
  trapezium: {
    path: "M 80 60 L 180 60 L 220 260 L 40 260 L 80 60",
    startPoint: { x: 80, y: 60 },
    viewBox: "0 0 260 320",
    estimatedLength: 640,
  },
};
