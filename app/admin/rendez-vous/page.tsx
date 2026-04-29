'use client'

import { useEffect, useState } from 'react'
import { useToast } from '../hooks/useToast'

interface RDV {
  id: string
  firstName: string
  lastName: string
  company?: string
  email: string
  phone?: string
  projectType: string
  preferredDate?: string
  preferredTime?: string
  message?: string
  status: 'PENDING' | 'CONFIRMED' | 'CANCELLED'
  read: boolean
  createdAt: string
}

const PROJECT_LABELS: Record<string, string> = {
  hotel: 'Équipement hôtelier',
  restaurant: 'Restaurant gastronomique',
  event: 'Événement & réception',
  audit: 'Audit F&B',
  sourcing: 'Sourcing artisans',
  other: 'Autre projet',
}

const STATUS_CONFIG = {
  PENDING: { label: 'En attente', color: '#d97706', bg: 'rgba(217, 119, 6, 0.1)' },
  CONFIRMED: { label: 'Confirmé', color: '#059669', bg: 'rgba(5, 150, 105, 0.1)' },
  CANCELLED: { label: 'Annulé', color: '#dc2626', bg: 'rgba(220, 38, 38, 0.1)' },
}

export default function RendezVousPage() {
  const [rdvs, setRdvs] = useState<RDV[]>([])
  const [loading, setLoading] = useState(true)
  const [selected, setSelected] = useState<RDV | null>(null)
  const [filter, setFilter] = useState<'PENDING' | 'CONFIRMED' | 'CANCELLED' | 'ALL'>('PENDING')
  const { show, ToastEl } = useToast()

  async function load() {
    const res = await fetch('/api/admin/rendez-vous')
    const data = await res.json()
    setRdvs(data)
    setLoading(false)
  }

  async function updateStatus(id: string, status: 'CONFIRMED' | 'CANCELLED') {
    const res = await fetch(`/api/admin/rendez-vous/${id}`, {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ status, read: true }),
    })
    if (res.ok) {
      const label = status === 'CONFIRMED' ? 'Rendez-vous confirmé' : 'Rendez-vous annulé'
      show(label)
      setRdvs(prev => prev.map(r => r.id === id ? { ...r, status, read: true } : r))
      setSelected(prev => prev?.id === id ? { ...prev, status, read: true } : prev)
    } else {
      show('Erreur', 'error')
    }
  }

  async function handleDelete(id: string) {
    if (!confirm('Supprimer cette demande ?')) return
    const res = await fetch(`/api/admin/rendez-vous/${id}`, { method: 'DELETE' })
    if (res.ok) {
      show('Demande supprimée')
      setRdvs(prev => prev.filter(r => r.id !== id))
      if (selected?.id === id) setSelected(null)
    } else {
      show('Erreur', 'error')
    }
  }

  async function markRead(rdv: RDV) {
    if (rdv.read) return
    await fetch(`/api/admin/rendez-vous/${rdv.id}`, {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ read: true }),
    })
    setRdvs(prev => prev.map(r => r.id === rdv.id ? { ...r, read: true } : r))
  }

  function openRdv(rdv: RDV) {
    setSelected(rdv)
    markRead(rdv)
  }

  useEffect(() => { load() }, [])

  const filtered = filter === 'ALL' ? rdvs : rdvs.filter(r => r.status === filter)
  const pendingCount = rdvs.filter(r => r.status === 'PENDING').length

  function formatDate(d: string) {
    return new Date(d).toLocaleDateString('fr-FR', {
      weekday: 'long', day: 'numeric', month: 'long', year: 'numeric'
    })
  }

  return (
    <>
      {ToastEl}

      <div className="admin-header">
        <h1 className="admin-header__title">
          Rendez-vous
          {pendingCount > 0 && (
            <span className="admin-contacts__unread-badge">{pendingCount} en attente</span>
          )}
        </h1>
        <div className="admin-header__actions">
          {(['PENDING', 'CONFIRMED', 'CANCELLED', 'ALL'] as const).map(f => (
            <button
              key={f}
              className={`admin-btn ${filter === f ? 'admin-btn--primary' : 'admin-btn--ghost'}`}
              onClick={() => setFilter(f)}
            >
              {f === 'ALL' ? 'Tous' : STATUS_CONFIG[f]?.label}
              {f !== 'ALL' && (
                <span style={{ marginLeft: 4, opacity: 0.7 }}>
                  ({rdvs.filter(r => r.status === f).length})
                </span>
              )}
            </button>
          ))}
        </div>
      </div>

      {loading ? (
        <p>Chargement…</p>
      ) : filtered.length === 0 ? (
        <div className="admin-empty">
          <span className="material-symbols-outlined">calendar_today</span>
          <p>Aucun rendez-vous dans cette catégorie</p>
        </div>
      ) : (
        <div className="admin-contacts__layout">

          {/* Liste */}
          <div className="admin-contacts__list">
            {filtered.map(r => {
              const sc = STATUS_CONFIG[r.status]
              return (
                <div
                  key={r.id}
                  className={`admin-contacts__item${!r.read ? ' admin-contacts__item--unread' : ''}${selected?.id === r.id ? ' admin-contacts__item--active' : ''}`}
                  onClick={() => openRdv(r)}
                >
                  <div className="admin-contacts__item-header">
                    <span className="admin-contacts__item-name">
                      {!r.read && <span className="admin-contacts__dot" />}
                      {r.firstName} {r.lastName}
                    </span>
                    <span
                      style={{
                        fontSize: '10px', fontWeight: 700,
                        textTransform: 'uppercase', letterSpacing: '0.06em',
                        color: sc.color, background: sc.bg,
                        padding: '2px 8px', borderRadius: '2rem',
                      }}
                    >
                      {sc.label}
                    </span>
                  </div>
                  <span className="admin-contacts__item-company">
                    {r.company ?? r.email}
                  </span>
                  <span className="admin-contacts__item-need">
                    {PROJECT_LABELS[r.projectType] ?? r.projectType}
                  </span>
                  {r.preferredDate && (
                    <span style={{ fontSize: 'var(--text-label-sm)', color: 'var(--outline)', marginTop: 2, display: 'block' }}>
                      {new Date(r.preferredDate).toLocaleDateString('fr-FR', { day: 'numeric', month: 'short' })}
                      {r.preferredTime && ` — ${r.preferredTime}`}
                    </span>
                  )}
                </div>
              )
            })}
          </div>

          {/* Détail */}
          {selected ? (
            <div className="admin-contacts__detail">
              <div className="admin-contacts__detail-header">
                <div>
                  <h2 className="admin-contacts__detail-name">
                    {selected.firstName} {selected.lastName}
                  </h2>
                  {selected.company && (
                    <p className="admin-contacts__detail-company">{selected.company}</p>
                  )}
                </div>
                <button className="admin-btn admin-btn--danger" onClick={() => handleDelete(selected.id)}>
                  <span className="material-symbols-outlined">delete</span>
                </button>
              </div>

              {/* Status actions */}
              {selected.status === 'PENDING' && (
                <div className="admin-rdv__status-actions">
                  <button
                    className="admin-rdv__confirm-btn"
                    onClick={() => updateStatus(selected.id, 'CONFIRMED')}
                  >
                    <span className="material-symbols-outlined">check_circle</span>
                    Confirmer le rendez-vous
                  </button>
                  <button
                    className="admin-rdv__cancel-btn"
                    onClick={() => updateStatus(selected.id, 'CANCELLED')}
                  >
                    <span className="material-symbols-outlined">cancel</span>
                    Annuler
                  </button>
                </div>
              )}
              {selected.status !== 'PENDING' && (
                <div className="admin-rdv__current-status"
                  style={{
                    color: STATUS_CONFIG[selected.status].color,
                    background: STATUS_CONFIG[selected.status].bg,
                    border: `1px solid ${STATUS_CONFIG[selected.status].color}30`,
                    padding: 'var(--spacing-3) var(--spacing-4)',
                    borderRadius: 'var(--radius-md)',
                    fontWeight: 600,
                    display: 'flex',
                    alignItems: 'center',
                    gap: 'var(--spacing-2)',
                  }}
                >
                  <span className="material-symbols-outlined">
                    {selected.status === 'CONFIRMED' ? 'check_circle' : 'cancel'}
                  </span>
                  {STATUS_CONFIG[selected.status].label}
                  {selected.status !== 'PENDING' && (
                    <button
                      style={{ marginLeft: 'auto', fontSize: 'var(--text-label-sm)', opacity: 0.7, background: 'none', cursor: 'pointer', color: 'inherit' }}
                      onClick={() => updateStatus(selected.id, selected.status === 'CONFIRMED' ? 'CANCELLED' : 'CONFIRMED')}
                    >
                      Modifier
                    </button>
                  )}
                </div>
              )}

              <div className="admin-contacts__detail-meta">
                <a href={`mailto:${selected.email}`} className="admin-contacts__meta-item">
                  <span className="material-symbols-outlined">mail</span>
                  {selected.email}
                </a>
                {selected.phone && (
                  <a href={`tel:${selected.phone}`} className="admin-contacts__meta-item">
                    <span className="material-symbols-outlined">call</span>
                    {selected.phone}
                  </a>
                )}
                <span className="admin-contacts__meta-item">
                  <span className="material-symbols-outlined">schedule</span>
                  Reçu le {formatDate(selected.createdAt)}
                </span>
              </div>

              <div className="admin-contacts__detail-need">
                <span className="admin-table__badge">
                  {PROJECT_LABELS[selected.projectType] ?? selected.projectType}
                </span>
              </div>

              {(selected.preferredDate || selected.preferredTime) && (
                <div className="admin-rdv__date-block">
                  <p className="admin-form__label">Disponibilité souhaitée</p>
                  <p className="admin-rdv__date">
                    {selected.preferredDate && formatDate(selected.preferredDate)}
                    {selected.preferredTime && ` à ${selected.preferredTime}`}
                  </p>
                </div>
              )}

              {selected.message && (
                <div className="admin-contacts__detail-message">
                  <p className="admin-form__label">Message</p>
                  <p>{selected.message}</p>
                </div>
              )}

              <div className="admin-contacts__detail-actions">
                <a href={`mailto:${selected.email}`} className="admin-btn admin-btn--primary">
                  <span className="material-symbols-outlined">reply</span>
                  Répondre par email
                </a>
                {selected.phone && (
                  <a href={`tel:${selected.phone}`} className="admin-btn admin-btn--ghost">
                    <span className="material-symbols-outlined">call</span>
                    Appeler
                  </a>
                )}
              </div>
            </div>
          ) : (
            <div className="admin-contacts__detail admin-contacts__detail--empty">
              <span className="material-symbols-outlined">calendar_today</span>
              <p>Sélectionnez un rendez-vous</p>
            </div>
          )}

        </div>
      )}
    </>
  )
}