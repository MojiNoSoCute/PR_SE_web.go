import { Header } from "@/components/header"
import { HeroSection } from "@/components/hero-section"
import { NewsSlider } from "@/components/news-slider"
import { StudentWorksPreview } from "@/components/student-works-preview"
import { FacultyPreview } from "@/components/faculty-preview"
import { PublicationsPreview } from "@/components/publications-preview"
import { dataProvider } from "@/lib/data-provider"

export default async function HomePage() {
  // Fetch data using our data provider (handles both Supabase and fallback data)
  const studentWorks = await dataProvider.getStudentWorks(6)
  const faculty = await dataProvider.getFaculty(5)
  const publications = await dataProvider.getPublications(4)
  const announcements = await dataProvider.getAnnouncements(3)

  return (
    <div className="min-h-screen bg-white">
      <Header />
      <HeroSection />

      {/* News Slider Section */}
      {announcements && <NewsSlider announcements={announcements} />}

      {/* Video Section */}
      <section className="py-16 bg-gradient-to-r from-blue-600 to-purple-600">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <div className="relative bg-black rounded-lg overflow-hidden">
              <iframe
                src="https://www.youtube.com/embed/dQw4w9WgXcQ"
                title="University Introduction Video"
                className="w-full h-100"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen   
              />

            </div>
          </div>
        </div>
      </section>

      {/* Faculty Section */}
      {faculty && <FacultyPreview faculty={faculty} />}

      {/* Publications Section */}
      {publications && <PublicationsPreview publications={publications} />}

      {/* Student Works Section */}
      {studentWorks && (
        <div className="bg-gray-100">
          <StudentWorksPreview works={studentWorks} />
        </div>
      )}

      {/* Footer */}
      <footer className="bg-red-700 text-white py-8">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <p className="text-sm mb-4 md:mb-0">© 2024 คณะวิทยาศาสตร์และเทคโนโลยี มหาวิทยาลัยราชภัฏ</p>
            <a href="/admin/login" className="text-sm hover:text-red-200 transition-colors duration-200 underline">
              เข้าสู่ระบบผู้ดูแล
            </a>
          </div>
        </div>
      </footer>
    </div>
  )
}
