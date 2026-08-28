import { User, Briefcase, Building, GraduationCap, Landmark, Megaphone } from 'lucide-react';
import Reveal from '../../../components/ui/Reveal.jsx';
import ChapterHeading from '../../../components/ui/ChapterHeading.jsx';

const audiences = [
  {
    icon: User,
    title: 'Citoyens',
    text: "Signalez les panneaux dégradés de votre quartier, suivez la vie de votre ville et accédez aux formations gratuites.",
    colSpan: 'lg:col-span-2',
    bgGradient: 'from-primary/10 to-transparent'
  },
  {
    icon: Briefcase,
    title: 'Professionnels',
    text: "Décrochez des missions de relais publicitaire rémunérées et développez vos compétences avec des certifications.",
    colSpan: 'lg:col-span-1',
    bgGradient: 'from-mist/5 to-transparent'
  },
  {
    icon: Megaphone,
    title: 'Annonceurs',
    text: "Annoncez en priorisant notre réseau de relais d'affichages publicitaires et bénéficiez d'une amplification de la portée de vos campagnes.",
    colSpan: 'lg:col-span-1',
    bgGradient: 'from-mist/5 to-transparent'
  },
  {
    icon: Building,
    title: 'Régies publicitaires',
    text: "Gérez votre inventaire en supports, analysez vos campagnes et pilotez votre activité via l'accès API administrateur complet et sécurisé.\n\nFaites gagner à vos annonceurs la visibilité d'une portée qui va au-delà de l'affichage urbain!",
    colSpan: 'lg:col-span-2',
    bgGradient: 'from-primary/10 to-transparent'
  },
  {
    icon: GraduationCap,
    title: 'Formateurs',
    text: "Créez et monétisez vos formations en signalétique, environnement, santé ou infrastructure.",
    colSpan: 'lg:col-span-1',
    bgGradient: 'from-success/10 to-transparent'
  },
  {
    icon: Landmark,
    title: 'Autorités & collectivités',
    text: "Surveillez les signalements, accédez aux statistiques de votre territoire et commandez des études pour un rayonnement du secteur d'exploitation de mobilier urbain de publicité chez vous.",
    colSpan: 'lg:col-span-3',
    bgGradient: 'from-primary/20 to-transparent'
  },
];

function AudienceCard({ icon: Icon, title, text, colSpan, bgGradient }) {
  return (
    <article
      className={`group relative flex h-full flex-col justify-between overflow-hidden rounded-3xl border border-night-border bg-night-soft/70 p-8 backdrop-blur-sm transition-all duration-500 hover:-translate-y-1 hover:border-primary/50 hover:shadow-[0_10px_40px_rgba(193,154,107,0.15)] ${colSpan}`}
    >
      <div className={`absolute inset-0 bg-gradient-to-br ${bgGradient} opacity-0 transition-opacity duration-500 group-hover:opacity-100`}></div>
      <div className="relative z-10">
        <span className="mb-6 flex h-14 w-14 items-center justify-center rounded-2xl bg-primary/15 text-primary-light transition-transform duration-500 group-hover:scale-110 group-hover:bg-primary/25">
          <Icon className="h-7 w-7" aria-hidden="true" />
        </span>
        <h3 className="text-xl font-bold text-cream">{title}</h3>
        <p className="mt-3 text-base leading-relaxed text-mist/85 whitespace-pre-line">{text}</p>
      </div>
    </article>
  );
}

export default function Audiences() {
  return (
    <section
      id="publics"
      className="perspective-section act-scrim act-scrim--soft relative scroll-mt-16 py-24 lg:py-32"
    >
      <div className="mx-4 sm:mx-8 lg:mx-[12%]">
        <ChapterHeading
          number={7}
          total={9}
          kicker="Le public"
          title="Six rôles, une même rue éclairée."
          lede="aanid réunit tous les acteurs de la panneautique urbaine autour d'outils appropriés."
        />

        <div className="mt-16 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {audiences.map((aud, i) => (
            <Reveal key={aud.title} delay={i * 80} variant="scale" className={aud.colSpan}>
              <AudienceCard {...aud} />
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
