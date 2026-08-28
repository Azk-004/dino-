import { useEffect, useRef, useState } from "react";
import { auth } from "../lib/local.js";

// Messages d'erreur d'authentification lisibles.
function friendlyAuthError(msg = "") {
  const m = String(msg).toLowerCase();
  if (m.includes("invalid login credentials")) return "Email ou mot de passe incorrect.";
  if (m.includes("already registered")) return "Un compte existe déjà avec cette adresse email.";
  if (m.includes("email not confirmed")) return "Adresse email non confirmée : vérifiez votre boîte mail (et les courriers indésirables).";
  if (m.includes("too many") || m.includes("rate limit")) return "Trop de requêtes : patientez quelques minutes avant de réessayer.";
  if (m.includes("password should be")) return "Le mot de passe doit contenir au moins 6 caractères.";
  return msg || "Une erreur est survenue, réessayez.";
}

function codeErrorText(code) {
  const c = String(code || "").toUpperCase();
  if (c === "ACCOUNT_NOT_FOUND") return "Aucun compte trouvé avec cette adresse. Cliquez sur « Créer un compte » pour continuer.";
  if (c === "ALREADY_EXISTS") return "Un compte existe déjà avec cette adresse : un code vient d'être envoyé.";
  if (c === "CREATE_FAILED") return "La création du compte a échoué, réessayez dans un instant.";
  if (c === "INVALID_EMAIL") return "L'adresse email semble incorrecte.";
  if (c === "EMAIL_NOT_CONFIGURED") return "Le service d'envoi d'email n'est pas encore configuré côté serveur.";
  if (c === "EMAIL_SEND_FAILED") return "Le code n'a pas pu être envoyé à cette adresse (l'expéditeur d'email n'est pas vérifié pour elle). Contactez l'administrateur de la formation.";
  if (c === "CODE_RATE_LIMITED") return "Un code a déjà été envoyé : attendez une minute avant de renvoyer.";
  if (c === "CODE_INVALID") return "Ce code est incorrect ou a expiré. Vérifiez l'email reçu.";
  if (c === "DB_ERROR") return "Le service de code rencontre un problème, réessayez dans un instant.";
  return friendlyAuthError(code);
}

function validEmail(email) {
  return /^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(email);
}

// Espace personnel : connexion « email + code à 4 chiffres » (aucun mot de passe).
// Port React de l'ancien assistant de ui.js (étapes email → code, compte admin direct).
export default function AuthModal({
  open,
  initialStep,
  user,
  unlocked,
  onClose,
  setSessionAndUnlock,
  markUnlocked,
  signOut,
  showToast,
}) {
  const [step, setStep] = useState("email");
  const [emailValue, setEmailValue] = useState("");
  const [code, setCode] = useState(["", "", "", ""]);
  const [pendingEmail, setPendingEmail] = useState("");
  const [sending, setSending] = useState(false);
  const [cooldown, setCooldown] = useState(0);
  const [status, setStatus] = useState({ email: { text: "", kind: "" }, code: { text: "", kind: "" } });
  const codeRefs = useRef([]);
  const emailRef = useRef(null);
  const sendingRef = useRef(false);
  sendingRef.current = sending;

  const setStepStatus = (name, text, kind) => {
    setStatus((prev) => ({ ...prev, [name]: { text, kind: kind || "" } }));
  };
  const clearStatuses = () => setStatus({ email: { text: "", kind: "" }, code: { text: "", kind: "" } });

  const showSignedIn = !!user && (auth.isAdmin(user.email) || unlocked);

  // Remise à zéro de l'assistant à chaque ouverture
  useEffect(() => {
    if (!open) return;
    clearStatuses();
    if (showSignedIn) return; // panneau « Mon compte »
    if (user) {
      setPendingEmail(user.email);
      setStep("code");
      requestCode(user.email, true);
      return;
    }
    setStep(initialStep || "email");
    setTimeout(() => emailRef.current?.focus(), 70);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [open]);

  // Envoi du code à 4 chiffres, avec compte à rebours anti-spam
  function requestCode(email, force = false) {
    if (sendingRef.current) return;
    if (!force && cooldown > 0) return; // un code est déjà en route
    sendingRef.current = true;
    setSending(true);
    setStepStatus("code", "Envoi du code…", "");
    auth.sendLoginCode(email).then((r) => {
      sendingRef.current = false;
      setSending(false);
      if (!r.ok) {
        setStepStatus("code", codeErrorText(r.error?.message), "err");
        return;
      }
      if (r.demoCode) {
        setStepStatus("code", `Code de démonstration : ${r.demoCode} - aucun email n'est envoyé (pas de base de données).`, "ok");
      } else {
        setStepStatus("code", "", "");
      }
      setCooldown(60);
    });
  }

  useEffect(() => {
    if (cooldown <= 0) return;
    const t = setTimeout(() => setCooldown((c) => c - 1), 1000);
    return () => clearTimeout(t);
  }, [cooldown]);

  // Compte admin : vérifie/crée le compte puis connexion directe (sans code)
  function connectAdmin(email) {
    sendingRef.current = true;
    setSending(true);
    setStepStatus("email", "Connexion…", "");
    auth.createAccount(email).then((cr) => {
      if (!cr.ok && cr.error?.message !== "ALREADY_EXISTS") {
        sendingRef.current = false;
        setSending(false);
        setStepStatus("email", codeErrorText(cr.error?.message), "err");
        return;
      }
      auth.sendLoginCode(email).then((r) => {
        sendingRef.current = false;
        setSending(false);
        if (!r.ok || !r.session) {
          setStepStatus("email", codeErrorText(r.error?.message), "err");
          return;
        }
        setSessionAndUnlock(r.session, "Connecté en tant qu'administrateur.");
      });
    });
  }

  function submitEmail(mode) {
    if (sendingRef.current) return;
    const email = emailValue.trim().toLowerCase();
    if (!validEmail(email)) {
      setStepStatus("email", "L'adresse email semble incorrecte.", "err");
      return;
    }
    setPendingEmail(email);
    if (auth.isAdmin(email)) {
      connectAdmin(email);
      return;
    }
    if (mode === "create") {
      sendingRef.current = true;
      setSending(true);
      setStepStatus("email", "Création du compte…", "");
      auth.createAccount(email).then((r) => {
        sendingRef.current = false;
        setSending(false);
        if (!r.ok && r.error?.message !== "ALREADY_EXISTS") {
          setStepStatus("email", codeErrorText(r.error?.message), "err");
          return;
        }
        clearStatuses();
        setStep("code");
        requestCode(email, true);
      });
      return;
    }
    sendingRef.current = true;
    setSending(true);
    setStepStatus("email", "Vérification du compte…", "");
    auth.emailRegistered(email).then((r) => {
      sendingRef.current = false;
      setSending(false);
      if (!r.ok) {
        setStepStatus("email", friendlyAuthError(r.error?.message), "err");
        return;
      }
      if (!r.exists) {
        setStepStatus("email", "Aucun compte trouvé avec cette adresse. Cliquez sur « Créer un compte » pour continuer.", "err");
        const btn = document.getElementById("auth-create");
        if (btn) {
          btn.classList.add("g-link-accent");
          setTimeout(() => btn.classList.remove("g-link-accent"), 5000);
        }
        return;
      }
      clearStatuses();
      setStep("code");
      requestCode(email, true);
    });
  }

  function clearCodeInputs() {
    setCode(["", "", "", ""]);
    setTimeout(() => codeRefs.current[0]?.focus(), 0);
  }

  function submitCode(joined = code.join("")) {
    if (sendingRef.current) return;
    if (joined.length !== 4) {
      setStepStatus("code", "Saisissez les 4 chiffres du code reçu par email.", "err");
      return;
    }
    sendingRef.current = true;
    setSending(true);
    setStepStatus("code", "Vérification…", "");
    auth.verifyLoginCode(pendingEmail, joined).then((r) => {
      sendingRef.current = false;
      setSending(false);
      if (!r.ok) {
        setStepStatus("code", codeErrorText(r.error?.message), "err");
        clearCodeInputs();
        return;
      }
      if (r.session) {
        setSessionAndUnlock(r.session, "Code validé - la leçon est débloquée. Bonne formation !");
      } else {
        markUnlocked();
        onClose();
        showToast("Code validé - la leçon est débloquée. Bonne formation !");
      }
    });
  }

  const onCodeChange = (idx, val) => {
    const v = val.replace(/\D/g, "").slice(0, 1);
    const next = [...code];
    next[idx] = v;
    setCode(next);
    if (v && idx < 3) codeRefs.current[idx + 1]?.focus();
    if (next.join("").length === 4) submitCode(next.join(""));
  };
  const onCodeKey = (idx, e) => {
    if (e.key === "Backspace" && !code[idx] && idx > 0) codeRefs.current[idx - 1]?.focus();
    if (e.key === "Enter") submitCode();
  };
  const onCodePaste = (e) => {
    e.preventDefault();
    const text = (e.clipboardData.getData("text") || "").replace(/\D/g, "").slice(0, 4);
    const next = [text[0] || "", text[1] || "", text[2] || "", text[3] || ""];
    setCode(next);
    if (text.length === 4) submitCode(next.join(""));
  };

  useEffect(() => {
    if (!open) return;
    const onKey = (e) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open, onClose]);

  return (
    <div id="ui-auth" className={"auth-wrap" + (open ? " show" : "")} aria-hidden={!open} onClick={(e) => { if (e.target === e.currentTarget) onClose(); }}>
      <div className="auth-panel" data-lenis-prevent>
        <button id="auth-close" className="auth-close" aria-label="Fermer" onClick={onClose}>×</button>

        <div id="auth-signedin" className="auth-signedin" hidden={!showSignedIn}>
          <div className="auth-kicker">Espace personnel</div>
          <h2 className="auth-title">Mon compte</h2>
          <div className="auth-rule"></div>
          <div className="auth-user">
            <div className="auth-avatar">
              <span id="auth-avatar-letter">{(user?.email || "?")[0].toUpperCase()}</span>
            </div>
            <div className="auth-user-info">
              <div className="auth-user-label">Connecté en tant que</div>
              <div id="auth-user-email" className="auth-user-email">{user?.email || ""}</div>
            </div>
          </div>
          <button id="auth-signout" className="auth-signout" onClick={signOut}>Se déconnecter</button>
        </div>

        {/* Assistant de connexion : email → code à 4 chiffres (aucun mot de passe) */}
        <div id="auth-wizard" className="g-wizard" hidden={showSignedIn}>
          <div className="g-brand">
            <span className="brand-mark"></span>
            <span className="g-brand-name">Panneautique</span>
          </div>

          <section className="auth-step" data-step="email" hidden={step !== "email"}>
            <h2 className="g-title">Se connecter</h2>
            <p className="g-sub">Utilisez votre compte Panneautique pour accéder à la formation. Un code à 4 chiffres s'affichera à l'écran.</p>
            <label className="g-field">
              <span>Adresse email</span>
              <input id="auth-email" name="email" type="email" autoComplete="email" placeholder="exemple@mail.com" value={emailValue} onChange={(e) => setEmailValue(e.target.value)} onKeyDown={(e) => { if (e.key === "Enter") submitEmail("next"); }} ref={emailRef} />
            </label>
            <div className="g-actions">
              <button id="auth-create" className="g-link" type="button" onClick={() => submitEmail("create")}>Créer un compte</button>
              <button id="auth-next-email" className="g-btn" type="button" onClick={() => submitEmail("next")}>Suivant</button>
            </div>
            <div id="auth-status-email" className={"auth-status" + (status.email.kind ? " " + status.email.kind : "")} role="status">
              {status.email.text}
            </div>
          </section>

          <section className="auth-step" data-step="code" hidden={step !== "code"}>
            <h2 className="g-title">Vérification</h2>
            <p className="g-sub">
              Un code à 4 chiffres a été généré pour <strong id="auth-code-email" className="g-email">{pendingEmail}</strong>. Saisissez-le pour accéder à la formation.
            </p>
            <div className="g-code" role="group" aria-label="Code à 4 chiffres">
              {[0, 1, 2, 3].map((i) => (
                <input
                  key={i}
                  className={"g-code-input" + (code[i] ? " filled" : "")}
                  inputMode="numeric"
                  autoComplete="one-time-code"
                  maxLength={1}
                  aria-label={`Chiffre ${i + 1}`}
                  value={code[i]}
                  onChange={(e) => onCodeChange(i, e.target.value)}
                  onKeyDown={(e) => onCodeKey(i, e)}
                  onPaste={onCodePaste}
                  ref={(el) => (codeRefs.current[i] = el)}
                />
              ))}
            </div>
            <div className="g-actions">
              <button id="auth-back-code" className="g-link" type="button" onClick={() => { clearStatuses(); setStep("email"); }}>Modifier l'email</button>
              <button id="auth-verify-code" className="g-btn" type="button" onClick={submitCode}>Vérifier</button>
            </div>
            <div className="g-resend">
              <span className="g-resend-text">Vous n'avez rien reçu ?</span>
              <button id="auth-resend" className="g-link" type="button" disabled={cooldown > 0} onClick={() => requestCode(pendingEmail, true)}>
                Renvoyer le code
              </button>
              <span id="auth-resend-timer" className="g-timer" hidden={cooldown <= 0}>dans {cooldown} s</span>
            </div>
            <div id="auth-status-code" className={"auth-status" + (status.code.kind ? " " + status.code.kind : "")} role="status">
              {status.code.text}
            </div>
          </section>
        </div>
      </div>
    </div>
  );
}
