# 🎨 Mulk-30 UI/UX Audit Report

**Datum:** 6. Februar 2026  
**Ziel:** Konsistentes Flat Design — clean, modern, minimalistisch

---

## 📋 Executive Summary

Die Mulk-30 App hat ein solides Fundament, aber **signifikante Inkonsistenzen** in Schatten, Border-Radii, Spacing und Button-Styles. Für ein echtes **Flat Design** müssen diese vereinheitlicht werden.

---

## 🔴 Gefundene Inkonsistenzen

### 1. SCHATTEN (Shadow) — ❌ KRITISCH

| Datei | Zeile | Aktuell | Problem |
|-------|-------|---------|---------|
| `global.css` | 160 | `.card { box-shadow: 0 1px 3px 0 rgb(0 0 0 / 0.05) }` | Leichter Schatten OK |
| `global.css` | 169 | `.card-interactive:hover { box-shadow: 0 4px 6px -1px ... }` | Hover-Schatten |
| `global.css` | 227 | `.modal-content { box-shadow: 0 20px 25px -5px ... }` | Zu intensiver Schatten |
| `index.astro` | 79 | `shadow-lg` auf Primary CTA Button | Inline Schatten |
| `day/[id].astro` | 50 | `shadow-lg` auf Arabic Card | Inline Schatten |
| `day/[id].astro` | 233,245,262,289 | `shadow-lg` auf Action Buttons | Inline Schatten |
| `settings.astro` | 14 | `shadow-sm` auf Back Button | Inkonsistent mit anderen |
| `quiz.astro` | 34 | `shadow-lg shadow-[var(--color-primary)]/20` auf Start Button | Farbiger Schatten |
| `repeat.astro` | 44 | `shadow-xl shadow-[var(--color-primary)]/30` auf Start Button | Unterschiedliche Intensität |

**Fazit:** Mindestens 5 verschiedene Schattentypen im Einsatz!

---

### 2. BORDER-RADIUS — ⚠️ MITTEL

| Datei | Zeile | Aktuell | Standard |
|-------|-------|---------|----------|
| `global.css` | CSS Vars | `--radius-sm: 0.5rem (8px)` | ✓ OK |
| `global.css` | CSS Vars | `--radius-md: 0.75rem (12px)` | ✓ OK |
| `global.css` | CSS Vars | `--radius-lg: 1rem (16px)` | ✓ OK |
| `global.css` | CSS Vars | `--radius-xl: 1.5rem (24px)` | ✓ OK |
| `index.astro` | 79 | `rounded-2xl` (16px) | ✓ OK |
| `day/[id].astro` | 50 | `rounded-3xl` (24px) | ✓ OK für Cards |
| `day/[id].astro` | 101 | `rounded-2xl` auf Quiz Panel | Inkonsistent mit anderen Panels |
| `settings.astro` | 14 | `rounded-full` auf Back-Button | ✓ OK für Icons |
| `quiz.astro` | 46 | `rounded-xl` auf Options | Unterschiedlich zu anderen Buttons |
| `quiz.astro` | 23 | `rounded-2xl` auf Cards | ✓ OK |
| `repeat.astro` | 38 | `rounded-2xl` auf Mode Toggle | ✓ OK |

**Verwendete Radii:**
- `rounded-lg` (8px) — Kleine Elemente
- `rounded-xl` (12px) — Buttons, Inputs
- `rounded-2xl` (16px) — Cards, Panels
- `rounded-3xl` (24px) — Hero Cards
- `rounded-full` (50%) — Icons, Avatare

**Problem:** Inkonsistente Anwendung der Radii auf ähnliche Elemente.

---

### 3. PADDING/MARGINS — ⚠️ MITTEL

| Datei | Element | Aktuell | Sollte sein |
|-------|---------|---------|-------------|
| `index.astro` | Hero Card | `py-8` | ✓ OK |
| `index.astro` | Steps Card | `p-3` | Zu klein |
| `day/[id].astro` | Arabic Card | `p-6` | ✓ OK |
| `day/[id].astro` | Action Bar | `py-3` | ✓ OK |
| `settings.astro` | Settings Row | `padding: 0.25rem 0` | Zu eng |
| `quiz.astro` | Question Card | `p-6` | ✓ OK |
| `quiz.astro` | Options | `p-4` | ✓ OK |
| `repeat.astro` | Ayah Grid | `p-4` | ✓ OK |

**Spacing-Skala verwendet:**
- `p-2` (8px), `p-3` (12px), `p-4` (16px), `p-5` (20px), `p-6` (24px), `p-8` (32px)

**Problem:** Keine konsistente Spacing-Skala (4px, 8px, 12px, 16px, 24px, 32px wäre besser).

---

### 4. BUTTON-STYLES — 🔴 KRITISCH

| Datei | Zeile | Button-Typ | Style |
|-------|-------|------------|-------|
| `global.css` | 137 | `.btn-primary` | Grün, 16px radius |
| `global.css` | 147 | `.btn-secondary` | Weiß mit Border + Shadow |
| `index.astro` | 79 | Continue CTA | `bg-[var(--color-primary)] rounded-2xl shadow-lg` |
| `day/[id].astro` | 233 | Play Button | `rounded-full bg-emerald-600 shadow-lg` |
| `day/[id].astro` | 262 | Read Tap | `rounded-full bg-sky-600 shadow-lg` |
| `day/[id].astro` | 289 | Recite Tap | `rounded-full bg-violet-600 shadow-lg` |
| `settings.astro` | 14 | Back Button | `rounded-full bg-background shadow-sm` |
| `quiz.astro` | 34 | Start Quiz | `btn btn-primary rounded-xl shadow-lg` |
| `repeat.astro` | 44 | Start Repeat | `rounded-2xl shadow-xl shadow-primary/30` |

**Problem:** 6+ verschiedene Button-Stile für ähnliche Aktionen!

---

### 5. CARD-STYLES — ⚠️ MITTEL

| Datei | Zeile | Card-Typ | Style |
|-------|-------|----------|-------|
| `global.css` | 154 | `.card` | `rounded-xl, border, shadow-sm` |
| `index.astro` | 36 | Hero Card | `card` class ✓ |
| `index.astro` | 89 | Steps Card | `card` class ✓ |
| `day/[id].astro` | 50 | Arabic Card | `rounded-3xl shadow-lg` — NICHT .card! |
| `day/[id].astro` | 101 | Quiz Panel | `rounded-3xl` — NICHT .card! |
| `quiz.astro` | 19 | Hero Stats | `card rounded-2xl` mit Gradient |
| `quiz.astro` | 30 | Selection Card | `card rounded-2xl` ✓ |
| `settings.astro` | multiple | Settings Cards | `.card` class ✓ |

**Problem:** Manche Cards nutzen `.card`, andere haben inline Styles.

---

### 6. ICON-GRÖSSEN — ✅ MEISTENS OK

| Größe | Verwendung |
|-------|------------|
| `w-4 h-4` | Inline Icons, Links |
| `w-5 h-5` | Navigation Icons, Buttons |
| `w-6 h-6` | Medium Actions |
| `w-7 h-7` | Large Actions |
| `w-8 h-8` | Step Icons |
| `w-10 h-10` | Hero Icons |

**Status:** Meist konsistent, aber manche Step-Circles variieren.

---

### 7. TYPOGRAFIE — ⚠️ MITTEL

| Klasse | Definiert in | Verwendung |
|--------|--------------|------------|
| `.heading-page` | global.css:39 | Nicht verwendet! |
| `.heading-section` | global.css:45 | ✓ Wird genutzt |
| `.heading-card` | global.css:51 | ✓ Wird genutzt |
| Inline `text-lg font-semibold` | index.astro:36 | Sollte `.heading-section` sein |
| Inline `text-base font-semibold` | day/[id].astro:17 | Sollte `.heading-card` sein |

**Problem:** Typografie-Klassen definiert aber oft inline überschrieben.

---

## ✨ FLAT DESIGN STYLEGUIDE

### Farben (bereits gut definiert)
```css
:root {
  --color-primary: #2D6A4F;
  --color-primary-light: #52B788;
  --color-primary-dark: #1B4332;
  --color-accent: #B7E4C7;
  --color-background: #F8F9FA;
  --color-surface: #FFFFFF;
  --color-text: #2D3436;
  --color-text-secondary: #8395A7;
  --color-border: #E8ECF0;
}
```

### Schatten — FLAT DESIGN REGELN

| Element | Schatten | Grund |
|---------|----------|-------|
| Cards | `KEINER` | Flat Design = keine Schatten |
| Buttons | `KEINER` | Flat Design = keine Schatten |
| Modals | `0 20px 40px rgba(0,0,0,0.15)` | Einzige Ausnahme für Overlay |
| Hover States | `KEINER` | Nur Border/Background-Change |

### Border-Radius — VEREINHEITLICHT

| Größe | Wert | Verwendung |
|-------|------|------------|
| `--radius-sm` | 8px | Kleine Chips, Tags |
| `--radius-md` | 12px | Buttons, Inputs |
| `--radius-lg` | 16px | Cards, Panels |
| `--radius-xl` | 24px | Hero Cards, Modals |
| `--radius-full` | 50% | Runde Icons, Avatare |

### Spacing — 8px GRID

| Token | Wert | Verwendung |
|-------|------|------------|
| `space-1` | 4px | Hairline gaps |
| `space-2` | 8px | Icon gaps |
| `space-3` | 12px | Small padding |
| `space-4` | 16px | Standard padding |
| `space-6` | 24px | Section padding |
| `space-8` | 32px | Large sections |

### Typografie — HIERARCHIE

| Klasse | Size | Weight | Verwendung |
|--------|------|--------|------------|
| `.heading-page` | 24px | 700 | Page Titles |
| `.heading-section` | 18px | 600 | Section Headers |
| `.heading-card` | 16px | 600 | Card Headers |
| `.body-text` | 14px | 400 | Normal Text |
| `.caption` | 12px | 400 | Secondary Text |
| `.label` | 11px | 500 | Labels, Nav |

### Button — 3 VARIANTEN

```css
/* Primary - Hauptaktion */
.btn-primary {
  background: var(--color-primary);
  color: white;
  border: none;
  border-radius: var(--radius-md); /* 12px */
  padding: 12px 24px;
  font-weight: 600;
  /* KEIN SCHATTEN */
}

/* Secondary - Nebenaktionen */
.btn-secondary {
  background: var(--color-surface);
  color: var(--color-text);
  border: 1px solid var(--color-border);
  border-radius: var(--radius-md);
  padding: 12px 24px;
  font-weight: 500;
  /* KEIN SCHATTEN */
}

/* Ghost - Tertiäre Aktionen */
.btn-ghost {
  background: transparent;
  color: var(--color-primary);
  border: none;
  padding: 12px 24px;
}
```

### Cards — 2 VARIANTEN

```css
/* Standard Card */
.card {
  background: var(--color-surface);
  border: 1px solid var(--color-border);
  border-radius: var(--radius-lg); /* 16px */
  padding: 24px;
  /* KEIN SCHATTEN */
}

/* Hero Card - für wichtige Content */
.card-hero {
  background: var(--color-surface);
  border: 1px solid var(--color-border);
  border-radius: var(--radius-xl); /* 24px */
  padding: 32px;
  /* KEIN SCHATTEN */
}
```

---

## 🔧 PRIORITIERTE FIX-LISTE

### 🔴 PRIORITÄT 1 — Sofort (Schatten entfernen)

1. **global.css**
   - Zeile 160: `.card` — Schatten entfernen
   - Zeile 169: `.card-interactive:hover` — Schatten entfernen, nur border-color ändern
   - Zeile 148: `.btn-secondary` — Schatten entfernen

2. **index.astro**
   - Zeile 79: `shadow-lg` von Continue Button entfernen

3. **day/[id].astro**
   - Zeile 50: `shadow-lg` von Arabic Card entfernen
   - Zeile 233, 245, 262, 289: `shadow-lg` von allen Action Buttons entfernen

4. **settings.astro**
   - Zeile 14: `shadow-sm` vom Back Button entfernen

5. **quiz.astro**
   - Zeile 34: `shadow-lg shadow-[var(--color-primary)]/20` entfernen

6. **repeat.astro**
   - Zeile 44: `shadow-xl shadow-[var(--color-primary)]/30` entfernen

### 🟡 PRIORITÄT 2 — Diese Woche (Konsistenz)

7. **Border-Radius vereinheitlichen**
   - Alle Cards: `rounded-2xl` (16px)
   - Alle Hero Cards: `rounded-3xl` (24px)
   - Alle Buttons: `rounded-xl` (12px)
   - Alle Inputs: `rounded-lg` (8px)

8. **Button-Styles vereinheitlichen**
   - Action Buttons in day/[id].astro sollten `.btn-primary` nutzen
   - Alle CTAs gleich stylen

9. **Card-Klassen nutzen**
   - day/[id].astro Zeile 50: `.card-hero` Klasse nutzen statt inline
   - quiz.astro: `.card` konsistent verwenden

### 🟢 PRIORITÄT 3 — Nächste Iteration

10. **Typografie-Klassen konsequent nutzen**
    - `.heading-page` für Page Titles
    - `.heading-section` für Section Headers
    - Inline font-size/weight ersetzen

11. **Spacing-Tokens einführen**
    - CSS Variablen für Spacing definieren
    - Tailwind durch Tokens ersetzen

12. **Hover/Focus States vereinheitlichen**
    - Nur border-color ändern, keine Schatten
    - Konsistente Transition-Zeiten

---

## 📊 Zusammenfassung

| Kategorie | Status | Aufwand |
|-----------|--------|---------|
| Schatten | ❌ 5+ Varianten | 🔴 Hoch |
| Border-Radius | ⚠️ Meist OK | 🟡 Mittel |
| Spacing | ⚠️ Inkonsistent | 🟡 Mittel |
| Buttons | ❌ 6+ Varianten | 🔴 Hoch |
| Cards | ⚠️ Mischung | 🟡 Mittel |
| Icons | ✅ OK | 🟢 Niedrig |
| Typografie | ⚠️ Unternutzt | 🟡 Mittel |

**Geschätzter Aufwand für vollständiges Flat Design:** ~4-6 Stunden

---

## 🎯 Quick Wins (30 Minuten)

1. Alle `shadow-*` Klassen in Tailwind durch `shadow-none` ersetzen
2. `box-shadow` aus global.css für `.card` und `.btn-secondary` entfernen
3. Modal-Schatten auf subtileren Wert reduzieren: `0 10px 25px rgba(0,0,0,0.1)`

Diese drei Änderungen bringen 80% des Flat-Design-Looks.

---

*Report generiert am 06.02.2026 von UI/UX Audit Agent*
