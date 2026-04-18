'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'
import { useToast } from '../hooks/useToast'

interface Artisan {
  id: string
  name: string
  slug: string
  logo?: string
  featured: boolean
  _count: { products: number }
}

export default function ArtisansPage() {
  const [artisans, setArtisans] = useState<Artisan[]>([])
  const [loading, setLoading] = useState(true)
  const { show, ToastEl } = useToast()

  async function load() {
    const res = await fetch('/api/admin/artisans')
    setArtisans(await res.json())
    setLoading(false)
  }

  async function handleDelete(id: string, name: string) {
    if (!confirm(`Supprimer "${name}" ?`)) return
    const res = await fetch(`/api/admin/artisans/${id}`, { method: 'DELETE' })
    if (res.ok) {
      show('Artisan supprimé')
      setArtisans(prev => prev.filter(a => a.id !== id))
    } else {
      show('Erreur lors de la suppression', 'error')
    }
  }

  useEffect(() => { load() }, [])

  return (
    <>
      {ToastEl}
      <div className="admin-header">
        <h1 className="admin-header__title">Artisans</h1>
        <div className="admin-header__actions">
          <Link href="/admin/artisans/new" className="admin-btn admin-btn--primary">
            <span className="material-symbols-outlined">add</span>
            Nouvel artisan
          </Link>
        </div>
      </div>

      {loading ? (
        <p>Chargement…</p>
      ) : artisans.length === 0 ? (
        <div className="admin-empty">
          <span className="material-symbols-outlined">storefront</span>
          <p>Aucun artisan pour l'instant</p>
          <Link href="/admin/artisans/new" className="admin-btn admin-btn--primary">
            Ajouter le premier artisan
          </Link>
        </div>
      ) : (
        <div className="admin-table">
          <table>
            <thead>
              <tr>
                <th>Logo</th>
                <th>Nom</th>
                <th>Slug</th>
                <th>Produits</th>
                <th>Mis en avant</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {artisans.map(a => (
                <tr key={a.id}>
                  <td>
                    {a.logo ? (
                      <img src={a.logo} alt={a.name} className="admin-table__img" />
                    ) : (
                      <span className="material-symbols-outlined" style={{ color: 'var(--outline)' }}>
                        image
                      </span>
                    )}
                  </td>
                  <td>{a.name}</td>
                  <td style={{ color: 'var(--outline)', fontFamily: 'monospace' }}>{a.slug}</td>
                  <td>
                    <span className="admin-table__badge">{a._count.products}</span>
                  </td>
                  <td>
                    {a.featured ? (
                      <span className="material-symbols-outlined" style={{ color: 'var(--secondary)' }}>
                        star
                      </span>
                    ) : (
                      <span className="material-symbols-outlined" style={{ color: 'var(--outline)' }}>
                        star
                      </span>
                    )}
                  </td>
                  <td>
                    <div className="admin-table__actions">
                      <Link href={`/admin/artisans/${a.id}`} className="admin-btn admin-btn--ghost">
                        <span className="material-symbols-outlined">edit</span>
                        Modifier
                      </Link>
                      <button
                        className="admin-btn admin-btn--danger"
                        onClick={() => handleDelete(a.id, a.name)}
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