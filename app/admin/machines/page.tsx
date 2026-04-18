'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'
import { useToast } from '../hooks/useToast'

interface Machine {
  id: string
  name: string
  description?: string
  image?: string
  highlights: string[]
}

export default function MachinesPage() {
  const [machines, setMachines] = useState<Machine[]>([])
  const [loading, setLoading] = useState(true)
  const { show, ToastEl } = useToast()

  async function load() {
    const res = await fetch('/api/admin/machines')
    setMachines(await res.json())
    setLoading(false)
  }

  async function handleDelete(id: string, name: string) {
    if (!confirm(`Supprimer "${name}" ?`)) return
    const res = await fetch(`/api/admin/machines/${id}`, { method: 'DELETE' })
    if (res.ok) {
      show('Machine supprimée')
      setMachines(prev => prev.filter(m => m.id !== id))
    } else {
      show('Erreur lors de la suppression', 'error')
    }
  }

  useEffect(() => { load() }, [])

  return (
    <>
      {ToastEl}
      <div className="admin-header">
        <h1 className="admin-header__title">Machines — Éclat de France</h1>
        <div className="admin-header__actions">
          <Link href="/admin/machines/new" className="admin-btn admin-btn--primary">
            <span className="material-symbols-outlined">add</span>
            Nouvelle machine
          </Link>
        </div>
      </div>

      {loading ? (
        <p>Chargement…</p>
      ) : machines.length === 0 ? (
        <div className="admin-empty">
          <span className="material-symbols-outlined">precision_manufacturing</span>
          <p>Aucune machine pour l'instant</p>
          <Link href="/admin/machines/new" className="admin-btn admin-btn--primary">
            Ajouter une machine
          </Link>
        </div>
      ) : (
        <div className="admin-table">
          <table>
            <thead>
              <tr>
                <th>Image</th>
                <th>Nom</th>
                <th>Points forts</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {machines.map(m => (
                <tr key={m.id}>
                  <td>
                    {m.image ? (
                      <img src={m.image} alt={m.name} className="admin-table__img" />
                    ) : (
                      <span className="material-symbols-outlined" style={{ color: 'var(--outline)' }}>image</span>
                    )}
                  </td>
                  <td>{m.name}</td>
                  <td style={{ color: 'var(--on-surface-variant)', fontSize: 'var(--text-label-md)' }}>
                    {m.highlights.slice(0, 2).join(' · ')}
                    {m.highlights.length > 2 && ` +${m.highlights.length - 2}`}
                  </td>
                  <td>
                    <div className="admin-table__actions">
                      <Link href={`/admin/machines/${m.id}`} className="admin-btn admin-btn--ghost">
                        <span className="material-symbols-outlined">edit</span>
                        Modifier
                      </Link>
                      <button
                        className="admin-btn admin-btn--danger"
                        onClick={() => handleDelete(m.id, m.name)}
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