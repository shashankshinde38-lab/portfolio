-- Idempotent production migration for projects that still use contact_messages.
-- It creates the private inbox, migrates legacy rows, and closes browser access.

begin;

create extension if not exists pgcrypto;

create table if not exists public.enquiries (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  email text not null,
  mobile text,
  message text not null,
  reason text,
  status text not null default 'new',
  created_at timestamptz not null default now(),
  legacy_contact_message_id text
);

alter table public.enquiries
  add column if not exists legacy_contact_message_id text;

-- Normalize rows from compatible earlier drafts before constraints are validated.
update public.enquiries
set
  name = left(coalesce(nullif(btrim(name), ''), 'Unknown'), 120),
  email = left(coalesce(nullif(btrim(email), ''), 'unknown@example.invalid'), 160),
  mobile = case
    when regexp_replace(coalesce(mobile, ''), '[^0-9]', '', 'g') ~ '^[0-9]{10}$'
      then regexp_replace(mobile, '[^0-9]', '', 'g')
    else null
  end,
  message = left(coalesce(nullif(btrim(message), ''), 'Legacy enquiry'), 1000),
  reason = left(nullif(btrim(reason), ''), 120),
  status = case when status in ('new', 'read', 'resolved') then status else 'new' end,
  created_at = coalesce(created_at, now());

alter table public.enquiries
  alter column name set not null,
  alter column email set not null,
  alter column message set not null,
  alter column status set default 'new',
  alter column status set not null,
  alter column created_at set default now(),
  alter column created_at set not null;

alter table public.enquiries
  drop constraint if exists enquiries_name_length_check,
  drop constraint if exists enquiries_email_length_check,
  drop constraint if exists enquiries_mobile_format_check,
  drop constraint if exists enquiries_message_length_check,
  drop constraint if exists enquiries_reason_length_check,
  drop constraint if exists enquiries_status_check;

alter table public.enquiries
  add constraint enquiries_name_length_check
    check (char_length(btrim(name)) between 1 and 120) not valid,
  add constraint enquiries_email_length_check
    check (char_length(btrim(email)) between 3 and 160) not valid,
  add constraint enquiries_mobile_format_check
    check (mobile is null or mobile ~ '^[0-9]{10}$') not valid,
  add constraint enquiries_message_length_check
    check (char_length(btrim(message)) between 1 and 1000) not valid,
  add constraint enquiries_reason_length_check
    check (reason is null or char_length(reason) <= 120) not valid,
  add constraint enquiries_status_check
    check (status in ('new', 'read', 'resolved')) not valid;

alter table public.enquiries
  validate constraint enquiries_name_length_check,
  validate constraint enquiries_email_length_check,
  validate constraint enquiries_mobile_format_check,
  validate constraint enquiries_message_length_check,
  validate constraint enquiries_reason_length_check,
  validate constraint enquiries_status_check;

create index if not exists enquiries_created_at_idx
  on public.enquiries (created_at desc);
create index if not exists enquiries_status_idx
  on public.enquiries (status);
create unique index if not exists enquiries_legacy_contact_message_id_idx
  on public.enquiries (legacy_contact_message_id)
  where legacy_contact_message_id is not null;

alter table public.enquiries enable row level security;

do $$
declare
  policy_record record;
begin
  for policy_record in
    select policyname
    from pg_policies
    where schemaname = 'public' and tablename = 'enquiries'
  loop
    execute format(
      'drop policy if exists %I on public.enquiries',
      policy_record.policyname
    );
  end loop;
end
$$;

revoke all on table public.enquiries from public, anon, authenticated;
grant select, insert, update, delete on table public.enquiries to service_role;

do $$
declare
  policy_record record;
begin
  if to_regclass('public.contact_messages') is not null then
    execute 'alter table public.contact_messages add column if not exists status text default ''new''';
    execute 'alter table public.contact_messages enable row level security';

    for policy_record in
      select policyname
      from pg_policies
      where schemaname = 'public' and tablename = 'contact_messages'
    loop
      execute format(
        'drop policy if exists %I on public.contact_messages',
        policy_record.policyname
      );
    end loop;

    execute 'revoke all on table public.contact_messages from public, anon, authenticated';
    execute 'grant select on table public.contact_messages to service_role';

    execute $migration$
      insert into public.enquiries
        (name, email, mobile, message, reason, status, created_at, legacy_contact_message_id)
      select
        left(coalesce(nullif(btrim(legacy.full_name::text), ''), 'Unknown'), 120),
        left(coalesce(nullif(btrim(legacy.email::text), ''), 'unknown@example.invalid'), 160),
        case
          when regexp_replace(coalesce(legacy.mobile::text, ''), '[^0-9]', '', 'g') ~ '^[0-9]{10}$'
            then regexp_replace(legacy.mobile::text, '[^0-9]', '', 'g')
          else null
        end,
        left(coalesce(nullif(btrim(legacy.message::text), ''), 'Legacy enquiry'), 1000),
        left(nullif(btrim(legacy.reason::text), ''), 120),
        case
          when legacy.status::text in ('new', 'read', 'resolved') then legacy.status::text
          else 'new'
        end,
        coalesce(legacy.created_at, now()),
        legacy.id::text
      from public.contact_messages legacy
      on conflict (legacy_contact_message_id)
        where legacy_contact_message_id is not null
        do nothing
    $migration$;
  end if;
end
$$;

comment on table public.enquiries is
  'Private portfolio enquiries; access is mediated by validated Next.js APIs.';

commit;
