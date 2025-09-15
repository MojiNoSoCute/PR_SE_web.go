# Database Scripts

This directory contains SQL scripts and seeders for the Thai University website.

## SQL Scripts

Run these scripts in order:

1. `001_create_tables.sql` - Creates the main database tables
2. `002_seed_data.sql` - Seeds initial data for the website
3. `004_create_admin_profile.sql` - Creates admin profile system
4. `003_create_admin_user.sql` - Legacy admin user script (deprecated)

## Admin Account Seeder

### Quick Setup

\`\`\`bash
# Install dependencies
npm install

# Run the admin seeder
npm run seed:admin
\`\`\`

### Default Admin Credentials

- **Email:** `admin@university.ac.th`
- **Password:** `Admin123!`

### Environment Variables Required

Make sure these environment variables are set:

\`\`\`env
NEXT_PUBLIC_SUPABASE_URL=your_supabase_url
SUPABASE_SERVICE_ROLE_KEY=your_service_role_key
\`\`\`

### Manual Admin Creation

If the seeder doesn't work, you can manually create an admin:

1. Go to your Supabase dashboard
2. Navigate to Authentication > Users
3. Create a new user with email `admin@university.ac.th`
4. After creation, run this SQL in the SQL Editor:

\`\`\`sql
INSERT INTO admin_profiles (user_id, email, full_name, role, is_active)
VALUES (
  (SELECT id FROM auth.users WHERE email = 'admin@university.ac.th'),
  'admin@university.ac.th',
  'System Administrator',
  'admin',
  true
);
\`\`\`

### Security Notes

- **Change the default password immediately after first login**
- The admin system uses Row Level Security (RLS) policies
- Only users in the `admin_profiles` table can manage content
- All admin actions are logged and tracked

### Troubleshooting

**Error: Missing environment variables**
- Ensure `NEXT_PUBLIC_SUPABASE_URL` and `SUPABASE_SERVICE_ROLE_KEY` are set

**Error: Admin already exists**
- This is normal if you've already run the seeder

**Error: Failed to create auth user**
- Check your Supabase service role key permissions
- Ensure email confirmation is disabled in Supabase Auth settings

**Error: Failed to create admin profile**
- Run the `004_create_admin_profile.sql` script first
- Check that the `admin_profiles` table exists
