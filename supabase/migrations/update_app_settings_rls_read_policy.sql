/*
  # Update app_settings RLS read policy

  1. Security
    - Drop the old read policy for `app_settings` (if it exists).
    - Add a new policy allowing *any authenticated user* to read `app_settings`.
    - The update policy requiring the 'admin' role remains unchanged.
  */

-- Drop the old read policy if it exists (based on name)
DO $$
BEGIN
  IF EXISTS (
    SELECT 1
    FROM pg_policy
    WHERE polname = 'Admins can read app settings'
    AND polrelid = 'public.app_settings'::regclass
  ) THEN
    DROP POLICY "Admins can read app settings" ON public.app_settings;
  END IF;
  -- Also drop the anonymous read policy if it exists from a previous attempt
  IF EXISTS (
    SELECT 1
    FROM pg_policy
    WHERE polname = 'Allow public read access to app_settings'
    AND polrelid = 'public.app_settings'::regclass
  ) THEN
    DROP POLICY "Allow public read access to app_settings" ON public.app_settings;
  END IF;
END $$;

-- Add a new policy allowing any authenticated user to read settings
-- Use DO block for idempotency
DO $$
BEGIN
  IF NOT EXISTS (
    SELECT 1
    FROM pg_policy
    WHERE polname = 'Authenticated users can read app settings'
    AND polrelid = 'public.app_settings'::regclass
  ) THEN
    CREATE POLICY "Authenticated users can read app settings"
      ON public.app_settings
      FOR SELECT
      TO authenticated
      USING (true); -- Allow select for any authenticated user
  END IF;
END $$;

-- Ensure the update policy for admins still exists (idempotent check)
DO $$
BEGIN
  IF NOT EXISTS (
    SELECT 1
    FROM pg_policy
    WHERE polname = 'Admins can update app settings'
    AND polrelid = 'public.app_settings'::regclass
  ) THEN
    CREATE POLICY "Admins can update app settings"
      ON public.app_settings
      FOR UPDATE
      TO authenticated
      USING (
        EXISTS (SELECT 1 FROM profiles WHERE id = auth.uid() AND role = 'admin')
      );
  END IF;
END $$;