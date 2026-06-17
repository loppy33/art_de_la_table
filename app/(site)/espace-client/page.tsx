'use client'

import { useState, useEffect } from 'react'
import { useChatAuth } from '../../context/ChatContext'
import ChatWindow from '../../components/chat/ChatWindow'
import AuthModal from '../../components/chat/AuthModal'

interface Artisan {
  id: string
  firstName: string
  lastName: string
  artisan: { name: string; logo: string | null }
}

interface Room {
  id: string
  artisanId: string
  clientId: string
  unread: number
  lastMsgAt: string
  artisan: { id: string; firstName: string; lastName: string }
  client:  { id: string; firstName: string; lastName: string }
  messages: { content: string; type: string; createdAt: string; senderId: string }[]
}

export default function EspaceClientPage() {
  const { user, token, logout } = useChatAuth()
  const [showAuth, setShowAuth] = useState(!user)
  const [artisans, setArtisans] = useState<Artisan[]>([])
  const [rooms, setRooms] = useState<Room[]>([])
  const [activeRoomId, setActiveRoomId] = useState<string | null>(null)
  const [view, setView] = useState<'rooms' | 'artisans'>('rooms')
  // Mobile: true = on voit le chat, false = on voit la sidebar
  const [showChat, setShowChat] = useState(false)

  const CHAT_SERVER = process.env.NEXT_PUBLIC_CHAT_SERVER_URL || 'http://localhost:3001'

  useEffect(() => {
    if (!user) { setShowAuth(true); return }
    setShowAuth(false)
    loadRooms()
    loadArtisans()
  }, [user, token])

  async function loadRooms() {
    if (!token) return
    const res = await fetch(`${CHAT_SERVER}/chat/rooms`, {
      headers: { Authorization: `Bearer ${token}` },
    })
    if (res.ok) setRooms(await res.json())
  }

  async function loadArtisans() {
    if (!token) return
    const res = await fetch(`${CHAT_SERVER}/chat/artisans`, {
      headers: { Authorization: `Bearer ${token}` },
    })
    if (res.ok) setArtisans(await res.json())
  }

  async function startChat(artisanUserId: string) {
    if (!token) return
    const res = await fetch(`${CHAT_SERVER}/chat/rooms`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${token}` },
      body: JSON.stringify({ artisanUserId }),
    })
    if (res.ok) {
      const room = await res.json()
      await loadRooms()
      selectRoom(room.id)
      setView('rooms')
    }
  }

  function selectRoom(roomId: string) {
    setActiveRoomId(roomId)
    setShowChat(true) // mobile: bascule vers la vue chat
  }

  function goBackToSidebar() {
    setShowChat(false)
    setActiveRoomId(null)
  }

  function getPartnerName(room: Room) {
    if (!room) return ''
    if (user?.role === 'CLIENT') return `${room.artisan.firstName} ${room.artisan.lastName}`
    return `${room.client.firstName} ${room.client.lastName}`
  }

  function getLastMsg(room: Room) {
    const msg = room.messages[0]
    if (!msg) return 'Démarrez la conversation'
    if (msg.type === 'IMAGE') return '📷 Photo'
    if (msg.type === 'FILE') return '📎 Fichier'
    return msg.content.length > 45 ? msg.content.slice(0, 45) + '…' : msg.content
  }

  function formatTime(dateStr: string) {
    const d = new Date(dateStr)
    const today = new Date()
    if (d.toDateString() === today.toDateString()) {
      return d.toLocaleTimeString('fr-FR', { hour: '2-digit', minute: '2-digit' })
    }
    return d.toLocaleDateString('fr-FR', { day: 'numeric', month: 'short' })
  }

  if (showAuth) return <AuthModal onSuccess={() => setShowAuth(false)} />

  const totalUnread = rooms.reduce((acc, r) => acc + r.unread, 0)
  const activeRoom = rooms.find(r => r.id === activeRoomId)

  return (
    <main className="espace-client seccontainer">

      {/* ── Sidebar ── */}
      <aside className={`chat-sidebar${showChat ? ' chat-sidebar--hidden' : ''}`}>

        {/* Header user */}
        <div className="chat-sidebar__header">
          <div className="chat-sidebar__user">
            <div className="chat-sidebar__avatar">
              {user?.firstName.charAt(0).toUpperCase()}
            </div>
            <div>
              <p className="chat-sidebar__name">{user?.firstName} {user?.lastName}</p>
              <p className="chat-sidebar__role">
                {user?.role === 'CLIENT' ? 'Espace client' : user?.role === 'ARTISAN' ? 'Espace artisan' : 'Administration'}
              </p>
            </div>
          </div>
          <button className="chat-sidebar__logout" onClick={logout} title="Se déconnecter">
            <span className="material-symbols-outlined">logout</span>
          </button>
        </div>

        {/* Tabs — uniquement pour CLIENT */}
        {user?.role === 'CLIENT' && (
          <div className="chat-sidebar__tabs">
            <button
              className={`chat-tab${view === 'rooms' ? ' chat-tab--active' : ''}`}
              onClick={() => setView('rooms')}
            >
              <span className="material-symbols-outlined">forum</span>
              Conversations
              {totalUnread > 0 && (
                <span className="chat-badge">{totalUnread}</span>
              )}
            </button>
            <button
              className={`chat-tab${view === 'artisans' ? ' chat-tab--active' : ''}`}
              onClick={() => setView('artisans')}
            >
              <span className="material-symbols-outlined">storefront</span>
              Artisans
            </button>
          </div>
        )}

        {/* Liste des rooms */}
        {view === 'rooms' && (
          <div className="chat-sidebar__rooms">
            {rooms.length === 0 ? (
              <div className="chat-sidebar__empty">
                <span className="material-symbols-outlined">forum</span>
                <p>Aucune conversation pour l'instant.</p>
                {user?.role === 'CLIENT' && (
                  <button className="admin-btn admin-btn--ghost" onClick={() => setView('artisans')}>
                    Contacter un artisan
                  </button>
                )}
              </div>
            ) : (
              rooms.map(room => (
                <div
                  key={room.id}
                  className={`chat-room-item${activeRoomId === room.id ? ' chat-room-item--active' : ''}${room.unread > 0 ? ' chat-room-item--unread' : ''}`}
                  onClick={() => selectRoom(room.id)}
                >
                  <div className="chat-room-item__avatar">
                    {getPartnerName(room).charAt(0).toUpperCase()}
                  </div>
                  <div className="chat-room-item__info">
                    <p className="chat-room-item__name">{getPartnerName(room)}</p>
                    <p className="chat-room-item__preview">{getLastMsg(room)}</p>
                  </div>
                  <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-end', gap: 4, flexShrink: 0 }}>
                    {room.messages[0] && (
                      <span style={{ fontSize: 10, color: 'var(--outline)', whiteSpace: 'nowrap' }}>
                        {formatTime(room.messages[0].createdAt)}
                      </span>
                    )}
                    {room.unread > 0 && (
                      <span className="chat-badge">{room.unread}</span>
                    )}
                  </div>
                </div>
              ))
            )}
          </div>
        )}

        {/* Liste des artisans */}
        {view === 'artisans' && (
          <div className="chat-sidebar__rooms">
            {artisans.length === 0 ? (
              <div className="chat-sidebar__empty">
                <span className="material-symbols-outlined">storefront</span>
                <p>Aucun artisan disponible.</p>
              </div>
            ) : (
              artisans.map(a => (
                <div key={a.id} className="chat-artisan-item" onClick={() => startChat(a.id)}>
                  {a.artisan.logo ? (
                    <img src={a.artisan.logo} alt={a.artisan.name} className="chat-artisan-item__logo" />
                  ) : (
                    <div className="chat-room-item__avatar">
                      {a.artisan.name.charAt(0).toUpperCase()}
                    </div>
                  )}
                  <div className="chat-room-item__info">
                    <p className="chat-room-item__name">{a.artisan.name}</p>
                    <p className="chat-room-item__preview">{a.firstName} {a.lastName}</p>
                  </div>
                  <span className="material-symbols-outlined" style={{ color: 'var(--outline)', fontSize: 20, flexShrink: 0 }}>
                    chevron_right
                  </span>
                </div>
              ))
            )}
          </div>
        )}
      </aside>

      {/* ── Zone chat ── */}
      <div className={`chat-main${!showChat ? ' chat-main--hidden' : ''}`}>
        {activeRoomId && activeRoom ? (
          <ChatWindow
            roomId={activeRoomId}
            partnerName={getPartnerName(activeRoom)}
            onBack={goBackToSidebar}
          />
        ) : (
          <div className="chat-main__empty">
            <span className="material-symbols-outlined">forum</span>
            <h2>Bienvenue dans votre espace</h2>
            <p>Sélectionnez une conversation ou contactez un artisan partenaire.</p>
          </div>
        )}
      </div>

    </main>
  )
}