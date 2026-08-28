import { Download, Mail } from 'lucide-react';
import Reveal from '../../../components/ui/Reveal.jsx';
import { useDownloadModal } from '../../../contexts/DownloadModalContext.jsx';
import { CONTACT_MAILTO } from '../../../constants/contact.js';

export default function FinalCTA() {
  const { openDownloadModal } = useDownloadModal();

  return (
    <section id="telecharger" className="relative scroll-mt-16 py-32 lg:py-44">
      <div
        className="pointer-events-none absolute inset-x-0 top-0 z-[1] h-40 bg-gradient-to-b from-night to-transparent"
        aria-hidden="true"
      />
      <div className="relative z-10 mx-4 text-center sm:mx-8 lg:mx-[12%]">
        <Reveal variant="scale">
          <p className="chapter-kicker justify-center">
            <span className="num">08</span>
            <span>/ 09 - Le départ</span>
          </p>
          <h2 className="chapter-title text-glow mt-5 text-5xl sm:text-6xl lg:text-7xl">
            Rallumez votre <span className="text-primary">ville</span>.
          </h2>
          <p className="mx-auto mt-6 max-w-xl text-lg leading-relaxed text-ink-soft">
            Téléchargez aanid, l&apos;application de Panotik, et rejoignez: citoyens - professionnels- collectivités locales et/ou autorité(s) publique(s) intéressés par le mobilier urbain de publicité.
          </p>
          <div className="mt-10 flex flex-col items-center justify-center gap-3 sm:flex-row">
            <button
              type="button"
              onClick={openDownloadModal}
              className="inline-flex w-full cursor-pointer items-center justify-center gap-2 rounded-full bg-primary px-8 py-4 text-base font-bold text-night transition-all duration-300 hover:-translate-y-1 hover:bg-glow hover:shadow-[0_0_20px_rgba(243,207,148,0.5)] sm:w-auto"
            >
              <Download className="h-5 w-5" aria-hidden="true" />
              Télécharger l&apos;application
            </button>
            <a
              href={CONTACT_MAILTO}
              className="inline-flex w-full items-center justify-center gap-2 rounded-full border border-night-border px-8 py-4 text-base font-bold text-cream transition-colors hover:border-primary hover:text-primary-light sm:w-auto"
            >
              <Mail className="h-5 w-5" aria-hidden="true" />
              Contacter l&apos;équipe
            </a>
          </div>
          <p className="mt-6 text-sm text-ink-soft">
            Une question, un projet d&apos;étude ou une inscription à la formation ?
            Écrivez-nous, nous répondrons rapidement.
          </p>
        </Reveal>
      </div>
    </section>
  );
}
