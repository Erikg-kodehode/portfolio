import { PrismaClient, Prisma } from '@prisma/client'
import bcrypt from 'bcryptjs'
import { createInterface } from 'readline'
import chalk from 'chalk'

const prisma = new PrismaClient()

const rl = createInterface({
  input: process.stdin,
  output: process.stdout
})

function question(query: string): Promise<string> {
  return new Promise((resolve) => {
    rl.question(query, resolve)
  })
}

async function isValidPassword(password: string): Promise<boolean> {
  // Password must be at least 8 characters long and contain:
  // - At least one uppercase letter
  // - At least one lowercase letter
  // - At least one number
  // - At least one special character
  const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*(),.?":{}|<>]).{8,}$/
  return passwordRegex.test(password)
}

async function isUsernameTaken(username: string): Promise<boolean> {
  const existingUser = await prisma.admin.findUnique({
    where: { username }
  })
  return !!existingUser
}

async function main() {
  console.log(chalk.blue('\n🔐 Admin Account Setup'))
  console.log(chalk.blue('-------------------'))

  try {
    let username: string
    let isUsernameFree = false

    // Username validation loop
    do {
      username = (await question(chalk.cyan('Enter admin username: '))).trim()
      
      if (username.length < 3) {
        console.log(chalk.red('❌ Username must be at least 3 characters long'))
        continue
      }

      isUsernameFree = !(await isUsernameTaken(username))
      if (!isUsernameFree) {
        console.log(chalk.red('❌ Username is already taken'))
      }
    } while (username.length < 3 || !isUsernameFree)

    // Password validation loop
    let password: string
    let isPasswordValid = false

    do {
      password = (await question(chalk.cyan('Enter admin password: '))).trim()
      isPasswordValid = await isValidPassword(password)

      if (!isPasswordValid) {
        console.log(chalk.red('❌ Password must be at least 8 characters long and contain:'))
        console.log(chalk.red('  - At least one uppercase letter'))
        console.log(chalk.red('  - At least one lowercase letter'))
        console.log(chalk.red('  - At least one number'))
        console.log(chalk.red('  - At least one special character'))
      }
    } while (!isPasswordValid)

    // Confirm password
    let confirmPassword: string
    do {
      confirmPassword = (await question(chalk.cyan('Confirm password: '))).trim()
      if (confirmPassword !== password) {
        console.log(chalk.red('❌ Passwords do not match'))
      }
    } while (confirmPassword !== password)

    // Optional email input
    const email = (await question(chalk.cyan('Enter email (optional, press Enter to skip): '))).trim()

    // Hash password with high security settings
    const salt = await bcrypt.genSalt(12)
    const passwordHash = await bcrypt.hash(password, salt)

    // Create or update admin account
    const createData: Prisma.AdminCreateInput = {
      username,
      passwordHash,
      role: 'admin',
      email: email || '' // Provide empty string as fallback
    }

    const admin = await prisma.admin.upsert({
      where: { username },
      update: createData,
      create: createData
    })

    console.log(chalk.green('\n✅ Admin account created successfully!'))
    console.log(chalk.green(`Username: ${admin.username}`))
    if (email) {
      console.log(chalk.green(`Email: ${email}`))
    }
    console.log(chalk.green('You can now log in at /admin'))
    
    // Security reminder
    console.log(chalk.yellow('\n⚠️  Important:'))
    console.log(chalk.yellow('- Keep your password secure'))
    console.log(chalk.yellow('- Do not share your admin credentials'))
    console.log(chalk.yellow('- Use a strong, unique password'))

  } catch (error) {
    console.error(chalk.red('\n❌ Error creating admin account:'))
    if (error instanceof Error) {
      console.error(chalk.red(error.message))
    } else {
      console.error(chalk.red('An unknown error occurred'))
    }
  } finally {
    await prisma.$disconnect()
    rl.close()
  }
}

// Run the script
main().catch((error) => {
  console.error(chalk.red('Fatal error:'), error)
  process.exit(1)
})
