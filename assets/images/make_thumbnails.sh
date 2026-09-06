#!/bin/bash

# =============================================================
# make_thumbnails.sh
# Membuat versi thumbnail (_thumb.webp) dari semua file .webp
# Ukuran: 600x315px, kualitas 82
# =============================================================

# Folder gambar — sesuaikan dengan path proyekmu
IMAGE_DIR="."

WIDTH=600
HEIGHT=315
QUALITY=82

SUCCESS=0
SKIP=0
FAIL=0

echo "🔍 Mencari file .webp di: $IMAGE_DIR"
echo "-------------------------------------------"

for FILE in "$IMAGE_DIR"/*.webp; do
    # Lewati jika tidak ada file yang cocok
    [ -e "$FILE" ] || continue

    # Lewati file yang sudah _thumb
    if [[ "$FILE" == *_thumb.webp ]]; then
        continue
    fi

    BASENAME="${FILE%.webp}"
    OUTPUT="${BASENAME}_thumb.webp"

    # Lewati jika thumbnail sudah ada
    if [ -f "$OUTPUT" ]; then
        echo "⏭️  Skip (sudah ada): $(basename "$OUTPUT")"
        ((SKIP++))
        continue
    fi

    # Buat thumbnail — crop dari tengah supaya tidak gepeng
    convert "$FILE" \
        -resize "${WIDTH}x${HEIGHT}^" \
        -gravity center \
        -extent "${WIDTH}x${HEIGHT}" \
        -quality "$QUALITY" \
        "$OUTPUT"

    if [ $? -eq 0 ]; then
        SIZE=$(du -h "$OUTPUT" | cut -f1)
        echo "✅ $(basename "$OUTPUT") ($SIZE)"
        ((SUCCESS++))
    else
        echo "❌ Gagal: $(basename "$FILE")"
        ((FAIL++))
    fi
done

echo "-------------------------------------------"
echo "✅ Berhasil : $SUCCESS file"
echo "⏭️  Dilewati : $SKIP file"
echo "❌ Gagal    : $FAIL file"
