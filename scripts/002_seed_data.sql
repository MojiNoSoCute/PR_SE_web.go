-- Seed data for Thai University Software Engineering Department Website

-- Insert university information
INSERT INTO university_info (
  name_thai,
  name_english,
  department_thai,
  department_english,
  description
) VALUES (
  'มหาวิทยาลัยราชภัฏ',
  'Rajabhat University',
  'สาขาวิชาวิศวกรรมซอฟต์แวร์',
  'Software Engineering Department',
  'คณะวิทยาศาสตร์และเทคโนโลยี มหาวิทยาลัยราชภัฏ'
);

-- Insert faculty members
INSERT INTO faculty (name_thai, name_english, position, image_url) VALUES
('ผศ.ดร.อุมนิษฐ์ ภักดีตระกูลวงศ์', 'Assoc. Prof. Dr. Umnit Pakdeetrakoolwong', 'Associate Professor', '/placeholder.svg?height=200&width=200'),
('ผศ.ดร. วรเชษฐ์ อุกรา', 'Assoc. Prof. Dr. Worachet Ukara', 'Associate Professor', '/placeholder.svg?height=200&width=200'),
('ผศ.บุญผล สุวรรณวิจิตร', 'Assoc. Prof. Boonpon Suwannavijit', 'Associate Professor', '/placeholder.svg?height=200&width=200'),
('ผศ.สมเกียรติ ช่วยเหลือ', 'Assoc. Prof. Somkiat Chuayluea', 'Associate Professor', '/placeholder.svg?height=200&width=200'),
('อาจารย์ ดร.สุพิชญา จันทร์เรือง', 'Dr. Supichaya Chanruang', 'Lecturer', '/placeholder.svg?height=200&width=200');

-- Insert student works
INSERT INTO student_works (title, description, image_url, category, keywords, read_time) VALUES
('Lorem Ipsum : AI is a simply dummy', 'Welcome to Burger Bliss, where we take your cravings to a whole new level! . summary', 'https://hebbkx1anhila5yf.public.blob.vercel-storage.com/8-Mr0QNzE06E2g37yF1KBtPK9KYnSOGF.png', 'นักศึกษาดีเด่น', 'AI, Technology, Innovation', 3),
('Lorem Ipsum : AI is a simply dummy', 'Welcome to Burger Bliss, where we take your cravings to a whole new level! . summary', 'https://hebbkx1anhila5yf.public.blob.vercel-storage.com/8-Mr0QNzE06E2g37yF1KBtPK9KYnSOGF.png', 'โครงงาน', 'Software, Development', 3),
('Lorem Ipsum : AI is a simply dummy', 'Welcome to Burger Bliss, where we take your cravings to a whole new level! . summary', 'https://hebbkx1anhila5yf.public.blob.vercel-storage.com/8-Mr0QNzE06E2g37yF1KBtPK9KYnSOGF.png', 'งานวิจัย', 'Research, Academic', 3);

-- Insert research publications
INSERT INTO publications (
  title,
  abstract,
  authors,
  journal,
  publication_date,
  keywords,
  category
) VALUES
(
  'Enhancing Line Chatbot Experiences: Utilizing Thai Question-Answering Systems to Enrich Dialogue with Unpredictable Questions',
  'การพัฒนาระบบตอบคำถามภาษาไทยสำหรับ Line Chatbot เพื่อเพิ่มประสิทธิภาพในการสนทนา',
  ARRAY['อ.ดร.วรเชษฐ์ อุกรา'],
  'วารสาร Interdisciplinary Research Review',
  '2024-05-23',
  'Chatbot, Thai Language, NLP',
  'Computer Science'
),
(
  'Design Patterns to Enhance Security by Storing Passwords Encryption using Multiple Hashing Functions',
  'การออกแบบรูปแบบการเข้ารหัสรหัสผ่านด้วยฟังก์ชันแฮชหลายชั้น',
  ARRAY['นายลิขิต อรรฆสมิทธิ์', 'นายสมเกียรติ ช่วยเหลือ', 'ดร.วรเชษฐ์ อุกรา'],
  'KKU Science Journal',
  '2024-05-23',
  'Security, Encryption, Hashing',
  'Information Security'
);

-- Insert announcements
INSERT INTO announcements (title, content, image_url, category, is_featured) VALUES
('สถานที่สำหรับการเรียนการสอน', 'Welcome to Burger Bliss, where we take your cravings to a whole new level! . summary', 'https://hebbkx1anhila5yf.public.blob.vercel-storage.com/3-nwEdfdPe6Z3faBzq7RMlQeDrsBDe5W.png', 'อาคารA4', true),
('นักศึกษาดีเด่น นาย ปราโมทย์ อัศวรรณ ผู้เข้าร่วมการประกวด ดาว - เดือน', 'Welcome to Burger Bliss, where we take your cravings to a whole new level! . summary', 'https://hebbkx1anhila5yf.public.blob.vercel-storage.com/3-nwEdfdPe6Z3faBzq7RMlQeDrsBDe5W.png', 'นักศึกษาดีเด่น', false),
('กิจกรรมเตรียมความพร้อม สาขาวิศวกรรมซอฟต์แวร์', 'Welcome to Burger Bliss, where we take your cravings to a whole new level! . summary', 'https://hebbkx1anhila5yf.public.blob.vercel-storage.com/3-nwEdfdPe6Z3faBzq7RMlQeDrsBDe5W.png', 'กิจกรรม', false);
