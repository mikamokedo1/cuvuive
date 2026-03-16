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
    // Lowercase 'a': Vietnamese cursive - closed oval, right stem down, tail hook
    path: "M 175 125 C 175 55, 60 55, 60 130 C 60 205, 175 205, 175 125 L 175 165 Q 175 192, 200 185",
    startPoint: { x: 175, y: 125 },
    viewBox: "0 0 260 320",
  },
  ă: {
    // 'ă': cursive a shifted down + breve accent
    path: "M 175 140 C 175 70, 60 70, 60 145 C 60 220, 175 220, 175 140 L 175 180 Q 175 207, 200 200 M 88 45 Q 118 70, 148 45",
    startPoint: { x: 175, y: 140 },
    viewBox: "0 0 260 320",
  },
  â: {
    // 'â': cursive a shifted down + circumflex accent
    path: "M 175 140 C 175 70, 60 70, 60 145 C 60 220, 175 220, 175 140 L 175 180 Q 175 207, 200 200 M 88 45 L 118 15 L 148 45",
    startPoint: { x: 175, y: 140 },
    viewBox: "0 0 260 320",
  },
  e: {
    // Lowercase 'e': middle horizontal + top curve + bottom open curve
    path: "M 75 170 L 185 170 C 185 95, 75 95, 75 170 C 75 265, 185 270, 185 215",
    startPoint: { x: 75, y: 170 },
    viewBox: "0 0 260 320",
  },
  ê: {
    // 'e' + circumflex (^)
    path: "M 75 175 L 185 175 C 185 105, 75 105, 75 175 C 75 270, 185 275, 185 220 M 100 65 L 130 35 L 160 65",
    startPoint: { x: 75, y: 175 },
    viewBox: "0 0 260 320",
  },
  i: {
    // Lowercase 'i': Vietnamese cursive - diagonal up, vertical stroke, bottom hook, small dot
    path: "M 105 155 L 130 115 L 130 245 C 130 278, 148 288, 175 275 M 127 78 A 3 3 0 1 0 133 78 A 3 3 0 1 0 127 78",
    startPoint: { x: 105, y: 155 },
    viewBox: "0 0 260 320",
  },
  o: {
    // Lowercase 'o': full oval
    path: "M 130 85 C 180 85, 215 125, 215 175 C 215 225, 180 265, 130 265 C 80 265, 45 225, 45 175 C 45 125, 80 85, 130 85",
    startPoint: { x: 130, y: 85 },
    viewBox: "0 0 260 320",
  },
  ô: {
    // 'o' + circumflex (^)
    path: "M 130 95 C 180 95, 215 130, 215 180 C 215 230, 180 270, 130 270 C 80 270, 45 230, 45 180 C 45 130, 80 95, 130 95 M 100 60 L 130 30 L 160 60",
    startPoint: { x: 130, y: 95 },
    viewBox: "0 0 260 320",
  },
  ơ: {
    // 'o' + horn (hook curving upward-right from top-right of the oval)
    path: "M 130 95 C 180 95, 210 130, 210 180 C 210 230, 180 270, 130 270 C 80 270, 50 230, 50 180 C 50 130, 80 95, 130 95 M 205 110 C 215 105, 225 95, 228 80 C 230 70, 225 62, 218 65",
    startPoint: { x: 130, y: 95 },
    viewBox: "0 0 260 320",
  },
  u: {
    // Lowercase 'u': U-shape + right stem
    path: "M 80 105 L 80 195 C 80 265, 180 265, 180 195 L 180 105",
    startPoint: { x: 80, y: 105 },
    viewBox: "0 0 260 320",
  },
  ư: {
    // 'u' + horn (hook curving upward-right from top of right stem)
    path: "M 80 115 L 80 200 C 80 270, 180 270, 180 200 L 180 115 M 180 115 C 192 110, 202 100, 205 85 C 207 75, 202 67, 195 70",
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
  đ: {
    // 'd' + horizontal stroke through ascender
    path: "M 180 45 L 180 265 M 180 155 C 180 95, 75 95, 75 180 C 75 260, 180 260, 180 200 M 150 75 L 215 75",
    startPoint: { x: 180, y: 45 },
    viewBox: "0 0 260 320",
  },
  g: {
    // Lowercase 'g': Vietnamese cursive - 1) closed oval top, 2) straight line down, 3) bottom loop
    path: "M 130 40 C 175 40, 190 75, 188 110 C 186 145, 152 162, 122 162 C 88 162, 70 140, 70 108 C 70 72, 92 40, 130 40 M 185 118 L 185 288 C 185 320, 128 320, 128 275 C 128 230, 168 180, 200 168",
    startPoint: { x: 130, y: 40 },
    viewBox: "0 0 260 320",
  },
  h: {
    // Lowercase 'h': Vietnamese cursive - stem up, loop RIGHT at top, gap, narrow hump RIGHT below, tail hook
    path: "M 90 270 L 90 45 C 90 12, 138 12, 138 68 C 138 125, 112 155, 90 180 C 90 230, 160 150, 172 218 C 185 248, 172 265, 170 272 Q 170 284, 190 274",
    startPoint: { x: 90, y: 270 },
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
    // Lowercase 't': tall stem + cross stroke + bottom hook (Vietnamese style)
    path: "M 130 50 L 130 230 Q 130 270, 95 255 M 80 115 L 175 115",
    startPoint: { x: 130, y: 50 },
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
