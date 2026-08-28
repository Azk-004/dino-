/* ==========================================================================
   Authentification et données locales - aucune base de données.
   Comptes, codes et session vivent uniquement dans le navigateur
   (localStorage). Le code à 4 chiffres est affiché à l'écran : rien n'est
   envoyé par email. Suffit pour la démonstration et le mode hors ligne.
   ========================================================================== */

const ACCOUNTS_KEY = "panneau-accounts";
const SESSION_KEY = "panneau-session";

const listeners = new Set();

function readAccounts() {
  try {
    return JSON.parse(localStorage.getItem(ACCOUNTS_KEY)) || {};
  } catch {
    return {};
  }
}

function writeAccounts(accounts) {
  try {
    localStorage.setItem(ACCOUNTS_KEY, JSON.stringify(accounts));
  } catch {
    /* stockage indisponible */
  }
}

function randCode() {
  const array = new Uint32Array(1);
  crypto.getRandomValues(array);
  return String(Math.floor(1000 + (array[0] / (0xffffffff + 1)) * 9000));
}

function emit(event, session) {
  listeners.forEach((cb) => {
    try {
      cb({ event, session });
    } catch {
      /* ignore */
    }
  });
}

function makeUser(email) {
  let id = email;
  try {
    id = btoa(email);
  } catch {
    /* ignore */
  }
  return { id, email };
}

async function generateSignature(data) {
  // Use a simple secret for demo, in real world this should come from secure environment config
  const secretKey = import.meta.env?.VITE_JWT_SECRET || "panotik-local-secret-key-2026";
  const encoder = new TextEncoder();
  const key = await crypto.subtle.importKey(
    'raw',
    encoder.encode(secretKey),
    { name: 'HMAC', hash: 'SHA-256' },
    false,
    ['sign']
  );
  const signature = await crypto.subtle.sign('HMAC', key, encoder.encode(data));
  return Array.from(new Uint8Array(signature)).map(b => b.toString(16).padStart(2, '0')).join('');
}

async function makeSession(email) {
  const user = makeUser(email);
  const dataToSign = JSON.stringify(user);
  const signature = await generateSignature(dataToSign);
  return { user, access_token: `local_${email}`, signature, _data: dataToSign };
}

async function getSession() {
  try {
    const rawData = localStorage.getItem(SESSION_KEY);
    if (!rawData) return null;
    
    const parsed = JSON.parse(rawData);
    
    // Verify signature
    const expectedSignature = await generateSignature(parsed._data);
    if (parsed.signature !== expectedSignature) {
       console.warn("Invalid session signature");
       return null;
    }
    
    return parsed;
  } catch {
    return null;
  }
}

async function getUser() {
  const session = await getSession();
  return session ? session.user : null;
}

// Map d'essais { email: { attempts: number, lockUntil: number } }
const loginAttempts = {};

function isAdmin(email) {
  // Use environment variable if available, otherwise fallback (for demo only)
  const adminEmail = import.meta.env?.VITE_ADMIN_EMAIL || "";
  return adminEmail && String(email || "").trim().toLowerCase() === adminEmail.toLowerCase();
}

async function emailRegistered(email) {
  const accounts = readAccounts();
  return { ok: true, exists: Boolean(accounts[email]) || isAdmin(email) };
}

async function createAccount(email) {
  const accounts = readAccounts();
  if (!accounts[email]) accounts[email] = {};
  accounts[email].code = randCode();
  writeAccounts(accounts);
  return { ok: true, demoCode: accounts[email].code };
}

async function sendLoginCode(email) {
  const accounts = readAccounts();
  if (!accounts[email]) accounts[email] = {};
  accounts[email].code = randCode();
  writeAccounts(accounts);
  return { ok: true, demoCode: accounts[email].code };
}

async function verifyLoginCode(email, code) {
  const accounts = readAccounts();
  const normalizedEmail = String(email || "").trim().toLowerCase();
  
  // Check lockout status
  const attemptInfo = loginAttempts[normalizedEmail] || { attempts: 0, lockUntil: 0 };
  if (attemptInfo.lockUntil > Date.now()) {
    const remainingMinutes = Math.ceil((attemptInfo.lockUntil - Date.now()) / 60000);
    return { ok: false, error: { message: `Compte verrouillé. Veuillez réessayer dans ${remainingMinutes} minute(s).` } };
  }
  
  const account = accounts[email];
  if (!account || account.code !== String(code).trim()) {
    // Record failed attempt
    attemptInfo.attempts += 1;
    if (attemptInfo.attempts >= 3) {
      attemptInfo.lockUntil = Date.now() + 5 * 60 * 1000; // 5 minutes lockout
    }
    loginAttempts[normalizedEmail] = attemptInfo;
    
    return { ok: false, error: { message: attemptInfo.attempts >= 3 ? "Compte verrouillé après 3 échecs." : "CODE_INVALID" } };
  }
  
  // Reset attempts on success
  loginAttempts[normalizedEmail] = { attempts: 0, lockUntil: 0 };
  return { ok: true, session: makeSession(email) };
}

async function setSession(session) {
  try {
    if (session) {
      localStorage.setItem(SESSION_KEY, JSON.stringify(session));
    } else {
      localStorage.removeItem(SESSION_KEY);
    }
  } catch {
    /* ignore */
  }
  emit("SIGNED_IN", session);
  return { ok: true };
}

async function signUp({ email }) {
  const r = await createAccount(email);
  return { ok: true, needsEmailConfirmation: false, user: makeUser(email) };
}

async function signIn({ email }) {
  return setSession(makeSession(email));
}

async function signOut() {
  try {
    localStorage.removeItem(SESSION_KEY);
  } catch {
    /* ignore */
  }
  emit("SIGNED_OUT", null);
  return { ok: true };
}

function onAuthChange(callback) {
  listeners.add(callback);
  return () => listeners.delete(callback);
}

/**
 * Lit la session du site Panotik depuis le localStorage partagé.
 * Deux modes : mode démo (panotik-demo-session) et mode Supabase
 * (sb-<ref>-auth-token).  Retourne { user: { id, email } } ou null.
 */
function readSiteSession() {
  try {
    // Mode démo
    const raw = localStorage.getItem("panotik-demo-session");
    if (raw) {
      const parsed = JSON.parse(raw);
      if (parsed?.user?.email) return parsed;
    }
  } catch {
    /* ignore */
  }
  try {
    // Mode Supabase : clé spécifique du projet
    const raw = localStorage.getItem("sb-rwpsmiranoxamrfyitzi-auth-token");
    if (raw) {
      const data = JSON.parse(raw);
      const session = data?.currentSession || data;
      const u = session?.user;
      if (u?.email) return { user: { id: u.id || u.email, email: u.email } };
    }
  } catch {
    /* ignore */
  }
  return null;
}

export const auth = {
  configured: true,
  getSession,
  getUser,
  signUp,
  signIn,
  signOut,
  onAuthChange,
  isAdmin,
  emailRegistered,
  createAccount,
  sendLoginCode,
  verifyLoginCode,
  setSession,
  sessionFor: (email) => makeSession(email),
  readSiteSession,
};

export const db = {
  configured: true,
  async trackVisit() {
    return true;
  },
  async trackLesson() {
    return true;
  },
  async saveQuizResult() {
    return true;
  },
  async sendContact() {
    return true;
  },
};
