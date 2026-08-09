import { STATIONS, CHAPITRES, COURSE } from "./data.js";
import { renderIllustration } from "./illustrations.js";
import { createLiveIllustration3D, renderIllustration3D } from "./illustration3d.js";

export function initCourse({ onExit, onScrollTo, onQuiz }) {
  const root = document.getElementById("ui-course");
  const tocEl = root.querySelector("#course-toc");
  const tocSelect = root.querySelector("#course-toc-select");
  const sectionsEl = root.querySelector("#course-sections");
  const coverEl = root.querySelector("#course-cover");
  const closeBtn = root.querySelector("#course-close");
  const quizBtn = root.querySelector("#course-quiz-btn");
  const mainEl = root.querySelector(".course-main");
  const scrollTo = onScrollTo || ((top) => mainEl.scrollTo({ top, behavior: "smooth" }));
  let isOpen = false;

  // ---------------- Cover ----------------
  coverEl.innerHTML = `
    <div class="course-cover-kicker">${COURSE.module} — Formation :</div>
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
        <canvas class="course-illus" role="img" aria-label="Illustration — ${st.title}"></canvas>
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

  const selectHtml = [];
  CHAPITRES.forEach((ch, ci) => {
    const stations = STATIONS.filter((s) => s.chapter === ci);
    if (!stations.length) return;
    selectHtml.push(`<optgroup label="${ch.name}">`);
    stations.forEach((st) => selectHtml.push(`<option value="${st.id}">${st.num} · ${st.title}</option>`));
    selectHtml.push(`</optgroup>`);
  });
  tocSelect.innerHTML = selectHtml.join("");

  // ---------------- Render illustrations ----------------
  // 1) Peinture 2D instantanée (toujours disponible, affichée immédiatement).
  // 2) Quand une section approche du viewport, remplacement par une illustration
  //    3D EN DIRECT (three.js) : animée en continu, avec parallaxe liée au scroll.
  //    La boucle est mise en pause dès que la section sort de l'écran (perf).
  const illusItems = [];
  sectionsEl.querySelectorAll(".course-illus").forEach((canvas) => {
    const id = canvas.closest(".course-section").id.replace("course-sec-", "");
    // Placeholder 2D instantané — peint sur un canvas temporaire puis affiché en
    // arrière-plan CSS : le canvas cible reste réservé au WebGL (un canvas ne peut
    // avoir qu'un seul type de contexte).
    const tmp = document.createElement("canvas");
    renderIllustration(tmp, id, 1280, 760);
    canvas.style.backgroundImage = `url(${tmp.toDataURL("image/jpeg", 0.86)})`;
    canvas.style.backgroundSize = "cover";
    canvas.style.backgroundPosition = "center";
    illusItems.push({ canvas, id, live: null, raf: 0, p: 0, running: false });
  });
  const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  function parallaxOf(el) {
    const r = el.getBoundingClientRect();
    const c = mainEl.getBoundingClientRect();
    const denom = r.height + c.height || 1;
    return Math.min(1, Math.max(0, (c.bottom - r.top) / denom));
  }

  function startLoop(item) {
    if (!item.live || item.running) return;
    item.running = true;
    item.p = parallaxOf(item.canvas);
    let last = performance.now();
    const step = (now) => {
      if (!item.running) return;
      const dt = Math.min(0.05, Math.max(0.001, (now - last) / 1000));
      last = now;
      item.p = parallaxOf(item.canvas);
      item.live.render(now * 0.001, dt, item.p);
      item.raf = requestAnimationFrame(step);
    };
    item.raf = requestAnimationFrame(step);
  }
  function stopLoop(item) {
    if (!item.running) return;
    item.running = false;
    cancelAnimationFrame(item.raf);
  }

  const io = new IntersectionObserver((entries) => {
    for (const en of entries) {
      const item = illusItems.find((it) => it.canvas === en.target);
      if (!item) continue;
      if (en.isIntersecting) {
        if (!item.live) {
          const st = STATIONS.find((s) => s.id === item.id);
          if (st) {
            if (!reducedMotion) item.live = createLiveIllustration3D(st, STATIONS.indexOf(st), item.canvas, 1280, 760);
            if (!item.live) {
              // Repli pro : illustration 3D statique (ou 2D si WebGL indisponible)
              const url = renderIllustration3D(st, STATIONS.indexOf(st));
              if (url) item.canvas.style.backgroundImage = `url(${url})`;
            }
          }
        }
        startLoop(item);
      } else {
        stopLoop(item);
      }
    }
  }, { root: mainEl, rootMargin: "420px 0px 420px 0px", threshold: 0 });
  illusItems.forEach((it) => io.observe(it.canvas));

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
    if (tocSelect.value !== current) tocSelect.value = current;
  }
  mainEl.addEventListener("scroll", setActiveToc, { passive: true });

  tocSelect.addEventListener("change", () => {
    const sec = document.getElementById("course-sec-" + tocSelect.value);
    if (sec) scrollTo(sec.offsetTop - 90);
  });

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
    illusItems.forEach((it) => stopLoop(it));
  }

  return { open, close, isOpen: () => isOpen };
}
