import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
import { requireAdmin } from '@/lib/auth-guard'

// PATCH /api/admin/contacts/[id] — marquer comme lu
export async function PATCH(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;
  const guard = await requireAdmin()
  if (guard.error) return guard.error

  const body = await req.json()
  const contact = await prisma.contactRequest.update({
    where: { id: id },
    data: { read: body.read ?? true },
  })

  return NextResponse.json(contact)
}

// DELETE /api/admin/contacts/[id]
export async function DELETE(_: Request, { params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;

  const guard = await requireAdmin()
  if (guard.error) return guard.error

  await prisma.contactRequest.delete({ where: { id: id } })
  return NextResponse.json({ success: true })
}