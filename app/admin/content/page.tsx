'use client'

import { useEffect, useState } from 'react'
import { useToast } from '../hooks/useToast'

const FIELDS: { key: string; label: string; multiline?: boolean }[] = [
  { key: 'about_title', label: 'À propos — Titre' },
  { key: 'about_text', label: 'À propos — Texte de présentation', multiline: true },
  { key: 'about_history', label: 'Notre histoire', multiline: true },
  { key: 'contact_address', label: 'Adresse' },
  { key: 'contact_phone', label: 'Téléphone' },
  { key: 'contact_email', label: 'Email' },
  { key: 'hero_title', label: 'Accueil — Titre principal' },
  { key: 'hero_subtitle', label: 'Accueil — Sous-titre', multiline: true },
  { key: 'stats_hotels', label: 'Stat — Hôtels équipés' },
  { key: 'stats_satisfaction', label: 'Stat — Satisfaction client' },
  { key: 'stats_experience', label: 'Stat — Années d\'expérience' },
]

export default function ContentPage() {
  const [values, setValues] = useState<Record<string, string>>({})
  const [saving, setSaving] = useState<string | null>(null)
  const { show, ToastEl } = useToast()

  useEffect(() => {
    fetch('/api/admin/content')
      .then(r => r.json())
      .then(setValues)
  }, [])

  async function handleSave(key: string) {
    setSaving(key)
    const res = await fetch('/api/admin/content', {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ key, value: values[key] ?? '' }),
    })
    if (res.ok) {
      show('Sauvegardé')
    } else {
      show('Erreur lors de la sauvegarde', 'error')
    }
    setSaving(null)
  }

  async function handleSaveAll(e: React.FormEvent) {
    e.preventDefault()
    setSaving('all')
    await Promise.all(
      FIELDS.map(f =>
        fetch('/api/admin/content', {
          method: 'PUT',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ key: f.key, value: values[f.key] ?? '' }),
        })
      )
    )
    show('Tous les contenus sauvegardés')
    setSaving(null)
  }

  return (
    <>
      {ToastEl}
      <div className="admin-header">
        <h1 className="admin-header__title">Contenu du site</h1>
        <div className="admin-header__actions">
          <button
            className="admin-btn admin-btn--primary"
            onClick={handleSaveAll}
            disabled={saving === 'all'}
          >
            <span className="material-symbols-outlined">save</span>
            {saving === 'all' ? 'Sauvegarde…' : 'Tout sauvegarder'}
          </button>
        </div>
      </div>

      <form className="admin-form" style={{ maxWidth: '100%' }} onSubmit={handleSaveAll}>

        {/* Accueil */}
        <div className="admin-form__section">
          <h2 className="admin-form__section-title">Page d'accueil</h2>
          {FIELDS.filter(f => f.key.startsWith('hero') ).map(f => (
            <div key={f.key} className="admin-form__field">
              <label className="admin-form__label">{f.label}</label>
              <div style={{ display: 'flex', gap: 'var(--spacing-2)' }}>
                {f.multiline ? (
                  <textarea
                    className="admin-form__textarea"
                    value={values[f.key] ?? ''}
                    onChange={e => setValues(prev => ({ ...prev, [f.key]: e.target.value }))}
                    rows={3}
                  />
                ) : (
                  <input
                    className="admin-form__input"
                    value={values[f.key] ?? ''}
                    onChange={e => setValues(prev => ({ ...prev, [f.key]: e.target.value }))}
                  />
                )}
                <button
                  type="button"
                  className="admin-btn admin-btn--ghost"
                  onClick={() => handleSave(f.key)}
                  disabled={saving === f.key}
                  style={{ flexShrink: 0, alignSelf: 'flex-start' }}
                >
                  <span className="material-symbols-outlined">save</span>
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* À propos */}
        <div className="admin-form__section">
          <h2 className="admin-form__section-title">À propos</h2>
          {FIELDS.filter(f => f.key.startsWith('about')).map(f => (
            <div key={f.key} className="admin-form__field">
              <label className="admin-form__label">{f.label}</label>
              <div style={{ display: 'flex', gap: 'var(--spacing-2)' }}>
                {f.multiline ? (
                  <textarea
                    className="admin-form__textarea"
                    value={values[f.key] ?? ''}
                    onChange={e => setValues(prev => ({ ...prev, [f.key]: e.target.value }))}
                    rows={5}
                  />
                ) : (
                  <input
                    className="admin-form__input"
                    value={values[f.key] ?? ''}
                    onChange={e => setValues(prev => ({ ...prev, [f.key]: e.target.value }))}
                  />
                )}
                <button
                  type="button"
                  className="admin-btn admin-btn--ghost"
                  onClick={() => handleSave(f.key)}
                  disabled={saving === f.key}
                  style={{ flexShrink: 0, alignSelf: 'flex-start' }}
                >
                  <span className="material-symbols-outlined">save</span>
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Contact */}
        <div className="admin-form__section">
          <h2 className="admin-form__section-title">Coordonnées</h2>
          {FIELDS.filter(f => f.key.startsWith('contact')).map(f => (
            <div key={f.key} className="admin-form__field">
              <label className="admin-form__label">{f.label}</label>
              <div style={{ display: 'flex', gap: 'var(--spacing-2)' }}>
                <input
                  className="admin-form__input"
                  value={values[f.key] ?? ''}
                  onChange={e => setValues(prev => ({ ...prev, [f.key]: e.target.value }))}
                />
                <button
                  type="button"
                  className="admin-btn admin-btn--ghost"
                  onClick={() => handleSave(f.key)}
                  disabled={saving === f.key}
                  style={{ flexShrink: 0 }}
                >
                  <span className="material-symbols-outlined">save</span>
                </button>
              </div>
            </div>
          ))}
        </div>

      </form>
    </>
  )
}