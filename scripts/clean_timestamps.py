#!/usr/bin/env python3
"""Clean timestamps - remove non-Arabic artifacts"""

import json
import re

INPUT = "/Users/idris/clawd/dev/mulk-30/src/data/timestamps.json"

with open(INPUT, "r", encoding="utf-8") as f:
    data = json.load(f)

# Arabic character range
arabic_pattern = re.compile(r'[\u0600-\u06FF]')

cleaned = {}
for ayah, words in data.items():
    cleaned_words = []
    for w in words:
        # Only keep words with Arabic characters
        if arabic_pattern.search(w["word"]):
            cleaned_words.append(w)
    cleaned[ayah] = cleaned_words
    print(f"Ayah {ayah}: {len(words)} -> {len(cleaned_words)} words")

with open(INPUT, "w", encoding="utf-8") as f:
    json.dump(cleaned, f, ensure_ascii=False, indent=2)

print("Done!")
