// SVG path data for handwriting tracing of Vietnamese alphabet letters
// Each path is designed for a 260x320 viewBox
// Paths are simplified, lowercase letter shapes for child-friendly tracing

export interface LetterPathData {
  path: string; // SVG path d attribute
  startPoint: { x: number; y: number }; // Starting point for the "start dot"
  viewBox: string; // SVG viewBox
}

export const LETTER_PATHS: Record<string, LetterPathData> = {
  // === VOWELS ===
  a: {
    // Lowercase 'a': oval body + right vertical stem
    path: "M 185 105 C 185 60, 75 60, 75 170 C 75 265, 185 265, 185 195 L 185 265",
    startPoint: { x: 185, y: 105 },
    viewBox: "0 0 260 320",
  },
  "ă": {
    // 'a' + breve (˘)
    path: "M 185 115 C 185 70, 75 70, 75 175 C 75 270, 185 270, 185 205 L 185 270 M 100 55 Q 130 85, 160 55",
    startPoint: { x: 185, y: 115 },
    viewBox: "0 0 260 320",
  },
  "â": {
    // 'a' + circumflex (^)
    path: "M 185 115 C 185 70, 75 70, 75 175 C 75 270, 185 270, 185 205 L 185 270 M 100 55 L 130 25 L 160 55",
    startPoint: { x: 185, y: 115 },
    viewBox: "0 0 260 320",
  },
  e: {
    // Lowercase 'e': middle horizontal + top curve + bottom open curve
    path: "M 75 170 L 185 170 C 185 95, 75 95, 75 170 C 75 265, 185 270, 185 215",
    startPoint: { x: 75, y: 170 },
    viewBox: "0 0 260 320",
  },
  "ê": {
    // 'e' + circumflex (^)
    path: "M 75 175 L 185 175 C 185 105, 75 105, 75 175 C 75 270, 185 275, 185 220 M 100 65 L 130 35 L 160 65",
    startPoint: { x: 75, y: 175 },
    viewBox: "0 0 260 320",
  },
  i: {
    // Lowercase 'i': vertical stroke + dot
    path: "M 130 115 L 130 265 M 125 75 A 10 10 0 1 0 135 75 A 10 10 0 1 0 125 75",
    startPoint: { x: 130, y: 115 },
    viewBox: "0 0 260 320",
  },
  o: {
    // Lowercase 'o': full oval
    path: "M 130 85 C 180 85, 215 125, 215 175 C 215 225, 180 265, 130 265 C 80 265, 45 225, 45 175 C 45 125, 80 85, 130 85",
    startPoint: { x: 130, y: 85 },
    viewBox: "0 0 260 320",
  },
  "ô": {
    // 'o' + circumflex (^)
    path: "M 130 95 C 180 95, 215 130, 215 180 C 215 230, 180 270, 130 270 C 80 270, 45 230, 45 180 C 45 130, 80 95, 130 95 M 100 60 L 130 30 L 160 60",
    startPoint: { x: 130, y: 95 },
    viewBox: "0 0 260 320",
  },
  "ơ": {
    // 'o' + horn (hook on upper right)
    path: "M 130 95 C 180 95, 210 130, 210 180 C 210 230, 180 270, 130 270 C 80 270, 50 230, 50 180 C 50 130, 80 95, 130 95 M 205 110 C 220 90, 240 105, 228 120",
    startPoint: { x: 130, y: 95 },
    viewBox: "0 0 260 320",
  },
  u: {
    // Lowercase 'u': U-shape + right stem
    path: "M 80 105 L 80 195 C 80 265, 180 265, 180 195 L 180 105",
    startPoint: { x: 80, y: 105 },
    viewBox: "0 0 260 320",
  },
  "ư": {
    // 'u' + horn (hook on upper right)
    path: "M 80 115 L 80 200 C 80 270, 180 270, 180 200 L 180 115 M 180 100 C 200 75, 220 95, 208 110",
    startPoint: { x: 80, y: 115 },
    viewBox: "0 0 260 320",
  },
  y: {
    // Lowercase 'y': two diagonals, right one continues as descender
    path: "M 65 105 L 130 210 M 195 105 L 100 310",
    startPoint: { x: 65, y: 105 },
    viewBox: "0 0 260 320",
  },

  // === CONSONANTS ===
  b: {
    // Lowercase 'b': tall left stem + right oval
    path: "M 80 45 L 80 265 M 80 155 C 80 95, 185 95, 185 180 C 185 260, 80 260, 80 200",
    startPoint: { x: 80, y: 45 },
    viewBox: "0 0 260 320",
  },
  c: {
    // Lowercase 'c': open arc
    path: "M 185 120 C 155 60, 75 75, 75 170 C 75 270, 155 280, 185 230",
    startPoint: { x: 185, y: 120 },
    viewBox: "0 0 260 320",
  },
  d: {
    // Lowercase 'd': left oval + tall right stem
    path: "M 180 45 L 180 265 M 180 155 C 180 95, 75 95, 75 180 C 75 260, 180 260, 180 200",
    startPoint: { x: 180, y: 45 },
    viewBox: "0 0 260 320",
  },
  "đ": {
    // 'd' + horizontal stroke through ascender
    path: "M 180 45 L 180 265 M 180 155 C 180 95, 75 95, 75 180 C 75 260, 180 260, 180 200 M 150 75 L 215 75",
    startPoint: { x: 180, y: 45 },
    viewBox: "0 0 260 320",
  },
  g: {
    // Lowercase 'g': oval + right descending stem with hook
    path: "M 185 105 C 185 60, 75 60, 75 170 C 75 260, 185 260, 185 195 L 185 300 C 185 330, 90 325, 80 290",
    startPoint: { x: 185, y: 105 },
    viewBox: "0 0 260 320",
  },
  h: {
    // Lowercase 'h': tall left stem + right arch
    path: "M 80 45 L 80 265 M 80 155 C 80 95, 180 95, 180 160 L 180 265",
    startPoint: { x: 80, y: 45 },
    viewBox: "0 0 260 320",
  },
  k: {
    // Lowercase 'k': tall left stem + two diagonal strokes
    path: "M 80 45 L 80 265 M 180 105 L 90 180 L 180 265",
    startPoint: { x: 80, y: 45 },
    viewBox: "0 0 260 320",
  },
  l: {
    // Lowercase 'l': tall vertical stroke
    path: "M 130 45 L 130 265",
    startPoint: { x: 130, y: 45 },
    viewBox: "0 0 260 320",
  },
  m: {
    // Lowercase 'm': left stem + two humps (wider letter)
    path: "M 40 105 L 40 265 M 40 160 C 40 95, 130 95, 130 165 L 130 265 M 130 160 C 130 95, 220 95, 220 165 L 220 265",
    startPoint: { x: 40, y: 105 },
    viewBox: "0 0 260 320",
  },
  n: {
    // Lowercase 'n': left stem + one hump
    path: "M 80 105 L 80 265 M 80 160 C 80 95, 180 95, 180 165 L 180 265",
    startPoint: { x: 80, y: 105 },
    viewBox: "0 0 260 320",
  },
  p: {
    // Lowercase 'p': left descending stem + right oval
    path: "M 80 105 L 80 310 M 80 155 C 80 95, 185 95, 185 180 C 185 260, 80 260, 80 200",
    startPoint: { x: 80, y: 105 },
    viewBox: "0 0 260 320",
  },
  q: {
    // Lowercase 'q': left oval + right descending stem
    path: "M 180 105 L 180 310 M 180 155 C 180 95, 75 95, 75 180 C 75 260, 180 260, 180 200",
    startPoint: { x: 180, y: 105 },
    viewBox: "0 0 260 320",
  },
  r: {
    // Lowercase 'r': left stem + small bump curve
    path: "M 85 105 L 85 265 M 85 170 C 85 105, 150 85, 185 120",
    startPoint: { x: 85, y: 105 },
    viewBox: "0 0 260 320",
  },
  s: {
    // Lowercase 's': S-shaped curve
    path: "M 175 120 C 155 65, 85 75, 85 135 C 85 175, 175 185, 175 230 C 175 285, 100 290, 85 245",
    startPoint: { x: 175, y: 120 },
    viewBox: "0 0 260 320",
  },
  t: {
    // Lowercase 't': tall stem + cross stroke
    path: "M 120 50 L 120 265 M 70 115 L 175 115",
    startPoint: { x: 120, y: 50 },
    viewBox: "0 0 260 320",
  },
  v: {
    // Lowercase 'v': V-shape
    path: "M 55 105 L 130 265 L 205 105",
    startPoint: { x: 55, y: 105 },
    viewBox: "0 0 260 320",
  },
  x: {
    // Lowercase 'x': two crossing diagonals
    path: "M 70 105 L 190 265 M 190 105 L 70 265",
    startPoint: { x: 70, y: 105 },
    viewBox: "0 0 260 320",
  },
};
