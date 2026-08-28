import { useCallback, useEffect, useRef, useState } from "react";
import { createJourneyController } from "./journey/controller.js";
import { useFormationAuth } from "./hooks/useFormationAuth.js";
import { STATIONS, CHAPITRES } from "./data.js";
import { db, auth } from "./lib/local.js";
import { formatDateFr } from "./ui/confetti.js";

function useTextSize() {
  const [level, setLevel] = useState(() => {
    try {
      const v = Number(localStorage.getItem("panneau-tsize"));
      return v >= 0 && v <= 2 ? v : 1;
    } catch (e) {
      return 1;
    }
  });
  useEffect(() => {
    const root = document.documentElement;
    root.classList.toggle("ts-sm", level === 0);
    root.classList.toggle("ts-lg", level === 2);
    try {
      localStorage.setItem("panneau-tsize", String(level));
    } catch (e) {
      /* stockage indisponible */
    }
  }, [level]);
  return [level, setLevel];
}
import JourneyUI from "./ui/JourneyUI.jsx";
import Reader from "./ui/Reader.jsx";
import Toast from "./ui/Toast.jsx";
import AuthModal from "./ui/AuthModal.jsx";
import ContactModal from "./ui/ContactModal.jsx";
import CertificateModal from "./ui/CertificateModal.jsx";
import TeamOverlay from "./ui/TeamOverlay.jsx";
import CourseOverlay from "./ui/CourseOverlay.jsx";
import SettingsModal from "./ui/SettingsModal.jsx";

export default function App() {
  // ---------------- Toast ----------------
  const [toastState, setToastState] = useState({ text: "", id: 0 });
  const showToast = useCallback((text) => setToastState({ text, id: Date.now() }), []);

  // ---------------- Authentification (email + code) ----------------
  const authHook = useFormationAuth({ showToast });
  const authRef = useRef(authHook);
  authRef.current = authHook;
  const authOpenRef = useRef(authHook.authOpen);
  authOpenRef.current = authHook.authOpen;

  // ---------------- Taille du texte ----------------
  const [tsize, setTsize] = useTextSize();

  // ---------------- Moteur (refs) ----------------
  const controllerRef = useRef(null);
  const teamRef = useRef(null);
  const courseRef = useRef(null);
  const quizRef = useRef(null);
  const apiRef = useRef({});

  // ---------------- Refs miroirs (lecture synchrone par le moteur) ----------------
  const modeRef = useRef("journey");
  const activeIndexRef = useRef(-1);
  const readerOpenRef = useRef(false);
  const quizShownRef = useRef(false);
  const readerIndexRef = useRef(-1);
  const titleStartedRef = useRef(false);

  // ---------------- État React ----------------
  const [mode, setModeState] = useState("journey");
  const [activeIndex, setActiveIndexState] = useState(-1);
  const [chapterLabel, setChapterLabel] = useState("");
  const [cardStation, setCardStation] = useState(null);
  const [quizShown, setQuizShownState] = useState(false);
  const [readerOpen, setReaderOpenState] = useState(false);
  const [readerIndex, setReaderIndexState] = useState(-1);
  const [readerContent, setReaderContent] = useState(null);
  const [topbarVisible, setTopbarVisible] = useState(false);
  const [clickHint, setClickHint] = useState(false);
  const [panelFocus, setPanelFocus] = useState(false);
  const [titleHidden, setTitleHiddenState] = useState(false);
  const [dayNight, setDayNight] = useState({ mode: "auto", label: "Auto · 12h00", title: "", isNight: false });
  const [contactOpen, setContactOpen] = useState(false);
  const [settingsOpen, setSettingsOpen] = useState(false);
  const [cert, setCert] = useState(null);

  // ---------------- Contrôle d'interface (appelé par la boucle du moteur) ----------------
  const setQuizShown = useCallback((v) => {
    quizShownRef.current = v;
    setQuizShownState(v);
  }, []);

  const setActiveStation = useCallback(
    (i) => {
      if (i === activeIndexRef.current) return;
      activeIndexRef.current = i;
      setActiveIndexState(i);
      const st = STATIONS[i];
      const isQuiz = !!st && st.id === "quiz";
      setCardStation(isQuiz || !st ? null : st);
      setQuizShown(isQuiz);
      const c = st ? CHAPITRES[st.chapter] : null;
      setChapterLabel(c ? `${c.name} - ${c.label}` : "");
    },
    [setQuizShown]
  );

  const setTitleHidden = useCallback((v) => {
    if (v && !titleStartedRef.current) {
      titleStartedRef.current = true;
      setTitleHiddenState(true);
    }
  }, []);

  // ---------------- Lecteur de leçon ----------------
  const openAuthForAccess = useCallback(() => {
    if (authRef.current.user) {
      showToast("Saisissez le code reçu par email pour débloquer la leçon.");
      authRef.current.openAuth({ step: "code" });
    } else {
      showToast("Connectez-vous pour accéder à la formation.");
      authRef.current.openAuth({ step: "email" });
    }
  }, [showToast]);

  const openReader = useCallback(
    (i) => {
      if (!authRef.current.accessGranted()) {
        openAuthForAccess();
        return;
      }
      const st = STATIONS[i];
      if (!st) return;
      // Leçon ouverte → on l'enregistre (base, silencieux si non configurée)
      if (st.id !== "quiz") db.trackLesson(i, st.title);
      readerIndexRef.current = i;
      setReaderIndexState(i);
      setReaderContent(st);
      readerOpenRef.current = true;
      setReaderOpenState(true);
    },
    [openAuthForAccess]
  );

  const closeReader = useCallback(() => {
    if (!readerOpenRef.current) return;
    readerOpenRef.current = false;
    setReaderOpenState(false);
  }, []);

  const readerNav = useCallback(
    (delta) => {
      if (!readerOpenRef.current) return;
      const ni = Math.max(0, Math.min(STATIONS.length - 1, readerIndexRef.current + delta));
      if (ni !== readerIndexRef.current) openReader(ni);
    },
    [openReader]
  );

  const answerQuiz = useCallback((oi) => {
    quizRef.current?.answer(oi);
  }, []);

  // ---------------- Modes (parcours / cours / équipe) ----------------
  const setMode = useCallback(
    (m) => {
      const a = authRef.current;
      const ctl = controllerRef.current;
      // Le cours illustré est une leçon : il exige un compte débloqué
      if (m === "course" && !a.accessGranted()) {
        a.openAuth();
        return;
      }
      if (teamRef.current?.isOpen()) teamRef.current.close();
      if (courseRef.current?.isOpen()) courseRef.current.close();
      // Quitter le questionnaire avant d'entrer en mode cours
      if (m === "course") setQuizShown(false);
      if (m === "course") courseRef.current?.open();
      if (m === "team") teamRef.current?.open();
      modeRef.current = m;
      setModeState(m);
      if (ctl) {
        ctl.setJourneyLenis(m !== "journey");
        ctl.setCourseLenis(m !== "course");
      }
    },
    [setQuizShown]
  );

  const onCourseQuiz = useCallback(() => {
    setMode("journey");
    setTimeout(() => controllerRef.current?.scrollToEnd(), 120);
  }, [setMode]);

  const courseScrollTo = useCallback((top, behavior = "smooth") => {
    controllerRef.current?.courseScrollTo(top, behavior);
  }, []);

  // ---------------- Certificat ----------------
  const openCertificate = useCallback(async (score, total) => {
    const pct = Math.round((score / total) * 100);
    let holder = "Participant de la formation";
    try {
      const u = await auth.getUser();
      if (u && u.email) {
        const prefix = String(u.email).split("@")[0] || "";
        holder = prefix.charAt(0).toUpperCase() + prefix.slice(1);
      }
    } catch (e) {
      /* démo hors ligne : nom générique */
    }
    setCert({ holder, score, total, pct, date: formatDateFr(new Date()) });
  }, []);

  const closeCert = useCallback(() => setCert(null), []);

  // ---------------- Paramètres (jour/nuit depuis la modale) ----------------
  const setDayNightMode = useCallback((mode) => {
    controllerRef.current?.setTimeMode(mode);
  }, []);

  const quizOnRestart = useCallback(() => {
    setQuizShown(false);
    controllerRef.current?.scrollToTop();
  }, [setQuizShown]);

  const handleQuizReady = useCallback((api) => {
    quizRef.current = api;
  }, []);

  // ---------------- Effets ----------------
  // Création du contrôleur (moteur 3D + Lenis) - après que les overlays sont montés
  useEffect(() => {
    const ctl = createJourneyController({ api: apiRef });
    controllerRef.current = ctl;
    ctl.start();
    return () => {
      ctl.destroy();
      controllerRef.current = null;
    };
  }, []);

  // Pont mutable : le contrôleur lit les derniers callbacks React au moment de l'appel
  useEffect(() => {
    Object.assign(apiRef.current, {
      setMode,
      getMode: () => modeRef.current,
      getActiveIndex: () => activeIndexRef.current,
      getReaderOpen: () => readerOpenRef.current,
      getQuizOpen: () => quizShownRef.current,
      openReader,
      closeReader,
      readerNav,
      answerQuiz,
      openAuthForAccess,
      showToast,
      setActiveStation,
      setTitleHidden,
      setClickHint,
      setPanelFocus,
      setQuizShown,
      setDayNight,
      teamNav: (dir) => teamRef.current?.nav(dir),
    });
  });

  // Sync jour/nuit → data-mode sur <html> pour adapter les couleurs CSS
  useEffect(() => {
    const mode = dayNight.mode;
    if (mode === "day") document.documentElement.setAttribute("data-mode", "day");
    else document.documentElement.removeAttribute("data-mode");
  }, [dayNight.mode]);

  // Verrouillage de la page pendant le lecteur / le questionnaire
  useEffect(() => {
    readerOpenRef.current = readerOpen;
    controllerRef.current?.setPageLocked(readerOpen, "reader-lock");
  }, [readerOpen]);

  useEffect(() => {
    quizShownRef.current = quizShown;
    controllerRef.current?.setPageLocked(quizShown, "quiz-lock");
  }, [quizShown]);

  // Topbar / points / invite visibles après l'intro
  useEffect(() => {
    const t = setTimeout(() => setTopbarVisible(true), 1200);
    return () => clearTimeout(t);
  }, []);

  // Visite enregistrée (base, silencieux si non configurée)
  useEffect(() => {
    db.trackVisit();
  }, []);

  // Écran de connexion affiché à l'arrivée (comme l'ancien ui.js), uniquement si
  // aucune session n'a été restaurée (formation ou site Panotik) dans l'intervalle.
  useEffect(() => {
    const t = setTimeout(() => {
      if (!authRef.current.user) authRef.current.openAuth();
    }, 80);
    return () => clearTimeout(t);
  }, []);

  // Hook de vérification headless (équivalent de window.__panneautique)
  useEffect(() => {
    const ctl = controllerRef.current;
    if (!ctl) return;
    if (import.meta.env.DEV) {
      window.__panneautique = {
        openReader,
        closeReader,
        openCourse: () => setMode("course"),
        closeCourse: () => setMode("journey"),
        openTeam: () => setMode("team"),
        closeTeam: () => setMode("journey"),
        openAuth: () => authRef.current.openAuth(),
        closeAuth: () => authRef.current.closeAuth(),
        isAuthOpen: () => authOpenRef.current,
        pickAt: (cx, cy) => ctl.pickAt(cx, cy),
        interactAt: (cx, cy) => ctl.interactAt(cx, cy),
        project: (kind, index) => ctl.project(kind, index),
        reactive: () => ctl.reactive(),
        scrollToRatio: (r) => ctl.scrollToRatio(r),
        getState: () => ctl.getState(),
        framed: () => ctl.framed(),
        panelScreenSize: (i) => ctl.panelScreenSize(i),
        counts: () => ctl.counts(),
        settle: (prog, idx) => ctl.settle(prog, idx),
        setHour: (h) => ctl.setHour(h),
        setLightMode: (m) => ctl.setTimeMode(m),
        getTimeInfo: () => ctl.getTimeInfo(),
        panelCanvas: (i, night) => ctl.panelCanvas(i, night),
      };
    }
    return () => {
      if (import.meta.env.DEV) {
        delete window.__panneautique;
      }
    };
  }, [openReader, closeReader, setMode, openAuthForAccess]);

  // ---------------- Rendu ----------------
  return (
    <>
      <div id="scroll"></div>
      <canvas id="scene"></canvas>

      <JourneyUI
        mode={mode}
        onMode={setMode}
        topbarVisible={topbarVisible}
        chapter={chapterLabel}
        dayNight={dayNight}
        onDayNight={() => controllerRef.current?.cycleDayNight()}
        user={authHook.user}
        onAuthOpen={() => authHook.openAuth()}
        onSettingsOpen={() => setSettingsOpen(true)}
        onContactOpen={() => setContactOpen(true)}
        activeIndex={activeIndex}
        onDotClick={(i) => controllerRef.current?.scrollToStation(i)}
        clickHint={clickHint}
        titleHidden={titleHidden}
        card={cardStation}
        panelFocus={panelFocus}
        onCardOpen={() => openReader(activeIndexRef.current)}
        quizShown={quizShown}
        quizShownRef={quizShownRef}
        quizAccessGranted={authHook.accessGranted}
        quizOpenAuth={openAuthForAccess}
        quizOnReady={handleQuizReady}
        quizOnValidated={openCertificate}
        quizOnRestart={quizOnRestart}
        tsize={tsize}
        onTsizeChange={setTsize}
      />

      <Reader reader={readerContent} index={readerIndex} open={readerOpen} onClose={closeReader} onNav={readerNav} />

      <Toast toast={toastState} />

      <AuthModal
        open={authHook.authOpen}
        initialStep={authHook.authStep}
        user={authHook.user}
        unlocked={authHook.unlocked}
        onClose={authHook.closeAuth}
        setSessionAndUnlock={authHook.setSessionAndUnlock}
        markUnlocked={authHook.markUnlocked}
        signOut={authHook.signOut}
        showToast={showToast}
      />

      <ContactModal open={contactOpen} onClose={() => setContactOpen(false)} />

      <CertificateModal cert={cert} onClose={closeCert} />

      <SettingsModal
        open={settingsOpen}
        onClose={() => setSettingsOpen(false)}
        user={authHook.user}
        unlocked={authHook.unlocked}
        onSignOut={authHook.signOut}
        tsize={tsize}
        onTsizeChange={setTsize}
        dayNight={dayNight}
        onDayNight={setDayNightMode}
      />

      <TeamOverlay teamRef={teamRef} onExit={() => setMode("journey")} />

      <CourseOverlay courseRef={courseRef} onExit={() => setMode("journey")} onScrollTo={courseScrollTo} onQuiz={onCourseQuiz} />
    </>
  );
}
