import React from "react";
import "./FilterBar.css";

export default function FilterBar({ categories, active, onChange }) {
  return (
    <nav className="filter-bar" aria-label="Filter by category">
      {categories.map((cat) => (
        <button
          key={cat}
          className={`filter-btn ${active === cat ? "selected" : ""}`}
          onClick={() => onChange(cat)}
        >
          {cat}
        </button>
      ))}
    </nav>
  );
}
