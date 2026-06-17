'use client'

import { useEffect, useRef, useState, useCallback } from 'react'
import { ChatMessage, useChatSocket } from '../../hooks/useChatSocket'
import { useChatAuth } from '../../context/ChatContext'

interface Props {
  roomId: string
  partnerName: string
  onBack?: () => void // callback pour retour mobile
}

export default function ChatWindow({ roomId, partnerName, onBack }: Props) {
  const { user, token } = useChatAuth()
  const {
    messages,
    typingUsers,
    joinRoom,
    sendMessage,
    sendFile,
    emitTyping,
    emitStopTyping,
  } = useChatSocket(token)

  const [input, setInput] = useState('')
  const [sending, setSending] = useState(false)
  const [uploadError, setUploadError] = useState('')
  const bottomRef = useRef<HTMLDivElement>(null)
  const fileInputRef = useRef<HTMLInputElement>(null)
  const timeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const messagesRef = useRef<HTMLDivElement>(null)

  const roomMessages = messages[roomId] || []
  const isTyping = Object.keys(typingUsers).some(
    k => k.startsWith(`${roomId}:`) && !k.endsWith(`:${user?.id}`)
  )

  useEffect(() => {
    joinRoom(roomId)
  }, [roomId, joinRoom])

  // Scroll vers le bas à chaque nouveau message
  useEffect(() => {
    if (bottomRef.current) {
      bottomRef.current.scrollIntoView({ behavior: 'smooth' })
    }
  }, [roomMessages.length])

  function handleInputChange(e: React.ChangeEvent<HTMLInputElement>) {
    setInput(e.target.value)
    emitTyping(roomId)
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
      timeoutRef.current = setTimeout(() => emitStopTyping(roomId), 1500)
    }
  }

  // Envoi avec Entrée (sans Shift)
  function handleKeyDown(e: React.KeyboardEvent<HTMLInputElement>) {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault()
      if (input.trim()) handleSend(e as any)
    }
  }

  async function handleSend(e: React.FormEvent) {
    e.preventDefault()
    const text = input.trim()
    if (!text || sending) return
    setSending(true)
    emitStopTyping(roomId)
    sendMessage(roomId, text)
    setInput('')
    setSending(false)
  }

  async function handleFileChange(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0]
    if (!file) return
    setUploadError('')

    if (file.size > 10 * 1024 * 1024) {
      setUploadError('Fichier trop volumineux (max 10 Mo)')
      e.target.value = ''
      return
    }

    await sendFile(roomId, file)
    e.target.value = ''
  }

  function formatTime(dateStr: string) {
    return new Date(dateStr).toLocaleTimeString('fr-FR', {
      hour: '2-digit',
      minute: '2-digit',
    })
  }

  function formatDate(dateStr: string) {
    const d = new Date(dateStr)
    const today = new Date()
    const yesterday = new Date()
    yesterday.setDate(yesterday.getDate() - 1)

    if (d.toDateString() === today.toDateString()) return "Aujourd'hui"
    if (d.toDateString() === yesterday.toDateString()) return 'Hier'
    return d.toLocaleDateString('fr-FR', { weekday: 'long', day: 'numeric', month: 'long' })
  }

  function renderMessage(msg: ChatMessage) {
    const isMine = msg.senderId === user?.id

    return (
      <div
        key={msg.id}
        className={`chat-message ${isMine ? 'chat-message--mine' : 'chat-message--theirs'}`}
      >
        {!isMine && (
          <span className="chat-message__sender">{msg.sender.firstName}</span>
        )}

        <div className="chat-message__bubble">
          {msg.type === 'TEXT' && (
            <p className="chat-message__text">{msg.content}</p>
          )}

          {msg.type === 'IMAGE' && (
            <a href={msg.content} target="_blank" rel="noopener noreferrer">
              <img
                src={msg.content}
                alt="Image"
                className="chat-message__image"
                loading="lazy"
              />
            </a>
          )}

          {msg.type === 'FILE' && (
            <a
              href={msg.content}
              target="_blank"
              rel="noopener noreferrer"
              className="chat-message__file"
            >
              <span className="material-symbols-outlined">description</span>
              <span className="chat-message__filename">
                {msg.fileName || 'Fichier'}
              </span>
              {msg.fileSize && (
                <span className="chat-message__filesize">
                  {msg.fileSize < 1024 * 1024
                    ? `${(msg.fileSize / 1024).toFixed(0)} Ko`
                    : `${(msg.fileSize / 1024 / 1024).toFixed(1)} Mo`}
                </span>
              )}
              <span className="material-symbols-outlined" style={{ marginLeft: 'auto', fontSize: 16, opacity: 0.6 }}>
                download
              </span>
            </a>
          )}

          <span className="chat-message__time">{formatTime(msg.createdAt)}</span>
        </div>
      </div>
    )
  }

  // Grouper par date
  const grouped: { date: string; messages: ChatMessage[] }[] = []
  roomMessages.forEach(msg => {
    const date = formatDate(msg.createdAt)
    const last = grouped[grouped.length - 1]
    if (last && last.date === date) {
      last.messages.push(msg)
    } else {
      grouped.push({ date, messages: [msg] })
    }
  })

  return (
    <div className="chat-window">

      {/* Header */}
      <div className="chat-window__header">
        {/* Bouton retour — visible seulement sur mobile */}
        {onBack && (
          <button className="chat-window__back" onClick={onBack} aria-label="Retour">
            <span className="material-symbols-outlined">arrow_back</span>
          </button>
        )}

        <div className="chat-window__avatar">
          {partnerName.charAt(0).toUpperCase()}
        </div>

        <div className="chat-window__info">
          <p className="chat-window__name">{partnerName}</p>
          {isTyping && (
            <p className="chat-window__typing">En train d'écrire…</p>
          )}
        </div>
      </div>

      {/* Zone messages */}
      <div className="chat-window__messages" ref={messagesRef}>
        {roomMessages.length === 0 && (
          <div className="chat-window__empty">
            <span className="material-symbols-outlined">chat_bubble_outline</span>
            <p>Débutez la conversation avec {partnerName}</p>
          </div>
        )}

        {grouped.map(group => (
          <div key={group.date}>
            <div className="chat-date-separator">
              <span>{group.date}</span>
            </div>
            {group.messages.map(renderMessage)}
          </div>
        ))}

        {/* Indicateur de frappe animé */}
        {isTyping && (
          <div className="chat-message chat-message--theirs">
            <div className="chat-message__bubble" style={{ padding: '10px 16px' }}>
              <span style={{ display: 'flex', gap: 4, alignItems: 'center' }}>
                {[0, 1, 2].map(i => (
                  <span
                    key={i}
                    style={{
                      width: 7, height: 7,
                      borderRadius: '50%',
                      background: 'var(--outline)',
                      animation: `typing-dot 1.2s ease-in-out ${i * 0.2}s infinite`,
                    }}
                  />
                ))}
              </span>
            </div>
          </div>
        )}

        <div ref={bottomRef} />
      </div>

      {/* Erreur upload */}
      {uploadError && (
        <div style={{
          padding: 'var(--spacing-2) var(--spacing-4)',
          background: 'rgba(192, 57, 43, 0.08)',
          color: '#c0392b',
          fontSize: 'var(--text-label-md)',
          display: 'flex',
          alignItems: 'center',
          gap: 8,
        }}>
          <span className="material-symbols-outlined" style={{ fontSize: 16 }}>error</span>
          {uploadError}
          <button
            onClick={() => setUploadError('')}
            style={{ marginLeft: 'auto', background: 'none', cursor: 'pointer', color: '#c0392b' }}
          >
            <span className="material-symbols-outlined" style={{ fontSize: 16 }}>close</span>
          </button>
        </div>
      )}

      {/* Input bar */}
      <form className="chat-window__input-bar" onSubmit={handleSend}>
        <button
          type="button"
          className="chat-input__attach"
          onClick={() => fileInputRef.current?.click()}
          title="Joindre un fichier ou une photo"
          aria-label="Joindre un fichier"
        >
          <span className="material-symbols-outlined">attach_file</span>
        </button>

        <input
          ref={fileInputRef}
          type="file"
          accept="image/*,.pdf,.doc,.docx,.xls,.xlsx,.txt,.csv"
          style={{ display: 'none' }}
          onChange={handleFileChange}
        />

        <input
          className="chat-input__text"
          type="text"
          placeholder="Votre message…"
          value={input}
          onChange={handleInputChange}
          onKeyDown={handleKeyDown}
          disabled={sending}
          autoComplete="off"
          autoCorrect="on"
        />

        <button
          type="submit"
          className="chat-input__send"
          disabled={!input.trim() || sending}
          aria-label="Envoyer"
        >
          <span className="material-symbols-outlined">send</span>
        </button>
      </form>

      {/* Keyframes pour les points de frappe */}
      <style>{`
        @keyframes typing-dot {
          0%, 60%, 100% { opacity: 0.3; transform: translateY(0); }
          30% { opacity: 1; transform: translateY(-4px); }
        }
      `}</style>
    </div>
  )
}