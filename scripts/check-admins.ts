import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  const admins = await prisma.admin.findMany({
    select: {
      username: true,
      email: true,
      role: true,
      lastLoginAt: true
    }
  });

  console.log('Existing admins:', admins);
  await prisma.$disconnect();
}

main().catch(console.error);

