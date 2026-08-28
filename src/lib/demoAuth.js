// Authentification de démonstration (sans Supabase) : comptes et session
// stockés en localStorage. Suffisant pour le mode démo et hors ligne.

const USERS_KEY = 'panotik-demo-users';
const SESSION_KEY = 'panotik-demo-session';

function readUsers() {
  try {
    return JSON.parse(localStorage.getItem(USERS_KEY)) || {};
  } catch {
    return {};
  }
}

function writeUsers(users) {
  localStorage.setItem(USERS_KEY, JSON.stringify(users));
}

function normalizeEmail(email) {
  return String(email || '').trim().toLowerCase();
}

function makeUser(account) {
  return {
    id: account.email,
    email: account.email,
    full_name: account.full_name || '',
  };
}

function setSession(account) {
  const session = { user: makeUser(account) };
  localStorage.setItem(SESSION_KEY, JSON.stringify(session));
  return session;
}

function clearSession() {
  localStorage.removeItem(SESSION_KEY);
}

function getSession() {
  try {
    const raw = localStorage.getItem(SESSION_KEY);
    return raw ? JSON.parse(raw) : null;
  } catch {
    return null;
  }
}

export const demoAuth = {
  getSession,

  async signUp({ email, password, full_name }) {
    const users = readUsers();
    const key = normalizeEmail(email);
    if (!key) return { ok: false, error: "L'adresse email est requise." };
    if (users[key]) {
      return { ok: false, error: 'Un compte existe déjà avec cette adresse email.' };
    }
    if (!password || password.length < 6) {
      return { ok: false, error: 'Le mot de passe doit contenir au moins 6 caractères.' };
    }
    
    // Hash password instead of storing plaintext
    const encoder = new TextEncoder();
    const data = encoder.encode(password);
    const hashBuffer = await crypto.subtle.digest('SHA-256', data);
    const hashArray = Array.from(new Uint8Array(hashBuffer));
    const hashedPassword = hashArray.map(b => b.toString(16).padStart(2, '0')).join('');

    const account = { email: key, full_name: String(full_name || '').trim(), password: hashedPassword };
    users[key] = account;
    writeUsers(users);
    return { ok: true, session: setSession(account) };
  },

  async signIn({ email, password }) {
    const users = readUsers();
    const key = normalizeEmail(email);
    const account = users[key];
    
    // Hash provided password for comparison
    const encoder = new TextEncoder();
    const data = encoder.encode(password);
    const hashBuffer = await crypto.subtle.digest('SHA-256', data);
    const hashArray = Array.from(new Uint8Array(hashBuffer));
    const hashedPassword = hashArray.map(b => b.toString(16).padStart(2, '0')).join('');

    if (!account || account.password !== hashedPassword) {
      return { ok: false, error: 'Email ou mot de passe incorrect.' };
    }
    return { ok: true, session: setSession(account) };
  },

  async signOut() {
    clearSession();
    return { ok: true };
  },
};
