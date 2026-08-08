import Lenis from "lenis";
import { createScene } from "./scene.js";
import { initUI } from "./ui.js";
import { initCourse } from "./course.js";
import { STATIONS } from "./data.js";
import "./style.css";

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
  const isCourse = mode === "course";
  const isOpen = course.isOpen();
  if (isOpen) course.close();
  if (isCourse) course.open();
  document.getElementById("mode-journey").classList.toggle("active", !isCourse);
  document.getElementById("mode-course-btn").classList.toggle("active", isCourse);
  if (isCourse) {
    lenis.stop();
    courseLenis?.start();
  } else {
    courseLenis?.stop();
    lenis.start();
  }
}

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

// ---------------- Scroll length ----------------
const UNITS = N + 2; // intro + stations + outro
const scrollEl = document.getElementById("scroll");
function layout() {
  const total = UNITS * window.innerHeight;
  scrollEl.style.height = total + "px";
}
layout();

// ---------------- Lenis + ScrollTrigger ----------------
const lenis = new Lenis({
  duration: 1.12,
  smoothWheel: true,
  touchMultiplier: 1.5,
  wheelMultiplier: 1.0,
});

const courseMainEl = document.querySelector("#ui-course .course-main");
courseLenis = new Lenis({
  wrapper: courseMainEl,
  content: courseMainEl,
  duration: 1.15,
  smoothWheel: true,
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

lenis.on("scroll", ({ scroll }) => {
  onScroll(scroll);
});

onScroll(window.scrollY || 0);

// ---------------- Render loop ----------------
scene.update(progress, activeIndex);

function loop() {
  scene.update(progress, activeIndex);
  ui.updateGlobal(progress, activeIndex);
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
    if (e.key === "Escape") ui.closeReader();
    else if (e.key === "ArrowLeft") ui.readerNav(-1);
    else if (e.key === "ArrowRight") ui.readerNav(1);
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
  const step = window.innerHeight;
  if (e.key === "ArrowDown" || e.key === "PageDown") {
    e.preventDefault();
    lenis.scrollTo(window.scrollY + step, { duration: 1.1 });
  } else if (e.key === "ArrowUp" || e.key === "PageUp") {
    e.preventDefault();
    lenis.scrollTo(Math.max(0, window.scrollY - step), { duration: 1.1 });
  }
});

// Lock page scroll while the lesson reader is open
ui.setReaderListener((open) => {
  if (open) {
    lenis.stop();
  } else {
    lenis.start();
  }
});

// ---------------- Clickable world ----------------
function toNDC(e) {
  return {
    nx: (e.clientX / window.innerWidth) * 2 - 1,
    ny: -(e.clientY / window.innerHeight) * 2 + 1,
  };
}

window.addEventListener("click", (e) => {
  if (course.isOpen()) return;
  if (ui.isReaderOpen()) return;
  if (e.target.closest && e.target.closest("#ui")) return;
  const { nx, ny } = toNDC(e);
  const hit = scene.pick(nx, ny);
  if (!hit) return;
  if (hit.kind === "panel") ui.openReader(hit.index);
  else if (hit.kind === "sign") ui.showToast(hit.tip);
});

let hoverQueued = false;
window.addEventListener("mousemove", (e) => {
  if (hoverQueued) return;
  hoverQueued = true;
  requestAnimationFrame(() => {
    hoverQueued = false;
    if (course.isOpen()) return;
    if (ui.isReaderOpen()) return;
    const { nx, ny } = toNDC(e);
    const hit = scene.pick(nx, ny);
    document.body.classList.toggle("hover-pick", !!hit);
    scene.setHover(hit && hit.kind === "panel" ? hit.index : -1);
  });
});

// Debug hook for headless verification
window.__panneautique = {
  openReader: ui.openReader,
  closeReader: ui.closeReader,
  openCourse: () => setMode("course"),
  closeCourse: () => setMode("journey"),
  pickAt: (cx, cy) => {
    const hit = scene.pick((cx / window.innerWidth) * 2 - 1, -(cy / window.innerHeight) * 2 + 1);
    return hit ? { kind: hit.kind, index: hit.index, tip: hit.tip } : null;
  },
  getState: () => {
    const p = scene.getCameraPos();
    return { progress, activeIndex, cam: { x: p.x, y: p.y, z: p.z } };
  },
  settle: (prog, idx) => {
    for (let i = 0; i < 2400; i++) scene.update(prog, idx);
    const p = scene.getCameraPos();
    return { cam: { x: p.x, y: p.y, z: p.z }, progress: prog, activeIndex: idx };
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
