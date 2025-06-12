const { PrismaClient } = require('@prisma/client');
const bcrypt = require('bcryptjs');

async function setAdminPassword() {
  const prisma = new PrismaClient();
  
  // Set a temporary password that you'll know
  const newPassword = 'TempPass123!';
  const username = 'ErikG';
  
  try {
    console.log('Setting new password for admin:', username);
    
    // Hash the password
    const passwordHash = await bcrypt.hash(newPassword, 12);
    
    // Update the admin password
    const admin = await prisma.admin.update({
      where: { username: username },
      data: { passwordHash }
    });
    
    console.log('✅ Password updated successfully!');
    console.log('Username:', admin.username);
    console.log('New password:', newPassword);
    console.log('\n⚠️ Please change this password after logging in!');
    
  } catch (error) {
    console.error('❌ Error updating password:', error.message);
  } finally {
    await prisma.$disconnect();
  }
}

setAdminPassword();

