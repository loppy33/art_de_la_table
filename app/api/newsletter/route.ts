import { NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'

// POST /api/newsletter
export async function POST(req: Request) {
  const body = await req.json()
  const { email } = body

  if (!email || !email.includes('@')) {
    return NextResponse.json({ error: 'Email invalide' }, { status: 400 })
  }

  try {
    await prisma.newsletterSubscriber.upsert({
      where: { email },
      update: {}, // déjà inscrit — on ne fait rien
      create: { email },
    })
    return NextResponse.json({ success: true })
  } catch {
    return NextResponse.json({ error: 'Erreur serveur' }, { status: 500 })
  }
}