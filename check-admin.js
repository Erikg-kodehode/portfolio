const { PrismaClient } = require('@prisma/client');

async function checkAdmins() {
  const prisma = new PrismaClient();
  
  try {
    const admins = await prisma.admin.findMany();
    console.log('Admins found:', admins.length);
    
    if (admins.length === 0) {
      console.log('No admin users found in the database!');
    } else {
      admins.forEach((admin, index) => {
        console.log(`${index + 1}. Username: ${admin.username}`);
        console.log(`   Email: ${admin.email}`);
        console.log(`   Role: ${admin.role}`);
        console.log(`   Last Login: ${admin.lastLoginAt || 'Never'}`);
        console.log('---');
      });
    }
  } catch (error) {
    console.error('Error connecting to database:', error.message);
  } finally {
    await prisma.$disconnect();
  }
}

checkAdmins();

