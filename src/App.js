import React, { useState, useMemo } from "react";
import { SITE_CONFIG, CATEGORIES, PHOTOS, SHOP_URL } from "./data/catalog";
import { LanguageProvider, useLang } from "./context/LanguageContext";
import ContactDropdown from "./components/ContactDropdown";
import FilterBar from "./components/FilterBar";
import PhotoGrid from "./components/PhotoGrid";
import Intro from "./components/Intro";
import LanguageToggle from "./components/LanguageToggle";
import MobileMenu from "./components/MobileMenu";
import "./App.css";

function AppInner() {
  const { lang, t } = useLang();
  const [activeCategory, setActiveCategory] = useState("All");

  const translatedCategories = useMemo(
    () => CATEGORIES.map((c) => (c === "All" ? t.filterAll : c)),
    [t]
  );

  const originalActive = useMemo(() => {
    if (activeCategory === t.filterAll) return "All";
    return activeCategory;
  }, [activeCategory, t.filterAll]);

  const filtered = useMemo(
    () =>
      originalActive === "All"
        ? PHOTOS
        : PHOTOS.filter((p) => p.category === originalActive),
    [originalActive]
  );

  const handleCategoryChange = (cat) => setActiveCategory(cat);

  const displayActive = useMemo(() => {
    if (activeCategory === "All" || activeCategory === t.filterAll) return t.filterAll;
    return activeCategory;
  }, [activeCategory, t.filterAll]);

  return (
    <div className="app" data-lang={lang}>
      <header className="header">
        <div className="header-left">
          <a href="#top" className="logo" onClick={e => { e.preventDefault(); window.scrollTo({ top: 0, behavior: 'smooth' }); }}>{SITE_CONFIG.title}</a>
          <p className="tagline">{t.tagline}</p>
        </div>

        {/* Desktop right: lang + shop + contact */}
        <div className="header-right desktop-only">
          <LanguageToggle />
          {SHOP_URL && (
            <a href={SHOP_URL} target="_blank" rel="noreferrer" className="shop-btn">
              <svg viewBox="0 0 20 20" fill="none" width="14" height="14" style={{ flexShrink: 0 }}>
                <path d="M3 5h14l-1.5 8H4.5L3 5z" stroke="currentColor" strokeWidth="1.4" strokeLinejoin="round"/>
                <circle cx="7.5" cy="16" r="1" fill="currentColor"/>
                <circle cx="13.5" cy="16" r="1" fill="currentColor"/>
                <path d="M1 2h2.5l.5 3" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round"/>
              </svg>
              {t.shop}
            </a>
          )}
          <ContactDropdown />
        </div>

        {/* Mobile right: contact + hamburger menu */}
        <div className="header-right mobile-only">
          <ContactDropdown />
          <MobileMenu />
        </div>
      </header>

      <section>
        <Intro />
      </section>

      <section className="hero">
        <span className="hero-label">{t.portfolio}</span>
        <h2 className="hero-heading">{t.subtitle}</h2>
        <div className="hero-line" />
      </section>

      <FilterBar
        categories={translatedCategories}
        active={displayActive}
        onChange={handleCategoryChange}
      />

      <main>
        <PhotoGrid key={originalActive} photos={filtered} />
      </main>

      <footer className="footer">
        <span>© {new Date().getFullYear()} {SITE_CONFIG.title}</span>
        <span className="footer-sep">·</span>
        <span>{t.footer_works(filtered.length)}</span>
      </footer>
    </div>
  );
}

export default function App() {
  return (
    <LanguageProvider>
      <AppInner />
    </LanguageProvider>
  );
}
