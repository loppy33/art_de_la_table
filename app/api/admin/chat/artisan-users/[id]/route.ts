import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
import { requireAdmin } from '@/lib/auth-guard'

export async function DELETE(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    console.log("DELETE HIT", params)

    const { id } = await params

    const guard = await requireAdmin()
    console.log("GUARD:", guard)

    await prisma.chatUser.deleteMany({
      where: { id },
    })

    return NextResponse.json({ success: true })
  } catch (e) {
    console.error("DELETE ERROR:", e)
    return NextResponse.json(
      { error: "internal error" },
      { status: 500 }
    )
  }
}