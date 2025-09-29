import { Header } from "@/components/header"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { createClient } from "@/lib/supabase/server"
import { Calendar, Users, ExternalLink, FileText } from "lucide-react"
import Link from "next/link"

interface Publication {
  id: string
  title: string
  abstract: string | null
  authors: string[] | null
  journal: string | null
  publication_date: string | null
  category: string | null
  keywords: string | null
  pdf_url: string | null
}

export default async function PublicationsPage() {
  const supabase = await createClient()

  const { data: publications } = await supabase
    .from("publications")
    .select("*")
    .order("publication_date", { ascending: false })

  // Get unique categories and years for filtering
  const categories = [...new Set(publications?.map((pub) => pub.category).filter(Boolean) || [])]
  const years = [
    ...new Set(publications?.map((pub) => new Date(pub.publication_date || "").getFullYear()).filter(Boolean) || []),
  ].sort((a, b) => b - a)

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />

      {/* Page Header */}
      <section className="bg-red-700 text-white py-12">
        <div className="container mx-auto px-4">
          <h1 className="text-4xl font-bold mb-4">ผลงานวิจัยและบทความ</h1>
          <p className="text-xl text-red-100">ผลงานวิจัยและบทความวิชาการของอาจารย์สาขาวิศวกรรมซอฟต์แวร์</p>
        </div>
      </section>

      {/* Filter Section */}
      <section className="py-8 bg-white border-b">
        <div className="container mx-auto px-4">
          <div className="flex flex-wrap gap-4 items-center">
            <div className="flex flex-wrap gap-2">
              <span className="text-sm font-medium text-muted-foreground">หมวดหมู่:</span>
              <Badge variant="default" className="bg-red-600 hover:bg-red-700">
                ทั้งหมด
              </Badge>
              {categories.map((category) => (
                <Badge key={category} variant="outline" className="hover:bg-red-50">
                  {category}
                </Badge>
              ))}
            </div>
            <div className="flex flex-wrap gap-2">
              <span className="text-sm font-medium text-muted-foreground">ปี:</span>
              {years.slice(0, 5).map((year) => (
                <Badge key={year} variant="outline" className="hover:bg-red-50">
                  {year}
                </Badge>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Publications List */}
      <section className="py-12">
        <div className="container mx-auto px-4 max-w-6xl">
          <div className="space-y-6">
            {publications?.map((publication: Publication) => (
              <Link key={publication.id} href={`/publications/${publication.id}`} className="block">
                <Card className="hover:shadow-lg transition-shadow cursor-pointer">
                  <CardHeader>
                    <div className="flex justify-between items-start gap-4">
                      <div className="flex-1">
                        <CardTitle className="text-xl mb-3 text-balance hover:text-red-600">
                          {publication.title}
                        </CardTitle>
                        <div className="flex flex-wrap items-center gap-4 text-sm text-muted-foreground mb-3">
                          {publication.publication_date && (
                            <div className="flex items-center gap-1">
                              <Calendar className="h-4 w-4" />
                              <span>{new Date(publication.publication_date).toLocaleDateString("th-TH")}</span>
                            </div>
                          )}
                          {publication.journal && (
                            <div className="flex items-center gap-1">
                              <FileText className="h-4 w-4" />
                              <span>{publication.journal}</span>
                            </div>
                          )}
                          {publication.authors && publication.authors.length > 0 && (
                            <div className="flex items-center gap-1">
                              <Users className="h-4 w-4" />
                              <span>{publication.authors.join(", ")}</span>
                            </div>
                          )}
                        </div>
                        <div className="flex flex-wrap gap-2 mb-3">
                          {publication.category && <Badge variant="secondary">{publication.category}</Badge>}
                          {publication.keywords &&
                            publication.keywords
                              .split(",")
                              .slice(0, 3)
                              .map((keyword: string, index: number) => (
                                <Badge key={index} variant="outline" className="text-xs">
                                  {keyword.trim()}
                                </Badge>
                              ))}
                        </div>
                      </div>
                      <div className="flex flex-col gap-2">
                        <Link href={`/publications/${publication.id}`}>
                          <Button variant="outline" size="sm">
                            อ่านเพิ่มเติม
                          </Button>
                        </Link>
                        {publication.pdf_url && (
                          <Button variant="outline" size="sm" className="gap-1 bg-transparent">
                            <ExternalLink className="h-3 w-3" />
                            PDF
                          </Button>
                        )}
                      </div>
                    </div>
                  </CardHeader>
                  {publication.abstract && (
                    <CardContent>
                      <p className="text-muted-foreground line-clamp-3 text-pretty">{publication.abstract}</p>
                    </CardContent>
                  )}
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