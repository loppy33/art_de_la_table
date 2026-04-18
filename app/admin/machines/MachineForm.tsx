'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import ImageUpload from '../components/ImageUpload'
import { useToast } from '../hooks/useToast'

export default function MachineForm({ id }: { id?: string }) {
  const router = useRouter()
  const { show, ToastEl } = useToast()
  const isEdit = !!id

  const [form, setForm] = useState({
    name: '',
    description: '',
    image: '',
    highlights: [''],
    specs: {} as Record<string, string>,
  })
  const [specKey, setSpecKey] = useState('')
  const [specVal, setSpecVal] = useState('')
  const [saving, setSaving] = useState(false)

  useEffect(() => {
    if (!isEdit) return
    fetch(`/api/admin/machines/${id}`)
      .then(r => r.json())
      .then(data => setForm({
        name: data.name ?? '',
        description: data.description ?? '',
        image: data.image ?? '',
        highlights: data.highlights?.length ? data.highlights : [''],
        specs: data.specs ?? {},
      }))
  }, [id])

  function setHighlight(i: number, val: string) {
    setForm(prev => {
      const highlights = [...prev.highlights]
      highlights[i] = val
      return { ...prev, highlights }
    })
  }

  function addHighlight() {
    setForm(prev => ({ ...prev, highlights: [...prev.highlights, ''] }))
  }

  function removeHighlight(i: number) {
    setForm(prev => ({
      ...prev,
      highlights: prev.highlights.filter((_, idx) => idx !== i),
    }))
  }

  function addSpec() {
    if (!specKey) return
    setForm(prev => ({ ...prev, specs: { ...prev.specs, [specKey]: specVal } }))
    setSpecKey('')
    setSpecVal('')
  }

  function removeSpec(key: string) {
    setForm(prev => {
      const specs = { ...prev.specs }
      delete specs[key]
      return { ...prev, specs }
    })
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setSaving(true)

    const payload = {
      ...form,
      highlights: form.highlights.filter(Boolean),
    }

    const method = isEdit ? 'PATCH' : 'POST'
    const url = isEdit ? `/api/admin/machines/${id}` : '/api/admin/machines'

    const res = await fetch(url, {
      method,
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload),
    })

    if (res.ok) {
      show(isEdit ? 'Machine mise à jour' : 'Machine créée')
      setTimeout(() => router.push('/admin/machines'), 1000)
    } else {
      const err = await res.json()
      show(err.error || 'Une erreur est survenue', 'error')
    }
    setSaving(false)
  }

  return (
    <>
      {ToastEl}
      <div className="admin-header">
        <h1 className="admin-header__title">
          {isEdit ? 'Modifier la machine' : 'Nouvelle machine'}
        </h1>
        <Link href="/admin/machines" className="admin-btn admin-btn--ghost">
          <span className="material-symbols-outlined">arrow_back</span>
          Retour
        </Link>
      </div>

      <form className="admin-form" onSubmit={handleSubmit}>
        <div className="admin-form__section">
          <h2 className="admin-form__section-title">Informations générales</h2>
          <div className="admin-form__field">
            <label className="admin-form__label">Nom *</label>
            <input
              className="admin-form__input"
              value={form.name}
              onChange={e => setForm(p => ({ ...p, name: e.target.value }))}
              required
              placeholder="ex: Lave-vaisselle Éclat Pro 600"
            />
          </div>
          <div className="admin-form__field">
            <label className="admin-form__label">Description</label>
            <textarea
              className="admin-form__textarea"
              value={form.description}
              onChange={e => setForm(p => ({ ...p, description: e.target.value }))}
              placeholder="Description technique, usage, avantages…"
              rows={4}
            />
          </div>
        </div>

        <div className="admin-form__section">
          <h2 className="admin-form__section-title">Image</h2>
          <ImageUpload
            value={form.image}
            onChange={url => setForm(p => ({ ...p, image: url }))}
            folder="machines"
          />
        </div>

        <div className="admin-form__section">
          <h2 className="admin-form__section-title">Points forts</h2>
          {form.highlights.map((h, i) => (
            <div key={i} className="admin-form__field" style={{ flexDirection: 'row', alignItems: 'center', gap: 'var(--spacing-2)' }}>
              <input
                className="admin-form__input"
                value={h}
                onChange={e => setHighlight(i, e.target.value)}
                placeholder={`Point fort ${i + 1}`}
                style={{ flex: 1 }}
              />
              {form.highlights.length > 1 && (
                <button type="button" className="admin-btn admin-btn--danger" onClick={() => removeHighlight(i)}>
                  <span className="material-symbols-outlined">close</span>
                </button>
              )}
            </div>
          ))}
          <button type="button" className="admin-btn admin-btn--ghost" onClick={addHighlight}>
            <span className="material-symbols-outlined">add</span>
            Ajouter un point fort
          </button>
        </div>

        <div className="admin-form__section">
          <h2 className="admin-form__section-title">Fiche technique</h2>
          {Object.entries(form.specs).map(([key, val]) => (
            <div key={key} style={{ display: 'flex', gap: 'var(--spacing-2)', marginBottom: 'var(--spacing-2)', alignItems: 'center' }}>
              <span style={{ fontWeight: 600, minWidth: 160, fontSize: 'var(--text-body-md)' }}>{key}</span>
              <span style={{ flex: 1, fontSize: 'var(--text-body-md)' }}>{val}</span>
              <button type="button" className="admin-btn admin-btn--danger" onClick={() => removeSpec(key)}>
                <span className="material-symbols-outlined">close</span>
              </button>
            </div>
          ))}
          <div style={{ display: 'flex', gap: 'var(--spacing-2)', marginTop: 'var(--spacing-2)' }}>
            <input
              className="admin-form__input"
              value={specKey}
              onChange={e => setSpecKey(e.target.value)}
              placeholder="Caractéristique (ex: Capacité)"
              style={{ flex: 1 }}
            />
            <input
              className="admin-form__input"
              value={specVal}
              onChange={e => setSpecVal(e.target.value)}
              placeholder="Valeur (ex: 60 couverts/h)"
              style={{ flex: 1 }}
            />
            <button type="button" className="admin-btn admin-btn--ghost" onClick={addSpec}>
              <span className="material-symbols-outlined">add</span>
            </button>
          </div>
        </div>

        <div className="admin-form__actions">
          <Link href="/admin/machines" className="admin-btn admin-btn--ghost">Annuler</Link>
          <button type="submit" className="admin-btn admin-btn--primary" disabled={saving}>
            {saving ? 'Enregistrement…' : isEdit ? 'Mettre à jour' : 'Créer la machine'}
          </button>
        </div>
      </form>
    </>
  )
}