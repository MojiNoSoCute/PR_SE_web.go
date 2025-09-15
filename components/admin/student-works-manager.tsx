"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Badge } from "@/components/ui/badge"
import { createClient } from "@/lib/supabase/client"
import { Plus, Edit, Trash2, Search } from "lucide-react"

export function StudentWorksManager() {
  const [works, setWorks] = useState<any[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [showForm, setShowForm] = useState(false)
  const [editingWork, setEditingWork] = useState<any>(null)
  const [searchTerm, setSearchTerm] = useState("")
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    category: "",
    keywords: "",
    read_time: 3,
  })

  const supabase = createClient()

  useEffect(() => {
    fetchWorks()
  }, [])

  const fetchWorks = async () => {
    setIsLoading(true)
    const { data, error } = await supabase.from("student_works").select("*").order("created_at", { ascending: false })

    if (!error && data) {
      setWorks(data)
    }
    setIsLoading(false)
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    if (editingWork) {
      // Update existing work
      const { error } = await supabase.from("student_works").update(formData).eq("id", editingWork.id)

      if (!error) {
        fetchWorks()
        resetForm()
      }
    } else {
      // Create new work
      const { error } = await supabase.from("student_works").insert([formData])

      if (!error) {
        fetchWorks()
        resetForm()
      }
    }
  }

  const handleEdit = (work: any) => {
    setEditingWork(work)
    setFormData({
      title: work.title,
      description: work.description || "",
      category: work.category || "",
      keywords: work.keywords || "",
      read_time: work.read_time || 3,
    })
    setShowForm(true)
  }

  const handleDelete = async (id: string) => {
    if (confirm("คุณแน่ใจหรือไม่ที่จะลบผลงานนี้?")) {
      const { error } = await supabase.from("student_works").delete().eq("id", id)

      if (!error) {
        fetchWorks()
      }
    }
  }

  const resetForm = () => {
    setFormData({
      title: "",
      description: "",
      category: "",
      keywords: "",
      read_time: 3,
    })
    setEditingWork(null)
    setShowForm(false)
  }

  const filteredWorks = works.filter(
    (work) =>
      work.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      (work.description && work.description.toLowerCase().includes(searchTerm.toLowerCase())),
  )

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold">จัดการผลงานนักศึกษา</h2>
        <Button onClick={() => setShowForm(true)} className="bg-red-600 hover:bg-red-700">
          <Plus className="h-4 w-4 mr-2" />
          เพิ่มผลงานใหม่
        </Button>
      </div>

      {/* Search */}
      <div className="flex items-center gap-2">
        <Search className="h-4 w-4 text-muted-foreground" />
        <Input
          placeholder="ค้นหาผลงาน..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="max-w-sm"
        />
      </div>

      {/* Form */}
      {showForm && (
        <Card>
          <CardHeader>
            <CardTitle>{editingWork ? "แก้ไขผลงาน" : "เพิ่มผลงานใหม่"}</CardTitle>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="title">ชื่อผลงาน</Label>
                  <Input
                    id="title"
                    value={formData.title}
                    onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                    required
                  />
                </div>
                <div>
                  <Label htmlFor="category">หมวดหมู่</Label>
                  <Input
                    id="category"
                    value={formData.category}
                    onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                  />
                </div>
              </div>
              <div>
                <Label htmlFor="description">คำอธิบาย</Label>
                <Textarea
                  id="description"
                  value={formData.description}
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                  rows={3}
                />
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="keywords">คำสำคัญ (คั่นด้วยจุลภาค)</Label>
                  <Input
                    id="keywords"
                    value={formData.keywords}
                    onChange={(e) => setFormData({ ...formData, keywords: e.target.value })}
                  />
                </div>
                <div>
                  <Label htmlFor="read_time">เวลาในการอ่าน (นาที)</Label>
                  <Input
                    id="read_time"
                    type="number"
                    value={formData.read_time}
                    onChange={(e) => setFormData({ ...formData, read_time: Number.parseInt(e.target.value) })}
                  />
                </div>
              </div>
              <div className="flex gap-2">
                <Button type="submit" className="bg-red-600 hover:bg-red-700">
                  {editingWork ? "อัปเดต" : "เพิ่ม"}
                </Button>
                <Button type="button" variant="outline" onClick={resetForm}>
                  ยกเลิก
                </Button>
              </div>
            </form>
          </CardContent>
        </Card>
      )}

      {/* Works List */}
      <div className="grid gap-4">
        {isLoading ? (
          <div>กำลังโหลด...</div>
        ) : (
          filteredWorks.map((work) => (
            <Card key={work.id}>
              <CardContent className="p-6">
                <div className="flex justify-between items-start">
                  <div className="flex-1">
                    <h3 className="font-semibold text-lg mb-2">{work.title}</h3>
                    {work.description && <p className="text-muted-foreground mb-3 line-clamp-2">{work.description}</p>}
                    <div className="flex items-center gap-2 mb-2">
                      {work.category && <Badge variant="secondary">{work.category}</Badge>}
                      <span className="text-sm text-muted-foreground">
                        {work.read_time} นาที | {new Date(work.created_at).toLocaleDateString("th-TH")}
                      </span>
                    </div>
                    {work.keywords && (
                      <div className="flex flex-wrap gap-1">
                        {work.keywords.split(",").map((keyword: string, index: number) => (
                          <Badge key={index} variant="outline" className="text-xs">
                            {keyword.trim()}
                          </Badge>
                        ))}
                      </div>
                    )}
                  </div>
                  <div className="flex gap-2 ml-4">
                    <Button variant="outline" size="sm" onClick={() => handleEdit(work)}>
                      <Edit className="h-4 w-4" />
                    </Button>
                    <Button variant="outline" size="sm" onClick={() => handleDelete(work.id)}>
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))
        )}
      </div>
    </div>
  )
}
