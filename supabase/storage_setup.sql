-- ==============================================================================
-- OFFICERA - SUPABASE STORAGE BUCKETS & ACCESS POLICIES SETUP SCRIPT
-- ==============================================================================
-- Run this SQL in your Supabase project (officera-staging and officera-production)
-- SQL Editor to initialize storage buckets and Row Level Security (RLS) policies.

-- 1. Create 'listing-pending' (Private Bucket for partner uploads under review)
INSERT INTO storage.buckets (id, name, public, file_size_limit, allowed_mime_types)
VALUES (
  'listing-pending',
  'listing-pending',
  false,
  10485760, -- 10 MB limit
  ARRAY['image/jpeg', 'image/png', 'image/webp']
)
ON CONFLICT (id) DO UPDATE SET
  public = false,
  file_size_limit = 10485760,
  allowed_mime_types = ARRAY['image/jpeg', 'image/png', 'image/webp'];

-- 2. Create 'listing-public' (Public Bucket for approved live listings)
INSERT INTO storage.buckets (id, name, public, file_size_limit, allowed_mime_types)
VALUES (
  'listing-public',
  'listing-public',
  true,
  10485760, -- 10 MB limit
  ARRAY['image/jpeg', 'image/png', 'image/webp']
)
ON CONFLICT (id) DO UPDATE SET
  public = true,
  file_size_limit = 10485760,
  allowed_mime_types = ARRAY['image/jpeg', 'image/png', 'image/webp'];

-- 3. Storage Policies for 'listing-public'
-- Anyone can view approved listing media (public access)
DROP POLICY IF EXISTS "Public can view approved listing photos" ON storage.objects;
CREATE POLICY "Public can view approved listing photos"
ON storage.objects FOR SELECT
USING (bucket_id = 'listing-public');

-- Only Service Role can insert or move photos into 'listing-public'
DROP POLICY IF EXISTS "Service role manages public listing photos" ON storage.objects;
CREATE POLICY "Service role manages public listing photos"
ON storage.objects FOR ALL
USING (bucket_id = 'listing-public' AND auth.role() = 'service_role')
WITH CHECK (bucket_id = 'listing-public' AND auth.role() = 'service_role');

-- 4. Storage Policies for 'listing-pending'
-- Only Service Role and Admins can view pending photos
DROP POLICY IF EXISTS "Admin and service role can view pending photos" ON storage.objects;
CREATE POLICY "Admin and service role can view pending photos"
ON storage.objects FOR SELECT
USING (bucket_id = 'listing-pending' AND auth.role() = 'service_role');

-- Partners / Authenticated Users can upload via signed URL or authenticated session
DROP POLICY IF EXISTS "Authenticated users can upload pending listing photos" ON storage.objects;
CREATE POLICY "Authenticated users can upload pending listing photos"
ON storage.objects FOR INSERT
WITH CHECK (
  bucket_id = 'listing-pending'
  AND (auth.role() = 'authenticated' OR auth.role() = 'service_role')
);
