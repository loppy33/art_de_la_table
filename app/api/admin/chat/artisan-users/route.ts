// app/api/admin/chat/artisan-users/route.ts
import { NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
import { requireAdmin } from '@/lib/auth-guard'
import bcrypt from 'bcryptjs'

// GET — liste des comptes artisans
export async function GET() {
  const guard = await requireAdmin()
  if (guard.error) return guard.error

  const users = await prisma.chatUser.findMany({
    where: { role: 'ARTISAN' },
    select: {
      id: true,
      firstName: true,
      lastName: true,
      email: true,
      artisan: { select: { name: true, logo: true } },
    },
    orderBy: { firstName: 'asc' },
  })

  return NextResponse.json(users)
}

// POST — créer un compte artisan
export async function POST(req: Request) {
  const guard = await requireAdmin()
  if (guard.error) return guard.error

  const { firstName, lastName, email, password, artisanId } = await req.json()

  if (!firstName || !lastName || !email || !password || !artisanId) {
    return NextResponse.json({ error: 'Tous les champs sont requis' }, { status: 400 })
  }

  const exists = await prisma.chatUser.findUnique({ where: { email } })
  if (exists) {
    return NextResponse.json({ error: 'Email déjà utilisé' }, { status: 409 })
  }

  const hashed = await bcrypt.hash(password, 12)
  const user = await prisma.chatUser.create({
    data: {
      firstName,
      lastName,
      email,
      password: hashed,
      role: 'ARTISAN',
      artisanId,
    },
    select: {
      id: true,
      firstName: true,
      lastName: true,
      email: true,
      artisan: { select: { name: true } },
    },
  })

  return NextResponse.json(user, { status: 201 })
}
