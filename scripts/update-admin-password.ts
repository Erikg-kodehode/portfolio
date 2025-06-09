import { PrismaClient } from '@prisma/client';
import * as bcrypt from 'bcryptjs';

const prisma = new PrismaClient();

async function main() {
  const username = process.env.ADMIN_USERNAME;
  const password = process.env.ADMIN_PASSWORD;

  if (!username || !password) {
    console.error('Please provide ADMIN_USERNAME and ADMIN_PASSWORD environment variables');
    process.exit(1);
  }

  const passwordHash = await bcrypt.hash(password, 12);

  try {
    const admin = await prisma.admin.update({
      where: { username },
      data: { 
        passwordHash,
        email: 'erik25sfj@gmail.com' // Update email as well
      },
    });

    console.log('Admin password updated successfully for:', admin.username);
  } catch (error: any) {
    if (error?.code === 'P2025') {
      console.error('Admin user not found');
    } else {
      console.error('Error updating admin:', error);
    }
  } finally {
    await prisma.$disconnect();
  }
}

main().catch(console.error);

