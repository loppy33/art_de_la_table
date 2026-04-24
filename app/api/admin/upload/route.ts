import { NextResponse } from 'next/server'
import { requireAdmin } from '@/lib/auth-guard'
import { createClient } from '@supabase/supabase-js'

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
)

export async function POST(req: Request) {
  try {
    console.log("📥 UPLOAD START")

    const guard = await requireAdmin()
    if (guard.error) return guard.error

    const form = await req.formData()
    const file = form.get('file') as File | null
    const folder = (form.get('folder') as string) || 'misc'

    if (!file) {
      return NextResponse.json(
        { error: 'No file provided' },
        { status: 400 }
      )
    }

    const fileExt = file.name.split('.').pop()
    const fileName = `${folder}/${Date.now()}-${Math.random()
      .toString(36)
      .substring(2)}.${fileExt}`

    const arrayBuffer = await file.arrayBuffer()

    console.log("⬆️ Uploading:", fileName)

    const { error } = await supabase.storage
      .from('media') // 👈 bucket MUST exist
      .upload(fileName, arrayBuffer, {
        contentType: file.type,
        upsert: false,
      })

    if (error) {
      console.error("❌ SUPABASE ERROR:", error)
      return NextResponse.json(
        {
          error: error.message,
        },
        { status: 500 }
      )
    }

    const { data } = supabase.storage
      .from('media')
      .getPublicUrl(fileName)

    console.log("✅ UPLOADED:", data.publicUrl)

    return NextResponse.json(
      { url: data.publicUrl },
      { status: 201 }
    )
  } catch (err: any) {
    console.error("🔥 UPLOAD CRASH:", err)

    return NextResponse.json(
      {
        error: err.message || 'Unknown error',
      },
      { status: 500 }
    )
  }
}