import { createContext, useContext, useEffect, useState } from 'react';
import { supabase, isSupabaseConfigured } from '../lib/supabase';
import { demoAuth } from '../lib/demoAuth';

const AuthContext = createContext({});

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let active = true;

    // Mode démo (sans Supabase) : la session vient de localStorage.
    if (!isSupabaseConfigured || !supabase) {
      const session = demoAuth.getSession();
      if (active) {
        const u = session?.user ?? null;
        setUser(u);
        setProfile(u ? {
          id: u.id || 'demo-user',
          email: u.email,
          full_name: u.user_metadata?.full_name || u.email,
          role: 'user',
          created_at: new Date().toISOString(),
        } : null);
        setLoading(false);
      }
      return undefined;
    }

    // Récupérer la session actuelle
    supabase.auth.getSession().then(({ data: { session } }) => {
      if (!active) return;
      setUser(session?.user ?? null);
      if (session?.user) {
        fetchProfile(session.user.id);
      } else {
        setLoading(false);
      }
    });

    // Écouter les changements d'état (connexion/déconnexion)
    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      setUser(session?.user ?? null);
      if (session?.user) {
        fetchProfile(session.user.id);
      } else {
        setProfile(null);
        setLoading(false);
      }
    });

    return () => {
      active = false;
      subscription.unsubscribe();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const fetchProfile = async (userId, retryCount = 0) => {
    try {
      const { data, error } = await supabase
        .from('profiles')
        .select('*')
        .eq('id', userId)
        .maybeSingle();

      if (error) throw error;
      
      if (!data && retryCount < 3) {
        // Retry after a short delay to allow the database trigger to complete
        setTimeout(() => fetchProfile(userId, retryCount + 1), 500);
        return; // Early return, don't set loading to false yet
      }
      
      setProfile(data);
      setLoading(false); // Set loading to false only when we have data or exhausted retries
    } catch (error) {
      console.error('Erreur lors du chargement du profil:', import.meta.env.DEV ? error.message : 'Erreur interne');
      setLoading(false);
    }
  };

  const signIn = async (email, password) => {
    if (!isSupabaseConfigured || !supabase) {
      const result = await demoAuth.signIn({ email, password });
      if (result.ok) {
        const u = result.session.user;
        setUser(u);
        setProfile({
          id: u.id || 'demo-user',
          email: u.email,
          full_name: u.user_metadata?.full_name || u.email,
          role: 'user',
          created_at: new Date().toISOString(),
        });
      }
      return result.ok ? { data: result.session, error: null } : { data: null, error: result.error };
    }
    return supabase.auth.signInWithPassword({ email, password });
  };

  const signUp = async (email, password, fullName) => {
    if (!isSupabaseConfigured || !supabase) {
      const result = await demoAuth.signUp({ email, password, full_name: fullName });
      if (result.ok) {
        const u = result.session.user;
        setUser(u);
        setProfile({
          id: u.id || 'demo-user',
          email: u.email,
          full_name: u.user_metadata?.full_name || fullName || u.email,
          role: 'user',
          created_at: new Date().toISOString(),
        });
      }
      return result.ok ? { data: result.session, error: null } : { data: null, error: result.error };
    }
    return supabase.auth.signUp({
      email,
      password,
      options: {
        data: {
          full_name: fullName,
        },
      },
    });
  };

  const signOut = async () => {
    if (!isSupabaseConfigured || !supabase) {
      await demoAuth.signOut();
      setUser(null);
      setProfile(null);
      return;
    }
    return supabase.auth.signOut();
  };

  const displayName = profile?.full_name || user?.user_metadata?.full_name || user?.full_name || user?.email || '';

  return (
    <AuthContext.Provider
      value={{ user, profile, loading, signIn, signUp, signOut, displayName, isDemo: !isSupabaseConfigured }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  return useContext(AuthContext);
};
