import { NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
import { requireAdmin } from '@/lib/auth-guard'

// GET /api/admin/artisans/[id]
export async function GET(
  _: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const guard = await requireAdmin()
  if (guard.error) return guard.error

  const { id } = await params

  const artisan = await prisma.artisan.findUnique({
    where: { id },
    include: { products: true },
  })

  if (!artisan) {
    return NextResponse.json(
      { error: 'Introuvable' },
      { status: 404 }
    )
  }

  return NextResponse.json(artisan)
}

// PATCH /api/admin/artisans/[id]
export async function PATCH(
  req: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const guard = await requireAdmin()
  if (guard.error) return guard.error

  const { id } = await params
  const body = await req.json()

  const artisan = await prisma.artisan.update({
    where: { id },
    data: body,
  })

  return NextResponse.json(artisan)
}

// DELETE /api/admin/artisans/[id]
export async function DELETE(
  _: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const guard = await requireAdmin()
  if (guard.error) return guard.error

  const { id } = await params

  await prisma.artisan.delete({
    where: { id },
  })

  return NextResponse.json({ success: true })
}