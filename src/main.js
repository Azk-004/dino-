import Lenis from "lenis";
import { createScene } from "./scene.js";
import { initUI } from "./ui.js";
import { initCourse } from "./course.js";
import { initTeam } from "./team.js";
import { STATIONS } from "./data.js";
import "./style.css";

async function boot() {
  // Vraie police Century Gothic embarquée : on attend son chargement avant de dessiner
  // les textures des panneaux 3D et des illustrations, pour qu'elles s'affichent avec
  // la bonne police (sinon la pile de secours prend le relais).
  await Promise.allSettled([
    document.fonts.load("400 26px 'Century Gothic'"),
    document.fonts.load("600 26px 'Century Gothic'"),
    document.fonts.load("700 26px 'Century Gothic'"),
    document.fonts.load("italic 400 26px 'Century Gothic'"),
    document.fonts.load("italic 700 26px 'Century Gothic'"),
  ]);

  const canvas = document.getElementById("scene");
const N = STATIONS.length;

const scene = createScene(canvas, STATIONS);
const ui = initUI();

// ---------------- Reading mode (course illustré) ----------------
let courseLenis = null;
function courseScrollTo(top, behavior = "smooth") {
  if (courseLenis) {
    courseLenis.scrollTo(top, { duration: behavior === "smooth" ? 1.2 : 0, easing: (t) => 1 - Math.pow(1 - t, 3) });
  } else {
    document.querySelector("#ui-course .course-main").scrollTo({ top, behavior });
  }
}

function setMode(mode) {
  const isJourney = mode === "journey";
  const isCourse = mode === "course";
  const isTeam = mode === "team";
  if (course.isOpen()) course.close();
  if (team.isOpen()) team.close();
  // Quitter le questionnaire avant d'entrer en mode cours : la page doit rester déverrouillée
  if (isCourse) ui.setQuizShown(false);
  if (isCourse) course.open();
  if (isTeam) team.open();
  document.getElementById("mode-journey").classList.toggle("active", isJourney);
  document.getElementById("mode-course-btn").classList.toggle("active", isCourse);
  document.getElementById("mode-team-btn").classList.toggle("active", isTeam);
  if (isCourse) {
    lenis.stop();
    courseLenis?.start();
  } else if (isTeam) {
    courseLenis?.stop();
    lenis.stop();
  } else {
    courseLenis?.stop();
    lenis.start();
  }
}

const team = initTeam({
  onExit: () => setMode("journey"),
});

const course = initCourse({
  onExit: () => setMode("journey"),
  onScrollTo: courseScrollTo,
  onQuiz: () => {
    setMode("journey");
    setTimeout(() => {
      const max = Math.max(1, scrollEl.offsetHeight - window.innerHeight);
      lenis.scrollTo(max, { duration: 1.6 });
    }, 120);
  },
});

document.getElementById("mode-journey").addEventListener("click", () => setMode("journey"));
document.getElementById("mode-course-btn").addEventListener("click", () => setMode("course"));
document.getElementById("mode-team-btn").addEventListener("click", () => setMode("team"));

// ---------------- Mode lumière : Auto (heure réelle) / Jour / Nuit ----------------
// Icônes SVG sobres (aucun emoji « sticker ») : soleil, croissant, cadran d'horloge
const SUN_ICON = '<svg class="dn-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" aria-hidden="true"><circle cx="12" cy="12" r="4.5"/><path d="M12 2.5v2.2M12 19.3v2.2M2.5 12h2.2M19.3 12h2.2M5.2 5.2l1.6 1.6M17.2 17.2l1.6 1.6M18.8 5.2l-1.6 1.6M6.8 17.2l-1.6 1.6"/></svg>';
const MOON_ICON = '<svg class="dn-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" aria-hidden="true"><path d="M21 12.8A9 9 0 1 1 11.2 3a7 7 0 0 0 9.8 9.8Z"/></svg>';
const AUTO_ICON = '<svg class="dn-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" aria-hidden="true"><circle cx="12" cy="12" r="8.5"/><path d="M12 7v5l3.4 2"/></svg>';
const MODE_LABEL = { auto: "Auto", day: "Jour", night: "Nuit" };
const MODE_ICON = { auto: AUTO_ICON, day: SUN_ICON, night: MOON_ICON };
const daynightBtn = document.getElementById("ui-daynight");
function fmtHour(h) {
  const hh = Math.floor(h);
  const mm = Math.floor((h - hh) * 60);
  return String(hh).padStart(2, "0") + "h" + String(mm).padStart(2, "0");
}
let lightMode = "auto";
function applyLightMode() {
  scene.setTimeMode(lightMode);
  const isNight = lightMode === "night";
  daynightBtn.classList.toggle("night", isNight);
  daynightBtn.classList.toggle("auto", lightMode === "auto");
  daynightBtn.setAttribute("aria-pressed", String(isNight));
  const t = scene.getTimeInfo();
  const suffix = lightMode === "auto" ? " · " + fmtHour(t.hour) : "";
  daynightBtn.innerHTML = MODE_ICON[lightMode] + " " + MODE_LABEL[lightMode] + suffix;
  daynightBtn.title = lightMode === "auto" ? "Heure réelle de la journée — cliquer pour passer en mode Jour" :
    (lightMode === "day" ? "Mode Jour fixe — cliquer pour passer en mode Nuit" : "Mode Nuit fixe — cliquer pour repasser en Auto");
  try { localStorage.setItem("panneau-light", lightMode); } catch (e) { /* stockage indisponible */ }
}
daynightBtn.addEventListener("click", () => {
  lightMode = lightMode === "auto" ? "day" : lightMode === "day" ? "night" : "auto";
  applyLightMode();
});
// Préférence enregistrée (nouveau format "panneau-light", repli sur l'ancien "panneau-night")
let savedLight = "auto";
try {
  const v = localStorage.getItem("panneau-light");
  if (v === "auto" || v === "day" || v === "night") savedLight = v;
  else if (localStorage.getItem("panneau-night") === "1") savedLight = "night";
} catch (e) { /* ignore */ }
// Paramètres d'URL de démonstration / vérification : ?light=auto|day|night et/ou ?hour=18.4
const urlParams = new URLSearchParams(window.location.search);
if (urlParams.get("light") && ["auto", "day", "night"].includes(urlParams.get("light"))) {
  lightMode = urlParams.get("light");
}
const hParam = urlParams.get("hour");
if (hParam && !isNaN(Number(hParam))) {
  scene.setHour(Number(hParam));
  lightMode = "auto";
}
applyLightMode();
// ?at=0.45 : positionne le parcours à une étape donnée (démo / vérification)
const atParam = urlParams.get("at");
if (atParam && !isNaN(Number(atParam))) {
  setTimeout(() => {
    const max = Math.max(1, scrollEl.offsetHeight - window.innerHeight);
    window.scrollTo(0, Math.round(Math.min(1, Math.max(0, Number(atParam))) * max));
  }, 400);
}
// ?mode=team|course : ouvre directement un mode (démo / vérification headless)
if (urlParams.get("mode") === "team" || urlParams.get("mode") === "course") {
  setTimeout(() => setMode(urlParams.get("mode")), 400);
}
// ?hide=1 : masque immédiatement l'écran titre (démo / vérification headless) en
// déclenchant le même chemin que le défilement : progress > 0.015 -> state.started.
// Prioritaire seulement si ?at= n'est pas fourni (sinon at gagne).
if (urlParams.get("hide") === "1" && !atParam) {
  setTimeout(() => {
    const max = Math.max(1, scrollEl.offsetHeight - window.innerHeight);
    window.scrollTo(0, Math.round(max * 0.03));
  }, 250);
}
// En mode Auto, l'heure affichée suit la montre toutes les 30 s
setInterval(() => {
  if (lightMode === "auto") {
    const t = scene.getTimeInfo();
    daynightBtn.innerHTML = MODE_ICON.auto + " " + MODE_LABEL.auto + " · " + fmtHour(t.hour);
  }
}, 30000);

// ---------------- Scroll length ----------------
const UNITS = N + 2; // intro + stations + outro
const scrollEl = document.getElementById("scroll");
// Un écran se franchit avec une fraction de la hauteur de vue (léger scroll) :
// ~0.5× la hauteur sur mobile, ~0.7× sur desktop — un léger geste suffit.
function screenSpacing() {
  return window.innerWidth <= 760 ? 0.5 : 0.7;
}
function layout() {
  const total = UNITS * window.innerHeight * screenSpacing();
  scrollEl.style.height = total + "px";
}
layout();

// ---------------- Lenis + ScrollTrigger ----------------
const lenis = new Lenis({
  duration: window.innerWidth <= 760 ? 0.9 : 1.0,
  smoothWheel: true,
  easing: (t) => 1 - Math.pow(1 - t, 3),
  touchMultiplier: window.innerWidth <= 760 ? 2.0 : 1.5,
  wheelMultiplier: 1.15,
});

const courseMainEl = document.querySelector("#ui-course .course-main");
courseLenis = new Lenis({
  wrapper: courseMainEl,
  content: courseMainEl,
  duration: 1.25,
  smoothWheel: true,
  easing: (t) => 1 - Math.pow(1 - t, 3),
  touchMultiplier: 1.6,
  wheelMultiplier: 1.0,
});

function raf(time) {
  lenis.raf(time);
  if (courseLenis) courseLenis.raf(time);
  requestAnimationFrame(raf);
}
requestAnimationFrame(raf);

// ---------------- Scroll logic ----------------
let progress = 0;
let activeIndex = 0;

function onScroll(scrollY) {
  const maxScroll = Math.max(1, scrollEl.offsetHeight - window.innerHeight);
  const ratio = Math.min(1, Math.max(0, scrollY / maxScroll));
  progress = ratio;
  const rawIndex = Math.floor(ratio * UNITS) - 1;
  activeIndex = Math.max(0, Math.min(N - 1, rawIndex));
}

let lastScrollAt = 0;
lenis.on("scroll", ({ scroll }) => {
  onScroll(scroll);
  lastScrollAt = performance.now();
});

onScroll(window.scrollY || 0);

// ---------------- Render loop ----------------
scene.update(progress, activeIndex);

function loop() {
  scene.update(progress, activeIndex);
  ui.updateGlobal(progress, activeIndex, scene.getFramedPanel());
  scene.render();
  requestAnimationFrame(loop);
}
requestAnimationFrame(loop);

// ---------------- Resize ----------------
window.addEventListener("resize", () => {
  layout();
  scene.resize();
  onScroll(window.scrollY || 0);
});

// Keyboard navigation
window.addEventListener("keydown", (e) => {
  if (team.isOpen()) {
    if (e.key === "Escape") setMode("journey");
    else if (e.key === "ArrowLeft") { e.preventDefault(); team.nav(-1); }
    else if (e.key === "ArrowRight") { e.preventDefault(); team.nav(1); }
    return;
  }
  if (course.isOpen()) {
    if (e.key === "Escape") setMode("journey");
    else if (e.key === "ArrowDown" || e.key === "PageDown") {
      e.preventDefault();
      courseScrollTo(courseMainEl.scrollTop + window.innerHeight * 0.8);
    } else if (e.key === "ArrowUp" || e.key === "PageUp") {
      e.preventDefault();
      courseScrollTo(courseMainEl.scrollTop - window.innerHeight * 0.8);
    }
    return;
  }
  if (ui.isReaderOpen()) {
    const panel = document.querySelector(".reader-panel");
    if (e.key === "Escape") ui.closeReader();
    else if (e.key === "ArrowLeft") ui.readerNav(-1);
    else if (e.key === "ArrowRight") ui.readerNav(1);
    else if (e.key === "ArrowDown" || e.key === "PageDown") {
      e.preventDefault();
      panel.scrollBy({ top: Math.min(panel.clientHeight * 0.7, panel.scrollHeight - panel.scrollTop), behavior: "smooth" });
    } else if (e.key === "ArrowUp" || e.key === "PageUp") {
      e.preventDefault();
      panel.scrollBy({ top: -panel.clientHeight * 0.7, behavior: "smooth" });
    }
    return;
  }
  if (e.key === "Enter" && activeIndex >= 0 && !ui.quizOpen()) {
    ui.openReader(activeIndex);
    return;
  }
  const quizKeys = ["1", "2", "3", "4"];
  if (quizKeys.includes(e.key) && ui.quizOpen()) {
    e.preventDefault();
    ui.answerQuiz(Number(e.key) - 1);
    return;
  }
  // Quiz ouvert : les flèches font défiler le questionnaire, jamais la page
  if (ui.quizOpen()) {
    const q = document.querySelector("#ui-quiz");
    if (e.key === "ArrowDown" || e.key === "PageDown") {
      e.preventDefault();
      q.scrollBy({ top: window.innerHeight * 0.7, behavior: "smooth" });
      return;
    }
    if (e.key === "ArrowUp" || e.key === "PageUp") {
      e.preventDefault();
      q.scrollBy({ top: -window.innerHeight * 0.7, behavior: "smooth" });
      return;
    }
  }
  const step = window.innerHeight * screenSpacing();
  if (e.key === "ArrowDown" || e.key === "PageDown") {
    e.preventDefault();
    lenis.scrollTo(window.scrollY + step, { duration: 1.1 });
  } else if (e.key === "ArrowUp" || e.key === "PageUp") {
    e.preventDefault();
    lenis.scrollTo(Math.max(0, window.scrollY - step), { duration: 1.1 });
  }
});

// Pendant la lecture d'une leçon ou du questionnaire : la page est verrouillée.
// `data-lenis-prevent` laisse la molette scroller le panneau/quiz nativement ;
// le verrou HTML coupe le défilement utilisateur ET un garde-fou annule toute
// tentative de défilement programmatique (Lenis, scrollTo) en ramenant la page
// à sa position exacte — seule la leçon / le quiz défilent.
let lockedScrollY = null;
function setPageLocked(open, className) {
  document.documentElement.classList.toggle(className, open);
  if (open) {
    lockedScrollY = window.scrollY;
    lenis.stop();
  } else {
    lockedScrollY = null;
    lenis.start();
  }
}
window.addEventListener("scroll", () => {
  if (lockedScrollY !== null && Math.abs(window.scrollY - lockedScrollY) > 2) {
    window.scrollTo(0, lockedScrollY);
  }
}, { passive: true });
ui.setReaderListener((open) => setPageLocked(open, "reader-lock"));
ui.setQuizListener((open) => setPageLocked(open, "quiz-lock"));

// ---------------- Clickable world ----------------
function toNDC(e) {
  return {
    nx: (e.clientX / window.innerWidth) * 2 - 1,
    ny: -(e.clientY / window.innerHeight) * 2 + 1,
  };
}

window.addEventListener("click", (e) => {
  if (team.isOpen()) return;
  if (course.isOpen()) return;
  if (ui.isReaderOpen()) return;
  if (ui.quizOpen()) return; // questionnaire ouvert : les clics lui appartiennent
  if (e.target.closest && e.target.closest("#ui")) return;
  const { nx, ny } = toNDC(e);
  const hit = scene.pick(nx, ny);
  if (!hit) return;
  if (hit.kind === "panel") { ui.openReader(hit.index); return; }
  // Quand un panneau de leçon est cadré à l'écran (lecture en cours), un élément
  // qui passe devant (voiture, pigeon…) peut capter le tap à sa place. Si le point
  // touché est proche du panneau cadré, c'est le panneau que l'utilisateur vise :
  // on ouvre la leçon plutôt que de déclencher l'interaction parasite.
  {
    const framed = scene.getFramedPanel();
    if (framed && framed.sw > 0.25) {
      const pp = scene.projectPickable("panel", framed.index);
      if (pp) {
        const px = (pp.x * 0.5 + 0.5) * innerWidth;
        const py = (-pp.y * 0.5 + 0.5) * innerHeight;
        if (Math.hypot(px - e.clientX, py - e.clientY) < 80) {
          ui.openReader(framed.index);
          return;
        }
      }
    }
  }
  if (hit.kind === "pigeon") { scene.interact({ kind: "pigeon", index: hit.index }); return; }
  if (hit.kind === "balloon") {
    scene.interact({ kind: "balloon", index: hit.index });
    ui.showToast(hit.tip);
    return;
  }
  if (hit.kind === "fountain") {
    scene.interact({ kind: "fountain", index: hit.index });
    ui.showToast(hit.tip);
    return;
  }
  if (hit.kind === "car") { scene.interact({ kind: "car", index: hit.index }); return; }
  if (hit.kind === "bille") {
    scene.interact({ kind: "bille", index: hit.index });
    ui.showToast(hit.tip);
    return;
  }
  if (hit.tip) ui.showToast(hit.tip);
});

let hoverQueued = false;
// Quitter la fenêtre (ou perdre le focus) efface le survol : plus de faisceau resté allumé,
// plus de panneau laissé agrandi par erreur.
window.addEventListener("mouseout", (e) => {
  if (!e.relatedTarget) {
    document.body.classList.remove("hover-pick", "hover-fun");
    scene.setHover(null);
  }
});
window.addEventListener("blur", () => {
  document.body.classList.remove("hover-pick", "hover-fun");
  scene.setHover(null);
});

window.addEventListener("mousemove", (e) => {
  if (hoverQueued) return;
  hoverQueued = true;
  requestAnimationFrame(() => {
    hoverQueued = false;
    if (team.isOpen()) return;
    if (course.isOpen()) return;
    if (ui.isReaderOpen()) return;
    if (ui.quizOpen()) {
      document.body.classList.remove("hover-pick", "hover-fun");
      scene.setHover(null);
      return;
    }
    // Pendant / juste après le scroll : pas de survol (les panneaux ne « clignotent » pas)
    if (performance.now() - lastScrollAt < 200) {
      document.body.classList.remove("hover-pick", "hover-fun");
      scene.setHover(null);
      return;
    }
    const { nx, ny } = toNDC(e);
    const hit = scene.pick(nx, ny);
    // Curseur : pointer sur les éléments cliquables, « attraper » sur les pigeons
    document.body.classList.toggle("hover-pick", !!hit && hit.kind !== "pigeon");
    document.body.classList.toggle("hover-fun", !!hit && hit.kind === "pigeon");
    scene.setHover(hit);
  });
});

// Debug hook for headless verification
window.__panneautique = {
  openReader: ui.openReader,
  closeReader: ui.closeReader,
  openCourse: () => setMode("course"),
  closeCourse: () => setMode("journey"),
  openTeam: () => setMode("team"),
  closeTeam: () => setMode("journey"),
  pickAt: (cx, cy) => {
    const hit = scene.pick((cx / window.innerWidth) * 2 - 1, -(cy / window.innerHeight) * 2 + 1);
    return hit ? { kind: hit.kind, index: hit.index, tip: hit.tip } : null;
  },
  interactAt: (cx, cy) => {
    const hit = scene.pick((cx / window.innerWidth) * 2 - 1, -(cy / window.innerHeight) * 2 + 1);
    if (hit) scene.interact({ kind: hit.kind, index: hit.index });
    return hit ? { kind: hit.kind, index: hit.index, tip: hit.tip } : null;
  },
  project: (kind, index) => {
    const p = scene.projectPickable(kind, index);
    if (!p) return null;
    return { x: Math.round((p.x * 0.5 + 0.5) * innerWidth), y: Math.round((-p.y * 0.5 + 0.5) * innerHeight) };
  },
  reactive: () => scene.getReactiveState(),
  scrollToRatio: (r) => {
    const max = Math.max(1, scrollEl.offsetHeight - window.innerHeight);
    lenis.scrollTo(Math.round(Math.min(1, Math.max(0, r)) * max), { duration: 0.8 });
  },
  getState: () => {
    const p = scene.getCameraPos();
    return { progress, activeIndex, cam: { x: p.x, y: p.y, z: p.z } };
  },
  framed: () => scene.getFramedPanel(),
  panelScreenSize: (i) => scene.panelScreenSize(i),
  counts: () => scene.sceneCounts(),
  settle: (prog, idx) => {
    for (let i = 0; i < 2400; i++) scene.update(prog, idx);
    const p = scene.getCameraPos();
    return { cam: { x: p.x, y: p.y, z: p.z }, progress: prog, activeIndex: idx };
  },
  setHour: (h) => scene.setHour(h),
  setLightMode: (m) => { lightMode = m; applyLightMode(); },
  getTimeInfo: () => scene.getTimeInfo(),
  panelCanvas: (i, night) => {
    const c = scene.getPanelCanvas(i, night);
    return c ? { w: c.width, h: c.height, dataUrl: c.toDataURL("image/png") } : null;
  },
};

// Show topbar / dots after intro
setTimeout(() => {
  document.getElementById("ui-topbar").classList.add("visible");
  document.getElementById("ui-dots").classList.add("visible");
  document.getElementById("ui-hint").classList.add("visible");
}, 1200);

  // Clickable station dots
  document.querySelectorAll(".dot").forEach((d, i) => {
    d.addEventListener("click", () => {
      const ratio = (i + 1.5) / UNITS;
      const max = Math.max(1, scrollEl.offsetHeight - window.innerHeight);
      lenis.scrollTo(Math.round(ratio * max), { duration: 1.4 });
    });
  });
}

boot();
