"use client"

import { Button } from "@/components/ui/button"
import { createClient } from "@/lib/supabase/client"
import { useRouter } from "next/navigation"
import { LayoutDashboard, FileText, Users, BookOpen, Megaphone, LogOut, User } from "lucide-react"

interface AdminSidebarProps {
  user: any
  activeTab: string
  setActiveTab: (tab: string) => void
}

export function AdminSidebar({ user, activeTab, setActiveTab }: AdminSidebarProps) {
  const router = useRouter()

  const handleLogout = async () => {
    const supabase = createClient()
    await supabase.auth.signOut()
    router.push("/admin/login")
  }

  const menuItems = [
    { id: "overview", label: "ภาพรวม", icon: LayoutDashboard },
    { id: "student-works", label: "ผลงานนักศึกษา", icon: FileText },
    { id: "faculty", label: "อาจารย์", icon: Users },
    { id: "publications", label: "ผลงานวิจัย", icon: BookOpen },
    { id: "announcements", label: "ประกาศ", icon: Megaphone },
  ]

  return (
    <div className="w-64 bg-white border-r border-gray-200 min-h-screen">
      <div className="p-6 border-b border-gray-200">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-red-600 rounded-full flex items-center justify-center">
            <User className="h-5 w-5 text-white" />
          </div>
          <div>
            <h3 className="font-semibold text-sm">ผู้ดูแลระบบ</h3>
            <p className="text-xs text-muted-foreground">{user?.email}</p>
          </div>
        </div>
      </div>

      <nav className="p-4">
        <div className="space-y-2">
          {menuItems.map((item) => {
            const Icon = item.icon
            return (
              <Button
                key={item.id}
                variant={activeTab === item.id ? "default" : "ghost"}
                className={`w-full justify-start ${activeTab === item.id ? "bg-red-600 hover:bg-red-700" : ""}`}
                onClick={() => setActiveTab(item.id)}
              >
                <Icon className="h-4 w-4 mr-3" />
                {item.label}
              </Button>
            )
          })}
        </div>

        <div className="mt-8 pt-4 border-t border-gray-200">
          <Button variant="ghost" className="w-full justify-start" onClick={handleLogout}>
            <LogOut className="h-4 w-4 mr-3" />
            ออกจากระบบ
          </Button>
        </div>
      </nav>
    </div>
  )
}
