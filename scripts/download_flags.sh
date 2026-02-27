#!/bin/bash

# Simple script to download country flags in SVG and convert them to PNG using resvg or similar if needed.
# Will use flagcdn.com (free CDN for flags).

DEST_DIR="src/assets/games/learn-flag"
mkdir -p "$DEST_DIR"

declare -A flags=(
  # Asia
  ["vn"]="vietnam"
  ["jp"]="japan"
  ["kr"]="southkorea"
  ["cn"]="china"
  ["th"]="thailand"
  ["in"]="india"
  
  # Europe
  ["gb"]="uk"
  ["fr"]="france"
  ["de"]="germany"
  ["it"]="italy"
  ["es"]="spain"
  ["ru"]="russia"
  
  # Americas
  ["us"]="usa"
  ["ca"]="canada"
  ["br"]="brazil"
  ["ar"]="argentina"
  ["mx"]="mexico"

  # Africa & Oceania
  ["za"]="southafrica"
  ["eg"]="egypt"
  ["au"]="australia"
  ["nz"]="newzealand"
)

for code in "${!flags[@]}"; do
    filename="${flags[$code]}"
    echo "Downloading flag for $filename ($code)..."
    # Download 256px wide PNG
    curl -s "https://flagcdn.com/w256/$code.png" -o "$DEST_DIR/$filename.png"
done

# Download placeholder logos for groups using flag thumbnails
curl -s "https://flagcdn.com/w256/asia.png" -o "$DEST_DIR/group1.webp" || cp "$DEST_DIR/vietnam.png" "$DEST_DIR/group1.webp" 
curl -s "https://flagcdn.com/w256/eu.png" -o "$DEST_DIR/group2.webp" || cp "$DEST_DIR/uk.png" "$DEST_DIR/group2.webp"
curl -s "https://flagcdn.com/w256/un.png" -o "$DEST_DIR/group3.webp" || cp "$DEST_DIR/usa.png" "$DEST_DIR/group3.webp"
curl -s "https://flagcdn.com/w256/un.png" -o "$DEST_DIR/group4.webp" || cp "$DEST_DIR/australia.png" "$DEST_DIR/group4.webp"
cp "$DEST_DIR/un.png" "$DEST_DIR/logo.webp" || cp "$DEST_DIR/vietnam.png" "$DEST_DIR/logo.webp"

echo "Done downloading flags."
