# Seeder Data Setup Guide

## 📚 Overview

This project includes comprehensive seeder data for the Thai University website, designed to work both with and without a Supabase connection.

## 🚀 Quick Start

### 1. Generate Sample Data Files
```bash
npm run seed:data
```

This creates JSON files in the `sample-data/` directory:
- `university-info.json` - University and department information
- `faculty.json` - Faculty member profiles
- `student-works.json` - Student project showcases
- `publications.json` - Research publications
- `announcements.json` - News and announcements

### 2. Available Data

#### 🏫 University Information
- Thai and English names
- Department details
- Contact information

#### 👨‍🏫 Faculty Members (5 profiles)
- Associate professors and lecturers
- Specialization areas (AI, Security, Web Development, etc.)
- Profile photos and contact details

#### 📚 Student Works (4 projects)
- Smart library management system
- Thai language learning app
- Computer vision quality control
- Restaurant management web app

#### 📖 Publications (3 research papers)
- Thai chatbot development
- Password security patterns
- Blockchain certificate verification

#### 📢 Announcements (4 items)
- Facility information
- Student achievements
- Activities and events
- Scholarship opportunities

## 🔧 Data Provider System

The project includes an intelligent data provider (`lib/data-provider.ts`) that:

- **Primary**: Attempts to fetch from Supabase (if configured)
- **Fallback**: Uses local sample data when Supabase is unavailable
- **Seamless**: No code changes needed to switch between modes

## 📊 Database Setup (Optional)

If you want to use a real database:

### 1. Set up Supabase
1. Create a Supabase project
2. Update `.env.local` with your credentials:
```env
NEXT_PUBLIC_SUPABASE_URL=https://your-project.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-anon-key
SUPABASE_SERVICE_ROLE_KEY=your-service-role-key
```

### 2. Run Database Scripts
Execute in order:
1. `scripts/001_create_tables.sql` - Create database tables
2. `scripts/004_create_admin_profile.sql` - Set up admin system
3. `scripts/002_seed_data.sql` - Insert sample data

### 3. Create Admin User
```bash
npm run seed:admin
```

Default admin credentials:
- Email: `admin@university.ac.th`
- Password: `Admin123!`

## 🎯 Features Enabled by Seeder Data

### ✅ Working Features (with sample data)
- Homepage with all sections populated
- Faculty member showcase
- Student works gallery
- Publications list
- News and announcements
- Responsive design
- Search and filtering

### 🔐 Admin Features (requires Supabase)
- Admin login/dashboard
- Content management
- Real-time updates
- User authentication

## 🛠 Development Workflow

1. **Frontend Development**: Use sample data (no setup required)
2. **Backend Testing**: Set up Supabase for full functionality
3. **Production**: Deploy with real database connection

## 📁 File Structure
```
scripts/
├── 001_create_tables.sql      # Database schema
├── 002_seed_data.sql          # SQL seed data
├── 004_create_admin_profile.sql # Admin system
├── seed-admin.js              # Admin user creator
└── seed-data.js               # JSON data generator

sample-data/
├── university-info.json       # University details
├── faculty.json               # Faculty profiles
├── student-works.json         # Student projects
├── publications.json          # Research papers
└── announcements.json         # News items

lib/
├── data-provider.ts           # Smart data fetcher
└── supabase/                  # Supabase configuration
```

## 🎉 Benefits

- **Zero Configuration**: Works immediately after `npm install`
- **Rich Content**: Realistic Thai university data
- **Bilingual Support**: Thai and English content
- **Responsive Design**: Optimized for all devices
- **SEO Ready**: Proper meta tags and structure
- **Developer Friendly**: Easy to extend and modify

## 🔧 Customization

### Adding New Data
1. Edit `scripts/seed-data.js`
2. Run `npm run seed:data`
3. Data automatically appears in the app

### Modifying Existing Data
1. Edit files in `sample-data/` directly, or
2. Modify `scripts/seed-data.js` and regenerate

## 🚀 Production Deployment

1. Set up production Supabase project
2. Configure environment variables
3. Run database migrations
4. Seed production data
5. Deploy Next.js application

## 📞 Support

The seeder system is designed to be robust and developer-friendly. If you encounter issues:

1. Check console warnings for Supabase connection status
2. Verify sample data files exist in `sample-data/`
3. Ensure Next.js development server is running
4. Check network connectivity for external images

## 🎯 Ready to Use!

Your Thai University website is now running with:
- ✅ Complete sample data
- ✅ Responsive design
- ✅ Bilingual content
- ✅ Modern UI components
- ✅ Professional appearance

Access your website at: http://localhost:3001