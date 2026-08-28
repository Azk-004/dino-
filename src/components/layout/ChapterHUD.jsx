import { useEffect, useState } from 'react';

const CHAPTERS = [
  { id: 'hero', label: 'Ouverture' },
  { id: 'presentation', label: 'Le constat' },
  { id: 'aanid', label: 'aanid' },
  { id: 'fonctionnalites', label: 'Fonctionnalités' },
  { id: 'tarifs', label: 'Formation' },
  { id: 'formation', label: 'La formation en question.' },
  { id: 'consultation', label: 'Consultation' },
  { id: 'publics', label: 'Publics' },
  { id: 'telecharger', label: 'Le départ' },
];

export default function ChapterHUD() {
  const [active, setActive] = useState(0);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const sections = CHAPTERS.map((c) => document.getElementById(c.id)).filter(Boolean);

    const onScroll = () => {
      const max = document.documentElement.scrollHeight - window.innerHeight;
      setProgress(max > 0 ? Math.min(Math.max(window.scrollY / max, 0), 1) : 0);

      let current = 0;
      sections.forEach((el, i) => {
        if (el.getBoundingClientRect().top <= window.innerHeight * 0.4) {
          current = i;
        }
      });
      setActive(current);
    };

    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', onScroll);
    return () => {
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener('resize', onScroll);
    };
  }, []);

  return (
    <div className="pointer-events-none fixed inset-x-0 top-0 z-50">
      <div className="h-[2px] w-full bg-white/5">
        <div
          className="h-full bg-gradient-to-r from-primary via-glow to-primary-light transition-[width] duration-150 ease-linear"
          style={{ width: `${progress * 100}%` }}
        />
      </div>
      <div className="mx-auto hidden max-w-fit items-center gap-2 pt-3 sm:flex">
        <div className="flex items-center gap-2 rounded-full border border-night-border bg-night/70 px-4 py-1.5 font-mono text-[11px] uppercase tracking-widest text-mist backdrop-blur">
          <span className="font-bold text-glow">{String(active + 1).padStart(2, '0')}</span>
          <span className="opacity-60">/</span>
          <span className="opacity-60">{String(CHAPTERS.length).padStart(2, '0')}</span>
          <span className="ml-1 text-cream">{CHAPTERS[active]?.label}</span>
        </div>
      </div>
    </div>
  );
}
