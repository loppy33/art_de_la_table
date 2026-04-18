'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { useToast } from '../hooks/useToast'

export default function TestimonialForm({ id }: { id?: string }) {
  const router = useRouter()
  const { show, ToastEl } = useToast()
  const isEdit = !!id

  const [form, setForm] = useState({ author: '', role: '', quote: '', visible: true })
  const [saving, setSaving] = useState(false)

  useEffect(() => {
    if (!isEdit) return
    fetch(`/api/admin/testimonials`)
      .then(r => r.json())
      .then((data: any[]) => {
        const t = data.find(x => x.id === id)
        if (t) setForm({ author: t.author, role: t.role ?? '', quote: t.quote, visible: t.visible })
      })
  }, [id])

  function set(key: string, value: string | boolean) {
    setForm(prev => ({ ...prev, [key]: value }))
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setSaving(true)

    const method = isEdit ? 'PATCH' : 'POST'
    const url = isEdit ? `/api/admin/testimonials/${id}` : '/api/admin/testimonials'

    const res = await fetch(url, {
      method,
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(form),
    })

    if (res.ok) {
      show(isEdit ? 'Témoignage mis à jour' : 'Témoignage créé')
      setTimeout(() => router.push('/admin/testimonials'), 1000)
    } else {
      show('Une erreur est survenue', 'error')
    }
    setSaving(false)
  }

  return (
    <>
      {ToastEl}
      <div className="admin-header">
        <h1 className="admin-header__title">
          {isEdit ? 'Modifier le témoignage' : 'Nouveau témoignage'}
        </h1>
        <Link href="/admin/testimonials" className="admin-btn admin-btn--ghost">
          <span className="material-symbols-outlined">arrow_back</span>
          Retour
        </Link>
      </div>

      <form className="admin-form" onSubmit={handleSubmit}>
        <div className="admin-form__section">
          <h2 className="admin-form__section-title">Auteur</h2>
          <div className="admin-form__row">
            <div className="admin-form__field">
              <label className="admin-form__label">Nom *</label>
              <input
                className="admin-form__input"
                value={form.author}
                onChange={e => set('author', e.target.value)}
                required
                placeholder="ex: Jean-Luc Moreau"
              />
            </div>
            <div className="admin-form__field">
              <label className="admin-form__label">Rôle / Établissement</label>
              <input
                className="admin-form__input"
                value={form.role}
                onChange={e => set('role', e.target.value)}
                placeholder="ex: Directeur Général, Palace Parisien"
              />
            </div>
          </div>
        </div>

        <div className="admin-form__section">
          <h2 className="admin-form__section-title">Citation</h2>
          <div className="admin-form__field">
            <label className="admin-form__label">Texte *</label>
            <textarea
              className="admin-form__textarea"
              value={form.quote}
              onChange={e => set('quote', e.target.value)}
              required
              placeholder="Le témoignage du client…"
              rows={4}
            />
          </div>
          <div className="admin-form__field">
            <label className="admin-form__label" style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
              <input
                type="checkbox"
                checked={form.visible}
                onChange={e => set('visible', e.target.checked)}
              />
              Afficher sur le site
            </label>
          </div>
        </div>

        <div className="admin-form__actions">
          <Link href="/admin/testimonials" className="admin-btn admin-btn--ghost">Annuler</Link>
          <button type="submit" className="admin-btn admin-btn--primary" disabled={saving}>
            {saving ? 'Enregistrement…' : isEdit ? 'Mettre à jour' : 'Créer le témoignage'}
          </button>
        </div>
      </form>
    </>
  )
}