const { PrismaClient } = require('@prisma/client')
const bcrypt = require('bcryptjs')
const readline = require('readline')

const prisma = new PrismaClient()

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
})

function question(query) {
  return new Promise((resolve) => {
    rl.question(query, resolve)
  })
}

async function main() {
  try {
    console.log('\n🔐 Admin Account Setup')
    console.log('-------------------')

    const username = await question('Enter admin username: ')
    const password = await question('Enter admin password: ')

    // Hash password
    const salt = await bcrypt.genSalt(12)
    const passwordHash = await bcrypt.hash(password, salt)

    // Create admin account
    const admin = await prisma.admin.create({
      data: {
        username,
        passwordHash,
        role: 'admin'
      }
    })

    console.log('\n✅ Admin account created successfully!')
    console.log(`Username: ${admin.username}`)
    console.log('You can now log in at /admin')
  } catch (error) {
    console.error('❌ Error creating admin account:', error)
  } finally {
    await prisma.$disconnect()
    rl.close()
  }
}

main()

