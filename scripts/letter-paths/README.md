# Letter tracing templates

Generates `src/libs/constants/letterPaths.ts` (Bảng chữ cái › Tập viết) from the Playwrite VN font,
so tracing templates match the handwriting font used for lowercase letters in the games.

Requires Node (Playwright + Google Chrome) and Python 3 with numpy, Pillow and scikit-image.

```bash
cd scripts/letter-paths
mkdir -p out/glyphs
# 1. Draw every letter with the font on the 260x320 board (x4), same size and baseline
node render.mjs ../.. "$PWD/blank.html" out/glyphs
# 2. Glyph images -> single-line pen strokes (skeleton, chained straightest-first at junctions)
python3 extract.py out/glyphs out/strokes.json
# 3. Zoom each letter with its guide lines, pick the pen start point, smooth into Beziers
python3 build.py out/strokes.json out/letter_paths.json
# 4. Write the TypeScript file
python3 gen_ts.py out/letter_paths.json ../../src/libs/constants/letterPaths.ts
```

Start point rules (build.py): letters with an oval (a ă â c d đ g o ô ơ q) start top-right of the
oval just under the x-line; `t` at the top of the stem; every other letter at the left end of its
lead-in stroke. Marks (dot, breve, circumflex) never hold the start point.

## Digits (Đếm số › Tập viết) and tone marks (Học dấu › Tập viết)

```bash
mkdir -p out/glyphs2 out/marks
node render.mjs ../.. "$PWD/blank.html" out/glyphs2 "0 1 2 3 4 5 6 7 8 9 á à ả ã ạ"
python3 marks.py out/glyphs2 out/marks                                   # cut the tone mark out of á à ả ã ạ
python3 extract.py out/glyphs2 out/digit_strokes.json "0 1 2 3 4 5 6 7 8 9"
python3 extract.py out/marks out/tone_strokes.json "sac huyen hoi nga nang"
python3 build_more.py digits out/digit_strokes.json out/digit_paths.json  # one zoom for all digits (10-20 stay even)
python3 build_more.py tones out/tone_strokes.json out/tone_paths.json     # marks zoomed to ~170 units; nặng = small circle
python3 gen_more_ts.py out/digit_paths.json out/tone_paths.json ../../src/libs/constants
```

gen_more_ts.py only replaces the path tables in numberPaths.ts, numberPaths2.ts and tonePaths.ts; the rest of
those files (types, NUMBER_NAMES_VI, getDigits) is kept. Digit start points: 0, 8, 9 top-right; 5 top-left
corner; 6 the top end; others the left end. Tone marks start at their top end (ngã: left end).
