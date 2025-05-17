/*
  # Enable RLS and add read policy for app_settings

  1. Security
    - Enable RLS on `app_settings` table
    - Add policy for anonymous users to read `app_settings` (idempotent check added)
  */

-- Enable RLS if not already enabled
ALTER TABLE app_settings ENABLE ROW LEVEL SECURITY;

-- Create policy only if it does not exist
DO $$
BEGIN
  -- Check if the policy exists
  IF NOT EXISTS (
    SELECT 1
    FROM pg_policy
    WHERE polname = 'Allow public read access to app_settings'
    AND polrelid = 'public.app_settings'::regclass
  ) THEN
    -- If it doesn't exist, create it
    CREATE POLICY "Allow public read access to app_settings"
      ON app_settings
      FOR SELECT
      TO anon
      USING (true);
  END IF;
END $$;
