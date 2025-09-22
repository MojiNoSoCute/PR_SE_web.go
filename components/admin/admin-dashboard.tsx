"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent } from "@/components/ui/tabs"
import { AdminSidebar } from "./admin-sidebar"
import { StudentWorksManager } from "./student-works-manager"
import { FacultyManager } from "./faculty-manager"
import { PublicationsManager } from "./publications-manager"
import { AnnouncementsManager } from "./announcements-manager"
import { Users, FileText, BookOpen, Megaphone, Eye, Plus } from "lucide-react"
import Link from "next/link"

interface AdminDashboardProps {
  user: any
  stats: {
    studentWorks: number
    faculty: number
    publications: number
    announcements: number
  }
  recentStudentWorks: any[]
  recentPublications: any[]
}

export function AdminDashboard({ user, stats, recentStudentWorks, recentPublications }: AdminDashboardProps) {
  const [activeTab, setActiveTab] = useState("overview")

  // Debug logging
  console.log('AdminDashboard received props:', {
    user,
    stats,
    recentStudentWorks,
    recentPublications
  })

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="flex">
        <AdminSidebar user={user} activeTab={activeTab} setActiveTab={setActiveTab} />

        <main className="flex-1 p-8">
          <div className="max-w-7xl mx-auto">
            <div className="mb-8">
              <h1 className="text-3xl font-bold text-gray-900">แดชบอร์ดผู้ดูแลระบบ</h1>
              <p className="text-gray-600 mt-2">จัดการเนื้อหาเว็บไซต์มหาวิทยาลัย</p>
            </div>

            <Tabs value={activeTab} onValueChange={setActiveTab}>
              <TabsContent value="overview">
                {/* Statistics Cards */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
                  <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
                    <div className="flex flex-row items-center justify-between space-y-0 pb-2">
                      <h3 className="text-sm font-medium">ผลงานนักศึกษา</h3>
                      <FileText className="h-4 w-4 text-gray-400" />
                    </div>
                    <div className="pt-2">
                      <div className="text-2xl font-bold">{stats.studentWorks}</div>
                      <p className="text-xs text-gray-600">รายการทั้งหมด</p>
                    </div>
                  </div>

                  <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
                    <div className="flex flex-row items-center justify-between space-y-0 pb-2">
                      <h3 className="text-sm font-medium">อาจารย์</h3>
                      <Users className="h-4 w-4 text-gray-400" />
                    </div>
                    <div className="pt-2">
                      <div className="text-2xl font-bold">{stats.faculty}</div>
                      <p className="text-xs text-gray-600">คนทั้งหมด</p>
                    </div>
                  </div>

                  <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
                    <div className="flex flex-row items-center justify-between space-y-0 pb-2">
                      <h3 className="text-sm font-medium">ผลงานวิจัย</h3>
                      <BookOpen className="h-4 w-4 text-gray-400" />
                    </div>
                    <div className="pt-2">
                      <div className="text-2xl font-bold">{stats.publications}</div>
                      <p className="text-xs text-gray-600">บทความทั้งหมด</p>
                    </div>
                  </div>

                  <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
                    <div className="flex flex-row items-center justify-between space-y-0 pb-2">
                      <h3 className="text-sm font-medium">ประกาศ</h3>
                      <Megaphone className="h-4 w-4 text-gray-400" />
                    </div>
                    <div className="pt-2">
                      <div className="text-2xl font-bold">{stats.announcements}</div>
                      <p className="text-xs text-gray-600">รายการทั้งหมด</p>
                    </div>
                  </div>
                </div>

                {/* Quick Actions */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
                  <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
                    <div className="mb-4">
                      <h3 className="flex items-center gap-2 text-lg font-semibold">
                        <Plus className="h-5 w-5" />
                        เพิ่มเนื้อหาใหม่
                      </h3>
                    </div>
                    <div className="space-y-3">
                      <button
                        onClick={() => setActiveTab("student-works")}
                        className="w-full flex items-center justify-start p-3 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
                      >
                        <FileText className="h-4 w-4 mr-2" />
                        เพิ่มผลงานนักศึกษา
                      </button>
                      <button
                        onClick={() => setActiveTab("faculty")}
                        className="w-full flex items-center justify-start p-3 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
                      >
                        <Users className="h-4 w-4 mr-2" />
                        เพิ่มข้อมูลอาจารย์
                      </button>
                      <button
                        onClick={() => setActiveTab("publications")}
                        className="w-full flex items-center justify-start p-3 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
                      >
                        <BookOpen className="h-4 w-4 mr-2" />
                        เพิ่มผลงานวิจัย
                      </button>
                      <button
                        onClick={() => setActiveTab("announcements")}
                        className="w-full flex items-center justify-start p-3 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
                      >
                        <Megaphone className="h-4 w-4 mr-2" />
                        เพิ่มประกาศ
                      </button>
                    </div>
                  </div>

                  <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
                    <div className="mb-4">
                      <h3 className="flex items-center gap-2 text-lg font-semibold">
                        <Eye className="h-5 w-5" />
                        ดูเว็บไซต์
                      </h3>
                    </div>
                    <div className="space-y-3">
                      <Link href="/">
                        <div className="w-full flex items-center justify-start p-3 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors cursor-pointer">
                          หน้าแรก
                        </div>
                      </Link>
                      <Link href="/student-works">
                        <div className="w-full flex items-center justify-start p-3 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors cursor-pointer">
                          ผลงานนักศึกษา
                        </div>
                      </Link>
                      <Link href="/faculty">
                        <div className="w-full flex items-center justify-start p-3 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors cursor-pointer">
                          อาจารย์
                        </div>
                      </Link>
                      <Link href="/publications">
                        <div className="w-full flex items-center justify-start p-3 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors cursor-pointer">
                          ผลงานวิจัย
                        </div>
                      </Link>
                    </div>
                  </div>
                </div>

                {/* Recent Content */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                  <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
                    <div className="mb-4">
                      <h3 className="text-lg font-semibold">ผลงานนักศึกษาล่าสุด</h3>
                    </div>
                    <div className="space-y-3">
                      {recentStudentWorks && recentStudentWorks.length > 0 ? (
                        recentStudentWorks.slice(0, 5).map((work) => (
                          <div key={work.id} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg border">
                            <div className="flex-1">
                              <h4 className="font-medium text-sm line-clamp-1">{work.title}</h4>
                              <p className="text-xs text-gray-600">
                                {work.created_at 
                                  ? new Date(work.created_at).toLocaleDateString("th-TH")
                                  : 'เมื่อเร็วๆ นี้'
                                }
                              </p>
                            </div>
                            <div className="ml-3">
                              <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-gray-100 text-gray-800">
                                {work.category}
                              </span>
                            </div>
                          </div>
                        ))
                      ) : (
                        <div className="text-center text-gray-500 py-4">
                          ไม่มีผลงานนักศึกษา
                        </div>
                      )}
                    </div>
                  </div>

                  <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
                    <div className="mb-4">
                      <h3 className="text-lg font-semibold">ผลงานวิจัยล่าสุด</h3>
                    </div>
                    <div className="space-y-3">
                      {recentPublications && recentPublications.length > 0 ? (
                        recentPublications.slice(0, 5).map((publication) => (
                          <div
                            key={publication.id}
                            className="flex items-center justify-between p-3 bg-gray-50 rounded-lg border"
                          >
                            <div className="flex-1">
                              <h4 className="font-medium text-sm line-clamp-1">{publication.title}</h4>
                              <p className="text-xs text-gray-600">
                                {publication.publication_date
                                  ? new Date(publication.publication_date).toLocaleDateString("th-TH")
                                  : publication.created_at
                                  ? new Date(publication.created_at).toLocaleDateString("th-TH")
                                  : 'เมื่อเร็วๆ นี้'
                                }
                              </p>
                            </div>
                            <div className="ml-3">
                              <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-gray-100 text-gray-800">
                                {publication.category}
                              </span>
                            </div>
                          </div>
                        ))
                      ) : (
                        <div className="text-center text-gray-500 py-4">
                          ไม่มีผลงานวิจัย
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              </TabsContent>

              <TabsContent value="student-works">
                <StudentWorksManager />
              </TabsContent>

              <TabsContent value="faculty">
                <FacultyManager />
              </TabsContent>

              <TabsContent value="publications">
                <PublicationsManager />
              </TabsContent>

              <TabsContent value="announcements">
                <AnnouncementsManager />
              </TabsContent>
            </Tabs>
          </div>
        </main>
      </div>
    </div>
  )
}
