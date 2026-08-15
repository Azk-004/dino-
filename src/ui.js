import { STATIONS, QUIZ, CHAPITRES } from "./data.js";
import { db, auth } from "./lib/supabase.js";

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
    readerPanel: $(".reader-panel"),
    readerProg: $("#reader-progress-fill"),
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
  let onQuizChange = null;
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
    if (onQuizChange) onQuizChange(isQuiz);

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

  function updateGlobal(progress, activeIndex, framed) {
    setProgress(progress);
    showStation(activeIndex, progress);
    setTitle(progress);
    const quizShown = el.quiz.classList.contains("show");
    el.clickHint.classList.toggle("visible", activeIndex >= 0 && !quizShown && !state.readerOpen);
    // Pendant qu'un panneau est lu (approche rapprochée), la carte de station
    // s'efface pour ne jamais recouvrir le texte des panneaux.
    const reading = !!framed && framed.dist < 14;
    el.card.classList.toggle("panel-focus", reading && activeIndex >= 0 && !quizShown);
  }

  // ---------------- Lesson reader ----------------
  function openReader(i) {
    if (!guardAccess()) return; // leçon verrouillée tant que le compte n'est pas débloqué
    state.readerIndex = i;
    state.readerOpen = true;
    const st = STATIONS[i];
    // Leçon ouverte → on l'enregistre (Supabase, silencieux si non configuré)
    if (st.id !== "quiz") db.trackLesson(i, st.title);
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
    // Chaque leçon s'ouvre en haut de son contenu (après remplissage)
    el.readerPanel.scrollTop = 0;
    updateReaderProgress();
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

  // Barre de progression de lecture : suit le défilement dans le panneau
  function updateReaderProgress() {
    if (!el.readerProg) return;
    const max = el.readerPanel.scrollHeight - el.readerPanel.clientHeight;
    el.readerProg.style.width = (max > 0 ? (el.readerPanel.scrollTop / max) * 100 : 100) + "%";
  }
  el.readerPanel.addEventListener("scroll", updateReaderProgress, { passive: true });

  el.readerClose.addEventListener("click", closeReader);
  el.readerPrev.addEventListener("click", () => readerNav(-1));
  el.readerNext.addEventListener("click", () => readerNav(1));
  el.reader.addEventListener("click", (e) => {
    if (e.target === el.reader) closeReader();
  });
  el.cardOpen.addEventListener("click", () => {
    if (state.activeIndex >= 0) openReader(state.activeIndex);
  });

  // ---------------- Questionnaire : boutons du résultat (attachés une seule fois) ----------------
  document.querySelector("#quiz-retry").addEventListener("click", () => {
    state.quizAnswered.clear();
    state.score = 0;
    document.querySelector("#quiz-score").textContent = 0;
    el.quizFill.style.width = "0%";
    el.quizResult.classList.add("hide");
    renderQuiz(state, el, guardAccess);
  });
  document.querySelector("#quiz-restart").addEventListener("click", () => {
    // Déverrouille la page avant de remonter au début du parcours
    if (onQuizChange) onQuizChange(false);
    window.scrollTo({ top: 0, behavior: "smooth" });
  });

  // ---------------- Toast ----------------
  function showToast(text) {
    el.toast.textContent = text;
    el.toast.classList.add("show");
    clearTimeout(toastTimer);
    toastTimer = setTimeout(() => el.toast.classList.remove("show"), 4600);
  }

  renderQuiz(state, el, guardAccess);

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

  // ---------------- Taille du texte (accessibilité) ----------------
  const tsizeBtns = document.querySelectorAll(".tsize-btn");
  function applyTsize(level) {
    const root = document.documentElement;
    root.classList.toggle("ts-sm", level === 0);
    root.classList.toggle("ts-lg", level === 2);
    tsizeBtns.forEach((b) => {
      const active = Number(b.dataset.tsize) === level;
      b.classList.toggle("active", active);
      b.setAttribute("aria-pressed", String(active));
    });
    try { localStorage.setItem("panneau-tsize", String(level)); } catch (e) { /* stockage indisponible */ }
  }
  let savedTsize = 1;
  try {
    const v = Number(localStorage.getItem("panneau-tsize"));
    if (v >= 0 && v <= 2) savedTsize = v;
  } catch (e) { /* ignore */ }
  applyTsize(savedTsize);
  tsizeBtns.forEach((b) => b.addEventListener("click", () => applyTsize(Number(b.dataset.tsize))));

  // ---------------- Formulaire de contact ----------------
  const contactWrap = $("#ui-contact");
  const contactForm = $("#contact-form");
  const contactStatus = $("#contact-status");
  const contactName = $("#contact-name");
  const contactEmail = $("#contact-email");
  const contactMessage = $("#contact-message");
  let contactSending = false;
  function openContact() {
    contactWrap.classList.add("show");
    contactWrap.setAttribute("aria-hidden", "false");
    contactStatus.textContent = "";
    setTimeout(() => contactName && contactName.focus(), 60);
  }
  function closeContact() {
    contactWrap.classList.remove("show");
    contactWrap.setAttribute("aria-hidden", "true");
  }
  document.querySelector("#contact-open").addEventListener("click", openContact);
  document.querySelector("#contact-close").addEventListener("click", closeContact);
  contactWrap.addEventListener("click", (e) => { if (e.target === contactWrap) closeContact(); });

  // ---------------- Espace personnel : connexion par email + code ----------------
  // Connexion « email + code à 4 chiffres » : aucun mot de passe saisi. Le code
  // est envoyé par email (Edge Function Supabase + Resend) et crée la session.
  // Le compte admin (auth.isAdmin) se connecte directement, sans code.
  const authWrap = $("#ui-auth");
  const authWizard = $("#auth-wizard");
  const authSignedIn = $("#auth-signedin");
  const authUserEmail = $("#auth-user-email");
  const authAvatarLetter = $("#auth-avatar-letter");
  const authOpenBtn = document.querySelector("#auth-open");
  const authLabelFull = authOpenBtn.querySelector(".auth-label-full");
  const authEmail = $("#auth-email");
  const authCodeEmail = $("#auth-code-email");
  const authSteps = document.querySelectorAll(".auth-step");
  const codeInputs = document.querySelectorAll(".g-code-input");
  const statusEls = {
    email: $("#auth-status-email"),
    code: $("#auth-status-code"),
  };
  let currentUser = null;
  let unlocked = false; // leçon débloquée (code vérifié) pour cette session
  let pendingEmail = ""; // email en cours de connexion
  let authSending = false;
  let resendCooldown = 0; // secondes avant de pouvoir renvoyer le code

  function stepEl(name) {
    return document.querySelector(`.auth-step[data-step="${name}"]`);
  }
  function showStep(name) {
    authSteps.forEach((s) => { s.hidden = s.dataset.step !== name; });
    const st = stepEl(name);
    setTimeout(() => {
      const input = st && st.querySelector("input");
      if (input) input.focus();
    }, 70);
    if (name === "code") authCodeEmail.textContent = pendingEmail;
  }
  function setStepStatus(name, text, kind) {
    const box = statusEls[name];
    if (!box) return;
    box.textContent = text || "";
    box.classList.toggle("ok", kind === "ok");
    box.classList.toggle("err", kind === "err");
  }
  function clearStepStatuses() {
    Object.values(statusEls).forEach((b) => {
      if (b) { b.textContent = ""; b.classList.remove("ok", "err"); }
    });
  }

  function openAuth(opts = {}) {
    authWrap.classList.add("show");
    authWrap.setAttribute("aria-hidden", "false");
    clearStepStatuses();
    if (!auth.configured) {
      authWizard.hidden = false;
      authSignedIn.hidden = true;
      showStep("email");
      setStepStatus("email", "L'authentification n'est pas disponible : la base Supabase n'est pas configurée.", "err");
      return;
    }
    // Déjà connecté → panneau « Mon compte », ou étape code si la leçon n'est pas débloquée
    if (currentUser) {
      if (auth.isAdmin(currentUser.email) || unlocked) {
        authSignedIn.hidden = false;
        authWizard.hidden = true;
        return;
      }
      pendingEmail = currentUser.email;
      authSignedIn.hidden = true;
      authWizard.hidden = false;
      showStep("code");
      requestCode(currentUser.email);
      return;
    }
    authSignedIn.hidden = true;
    authWizard.hidden = false;
    showStep(opts.step || "email");
  }
  function closeAuth() {
    authWrap.classList.remove("show");
    authWrap.setAttribute("aria-hidden", "true");
  }

  // État connecté / déconnecté : panneau + bouton de la topbar + accès aux leçons.
  // `event` distingue une vraie connexion (SIGNED_IN → un code sera demandé) d'une
  // session restaurée (INITIAL_SESSION / TOKEN_REFRESHED → on garde le déblocage).
  function applyAuthState(user, event = "") {
    currentUser = user;
    const signedIn = !!user;
    const isAdmin = signedIn && auth.isAdmin(user.email);
    if (signedIn) {
      authLabelFull.textContent = "Mon compte";
      authOpenBtn.title = user.email || "Mon compte";
      authUserEmail.textContent = user.email || "";
      authAvatarLetter.textContent = (user.email || "?")[0].toUpperCase();
    } else {
      authLabelFull.textContent = "Se connecter";
      authOpenBtn.title = "Créer un compte ou se connecter";
    }
    if (!signedIn) {
      unlocked = false;
    } else if (isAdmin) {
      unlocked = true;
    } else if (event === "INITIAL_SESSION" || event === "TOKEN_REFRESHED") {
      try {
        unlocked = sessionStorage.getItem(`panneau-unlocked-${user.id}`) === "1";
      } catch (e) { unlocked = false; }
    } else if (event === "SIGNED_IN") {
      unlocked = false; // nouvelle connexion → le code à 4 chiffres débloque la leçon
    }
  }

  // Les leçons (lecteur, cours illustré, questionnaire) exigent un compte débloqué.
  // Sans Supabase configuré, tout reste ouvert (mode démo).
  function accessGranted() {
    if (!auth.configured) return true;
    if (!currentUser) return false;
    return auth.isAdmin(currentUser.email) || unlocked;
  }
  function openAuthForAccess() {
    if (currentUser) {
      showToast("Saisissez le code reçu par email pour débloquer la leçon.");
      openAuth({ step: "code" });
    } else {
      showToast("Connectez-vous pour accéder à la formation.");
      openAuth({ step: "email" });
    }
  }
  function guardAccess() {
    if (accessGranted()) return true;
    openAuthForAccess();
    return false;
  }

  // Envoi du code à 4 chiffres (Edge Function), avec compte à rebours anti-spam
  function requestCode(email, force = false) {
    if (authSending) return;
    if (!force && resendCooldown > 0) return; // un code est déjà en route
    authSending = true;
    setStepStatus("code", "Envoi du code…", "");
    auth.sendLoginCode(email).then((r) => {
      authSending = false;
      if (!r.ok) {
        setStepStatus("code", codeErrorText(r.error?.message), "err");
        return;
      }
      setStepStatus("code", "", "");
      startResendCooldown(60);
    });
  }
  function startResendCooldown(seconds) {
    resendCooldown = seconds;
    renderResendTimer();
  }
  function renderResendTimer() {
    const btn = document.querySelector("#auth-resend");
    const timer = document.querySelector("#auth-resend-timer");
    if (!btn || !timer) return;
    if (resendCooldown > 0) {
      btn.disabled = true;
      timer.hidden = false;
      timer.textContent = `dans ${resendCooldown} s`;
      setTimeout(() => {
        resendCooldown--;
        renderResendTimer();
      }, 1000);
    } else {
      btn.disabled = false;
      timer.hidden = true;
    }
  }
  function codeErrorText(code) {
    const c = String(code || "").toUpperCase();
    if (c === "ACCOUNT_NOT_FOUND") return "Aucun compte trouvé avec cette adresse. Cliquez sur « Créer un compte » pour continuer.";
    if (c === "ALREADY_EXISTS") return "Un compte existe déjà avec cette adresse : un code vient d'être envoyé.";
    if (c === "CREATE_FAILED") return "La création du compte a échoué, réessayez dans un instant.";
    if (c === "INVALID_EMAIL") return "L'adresse email semble incorrecte.";
    if (c === "EMAIL_NOT_CONFIGURED") return "Le service d'envoi d'email n'est pas encore configuré côté serveur.";
    if (c === "EMAIL_SEND_FAILED") return "L'envoi du code a échoué, réessayez dans un instant.";
    if (c === "CODE_RATE_LIMITED") return "Un code a déjà été envoyé : attendez une minute avant de renvoyer.";
    if (c === "CODE_INVALID") return "Ce code est incorrect ou a expiré. Vérifiez l'email reçu.";
    if (c === "DB_ERROR") return "Le service de code rencontre un problème, réessayez dans un instant.";
    return friendlyAuthError(code);
  }

  // --- Étape 1 : l'email — détection du compte, création, connexion admin ---
  function validEmail(email) {
    return /^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(email);
  }
  // Applique une session renvoyée par l'Edge Function (code validé ou admin)
  function applySession(session, toastText) {
    auth.setSession(session).then(() => {
      unlocked = true;
      try {
        sessionStorage.setItem(`panneau-unlocked-${currentUser?.id || pendingEmail}`, "1");
      } catch (e) { /* stockage indisponible */ }
      closeAuth();
      if (toastText) showToast(toastText);
    });
  }
  function highlightCreate() {
    const btn = document.querySelector("#auth-create");
    if (!btn) return;
    btn.classList.add("g-link-accent");
    setTimeout(() => btn.classList.remove("g-link-accent"), 5000);
  }
  // Compte admin : vérifie/crée le compte puis connexion directe (sans code)
  function connectAdmin(email) {
    authSending = true;
    setStepStatus("email", "Connexion…", "");
    auth.createAccount(email).then((cr) => {
      if (!cr.ok && cr.error?.message !== "ALREADY_EXISTS") {
        authSending = false;
        setStepStatus("email", codeErrorText(cr.error?.message), "err");
        return;
      }
      auth.sendLoginCode(email).then((r) => {
        authSending = false;
        if (!r.ok || !r.session) {
          setStepStatus("email", codeErrorText(r.error?.message), "err");
          return;
        }
        applySession(r.session, "Connecté en tant qu'administrateur.");
      });
    });
  }
  document.querySelector("#auth-next-email").addEventListener("click", () => {
    if (authSending) return;
    const email = authEmail.value.trim().toLowerCase();
    if (!validEmail(email)) {
      setStepStatus("email", "L'adresse email semble incorrecte.", "err");
      return;
    }
    pendingEmail = email;
    if (auth.isAdmin(email)) { connectAdmin(email); return; }
    authSending = true;
    setStepStatus("email", "Vérification du compte…", "");
    auth.emailRegistered(email).then((r) => {
      authSending = false;
      if (!r.ok) {
        setStepStatus("email", friendlyAuthError(r.error?.message), "err");
        return;
      }
      if (!r.exists) {
        setStepStatus("email", "Aucun compte trouvé avec cette adresse. Cliquez sur « Créer un compte » pour continuer.", "err");
        highlightCreate();
        return;
      }
      clearStepStatuses();
      showStep("code");
      requestCode(email, true);
    });
  });
  document.querySelector("#auth-create").addEventListener("click", () => {
    if (authSending) return;
    const email = authEmail.value.trim().toLowerCase();
    if (!validEmail(email)) {
      setStepStatus("email", "L'adresse email semble incorrecte.", "err");
      return;
    }
    pendingEmail = email;
    if (auth.isAdmin(email)) { connectAdmin(email); return; }
    authSending = true;
    setStepStatus("email", "Création du compte…", "");
    auth.createAccount(email).then((r) => {
      authSending = false;
      if (!r.ok && r.error?.message !== "ALREADY_EXISTS") {
        setStepStatus("email", codeErrorText(r.error?.message), "err");
        return;
      }
      clearStepStatuses();
      showStep("code");
      requestCode(email, true);
    });
  });
  authEmail.addEventListener("keydown", (e) => {
    if (e.key === "Enter") document.querySelector("#auth-next-email").click();
  });
  document.querySelector("#auth-back-code").addEventListener("click", () => {
    clearStepStatuses();
    showStep("email");
  });

  // --- Étape 2 : le code à 4 chiffres ---
  function codeValue() {
    return Array.from(codeInputs).map((i) => i.value).join("");
  }
  function clearCodeInputs() {
    codeInputs.forEach((i) => { i.value = ""; i.classList.remove("filled"); });
    if (codeInputs[0]) codeInputs[0].focus();
  }
  function submitCode() {
    if (authSending) return;
    const code = codeValue();
    if (code.length !== 4) {
      setStepStatus("code", "Saisissez les 4 chiffres du code reçu par email.", "err");
      return;
    }
    authSending = true;
    setStepStatus("code", "Vérification…", "");
    auth.verifyLoginCode(pendingEmail, code).then((r) => {
      authSending = false;
      if (!r.ok) {
        setStepStatus("code", codeErrorText(r.error?.message), "err");
        clearCodeInputs();
        return;
      }
      if (r.session) {
        applySession(r.session, "Code validé — la leçon est débloquée. Bonne formation !");
      } else {
        unlocked = true;
        closeAuth();
        showToast("Code validé — la leçon est débloquée. Bonne formation !");
      }
    });
  }
  codeInputs.forEach((input, idx) => {
    input.addEventListener("input", () => {
      input.value = input.value.replace(/\D/g, "").slice(0, 1);
      input.classList.toggle("filled", !!input.value);
      if (input.value && idx < codeInputs.length - 1) codeInputs[idx + 1].focus();
      if (codeValue().length === 4) submitCode();
    });
    input.addEventListener("keydown", (e) => {
      if (e.key === "Backspace" && !input.value && idx > 0) codeInputs[idx - 1].focus();
      if (e.key === "Enter") submitCode();
    });
    input.addEventListener("paste", (e) => {
      e.preventDefault();
      const text = (e.clipboardData.getData("text") || "").replace(/\D/g, "").slice(0, 4);
      codeInputs.forEach((ci, i2) => {
        ci.value = text[i2] || "";
        ci.classList.toggle("filled", !!ci.value);
      });
      if (text.length === 4) submitCode();
    });
  });
  document.querySelector("#auth-verify-code").addEventListener("click", submitCode);
  document.querySelector("#auth-resend").addEventListener("click", () => {
    if (resendCooldown > 0 || authSending) return;
    requestCode(pendingEmail, true);
  });

  document.querySelector("#auth-close").addEventListener("click", closeAuth);
  authWrap.addEventListener("click", (e) => { if (e.target === authWrap) closeAuth(); });
  authOpenBtn.addEventListener("click", () => openAuth());
  document.querySelector("#auth-signout").addEventListener("click", () => {
    auth.signOut().then((r) => {
      if (r.ok) {
        unlocked = false;
        closeAuth();
        showToast("Vous êtes déconnecté.");
      } else {
        showToast("La déconnexion a échoué, réessayez.");
      }
    });
  });
  // Échap ferme le panneau (même en plein formulaire)
  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape" && authWrap.classList.contains("show")) closeAuth();
  });

  // Restaure l'état de session au démarrage, puis écoute les changements
  auth.getSession().then((session) => {
    applyAuthState(session?.user || null, "INITIAL_SESSION");
    // « Il faut se connecter avant d'accéder à la leçon » : pour un visiteur sans
    // compte, la page de connexion s'affiche d'abord, en pleine page.
    if (auth.configured && !session?.user) openAuth();
  });
  auth.onAuthChange(({ event, session }) => applyAuthState(session?.user || null, event));
  // Envoi du formulaire : enregistré dans Supabase (table contact_messages).
  // Si la base n'est pas configurée (.env absent), on garde une simulation locale
  // pour que le site reste utilisable en démonstration.
  contactForm.addEventListener("submit", (e) => {
    e.preventDefault();
    if (contactSending) return;
    if (!contactName.value.trim() || !contactEmail.value.trim() || !contactMessage.value.trim()) {
      contactStatus.classList.remove("ok");
      contactStatus.classList.add("err");
      contactStatus.textContent = "Merci de remplir tous les champs.";
      return;
    }
    if (!/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(contactEmail.value.trim())) {
      contactStatus.classList.remove("ok");
      contactStatus.classList.add("err");
      contactStatus.textContent = "L'adresse email semble incorrecte.";
      return;
    }
    contactSending = true;
    contactStatus.classList.remove("ok", "err");
    contactStatus.textContent = "Envoi en cours…";
    const payload = {
      name: contactName.value.trim(),
      email: contactEmail.value.trim(),
      message: contactMessage.value.trim(),
    };
    db.sendContact(payload).then((sent) => {
      contactSending = false;
      if (sent || !db.configured) {
        // Envoyé (ou base non configurée : simulation locale)
        contactStatus.classList.add("ok");
        contactStatus.textContent = "Merci, votre message est bien parti.";
        contactForm.reset();
        setTimeout(closeContact, 2200);
      } else {
        contactStatus.classList.add("err");
        contactStatus.textContent = "L'envoi a échoué, veuillez réessayer dans un instant.";
      }
    });
  });

  return {
    updateGlobal, el, openReader, closeReader, readerNav,
    showToast, isReaderOpen: () => state.readerOpen,
    quizOpen, answerQuiz,
    openContact, closeContact, openAuth, closeAuth,
    isAuthOpen: () => authWrap.classList.contains("show"),
    accessGranted,
    setReaderListener: (fn) => { onReaderChange = fn; },
    setQuizListener: (fn) => { onQuizChange = fn; },
    setQuizShown: (v) => { if (onQuizChange) onQuizChange(v); },
  };
}

// Messages d'erreur d'authentification lisibles (messages Supabase en anglais)
function friendlyAuthError(msg = "") {
  const m = String(msg).toLowerCase();
  if (m.includes("invalid login credentials")) return "Email ou mot de passe incorrect.";
  if (m.includes("already registered")) return "Un compte existe déjà avec cette adresse email.";
  if (m.includes("email not confirmed")) return "Adresse email non confirmée : vérifiez votre boîte mail (et les courriers indésirables).";
  if (m.includes("too many") || m.includes("rate limit")) return "Trop de requêtes : patientez quelques minutes avant de réessayer.";
  if (m.includes("password should be")) return "Le mot de passe doit contenir au moins 6 caractères.";
  return msg || "Une erreur est survenue, réessayez.";
}

function renderQuiz(state, el, guard) {
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
        if (guard && !guard()) return; // répondre au quiz exige un compte débloqué
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

  el.resultTitle.textContent = pct >= 70 ? "Formation validée." : "Formation à revoir.";
  const wrong = QUIZ.length - state.score;
  el.resultText.innerHTML = `Score : <strong>${state.score} / ${QUIZ.length}</strong> — ${msg}<br><span class="result-breakdown">${state.score} bonne${state.score > 1 ? "s" : ""} réponse${state.score > 1 ? "s" : ""} · ${wrong} à revoir</span>`;
  el.quizResult.classList.remove("hide");
  if (pct >= 70) celebrate();
  // Résultat final → enregistré dans la base (Supabase, silencieux si non configuré)
  db.saveQuizResult(state.score, QUIZ.length);
}

// Petite pluie de confettis aux couleurs du site quand la formation est validée
const CONFETTI_COLORS = ["#c08a68", "#cfa574", "#9db87f", "#8a9ab8", "#d2a678", "#e0c9a0"];
let confettiLayer = null;
function celebrate() {
  if (!confettiLayer) {
    confettiLayer = document.createElement("div");
    confettiLayer.id = "confetti-layer";
    document.body.appendChild(confettiLayer);
  }
  const count = 110;
  for (let i = 0; i < count; i++) {
    const p = document.createElement("span");
    p.className = "confetti-piece" + (Math.random() < 0.3 ? " circle" : "");
    p.style.left = Math.random() * 100 + "vw";
    p.style.background = CONFETTI_COLORS[(Math.random() * CONFETTI_COLORS.length) | 0];
    p.style.opacity = (0.55 + Math.random() * 0.45).toFixed(2);
    const dur = 2.4 + Math.random() * 2.2;
    const delay = Math.random() * 0.9;
    p.style.animation = `confettiFall ${dur}s cubic-bezier(0.2, 0.6, 0.4, 1) ${delay}s forwards`;
    confettiLayer.appendChild(p);
    setTimeout(() => p.remove(), (dur + delay + 0.2) * 1000);
  }
  setTimeout(() => {
    if (confettiLayer && !confettiLayer.childElementCount) confettiLayer.remove();
  }, 6200);
}
