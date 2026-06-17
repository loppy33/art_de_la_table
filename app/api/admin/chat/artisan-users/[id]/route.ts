// app/api/admin/chat/artisan-users/[id]/route.ts
import { NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
import { requireAdmin } from '@/lib/auth-guard'

export async function DELETE(
  request: Request,
  { params }: { params: Promise<{ id: string }> } 
) {
  // 2. Достаем id через await, так как params теперь асинхронные
  const { id } = await params;
  const guard = await requireAdmin()
  if (guard.error) return guard.error

  await prisma.chatUser.delete({ where: { id: id } })
  return NextResponse.json({ success: true })
}
