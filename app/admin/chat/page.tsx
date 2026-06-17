'use client'
// app/admin/chat/page.tsx

import { useEffect, useState } from 'react'
import { useToast } from '../hooks/useToast'
import { useChatSocket } from '../../hooks/useChatSocket'
import ChatWindow from '../../components/chat/ChatWindow'

interface Room {
  id: string
  unread: number
  lastMsgAt: string
  client:  { id: string; firstName: string; lastName: string; email: string }
  artisan: { id: string; firstName: string; lastName: string }
  messages: { content: string; type: string; createdAt: string; senderId: string }[]
}

interface ArtisanUser {
  id: string
  firstName: string
  lastName: string
  email: string
  artisan: { name: string; logo: string | null } | null
}

// Admin utilise un token spécial généré côté serveur
const ADMIN_CHAT_TOKEN = process.env.NEXT_PUBLIC_ADMIN_CHAT_TOKEN || ''

export default function AdminChatPage() {
  const [rooms, setRooms] = useState<Room[]>([])
  const [artisanUsers, setArtisanUsers] = useState<ArtisanUser[]>([])
  const [activeRoomId, setActiveRoomId] = useState<string | null>(null)
  const [loading, setLoading] = useState(true)
  const [view, setView] = useState<'rooms' | 'artisans'>('rooms')
  const [filter, setFilter] = useState('')
  const { show, ToastEl } = useToast()
  const { connected } = useChatSocket(ADMIN_CHAT_TOKEN)

  const CHAT_SERVER = process.env.NEXT_PUBLIC_CHAT_SERVER_URL || 'http://localhost:3001'

  async function loadRooms() {
    const res = await fetch(`${CHAT_SERVER}/chat/rooms`, {
      headers: { Authorization: `Bearer ${ADMIN_CHAT_TOKEN}` },
    })
    if (res.ok) setRooms(await res.json())
    setLoading(false)
  }

  async function loadArtisanUsers() {
    const res = await fetch('/api/admin/chat/artisan-users')
    if (res.ok) setArtisanUsers(await res.json())
  }

  async function createArtisanAccount(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    const form = e.currentTarget
    const data = {
      firstName: (form.elements.namedItem('firstName') as HTMLInputElement).value,
      lastName:  (form.elements.namedItem('lastName')  as HTMLInputElement).value,
      email:     (form.elements.namedItem('email')     as HTMLInputElement).value,
      password:  (form.elements.namedItem('password')  as HTMLInputElement).value,
      artisanId: (form.elements.namedItem('artisanId') as HTMLSelectElement).value,
    }

    const res = await fetch('/api/admin/chat/artisan-users', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data),
    })

    if (res.ok) {
      show('Compte artisan créé ✓')
      form.reset()
      loadArtisanUsers()
    } else {
      const err = await res.json()
      show(err.error || 'Erreur', 'error')
    }
  }

  async function deleteArtisanUser(id: string) {
    if (!confirm('Supprimer ce compte artisan ?')) return
    const res = await fetch(`/api/admin/chat/artisan-users/${id}`, { method: 'DELETE' })
    if (res.ok) {
      show('Compte supprimé')
      loadArtisanUsers()
    }
  }

  useEffect(() => {
    loadRooms()
    loadArtisanUsers()
  }, [])

  const filteredRooms = rooms.filter(r => {
    const q = filter.toLowerCase()
    return (
      r.client.firstName.toLowerCase().includes(q) ||
      r.client.lastName.toLowerCase().includes(q) ||
      r.artisan.firstName.toLowerCase().includes(q)
    )
  })

  const totalUnread = rooms.reduce((acc, r) => acc + r.unread, 0)

  function getLastMsg(room: Room) {
    const msg = room.messages[0]
    if (!msg) return 'Aucun message'
    if (msg.type === 'IMAGE') return '📷 Photo'
    if (msg.type === 'FILE') return '📎 Fichier'
    return msg.content.length > 50 ? msg.content.slice(0, 50) + '…' : msg.content
  }

  const activeRoom = rooms.find(r => r.id === activeRoomId)

  return (
    <>
      {ToastEl}
      <div className="admin-header">
        <h1 className="admin-header__title">
          Messagerie
          {totalUnread > 0 && (
            <span className="admin-contacts__unread-badge">{totalUnread} non lus</span>
          )}
        </h1>
        <div className="admin-header__actions">
          <span style={{
            display: 'flex', alignItems: 'center', gap: 6,
            fontSize: 'var(--text-label-sm)', color: connected ? '#059669' : '#dc2626',
            fontWeight: 600,
          }}>
            <span style={{
              width: 8, height: 8, borderRadius: '50%',
              background: connected ? '#059669' : '#dc2626',
            }} />
            {connected ? 'Connecté' : 'Déconnecté'}
          </span>
        </div>
      </div>

      <div className="admin-chat__layout">

        {/* Sidebar gauche */}
        <div className="admin-chat__sidebar">
          {/* Tabs */}
          <div className="admin-chat__tabs">
            <button
              className={`admin-chat__tab${view === 'rooms' ? ' admin-chat__tab--active' : ''}`}
              onClick={() => setView('rooms')}
            >
              Conversations ({rooms.length})
            </button>
            <button
              className={`admin-chat__tab${view === 'artisans' ? ' admin-chat__tab--active' : ''}`}
              onClick={() => setView('artisans')}
            >
              Comptes artisans
            </button>
          </div>

          {/* Rooms */}
          {view === 'rooms' && (
            <>
              <div style={{ padding: 'var(--spacing-3)' }}>
                <input
                  className="admin-form__input"
                  placeholder="Rechercher…"
                  value={filter}
                  onChange={e => setFilter(e.target.value)}
                />
              </div>

              {loading ? (
                <p style={{ padding: 'var(--spacing-4)', color: 'var(--outline)' }}>Chargement…</p>
              ) : filteredRooms.length === 0 ? (
                <div className="admin-empty" style={{ padding: 'var(--spacing-6)' }}>
                  <span className="material-symbols-outlined">forum</span>
                  <p>Aucune conversation</p>
                </div>
              ) : (
                <div className="admin-contacts__list">
                  {filteredRooms.map(room => (
                    <div
                      key={room.id}
                      className={`admin-contacts__item${room.unread > 0 ? ' admin-contacts__item--unread' : ''}${activeRoomId === room.id ? ' admin-contacts__item--active' : ''}`}
                      onClick={() => setActiveRoomId(room.id)}
                    >
                      <div className="admin-contacts__item-header">
                        <span className="admin-contacts__item-name">
                          {room.unread > 0 && <span className="admin-contacts__dot" />}
                          {room.client.firstName} {room.client.lastName}
                        </span>
                        {room.unread > 0 && (
                          <span className="chat-badge">{room.unread}</span>
                        )}
                      </div>
                      <span className="admin-contacts__item-company">
                        ↔ {room.artisan.firstName} {room.artisan.lastName}
                      </span>
                      <span className="admin-contacts__item-need">
                        {getLastMsg(room)}
                      </span>
                    </div>
                  ))}
                </div>
              )}
            </>
          )}

          {/* Artisan accounts */}
          {view === 'artisans' && (
            <div style={{ padding: 'var(--spacing-4)', display: 'flex', flexDirection: 'column', gap: 'var(--spacing-6)' }}>
              {/* Créer un compte */}
              <div>
                <p className="admin-form__label" style={{ marginBottom: 'var(--spacing-3)' }}>
                  Créer un compte artisan
                </p>
                <form onSubmit={createArtisanAccount} style={{ display: 'flex', flexDirection: 'column', gap: 'var(--spacing-2)' }}>
                  <input className="admin-form__input" name="firstName" placeholder="Prénom" required />
                  <input className="admin-form__input" name="lastName"  placeholder="Nom" required />
                  <input className="admin-form__input" name="email"     placeholder="Email" type="email" required />
                  <input className="admin-form__input" name="password"  placeholder="Mot de passe" type="password" required minLength={8} />
                  <ArtisanSelect />
                  <button type="submit" className="admin-btn admin-btn--primary">
                    <span className="material-symbols-outlined">person_add</span>
                    Créer le compte
                  </button>
                </form>
              </div>

              {/* Liste */}
              <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--spacing-2)' }}>
                {artisanUsers.map(u => (
                  <div key={u.id} style={{
                    display: 'flex', justifyContent: 'space-between', alignItems: 'center',
                    padding: 'var(--spacing-2) var(--spacing-3)',
                    background: 'var(--surface-container-low)',
                    borderRadius: 'var(--radius-md)',
                  }}>
                    <div>
                      <p style={{ fontWeight: 600, fontSize: 'var(--text-body-md)', margin: 0 }}>
                        {u.firstName} {u.lastName}
                      </p>
                      <p style={{ fontSize: 'var(--text-label-sm)', color: 'var(--outline)', margin: 0 }}>
                        {u.email}
                      </p>
                      {u.artisan && (
                        <p style={{ fontSize: 'var(--text-label-sm)', color: 'var(--secondary)', margin: 0 }}>
                          {u.artisan.name}
                        </p>
                      )}
                    </div>
                    <button
                      className="admin-btn admin-btn--danger"
                      onClick={() => deleteArtisanUser(u.id)}
                    >
                      <span className="material-symbols-outlined">delete</span>
                    </button>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Zone chat */}
        <div className="admin-chat__main">
          {activeRoomId && activeRoom ? (
            <ChatWindow
              roomId={activeRoomId}
              partnerName={`${activeRoom.client.firstName} ${activeRoom.client.lastName} ↔ ${activeRoom.artisan.firstName} ${activeRoom.artisan.lastName}`}
            />
          ) : (
            <div className="chat-main__empty">
              <span className="material-symbols-outlined">forum</span>
              <h2>Sélectionnez une conversation</h2>
              <p>Vous pouvez lire tous les échanges et intervenir si nécessaire.</p>
            </div>
          )}
        </div>

      </div>
    </>
  )
}

// Petit composant select artisan pour le formulaire
function ArtisanSelect() {
  const [artisans, setArtisans] = useState<{ id: string; name: string }[]>([])

  useEffect(() => {
    fetch('/api/admin/artisans')
      .then(r => r.json())
      .then(data => setArtisans(data.map((a: any) => ({ id: a.id, name: a.name }))))
  }, [])

  return (
    <select className="admin-form__select" name="artisanId" required>
      <option value="">— Associer à un artisan —</option>
      {artisans.map(a => (
        <option key={a.id} value={a.id}>{a.name}</option>
      ))}
    </select>
  )
}
