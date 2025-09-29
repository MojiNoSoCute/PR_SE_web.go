// Data provider that works with both Supabase and mock data
import { createClient } from './supabase/client'

// Sample data for fallback
const sampleData = {
  universityInfo: {
    name_thai: 'มหาวิทยาลัยราชภัฏ',
    name_english: 'Rajabhat University',
    department_thai: 'สาขาวิชาวิศวกรรมซอฟต์แวร์',
    department_english: 'Software Engineering Department',
    description: 'คณะวิทยาศาสตร์และเทคโนโลยี มหาวิทยาลัยราชภัฏ โดยมุ่งเน้นการพัฒนาซอฟต์แวร์และเทคโนโลยีที่ทันสมัย'
  },
  
  faculty: [
    {
      id: '1',
      name_thai: 'ผศ.ดร.อุมนิษฐ์ ภักดีตระกูลวงศ์',
      name_english: 'Assoc. Prof. Dr. Umnit Pakdeetrakoolwong',
      position: 'Associate Professor',
      image_url: '/placeholder.svg?height=200&width=200',
      bio: 'ผู้เชี่ยวชาญด้านวิศวกรรมซอฟต์แวร์และการพัฒนาระบบ',
      email: 'umnit@university.ac.th'
    },
    {
      id: '2',
      name_thai: 'ผศ.ดร. วรเชษฐ์ อุกรา',
      name_english: 'Assoc. Prof. Dr. Worachet Ukara',
      position: 'Associate Professor', 
      image_url: '/placeholder.svg?height=200&width=200',
      bio: 'ผู้เชี่ยวชาญด้าน AI และ Machine Learning',
      email: 'worachet@university.ac.th'
    },
    {
      id: '3',
      name_thai: 'ผศ.บุญผล สุวรรณวิจิตร',
      name_english: 'Assoc. Prof. Boonpon Suwannavijit',
      position: 'Associate Professor',
      image_url: '/placeholder.svg?height=200&width=200',
      bio: 'ผู้เชี่ยวชาญด้านเครือข่ายและความปลอดภัยข้อมูล',
      email: 'boonpon@university.ac.th'
    },
    {
      id: '4',
      name_thai: 'ผศ.สมเกียรติ ช่วยเหลือ',
      name_english: 'Assoc. Prof. Somkiat Chuayluea',
      position: 'Associate Professor',
      image_url: '/placeholder.svg?height=200&width=200',
      bio: 'ผู้เชี่ยวชาญด้านการพัฒนาเว็บแอปพลิเคชัน',
      email: 'somkiat@university.ac.th'
    },
    {
      id: '5',
      name_thai: 'อาจารย์ ดร.สุพิชญา จันทร์เรือง',
      name_english: 'Dr. Supichaya Chanruang',
      position: 'Lecturer',
      image_url: '/placeholder.svg?height=200&width=200',
      bio: 'ผู้เชี่ยวชาญด้านการวิเคราะห์ข้อมูลและ Data Science',
      email: 'supichaya@university.ac.th'
    }
  ],

  studentWorks: [
    {
      id: '1',
      title: 'ระบบจัดการห้องสมุดอัจฉริยะ',
      description: 'ระบบจัดการห้องสมุดที่ใช้เทคโนโลยี AI ในการแนะนำหนังสือและจัดการทรัพยากร พัฒนาด้วย React และ Node.js',
      image_url: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=800&h=400&fit=crop',
      category: 'โครงงาน',
      keywords: 'AI, Library Management, React, Node.js',
      read_time: 5,
      created_at: '2024-08-15T10:30:00Z'
    },
    {
      id: '2',
      title: 'แอปพลิเคชันเรียนรู้ภาษาไทยสำหรับชาวต่างชาติ',
      description: 'แอปมือถือสำหรับการเรียนรู้ภาษาไทยพื้นฐาน ประกอบด้วยการออกเสียง บทสนทนา และเกมการเรียนรู้',
      image_url: 'https://images.unsplash.com/photo-1522202176988-66273c2fd55f?w=800&h=400&fit=crop',
      category: 'นักศึกษาดีเด่น',
      keywords: 'Mobile App, Thai Language, Flutter, Education',
      read_time: 4,
      created_at: '2024-08-10T14:20:00Z'
    },
    {
      id: '3',
      title: 'ระบบตรวจสอบคุณภาพผลิตภัณฑ์ด้วย Computer Vision',
      description: 'ระบบใช้เทคโนโลยี Computer Vision ในการตรวจสอบคุณภาพสินค้าในโรงงานอุตสาหกรรม',
      image_url: 'https://images.unsplash.com/photo-1485827404703-89b55fcc595e?w=800&h=400&fit=crop',
      category: 'งานวิจัย',
      keywords: 'Computer Vision, Quality Control, Python, OpenCV',
      read_time: 6,
      created_at: '2024-08-05T09:15:00Z'
    },
    {
      id: '4',
      title: 'เว็บแอปพลิเคชันจัดการร้านอาหาร',
      description: 'ระบบจัดการร้านอาหารออนไลน์ครบวงจร รองรับการสั่งอาหาร การชำระเงิน และการจัดส่ง',
      image_url: 'https://images.unsplash.com/photo-1414235077428-338989a2e8c0?w=800&h=400&fit=crop',
      category: 'โครงงาน',
      keywords: 'Web Application, E-commerce, Next.js, PostgreSQL',
      read_time: 4,
      created_at: '2024-07-20T11:45:00Z'
    }
  ],

  publications: [
    {
      id: '1',
      title: 'Enhancing Line Chatbot Experiences: Utilizing Thai Question-Answering Systems to Enrich Dialogue with Unpredictable Questions',
      abstract: 'การพัฒนาระบบตอบคำถามภาษาไทยสำหรับ Line Chatbot เพื่อเพิ่มประสิทธิภาพในการสนทนา โดยใช้เทคโนโลยี Natural Language Processing และ Machine Learning',
      authors: ['อ.ดร.วรเชษฐ์ อุกรา', 'นายสมชาย ใจดี'],
      journal: 'วารสาร Interdisciplinary Research Review',
      publication_date: '2024-05-23',
      keywords: 'Chatbot, Thai Language, NLP, Machine Learning',
      category: 'Computer Science',
      doi: '10.1234/ircr.2024.001',
      pdf_url: 'https://example.com/paper1.pdf'
    },
    {
      id: '2',
      title: 'Design Patterns to Enhance Security by Storing Passwords Encryption using Multiple Hashing Functions',
      abstract: 'การออกแบบรูปแบบการเข้ารหัสรหัสผ่านด้วยฟังก์ชันแฮชหลายชั้นเพื่อเพิ่มความปลอดภัย',
      authors: [
        'นายลิขิต อรรฆสมิทธิ์',
        'นายสมเกียรติ ช่วยเหลือ',
        'ดร.วรเชษฐ์ อุกรา'
      ],
      journal: 'KKU Science Journal',
      publication_date: '2024-05-23',
      keywords: 'Security, Encryption, Hashing, Password Protection',
      category: 'Information Security',
      doi: '10.1234/kkusc.2024.002',
      pdf_url: 'https://example.com/paper2.pdf'
    },
    {
      id: '3',
      title: 'Implementation of Blockchain Technology in Educational Certificate Verification',
      abstract: 'การประยุกต์ใช้เทคโนโลยี Blockchain ในการตรวจสอบประกาศนียบัตรทางการศึกษา',
      authors: ['ผศ.ดร.อุมนิษฐ์ ภักดีตระกูลวงศ์', 'นางสาวสุดา เก่งเรียน'],
      journal: 'Thai Journal of Computer Science',
      publication_date: '2024-03-15',
      keywords: 'Blockchain, Education, Certificate Verification, Smart Contracts',
      category: 'Blockchain Technology',
      doi: '10.1234/tjcs.2024.003',
      pdf_url: 'https://example.com/paper3.pdf'
    }
  ],

  announcements: [
    {
      id: '1',
      title: 'สถานที่สำหรับการเรียนการสอน อาคาร A4 ห้องปฏิบัติการคอมพิวเตอร์',
      content: 'ห้องปฏิบัติการคอมพิวเตอร์ใหม่ อาคาร A4 ชั้น 3 พร้อมให้บริการสำหรับการเรียนการสอน ประกอบด้วยคอมพิวเตอร์ทันสมัย จอแสดงผล 4K และซอฟต์แวร์สำหรับการพัฒนา',
      image_url: 'https://images.unsplash.com/photo-1562774053-701939374585?w=800&h=400&fit=crop',
      category: 'สถานที่',
      is_featured: true,
      published_at: '2024-09-01'
    },
    {
      id: '2',
      title: 'นักศึกษาดีเด่น นาย ปราโมทย์ อัศวรรณ ผู้เข้าร่วมการประกวด Code Combat 2024',
      content: 'ขอแสดงความยินดีกับ นาย ปราโมทย์ อัศวรรณ นักศึกษาชั้นปีที่ 3 สาขาวิศวกรรมซอฟต์แวร์ ที่ได้รับรางวัลชนะเลิศอันดับ 1 ในการแข่งขัน Code Combat ระดับชาติ',
      image_url: 'https://images.unsplash.com/photo-1521791136064-7986c2920216?w=800&h=400&fit=crop',
      category: 'นักศึกษาดีเด่น',
      is_featured: false,
      published_at: '2024-08-15'
    },
    {
      id: '3',
      title: 'กิจกรรมเตรียมความพร้อม สาขาวิศวกรรมซอฟต์แวร์ ปีการศึกษา 2567',
      content: 'กิจกรรมเตรียมความพร้อมสำหรับนักศึกษาใหม่ ประจำปีการศึกษา 2567 จัดขึ้นระหว่างวันที่ 15-17 มิถุนายน 2567 ณ หอประชุมมหาวิทยาลัย',
      image_url: 'https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?w=800&h=400&fit=crop',
      category: 'กิจกรรม',
      is_featured: false,
      published_at: '2024-06-01'
    },
    {
      id: '4',
      title: 'เปิดรับสมัครทุนการศึกษาสำหรับนักศึกษาดีเด่น ประจำปี 2567',
      content: 'เปิดรับสมัครทุนการศึกษาสำหรับนักศึกษาที่มีผลการเรียนดีเยี่ยม ทุนละ 20,000 บาท จำนวน 5 ทุน สมัครได้ถึงวันที่ 30 กรกฎาคม 2567',
      image_url: 'https://images.unsplash.com/photo-1627556704271-7c0cb0ee7df9?w=800&h=400&fit=crop',
      category: 'ทุนการศึกษา',
      is_featured: true,
      published_at: '2024-07-01'
    }
  ]
}

// Check if we have valid Supabase configuration
const hasValidSupabase = () => {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL
  const key = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
  return url && key && url.startsWith('https://') && key.length > 20
}

export const dataProvider = {
  async getUniversityInfo() {
    if (hasValidSupabase()) {
      try {
        const supabase = createClient()
        const { data, error } = await supabase
          .from('university_info')
          .select('*')
          .single()
        
        if (error) throw error
        return data
      } catch (error) {
        console.warn('Failed to fetch university info from Supabase, using sample data')
      }
    }
    
    return sampleData.universityInfo
  },

  async getFaculty(limit?: number) {
    if (hasValidSupabase()) {
      try {
        const supabase = createClient()
        let query = supabase.from('faculty').select('*')
        
        if (limit) {
          query = query.limit(limit)
        }
        
        const { data, error } = await query
        if (error) throw error
        return data || []
      } catch (error) {
        console.warn('Failed to fetch faculty from Supabase, using sample data')
      }
    }
    
    return limit ? sampleData.faculty.slice(0, limit) : sampleData.faculty
  },

  async getFacultyById(id: string) {
    if (hasValidSupabase()) {
      try {
        const supabase = createClient()
        const { data, error } = await supabase.from('faculty').select('*').eq('id', id).single()
        
        if (error) throw error
        return data
      } catch (error) {
        console.warn('Failed to fetch faculty by id from Supabase, using sample data')
      }
    }
    
    // Find faculty by id in sample data
    return sampleData.faculty.find((faculty: any) => faculty.id === id)
  },

  async getPublicationsByAuthor(authorName: string) {
    if (hasValidSupabase()) {
      try {
        const supabase = createClient()
        const { data, error } = await supabase
          .from('publications')
          .select('*')
          .contains('authors', [authorName])
          .order('publication_date', { ascending: false })
        
        if (error) throw error
        return data || []
      } catch (error) {
        console.warn('Failed to fetch publications by author from Supabase, using sample data')
      }
    }
    
    // Filter publications by author in sample data
    return sampleData.publications.filter((pub: any) => 
      pub.authors && pub.authors.includes(authorName)
    )
  },

  async getStudentWorks(limit?: number) {
    if (hasValidSupabase()) {
      try {
        const supabase = createClient()
        let query = supabase
          .from('student_works')
          .select('*')
          .order('created_at', { ascending: false })
        
        if (limit) {
          query = query.limit(limit)
        }
        
        const { data, error } = await query
        if (error) throw error
        return data || []
      } catch (error) {
        console.warn('Failed to fetch student works from Supabase, using sample data')
      }
    }
    
    // Add created_at field to sample data if missing
    const worksWithDates = sampleData.studentWorks.map(work => ({
      ...work,
      created_at: work.created_at || new Date().toISOString()
    }))
    
    // Sort by created_at descending
    worksWithDates.sort((a, b) => new Date(b.created_at).getTime() - new Date(a.created_at).getTime())
    
    return limit ? worksWithDates.slice(0, limit) : worksWithDates
  },

  async getPublications(limit?: number) {
    if (hasValidSupabase()) {
      try {
        const supabase = createClient()
        let query = supabase
          .from('publications')
          .select('*')
          .order('publication_date', { ascending: false })
        
        if (limit) {
          query = query.limit(limit)
        }
        
        const { data, error } = await query
        if (error) throw error
        return data || []
      } catch (error) {
        console.warn('Failed to fetch publications from Supabase, using sample data')
      }
    }
    
    // Add publication_date field to sample data if missing
    const publicationsWithDates = sampleData.publications.map(pub => ({
      ...pub,
      publication_date: pub.publication_date || new Date().toISOString()
    }))
    
    // Sort by publication_date descending
    publicationsWithDates.sort((a, b) => new Date(b.publication_date).getTime() - new Date(a.publication_date).getTime())
    
    return limit ? publicationsWithDates.slice(0, limit) : publicationsWithDates
  },

  async getAnnouncements(limit?: number, featured?: boolean) {
    if (hasValidSupabase()) {
      try {
        const supabase = createClient()
        let query = supabase
          .from('announcements')
          .select('*')
          .order('published_at', { ascending: false })
        
        if (featured !== undefined) {
          query = query.eq('is_featured', featured)
        }
        
        if (limit) {
          query = query.limit(limit)
        }
        
        const { data, error } = await query
        if (error) throw error
        return data || []
      } catch (error) {
        console.warn('Failed to fetch announcements from Supabase, using sample data')
      }
    }
    
    let data = sampleData.announcements
    if (featured !== undefined) {
      data = data.filter(item => item.is_featured === featured)
    }
    
    // Add published_at field to sample data if missing
    const announcementsWithDates = data.map(announcement => ({
      ...announcement,
      published_at: announcement.published_at || new Date().toISOString()
    }))
    
    // Sort by published_at descending
    announcementsWithDates.sort((a, b) => new Date(b.published_at).getTime() - new Date(a.published_at).getTime())
    
    return limit ? announcementsWithDates.slice(0, limit) : announcementsWithDates
  }
}