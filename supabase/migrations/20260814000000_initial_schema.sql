-- ============================================================================
-- Panneautique — Schéma de la base Supabase
-- À exécuter dans le Dashboard Supabase → SQL Editor (une seule fois).
-- Le site (clé anon) ne peut qu'INSÉRER dans ces tables : aucune lecture,
-- modification ou suppression depuis le client. La lecture se fait dans le
-- Dashboard ou via une clé de service (jamais côté client).
-- ============================================================================

-- 1) Visites de page
create table if not exists public.page_visits (
  id bigint generated always as identity primary key,
  page text not null default '',
  referrer text,
  screen text,
  user_agent text,
  created_at timestamptz not null default now()
);

alter table public.page_visits enable row level security;

create policy "anon can insert visits"
  on public.page_visits for insert
  to anon
  with check (true);

-- 2) Lectures de leçons
create table if not exists public.lesson_reads (
  id bigint generated always as identity primary key,
  lesson_index int not null,
  lesson_title text,
  created_at timestamptz not null default now()
);

alter table public.lesson_reads enable row level security;

create policy "anon can insert lessons"
  on public.lesson_reads for insert
  to anon
  with check (true);

-- 3) Résultats du questionnaire
create table if not exists public.quiz_results (
  id bigint generated always as identity primary key,
  score int not null,
  total int not null,
  percent int not null,
  passed boolean not null default false,
  created_at timestamptz not null default now()
);

alter table public.quiz_results enable row level security;

create policy "anon can insert quiz results"
  on public.quiz_results for insert
  to anon
  with check (true);

-- 4) Messages de contact
create table if not exists public.contact_messages (
  id bigint generated always as identity primary key,
  name text not null,
  email text not null,
  message text not null,
  created_at timestamptz not null default now()
);

alter table public.contact_messages enable row level security;

create policy "anon can insert contact messages"
  on public.contact_messages for insert
  to anon
  with check (true);
