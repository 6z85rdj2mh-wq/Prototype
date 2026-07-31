-- LA TANA DI NIKA — ARTICLES CMS SCHEMA V4.4.18
-- Schema preparatorio. Verificare nel progetto Supabase prima dell'esecuzione.

create type public.article_status as enum ('draft','scheduled','published','archived','trash');
create type public.article_type as enum ('editorial','analysis','nika-league-report','tournament-report','news');

create table if not exists public.articles (
  id uuid primary key default gen_random_uuid(),
  slug text unique not null,
  status public.article_status not null default 'draft',
  type public.article_type not null default 'editorial',
  featured boolean not null default false,
  title jsonb not null default '{"it":"","en":""}'::jsonb,
  excerpt jsonb not null default '{"it":"","en":""}'::jsonb,
  author jsonb not null default '{}'::jsonb,
  category jsonb not null default '{"it":"","en":""}'::jsonb,
  tags jsonb not null default '{"it":[],"en":[]}'::jsonb,
  cover jsonb not null default '{}'::jsonb,
  modules jsonb not null default '[]'::jsonb,
  seo jsonb not null default '{}'::jsonb,
  reading_time integer not null default 5 check (reading_time > 0),
  scheduled_at timestamptz,
  published_at timestamptz,
  deleted_at timestamptz,
  revision integer not null default 1,
  created_by uuid references auth.users(id),
  updated_by uuid references auth.users(id),
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create index if not exists articles_public_idx on public.articles(status, published_at desc) where deleted_at is null;
create index if not exists articles_type_idx on public.articles(type);

alter table public.articles enable row level security;

create policy "Public can read published articles"
on public.articles for select
using (status = 'published' and deleted_at is null and (published_at is null or published_at <= now()));

-- Le policy di scrittura admin verranno collegate al sistema ruoli definitivo.
-- Non inserire service role key o credenziali R2 nel frontend.
