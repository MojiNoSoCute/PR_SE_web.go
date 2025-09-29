"use client"

import type React from "react"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { Shield } from "lucide-react"

export default function AdminLoginPage() {
  const [email, setEmail] = useState("admin@university.ac.th")
  const [password, setPassword] = useState("Admin123!")
  const [error, setError] = useState<string | null>(null)
  const [isLoading, setIsLoading] = useState(false)
  const [success, setSuccess] = useState<string | null>(null)
  const router = useRouter()

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)
    setError(null)
    setSuccess(null)

    try {
      // Development mode login - check for default credentials
      const ADMIN_EMAIL = "admin@university.ac.th"
      const ADMIN_PASSWORD = "Admin123!"
      
      console.log('Login attempt:', { email, password })
      console.log('Expected:', { ADMIN_EMAIL, ADMIN_PASSWORD })
      
      if (email === ADMIN_EMAIL && password === ADMIN_PASSWORD) {
        // Store a simple auth state in localStorage for development
        localStorage.setItem('admin_authenticated', 'true')
        localStorage.setItem('admin_email', email)
        console.log('Login successful, redirecting to /admin')
        setSuccess("เข้าสู่ระบบสำเร็จ! กำลังเปลี่ยนเส้นทาง...")
        // Add a small delay to show the success message
        setTimeout(() => {
          router.push("/admin")
        }, 1000)
      } else {
        throw new Error("ข้อมูลผู้ใช้หรือรหัสผ่านไม่ถูกต้อง")
      }
    } catch (error: unknown) {
      console.error('Login error:', error)
      setError(error instanceof Error ? error.message : "เกิดข้อผิดพลาดในการเข้าสู่ระบบ")
    } finally {
      setIsLoading(false)
    }
  }

  // Add a function to clear auth state for testing
  const handleLogout = () => {
    localStorage.removeItem('admin_authenticated')
    localStorage.removeItem('admin_email')
    setSuccess("ออกจากระบบสำเร็จ")
    console.log('Logged out')
  }

  // Function to test if already logged in
  const checkLoginStatus = () => {
    const authenticated = localStorage.getItem('admin_authenticated')
    const adminEmail = localStorage.getItem('admin_email')
    
    if (authenticated === 'true' && adminEmail) {
      setSuccess("คุณเข้าสู่ระบบอยู่แล้ว! กำลังเปลี่ยนเส้นทาง...")
      setTimeout(() => {
        router.push("/admin")
      }, 1000)
    } else {
      setSuccess(null)
      setError("คุณยังไม่ได้เข้าสู่ระบบ")
    }
  }

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        <Card>
          <CardHeader className="text-center">
            <div className="mx-auto w-12 h-12 bg-red-600 rounded-full flex items-center justify-center mb-4">
              <Shield className="h-6 w-6 text-white" />
            </div>
            <CardTitle className="text-2xl">เข้าสู่ระบบผู้ดูแล</CardTitle>
            <CardDescription>ระบบจัดการเนื้อหาเว็บไซต์มหาวิทยาลัย</CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleLogin} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="email">อีเมล</Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="admin@university.ac.th"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="password">รหัสผ่าน</Label>
                <Input
                  id="password"
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
              </div>
              
              {error && (
                <Alert variant="destructive">
                  <AlertDescription>{error}</AlertDescription>
                </Alert>
              )}
              
              {success && (
                <Alert variant="default" className="bg-green-50 border-green-200">
                  <AlertDescription className="text-green-800">{success}</AlertDescription>
                </Alert>
              )}
              
              <Button type="submit" className="w-full bg-red-600 hover:bg-red-700" disabled={isLoading}>
                {isLoading ? "กำลังเข้าสู่ระบบ..." : "เข้าสู่ระบบ"}
              </Button>
              
              <div className="mt-4 p-3 bg-blue-50 border border-blue-200 rounded text-sm">
                <p className="font-semibold text-blue-900 mb-1">ข้อมูลการเข้าสู่ระบบสำหรับการพัฒนา:</p>
                <p className="text-blue-700">อีเมล: admin@university.ac.th</p>
                <p className="text-blue-700">รหัสผ่าน: Admin123!</p>
              </div>
              
              {/* Debug buttons */}
              <div className="flex gap-2 mt-4">
                <Button 
                  type="button" 
                  onClick={handleLogout}
                  variant="outline"
                  size="sm"
                  className="flex-1"
                >
                  ออกจากระบบ (Debug)
                </Button>
                <Button 
                  type="button" 
                  onClick={checkLoginStatus}
                  variant="outline"
                  size="sm"
                  className="flex-1"
                >
                  ตรวจสอบสถานะ
                </Button>
              </div>
            </form>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}