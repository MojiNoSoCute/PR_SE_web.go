import { Header } from "@/components/header"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { createClient } from "@/lib/supabase/server"
import { ArrowLeft, Calendar, Users, ExternalLink, FileText, Download } from "lucide-react"
import Link from "next/link"
import { notFound } from "next/navigation"

interface PublicationDetailPageProps {
  params: Promise<{ id: string }>
}

export default async function PublicationDetailPage({ params }: PublicationDetailPageProps) {
  const { id } = await params
  const supabase = await createClient()

  const { data: publication } = await supabase.from("publications").select("*").eq("id", id).single()

  if (!publication) {
    notFound()
  }

  // Get related publications
  const { data: relatedPublications } = await supabase
    .from("publications")
    .select("*")
    .eq("category", publication.category)
    .neq("id", id)
    .limit(3)

  // Get author details if available
  const authorNames = publication.authors || []
  const { data: authorProfiles } = await supabase.from("faculty").select("*").in("name_thai", authorNames)

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />

      {/* Back Navigation */}
      <section className="bg-white border-b py-4">
        <div className="container mx-auto px-4">
          <Link href="/publications">
            <Button variant="ghost" className="gap-2">
              <ArrowLeft className="h-4 w-4" />
              กลับไปยังผลงานวิจัย
            </Button>
          </Link>
        </div>
      </section>

      {/* Publication Detail */}
      <section className="py-12">
        <div className="container mx-auto px-4 max-w-4xl">
          <Card>
            <CardHeader>
              <div className="space-y-4">
                {/* Meta Information */}
                <div className="flex flex-wrap items-center gap-4 text-sm text-muted-foreground">
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
                  {publication.category && <Badge variant="secondary">{publication.category}</Badge>}
                </div>

                {/* Title */}
                <CardTitle className="text-3xl font-bold text-balance">{publication.title}</CardTitle>

                {/* Authors */}
                {publication.authors && publication.authors.length > 0 && (
                  <div>
                    <div className="flex items-center gap-2 mb-3">
                      <Users className="h-5 w-5 text-muted-foreground" />
                      <span className="font-semibold">ผู้เขียน:</span>
                    </div>
                    <div className="flex flex-wrap gap-3">
                      {publication.authors.map((author, index) => {
                        const authorProfile = authorProfiles?.find((profile) => profile.name_thai === author)
                        return authorProfile ? (
                          <Link key={index} href={`/faculty/${authorProfile.id}`}>
                            <Badge variant="outline" className="hover:bg-red-50 cursor-pointer">
                              {author}
                            </Badge>
                          </Link>
                        ) : (
                          <Badge key={index} variant="outline">
                            {author}
                          </Badge>
                        )
                      })}
                    </div>
                  </div>
                )}

                {/* Action Buttons */}
                <div className="flex gap-3">
                  {publication.pdf_url && (
                    <Button className="gap-2">
                      <Download className="h-4 w-4" />
                      ดาวน์โหลด PDF
                    </Button>
                  )}
                  {publication.doi && (
                    <Button variant="outline" className="gap-2 bg-transparent">
                      <ExternalLink className="h-4 w-4" />
                      DOI: {publication.doi}
                    </Button>
                  )}
                </div>
              </div>
            </CardHeader>

            <CardContent className="space-y-8">
              {/* Abstract */}
              {publication.abstract && (
                <div>
                  <h2 className="text-xl font-semibold mb-4">บทคัดย่อ</h2>
                  <p className="text-muted-foreground leading-relaxed">{publication.abstract}</p>
                </div>
              )}

              {/* Keywords */}
              {publication.keywords && (
                <div>
                  <h3 className="text-lg font-semibold mb-3">คำสำคัญ</h3>
                  <div className="flex flex-wrap gap-2">
                    {publication.keywords.split(",").map((keyword, index) => (
                      <Badge key={index} variant="outline">
                        {keyword.trim()}
                      </Badge>
                    ))}
                  </div>
                </div>
              )}

              {/* Publication Details */}
              <div className="grid md:grid-cols-2 gap-6 p-6 bg-gray-50 rounded-lg">
                <div>
                  <h3 className="font-semibold mb-2">รายละเอียดการตีพิมพ์</h3>
                  <div className="space-y-2 text-sm">
                    {publication.journal && (
                      <div>
                        <span className="font-medium">วารสาร:</span> {publication.journal}
                      </div>
                    )}
                    {publication.publication_date && (
                      <div>
                        <span className="font-medium">วันที่ตีพิมพ์:</span>{" "}
                        {new Date(publication.publication_date).toLocaleDateString("th-TH")}
                      </div>
                    )}
                    {publication.doi && (
                      <div>
                        <span className="font-medium">DOI:</span> {publication.doi}
                      </div>
                    )}
                  </div>
                </div>
                <div>
                  <h3 className="font-semibold mb-2">การอ้างอิง</h3>
                  <div className="text-sm bg-white p-3 rounded border">
                    <p className="font-mono text-xs">
                      {publication.authors?.join(", ")} ({new Date(publication.publication_date).getFullYear()}).{" "}
                      {publication.title}. <em>{publication.journal}</em>.
                      {publication.doi && ` DOI: ${publication.doi}`}
                    </p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* Related Publications */}
      {relatedPublications && relatedPublications.length > 0 && (
        <section className="py-12 bg-white">
          <div className="container mx-auto px-4 max-w-4xl">
            <h2 className="text-2xl font-bold mb-8 text-center">ผลงานที่เกี่ยวข้อง</h2>
            <div className="space-y-4">
              {relatedPublications.map((relatedPub) => (
                <Card key={relatedPub.id} className="hover:shadow-md transition-shadow">
                  <CardContent className="p-6">
                    <Link href={`/publications/${relatedPub.id}`}>
                      <h3 className="font-semibold text-lg mb-2 hover:text-red-600 text-balance">{relatedPub.title}</h3>
                    </Link>
                    <div className="flex items-center gap-4 text-sm text-muted-foreground mb-2">
                      {relatedPub.journal && <span>{relatedPub.journal}</span>}
                      {relatedPub.publication_date && (
                        <span>{new Date(relatedPub.publication_date).getFullYear()}</span>
                      )}
                    </div>
                    {relatedPub.abstract && (
                      <p className="text-sm text-muted-foreground line-clamp-2">{relatedPub.abstract}</p>
                    )}
                  </CardContent>
                </Card>
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
