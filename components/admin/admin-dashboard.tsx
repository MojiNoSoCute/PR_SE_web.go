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
                  <Card>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                      <CardTitle className="text-sm font-medium">ผลงานนักศึกษา</CardTitle>
                      <FileText className="h-4 w-4 text-muted-foreground" />
                    </CardHeader>
                    <CardContent>
                      <div className="text-2xl font-bold">{stats.studentWorks}</div>
                      <p className="text-xs text-muted-foreground">รายการทั้งหมด</p>
                    </CardContent>
                  </Card>

                  <Card>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                      <CardTitle className="text-sm font-medium">อาจารย์</CardTitle>
                      <Users className="h-4 w-4 text-muted-foreground" />
                    </CardHeader>
                    <CardContent>
                      <div className="text-2xl font-bold">{stats.faculty}</div>
                      <p className="text-xs text-muted-foreground">คนทั้งหมด</p>
                    </CardContent>
                  </Card>

                  <Card>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                      <CardTitle className="text-sm font-medium">ผลงานวิจัย</CardTitle>
                      <BookOpen className="h-4 w-4 text-muted-foreground" />
                    </CardHeader>
                    <CardContent>
                      <div className="text-2xl font-bold">{stats.publications}</div>
                      <p className="text-xs text-muted-foreground">บทความทั้งหมด</p>
                    </CardContent>
                  </Card>

                  <Card>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                      <CardTitle className="text-sm font-medium">ประกาศ</CardTitle>
                      <Megaphone className="h-4 w-4 text-muted-foreground" />
                    </CardHeader>
                    <CardContent>
                      <div className="text-2xl font-bold">{stats.announcements}</div>
                      <p className="text-xs text-muted-foreground">รายการทั้งหมด</p>
                    </CardContent>
                  </Card>
                </div>

                {/* Quick Actions */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
                  <Card>
                    <CardHeader>
                      <CardTitle className="flex items-center gap-2">
                        <Plus className="h-5 w-5" />
                        เพิ่มเนื้อหาใหม่
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-3">
                      <Button
                        onClick={() => setActiveTab("student-works")}
                        variant="outline"
                        className="w-full justify-start"
                      >
                        <FileText className="h-4 w-4 mr-2" />
                        เพิ่มผลงานนักศึกษา
                      </Button>
                      <Button
                        onClick={() => setActiveTab("faculty")}
                        variant="outline"
                        className="w-full justify-start"
                      >
                        <Users className="h-4 w-4 mr-2" />
                        เพิ่มข้อมูลอาจารย์
                      </Button>
                      <Button
                        onClick={() => setActiveTab("publications")}
                        variant="outline"
                        className="w-full justify-start"
                      >
                        <BookOpen className="h-4 w-4 mr-2" />
                        เพิ่มผลงานวิจัย
                      </Button>
                      <Button
                        onClick={() => setActiveTab("announcements")}
                        variant="outline"
                        className="w-full justify-start"
                      >
                        <Megaphone className="h-4 w-4 mr-2" />
                        เพิ่มประกาศ
                      </Button>
                    </CardContent>
                  </Card>

                  <Card>
                    <CardHeader>
                      <CardTitle className="flex items-center gap-2">
                        <Eye className="h-5 w-5" />
                        ดูเว็บไซต์
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-3">
                      <Link href="/">
                        <Button variant="outline" className="w-full justify-start bg-transparent">
                          หน้าแรก
                        </Button>
                      </Link>
                      <Link href="/student-works">
                        <Button variant="outline" className="w-full justify-start bg-transparent">
                          ผลงานนักศึกษา
                        </Button>
                      </Link>
                      <Link href="/faculty">
                        <Button variant="outline" className="w-full justify-start bg-transparent">
                          อาจารย์
                        </Button>
                      </Link>
                      <Link href="/publications">
                        <Button variant="outline" className="w-full justify-start bg-transparent">
                          ผลงานวิจัย
                        </Button>
                      </Link>
                    </CardContent>
                  </Card>
                </div>

                {/* Recent Content */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                  <Card>
                    <CardHeader>
                      <CardTitle>ผลงานนักศึกษาล่าสุด</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-3">
                        {recentStudentWorks.slice(0, 5).map((work) => (
                          <div key={work.id} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                            <div>
                              <h4 className="font-medium text-sm line-clamp-1">{work.title}</h4>
                              <p className="text-xs text-muted-foreground">
                                {new Date(work.created_at).toLocaleDateString("th-TH")}
                              </p>
                            </div>
                            <Badge variant="secondary">{work.category}</Badge>
                          </div>
                        ))}
                      </div>
                    </CardContent>
                  </Card>

                  <Card>
                    <CardHeader>
                      <CardTitle>ผลงานวิจัยล่าสุด</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-3">
                        {recentPublications.slice(0, 5).map((publication) => (
                          <div
                            key={publication.id}
                            className="flex items-center justify-between p-3 bg-gray-50 rounded-lg"
                          >
                            <div>
                              <h4 className="font-medium text-sm line-clamp-1">{publication.title}</h4>
                              <p className="text-xs text-muted-foreground">
                                {publication.publication_date &&
                                  new Date(publication.publication_date).toLocaleDateString("th-TH")}
                              </p>
                            </div>
                            <Badge variant="secondary">{publication.category}</Badge>
                          </div>
                        ))}
                      </div>
                    </CardContent>
                  </Card>
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
