import React, { useState, useRef, useEffect } from "react";
import { CONTACT } from "../data/catalog";
import { useLang } from "../context/LanguageContext";
import "./ContactDropdown.css";

const Icons = {
  email:    <svg viewBox="0 0 20 20" fill="none"><rect x="2" y="4" width="16" height="12" rx="1.5" stroke="currentColor" strokeWidth="1.4"/><path d="M2 6l8 5.5L18 6" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round"/></svg>,
  phone:    <svg viewBox="0 0 20 20" fill="none"><path d="M4 3h3.5l1.5 4-2 1.5a9 9 0 003.5 3.5L12 10l4 1.5V15a1.5 1.5 0 01-1.5 1.5C7.4 16.5 3.5 12.6 3.5 5.5A1.5 1.5 0 015 4" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round"/></svg>,
  instagram:<svg viewBox="0 0 20 20" fill="none"><rect x="3" y="3" width="14" height="14" rx="4" stroke="currentColor" strokeWidth="1.4"/><circle cx="10" cy="10" r="3.2" stroke="currentColor" strokeWidth="1.4"/><circle cx="14.2" cy="5.8" r="0.9" fill="currentColor"/></svg>,
  facebook: <svg viewBox="0 0 20 20" fill="none"><path d="M17 3H3v14h7.5v-5.5H8.5V9h2V7.5C10.5 5.6 11.7 4.5 13.4 4.5c.8 0 1.6.06 2.4.18V7h-1.4c-.9 0-1 .4-1 1v1.1H16l-.3 2.4h-2.2V17H17V3z" stroke="currentColor" strokeWidth="1.3" strokeLinejoin="round"/></svg>,
  tiktok:   <svg viewBox="0 0 20 20" fill="none"><path d="M13 3c.2 1.8 1.2 3 3 3.3v2.2c-1.1 0-2.1-.4-3-1v4.5a4.5 4.5 0 11-4.5-4.5h.5v2.2a2.3 2.3 0 100 4.6V3h4z" stroke="currentColor" strokeWidth="1.3" strokeLinejoin="round"/></svg>,
  youtube:  <svg viewBox="0 0 20 20" fill="none"><rect x="2" y="4.5" width="16" height="11" rx="3" stroke="currentColor" strokeWidth="1.4"/><path d="M8.5 7.5l4 2.5-4 2.5V7.5z" stroke="currentColor" strokeWidth="1.2" strokeLinejoin="round"/></svg>,
  line:     <svg viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg"><rect x="1" y="1" width="18" height="18" rx="4.5" fill="#06C755"/><path d="M10 4C6.7 4 4 6.2 4 8.9c0 2.4 2.1 4.4 5 4.8l-.4 1.5c-.1.3.2.5.4.3l2.5-1.5c.2 0 .3.02.5.02 3.3 0 6-2.2 6-4.9C18 6.2 13.3 4 10 4z" fill="white"/><text x="10" y="10.2" textAnchor="middle" fontFamily="Arial, sans-serif" fontWeight="800" fontSize="3.8" fill="#06C755" letterSpacing="0.2">LINE</text></svg>,
  website:  <svg viewBox="0 0 20 20" fill="none"><circle cx="10" cy="10" r="7.5" stroke="currentColor" strokeWidth="1.4"/><path d="M10 2.5C8 5 7 7.4 7 10s1 5 3 7.5M10 2.5C12 5 13 7.4 13 10s-1 5-3 7.5M2.5 10h15" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round"/></svg>,
  location: <svg viewBox="0 0 20 20" fill="none"><path d="M10 2a6 6 0 016 6c0 4-6 10-6 10S4 12 4 8a6 6 0 016-6z" stroke="currentColor" strokeWidth="1.4"/><circle cx="10" cy="8" r="2" stroke="currentColor" strokeWidth="1.4"/></svg>,
};

const filled = (v) => typeof v === "string" && v.trim().length > 0;

export default function ContactDropdown() {
  const [open, setOpen] = useState(false);
  const ref = useRef(null);
  const { t } = useLang();

  useEffect(() => {
    const handler = (e) => { if (ref.current && !ref.current.contains(e.target)) setOpen(false); };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, []);

  const clean = (v) => (v || "").replace(/^@/, "");
  const hasSocials = filled(CONTACT.instagram) || filled(CONTACT.facebook) ||
                     filled(CONTACT.tiktok)    || filled(CONTACT.youtube)  ||
                     filled(CONTACT.line);
  const hasWebsites = Array.isArray(CONTACT.websites) && CONTACT.websites.filter(w => filled(w.url)).length > 0;
  const hasAnything = filled(CONTACT.email) || filled(CONTACT.phone) ||
                      hasSocials || filled(CONTACT.location) || hasWebsites;

  return (
    <div className="contact-wrap" ref={ref}>
      <button
        className={`contact-btn ${open ? "active" : ""}`}
        onClick={() => setOpen((v) => !v)}
        aria-expanded={open}
      >
        {CONTACT.available && <span className="avail-dot" />}
        {t.contact}
        <svg className={`chevron ${open ? "flipped" : ""}`} viewBox="0 0 10 6" fill="none">
          <path d="M1 1l4 4 4-4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
        </svg>
      </button>

      <div className={`contact-panel ${open ? "visible" : ""}`} role="menu">
        <div className="contact-header">
          {CONTACT.available
            ? <span className="status available">● {t.available}</span>
            : <span className="status busy">● {t.unavailable}</span>}
        </div>

        <ul className="contact-list">
          {!hasAnything && <li className="ci-empty">{t.noContact}</li>}

          {filled(CONTACT.email) && (
            <li><a href={`mailto:${CONTACT.email}`} className="contact-item">
              <span className="ci-icon">{Icons.email}</span>
              <span className="ci-label">Email</span>
              <span className="ci-value">{CONTACT.email}</span>
            </a></li>
          )}
          {filled(CONTACT.phone) && (
            <li><a href={`tel:${CONTACT.phone}`} className="contact-item">
              <span className="ci-icon">{Icons.phone}</span>
              <span className="ci-label">Phone</span>
              <span className="ci-value">{CONTACT.phone}</span>
            </a></li>
          )}

          {hasSocials && <li className="ci-divider"><span>{t.socials}</span></li>}

          {filled(CONTACT.instagram) && (
            <li><a href={`https://instagram.com/${clean(CONTACT.instagram)}`} target="_blank" rel="noreferrer" className="contact-item">
              <span className="ci-icon ig">{Icons.instagram}</span>
              <span className="ci-label">Instagram</span>
              <span className="ci-value">@{clean(CONTACT.instagram)}</span>
            </a></li>
          )}
          {filled(CONTACT.facebook) && (
            <li><a href={`https://facebook.com/${clean(CONTACT.facebook)}`} target="_blank" rel="noreferrer" className="contact-item">
              <span className="ci-icon fb">{Icons.facebook}</span>
              <span className="ci-label">Facebook</span>
              <span className="ci-value">{clean(CONTACT.facebook)}</span>
            </a></li>
          )}
          {filled(CONTACT.tiktok) && (
            <li><a href={`https://tiktok.com/@${clean(CONTACT.tiktok)}`} target="_blank" rel="noreferrer" className="contact-item">
              <span className="ci-icon tt">{Icons.tiktok}</span>
              <span className="ci-label">TikTok</span>
              <span className="ci-value">@{clean(CONTACT.tiktok)}</span>
            </a></li>
          )}
          {filled(CONTACT.youtube) && (
            <li><a href={`https://youtube.com/@${clean(CONTACT.youtube)}`} target="_blank" rel="noreferrer" className="contact-item">
              <span className="ci-icon yt">{Icons.youtube}</span>
              <span className="ci-label">YouTube</span>
              <span className="ci-value">{clean(CONTACT.youtube)}</span>
            </a></li>
          )}
          {filled(CONTACT.line) && (
            <li><a href={`https://line.me/ti/p/~${clean(CONTACT.line)}`} target="_blank" rel="noreferrer" className="contact-item">
              <span className="ci-icon ln">{Icons.line}</span>
              <span className="ci-label">Line</span>
              <span className="ci-value">{clean(CONTACT.line)}</span>
            </a></li>
          )}

          {hasWebsites && <li className="ci-divider"><span>{t.links || "Links"}</span></li>}

          {hasWebsites && CONTACT.websites.filter(w => filled(w.url)).map((w, i) => (
            <li key={i}><a href={w.url} target="_blank" rel="noreferrer" className="contact-item">
              <span className="ci-icon">{Icons.website}</span>
              <span className="ci-label">Website</span>
              <span className="ci-value">{w.label || w.url.replace(/^https?:\/\//, '')}</span>
            </a></li>
          ))}

          {filled(CONTACT.location) && (
            <li><div className="contact-item no-link">
              <span className="ci-icon">{Icons.location}</span>
              <span className="ci-label">Location</span>
              <span className="ci-value">{CONTACT.location}</span>
            </div></li>
          )}
        </ul>
      </div>
    </div>
  );
}
