-- 1. Création des Enumérations
CREATE TYPE user_role AS ENUM ('admin', 'user');
CREATE TYPE payment_status AS ENUM ('pending', 'completed', 'failed');

-- 2. Table Profiles (liée à auth.users)
CREATE TABLE public.profiles (
  id UUID REFERENCES auth.users(id) ON DELETE CASCADE PRIMARY KEY,
  email TEXT NOT NULL,
  full_name TEXT,
  role user_role DEFAULT 'user'::user_role NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- Active RLS sur profiles
ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;

-- Politiques RLS pour profiles
CREATE POLICY "Users can view their own profile." 
  ON public.profiles FOR SELECT USING (auth.uid() = id);

CREATE POLICY "Users can update their own profile." 
  ON public.profiles FOR UPDATE USING (auth.uid() = id);

CREATE POLICY "Admins can view all profiles." 
  ON public.profiles FOR SELECT USING (
    EXISTS (SELECT 1 FROM public.profiles WHERE id = auth.uid() AND role = 'admin')
  );

-- Function to handle new user signup
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS trigger AS $$
BEGIN
  INSERT INTO public.profiles (id, email, full_name, role)
  VALUES (new.id, new.email, new.raw_user_meta_data->>'full_name', 'user');
  RETURN new;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Trigger to automatically create profile on signup
CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE PROCEDURE public.handle_new_user();


-- 3. Table Courses (Formations)
CREATE TABLE public.courses (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  title TEXT NOT NULL,
  description TEXT,
  price NUMERIC NOT NULL DEFAULT 0,
  published BOOLEAN DEFAULT false,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- Active RLS
ALTER TABLE public.courses ENABLE ROW LEVEL SECURITY;

-- Politiques pour courses
CREATE POLICY "Anyone can view published courses." 
  ON public.courses FOR SELECT USING (published = true);

CREATE POLICY "Admins can do everything on courses." 
  ON public.courses FOR ALL USING (
    EXISTS (SELECT 1 FROM public.profiles WHERE id = auth.uid() AND role = 'admin')
  );


-- 4. Table Lessons (Leçons des formations)
CREATE TABLE public.lessons (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  course_id UUID REFERENCES public.courses(id) ON DELETE CASCADE,
  title TEXT NOT NULL,
  content TEXT,
  order_index INTEGER DEFAULT 0,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- Active RLS
ALTER TABLE public.lessons ENABLE ROW LEVEL SECURITY;

-- Politiques pour lessons
-- Note: Dans une vraie app, on vérifie que l'utilisateur a acheté le cours.
-- Pour l'instant, on limite la lecture à ceux qui ont payé ou admins.
CREATE POLICY "Users who bought course can view lessons" 
  ON public.lessons FOR SELECT USING (
    EXISTS (
      SELECT 1 FROM public.purchases 
      WHERE purchases.course_id = lessons.course_id 
      AND purchases.user_id = auth.uid() 
      AND purchases.payment_status = 'completed'
    )
    OR EXISTS (SELECT 1 FROM public.profiles WHERE id = auth.uid() AND role = 'admin')
  );

CREATE POLICY "Admins can do everything on lessons." 
  ON public.lessons FOR ALL USING (
    EXISTS (SELECT 1 FROM public.profiles WHERE id = auth.uid() AND role = 'admin')
  );


-- 5. Table Purchases (Achats/Paiements)
CREATE TABLE public.purchases (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID REFERENCES public.profiles(id) ON DELETE CASCADE,
  course_id UUID REFERENCES public.courses(id) ON DELETE CASCADE,
  amount NUMERIC NOT NULL,
  payment_status payment_status DEFAULT 'pending'::payment_status NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- Active RLS
ALTER TABLE public.purchases ENABLE ROW LEVEL SECURITY;

-- Politiques pour purchases
CREATE POLICY "Users can view their own purchases." 
  ON public.purchases FOR SELECT USING (auth.uid() = user_id);

CREATE POLICY "Admins can view all purchases." 
  ON public.purchases FOR ALL USING (
    EXISTS (SELECT 1 FROM public.profiles WHERE id = auth.uid() AND role = 'admin')
  );


-- 6. Table Progressions (Suivi des leçons complétées)
CREATE TABLE public.progressions (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID REFERENCES public.profiles(id) ON DELETE CASCADE,
  lesson_id UUID REFERENCES public.lessons(id) ON DELETE CASCADE,
  completed BOOLEAN DEFAULT false,
  completed_at TIMESTAMP WITH TIME ZONE,
  UNIQUE(user_id, lesson_id)
);

-- Active RLS
ALTER TABLE public.progressions ENABLE ROW LEVEL SECURITY;

-- Politiques pour progressions
CREATE POLICY "Users can view and update their own progression." 
  ON public.progressions FOR ALL USING (auth.uid() = user_id);

CREATE POLICY "Admins can view all progressions." 
  ON public.progressions FOR SELECT USING (
    EXISTS (SELECT 1 FROM public.profiles WHERE id = auth.uid() AND role = 'admin')
  );


-- 7. Table Certificates (certificats délivrés par la plateforme après validation d'un module)
CREATE TABLE public.certificates (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID REFERENCES public.profiles(id) ON DELETE CASCADE,
  course_id UUID REFERENCES public.courses(id) ON DELETE CASCADE,
  score INTEGER NOT NULL,
  total INTEGER NOT NULL,
  validated BOOLEAN DEFAULT true NOT NULL,
  issued_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- Active RLS
ALTER TABLE public.certificates ENABLE ROW LEVEL SECURITY;

-- Politiques pour certificates
CREATE POLICY "Users can view their own certificates." 
  ON public.certificates FOR SELECT USING (auth.uid() = user_id);

CREATE POLICY "Admins can view all certificates." 
  ON public.certificates FOR ALL USING (
    EXISTS (SELECT 1 FROM public.profiles WHERE id = auth.uid() AND role = 'admin')
  );


-- 8. Table Consultation_Requests (demandes d'études sur la panneautique, ses réformes et l'exploitation)
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

-- Active RLS
ALTER TABLE public.consultation_requests ENABLE ROW LEVEL SECURITY;

-- Politiques pour consultation_requests
CREATE POLICY "Anyone can submit a consultation request." 
  ON public.consultation_requests FOR INSERT WITH CHECK (true);

CREATE POLICY "Admins can view and manage consultation requests." 
  ON public.consultation_requests FOR ALL USING (
    EXISTS (SELECT 1 FROM public.profiles WHERE id = auth.uid() AND role = 'admin')
  );
