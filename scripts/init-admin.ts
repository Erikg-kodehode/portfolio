import { PrismaClient } from '@prisma/client';
import * as bcrypt from 'bcryptjs';

const prisma = new PrismaClient();

async function main() {
  const email = process.env.INITIAL_ADMIN_EMAIL;
  const username = process.env.INITIAL_ADMIN_USERNAME;
  const password = process.env.INITIAL_ADMIN_PASSWORD;

  if (!email || !username || !password) {
    console.error('Please provide INITIAL_ADMIN_EMAIL, INITIAL_ADMIN_USERNAME, and INITIAL_ADMIN_PASSWORD environment variables');
    process.exit(1);
  }

  const passwordHash = await bcrypt.hash(password, 12);

  try {
    const admin = await prisma.admin.create({
      data: {
        email,
        username,
        passwordHash,
        role: 'admin',
      },
    });

    console.log('Admin user created successfully:', { email: admin.email, username: admin.username });
  } catch (error: any) {
    if (error?.code === 'P2002') {
      console.error('An admin with this email or username already exists');
    } else {
      console.error('Error creating admin:', error);
    }
  } finally {
    await prisma.$disconnect();
  }
}

main().catch(console.error);

