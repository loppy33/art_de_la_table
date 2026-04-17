import { NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
import { requireAdmin } from '@/lib/auth-guard'

// GET /api/admin/artisans/[id]
export async function GET(_: Request, { params }: { params: { id: string } }) {
  const guard = await requireAdmin()
  if (guard.error) return guard.error

  const artisan = await prisma.artisan.findUnique({
    where: { id: params.id },
    include: { products: true },
  })

  if (!artisan) return NextResponse.json({ error: 'Introuvable' }, { status: 404 })
  return NextResponse.json(artisan)
}

// PATCH /api/admin/artisans/[id]
export async function PATCH(req: Request, { params }: { params: { id: string } }) {
  const guard = await requireAdmin()
  if (guard.error) return guard.error

  const body = await req.json()
  const artisan = await prisma.artisan.update({
    where: { id: params.id },
    data: body,
  })

  return NextResponse.json(artisan)
}

// DELETE /api/admin/artisans/[id]
export async function DELETE(_: Request, { params }: { params: { id: string } }) {
  const guard = await requireAdmin()
  if (guard.error) return guard.error

  await prisma.artisan.delete({ where: { id: params.id } })
  return NextResponse.json({ success: true })
}