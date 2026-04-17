import { NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
import { requireAdmin } from '@/lib/auth-guard'

// GET /api/admin/content
// Возвращает всё содержимое в виде { key: value }
export async function GET() {
  const guard = await requireAdmin()
  if (guard.error) return guard.error

  const rows = await prisma.siteContent.findMany()
  const content = Object.fromEntries(rows.map((r) => [r.key, r.value]))

  return NextResponse.json(content)
}

// PUT /api/admin/content
// Body: { key: string, value: string }
export async function PUT(req: Request) {
  const guard = await requireAdmin()
  if (guard.error) return guard.error

  const body = await req.json()
  const { key, value } = body

  if (!key || value === undefined) {
    return NextResponse.json({ error: 'key et value sont requis' }, { status: 400 })
  }

  const row = await prisma.siteContent.upsert({
    where: { key },
    update: { value },
    create: { key, value },
  })

  return NextResponse.json(row)
}