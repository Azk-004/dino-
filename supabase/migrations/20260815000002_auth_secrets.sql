-- ============================================================================
-- Panneautique — Mots de passe aléatoires des comptes (connexion par code)
-- ----------------------------------------------------------------------------
-- Connexion « email + code à 4 chiffres » : l'utilisateur ne choisit JAMAIS de
-- mot de passe. À la création du compte, l'Edge Function génère un mot de passe
-- aléatoire, le stocke ici (table sans politique RLS, accessible uniquement par
-- le rôle de service utilisé par la fonction) et crée le compte dans auth.users.
-- À la validation du code, la fonction signe l'utilisateur avec ce mot de passe
-- stocké et renvoie sa session. Personne (utilisateur compris) ne peut lire
-- cette table : aucune politique, donc aucun accès anon/authenticated.
-- ============================================================================

create table if not exists public.auth_secrets (
  email text primary key,
  password text not null,
  created_at timestamptz not null default now()
);

alter table public.auth_secrets enable row level security;

-- La fonction de détection de compte doit aussi rester utilisable par la clé de
-- service (l'Edge Function l'appelle pour savoir si un compte existe déjà).
grant execute on function public.email_registered(text) to service_role;
