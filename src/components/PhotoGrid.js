import React, { useState } from "react";
import Lightbox from "./Lightbox";
import { SHOP_URL } from "../data/catalog";
import "./PhotoGrid.css";

export default function PhotoGrid({ photos }) {
  const [selected, setSelected] = useState(null);

  const close = () => setSelected(null);

  return (
    <>
      <div className="grid">
        {photos.map((watch, idx) => {
          return (
            <button
              key={watch.id}
              className="grid-item"
              onClick={() => setSelected(idx)}
              style={{ "--i": idx }}
            >
              <img src={watch.thumb} alt={watch.title} loading="lazy" />
              <div className="grid-overlay">
                <span className="grid-title">{watch.title}</span>
                <span className="grid-cat">{watch.category}</span>
              </div>
            </button>
          );
        })}
      </div>

      {selected !== null && (
        <Lightbox
          watch={photos[selected]}
          watchIndex={selected}
          total={photos.length}
          onClose={close}
          shopUrl={SHOP_URL}
        />
      )}
    </>
  );
}
