'use client'

import { useEffect, useState } from 'react'
import { useToast } from '../hooks/useToast'

interface Subscriber {
  id: string
  email: string
  createdAt: string
}

export default function NewsletterPage() {
  const [subscribers, setSubscribers] = useState<Subscriber[]>([])
  const [loading, setLoading] = useState(true)
  const [search, setSearch] = useState('')
  const { show, ToastEl } = useToast()

  async function load() {
    const res = await fetch('/api/admin/newsletter')
    setSubscribers(await res.json())
    setLoading(false)
  }

  async function handleDelete(id: string, email: string) {
    if (!confirm(`Désinscrire "${email}" ?`)) return
    const res = await fetch(`/api/admin/newsletter/${id}`, { method: 'DELETE' })
    if (res.ok) {
      show('Abonné supprimé')
      setSubscribers(prev => prev.filter(s => s.id !== id))
    } else {
      show('Erreur', 'error')
    }
  }

  function exportCSV() {
    const rows = [
      ['Email', 'Date inscription'],
      ...subscribers.map(s => [
        s.email,
        new Date(s.createdAt).toLocaleDateString('fr-FR'),
      ]),
    ]
    const csv = rows.map(r => r.join(',')).join('\n')
    const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' })
    const url = URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = `newsletter-${new Date().toISOString().slice(0, 10)}.csv`
    a.click()
    URL.revokeObjectURL(url)
  }

  useEffect(() => { load() }, [])

  const filtered = subscribers.filter(s =>
    s.email.toLowerCase().includes(search.toLowerCase())
  )

  return (
    <>
      {ToastEl}
      <div className="admin-header">
        <h1 className="admin-header__title">
          Newsletter
          <span style={{ fontSize: 'var(--text-body-md)', fontFamily: 'var(--font-body)', fontWeight: 400, color: 'var(--outline)', marginLeft: 'var(--spacing-3)' }}>
            {subscribers.length} abonné{subscribers.length !== 1 ? 's' : ''}
          </span>
        </h1>
        <div className="admin-header__actions">
          <button className="admin-btn admin-btn--ghost" onClick={exportCSV} disabled={subscribers.length === 0}>
            <span className="material-symbols-outlined">download</span>
            Exporter CSV
          </button>
        </div>
      </div>

      {/* Barre de recherche */}
      <div style={{ marginBottom: 'var(--spacing-4)', maxWidth: 360 }}>
        <input
          className="admin-form__input"
          placeholder="Rechercher un email…"
          value={search}
          onChange={e => setSearch(e.target.value)}
        />
      </div>

      {loading ? (
        <p>Chargement…</p>
      ) : subscribers.length === 0 ? (
        <div className="admin-empty">
          <span className="material-symbols-outlined">mail</span>
          <p>Aucun abonné pour l'instant</p>
        </div>
      ) : (
        <div className="admin-table">
          <table>
            <thead>
              <tr>
                <th>Email</th>
                <th>Date d'inscription</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {filtered.map(s => (
                <tr key={s.id}>
                  <td>
                    <a href={`mailto:${s.email}`} style={{ color: 'var(--primary)', fontWeight: 500 }}>
                      {s.email}
                    </a>
                  </td>
                  <td style={{ color: 'var(--on-surface-variant)' }}>
                    {new Date(s.createdAt).toLocaleDateString('fr-FR', {
                      day: 'numeric', month: 'long', year: 'numeric'
                    })}
                  </td>
                  <td>
                    <button
                      className="admin-btn admin-btn--danger"
                      onClick={() => handleDelete(s.id, s.email)}
                    >
                      <span className="material-symbols-outlined">person_remove</span>
                      Désinscrire
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          {filtered.length === 0 && search && (
            <div style={{ padding: 'var(--spacing-6)', textAlign: 'center', color: 'var(--outline)' }}>
              Aucun résultat pour "{search}"
            </div>
          )}
        </div>
      )}
    </>
  )
}