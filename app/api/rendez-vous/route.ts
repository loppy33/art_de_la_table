import { NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'

// POST /api/rendez-vous
export async function POST(req: Request) {
  const body = await req.json()
  const { lastName, firstName, company, email, phone, projectType, preferredDate, preferredTime, message } = body

  if (!lastName || !firstName || !email) {
    return NextResponse.json({ error: 'Champs obligatoires manquants' }, { status: 400 })
  }

  try {
    const rdv = await prisma.rendezVous.create({
      data: {
        lastName,
        firstName,
        company,
        email,
        phone,
        projectType,
        preferredDate,
        preferredTime,
        message,
      },
    })
    return NextResponse.json({ success: true, id: rdv.id }, { status: 201 })
  } catch {
    return NextResponse.json({ error: 'Erreur serveur' }, { status: 500 })
  }
}