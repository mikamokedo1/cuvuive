"""Cut the tone mark out of á à ả ã ạ glyph images (glyphs2/) into marks/<tone>.png."""
import sys
import numpy as np
from PIL import Image
from skimage.measure import label, regionprops

SCALE, BASE, XH = 4, 196.0, 72.66
X_LINE = (BASE - XH) * SCALE
TONES = {"sac": "á", "huyen": "à", "hoi": "ả", "nga": "ã", "nang": "ạ"}
src, dst = sys.argv[1], sys.argv[2]
for tone, ch in TONES.items():
    img = np.array(Image.open(f"{src}/{ch}.png").convert("L")) < 128
    lab = label(img, connectivity=2)
    keep = np.zeros_like(img)
    for r in regionprops(lab):
        top, _, bottom, _ = r.bbox
        if (tone != "nang" and bottom < X_LINE) or (tone == "nang" and top > BASE * SCALE):
            keep |= lab == r.label
    Image.fromarray(np.where(keep, 0, 255).astype(np.uint8)).save(f"{dst}/{tone}.png")
    print(tone, "mark pixels:", int(keep.sum()))
