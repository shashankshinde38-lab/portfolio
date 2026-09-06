-- Fresh-install schema for the server-owned enquiry inbox.
-- Browser roles have no direct table privileges; Next.js validates public writes.

create extension if not exists pgcrypto;

create table if not exists public.enquiries (
  id uuid primary key default gen_random_uuid(),
  name text not null check (char_length(btrim(name)) between 1 and 120),
  email text not null check (char_length(btrim(email)) between 3 and 160),
  mobile text check (mobile is null or mobile ~ '^[0-9]{10}$'),
  message text not null check (char_length(btrim(message)) between 1 and 1000),
  reason text check (reason is null or char_length(reason) <= 120),
  status text not null default 'new' check (status in ('new', 'read', 'resolved')),
  created_at timestamptz not null default now(),
  legacy_contact_message_id text unique
);

create index if not exists enquiries_created_at_idx
  on public.enquiries (created_at desc);
create index if not exists enquiries_status_idx
  on public.enquiries (status);

alter table public.enquiries enable row level security;
revoke all on table public.enquiries from public, anon, authenticated;
grant select, insert, update, delete on table public.enquiries to service_role;

comment on table public.enquiries is
  'Private portfolio enquiries; access is mediated by validated Next.js APIs.';
