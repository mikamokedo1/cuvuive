export interface Point {
  x: number;
  y: number;
}

export interface TracingOptions {
  /** How far (board units) a drawn point may be from the template and still count */
  tolerance: number;
  /** Share of the whole template that must be covered */
  minCoverage: number;
  /** Share of EVERY stroke that must be covered, so one stroke cannot be skipped */
  minStrokeCoverage: number;
}

export const DEFAULT_TRACING_OPTIONS: TracingOptions = {
  tolerance: 24,
  minCoverage: 0.9,
  minStrokeCoverage: 0.85,
};

export interface TracingResult {
  passed: boolean;
  coverage: number;
  /** Coverage of the least covered stroke */
  worstStrokeCoverage: number;
  /** Strokes whose start or end the child never reached (e.g. the tail of "a") */
  missingEnds: number;
}

/** Fill gaps between pointer events so a fast swipe does not leave holes. */
export function densify(stroke: Point[], step = 4): Point[] {
  if (stroke.length < 2) return stroke;
  const out: Point[] = [stroke[0]];
  for (let i = 1; i < stroke.length; i++) {
    const a = stroke[i - 1];
    const b = stroke[i];
    const n = Math.floor(Math.hypot(b.x - a.x, b.y - a.y) / step);
    for (let k = 1; k <= n; k++) out.push({ x: a.x + ((b.x - a.x) * k) / (n + 1), y: a.y + ((b.y - a.y) * k) / (n + 1) });
    out.push(b);
  }
  return out;
}

/**
 * Compare what the child drew with the template, stroke by stroke. Passing needs enough of the
 * whole letter, enough of every single stroke, and both ends of every stroke reached.
 */
export function checkTracing(
  templateStrokes: Point[][],
  userStrokes: Point[][],
  options: TracingOptions = DEFAULT_TRACING_OPTIONS,
): TracingResult {
  const strokes = templateStrokes.filter((s) => s.length > 0);
  if (strokes.length === 0) return { passed: false, coverage: 0, worstStrokeCoverage: 0, missingEnds: 0 };

  const drawn = userStrokes.flatMap((s) => densify(s));
  const tol2 = options.tolerance * options.tolerance;
  const isCovered = (p: Point) => drawn.some((d) => (d.x - p.x) ** 2 + (d.y - p.y) ** 2 <= tol2);

  let covered = 0;
  let total = 0;
  let worst = 1;
  let missingEnds = 0;
  for (const stroke of strokes) {
    const hits = stroke.filter(isCovered).length;
    covered += hits;
    total += stroke.length;
    worst = Math.min(worst, hits / stroke.length);
    if (!isCovered(stroke[0]) || !isCovered(stroke[stroke.length - 1])) missingEnds += 1;
  }
  const coverage = covered / total;
  return {
    passed: coverage >= options.minCoverage && worst >= options.minStrokeCoverage && missingEnds === 0,
    coverage,
    worstStrokeCoverage: worst,
    missingEnds,
  };
}

/** Split an SVG path into its subpaths (one per "M"), i.e. the template's strokes. */
export function splitSubpaths(d: string): string[] {
  return d
    .split(/(?=M\s)/)
    .map((s) => s.trim())
    .filter(Boolean);
}

/**
 * Split points sampled along a whole SVG path (getPointAtLength every few units) into strokes:
 * a jump between consecutive samples means the path moved to a new subpath ("M").
 */
export function splitAtJumps(samples: Point[], maxGap = 15): Point[][] {
  const strokes: Point[][] = [];
  for (const p of samples) {
    const current = strokes[strokes.length - 1];
    const last = current?.[current.length - 1];
    if (!last || Math.hypot(p.x - last.x, p.y - last.y) > maxGap) strokes.push([p]);
    else current.push(p);
  }
  return strokes;
}
