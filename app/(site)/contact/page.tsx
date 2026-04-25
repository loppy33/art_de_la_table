'use client'

import { useState } from 'react'

const NEEDS = [
  { value: 'selection', label: 'Sélection d\'art de la table personnalisée' },
  { value: 'event', label: 'Événementiel & Réceptions' },
  { value: 'professional', label: 'Équipement professionnel (Horeca)' },
  { value: 'other', label: 'Autre demande' },
]

export default function Contact() {
  const [form, setForm] = useState({
    lastName: '', firstName: '', company: '',
    email: '', phone: '', need: 'selection', message: '',
  })
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle')

  function set(key: string, value: string) {
    setForm(prev => ({ ...prev, [key]: value }))
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setStatus('loading')

    const res = await fetch('/api/contact', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(form),
    })

    setStatus(res.ok ? 'success' : 'error')
  }

  return (
    <main className="contact">

      {/* Hero */}
      <header className="contact-hero container">
        <div className="contact-hero__grid">
          <div className="contact-hero__title">
            <span className="label-md label-gold">Écrivez votre histoire</span>
            <h1 className="display-lg">
              Donnez vie à vos <br />
              <span className="italic font-light text-primary">réceptions d'exception.</span>
            </h1>
          </div>
          <div className="contact-hero__desc">
            <p>
              Un projet de restauration, un événement privé ou une sélection sur-mesure ? Nos experts vous accompagnent dans chaque détail.
            </p>
          </div>
        </div>
      </header>

      {/* Main Grid */}
      <section className="contact-main container">
        <div className="contact-main__grid">

          {/* Sidebar */}
          <aside className="contact-sidebar">
            <div className="info-card bg-low">
              <h2 className="headline-md">Coordonnées</h2>
              <div className="info-list">
                <div className="info-item">
                  <span className="material-symbols-outlined icon-gold">mail</span>
                  <div>
                    <p className="label-sm text-muted">Email</p>
                    <a href="mailto:contact@lartdelatable.fr" className="link-underline">contact@lartdelatable.fr</a>
                  </div>
                </div>
                <div className="info-item">
                  <span className="material-symbols-outlined icon-gold">call</span>
                  <div>
                    <p className="label-sm text-muted">Téléphone</p>
                    <p className="text-medium">+33 (0)1 45 67 89 00</p>
                  </div>
                </div>
                <div className="info-item">
                  <span className="material-symbols-outlined icon-gold">schedule</span>
                  <div>
                    <p className="label-sm text-muted">Horaires</p>
                    <p>Lundi — Vendredi</p>
                    <p className="text-medium">09h00 – 18h30</p>
                  </div>
                </div>
              </div>
            </div>
            <div className="decorative-image">
              <img
                src="https://lh3.googleusercontent.com/aida-public/AB6AXuBuKvFQ4jIcTLxv3ivsdelB4Bpwp77OYhEOBdHV-_MWhBHzjo2z2UTCp2CVmvsrLJm-7WDn1fa2ZUiIsviJa13Gpu13KbB7uInAi6p2l0MYXXwoxymeehGGUo0OuDGUDaH4tpGocoQ6K6koLJ5kylXNrMmPP-P4MiYnC-cqLAiL_EOKbMKhjCeiuU1BqfLlQR-yoHnsnphPvhahaubvTAkWlof6AKAkByKVdec0qwkkP_9f9QkhexcqIn6bfJZwtQU8WjA1PK5HzOcz"
                alt="Table d'exception avec cristal et argenterie"
              />
              <div className="image-quote glassmorphism">
                <p className="headline-sm italic m-0">"Le détail est ce qui fait la différence entre le bon et le sublime."</p>
              </div>
            </div>
          </aside>

          {/* Formulaire */}
          <div className="contact-form-wrapper ambient-shadow">
            {status === 'success' ? (
              <div className="contact-success">
                <span className="material-symbols-outlined">check_circle</span>
                <h2 className="headline-lg">Merci pour votre message !</h2>
                <p>Notre équipe vous répondra dans les meilleurs délais, généralement sous 24h ouvrées.</p>
                <button className="btn-secondary" onClick={() => setStatus('idle')}>
                  Envoyer une autre demande
                </button>
              </div>
            ) : (
              <>
                <h2 className="headline-lg mb-10">Votre projet</h2>
                <form className="atelier-form" onSubmit={handleSubmit}>
                  <div className="form-group">
                    <label htmlFor="last-name" className="label-md">Nom *</label>
                    <input
                      type="text" id="last-name" placeholder="Duchamp" required
                      value={form.lastName} onChange={e => set('lastName', e.target.value)}
                    />
                  </div>
                  <div className="form-group">
                    <label htmlFor="first-name" className="label-md">Prénom *</label>
                    <input
                      type="text" id="first-name" placeholder="Alexandre" required
                      value={form.firstName} onChange={e => set('firstName', e.target.value)}
                    />
                  </div>
                  <div className="form-group full-width">
                    <label htmlFor="company" className="label-md">Établissement / Entreprise</label>
                    <input
                      type="text" id="company" placeholder="Hôtel de Paris Monte-Carlo"
                      value={form.company} onChange={e => set('company', e.target.value)}
                    />
                  </div>
                  <div className="form-group">
                    <label htmlFor="email" className="label-md">Email *</label>
                    <input
                      type="email" id="email" placeholder="alexandre@domaine.fr" required
                      value={form.email} onChange={e => set('email', e.target.value)}
                    />
                  </div>
                  <div className="form-group">
                    <label htmlFor="phone" className="label-md">Téléphone</label>
                    <input
                      type="tel" id="phone" placeholder="+33 6 00 00 00 00"
                      value={form.phone} onChange={e => set('phone', e.target.value)}
                    />
                  </div>
                  <div className="form-group full-width">
                    <label htmlFor="needs" className="label-md">Votre besoin</label>
                    <div className="select-wrapper">
                      <select
                        id="needs" value={form.need}
                        onChange={e => set('need', e.target.value)}
                      >
                        {NEEDS.map(n => (
                          <option key={n.value} value={n.value}>{n.label}</option>
                        ))}
                      </select>
                      <span className="material-symbols-outlined dropdown-icon">expand_more</span>
                    </div>
                  </div>
                  <div className="form-group full-width">
                    <label htmlFor="message" className="label-md">Message</label>
                    <textarea
                      id="message" rows={4} placeholder="Décrivez votre vision…"
                      value={form.message} onChange={e => set('message', e.target.value)}
                    />
                  </div>
                  {status === 'error' && (
                    <div className="form-group full-width">
                      <p style={{ color: '#c0392b', fontSize: 'var(--text-body-md)' }}>
                        Une erreur est survenue. Veuillez réessayer.
                      </p>
                    </div>
                  )}
                  <div className="form-submit full-width">
                    <button type="submit" className="btn-primary w-full-mobile" disabled={status === 'loading'}>
                      {status === 'loading' ? 'Envoi en cours…' : 'Envoyer la demande'}
                    </button>
                  </div>
                </form>
              </>
            )}
          </div>

        </div>
      </section>

      {/* Priority CTA */}
      <section className="contact-priority container">
        <div className="priority-card">
          <div className="priority-card__overlay"></div>
          <div className="priority-card__content">
            <div className="text-block">
              <h2 className="headline-lg text-white">Vous préférez aller plus vite ?</h2>
              <p className="text-light">
                Gagnez du temps en choisissant l'option qui correspond le mieux à l'urgence de votre projet.
              </p>
            </div>
            <div className="action-buttons">
              <a href="/rendez-vous" className="priority-btn btn-gold-solid">
                <div className="btn-text">
                  <span className="label-sm">Agenda en ligne</span>
                  <span className="btn-title">Prendre rendez-vous</span>
                </div>
                <span className="material-symbols-outlined">calendar_today</span>
              </a>
            </div>
          </div>
        </div>
      </section>

    </main>
  )
}