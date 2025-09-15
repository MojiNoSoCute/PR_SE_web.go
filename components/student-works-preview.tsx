import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import Link from "next/link"

interface StudentWork {
  id: string
  title: string
  description: string
  image_url: string | null
  category: string
  keywords: string | null
  read_time: number
  created_at: string
}

interface StudentWorksPreviewProps {
  works: StudentWork[]
}

export function StudentWorksPreview({ works }: StudentWorksPreviewProps) {
  return (
    <section className="py-16 bg-red-700">
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center mb-8">
          <h2 className="text-3xl font-bold text-white">ผลงานนักศึกษา</h2>
          <Link href="/student-works">
            <Button variant="outline" className="bg-white text-red-700 hover:bg-red-50">
              ดูทั้งหมด
            </Button>
          </Link>
        </div>
        <div className="grid md:grid-cols-3 gap-6">
          {works.slice(0, 3).map((work) => (
            <Link key={work.id} href={`/student-works/${work.id}`}>
              <Card className="bg-white hover:shadow-lg transition-shadow cursor-pointer h-full">
                <CardHeader className="p-0">
                  <img
                    src={work.image_url || "/placeholder.svg?height=200&width=400&query=student project"}
                    alt={work.title}
                    className="w-full h-48 object-cover rounded-t-lg"
                  />
                </CardHeader>
                <CardContent className="p-4">
                  <div className="flex items-center gap-2 mb-2">
                    <Badge variant="secondary" className="text-xs">
                      {work.category}
                    </Badge>
                    <span className="text-xs text-muted-foreground">{work.read_time} นาที</span>
                  </div>
                  <CardTitle className="text-lg mb-2 text-balance line-clamp-2">{work.title}</CardTitle>
                  <p className="text-sm text-muted-foreground text-pretty line-clamp-3">{work.description}</p>
                </CardContent>
              </Card>
            </Link>
          ))}
        </div>
      </div>
    </section>
  )
}
