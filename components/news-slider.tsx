"use client"

import { useState, useEffect } from "react"
import { ChevronLeft, ChevronRight, Calendar, Clock } from "lucide-react"

interface Announcement {
  id: string
  title: string
  content: string
  created_at: string
  image_url?: string
}

interface NewsSliderProps {
  announcements: Announcement[]
}

export function NewsSlider({ announcements }: NewsSliderProps) {
  const [currentSlide, setCurrentSlide] = useState(0)

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % announcements.length)
    }, 5000)

    return () => clearInterval(timer)
  }, [announcements.length])

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % announcements.length)
  }

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + announcements.length) % announcements.length)
  }

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("th-TH", {
      year: "numeric",
      month: "long",
      day: "numeric",
    })
  }

  if (!announcements || announcements.length === 0) {
    return null
  }

  return (
    <section className="py-12 bg-gradient-to-r from-red-50 to-red-100">
      <div className="container mx-auto px-4">
        <div className="text-center mb-8">
          <h2 className="text-3xl font-bold text-red-800 mb-2">ข่าวประชาสัมพันธ์</h2>
          <p className="text-red-600">ข่าวสารและกิจกรรมล่าสุดจากคณะ</p>
        </div>

        <div className="relative max-w-6xl mx-auto">
          <div className="overflow-hidden rounded-lg shadow-lg bg-white">
            <div
              className="flex transition-transform duration-500 ease-in-out"
              style={{ transform: `translateX(-${currentSlide * 100}%)` }}
            >
              {announcements.map((announcement, index) => (
                <div key={announcement.id} className="w-full flex-shrink-0">
                  <div className="flex flex-col md:flex-row">
                    <div className="md:w-1/3">
                      <img
                        src={announcement.image_url || "/placeholder.svg?height=300&width=400&query=university news"}
                        alt={announcement.title}
                        className="w-full h-64 md:h-full object-cover"
                      />
                    </div>
                    <div className="md:w-2/3 p-8">
                      <div className="flex items-center text-sm text-red-600 mb-4">
                        <Calendar className="w-4 h-4 mr-2" />
                        <span>{formatDate(announcement.created_at)}</span>
                        <Clock className="w-4 h-4 ml-4 mr-2" />
                        <span>ข่าวประชาสัมพันธ์</span>
                      </div>
                      <h3 className="text-2xl font-bold text-gray-800 mb-4 line-clamp-2">{announcement.title}</h3>
                      <p className="text-gray-600 leading-relaxed line-clamp-4">{announcement.content}</p>
                      <button className="mt-6 bg-red-600 text-white px-6 py-2 rounded-lg hover:bg-red-700 transition-colors duration-200">
                        อ่านเพิ่มเติม
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Navigation Arrows */}
          <button
            onClick={prevSlide}
            className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-white/80 hover:bg-white text-red-600 p-2 rounded-full shadow-lg transition-all duration-200"
          >
            <ChevronLeft className="w-6 h-6" />
          </button>
          <button
            onClick={nextSlide}
            className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-white/80 hover:bg-white text-red-600 p-2 rounded-full shadow-lg transition-all duration-200"
          >
            <ChevronRight className="w-6 h-6" />
          </button>

          {/* Dots Indicator */}
          <div className="flex justify-center mt-6 space-x-2">
            {announcements.map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentSlide(index)}
                className={`w-3 h-3 rounded-full transition-all duration-200 ${
                  index === currentSlide ? "bg-red-600" : "bg-red-300"
                }`}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
