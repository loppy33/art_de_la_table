import { NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
import { requireAdmin } from '@/lib/auth-guard'

// DELETE /api/admin/newsletter/[id]
export async function DELETE(_: Request, { params }: { params: { id: string } }) {
  const guard = await requireAdmin()
  if (guard.error) return guard.error

  await prisma.newsletterSubscriber.delete({ where: { id: params.id } })
  return NextResponse.json({ success: true })
}