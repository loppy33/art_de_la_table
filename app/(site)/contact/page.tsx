export default function Contact() {
  return (
    <main className="contact">
      
      {/* Hero Section */}
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

      {/* Main Grid: Details & Form */}
      <section className="contact-main container">
        <div className="contact-main__grid">
          
          {/* Left Column: Contact Details (Asymmetric) */}
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

            {/* Decorative Visual */}
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

          {/* Right Column: Contact Form (The Atelier Canvas) */}
          <div className="contact-form-wrapper ambient-shadow">
            <h2 className="headline-lg mb-10">Votre projet</h2>
            
            <form className="atelier-form">
              <div className="form-group">
                <label htmlFor="last-name" className="label-md">Nom</label>
                <input type="text" id="last-name" name="last-name" placeholder="Duchamp" />
              </div>
              
              <div className="form-group">
                <label htmlFor="first-name" className="label-md">Prénom</label>
                <input type="text" id="first-name" name="first-name" placeholder="Alexandre" />
              </div>
              
              <div className="form-group full-width">
                <label htmlFor="company" className="label-md">Établissement / Entreprise</label>
                <input type="text" id="company" name="company" placeholder="Hôtel de Paris Monte-Carlo" />
              </div>
              
              <div className="form-group">
                <label htmlFor="email" className="label-md">Mail</label>
                <input type="email" id="email" name="email" placeholder="alexandre@domaine.fr" />
              </div>
              
              <div className="form-group">
                <label htmlFor="phone" className="label-md">Téléphone</label>
                <input type="tel" id="phone" name="phone" placeholder="+33 6 00 00 00 00" />
              </div>
              
              <div className="form-group full-width">
                <label htmlFor="needs" className="label-md">Votre besoin</label>
                <div className="select-wrapper">
                  <select id="needs" name="needs">
                    <option value="selection">Sélection d'art de la table personnalisée</option>
                    <option value="event">Événementiel & Réceptions</option>
                    <option value="professional">Équipement professionnel (Horeca)</option>
                    <option value="other">Autre demande</option>
                  </select>
                  <span className="material-symbols-outlined dropdown-icon">expand_more</span>
                </div>
              </div>
              
              <div className="form-group full-width">
                <label htmlFor="message" className="label-md">Message</label>
                <textarea id="message" name="message" rows={4} placeholder="Décrivez votre vision..."></textarea>
              </div>
              
              <div className="form-submit full-width">
                <button type="submit" className="btn-primary w-full-mobile">Envoyer la demande</button>
              </div>
            </form>
          </div>

        </div>
      </section>

      {/* Section 3: Priority Options (CTA Bento) */}
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
              <a href="#" className="priority-btn btn-gold-solid">
                <div className="btn-text">
                  <span className="label-sm">Agenda en ligne</span>
                  <span className="btn-title">Prendre rendez-vous</span>
                </div>
                <span className="material-symbols-outlined">calendar_today</span>
              </a>
              
              <a href="#" className="priority-btn btn-glass-border">
                <div className="btn-text">
                  <span className="label-sm">Accès rapide</span>
                  <span className="btn-title">Demander un devis</span>
                </div>
                <span className="material-symbols-outlined">request_quote</span>
              </a>
            </div>
          </div>
        </div>
      </section>

    </main>
  );
}