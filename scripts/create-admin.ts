import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcryptjs';

const prisma = new PrismaClient();

async function main() {
  try {
    // Delete any existing admin users
    await prisma.admin.deleteMany();

    // Create new admin user
    const passwordHash = await bcrypt.hash('kH9#mP2$vL5@xQ8', 10);
    
    const admin = await prisma.admin.create({
      data: {
        username: 'ErikG',
        passwordHash,
        email: 'erik.gulliksen@gmail.com',
        role: 'admin'
      }
    });

    console.log('Admin user created:', {
      id: admin.id,
      username: admin.username,
      email: admin.email
    });
  } catch (error) {
    console.error('Error creating admin:', error);
  } finally {
    await prisma.$disconnect();
  }
}

main();

