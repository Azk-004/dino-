import { STATIONS, CHAPITRES, COURSE } from "./data.js";
import { renderIllustration } from "./illustrations.js";

export function initCourse({ onExit, onScrollTo, onQuiz }) {
  const root = document.getElementById("ui-course");
  const tocEl = root.querySelector("#course-toc");
  const sectionsEl = root.querySelector("#course-sections");
  const coverEl = root.querySelector("#course-cover");
  const closeBtn = root.querySelector("#course-close");
  const quizBtn = root.querySelector("#course-quiz-btn");
  const mainEl = root.querySelector(".course-main");
  const scrollTo = onScrollTo || ((top) => mainEl.scrollTo({ top, behavior: "smooth" }));
  let isOpen = false;

  // ---------------- Cover ----------------
  coverEl.innerHTML = `
    <div class="course-cover-kicker">${COURSE.module} — Formation</div>
    <h1 class="course-cover-title">${COURSE.title}</h1>
    <div class="course-cover-sub">${COURSE.subtitle}</div>
    <div class="course-cover-rule"></div>
    <p class="course-cover-desc">Lecture complète et illustrée du cours. Avancez section par section, chaque étape est accompagnée d'une illustration de son contexte.</p>
    <div class="course-cover-meta"><span>${STATIONS.length} étapes</span><span>12 questions finales</span></div>
  `;

  // ---------------- Sections + TOC ----------------
  const tocHtml = [];
  const secHtml = [];
  CHAPITRES.forEach((ch, ci) => {
    const stations = STATIONS.filter((s) => s.chapter === ci);
    if (!stations.length) return;
    tocHtml.push(`<div class="toc-chapter"><div class="toc-chapter-name">${ch.name}</div><div class="toc-chapter-label">${ch.label}</div></div>`);
    stations.forEach((st) => {
      tocHtml.push(`<a href="#course-sec-${st.id}" class="toc-item" data-id="${st.id}"><span class="toc-num">${st.num}</span><span>${st.title}</span></a>`);
    });
  });

  STATIONS.forEach((st) => {
    const ch = CHAPITRES[st.chapter];
    const isQuiz = st.id === "quiz";
    let body = "";
    if (isQuiz) {
      body = `<ul class="course-bullets">${st.bullets.map((b) => `<li>${b}</li>`).join("")}</ul>`;
    } else {
      body = st.content.map((block) => `<p><span class="course-body-t">${block.t}</span>${block.b}</p>`).join("");
    }
    secHtml.push(`
      <section class="course-section" id="course-sec-${st.id}">
        <img class="course-illus" alt="Illustration — ${st.title}" />
        <div class="course-sec-meta">
          <span class="course-sec-chapter">${ch ? `${ch.name} · ${ch.label}` : ""}</span>
          <span class="course-sec-num">${st.num} / ${String(STATIONS.length).padStart(2, "0")}</span>
        </div>
        <h2 class="course-sec-title">${st.title}</h2>
        <div class="course-sec-rule"></div>
        <div class="course-sec-content">${body}</div>
      </section>
    `);
  });

  tocEl.innerHTML = tocHtml.join("");
  sectionsEl.innerHTML = secHtml.join("");

  // ---------------- Render illustrations ----------------
  sectionsEl.querySelectorAll(".course-illus").forEach((img) => {
    const id = img.closest(".course-section").id.replace("course-sec-", "");
    const canvas = document.createElement("canvas");
    renderIllustration(canvas, id, 1280, 760);
    img.src = canvas.toDataURL("image/jpeg", 0.86);
  });

  // ---------------- Navigation ----------------
  tocEl.addEventListener("click", (e) => {
    const item = e.target.closest(".toc-item");
    if (!item) return;
    const sec = document.getElementById("course-sec-" + item.dataset.id);
    if (sec) {
      scrollTo(sec.offsetTop - 90);
      tocEl.querySelectorAll(".toc-item").forEach((t) => t.classList.toggle("active", t === item));
    }
  });

  function setActiveToc() {
    let current = STATIONS[0].id;
    for (const st of STATIONS) {
      const sec = document.getElementById("course-sec-" + st.id);
      if (sec && sec.offsetTop - 120 <= mainEl.scrollTop) current = st.id;
    }
    tocEl.querySelectorAll(".toc-item").forEach((t) => t.classList.toggle("active", t.dataset.id === current));
  }
  mainEl.addEventListener("scroll", setActiveToc, { passive: true });

  closeBtn.addEventListener("click", onExit);
  quizBtn.addEventListener("click", onQuiz);

  // ---------------- Open / close ----------------
  function open() {
    isOpen = true;
    document.body.classList.add("mode-course");
    setTimeout(() => setActiveToc(), 80);
  }

  function close() {
    isOpen = false;
    document.body.classList.remove("mode-course");
  }

  return { open, close, isOpen: () => isOpen };
}
