import React, { useEffect, useState, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import { Shield, Users, BarChart3, MousePointerClick, Eye, RefreshCw, ChevronDown, ArrowLeft, LayoutDashboard, Settings } from 'lucide-react';
import { useAuth } from '../../contexts/AuthContext.jsx';
import { supabase, isSupabaseConfigured } from '../../lib/supabase';

/* ------------------------------------------------------------------ */
/*  Stat card                                                          */
/* ------------------------------------------------------------------ */
function StatCard({ icon: Icon, label, value, color = 'text-primary-light' }) {
  return (
    <div className="flex items-center gap-4 rounded-2xl border border-night-border bg-night-soft/60 p-5 backdrop-blur-xl">
      <span className={`flex h-12 w-12 items-center justify-center rounded-xl bg-primary/15 ${color}`}>
        <Icon className="h-6 w-6" />
      </span>
      <div>
        <div className="text-2xl font-extrabold text-cream">{value}</div>
        <div className="text-xs font-medium uppercase tracking-wider text-mist/60">{label}</div>
      </div>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/*  User table                                                         */
/* ------------------------------------------------------------------ */
function UserTable({ users, onRoleChange, loading }) {
  const [expandedId, setExpandedId] = useState(null);
  const [editingRole, setEditingRole] = useState(null);

  if (loading) {
    return (
      <div className="flex items-center justify-center py-20">
        <RefreshCw className="h-6 w-6 animate-spin text-primary-light" />
      </div>
    );
  }

  if (!users.length) {
    return <p className="py-20 text-center text-mist/60">Aucun utilisateur inscrit.</p>;
  }

  return (
    <div className="overflow-x-auto">
      <table className="w-full text-left text-sm">
        <thead>
          <tr className="border-b border-night-border text-xs uppercase tracking-wider text-mist/50">
            <th className="px-4 py-3">Utilisateur</th>
            <th className="hidden px-4 py-3 sm:table-cell">Email</th>
            <th className="hidden px-4 py-3 md:table-cell">Inscrit le</th>
            <th className="px-4 py-3">Rôle</th>
            <th className="px-4 py-3">Actions</th>
          </tr>
        </thead>
        <tbody>
          {users.map((u) => (
            <React.Fragment key={u.id}>
              <tr className="border-b border-night-border/50 transition-colors hover:bg-white/[0.02]">
                <td className="px-4 py-3">
                  <div className="flex items-center gap-3">
                    <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-primary/20 text-sm font-bold text-primary-light">
                      {(u.full_name || u.email || '?')[0].toUpperCase()}
                    </span>
                    <div className="min-w-0">
                      <div className="truncate font-semibold text-cream">{u.full_name || 'Sans nom'}</div>
                      <div className="truncate text-xs text-mist/50 sm:hidden">{u.email}</div>
                    </div>
                  </div>
                </td>
                <td className="hidden px-4 py-3 text-mist/70 sm:table-cell">{u.email}</td>
                <td className="hidden px-4 py-3 text-mist/50 md:table-cell">
                  {new Date(u.created_at).toLocaleDateString('fr-FR')}
                </td>
                <td className="px-4 py-3">
                  <span className={`inline-flex items-center gap-1 rounded-full px-2.5 py-1 text-xs font-bold ${
                    u.role === 'admin'
                      ? 'bg-amber-500/15 text-amber-400'
                      : 'bg-white/5 text-mist/60'
                  }`}>
                    {u.role === 'admin' ? <Shield className="h-3 w-3" /> : null}
                    {u.role}
                  </span>
                </td>
                <td className="px-4 py-3">
                  <div className="flex items-center gap-2">
                    <button
                      type="button"
                      onClick={() => setExpandedId(expandedId === u.id ? null : u.id)}
                      className="rounded-lg px-2.5 py-1.5 text-xs font-medium text-mist/60 transition-colors hover:bg-white/5 hover:text-cream"
                    >
                      {expandedId === u.id ? 'Fermer' : 'Profil'}
                    </button>
                    <div className="relative">
                      <select
                        value={u.role}
                        onChange={(e) => {
                          if (window.confirm(`Voulez-vous vraiment changer le rôle de cet utilisateur en ${e.target.value} ?`)) {
                            onRoleChange(u.id, e.target.value);
                          }
                        }}
                        className="appearance-none cursor-pointer rounded-lg pl-2.5 pr-6 py-1.5 text-xs font-medium text-primary-light bg-transparent hover:bg-primary/10 transition-colors focus:outline-none focus:ring-2 focus:ring-primary/20"
                      >
                        <option value="user" className="bg-night-soft text-cream">Utilisateur</option>
                        <option value="admin" className="bg-night-soft text-cream">Administrateur</option>
                      </select>
                      <ChevronDown className="pointer-events-none absolute right-1.5 top-1/2 -translate-y-1/2 h-3 w-3 text-primary-light" />
                    </div>
                  </div>
                </td>
              </tr>
              {expandedId === u.id && (
                <tr key={u.id + '-detail'}>
                  <td colSpan={5} className="border-b border-night-border/50 bg-white/[0.015] px-4 py-5">
                    <div className="grid gap-4 sm:grid-cols-3">
                      <div>
                        <div className="text-xs font-medium uppercase tracking-wider text-mist/50">ID</div>
                        <div className="mt-1 font-mono text-xs text-mist/70 break-all">{u.id}</div>
                      </div>
                      <div>
                        <div className="text-xs font-medium uppercase tracking-wider text-mist/50">Email</div>
                        <div className="mt-1 text-sm text-cream">{u.email}</div>
                      </div>
                      <div>
                        <div className="text-xs font-medium uppercase tracking-wider text-mist/50">Nom complet</div>
                        <div className="mt-1 text-sm text-cream">{u.full_name || '—'}</div>
                      </div>
                      <div>
                        <div className="text-xs font-medium uppercase tracking-wider text-mist/50">Rôle</div>
                        <div className="mt-1 text-sm text-cream">{u.role}</div>
                      </div>
                      <div>
                        <div className="text-xs font-medium uppercase tracking-wider text-mist/50">Inscrit le</div>
                        <div className="mt-1 text-sm text-cream">{new Date(u.created_at).toLocaleString('fr-FR')}</div>
                      </div>
                      <div>
                        <div className="text-xs font-medium uppercase tracking-wider text-mist/50">Dernière activité</div>
                        <div className="mt-1 text-sm text-cream">
                          {u.last_seen ? new Date(u.last_seen).toLocaleString('fr-FR') : '—'}
                        </div>
                      </div>
                    </div>
                  </td>
                </tr>
              )}
            </React.Fragment>
          ))}
        </tbody>
      </table>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/*  Analytics dashboard                                                */
/* ------------------------------------------------------------------ */
function AnalyticsDashboard({ events, loading }) {
  const stats = useMemo(() => {
    if (!events.length) return { total: 0, pageViews: 0, clicks: 0, uniqueUsers: 0, topPages: [], topElements: [], daily: [] };

    const pageViews = events.filter((e) => e.event_type === 'page_view');
    const clicks = events.filter((e) => e.event_type === 'click');
    const uniqueSessions = new Set(events.map((e) => e.session_id).filter(Boolean));
    const uniqueUsers = new Set(events.map((e) => e.user_id).filter(Boolean));

    // Top pages
    const pageCount = {};
    pageViews.forEach((e) => { pageCount[e.path] = (pageCount[e.path] || 0) + 1; });
    const topPages = Object.entries(pageCount).sort((a, b) => b[1] - a[1]).slice(0, 10);

    // Top elements
    const elemCount = {};
    clicks.forEach((e) => { if (e.element) elemCount[e.element] = (elemCount[e.element] || 0) + 1; });
    const topElements = Object.entries(elemCount).sort((a, b) => b[1] - a[1]).slice(0, 10);

    // Daily (last 30 days)
    const dayCount = {};
    events.forEach((e) => {
      const d = new Date(e.created_at).toLocaleDateString('fr-FR');
      dayCount[d] = (dayCount[d] || 0) + 1;
    });
    const daily = Object.entries(dayCount).slice(-30);

    return {
      total: events.length,
      pageViews: pageViews.length,
      clicks: clicks.length,
      uniqueUsers: uniqueUsers.size || uniqueSessions.size,
      topPages,
      topElements,
      daily,
    };
  }, [events]);

  if (loading) {
    return (
      <div className="flex items-center justify-center py-20">
        <RefreshCw className="h-6 w-6 animate-spin text-primary-light" />
      </div>
    );
  }

  return (
    <div className="space-y-8">
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <StatCard icon={BarChart3} label="Total événements" value={stats.total} />
        <StatCard icon={Eye} label="Pages vues" value={stats.pageViews} />
        <StatCard icon={MousePointerClick} label="Clics" value={stats.clicks} />
        <StatCard icon={Users} label="Utilisateurs uniques" value={stats.uniqueUsers} />
      </div>

      <div className="grid gap-6 lg:grid-cols-2">
        {/* Top pages */}
        <div className="rounded-2xl border border-night-border bg-night-soft/60 p-6 backdrop-blur-xl">
          <h3 className="mb-4 text-sm font-bold uppercase tracking-wider text-mist/60">Pages les plus visitées</h3>
          {stats.topPages.length ? (
            <div className="space-y-3">
              {stats.topPages.map(([path, count]) => (
                <div key={path} className="flex items-center gap-3">
                  <div className="min-w-0 flex-1">
                    <div className="truncate text-sm font-medium text-cream">{path}</div>
                    <div className="mt-1 h-1.5 overflow-hidden rounded-full bg-white/5">
                      <div
                        className="h-full rounded-full bg-primary/60"
                        style={{ width: `${(count / stats.topPages[0][1]) * 100}%` }}
                      />
                    </div>
                  </div>
                  <span className="shrink-0 text-sm font-bold text-primary-light">{count}</span>
                </div>
              ))}
            </div>
          ) : (
            <p className="text-sm text-mist/50">Aucune donnée</p>
          )}
        </div>

        {/* Top elements */}
        <div className="rounded-2xl border border-night-border bg-night-soft/60 p-6 backdrop-blur-xl">
          <h3 className="mb-4 text-sm font-bold uppercase tracking-wider text-mist/60">Éléments les plus cliqués</h3>
          {stats.topElements.length ? (
            <div className="space-y-3">
              {stats.topElements.map(([el, count]) => (
                <div key={el} className="flex items-center gap-3">
                  <div className="min-w-0 flex-1">
                    <div className="truncate text-sm font-medium text-cream">{el}</div>
                    <div className="mt-1 h-1.5 overflow-hidden rounded-full bg-white/5">
                      <div
                        className="h-full rounded-full bg-terracotta/60"
                        style={{ width: `${(count / stats.topElements[0][1]) * 100}%` }}
                      />
                    </div>
                  </div>
                  <span className="shrink-0 text-sm font-bold text-terracotta">{count}</span>
                </div>
              ))}
            </div>
          ) : (
            <p className="text-sm text-mist/50">Aucune donnée</p>
          )}
        </div>
      </div>

      {/* Activity timeline */}
      {stats.daily.length > 0 && (
        <div className="rounded-2xl border border-night-border bg-night-soft/60 p-6 backdrop-blur-xl">
          <h3 className="mb-4 text-sm font-bold uppercase tracking-wider text-mist/60">Activité récente (30 jours)</h3>
          <div className="flex items-end gap-1" style={{ height: 120 }}>
            {stats.daily.map(([date, count]) => {
              const maxCount = Math.max(...stats.daily.map(([, c]) => c));
              const h = maxCount > 0 ? (count / maxCount) * 100 : 0;
              return (
                <div key={date} className="group relative flex-1" style={{ height: `${h}%`, minHeight: count > 0 ? 4 : 1 }}>
                  <div className="absolute inset-0 rounded-sm bg-primary/50 transition-colors group-hover:bg-primary" />
                  <div className="pointer-events-none absolute -top-8 left-1/2 -translate-x-1/2 whitespace-nowrap rounded-lg bg-night-soft px-2 py-1 text-xs text-cream opacity-0 shadow-lg transition-opacity group-hover:opacity-100">
                    {date} : {count}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
}

/* ------------------------------------------------------------------ */
/*  Admin page                                                         */
/* ------------------------------------------------------------------ */
export default function Admin() {
  const navigate = useNavigate();
  const { user, profile, loading: authLoading } = useAuth();
  const [tab, setTab] = useState('users');
  const [users, setUsers] = useState([]);
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Redirect if not admin
  useEffect(() => {
    if (!authLoading && (!user || !profile || profile.role !== 'admin')) {
      navigate('/');
    }
  }, [user, profile, authLoading, navigate]);

  const fetchUsers = async () => {
    if (!supabase) return;
    try {
      const { data, error: err } = await supabase
        .from('profiles')
        .select('*')
        .order('created_at', { ascending: false });
      if (err) throw err;
      setUsers(data || []);
    } catch (err) {
      console.error('Erreur chargement users:', import.meta.env.DEV ? err.message : 'Erreur interne');
      setError(import.meta.env.DEV ? err.message : 'Une erreur est survenue.');
    }
  };

  const fetchEvents = async () => {
    if (!supabase) return;
    try {
      const { data, error: err } = await supabase
        .from('analytics_events')
        .select('*')
        .order('created_at', { ascending: false })
        .limit(5000);
      if (err) throw err;
      setEvents(data || []);
    } catch (err) {
      console.error('Erreur chargement analytics:', import.meta.env.DEV ? err.message : 'Erreur interne');
      setError(import.meta.env.DEV ? err.message : 'Une erreur est survenue.');
    }
  };

  useEffect(() => {
    if (!user || !profile || profile.role !== 'admin') return;
    setLoading(true);
    Promise.all([fetchUsers(), fetchEvents()]).finally(() => setLoading(false));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [user, profile]);

  const handleRoleChange = async (userId, newRole) => {
    if (!supabase) return;
    try {
      const { error: err } = await supabase
        .from('profiles')
        .update({ role: newRole })
        .eq('id', userId);
      if (err) throw err;
      setUsers((prev) => prev.map((u) => u.id === userId ? { ...u, role: newRole } : u));
    } catch (err) {
      console.error('Erreur changement rôle:', import.meta.env.DEV ? err.message : 'Erreur interne');
    }
  };

  const handleRefresh = () => {
    setLoading(true);
    Promise.all([fetchUsers(), fetchEvents()]).finally(() => setLoading(false));
  };

  if (authLoading) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-night">
        <RefreshCw className="h-8 w-8 animate-spin text-primary-light" />
      </div>
    );
  }

  if (!profile || profile.role !== 'admin') {
    return (
      <div className="flex min-h-screen flex-col items-center justify-center bg-night text-center px-4">
        <div className="rounded-2xl border border-error/30 bg-error/10 p-8 max-w-md w-full">
          <Shield className="mx-auto h-12 w-12 text-error mb-4" />
          <h1 className="text-xl font-bold text-cream mb-2">Accès Refusé</h1>
          <p className="text-sm text-mist/70 mb-6">
            Vous n'avez pas les droits d'administration nécessaires pour accéder à cette page.
          </p>
          <div className="text-left bg-night-soft/50 rounded-xl p-4 text-xs font-mono text-mist/60 overflow-hidden break-all">
            <p><strong>Email:</strong> {user?.email || 'Non connecté'}</p>
            <p><strong>Rôle actuel:</strong> {profile?.role || 'Profil introuvable'}</p>
            <p><strong>ID Profil:</strong> {profile?.id || 'N/A'}</p>
          </div>
          <button 
            onClick={() => navigate('/')}
            className="mt-6 w-full rounded-xl bg-primary px-4 py-2 text-sm font-bold text-night transition-colors hover:bg-primary-light"
          >
            Retour à l'accueil
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-night">
      {/* Header */}
      <header className="sticky top-0 z-50 border-b border-night-border bg-night/90 backdrop-blur-md">
        <div className="mx-4 flex h-16 items-center justify-between sm:mx-8 lg:mx-[8%]">
          <div className="flex items-center gap-4">
            <button
              type="button"
              onClick={() => navigate('/')}
              className="flex items-center gap-2 rounded-xl px-3 py-2 text-sm font-medium text-mist/60 transition-colors hover:bg-white/5 hover:text-cream"
            >
              <ArrowLeft className="h-4 w-4" />
              <span className="hidden sm:inline">Retour</span>
            </button>
            <div className="flex items-center gap-3">
              <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary/15 text-primary-light">
                <LayoutDashboard className="h-4 w-4" />
              </span>
              <div>
                <h1 className="text-lg font-extrabold text-cream">Administration</h1>
                <p className="text-xs text-mist/50">Panotik - Panel de contrôle</p>
              </div>
            </div>
          </div>
          <button
            type="button"
            onClick={handleRefresh}
            className="flex items-center gap-2 rounded-xl px-3 py-2 text-sm font-medium text-mist/60 transition-colors hover:bg-white/5 hover:text-cream"
          >
            <RefreshCw className={`h-4 w-4 ${loading ? 'animate-spin' : ''}`} />
            <span className="hidden sm:inline">Actualiser</span>
          </button>
        </div>
      </header>

      <main className="mx-4 py-8 sm:mx-8 lg:mx-[8%]">
        {/* Tabs */}
        <div className="mb-8 flex gap-2 rounded-2xl border border-night-border bg-night-soft/40 p-1.5 backdrop-blur-xl w-fit">
          <button
            type="button"
            onClick={() => setTab('users')}
            className={`flex items-center gap-2 rounded-xl px-4 py-2.5 text-sm font-bold transition-all ${
              tab === 'users'
                ? 'bg-primary/15 text-primary-light shadow-sm'
                : 'text-mist/60 hover:text-cream'
            }`}
          >
            <Users className="h-4 w-4" />
            Utilisateurs
            <span className="ml-1 rounded-full bg-white/10 px-2 py-0.5 text-xs">{users.length}</span>
          </button>
          <button
            type="button"
            onClick={() => setTab('analytics')}
            className={`flex items-center gap-2 rounded-xl px-4 py-2.5 text-sm font-bold transition-all ${
              tab === 'analytics'
                ? 'bg-primary/15 text-primary-light shadow-sm'
                : 'text-mist/60 hover:text-cream'
            }`}
          >
            <BarChart3 className="h-4 w-4" />
            Analytics
          </button>
          <button
            type="button"
            onClick={() => setTab('settings')}
            className={`flex items-center gap-2 rounded-xl px-4 py-2.5 text-sm font-bold transition-all ${
              tab === 'settings'
                ? 'bg-primary/15 text-primary-light shadow-sm'
                : 'text-mist/60 hover:text-cream'
            }`}
          >
            <Settings className="h-4 w-4" />
            Paramètres
          </button>
        </div>

        {error && (
          <div className="mb-6 rounded-xl border border-red-500/30 bg-red-500/10 px-4 py-3 text-sm text-red-400">
            {error}
          </div>
        )}

        {/* Tab content */}
        {tab === 'users' && (
          <section>
            <div className="mb-6 flex items-center justify-between">
              <div>
                <h2 className="text-xl font-extrabold text-cream">Utilisateurs inscrits</h2>
                <p className="mt-1 text-sm text-mist/50">Gérez les comptes et les rôles</p>
              </div>
            </div>
            <div className="overflow-hidden rounded-2xl border border-night-border bg-night-soft/40 backdrop-blur-xl">
              <UserTable users={users} onRoleChange={handleRoleChange} loading={loading} />
            </div>
          </section>
        )}

        {tab === 'analytics' && (
          <section>
            <div className="mb-6">
              <h2 className="text-xl font-extrabold text-cream">Analyse d'activité</h2>
              <p className="mt-1 text-sm text-mist/50">Pages visitées, clics et engagement utilisateurs</p>
            </div>
            <AnalyticsDashboard events={events} loading={loading} />
          </section>
        )}

        {tab === 'settings' && (
          <section>
            <div className="mb-6">
              <h2 className="text-xl font-extrabold text-cream">Paramètres</h2>
              <p className="mt-1 text-sm text-mist/50">Configuration de la plateforme</p>
            </div>
            <div className="space-y-4">
              <div className="rounded-2xl border border-night-border bg-night-soft/40 p-6 backdrop-blur-xl">
                <h3 className="text-sm font-bold uppercase tracking-wider text-mist/60">Base de données</h3>
                <div className="mt-3 grid gap-3 sm:grid-cols-2">
                  <div className="rounded-xl border border-night-border/50 bg-white/[0.02] px-4 py-3">
                    <div className="text-xs text-mist/50">Tables</div>
                    <div className="mt-1 text-lg font-bold text-cream">8</div>
                  </div>
                  <div className="rounded-xl border border-night-border/50 bg-white/[0.02] px-4 py-3">
                    <div className="text-xs text-mist/50">Connexion</div>
                    <div className="mt-1 text-sm font-bold text-green-400">
                      {isSupabaseConfigured ? 'Configuré' : 'Non configuré'}
                    </div>
                  </div>
                </div>
              </div>
              <div className="rounded-2xl border border-night-border bg-night-soft/40 p-6 backdrop-blur-xl">
                <h3 className="text-sm font-bold uppercase tracking-wider text-mist/60">Votre compte</h3>
                <div className="mt-3 space-y-2">
                  <div className="text-sm"><span className="text-mist/50">Email : </span><span className="font-semibold text-cream">{user?.email}</span></div>
                  <div className="text-sm"><span className="text-mist/50">Rôle : </span>
                    <span className="inline-flex items-center gap-1 rounded-full bg-amber-500/15 px-2 py-0.5 text-xs font-bold text-amber-400">
                      <Shield className="h-3 w-3" /> admin
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </section>
        )}
      </main>
    </div>
  );
}
