import os
from PIL import Image
from rembg import remove

DIR = "src/assets/games/learn-math"

for f in os.listdir(DIR):
    if f.endswith('.png'):
        path = os.path.join(DIR, f)
        try:
            print(f"Processing {f}...")
            # Load the image
            img = Image.open(path)
            # Remove background
            out = remove(img)
            # Overwrite the original
            out.save(path)
            print(f"Successfully processed {f}")
        except Exception as e:
            print(f"Failed {f}: {e}")
