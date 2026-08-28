import { createClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.SUPABASE_URL;
const supabaseAnonKey = import.meta.env.SUPABASE_ANON_KEY;

// Le site doit fonctionner sans back-end (mode démo) : le client n'est créé
// que si les deux variables sont présentes. Tout appel Supabase est alors
// neutralisé, la landing reste pleinement utilisable.
export const isSupabaseConfigured = Boolean(supabaseUrl && supabaseAnonKey);

export const supabase = isSupabaseConfigured
  ? createClient(supabaseUrl, supabaseAnonKey)
  : null;
