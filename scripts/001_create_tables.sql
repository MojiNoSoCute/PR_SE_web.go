-- Create tables for Thai University Software Engineering Department Website

-- Student works/projects table
CREATE TABLE IF NOT EXISTS student_works (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  title TEXT NOT NULL,
  description TEXT,
  image_url TEXT,
  category TEXT,
  keywords TEXT,
  read_time INTEGER DEFAULT 3,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Faculty profiles table
CREATE TABLE IF NOT EXISTS faculty (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name_thai TEXT NOT NULL,
  name_english TEXT,
  position TEXT,
  department TEXT DEFAULT 'Software Engineering',
  image_url TEXT,
  bio TEXT,
  email TEXT,
  phone TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Research publications table
CREATE TABLE IF NOT EXISTS publications (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  title TEXT NOT NULL,
  abstract TEXT,
  authors TEXT[],
  journal TEXT,
  publication_date DATE,
  doi TEXT,
  pdf_url TEXT,
  keywords TEXT,
  category TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- News and announcements table
CREATE TABLE IF NOT EXISTS announcements (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  title TEXT NOT NULL,
  content TEXT,
  image_url TEXT,
  category TEXT,
  is_featured BOOLEAN DEFAULT FALSE,
  published_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- University information table
CREATE TABLE IF NOT EXISTS university_info (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name_thai TEXT NOT NULL,
  name_english TEXT,
  department_thai TEXT,
  department_english TEXT,
  logo_url TEXT,
  banner_url TEXT,
  description TEXT,
  address TEXT,
  phone TEXT,
  email TEXT,
  website TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Enable Row Level Security (RLS) for public read access
ALTER TABLE student_works ENABLE ROW LEVEL SECURITY;
ALTER TABLE faculty ENABLE ROW LEVEL SECURITY;
ALTER TABLE publications ENABLE ROW LEVEL SECURITY;
ALTER TABLE announcements ENABLE ROW LEVEL SECURITY;
ALTER TABLE university_info ENABLE ROW LEVEL SECURITY;

-- Create policies for public read access (no authentication required for viewing)
CREATE POLICY "Allow public read access to student_works" ON student_works FOR SELECT USING (true);
CREATE POLICY "Allow public read access to faculty" ON faculty FOR SELECT USING (true);
CREATE POLICY "Allow public read access to publications" ON publications FOR SELECT USING (true);
CREATE POLICY "Allow public read access to announcements" ON announcements FOR SELECT USING (true);
CREATE POLICY "Allow public read access to university_info" ON university_info FOR SELECT USING (true);

-- Admin policies (for authenticated users with admin role - will be implemented later)
-- For now, we'll allow insert/update/delete for authenticated users
CREATE POLICY "Allow authenticated insert to student_works" ON student_works FOR INSERT WITH CHECK (auth.uid() IS NOT NULL);
CREATE POLICY "Allow authenticated update to student_works" ON student_works FOR UPDATE USING (auth.uid() IS NOT NULL);
CREATE POLICY "Allow authenticated delete to student_works" ON student_works FOR DELETE USING (auth.uid() IS NOT NULL);

CREATE POLICY "Allow authenticated insert to faculty" ON faculty FOR INSERT WITH CHECK (auth.uid() IS NOT NULL);
CREATE POLICY "Allow authenticated update to faculty" ON faculty FOR UPDATE USING (auth.uid() IS NOT NULL);
CREATE POLICY "Allow authenticated delete to faculty" ON faculty FOR DELETE USING (auth.uid() IS NOT NULL);

CREATE POLICY "Allow authenticated insert to publications" ON publications FOR INSERT WITH CHECK (auth.uid() IS NOT NULL);
CREATE POLICY "Allow authenticated update to publications" ON publications FOR UPDATE USING (auth.uid() IS NOT NULL);
CREATE POLICY "Allow authenticated delete to publications" ON publications FOR DELETE USING (auth.uid() IS NOT NULL);

CREATE POLICY "Allow authenticated insert to announcements" ON announcements FOR INSERT WITH CHECK (auth.uid() IS NOT NULL);
CREATE POLICY "Allow authenticated update to announcements" ON announcements FOR UPDATE USING (auth.uid() IS NOT NULL);
CREATE POLICY "Allow authenticated delete to announcements" ON announcements FOR DELETE USING (auth.uid() IS NOT NULL);

CREATE POLICY "Allow authenticated insert to university_info" ON university_info FOR INSERT WITH CHECK (auth.uid() IS NOT NULL);
CREATE POLICY "Allow authenticated update to university_info" ON university_info FOR UPDATE USING (auth.uid() IS NOT NULL);
CREATE POLICY "Allow authenticated delete to university_info" ON university_info FOR DELETE USING (auth.uid() IS NOT NULL);
