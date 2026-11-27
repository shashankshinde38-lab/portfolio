begin;

create table if not exists public.enquiry_whatsapp_outbox (
  enquiry_id uuid not null references public.enquiries(id) on delete cascade,
  recipient text not null check (recipient in ('admin', 'sender')),
  payload jsonb,
  status text not null default 'pending' check (status in ('pending', 'accepted', 'disconnected')),
  attempts integer not null default 0,
  next_attempt_at timestamptz not null default now(),
  last_error_code text,
  primary key (enquiry_id, recipient),
  check ((status = 'pending') = (payload is not null))
);

create index if not exists enquiry_whatsapp_due_idx
  on public.enquiry_whatsapp_outbox (next_attempt_at)
  where status = 'pending';

alter table public.enquiry_whatsapp_outbox enable row level security;
revoke all on public.enquiry_whatsapp_outbox from public, anon, authenticated;
grant select, insert, update on public.enquiry_whatsapp_outbox to service_role;

create or replace function public.insert_enquiry_with_whatsapp(enquiry jsonb, notifications jsonb)
returns uuid
language plpgsql
set search_path = ''
as $$
declare
  new_id uuid;
begin
  insert into public.enquiries (name, email, mobile, message, reason, image_url)
  values (
    enquiry ->> 'name', enquiry ->> 'email', enquiry ->> 'mobile',
    enquiry ->> 'message', enquiry ->> 'reason', enquiry ->> 'image_url'
  )
  returning id into new_id;

  insert into public.enquiry_whatsapp_outbox (enquiry_id, recipient, payload)
  select new_id, job ->> 'recipient', job -> 'payload'
  from jsonb_array_elements(notifications) as job;

  return new_id;
end;
$$;

create or replace function public.claim_enquiry_whatsapp_jobs(target_enquiry_id uuid)
returns table (enquiry_id uuid, recipient text, payload jsonb, attempts integer)
language sql
set search_path = ''
as $$
  with due as (
    select job.enquiry_id, job.recipient
    from public.enquiry_whatsapp_outbox as job
    where job.status = 'pending'
      and job.next_attempt_at <= now()
      and (target_enquiry_id is null or job.enquiry_id = target_enquiry_id)
    order by job.next_attempt_at, job.enquiry_id, job.recipient
    limit 6
    for update skip locked
  )
  update public.enquiry_whatsapp_outbox as job
  set attempts = job.attempts + 1,
      next_attempt_at = now() + interval '2 minutes'
  from due
  where job.enquiry_id = due.enquiry_id and job.recipient = due.recipient
  returning job.enquiry_id, job.recipient, job.payload, job.attempts;
$$;

create or replace function public.finish_enquiry_whatsapp_job(
  target_enquiry_id uuid,
  target_recipient text,
  claimed_attempt integer,
  outcome text,
  error_code text
)
returns boolean
language sql
set search_path = ''
as $$
  with finished as (
    update public.enquiry_whatsapp_outbox
    set status = outcome,
        last_error_code = error_code,
        payload = case when outcome = 'pending' then payload else null end,
        next_attempt_at = now() + make_interval(
          mins => least(60, (1 << least(claimed_attempt - 1, 6)))
        )
    where enquiry_id = target_enquiry_id and recipient = target_recipient
      and attempts = claimed_attempt and status = 'pending'
    returning 1
  )
  select exists (select 1 from finished);
$$;

revoke all on function public.insert_enquiry_with_whatsapp(jsonb, jsonb)
  from public, anon, authenticated;
revoke all on function public.claim_enquiry_whatsapp_jobs(uuid)
  from public, anon, authenticated;
revoke all on function public.finish_enquiry_whatsapp_job(uuid, text, integer, text, text)
  from public, anon, authenticated;
grant execute on function public.insert_enquiry_with_whatsapp(jsonb, jsonb) to service_role;
grant execute on function public.claim_enquiry_whatsapp_jobs(uuid) to service_role;
grant execute on function public.finish_enquiry_whatsapp_job(uuid, text, integer, text, text)
  to service_role;

create extension if not exists pg_cron;
create extension if not exists pg_net;

select cron.schedule('portfolio-enquiry-whatsapp-retry', '* * * * *', $job$
  select net.http_post(
    url := 'https://shashankportfolio-jet.vercel.app/api/internal/whatsapp-retries',
    headers := jsonb_build_object('Authorization', 'Bearer ' || secret.decrypted_secret),
    timeout_milliseconds := 40000
  )
  from vault.decrypted_secrets as secret
  where secret.name = 'portfolio_whatsapp_retry_secret'
    and exists (
      select 1 from public.enquiry_whatsapp_outbox
      where status = 'pending' and next_attempt_at <= now()
    );
$job$);

commit;
