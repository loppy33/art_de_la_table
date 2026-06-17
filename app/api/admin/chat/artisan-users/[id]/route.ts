// app/api/admin/chat/artisan-users/[id]/route.ts
import { NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
import { requireAdmin } from '@/lib/auth-guard'

export async function DELETE(
  request: Request, // или NextRequest
  { params }: { params: { id: string } }
) {
  const guard = await requireAdmin()
  if (guard.error) return guard.error

  await prisma.chatUser.delete({ where: { id: params.id } })
  return NextResponse.json({ success: true })
}
