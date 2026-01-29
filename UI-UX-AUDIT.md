# UI/UX Audit — Mulk 30 App

**Datum:** 2025-07-27  
**Auditor:** Clawd (AI)  
**Version:** v1.0

---

## Executive Summary

Die Mulk-30 App ist insgesamt **sehr gut strukturiert** und folgt einem konsistenten Design-System. Die CSS-Variable-basierte Farbpalette, die Custom-Component-Klassen (`.btn`, `.card`, `.input`, `.nav-item`) und die iOS-PWA-Optimierungen zeigen professionelle Arbeit. 

**Stärken:**
- Konsistente CSS-Variablen für Farben mit vollständigem Dark Mode
- Gut definierte Component-Klassen (btn, card, input, nav-item)
- Durchdachte iOS/PWA-Optimierungen (safe areas, overscroll, viewport-fit)
- Arabischer Text mit dediziertem Uthmanic-Font + RTL + guter line-height
- Gute Micro-Interactions (scale-95, transitions, confetti, bounce-in)
- Sequential Learning Flow (Listen → Read → Recite) mit Lock-System

**Hauptprobleme:** Fehlende Loading/Error States, duplizierter Content, einige Accessibility-Lücken, und ein paar inkonsistente Patterns.

---

## 🔴 Kritisch (Critical)

### 1. Keine Loading States bei Formularen
**Dateien:** `src/pages/auth/login.astro` (Z.56-70), `src/pages/auth/signup.astro` (Z.74-90)  
**Problem:** Nach dem Klick auf "Hyr" oder "Regjistrohu" gibt es keinen Loading-Indikator. Der Button bleibt unverändert — Nutzer können mehrfach klicken.

**Fix:**
```javascript
// In login.astro script
const submitBtn = form.querySelector('button[type="submit"]') as HTMLButtonElement;
submitBtn.disabled = true;
submitBtn.innerHTML = '<svg class="animate-spin w-5 h-5" ...></svg> Po hyn...';

try {
  const { data, error } = await signIn(email, password);
  // ...
} finally {
  submitBtn.disabled = false;
  submitBtn.textContent = 'Hyr';
}
```

### 2. Delivery-Formular nur in localStorage
**Datei:** `src/pages/app/gift.astro` (Z.141-146)  
**Problem:** Das Delivery-Formular speichert nur in `localStorage` — keine Daten werden an einen Server geschickt. Der Nutzer denkt, seine Adresse wurde übermittelt, aber nichts passiert.

**Fix:** POST-Request an Supabase oder eine API ergänzen.

### 3. Kein Auth-Guard auf App-Seiten
**Dateien:** `src/pages/app/index.astro`, `src/pages/app/day/[id].astro`, etc.  
**Problem:** Keine der App-Seiten prüft, ob der Nutzer eingeloggt ist. Jeder kann `/app` direkt aufrufen. Die Auth (Supabase signIn/signUp) wird implementiert, aber nie geprüft.

**Fix:** Auth-Check in Layout oder als Middleware ergänzen:
```javascript
// In app pages script
import { getSession } from '../../lib/supabase';
const session = await getSession();
if (!session) window.location.href = '/auth/login';
```

### 4. Audio-Playback ist nur simuliert
**Datei:** `src/pages/app/day/[id].astro` (Z.230-250)  
**Problem:** Der Listen-Button simuliert Audio mit einem Timer (setInterval, 50ms × 50 = 2.5s). Es wird keine echte Audio-Datei abgespielt. Das ist das Kernfeature der App.

**Fix:** Echte Audio-Integration mit der Web Audio API oder einem `<audio>`-Element.

---

## 🟡 Wichtig (Important)

### 5. Massiver Content-Duplizierung
**Dateien:** `src/pages/app/gift.astro` (Z.85-120) und `src/pages/app/settings.astro` (Z.65-110)  
**Problem:** Der "Si funksionon?" Block (3 Schritte: Dëgjo/Lexo/Mëso) ist 1:1 identisch auf beiden Seiten dupliziert. Auch der Reward-Info-Block erscheint fast identisch auf Dashboard, Gift und Settings.

**Fix:** Shared Components erstellen:
```astro
// src/components/HowItWorks.astro
// src/components/RewardBanner.astro
```

### 6. Bottom Navigation wird auf jeder Seite inline wiederholt
**Dateien:** Alle App-Seiten (`app/index.astro`, `app/day/[id].astro`, `app/gift.astro`, `app/settings.astro`)  
**Problem:** ~20 Zeilen identischer Nav-HTML wird auf jeder Seite kopiert. Bei Änderungen muss man 4 Dateien editieren.

**Fix:** `src/components/BottomNav.astro` erstellen mit einem `active`-Prop.

### 7. `bg-opacity-10` funktioniert nicht mit CSS-Variablen
**Datei:** `src/pages/index.astro` (Z.12, Z.52, Z.62, Z.72, Z.82)  
**Problem:** `bg-[var(--color-primary)] bg-opacity-10` funktioniert in Tailwind v4 nicht. `bg-opacity` setzt `--tw-bg-opacity`, was bei `bg-[var(...)]` ignoriert wird. Die Kreise haben volle Opacity.

**Fix:**
```html
<!-- Statt: -->
<div class="bg-[var(--color-primary)] bg-opacity-10">
<!-- Verwende: -->
<div class="bg-[var(--color-primary)]/10">
<!-- Oder: -->
<div class="bg-[color-mix(in_srgb,var(--color-primary)_10%,transparent)]">
```

### 8. Inkonsistente Heading-Hierarchie
**Dateien:** Übergreifend  
**Problem:**
- Landing: `h1` = `text-3xl`, `h2` = `text-xl`, `h3` = `font-semibold` (kein size)
- Dashboard: `h1` = `text-lg`, `h2` = `font-semibold` (kein size)
- Day page: `h1` = `text-lg`
- Gift: `h2` = `text-xl` (Hero), `h2` = `font-semibold` (Sections)

Es gibt keine konsistente Typografie-Skala.

**Fix:** Typografie-Klassen definieren:
```css
.heading-page { font-size: 1.5rem; font-weight: 700; }
.heading-section { font-size: 1.125rem; font-weight: 600; }
.heading-card { font-size: 1rem; font-weight: 600; }
```

### 9. Theme Toggle existiert doppelt
**Dateien:** `src/pages/app/index.astro` (Header-Button) und `src/pages/app/settings.astro` (Toggle-Switch)  
**Problem:** Zwei verschiedene UI-Patterns für die gleiche Funktion. Dashboard hat ein Moon/Sun-Icon-Button, Settings hat einen iOS-Toggle-Switch. Beide haben eigene Event-Listener.

**Fix:** Eine zentrale Theme-Toggle-Komponente + ein shared Script.

### 10. Fehlende Error States bei Netzwerkfehlern
**Dateien:** `src/pages/auth/login.astro`, `src/pages/auth/signup.astro`  
**Problem:** Nur Auth-Fehler werden behandelt. Netzwerkfehler (offline, timeout) zeigen nichts an — die App hängt einfach.

**Fix:**
```javascript
try {
  const { data, error } = await signIn(email, password);
  // ...
} catch (e) {
  errorDiv.textContent = 'Nuk ka lidhje me internetin. Provo përsëri.';
  errorDiv.classList.remove('hidden');
}
```

### 11. Reset-Button ohne Doppelbestätigung
**Datei:** `src/pages/app/settings.astro` (Z.33)  
**Problem:** Der "Fshij progresin"-Button nutzt `confirm()`, was auf Mobile oft übersehen wird. Ein modaler Dialog mit rotem Bestätigungsbutton wäre sicherer.

### 12. Kein Offline-Support trotz PWA-Manifest
**Datei:** `src/layouts/Layout.astro`  
**Problem:** Es gibt ein `manifest.json` Link, aber keinen Service Worker. Die App ist als PWA deklariert, funktioniert aber nicht offline.

---

## 🟢 Minor

### 13. Landing-Page hat keinen Dark-Mode-Toggle
**Datei:** `src/pages/index.astro`  
**Problem:** Nutzer, die die Landing sehen, können nicht zwischen Hell/Dunkel wechseln. Nur die App-Seiten haben Toggles.

### 14. `card:hover` Shadow auf allen Karten
**Datei:** `src/styles/global.css` (Z.118-120)  
**Problem:** Jede `.card` bekommt einen Hover-Effekt, auch wenn sie nicht klickbar ist (z.B. Progress-Card, Info-Karten). Das suggeriert Interaktivität.

**Fix:**
```css
.card-interactive:hover { /* hover shadow */ }
.card { /* kein hover */ }
```

### 15. Nav-Item Text zu klein
**Dateien:** Alle App-Seiten  
**Problem:** `text-[10px]` für Nav-Labels ist extrem klein (10px). Apple HIG empfiehlt mindestens 11px für Tab-Bar-Labels.

**Fix:** `text-[11px]` oder `text-xs` (12px) verwenden.

### 16. Fehlende `aria-label` auf vielen Buttons
**Dateien:** Übergreifend  
**Problem:** Zoom-Buttons, FAQ-Toggles, Focus-Button haben keine `aria-label`s. Screen-Reader können diese nicht identifizieren.

### 17. CSS Custom Properties für Radius definiert aber nicht verwendet
**Datei:** `src/styles/global.css` (Z.14-18)  
**Problem:** `--radius-sm` bis `--radius-full` sind definiert, werden aber im CSS kaum verwendet. `.card` hat `border-radius: 1.5rem` hardcoded statt `var(--radius-xl)`.

**Fix:** Konsistent die Variablen verwenden:
```css
.card { border-radius: var(--radius-xl); }
.btn { border-radius: var(--radius-lg); }
```

### 18. Transliteration-Text sehr klein
**Datei:** `src/pages/app/day/[id].astro`  
**Problem:** `text-[13px]` für die Transliteration ist etwas klein, besonders für Lernende.

**Fix:** Mindestens `text-sm` (14px).

### 19. Timeline-Link führt zu nicht existierender Route
**Datei:** `src/pages/app/index.astro` (Z.97)  
**Problem:** Link zu `/app/timeline` — diese Seite existiert nicht im Projekt.

### 20. Signup-Formular: Ramadan-Datum ohne Default
**Datei:** `src/pages/auth/signup.astro` (Z.57-63)  
**Problem:** Das Datumsfeld für Ramadan-Start hat keinen Default-Wert. Die meisten Nutzer werden nicht wissen, wann Ramadan beginnt.

**Fix:** Default-Wert setzen: `value="2026-02-28"`

### 21. Wildcard Transition auf allen Elementen
**Datei:** `src/styles/global.css` (Z.88-92)  
**Problem:** `*:not(...)` Selector mit Transitions auf color/background/border/opacity betrifft ALLE Elemente. Das kann Performance-Probleme bei komplexen Seiten verursachen.

**Fix:** Transitions nur auf interaktive Elemente:
```css
button, a, .card, .input, .nav-item { transition: ...; }
```

---

## Zusammenfassung nach Kategorie

| Kategorie | Status |
|-----------|--------|
| **Design Consistency** | ✅ Gut — CSS Variables, konsistente Component-Klassen |
| **Component Patterns** | ⚠️ Massiver Copy-Paste, keine shared Components |
| **Typography** | ⚠️ Inkonsistente Heading-Größen |
| **Color Palette** | ✅ Sehr gut — CSS Variables mit Dark Mode |
| **Spacing System** | ✅ Gut — Tailwind-Klassen konsistent |
| **Navigation/UX Flow** | ⚠️ Broken timeline link, kein Auth-Guard |
| **Mobile UX** | ✅ Sehr gut — iOS-optimiert, safe areas, touch targets |
| **Arabic Text** | ✅ Exzellent — Uthmanic Font, RTL, gute Größen, Zoom |
| **Micro-interactions** | ✅ Gut — Transitions, Animationen, active states |
| **Empty/Edge States** | 🔴 Fehlt — Keine Loading, keine Offline, keine Error states |

**Gesamtbewertung: 7/10** — Solides Design-System, aber fehlende Produktions-Grundlagen (Auth, Loading, echtes Audio, Error Handling).
