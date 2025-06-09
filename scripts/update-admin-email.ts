import { prisma } from '../lib/prisma';

async function updateAdminEmail() {
  try {
    const admin = await prisma.admin.updateMany({
      where: {
        username: 'ErikG'
      },
      data: {
        email: 'erik.gulliksen@gmail.com'
      }
    });

    console.log('Admin email updated successfully');
  } catch (error) {
    console.error('Error updating admin email:', error);
  } finally {
    await prisma.$disconnect();
  }
}

updateAdminEmail();

