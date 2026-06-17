// app/api/chat/auth/login/route.ts
import { NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'

export async function POST(req: Request) {
  const { email, password } = await req.json()

  const user = await prisma.chatUser.findUnique({ where: { email } })
  if (!user) {
    return NextResponse.json({ error: 'Email ou mot de passe incorrect' }, { status: 401 })
  }

  const valid = await bcrypt.compare(password, user.password)
  if (!valid) {
    return NextResponse.json({ error: 'Email ou mot de passe incorrect' }, { status: 401 })
  }

  const token = jwt.sign(
    { userId: user.id, role: user.role },
    process.env.CHAT_JWT_SECRET!,
    { expiresIn: '7d' }
  )

  return NextResponse.json({
    token,
    user: {
      id: user.id,
      firstName: user.firstName,
      lastName: user.lastName,
      email: user.email,
      role: user.role,
    },
  })
}
