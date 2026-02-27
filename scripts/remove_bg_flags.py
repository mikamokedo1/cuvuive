import os
from PIL import Image
from rembg import remove

DIR = "src/assets/games/learn-flag"

for f in os.listdir(DIR):
    if f.endswith('.png'):
        path = os.path.join(DIR, f)
        webp_path = os.path.join(DIR, f.replace('.png', '.webp'))
        try:
            print(f"Processing {f}...")
            # Load the image
            img = Image.open(path)
            
            # Since flags have a background we theoretically MIGHT want to keep (the flag itself),
            # rembg might accidentally remove the flag's colors if it thinks it's a solid background.
            # But the user specifically asked: "generate images with format .png and white background then remove background by script in /scripts/remove_bg.py/" 
            # I will apply the rembg script as requested.
            out = remove(img)
            
            # Save as WebP
            out.save(webp_path, "WEBP")
            
            # Remove original PNG
            os.remove(path)
            print(f"Successfully processed {f} to {webp_path}")
        except Exception as e:
            print(f"Failed {f}: {e}")
