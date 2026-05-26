// src/components/LanguageToggle.js
import React from "react";
import { useLang } from "../context/LanguageContext";
import "./LanguageToggle.css";

export default function LanguageToggle() {
  const { lang, toggle } = useLang();
  return (
    <button
      className="lang-toggle"
      onClick={toggle}
      aria-label={lang === "en" ? "Switch to Thai" : "Switch to English"}
      title={lang === "en" ? "ภาษาไทย" : "English"}
    >
      <span className={`lang-opt ${lang === "en" ? "lang-opt--active" : ""}`}>EN</span>
      <span className="lang-divider" />
      <span className={`lang-opt ${lang === "th" ? "lang-opt--active" : ""}`}>TH</span>
    </button>
  );
}
