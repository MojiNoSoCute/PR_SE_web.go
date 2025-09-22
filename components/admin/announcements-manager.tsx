"use client"

import { useState, useEffect } from "react"
import { Edit, Trash2, Plus, Search, Megaphone } from "lucide-react"

interface Announcement {
  id: string
  title: string
  content?: string
  category?: string
  is_featured: boolean
  published_at?: string
  created_at?: string
  updated_at?: string
}

// Mock data for initial load
const initialAnnouncements: Announcement[] = [
  {
    id: "1",
    title: "ประกาศรับสมัครนักศึกษาใหม่ ปีการศึกษา 2567",
    content: "คณะวิศวกรรมศาสตร์ เปิดรับสมัครนักศึกษาใหม่ ปีการศึกษา 2567 สามารถสมัครได้ตั้งแต่วันที่ 1 มิถุนายน - 31 มีนาคม 2567",
    category: "รับสมัคร",
    is_featured: true,
    published_at: "2024-02-15T09:00:00Z",
    created_at: "2024-02-15T09:00:00Z",
    updated_at: "2024-02-15T09:00:00Z"
  },
  {
    id: "2",
    title: "กำหนดการสอบขั้นกลาง ภาคเรียนที่ 1/2567",
    content: "นักศึกษาทุกคนสามารถเข้าสอบขั้นกลางได้ ระหว่างวันที่ 3-7 มีนาคม 2567 เวลา 9.00-16.00 น.",
    category: "สอบ",
    is_featured: false,
    published_at: "2024-02-10T08:00:00Z",
    created_at: "2024-02-10T08:00:00Z",
    updated_at: "2024-02-10T08:00:00Z"
  }
]

export function AnnouncementsManager() {
  const [announcements, setAnnouncements] = useState<Announcement[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [showForm, setShowForm] = useState(false)
  const [editingAnnouncement, setEditingAnnouncement] = useState<Announcement | null>(null)
  const [searchTerm, setSearchTerm] = useState("")
  const [formData, setFormData] = useState({
    title: "",
    content: "",
    category: "",
    is_featured: false,
  })

  useEffect(() => {
    loadAnnouncements()
  }, [])

  const loadAnnouncements = () => {
    try {
      const stored = localStorage.getItem('admin_announcements')
      if (stored) {
        setAnnouncements(JSON.parse(stored))
      } else {
        // Initialize with mock data
        localStorage.setItem('admin_announcements', JSON.stringify(initialAnnouncements))
        setAnnouncements(initialAnnouncements)
      }
    } catch (error) {
      console.error("Error loading announcements:", error)
      setAnnouncements(initialAnnouncements)
    } finally {
      setIsLoading(false)
    }
  }

  const saveAnnouncements = (updatedAnnouncements: Announcement[]) => {
    try {
      localStorage.setItem('admin_announcements', JSON.stringify(updatedAnnouncements))
      setAnnouncements(updatedAnnouncements)
    } catch (error) {
      console.error("Error saving announcements:", error)
    }
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    
    const currentTime = new Date().toISOString()
    
    if (editingAnnouncement) {
      const updatedAnnouncements = announcements.map(announcement =>
        announcement.id === editingAnnouncement.id
          ? {
              ...announcement,
              ...formData,
              updated_at: currentTime
            }
          : announcement
      )
      saveAnnouncements(updatedAnnouncements)
    } else {
      const newAnnouncement: Announcement = {
        id: Date.now().toString(),
        ...formData,
        published_at: currentTime,
        created_at: currentTime,
        updated_at: currentTime
      }
      saveAnnouncements([newAnnouncement, ...announcements])
    }
    resetForm()
  }

  const handleEdit = (announcement: Announcement) => {
    setEditingAnnouncement(announcement)
    setFormData({
      title: announcement.title,
      content: announcement.content || "",
      category: announcement.category || "",
      is_featured: announcement.is_featured || false,
    })
    setShowForm(true)
  }

  const handleDelete = (id: string) => {
    if (confirm("คุณแน่ใจหรือไม่ที่จะลบประกาศนี้?")) {
      const updatedAnnouncements = announcements.filter(announcement => announcement.id !== id)
      saveAnnouncements(updatedAnnouncements)
    }
  }

  const resetForm = () => {
    setFormData({
      title: "",
      content: "",
      category: "",
      is_featured: false,
    })
    setEditingAnnouncement(null)
    setShowForm(false)
  }

  const filteredAnnouncements = announcements.filter(
    (announcement) =>
      announcement.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      (announcement.content && announcement.content.toLowerCase().includes(searchTerm.toLowerCase())) ||
      (announcement.category && announcement.category.toLowerCase().includes(searchTerm.toLowerCase()))
  )

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold">จัดการประกาศ</h2>
        <button onClick={() => setShowForm(true)} className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-md flex items-center gap-2">
          <Plus className="h-4 w-4" />
          เพิ่มประกาศใหม่
        </button>
      </div>

      {/* Search */}
      <div className="flex items-center gap-2">
        <Search className="h-4 w-4 text-gray-500" />
        <input
          placeholder="ค้นหาประกาศ..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="max-w-sm px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-red-500"
        />
      </div>

      {/* Form */}
      {showForm && (
        <div className="bg-white rounded-lg border border-gray-200 shadow-sm">
          <div className="p-6 border-b border-gray-200">
            <h3 className="text-lg font-semibold">{editingAnnouncement ? "แก้ไขประกาศ" : "เพิ่มประกาศใหม่"}</h3>
          </div>
          <div className="p-6">
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label htmlFor="title" className="block text-sm font-medium text-gray-700 mb-1">หัวข้อประกาศ</label>
                <input
                  id="title"
                  type="text"
                  value={formData.title}
                  onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                  required
                  placeholder="กรอกหัวข้อประกาศ"
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-red-500"
                />
              </div>
              <div>
                <label htmlFor="content" className="block text-sm font-medium text-gray-700 mb-1">เนื้อหา</label>
                <textarea
                  id="content"
                  value={formData.content}
                  onChange={(e) => setFormData({ ...formData, content: e.target.value })}
                  rows={4}
                  placeholder="กรอกเนื้อหาประกาศ"
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-red-500"
                />
              </div>
              <div>
                <label htmlFor="category" className="block text-sm font-medium text-gray-700 mb-1">หมวดหมู่</label>
                <input
                  id="category"
                  type="text"
                  value={formData.category}
                  onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                  placeholder="เช่น ทั่วไป, สำคัญ, กิจกรรม"
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-red-500"
                />
              </div>
              <div className="flex items-center space-x-2">
                <input
                  type="checkbox"
                  id="is_featured"
                  checked={formData.is_featured}
                  onChange={(e) => setFormData({ ...formData, is_featured: e.target.checked })}
                  className="h-4 w-4 text-red-600 focus:ring-red-500 border-gray-300 rounded"
                />
                <label htmlFor="is_featured" className="text-sm font-medium text-gray-700">ประกาศสำคัญ</label>
              </div>
              <div className="flex gap-2">
                <button type="submit" className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-md">
                  {editingAnnouncement ? "อัปเดต" : "เพิ่ม"}
                </button>
                <button type="button" onClick={resetForm} className="border border-gray-300 hover:bg-gray-50 text-gray-700 px-4 py-2 rounded-md">
                  ยกเลิก
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Announcements List */}
      <div className="grid gap-4">
        {isLoading ? (
          <div className="text-center py-8 text-gray-500">กำลังโหลด...</div>
        ) : (
          filteredAnnouncements.map((announcement) => (
            <div key={announcement.id} className="bg-white rounded-lg border border-gray-200 shadow-sm">
              <div className="p-6">
                <div className="flex justify-between items-start">
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-2">
                      <h3 className="font-semibold text-lg text-gray-900">{announcement.title}</h3>
                      {announcement.is_featured && (
                        <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-red-100 text-red-800">
                          <Megaphone className="h-3 w-3 mr-1" />
                          สำคัญ
                        </span>
                      )}
                    </div>
                    {announcement.content && (
                      <p className="text-gray-600 mb-3 line-clamp-2">{announcement.content}</p>
                    )}
                    <div className="flex items-center gap-2 flex-wrap">
                      {announcement.category && (
                        <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-gray-100 text-gray-800">
                          {announcement.category}
                        </span>
                      )}
                      {announcement.published_at && (
                        <span className="text-sm text-gray-500">
                          {new Date(announcement.published_at).toLocaleDateString("th-TH")}
                        </span>
                      )}
                    </div>
                  </div>
                  <div className="flex gap-2 ml-4">
                    <button 
                      onClick={() => handleEdit(announcement)} 
                      className="p-2 text-gray-400 hover:text-gray-600 border border-gray-300 rounded-md hover:bg-gray-50"
                      title="แก้ไขประกาศ"
                    >
                      <Edit className="h-4 w-4" />
                    </button>
                    <button 
                      onClick={() => handleDelete(announcement.id)} 
                      className="p-2 text-gray-400 hover:text-red-600 border border-gray-300 rounded-md hover:bg-gray-50"
                      title="ลบประกาศ"
                    >
                      <Trash2 className="h-4 w-4" />
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))
        )}
        {!isLoading && filteredAnnouncements.length === 0 && (
          <div className="text-center py-8 text-gray-500">
            {searchTerm ? "ไม่พบประกาศที่ตรงกับการค้นหา" : "ยังไม่มีประกาศ"}
          </div>
        )}
      </div>
    </div>
  )
}
