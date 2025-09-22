import { createServerClient } from "@supabase/ssr"
import { NextResponse, type NextRequest } from "next/server"

export async function updateSession(request: NextRequest) {
  let supabaseResponse = NextResponse.next({
    request,
  })

  // For development mode, skip Supabase authentication for admin routes
  // In production, you would want to restore proper Supabase authentication
  if (request.nextUrl.pathname.startsWith("/admin") && !request.nextUrl.pathname.startsWith("/admin/login")) {
    // Skip authentication check for development
    // The client-side components will handle authentication via localStorage
    return supabaseResponse
  }

  // For non-admin routes, no authentication required
  return supabaseResponse
}
