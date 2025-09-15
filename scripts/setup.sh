#!/bin/bash

# Thai University Website Setup Script
# This script sets up the database and creates the admin account

echo "🏫 Thai University Website Setup"
echo "================================"

# Check if environment variables are set
if [ -z "$NEXT_PUBLIC_SUPABASE_URL" ] || [ -z "$SUPABASE_SERVICE_ROLE_KEY" ]; then
    echo "❌ Error: Missing required environment variables"
    echo "Please set:"
    echo "  - NEXT_PUBLIC_SUPABASE_URL"
    echo "  - SUPABASE_SERVICE_ROLE_KEY"
    exit 1
fi

echo "✅ Environment variables found"

# Install dependencies
echo "📦 Installing dependencies..."
npm install

# Run database migrations (these need to be run manually in Supabase)
echo "📋 Database setup required:"
echo "  1. Run scripts/001_create_tables.sql in Supabase SQL Editor"
echo "  2. Run scripts/002_seed_data.sql in Supabase SQL Editor"
echo "  3. Run scripts/004_create_admin_profile.sql in Supabase SQL Editor"

read -p "Have you run all the SQL scripts? (y/n): " -n 1 -r
echo
if [[ ! $REPLY =~ ^[Yy]$ ]]; then
    echo "❌ Please run the SQL scripts first, then run this setup again"
    exit 1
fi

# Create admin account
echo "👤 Creating admin account..."
npm run seed:admin

echo ""
echo "🎉 Setup completed!"
echo "📧 Admin Email: admin@university.ac.th"
echo "🔑 Admin Password: Admin123!"
echo ""
echo "⚠️  IMPORTANT: Change the default password after first login!"
echo "🌐 Access admin panel at: /admin/login"
