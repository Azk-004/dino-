import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import {
  Building2,
  Megaphone,
  GraduationCap,
  ClipboardList,
  MessagesSquare,
  Briefcase,
  Map,
  ShieldCheck,
  ArrowRight,
} from 'lucide-react';
import ChapterHeading from '../../../components/ui/ChapterHeading.jsx';
import { useTilt } from '../../../hooks/useTilt.js';

gsap.registerPlugin(ScrollTrigger);

const features = [
  {
    icon: Building2,
    title: 'Villes - le hub central',
    text: "Choisissez une ville et retrouvez ses 4 rubriques : relais, formations, état des lieux et posts.",
  },
  {
    icon: Megaphone,
    title: 'PlayOut',
    text: "Relaie les campagnes d'affichages publicitaires sur mobilier urbain et permet aux utilisateurs d'échanger les publicités issues de ces campagnes - un réseau social structuré autour de l'affichage publicitaire urbain. Un partenaire stratégique des régies publicitaires.",
  },
  {
    icon: GraduationCap,
    title: 'Formation',
    text: "Introduction : La panneautique est une science pluridisciplinaire. En tant que telle, elle requiert plusieurs compétences pour sa réussite, à savoir : un spécialiste en panneautique, un architecte urbaniste, un paysagiste, un géographe, un juriste, un spécialiste en communication (Master) et un expert en sécurité routière. L'étudiant en panneautique bénéficiera donc, au cours de sa formation, des interventions - à titre de consultants - des experts dans chacun des domaines sus-cités lors des séances en présentiel avec le formateur, pour une formation aboutie.",
  },
  {
    icon: ClipboardList,
    title: 'Alert',
    text: "Le signalement citoyen : renseigne par signalement sur l'aménagement en panneaux publicitaires et l'état des supports. Face aux difficultés d'un état des lieux de l'aménagement existant, nous suggérons, au lieu d'un état des lieux de terrain, de partir d'indicateurs de développement dans le secteur : le système signalera l'absence de supports modernes (à affichage piloté à distance et numériques) et l'utilisateur saura si sa ville est en retard de développement dans le secteur d'exploitation des panneaux publicitaires. Il restera les cas de pléthore, de pollution visuelle et de dégradation des supports existants, fournis par nos points focaux.",
  },
  {
    icon: Map,
    title: 'Carte interactive',
    text: "Visualisez panneaux, signalements et zones sur une carte avec clustering et heatmap. Filtrez par ville, type, état ou date.",
  },
  {
    icon: MessagesSquare,
    title: 'InterAct',
    text: "Post de photos, vidéos et textes. Un fil social.",
  },
  {
    icon: Briefcase,
    title: 'Consultation',
    text: "Commandez une étude sur la panneautique de votre ville : cartographie, conformité, étude de marché, réformes du secteur.",
    href: '#consultation',
  },
  {
    icon: ShieldCheck,
    title: 'Comptes & rôles',
    text: "Inscription sécurisée avec vérification email. Des profils adaptés, du citoyen à l'administrateur.",
  },
];

function FeatureCard({ icon: Icon, title, text, index, href }) {
  const tiltRef = useTilt(5);
  
  // Use a different accent color based on index for variety
  const accents = [
    'rgba(193,154,107,', // primary
    'rgba(156,124,79,', // darker gold
    'rgba(217,194,160,', // light mist/gold
    'rgba(217,164,65,', // bright gold
  ];
  const accent = accents[index % accents.length];

  return (
    <article
      ref={tiltRef}
      className="group tilt-card relative flex h-[480px] w-[340px] shrink-0 flex-col overflow-hidden rounded-[2rem] border border-night-border bg-night-soft/60 p-8 backdrop-blur-xl sm:w-[420px] transition-all duration-700 hover:border-primary/40 hover:shadow-[0_0_50px_rgba(193,154,107,0.1)]"
    >
      {/* Spotlight glow effect on hover */}
      <div 
        className="absolute inset-0 opacity-0 transition-opacity duration-700 group-hover:opacity-100"
        style={{
          background: `radial-gradient(circle at 80% 20%, ${accent}0.15) 0%, transparent 60%)`
        }}
      />
      
      {/* Top section with Icon and Number */}
      <div className="mb-8 flex items-center justify-between shrink-0 relative z-10">
        <div className="relative">
          <div className="absolute inset-0 animate-pulse rounded-2xl bg-primary/20 blur-md" />
          <span className="relative flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-to-br from-primary/30 to-primary/5 text-primary-light border border-primary/20 shadow-lg">
            <Icon className="h-7 w-7" aria-hidden="true" />
          </span>
        </div>
        <span className="font-mono text-4xl font-extrabold text-mist/10 drop-shadow-sm transition-colors duration-500 group-hover:text-mist/20">
          {String(index + 1).padStart(2, '0')}
        </span>
      </div>

      {/* Content */}
      <h3 className="text-2xl font-bold text-cream shrink-0 mb-4 tracking-tight relative z-10">
        {title}
      </h3>
      <div className="mt-2 flex-1 overflow-y-auto pr-3 custom-scrollbar relative z-10">
        <p className="text-base leading-relaxed text-mist/80 whitespace-pre-wrap font-medium">
          {text}
        </p>
      </div>

      {/* Decorative line at the bottom */}
      <div className="absolute bottom-0 left-0 h-1 w-0 bg-gradient-to-r from-primary to-transparent transition-all duration-700 group-hover:w-full" />

      {href && (
        <a
          href={href}
          className="relative z-10 mt-4 inline-flex items-center justify-center gap-2 rounded-full border border-primary/60 bg-primary/10 px-5 py-2.5 text-sm font-bold text-primary-light transition-all duration-300 hover:-translate-y-0.5 hover:bg-primary/20"
        >
          En savoir plus
          <ArrowRight className="h-4 w-4" aria-hidden="true" />
        </a>
      )}
    </article>
  );
}

export default function Features() {
  const wrapperRef = useRef(null);
  const trackRef = useRef(null);

  useEffect(() => {
    const wrapper = wrapperRef.current;
    const track = trackRef.current;
    if (!wrapper || !track) return undefined;

    const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReduced) return undefined;

    const mm = gsap.matchMedia();

    mm.add('(min-width: 1024px)', () => {
      const getScrollAmount = () => track.scrollWidth - wrapper.offsetWidth;

      const tween = gsap.to(track, {
        x: () => -getScrollAmount(),
        ease: 'none',
        scrollTrigger: {
          trigger: wrapper,
          start: 'top top',
          end: () => `+=${getScrollAmount()}`,
          scrub: 1,
          pin: true,
          anticipatePin: 1,
          invalidateOnRefresh: true,
        },
      });

      return () => {
        tween.scrollTrigger?.kill();
        tween.kill();
      };
    });

    return () => mm.revert();
  }, []);

  return (
    <section id="fonctionnalites" className="act-scrim act-scrim--soft relative scroll-mt-16">
      <div className="mx-4 pt-24 sm:mx-8 lg:mx-[12%] lg:pt-32">
        <ChapterHeading
          number={3}
          total={9}
          kicker="Fonctionnalités"
          title="Huit outils, un seul boulevard."
          lede="Du signalement citoyen à l'étude commandée par l'autorité publique ou le privé - faites défiler pour parcourir chaque support de mobilier urbain de publicité."
        />
      </div>

      {/* Desktop : piste défilant horizontalement, épinglée pendant le scroll vertical */}
      <div ref={wrapperRef} className="relative mt-14 hidden h-screen overflow-hidden lg:block">
        <div
          ref={trackRef}
          className="hscroll-track flex h-full items-center gap-6 pl-[12%] pr-[20%]"
        >
          {features.map((feature, i) => (
            <FeatureCard key={feature.title} {...feature} index={i} />
          ))}
        </div>
      </div>

      {/* Mobile / tablette : défilement horizontal natif avec snap */}
      <div className="mt-10 flex snap-x snap-mandatory gap-4 overflow-x-auto px-4 pb-10 lg:hidden">
        {features.map((feature, i) => (
          <div key={feature.title} className="snap-center">
            <FeatureCard {...feature} index={i} />
          </div>
        ))}
      </div>
    </section>
  );
}
