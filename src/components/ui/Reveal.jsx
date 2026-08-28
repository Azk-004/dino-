import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const VARIANTS = {
  // Bascule 3D depuis le bas, comme un panneau qui se déplie vers l'observateur
  flip: { opacity: 0, y: 70, rotateX: -40, scale: 0.94 },
  // Légère profondeur, pour les blocs de texte
  lift: { opacity: 0, y: 36, rotateX: -10 },
  // Simple zoom, pour les blocs déjà chargés visuellement
  scale: { opacity: 0, y: 20, scale: 0.93 },
};

export default function Reveal({ children, className = '', delay = 0, as: Tag = 'div', variant = 'lift' }) {
  const ref = useRef(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return undefined;

    const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReduced) {
      gsap.set(el, { opacity: 1, y: 0, rotateX: 0, scale: 1 });
      return undefined;
    }

    const from = VARIANTS[variant] ?? VARIANTS.lift;
    gsap.set(el, { ...from, transformPerspective: 900, transformOrigin: '50% 100%' });

    const ctx = gsap.context(() => {
      gsap.to(el, {
        opacity: 1,
        y: 0,
        rotateX: 0,
        scale: 1,
        duration: 1,
        delay: delay / 1000,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: el,
          start: 'top 88%',
          toggleActions: 'play none none none',
        },
      });
    }, ref);

    return () => ctx.revert();
  }, [delay, variant]);

  return (
    <Tag
      ref={ref}
      className={`${className ? `${className} ` : ''}reveal-3d`}
    >
      {children}
    </Tag>
  );
}
