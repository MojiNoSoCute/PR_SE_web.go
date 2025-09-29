import { Header } from "@/components/header"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { createClient } from "@/lib/supabase/server"
import Link from "next/link"

export default async function StudentWorksPage() {
  const supabase = await createClient()

  const { data: studentWorks } = await supabase
    .from("student_works")
    .select("*")
    .order("created_at", { ascending: false })

  const categories = [...new Set(studentWorks?.map((work) => work.category) || [])]

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />

      {/* Page Header */}
      <section className="bg-red-700 text-white py-12">
        <div className="container mx-auto px-4">
          <h1 className="text-4xl font-bold mb-4">ผลงานนักศึกษา</h1>
          <p className="text-xl text-red-100">แสดงผลงานและโครงงานของนักศึกษาสาขาวิศวกรรมซอฟต์แวร์</p>
        </div>
      </section>

      {/* Filter Section */}
      <section className="py-8 bg-white border-b">
        <div className="container mx-auto px-4">
          <div className="flex flex-wrap gap-2">
            <Badge variant="default" className="bg-red-600 hover:bg-red-700">
              ทั้งหมด
            </Badge>
            {categories.map((category) => (
              <Badge key={category} variant="outline" className="hover:bg-red-50">
                {category}
              </Badge>
            ))}
          </div>
        </div>
      </section>

      {/* Student Works Grid */}
      <section className="py-12">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {studentWorks?.map((work) => (
              <Link key={work.id} href={`/student-works/${work.id}`} className="block h-full">
                <Card className="hover:shadow-lg transition-shadow cursor-pointer h-full">
                  <CardHeader className="p-0">
                    <img
                      src={work.image_url || "/placeholder.svg?height=250&width=400&query=student project"}
                      alt={work.title}
                      className="w-full h-48 object-cover rounded-t-lg"
                    />
                  </CardHeader>
                  <CardContent className="p-6">
                    <div className="flex items-center gap-2 mb-3">
                      <Badge variant="secondary" className="text-xs">
                        {work.category}
                      </Badge>
                      <span className="text-xs text-muted-foreground">{work.read_time} นาทีในการอ่าน</span>
                    </div>
                    <CardTitle className="text-lg mb-3 text-balance line-clamp-2">{work.title}</CardTitle>
                    <p className="text-sm text-muted-foreground text-pretty line-clamp-3">{work.description}</p>
                    {work.keywords && (
                      <div className="mt-4 flex flex-wrap gap-1">
                        {work.keywords
                          .split(",")
                          .slice(0, 3)
                          .map((keyword: string, index: number) => (
                            <Badge key={index} variant="outline" className="text-xs">
                              {keyword.trim()}
                            </Badge>
                          ))}
                      </div>
                    )}
                  </CardContent>
                </Card>
              </Link>
            ))}
          </div>
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