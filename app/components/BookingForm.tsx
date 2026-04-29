'use client'

import { useState } from 'react'

const PROJECT_TYPES = [
  { value: 'hotel', label: 'Équipement hôtelier complet' },
  { value: 'restaurant', label: 'Sélection pour restaurant gastronomique' },
  { value: 'event', label: 'Événement & réception privée' },
  { value: 'audit', label: 'Audit F&B & conseil stratégique' },
  { value: 'sourcing', label: 'Sourcing artisans & manufactures' },
  { value: 'other', label: 'Autre projet' },
]

const TIME_SLOTS = [
  '09h00', '09h30', '10h00', '10h30', '11h00', '11h30',
  '14h00', '14h30', '15h00', '15h30', '16h00', '16h30', '17h00', '17h30',
]

// Date min = demain
function getMinDate() {
  const d = new Date()
  d.setDate(d.getDate() + 1)
  return d.toISOString().split('T')[0]
}

// Date max = 3 mois
function getMaxDate() {
  const d = new Date()
  d.setMonth(d.getMonth() + 3)
  return d.toISOString().split('T')[0]
}

export default function BookingForm() {
  const [step, setStep] = useState(1)
  const [form, setForm] = useState({
    firstName: '', lastName: '', company: '',
    email: '', phone: '',
    projectType: '', message: '',
    preferredDate: '', preferredTime: '',
  })
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle')

  function set(key: string, value: string) {
    setForm(prev => ({ ...prev, [key]: value }))
  }

  function canGoStep2() {
    return form.firstName && form.lastName && form.email && form.projectType
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setStatus('loading')

    const res = await fetch('/api/rendez-vous', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(form),
    })

    setStatus(res.ok ? 'success' : 'error')
  }

  if (status === 'success') {
    return (
      <div className="booking-form__success">
        <div className="booking-form__success-icon">
          <span className="material-symbols-outlined">check_circle</span>
        </div>
        <h3 className="booking-form__success-title">Demande envoyée avec succès</h3>
        <p className="booking-form__success-desc">
          Notre équipe vous contactera sous <strong>24h ouvrées</strong> pour confirmer votre créneau et préparer votre consultation.
        </p>
        <div className="booking-form__success-summary">
          <div className="booking-form__summary-item">
            <span className="material-symbols-outlined">person</span>
            <span>{form.firstName} {form.lastName}</span>
          </div>
          {form.company && (
            <div className="booking-form__summary-item">
              <span className="material-symbols-outlined">business</span>
              <span>{form.company}</span>
            </div>
          )}
          {form.preferredDate && (
            <div className="booking-form__summary-item">
              <span className="material-symbols-outlined">calendar_today</span>
              <span>
                {new Date(form.preferredDate).toLocaleDateString('fr-FR', {
                  weekday: 'long', day: 'numeric', month: 'long'
                })}
                {form.preferredTime && ` à ${form.preferredTime}`}
              </span>
            </div>
          )}
          <div className="booking-form__summary-item">
            <span className="material-symbols-outlined">mail</span>
            <span>{form.email}</span>
          </div>
        </div>
      </div>
    )
  }

  return (
    <form className="booking-form" onSubmit={handleSubmit}>

      {/* Steps indicator */}
      <div className="booking-form__steps">
        <div className={`booking-form__step ${step >= 1 ? 'booking-form__step--done' : ''}`}>
          <div className="booking-form__step-circle">
            {step > 1
              ? <span className="material-symbols-outlined">check</span>
              : <span>1</span>
            }
          </div>
          <span>Votre profil</span>
        </div>
        <div className="booking-form__step-line" />
        <div className={`booking-form__step ${step >= 2 ? 'booking-form__step--done' : ''}`}>
          <div className="booking-form__step-circle">
            {step > 2
              ? <span className="material-symbols-outlined">check</span>
              : <span>2</span>
            }
          </div>
          <span>Disponibilités</span>
        </div>
        <div className="booking-form__step-line" />
        <div className={`booking-form__step ${step >= 3 ? 'booking-form__step--active' : ''}`}>
          <div className="booking-form__step-circle"><span>3</span></div>
          <span>Confirmation</span>
        </div>
      </div>

      {/* Step 1: Profil + projet */}
      {step === 1 && (
        <div className="booking-form__panel">
          <h3 className="booking-form__panel-title">Votre profil & votre projet</h3>

          <div className="booking-form__row">
            <div className="booking-form__field">
              <label>Prénom *</label>
              <input
                type="text" placeholder="Alexandre" required
                value={form.firstName} onChange={e => set('firstName', e.target.value)}
              />
            </div>
            <div className="booking-form__field">
              <label>Nom *</label>
              <input
                type="text" placeholder="Duchamp" required
                value={form.lastName} onChange={e => set('lastName', e.target.value)}
              />
            </div>
          </div>

          <div className="booking-form__field">
            <label>Établissement / Entreprise</label>
            <input
              type="text" placeholder="Hôtel de Paris Monte-Carlo"
              value={form.company} onChange={e => set('company', e.target.value)}
            />
          </div>

          <div className="booking-form__row">
            <div className="booking-form__field">
              <label>Email *</label>
              <input
                type="email" placeholder="alexandre@domaine.fr" required
                value={form.email} onChange={e => set('email', e.target.value)}
              />
            </div>
            <div className="booking-form__field">
              <label>Téléphone</label>
              <input
                type="tel" placeholder="+33 6 00 00 00 00"
                value={form.phone} onChange={e => set('phone', e.target.value)}
              />
            </div>
          </div>

          <div className="booking-form__field">
            <label>Nature du projet *</label>
            <div className="booking-form__project-types">
              {PROJECT_TYPES.map(pt => (
                <button
                  key={pt.value}
                  type="button"
                  className={`booking-form__type-btn${form.projectType === pt.value ? ' booking-form__type-btn--active' : ''}`}
                  onClick={() => set('projectType', pt.value)}
                >
                  {pt.label}
                </button>
              ))}
            </div>
          </div>

          <div className="booking-form__actions">
            <button
              type="button"
              className="booking-form__next"
              onClick={() => setStep(2)}
              disabled={!canGoStep2()}
            >
              Choisir mes disponibilités
              <span className="material-symbols-outlined">arrow_forward</span>
            </button>
          </div>
        </div>
      )}

      {/* Step 2: Date + heure */}
      {step === 2 && (
        <div className="booking-form__panel">
          <h3 className="booking-form__panel-title">Vos disponibilités</h3>
          <p className="booking-form__panel-desc">
            Indiquez vos préférences — notre équipe confirmera le créneau exact sous 24h.
          </p>

          <div className="booking-form__row">
            <div className="booking-form__field">
              <label>Date souhaitée</label>
              <input
                type="date"
                min={getMinDate()}
                max={getMaxDate()}
                value={form.preferredDate}
                onChange={e => set('preferredDate', e.target.value)}
              />
            </div>
          </div>

          {form.preferredDate && (
            <div className="booking-form__field">
              <label>Créneau horaire préféré</label>
              <div className="booking-form__time-slots">
                {TIME_SLOTS.map(slot => (
                  <button
                    key={slot}
                    type="button"
                    className={`booking-form__time-btn${form.preferredTime === slot ? ' booking-form__time-btn--active' : ''}`}
                    onClick={() => set('preferredTime', slot)}
                  >
                    {slot}
                  </button>
                ))}
              </div>
            </div>
          )}

          <div className="booking-form__field">
            <label>Message ou précisions (optionnel)</label>
            <textarea
              rows={3}
              placeholder="Décrivez votre vision, vos contraintes ou vos questions…"
              value={form.message}
              onChange={e => set('message', e.target.value)}
            />
          </div>

          <div className="booking-form__actions booking-form__actions--spaced">
            <button type="button" className="booking-form__back" onClick={() => setStep(1)}>
              <span className="material-symbols-outlined">arrow_back</span>
              Retour
            </button>
            <button type="button" className="booking-form__next" onClick={() => setStep(3)}>
              Vérifier ma demande
              <span className="material-symbols-outlined">arrow_forward</span>
            </button>
          </div>
        </div>
      )}

      {/* Step 3: Récapitulatif + envoi */}
      {step === 3 && (
        <div className="booking-form__panel">
          <h3 className="booking-form__panel-title">Récapitulatif de votre demande</h3>

          <div className="booking-form__recap">
            <div className="booking-form__recap-section">
              <p className="booking-form__recap-label">Contact</p>
              <p className="booking-form__recap-value">{form.firstName} {form.lastName}</p>
              {form.company && <p className="booking-form__recap-sub">{form.company}</p>}
              <p className="booking-form__recap-sub">{form.email}</p>
              {form.phone && <p className="booking-form__recap-sub">{form.phone}</p>}
            </div>

            <div className="booking-form__recap-divider" />

            <div className="booking-form__recap-section">
              <p className="booking-form__recap-label">Projet</p>
              <p className="booking-form__recap-value">
                {PROJECT_TYPES.find(p => p.value === form.projectType)?.label}
              </p>
            </div>

            <div className="booking-form__recap-divider" />

            <div className="booking-form__recap-section">
              <p className="booking-form__recap-label">Disponibilité souhaitée</p>
              <p className="booking-form__recap-value">
                {form.preferredDate
                  ? new Date(form.preferredDate).toLocaleDateString('fr-FR', {
                      weekday: 'long', day: 'numeric', month: 'long', year: 'numeric'
                    })
                  : 'Flexible'}
                {form.preferredTime && ` — ${form.preferredTime}`}
              </p>
            </div>

            {form.message && (
              <>
                <div className="booking-form__recap-divider" />
                <div className="booking-form__recap-section">
                  <p className="booking-form__recap-label">Message</p>
                  <p className="booking-form__recap-value booking-form__recap-message">{form.message}</p>
                </div>
              </>
            )}
          </div>

          {status === 'error' && (
            <p className="booking-form__error">Une erreur est survenue. Veuillez réessayer.</p>
          )}

          <div className="booking-form__actions booking-form__actions--spaced">
            <button type="button" className="booking-form__back" onClick={() => setStep(2)}>
              <span className="material-symbols-outlined">arrow_back</span>
              Modifier
            </button>
            <button type="submit" className="booking-form__submit" disabled={status === 'loading'}>
              {status === 'loading'
                ? 'Envoi en cours…'
                : 'Envoyer ma demande'}
              {status !== 'loading' && (
                <span className="material-symbols-outlined">send</span>
              )}
            </button>
          </div>
        </div>
      )}

    </form>
  )
}