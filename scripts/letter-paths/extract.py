"""Turn Playwrite VN glyph images into single-line pen strokes for tracing.

glyphs/<letter>.png (1040x1280, i.e. the 260x320 board x4) -> strokes.json:
{ letter: [ [[x, y], ...], ... ] } in board units, strokes in drawing order.
"""
import json
import math
import sys
from collections import defaultdict

import numpy as np
from PIL import Image
from skimage.measure import label
from skimage.morphology import skeletonize

SCALE = 4
LETTERS = "a ă â b c d đ e ê g h i k l m n o ô ơ p q r s t u ư v x y".split()
SPUR = 14 * SCALE / 4  # drop skeleton branches shorter than this (px at x4), artefacts at joins


def neighbours(p, pix):
    y, x = p
    for dy in (-1, 0, 1):
        for dx in (-1, 0, 1):
            if (dy or dx) and (y + dy, x + dx) in pix:
                yield (y + dy, x + dx)


def graph_from_skeleton(sk):
    """Skeleton -> edges between junction/end clusters. Returns (edges, cluster_of) where an edge is
    (a, pixels, b) with a/b cluster ids (None for a closed loop)."""
    pix = set(map(tuple, np.argwhere(sk)))
    deg = {p: sum(1 for _ in neighbours(p, pix)) for p in pix}
    node_pix = {p for p, d in deg.items() if d != 2}
    # merge touching node pixels into one cluster (a junction is often a few pixels)
    cluster_of, centers, cid = {}, {}, 0
    for p in node_pix:
        if p in cluster_of:
            continue
        stack, members = [p], []
        cluster_of[p] = cid
        while stack:
            q = stack.pop()
            members.append(q)
            for r in neighbours(q, node_pix):
                if r not in cluster_of:
                    cluster_of[r] = cid
                    stack.append(r)
        cy, cx = np.mean(members, axis=0)
        centers[cid] = (int(round(cy)), int(round(cx)))
        cid += 1
    edges, visited = [], set()
    for p in node_pix:
        for nb in neighbours(p, pix):
            if nb in node_pix or nb in visited:
                continue
            path, prev, cur = [centers[cluster_of[p]]], p, nb
            end = None
            while True:
                path.append(cur)
                visited.add(cur)
                nxt = [q for q in neighbours(cur, pix) if q != prev and q not in visited and q not in path]
                hit = [q for q in neighbours(cur, pix) if q in node_pix and q != p and cluster_of[q] != None]
                node_next = [q for q in neighbours(cur, node_pix) if not (len(path) <= 2 and cluster_of[q] == cluster_of[p])]
                if node_next:
                    end = cluster_of[node_next[0]]
                    path.append(centers[end])
                    break
                nxt = [q for q in nxt if q not in node_pix]
                if not nxt:
                    break
                prev, cur = cur, nxt[0]
            edges.append((cluster_of[p], path, end))
    # closed loops with no junction at all (an "o")
    rest = {p for p in pix if p not in node_pix and p not in visited}
    while rest:
        start = next(iter(rest))
        path, prev, cur = [start], None, start
        while True:
            nxt = [q for q in neighbours(cur, pix) if q != prev and q in rest and q not in path]
            if not nxt:
                break
            prev, cur = cur, nxt[0]
            path.append(cur)
        path.append(start)
        rest -= set(path)
        edges.append((None, path, None))
    return edges


def prune(edges):
    """Remove short spurs: an edge from a free end into a junction, shorter than SPUR."""
    changed = True
    while changed:
        changed = False
        count = defaultdict(int)
        for a, _, b in edges:
            if a is not None:
                count[a] += 1
            if b is not None:
                count[b] += 1
        keep = []
        for e in edges:
            a, path, b = e
            free = (a is not None and count[a] == 1) or (b is not None and count[b] == 1) or b is None
            junction = (a is not None and count[a] >= 3) or (b is not None and count[b] >= 3)
            if free and junction and len(path) < SPUR:
                changed = True
                continue
            keep.append(e)
        edges = keep
    return edges


def direction(path, at_start, k=12):
    pts = path[: k + 1] if at_start else path[-k - 1 :][::-1]
    (y0, x0), (y1, x1) = pts[0], pts[-1]
    return math.atan2(y1 - y0, x1 - x0)


def walk(edges):
    """Chain edges into pen strokes: start at the top-most free end, continue straightest at junctions."""
    remaining = list(range(len(edges)))
    strokes = []
    while remaining:
        count = defaultdict(int)
        for i in remaining:
            a, _, b = edges[i]
            for n in (a, b):
                if n is not None:
                    count[n] += 1
        starts = []
        for i in remaining:
            a, path, b = edges[i]
            if a is not None and count[a] == 1:
                starts.append((path[0], i, True))
            if b is not None and count[b] == 1:
                starts.append((path[-1], i, False))
            if b is None and a is not None:
                starts.append((path[-1], i, False))
        if starts:
            _, i, fwd = min(starts, key=lambda s: (s[0][0], s[0][1]))
        else:
            i, fwd = remaining[0], True
        a, path, b = edges[i]
        stroke = list(path if fwd else path[::-1])
        node = b if fwd else a
        remaining.remove(i)
        while node is not None:
            heading = math.atan2(stroke[-1][0] - stroke[-13][0], stroke[-1][1] - stroke[-13][1]) if len(stroke) > 13 else None
            options = []
            for j in remaining:
                ea, ep, eb = edges[j]
                if ea == node:
                    options.append((j, True))
                elif eb == node:
                    options.append((j, False))
            if not options:
                break

            def turn(o):
                j, f = o
                p = edges[j][1] if f else edges[j][1][::-1]
                d = math.atan2(p[min(12, len(p) - 1)][0] - p[0][0], p[min(12, len(p) - 1)][1] - p[0][1])
                return 0 if heading is None else abs((d - heading + math.pi) % (2 * math.pi) - math.pi)

            j, f = min(options, key=turn)
            ea, ep, eb = edges[j]
            stroke.extend((ep if f else ep[::-1])[1:])
            node = eb if f else ea
            remaining.remove(j)
        strokes.append(stroke)
    return strokes


def rdp(points, eps):
    if len(points) < 3:
        return points
    if math.dist(points[0], points[-1]) < 1e-6:  # closed loop: split at the farthest point
        far = max(range(len(points)), key=lambda k: math.dist(points[0], points[k]))
        return rdp(points[: far + 1], eps)[:-1] + rdp(points[far:], eps)
    (x0, y0), (x1, y1) = points[0], points[-1]
    dx, dy = x1 - x0, y1 - y0
    norm = math.hypot(dx, dy) or 1e-9
    dists = [abs(dy * (x - x0) - dx * (y - y0)) / norm for x, y in points[1:-1]]
    i = max(range(len(dists)), key=dists.__getitem__)
    if dists[i] > eps:
        return rdp(points[: i + 2], eps)[:-1] + rdp(points[i + 1 :], eps)
    return [points[0], points[-1]]


def letter_strokes(png):
    img = np.array(Image.open(png).convert("L")) < 128
    comps = label(img, connectivity=2)
    result = []
    # biggest component first (body), then marks (breve, hat, dot)
    sizes = sorted(((comps == k).sum(), k) for k in range(1, comps.max() + 1))[::-1]
    for size, k in sizes:
        part = comps == k
        if size < 40:
            continue
        sk = skeletonize(part)
        if sk.sum() < 12:  # a dot (i): keep as a tiny stroke at its centre
            y, x = np.argwhere(part).mean(axis=0)
            result.append([[x / SCALE, y / SCALE - 1.5], [x / SCALE, y / SCALE + 1.5]])
            continue
        edges = prune(graph_from_skeleton(sk))
        for s in walk(edges):
            pts = [(x / SCALE, y / SCALE) for y, x in s]
            pts = rdp(pts, 0.6)
            if len(pts) >= 2:
                result.append([[round(x, 1), round(y, 1)] for x, y in pts])
    return result


if __name__ == "__main__":
    folder = sys.argv[1]
    names = sys.argv[3].split() if len(sys.argv) > 3 else LETTERS
    out = {l: letter_strokes(f"{folder}/{l}.png") for l in names}
    json.dump(out, open(sys.argv[2], "w"), ensure_ascii=False)
    for l in names:
        print(l, "strokes:", len(out[l]), "points:", [len(s) for s in out[l]])
