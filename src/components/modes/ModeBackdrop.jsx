import { useMode } from "../../context/ModeContext.jsx";
import { useTheme } from "../../context/ThemeContext.jsx";
import AtelierBackdrop from "./AtelierBackdrop.jsx";
import ArchivesBackdrop from "./ArchivesBackdrop.jsx";
import ObservatoireBackdrop from "./ObservatoireBackdrop.jsx";
import PanoramaBackdrop from "./PanoramaBackdrop.jsx";
import TerminalBackdrop from "./TerminalBackdrop.jsx";
import CarnetBackdrop from "./CarnetBackdrop.jsx";
import ImaginationBackdrop from "./ImaginationBackdrop.jsx";

/**
 * Fond d'univers plein écran, figé derrière tout le contenu.
 * Chaque mode a son illustration signature (canvas animé ou DOM/CSS).
 */
export default function ModeBackdrop() {
  const { mode, introOpen } = useMode();
  const { theme } = useTheme();

  // Pendant l'écran de choix, on masque le fond pour ne pas doubler les canvas
  if (introOpen) return null;

  return (
    <div className="mode-backdrop" aria-hidden="true" data-mode-bg={mode}>
      {mode === "archives" && <ArchivesBackdrop theme={theme} />}
      {mode === "observatoire" && <ObservatoireBackdrop theme={theme} />}
      {mode === "panorama" && <PanoramaBackdrop theme={theme} />}
      {mode === "atelier" && <AtelierBackdrop theme={theme} />}
      {mode === "terminal" && <TerminalBackdrop theme={theme} />}
      {mode === "carnet" && <CarnetBackdrop theme={theme} />}
      {mode === "imagination" && <ImaginationBackdrop theme={theme} />}
    </div>
  );
}
