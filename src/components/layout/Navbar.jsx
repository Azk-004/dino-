import { useEffect, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ChevronDown, GraduationCap, LogOut, Menu, Moon, Shield, Sun, X } from 'lucide-react';
import { useDayNightMode } from '../../hooks/useDayNightMode.jsx';
import { useAuth } from '../../contexts/AuthContext.jsx';
import { useFormationAccess } from '../../utils/formationAccess.js';

const links = [
  { href: '#presentation', label: 'Le constat' },
  { href: '#aanid', label: 'aanid' },
  { href: '#fonctionnalites', label: 'Fonctionnalités' },
  { href: '#tarifs', label: 'Formation' },
  { href: '#consultation', label: 'Consultation' },
  { href: '#publics', label: 'Publics' },
];

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const [accountOpen, setAccountOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const rootRef = useRef(null);
  const accountRef = useRef(null);
  const { mode, toggle } = useDayNightMode();
  const navigate = useNavigate();
  const { user, profile, signOut, displayName } = useAuth();
  const { openFormation } = useFormationAccess();

  const accountLabel =
    displayName ||
    (user?.user_metadata?.full_name ?? user?.full_name ?? user?.email ?? 'Compte') ||
    'Compte';

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    if (!open && !accountOpen) return undefined;

    const onPointerDown = (event) => {
      if (
        rootRef.current &&
        !rootRef.current.contains(event.target) &&
        accountRef.current &&
        !accountRef.current.contains(event.target)
      ) {
        setOpen(false);
        setAccountOpen(false);
      }
    };

    const onKeyDown = (event) => {
      if (event.key === 'Escape') {
        setOpen(false);
        setAccountOpen(false);
      }
    };

    document.addEventListener('pointerdown', onPointerDown);
    document.addEventListener('keydown', onKeyDown);
    return () => {
      document.removeEventListener('pointerdown', onPointerDown);
      document.removeEventListener('keydown', onKeyDown);
    };
  }, [open, accountOpen]);

  const goToLogin = () => {
    setOpen(false);
    setAccountOpen(false);
    navigate('/connexion');
  };

  const handleOpenFormation = () => {
    setOpen(false);
    setAccountOpen(false);
    openFormation();
  };

  const handleGoToAdmin = () => {
    setOpen(false);
    setAccountOpen(false);
    navigate('/admin');
  };

  const handleSignOut = async () => {
    setOpen(false);
    setAccountOpen(false);
    await signOut();
    navigate('/');
  };

  return (
    <>
      {open && (
        <button
          type="button"
          className="fixed inset-0 z-30 cursor-default bg-black/20 lg:hidden"
          aria-label="Fermer le menu"
          onClick={() => setOpen(false)}
        />
      )}

      <header ref={rootRef} className="sticky top-9 z-40 mx-4 sm:top-11 sm:mx-8 lg:mx-[12%]">
        <nav
          className={`flex h-14 w-full items-center justify-between gap-3 rounded-full border border-night-border px-4 backdrop-blur-md transition-all duration-300 sm:h-16 sm:px-6 ${
            scrolled ? 'bg-night/85 shadow-[0_16px_40px_rgba(0,0,0,0.45)]' : 'bg-night/50'
          }`}
          aria-label="Navigation principale"
        >
          <a href="#hero" className="flex min-w-0 items-baseline gap-2.5" aria-label="Panotik - retour à l'accueil">
            <span className="text-xl font-extrabold tracking-tight text-cream sm:text-2xl">Panotik</span>
            <span className="hidden text-sm font-extrabold italic lowercase text-mist/70 sm:inline">
              aanid
            </span>
          </a>

          <ul className="hidden items-center gap-6 lg:flex lg:gap-8">
            {links.map((link) => (
              <li key={link.href}>
                <a
                  href={link.href}
                  className="text-sm font-medium text-mist/80 transition-colors hover:text-primary-light"
                >
                  {link.label}
                </a>
              </li>
            ))}
          </ul>

          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={toggle}
              className="flex h-10 w-10 cursor-pointer items-center justify-center rounded-full text-cream transition-colors hover:bg-white/10"
              aria-label={mode === 'night' ? 'Passer en mode matin' : 'Passer en mode nuit'}
              title={mode === 'night' ? 'Mode matin' : 'Mode nuit'}
            >
              {mode === 'night' ? (
                <Sun className="h-5 w-5" aria-hidden="true" />
              ) : (
                <Moon className="h-5 w-5" aria-hidden="true" />
              )}
            </button>

            {profile?.role === 'admin' && (
              <button
                type="button"
                onClick={handleGoToAdmin}
                className="hidden md:flex h-10 w-10 cursor-pointer items-center justify-center rounded-full text-amber-400 bg-amber-500/10 transition-colors hover:bg-amber-500/20"
                title="Tableau de bord administrateur"
              >
                <Shield className="h-5 w-5" aria-hidden="true" />
              </button>
            )}

            {user ? (
              <div className="relative hidden md:block">
                <button
                  ref={accountRef}
                  type="button"
                  onClick={() => setAccountOpen((v) => !v)}
                  className="flex cursor-pointer items-center gap-2 rounded-full border border-night-border bg-night/70 px-4 py-2 text-sm font-bold text-cream transition-colors hover:border-primary hover:text-primary-light"
                  aria-expanded={accountOpen}
                >
                  <span className="flex h-6 w-6 items-center justify-center rounded-full bg-primary/20 font-extrabold text-primary-light">
                    {accountLabel.charAt(0).toUpperCase()}
                  </span>
                  <span className="max-w-[8rem] truncate">{accountLabel}</span>
                  <ChevronDown
                    className={`h-4 w-4 transition-transform ${accountOpen ? 'rotate-180' : ''}`}
                    aria-hidden="true"
                  />
                </button>
                {accountOpen && (
                  <div className="absolute right-0 top-full z-50 mt-2 w-64 overflow-hidden rounded-2xl border border-night-border bg-night/95 p-2 shadow-[0_16px_40px_rgba(0,0,0,0.45)] backdrop-blur-md">
                    <button
                      type="button"
                      onClick={handleOpenFormation}
                      className="flex w-full cursor-pointer items-center gap-3 rounded-xl px-3 py-3 text-left text-sm font-bold text-cream transition-colors hover:bg-white/5"
                    >
                      <GraduationCap className="h-5 w-5 shrink-0 text-primary-light" aria-hidden="true" />
                      Accéder aux formations
                    </button>
                    {profile?.role === 'admin' && (
                      <button
                        type="button"
                        onClick={handleGoToAdmin}
                        className="flex w-full cursor-pointer items-center gap-3 rounded-xl px-3 py-3 text-left text-sm font-bold text-cream transition-colors hover:bg-white/5"
                      >
                        <Shield className="h-5 w-5 shrink-0 text-amber-400" aria-hidden="true" />
                        Administration
                      </button>
                    )}
                    <button
                      type="button"
                      onClick={handleSignOut}
                      className="flex w-full cursor-pointer items-center gap-3 rounded-xl px-3 py-3 text-left text-sm font-bold text-mist/70 transition-colors hover:bg-white/5 hover:text-primary-light"
                    >
                      <LogOut className="h-5 w-5 shrink-0" aria-hidden="true" />
                      Se déconnecter
                    </button>
                  </div>
                )}
              </div>
            ) : (
              <button
                type="button"
                onClick={goToLogin}
                className="hidden cursor-pointer rounded-full bg-primary px-5 py-2.5 text-sm font-bold text-night transition-colors hover:bg-glow md:inline-block"
              >
                Connexion
              </button>
            )}

            <button
              type="button"
              className="flex h-10 w-10 cursor-pointer items-center justify-center rounded-full text-cream transition-colors hover:bg-white/10 lg:hidden"
              onClick={() => setOpen((v) => !v)}
              aria-expanded={open}
              aria-controls="nav-menu-mobile"
              aria-label={open ? 'Fermer le menu' : 'Ouvrir le menu'}
            >
              {open ? <X className="h-5 w-5" aria-hidden="true" /> : <Menu className="h-5 w-5" aria-hidden="true" />}
            </button>
          </div>
        </nav>

        {open && (
          <div
            id="nav-menu-mobile"
            className="absolute left-0 right-0 top-full z-50 mt-2 w-full overflow-hidden rounded-3xl border border-night-border bg-night/95 px-3 py-3 shadow-[0_16px_40px_rgba(0,0,0,0.45)] backdrop-blur-md lg:hidden"
          >
            <ul className="flex flex-col gap-1">
              {links.map((link) => (
                <li key={link.href}>
                  <a
                    href={link.href}
                    className="block rounded-2xl px-3 py-3 text-base font-medium text-cream hover:bg-white/5"
                    onClick={() => setOpen(false)}
                  >
                    {link.label}
                  </a>
                </li>
              ))}
              {user ? (
                <>
                  <li className="pt-1">
                    <button
                      type="button"
                      onClick={handleOpenFormation}
                      className="flex w-full cursor-pointer items-center gap-3 rounded-2xl bg-primary/10 px-3 py-3 text-left text-base font-bold text-primary-light"
                    >
                      <GraduationCap className="h-5 w-5 shrink-0" />
                      Accéder aux formations
                    </button>
                  </li>
                  {profile?.role === 'admin' && (
                    <li>
                      <button
                        type="button"
                        onClick={handleGoToAdmin}
                        className="flex w-full cursor-pointer items-center gap-3 rounded-2xl px-3 py-3 text-left text-base font-bold text-amber-400 hover:bg-white/5"
                      >
                        <Shield className="h-5 w-5 shrink-0" />
                        Administration
                      </button>
                    </li>
                  )}
                  <li>
                    <button
                      type="button"
                      onClick={handleSignOut}
                      className="block w-full cursor-pointer rounded-2xl px-3 py-3 text-left text-base font-medium text-mist/70 hover:bg-white/5"
                    >
                      Se déconnecter ({accountLabel})
                    </button>
                  </li>
                </>
              ) : (
                <li className="pt-1">
                  <button
                    type="button"
                    onClick={goToLogin}
                    className="block w-full cursor-pointer rounded-full bg-primary px-3 py-3 text-center text-base font-bold text-night"
                  >
                    Connexion
                  </button>
                </li>
              )}
            </ul>
          </div>
        )}
      </header>
    </>
  );
}
