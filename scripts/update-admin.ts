import { prisma } from '../lib/prisma';
import * as bcrypt from 'bcrypt';

async function updateAdminCredentials() {
  const username = process.env.ADMIN_USERNAME || 'erikgulliksen';
  const password = process.env.ADMIN_PASSWORD || 'your-secure-password-here';

  try {
    const hashedPassword = await bcrypt.hash(password, 12);

    // Update or create admin user
    const admin = await prisma.admin.upsert({
      where: { username: 'admin' },  // Find the existing admin account
      update: {
        username,
        passwordHash: hashedPassword,
      },
      create: {
        username,
        email: `${username}@example.com`,
        passwordHash: hashedPassword,
        role: 'admin'
      },
    });

    console.log('Admin credentials updated successfully!');
    console.log('Username:', username);
    console.log('Please store these credentials securely.');
  } catch (error) {
    console.error('Error updating admin credentials:', error);
  } finally {
    await prisma.$disconnect();
  }
}

updateAdminCredentials();

