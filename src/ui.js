import { STATIONS, QUIZ, CHAPITRES } from "./data.js";

const $ = (sel) => document.querySelector(sel);

export function initUI() {
  const el = {
    topbar: $("#ui-topbar"),
    chapter: $("#ui-chapter"),
    progressFill: $("#ui-progress-fill"),
    dots: $("#ui-dots"),
    hint: $("#ui-hint"),
    clickHint: $("#ui-click-hint"),
    title: $("#ui-title"),
    card: $("#ui-card"),
    cardKicker: $("#ui-card .card-kicker"),
    cardTitle: $("#ui-card .card-title"),
    cardBody: $("#ui-card .card-body"),
    quiz: $("#ui-quiz"),
    quizScore: $("#quiz-score"),
    quizList: $("#quiz-list"),
    quizFill: $("#quiz-progress-fill"),
    quizResult: $("#quiz-result"),
    resultTitle: $("#quiz-result .result-title"),
    resultText: $("#quiz-result .result-text"),
    reader: $("#ui-reader"),
    readerKicker: $("#ui-reader .reader-kicker"),
    readerTitle: $("#ui-reader .reader-title"),
    readerBody: $("#ui-reader .reader-body"),
    readerCount: $("#reader-count"),
    readerPrev: $("#reader-prev"),
    readerNext: $("#reader-next"),
    readerClose: $("#reader-close"),
    toast: $("#ui-toast"),
    cardOpen: $("#card-open"),
  };

  // Build dots
  STATIONS.forEach((st, i) => {
    const d = document.createElement("span");
    d.className = "dot" + (i === 0 ? " active" : "");
    d.dataset.index = i;
    el.dots.appendChild(d);
  });

  const state = {
    activeIndex: -1,
    quizAnswered: new Set(),
    score: 0,
    started: false,
    readerOpen: false,
    readerIndex: -1,
  };

  let onReaderChange = null;
  let toastTimer = null;

  function setProgress(ratio) {
    el.progressFill.style.width = (ratio * 100).toFixed(2) + "%";
  }

  function setChapter(chIndex) {
    const c = CHAPITRES[chIndex];
    el.chapter.textContent = c ? `${c.name} — ${c.label}` : "";
  }

  function showStation(i, progress) {
    if (i === state.activeIndex) return;
    state.activeIndex = i;
    const st = STATIONS[i];

    document.querySelectorAll(".dot").forEach((d, di) => {
      d.classList.toggle("active", di === i);
    });

    const isQuiz = st.id === "quiz";
    el.card.classList.toggle("show", !isQuiz && i !== -1);
    el.quiz.classList.toggle("show", isQuiz);

    if (!isQuiz) {
      el.cardKicker.textContent = st.kicker;
      el.cardTitle.textContent = st.title;
      el.cardBody.innerHTML = `<p class="card-note">Leçon prête à lire : ouvrez la fenêtre dédiée pour parcourir l'étape en entier.</p>`;
    }
    setChapter(st.chapter);
  }

  function setTitle(progress) {
    if (progress > 0.015) state.started = true;
    el.title.classList.toggle("hide", state.started);
  }

  function updateGlobal(progress, activeIndex) {
    setProgress(progress);
    showStation(activeIndex, progress);
    setTitle(progress);
    const quizShown = el.quiz.classList.contains("show");
    el.clickHint.classList.toggle("visible", activeIndex >= 0 && !quizShown && !state.readerOpen);
  }

  // ---------------- Lesson reader ----------------
  function openReader(i) {
    state.readerIndex = i;
    state.readerOpen = true;
    const st = STATIONS[i];
    el.readerKicker.textContent = st.kicker;
    el.readerTitle.textContent = st.title;
    el.readerBody.innerHTML = "";
    if (st.id === "quiz") {
      const ul = document.createElement("ul");
      ul.className = "reader-bullets";
      st.bullets.forEach((b) => {
        const li = document.createElement("li");
        li.textContent = b;
        ul.appendChild(li);
      });
      el.readerBody.appendChild(ul);
      const btn = document.createElement("button");
      btn.className = "reader-quiz-btn";
      btn.textContent = "Lancer le questionnaire";
      btn.addEventListener("click", closeReader);
      el.readerBody.appendChild(btn);
    } else {
      st.content.forEach((block) => {
        const p = document.createElement("p");
        const t = document.createElement("span");
        t.className = "body-t";
        t.textContent = block.t;
        p.appendChild(t);
        p.appendChild(document.createTextNode(block.b));
        el.readerBody.appendChild(p);
      });
    }
    el.readerCount.textContent = `${String(i + 1).padStart(2, "0")} / ${String(STATIONS.length).padStart(2, "0")}`;
    el.title.classList.add("hide");
    el.reader.classList.add("show");
    if (onReaderChange) onReaderChange(true);
  }

  function closeReader() {
    if (!state.readerOpen) return;
    state.readerOpen = false;
    el.reader.classList.remove("show");
    if (onReaderChange) onReaderChange(false);
  }

  function readerNav(delta) {
    if (!state.readerOpen) return;
    const ni = Math.max(0, Math.min(STATIONS.length - 1, state.readerIndex + delta));
    if (ni !== state.readerIndex) openReader(ni);
  }

  el.readerClose.addEventListener("click", closeReader);
  el.readerPrev.addEventListener("click", () => readerNav(-1));
  el.readerNext.addEventListener("click", () => readerNav(1));
  el.reader.addEventListener("click", (e) => {
    if (e.target === el.reader) closeReader();
  });
  el.cardOpen.addEventListener("click", () => {
    if (state.activeIndex >= 0) openReader(state.activeIndex);
  });

  // ---------------- Toast ----------------
  function showToast(text) {
    el.toast.textContent = text;
    el.toast.classList.add("show");
    clearTimeout(toastTimer);
    toastTimer = setTimeout(() => el.toast.classList.remove("show"), 4600);
  }

  renderQuiz(state, el);

  function quizOpen() {
    return el.quiz.classList.contains("show");
  }

  function answerQuiz(optionIndex) {
    if (!quizOpen()) return;
    const cards = el.quizList.querySelectorAll(".quiz-card");
    for (const card of cards) {
      if (card.classList.contains("done")) continue;
      const opts = card.querySelectorAll(".quiz-opt");
      if (optionIndex < opts.length) opts[optionIndex].click();
      return;
    }
  }

  return {
    updateGlobal, el, openReader, closeReader, readerNav,
    showToast, isReaderOpen: () => state.readerOpen,
    quizOpen, answerQuiz,
    setReaderListener: (fn) => { onReaderChange = fn; },
  };
}

function renderQuiz(state, el) {
  const list = el.quizList;
  list.innerHTML = "";
  QUIZ.forEach((item, i) => {
    const card = document.createElement("div");
    card.className = "quiz-card";
    card.innerHTML = `
      <div class="quiz-num">Question ${String(i + 1).padStart(2, "0")}</div>
      <div class="quiz-q"></div>
      <div class="quiz-opts"></div>
      <div class="quiz-explain"></div>
    `;
    card.querySelector(".quiz-q").textContent = item.q;

    const optsBox = card.querySelector(".quiz-opts");
    item.options.forEach((opt, oi) => {
      const b = document.createElement("button");
      b.className = "quiz-opt";
      b.innerHTML = `<span class="opt-letter">${String.fromCharCode(65 + oi)}.</span> <span class="opt-text"></span>`;
      b.querySelector(".opt-text").textContent = opt;
      b.addEventListener("click", () => {
        if (state.quizAnswered.has(i)) return;
        state.quizAnswered.add(i);
        const correct = oi === item.correct;
        optsBox.querySelectorAll(".quiz-opt").forEach((el2, oi2) => {
          if (oi2 === item.correct) el2.classList.add("correct");
          else if (oi2 === oi) el2.classList.add("wrong");
          else el2.classList.add("dim");
        });
        if (correct) {
          state.score++;
          document.querySelector("#quiz-score").textContent = state.score;
        }
        const ex = card.querySelector(".quiz-explain");
        ex.textContent = item.explain;
        ex.classList.add("show");
        card.classList.add("done", correct ? "correct-q" : "wrong-q");

        el.quizFill.style.width = ((state.quizAnswered.size / QUIZ.length) * 100).toFixed(2) + "%";
        if (state.quizAnswered.size === QUIZ.length) showResult(state, el);
      });
      optsBox.appendChild(b);
    });
    list.appendChild(card);
  });
}

function showResult(state, el) {
  const pct = Math.round((state.score / QUIZ.length) * 100);
  let msg;
  if (pct >= 90) msg = "Excellent ! Vous maîtrisez le module sur le bout des doigts.";
  else if (pct >= 70) msg = "Très bien ! Quelques points à consolider, mais la base est solide.";
  else if (pct >= 50) msg = "Bien. Relisez les leçons indiquées pour consolider vos acquis.";
  else msg = "Le module mérite une seconde lecture : remontez le parcours et revivez les étapes.";

  el.resultTitle.textContent = pct >= 70 ? "Formation validée" : "Formation à revoir";
  const wrong = QUIZ.length - state.score;
  el.resultText.innerHTML = `Score : <strong>${state.score} / ${QUIZ.length}</strong> — ${msg}<br><span class="result-breakdown">${state.score} bonne${state.score > 1 ? "s" : ""} réponse${state.score > 1 ? "s" : ""} · ${wrong} à revoir</span>`;
  el.quizResult.classList.remove("hide");

  document.querySelector("#quiz-retry").addEventListener("click", () => {
    state.quizAnswered.clear();
    state.score = 0;
    document.querySelector("#quiz-score").textContent = 0;
    el.quizFill.style.width = "0%";
    el.quizResult.classList.add("hide");
    renderQuiz(state, el);
  });

  document.querySelector("#quiz-restart").addEventListener("click", () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  });
}
