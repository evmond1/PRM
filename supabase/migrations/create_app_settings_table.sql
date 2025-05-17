/*
      # Create app_settings table and RLS policies

      1. New Tables
        - `app_settings`
          - `id` (uuid, primary key, default gen_random_uuid())
          - `app_name` (text, default 'My App')
          - `logo_url` (text, default null)
          - `created_at` (timestamptz, default now())
          - `updated_at` (timestamptz, default now())
      2. Security
        - Enable RLS on `app_settings` table
        - Add policy for authenticated users (specifically admins) to read settings
        - Add policy for authenticated users (specifically admins) to update settings
      3. Notes
        - This table is expected to have only one row containing the global app settings.
    */

    -- Create the app_settings table if it doesn't exist
    CREATE TABLE IF NOT EXISTS app_settings (
      id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
      app_name text NOT NULL DEFAULT 'My App',
      logo_url text NULL,
      created_at timestamptz DEFAULT now(),
      updated_at timestamptz DEFAULT now()
    );

    -- Enable Row Level Security
    ALTER TABLE app_settings ENABLE ROW LEVEL SECURITY;

    -- Policy to allow admins to read settings
    CREATE POLICY "Admins can read app settings"
      ON app_settings
      FOR SELECT
      TO authenticated
      USING (
        EXISTS (SELECT 1 FROM profiles WHERE id = auth.uid() AND role = 'admin')
      );

    -- Policy to allow admins to update settings
    CREATE POLICY "Admins can update app settings"
      ON app_settings
      FOR UPDATE
      TO authenticated
      USING (
        EXISTS (SELECT 1 FROM profiles WHERE id = auth.uid() AND role = 'admin')
      );

    -- Optional: Insert a default row if the table is empty
    -- This ensures there's always a settings row to fetch/update
    DO $$
    BEGIN
      IF NOT EXISTS (SELECT 1 FROM app_settings) THEN
        INSERT INTO app_settings (app_name) VALUES ('My App');
      END IF;
    END $$;
