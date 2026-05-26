import React, { useState, useEffect } from "react";
import { SHOP_URL } from "../data/catalog";
import { useLang } from "../context/LanguageContext";
import "./MobileMenu.css";

export default function MobileMenu() {
  const [open, setOpen] = useState(false);
  const { lang, toggle, t } = useLang();

  // Lock body scroll when open
  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [open]);

  return (
    <>
      {/* Hamburger / X button */}
      <button
        className={`mob-menu-btn ${open ? "open" : ""}`}
        onClick={() => setOpen(v => !v)}
        aria-label={open ? "Close menu" : "Open menu"}
      >
        <span className="mob-bar mob-bar--top" />
        <span className="mob-bar mob-bar--mid" />
        <span className="mob-bar mob-bar--bot" />
      </button>

      {/* Full-screen overlay */}
      <div className={`mob-overlay ${open ? "visible" : ""}`}>
        <nav className="mob-nav">

          {/* Language toggle row */}
          <div className="mob-nav-item mob-lang-row">
            <span className="mob-nav-label">{lang === "en" ? "ภาษา / Language" : "ภาษา / Language"}</span>
            <div className="mob-lang-toggle">
              <button
                className={`mob-lang-opt ${lang === "en" ? "active" : ""}`}
                onClick={() => { if (lang !== "en") toggle(); }}
              >EN</button>
              <span className="mob-lang-sep" />
              <button
                className={`mob-lang-opt ${lang === "th" ? "active" : ""}`}
                onClick={() => { if (lang !== "th") toggle(); }}
              >TH</button>
            </div>
          </div>

          {/* Shop link */}
          {SHOP_URL && (
            <a
              href={SHOP_URL}
              target="_blank"
              rel="noreferrer"
              className="mob-nav-item mob-nav-link"
              onClick={() => setOpen(false)}
            >
              <svg viewBox="0 0 20 20" fill="none" width="18" height="18" style={{ flexShrink: 0 }}>
                <path d="M3 5h14l-1.5 8H4.5L3 5z" stroke="currentColor" strokeWidth="1.4" strokeLinejoin="round"/>
                <circle cx="7.5" cy="16" r="1" fill="currentColor"/>
                <circle cx="13.5" cy="16" r="1" fill="currentColor"/>
                <path d="M1 2h2.5l.5 3" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round"/>
              </svg>
              {t.shop}
            </a>
          )}

        </nav>
      </div>
    </>
  );
}
