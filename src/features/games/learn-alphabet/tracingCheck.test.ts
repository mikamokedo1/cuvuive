import { describe, expect, it } from "vitest";
import { checkTracing, densify, splitAtJumps, splitSubpaths, type Point } from "./tracingCheck";

const line = (x0: number, y0: number, x1: number, y1: number, n = 40): Point[] =>
  Array.from({ length: n + 1 }, (_, i) => ({ x: x0 + ((x1 - x0) * i) / n, y: y0 + ((y1 - y0) * i) / n }));

// A letter made of two strokes: a long stem and a short tail going right
const stem = line(100, 50, 100, 250);
const tail = line(100, 250, 160, 250, 12);

describe("checkTracing", () => {
  it("passes when every stroke is traced end to end", () => {
    const r = checkTracing([stem, tail], [stem, tail]);
    expect(r.passed).toBe(true);
    expect(r.missingEnds).toBe(0);
  });

  it("fails when a short stroke is skipped, even if overall coverage is high", () => {
    const r = checkTracing([stem, tail], [stem]);
    expect(r.coverage).toBeGreaterThan(0.75);
    expect(r.passed).toBe(false);
    expect(r.missingEnds).toBe(1);
  });

  it("fails when the child stops before the end of a stroke", () => {
    const r = checkTracing([stem], [line(100, 50, 100, 200)]);
    expect(r.passed).toBe(false);
  });

  it("tolerates a wobbly line within the tolerance", () => {
    const wobbly = stem.map((p, i) => ({ x: p.x + (i % 2 ? 12 : -12), y: p.y }));
    expect(checkTracing([stem], [wobbly]).passed).toBe(true);
  });

  it("rejects a line drawn too far away", () => {
    expect(checkTracing([stem], [stem.map((p) => ({ x: p.x + 40, y: p.y }))]).passed).toBe(false);
  });

  it("counts a fast swipe with few pointer events as continuous", () => {
    const sparse = [stem[0], stem[20], stem[40]];
    expect(checkTracing([stem], [sparse]).passed).toBe(true);
  });
});

describe("helpers", () => {
  it("densify fills long gaps", () => {
    expect(densify([{ x: 0, y: 0 }, { x: 40, y: 0 }]).length).toBeGreaterThan(5);
  });

  it("splitAtJumps cuts sampled points where the path jumps to a new subpath", () => {
    const samples = [...line(0, 0, 0, 50, 10), ...line(100, 0, 100, 50, 10)];
    expect(splitAtJumps(samples).map((s) => s.length)).toEqual([11, 11]);
  });

  it("splitSubpaths splits on each move command", () => {
    expect(splitSubpaths("M 1 2 C 3 4, 5 6, 7 8 M 9 9 L 10 10")).toEqual(["M 1 2 C 3 4, 5 6, 7 8", "M 9 9 L 10 10"]);
  });
});
