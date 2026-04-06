export default function Booking() {
  return (
    <main className="booking">
      
      {/* Hero Section */}
      <section className="booking-hero container">
        <div className="booking-hero__content">
          <span className="label-md label-gold">Consultation Privée</span>
          <h1 className="display-lg">
            L'excellence s'invite à <br />
            <span className="text-secondary italic">votre table.</span>
          </h1>
          <p className="hero-desc">
            Réservez un moment privilégié avec nos experts pour concevoir une expérience gastronomique sur-mesure, alliant héritage français et design contemporain.
          </p>
        </div>
      </section>

      {/* Process & Benefits Section */}
      <section className="booking-info container">
        <div className="info-grid">
          
          {/* Expertise */}
          <div className="info-card bg-low">
            <span className="material-symbols-outlined icon-gold lg-icon mb-6">star</span>
            <h3 className="headline-md">Expertise séculaire</h3>
            <p>
              Bénéficiez du regard de nos conseillers formés aux plus grandes traditions de l'orfèvrerie et de la céramique française.
            </p>
          </div>
          
          {/* Personalization */}
          <div className="info-card bg-low">
            <span className="material-symbols-outlined icon-gold lg-icon mb-6">auto_awesome</span>
            <h3 className="headline-md">Conseil sur-mesure</h3>
            <p>
              Chaque projet est unique. Nous analysons vos besoins pour créer une harmonie parfaite entre vos espaces et nos collections.
            </p>
          </div>

          {/* Process List */}
          <div className="process-card">
            <span className="label-md text-muted block mb-8">Le processus</span>
            <ul className="process-list">
              <li>
                <span className="step-num">01</span>
                <div>
                  <h4 className="label-md text-primary">Sélection</h4>
                  <p>Choisissez un créneau disponible dans notre agenda.</p>
                </div>
              </li>
              <li>
                <span className="step-num">02</span>
                <div>
                  <h4 className="label-md text-primary">Briefing</h4>
                  <p>Un court questionnaire pour comprendre votre vision.</p>
                </div>
              </li>
              <li>
                <span className="step-num">03</span>
                <div>
                  <h4 className="label-md text-primary">Rencontre</h4>
                  <p>30 minutes d'échange exclusif par visioconférence.</p>
                </div>
              </li>
            </ul>
          </div>

        </div>
      </section>

      {/* Booking Widget Section */}
      <section className="booking-widget-section container">
        <div className="widget-header">
          <div>
            <h2 className="headline-lg">Réserver votre créneau</h2>
            <p className="text-muted italic">Disponibilités mises à jour en temps réel par nos maîtres de cérémonie.</p>
          </div>
          <div className="availability-badge">
            <span className="status-dot pulse-green"></span>
            <span className="label-sm">Experts disponibles aujourd'hui</span>
          </div>
        </div>

        {/* Calendly-style Widget Placeholder */}
        <div className="widget-container bg-low">
          <div className="widget-box ambient-shadow">
            <div className="widget-bg-pattern"></div>
            
            <div className="widget-content">
              <span className="material-symbols-outlined text-muted lg-icon mb-6 opacity-30">calendar_month</span>
              <h3 className="headline-md">Module de réservation sécurisé</h3>
              <p className="text-muted max-w-md mx-auto mb-10">
                Veuillez patienter pendant le chargement de l'interface interactive pour la sélection de la date et de l'heure de votre consultation.
              </p>
              
              <div className="loading-bar">
                <div className="loading-bar__inner"></div>
              </div>
              <span className="label-sm text-muted mt-4">Initialisation de l'agenda</span>
            </div>
          </div>
        </div>
      </section>

      {/* Trust Section */}
      <section className="booking-trust container text-center">
        <span className="label-md text-muted block mb-10">Ils nous confient leurs tables</span>
        <div className="trust-logos">
          <span>MAISON GASTRONOMIE</span>
          <span>L'ÉCLAT PARIS</span>
          <span>HÉRITAGE & CO</span>
          <span>ATELIER D'OR</span>
        </div>
      </section>

    </main>
  );
}