import { NextResponse } from 'next/server'
import { requireAdmin } from '@/lib/auth-guard'
import { createClient } from '@supabase/supabase-js'

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY! // service role — только на сервере
)

// POST /api/admin/upload
// FormData: file (File), folder (string) — ex: "products", "artisans", "machines"
export async function POST(req: Request) {
  const guard = await requireAdmin()
  if (guard.error) return guard.error

  const form = await req.formData()
  const file = form.get('file') as File | null
  const folder = (form.get('folder') as string) || 'misc'

  if (!file) {
    return NextResponse.json({ error: 'Fichier manquant' }, { status: 400 })
  }

  const ext = file.name.split('.').pop()
  const filename = `${folder}/${Date.now()}-${Math.random().toString(36).slice(2)}.${ext}`
  const buffer = Buffer.from(await file.arrayBuffer())

  const { error } = await supabase.storage
    .from('media')
    .upload(filename, buffer, {
      contentType: file.type,
      upsert: false,
    })

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 })
  }

  const { data } = supabase.storage.from('media').getPublicUrl(filename)

  return NextResponse.json({ url: data.publicUrl }, { status: 201 })
}