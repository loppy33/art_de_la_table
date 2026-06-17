'use client'
// context/ChatContext.tsx

import { createContext, useContext, useState, useEffect, ReactNode } from 'react'

interface ChatUserData {
  id: string
  firstName: string
  lastName: string
  email: string
  role: 'CLIENT' | 'ARTISAN' | 'ADMIN'
}

interface ChatContextType {
  user: ChatUserData | null
  token: string | null
  login: (email: string, password: string) => Promise<void>
  register: (data: { firstName: string; lastName: string; email: string; password: string }) => Promise<void>
  logout: () => void
  loading: boolean
  error: string | null
}

const ChatContext = createContext<ChatContextType | null>(null)

export function ChatProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<ChatUserData | null>(null)
  const [token, setToken] = useState<string | null>(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  // Restore session
  useEffect(() => {
    const savedToken = localStorage.getItem('chat_token')
    const savedUser = localStorage.getItem('chat_user')
    if (savedToken && savedUser) {
      setToken(savedToken)
      setUser(JSON.parse(savedUser))
    }
  }, [])

  async function login(email: string, password: string) {
    setLoading(true)
    setError(null)
    try {
      const res = await fetch('/api/chat/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password }),
      })
      const data = await res.json()
      if (!res.ok) throw new Error(data.error)

      setToken(data.token)
      setUser(data.user)
      localStorage.setItem('chat_token', data.token)
      localStorage.setItem('chat_user', JSON.stringify(data.user))
    } catch (e: any) {
      setError(e.message)
      throw e
    } finally {
      setLoading(false)
    }
  }

  async function register(formData: { firstName: string; lastName: string; email: string; password: string }) {
    setLoading(true)
    setError(null)
    try {
      const res = await fetch('/api/chat/auth/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      })
      const data = await res.json()
      if (!res.ok) throw new Error(data.error)

      setToken(data.token)
      setUser(data.user)
      localStorage.setItem('chat_token', data.token)
      localStorage.setItem('chat_user', JSON.stringify(data.user))
    } catch (e: any) {
      setError(e.message)
      throw e
    } finally {
      setLoading(false)
    }
  }

  function logout() {
    setUser(null)
    setToken(null)
    localStorage.removeItem('chat_token')
    localStorage.removeItem('chat_user')
  }

  return (
    <ChatContext.Provider value={{ user, token, login, register, logout, loading, error }}>
      {children}
    </ChatContext.Provider>
  )
}

export function useChatAuth() {
  const ctx = useContext(ChatContext)
  if (!ctx) throw new Error('useChatAuth must be used within ChatProvider')
  return ctx
}
