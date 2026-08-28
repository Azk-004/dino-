import { STATIONS } from "../data.js";
import Quiz from "./Quiz.jsx";

const AUTO_ICON = (
  <svg className="dn-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" aria-hidden="true">
    <circle cx="12" cy="12" r="8.5" />
    <path d="M12 7v5l3.4 2" />
  </svg>
);
const SUN_ICON = (
  <svg className="dn-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" aria-hidden="true">
    <circle cx="12" cy="12" r="4.5" />
    <path d="M12 2.5v2.2M12 19.3v2.2M2.5 12h2.2M19.3 12h2.2M5.2 5.2l1.6 1.6M17.2 17.2l1.6 1.6M18.8 5.2l-1.6 1.6M6.8 17.2l-1.6 1.6" />
  </svg>
);
const MOON_ICON = (
  <svg className="dn-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" aria-hidden="true">
    <path d="M21 12.8A9 9 0 1 1 11.2 3a7 7 0 0 0 9.8 9.8Z" />
  </svg>
);
const DAYNIGHT_ICON = { auto: AUTO_ICON, day: SUN_ICON, night: MOON_ICON };

export default function JourneyUI(props) {
  const {
    mode,
    onMode,
    topbarVisible,
    chapter,
    dayNight,
    onDayNight,
    user,
    onAuthOpen,
    onSettingsOpen,
    onContactOpen,
    activeIndex,
    onDotClick,
    clickHint,
    titleHidden,
    card,
    panelFocus,
    onCardOpen,
    quizShown,
    quizShownRef,
    quizAccessGranted,
    quizOpenAuth,
    quizOnReady,
    quizOnValidated,
    quizOnRestart,
    tsize,
    onTsizeChange,
  } = props;

  return (
    <div id="ui">
      <div id="ui-topbar" className={topbarVisible ? "visible" : ""}>
        <a href="/" id="ui-home" className="mode-btn home-btn" title="Retour à l'accueil">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" width="16" height="16" aria-hidden="true">
            <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" />
            <polyline points="9 22 9 12 15 12 15 22" />
          </svg>
          <span className="home-label">Accueil</span>
        </a>
        <div id="ui-brand">
          <span className="brand-mark"></span>
          <span id="ui-brand-text">Panneautique&nbsp;·&nbsp;Domaine public</span>
        </div>
        <div id="ui-chapter">{chapter}</div>
        <div id="ui-textsize" role="group" aria-label="Taille du texte">
          <button className={"tsize-btn" + (tsize === 0 ? " active" : "")} data-tsize="0" aria-pressed={tsize === 0} aria-label="Petite taille de texte" title="Texte plus petit" onClick={() => onTsizeChange(0)}>
            A
          </button>
          <button className={"tsize-btn" + (tsize === 1 ? " active" : "")} data-tsize="1" aria-pressed={tsize === 1} aria-label="Taille de texte normale" title="Taille normale" onClick={() => onTsizeChange(1)}>
            A+
          </button>
          <button className={"tsize-btn" + (tsize === 2 ? " active" : "")} data-tsize="2" aria-pressed={tsize === 2} aria-label="Grande taille de texte" title="Texte plus grand" onClick={() => onTsizeChange(2)}>
            A++
          </button>
        </div>
        <div id="ui-daynight-wrap" role="group" aria-label="Mode lumière : Auto, Jour ou Nuit">
          <button id="ui-daynight" className={dayNight.mode} aria-pressed={dayNight.isNight} title={dayNight.title} onClick={onDayNight}>
            {DAYNIGHT_ICON[dayNight.mode] || DAYNIGHT_ICON.auto} {dayNight.label}
          </button>
        </div>
        <div id="ui-modes">
          <button id="mode-journey" className={"mode-btn" + (mode === "journey" ? " active" : "")} onClick={() => onMode("journey")}>
            Parcours 3D
          </button>
          <button id="mode-course-btn" className={"mode-btn" + (mode === "course" ? " active" : "")} onClick={() => onMode("course")}>
            Cours illustré
          </button>
          <button id="mode-team-btn" className={"mode-btn" + (mode === "team" ? " active" : "")} onClick={() => onMode("team")}>
            L'équipe
          </button>
        </div>
        {user && (
          <button id="settings-open" className="mode-btn settings-btn-top" title="Paramètres" onClick={onSettingsOpen}>
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" width="15" height="15" aria-hidden="true">
              <circle cx="12" cy="12" r="3" />
              <path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1 0 2.83 2 2 0 0 1-2.83 0l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-2 2 2 2 0 0 1-2-2v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83 0 2 2 0 0 1 0-2.83l.06-.06A1.65 1.65 0 0 0 4.68 15a1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1-2-2 2 2 0 0 1 2-2h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 0-2.83 2 2 0 0 1 2.83 0l.06.06A1.65 1.65 0 0 0 9 4.68a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 2-2 2 2 0 0 1 2 2v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 0 2 2 0 0 1 0 2.83l-.06.06A1.65 1.65 0 0 0 19.4 9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 2 2 2 2 0 0 1-2 2h-.09a1.65 1.65 0 0 0-1.51 1z" />
            </svg>
          </button>
        )}
        <button id="auth-open" className="mode-btn auth-btn" title={user ? user.email || "Mon compte" : "Créer un compte ou se connecter"} onClick={onAuthOpen}>
          <svg className="auth-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" aria-hidden="true">
            <circle cx="12" cy="8" r="4" />
            <path d="M4 21c0-4 3.6-6.5 8-6.5s8 2.5 8 6.5" />
          </svg>
          <span className="auth-label-full">{user ? "Mon compte" : "Se connecter"}</span>
          <span className="auth-label-short">Compte</span>
        </button>
        <button id="contact-open" className="mode-btn contact-btn" title="Nous contacter" onClick={onContactOpen}>
          Contact
        </button>
        <div id="ui-progress">
          <div id="ui-progress-fill"></div>
        </div>
      </div>

      <div id="ui-dots" className={topbarVisible ? "visible" : ""}>
        {STATIONS.map((st, i) => (
          <span key={st.id} className={"dot" + (i === activeIndex ? " active" : "")} data-index={i} onClick={() => onDotClick(i)}></span>
        ))}
      </div>

      <div id="ui-hint" className={topbarVisible ? "visible" : ""}>
        <span className="hint-label">Défiler pour avancer</span>
        <span className="hint-line"></span>
      </div>

      <div id="ui-click-hint" className={clickHint ? "visible" : ""}>
        <span className="click-dot"></span>
        <span className="click-label">Cliquez sur un panneau pour ouvrir la leçon</span>
      </div>

      <div id="ui-title" className={"show" + (titleHidden ? " hide" : "")}>
        <div className="title-kicker">Module 1 - Formation :</div>
        <h1 className="title-main">
          La Panneautique.
          <span className="title-sub">Domaine public :</span>
        </h1>
        <div className="title-rule"></div>
        <p className="title-desc">Un parcours interactif à travers le cours : avancez le long de la rue, chaque panneau porte une étape du module.</p>
        <div className="title-meta">
          <span className="meta-chip">{STATIONS.length} étapes</span>
          <span className="meta-chip">12 questions finales</span>
        </div>
        <div className="title-scroll">
          <div className="title-scroll-inner">
            <span>Commencer le parcours</span>
            <span className="title-arrow"></span>
          </div>
        </div>
      </div>

      <div id="ui-card" className={(card ? "show" : "") + (panelFocus && card ? " panel-focus" : "")}>
        {card && (
          <>
            <div className="card-kicker">{card.kicker}</div>
            <h2 className="card-title">{card.title}</h2>
            <div className="card-rule"></div>
            <div className="card-body" data-lenis-prevent>
              <p className="card-note">Leçon prête à lire : ouvrez la fenêtre dédiée pour parcourir l'étape en entier.</p>
            </div>
            <button id="card-open" className="card-open" onClick={onCardOpen}>
              Lire la leçon →
            </button>
          </>
        )}
      </div>

      <Quiz
        quizShown={quizShown}
        isShownRef={quizShownRef}
        accessGranted={quizAccessGranted}
        openAuthForAccess={quizOpenAuth}
        onReady={quizOnReady}
        onValidated={quizOnValidated}
        onRestart={quizOnRestart}
      />
    </div>
  );
}
