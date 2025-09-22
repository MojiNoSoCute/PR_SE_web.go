"use client"

import type React from "react"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { createClient } from "@/lib/supabase/client"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { Shield } from "lucide-react"

export default function AdminLoginPage() {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [error, setError] = useState<string | null>(null)
  const [isLoading, setIsLoading] = useState(false)
  const router = useRouter()

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)
    setError(null)

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
        router.push("/admin")
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
              <Button type="submit" className="w-full bg-red-600 hover:bg-red-700" disabled={isLoading}>
                {isLoading ? "กำลังเข้าสู่ระบบ..." : "เข้าสู่ระบบ"}
              </Button>
              <div className="mt-4 p-3 bg-blue-50 border border-blue-200 rounded text-sm">
                <p className="font-semibold text-blue-900 mb-1">ข้อมูลการเข้าสู่ระบบสำหรับการพัฒนา:</p>
                <p className="text-blue-700">อีเมล: admin@university.ac.th</p>
                <p className="text-blue-700">รหัสผ่าน: Admin123!</p>
              </div>
            </form>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
