#!/bin/bash
# Generate word timestamps for all 30 ayat using Whisper

AUDIO_DIR="/Users/idris/Downloads/mulk_extracted/Surja mulk/Ajetet"
OUTPUT_DIR="/Users/idris/clawd/dev/mulk-30/src/data/timestamps"

mkdir -p "$OUTPUT_DIR"

for i in {1..30}; do
  # Find the audio file (some have space before .wav)
  if [ -f "$AUDIO_DIR/Mulk Ajeti $i.wav" ]; then
    FILE="$AUDIO_DIR/Mulk Ajeti $i.wav"
  elif [ -f "$AUDIO_DIR/Mulk Ajeti $i .wav" ]; then
    FILE="$AUDIO_DIR/Mulk Ajeti $i .wav"
  else
    echo "Skipping ayah $i - file not found"
    continue
  fi
  
  echo "Processing Ayah $i..."
  whisper "$FILE" --language ar --word_timestamps True --output_format json --output_dir "$OUTPUT_DIR" 2>/dev/null
  
  # Rename output to consistent naming
  BASE=$(basename "$FILE" .wav)
  if [ -f "$OUTPUT_DIR/$BASE.json" ]; then
    mv "$OUTPUT_DIR/$BASE.json" "$OUTPUT_DIR/ayah-$i.json"
    echo "  -> ayah-$i.json created"
  fi
done

echo "Done! All timestamps in $OUTPUT_DIR"
