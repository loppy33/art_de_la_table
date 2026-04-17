import { NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
import { requireAdmin } from '@/lib/auth-guard'

// GET /api/admin/products/[id]
export async function GET(_: Request, { params }: { params: { id: string } }) {
  const guard = await requireAdmin()
  if (guard.error) return guard.error

  const product = await prisma.product.findUnique({
    where: { id: params.id },
    include: { artisan: true },
  })

  if (!product) return NextResponse.json({ error: 'Introuvable' }, { status: 404 })
  return NextResponse.json(product)
}

// PATCH /api/admin/products/[id]
export async function PATCH(req: Request, { params }: { params: { id: string } }) {
  const guard = await requireAdmin()
  if (guard.error) return guard.error

  const body = await req.json()
  const product = await prisma.product.update({
    where: { id: params.id },
    data: body,
    include: { artisan: { select: { id: true, name: true } } },
  })

  return NextResponse.json(product)
}

// DELETE /api/admin/products/[id]
export async function DELETE(_: Request, { params }: { params: { id: string } }) {
  const guard = await requireAdmin()
  if (guard.error) return guard.error

  await prisma.product.delete({ where: { id: params.id } })
  return NextResponse.json({ success: true })
}