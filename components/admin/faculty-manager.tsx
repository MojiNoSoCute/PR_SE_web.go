"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { createClient } from "@/lib/supabase/client"
import { Plus, Edit, Trash2, Search } from "lucide-react"

export function FacultyManager() {
  const [faculty, setFaculty] = useState<any[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [showForm, setShowForm] = useState(false)
  const [editingMember, setEditingMember] = useState<any>(null)
  const [searchTerm, setSearchTerm] = useState("")
  const [formData, setFormData] = useState({
    name_thai: "",
    name_english: "",
    position: "",
    department: "Software Engineering",
    bio: "",
    email: "",
    phone: "",
  })

  const supabase = createClient()

  useEffect(() => {
    fetchFaculty()
  }, [])

  const fetchFaculty = async () => {
    setIsLoading(true)
    const { data, error } = await supabase.from("faculty").select("*").order("position", { ascending: true })

    if (!error && data) {
      setFaculty(data)
    }
    setIsLoading(false)
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    if (editingMember) {
      const { error } = await supabase.from("faculty").update(formData).eq("id", editingMember.id)

      if (!error) {
        fetchFaculty()
        resetForm()
      }
    } else {
      const { error } = await supabase.from("faculty").insert([formData])

      if (!error) {
        fetchFaculty()
        resetForm()
      }
    }
  }

  const handleEdit = (member: any) => {
    setEditingMember(member)
    setFormData({
      name_thai: member.name_thai,
      name_english: member.name_english || "",
      position: member.position || "",
      department: member.department || "Software Engineering",
      bio: member.bio || "",
      email: member.email || "",
      phone: member.phone || "",
    })
    setShowForm(true)
  }

  const handleDelete = async (id: string) => {
    if (confirm("คุณแน่ใจหรือไม่ที่จะลบข้อมูลอาจารย์ท่านนี้?")) {
      const { error } = await supabase.from("faculty").delete().eq("id", id)

      if (!error) {
        fetchFaculty()
      }
    }
  }

  const resetForm = () => {
    setFormData({
      name_thai: "",
      name_english: "",
      position: "",
      department: "Software Engineering",
      bio: "",
      email: "",
      phone: "",
    })
    setEditingMember(null)
    setShowForm(false)
  }

  const filteredFaculty = faculty.filter(
    (member) =>
      member.name_thai.toLowerCase().includes(searchTerm.toLowerCase()) ||
      (member.name_english && member.name_english.toLowerCase().includes(searchTerm.toLowerCase())),
  )

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold">จัดการข้อมูลอาจารย์</h2>
        <Button onClick={() => setShowForm(true)} className="bg-red-600 hover:bg-red-700">
          <Plus className="h-4 w-4 mr-2" />
          เพิ่มอาจารย์ใหม่
        </Button>
      </div>

      {/* Search */}
      <div className="flex items-center gap-2">
        <Search className="h-4 w-4 text-muted-foreground" />
        <Input
          placeholder="ค้นหาอาจารย์..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="max-w-sm"
        />
      </div>

      {/* Form */}
      {showForm && (
        <Card>
          <CardHeader>
            <CardTitle>{editingMember ? "แก้ไขข้อมูลอาจารย์" : "เพิ่มอาจารย์ใหม่"}</CardTitle>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="name_thai">ชื่อ-นามสกุล (ไทย)</Label>
                  <Input
                    id="name_thai"
                    value={formData.name_thai}
                    onChange={(e) => setFormData({ ...formData, name_thai: e.target.value })}
                    required
                  />
                </div>
                <div>
                  <Label htmlFor="name_english">ชื่อ-นามสกุล (อังกฤษ)</Label>
                  <Input
                    id="name_english"
                    value={formData.name_english}
                    onChange={(e) => setFormData({ ...formData, name_english: e.target.value })}
                  />
                </div>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="position">ตำแหน่ง</Label>
                  <Input
                    id="position"
                    value={formData.position}
                    onChange={(e) => setFormData({ ...formData, position: e.target.value })}
                  />
                </div>
                <div>
                  <Label htmlFor="department">ภาควิชา</Label>
                  <Input
                    id="department"
                    value={formData.department}
                    onChange={(e) => setFormData({ ...formData, department: e.target.value })}
                  />
                </div>
              </div>
              <div>
                <Label htmlFor="bio">ประวัติและความเชี่ยวชาญ</Label>
                <Textarea
                  id="bio"
                  value={formData.bio}
                  onChange={(e) => setFormData({ ...formData, bio: e.target.value })}
                  rows={3}
                />
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="email">อีเมล</Label>
                  <Input
                    id="email"
                    type="email"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  />
                </div>
                <div>
                  <Label htmlFor="phone">เบอร์โทรศัพท์</Label>
                  <Input
                    id="phone"
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                  />
                </div>
              </div>
              <div className="flex gap-2">
                <Button type="submit" className="bg-red-600 hover:bg-red-700">
                  {editingMember ? "อัปเดต" : "เพิ่ม"}
                </Button>
                <Button type="button" variant="outline" onClick={resetForm}>
                  ยกเลิก
                </Button>
              </div>
            </form>
          </CardContent>
        </Card>
      )}

      {/* Faculty List */}
      <div className="grid gap-4">
        {isLoading ? (
          <div>กำลังโหลด...</div>
        ) : (
          filteredFaculty.map((member) => (
            <Card key={member.id}>
              <CardContent className="p-6">
                <div className="flex justify-between items-start">
                  <div className="flex-1">
                    <h3 className="font-semibold text-lg mb-1">{member.name_thai}</h3>
                    {member.name_english && <p className="text-muted-foreground mb-2">{member.name_english}</p>}
                    <p className="text-sm font-medium text-red-600 mb-2">{member.position}</p>
                    {member.bio && <p className="text-muted-foreground mb-3 line-clamp-2">{member.bio}</p>}
                    <div className="text-sm text-muted-foreground">
                      {member.email && <div>อีเมล: {member.email}</div>}
                      {member.phone && <div>โทร: {member.phone}</div>}
                    </div>
                  </div>
                  <div className="flex gap-2 ml-4">
                    <Button variant="outline" size="sm" onClick={() => handleEdit(member)}>
                      <Edit className="h-4 w-4" />
                    </Button>
                    <Button variant="outline" size="sm" onClick={() => handleDelete(member.id)}>
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
