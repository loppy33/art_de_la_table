import { NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
import { requireAdmin } from '@/lib/auth-guard'

// PATCH /api/admin/testimonials/[id]
export async function PATCH(
  req: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const guard = await requireAdmin()
  if (guard.error) return guard.error

  const { id } = await params
  const body = await req.json()

  const testimonial = await prisma.testimonial.update({
    where: { id },
    data: body,
  })

  return NextResponse.json(testimonial)
}

// DELETE /api/admin/testimonials/[id]
export async function DELETE(
  _: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const guard = await requireAdmin()
  if (guard.error) return guard.error

  const { id } = await params

  await prisma.testimonial.delete({
    where: { id },
  })

  return NextResponse.json({ success: true })
}