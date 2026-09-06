-- Migration: Admin sessions table for server-side opaque session cookies
-- Sessions are hashed with SHA-256 before storage.
-- Public, anon, and authenticated roles have no access; only service_role can manage sessions.

create table if not exists public.admin_sessions (
  token_hash text primary key,
  user_id uuid not null references auth.users(id) on delete cascade,
  expires_at timestamptz not null,
  created_at timestamptz not null default now()
);

create index if not exists admin_sessions_expires_at_idx
  on public.admin_sessions (expires_at);

alter table public.admin_sessions enable row level security;
alter table public.admin_sessions force row level security;

revoke all on table public.admin_sessions from public, anon, authenticated;
grant select, insert, update, delete on table public.admin_sessions to service_role;

comment on table public.admin_sessions is
  'Private server-side admin session storage; access is restricted to service_role.';
