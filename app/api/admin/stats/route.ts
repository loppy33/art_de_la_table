import { NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
import { requireAdmin } from '@/lib/auth-guard'

// GET /api/admin/stats
export async function GET() {
  const guard = await requireAdmin()
  if (guard.error) return guard.error

  const [products, artisans, machines, testimonials] = await Promise.all([
    prisma.product.count(),
    prisma.artisan.count(),
    prisma.machine.count(),
    prisma.testimonial.count({ where: { visible: true } }),
  ])

  return NextResponse.json({ products, artisans, machines, testimonials })
}