// Render each lowercase letter in Playwrite VN on a 260x320 board (x4), same size and baseline for all.
import fs from "fs"; import path from "path"; import { createRequire } from "module";
const [frontend, html, outDir, charList] = process.argv.slice(2);
const require = createRequire(path.join(frontend, "package.json"));
const { chromium } = require("@playwright/test");
const SCALE = 4, W = 260, H = 320, FONT = 140, BASELINE = 196;
const letters = (charList || "a ă â b c d đ e ê g h i k l m n o ô ơ p q r s t u ư v x y").split(" ");
const b = await chromium.launch({ channel: "chrome", headless: true });
const p = await b.newPage();
await p.goto("file://" + html, { waitUntil: "networkidle" });
await p.evaluate(({ f, t }) => document.fonts.load(`${f}px 'Playwrite VN'`, t), { f: FONT * SCALE, t: letters.join("") });
const meta = await p.evaluate(({ letters, SCALE, W, H, FONT, BASELINE }) => {
  const out = {};
  const c = document.createElement("canvas"); c.width = W * SCALE; c.height = H * SCALE;
  const ctx = c.getContext("2d");
  ctx.font = `${FONT * SCALE}px 'Playwrite VN'`;
  const mx = ctx.measureText("x");
  out.__metrics = { xHeight: mx.actualBoundingBoxAscent / SCALE, font: FONT, baseline: BASELINE };
  for (const l of letters) {
    ctx.fillStyle = "#fff"; ctx.fillRect(0, 0, c.width, c.height);
    const m = ctx.measureText(l);
    const inkLeft = -m.actualBoundingBoxLeft, inkRight = m.actualBoundingBoxRight;
    const x = (c.width - (inkRight - inkLeft)) / 2 - inkLeft;   // centre the ink horizontally
    ctx.fillStyle = "#000"; ctx.fillText(l, x, BASELINE * SCALE);
    out[l] = c.toDataURL("image/png");
  }
  return out;
}, { letters, SCALE, W, H, FONT, BASELINE });
fs.writeFileSync(path.join(outDir, "metrics.json"), JSON.stringify(meta.__metrics));
for (const l of letters) fs.writeFileSync(path.join(outDir, `${l}.png`), Buffer.from(meta[l].split(",")[1], "base64"));
console.log("metrics", JSON.stringify(meta.__metrics));
await b.close();
