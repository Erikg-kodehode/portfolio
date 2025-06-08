const { PrismaClient } = require('@prisma/client');
const bcrypt = require('bcryptjs');

const prisma = new PrismaClient();

async function setupAdmin() {
  try {
    // Check if admin already exists
    const existingAdmin = await prisma.admin.findFirst();
    if (existingAdmin) {
      console.log('Admin already exists, skipping setup');
      return;
    }

    // Get admin credentials from environment variables
    const adminUsername = process.env.ADMIN_USERNAME;
    const adminPassword = process.env.ADMIN_PASSWORD;
    const adminEmail = process.env.ADMIN_EMAIL;

    if (!adminUsername || !adminPassword || !adminEmail) {
      throw new Error('Admin credentials not found in environment variables');
    }

    // Hash password
    const passwordHash = await bcrypt.hash(adminPassword, 10);

    // Create admin user
    const admin = await prisma.admin.create({
      data: {
        username: adminUsername,
        passwordHash,
        email: adminEmail,
        role: 'admin'
      }
    });

    console.log('Admin user created successfully:', {
      id: admin.id,
      username: admin.username,
      email: admin.email
    });
  } catch (error) {
    console.error('Failed to setup admin:', error);
    process.exit(1);
  } finally {
    await prisma.$disconnect();
  }
}

setupAdmin();

const { PrismaClient } = require('@prisma/client');
const bcrypt = require('bcrypt');
const prisma = new PrismaClient();

async function createAdmin() {
  try {
    // Delete existing admin account if it exists
    await prisma.admin.deleteMany({});
  } catch (error) {
    console.error('Error deleting existing admin:', error);
  }
  try {
    const passwordHash = await bcrypt.hash('nK9#mP2$vL5@xQ8', 10);
    
    const admin = await prisma.admin.create({
      data: {
        username: 'ErikG',
        passwordHash,
        email: 'erik.gulliksen@gmail.com',
        role: 'admin'
      }
    });

    console.log('Admin account created successfully:', admin.username);
  } catch (error) {
    console.error('Error creating admin account:', error);
  } finally {
    await prisma.$disconnect();
  }
}

createAdmin();

