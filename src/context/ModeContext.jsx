import { createContext, useContext, useEffect, useState } from "react";
import { useLocalStorage } from "../lib/useLocalStorage.js";

/**
 * Sept univers de lecture — chacun avec SA mécanique, SA mise en scène
 * et SON langage visuel (pas un simple changement de couleur) :
 *
 *   village     → balade 3D dans un village de panneaux (scroll + voix)
 *   observatoire→ maquette isométrique de la Ville (quartiers cliquables)
 *   archives    → registre officiel du métier (dossiers, clavier ← →)
 *   panorama    → belvédère, affiche géante du belvédère (flip)
 *   terminal    → mainframe IBM, phosphore vert (impression au clavier)
 *   carnet      → planches illustrées + questions éclair (à retourner)
 *   imagination → cosmos génératif, lecture-constellation (scroll infini)
 */
export const MODES = [
  {
    id: "atelier",
    num: "01",
    name: "Le Village",
    tagline: "Village de panneaux · balade 3D",
    desc: "Un village bâti autour du cours : vous marchez dans la rue, chaque panneau des façades déroule un chapitre. Le scroll fait avancer la marche, la voix lit à voix haute.",
    interact: "SCROLL — avancez dans le village, chaque panneau est un chapitre",
    accent: "#b4552d",
    accent2: "#8a3b1e",
  },
  {
    id: "observatoire",
    num: "02",
    name: "Observatoire urbain",
    tagline: "Carte & données · maquette isométrique",
    desc: "Vue d'observatoire sur la Ville : chaque bloc du cours est un quartier cliquable posé sur la maquette. On lit le cours comme on lit une carte.",
    interact: "CLIQUEZ — ouvrez chaque quartier de la maquette et lisez le bloc",
    accent: "#5f7a5a",
    accent2: "#4a5f45",
  },
  {
    id: "archives",
    num: "03",
    name: "Archives du métier",
    tagline: "Registres & dossiers officiels",
    desc: "Comme un registre administratif : un dossier du métier s'ouvre, on le feuillette bloc par bloc, tampon de lecture. La lecture au clavier, comme un archiviste.",
    interact: "← → — feuilletez le registre, chaque dossier est un bloc",
    accent: "#7a2f33",
    accent2: "#5c2126",
  },
  {
    id: "panorama",
    num: "04",
    name: "Panorama",
    tagline: "Belvédère · affichage plein écran",
    desc: "Depuis un belvédère sur la Ville : chaque bloc devient une immense affiche visible au loin, dans le cadre. Un clic retourne mécaniquement l'affiche.",
    interact: "CLIQUEZ — le panorama bascule d'une affiche à la suivante",
    accent: "#b08d2e",
    accent2: "#8a6d1f",
  },
  {
    id: "terminal",
    num: "05",
    name: "Terminal IBM",
    tagline: "Mainframe · phosphore vert",
    desc: "Comme sur un vieux mainframe : le cours s'imprime sur un écran phosphore vert, dossier par dossier. On lit au clavier, comme un technicien qui consulte ses fichiers.",
    interact: "← → — imprimez chaque dossier du cours sur le terminal",
    accent: "#2fbf71",
    accent2: "#1a7a46",
  },
  {
    id: "carnet",
    num: "06",
    name: "Carnet illustré",
    tagline: "Planches dessinées · questions éclair",
    desc: "Un carnet d'étude illustré : chaque bloc devient une planche avec son dessin, sa note, et une question éclair à retourner pour vérifier qu'on a compris.",
    interact: "CLIQUEZ — tournez les planches et retournez la question éclair",
    accent: "#4a5cb8",
    accent2: "#313d8a",
  },
  {
    id: "imagination",
    num: "07",
    name: "Imagination",
    tagline: "Cosmos génératif · calcul infini",
    desc: "Un univers génératif infini : les idées deviennent des constellations, le texte se matérialise dans l'espace. Lecture en apesanteur, imagination illimitée.",
    interact: "SCROLL — naviguez entre les constellations du cours",
    accent: "#8b5cf6",
    accent2: "#6d28d9",
  },
];

const ModeContext = createContext(null);

export function ModeProvider({ children }) {
  const [mode, setMode] = useLocalStorage("pnt-mode", "atelier");
  // L'écran de choix des univers plein écran (intro) s'ouvre à la demande
  // (bouton "Voir les univers" du sélecteur) ou une seule fois à la 1re visite.
  const [introOpen, setIntroOpen] = useState(false);

  useEffect(() => {
    document.documentElement.dataset.mode = mode;
  }, [mode]);

  const meta = MODES.find((m) => m.id === mode) || MODES[0];

  return (
    <ModeContext.Provider value={{ mode, setMode, meta, introOpen, setIntroOpen }}>
      {children}
    </ModeContext.Provider>
  );
}

export function useMode() {
  const ctx = useContext(ModeContext);
  if (!ctx) throw new Error("useMode must be used within ModeProvider");
  return ctx;
}
