import { createClient } from "@supabase/supabase-js";

/* ==========================================================================
   Supabase — base de données du parcours.
   Client « paresseux » : il ne s'initialise que si les variables
   VITE_SUPABASE_URL et VITE_SUPABASE_ANON_KEY sont présentes au build.
   Sans elles (ou si une requête échoue : table absente, réseau…), chaque
   fonction se comporte en no-op et le site fonctionne comme avant.
   Les tables doivent exister dans le projet Supabase — voir supabase/schema.sql.
   ========================================================================== */

const SUPABASE_URL = import.meta.env.VITE_SUPABASE_URL;
const SUPABASE_ANON_KEY = import.meta.env.VITE_SUPABASE_ANON_KEY;

const configured = Boolean(SUPABASE_URL && SUPABASE_ANON_KEY);

let client = null;
function getClient() {
  if (!configured) return null;
  if (!client) client = createClient(SUPABASE_URL, SUPABASE_ANON_KEY);
  return client;
}

// Supabase (supabase-js) ne lève pas d'exception sur un statut 4xx : il résout
// avec `{ data, error }`. On vérifie donc systématiquement `error`.
async function insert(table, payload) {
  const c = getClient();
  if (!c) return { ok: false, error: { message: "Supabase non configuré" } };
  const { error } = await c.from(table).insert(payload);
  return { ok: !error, error };
}

function warn(label, err) {
  console.warn(`[supabase] ${label} :`, err?.message || err);
}

/* ==========================================================================
   Authentification (Supabase Auth — email + mot de passe).
   Création de compte / connexion / déconnexion. Les comptes sont gérés par
   Supabase (auth.users) et chaque inscription crée automatiquement une fiche
   dans public.profiles (voir supabase/migrations).
   ========================================================================== */

function authError(message) {
  return { message };
}

// Compte administrateur : connexion directe sans code à 4 chiffres (voir aussi
// la constante ADMIN_EMAIL de l'Edge Function).
export const ADMIN_EMAIL = "aurelazk004@gmail.com";

/* Appel à l'Edge Function `login-code` (création / envoi / vérification du
   code à 4 chiffres). Aucune session requise : le code reçu par email fait
   foi. Si une session existe, on transmet son jeton (inutile mais sans effet). */
async function callEdge(action, payload = {}) {
  const c = getClient();
  if (!c) return { ok: false, error: authError("Supabase non configuré") };
  try {
    const { data } = await c.auth.getSession();
    const token = data?.session?.access_token;
    const res = await fetch(`${SUPABASE_URL}/functions/v1/login-code`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        apikey: SUPABASE_ANON_KEY,
        ...(token ? { Authorization: `Bearer ${token}` } : {}),
      },
      body: JSON.stringify({ action, ...payload }),
    });
    const body = await res.json().catch(() => ({}));
    if (!res.ok || body.ok === false) {
      return { ok: false, error: authError(body.error || "Erreur du service de code") };
    }
    return body;
  } catch (err) {
    return { ok: false, error: authError(err.message || String(err)) };
  }
}

async function getSession() {
  const c = getClient();
  if (!c) return null;
  const { data } = await c.auth.getSession();
  return data.session || null;
}

export const auth = {
  configured,

  /** Session courante (ou null si personne n'est connecté). */
  async getSession() {
    return getSession();
  },

  /** Utilisateur courant (ou null). */
  async getUser() {
    const s = await getSession();
    return s ? s.user : null;
  },

  /** Inscription avec email + mot de passe. */
  async signUp({ email, password }) {
    const c = getClient();
    if (!c) return { ok: false, error: authError("Supabase non configuré") };
    try {
      const { data, error } = await c.auth.signUp({
        email: String(email).trim().toLowerCase(),
        password: String(password),
      });
      if (error) return { ok: false, error: authError(error.message) };
      // Si la confirmation d'email est activée dans le projet, `session` est
      // null après l'inscription : on informe l'utilisateur de vérifier sa boîte.
      return {
        ok: true,
        needsEmailConfirmation: !data.session,
        user: data.user || null,
      };
    } catch (err) {
      return { ok: false, error: authError(err.message || String(err)) };
    }
  },

  /** Connexion avec email + mot de passe. */
  async signIn({ email, password }) {
    const c = getClient();
    if (!c) return { ok: false, error: authError("Supabase non configuré") };
    try {
      const { data, error } = await c.auth.signInWithPassword({
        email: String(email).trim().toLowerCase(),
        password: String(password),
      });
      if (error) return { ok: false, error: authError(error.message) };
      return { ok: true, session: data.session, user: data.user || null };
    } catch (err) {
      return { ok: false, error: authError(err.message || String(err)) };
    }
  },

  /** Déconnexion. */
  async signOut() {
    const c = getClient();
    if (!c) return { ok: true };
    try {
      const { error } = await c.auth.signOut();
      return { ok: !error, error: error ? authError(error.message) : null };
    } catch (err) {
      return { ok: false, error: authError(err.message || String(err)) };
    }
  },

  /** Écoute les changements d'état (connexion / déconnexion). */
  onAuthChange(callback) {
    const c = getClient();
    if (!c) {
      return () => {};
    }
    const { data } = c.auth.onAuthStateChange((event, session) => {
      callback({ event, session });
    });
    return () => data.subscription.unsubscribe();
  },

  /** Vrai si l'email est celui du compte administrateur. */
  isAdmin(email) {
    return String(email || "").trim().toLowerCase() === ADMIN_EMAIL;
  },

  /** Détection « style Google » : un compte existe-t-il pour cet email ? */
  async emailRegistered(email) {
    const c = getClient();
    if (!c) return { ok: false, error: authError("Supabase non configuré") };
    try {
      const { data, error } = await c.rpc("email_registered", {
        p_email: String(email).trim().toLowerCase(),
      });
      if (error) return { ok: false, error: authError(error.message) };
      return { ok: true, exists: !!data };
    } catch (err) {
      return { ok: false, error: authError(err.message || String(err)) };
    }
  },

  /** Crée le compte avec un mot de passe aléatoire (Edge Function). */
  async createAccount(email) {
    return callEdge("create", { email: String(email).trim().toLowerCase() });
  },

  /** Envoie le code à 4 chiffres par email (Edge Function). */
  async sendLoginCode(email) {
    return callEdge("send", { email: String(email).trim().toLowerCase() });
  },

  /** Vérifie le code saisi et renvoie la session (Edge Function). */
  async verifyLoginCode(email, code) {
    return callEdge("verify", {
      email: String(email).trim().toLowerCase(),
      code: String(code).trim(),
    });
  },

  /** Applique une session renvoyée par l'Edge Function. */
  async setSession(session) {
    const c = getClient();
    if (!c) return { ok: false, error: authError("Supabase non configuré") };
    try {
      const { error } = await c.auth.setSession(session);
      return { ok: !error, error: error ? authError(error.message) : null };
    } catch (err) {
      return { ok: false, error: authError(err.message || String(err)) };
    }
  },
};

export const db = {
  configured,

  /** Visite de page (au chargement du site). */
  async trackVisit(page = window.location.pathname) {
    const r = await insert("page_visits", {
      page,
      referrer: document.referrer || null,
      screen: `${window.screen.width}x${window.screen.height}`,
      user_agent: navigator.userAgent.slice(0, 400),
    });
    if (!r.ok) warn("trackVisit", r.error);
    return r.ok;
  },

  /** Ouverture d'une leçon (panneau du parcours). */
  async trackLesson(index, title = "") {
    const r = await insert("lesson_reads", {
      lesson_index: index,
      lesson_title: String(title).slice(0, 200),
    });
    if (!r.ok) warn("trackLesson", r.error);
    return r.ok;
  },

  /** Résultat final du questionnaire. */
  async saveQuizResult(score, total) {
    const r = await insert("quiz_results", {
      score,
      total,
      percent: total > 0 ? Math.round((score / total) * 100) : 0,
      passed: total > 0 && score / total >= 0.7,
    });
    if (!r.ok) warn("saveQuizResult", r.error);
    return r.ok;
  },

  /** Message du formulaire de contact. */
  async sendContact({ name, email, message }) {
    const r = await insert("contact_messages", {
      name: String(name).slice(0, 120),
      email: String(email).slice(0, 200),
      message: String(message).slice(0, 4000),
    });
    if (!r.ok) warn("sendContact", r.error);
    return r.ok;
  },
};
