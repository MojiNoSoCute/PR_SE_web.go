// Admin account seeder script
// Run with: node scripts/seed-admin.js

import { createClient } from "@supabase/supabase-js"

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY

if (!supabaseUrl || !supabaseServiceKey) {
  console.error("❌ Missing required environment variables:")
  console.error("   - NEXT_PUBLIC_SUPABASE_URL")
  console.error("   - SUPABASE_SERVICE_ROLE_KEY")
  process.exit(1)
}

const supabase = createClient(supabaseUrl, supabaseServiceKey, {
  auth: {
    autoRefreshToken: false,
    persistSession: false,
  },
})

const ADMIN_EMAIL = "admin@university.ac.th"
const ADMIN_PASSWORD = "Admin123!"
const ADMIN_NAME = "System Administrator"

async function seedAdminAccount() {
  try {
    console.log("🌱 Starting admin account seeding...")

    // Check if admin already exists
    const { data: existingAdmin } = await supabase
      .from("admin_profiles")
      .select("email")
      .eq("email", ADMIN_EMAIL)
      .single()

    if (existingAdmin) {
      console.log("✅ Admin account already exists:", ADMIN_EMAIL)
      return
    }

    // Create admin user in Supabase Auth
    console.log("👤 Creating admin user...")
    const { data: authData, error: authError } = await supabase.auth.admin.createUser({
      email: ADMIN_EMAIL,
      password: ADMIN_PASSWORD,
      email_confirm: true,
      user_metadata: {
        full_name: ADMIN_NAME,
        role: "admin",
      },
    })

    if (authError) {
      throw new Error(`Failed to create auth user: ${authError.message}`)
    }

    console.log("✅ Auth user created:", authData.user.id)

    // Create admin profile
    console.log("📝 Creating admin profile...")
    const { error: profileError } = await supabase.from("admin_profiles").insert({
      user_id: authData.user.id,
      email: ADMIN_EMAIL,
      full_name: ADMIN_NAME,
      role: "admin",
      is_active: true,
    })

    if (profileError) {
      throw new Error(`Failed to create admin profile: ${profileError.message}`)
    }

    console.log("✅ Admin profile created successfully!")
    console.log("")
    console.log("🎉 Admin account seeding completed!")
    console.log("📧 Email:", ADMIN_EMAIL)
    console.log("🔑 Password:", ADMIN_PASSWORD)
    console.log("")
    console.log("⚠️  IMPORTANT: Change the default password after first login!")
  } catch (error) {
    console.error("❌ Error seeding admin account:", error.message)
    process.exit(1)
  }
}

// Run the seeder
seedAdminAccount()
