import Lenis from "lenis";
import { createScene } from "../scene.js";
import { STATIONS } from "../data.js";

// Contrôleur du parcours 3D : port de l'ancien main.js.
// Le moteur (scene.js / world.js) et le scroll (Lenis) restent impératifs ;
// l'interface (topbar, carte, lecteur, quiz, auth…) est pilotée par React via
// l'objet mutable `api` dont App rafraîchit les champs à chaque rendu.

const N = STATIONS.length;
const UNITS = N + 2; // intro + stations + outro

const MODE_LABEL = { auto: "Auto", day: "Jour", night: "Nuit" };

function fmtHour(h) {
  const hh = Math.floor(h);
  const mm = Math.floor((h - hh) * 60);
  return String(hh).padStart(2, "0") + "h" + String(mm).padStart(2, "0");
}

function screenSpacing() {
  return window.innerWidth <= 760 ? 0.5 : 0.7;
}

export function createJourneyController({ api }) {
  let scene = null;
  let journeyLenis = null;
  let courseLenis = null;
  let courseMainEl = null;
  let scrollEl = null;
  let progressFill = null;
  let progress = 0;
  let activeIndex = 0;
  let lastScrollAt = 0;
  let lockedScrollY = null;
  let rafId = 0;
  let resizeFn = null;
  let keyFn = null;
  let clickFn = null;
  let moveFn = null;
  let outFn = null;
  let blurFn = null;
  let scrollGuard = null;
  let intervalId = null;
  let destroyed = false;
  let inited = false;

  // ---------------- Mode lumière : Auto (heure réelle) / Jour / Nuit ----------------
  let lightMode = "auto";
  function applyLightMode() {
    scene.setTimeMode(lightMode);
    const isNight = lightMode === "night";
    const t = scene.getTimeInfo();
    const suffix = lightMode === "auto" ? " · " + fmtHour(t.hour) : "";
    api.current.setDayNight({
      mode: lightMode,
      label: MODE_LABEL[lightMode] + suffix,
      title:
        lightMode === "auto"
          ? "Heure réelle de la journée - cliquer pour passer en mode Jour"
          : lightMode === "day"
            ? "Mode Jour fixe - cliquer pour passer en mode Nuit"
            : "Mode Nuit fixe - cliquer pour repasser en Auto",
      isNight,
    });
    try {
      localStorage.setItem("panneau-light", lightMode);
    } catch (e) {
      /* stockage indisponible */
    }
  }

  function cycleDayNight() {
    if (!scene) return;
    lightMode = lightMode === "auto" ? "day" : lightMode === "day" ? "night" : "auto";
    applyLightMode();
  }

  // ---------------- Scroll length ----------------
  function layout() {
    const total = UNITS * window.innerHeight * screenSpacing();
    scrollEl.style.height = total + "px";
  }

  // ---------------- Scroll logic ----------------
  function onScroll(scrollY) {
    const maxScroll = Math.max(1, scrollEl.offsetHeight - window.innerHeight);
    const ratio = Math.min(1, Math.max(0, scrollY / maxScroll));
    progress = ratio;
    const rawIndex = Math.floor(ratio * UNITS) - 1;
    activeIndex = Math.max(0, Math.min(N - 1, rawIndex));
  }

  function updateGlobal(prog, idx, framed) {
    if (progressFill) progressFill.style.width = (prog * 100).toFixed(2) + "%";
    api.current.setActiveStation(idx);
    api.current.setTitleHidden(prog > 0.015);
    const quizShown = api.current.getQuizOpen();
    api.current.setClickHint(idx >= 0 && !quizShown && !api.current.getReaderOpen());
    const reading = !!framed && framed.dist < 14;
    api.current.setPanelFocus(reading && idx >= 0 && !quizShown);
  }

  function frame(time) {
    if (destroyed) return;
    journeyLenis.raf(time);
    if (courseLenis) courseLenis.raf(time);
    requestAnimationFrame(frame);
  }

  function loop() {
    if (destroyed) return;
    scene.update(progress, activeIndex);
    updateGlobal(progress, activeIndex, scene.getFramedPanel());
    scene.render();
    rafId = requestAnimationFrame(loop);
  }

  // ---------------- Page lock (lecteur, questionnaire, certificat) ----------------
  function setPageLocked(open, className) {
    if (!inited) return;
    document.documentElement.classList.toggle(className, open);
    if (open) {
      lockedScrollY = window.scrollY;
      journeyLenis.stop();
    } else {
      lockedScrollY = null;
      journeyLenis.start();
    }
  }

  function setJourneyLenis(locked) {
    if (!inited) return;
    if (locked) journeyLenis.stop();
    else journeyLenis.start();
  }

  function setCourseLenis(locked) {
    if (!courseLenis) return;
    if (locked) courseLenis.stop();
    else courseLenis.start();
  }

  // ---------------- Scroll helpers ----------------
  function scrollMax() {
    return Math.max(1, scrollEl.offsetHeight - window.innerHeight);
  }
  function scrollToRatio(r, duration = 0.8) {
    if (!inited) return;
    journeyLenis.scrollTo(Math.round(Math.min(1, Math.max(0, r)) * scrollMax()), { duration });
  }
  function scrollToStation(i) {
    const ratio = (i + 1.5) / UNITS;
    scrollToRatio(ratio, 1.4);
  }
  function scrollToTop(duration = 0.8) {
    if (!inited) return;
    journeyLenis.scrollTo(0, { duration });
  }
  function scrollToEnd(duration = 1.6) {
    if (!inited) return;
    journeyLenis.scrollTo(scrollMax(), { duration });
  }

  // Défilement dans le cours illustré (mode lecture)
  function courseScrollTo(top, behavior = "smooth") {
    if (courseLenis) {
      courseLenis.scrollTo(top, { duration: behavior === "smooth" ? 1.2 : 0, easing: (t) => 1 - Math.pow(1 - t, 3) });
    } else if (courseMainEl) {
      courseMainEl.scrollTo({ top, behavior });
    }
  }

  // ---------------- Clickable world ----------------
  function toNDC(e) {
    return {
      nx: (e.clientX / window.innerWidth) * 2 - 1,
      ny: -(e.clientY / window.innerHeight) * 2 + 1,
    };
  }

  function onWindowClick(e) {
    const mode = api.current.getMode();
    if (mode !== "journey") return;
    if (api.current.getReaderOpen()) return;
    if (api.current.getQuizOpen()) return;
    if (e.target.closest && e.target.closest("#ui, #ui-auth, #ui-contact, #ui-cert")) return;
    const { nx, ny } = toNDC(e);
    const hit = scene.pick(nx, ny);
    if (!hit) return;
    if (hit.kind === "panel") {
      api.current.openReader(hit.index);
      return;
    }
    {
      const framed = scene.getFramedPanel();
      if (framed && framed.sw > 0.25) {
        const pp = scene.projectPickable("panel", framed.index);
        if (pp) {
          const px = (pp.x * 0.5 + 0.5) * innerWidth;
          const py = (-pp.y * 0.5 + 0.5) * innerHeight;
          if (Math.hypot(px - e.clientX, py - e.clientY) < 80) {
            api.current.openReader(framed.index);
            return;
          }
        }
      }
    }
    if (hit.kind === "pigeon") {
      scene.interact({ kind: "pigeon", index: hit.index });
      return;
    }
    if (hit.kind === "balloon") {
      scene.interact({ kind: "balloon", index: hit.index });
      api.current.showToast(hit.tip);
      return;
    }
    if (hit.kind === "fountain") {
      scene.interact({ kind: "fountain", index: hit.index });
      api.current.showToast(hit.tip);
      return;
    }
    if (hit.kind === "car") {
      scene.interact({ kind: "car", index: hit.index });
      return;
    }
    if (hit.kind === "bille") {
      scene.interact({ kind: "bille", index: hit.index });
      api.current.showToast(hit.tip);
      return;
    }
    if (hit.tip) api.current.showToast(hit.tip);
  }

  let hoverQueued = false;
  function clearHover() {
    document.body.classList.remove("hover-pick", "hover-fun");
    scene.setHover(null);
  }
  function onWindowMouseOut(e) {
    if (!e.relatedTarget) clearHover();
  }
  function onWindowBlur() {
    clearHover();
  }
  function onWindowMove(e) {
    if (hoverQueued) return;
    hoverQueued = true;
    requestAnimationFrame(() => {
      hoverQueued = false;
      const mode = api.current.getMode();
      if (mode !== "journey") return;
      if (api.current.getReaderOpen()) return;
      if (api.current.getQuizOpen()) {
        clearHover();
        return;
      }
      if (performance.now() - lastScrollAt < 200) {
        clearHover();
        return;
      }
      const { nx, ny } = toNDC(e);
      const hit = scene.pick(nx, ny);
      document.body.classList.toggle("hover-pick", !!hit && hit.kind !== "pigeon");
      document.body.classList.toggle("hover-fun", !!hit && hit.kind === "pigeon");
      scene.setHover(hit);
    });
  }

  // ---------------- Keyboard ----------------
  function onWindowKey(e) {
    const mode = api.current.getMode();
    if (mode === "team") {
      if (e.key === "Escape") api.current.setMode("journey");
      else if (e.key === "ArrowLeft") {
        e.preventDefault();
        api.current.teamNav(-1);
      } else if (e.key === "ArrowRight") {
        e.preventDefault();
        api.current.teamNav(1);
      }
      return;
    }
    if (mode === "course") {
      if (e.key === "Escape") api.current.setMode("journey");
      else if (e.key === "ArrowDown" || e.key === "PageDown") {
        e.preventDefault();
        const el = document.querySelector(".course-main");
        if (el) el.scrollBy({ top: window.innerHeight * 0.8, behavior: "smooth" });
      } else if (e.key === "ArrowUp" || e.key === "PageUp") {
        e.preventDefault();
        const el = document.querySelector(".course-main");
        if (el) el.scrollBy({ top: -window.innerHeight * 0.8, behavior: "smooth" });
      }
      return;
    }
    if (api.current.getReaderOpen()) {
      const panel = document.querySelector(".reader-panel");
      if (e.key === "Escape") api.current.closeReader();
      else if (e.key === "ArrowLeft") api.current.readerNav(-1);
      else if (e.key === "ArrowRight") api.current.readerNav(1);
      else if (e.key === "ArrowDown" || e.key === "PageDown") {
        e.preventDefault();
        panel.scrollBy({ top: Math.min(panel.clientHeight * 0.7, panel.scrollHeight - panel.scrollTop), behavior: "smooth" });
      } else if (e.key === "ArrowUp" || e.key === "PageUp") {
        e.preventDefault();
        panel.scrollBy({ top: -panel.clientHeight * 0.7, behavior: "smooth" });
      }
      return;
    }
    if (e.key === "Enter" && activeIndex >= 0 && !api.current.getQuizOpen()) {
      api.current.openReader(activeIndex);
      return;
    }
    const quizKeys = ["1", "2", "3", "4"];
    if (quizKeys.includes(e.key) && api.current.getQuizOpen()) {
      e.preventDefault();
      api.current.answerQuiz(Number(e.key) - 1);
      return;
    }
    if (api.current.getQuizOpen()) {
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
      journeyLenis.scrollTo(window.scrollY + step, { duration: 1.1 });
    } else if (e.key === "ArrowUp" || e.key === "PageUp") {
      e.preventDefault();
      journeyLenis.scrollTo(Math.max(0, window.scrollY - step), { duration: 1.1 });
    }
  }

  // ---------------- Init ----------------
  async function init() {
    const canvas = document.getElementById("scene");
    scrollEl = document.getElementById("scroll");
    progressFill = document.getElementById("ui-progress-fill");

    scene = createScene(canvas, STATIONS);

    layout();

    journeyLenis = new Lenis({
      duration: window.innerWidth <= 760 ? 0.9 : 1.0,
      smoothWheel: true,
      easing: (t) => 1 - Math.pow(1 - t, 3),
      touchMultiplier: window.innerWidth <= 760 ? 2.0 : 1.5,
      wheelMultiplier: 1.15,
    });

    courseMainEl = document.querySelector("#ui-course .course-main");
    if (courseMainEl) {
      courseLenis = new Lenis({
        wrapper: courseMainEl,
        content: courseMainEl,
        duration: 1.25,
        smoothWheel: true,
        easing: (t) => 1 - Math.pow(1 - t, 3),
        touchMultiplier: 1.6,
        wheelMultiplier: 1.0,
      });
      courseLenis.stop();
    }

    requestAnimationFrame(frame);

    journeyLenis.on("scroll", ({ scroll }) => {
      onScroll(scroll);
      lastScrollAt = performance.now();
    });

    onScroll(window.scrollY || 0);
    scene.update(progress, activeIndex);
    rafId = requestAnimationFrame(loop);

    // ---------------- URL params de démonstration / vérification ----------------
    let savedLight = "auto";
    try {
      const v = localStorage.getItem("panneau-light");
      if (v === "auto" || v === "day" || v === "night") savedLight = v;
      else if (localStorage.getItem("panneau-night") === "1") savedLight = "night";
    } catch (e) {
      /* ignore */
    }
    lightMode = savedLight;
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

    const atParam = urlParams.get("at");
    if (atParam && !isNaN(Number(atParam))) {
      setTimeout(() => {
        window.scrollTo(0, Math.round(Math.min(1, Math.max(0, Number(atParam))) * scrollMax()));
      }, 400);
    }
    const modeParam = urlParams.get("mode");
    if (modeParam === "team" || modeParam === "course") {
      setTimeout(() => api.current.setMode(modeParam), 400);
    }
    if (urlParams.get("hide") === "1" && !atParam) {
      setTimeout(() => {
        window.scrollTo(0, Math.round(scrollMax() * 0.03));
      }, 250);
    }

    intervalId = setInterval(() => {
      if (lightMode === "auto") {
        const t = scene.getTimeInfo();
        api.current.setDayNight({
          mode: "auto",
          label: MODE_LABEL.auto + " · " + fmtHour(t.hour),
          title: "Heure réelle de la journée - cliquer pour passer en mode Jour",
          isNight: false,
        });
      }
    }, 30000);

    // ---------------- Listeners ----------------
    resizeFn = () => {
      layout();
      scene.resize();
      onScroll(window.scrollY || 0);
    };
    window.addEventListener("resize", resizeFn);

    keyFn = onWindowKey;
    window.addEventListener("keydown", keyFn);

    clickFn = onWindowClick;
    window.addEventListener("click", clickFn);

    outFn = onWindowMouseOut;
    window.addEventListener("mouseout", outFn);
    blurFn = onWindowBlur;
    window.addEventListener("blur", blurFn);
    moveFn = onWindowMove;
    window.addEventListener("mousemove", moveFn);

    scrollGuard = () => {
      if (lockedScrollY !== null && Math.abs(window.scrollY - lockedScrollY) > 2) {
        window.scrollTo(0, lockedScrollY);
      }
    };
    window.addEventListener("scroll", scrollGuard, { passive: true });

    inited = true;
  }

  async function start() {
    // Vraie police Century Gothic embarquée : on attend son chargement avant de
    // dessiner les textures des panneaux 3D, pour qu'elles s'affichent avec la
    // bonne police (sinon la pile de secours prend le relais).
    await Promise.allSettled([
      document.fonts.load("400 26px 'Century Gothic'"),
      document.fonts.load("600 26px 'Century Gothic'"),
      document.fonts.load("700 26px 'Century Gothic'"),
      document.fonts.load("italic 400 26px 'Century Gothic'"),
      document.fonts.load("italic 700 26px 'Century Gothic'"),
    ]);
    if (destroyed) return;
    await init();
  }

  function destroy() {
    destroyed = true;
    if (intervalId) clearInterval(intervalId);
    cancelAnimationFrame(rafId);
    if (resizeFn) window.removeEventListener("resize", resizeFn);
    if (keyFn) window.removeEventListener("keydown", keyFn);
    if (clickFn) window.removeEventListener("click", clickFn);
    if (outFn) window.removeEventListener("mouseout", outFn);
    if (blurFn) window.removeEventListener("blur", blurFn);
    if (moveFn) window.removeEventListener("mousemove", moveFn);
    if (scrollGuard) window.removeEventListener("scroll", scrollGuard);
    if (journeyLenis) journeyLenis.destroy();
    if (courseLenis) courseLenis.destroy();
  }

  return {
    start,
    destroy,
    cycleDayNight,
    setTimeMode: (m) => {
      if (!scene) return;
      lightMode = m === "day" || m === "night" ? m : "auto";
      applyLightMode();
    },
    setHour: (h) => {
      if (scene) scene.setHour(h);
    },
    getTimeInfo: () => (scene ? scene.getTimeInfo() : null),
    scrollToRatio,
    scrollToStation,
    scrollToTop,
    scrollToEnd,
    courseScrollTo,
    setPageLocked,
    setJourneyLenis,
    setCourseLenis,
    resize: () => resizeFn && resizeFn(),
    getScene: () => scene,
    getState: () => {
      if (!scene) return null;
      const p = scene.getCameraPos();
      return { progress, activeIndex, cam: { x: p.x, y: p.y, z: p.z } };
    },
    counts: () => (scene ? scene.sceneCounts() : null),
    settle: (prog, idx) => {
      if (!scene) return null;
      for (let i = 0; i < 2400; i++) scene.update(prog, idx);
      const p = scene.getCameraPos();
      return { cam: { x: p.x, y: p.y, z: p.z }, progress: prog, activeIndex: idx };
    },
    pickAt: (cx, cy) => {
      if (!scene) return null;
      const hit = scene.pick((cx / window.innerWidth) * 2 - 1, -(cy / window.innerHeight) * 2 + 1);
      return hit ? { kind: hit.kind, index: hit.index, tip: hit.tip } : null;
    },
    interactAt: (cx, cy) => {
      if (!scene) return null;
      const hit = scene.pick((cx / window.innerWidth) * 2 - 1, -(cy / window.innerHeight) * 2 + 1);
      if (hit) scene.interact({ kind: hit.kind, index: hit.index });
      return hit ? { kind: hit.kind, index: hit.index, tip: hit.tip } : null;
    },
    project: (kind, index) => {
      if (!scene) return null;
      const p = scene.projectPickable(kind, index);
      if (!p) return null;
      return { x: Math.round((p.x * 0.5 + 0.5) * innerWidth), y: Math.round((-p.y * 0.5 + 0.5) * innerHeight) };
    },
    reactive: () => (scene ? scene.getReactiveState() : null),
    framed: () => (scene ? scene.getFramedPanel() : null),
    panelScreenSize: (i) => (scene ? scene.panelScreenSize(i) : null),
    panelCanvas: (i, night) => {
      if (!scene) return null;
      const c = scene.getPanelCanvas(i, night);
      return c ? { w: c.width, h: c.height, dataUrl: c.toDataURL("image/png") } : null;
    },
  };
}
