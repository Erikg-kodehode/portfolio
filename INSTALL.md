# Complete Installation Guide

## Prerequisites

1. Node.js 18.x or later
2. PostgreSQL 13 or later (or Supabase/Vercel Postgres account)
3. npm or yarn package manager

## Environment Setup

Create a `.env` file in the root directory with the following variables:

```env
# Database URL (required)
# Format: postgresql://USER:PASSWORD@HOST:PORT/DATABASE
DATABASE_URL="postgresql://postgres:password@localhost:5432/portfolio"
DIRECT_URL="postgresql://postgres:password@localhost:5432/portfolio"

# NextAuth Configuration (required)
NEXTAUTH_URL="http://localhost:3000"
NEXTAUTH_SECRET="your-secure-nextauth-secret"

# Email Service (required for password reset and notifications)
RESEND_API_KEY="your-resend-api-key"

# CV URLs (required for CV request approvals)
CV_URL_EN="https://your-cv-url-english"
CV_URL_NO="https://your-cv-url-norwegian"
```

## Installation Steps

1. Clone the repository:
```bash
git clone <repository-url>
cd portfolio
```

2. Install dependencies and set up the database:
```bash
npm run setup
```
This command will:
- Install all dependencies
- Generate Prisma client
- Create database tables
- Set up initial admin account

3. Start the development server:
```bash
npm run dev
```

## Database Setup Details

### Local PostgreSQL Setup

1. Install PostgreSQL if not already installed
2. Create a new database:
```sql
CREATE DATABASE portfolio;
```

### Using Supabase or Vercel Postgres

1. Create a new project/database in your provider
2. Copy the connection string to your `.env` file
3. Run the setup command as normal

## Admin Account Setup

During the setup process, you'll be prompted to create an admin account:
1. Enter a username (minimum 3 characters)
2. Enter a secure password (will be validated for strength)
3. Enter your email address (for password recovery)

## Troubleshooting

### Database Connection Issues

If you get database connection errors:
1. Check if PostgreSQL is running
2. Verify the DATABASE_URL format
3. Ensure the database exists
4. Check network access/firewall settings

### Prisma Issues

If Prisma commands fail:
```bash
npm run prisma:generate  # Regenerate Prisma client
npm run prisma:push      # Push schema changes
npm run prisma:studio    # Check database content
```

### Email Configuration

If emails aren't sending:
1. Verify your RESEND_API_KEY
2. Check the email templates in app/emails/
3. Test with Resend's API directly

## Development Tools

### Prisma Studio
Access your database through a GUI:
```bash
npm run prisma:studio
```

### Check Translations
Verify all translations are complete:
```bash
npm run check-translations
```

### Database Seeding
Populate the database with test data:
```bash
npm run db:seed
```

## Additional Configuration

### Custom Email Templates
Email templates are located in `app/emails/`. Customize them by editing the React components.

### Security Settings
Security configurations like password requirements and session durations can be adjusted in the relevant files:
- Password rules: `lib/auth.ts`
- Session config: `app/api/auth/[...nextauth]/auth.config.ts`

### Rate Limiting
Rate limiting settings for API endpoints can be found in `lib/rate-limit.ts`

