-- ============================================================================
-- Panneautique — Comptes utilisateurs (Supabase Auth)
-- Table `profiles` créée automatiquement à chaque inscription (trigger sur
-- auth.users). Le propriétaire du compte peut lire et modifier sa fiche ;
-- personne ne peut lire les fiches des autres.
-- ============================================================================

-- 1) Fiche de profil liée au compte d'authentification
create table if not exists public.profiles (
  id uuid primary key references auth.users (id) on delete cascade,
  email text not null,
  display_name text,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

alter table public.profiles enable row level security;

-- Le propriétaire peut lire sa propre fiche
create policy "users can read own profile"
  on public.profiles for select
  to authenticated
  using (auth.uid() = id);

-- Le propriétaire peut modifier sa propre fiche (nom affiché, etc.)
create policy "users can update own profile"
  on public.profiles for update
  to authenticated
  using (auth.uid() = id)
  with check (auth.uid() = id);

-- 2) Création automatique de la fiche à l'inscription
create or replace function public.handle_new_user()
returns trigger
language plpgsql
security definer set search_path = public
as $$
begin
  insert into public.profiles (id, email)
  values (new.id, new.email)
  on conflict (id) do nothing;
  return new;
end;
$$;

drop trigger if exists on_auth_user_created on auth.users;
create trigger on_auth_user_created
  after insert on auth.users
  for each row execute function public.handle_new_user();
