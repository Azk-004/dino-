import { Building2, Users, LineChart } from 'lucide-react';
import Reveal from '../../../components/ui/Reveal.jsx';
import ChapterHeading from '../../../components/ui/ChapterHeading.jsx';

const pillars = [
  {
    icon: Building2,
    title: 'Un hub par ville',
    text: "Chaque ville dispose de son espace : relais publicitaire, formations, état des lieux et fil social. Sélectionnez votre ville et accédez à tout, sans vous déconnecter.",
  },
  {
    icon: Users,
    title: 'Une communauté connectée',
    text: "Citoyens, professionnels, régies publicitaires, formateurs et autorités locales collaborent sur une même plateforme. Chacun dans son rôle, avec ses outils.",
  },
  {
    icon: LineChart,
    title: 'Des données exploitables',
    text: "Cartographie, statistiques et études sur mesure : aanid transforme les signalements de terrain en analyses utiles pour moderniser la panneautique.",
  },
];

function PillarCard({ icon: Icon, title, text, index }) {
  return (
    <article className="flex flex-col md:flex-row items-center gap-8 md:gap-16 rounded-[2.5rem] border border-night-border bg-night-soft/80 p-8 md:p-14 backdrop-blur-2xl shadow-2xl shadow-black/80 transition-transform duration-500">
      <div className="flex-1">
        <div className="mb-6 flex items-center gap-4">
          <span className="flex h-16 w-16 items-center justify-center rounded-3xl bg-primary/15 text-primary-light shadow-[0_0_30px_rgba(193,154,107,0.15)]">
            <Icon className="h-8 w-8" aria-hidden="true" />
          </span>
          <span className="font-mono text-2xl font-bold text-mist/20">0{index + 1}</span>
        </div>
        <h3 className="text-3xl md:text-4xl font-extrabold text-cream mb-5 tracking-tight">{title}</h3>
        <p className="text-lg md:text-xl leading-relaxed text-mist/85">{text}</p>
      </div>
      <div className="hidden md:flex flex-1 justify-center relative items-center">
        {/* Abstract glowing orb representing the feature */}
        <div className="absolute inset-0 bg-primary/20 blur-[100px] rounded-full scale-150"></div>
        <div className="relative h-64 w-64 rounded-[3rem] border border-primary/20 flex items-center justify-center bg-gradient-to-br from-night-alt/80 to-transparent backdrop-blur-md shadow-inner">
           <Icon className="h-24 w-24 text-primary/40" strokeWidth={1} />
        </div>
      </div>
    </article>
  );
}

export default function Presentation() {
  return (
    <section
      id="presentation"
      className="perspective-section act-scrim act-scrim--soft relative py-24 lg:py-40"
    >
      <div className="mx-4 sm:mx-8 lg:mx-[12%]">
        <ChapterHeading
          number={1}
          total={9}
          kicker="Le constat"
          title="La panneautique urbaine se dégrade au vu de tous."
          lede="aanid est la plateforme de Panotik dédiée à la gestion urbaine, la formation professionnelle et l'optimisation de l'exploitation du mobilier urbain de publicité en Afrique et au-delà - afin que chaque Ville sache ce qu'elle possède, l'entretienne et le rentabilise."
        />

        <div className="mt-20 flex flex-col pb-32">
          {pillars.map(({ icon, title, text }, i) => (
            <div
              key={title}
              className="sticky transition-all duration-500"
              style={{
                top: `${120 + i * 60}px`, // Un peu plus d'espace pour voir l'en-tête de la carte précédente
                zIndex: i,
                marginBottom: i === pillars.length - 1 ? '10vh' : '90vh', // Plus d'espace de scroll pour lire tranquillement
              }}
            >
              <Reveal delay={0} variant="scale">
                <PillarCard icon={icon} title={title} text={text} index={i} />
              </Reveal>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
