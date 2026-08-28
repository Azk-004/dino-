import { TriangleAlert, Megaphone, MessagesSquare } from 'lucide-react';
import Reveal from '../../../components/ui/Reveal.jsx';
import ChapterHeading from '../../../components/ui/ChapterHeading.jsx';

const axes = [
  {
    icon: TriangleAlert,
    number: '1',
    title: 'Alert',
    text: "Renseigne sur l'état des lieux dans le secteur d'exploitation des panneaux publicitaires.",
  },
  {
    icon: Megaphone,
    number: '2',
    title: 'PlayOut',
    text: "Amplifie la portée des campagnes faites sur mobilier urbain de publicité, grâce aux relais d'affichages publicitaires.",
  },
  {
    icon: MessagesSquare,
    number: '3',
    title: 'InterAct',
    text: "Pour des contenus strictement sociaux.",
  },
];

export default function AanidIntro() {
  return (
    <section
      id="aanid"
      className="perspective-section act-scrim act-scrim--soft relative scroll-mt-16 py-24 lg:py-40"
    >
      <div className="mx-4 sm:mx-8 lg:mx-[12%]">
        <ChapterHeading
          number={2}
          total={9}
          kicker="aanid"
          title="Plateforme & Transformation Urbaine"
          lede="aanid est une plateforme qui allie trois fonctions distinctes - Alert, PlayOut et InterAct - pour impacter positivement et durablement l'activité d'exploitation de mobilier urbain de publicité en Afrique et au-delà."
        />

        <Reveal className="mt-10">
          <p className="max-w-3xl text-lg leading-relaxed text-ink-soft">
            Ces trois interfaces forment un écosystème :
            Alert renseigne sur l'état des lieux dans le secteur d'exploitation des panneaux publicitaires,
            PlayOut amplifie la portée des campagnes faites sur mobilier urbain de publicité, grâce aux relais d'affichages publicitaires,
            et InterAct pour des contenus strictement sociaux.
          </p>
        </Reveal>

        <div className="mt-10 grid gap-5 md:grid-cols-3">
          {axes.map(({ icon: Icon, number, title, text }, i) => (
            <Reveal key={title} delay={i * 90} variant="scale">
              <article className="flex h-full flex-col rounded-3xl border border-night-border bg-night-soft/70 p-7 backdrop-blur-sm">
                <div className="mb-5 flex items-center justify-between">
                  <span className="flex h-12 w-12 items-center justify-center rounded-2xl bg-primary/15 text-primary-light">
                    <Icon className="h-6 w-6" aria-hidden="true" />
                  </span>
                  <span className="font-mono text-2xl font-extrabold text-mist/20">{number}/</span>
                </div>
                <h3 className="text-xl font-bold tracking-tight text-cream">{title}</h3>
                <p className="mt-3 text-base leading-relaxed text-mist/85">{text}</p>
              </article>
            </Reveal>
          ))}
        </div>

        <Reveal delay={200} className="mt-12">
          <p className="max-w-3xl text-lg leading-relaxed text-ink-soft">
            Alert, PlayOut et InterAct sont des fonctionnalités propres de aanid, uniquement
            accessibles via l&apos;application. Elles représentent une solution innovante aux défis
            de développement et de rayonnement du secteur de l&apos;affichage sur mobilier urbain de
            publicité - d&apos;assainissement et d&apos;embellissement du cadre de vie des populations.
          </p>
        </Reveal>
      </div>
    </section>
  );
}
