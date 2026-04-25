'use client'

import { useEffect, useState } from 'react'
import { useToast } from '../hooks/useToast'

interface Contact {
  id: string
  lastName: string
  firstName: string
  company?: string
  email: string
  phone?: string
  need: string
  message?: string
  read: boolean
  createdAt: string
}

const NEED_LABELS: Record<string, string> = {
  selection: 'Sélection personnalisée',
  event: 'Événementiel & Réceptions',
  professional: 'Équipement professionnel',
  other: 'Autre demande',
}

export default function ContactsPage() {
  const [contacts, setContacts] = useState<Contact[]>([])
  const [loading, setLoading] = useState(true)
  const [selected, setSelected] = useState<Contact | null>(null)
  const [filter, setFilter] = useState<'all' | 'unread'>('unread')
  const { show, ToastEl } = useToast()

  async function load() {
    const res = await fetch('/api/admin/contacts')
    setContacts(await res.json())
    setLoading(false)
  }

  async function markRead(contact: Contact) {
    if (contact.read) return
    const res = await fetch(`/api/admin/contacts/${contact.id}`, {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ read: true }),
    })
    if (res.ok) {
      setContacts(prev => prev.map(c => c.id === contact.id ? { ...c, read: true } : c))
      setSelected(prev => prev?.id === contact.id ? { ...prev, read: true } : prev)
    }
  }

  async function handleDelete(id: string) {
    if (!confirm('Supprimer cette demande ?')) return
    const res = await fetch(`/api/admin/contacts/${id}`, { method: 'DELETE' })
    if (res.ok) {
      show('Demande supprimée')
      setContacts(prev => prev.filter(c => c.id !== id))
      if (selected?.id === id) setSelected(null)
    } else {
      show('Erreur', 'error')
    }
  }

  function openContact(contact: Contact) {
    setSelected(contact)
    markRead(contact)
  }

  useEffect(() => { load() }, [])

  const filtered = filter === 'unread' ? contacts.filter(c => !c.read) : contacts
  const unreadCount = contacts.filter(c => !c.read).length

  function formatDate(d: string) {
    return new Date(d).toLocaleDateString('fr-FR', {
      day: 'numeric', month: 'long', year: 'numeric', hour: '2-digit', minute: '2-digit'
    })
  }

  return (
    <>
      {ToastEl}
      <div className="admin-header">
        <h1 className="admin-header__title">
          Demandes de contact
          {unreadCount > 0 && (
            <span className="admin-contacts__unread-badge">{unreadCount} non lus</span>
          )}
        </h1>
        <div className="admin-header__actions">
          <button
            className={`admin-btn ${filter === 'unread' ? 'admin-btn--primary' : 'admin-btn--ghost'}`}
            onClick={() => setFilter('unread')}
          >
            Non lus ({unreadCount})
          </button>
          <button
            className={`admin-btn ${filter === 'all' ? 'admin-btn--primary' : 'admin-btn--ghost'}`}
            onClick={() => setFilter('all')}
          >
            Tous ({contacts.length})
          </button>
        </div>
      </div>

      {loading ? (
        <p>Chargement…</p>
      ) : filtered.length === 0 ? (
        <div className="admin-empty">
          <span className="material-symbols-outlined">mark_email_read</span>
          <p>{filter === 'unread' ? 'Aucune demande non lue' : 'Aucune demande reçue'}</p>
        </div>
      ) : (
        <div className="admin-contacts__layout">

          {/* Liste */}
          <div className="admin-contacts__list">
            {filtered.map(c => (
              <div
                key={c.id}
                className={`admin-contacts__item${!c.read ? ' admin-contacts__item--unread' : ''}${selected?.id === c.id ? ' admin-contacts__item--active' : ''}`}
                onClick={() => openContact(c)}
              >
                <div className="admin-contacts__item-header">
                  <span className="admin-contacts__item-name">
                    {!c.read && <span className="admin-contacts__dot" />}
                    {c.firstName} {c.lastName}
                  </span>
                  <span className="admin-contacts__item-date">
                    {new Date(c.createdAt).toLocaleDateString('fr-FR')}
                  </span>
                </div>
                <span className="admin-contacts__item-company">{c.company ?? c.email}</span>
                <span className="admin-contacts__item-need">
                  {NEED_LABELS[c.need] ?? c.need}
                </span>
              </div>
            ))}
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
                <button
                  className="admin-btn admin-btn--danger"
                  onClick={() => handleDelete(selected.id)}
                >
                  <span className="material-symbols-outlined">delete</span>
                </button>
              </div>

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
                  {formatDate(selected.createdAt)}
                </span>
              </div>

              <div className="admin-contacts__detail-need">
                <span className="admin-table__badge">{NEED_LABELS[selected.need] ?? selected.need}</span>
              </div>

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
              <span className="material-symbols-outlined">mark_email_unread</span>
              <p>Sélectionnez une demande</p>
            </div>
          )}

        </div>
      )}
    </>
  )
}