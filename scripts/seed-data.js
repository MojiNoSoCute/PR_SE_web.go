// Data seeder script for Thai University website
// Run with: npm run seed:data

import { createClient } from "@supabase/supabase-js";

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

// Sample data for seeding
const sampleData = {
  universityInfo: {
    name_thai: "มหาวิทยาลัยราชภัฏ",
    name_english: "Rajabhat University",
    department_thai: "สาขาวิชาวิศวกรรมซอฟต์แวร์",
    department_english: "Software Engineering Department",
    description:
      "คณะวิทยาศาสตร์และเทคโนโลยี มหาวิทยาลัยราชภัฏ โดยมุ่งเน้นการพัฒนาซอฟต์แวร์และเทคโนโลยีที่ทันสมัย",
  },

  faculty: [
    {
      name_thai: "ผศ.ดร.อุมนิษฐ์ ภักดีตระกูลวงศ์",
      name_english: "Assoc. Prof. Dr. Umnit Pakdeetrakoolwong",
      position: "Associate Professor",
      image_url: "/placeholder.svg?height=200&width=200",
      bio: "ผู้เชี่ยวชาญด้านวิศวกรรมซอฟต์แวร์และการพัฒนาระบบ",
      email: "umnit@university.ac.th",
    },
    {
      name_thai: "ผศ.ดร. วรเชษฐ์ อุกรา",
      name_english: "Assoc. Prof. Dr. Worachet Ukara",
      position: "Associate Professor",
      image_url: "/placeholder.svg?height=200&width=200",
      bio: "ผู้เชี่ยวชาญด้าน AI และ Machine Learning",
      email: "worachet@university.ac.th",
    },
    {
      name_thai: "ผศ.บุญผล สุวรรณวิจิตร",
      name_english: "Assoc. Prof. Boonpon Suwannavijit",
      position: "Associate Professor",
      image_url: "/placeholder.svg?height=200&width=200",
      bio: "ผู้เชี่ยวชาญด้านเครือข่ายและความปลอดภัยข้อมูล",
      email: "boonpon@university.ac.th",
    },
    {
      name_thai: "ผศ.สมเกียรติ ช่วยเหลือ",
      name_english: "Assoc. Prof. Somkiat Chuayluea",
      position: "Associate Professor",
      image_url: "/placeholder.svg?height=200&width=200",
      bio: "ผู้เชี่ยวชาญด้านการพัฒนาเว็บแอปพลิเคชัน",
      email: "somkiat@university.ac.th",
    },
    {
      name_thai: "อาจารย์ ดร.สุพิชญา จันทร์เรือง",
      name_english: "Dr. Supichaya Chanruang",
      position: "Lecturer",
      image_url: "/placeholder.svg?height=200&width=200",
      bio: "ผู้เชี่ยวชาญด้านการวิเคราะห์ข้อมูลและ Data Science",
      email: "supichaya@university.ac.th",
    },
  ],

  studentWorks: [
    {
      title: "ระบบจัดการห้องสมุดอัจฉริยะ",
      description:
        "ระบบจัดการห้องสมุดที่ใช้เทคโนโลยี AI ในการแนะนำหนังสือและจัดการทรัพยากร พัฒนาด้วย React และ Node.js",
      image_url:
        "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=800&h=400&fit=crop",
      category: "โครงงาน",
      keywords: "AI, Library Management, React, Node.js",
      read_time: 5,
    },
    {
      title: "แอปพลิเคชันเรียนรู้ภาษาไทยสำหรับชาวต่างชาติ",
      description:
        "แอปมือถือสำหรับการเรียนรู้ภาษาไทยพื้นฐาน ประกอบด้วยการออกเสียง บทสนทนา และเกมการเรียนรู้",
      image_url:
        "https://images.unsplash.com/photo-1522202176988-66273c2fd55f?w=800&h=400&fit=crop",
      category: "นักศึกษาดีเด่น",
      keywords: "Mobile App, Thai Language, Flutter, Education",
      read_time: 4,
    },
    {
      title: "ระบบตรวจสอบคุณภาพผลิตภัณฑ์ด้วย Computer Vision",
      description:
        "ระบบใช้เทคโนโลยี Computer Vision ในการตรวจสอบคุณภาพสินค้าในโรงงานอุตสาหกรรม",
      image_url:
        "https://images.unsplash.com/photo-1485827404703-89b55fcc595e?w=800&h=400&fit=crop",
      category: "งานวิจัย",
      keywords: "Computer Vision, Quality Control, Python, OpenCV",
      read_time: 6,
    },
    {
      title: "เว็บแอปพลิเคชันจัดการร้านอาหาร",
      description:
        "ระบบจัดการร้านอาหารออนไลน์ครบวงจร รองรับการสั่งอาหาร การชำระเงิน และการจัดส่ง",
      image_url:
        "https://images.unsplash.com/photo-1414235077428-338989a2e8c0?w=800&h=400&fit=crop",
      category: "โครงงาน",
      keywords: "Web Application, E-commerce, Next.js, PostgreSQL",
      read_time: 4,
    },
  ],

  publications: [
    {
      title:
        "Enhancing Line Chatbot Experiences: Utilizing Thai Question-Answering Systems to Enrich Dialogue with Unpredictable Questions",
      abstract:
        "การพัฒนาระบบตอบคำถามภาษาไทยสำหรับ Line Chatbot เพื่อเพิ่มประสิทธิภาพในการสนทนา โดยใช้เทคโนโลยี Natural Language Processing และ Machine Learning",
      authors: ["อ.ดร.วรเชษฐ์ อุกรา", "นายสมชาย ใจดี"],
      journal: "วารสาร Interdisciplinary Research Review",
      publication_date: "2024-05-23",
      keywords: "Chatbot, Thai Language, NLP, Machine Learning",
      category: "Computer Science",
    },
    {
      title:
        "Design Patterns to Enhance Security by Storing Passwords Encryption using Multiple Hashing Functions",
      abstract:
        "การออกแบบรูปแบบการเข้ารหัสรหัสผ่านด้วยฟังก์ชันแฮชหลายชั้นเพื่อเพิ่มความปลอดภัย",
      authors: [
        "นายลิขิต อรรฆสมิทธิ์",
        "นายสมเกียรติ ช่วยเหลือ",
        "ดร.วรเชษฐ์ อุกรา",
      ],
      journal: "KKU Science Journal",
      publication_date: "2024-05-23",
      keywords: "Security, Encryption, Hashing, Password Protection",
      category: "Information Security",
    },
    {
      title:
        "Implementation of Blockchain Technology in Educational Certificate Verification",
      abstract:
        "การประยุกต์ใช้เทคโนโลยี Blockchain ในการตรวจสอบประกาศนียบัตรทางการศึกษา",
      authors: ["ผศ.ดร.อุมนิษฐ์ ภักดีตระกูลวงศ์", "นางสาวสุดา เก่งเรียน"],
      journal: "Thai Journal of Computer Science",
      publication_date: "2024-03-15",
      keywords:
        "Blockchain, Education, Certificate Verification, Smart Contracts",
      category: "Blockchain Technology",
    },
  ],

  announcements: [
    {
      title: "สถานที่สำหรับการเรียนการสอน อาคาร A4 ห้องปฏิบัติการคอมพิวเตอร์",
      content:
        "ห้องปฏิบัติการคอมพิวเตอร์ใหม่ อาคาร A4 ชั้น 3 พร้อมให้บริการสำหรับการเรียนการสอน ประกอบด้วยคอมพิวเตอร์ทันสมัย จอแสดงผล 4K และซอฟต์แวร์สำหรับการพัฒนา",
      image_url:
        "https://images.unsplash.com/photo-1562774053-701939374585?w=800&h=400&fit=crop",
      category: "สถานที่",
      is_featured: true,
    },
    {
      title:
        "นักศึกษาดีเด่น นาย ปราโมทย์ อัศวรรณ ผู้เข้าร่วมการประกวด Code Combat 2024",
      content:
        "ขอแสดงความยินดีกับ นาย ปราโมทย์ อัศวรรณ นักศึกษาชั้นปีที่ 3 สาขาวิศวกรรมซอฟต์แวร์ ที่ได้รับรางวัลชนะเลิศอันดับ 1 ในการแข่งขัน Code Combat ระดับชาติ",
      image_url:
        "https://images.unsplash.com/photo-1521791136064-7986c2920216?w=800&h=400&fit=crop",
      category: "นักศึกษาดีเด่น",
      is_featured: false,
    },
    {
      title: "กิจกรรมเตรียมความพร้อม สาขาวิศวกรรมซอฟต์แวร์ ปีการศึกษา 2567",
      content:
        "กิจกรรมเตรียมความพร้อมสำหรับนักศึกษาใหม่ ประจำปีการศึกษา 2567 จัดขึ้นระหว่างวันที่ 15-17 มิถุนายน 2567 ณ หอประชุมมหาวิทยาลัย",
      image_url:
        "https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?w=800&h=400&fit=crop",
      category: "กิจกรรม",
      is_featured: false,
    },
    {
      title: "เปิดรับสมัครทุนการศึกษาสำหรับนักศึกษาดีเด่น ประจำปี 2567",
      content:
        "เปิดรับสมัครทุนการศึกษาสำหรับนักศึกษาที่มีผลการเรียนดีเยี่ยม ทุนละ 20,000 บาท จำนวน 5 ทุน สมัครได้ถึงวันที่ 30 กรกฎาคม 2567",
      image_url:
        "https://images.unsplash.com/photo-1627556704271-7c0cb0ee7df9?w=800&h=400&fit=crop",
      category: "ทุนการศึกษา",
      is_featured: true,
    },
  ],
};

async function seedDatabase() {
  if (!supabaseUrl || !supabaseServiceKey) {
    console.log(
      "📝 Environment variables not configured, creating sample data files..."
    );
    await createSampleDataFiles();
    return;
  }

  const supabase = createClient(supabaseUrl, supabaseServiceKey, {
    auth: {
      autoRefreshToken: false,
      persistSession: false,
    },
  });

  try {
    console.log("🌱 Starting database seeding...");

    // Seed university info
    console.log("🏫 Seeding university information...");
    const { error: uniError } = await supabase
      .from("university_info")
      .upsert([sampleData.universityInfo]);

    if (uniError) throw uniError;

    // Seed faculty
    console.log("👨‍🏫 Seeding faculty members...");
    const { error: facultyError } = await supabase
      .from("faculty")
      .upsert(sampleData.faculty);

    if (facultyError) throw facultyError;

    // Seed student works
    console.log("📚 Seeding student works...");
    const { error: worksError } = await supabase
      .from("student_works")
      .upsert(sampleData.studentWorks);

    if (worksError) throw worksError;

    // Seed publications
    console.log("📖 Seeding publications...");
    const { error: pubsError } = await supabase
      .from("publications")
      .upsert(sampleData.publications);

    if (pubsError) throw pubsError;

    // Seed announcements
    console.log("📢 Seeding announcements...");
    const { error: announcementError } = await supabase
      .from("announcements")
      .upsert(sampleData.announcements);

    if (announcementError) throw announcementError;

    console.log("✅ Database seeding completed successfully!");
    console.log("📊 Seeded data:");
    console.log(`   - University info: 1 record`);
    console.log(`   - Faculty members: ${sampleData.faculty.length} records`);
    console.log(
      `   - Student works: ${sampleData.studentWorks.length} records`
    );
    console.log(`   - Publications: ${sampleData.publications.length} records`);
    console.log(
      `   - Announcements: ${sampleData.announcements.length} records`
    );
  } catch (error) {
    console.error("❌ Error seeding database:", error.message);
    process.exit(1);
  }
}

async function createSampleDataFiles() {
  const fs = await import("fs");
  const path = await import("path");

  const dataDir = path.resolve(process.cwd(), "sample-data");

  // Create directory if it doesn't exist
  if (!fs.existsSync(dataDir)) {
    fs.mkdirSync(dataDir, { recursive: true });
  }

  // Write JSON files
  fs.writeFileSync(
    path.join(dataDir, "university-info.json"),
    JSON.stringify(sampleData.universityInfo, null, 2)
  );

  fs.writeFileSync(
    path.join(dataDir, "faculty.json"),
    JSON.stringify(sampleData.faculty, null, 2)
  );

  fs.writeFileSync(
    path.join(dataDir, "student-works.json"),
    JSON.stringify(sampleData.studentWorks, null, 2)
  );

  fs.writeFileSync(
    path.join(dataDir, "publications.json"),
    JSON.stringify(sampleData.publications, null, 2)
  );

  fs.writeFileSync(
    path.join(dataDir, "announcements.json"),
    JSON.stringify(sampleData.announcements, null, 2)
  );

  console.log("✅ Sample data files created in 'sample-data' directory:");
  console.log("   - university-info.json");
  console.log("   - faculty.json");
  console.log("   - student-works.json");
  console.log("   - publications.json");
  console.log("   - announcements.json");
  console.log("");
  console.log(
    "💡 These files can be imported into your database or used for development."
  );
}

// Run the seeder
seedDatabase();
