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
