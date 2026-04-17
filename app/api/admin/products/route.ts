import { NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
import { requireAdmin } from '@/lib/auth-guard'

// GET /api/admin/products
export async function GET(req: Request) {
  const guard = await requireAdmin()
  if (guard.error) return guard.error

  const { searchParams } = new URL(req.url)
  const category = searchParams.get('category')
  const artisanId = searchParams.get('artisanId')

  const products = await prisma.product.findMany({
    where: {
      ...(category && { category: category as any }),
      ...(artisanId && { artisanId }),
    },
    include: { artisan: { select: { id: true, name: true } } },
    orderBy: { createdAt: 'desc' },
  })

  return NextResponse.json(products)
}

// POST /api/admin/products
export async function POST(req: Request) {
  const guard = await requireAdmin()
  if (guard.error) return guard.error

  const body = await req.json()
  const { name, description, image, category, artisanId } = body

  if (!name || !category || !artisanId) {
    return NextResponse.json(
      { error: 'name, category et artisanId sont requis' },
      { status: 400 }
    )
  }

  const product = await prisma.product.create({
    data: { name, description, image, category, artisanId },
    include: { artisan: { select: { id: true, name: true } } },
  })

  return NextResponse.json(product, { status: 201 })
}