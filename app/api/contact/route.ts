import { NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'

// POST /api/contact
export async function POST(req: Request) {
  const body = await req.json()
  const { lastName, firstName, company, email, phone, need, message } = body

  if (!lastName || !firstName || !email) {
    return NextResponse.json(
      { error: 'Nom, prénom et email sont requis' },
      { status: 400 }
    )
  }

  try {
    const request = await prisma.contactRequest.create({
      data: { lastName, firstName, company, email, phone, need, message },
    })
    return NextResponse.json({ success: true, id: request.id }, { status: 201 })
  } catch {
    return NextResponse.json({ error: 'Erreur serveur' }, { status: 500 })
  }
}