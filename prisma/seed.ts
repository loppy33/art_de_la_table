import { PrismaClient } from '@prisma/client'
import bcrypt from 'bcryptjs'

const prisma = new PrismaClient()

async function main() {
  const password = await bcrypt.hash('ChangeMe123!', 12)
  await prisma.adminUser.upsert({
    where: { email: 'admin@artdelatable.fr' },
    update: {},
    create: {
      email: 'admin@artdelatable.fr',
      password,
    },
  })
  console.log('Admin créé ✓')
}

main().finally(() => prisma.$disconnect())