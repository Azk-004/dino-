-- ============================================================================
-- Panneautique — Code de connexion à 4 chiffres (déblocage de la leçon)
-- ----------------------------------------------------------------------------
-- À chaque connexion (email + mot de passe valides), l'Edge Function
-- `login-code` génère un code à 4 chiffres, en stocke ici l'empreinte (hash)
-- et l'envoie par email (Resend). L'utilisateur le saisit pour débloquer la
-- leçon. Un seul code valide suffit : on le marque comme utilisé.
--
-- La table n'a AUCUNE politique RLS : seul le rôle de service (service_role,
-- utilisé par l'Edge Function) peut y accéder. Le client du site n'y a jamais
-- accès — on ne peut ni lire, ni deviner, ni insérer un code depuis le navigateur.
-- ============================================================================

create table if not exists public.login_codes (
  id bigint generated always as identity primary key,
  email text not null,
  code_hash text not null,
  expires_at timestamptz not null,
  used_at timestamptz,
  created_at timestamptz not null default now()
);

create index if not exists login_codes_email_created_idx
  on public.login_codes (email, created_at desc);

alter table public.login_codes enable row level security;

-- ----------------------------------------------------------------------------
-- Détection « style Google » (étape 1 de la connexion) : le site demande si un
-- email correspond à un compte existant. Fonction security definer qui interroge
-- auth.users ; exécutable par anon (le navigateur) et authenticated.
-- ----------------------------------------------------------------------------
create or replace function public.email_registered(p_email text)
returns boolean
language sql
security definer
set search_path = public
as $$
  select exists (
    select 1 from auth.users where lower(email) = lower(p_email)
  );
$$;

revoke all on function public.email_registered(text) from public;
grant execute on function public.email_registered(text) to anon, authenticated;
