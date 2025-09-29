import { Header } from "@/components/header"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { createClient } from "@/lib/supabase/server"
import { ArrowLeft, Calendar, Clock } from "lucide-react"
import Link from "next/link"
import { notFound } from "next/navigation"
import { dataProvider } from "@/lib/data-provider"

interface AnnouncementDetailPageProps {
  params: { id: string }
}

export default async function AnnouncementDetailPage({ params }: AnnouncementDetailPageProps) {
  const { id } = params
  
  // Try to get data from Supabase first, fallback to sample data
  let announcement = null
  
  try {
    const supabase = await createClient()
    const { data } = await supabase.from("announcements").select("*").eq("id", id).single()
    announcement = data
  } catch (error) {
    console.warn("Failed to fetch announcement from Supabase, using sample data")
  }
  
  // If Supabase failed, try to get from sample data
  if (!announcement) {
    const allAnnouncements = await dataProvider.getAnnouncements()
    announcement = allAnnouncements.find((ann: any) => ann.id === id) || null
  }
  
  if (!announcement) {
    notFound()
  }

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("th-TH", {
      year: "numeric",
      month: "long",
      day: "numeric",
    })
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />

      {/* Back Navigation */}
      <section className="bg-white border-b py-4">
        <div className="container mx-auto px-4">
          <Link href="/">
            <Button variant="ghost" className="gap-2">
              <ArrowLeft className="h-4 w-4" />
              กลับไปยังหน้าหลัก
            </Button>
          </Link>
        </div>
      </section>

      {/* Announcement Detail */}
      <section className="py-12">
        <div className="container mx-auto px-4 max-w-4xl">
          <Card>
            <CardHeader>
              <div className="space-y-6">
                {/* Meta Information */}
                <div className="flex flex-wrap items-center gap-4 text-sm text-muted-foreground">
                  <div className="flex items-center gap-1">
                    <Calendar className="h-4 w-4" />
                    <span>{formatDate(announcement.published_at)}</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <Clock className="h-4 w-4" />
                    <span>ข่าวประชาสัมพันธ์</span>
                  </div>
                  {announcement.category && <Badge variant="secondary">{announcement.category}</Badge>}
                </div>

                {/* Title */}
                <CardTitle className="text-3xl font-bold text-balance">{announcement.title}</CardTitle>
              </div>
            </CardHeader>

            <CardContent className="space-y-8">
              {/* Image */}
              {announcement.image_url && (
                <div className="rounded-lg overflow-hidden">
                  <img
                    src={announcement.image_url}
                    alt={announcement.title}
                    className="w-full h-auto object-cover"
                  />
                </div>
              )}

              {/* Content */}
              <div className="prose max-w-none">
                <p className="text-muted-foreground leading-relaxed text-pretty">
                  {announcement.content}
                </p>
              </div>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-red-700 text-white py-8">
        <div className="container mx-auto px-4 text-center">
          <p className="text-sm">© 2024 คณะวิทยาศาสตร์และเทคโนโลยี มหาวิทยาลัยราชภัฏ</p>
        </div>
      </footer>
    </div>
  )
}