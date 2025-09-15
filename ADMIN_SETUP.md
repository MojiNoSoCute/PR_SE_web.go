# Admin Setup Guide

## Default Admin Credentials

For development and testing purposes, use these default admin credentials:

**Email:** `admin@university.ac.th`  
**Password:** `Admin123!`

## Setting Up Admin User

### Option 1: Through Supabase Dashboard
1. Go to your Supabase project dashboard
2. Navigate to Authentication > Users
3. Click "Add user"
4. Enter the admin email and password
5. Confirm the user creation

### Option 2: Through Sign Up (Recommended for Development)
1. Visit `/admin/login` on your website
2. Use the sign-up functionality with the admin email
3. The user will be automatically created in the database

## Admin Access

Once the admin user is created:

1. Visit `/admin/login`
2. Enter the admin credentials
3. You'll be redirected to the admin dashboard at `/admin`

## Admin Features

The admin dashboard provides:
- **Student Works Management**: Add, edit, delete student projects
- **Faculty Management**: Manage faculty profiles and information
- **Publications Management**: Handle research publications
- **Announcements Management**: Create and manage news/announcements
- **Analytics**: View website statistics and user engagement

## Security Notes

- Change the default password in production
- Enable email confirmation in Supabase settings for production
- Set up proper Row Level Security (RLS) policies
- Consider implementing role-based access control for multiple admin levels

## Troubleshooting

If you can't access the admin panel:
1. Verify the user exists in Supabase Auth
2. Check that the email is confirmed
3. Ensure RLS policies are properly configured
4. Check browser console for any authentication errors
