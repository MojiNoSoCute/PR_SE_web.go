import { Header } from "@/components/header"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { createClient } from "@/lib/supabase/server"
import { Mail, Phone } from "lucide-react"
import Link from "next/link"

export default async function FacultyPage() {
  const supabase = await createClient()

  const { data: faculty } = await supabase.from("faculty").select("*").order("position", { ascending: true })

  // Group faculty by position
  const groupedFaculty = faculty?.reduce(
    (acc, member) => {
      const position = member.position || "อาจารย์"
      if (!acc[position]) {
        acc[position] = []
      }
      acc[position].push(member)
      return acc
    },
    {} as Record<string, typeof faculty>,
  )

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />

      {/* Page Header */}
      <section className="bg-red-700 text-white py-12">
        <div className="container mx-auto px-4">
          <h1 className="text-4xl font-bold mb-4">อาจารย์ประจำหลักสูตร</h1>
          <p className="text-xl text-red-100">คณาจารย์สาขาวิศวกรรมซอฟต์แวร์ คณะวิทยาศาสตร์และเทคโนโลยี</p>
        </div>
      </section>

      {/* Faculty Directory */}
      <section className="py-12">
        <div className="container mx-auto px-4">
          {groupedFaculty &&
            Object.entries(groupedFaculty).map(([position, members]) => (
              <div key={position} className="mb-12">
                <h2 className="text-2xl font-bold mb-6 text-red-700">{position}</h2>
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {members.map((member) => (
                    <Link key={member.id} href={`/faculty/${member.id}`}>
                      <Card className="hover:shadow-lg transition-shadow cursor-pointer h-full">
                        <CardContent className="p-6">
                          <div className="flex flex-col items-center text-center">
                            <div className="w-32 h-32 mb-4 rounded-full overflow-hidden bg-gray-200">
                              <img
                                src={member.image_url || "/placeholder.svg?height=128&width=128&query=faculty member"}
                                alt={member.name_thai}
                                className="w-full h-full object-cover"
                              />
                            </div>
                            <h3 className="font-bold text-lg mb-2 text-balance">{member.name_thai}</h3>
                            {member.name_english && (
                              <p className="text-sm text-muted-foreground mb-3">{member.name_english}</p>
                            )}
                            <Badge variant="secondary" className="mb-4">
                              {member.position}
                            </Badge>
                            {member.bio && (
                              <p className="text-sm text-muted-foreground line-clamp-3 mb-4">{member.bio}</p>
                            )}
                            <div className="space-y-2 text-sm">
                              {member.email && (
                                <div className="flex items-center gap-2 text-muted-foreground">
                                  <Mail className="h-4 w-4" />
                                  <span className="truncate">{member.email}</span>
                                </div>
                              )}
                              {member.phone && (
                                <div className="flex items-center gap-2 text-muted-foreground">
                                  <Phone className="h-4 w-4" />
                                  <span>{member.phone}</span>
                                </div>
                              )}
                            </div>
                          </div>
                        </CardContent>
                      </Card>
                    </Link>
                  ))}
                </div>
              </div>
            ))}
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
