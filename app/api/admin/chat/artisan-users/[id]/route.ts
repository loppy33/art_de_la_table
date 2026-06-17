import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
import { requireAdmin } from '@/lib/auth-guard'

export async function DELETE(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params

  const guard = await requireAdmin()
  if (guard.error) return guard.error

  await prisma.chatRoom.deleteMany({
    where: {
      OR: [
        { artisanId: id },
        { clientId: id },
      ],
    },
  })

  await prisma.chatUser.delete({
    where: { id },
  })

  return NextResponse.json({ success: true })
}