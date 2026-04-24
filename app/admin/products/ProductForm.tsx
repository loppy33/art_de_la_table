'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import ImageUpload from '../components/ImageUpload'
import { useToast } from '../hooks/useToast'

interface Artisan { id: string; name: string }

const CATEGORIES = [
  { value: 'VAISSELLE', label: 'Vaisselle' },
  { value: 'VERRERIE', label: 'Verrerie' },
  { value: 'COUVERTS', label: 'Couverts' },
  { value: 'LINGE_DE_TABLE', label: 'Linge de table' },
  { value: 'DECORATION', label: 'Décoration' },
  { value: 'AUTRE', label: 'Autre' },
]

export default function ProductForm({ id }: { id?: string }) {
  const router = useRouter()
  const { show, ToastEl } = useToast()
  const isEdit = !!id

  const [form, setForm] = useState({
    name: '',
    description: '',
    image: '',
    category: 'VAISSELLE',
    artisanId: '',
  })
  const [artisans, setArtisans] = useState<Artisan[]>([])
  const [saving, setSaving] = useState(false)

  useEffect(() => {
    fetch('/api/admin/artisans')
      .then(r => r.json())
      .then((data: Artisan[]) => {
        setArtisans(data)
        if (!isEdit && data.length > 0) {
          setForm(prev => ({ ...prev, artisanId: data[0].id }))
        }
      })

    if (isEdit) {
      fetch(`/api/admin/products/${id}`)

        .then(r => r.json())
        .then(data => {

          console.log("PRODUCT API RESPONSE:", data)

          setForm({
            name: data.name ?? '',
            description: data.description ?? '',
            image: data.image ?? '',
            category: data.category ?? 'VAISSELLE',
            artisanId: data.artisanId ?? '',
          })
        }
        )
    }
  }, [id])

  function set(key: string, value: string) {
    setForm(prev => ({ ...prev, [key]: value }))
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setSaving(true)

    const method = isEdit ? 'PATCH' : 'POST'
    const url = isEdit ? `/api/admin/products/${id}` : '/api/admin/products'

    const res = await fetch(url, {
      method,
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(form),
    })

    if (res.ok) {
      show(isEdit ? 'Produit mis à jour' : 'Produit créé')
      setTimeout(() => router.push('/admin/products'), 1000)
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
          {isEdit ? 'Modifier le produit' : 'Nouveau produit'}
        </h1>
        <Link href="/admin/products" className="admin-btn admin-btn--ghost">
          <span className="material-symbols-outlined">arrow_back</span>
          Retour
        </Link>
      </div>

      <form className="admin-form" onSubmit={handleSubmit}>
        <div className="admin-form__section">
          <h2 className="admin-form__section-title">Informations</h2>

          <div className="admin-form__field">
            <label className="admin-form__label">Nom du produit *</label>
            <input
              className="admin-form__input"
              value={form.name}
              onChange={e => set('name', e.target.value)}
              required
              placeholder="ex: Assiette plate Riou N°3"
            />
          </div>

          <div className="admin-form__row">
            <div className="admin-form__field">
              <label className="admin-form__label">Catégorie *</label>
              <select
                className="admin-form__select"
                value={form.category}
                onChange={e => set('category', e.target.value)}
              >
                {CATEGORIES.map(c => (
                  <option key={c.value} value={c.value}>{c.label}</option>
                ))}
              </select>
            </div>

            <div className="admin-form__field">
              <label className="admin-form__label">Artisan *</label>
              <select
                className="admin-form__select"
                value={form.artisanId}
                onChange={e => set('artisanId', e.target.value)}
                required
              >
                {artisans.length === 0 && (
                  <option value="">Aucun artisan — créez-en un d'abord</option>
                )}
                {artisans.map(a => (
                  <option key={a.id} value={a.id}>{a.name}</option>
                ))}
              </select>
            </div>
          </div>

          <div className="admin-form__field">
            <label className="admin-form__label">Description</label>
            <textarea
              className="admin-form__textarea"
              value={form.description}
              onChange={e => set('description', e.target.value)}
              placeholder="Description du produit, matériaux, dimensions…"
              rows={4}
            />
          </div>
        </div>

        <div className="admin-form__section">
          <h2 className="admin-form__section-title">Image</h2>
          <ImageUpload
            value={form.image}
            onChange={url => set('image', url)}
            folder="products"
          />
        </div>

        <div className="admin-form__actions">
          <Link href="/admin/products" className="admin-btn admin-btn--ghost">Annuler</Link>
          <button type="submit" className="admin-btn admin-btn--primary" disabled={saving}>
            {saving ? 'Enregistrement…' : isEdit ? 'Mettre à jour' : 'Créer le produit'}
          </button>
        </div>
      </form>
    </>
  )
}