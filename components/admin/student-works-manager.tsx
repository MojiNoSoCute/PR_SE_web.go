"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { Plus, Edit, Trash2, Search, Save, X } from "lucide-react"

interface StudentWork {
  id: string
  title: string
  description: string
  category: string
  keywords: string
  read_time: number
  created_at: string
  image_url?: string
}

export function StudentWorksManager() {
  const [works, setWorks] = useState<StudentWork[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [showForm, setShowForm] = useState(false)
  const [editingWork, setEditingWork] = useState<StudentWork | null>(null)
  const [searchTerm, setSearchTerm] = useState("")
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    category: "",
    keywords: "",
    read_time: 3,
    image_url: ""
  })

  // Initialize with mock data and load from localStorage
  useEffect(() => {
    loadWorks()
  }, [])

  const loadWorks = () => {
    setIsLoading(true)
    
    // Get existing data from localStorage or use default mock data
    const stored = localStorage.getItem('student_works')
    if (stored) {
      setWorks(JSON.parse(stored))
    } else {
      // Initialize with mock data
      const mockData: StudentWork[] = [
        {
          id: '1',
          title: 'ระบบจัดการห้องสมุดอัจฉริยะ',
          description: 'ระบบจัดการห้องสมุดที่ใช้เทคโนโลยี AI ในการแนะนำหนังสือและจัดการทรัพยากร พัฒนาด้วย React และ Node.js',
          category: 'โครงงาน',
          keywords: 'AI, Library Management, React, Node.js',
          read_time: 5,
          created_at: '2024-08-15T10:30:00Z',
          image_url: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=800&h=400&fit=crop'
        },
        {
          id: '2',
          title: 'แอปพลิเคชันเรียนรู้ภาษาไทยสำหรับชาวต่างชาติ',
          description: 'แอปมือถือสำหรับการเรียนรู้ภาษาไทยพื้นฐาน ประกอบด้วยการออกเสียง บทสนทนา และเกมการเรียนรู้',
          category: 'นักศึกษาดีเด่น',
          keywords: 'Mobile App, Thai Language, Flutter, Education',
          read_time: 4,
          created_at: '2024-08-10T14:20:00Z',
          image_url: 'https://images.unsplash.com/photo-1522202176988-66273c2fd55f?w=800&h=400&fit=crop'
        },
        {
          id: '3',
          title: 'ระบบตรวจสอบคุณภาพผลิตภัณฑ์ด้วย Computer Vision',
          description: 'ระบบใช้เทคโนโลยี Computer Vision ในการตรวจสอบคุณภาพสินค้าในโรงงานอุตสาหกรรม',
          category: 'งานวิจัย',
          keywords: 'Computer Vision, Quality Control, Python, OpenCV',
          read_time: 6,
          created_at: '2024-08-05T09:15:00Z',
          image_url: 'https://images.unsplash.com/photo-1485827404703-89b55fcc595e?w=800&h=400&fit=crop'
        }
      ]
      setWorks(mockData)
      localStorage.setItem('student_works', JSON.stringify(mockData))
    }
    
    setIsLoading(false)
  }

  const saveWorks = (updatedWorks: StudentWork[]) => {
    setWorks(updatedWorks)
    localStorage.setItem('student_works', JSON.stringify(updatedWorks))
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()

    if (editingWork) {
      // Update existing work
      const updatedWorks = works.map(work => 
        work.id === editingWork.id 
          ? { 
              ...work, 
              ...formData,
              id: editingWork.id,
              created_at: work.created_at // Keep original created_at
            }
          : work
      )
      saveWorks(updatedWorks)
    } else {
      // Create new work
      const newWork: StudentWork = {
        id: Date.now().toString(),
        ...formData,
        created_at: new Date().toISOString()
      }
      const updatedWorks = [newWork, ...works]
      saveWorks(updatedWorks)
    }

    resetForm()
  }

  const handleEdit = (work: StudentWork) => {
    setEditingWork(work)
    setFormData({
      title: work.title,
      description: work.description,
      category: work.category,
      keywords: work.keywords,
      read_time: work.read_time,
      image_url: work.image_url || ''
    })
    setShowForm(true)
  }

  const handleDelete = (id: string) => {
    if (confirm("คุณแน่ใจหรือไม่ที่จะลบผลงานนี้?")) {
      const updatedWorks = works.filter(work => work.id !== id)
      saveWorks(updatedWorks)
    }
  }

  const resetForm = () => {
    setFormData({
      title: "",
      description: "",
      category: "",
      keywords: "",
      read_time: 3,
      image_url: ""
    })
    setEditingWork(null)
    setShowForm(false)
  }

  const filteredWorks = works.filter(work =>
    work.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    work.description.toLowerCase().includes(searchTerm.toLowerCase())
  )

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold">จัดการผลงานนักศึกษา</h2>
        <button
          onClick={() => setShowForm(true)}
          className="flex items-center gap-2 bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-lg transition-colors"
        >
          <Plus className="h-4 w-4" />
          เพิ่มผลงานใหม่
        </button>
      </div>

      {/* Search */}
      <div className="flex items-center gap-2">
        <Search className="h-4 w-4 text-gray-400" />
        <input
          type="text"
          placeholder="ค้นหาผลงาน..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="border border-gray-300 rounded-lg px-3 py-2 max-w-sm focus:outline-none focus:ring-2 focus:ring-red-500"
        />
      </div>

      {/* Form */}
      {showForm && (
        <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
          <div className="mb-4">
            <h3 className="text-lg font-semibold">{editingWork ? "แก้ไขผลงาน" : "เพิ่มผลงานใหม่"}</h3>
          </div>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium mb-1">ชื่อผลงาน</label>
                <input
                  type="text"
                  value={formData.title}
                  onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                  required
                  placeholder="กรอกชื่อผลงาน"
                  aria-label="ชื่อผลงาน"
                  className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-red-500"
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">หมวดหมู่</label>
                <input
                  type="text"
                  value={formData.category}
                  onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                  placeholder="เลือกหมวดหมู่"
                  aria-label="หมวดหมู่"
                  className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-red-500"
                />
              </div>
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">คำอธิบาย</label>
              <textarea
                value={formData.description}
                onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                rows={3}
                placeholder="อธิบายรายละเอียดผลงาน"
                aria-label="คำอธิบาย"
                className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-red-500"
              />
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div>
                <label className="block text-sm font-medium mb-1">คำสำคัญ (คั่นด้วยจุลภาค)</label>
                <input
                  type="text"
                  value={formData.keywords}
                  onChange={(e) => setFormData({ ...formData, keywords: e.target.value })}
                  placeholder="React, Node.js, AI"
                  aria-label="คำสำคัญ"
                  className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-red-500"
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">เวลาในการอ่าน (นาที)</label>
                <input
                  type="number"
                  value={formData.read_time}
                  onChange={(e) => setFormData({ ...formData, read_time: parseInt(e.target.value) })}
                  placeholder="5"
                  aria-label="เวลาในการอ่าน"
                  className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-red-500"
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">รูปภาพ URL</label>
                <input
                  type="url"
                  value={formData.image_url}
                  onChange={(e) => setFormData({ ...formData, image_url: e.target.value })}
                  placeholder="https://example.com/image.jpg"
                  aria-label="รูปภาพ URL"
                  className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-red-500"
                />
              </div>
            </div>
            <div className="flex gap-2">
              <button
                type="submit"
                className="flex items-center gap-2 bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-lg transition-colors"
              >
                <Save className="h-4 w-4" />
                {editingWork ? "อัปเดต" : "เพิ่ม"}
              </button>
              <button
                type="button"
                onClick={resetForm}
                className="flex items-center gap-2 border border-gray-300 hover:bg-gray-50 px-4 py-2 rounded-lg transition-colors"
              >
                <X className="h-4 w-4" />
                ยกเลิก
              </button>
            </div>
          </form>
        </div>
      )}

      {/* Works List */}
      <div className="grid gap-4">
        {isLoading ? (
          <div className="text-center py-8">กำลังโหลด...</div>
        ) : filteredWorks.length === 0 ? (
          <div className="text-center py-8 text-gray-500">ไม่มีผลงานที่ตรงกับการค้นหา</div>
        ) : (
          filteredWorks.map((work) => (
            <div key={work.id} className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
              <div className="flex justify-between items-start">
                <div className="flex-1">
                  <h3 className="font-semibold text-lg mb-2">{work.title}</h3>
                  {work.description && (
                    <p className="text-gray-600 mb-3 line-clamp-2">{work.description}</p>
                  )}
                  <div className="flex items-center gap-2 mb-2">
                    {work.category && (
                      <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-gray-100 text-gray-800">
                        {work.category}
                      </span>
                    )}
                    <span className="text-sm text-gray-500">
                      {work.read_time} นาที | {new Date(work.created_at).toLocaleDateString("th-TH")}
                    </span>
                  </div>
                  {work.keywords && (
                    <div className="flex flex-wrap gap-1">
                      {work.keywords.split(",").map((keyword: string, index: number) => (
                        <span
                          key={index}
                          className="inline-flex items-center px-2 py-1 rounded-md text-xs font-medium bg-blue-50 text-blue-700 border border-blue-200"
                        >
                          {keyword.trim()}
                        </span>
                      ))}
                    </div>
                  )}
                </div>
                <div className="flex gap-2 ml-4">
                  <button
                    onClick={() => handleEdit(work)}
                    title="แก้ไขผลงาน"
                    aria-label="แก้ไขผลงาน"
                    className="flex items-center justify-center w-8 h-8 border border-gray-300 hover:bg-gray-50 rounded-lg transition-colors"
                  >
                    <Edit className="h-4 w-4" />
                  </button>
                  <button
                    onClick={() => handleDelete(work.id)}
                    title="ลบผลงาน"
                    aria-label="ลบผลงาน"
                    className="flex items-center justify-center w-8 h-8 border border-red-300 hover:bg-red-50 text-red-600 rounded-lg transition-colors"
                  >
                    <Trash2 className="h-4 w-4" />
                  </button>
                </div>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  )
}
