// src/components/Intro.jsx
import WatchReveal from './WatchReveal';
import { INTRO, SITE_CONFIG } from '../data/catalog';
import { useLang } from '../context/LanguageContext';

export default function Intro() {
  const { lang } = useLang();
  return (
    <div style={{ background: '#0a0a0a' }}>
      <WatchReveal
        images={INTRO.images}
        title={INTRO.collectionTitle}
        siteName={SITE_CONFIG.titleLines}
        siteNameMobile={SITE_CONFIG.titleLinesMobile}
        flashText={INTRO.flashText}
        logoImage={INTRO.logoImage}
        logoImages={INTRO.logoImages}
        marqueeItems={INTRO.marquee[lang] ?? INTRO.marquee.en}
      />
    </div>
  );
}
