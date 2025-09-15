import { redirect } from "next/navigation"
import { createClient } from "@/lib/supabase/server"
import { AdminDashboard } from "@/components/admin/admin-dashboard"

export default async function AdminPage() {
  const supabase = await createClient()

  const { data, error } = await supabase.auth.getUser()
  if (error || !data?.user) {
    redirect("/admin/login")
  }

  // Get dashboard statistics
  const [studentWorksResult, facultyResult, publicationsResult, announcementsResult] = await Promise.all([
    supabase.from("student_works").select("id", { count: "exact" }),
    supabase.from("faculty").select("id", { count: "exact" }),
    supabase.from("publications").select("id", { count: "exact" }),
    supabase.from("announcements").select("id", { count: "exact" }),
  ])

  const stats = {
    studentWorks: studentWorksResult.count || 0,
    faculty: facultyResult.count || 0,
    publications: publicationsResult.count || 0,
    announcements: announcementsResult.count || 0,
  }

  // Get recent content
  const { data: recentStudentWorks } = await supabase
    .from("student_works")
    .select("*")
    .order("created_at", { ascending: false })
    .limit(5)

  const { data: recentPublications } = await supabase
    .from("publications")
    .select("*")
    .order("created_at", { ascending: false })
    .limit(5)

  return (
    <AdminDashboard
      user={data.user}
      stats={stats}
      recentStudentWorks={recentStudentWorks || []}
      recentPublications={recentPublications || []}
    />
  )
}
