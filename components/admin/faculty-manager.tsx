"use client"

import { useState, useEffect } from "react"
import { Edit, Trash2, Plus, Search, Mail, Phone } from "lucide-react"

interface FacultyMember {
  id: string
  name_thai: string
  name_english?: string
  position?: string
  department?: string
  bio?: string
  email?: string
  phone?: string
  expertise?: string[]
  created_at?: string
  updated_at?: string
}

// Mock data for initial load
const initialFaculty: FacultyMember[] = [
  {
    id: "1",
    name_thai: "ผศ.ดร.สมชาย ใจดี",
    name_english: "Assoc.Prof.Dr.Somchai Jaidee",
    position: "รองศาสตราจารย์",
    department: "วิศวกรรมซอฟต์แวร์",
    bio: "ผู้เชี่ยวชาญด้านการพัฒนาซอฟต์แวร์และการจัดการโครงการ มีประสบการณ์ในการสอนและวิจัยมากว่า 15 ปี",
    email: "somchai.j@university.ac.th",
    phone: "02-123-4567",
    expertise: ["Software Engineering", "Project Management", "Agile Development"],
    created_at: "2024-01-15T10:00:00Z",
    updated_at: "2024-01-15T10:00:00Z"
  },
  {
    id: "2",
    name_thai: "อ.ดร.สมหญิง รักเรียน",
    name_english: "Dr.Somying Rakrian",
    position: "อาจารย์",
    department: "วิศวกรรมซอฟต์แวร์",
    bio: "ผู้เชี่ยวชาญด้านปัญญาประดิษฐ์และการเรียนรู้ของเครื่อง มีผลงานวิจัยที่ได้รับการยอมรับในระดับนานาชาติ",
    email: "somying.r@university.ac.th",
    phone: "02-234-5678",
    expertise: ["Artificial Intelligence", "Machine Learning", "Data Science"],
    created_at: "2024-01-10T14:30:00Z",
    updated_at: "2024-01-10T14:30:00Z"
  },
  {
    id: "3",
    name_thai: "ผศ.วิชัย เก่งเขียน",
    name_english: "Assoc.Prof.Wichai Kengkian",
    position: "ผู้ช่วยศาสตราจารย์",
    department: "วิศวกรรมซอฟต์แวร์",
    bio: "ผู้เชี่ยวชาญด้านการพัฒนาเว็บแอปพลิเคชันและฐานข้อมูล มีประสบการณ์ในอุตสาหกรรมเทคโนโลยีมากว่า 20 ปี",
    email: "wichai.k@university.ac.th",
    phone: "02-345-6789",
    expertise: ["Web Development", "Database Systems", "Cloud Computing"],
    created_at: "2024-01-05T09:15:00Z",
    updated_at: "2024-01-05T09:15:00Z"
  }
]

export function FacultyManager() {
  const [faculty, setFaculty] = useState<FacultyMember[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [showForm, setShowForm] = useState(false)
  const [editingMember, setEditingMember] = useState<FacultyMember | null>(null)
  const [searchTerm, setSearchTerm] = useState("")
  const [formData, setFormData] = useState({
    name_thai: "",
    name_english: "",
    position: "",
    department: "วิศวกรรมซอฟต์แวร์",
    bio: "",
    email: "",
    phone: "",
    expertise: ""
  })

  useEffect(() => {
    loadFaculty()
  }, [])

  const loadFaculty = () => {
    try {
      const stored = localStorage.getItem('admin_faculty')
      if (stored) {
        setFaculty(JSON.parse(stored))
      } else {
        // Initialize with mock data
        localStorage.setItem('admin_faculty', JSON.stringify(initialFaculty))
        setFaculty(initialFaculty)
      }
    } catch (error) {
      console.error("Error loading faculty:", error)
      setFaculty(initialFaculty)
    } finally {
      setIsLoading(false)
    }
  }

  const saveFaculty = (updatedFaculty: FacultyMember[]) => {
    try {
      localStorage.setItem('admin_faculty', JSON.stringify(updatedFaculty))
      setFaculty(updatedFaculty)
    } catch (error) {
      console.error("Error saving faculty:", error)
    }
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    
    const expertiseArray = formData.expertise 
      ? formData.expertise.split(',').map(item => item.trim()).filter(Boolean)
      : []
    
    const currentTime = new Date().toISOString()
    
    if (editingMember) {
      const updatedFaculty = faculty.map(member =>
        member.id === editingMember.id
          ? {
              ...member,
              ...formData,
              expertise: expertiseArray,
              updated_at: currentTime
            }
          : member
      )
      saveFaculty(updatedFaculty)
    } else {
      const newMember: FacultyMember = {
        id: Date.now().toString(),
        ...formData,
        expertise: expertiseArray,
        created_at: currentTime,
        updated_at: currentTime
      }
      saveFaculty([newMember, ...faculty])
    }
    resetForm()
  }

  const handleEdit = (member: FacultyMember) => {
    setEditingMember(member)
    setFormData({
      name_thai: member.name_thai,
      name_english: member.name_english || "",
      position: member.position || "",
      department: member.department || "วิศวกรรมซอฟต์แวร์",
      bio: member.bio || "",
      email: member.email || "",
      phone: member.phone || "",
      expertise: member.expertise ? member.expertise.join(', ') : ""
    })
    setShowForm(true)
  }

  const handleDelete = (id: string) => {
    if (confirm("คุณแน่ใจหรือไม่ที่จะลบข้อมูลอาจารย์ท่านนี้?")) {
      const updatedFaculty = faculty.filter(member => member.id !== id)
      saveFaculty(updatedFaculty)
    }
  }

  const resetForm = () => {
    setFormData({
      name_thai: "",
      name_english: "",
      position: "",
      department: "วิศวกรรมซอฟต์แวร์",
      bio: "",
      email: "",
      phone: "",
      expertise: ""
    })
    setEditingMember(null)
    setShowForm(false)
  }

  const filteredFaculty = faculty.filter(
    (member) =>
      member.name_thai.toLowerCase().includes(searchTerm.toLowerCase()) ||
      (member.name_english && member.name_english.toLowerCase().includes(searchTerm.toLowerCase())) ||
      (member.position && member.position.toLowerCase().includes(searchTerm.toLowerCase()))
  )

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold">จัดการข้อมูลอาจารย์</h2>
        <button onClick={() => setShowForm(true)} className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-md flex items-center gap-2">
          <Plus className="h-4 w-4" />
          เพิ่มอาจารย์ใหม่
        </button>
      </div>

      {/* Search */}
      <div className="flex items-center gap-2">
        <Search className="h-4 w-4 text-gray-500" />
        <input
          placeholder="ค้นหาอาจารย์..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="max-w-sm px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-red-500"
        />
      </div>

      {/* Form */}
      {showForm && (
        <div className="bg-white rounded-lg border border-gray-200 shadow-sm">
          <div className="p-6 border-b border-gray-200">
            <h3 className="text-lg font-semibold">{editingMember ? "แก้ไขข้อมูลอาจารย์" : "เพิ่มอาจารย์ใหม่"}</h3>
          </div>
          <div className="p-6">
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label htmlFor="name_thai" className="block text-sm font-medium text-gray-700 mb-1">ชื่อ-นามสกุล (ไทย)</label>
                  <input
                    id="name_thai"
                    type="text"
                    value={formData.name_thai}
                    onChange={(e) => setFormData({ ...formData, name_thai: e.target.value })}
                    required
                    placeholder="รศ.ดร.สมชาย ใจดี"
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-red-500"
                  />
                </div>
                <div>
                  <label htmlFor="name_english" className="block text-sm font-medium text-gray-700 mb-1">ชื่อ-นามสกุล (อังกฤษ)</label>
                  <input
                    id="name_english"
                    type="text"
                    value={formData.name_english}
                    onChange={(e) => setFormData({ ...formData, name_english: e.target.value })}
                    placeholder="Dr.Somchai Jaidee"
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-red-500"
                  />
                </div>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label htmlFor="position" className="block text-sm font-medium text-gray-700 mb-1">ตำแหน่ง</label>
                  <input
                    id="position"
                    type="text"
                    value={formData.position}
                    onChange={(e) => setFormData({ ...formData, position: e.target.value })}
                    placeholder="รองศาสตราจารย์, อาจารย์"
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-red-500"
                  />
                </div>
                <div>
                  <label htmlFor="department" className="block text-sm font-medium text-gray-700 mb-1">ภาควิชา</label>
                  <input
                    id="department"
                    type="text"
                    value={formData.department}
                    onChange={(e) => setFormData({ ...formData, department: e.target.value })}
                    placeholder="วิศวกรรมซอฟต์แวร์"
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-red-500"
                  />
                </div>
              </div>
              <div>
                <label htmlFor="bio" className="block text-sm font-medium text-gray-700 mb-1">ประวัติและความเชี่ยวชาญ</label>
                <textarea
                  id="bio"
                  value={formData.bio}
                  onChange={(e) => setFormData({ ...formData, bio: e.target.value })}
                  rows={3}
                  placeholder="ประวัติการศึกษา ความเชี่ยวชาญ และผลงานวิจัย"
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-red-500"
                />
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">อีเมล</label>
                  <input
                    id="email"
                    type="email"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    placeholder="example@university.ac.th"
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-red-500"
                  />
                </div>
                <div>
                  <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-1">เบอร์โทรศัพท์</label>
                  <input
                    id="phone"
                    type="tel"
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    placeholder="02-123-4567"
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-red-500"
                  />
                </div>
              </div>
              <div>
                <label htmlFor="expertise" className="block text-sm font-medium text-gray-700 mb-1">ความเชี่ยวชาญ (คั่นด้วยจุลภาค)</label>
                <input
                  id="expertise"
                  type="text"
                  value={formData.expertise}
                  onChange={(e) => setFormData({ ...formData, expertise: e.target.value })}
                  placeholder="Software Engineering, AI, Database"
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-red-500"
                />
              </div>
              <div className="flex gap-2">
                <button type="submit" className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-md">
                  {editingMember ? "อัปเดต" : "เพิ่ม"}
                </button>
                <button type="button" onClick={resetForm} className="border border-gray-300 hover:bg-gray-50 text-gray-700 px-4 py-2 rounded-md">
                  ยกเลิก
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Faculty List */}
      <div className="grid gap-4">
        {isLoading ? (
          <div className="text-center py-8 text-gray-500">กำลังโหลด...</div>
        ) : (
          filteredFaculty.map((member) => (
            <div key={member.id} className="bg-white rounded-lg border border-gray-200 shadow-sm">
              <div className="p-6">
                <div className="flex justify-between items-start">
                  <div className="flex-1">
                    <h3 className="font-semibold text-lg mb-1 text-gray-900">{member.name_thai}</h3>
                    {member.name_english && <p className="text-gray-600 mb-2">{member.name_english}</p>}
                    <p className="text-sm font-medium text-red-600 mb-2">{member.position}</p>
                    <p className="text-sm text-gray-500 mb-2">{member.department}</p>
                    {member.bio && <p className="text-gray-600 mb-3 line-clamp-2">{member.bio}</p>}
                    {member.expertise && member.expertise.length > 0 && (
                      <div className="flex flex-wrap gap-1 mb-2">
                        {member.expertise.map((skill, index) => (
                          <span key={index} className="inline-flex items-center px-2 py-1 rounded-md text-xs bg-red-50 text-red-700 border border-red-200">
                            {skill}
                          </span>
                        ))}
                      </div>
                    )}
                    <div className="text-sm text-gray-500 flex gap-4">
                      {member.email && (
                        <div className="flex items-center gap-1">
                          <Mail className="h-3 w-3" />
                          {member.email}
                        </div>
                      )}
                      {member.phone && (
                        <div className="flex items-center gap-1">
                          <Phone className="h-3 w-3" />
                          {member.phone}
                        </div>
                      )}
                    </div>
                  </div>
                  <div className="flex gap-2 ml-4">
                    <button 
                      onClick={() => handleEdit(member)} 
                      className="p-2 text-gray-400 hover:text-gray-600 border border-gray-300 rounded-md hover:bg-gray-50"
                      title="แก้ไขข้อมูลอาจารย์"
                    >
                      <Edit className="h-4 w-4" />
                    </button>
                    <button 
                      onClick={() => handleDelete(member.id)} 
                      className="p-2 text-gray-400 hover:text-red-600 border border-gray-300 rounded-md hover:bg-gray-50"
                      title="ลบข้อมูลอาจารย์"
                    >
                      <Trash2 className="h-4 w-4" />
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))
        )}
        {!isLoading && filteredFaculty.length === 0 && (
          <div className="text-center py-8 text-gray-500">
            {searchTerm ? "ไม่พบอาจารย์ที่ตรงกับการค้นหา" : "ยังไม่มีข้อมูลอาจารย์"}
          </div>
        )}
      </div>
    </div>
  )
}
