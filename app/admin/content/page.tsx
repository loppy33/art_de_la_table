'use client'

import { useEffect, useState } from 'react'
import { useToast } from '../hooks/useToast'

// ── Tous les champs éditables du site ─────────────────────────────────────────
const SECTIONS = [
  {
    title: 'Page d\'accueil',
    fields: [
      { key: 'hero_title',    label: 'Titre principal (Hero)' },
      { key: 'hero_subtitle', label: 'Sous-titre (Hero)', multiline: true },
      { key: 'mobilier_title',    label: 'Mobilier — Titre' },
      { key: 'mobilier_text',     label: 'Mobilier — Description', multiline: true },
      { key: 'audit_title',       label: 'Audit & Expertise — Titre' },
      { key: 'audit_text',        label: 'Audit & Expertise — Description', multiline: true },
      { key: 'audit_badge',       label: 'Audit — Badge (ex: +15 ans d\'expertise)' },
      { key: 'machines_title',    label: 'Machines — Titre section' },
      { key: 'machines_card_title', label: 'Machines — Titre carte principale' },
      { key: 'machines_card_text',  label: 'Machines — Description carte', multiline: true },
    ],
  },
  {
    title: 'À propos',
    fields: [
      { key: 'about_title',           label: 'Hero — Titre' },
      { key: 'about_text',            label: 'Hero — Description', multiline: true },
      { key: 'about_mission1_title',  label: 'Mission 1 — Titre' },
      { key: 'about_mission1_text',   label: 'Mission 1 — Description', multiline: true },
      { key: 'about_mission2_title',  label: 'Mission 2 — Titre' },
      { key: 'about_mission2_text',   label: 'Mission 2 — Description', multiline: true },
      { key: 'about_philosophy_text', label: 'Philosophie — Texte principal', multiline: true },
      { key: 'about_expertise_title', label: 'Expertise — Titre' },
      { key: 'about_expertise_text',  label: 'Expertise — Description', multiline: true },
      { key: 'about_expertise_item1', label: 'Expertise — Point 1 (titre)' },
      { key: 'about_expertise_item1_text', label: 'Expertise — Point 1 (description)' },
      { key: 'about_expertise_item2', label: 'Expertise — Point 2 (titre)' },
      { key: 'about_expertise_item2_text', label: 'Expertise — Point 2 (description)' },
      { key: 'about_history',         label: 'Citation flottante (expertise)', multiline: true },
    ],
  },
  {
    title: 'Services',
    fields: [
      { key: 'services_hero_text',      label: 'Hero — Description', multiline: true },
      { key: 'services_sourcing_title', label: 'Sourcing — Titre' },
      { key: 'services_sourcing_text',  label: 'Sourcing — Description', multiline: true },
      { key: 'services_audit_title',    label: 'Audit & Inventaire — Titre' },
      { key: 'services_audit_text',     label: 'Audit & Inventaire — Description', multiline: true },
      { key: 'services_design_title',   label: 'Conseil en Design — Titre' },
      { key: 'services_design_text',    label: 'Conseil en Design — Description', multiline: true },
      { key: 'services_tech_title',     label: 'Expertise Technique — Titre' },
      { key: 'services_tech_text',      label: 'Expertise Technique — Description', multiline: true },
      { key: 'services_step1_title',    label: 'Étape 1 — Titre' },
      { key: 'services_step1_text',     label: 'Étape 1 — Description', multiline: true },
      { key: 'services_step2_title',    label: 'Étape 2 — Titre' },
      { key: 'services_step2_text',     label: 'Étape 2 — Description', multiline: true },
      { key: 'services_step3_title',    label: 'Étape 3 — Titre' },
      { key: 'services_step3_text',     label: 'Étape 3 — Description', multiline: true },
      { key: 'services_step4_title',    label: 'Étape 4 — Titre' },
      { key: 'services_step4_text',     label: 'Étape 4 — Description', multiline: true },
    ],
  },
  {
    title: 'Coordonnées',
    fields: [
      { key: 'contact_address', label: 'Adresse' },
      { key: 'contact_phone',   label: 'Téléphone' },
      { key: 'contact_email',   label: 'Email' },
    ],
  },
]

const ALL_FIELDS = SECTIONS.flatMap(s => s.fields)

// ── Composant ──────────────────────────────────────────────────────────────────
export default function ContentPage() {
  const [values, setValues] = useState<Record<string, string>>({})
  const [saving, setSaving] = useState<string | null>(null)
  const [openSections, setOpenSections] = useState<Record<string, boolean>>({
    'Page d\'accueil': true,
    'À propos': false,
    'Services': false,
    'Coordonnées': true,
  })
  const { show, ToastEl } = useToast()

  useEffect(() => {
    fetch('/api/admin/content').then(r => r.json()).then(setValues)
  }, [])

  async function handleSave(key: string) {
    setSaving(key)
    const res = await fetch('/api/admin/content', {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ key, value: values[key] ?? '' }),
    })
    show(res.ok ? 'Sauvegardé ✓' : 'Erreur', res.ok ? 'success' : 'error')
    setSaving(null)
  }

  async function handleSaveAll(e: React.FormEvent) {
    e.preventDefault()
    setSaving('all')
    await Promise.all(
      ALL_FIELDS.map(f =>
        fetch('/api/admin/content', {
          method: 'PUT',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ key: f.key, value: values[f.key] ?? '' }),
        })
      )
    )
    show('Tous les contenus sauvegardés ✓')
    setSaving(null)
  }

  function toggleSection(title: string) {
    setOpenSections(prev => ({ ...prev, [title]: !prev[title] }))
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

      <form onSubmit={handleSaveAll} style={{ display: 'flex', flexDirection: 'column', gap: 'var(--spacing-4)', maxWidth: '100%' }}>
        {SECTIONS.map(section => (
          <div key={section.title} className="admin-content__section">

            {/* Header cliquable */}
            <button
              type="button"
              className="admin-content__section-header"
              onClick={() => toggleSection(section.title)}
            >
              <span className="admin-form__section-title" style={{ margin: 0 }}>
                {section.title}
              </span>
              <span className="material-symbols-outlined" style={{
                transition: 'transform 0.2s',
                transform: openSections[section.title] ? 'rotate(180deg)' : 'rotate(0deg)',
                color: 'var(--outline)',
              }}>
                expand_more
              </span>
            </button>

            {/* Fields */}
            {openSections[section.title] && (
              <div className="admin-content__fields">
                {section.fields.map(f => (
                  <div key={f.key} className="admin-form__field">
                    <label className="admin-form__label">{f.label}</label>
                    <div style={{ display: 'flex', gap: 'var(--spacing-2)', alignItems: 'flex-start' }}>
                      {f.multiline ? (
                        <textarea
                          className="admin-form__textarea"
                          value={values[f.key] ?? ''}
                          onChange={e => setValues(prev => ({ ...prev, [f.key]: e.target.value }))}
                          rows={3}
                          placeholder="Non renseigné — la valeur par défaut sera affichée"
                        />
                      ) : (
                        <input
                          className="admin-form__input"
                          value={values[f.key] ?? ''}
                          onChange={e => setValues(prev => ({ ...prev, [f.key]: e.target.value }))}
                          placeholder="Non renseigné — la valeur par défaut sera affichée"
                        />
                      )}
                      <button
                        type="button"
                        className="admin-btn admin-btn--ghost"
                        onClick={() => handleSave(f.key)}
                        disabled={saving === f.key}
                        style={{ flexShrink: 0 }}
                        title="Sauvegarder ce champ"
                      >
                        <span className="material-symbols-outlined">
                          {saving === f.key ? 'hourglass_empty' : 'save'}
                        </span>
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            )}

          </div>
        ))}
      </form>
    </>
  )
}