-- LA TANA DI NIKA — PREMIUM GUIDES DATA SCHEMA V4.4.15
-- Safe baseline: public users may read published guides only.
-- No public write policy is created. Admin write policies must be added only
-- after the final authenticated admin dashboard is implemented.

create extension if not exists pgcrypto;

create table if not exists public.premium_guides (
  id uuid primary key default gen_random_uuid(),
  guide_key text not null unique,
  slug text not null unique,
  status text not null default 'draft' check (status in ('draft','published','archived')),
  leader text not null,
  format text not null,
  payload jsonb not null default '{}'::jsonb,
  published_at timestamptz,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create index if not exists premium_guides_status_idx on public.premium_guides(status);
create index if not exists premium_guides_updated_at_idx on public.premium_guides(updated_at desc);
create index if not exists premium_guides_payload_gin_idx on public.premium_guides using gin(payload);

create or replace function public.set_premium_guides_updated_at()
returns trigger
language plpgsql
security invoker
set search_path = public
as $$
begin
  new.updated_at = now();
  if new.status = 'published' and new.published_at is null then
    new.published_at = now();
  end if;
  return new;
end;
$$;

drop trigger if exists premium_guides_set_updated_at on public.premium_guides;
create trigger premium_guides_set_updated_at
before update on public.premium_guides
for each row execute function public.set_premium_guides_updated_at();

alter table public.premium_guides enable row level security;

drop policy if exists "Published premium guides are publicly readable" on public.premium_guides;
create policy "Published premium guides are publicly readable"
on public.premium_guides
for select
to anon, authenticated
using (status = 'published');

-- Intentionally absent:
-- insert / update / delete policies.
-- Add them only for a verified admin role or server-side service layer.

-- Recommended Storage folder convention:
-- premium-guides/<guide-key>/cover/
-- premium-guides/<guide-key>/decklist/
-- premium-guides/<guide-key>/cards/
-- premium-guides/<guide-key>/matchups/
-- premium-guides/<guide-key>/vods/
