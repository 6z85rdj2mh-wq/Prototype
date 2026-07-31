-- LA TANA DI NIKA — FREE GUIDES CMS BASELINE V4.4.16
create table if not exists public.free_guides (
  id text primary key,
  slug text not null unique,
  status text not null default 'draft' check (status in ('draft','published','archived','trash')),
  leader text,
  title_it text,
  title_en text,
  excerpt_it text,
  excerpt_en text,
  cover_image text,
  content jsonb not null default '{}'::jsonb,
  published_at timestamptz,
  deleted_at timestamptz,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);
create index if not exists free_guides_status_idx on public.free_guides(status);
create index if not exists free_guides_updated_at_idx on public.free_guides(updated_at desc);
alter table public.free_guides enable row level security;
drop policy if exists "Public can read published free guides" on public.free_guides;
create policy "Public can read published free guides" on public.free_guides for select
using (status = 'published' and deleted_at is null);
-- INSERT/UPDATE/DELETE: aggiungere soltanto dopo il ruolo admin; niente scritture anonime.
