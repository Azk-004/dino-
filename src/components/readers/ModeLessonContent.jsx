import { useMode } from "../../context/ModeContext.jsx";
import AtelierReader from "./AtelierReader.jsx";
import ObservatoireReader from "./ObservatoireReader.jsx";
import ArchivesReader from "./ArchivesReader.jsx";
import PanoramaReader from "./PanoramaReader.jsx";
import TerminalReader from "./TerminalReader.jsx";
import CarnetReader from "./CarnetReader.jsx";
import ImaginationReader from "./ImaginationReader.jsx";

/**
 * MODE-LESSON : le contenu du cours est LU à travers le mode actif.
 * Chaque univers a sa propre expérience de lecture, sa mécanique, son design :
 *
 *   atelier     → balade 3D dans un village de panneaux (scroll + voix)
 *   archives    → lecture en registre officiel (dossier à la fois, clavier)
 *   observatoire→ lecture sur maquette de la Ville (plateau, quartiers cliquables)
 *   panorama    → lecture depuis un belvédère (affiche géante, flip mécanique)
 *   terminal    → lecture sur mainframe IBM (impression phosphore, clavier)
 *   carnet      → lecture en planches illustrées (dessin + question éclair)
 *   imagination → lecture-constellation dans un cosmos génératif (scroll infini)
 */
export default function ModeLessonContent({ lesson, lessonRanges, speakingIdx, onMarkClick }) {
  const { mode } = useMode();
  const blocks = lesson.content;

  const rangesFor = (i) => lessonRanges.filter((r) => r.blockIndex === i);
  const props = { blocks, rangesFor, speakingIdx, onMarkClick };

  let Reader = AtelierReader;
  if (mode === "archives") Reader = ArchivesReader;
  else if (mode === "observatoire") Reader = ObservatoireReader;
  else if (mode === "panorama") Reader = PanoramaReader;
  else if (mode === "terminal") Reader = TerminalReader;
  else if (mode === "carnet") Reader = CarnetReader;
  else if (mode === "imagination") Reader = ImaginationReader;

  return (
    <div className="mode-lesson" data-mode-reader={mode}>
      {/* key={lesson.id} : remonte le lecteur à zéro quand on change de leçon,
          sinon les indices actifs (active/idx/cur) restent hors bornes */}
      <Reader key={lesson.id} {...props} />
    </div>
  );
}
