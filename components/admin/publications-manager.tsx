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

export function PublicationsManager() {
  const [publications, setPublications] = useState<any[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [showForm, setShowForm] = useState(false)
  const [editingPublication, setEditingPublication] = useState<any>(null)
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

  const supabase = createClient()

  useEffect(() => {
    fetchPublications()
  }, [])

  const fetchPublications = async () => {
    setIsLoading(true)
    const { data, error } = await supabase
      .from("publications")
      .select("*")
      .order("publication_date", { ascending: false })

    if (!error && data) {
      setPublications(data)
    }
    setIsLoading(false)
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    // Convert authors string to array
    const authorsArray = formData.authors.split(",").map((author) => author.trim())
    const submitData = { ...formData, authors: authorsArray }

    if (editingPublication) {
      const { error } = await supabase.from("publications").update(submitData).eq("id", editingPublication.id)

      if (!error) {
        fetchPublications()
        resetForm()
      }
    } else {
      const { error } = await supabase.from("publications").insert([submitData])

      if (!error) {
        fetchPublications()
        resetForm()
      }
    }
  }

  const handleEdit = (publication: any) => {
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

  const handleDelete = async (id: string) => {
    if (confirm("คุณแน่ใจหรือไม่ที่จะลบผลงานวิจัยนี้?")) {
      const { error } = await supabase.from("publications").delete().eq("id", id)

      if (!error) {
        fetchPublications()
      }
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
      (pub.abstract && pub.abstract.toLowerCase().includes(searchTerm.toLowerCase())),
  )

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold">จัดการผลงานวิจัย</h2>
        <Button onClick={() => setShowForm(true)} className="bg-red-600 hover:bg-red-700">
          <Plus className="h-4 w-4 mr-2" />
          เพิ่มผลงานวิจัยใหม่
        </Button>
      </div>

      {/* Search */}
      <div className="flex items-center gap-2">
        <Search className="h-4 w-4 text-muted-foreground" />
        <Input
          placeholder="ค้นหาผลงานวิจัย..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="max-w-sm"
        />
      </div>

      {/* Form */}
      {showForm && (
        <Card>
          <CardHeader>
            <CardTitle>{editingPublication ? "แก้ไขผลงานวิจัย" : "เพิ่มผลงานวิจัยใหม่"}</CardTitle>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-4">
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
                <Label htmlFor="abstract">บทคัดย่อ</Label>
                <Textarea
                  id="abstract"
                  value={formData.abstract}
                  onChange={(e) => setFormData({ ...formData, abstract: e.target.value })}
                  rows={4}
                />
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="authors">ผู้เขียน (คั่นด้วยจุลภาค)</Label>
                  <Input
                    id="authors"
                    value={formData.authors}
                    onChange={(e) => setFormData({ ...formData, authors: e.target.value })}
                  />
                </div>
                <div>
                  <Label htmlFor="journal">วารสาร</Label>
                  <Input
                    id="journal"
                    value={formData.journal}
                    onChange={(e) => setFormData({ ...formData, journal: e.target.value })}
                  />
                </div>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="publication_date">วันที่ตีพิมพ์</Label>
                  <Input
                    id="publication_date"
                    type="date"
                    value={formData.publication_date}
                    onChange={(e) => setFormData({ ...formData, publication_date: e.target.value })}
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
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="doi">DOI</Label>
                  <Input
                    id="doi"
                    value={formData.doi}
                    onChange={(e) => setFormData({ ...formData, doi: e.target.value })}
                  />
                </div>
                <div>
                  <Label htmlFor="pdf_url">URL ไฟล์ PDF</Label>
                  <Input
                    id="pdf_url"
                    type="url"
                    value={formData.pdf_url}
                    onChange={(e) => setFormData({ ...formData, pdf_url: e.target.value })}
                  />
                </div>
              </div>
              <div>
                <Label htmlFor="keywords">คำสำคัญ (คั่นด้วยจุลภาค)</Label>
                <Input
                  id="keywords"
                  value={formData.keywords}
                  onChange={(e) => setFormData({ ...formData, keywords: e.target.value })}
                />
              </div>
              <div className="flex gap-2">
                <Button type="submit" className="bg-red-600 hover:bg-red-700">
                  {editingPublication ? "อัปเดต" : "เพิ่ม"}
                </Button>
                <Button type="button" variant="outline" onClick={resetForm}>
                  ยกเลิก
                </Button>
              </div>
            </form>
          </CardContent>
        </Card>
      )}

      {/* Publications List */}
      <div className="grid gap-4">
        {isLoading ? (
          <div>กำลังโหลด...</div>
        ) : (
          filteredPublications.map((publication) => (
            <Card key={publication.id}>
              <CardContent className="p-6">
                <div className="flex justify-between items-start">
                  <div className="flex-1">
                    <h3 className="font-semibold text-lg mb-2">{publication.title}</h3>
                    {publication.authors && publication.authors.length > 0 && (
                      <p className="text-sm text-muted-foreground mb-2">ผู้เขียน: {publication.authors.join(", ")}</p>
                    )}
                    {publication.abstract && (
                      <p className="text-muted-foreground mb-3 line-clamp-2">{publication.abstract}</p>
                    )}
                    <div className="flex items-center gap-2 mb-2">
                      {publication.category && <Badge variant="secondary">{publication.category}</Badge>}
                      {publication.journal && (
                        <span className="text-sm text-muted-foreground">{publication.journal}</span>
                      )}
                      {publication.publication_date && (
                        <span className="text-sm text-muted-foreground">
                          {new Date(publication.publication_date).toLocaleDateString("th-TH")}
                        </span>
                      )}
                    </div>
                    {publication.keywords && (
                      <div className="flex flex-wrap gap-1">
                        {publication.keywords.split(",").map((keyword: string, index: number) => (
                          <Badge key={index} variant="outline" className="text-xs">
                            {keyword.trim()}
                          </Badge>
                        ))}
                      </div>
                    )}
                  </div>
                  <div className="flex gap-2 ml-4">
                    <Button variant="outline" size="sm" onClick={() => handleEdit(publication)}>
                      <Edit className="h-4 w-4" />
                    </Button>
                    <Button variant="outline" size="sm" onClick={() => handleDelete(publication.id)}>
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
