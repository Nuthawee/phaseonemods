// src/components/MarqueeText.jsx
import { useRef, useEffect } from 'react';

export default function MarqueeText({ items, speed = 40, isActive = true, dark = false }) {
  const railRef = useRef(null);
  const rafRef  = useRef(null);
  const posRef  = useRef(0);

  const textColor    = dark ? 'rgba(0,0,0,0.5)'  : 'rgba(240,235,227,0.5)';
  const dividerColor = dark ? 'rgba(0,0,0,0.18)' : 'rgba(240,235,227,0.18)';

  useEffect(() => {
    cancelAnimationFrame(rafRef.current);
    const rail = railRef.current;
    if (!rail || !isActive) return;

    // How wide is one full repetition of `items`?
    // We rendered REPS copies; one set = totalWidth / REPS
    const REPS = rail.dataset.reps ? parseInt(rail.dataset.reps) : 4;
    const getSetWidth = () => rail.scrollWidth / REPS;

    let setWidth = 0;

    const tick = () => {
      if (setWidth === 0) setWidth = getSetWidth();

      posRef.current -= speed * 0.016;
      if (setWidth > 0 && posRef.current <= -setWidth) {
        posRef.current += setWidth;
      }

      rail.style.transform = `translateX(${posRef.current}px)`;
      rafRef.current = requestAnimationFrame(tick);
    };

    rafRef.current = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(rafRef.current);
  }, [isActive, speed, items]);

  // Repeat enough times so content always overflows even on ultra-wide screens.
  // Each repeat is one "set". We need at least 2 sets visible + 1 offscreen buffer.
  // 10 repetitions = safe up to ~10× a single set width.
  const REPS = 10;
  const repeated = Array.from({ length: REPS }, () => items).flat();

  return (
    <div style={{ overflow: 'hidden', width: '100%' }}>
      <div
        ref={railRef}
        data-reps={REPS}
        style={{
          display: 'inline-flex',
          flexWrap: 'nowrap',
          willChange: 'transform',
        }}
      >
        {repeated.map((item, i) => (
          <span
            key={i}
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              flexShrink: 0,
              whiteSpace: 'nowrap',
              padding: '0 1.6rem',
              gap: '1.2rem',
              fontSize: '0.82rem',
              letterSpacing: '0.1em',
              color: textColor,
              fontFamily: '"Barlow Condensed", "Arial Narrow", sans-serif',
              fontWeight: 700,
              textTransform: 'uppercase',
            }}
          >
            <span>{item}</span>
            <span style={{ color: dividerColor, fontSize: '0.5rem', lineHeight: 1 }}>◆</span>
          </span>
        ))}
      </div>
    </div>
  );
}
