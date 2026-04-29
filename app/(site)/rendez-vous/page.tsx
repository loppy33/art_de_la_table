import BookingForm from '@/app/components/BookingForm'
import { prisma } from '@/lib/prisma'

async function getArtisans() {
  return prisma.artisan.findMany({
    orderBy: [{ featured: 'desc' }, { name: 'asc' }],
    select: { id: true, name: true, featured: true },
  })
}

const FALLBACK_ARTISANS = [
  { id: '1', name: 'Ateliers Riou', featured: true },
  { id: '2', name: 'Suzant Cristal', featured: true },
  { id: '3', name: 'Le Jacquard Français', featured: false },
  { id: '4', name: 'Éclat de France', featured: false },
]

export default async function Booking() {
  const artisans = await getArtisans()
  const displayArtisans = artisans.length > 0 ? artisans : FALLBACK_ARTISANS

  return (
    <main className="booking">

      {/* Hero */}
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

      {/* Process & Benefits */}
      <section className="booking-info container">
        <div className="info-grid">
          <div className="info-card bg-low">
            <span className="material-symbols-outlined icon-gold lg-icon mb-6">star</span>
            <h3 className="headline-md">Expertise séculaire</h3>
            <p>Bénéficiez du regard de nos conseillers formés aux plus grandes traditions de l'orfèvrerie et de la céramique française.</p>
          </div>
          <div className="info-card bg-low">
            <span className="material-symbols-outlined icon-gold lg-icon mb-6">auto_awesome</span>
            <h3 className="headline-md">Conseil sur-mesure</h3>
            <p>Chaque projet est unique. Nous analysons vos besoins pour créer une harmonie parfaite entre vos espaces et nos collections.</p>
          </div>
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

      {/* Booking Form Section */}
      <section className="booking-widget-section container">
        <div className="widget-header">
          <div>
            <h2 className="headline-lg">Réserver votre créneau</h2>
            <p className="text-muted italic">Notre équipe vous confirmera le rendez-vous sous 24h ouvrées.</p>
          </div>
          <div className="availability-badge">
            <span className="status-dot pulse-green"></span>
            <span className="label-sm">Experts disponibles aujourd'hui</span>
          </div>
        </div>

        <div className="widget-container bg-low">
          <div className="widget-box ambient-shadow">
            <div className="widget-bg-pattern"></div>
            <BookingForm />
          </div>
        </div>
      </section>

      {/* Trust — artisans depuis BDD */}
      <section className="booking-trust container text-center">
        <span className="label-md text-muted block mb-10">Ils nous confient leurs tables</span>
        <div className="trust-logos">
          {displayArtisans.map(a => (
            <span key={a.id} className={a.featured ? 'trust-logos__featured' : ''}>
              {a.name}
            </span>
          ))}
        </div>
      </section>

    </main>
  )
}