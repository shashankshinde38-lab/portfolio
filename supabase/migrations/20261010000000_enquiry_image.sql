-- Migration: Add image_url column to public.enquiries table
-- Run this migration in Supabase SQL Editor:
--
-- ALTER TABLE public.enquiries ADD COLUMN IF NOT EXISTS image_url text;
-- CREATE INDEX IF NOT EXISTS enquiries_image_url_idx ON public.enquiries (image_url) WHERE image_url IS NOT NULL;

alter table public.enquiries
  add column if not exists image_url text;

create index if not exists enquiries_image_url_idx
  on public.enquiries (image_url)
  where image_url is not null;

comment on column public.enquiries.image_url is
  'Public URL or storage path of an image attachment submitted with the enquiry.';
