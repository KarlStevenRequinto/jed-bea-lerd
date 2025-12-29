-- =====================================================
-- ADD EMAIL COLUMN TO PROFILES TABLE
-- =====================================================
-- Description: Adds email column to profiles table for easier querying
-- Author: Auto Real Estate Ecommerce
-- Date: 2023-12-29
-- =====================================================

-- Add email column (allow NULL initially for existing records)
ALTER TABLE public.profiles
ADD COLUMN IF NOT EXISTS email TEXT;

-- Create index for email lookups
CREATE INDEX IF NOT EXISTS idx_profiles_email ON public.profiles(email);

-- Backfill email from auth.users for existing profiles
UPDATE public.profiles
SET email = auth.users.email
FROM auth.users
WHERE public.profiles.id = auth.users.id
AND public.profiles.email IS NULL;

-- Make email NOT NULL after backfilling
ALTER TABLE public.profiles
ALTER COLUMN email SET NOT NULL;

-- Add unique constraint (optional - if you want to enforce uniqueness)
-- ALTER TABLE public.profiles
-- ADD CONSTRAINT profiles_email_unique UNIQUE (email);

-- =====================================================
-- UPDATE TRIGGER TO SYNC EMAIL CHANGES
-- =====================================================

-- Function to sync email from auth.users to profiles
CREATE OR REPLACE FUNCTION public.sync_profile_email()
RETURNS TRIGGER AS $$
BEGIN
  UPDATE public.profiles
  SET email = NEW.email
  WHERE id = NEW.id;
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Trigger to sync email when it changes in auth.users
DROP TRIGGER IF EXISTS on_auth_user_email_changed ON auth.users;
CREATE TRIGGER on_auth_user_email_changed
  AFTER UPDATE OF email ON auth.users
  FOR EACH ROW
  WHEN (OLD.email IS DISTINCT FROM NEW.email)
  EXECUTE FUNCTION public.sync_profile_email();

-- =====================================================
-- COMMENTS
-- =====================================================

COMMENT ON COLUMN public.profiles.email IS 'User email (synced from auth.users for easier querying)';
