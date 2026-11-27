begin;

create table if not exists public.admin_sessions (
  token_hash text primary key,
  user_id text not null,
  expires_at timestamptz not null,
  created_at timestamptz not null default now()
);

-- PIN-based login can use a configured application ID without an auth.users row.
-- Preserve any sessions already stored with a Supabase user UUID.
alter table public.admin_sessions
  drop constraint if exists admin_sessions_user_id_fkey,
  alter column user_id type text using user_id::text;

create index if not exists admin_sessions_expires_at_idx
  on public.admin_sessions (expires_at);

alter table public.admin_sessions enable row level security;
alter table public.admin_sessions force row level security;
revoke all on table public.admin_sessions from public, anon, authenticated;
grant select, insert, update, delete on table public.admin_sessions to service_role;

commit;
