import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export default function ChapterHeading({ number, total = 7, kicker, title, lede, align = 'left' }) {
  const ref = useRef(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return undefined;

    const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const words = el.querySelectorAll('.chapter-word');

    if (prefersReduced) {
      gsap.set(words, { opacity: 1, y: 0 });
      return undefined;
    }

    gsap.set(words, { opacity: 0, y: '110%' });

    const ctx = gsap.context(() => {
      gsap.to(words, {
        opacity: 1,
        y: '0%',
        duration: 0.9,
        ease: 'power4.out',
        stagger: 0.05,
        scrollTrigger: {
          trigger: el,
          start: 'top 82%',
          toggleActions: 'play none none none',
        },
      });
    }, ref);

    return () => ctx.revert();
  }, []);

  return (
    <div ref={ref} className={align === 'center' ? 'text-center' : 'text-left'}>
      <p className="chapter-kicker">
        <span className="num">{String(number).padStart(2, '0')}</span>
        <span>/ {String(total).padStart(2, '0')} - {kicker}</span>
      </p>
      <h2 className="chapter-title mt-3 overflow-hidden text-4xl sm:text-5xl lg:text-6xl">
        {title.split(' ').map((word, i) => (
          <span key={i} className="mr-[0.28em] inline-block overflow-hidden align-top">
            <span className="chapter-word inline-block">{word}</span>
          </span>
        ))}
      </h2>
      {lede && <p className="mt-5 max-w-2xl text-lg leading-relaxed text-ink-soft">{lede}</p>}
    </div>
  );
}
