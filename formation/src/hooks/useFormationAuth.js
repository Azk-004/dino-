import { useCallback, useEffect, useRef, useState } from "react";
import { auth } from "../lib/local.js";

// Connexion « email + code à 4 chiffres » (aucun mot de passe) : l'assistant de
// connexion vit dans AuthModal, ici on gère la session, le déblocage des leçons
// et l'état global connecté/déconnecté (port de la logique de l'ancien ui.js).
export function useFormationAuth({ showToast }) {
  const [user, setUser] = useState(null);
  const [unlocked, setUnlocked] = useState(false);
  const [authOpen, setAuthOpen] = useState(false);
  const [authStep, setAuthStep] = useState("email");

  const userRef = useRef(null);
  const unlockedRef = useRef(false);
  const showToastRef = useRef(showToast);
  showToastRef.current = showToast;

  // `event` distingue une vraie connexion (SIGNED_IN → un code sera demandé)
  // d'une session restaurée (INITIAL_SESSION → on garde le déblocage en cours).
  const applyAuthState = useCallback((u, event = "") => {
    userRef.current = u;
    setUser(u);
    if (!u) {
      unlockedRef.current = false;
      setUnlocked(false);
    } else if (auth.isAdmin(u.email)) {
      unlockedRef.current = true;
      setUnlocked(true);
    } else if (event === "INITIAL_SESSION" || event === "TOKEN_REFRESHED") {
      let ok = false;
      try {
        ok = sessionStorage.getItem(`panneau-unlocked-${u.id}`) === "1";
      } catch (e) {
        ok = false;
      }
      unlockedRef.current = ok;
      setUnlocked(ok);
    } else if (event === "SIGNED_IN") {
      unlockedRef.current = false; // nouvelle connexion → le code débloque la leçon
      setUnlocked(false);
    }
  }, []);

  const markUnlocked = useCallback(() => {
    unlockedRef.current = true;
    setUnlocked(true);
  }, []);

  useEffect(() => {
    auth.getSession().then((s) => {
      if (s?.user) {
        applyAuthState(s.user, "INITIAL_SESSION");
        // Session restaurée (utilisateur déjà connecté) : on ferme l'écran de connexion.
        setAuthOpen(false);
        return;
      }
      // Pas de session formation : l'utilisateur est peut-être déjà connecté au site
      // Panotik (démo via panotik-demo-session, ou Supabase via sb-*-auth-token).
      // Dans ce cas on importe sa session pour ne pas lui demander de se reconnecter.
      const site = auth.readSiteSession();
      if (site?.user?.email) {
        const ses = auth.sessionFor(site.user.email);
        auth.setSession(ses).then(() => {
          applyAuthState(ses.user, "SIGNED_IN");
          markUnlocked();
          try {
            sessionStorage.setItem(`panneau-unlocked-${ses.user.id}`, "1");
          } catch (e) {
            /* stockage indisponible */
          }
          setAuthOpen(false);
        });
      }
    });
    return auth.onAuthChange(({ event, session }) => applyAuthState(session?.user || null, event));
  }, [applyAuthState, markUnlocked]);

  // Les leçons (lecteur, cours illustré, questionnaire) exigent un compte débloqué.
  const accessGranted = useCallback(() => {
    if (!auth.configured) return true;
    if (!userRef.current) return false;
    return auth.isAdmin(userRef.current.email) || unlockedRef.current;
  }, []);

  const setSessionAndUnlock = useCallback(
    (session, toastText) => {
      auth.setSession(session).then(() => {
        markUnlocked();
        try {
          sessionStorage.setItem(`panneau-unlocked-${userRef.current?.id || ""}`, "1");
        } catch (e) {
          /* stockage indisponible */
        }
        setAuthOpen(false);
        if (toastText) showToastRef.current?.(toastText);
      });
    },
    [markUnlocked]
  );

  const signOut = useCallback(() => {
    auth.signOut().then((r) => {
      if (r.ok) {
        unlockedRef.current = false;
        setUnlocked(false);
        setAuthOpen(false);
        window.location.href = "/";
      } else {
        showToastRef.current?.("La déconnexion a échoué, réessayez.");
      }
    });
  }, []);

  const openAuth = useCallback((opts = {}) => {
    setAuthStep(opts.step || "email");
    setAuthOpen(true);
  }, []);

  const closeAuth = useCallback(() => setAuthOpen(false), []);

  return {
    user,
    unlocked,
    authOpen,
    authStep,
    configured: auth.configured,
    applyAuthState,
    accessGranted,
    markUnlocked,
    setSessionAndUnlock,
    signOut,
    openAuth,
    closeAuth,
  };
}
