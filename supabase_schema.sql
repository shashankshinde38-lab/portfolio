-- ==============================================================================
-- SHASHANK SHINDE QA PORTFOLIO — SUPABASE DATABASE SCHEMA
-- Run this in your Supabase Dashboard -> SQL Editor -> New query -> Run
-- ==============================================================================

-- 1. Create the enquiries table (if not exists)
CREATE TABLE IF NOT EXISTS public.enquiries (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL,
  email TEXT NOT NULL,
  mobile VARCHAR(20),
  reason TEXT,
  message TEXT NOT NULL,
  image_url TEXT,
  status VARCHAR(20) NOT NULL DEFAULT 'new' CHECK (status IN ('new', 'read', 'resolved')),
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- 2. Add image_url column safely if the table already existed without it
DO $$
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM information_schema.columns 
    WHERE table_schema = 'public' 
    AND table_name = 'enquiries' 
    AND column_name = 'image_url'
  ) THEN
    ALTER TABLE public.enquiries ADD COLUMN image_url TEXT;
  END IF;
END $$;

-- 3. Create high-performance indices for fast sorting and status filtering
CREATE INDEX IF NOT EXISTS idx_enquiries_created_at ON public.enquiries (created_at DESC);
CREATE INDEX IF NOT EXISTS idx_enquiries_status ON public.enquiries (status);

-- 4. Enable Row Level Security (RLS)
ALTER TABLE public.enquiries ENABLE ROW LEVEL SECURITY;

-- 5. Create RLS Policies
-- Allow anyone (public / anon users) to insert new enquiries via the contact form
DROP POLICY IF EXISTS "Public can submit enquiries" ON public.enquiries;
CREATE POLICY "Public can submit enquiries" 
  ON public.enquiries 
  FOR INSERT 
  TO anon, authenticated
  WITH CHECK (true);

-- Allow service_role (Next.js server backend) full access to read, update, delete
DROP POLICY IF EXISTS "Service role has full access" ON public.enquiries;
CREATE POLICY "Service role has full access" 
  ON public.enquiries 
  FOR ALL 
  TO service_role
  USING (true)
  WITH CHECK (true);

-- 6. Storage Bucket for optional image attachments (if using image uploads)
INSERT INTO storage.buckets (id, name, public)
VALUES ('enquiry-images', 'enquiry-images', true)
ON CONFLICT (id) DO NOTHING;

DROP POLICY IF EXISTS "Public can view enquiry images" ON storage.objects;
CREATE POLICY "Public can view enquiry images" 
  ON storage.objects 
  FOR SELECT 
  TO public 
  USING (bucket_id = 'enquiry-images');

DROP POLICY IF EXISTS "Service role can upload enquiry images" ON storage.objects;
CREATE POLICY "Service role can upload enquiry images" 
  ON storage.objects 
  FOR INSERT 
  TO service_role 
  WITH CHECK (bucket_id = 'enquiry-images');

