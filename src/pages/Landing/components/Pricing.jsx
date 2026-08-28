import { BookOpen, Layers, CalendarClock, Check } from 'lucide-react';
import Reveal from '../../../components/ui/Reveal.jsx';
import ChapterHeading from '../../../components/ui/ChapterHeading.jsx';
import { useTilt } from '../../../hooks/useTilt.js';
import { useInscriptionModal } from '../../../contexts/InscriptionModalContext.jsx';

// Tarification réelle de la formation phare (formationsCatalog.js) :
// paiement par tranches, chaque tranche débloque les modules correspondants.
const tranches = [
  {
    icon: BookOpen,
    label: 'Inscription - accès au Module 1',
    amount: '100 000',
    detail:
      "Panneautique : domaine public. Introduction, réorganisation du secteur (audit, état des lieux, zonage), mise en concession, évaluation des supports et questionnaires.",
  },
  {
    icon: Layers,
    label: 'Accès au Module 2',
    amount: '100 000',
    detail:
      "Panneautique : approfondissement et notions sur la gestion des enseignes, plaques et directionnelles.",
  },
  {
    icon: CalendarClock,
    label: 'Mensualité',
    amount: '50 000',
    suffix: '/mois sur trois mois en prépayés',
    detail:
      "Donnant accès aux cours en présentiel avec le formateur et les différents Experts-Consultants.",
  },
];

const included = [
  'Modules débloqués au fur et à mesure des paiements',
  'Paiement de chaque tranche via Mobile Money (KKiaPay)',
  'Suivi de progression, badges et certificat',
  "Accessible directement depuis l'application",
];

function TrancheCard({ icon: Icon, label, amount, suffix, detail, index }) {
  const tiltRef = useTilt(6);
  return (
    <div
      ref={tiltRef}
      className="tilt-card relative flex h-full flex-col rounded-3xl border border-night-border bg-night-soft/70 p-6 backdrop-blur-sm"
    >
      <span className="absolute right-5 top-5 font-mono text-sm font-extrabold text-primary-light">
        {String(index + 1).padStart(2, '0')}
      </span>
      <span className="inline-flex h-12 w-12 items-center justify-center rounded-2xl bg-primary/15 text-primary-light">
        <Icon className="h-6 w-6" aria-hidden="true" />
      </span>
      <h3 className="mt-4 font-bold text-cream">{label}</h3>
      <p className="mt-2">
        <span className="font-mono text-2xl font-extrabold tabular-nums text-glow">{amount}</span>
        <span className="text-sm font-bold text-cream"> FCFA</span>
        {suffix && <span className="text-sm text-mist/70">{suffix}</span>}
      </p>
      <p className="mt-2 text-sm leading-relaxed text-mist/85">{detail}</p>
    </div>
  );
}

export default function Pricing() {
  const { openInscriptionModal } = useInscriptionModal();

  return (
    <section
      id="tarifs"
      className="perspective-section act-scrim act-scrim--soft relative scroll-mt-16 py-24 lg:py-32"
    >
      <div className="mx-4 sm:mx-8 lg:mx-[12%]">
        <ChapterHeading
          number={4}
          total={9}
          kicker="L'investissement"
          title="Une formation qui se débloque, à l'instar d'une Ville qui s'illumine."
          lede={
            <>
              La formation officielle, sur la panneautique, est payable par tranche.
              <br />
              Un coût total de{' '}
              <span className="font-bold text-cream">500 000 FCFA</span> pour l&apos;ensemble du
              parcours qui comprend les Modules 1&amp;2.
            </>
          }
        />

        <div className="mt-14">
          <ol className="grid gap-5 md:grid-cols-3">
            {tranches.map((tranche, i) => (
              <Reveal key={tranche.label} as="li" delay={i * 100} variant="flip" className="list-none">
                <TrancheCard {...tranche} index={i} />
              </Reveal>
            ))}
          </ol>

          <Reveal delay={200} variant="scale" className="mt-6">
            <div className="flex flex-col gap-6 rounded-3xl border-2 border-primary/60 bg-night-alt/80 p-6 backdrop-blur-sm sm:p-8 md:flex-row md:items-center md:justify-between">
              <div>
                <p className="font-mono text-sm font-bold uppercase tracking-wide text-primary-light">
                  Formation complète
                </p>
                <p className="mt-1">
                  <span className="font-mono text-4xl font-extrabold tabular-nums text-glow">500 000</span>
                  <span className="text-base font-bold text-cream"> FCFA</span>
                  <span className="text-sm text-mist/70"> au total</span>
                </p>
                <ul className="mt-4 space-y-2">
                  {included.map((item) => (
                    <li key={item} className="flex items-start gap-2.5 text-sm text-mist/85">
                      <span className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-success/20">
                        <Check className="h-3 w-3 text-success" aria-hidden="true" />
                      </span>
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
              <button
                type="button"
                onClick={openInscriptionModal}
                className="inline-flex shrink-0 cursor-pointer items-center justify-center rounded-full bg-primary px-8 py-4 text-base font-bold text-night transition-all duration-300 hover:-translate-y-1 hover:bg-glow hover:shadow-[0_0_20px_rgba(243,207,148,0.5)]"
              >
                S&apos;inscrire à la formation
              </button>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
