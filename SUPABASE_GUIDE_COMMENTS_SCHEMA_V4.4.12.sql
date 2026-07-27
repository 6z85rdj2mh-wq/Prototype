-- LA TANA DI NIKA — GUIDE COMMENTS SCHEMA V4.4.12
-- Schema preparatorio. Non viene applicato automaticamente dalla patch.
-- Richiede Supabase Anonymous Auth nel client pubblico.

create table if not exists public.guide_comments (
  id uuid primary key default gen_random_uuid(),
  guide_id text not null,
  user_id uuid not null default auth.uid(),
  display_name text not null check (char_length(display_name) between 1 and 30),
  rating smallint not null check (rating between 1 and 5),
  comment_text text not null check (char_length(comment_text) between 1 and 600),
  status text not null default 'published'
    check (status in ('pending', 'published', 'hidden')),
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  unique (guide_id, user_id)
);

create index if not exists guide_comments_guide_created_idx
  on public.guide_comments (guide_id, created_at desc);

alter table public.guide_comments enable row level security;

drop policy if exists "Published comments are publicly readable"
  on public.guide_comments;
create policy "Published comments are publicly readable"
  on public.guide_comments
  for select
  using (status = 'published');

drop policy if exists "Authenticated anonymous users can add their comment"
  on public.guide_comments;
create policy "Authenticated anonymous users can add their comment"
  on public.guide_comments
  for insert
  to authenticated
  with check (auth.uid() = user_id);

drop policy if exists "Users can update their own comment"
  on public.guide_comments;
create policy "Users can update their own comment"
  on public.guide_comments
  for update
  to authenticated
  using (auth.uid() = user_id)
  with check (auth.uid() = user_id);

drop policy if exists "Users can delete their own comment"
  on public.guide_comments;
create policy "Users can delete their own comment"
  on public.guide_comments
  for delete
  to authenticated
  using (auth.uid() = user_id);

-- La moderazione admin dovrà usare una policy separata basata su ruolo,
-- claim custom o tabella public.admin_users.
