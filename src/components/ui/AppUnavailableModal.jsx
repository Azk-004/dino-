import { useEffect } from 'react';
import { X } from 'lucide-react';

export default function AppUnavailableModal({ open, onClose }) {
  useEffect(() => {
    if (!open) return undefined;

    const onKeyDown = (event) => {
      if (event.key === 'Escape') onClose();
    };

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    document.addEventListener('keydown', onKeyDown);

    return () => {
      document.body.style.overflow = previousOverflow;
      document.removeEventListener('keydown', onKeyDown);
    };
  }, [open, onClose]);

  if (!open) return null;

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4" role="presentation">
      <button
        type="button"
        className="absolute inset-0 cursor-default bg-black/60 backdrop-blur-sm"
        aria-label="Fermer la fenêtre"
        onClick={onClose}
      />
      <div
        role="dialog"
        aria-modal="true"
        aria-labelledby="app-unavailable-title"
        className="relative z-10 w-full max-w-md rounded-3xl border border-night-border bg-night-soft p-8 shadow-[0_24px_60px_rgba(0,0,0,0.55)]"
      >
        <button
          type="button"
          className="absolute right-4 top-4 flex h-10 w-10 items-center justify-center rounded-full text-mist transition-colors hover:bg-white/10 hover:text-cream"
          onClick={onClose}
          aria-label="Fermer"
        >
          <X className="h-5 w-5" aria-hidden="true" />
        </button>

        <p className="font-mono text-xs font-bold uppercase tracking-widest text-primary-light">
          aanid - application indépendante
        </p>
        <h2 id="app-unavailable-title" className="mt-3 text-2xl font-extrabold tracking-tight text-cream">
          Application pas encore disponible
        </h2>
        <p className="mt-4 text-base leading-relaxed text-mist/90">
          aanid est une application à part entière, libre et indépendante de ce site.
          Dès sa sortie, elle sera téléchargeable directement depuis les magasins
          d&apos;applications. Alert, PlayOut et InterAct - ses trois fonctions - sont
          uniquement accessibles à l&apos;intérieur de l&apos;application aanid.
        </p>
        <p className="mt-3 text-sm leading-relaxed text-mist/70">
          L&apos;application n&apos;est pas encore disponible au téléchargement. Revenez
          bientôt - ou contactez-nous pour être informé du lancement.
        </p>
        <button
          type="button"
          onClick={onClose}
          className="mt-8 inline-flex w-full items-center justify-center rounded-full bg-primary px-6 py-3.5 text-base font-bold text-night transition-colors hover:bg-glow"
        >
          Compris
        </button>
      </div>
    </div>
  );
}
