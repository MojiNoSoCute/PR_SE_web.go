import { Button } from "@/components/ui/button"
import Link from "next/link"

interface Faculty {
  id: string
  name_thai: string
  name_english: string | null
  position: string
  image_url: string | null
}

interface FacultyPreviewProps {
  faculty: Faculty[]
}

export function FacultyPreview({ faculty }: FacultyPreviewProps) {
  return (
    <section className="py-16 bg-gray-50">
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center mb-12">
          <h2 className="text-3xl font-bold text-center">อาจารย์ประจำหลักสูตร</h2>
          <Link href="/faculty">
            <Button variant="outline" className="border-red-600 text-red-600 hover:bg-red-50 bg-transparent">
              ดูทั้งหมด
            </Button>
          </Link>
        </div>
        <div className="grid md:grid-cols-5 gap-6">
          {faculty.slice(0, 5).map((member) => (
            <Link key={member.id} href={`/faculty/${member.id}`} className="block">
              <div className="text-center hover:transform hover:scale-105 transition-transform cursor-pointer">
                <div className="w-32 h-32 mx-auto mb-4 rounded-full overflow-hidden bg-gray-200">
                  <img
                    src={member.image_url || "/placeholder.svg?height=128&width=128&query=faculty member"}
                    alt={member.name_thai}
                    className="w-full h-full object-cover"
                  />
                </div>
                <h3 className="font-semibold text-sm text-balance">{member.name_thai}</h3>
                <p className="text-xs text-muted-foreground mt-1">{member.position}</p>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  )
}