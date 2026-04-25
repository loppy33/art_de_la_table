'use client'

import { useState } from 'react'

export default function NewsletterForm() {
  const [email, setEmail] = useState('')
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error' | 'exists'>('idle')

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setStatus('loading')

    const res = await fetch('/api/newsletter', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email }),
    })

    if (res.ok) {
      setStatus('success')
      setEmail('')
    } else {
      setStatus('error')
    }
  }

  if (status === 'success') {
    return (
      <div className="newsletter__success">
        <span className="material-symbols-outlined">check_circle</span>
        <p>Merci ! Vous êtes bien inscrit à notre newsletter.</p>
      </div>
    )
  }

  return (
    <form className="newsletter__form" onSubmit={handleSubmit}>
      <input
        type="email"
        placeholder="Votre adresse email"
        required
        value={email}
        onChange={e => setEmail(e.target.value)}
        disabled={status === 'loading'}
      />
      <button type="submit" className="btn-primary" disabled={status === 'loading'}>
        {status === 'loading' ? 'Inscription…' : "S'inscrire"}
      </button>
      {status === 'error' && (
        <p className="newsletter__error">Une erreur est survenue. Veuillez réessayer.</p>
      )}
    </form>
  )
}