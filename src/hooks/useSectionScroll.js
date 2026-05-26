// src/hooks/useSectionScroll.js
import { useState, useEffect, useRef, useCallback } from 'react';

export function useSectionScroll(ref) {
  const [state, setState] = useState({
    progress: 0,
    isInView: false,
    isCentered: false,
  });

  const measure = useCallback(() => {
    const el = ref.current;
    if (!el) return;

    const rect = el.getBoundingClientRect();
    const vh = window.innerHeight;

    const isInView = rect.top < vh && rect.bottom > 0;

    // Progress: 0 = just entered bottom, 0.5 = centered, 1 = exited top
    const sectionCenter = rect.top + rect.height / 2;
    const viewportCenter = vh / 2;
    const offset = sectionCenter - viewportCenter;

    const journeyStart = rect.height / 2 + vh;
    const journeyEnd = -(rect.height / 2);
    const rawProgress = (journeyStart - offset) / (journeyStart - journeyEnd);
    const progress = Math.max(0, Math.min(1, rawProgress));

    const isCentered = Math.abs(offset) < vh * 0.3;

    setState({ progress, isInView, isCentered });
  }, [ref]);

  useEffect(() => {
    measure();
    let raf;
    const onScroll = () => {
      cancelAnimationFrame(raf);
      raf = requestAnimationFrame(measure);
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', measure);
    return () => {
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener('resize', measure);
      cancelAnimationFrame(raf);
    };
  }, [measure]);

  return state;
}