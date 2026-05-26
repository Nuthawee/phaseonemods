// src/hooks/useScroll.js
import { useState, useEffect, useRef, useCallback } from 'react';

export function useScroll() {
  const [scrollY, setScrollY] = useState(0);
  const [scrollDirection, setScrollDirection] = useState('down');
  const lastScrollY = useRef(0);
  const rafId = useRef(null);
  const ticking = useRef(false);

  const update = useCallback(() => {
    const current = window.scrollY;
    setScrollY(current);
    setScrollDirection(current > lastScrollY.current ? 'down' : 'up');
    lastScrollY.current = current;
    ticking.current = false;
  }, []);

  useEffect(() => {
    const onScroll = () => {
      if (!ticking.current) {
        rafId.current = requestAnimationFrame(update);
        ticking.current = true;
      }
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => {
      window.removeEventListener('scroll', onScroll);
      cancelAnimationFrame(rafId.current);
    };
  }, [update]);

  const docHeight = typeof document !== 'undefined'
    ? document.documentElement.scrollHeight - window.innerHeight
    : 0;
  const progress = docHeight > 0 ? scrollY / docHeight : 0;

  return { scrollY, scrollDirection, progress };
}