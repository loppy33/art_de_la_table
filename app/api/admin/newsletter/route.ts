import { NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
import { requireAdmin } from '@/lib/auth-guard'

// GET /api/admin/newsletter
export async function GET() {
  const guard = await requireAdmin()
  if (guard.error) return guard.error

  const subscribers = await prisma.newsletterSubscriber.findMany({
    orderBy: { createdAt: 'desc' },
  })

  return NextResponse.json(subscribers)
}