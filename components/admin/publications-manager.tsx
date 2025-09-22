"use client"

import { useState, useEffect } from "react"
import { Edit, Trash2, Plus, Search, BookOpen } from "lucide-react"

interface Publication {
  id: string
  title: string
  abstract?: string
  authors?: string[]
  journal?: string
  publication_date?: string
  doi?: string
  pdf_url?: string
  keywords?: string
  category?: string
  created_at?: string
  updated_at?: string
}

// Mock data for initial load
const initialPublications: Publication[] = [
  {
    id: "1",
    title: "การพัฒนาระบบจัดการข้อมูลนักศึกษาด้วย AI",
    abstract: "งานวิจัยนี้นำเสนอการพัฒนาระบบจัดการข้อมูลนักศึกษาโดยใช้เทคโนโลยี AI เพื่อเพิ่มประสิทธิภาพในการบริหารจัดการ",
    authors: ["ดร.สมชาย ใจดี", "ผศ.สมหญิง รักเรียน"],
    journal: "วารสารเทคโนโลยีสารสนเทศ",
    publication_date: "2024-01-15",
    doi: "10.1234/example.2024.001",
    pdf_url: "https://example.com/paper1.pdf",
    keywords: "AI, การจัดการข้อมูล, นักศึกษา",
    category: "เทคโนโลยีสารสนเทศ",
    created_at: "2024-01-15T10:00:00Z",
    updated_at: "2024-01-15T10:00:00Z"
  },
  {
    id: "2",
    title: "Machine Learning for Educational Data Analysis",
    abstract: "This research explores the application of machine learning techniques in analyzing educational data to improve learning outcomes.",
    authors: ["Dr.John Smith", "Prof.Jane Doe"],
    journal: "International Journal of Educational Technology",
    publication_date: "2023-12-20",
    doi: "10.1234/example.2023.002",
    pdf_url: "https://example.com/paper2.pdf",
    keywords: "Machine Learning, Education, Data Analysis",
    category: "Computer Science",
    created_at: "2023-12-20T14:30:00Z",
    updated_at: "2023-12-20T14:30:00Z"
  }
]

export function PublicationsManager() {
  const [publications, setPublications] = useState<Publication[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [showForm, setShowForm] = useState(false)
  const [editingPublication, setEditingPublication] = useState<Publication | null>(null)
  const [searchTerm, setSearchTerm] = useState("")
  const [formData, setFormData] = useState({
    title: "",
    abstract: "",
    authors: "",
    journal: "",
    publication_date: "",
    doi: "",
    pdf_url: "",
    keywords: "",
    category: "",
  })

  useEffect(() => {
    loadPublications()
  }, [])

  const loadPublications = () => {
    try {
      const stored = localStorage.getItem('admin_publications')
      if (stored) {
        setPublications(JSON.parse(stored))
      } else {
        // Initialize with mock data
        localStorage.setItem('admin_publications', JSON.stringify(initialPublications))
        setPublications(initialPublications)
      }
    } catch (error) {
      console.error("Error loading publications:", error)
      setPublications(initialPublications)
    } finally {
      setIsLoading(false)
    }
  }

  const savePublications = (updatedPublications: Publication[]) => {
    try {
      localStorage.setItem('admin_publications', JSON.stringify(updatedPublications))
      setPublications(updatedPublications)
    } catch (error) {
      console.error("Error saving publications:", error)
    }
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()

    // Convert authors string to array
    const authorsArray = formData.authors.split(",").map((author) => author.trim()).filter(Boolean)
    const currentTime = new Date().toISOString()
    
    if (editingPublication) {
      const updatedPublications = publications.map(pub =>
        pub.id === editingPublication.id
          ? {
              ...pub,
              ...formData,
              authors: authorsArray,
              updated_at: currentTime
            }
          : pub
      )
      savePublications(updatedPublications)
    } else {
      const newPublication: Publication = {
        id: Date.now().toString(),
        ...formData,
        authors: authorsArray,
        created_at: currentTime,
        updated_at: currentTime
      }
      savePublications([newPublication, ...publications])
    }
    resetForm()
  }

  const handleEdit = (publication: Publication) => {
    setEditingPublication(publication)
    setFormData({
      title: publication.title,
      abstract: publication.abstract || "",
      authors: publication.authors ? publication.authors.join(", ") : "",
      journal: publication.journal || "",
      publication_date: publication.publication_date || "",
      doi: publication.doi || "",
      pdf_url: publication.pdf_url || "",
      keywords: publication.keywords || "",
      category: publication.category || "",
    })
    setShowForm(true)
  }

  const handleDelete = (id: string) => {
    if (confirm("คุณแน่ใจหรือไม่ที่จะลบผลงานวิจัยนี้?")) {
      const updatedPublications = publications.filter(pub => pub.id !== id)
      savePublications(updatedPublications)
    }
  }

  const resetForm = () => {
    setFormData({
      title: "",
      abstract: "",
      authors: "",
      journal: "",
      publication_date: "",
      doi: "",
      pdf_url: "",
      keywords: "",
      category: "",
    })
    setEditingPublication(null)
    setShowForm(false)
  }

  const filteredPublications = publications.filter(
    (pub) =>
      pub.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      (pub.abstract && pub.abstract.toLowerCase().includes(searchTerm.toLowerCase())) ||
      (pub.keywords && pub.keywords.toLowerCase().includes(searchTerm.toLowerCase()))
  )

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold">จัดการผลงานวิจัย</h2>
        <button onClick={() => setShowForm(true)} className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-md flex items-center gap-2">
          <Plus className="h-4 w-4" />
          เพิ่มผลงานวิจัยใหม่
        </button>
      </div>

      {/* Search */}
      <div className="flex items-center gap-2">
        <Search className="h-4 w-4 text-gray-500" />
        <input
          placeholder="ค้นหาผลงานวิจัย..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="max-w-sm px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-red-500"
        />
      </div>

      {/* Form */}
      {showForm && (
        <div className="bg-white rounded-lg border border-gray-200 shadow-sm">
          <div className="p-6 border-b border-gray-200">
            <h3 className="text-lg font-semibold">{editingPublication ? "แก้ไขผลงานวิจัย" : "เพิ่มผลงานวิจัยใหม่"}</h3>
          </div>
          <div className="p-6">
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label htmlFor="title" className="block text-sm font-medium text-gray-700 mb-1">ชื่อผลงาน</label>
                <input
                  id="title"
                  type="text"
                  value={formData.title}
                  onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                  required
                  placeholder="กรอกชื่อผลงานวิจัย"
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-red-500"
                />
              </div>
              <div>
                <label htmlFor="abstract" className="block text-sm font-medium text-gray-700 mb-1">บทคัดย่อ</label>
                <textarea
                  id="abstract"
                  value={formData.abstract}
                  onChange={(e) => setFormData({ ...formData, abstract: e.target.value })}
                  rows={4}
                  placeholder="กรอกบทคัดย่อของผลงาน"
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-red-500"
                />
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label htmlFor="authors" className="block text-sm font-medium text-gray-700 mb-1">ผู้เขียน (คั่นด้วยจุลภาค)</label>
                  <input
                    id="authors"
                    type="text"
                    value={formData.authors}
                    onChange={(e) => setFormData({ ...formData, authors: e.target.value })}
                    placeholder="ชื่อผู้เขียน คั่นด้วยจุลภาค"
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-red-500"
                  />
                </div>
                <div>
                  <label htmlFor="journal" className="block text-sm font-medium text-gray-700 mb-1">วารสาร</label>
                  <input
                    id="journal"
                    type="text"
                    value={formData.journal}
                    onChange={(e) => setFormData({ ...formData, journal: e.target.value })}
                    placeholder="ชื่อวารสารที่ตีพิมพ์"
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-red-500"
                  />
                </div>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label htmlFor="publication_date" className="block text-sm font-medium text-gray-700 mb-1">วันที่ตีพิมพ์</label>
                  <input
                    id="publication_date"
                    type="date"
                    value={formData.publication_date}
                    onChange={(e) => setFormData({ ...formData, publication_date: e.target.value })}
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
                    placeholder="หมวดหมู่ของผลงาน"
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-red-500"
                  />
                </div>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label htmlFor="doi" className="block text-sm font-medium text-gray-700 mb-1">DOI</label>
                  <input
                    id="doi"
                    type="text"
                    value={formData.doi}
                    onChange={(e) => setFormData({ ...formData, doi: e.target.value })}
                    placeholder="Digital Object Identifier"
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-red-500"
                  />
                </div>
                <div>
                  <label htmlFor="pdf_url" className="block text-sm font-medium text-gray-700 mb-1">URL ไฟล์ PDF</label>
                  <input
                    id="pdf_url"
                    type="url"
                    value={formData.pdf_url}
                    onChange={(e) => setFormData({ ...formData, pdf_url: e.target.value })}
                    placeholder="https://example.com/paper.pdf"
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-red-500"
                  />
                </div>
              </div>
              <div>
                <label htmlFor="keywords" className="block text-sm font-medium text-gray-700 mb-1">คำสำคัญ (คั่นด้วยจุลภาค)</label>
                <input
                  id="keywords"
                  type="text"
                  value={formData.keywords}
                  onChange={(e) => setFormData({ ...formData, keywords: e.target.value })}
                  placeholder="คำสำคัญ, คั่นด้วยจุลภาค"
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-red-500"
                />
              </div>
              <div className="flex gap-2">
                <button type="submit" className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-md">
                  {editingPublication ? "อัปเดต" : "เพิ่ม"}
                </button>
                <button type="button" onClick={resetForm} className="border border-gray-300 hover:bg-gray-50 text-gray-700 px-4 py-2 rounded-md">
                  ยกเลิก
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Publications List */}
      <div className="grid gap-4">
        {isLoading ? (
          <div className="text-center py-8 text-gray-500">กำลังโหลด...</div>
        ) : (
          filteredPublications.map((publication) => (
            <div key={publication.id} className="bg-white rounded-lg border border-gray-200 shadow-sm">
              <div className="p-6">
                <div className="flex justify-between items-start">
                  <div className="flex-1">
                    <h3 className="font-semibold text-lg mb-2 text-gray-900">{publication.title}</h3>
                    {publication.authors && publication.authors.length > 0 && (
                      <p className="text-sm text-gray-600 mb-2">ผู้เขียน: {publication.authors.join(", ")}</p>
                    )}
                    {publication.abstract && (
                      <p className="text-gray-600 mb-3 line-clamp-2">{publication.abstract}</p>
                    )}
                    <div className="flex items-center gap-2 mb-2 flex-wrap">
                      {publication.category && (
                        <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-gray-100 text-gray-800">
                          {publication.category}
                        </span>
                      )}
                      {publication.journal && (
                        <span className="text-sm text-gray-500">{publication.journal}</span>
                      )}
                      {publication.publication_date && (
                        <span className="text-sm text-gray-500">
                          {new Date(publication.publication_date).toLocaleDateString("th-TH")}
                        </span>
                      )}
                    </div>
                    {publication.keywords && (
                      <div className="flex flex-wrap gap-1">
                        {publication.keywords.split(",").map((keyword: string, index: number) => (
                          <span key={index} className="inline-flex items-center px-2 py-1 rounded-md text-xs bg-red-50 text-red-700 border border-red-200">
                            {keyword.trim()}
                          </span>
                        ))}
                      </div>
                    )}
                    {publication.pdf_url && (
                      <div className="mt-2">
                        <a 
                          href={publication.pdf_url} 
                          target="_blank" 
                          rel="noopener noreferrer"
                          className="text-red-600 hover:text-red-800 text-sm flex items-center gap-1"
                        >
                          <BookOpen className="h-4 w-4" />
                          ดูไฟล์ PDF
                        </a>
                      </div>
                    )}
                  </div>
                  <div className="flex gap-2 ml-4">
                    <button 
                      onClick={() => handleEdit(publication)} 
                      className="p-2 text-gray-400 hover:text-gray-600 border border-gray-300 rounded-md hover:bg-gray-50"
                      title="แก้ไขผลงานวิจัย"
                    >
                      <Edit className="h-4 w-4" />
                    </button>
                    <button 
                      onClick={() => handleDelete(publication.id)} 
                      className="p-2 text-gray-400 hover:text-red-600 border border-gray-300 rounded-md hover:bg-gray-50"
                      title="ลบผลงานวิจัย"
                    >
                      <Trash2 className="h-4 w-4" />
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))
        )}
        {!isLoading && filteredPublications.length === 0 && (
          <div className="text-center py-8 text-gray-500">
            {searchTerm ? "ไม่พบผลงานวิจัยที่ตรงกับการค้นหา" : "ยังไม่มีผลงานวิจัย"}
          </div>
        )}
      </div>
    </div>
  )
}
