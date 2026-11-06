"""Digits and tone marks: strokes.json -> paths for the number and tone writing lessons.

usage: build_more.py digits digit_strokes.json digit_paths.json
       build_more.py tones  tone_strokes.json  tone_paths.json
"""
import json
import math
import sys

W, H, MARGIN = 260, 320, 30
BASE = 196.0


def smooth(points):
    if len(points) == 2:
        (x0, y0), (x1, y1) = points
        return f"M {x0} {y0} L {x1} {y1}"
    closed = math.dist(points[0], points[-1]) < 1.5
    p = points[:-1] if closed else points
    n = len(p)
    d = [f"M {p[0][0]} {p[0][1]}"]
    for i in range(n if closed else n - 1):
        a = p[(i - 1) % n] if (closed or i > 0) else p[i]
        b, c = p[i], p[(i + 1) % n]
        e = p[(i + 2) % n] if (closed or i + 2 < n) else c
        c1 = (round(b[0] + (c[0] - a[0]) / 6, 1), round(b[1] + (c[1] - a[1]) / 6, 1))
        c2 = (round(c[0] - (e[0] - b[0]) / 6, 1), round(c[1] - (e[1] - b[1]) / 6, 1))
        d.append(f"C {c1[0]} {c1[1]}, {c2[0]} {c2[1]}, {c[0]} {c[1]}")
    return " ".join(d)


def reorder(strokes, start):
    _, si, pi = min((math.dist(p, start), si, pi) for si, s in enumerate(strokes) for pi, p in enumerate(s))
    s, rest = strokes[si], strokes[:si] + strokes[si + 1 :]
    if pi == 0:
        first = [s]
    elif pi == len(s) - 1:
        first = [s[::-1]]
    else:
        closed = math.dist(s[0], s[-1]) < 1.5
        first = [s[pi:] + s[1 : pi + 1]] if closed else [s[pi:], s[: pi + 1][::-1]]
    return first + rest


def ends(strokes):
    return [s[0] for s in strokes] + [s[-1] for s in strokes if math.dist(s[0], s[-1]) > 1]


def bbox(strokes):
    pts = [p for s in strokes for p in s]
    return min(p[0] for p in pts), min(p[1] for p in pts), max(p[0] for p in pts), max(p[1] for p in pts)


def build_digits(S):
    # one zoom for all digits so 10-20 look even; same baseline; each digit centred horizontally
    boxes = {k: bbox(v) for k, v in S.items()}
    top = min(b[1] for b in boxes.values())
    bottom = max(b[3] for b in boxes.values())
    widest = max(b[2] - b[0] for b in boxes.values())
    zoom = min((H - 2 * MARGIN) / (bottom - top), (W - 2 * MARGIN) / widest)
    cy = (top + bottom) / 2
    out = {}
    for k, strokes in S.items():
        x0, _, x1, _ = boxes[k]
        cx = (x0 + x1) / 2
        t = lambda p: (round(W / 2 + (p[0] - cx) * zoom, 1), round(H / 2 + (p[1] - cy) * zoom, 1))
        pts = [p for s in strokes for p in s]
        if k in ("0", "8", "9"):  # top-right of the oval / upper loop
            target = (x1 - 0.18 * (x1 - x0), top + 0.12 * (bottom - top))
            start = min(pts, key=lambda p: math.dist(p, target))
        elif k == "5":  # top-left corner: stem down, curve, then the top bar
            start = min(pts, key=lambda p: p[0] + p[1])
        elif k == "6":
            start = min(ends(strokes), key=lambda p: p[1])
        else:  # left-most, ties go to the higher end
            start = min(ends(strokes), key=lambda p: p[0] + 0.25 * p[1])
        strokes = [[t(p) for p in s] for s in reorder(strokes, start)]
        out[k] = {
            "path": " ".join(smooth(s) for s in strokes),
            "startPoint": {"x": strokes[0][0][0], "y": strokes[0][0][1]},
            "viewBox": f"0 0 {W} {H}",
            "guides": {"top": round(H / 2 + (top - cy) * zoom, 1), "baseline": round(H / 2 + (bottom - cy) * zoom, 1)},
            "strokes": strokes,
        }
    return out


def build_tones(S):
    out = {}
    BOX = 170
    for k, strokes in S.items():
        x0, y0, x1, y1 = bbox(strokes)
        cx, cy = (x0 + x1) / 2, (y0 + y1) / 2
        if k == "nang":  # a dot: trace a small circle around it
            r = 16
            pts = [(round(W / 2 + r * math.sin(a), 1), round(H / 2 - r * math.cos(a), 1)) for a in [i * math.pi / 8 for i in range(17)]]
            strokes = [pts]
        else:
            zoom = min(BOX / max(x1 - x0, 1), BOX / max(y1 - y0, 1))
            t = lambda p: (round(W / 2 + (p[0] - cx) * zoom, 1), round(H / 2 + (p[1] - cy) * zoom, 1))
            e = ends(strokes)
            start = min(e, key=lambda p: p[0]) if k == "nga" else min(e, key=lambda p: p[1])
            strokes = [[t(p) for p in s] for s in reorder(strokes, start)]
        out[k] = {
            "path": " ".join(smooth(s) for s in strokes),
            "startPoint": {"x": strokes[0][0][0], "y": strokes[0][0][1]},
            "viewBox": f"0 0 {W} {H}",
            "strokes": strokes,
        }
    return out


kind, src, dst = sys.argv[1:4]
S = json.load(open(src))
out = build_digits(S) if kind == "digits" else build_tones(S)
json.dump(out, open(dst, "w"), ensure_ascii=False)
print(kind, "ok", list(out))
