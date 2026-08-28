import { useEffect, useRef } from "react";
import { initTeam } from "../team.js";

// Couloir des portraits (#ui-team) : le moteur team.js construit lui-même la
// galerie dans .team-track et gère son propre Lenis + boucle d'animation.
// On monte l'instance dans teamRef pour que le contrôleur puisse naviguer.
export default function TeamOverlay({ teamRef, onExit }) {
  const cbRef = useRef({ onExit });
  cbRef.current = { onExit };

  useEffect(() => {
    if (teamRef.current) return;
    teamRef.current = initTeam({ onExit: () => cbRef.current.onExit() });
    return () => {
      teamRef.current?.close();
      teamRef.current = null;
    };
  }, [teamRef]);

  return (
    <div id="ui-team">
      <header className="team-header">
        <div className="team-header-brand">
          <span className="brand-mark"></span>
          <span>Panneautique · Domaine public - L'équipe</span>
        </div>
        <div className="team-tools">
          <div className="team-nav" role="group" aria-label="Naviguer entre les membres">
            <button id="team-prev" className="team-nav-btn" aria-label="Membre précédent" title="Membre précédent">←</button>
            <button id="team-next" className="team-nav-btn" aria-label="Membre suivant" title="Membre suivant">→</button>
          </div>
          <div id="team-count" className="team-count">L'équipe</div>
        </div>
        <button id="team-close" className="team-close">
          <span className="team-close-full">← Retour au parcours 3D</span>
          <span className="team-close-short">← Parcours 3D</span>
        </button>
      </header>
      <div id="team-scroll" data-lenis-prevent>
        <div id="team-corridor" className="team-corridor">
          <div className="team-track"></div>
        </div>
      </div>
    </div>
  );
}
