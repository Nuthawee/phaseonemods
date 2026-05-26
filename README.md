# PHASE ONE MODS — Project README

> A watch modification catalog / portfolio site built with React.

---

## Project Structure

```
src/
├── data/
│   └── catalog.js          ← All content lives here (watches, contact, categories)
├── context/
│   └── LanguageContext.js  ← EN/TH language state + all UI strings
├── hooks/
│   ├── useScroll.js        ← Global scroll position tracker
│   └── useSectionScroll.js ← Per-section scroll progress (0→1)
└── components/
    ├── Intro.jsx           ← Landing section (wraps WatchReveal)
    ├── WatchReveal.jsx     ← The big scroll-driven cinematic intro
    ├── MarqueeText.jsx     ← Infinite scrolling ticker
    ├── FilterBar.js        ← Category filter tabs
    ├── PhotoGrid.js        ← Masonry grid of watch cards
    ├── Lightbox.js         ← Full-screen image viewer with zoom/pan
    ├── ContactDropdown.js  ← Contact info panel
    └── LanguageToggle.js   ← EN / TH switcher button

App.js          ← Root layout: header, sections, footer
App.css         ← Global styles, CSS variables, Thai font overrides
```

---

## Tech Stack

| Layer | Choice | Why |
|---|---|---|
| Framework | React 18 (CRA) | Component model, hooks, state |
| Styling | Plain CSS files | Per-component `.css`, CSS variables for theming |
| Fonts | Google Fonts | Bebas Neue (display), Barlow Condensed (body), Special Elite (mono), Sarabun (Thai) |
| Images | Cloudinary | CDN-hosted, `q_auto/f_auto` for automatic compression + format |
| Animation | CSS + `requestAnimationFrame` | No animation library — all hand-rolled |
| Language | Custom context (no i18n lib) | Lightweight EN/TH toggle via React Context |
| State | `useState` + `useMemo` | No Redux or Zustand — app is simple enough |

---

## Design Principles

### 1. Dark editorial aesthetic
The whole site uses a tight palette: `#0f0f0f` background, `#f0ebe3` cream text, `#d40000` red accent. Everything is defined in CSS variables at the top of `App.css`. Change a variable → everything updates.

### 2. Content-first data layer
`catalog.js` is intentionally the only file you need to edit to update the site. Watches, categories, contact info, and site title all live there. Components just read from it — they never hardcode content.

### 3. Scroll-driven animation without a library
`useSectionScroll` returns a `progress` value (0 → 1) as the user scrolls through a section. `WatchReveal.jsx` reads this number and drives every visual state — the giant text, the flash, the red slash, the split reveal, the curtain — purely by mapping progress ranges to CSS values. No GSAP, no Framer Motion.

### 4. Bilingual via React Context
`LanguageContext.js` holds the active language and a `t` object of translated strings. Any component calls `useLang()` to get `{ lang, t, toggle }`. The `data-lang={lang}` attribute on the root `<div>` lets CSS override fonts and sizes for Thai text without JS.

### 5. Component isolation
Each component owns its CSS file. There are no global utility classes (no Tailwind). Styles are predictable because there's no class name collision to worry about.

---

## What to Learn — Section by Section

Work through these in order. Each builds on the last.

---

### Stage 1 — React fundamentals
**Files:** `index.js`, `App.js`

Learn: JSX, components, props, `useState`, `useMemo`, `useEffect`.
`App.js` is the entry point. It composes all other components and holds the `activeCategory` filter state.

Key question to answer: *Why does `filtered` use `useMemo` instead of just computing directly?*

---

### Stage 2 — React Context (global state without prop drilling)
**Files:** `LanguageContext.js`, `LanguageToggle.js`

Learn: `createContext`, `useContext`, `Provider` pattern.
The language toggle button deep inside the header can change a value that the footer, the lightbox, and the hero all read — without passing props through every layer.

Key question: *What would happen if you removed the `LanguageProvider` wrapper in `App.js`?*

---

### Stage 3 — CSS architecture and design tokens
**Files:** `App.css`, `FilterBar.css`, `PhotoGrid.css`

Learn: CSS custom properties (`--accent`, `--bg`), how `[data-lang="th"]` attribute selectors work, responsive breakpoints with `@media`.
Notice how Thai text needs different `font-size`, `letter-spacing`, and `line-height` because Thai characters have diacritics that extend above the line.

Key question: *How does changing `--accent` in `:root` affect the red line under the logo, the filter bar indicator, and the lightbox scrollbar all at once?*

---

### Stage 4 — Custom hooks and the scroll pattern
**Files:** `useScroll.js`, `useSectionScroll.js`

Learn: `useRef`, `requestAnimationFrame`, passive event listeners, the difference between `scrollY` (global) and a section's `getBoundingClientRect()`.
`useSectionScroll` is the engine behind the entire intro animation. It returns a single `progress` number (0–1) by measuring where the section sits relative to the viewport.

Key question: *Why does `useSectionScroll` use `requestAnimationFrame` instead of updating state directly in the scroll handler?*

---

### Stage 5 — Scroll-driven animation
**File:** `WatchReveal.jsx`

Learn: How to map a 0→1 progress value to visual properties (opacity, translateX, clipPath). The easing functions (`easeIn`, `easeOut`, `easeInOut`) shape how animations feel. The "timeline" is a series of `rangeEased(progress, start, end)` calls — each one activates within a specific window of the scroll.

Read the comment block at the top of the animation section:
```
// 0.00 → 0.40  PHASE 1  : giant site name
// 0.40 → 0.44  FLASH    : off-white floods in
// 0.44 → 0.54  SLASH    : red line draws top→bottom
// 0.54 → 0.66  REVEAL   : split layout eases in
// ...
```
Then trace each phase through the JSX.

Key question: *If you wanted the curtain to drop faster, which two numbers would you change?*

---

### Stage 6 — `useRef` for animation (not just DOM access)
**File:** `MarqueeText.jsx`

Learn: Why `useRef` is used to store `posRef` and `rafRef` instead of `useState`. State triggers a re-render; a ref doesn't. The marquee moves 60 times per second via `requestAnimationFrame` — triggering a re-render each frame would destroy performance.

Key question: *What is `posRef.current` storing, and why is it a ref instead of state?*

---

### Stage 7 — Complex UI state management
**File:** `Lightbox.js`

Learn: Multiple pieces of state (`imgIdx`, `zoom`, `pos`, `isDragging`) that interact with each other. `useCallback` to memoize event handlers. Touch event handling (`pinch to zoom`, `drag to pan`). Keyboard navigation with `useEffect` + cleanup.

This is the most complex component. Read it after you're comfortable with the earlier stages.

Key question: *Why does `clampPos` need to know the current zoom level to calculate the drag boundary?*

---

### Stage 8 — Data layer and content management
**File:** `catalog.js`

Learn: How a single JS file acts as a "CMS". The `PHOTOS` array shape (`id`, `title`, `category`, `thumb`, `images[]`, `description: { en, th }`). How `FilterBar` and `PhotoGrid` consume it through `App.js`.

Key question: *How would you add a new category and a watch that belongs to it?*

---

## How to Add a New Watch

1. Open `catalog.js`
2. Add a new object to `PHOTOS`:

```js
{
  id: 12,                          // unique number
  title: "My New Watch",
  category: "Moonphase Series",    // must match an entry in CATEGORIES
  year: "2026",
  description: {
    en: "English description here.",
    th: "คำอธิบายภาษาไทย",
  },
  thumb: "https://res.cloudinary.com/.../cover.jpg",
  images: [
    { url: "https://res.cloudinary.com/.../front.jpg", caption: "" },
    { url: "https://res.cloudinary.com/.../side.jpg",  caption: "Side view" },
  ],
},
```

3. Save. Done. The grid, filter bar, and lightbox all update automatically.

---

## How to Add a New Category

In `catalog.js`, add the name to the `CATEGORIES` array:

```js
export const CATEGORIES = [
  "All",
  "Heritage edition (1965)",
  "Moonphase Series",
  "Earthphase Series",
  "Moonshine Gold var.",
  "Your New Category",   // ← add here
];
```

Then set `category: "Your New Category"` on any watch that belongs to it.

---

## Cloudinary Image Tips

All image URLs follow this pattern:
```
https://res.cloudinary.com/<cloud-name>/image/upload/q_auto/f_auto/<public-id>
```

- `q_auto` — Cloudinary auto-picks the best quality/size tradeoff
- `f_auto` — serves WebP to browsers that support it, JPEG as fallback
- For thumbnails you can add `w_800` to cap the width: `.../q_auto/f_auto/w_800/<id>`

---

## Key CSS Variables (edit in `App.css`)

```css
:root {
  --bg:            #0f0f0f;   /* page background */
  --surface:       #1a1a1a;   /* card / panel background */
  --surface2:      #f0ebe3;   /* light panel (left split) */
  --text:          #f0ebe3;   /* primary text */
  --text-muted:    rgba(240,235,227,0.45);
  --accent:        #d40000;   /* red — lines, hovers, indicators */
  --accent2:       #f0ebe3;
}
```
