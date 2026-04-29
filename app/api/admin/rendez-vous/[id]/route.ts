import { NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
import { requireAdmin } from '@/lib/auth-guard'

// PATCH /api/admin/rendez-vous/[id]
export async function PATCH(
  req: Request,
  context: { params: Promise<{ id: string }> }
) {
  const { id } = await context.params

  const guard = await requireAdmin()
  if (guard.error) return guard.error

  const body = await req.json()

  const rdv = await prisma.rendezVous.update({
    where: { id },
    data: body,
  })

  return Response.json(rdv)
}

// DELETE /api/admin/rendez-vous/[id]
export async function DELETE(
  req: Request,
  context: { params: Promise<{ id: string }> }
) {
  const { id } = await context.params

  const guard = await requireAdmin()
  if (guard.error) return guard.error

  await prisma.rendezVous.delete({
    where: { id },
  })

  return NextResponse.json({ success: true })
}