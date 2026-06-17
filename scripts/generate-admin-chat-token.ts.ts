// scripts/generate-admin-chat-token.ts
// Exécuter une seule fois: npx ts-node scripts/generate-admin-chat-token.ts
// Coller le résultat dans .env: NEXT_PUBLIC_ADMIN_CHAT_TOKEN=...

import jwt from 'jsonwebtoken'
import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

async function main() {
  // Trouver ou créer un ChatUser ADMIN
  let adminUser = await prisma.chatUser.findFirst({ where: { role: 'ADMIN' } })

  if (!adminUser) {
    const bcrypt = await import('bcryptjs')
    adminUser = await prisma.chatUser.create({
      data: {
        firstName: 'Admin',
        lastName: 'ATF',
        email: 'admin-chat@artdelatable.fr',
        password: await bcrypt.hash('AdminChat2026!', 12),
        role: 'ADMIN',
      },
    })
    console.log('✓ ChatUser ADMIN créé:', adminUser.email)
  } else {
    console.log('✓ ChatUser ADMIN existant:', adminUser.email)
  }

  const token = jwt.sign(
    { userId: adminUser.id, role: 'ADMIN' },
    process.env.CHAT_JWT_SECRET!,
    { expiresIn: '365d' }
  )

  console.log('\n✅ Token admin généré (valable 1 an):')
  console.log('\nAjouter dans .env:')
  console.log(`NEXT_PUBLIC_ADMIN_CHAT_TOKEN=${token}`)
}

main()
  .catch(console.error)
  .finally(() => prisma.$disconnect())
