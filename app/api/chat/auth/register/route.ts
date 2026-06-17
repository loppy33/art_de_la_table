// app/api/chat/auth/register/route.ts
import { NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'

export async function POST(req: Request) {
  const { firstName, lastName, email, password } = await req.json()

  if (!firstName || !lastName || !email || !password) {
    return NextResponse.json({ error: 'Tous les champs sont requis' }, { status: 400 })
  }

  if (password.length < 8) {
    return NextResponse.json({ error: 'Mot de passe trop court (8 caractères min)' }, { status: 400 })
  }

  const exists = await prisma.chatUser.findUnique({ where: { email } })
  if (exists) {
    return NextResponse.json({ error: 'Email déjà utilisé' }, { status: 409 })
  }

  const hashed = await bcrypt.hash(password, 12)
  const user = await prisma.chatUser.create({
    data: { firstName, lastName, email, password: hashed, role: 'CLIENT' },
  })

  const token = jwt.sign(
    { userId: user.id, role: user.role },
    process.env.CHAT_JWT_SECRET!,
    { expiresIn: '7d' }
  )

  return NextResponse.json({
    token,
    user: { id: user.id, firstName: user.firstName, lastName: user.lastName, email: user.email, role: user.role },
  }, { status: 201 })
}
