"""strokes.json (Playwrite VN centrelines on the 260x320 board) -> letter_paths.json for the app.

Per letter: zoom the letter (and its guide lines) to fill the board, pick the pen start point
following Vietnamese grade-1 rules, smooth polylines into cubic Beziers.
"""
import json
import math
import sys

W, H, MARGIN = 260, 320, 22
BASE, XH, ASC, DESC = 196.0, 72.66, 179.2, 109.2  # baseline y, x-height, ascender/descender depth
MAX_XH = 132.0  # never zoom a letter so much that its x-height exceeds this (loops get huge)
OVAL = set("a ă â c d đ g o ô ơ q".split())  # start top-right of the oval, just under the x-line
TOP_STEM = {"t"}  # start at the top of the stem

S = json.load(open(sys.argv[1]))
order = "a ă â b c d đ e ê g h i k l m n o ô ơ p q r s t u ư v x y".split()


def body_strokes(strokes):
    """Strokes of the letter body: marks (dot of i, breve, circumflex) sit entirely above the x-line."""
    x_line = BASE - XH
    return [s for s in strokes if max(p[1] for p in s) > x_line + 2]


def start_point(letter, strokes):
    body = body_strokes(strokes) or strokes
    pts = [p for s in body for p in s]
    if letter in OVAL:
        band = [p for p in pts if BASE - XH <= p[1] <= BASE]
        right = max(p[0] for p in band)
        target = (right - 0.1 * XH, BASE - XH + 0.22 * XH)
        return min(pts, key=lambda p: math.dist(p, target))
    ends = [s[0] for s in body] + [s[-1] for s in body if math.dist(s[0], s[-1]) > 1]
    if letter in TOP_STEM:
        return min(ends, key=lambda p: p[1])
    return min(ends, key=lambda p: p[0] + 0.25 * p[1])  # left-most, ties go to the higher one


def reorder(strokes, start):
    """Put the stroke through `start` first, beginning at `start` (splitting it if needed)."""
    best = min(((math.dist(p, start), si, pi) for si, s in enumerate(strokes) for pi, p in enumerate(s)))
    _, si, pi = best
    s = strokes[si]
    rest = strokes[:si] + strokes[si + 1 :]
    if pi == 0:
        first = [s]
    elif pi == len(s) - 1:
        first = [s[::-1]]
    else:
        closed = math.dist(s[0], s[-1]) < 1.5
        first = [s[pi:] + s[1 : pi + 1]] if closed else [s[pi:], s[: pi + 1][::-1]]
    return first + rest


def transform(letter, strokes):
    pts = [p for s in strokes for p in s]
    x0, x1 = min(p[0] for p in pts), max(p[0] for p in pts)
    y0, y1 = min(p[1] for p in pts), max(p[1] for p in pts)
    zoom = min((W - 2 * MARGIN) / max(x1 - x0, 1), (H - 2 * MARGIN) / max(y1 - y0, 1), MAX_XH / XH)
    cx, cy = (x0 + x1) / 2, (y0 + y1) / 2

    def t(p):
        return (round(W / 2 + (p[0] - cx) * zoom, 1), round(H / 2 + (p[1] - cy) * zoom, 1))

    def ty(y):
        return round(H / 2 + (y - cy) * zoom, 1)

    guides = {"ascender": ty(BASE - ASC), "xLine": ty(BASE - XH), "baseline": ty(BASE), "descender": ty(BASE + DESC)}
    return [[t(p) for p in s] for s in strokes], guides


def smooth(points):
    """Catmull-Rom through the points, as SVG cubic Beziers."""
    if len(points) == 2:
        (x0, y0), (x1, y1) = points
        return f"M {x0} {y0} L {x1} {y1}"
    closed = math.dist(points[0], points[-1]) < 1.5
    p = points[:-1] if closed else points
    n = len(p)
    d = [f"M {p[0][0]} {p[0][1]}"]
    segs = n if closed else n - 1
    for i in range(segs):
        a = p[(i - 1) % n] if (closed or i > 0) else p[i]
        b, c = p[i], p[(i + 1) % n]
        e = p[(i + 2) % n] if (closed or i + 2 < n) else c
        c1 = (round(b[0] + (c[0] - a[0]) / 6, 1), round(b[1] + (c[1] - a[1]) / 6, 1))
        c2 = (round(c[0] - (e[0] - b[0]) / 6, 1), round(c[1] - (e[1] - b[1]) / 6, 1))
        d.append(f"C {c1[0]} {c1[1]}, {c2[0]} {c2[1]}, {c[0]} {c[1]}")
    return " ".join(d)


out = {}
for l in order:
    strokes = S[l]
    start = start_point(l, strokes)
    strokes = reorder(strokes, start)
    strokes, guides = transform(l, strokes)
    out[l] = {
        "path": " ".join(smooth(s) for s in strokes),
        "startPoint": {"x": strokes[0][0][0], "y": strokes[0][0][1]},
        "viewBox": f"0 0 {W} {H}",
        "guides": guides,
        "strokes": strokes,
    }
json.dump(out, open(sys.argv[2], "w"), ensure_ascii=False)
print("ok", len(out))
