import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Calendar, Users } from "lucide-react"
import Link from "next/link"

interface Publication {
  id: string
  title: string
  abstract: string | null
  authors: string[] | null
  journal: string | null
  publication_date: string | null
  category: string | null
}

interface PublicationsPreviewProps {
  publications: Publication[]
}

export function PublicationsPreview({ publications }: PublicationsPreviewProps) {
  return (
    <section className="py-16 bg-white">
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center mb-12">
          <h2 className="text-3xl font-bold">ผลงานวิจัยล่าสุด</h2>
          <Link href="/publications">
            <Button variant="outline" className="border-red-600 text-red-600 hover:bg-red-50 bg-transparent">
              ดูทั้งหมด
            </Button>
          </Link>
        </div>

        {/* Featured Publication */}
        {publications.length > 0 && (
          <div className="mb-12">
            <Card className="bg-red-50 border-red-200">
              <CardContent className="p-8">
                <div className="flex items-center gap-4 mb-6">
                  <div className="flex gap-1">
                    {[...Array(5)].map((_, i) => (
                      <div key={i} className="w-8 h-8 bg-yellow-400 rounded-full flex items-center justify-center">
                        <span className="text-white text-sm">★</span>
                      </div>
                    ))}
                  </div>
                </div>
                <h3 className="text-xl font-bold mb-4 text-balance">
                  สถาบันวิจัยและพัฒนา
                  <br />
                  มหาวิทยาลัยราชภัฏ
                  <br />
                  ขอแสดงความยินดีกับ
                </h3>
                <div className="text-center">
                  <p className="text-lg font-semibold">อ.ดร.วรเชษฐ์ อุกรา</p>
                  <p className="text-sm text-muted-foreground mt-2">
                    ได้รับการพิมพ์ผลงานวิจัยระดับชาติ
                    <br />
                    วารสาร Interdisciplinary Research Review
                    <br />
                    อยู่ในฐานข้อมูล TCI กลุ่มที่ 1
                  </p>
                </div>
              </CardContent>
            </Card>
          </div>
        )}

        {/* Recent Publications */}
        <div className="grid md:grid-cols-2 gap-6">
          {publications.slice(0, 4).map((publication) => (
            <Card key={publication.id} className="hover:shadow-lg transition-shadow">
              <CardHeader>
                <CardTitle className="text-lg text-balance">
                  <Link href={`/publications/${publication.id}`} className="hover:text-red-600">
                    {publication.title}
                  </Link>
                </CardTitle>
                <div className="flex flex-wrap items-center gap-3 text-sm text-muted-foreground">
                  {publication.publication_date && (
                    <div className="flex items-center gap-1">
                      <Calendar className="h-3 w-3" />
                      <span>{new Date(publication.publication_date).getFullYear()}</span>
                    </div>
                  )}
                  {publication.authors && publication.authors.length > 0 && (
                    <div className="flex items-center gap-1">
                      <Users className="h-3 w-3" />
                      <span>{publication.authors[0]}</span>
                      {publication.authors.length > 1 && <span> และคณะ</span>}
                    </div>
                  )}
                  {publication.category && (
                    <Badge variant="secondary" className="text-xs">
                      {publication.category}
                    </Badge>
                  )}
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
  )
}
