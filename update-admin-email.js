const { PrismaClient } = require('@prisma/client');

async function updateAdminEmail() {
  const prisma = new PrismaClient();
  
  try {
    console.log('Updating admin email to verified Resend email...');
    
    // Update the admin email to the verified Resend email
    const admin = await prisma.admin.update({
      where: { username: 'ErikG' },
      data: { 
        email: 'erik.gulliksen@gmail.com'  // This is the verified email in Resend
      }
    });
    
    console.log('✅ Admin email updated successfully!');
    console.log('Username:', admin.username);
    console.log('New email:', admin.email);
    console.log('\n📧 Password reset emails will now work properly!');
    
  } catch (error) {
    console.error('❌ Error updating admin email:', error.message);
  } finally {
    await prisma.$disconnect();
  }
}

updateAdminEmail();

