"use client"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import { AdminDashboard } from "@/components/admin/admin-dashboard"
import { dataProvider } from "@/lib/data-provider"

export default function AdminPage() {
  const router = useRouter()
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [isLoading, setIsLoading] = useState(true)
  const [stats, setStats] = useState({
    studentWorks: 0,
    faculty: 0,
    publications: 0,
    announcements: 0
  })
  const [recentStudentWorks, setRecentStudentWorks] = useState<any[]>([])
  const [recentPublications, setRecentPublications] = useState<any[]>([])

  useEffect(() => {
    // Check if user is authenticated in development mode
    const checkAuth = () => {
      const authenticated = localStorage.getItem('admin_authenticated')
      const adminEmail = localStorage.getItem('admin_email')
      
      console.log('Checking authentication:', { authenticated, adminEmail })
      
      // Check for development mode authentication
      if (authenticated === 'true' && adminEmail) {
        console.log('User is authenticated')
        setIsAuthenticated(true)
        return true
      }
      
      // Check if we're in development mode with default credentials
      // This is a fallback for cases where localStorage might not be set properly
      const urlParams = new URLSearchParams(window.location.search)
      const devMode = urlParams.get('dev') === 'true'
      
      if (devMode) {
        console.log('Development mode bypass enabled')
        localStorage.setItem('admin_authenticated', 'true')
        localStorage.setItem('admin_email', 'admin@university.ac.th')
        setIsAuthenticated(true)
        return true
      }
      
      console.log('Not authenticated, redirecting to login')
      router.push("/admin/login")
      return false
    }

    const isAuthenticated = checkAuth()
    
    if (isAuthenticated) {
      // Load mock data for dashboard
      const loadDashboardData = async () => {
        try {
          // Check for updates in localStorage before loading
          const stored = localStorage.getItem('student_works')
          const studentWorks = stored ? JSON.parse(stored) : await dataProvider.getStudentWorks()
          
          const [faculty, publications, announcements] = await Promise.all([
            dataProvider.getFaculty(),
            dataProvider.getPublications(),
            dataProvider.getAnnouncements()
          ])

          setStats({
            studentWorks: studentWorks.length,
            faculty: faculty.length,
            publications: publications.length,
            announcements: announcements.length
          })

          setRecentStudentWorks(studentWorks.slice(0, 5))
          setRecentPublications(publications.slice(0, 5))
          
          // Debug logging
          console.log('Dashboard data loaded:', {
            stats: {
              studentWorks: studentWorks.length,
              faculty: faculty.length,
              publications: publications.length,
              announcements: announcements.length
            },
            recentStudentWorks: studentWorks.slice(0, 5),
            recentPublications: publications.slice(0, 5)
          })
        } catch (error) {
          console.error('Error loading dashboard data:', error)
        } finally {
          setIsLoading(false)
        }
      }

      loadDashboardData()
    } else {
      setIsLoading(false)
    }
  }, [router])

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-red-600 mx-auto mb-4"></div>
          <p>กำลังโหลด...</p>
        </div>
      </div>
    )
  }

  if (!isAuthenticated) {
    return null // Will redirect to login
  }

  const mockUser = {
    email: localStorage.getItem('admin_email') || 'admin@university.ac.th',
    id: 'dev-admin-id'
  }

  return (
    <AdminDashboard
      user={mockUser}
      stats={stats}
      recentStudentWorks={recentStudentWorks}
      recentPublications={recentPublications}
    />
  )
}