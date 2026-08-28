import {
  ClipboardList,
  BookOpen,
  Video,
  Award,
  UserCheck,
  Compass,
  Leaf,
  Globe,
  Scale,
  MessageCircle,
  CarFront,
} from 'lucide-react';
import Reveal from '../../../components/ui/Reveal.jsx';
import ChapterHeading from '../../../components/ui/ChapterHeading.jsx';
import { useInscriptionModal } from '../../../contexts/InscriptionModalContext.jsx';
import { useFormationAccess } from '../../../utils/formationAccess.js';

const steps = [
  {
    icon: ClipboardList,
    title: 'Inscription',
    text: "Inscrivez-vous en ligne. Le paiement par tranches (100.000fcfa de frais d'inscription et, 50.000fcfa/mois en prépaiement sur trois mois. Pour un total de 250000fcfa/ module.)  débloque les modules au fur et à mesure.",
  },
  {
    icon: BookOpen,
    title: 'Cours',
    text: 'Accédez aux contenus : parcours 3D interactif, cours illustré et questionnaire de validation en douze points, sur la plateforme.',
  },
  {
    icon: Video,
    title: "Séance d'explication en présentiel",
    text: "Séances par visioconférence animées par le formateur, assisté - au besoin - des différents spécialistes : architecte urbaniste, paysagiste, géographe, juriste, spécialiste en communication et expert en sécurité routière.",
  },
  {
    icon: Award,
    title: 'Certificat',
    text: 'Une fois la formation validée, Panotik délivre le certificat officiel de la plateforme, attestant de votre maîtrise du module.',
  },
];

const trainers = [
  { icon: UserCheck, role: 'Spécialiste en panneautique' },
  { icon: Compass, role: 'Architecte urbaniste' },
  { icon: Leaf, role: 'Paysagiste' },
  { icon: Globe, role: 'Géographe' },
  { icon: Scale, role: 'Juriste' },
  { icon: MessageCircle, role: 'Spécialiste en communication (Master)' },
  { icon: CarFront, role: 'Expert en sécurité routière' },
];

export default function FormationProcess() {
  const { openInscriptionModal } = useInscriptionModal();
  const { openFormation } = useFormationAccess();

  return (
    <section
      id="formation"
      className="perspective-section act-scrim act-scrim--soft relative scroll-mt-16 py-24 lg:py-32"
    >
      <div className="mx-4 sm:mx-8 lg:mx-[12%]">
        <ChapterHeading
          number={5}
          total={9}
          kicker="La formation en question."
          title="De l'inscription au certificat."
          lede="La formation se déroule en quatre temps, du premier clic à la délivrance du certificat de la plateforme."
        />

        <ol className="mt-14 grid gap-5 md:grid-cols-2 lg:grid-cols-4">
          {steps.map(({ icon: Icon, title, text }, i) => (
            <Reveal key={title} as="li" delay={i * 90} variant="flip" className="list-none">
              <article className="relative flex h-full flex-col rounded-3xl border border-night-border bg-night-soft/70 p-7 backdrop-blur-sm">
                <span className="absolute right-5 top-5 font-mono text-sm font-extrabold text-primary-light">
                  {String(i + 1).padStart(2, '0')}
                </span>
                <span className="flex h-12 w-12 items-center justify-center rounded-2xl bg-primary/15 text-primary-light">
                  <Icon className="h-6 w-6" aria-hidden="true" />
                </span>
                <h3 className="mt-5 text-xl font-bold tracking-tight text-cream">{title}</h3>
                <p className="mt-3 text-base leading-relaxed text-mist/85">{text}</p>
              </article>
            </Reveal>
          ))}
        </ol>

        <Reveal delay={160} className="mt-10">
          <div className="rounded-3xl border border-primary/40 bg-night-alt/70 p-7 backdrop-blur-sm sm:p-8">
            <p className="font-mono text-sm font-bold uppercase tracking-wide text-primary-light">
              L'équipe des formateurs
            </p>
            <p className="mt-2 max-w-3xl text-base leading-relaxed text-mist/85">
              La panneautique est une science pluridisciplinaire. Sept spécialistes vous
              accompagnent, chacun dans son domaine, lors des séances en présentiel avec le
              formateur :
            </p>
            <ul className="mt-5 flex flex-wrap gap-3">
              {trainers.map(({ icon: Icon, role }) => (
                <li
                  key={role}
                  className="flex items-center gap-2.5 rounded-full border border-night-border bg-night/60 py-2 pl-3 pr-4 text-sm font-bold text-cream"
                >
                  <span className="flex h-7 w-7 items-center justify-center rounded-full bg-primary/15 text-primary-light">
                    <Icon className="h-4 w-4" aria-hidden="true" />
                  </span>
                  {role}
                </li>
              ))}
            </ul>
          </div>
        </Reveal>

        <Reveal delay={220} className="mt-10">
          <div className="flex flex-col items-center justify-center gap-4 sm:flex-row">
            <button
              type="button"
              onClick={openFormation}
              className="inline-flex w-full cursor-pointer items-center justify-center gap-2 rounded-full border border-primary/60 bg-primary/10 px-8 py-4 text-base font-bold text-primary-light transition-all duration-300 hover:-translate-y-1 hover:bg-primary/20 hover:shadow-[0_0_20px_rgba(243,207,148,0.35)] sm:w-auto"
            >
              Commencer le parcours interactif
            </button>
            <button
              type="button"
              onClick={openInscriptionModal}
              className="inline-flex w-full cursor-pointer items-center justify-center gap-2 rounded-full bg-primary px-8 py-4 text-base font-bold text-night transition-all duration-300 hover:-translate-y-1 hover:bg-glow hover:shadow-[0_0_20px_rgba(243,207,148,0.5)] sm:w-auto"
            >
              S'inscrire à la formation
            </button>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
