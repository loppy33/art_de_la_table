'use client'
// components/chat/AuthModal.tsx

import { useState } from 'react'
import { useChatAuth } from '../../context/ChatContext'

interface Props {
  onSuccess: () => void
}

export default function AuthModal({ onSuccess }: Props) {
  const { login, register, loading, error } = useChatAuth()
  const [mode, setMode] = useState<'login' | 'register'>('login')
  const [form, setForm] = useState({
    firstName: '', lastName: '', email: '', password: '',
  })
  const [localError, setLocalError] = useState('')

  function set(key: string, value: string) {
    setForm(prev => ({ ...prev, [key]: value }))
    setLocalError('')
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setLocalError('')
    try {
      if (mode === 'login') {
        await login(form.email, form.password)
      } else {
        if (!form.firstName || !form.lastName) {
          return setLocalError('Prénom et nom requis')
        }
        await register(form)
      }
      onSuccess()
    } catch (e: any) {
      setLocalError(e.message)
    }
  }

  return (
    <div className="chat-auth">
      <div className="chat-auth__card">
        <div className="chat-auth__logo">L'Art de la Table à la Française</div>
        <h1 className="chat-auth__title">
          {mode === 'login' ? 'Se connecter' : 'Créer un compte'}
        </h1>
        <p className="chat-auth__sub">
          {mode === 'login'
            ? 'Accédez à votre espace client pour échanger avec nos artisans.'
            : 'Créez votre espace pour contacter nos artisans partenaires.'}
        </p>

        <form className="chat-auth__form" onSubmit={handleSubmit}>
          {mode === 'register' && (
            <div className="chat-auth__row">
              <div className="chat-auth__field">
                <label>Prénom *</label>
                <input
                  type="text" placeholder="Alexandre" required
                  value={form.firstName} onChange={e => set('firstName', e.target.value)}
                />
              </div>
              <div className="chat-auth__field">
                <label>Nom *</label>
                <input
                  type="text" placeholder="Duchamp" required
                  value={form.lastName} onChange={e => set('lastName', e.target.value)}
                />
              </div>
            </div>
          )}

          <div className="chat-auth__field">
            <label>Email *</label>
            <input
              type="email" placeholder="alexandre@domaine.fr" required
              value={form.email} onChange={e => set('email', e.target.value)}
            />
          </div>

          <div className="chat-auth__field">
            <label>Mot de passe *</label>
            <input
              type="password" placeholder="8 caractères minimum" required
              value={form.password} onChange={e => set('password', e.target.value)}
            />
          </div>

          {(localError || error) && (
            <p className="chat-auth__error">{localError || error}</p>
          )}

          <button type="submit" className="chat-auth__btn" disabled={loading}>
            {loading
              ? 'Chargement…'
              : mode === 'login' ? 'Se connecter' : 'Créer mon compte'
            }
          </button>
        </form>

        <p className="chat-auth__switch">
          {mode === 'login' ? (
            <>Pas encore de compte ?{' '}
              <button onClick={() => setMode('register')}>S'inscrire</button>
            </>
          ) : (
            <>Déjà un compte ?{' '}
              <button onClick={() => setMode('login')}>Se connecter</button>
            </>
          )}
        </p>
      </div>
    </div>
  )
}
