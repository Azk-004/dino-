import { useEffect, useState } from 'react';
import { Link, useNavigate, useSearchParams } from 'react-router-dom';
import { Loader2, LogIn, UserPlus, GraduationCap, LogOut, CheckCircle2 } from 'lucide-react';
import { useAuth } from '../../contexts/AuthContext.jsx';
import { useFormationAccess } from '../../utils/formationAccess.js';
import { FORMATION_URL } from '../../constants/contact.js';

const TABS = [
  { id: 'signin', label: 'Connexion', icon: LogIn },
  { id: 'signup', label: "Créer un compte", icon: UserPlus },
];

export default function Login() {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const { user, signIn, signUp, signOut, displayName } = useAuth();
  const { openFormation } = useFormationAccess();

  const [tab, setTab] = useState('signin');
  const [form, setForm] = useState({ name: '', email: '', password: '', confirm: '' });
  const [status, setStatus] = useState({ kind: '', message: '' });
  const [sending, setSending] = useState(false);

  const redirect = searchParams.get('redirect') || '';

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const onChange = (event) => {
    const { name, value } = event.target;
    setForm((prev) => ({ ...prev, [name]: value }));
    if (status.message) setStatus({ kind: '', message: '' });
  };

  const goAfterLogin = () => {
    if (redirect) {
      // Validate redirect is a relative path
      if (redirect.startsWith('/') && !redirect.startsWith('//')) {
        navigate(redirect);
        return;
      }
    }
    window.location.href = FORMATION_URL;
  };

  const onSubmit = async (event) => {
    event.preventDefault();
    if (sending) return;
    setSending(true);
    setStatus({ kind: '', message: '' });

    if (tab === 'signup' && form.password !== form.confirm) {
      setSending(false);
      setStatus({ kind: 'error', message: 'Les deux mots de passe ne correspondent pas.' });
      return;
    }

    const result =
      tab === 'signin'
        ? await signIn(form.email, form.password)
        : await signUp(form.email, form.password, form.name);

    setSending(false);

    if (result.error) {
      setStatus({ kind: 'error', message: result.error?.message || result.error });
      return;
    }

    setStatus({ kind: 'ok', message: tab === 'signin' ? 'Connexion réussie.' : 'Compte créé.' });
    setTimeout(goAfterLogin, 400);
  };

  const onSignOut = async () => {
    await signOut();
    navigate('/');
  };

  const firstName = displayName
    ? String(displayName).trim().split(/\s+/)[0] || displayName
    : '';

  const inputClass =
    'mt-1.5 w-full rounded-2xl border border-night-border bg-night/80 px-4 py-3.5 text-base text-cream outline-none transition-colors placeholder:text-mist/40 focus:border-primary disabled:opacity-60';

  return (
    <div className="relative min-h-[100dvh] overflow-hidden bg-night">
      <div
        className="pointer-events-none absolute inset-x-0 bottom-0 h-72 bg-gradient-to-t from-night-alt to-transparent"
        aria-hidden="true"
      />

      <header className="sticky top-0 z-40 mx-4 sm:mx-8 lg:mx-[12%]">
        <nav
          className="flex h-14 items-center justify-between rounded-full border border-night-border bg-night/60 px-4 backdrop-blur-md sm:h-16 sm:px-6"
          aria-label="Navigation"
        >
          <Link to="/" className="flex min-w-0 items-baseline gap-2.5" aria-label="Panotik - retour à l'accueil">
            <span className="text-xl font-extrabold tracking-tight text-cream sm:text-2xl">Panotik</span>
            <span className="hidden text-sm font-extrabold italic lowercase text-mist/70 sm:inline">aanid</span>
          </Link>
          <Link
            to="/"
            className="rounded-full border border-night-border px-4 py-2 text-sm font-bold text-cream transition-colors hover:border-primary hover:text-primary-light"
          >
            ← Retour à l&apos;accueil
          </Link>
        </nav>
      </header>

      <main className="relative z-10 mx-auto flex w-full max-w-md flex-col items-center px-4 py-16 sm:py-24">
        <p className="chapter-kicker justify-center">
          <span className="num">Espace</span>
          <span>- Formation &amp; comptes</span>
        </p>
        <h1 className="chapter-title mt-3 text-center text-4xl sm:text-5xl">
          {user ? (
            <>Bienvenue{firstName ? `, ${firstName}` : ''}.</>
          ) : (
            <>Connexion ou inscription.</>
          )}
        </h1>
        <p className="mt-4 text-center text-base leading-relaxed text-mist/90">
          {user
            ? 'Vous êtes connecté. Vous pouvez maintenant accéder aux formations.'
            : 'Créez votre compte ou connectez-vous pour accéder aux formations de la plateforme.'}
        </p>

        <div className="mt-10 w-full rounded-3xl border border-night-border bg-night-soft/70 p-7 backdrop-blur-sm sm:p-8">
          {user ? (
            <div className="flex flex-col items-center gap-5 text-center">
              <span className="flex h-14 w-14 items-center justify-center rounded-2xl bg-primary/15 text-primary-light">
                <CheckCircle2 className="h-7 w-7" aria-hidden="true" />
              </span>
              <p className="text-base text-mist/90">
                Connecté en tant que <span className="font-bold text-cream">{displayName || user.email}</span>
              </p>
              <button
                type="button"
                onClick={openFormation}
                className="inline-flex w-full cursor-pointer items-center justify-center gap-2 rounded-full bg-primary px-6 py-3.5 text-base font-bold text-night transition-all duration-300 hover:-translate-y-0.5 hover:bg-glow hover:shadow-[0_0_20px_rgba(243,207,148,0.5)]"
              >
                <GraduationCap className="h-5 w-5" aria-hidden="true" />
                Accéder aux formations
              </button>
              <button
                type="button"
                onClick={onSignOut}
                className="inline-flex cursor-pointer items-center gap-2 text-sm font-bold text-mist/70 transition-colors hover:text-primary-light"
              >
                <LogOut className="h-4 w-4" aria-hidden="true" />
                Se déconnecter
              </button>
            </div>
          ) : (
            <>
              <div className="grid grid-cols-2 gap-1 rounded-full border border-night-border bg-night/60 p-1">
                {TABS.map(({ id, label }) => (
                  <button
                    key={id}
                    type="button"
                    onClick={() => setTab(id)}
                    className={`flex cursor-pointer items-center justify-center gap-2 rounded-full px-4 py-2.5 text-sm font-bold transition-colors ${
                      tab === id ? 'bg-primary text-night' : 'text-mist/70 hover:text-cream'
                    }`}
                  >
                    {label}
                  </button>
                ))}
              </div>

              <form onSubmit={onSubmit} noValidate className="mt-6 grid gap-4">
                {tab === 'signup' && (
                  <label className="block">
                    <span className="text-sm font-bold text-cream">Nom et prénom</span>
                    <input
                      name="name"
                      type="text"
                      value={form.name}
                      onChange={onChange}
                      autoComplete="name"
                      disabled={sending}
                      className={inputClass}
                    />
                  </label>
                )}

                <label className="block">
                  <span className="text-sm font-bold text-cream">Adresse email</span>
                  <input
                    name="email"
                    type="email"
                    value={form.email}
                    onChange={onChange}
                    required
                    autoComplete="email"
                    placeholder="exemple@mail.com"
                    disabled={sending}
                    className={inputClass}
                  />
                </label>

                <label className="block">
                  <span className="text-sm font-bold text-cream">Mot de passe</span>
                  <input
                    name="password"
                    type="password"
                    value={form.password}
                    onChange={onChange}
                    required
                    autoComplete={tab === 'signin' ? 'current-password' : 'new-password'}
                    disabled={sending}
                    className={inputClass}
                  />
                </label>

                {tab === 'signup' && (
                  <label className="block">
                    <span className="text-sm font-bold text-cream">Confirmer le mot de passe</span>
                    <input
                      name="confirm"
                      type="password"
                      value={form.confirm}
                      onChange={onChange}
                      required
                      autoComplete="new-password"
                      disabled={sending}
                      className={inputClass}
                    />
                  </label>
                )}

                {status.message && (
                  <p
                    className={`text-sm leading-relaxed ${
                      status.kind === 'error' ? 'text-error' : 'text-success'
                    }`}
                    role={status.kind === 'error' ? 'alert' : 'status'}
                  >
                    {status.message}
                  </p>
                )}

                <button
                  type="submit"
                  disabled={sending}
                  className="inline-flex w-full cursor-pointer items-center justify-center gap-2 rounded-full bg-primary px-6 py-3.5 text-base font-bold text-night transition-all duration-300 hover:-translate-y-0.5 hover:bg-glow hover:shadow-[0_0_20px_rgba(243,207,148,0.5)] disabled:cursor-wait disabled:opacity-70"
                >
                  {sending ? (
                    <>
                      <Loader2 className="h-5 w-5 animate-spin" aria-hidden="true" />
                      {tab === 'signin' ? 'Connexion…' : 'Création…'}
                    </>
                  ) : tab === 'signin' ? (
                    <>
                      <LogIn className="h-5 w-5" aria-hidden="true" />
                      Se connecter
                    </>
                  ) : (
                    <>
                      <UserPlus className="h-5 w-5" aria-hidden="true" />
                      Créer mon compte
                    </>
                  )}
                </button>
              </form>

              <p className="mt-5 text-center text-sm leading-relaxed text-mist/60">
                Après connexion, vous accédez aux formations de la plateforme : parcours
                interactif, cours illustré et certificat de formation.
              </p>
            </>
          )}
        </div>

        <p className="mt-6 text-center text-xs leading-relaxed text-mist/50">
          Formation hébergée à {FORMATION_URL}
        </p>
      </main>
    </div>
  );
}
