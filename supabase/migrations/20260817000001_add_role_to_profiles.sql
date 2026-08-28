-- Ajouter la colonne role à la table profiles (si elle n'existe pas déjà)
DO $$
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM information_schema.columns
    WHERE table_schema = 'public' AND table_name = 'profiles' AND column_name = 'role'
  ) THEN
    -- Créer l'enum si il n'existe pas
    IF NOT EXISTS (SELECT 1 FROM pg_type WHERE typname = 'user_role') THEN
      CREATE TYPE user_role AS ENUM ('admin', 'user');
    END IF;

    ALTER TABLE public.profiles
      ADD COLUMN role user_role DEFAULT 'user'::user_role NOT NULL;
  END IF;
END $$;

-- Mettre aurelazk004@gmail.com en admin
UPDATE public.profiles SET role = 'admin' WHERE email = 'aurelazk004@gmail.com';

-- S'assurer que les politiques RLS admin existent
DO $$
BEGIN
  -- Politique lecture admin
  IF NOT EXISTS (
    SELECT 1 FROM pg_policies WHERE policyname = 'Admins can view all profiles.' AND tablename = 'profiles'
  ) THEN
    CREATE POLICY "Admins can view all profiles."
      ON public.profiles FOR SELECT USING (
        EXISTS (SELECT 1 FROM public.profiles WHERE id = auth.uid() AND role = 'admin')
      );
  END IF;
END $$;
