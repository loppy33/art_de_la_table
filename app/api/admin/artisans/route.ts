import { NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
import { requireAdmin } from '@/lib/auth-guard'

// GET /api/admin/artisans
export async function GET() {
  const guard = await requireAdmin()
  if (guard.error) return guard.error

  const artisans = await prisma.artisan.findMany({
    include: { _count: { select: { products: true } } },
    orderBy: { name: 'asc' },
  })

  return NextResponse.json(artisans)
}

// POST /api/admin/artisans
export async function POST(req: Request) {
  const guard = await requireAdmin()
  if (guard.error) return guard.error

  const body = await req.json()
  const { name, slug, logo, history, featured } = body

  if (!name || !slug) {
    return NextResponse.json({ error: 'name et slug sont requis' }, { status: 400 })
  }

  const artisan = await prisma.artisan.create({
    data: { name, slug, logo, history, featured: featured ?? false },
  })

  return NextResponse.json(artisan, { status: 201 })
}