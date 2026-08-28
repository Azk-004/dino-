-- Table analytics_events : suivi des interactions utilisateurs
CREATE TABLE public.analytics_events (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  event_type TEXT NOT NULL,
  path TEXT NOT NULL DEFAULT '/',
  element TEXT,
  metadata JSONB DEFAULT '{}',
  user_id UUID REFERENCES public.profiles(id) ON DELETE SET NULL,
  session_id TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- Index pour les requêtes analytics fréquentes
CREATE INDEX idx_analytics_created_at ON public.analytics_events(created_at);
CREATE INDEX idx_analytics_event_type ON public.analytics_events(event_type);
CREATE INDEX idx_analytics_path ON public.analytics_events(path);
CREATE INDEX idx_analytics_user_id ON public.analytics_events(user_id);

-- Active RLS
ALTER TABLE public.analytics_events ENABLE ROW LEVEL SECURITY;

-- N'importe qui peut inscrire un événement (tracking anonyme)
CREATE POLICY "Anyone can insert analytics events"
  ON public.analytics_events FOR INSERT WITH CHECK (true);

-- Seuls les admins peuvent lire les analytics
CREATE POLICY "Admins can view all analytics events"
  ON public.analytics_events FOR SELECT USING (
    EXISTS (SELECT 1 FROM public.profiles WHERE id = auth.uid() AND role = 'admin')
  );

-- Seuls les admins peuvent supprimer (nettoyage)
CREATE POLICY "Admins can delete analytics events"
  ON public.analytics_events FOR DELETE USING (
    EXISTS (SELECT 1 FROM public.profiles WHERE id = auth.uid() AND role = 'admin')
  );
