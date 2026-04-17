import { NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
import { requireAdmin } from '@/lib/auth-guard'

// GET /api/admin/testimonials
export async function GET() {
  const guard = await requireAdmin()
  if (guard.error) return guard.error

  const testimonials = await prisma.testimonial.findMany({
    orderBy: { createdAt: 'desc' },
  })

  return NextResponse.json(testimonials)
}

// POST /api/admin/testimonials
export async function POST(req: Request) {
  const guard = await requireAdmin()
  if (guard.error) return guard.error

  const body = await req.json()
  const { author, role, quote, visible } = body

  if (!author || !quote) {
    return NextResponse.json({ error: 'author et quote sont requis' }, { status: 400 })
  }

  const testimonial = await prisma.testimonial.create({
    data: { author, role, quote, visible: visible ?? true },
  })

  return NextResponse.json(testimonial, { status: 201 })
}