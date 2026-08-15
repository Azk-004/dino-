// ============================================================================
// login-code — Connexion « email + code à 4 chiffres » (aucun mot de passe saisi)
// ----------------------------------------------------------------------------
// Actions (POST) :
//   { "action": "create", "email": "x@y.fr" }
//       → crée le compte avec un mot de passe aléatoire (stocké dans
//         public.auth_secrets, accessible uniquement par le rôle de service).
//   { "action": "send", "email": "x@y.fr" }
//       → envoie le code à 4 chiffres par email (Resend). Pour le compte admin
//         (ADMIN_EMAIL) : connexion directe, la session est renvoyée sans code.
//   { "action": "verify", "email": "x@y.fr", "code": "1234" }
//       → valide le code, signe l'utilisateur avec son mot de passe stocké et
//         renvoie la session (le client l'applique via auth.setSession).
//
// Aucune session n'est requise : le code reçu par email EST la preuve
// d'appartenance de l'adresse. Chaque envoi est limité (1 par email / minute).
//
// Secrets nécessaires sur le projet Supabase :
//   RESEND_API_KEY   (clé API Resend — obligatoire pour l'envoi réel)
//   RESEND_FROM      (expéditeur, défaut : Panneautique <onboarding@resend.dev>)
// ============================================================================

import { createClient } from "npm:@supabase/supabase-js@2";
import { Resend } from "npm:resend@6";

const SUPABASE_URL = Deno.env.get("SUPABASE_URL") ?? "";
const SERVICE_ROLE_KEY = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY") ?? "";
const RESEND_API_KEY = Deno.env.get("RESEND_API_KEY") ?? "";
const RESEND_FROM = Deno.env.get("RESEND_FROM") ?? "Panneautique <onboarding@resend.dev>";

const ADMIN_EMAIL = "aurelazk004@gmail.com";
const CODE_TTL_MS = 10 * 60 * 1000; // 10 minutes
const COOLDOWN_MS = 60 * 1000; // 1 minute entre deux envois pour un même email

const EMAIL_RE = /^[^@\s]+@[^@\s]+\.[^@\s]+$/;

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
  "Access-Control-Allow-Methods": "POST, OPTIONS",
};

const supabase = createClient(SUPABASE_URL, SERVICE_ROLE_KEY);

function json(body, status = 200) {
  return new Response(JSON.stringify(body), {
    status,
    headers: { ...corsHeaders, "Content-Type": "application/json" },
  });
}

async function sha256(text) {
  const data = new TextEncoder().encode(text);
  const digest = await crypto.subtle.digest("SHA-256", data);
  return Array.from(new Uint8Array(digest)).map((b) => b.toString(16).padStart(2, "0")).join("");
}

function randomCode() {
  return String(1000 + Math.floor(Math.random() * 9000)); // 1000 → 9999
}

function randomPassword() {
  // Alphanumérique lisible (sans 0/O, 1/l) — 16 caractères
  const chars = "ABCDEFGHJKLMNPQRSTUVWXYZabcdefghijkmnopqrstuvwxyz23456789";
  const bytes = crypto.getRandomValues(new Uint8Array(16));
  let out = "";
  for (const b of bytes) out += chars[b % chars.length];
  return out;
}

function codeEmailHtml(code) {
  return `
    <div style="font-family:Arial,Helvetica,sans-serif;max-width:480px;margin:0 auto;padding:28px;color:#3a2e1f;background:#fdfaf2;border:1px solid #e6d8ba;border-radius:14px">
      <h2 style="font-size:20px;margin:0 0 10px;color:#3a2e1f">Panneautique — votre code de connexion</h2>
      <p style="font-size:15px;line-height:1.6;margin:0 0 18px">Utilisez ce code à 4 chiffres pour accéder à la formation. Il expire dans 10 minutes.</p>
      <div style="font-size:36px;font-weight:700;letter-spacing:12px;background:#f0e6cf;border:1px solid #e0cfae;border-radius:10px;padding:18px;text-align:center;margin:0 0 18px">${code}</div>
      <p style="font-size:13px;color:#8a7450;margin:0">Si vous n'êtes pas à l'origine de cette demande, ignorez simplement cet email.</p>
    </div>
  `;
}

/** Un compte existe-t-il (interrogation de auth.users via la fonction RPC) ? */
async function accountExists(email) {
  const { data, error } = await supabase.rpc("email_registered", { p_email: email });
  if (error) {
    console.error("login-code email_registered error:", error.message);
    return null;
  }
  return !!data;
}

/** Mot de passe aléatoire stocké à la création du compte. */
async function storedPassword(email) {
  const { data, error } = await supabase
    .from("auth_secrets")
    .select("password")
    .eq("email", email)
    .maybeSingle();
  if (error) {
    console.error("login-code auth_secrets error:", error.message);
    return null;
  }
  return data?.password ?? null;
}

/** Crée le compte (email + mot de passe aléatoire, confirmé d'office). */
async function handleCreate(body) {
  const email = String(body.email ?? "").trim().toLowerCase();
  if (!EMAIL_RE.test(email)) {
    return json({ ok: false, error: "INVALID_EMAIL" });
  }

  const exists = await accountExists(email);
  if (exists) {
    return json({ ok: false, error: "ALREADY_EXISTS" });
  }
  if (exists === null) {
    return json({ ok: false, error: "SERVER_ERROR" }, 500);
  }

  const password = randomPassword();
  const { data, error } = await supabase.auth.admin.createUser({
    email,
    password,
    email_confirm: true, // pas d'email de confirmation : le code fait foi
  });
  if (error) {
    console.error("login-code createUser error:", error.message);
    return json({ ok: false, error: "CREATE_FAILED" });
  }

  const { error: secretError } = await supabase
    .from("auth_secrets")
    .upsert({ email, password }, { onConflict: "email" });
  if (secretError) {
    console.error("login-code auth_secrets upsert error:", secretError.message);
    return json({ ok: false, error: "SERVER_ERROR" }, 500);
  }

  return json({ ok: true, created: true, id: data?.user?.id });
}

/** Envoie le code — ou connexion directe pour l'admin. */
async function handleSend(body) {
  const email = String(body.email ?? "").trim().toLowerCase();
  if (!EMAIL_RE.test(email)) {
    return json({ ok: false, error: "INVALID_EMAIL" });
  }

  // Compte admin : connexion directe, sans code à 4 chiffres.
  if (email === ADMIN_EMAIL) {
    const password = await storedPassword(email);
    if (!password) {
      return json({ ok: false, error: "ACCOUNT_NOT_FOUND" });
    }
    const { data, error } = await supabase.auth.signInWithPassword({ email, password });
    if (error || !data?.session) {
      console.error("login-code admin signin error:", error?.message);
      return json({ ok: false, error: "SERVER_ERROR" }, 500);
    }
    return json({ ok: true, admin: true, session: data.session });
  }

  const exists = await accountExists(email);
  if (exists === false) {
    return json({ ok: false, error: "ACCOUNT_NOT_FOUND" });
  }
  if (exists === null) {
    return json({ ok: false, error: "SERVER_ERROR" }, 500);
  }

  if (!RESEND_API_KEY) {
    return json({ ok: false, error: "EMAIL_NOT_CONFIGURED" });
  }

  // Anti-spam : un seul code par email toutes les 60 s.
  const { data: last } = await supabase
    .from("login_codes")
    .select("created_at")
    .eq("email", email)
    .order("created_at", { ascending: false })
    .limit(1);
  const lastCreated = last && last[0] ? new Date(last[0].created_at).getTime() : 0;
  if (Date.now() - lastCreated < COOLDOWN_MS) {
    return json({ ok: false, error: "CODE_RATE_LIMITED" });
  }

  // Purge : on invalide les anciens codes de cet email, on nettoie les expirés.
  await supabase.from("login_codes").delete().eq("email", email);
  await supabase.from("login_codes").delete().lt("expires_at", new Date().toISOString());

  const code = randomCode();
  const codeHash = await sha256(`${email}:${code}`);
  const { error: insertError } = await supabase.from("login_codes").insert({
    email,
    code_hash: codeHash,
    expires_at: new Date(Date.now() + CODE_TTL_MS).toISOString(),
  });
  if (insertError) {
    console.error("login-code insert error:", insertError.message);
    return json({ ok: false, error: "DB_ERROR" }, 500);
  }

  try {
    const resend = new Resend(RESEND_API_KEY);
    const { error: sendError } = await resend.emails.send({
      from: RESEND_FROM,
      to: email,
      subject: "Votre code de connexion — Panneautique",
      html: codeEmailHtml(code),
    });
    if (sendError) {
      console.error("login-code resend error:", sendError.message);
      return json({ ok: false, error: "EMAIL_SEND_FAILED" });
    }
  } catch (err) {
    console.error("login-code resend exception:", err?.message ?? err);
    return json({ ok: false, error: "EMAIL_SEND_FAILED" });
  }

  return json({ ok: true, sentTo: email });
}

/** Valide le code et renvoie une session (connexion effective). */
async function handleVerify(body) {
  const email = String(body.email ?? "").trim().toLowerCase();
  const code = String(body.code ?? "").trim();
  if (!EMAIL_RE.test(email)) {
    return json({ ok: false, error: "INVALID_EMAIL" });
  }

  // Admin : pas de code attendu (connexion directe) — mesure défensive.
  if (email === ADMIN_EMAIL) {
    const password = await storedPassword(email);
    if (!password) return json({ ok: false, error: "ACCOUNT_NOT_FOUND" });
    const { data, error } = await supabase.auth.signInWithPassword({ email, password });
    if (error || !data?.session) return json({ ok: false, error: "SERVER_ERROR" }, 500);
    return json({ ok: true, unlocked: true, admin: true, session: data.session });
  }

  if (!/^\d{4}$/.test(code)) {
    return json({ ok: false, error: "CODE_INVALID" });
  }

  const { data, error } = await supabase
    .from("login_codes")
    .select("id, code_hash")
    .eq("email", email)
    .is("used_at", null)
    .gt("expires_at", new Date().toISOString())
    .order("created_at", { ascending: false })
    .limit(5);
  if (error) {
    console.error("login-code select error:", error.message);
    return json({ ok: false, error: "DB_ERROR" }, 500);
  }

  const hash = await sha256(`${email}:${code}`);
  const match = (data ?? []).find((row) => row.code_hash === hash);
  if (!match) {
    return json({ ok: false, error: "CODE_INVALID" });
  }

  await supabase
    .from("login_codes")
    .update({ used_at: new Date().toISOString() })
    .eq("id", match.id);

  // Le code est bon : on signe l'utilisateur avec son mot de passe stocké.
  const password = await storedPassword(email);
  if (!password) {
    return json({ ok: false, error: "SERVER_ERROR" }, 500);
  }
  const { data: signIn, error: signInError } = await supabase.auth.signInWithPassword({
    email,
    password,
  });
  if (signInError || !signIn?.session) {
    console.error("login-code signin error:", signInError?.message);
    return json({ ok: false, error: "SERVER_ERROR" }, 500);
  }

  return json({ ok: true, unlocked: true, session: signIn.session });
}

Deno.serve(async (req) => {
  if (req.method === "OPTIONS") {
    return new Response("ok", { status: 200, headers: corsHeaders });
  }
  if (req.method !== "POST") {
    return json({ ok: false, error: "METHOD_NOT_ALLOWED" }, 405);
  }

  try {
    const body = await req.json();
    const action = String(body.action ?? "");
    if (action === "create") return await handleCreate(body);
    if (action === "send") return await handleSend(body);
    if (action === "verify") return await handleVerify(body);
    return json({ ok: false, error: "UNKNOWN_ACTION" }, 400);
  } catch (err) {
    console.error("login-code error:", err?.message ?? err);
    return json({ ok: false, error: "SERVER_ERROR" }, 500);
  }
});
