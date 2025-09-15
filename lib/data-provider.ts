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
      read_time: 5
    },
    {
      id: '2',
      title: 'แอปพลิเคชันเรียนรู้ภาษาไทยสำหรับชาวต่างชาติ',
      description: 'แอปมือถือสำหรับการเรียนรู้ภาษาไทยพื้นฐาน ประกอบด้วยการออกเสียง บทสนทนา และเกมการเรียนรู้',
      image_url: 'https://images.unsplash.com/photo-1522202176988-66273c2fd55f?w=800&h=400&fit=crop',
      category: 'นักศึกษาดีเด่น',
      keywords: 'Mobile App, Thai Language, Flutter, Education',
      read_time: 4
    },
    {
      id: '3',
      title: 'ระบบตรวจสอบคุณภาพผลิตภัณฑ์ด้วย Computer Vision',
      description: 'ระบบใช้เทคโนโลยี Computer Vision ในการตรวจสอบคุณภาพสินค้าในโรงงานอุตสาหกรรม',
      image_url: 'https://images.unsplash.com/photo-1485827404703-89b55fcc595e?w=800&h=400&fit=crop',
      category: 'งานวิจัย',
      keywords: 'Computer Vision, Quality Control, Python, OpenCV',
      read_time: 6
    }
  ],

  publications: [
    {
      id: '1',
      title: 'Enhancing Line Chatbot Experiences: Utilizing Thai Question-Answering Systems',
      abstract: 'การพัฒนาระบบตอบคำถามภาษาไทยสำหรับ Line Chatbot เพื่อเพิ่มประสิทธิภาพในการสนทนา',
      authors: ['อ.ดร.วรเชษฐ์ อุกรา'],
      journal: 'วารสาร Interdisciplinary Research Review',
      publication_date: '2024-05-23',
      keywords: 'Chatbot, Thai Language, NLP',
      category: 'Computer Science'
    },
    {
      id: '2',
      title: 'Design Patterns to Enhance Security by Storing Passwords Encryption',
      abstract: 'การออกแบบรูปแบบการเข้ารหัสรหัสผ่านด้วยฟังก์ชันแฮชหลายชั้น',
      authors: ['นายลิขิต อรรฆสมิทธิ์', 'นายสมเกียรติ ช่วยเหลือ'],
      journal: 'KKU Science Journal',
      publication_date: '2024-05-23',
      keywords: 'Security, Encryption, Hashing',
      category: 'Information Security'
    }
  ],

  announcements: [
    {
      id: '1',
      title: 'สถานที่สำหรับการเรียนการสอน อาคาร A4 ห้องปฏิบัติการคอมพิวเตอร์',
      content: 'ห้องปฏิบัติการคอมพิวเตอร์ใหม่ อาคาร A4 ชั้น 3 พร้อมให้บริการสำหรับการเรียนการสอน',
      image_url: 'https://images.unsplash.com/photo-1562774053-701939374585?w=800&h=400&fit=crop',
      category: 'สถานที่',
      is_featured: true,
      published_at: '2024-09-01'
    },
    {
      id: '2',
      title: 'นักศึกษาดีเด่น นาย ปราโมทย์ อัศวรรณ',
      content: 'ขอแสดงความยินดีกับ นาย ปราโมทย์ อัศวรรณ ที่ได้รับรางวัลชนะเลิศการแข่งขัน Code Combat',
      image_url: 'https://images.unsplash.com/photo-1521791136064-7986c2920216?w=800&h=400&fit=crop',
      category: 'นักศึกษาดีเด่น',
      is_featured: false,
      published_at: '2024-08-15'
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
    
    return limit ? sampleData.studentWorks.slice(0, limit) : sampleData.studentWorks
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
    
    return limit ? sampleData.publications.slice(0, limit) : sampleData.publications
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
    return limit ? data.slice(0, limit) : data
  }
}