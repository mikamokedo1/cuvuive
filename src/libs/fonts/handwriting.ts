import { Playwrite_VN } from "next/font/google";

/**
 * Vietnamese school handwriting (Playwrite VN, OFL): the lowercase letters children learn to
 * write in grade 1 ("b" with a loop, "k" with a loop, hooked "r"). Only loaded by pages that
 * import it.
 */
export const schoolHandwriting = Playwrite_VN({
  weight: ["400"],
  display: "swap",
});

/**
 * Class for lowercase Vietnamese letters and words in the language games. The font has a single
 * weight, so "font-normal" avoids the browser faking a bold. Use a solid text colour with it, not a
 * clipped gradient (bg-clip-text): descenders of g, y, p, q reach outside the box and get cut off.
 */
export const handwritingText = `${schoolHandwriting.className} font-normal`;

/**
 * Put handwriting inside a fixed-height box (buttons, tiles). Measured in Chrome: ascenders reach
 * 1.28em above the baseline (b h k l) and descenders 0.78em below (g y p q), 2.06em in total, so the
 * box must be at least ~2.1x the font size tall. Line-box centering leaves the glyphs 0.24em low;
 * this shifts them up so the tallest and deepest letters are centred, all on one baseline.
 * Apply to an element that wraps only the text.
 */
export const handwritingInBox = "block leading-none -translate-y-[0.24em]";
