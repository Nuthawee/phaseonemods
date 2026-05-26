# PHASE ONE MODS — Portfolio Site

A custom watch photography portfolio and catalog, built with React. Features a cinematic intro animation, bilingual support (EN/TH), a filterable photo grid with lightbox, and a contact dropdown.

---

## Project Structure

```
src/
├── components/
│   ├── ContactDropdown.js / .css   — Contact info dropdown with socials
│   ├── FilterBar.js / .css         — Category filter navigation
│   ├── Intro.jsx                   — Animated intro section (wraps WatchReveal)
│   ├── LanguageToggle.js / .css    — EN / TH language switcher
│   ├── Lightbox.js / .css          — Full-screen image viewer with zoom & pan
│   ├── MarqueeText.jsx             — Scroll-independent ticker text
│   ├── MobileMenu.js / .css        — Hamburger overlay for mobile
│   ├── PhotoGrid.js / .css         — Masonry-style photo catalog grid
│   ├── StorySection.jsx            — Scroll-driven story section (unused/experimental)
│   └── WatchReveal.jsx             — Multi-phase scroll-animated hero
├── context/
│   └── LanguageContext.js          — React context for EN/TH i18n
├── data/
│   └── catalog.js                  — All editable site content (see below)
├── hooks/
│   ├── useSectionScroll.js         — Scroll progress hook for section animations
│   └── useScroll.js                — Global scroll position hook
├── App.js                          — Root layout and routing logic
├── App.css                         — Global styles and CSS variables
└── index.js                        — React entry point
```

---

## Editing Content

**All site content lives in `src/data/catalog.js`.** You can edit it directly or use the dev tool (see below).

### Key exports

| Export | What it controls |
|---|---|
| `SITE_CONFIG` | Site title, subtitle, taglines (EN + TH) |
| `SHOP_URL` | External shop link (leave `""` to hide the button) |
| `INTRO` | Hero images, logo/banner images, flash text, marquee ticker |
| `CONTACT` | Email, phone, Instagram, TikTok, YouTube, LINE, location, availability |
| `CATEGORIES` | Filter bar categories (always includes `"All"`) |
| `PHOTOS` | The watch catalog — id, title, category, year, description (EN/TH), thumb URL, lightbox images |

### Adding a photo

```js
{
  id: 15,                          // unique integer
  title: "My New Watch",
  category: "Mod",                 // must match a value in CATEGORIES
  year: "2026",
  description: {
    en: "English description",
    th: "คำอธิบายภาษาไทย",
  },
  thumb: "https://res.cloudinary.com/...",   // cover image URL
  images: [
    { url: "https://res.cloudinary.com/...", caption: "" },
    { url: "https://res.cloudinary.com/...", caption: "Side angle" },
  ],
},
```

---

## Dev Tool

A browser-based GUI for editing `catalog.js` without touching code.

### Setup

```bash
node dev-server.js        # starts at http://localhost:3333
```

Then open `http://localhost:3333` in your browser.

### Features

- **Photos** — add/edit/remove watches with live image previews
- **Categories** — add, rename, reorder (drag & drop)
- **Site Info** — title, taglines, shop URL
- **Intro / Hero** — slideshow images, logo images, marquee text
- **Contact** — all contact fields + availability toggle + website links
- **Save** — writes changes back to `catalog.js`
- **Publish** — runs `netlify deploy --build --prod` with a live log console

> The dev server only binds to `127.0.0.1` and is intended for local use only.

---

## Running Locally

```bash
npm install
npm start          # React dev server at http://localhost:3000
```

## Deploying

```bash
npm run build      # production build → /build
```

Or use the **Publish** button in the dev tool (requires Netlify CLI: `npm install -g netlify-cli` and a linked site).

---

## Bilingual Support (EN / TH)

- The language toggle in the header switches between English and Thai.
- UI strings are defined in `src/context/LanguageContext.js`.
- Photo descriptions support both languages via `{ en: "...", th: "..." }` objects in `catalog.js`.
- The intro marquee ticker also supports both languages via `INTRO.marquee.en` and `INTRO.marquee.th`.
- Thai text uses the **Sarabun** font; CSS overrides for Thai are scoped under `[data-lang="th"]` in `App.css`.

---

## Image Hosting

Images are hosted on **Cloudinary**. Upload your photos there and paste the resulting URLs into `catalog.js` (or the dev tool). The site does not bundle or serve images locally.

---

## Tech Stack

- **React 18** (Create React App)
- **CSS custom properties** for theming
- **Cloudinary** for image hosting
- **Netlify** for deployment
- Google Fonts: Bebas Neue · Barlow Condensed · Special Elite · Sarabun
