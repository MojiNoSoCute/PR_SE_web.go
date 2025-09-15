import Link from "next/link"
import { Instagram, Facebook } from "lucide-react"

export function Header() {
  return (
    <header className="bg-red-700 text-white">
      {/* Top bar with social links */}
      <div className="bg-red-800 py-2">
        <div className="container mx-auto px-4 flex justify-between items-center">
          <div className="text-sm">Lorem Ipsum | Bibendum amet et nibh nunc.</div>
          <div className="flex items-center gap-4">
            <span className="text-sm">Follow Us</span>
            <Link href="#" className="hover:text-red-200">
              <Instagram className="h-4 w-4" />
            </Link>
            <Link href="#" className="hover:text-red-200">
              <Facebook className="h-4 w-4" />
            </Link>
          </div>
        </div>
      </div>

      {/* Main header */}
      <div className="py-4">
        <div className="container mx-auto px-4 flex items-center gap-4">
          <div className="flex items-center gap-4">
            <img src="/generic-university-logo.png" alt="University Logo" className="h-16 w-16" />
            <div>
              <h1 className="text-lg font-bold text-pink-200">คณะวิทยาศาสตร์และเทคโนโลยี</h1>
              <p className="text-sm text-pink-100">มหาวิทยาลัยราชภัฏ</p>
            </div>
          </div>
        </div>
      </div>
    </header>
  )
}
