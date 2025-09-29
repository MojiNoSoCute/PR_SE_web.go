import { Header } from "@/components/header"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { createClient } from "@/lib/supabase/server"
import { ArrowLeft, Mail, Phone, GraduationCap, BookOpen } from "lucide-react"
import Link from "next/link"
import { notFound } from "next/navigation"

interface FacultyDetailPageProps {
  params: { id: string }
}

export default async function FacultyDetailPage({ params }: FacultyDetailPageProps) {
  const { id } = params
  const supabase = await createClient()

  const { data: faculty } = await supabase.from("faculty").select("*").eq("id", id).single()

  if (!faculty) {
    notFound()
  }

  // Get faculty publications
  const { data: publications } = await supabase
    .from("publications")
    .select("*")
    .contains("authors", [faculty.name_thai])
    .order("publication_date", { ascending: false })

  // Get other faculty members from same department
  const { data: colleagues } = await supabase
    .from("faculty")
    .select("*")
    .eq("department", faculty.department)
    .neq("id", id)
    .limit(4)

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />

      {/* Back Navigation */}
      <section className="bg-white border-b py-4">
        <div className="container mx-auto px-4">
          <Link href="/faculty">
            <Button variant="ghost" className="gap-2">
              <ArrowLeft className="h-4 w-4" />
              กลับไปยังรายชื่ออาจารย์
            </Button>
          </Link>
        </div>
      </section>

      {/* Faculty Profile */}
      <section className="py-12">
        <div className="container mx-auto px-4 max-w-4xl">
          <Card>
            <CardContent className="p-8">
              <div className="grid md:grid-cols-3 gap-8">
                {/* Profile Image and Basic Info */}
                <div className="text-center">
                  <div className="w-48 h-48 mx-auto mb-6 rounded-full overflow-hidden bg-gray-200">
                    <img
                      src={faculty.image_url || "/placeholder.svg?height=192&width=192&query=faculty member"}
                      alt={faculty.name_thai}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <Badge variant="secondary" className="mb-4">
                    {faculty.position}
                  </Badge>
                  <div className="space-y-3">
                    {faculty.email && (
                      <div className="flex items-center gap-2 text-sm">
                        <Mail className="h-4 w-4 text-muted-foreground" />
                        <a href={`mailto:${faculty.email}`} className="text-blue-600 hover:underline">
                          {faculty.email}
                        </a>
                      </div>
                    )}
                    {faculty.phone && (
                      <div className="flex items-center gap-2 text-sm">
                        <Phone className="h-4 w-4 text-muted-foreground" />
                        <span>{faculty.phone}</span>
                      </div>
                    )}
                  </div>
                </div>

                {/* Detailed Information */}
                <div className="md:col-span-2">
                  <h1 className="text-3xl font-bold mb-2 text-balance">{faculty.name_thai}</h1>
                  {faculty.name_english && <p className="text-xl text-muted-foreground mb-4">{faculty.name_english}</p>}
                  <p className="text-lg text-red-600 mb-6">{faculty.department}</p>

                  {faculty.bio && (
                    <div className="mb-8">
                      <h2 className="text-xl font-semibold mb-3 flex items-center gap-2">
                        <GraduationCap className="h-5 w-5" />
                        ประวัติการศึกษาและประสบการณ์
                      </h2>
                      <p className="text-muted-foreground leading-relaxed">{faculty.bio}</p>
                    </div>
                  )}

                  {/* Sample additional information */}
                  <div className="space-y-6">
                    <div>
                      <h3 className="text-lg font-semibold mb-3">สาขาความเชี่ยวชาญ</h3>
                      <div className="flex flex-wrap gap-2">
                        <Badge variant="outline">วิศวกรรมซอฟต์แวร์</Badge>
                        <Badge variant="outline">การพัฒนาเว็บแอปพลิเคชัน</Badge>
                        <Badge variant="outline">ปัญญาประดิษฐ์</Badge>
                        <Badge variant="outline">การจัดการโครงการ</Badge>
                      </div>
                    </div>

                    <div>
                      <h3 className="text-lg font-semibold mb-3">วุฒิการศึกษา</h3>
                      <div className="space-y-2 text-sm">
                        <div className="flex justify-between">
                          <span>ปริญญาเอก วิศวกรรมซอฟต์แวร์</span>
                          <span className="text-muted-foreground">มหาวิทยาลัยเทคโนโลยีพระจอมเกล้าธนบุรี</span>
                        </div>
                        <div className="flex justify-between">
                          <span>ปริญญาโท วิทยาการคอมพิวเตอร์</span>
                          <span className="text-muted-foreground">จุฬาลงกรณ์มหาวิทยาลัย</span>
                        </div>
                        <div className="flex justify-between">
                          <span>ปริญญาตรี วิศวกรรมคอมพิวเตอร์</span>
                          <span className="text-muted-foreground">มหาวิทยาลัยเกษตรศาสตร์</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* Publications */}
      {publications && publications.length > 0 && (
        <section className="py-12 bg-white">
          <div className="container mx-auto px-4 max-w-4xl">
            <h2 className="text-2xl font-bold mb-8 flex items-center gap-2">
              <BookOpen className="h-6 w-6" />
              ผลงานวิจัยและบทความ
            </h2>
            <div className="space-y-4">
              {publications.map((publication) => (
                <Card key={publication.id}>
                  <CardHeader>
                    <CardTitle className="text-lg text-balance">{publication.title}</CardTitle>
                    <div className="flex items-center gap-4 text-sm text-muted-foreground">
                      <span>{publication.journal}</span>
                      {publication.publication_date && (
                        <span>{new Date(publication.publication_date).getFullYear()}</span>
                      )}
                      {publication.category && <Badge variant="outline">{publication.category}</Badge>}
                    </div>
                  </CardHeader>
                  {publication.abstract && (
                    <CardContent>
                      <p className="text-sm text-muted-foreground line-clamp-3">{publication.abstract}</p>
                    </CardContent>
                  )}
                </Card>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Colleagues */}
      {colleagues && colleagues.length > 0 && (
        <section className="py-12 bg-gray-50">
          <div className="container mx-auto px-4 max-w-4xl">
            <h2 className="text-2xl font-bold mb-8 text-center">อาจารย์ท่านอื่นในภาควิชา</h2>
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
              {colleagues.map((colleague) => (
                <Link key={colleague.id} href={`/faculty/${colleague.id}`}>
                  <Card className="hover:shadow-lg transition-shadow cursor-pointer text-center">
                    <CardContent className="p-4">
                      <div className="w-20 h-20 mx-auto mb-3 rounded-full overflow-hidden bg-gray-200">
                        <img
                          src={colleague.image_url || "/placeholder.svg?height=80&width=80&query=faculty member"}
                          alt={colleague.name_thai}
                          className="w-full h-full object-cover"
                        />
                      </div>
                      <h3 className="font-semibold text-sm text-balance">{colleague.name_thai}</h3>
                      <p className="text-xs text-muted-foreground mt-1">{colleague.position}</p>
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