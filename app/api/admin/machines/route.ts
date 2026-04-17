import { NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
import { requireAdmin } from '@/lib/auth-guard'

// GET /api/admin/machines
export async function GET() {
  const guard = await requireAdmin()
  if (guard.error) return guard.error

  const machines = await prisma.machine.findMany({
    orderBy: { createdAt: 'desc' },
  })

  return NextResponse.json(machines)
}

// POST /api/admin/machines
export async function POST(req: Request) {
  const guard = await requireAdmin()
  if (guard.error) return guard.error

  const body = await req.json()
  const { name, description, image, specs, highlights } = body

  if (!name) {
    return NextResponse.json({ error: 'name est requis' }, { status: 400 })
  }

  const machine = await prisma.machine.create({
    data: {
      name,
      description,
      image,
      specs: specs ?? {},
      highlights: highlights ?? [],
    },
  })

  return NextResponse.json(machine, { status: 201 })
}