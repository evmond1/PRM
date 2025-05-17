/*
  # Allow Admin Role to Read All Profiles

  1. Security
    - Add RLS policy to allow users with the 'admin' role to read all rows in the `profiles` table.
*/

CREATE POLICY "Admins can view all profiles"
  ON profiles
  FOR SELECT
  TO authenticated
  USING (
    (SELECT role FROM public.profiles WHERE id = auth.uid()) = 'admin'
  );
