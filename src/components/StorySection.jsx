// components/StorySection.jsx
import { useRef } from 'react';
import { useSectionScroll } from '../hooks/useSectionScroll';

export default function StorySection({ title, text, bgImage, index }) {
  const ref = useRef(null);
  const { progress, isInView, isCentered } = useSectionScroll(ref);

  // Map progress to animation values
  // progress 0→0.3: enter (fade in, slide up)
  // progress 0.3→0.7: settle (static)
  // progress 0.7→1: exit (fade out, slide down)
  
  let opacity = 0;
  let translateY = 0;
  let scale = 1;

  if (progress < 0.3) {
    // Entering
    const enterProgress = progress / 0.3;
    opacity = enterProgress;
    translateY = (1 - enterProgress) * 100; // 100px down to 0
  } else if (progress > 0.7) {
    // Exiting
    const exitProgress = (progress - 0.7) / 0.3;
    opacity = 1 - exitProgress;
    translateY = -exitProgress * 100; // 0 to -100px up
  } else {
    // Settled
    opacity = 1;
    translateY = 0;
  }

  // Parallax: background moves slower
  const bgOffset = (0.5 - progress) * 200; // -100px to +100px

  return (
    <section 
      ref={ref}
      className="story-section"
      style={{
        minHeight: '100vh',
        position: 'relative',
        overflow: 'hidden',
        display: 'grid',
        placeItems: 'center',
      }}
    >
      {/* Background layer - parallax */}
      <div
        style={{
          position: 'absolute',
          inset: '-20%', // overflow for parallax movement
          backgroundImage: `url(${bgImage})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          transform: `translateY(${bgOffset}px) scale(1.1)`,
          transition: isInView ? 'none' : 'transform 0.3s',
          willChange: isInView ? 'transform' : 'auto',
          filter: 'brightness(0.4)',
          zIndex: 1,
        }}
      />

      {/* Content layer */}
      <div
        style={{
          position: 'relative',
          zIndex: 2,
          maxWidth: '600px',
          padding: '2rem',
          color: 'white',
          textAlign: 'center',
          opacity,
          transform: `translateY(${translateY}px)`,
          willChange: isInView ? 'transform, opacity' : 'auto',
        }}
      >
        <span style={{ 
          fontSize: '0.875rem', 
          textTransform: 'uppercase',
          letterSpacing: '0.1em',
          opacity: 0.7,
        }}>
          Chapter {index + 1}
        </span>
        <h2 style={{ fontSize: '3rem', margin: '1rem 0' }}>{title}</h2>
        <p style={{ fontSize: '1.125rem', lineHeight: 1.7 }}>{text}</p>
      </div>

      {/* Debug indicator */}
      <div style={{
        position: 'fixed',
        top: 10,
        right: 10,
        background: 'rgba(0,0,0,0.8)',
        color: 'lime',
        padding: '0.5rem',
        fontFamily: 'monospace',
        fontSize: '0.75rem',
        zIndex: 9999,
      }}>
        {isCentered ? '● CENTERED' : '○'} progress: {progress.toFixed(3)}
      </div>
    </section>
  );
}