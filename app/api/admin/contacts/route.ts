import { NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
import { requireAdmin } from '@/lib/auth-guard'

// GET /api/admin/contacts
export async function GET() {
  const guard = await requireAdmin()
  if (guard.error) return guard.error

  const contacts = await prisma.contactRequest.findMany({
    orderBy: { createdAt: 'desc' },
  })

  return NextResponse.json(contacts)
}