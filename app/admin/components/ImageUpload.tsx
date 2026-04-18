'use client'

import { useState, useRef } from 'react'

interface Props {
  value?: string
  onChange: (url: string) => void
  folder?: string
}

export default function ImageUpload({ value, onChange, folder = 'misc' }: Props) {
  const [uploading, setUploading] = useState(false)
  const [preview, setPreview] = useState(value || '')
  const inputRef = useRef<HTMLInputElement>(null)

  async function handleFile(file: File) {
    setUploading(true)
    const form = new FormData()
    form.append('file', file)
    form.append('folder', folder)

    const res = await fetch('/api/admin/upload', { method: 'POST', body: form })
    const data = await res.json()

    if (data.url) {
      setPreview(data.url)
      onChange(data.url)
    }
    setUploading(false)
  }

  function handleDrop(e: React.DragEvent) {
    e.preventDefault()
    const file = e.dataTransfer.files[0]
    if (file) handleFile(file)
  }

  return (
    <div>
      <div
        className="admin-form__upload"
        onClick={() => inputRef.current?.click()}
        onDrop={handleDrop}
        onDragOver={e => e.preventDefault()}
      >
        <span className="material-symbols-outlined">cloud_upload</span>
        <p>{uploading ? 'Téléchargement…' : 'Cliquer ou déposer une image ici'}</p>
        <input
          ref={inputRef}
          type="file"
          accept="image/*"
          style={{ display: 'none' }}
          onChange={e => {
            const file = e.target.files?.[0]
            if (file) handleFile(file)
          }}
        />
      </div>
      {preview && (
        <img src={preview} alt="Aperçu" className="admin-form__preview" />
      )}
    </div>
  )
}