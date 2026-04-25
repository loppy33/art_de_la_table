import { NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
import { requireAdmin } from '@/lib/auth-guard'

// PATCH /api/admin/contacts/[id] — marquer comme lu
export async function PATCH(req: Request, { params }: { params: { id: string } }) {
  const guard = await requireAdmin()
  if (guard.error) return guard.error

  const body = await req.json()
  const contact = await prisma.contactRequest.update({
    where: { id: params.id },
    data: { read: body.read ?? true },
  })

  return NextResponse.json(contact)
}

// DELETE /api/admin/contacts/[id]
export async function DELETE(_: Request, { params }: { params: { id: string } }) {
  const guard = await requireAdmin()
  if (guard.error) return guard.error

  await prisma.contactRequest.delete({ where: { id: params.id } })
  return NextResponse.json({ success: true })
}