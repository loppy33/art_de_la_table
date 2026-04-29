import { NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
import { requireAdmin } from '@/lib/auth-guard'

// GET /api/admin/rendez-vous
export async function GET() {
  const guard = await requireAdmin()
  if (guard.error) return guard.error

  const rdvs = await prisma.rendezVous.findMany({
    orderBy: { createdAt: 'desc' },
  })

  return NextResponse.json(rdvs)
}