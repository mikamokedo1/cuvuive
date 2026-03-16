"""
Download learn-syllable images, remove background with rembg, save to /tmp.
Then use the Node.js upload script to re-upload to R2.

Usage: python3 scripts/remove_bg.py
"""

import os
import requests
from PIL import Image
from rembg import remove
from io import BytesIO

PUBLIC_DOMAIN = "https://assets.cuthongminh.com"
R2_PREFIX = "games/learn-syllable"

IMAGE_NAMES = [
    "dieu", "yeu", "tien", "yen", "viet", "yem",
    "cuon", "buom_sail", "chuot", "thuoc", "luon", "duong",
    "buom", "nuoc", "khoai", "khoan", "xoan", "oanh",
    "uyen", "tuyet", "khuya", "oi", "quan", "luat",
    "tiec", "thiep", "gieng", "muop", "xoay", "khoang",
    "thoat", "huych", "huyt",
]

OUT_DIR = "/tmp/syllable-no-bg"
os.makedirs(OUT_DIR, exist_ok=True)

success = 0
failed = 0

for name in IMAGE_NAMES:
    url = f"{PUBLIC_DOMAIN}/{R2_PREFIX}/{name}.webp"
    out_path = os.path.join(OUT_DIR, f"{name}.png")

    try:
        # 1. Download image
        print(f"📥 {name}.webp ...", end=" ", flush=True)
        resp = requests.get(url)
        resp.raise_for_status()

        # 2. Remove background with rembg
        img = Image.open(BytesIO(resp.content))
        out = remove(img)

        # 3. Save as PNG (preserves transparency)
        out.save(out_path, "PNG")
        print(f"✅ saved to {out_path}")
        success += 1

    except Exception as e:
        print(f"❌ failed: {e}")
        failed += 1

print(f"\n✅ Done! {success} images saved to {OUT_DIR}/")
print(f"❌ {failed} failed")
print(f"\nNow run: npx tsx scripts/upload-no-bg.ts")
