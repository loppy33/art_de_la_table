'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'
import { useToast } from '../hooks/useToast'

interface Testimonial {
  id: string
  author: string
  role?: string
  quote: string
  visible: boolean
}

export default function TestimonialsPage() {
  const [items, setItems] = useState<Testimonial[]>([])
  const [loading, setLoading] = useState(true)
  const { show, ToastEl } = useToast()

  async function load() {
    const res = await fetch('/api/admin/testimonials')
    setItems(await res.json())
    setLoading(false)
  }

  async function toggleVisible(item: Testimonial) {
    const res = await fetch(`/api/admin/testimonials/${item.id}`, {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ visible: !item.visible }),
    })
    if (res.ok) {
      show(item.visible ? 'Masqué' : 'Rendu visible')
      setItems(prev => prev.map(t => t.id === item.id ? { ...t, visible: !t.visible } : t))
    }
  }

  async function handleDelete(id: string, author: string) {
    if (!confirm(`Supprimer le témoignage de "${author}" ?`)) return
    const res = await fetch(`/api/admin/testimonials/${id}`, { method: 'DELETE' })
    if (res.ok) {
      show('Témoignage supprimé')
      setItems(prev => prev.filter(t => t.id !== id))
    } else {
      show('Erreur', 'error')
    }
  }

  useEffect(() => { load() }, [])

  return (
    <>
      {ToastEl}
      <div className="admin-header">
        <h1 className="admin-header__title">Témoignages</h1>
        <div className="admin-header__actions">
          <Link href="/admin/testimonials/new" className="admin-btn admin-btn--primary">
            <span className="material-symbols-outlined">add</span>
            Nouveau témoignage
          </Link>
        </div>
      </div>

      {loading ? (
        <p>Chargement…</p>
      ) : items.length === 0 ? (
        <div className="admin-empty">
          <span className="material-symbols-outlined">format_quote</span>
          <p>Aucun témoignage pour l'instant</p>
          <Link href="/admin/testimonials/new" className="admin-btn admin-btn--primary">
            Ajouter un témoignage
          </Link>
        </div>
      ) : (
        <div className="admin-table">
          <table>
            <thead>
              <tr>
                <th>Auteur</th>
                <th>Rôle</th>
                <th>Citation</th>
                <th>Visible</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {items.map(t => (
                <tr key={t.id}>
                  <td style={{ fontWeight: 500 }}>{t.author}</td>
                  <td style={{ color: 'var(--on-surface-variant)' }}>{t.role ?? '—'}</td>
                  <td style={{ maxWidth: 280, color: 'var(--on-surface-variant)' }}>
                    {t.quote.length > 80 ? t.quote.slice(0, 80) + '…' : t.quote}
                  </td>
                  <td>
                    <button
                      className={`admin-btn ${t.visible ? 'admin-btn--primary' : 'admin-btn--ghost'}`}
                      onClick={() => toggleVisible(t)}
                      title={t.visible ? 'Masquer' : 'Afficher'}
                    >
                      <span className="material-symbols-outlined">
                        {t.visible ? 'visibility' : 'visibility_off'}
                      </span>
                    </button>
                  </td>
                  <td>
                    <div className="admin-table__actions">
                      <Link href={`/admin/testimonials/${t.id}`} className="admin-btn admin-btn--ghost">
                        <span className="material-symbols-outlined">edit</span>
                        Modifier
                      </Link>
                      <button
                        className="admin-btn admin-btn--danger"
                        onClick={() => handleDelete(t.id, t.author)}
                      >
                        <span className="material-symbols-outlined">delete</span>
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </>
  )
}