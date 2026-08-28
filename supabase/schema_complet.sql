-- =============================================
-- PANOTIK - Reset complet de la base de données
-- Exécuter dans Supabase SQL Editor
-- =============================================

-- Supprimer les triggers
DROP TRIGGER IF EXISTS on_auth_user_created ON auth.users;
DROP FUNCTION IF EXISTS public.handle_new_user();
DROP FUNCTION IF EXISTS public.is_admin();

-- Supprimer toutes les tables
DROP TABLE IF EXISTS public.analytics_events CASCADE;
DROP TABLE IF EXISTS public.consultation_requests CASCADE;
DROP TABLE IF EXISTS public.certificates CASCADE;
DROP TABLE IF EXISTS public.progressions CASCADE;
DROP TABLE IF EXISTS public.lessons CASCADE;
DROP TABLE IF EXISTS public.purchases CASCADE;
DROP TABLE IF EXISTS public.courses CASCADE;
DROP TABLE IF EXISTS public.profiles CASCADE;

DROP TYPE IF EXISTS user_role CASCADE;
DROP TYPE IF EXISTS payment_status CASCADE;

-- =============================================
-- ÉTAPE 1 : Tables de base (sans policies admin)
-- =============================================

CREATE TYPE user_role AS ENUM ('admin', 'user');
CREATE TYPE payment_status AS ENUM ('pending', 'completed', 'failed');

-- Profiles (table d'abord, policies de base seulement)
CREATE TABLE public.profiles (
  id UUID REFERENCES auth.users(id) ON DELETE CASCADE PRIMARY KEY,
  email TEXT NOT NULL,
  full_name TEXT,
  role user_role DEFAULT 'user'::user_role NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can view their own profile."
  ON public.profiles FOR SELECT USING (auth.uid() = id);

CREATE POLICY "Users can update their own profile."
  ON public.profiles FOR UPDATE USING (auth.uid() = id);

-- =============================================
-- ÉTAPE 2 : Fonction is_admin() (après la table profiles)
-- =============================================

CREATE OR REPLACE FUNCTION public.is_admin()
RETURNS boolean AS $$
  SELECT EXISTS (
    SELECT 1 FROM public.profiles
    WHERE id = auth.uid() AND role = 'admin'
  );
$$ LANGUAGE sql SECURITY DEFINER STABLE;

-- Maintenant on peut ajouter la policy admin sur profiles
CREATE POLICY "Admins can view all profiles."
  ON public.profiles FOR SELECT USING (public.is_admin());

-- Trigger : créer un profil à l'inscription
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS trigger AS $$
BEGIN
  INSERT INTO public.profiles (id, email, full_name, role)
  VALUES (new.id, new.email, new.raw_user_meta_data->>'full_name', 'user');
  RETURN new;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE PROCEDURE public.handle_new_user();

-- =============================================
-- ÉTAPE 3 : Toutes les autres tables (is_admin() existe déjà)
-- =============================================

-- Courses
CREATE TABLE public.courses (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  title TEXT NOT NULL,
  description TEXT,
  price NUMERIC NOT NULL DEFAULT 0,
  published BOOLEAN DEFAULT false,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

ALTER TABLE public.courses ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Anyone can view published courses."
  ON public.courses FOR SELECT USING (published = true);

CREATE POLICY "Admins can do everything on courses."
  ON public.courses FOR ALL USING (public.is_admin());

-- Purchases
CREATE TABLE public.purchases (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID REFERENCES public.profiles(id) ON DELETE CASCADE,
  course_id UUID REFERENCES public.courses(id) ON DELETE CASCADE,
  amount NUMERIC NOT NULL,
  payment_status payment_status DEFAULT 'pending'::payment_status NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

ALTER TABLE public.purchases ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can view their own purchases."
  ON public.purchases FOR SELECT USING (auth.uid() = user_id);

CREATE POLICY "Admins can view all purchases."
  ON public.purchases FOR ALL USING (public.is_admin());

-- Lessons
CREATE TABLE public.lessons (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  course_id UUID REFERENCES public.courses(id) ON DELETE CASCADE,
  title TEXT NOT NULL,
  content TEXT,
  order_index INTEGER DEFAULT 0,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

ALTER TABLE public.lessons ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users who bought course can view lessons"
  ON public.lessons FOR SELECT USING (
    EXISTS (
      SELECT 1 FROM public.purchases
      WHERE purchases.course_id = lessons.course_id
      AND purchases.user_id = auth.uid()
      AND purchases.payment_status = 'completed'
    )
    OR public.is_admin()
  );

CREATE POLICY "Admins can do everything on lessons."
  ON public.lessons FOR ALL USING (public.is_admin());

-- Progressions
CREATE TABLE public.progressions (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID REFERENCES public.profiles(id) ON DELETE CASCADE,
  lesson_id UUID REFERENCES public.lessons(id) ON DELETE CASCADE,
  completed BOOLEAN DEFAULT false,
  completed_at TIMESTAMP WITH TIME ZONE,
  UNIQUE(user_id, lesson_id)
);

ALTER TABLE public.progressions ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can view and update their own progression."
  ON public.progressions FOR ALL USING (auth.uid() = user_id);

CREATE POLICY "Admins can view all progressions."
  ON public.progressions FOR SELECT USING (public.is_admin());

-- Certificates
CREATE TABLE public.certificates (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID REFERENCES public.profiles(id) ON DELETE CASCADE,
  course_id UUID REFERENCES public.courses(id) ON DELETE CASCADE,
  score INTEGER NOT NULL,
  total INTEGER NOT NULL,
  validated BOOLEAN DEFAULT true NOT NULL,
  issued_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

ALTER TABLE public.certificates ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can view their own certificates."
  ON public.certificates FOR SELECT USING (auth.uid() = user_id);

CREATE POLICY "Admins can view all certificates."
  ON public.certificates FOR ALL USING (public.is_admin());

-- Consultation Requests
CREATE TABLE public.consultation_requests (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  full_name TEXT NOT NULL,
  email TEXT NOT NULL,
  city TEXT NOT NULL,
  study_type TEXT NOT NULL,
  message TEXT NOT NULL,
  status TEXT DEFAULT 'new' NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

ALTER TABLE public.consultation_requests ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Anyone can submit a consultation request."
  ON public.consultation_requests FOR INSERT WITH CHECK (true);

CREATE POLICY "Admins can view and manage consultation requests."
  ON public.consultation_requests FOR ALL USING (public.is_admin());

-- Analytics Events
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

CREATE INDEX idx_analytics_created_at ON public.analytics_events(created_at);
CREATE INDEX idx_analytics_event_type ON public.analytics_events(event_type);
CREATE INDEX idx_analytics_path ON public.analytics_events(path);
CREATE INDEX idx_analytics_user_id ON public.analytics_events(user_id);

ALTER TABLE public.analytics_events ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Anyone can insert analytics events"
  ON public.analytics_events FOR INSERT WITH CHECK (true);

CREATE POLICY "Admins can view all analytics events"
  ON public.analytics_events FOR SELECT USING (public.is_admin());

CREATE POLICY "Admins can delete analytics events"
  ON public.analytics_events FOR DELETE USING (public.is_admin());

-- Mettre rayannbachabi0@gmail.com en admin
UPDATE public.profiles SET role = 'admin' WHERE email = 'rayannbachabi0@gmail.com';
