import { NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
import { requireAdmin } from '@/lib/auth-guard'

// GET /api/admin/machines/[id]
export async function GET(_: Request, { params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;

  const guard = await requireAdmin()
  if (guard.error) return guard.error

  const machine = await prisma.machine.findUnique({ where: { id: id } })
  if (!machine) return NextResponse.json({ error: 'Introuvable' }, { status: 404 })
  return NextResponse.json(machine)
}

// PATCH /api/admin/machines/[id]
export async function PATCH(req: Request, { params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;

  const guard = await requireAdmin()
  if (guard.error) return guard.error

  const body = await req.json()
  const machine = await prisma.machine.update({
    where: { id: id },
    data: body,
  })

  return NextResponse.json(machine)
}

// DELETE /api/admin/machines/[id]
export async function DELETE(_: Request, { params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;

  const guard = await requireAdmin()
  if (guard.error) return guard.error

  await prisma.machine.delete({ where: { id: id } })
  return NextResponse.json({ success: true })
}