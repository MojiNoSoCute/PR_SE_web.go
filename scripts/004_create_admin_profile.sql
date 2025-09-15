-- Create admin profile table to track admin users
CREATE TABLE IF NOT EXISTS admin_profiles (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
  email TEXT NOT NULL,
  full_name TEXT,
  role TEXT DEFAULT 'admin',
  is_active BOOLEAN DEFAULT TRUE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  UNIQUE(user_id),
  UNIQUE(email)
);

-- Enable RLS for admin profiles
ALTER TABLE admin_profiles ENABLE ROW LEVEL SECURITY;

-- Create policies for admin profiles
CREATE POLICY "Allow authenticated users to read admin profiles" ON admin_profiles FOR SELECT USING (auth.uid() IS NOT NULL);
CREATE POLICY "Allow admin users to manage admin profiles" ON admin_profiles FOR ALL USING (
  EXISTS (
    SELECT 1 FROM admin_profiles 
    WHERE user_id = auth.uid() AND is_active = TRUE
  )
);

-- Function to check if user is admin
CREATE OR REPLACE FUNCTION is_admin(user_uuid UUID)
RETURNS BOOLEAN AS $$
BEGIN
  RETURN EXISTS (
    SELECT 1 FROM admin_profiles 
    WHERE user_id = user_uuid AND is_active = TRUE
  );
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Update existing policies to use admin check
DROP POLICY IF EXISTS "Allow authenticated insert to student_works" ON student_works;
DROP POLICY IF EXISTS "Allow authenticated update to student_works" ON student_works;
DROP POLICY IF EXISTS "Allow authenticated delete to student_works" ON student_works;

CREATE POLICY "Allow admin insert to student_works" ON student_works FOR INSERT WITH CHECK (is_admin(auth.uid()));
CREATE POLICY "Allow admin update to student_works" ON student_works FOR UPDATE USING (is_admin(auth.uid()));
CREATE POLICY "Allow admin delete to student_works" ON student_works FOR DELETE USING (is_admin(auth.uid()));

-- Apply same pattern to other tables
DROP POLICY IF EXISTS "Allow authenticated insert to faculty" ON faculty;
DROP POLICY IF EXISTS "Allow authenticated update to faculty" ON faculty;
DROP POLICY IF EXISTS "Allow authenticated delete to faculty" ON faculty;

CREATE POLICY "Allow admin insert to faculty" ON faculty FOR INSERT WITH CHECK (is_admin(auth.uid()));
CREATE POLICY "Allow admin update to faculty" ON faculty FOR UPDATE USING (is_admin(auth.uid()));
CREATE POLICY "Allow admin delete to faculty" ON faculty FOR DELETE USING (is_admin(auth.uid()));

DROP POLICY IF EXISTS "Allow authenticated insert to publications" ON publications;
DROP POLICY IF EXISTS "Allow authenticated update to publications" ON publications;
DROP POLICY IF EXISTS "Allow authenticated delete to publications" ON publications;

CREATE POLICY "Allow admin insert to publications" ON publications FOR INSERT WITH CHECK (is_admin(auth.uid()));
CREATE POLICY "Allow admin update to publications" ON publications FOR UPDATE USING (is_admin(auth.uid()));
CREATE POLICY "Allow admin delete to publications" ON publications FOR DELETE USING (is_admin(auth.uid()));

DROP POLICY IF EXISTS "Allow authenticated insert to announcements" ON announcements;
DROP POLICY IF EXISTS "Allow authenticated update to announcements" ON announcements;
DROP POLICY IF EXISTS "Allow authenticated delete to announcements" ON announcements;

CREATE POLICY "Allow admin insert to announcements" ON announcements FOR INSERT WITH CHECK (is_admin(auth.uid()));
CREATE POLICY "Allow admin update to announcements" ON announcements FOR UPDATE USING (is_admin(auth.uid()));
CREATE POLICY "Allow admin delete to announcements" ON announcements FOR DELETE USING (is_admin(auth.uid()));

DROP POLICY IF EXISTS "Allow authenticated insert to university_info" ON university_info;
DROP POLICY IF EXISTS "Allow authenticated update to university_info" ON university_info;
DROP POLICY IF EXISTS "Allow authenticated delete to university_info" ON university_info;

CREATE POLICY "Allow admin insert to university_info" ON university_info FOR INSERT WITH CHECK (is_admin(auth.uid()));
CREATE POLICY "Allow admin update to university_info" ON university_info FOR UPDATE USING (is_admin(auth.uid()));
CREATE POLICY "Allow admin delete to university_info" ON university_info FOR DELETE USING (is_admin(auth.uid()));
