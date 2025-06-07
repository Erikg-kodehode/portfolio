# Portfolio Project

[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)

A modern, full-stack portfolio website built with Next.js, featuring project showcases, CV request system, and an admin dashboard. The application supports multiple languages and includes a secure authentication system.

## Features

### For Visitors
- 🌟 Interactive project showcase with detailed descriptions and images
- 📄 CV request system with email notifications
- 🌍 Multi-language support
- 🌓 Dark/Light theme toggle
- 📱 Fully responsive design

### For Administrators
- 🔐 Secure admin authentication system
- 📊 Admin dashboard for managing:
  - CV requests
  - Project content
  - System settings
- 🔑 Password reset functionality
- 📧 Email notifications for new CV requests

## Technology Stack

- **Frontend**: Next.js 14+, React 18, Tailwind CSS, Framer Motion
- **Backend**: Next.js API Routes, Prisma ORM
- **Database**: PostgreSQL
- **Authentication**: NextAuth.js
- **Email**: Resend API
- **Deployment**: Vercel

## Setup Instructions

### Prerequisites

- Node.js 18+ installed
- PostgreSQL database
- Resend API account for email functionality

### Installation

1. Clone the repository:
```bash
git clone <your-repo-url>
cd portfolio
```

2. Install dependencies:
```bash
npm install
```

3. Set up environment variables:
Create a `.env.local` file with the following variables:
```env
# Auth
NEXTAUTH_SECRET=your_nextauth_secret
NEXTAUTH_URL=http://localhost:3000

# Email (Resend)
RESEND_API_KEY=your_resend_api_key
EMAIL_FROM=your-verified-email@domain.com

# Database
DATABASE_URL=your_database_url

# Admin setup
ADMIN_EMAIL=admin@example.com
ADMIN_PASSWORD=your_secure_password
```

4. Set up the database and admin account:
```bash
npm run setup
```

5. (Optional) Seed the database with sample data:
```bash
npm run db:seed
```

6. Start the development server:
```bash
npm run dev
```

## Available Scripts

- `npm run dev` - Start the development server
- `npm run build` - Build the production application
- `npm run start` - Start the production server
- `npm run lint` - Run ESLint
- `npm run setup` - Full setup (install, generate Prisma, push DB, setup admin)
- `npm run prisma:generate` - Generate Prisma client
- `npm run prisma:studio` - Open Prisma Studio to manage your database
- `npm run prisma:push` - Push schema changes to the database
- `npm run db:seed` - Seed the database with initial data
- `npm run check-translations` - Verify translation completeness

## Deployment

This project is optimized for deployment on Vercel. Follow these steps:

1. Push your code to a GitHub repository
2. Import the project in Vercel
3. Configure the environment variables in Vercel's dashboard
4. Deploy!

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.
