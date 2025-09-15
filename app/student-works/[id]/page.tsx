import { Header } from "@/components/header"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { createClient } from "@/lib/supabase/server"
import { ArrowLeft, Calendar, Clock } from "lucide-react"
import Link from "next/link"
import { notFound } from "next/navigation"

interface StudentWorkDetailPageProps {
  params: Promise<{ id: string }>
}

export default async function StudentWorkDetailPage({ params }: StudentWorkDetailPageProps) {
  const { id } = await params
  const supabase = await createClient()

  const { data: work } = await supabase.from("student_works").select("*").eq("id", id).single()

  if (!work) {
    notFound()
  }

  // Get related works
  const { data: relatedWorks } = await supabase
    .from("student_works")
    .select("*")
    .eq("category", work.category)
    .neq("id", id)
    .limit(3)

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />

      {/* Back Navigation */}
      <section className="bg-white border-b py-4">
        <div className="container mx-auto px-4">
          <Link href="/student-works">
            <Button variant="ghost" className="gap-2">
              <ArrowLeft className="h-4 w-4" />
              กลับไปยังผลงานนักศึกษา
            </Button>
          </Link>
        </div>
      </section>

      {/* Work Detail */}
      <section className="py-12">
        <div className="container mx-auto px-4 max-w-4xl">
          <Card>
            <CardContent className="p-0">
              {/* Hero Image */}
              <img
                src={work.image_url || "/placeholder.svg?height=400&width=800&query=student project detail"}
                alt={work.title}
                className="w-full h-64 md:h-96 object-cover rounded-t-lg"
              />

              {/* Content */}
              <div className="p-8">
                {/* Meta Information */}
                <div className="flex flex-wrap items-center gap-4 mb-6 text-sm text-muted-foreground">
                  <div className="flex items-center gap-1">
                    <Calendar className="h-4 w-4" />
                    <span>{new Date(work.created_at).toLocaleDateString("th-TH")}</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <Clock className="h-4 w-4" />
                    <span>{work.read_time} นาทีในการอ่าน</span>
                  </div>
                  <Badge variant="secondary">{work.category}</Badge>
                </div>

                {/* Title */}
                <h1 className="text-3xl md:text-4xl font-bold mb-6 text-balance">{work.title}</h1>

                {/* Description */}
                <div className="prose prose-lg max-w-none mb-8">
                  <p className="text-lg text-muted-foreground leading-relaxed">{work.description}</p>

                  {/* Extended content - in a real app this would be rich text */}
                  <div className="mt-8 space-y-4">
                    <h2 className="text-2xl font-semibold">รายละเอียดโครงงาน</h2>
                    <p>
                      โครงงานนี้เป็นส่วนหนึ่งของการเรียนการสอนในหลักสูตรวิศวกรรมซอฟต์แวร์
                      ที่มุ่งเน้นการพัฒนาทักษะการเขียนโปรแกรมและการแก้ไขปัญหาของนักศึกษา
                    </p>

                    <h3 className="text-xl font-semibold mt-6">เทคโนโลยีที่ใช้</h3>
                    <p>
                      ในการพัฒนาโครงงานนี้ได้ใช้เทคโนโลยีที่ทันสมัยและเป็นที่นิยมในอุตสาหกรรม
                      เพื่อให้นักศึกษาได้เรียนรู้และฝึกฝนทักษะที่จำเป็นสำหรับการทำงานในอนาคต
                    </p>

                    <h3 className="text-xl font-semibold mt-6">ผลลัพธ์ที่ได้รับ</h3>
                    <p>โครงงานนี้ได้รับการประเมินและได้รับคะแนนที่ดี แสดงให้เห็นถึงความสามารถและความมุ่งมั่นของนักศึกษาในการเรียนรู้</p>
                  </div>
                </div>

                {/* Keywords */}
                {work.keywords && (
                  <div className="mb-8">
                    <h3 className="text-lg font-semibold mb-3">คำสำคัญ</h3>
                    <div className="flex flex-wrap gap-2">
                      {work.keywords.split(",").map((keyword, index) => (
                        <Badge key={index} variant="outline">
                          {keyword.trim()}
                        </Badge>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* Related Works */}
      {relatedWorks && relatedWorks.length > 0 && (
        <section className="py-12 bg-white">
          <div className="container mx-auto px-4">
            <h2 className="text-2xl font-bold mb-8 text-center">ผลงานที่เกี่ยวข้อง</h2>
            <div className="grid md:grid-cols-3 gap-6 max-w-6xl mx-auto">
              {relatedWorks.map((relatedWork) => (
                <Link key={relatedWork.id} href={`/student-works/${relatedWork.id}`}>
                  <Card className="hover:shadow-lg transition-shadow cursor-pointer h-full">
                    <CardContent className="p-0">
                      <img
                        src={
                          relatedWork.image_url || "/placeholder.svg?height=200&width=300&query=related student work"
                        }
                        alt={relatedWork.title}
                        className="w-full h-32 object-cover rounded-t-lg"
                      />
                      <div className="p-4">
                        <h3 className="font-semibold text-sm mb-2 line-clamp-2 text-balance">{relatedWork.title}</h3>
                        <p className="text-xs text-muted-foreground line-clamp-2">{relatedWork.description}</p>
                      </div>
                    </CardContent>
                  </Card>
                </Link>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Footer */}
      <footer className="bg-red-700 text-white py-8">
        <div className="container mx-auto px-4 text-center">
          <p className="text-sm">© 2024 คณะวิทยาศาสตร์และเทคโนโลยี มหาวิทยาลัยราชภัฏ</p>
        </div>
      </footer>
    </div>
  )
}
