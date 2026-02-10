# PROJEKT-REGELN — mulk-30

Dieses Dokument enthält alle UI/UX-Regeln und Fixes die Idris während der Entwicklung definiert hat. **IMMER befolgen!**

---

## UI-Bugs & Fixes

### 1. Audio Player Bar — Button-Symmetrie (FIXED ✅)
- **Problem:** Der Play-Button ist zu weit nach unten positioniert und überlappt andere Elemente
- **Regel:** Alle Buttons in der Audio Player Bar müssen vertikal zentriert und symmetrisch ausgerichtet sein
- **Fix angewendet:**
  - Container-Höhe explizit setzen: `h-14` (56px)
  - Alle Buttons mit `shrink-0` versehen (keine Größenänderung durch Flex)
  - Einheitliche Button-Größen: Hauptbutton `w-14 h-14`, Nebenbutton `w-11 h-11`
  - `min-w-0` auf dem Progress-Container damit Text nicht den Layout sprengt

### 2. Layout-System — Card + Player passen nicht auf den Screen (FIXED ✅)
- **Problem:** Die Arabic Card und der Audio Player überlappen sich / passen nicht auf den Bildschirm
- **Regel:** Kein `flex-1` für Cards verwenden wenn darunter fixed Elements sind
- **Fix angewendet:**
  - BottomNav: `fixed bottom-0` statt `sticky bottom-0`
  - Action Bar: `fixed bottom-16` (direkt über der 64px BottomNav)
  - Main Content: `pb-40` (160px) als Padding-Bottom für Action Bar + BottomNav
  - Card: Kein `flex-1` mehr — natürliche Höhe basierend auf Inhalt
  - Main: `overflow-y-auto` für scrollbaren Content wenn nötig

### 3. Arabic Word Rendering (FIXED ✅)
- **Problem:** Wörter kleben zusammen ohne Abstände
- **Regel:** Bei dynamischem Rendering von Arabic Words:
  - `.join(' ')` statt `.join('')` für Leerzeichen
  - `inline-block` Klasse auf jedes Wort-Span
  - `word-spacing: 0.35em` auf dem Container

---

## Layout-Hierarchie (von unten nach oben) — FINAL ✅ NIEMALS ÄNDERN!

### BottomNav (LOCKED 🔒)
- `fixed bottom-0`, `z-50`, `h-[76px]`
- Icons: `w-6 h-6`
- Text: `text-xs`
- Padding: `px-4 py-3`
- **KEIN Punkt unter aktivem Item** — nur Farbänderung

### Action Bar / Player (LOCKED 🔒)
- `fixed bottom-[92px]`, `z-40`, `px-4`
- (76px Nav + 16px Gap = 92px)
- Button-Größen: Play `w-14 h-14`, Speed `w-11 h-11`

### Main Content (LOCKED 🔒)
- `pb-44` (176px) padding-bottom bei Seiten MIT Player
- `pb-20` (80px) padding-bottom bei Seiten OHNE Player (z.B. Quiz)
- `flex-1 flex flex-col overflow-hidden`

### Verse Card (LOCKED 🔒)
- `flex-1` füllt den Raum zwischen Step-Indicator und Player
- `mb-5` (20px) Abstand zum Player
- Rounded: `rounded-2xl`
- **NUR Inhalt (Text) darf geändert werden, NICHT die Card selbst!**

⚠️ **DIESE WERTE SIND FINAL — NIEMALS ÄNDERN!**

### Konsistenz über alle Seiten
Diese Layout-Werte müssen auf ALLEN Seiten gleich sein:
- **Day Page** (`/app/day/[id].astro`) ✅
- **Repeat Page** (`/app/repeat.astro`) ✅
- **Quiz Page** (`/app/quiz.astro`) ✅ (kein Player → Card geht bis zur BottomNav)

---

## Allgemeine Regeln

### Flexbox-Regeln
- **NIEMALS** `flex-1` für Cards wenn darunter fixed Elements sind
- **IMMER** `shrink-0` für Buttons die ihre Größe behalten müssen
- **IMMER** `min-w-0` für Text-Container in Flex-Layouts

### Arabic Text Highlighting
- Wort-für-Wort Highlighting basierend auf Audio-Progress
- CSS: `.arabic-word.past { background-color: rgba(14, 165, 233, 0.22); }`
- Kleine Gaps zwischen Wörtern sind OK

### Quiz Page Icons
- ❌ Rotes X für falsche Antworten (`wrong-count`)
- ✓ Grüner Check für richtige Antworten (`score-count`)

---

**Letzte Aktualisierung:** 10.02.2026, 21:00
