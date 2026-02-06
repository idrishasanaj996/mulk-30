#!/usr/bin/env python3
"""Generate word timestamps for all 30 ayat using Whisper"""

import whisper
import json
import os
from pathlib import Path

AUDIO_DIR = Path("/Users/idris/Downloads/mulk_extracted/Surja mulk/Ajetet")
OUTPUT_FILE = Path("/Users/idris/clawd/dev/mulk-30/src/data/timestamps.json")

print("Loading Whisper model (base)...")
model = whisper.load_model("base")

all_timestamps = {}

for i in range(1, 31):
    # Find audio file
    candidates = [
        AUDIO_DIR / f"Mulk Ajeti {i}.wav",
        AUDIO_DIR / f"Mulk Ajeti {i} .wav",
    ]
    
    audio_file = None
    for c in candidates:
        if c.exists():
            audio_file = c
            break
    
    if not audio_file:
        print(f"Ayah {i}: File not found, skipping")
        continue
    
    print(f"Ayah {i}: Processing {audio_file.name}...")
    
    result = model.transcribe(
        str(audio_file),
        language="ar",
        word_timestamps=True
    )
    
    # Extract word timestamps
    words = []
    for segment in result.get("segments", []):
        for word_data in segment.get("words", []):
            words.append({
                "word": word_data["word"].strip(),
                "start": round(word_data["start"], 3),
                "end": round(word_data["end"], 3)
            })
    
    all_timestamps[str(i)] = words
    print(f"  -> {len(words)} words extracted")

# Save to JSON
with open(OUTPUT_FILE, "w", encoding="utf-8") as f:
    json.dump(all_timestamps, f, ensure_ascii=False, indent=2)

print(f"\nDone! Saved to {OUTPUT_FILE}")
