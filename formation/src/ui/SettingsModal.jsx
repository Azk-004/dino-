import { useEffect, useState } from "react";

export default function SettingsModal({ open, onClose, user, unlocked, onSignOut, tsize, onTsizeChange, dayNight, onDayNight }) {
  const [confirmSignOut, setConfirmSignOut] = useState(false);

  useEffect(() => {
    if (!open) {
      setConfirmSignOut(false);
      return;
    }
    const onKey = (e) => { if (e.key === "Escape") onClose(); };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open, onClose]);

  useEffect(() => {
    setConfirmSignOut(false);
  }, [open]);

  if (!open) return null;

  const tsizeLabels = ["Petit", "Normal", "Grand"];
  const dayNightLabels = { auto: "Automatique", day: "Jour", night: "Nuit" };

  return (
    <div className="settings-wrap show" aria-hidden={!open} onClick={(e) => { if (e.target === e.currentTarget) onClose(); }}>
      <div className="settings-panel" data-lenis-prevent>
        <button className="settings-close" aria-label="Fermer" onClick={onClose}>×</button>

        <div className="settings-kicker">Paramètres</div>
        <h2 className="settings-title">Mon espace</h2>
        <div className="settings-rule"></div>

        {/* Profil */}
        <div className="settings-section">
          <h3 className="settings-section-title">Profil</h3>
          {user ? (
            <div className="settings-profile">
              <div className="settings-avatar">
                <span>{(user.email || "?")[0].toUpperCase()}</span>
              </div>
              <div className="settings-profile-info">
                <div className="settings-profile-email">{user.email}</div>
                <div className="settings-profile-role">
                  {unlocked ? "Accès débloqué" : "Accès en attente de déblocage"}
                </div>
              </div>
            </div>
          ) : (
            <p className="settings-hint">Aucun compte connecté.</p>
          )}
        </div>

        {/* Affichage */}
        <div className="settings-section">
          <h3 className="settings-section-title">Affichage</h3>

          <div className="settings-row">
            <span className="settings-label">Taille du texte</span>
            <div className="settings-options" role="radiogroup" aria-label="Taille du texte">
              {[0, 1, 2].map((v) => (
                <button
                  key={v}
                  className={"settings-opt" + (tsize === v ? " active" : "")}
                  role="radio"
                  aria-checked={tsize === v}
                  onClick={() => onTsizeChange(v)}
                >
                  {tsizeLabels[v]}
                </button>
              ))}
            </div>
          </div>

          <div className="settings-row">
            <span className="settings-label">Mode lumière</span>
            <div className="settings-options" role="radiogroup" aria-label="Mode lumière">
              {["auto", "day", "night"].map((m) => (
                <button
                  key={m}
                  className={"settings-opt" + (dayNight.mode === m ? " active" : "")}
                  role="radio"
                  aria-checked={dayNight.mode === m}
                  onClick={() => {
                    if (m === "auto") onDayNight("auto");
                    else if (m === "day") onDayNight("day");
                    else onDayNight("night");
                  }}
                >
                  {dayNightLabels[m]}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Actions */}
        <div className="settings-section settings-actions">
          <a href="/" className="settings-link">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" width="16" height="16" aria-hidden="true">
              <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" />
              <polyline points="9 22 9 12 15 12 15 22" />
            </svg>
            Retour à l'accueil
          </a>

          {user && (
            confirmSignOut ? (
              <div className="settings-confirm">
                <span className="settings-confirm-text">Se déconnecter ?</span>
                <button className="settings-btn settings-btn-danger" onClick={onSignOut}>Oui</button>
                <button className="settings-btn" onClick={() => setConfirmSignOut(false)}>Non</button>
              </div>
            ) : (
              <button className="settings-btn settings-btn-outline" onClick={() => setConfirmSignOut(true)}>
                Se déconnecter
              </button>
            )
          )}
        </div>
      </div>
    </div>
  );
}
