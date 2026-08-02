import VillageExperience from "./VillageExperience.jsx";
import PollutionExperience from "./PollutionExperience.jsx";
import StepsExperience from "./StepsExperience.jsx";
import ControlExperience from "./ControlExperience.jsx";
import HorizonExperience from "./HorizonExperience.jsx";

/**
 * EXPÉRIENCES PAR LEÇON
 * Chaque leçon du module a SON mode de fonctionnement propre, dédié à
 * l'apprentissage — pas des blocs de texte habillés par un univers :
 *
 *   l1 · Le panneau et son importance  → Village de panneaux (scroll 3D)
 *   l2 · Constat général               → Paysage de la pollution (assainir)
 *   l3 · Les 7 étapes                  → Plateau des 7 étapes (tourniquet)
 *   l4 · Évaluation & pilotage         → Salle de contrôle (jauges + scan)
 *   l5 · Pérenniser les acquis         → Horizon urbain (timeline)
 *
 * Chaque expérience embarque le contenu réel de la leçon : l'apprenant
 * découvre la matière en agissant (scroller, cliquer, faire tourner,
 * survoler, faire défiler le temps) — l'apprentissage devient l'action.
 */

const EXPERIENCES = {
  l1: { comp: VillageExperience, tag: "VILLAGE DE PANNEAUX", hint: "SCROLL — avancez dans le village, chaque panneau est un argument" },
  l2: { comp: PollutionExperience, tag: "PAYSAGE DE LA POLLUTION", hint: "CLIQUEZ — retirez les panneaux anarchiques pour assainir la Ville" },
  l3: { comp: StepsExperience, tag: "PLATEAU DES 7 ÉTAPES", hint: "CLIQUEZ — faites tourner le plateau et ouvrez chaque étape" },
  l4: { comp: ControlExperience, tag: "SALLE DE CONTRÔLE", hint: "SURVOLEZ — les jauges s'allument sous votre curseur" },
  l5: { comp: HorizonExperience, tag: "HORIZON URBAIN", hint: "FAITES DÉFILER — suivez la Ville en phase avec l'urbanisation" },
};

export default function LessonExperience({ lessonId }) {
  const exp = EXPERIENCES[lessonId];
  if (!exp) return null;
  const Comp = exp.comp;
  return (
    <section className="lesson-experience" data-exp={lessonId} aria-label={`Expérience : ${exp.tag}`}>
      <div className="lesson-exp-head">
        <span className="lesson-exp-tag mono">EXPÉRIENCE · {exp.tag}</span>
        <span className="lesson-exp-hint mono">✦ {exp.hint}</span>
      </div>
      <div className="lesson-exp-stage">
        <Comp lessonId={lessonId} />
      </div>
    </section>
  );
}
