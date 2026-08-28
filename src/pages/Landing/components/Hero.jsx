import { useEffect, useRef } from 'react';
import { Download, ArrowRight, MapPin, Megaphone, GraduationCap } from 'lucide-react';
import gsap from 'gsap';
import { useDownloadModal } from '../../../contexts/DownloadModalContext.jsx';
import { useFormationAccess } from '../../../utils/formationAccess.js';

export default function Hero() {
  const scopeRef = useRef(null);
  const statsRef = useRef([]);
  const { openDownloadModal } = useDownloadModal();
  const { openFormation } = useFormationAccess();

  useEffect(() => {
    const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const ctx = gsap.context(() => {
      if (prefersReduced) {
        gsap.set('.hero-enter', { opacity: 1, y: 0 });
        return;
      }
      gsap.set('.hero-enter', { opacity: 0, y: 34, filter: 'blur(6px)' });
      gsap.to('.hero-enter', {
        opacity: 1,
        y: 0,
        filter: 'blur(0px)',
        duration: 1.1,
        ease: 'power3.out',
        stagger: 0.11,
        delay: 0.15,
      });

      statsRef.current.forEach((el, index) => {
        if (!el) return;
        const targetVal = [128, 9, 24][index];
        gsap.to(el, {
          innerHTML: targetVal,
          duration: 2.5,
          snap: { innerHTML: 1 },
          ease: 'power2.out',
          delay: 0.8 + index * 0.1,
        });
      });
    }, scopeRef);
    return () => ctx.revert();
  }, []);

  return (
    <section
      id="hero"
      ref={scopeRef}
      className="relative flex min-h-[100dvh] items-center overflow-hidden"
    >
      <div className="relative z-10 mx-auto flex w-full max-w-5xl flex-col items-center px-4 py-28 text-center sm:px-8 lg:py-36">
        <p className="hero-enter chapter-kicker justify-center">
          <span className="num">00</span>
          <span>/ 09 - Ouverture</span>
        </p>

        <h1 className="hero-enter chapter-title text-glow mt-5 text-6xl sm:text-7xl lg:text-8xl">
          La nuit,
          <br />
          vos panneaux <span className="text-primary">s&apos;éteignent.</span>
        </h1>

        <p className="hero-enter mt-8 max-w-xl text-lg leading-relaxed text-ink-soft sm:text-xl">
          <span className="font-bold text-cream">aanid</span>, l&apos;application de Panotik, rallume
          la panneautique urbaine : signalement, cartographie et valorisation des panneaux
          publicitaires, pour les citoyens comme pour les autorités.
        </p>

        <div className="hero-enter mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row">
          <button
            type="button"
            onClick={openDownloadModal}
            className="inline-flex w-full cursor-pointer items-center justify-center gap-2 rounded-full bg-primary px-8 py-4 text-base font-bold text-night transition-all duration-300 hover:-translate-y-1 hover:bg-glow hover:shadow-[0_0_20px_rgba(243,207,148,0.5)] sm:w-auto"
          >
            <Download className="h-5 w-5" aria-hidden="true" />
            Télécharger aanid
          </button>
          <a
            href="#presentation"
            className="inline-flex w-full items-center justify-center gap-2 rounded-full border border-night-border px-8 py-4 text-base font-bold text-cream transition-all duration-300 hover:border-primary hover:bg-primary/5 hover:text-primary-light sm:w-auto"
          >
            Découvrir l&apos;histoire
            <ArrowRight className="h-5 w-5" aria-hidden="true" />
          </a>
          <button
            type="button"
            onClick={openFormation}
            className="inline-flex w-full cursor-pointer items-center justify-center gap-2 rounded-full border border-primary/60 bg-primary/10 px-8 py-4 text-base font-bold text-primary-light transition-all duration-300 hover:-translate-y-1 hover:bg-primary/20 hover:shadow-[0_0_20px_rgba(243,207,148,0.35)] sm:w-auto"
          >
            <GraduationCap className="h-5 w-5" aria-hidden="true" />
            Commencer la formation
          </button>
        </div>

        <div className="hero-enter mt-16 flex w-full max-w-3xl flex-col justify-between gap-6 rounded-3xl border border-night-border bg-night-soft/40 p-6 backdrop-blur-md md:flex-row md:items-center">
          <div className="flex flex-col items-center gap-2 md:items-start">
            <span className="flex h-12 w-12 items-center justify-center rounded-2xl bg-primary/15 text-primary-light">
              <MapPin className="h-6 w-6" />
            </span>
            <p className="text-sm text-cream">
              <span
                ref={(el) => (statsRef.current[0] = el)}
                className="font-mono text-xl font-bold text-primary-light"
              >
                0
              </span>
              <br />
              <span className="text-ink-soft">panneaux</span>
            </p>
          </div>
          <div className="hidden h-12 w-px bg-night-border md:block" />
          <div className="flex flex-col items-center gap-2 md:items-start">
            <span className="flex h-12 w-12 items-center justify-center rounded-2xl bg-primary/15 text-primary-light">
              <Megaphone className="h-6 w-6" />
            </span>
            <p className="text-sm text-cream">
              <span
                ref={(el) => (statsRef.current[1] = el)}
                className="font-mono text-xl font-bold text-primary-light"
              >
                0
              </span>
              <br />
              <span className="text-ink-soft">opportunités</span>
            </p>
          </div>
          <div className="hidden h-12 w-px bg-night-border md:block" />
          <div className="flex flex-col items-center gap-2 md:items-start">
            <span className="flex h-12 w-12 items-center justify-center rounded-2xl bg-primary/15 text-primary-light">
              <GraduationCap className="h-6 w-6" />
            </span>
            <p className="text-sm text-cream">
              <span
                ref={(el) => (statsRef.current[2] = el)}
                className="font-mono text-xl font-bold text-primary-light"
              >
                0
              </span>
              <br />
              <span className="text-ink-soft">formations</span>
            </p>
          </div>
        </div>
      </div>

      <div
        className="pointer-events-none absolute inset-x-0 bottom-0 z-[1] h-40 bg-gradient-to-b from-transparent to-night"
        aria-hidden="true"
      />
    </section>
  );
}
