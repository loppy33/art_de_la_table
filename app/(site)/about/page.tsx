import Link from "next/link"
import { prisma } from "@/lib/prisma"

async function getData() {
  const [artisans, content] = await Promise.all([
    prisma.artisan.findMany({ orderBy: [{ featured: "desc" }, { name: "asc" }] }),
    prisma.siteContent.findMany(),
  ])
  const c = Object.fromEntries(content.map((r) => [r.key, r.value]))
  return { artisans, c }
}

export default async function About() {
  const { artisans, c } = await getData()

  const displayArtisans = artisans.length > 0
    ? artisans
    : [
        { id: "1", name: "Porcelaine d'Artois", logo: null, history: null, featured: false, slug: "" },
        { id: "2", name: "Cristal de Lorraine", logo: null, history: null, featured: false, slug: "" },
        { id: "3", name: "Lin de Normandie", logo: null, history: null, featured: false, slug: "" },
        { id: "4", name: "Orfèvrerie Royale", logo: null, history: null, featured: false, slug: "" },
      ]

  const storiedArtisans = artisans.filter(a => a.history && a.history.trim().length > 0)

  return (
    <main className="about">

      {/* Section 1: Hero */}
      <section className="about-hero">
        <div className="about-hero__bg">
          <img
            src="https://lh3.googleusercontent.com/aida-public/AB6AXuD43EyfMSD_9MUONzlyTzHvxRujdrO2bnny4iwfwy4Q-2QzWo0Kxhk0D2RBnZ3RVJeDlPal4gr1BjD4Ca-UYnKHN3VaiREAoANOJfA814bwk9ZxCBqDJZTdE2D6sr8Bpr5E3vOhjKeDSkVtW3Qqh7qQIZPppfrbuE45-oVZNmRqDSWHzDHAGKIyNewKadZiiSQNrEKsGfTQj9UHwnDwubV62vcYQ-GYqQ-DK3trCUIoef_yGP4pfCBy8RMgQEn7kUBMr-EuM3p2wlve"
            alt="Détail d'une table élégante"
          />
          <div className="about-hero__overlay"></div>
        </div>
        <div className="container about-hero__content">
          <div className="max-w-xl text-white">
            <span className="label-md label-gold-bg">L'Héritage de l'ATF</span>
            <h1 className="display-lg text-white">
              {c.about_title ?? "Le raffinement à la française."}
            </h1>
            <p className="about-hero__desc">
              {c.about_text ?? "L'Art de la Table à la Française (ATF) n'est pas qu'un service, c'est une célébration de l'art de vivre. Nous redonnons ses lettres de noblesse à l'accueil, où chaque détail devient une émotion."}
            </p>
          </div>
        </div>
      </section>

      {/* Section 2: Missions */}
      <section className="about-missions bg-surface">
        <div className="container missions-grid">
          <div className="missions-text">
            <h2 className="headline-lg">Pourquoi l'ATF existe-t-il ?</h2>
            <div className="missions-list">
              <div className="mission-item">
                <div className="mission-item__header">
                  <span className="material-symbols-outlined icon-gold">history_edu</span>
                  <h3 className="headline-md">Préserver le Patrimoine</h3>
                </div>
                <p>Nous œuvrons pour que les savoir-faire ancestraux de la porcelaine de Limoges, de la cristallerie et de l'orfèvrerie ne tombent jamais dans l'oubli, mais brillent dans le présent.</p>
              </div>
              <div className="mission-item">
                <div className="mission-item__header">
                  <span className="material-symbols-outlined icon-gold">workspace_premium</span>
                  <h3 className="headline-md">L'Excellence du Moment</h3>
                </div>
                <p>Transformer chaque repas en un événement mémorable. Notre mission est d'élever l'ordinaire vers l'extraordinaire par la mise en scène et le choix des matières.</p>
              </div>
            </div>
          </div>
          <div className="missions-visual">
            <div className="image-card bg-low">
              <img
                src="https://lh3.googleusercontent.com/aida-public/AB6AXuCmMFd7urw6Mpc1mNPomy9JodfTxZp6r6xUaqrZmLhWRpUMs1Fl0EQFqktUr8WP1RCEIhHQoaNt2QqDJ5L5OG5o4M6iwcS0BcsMpqo-EN3KV9dAzZFXFuwkW0oScUUBFlfQ7KNGukjjimQoPYdrl8zkUtUAgSIM2UNlDhlbicFms4rb6sfFYXKGnFsksV27ZI2ReTwSD9eEFh3xbqmNwkdZRrfEUuk7s_01F4DrWaM-cHDh_4bCXIsKW0DBtazyGbBsWaZK7EbX4BD5"
                alt="Artisanal workshop"
                className="ambient-shadow"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Section 3: Philosophie */}
      <section className="about-philosophy bg-low">
        <div className="container">
          <div className="philosophy-header text-center">
            <h2 className="headline-lg">Notre Philosophie</h2>
            <div className="decorative-dash"></div>
          </div>
          <div className="philosophy-bento">
            <div className="bento-card card-large">
              <div>
                <span className="label-md text-gold block mb-4">Valeur Fondamentale</span>
                <h3 className="display-sm">Authenticité sans compromis</h3>
                <p className="text-lg mt-4">
                  Chaque pièce sélectionnée par l'ATF porte en elle l'histoire d'un atelier, d'un terroir et d'un geste maintes fois répété. Nous refusons l'uniformisation au profit du caractère unique.
                </p>
              </div>
              <div className="card-stats">
                <div className="stat-item">
                  <span className="stat-number">100%</span>
                  <span className="label-md">Fait Main</span>
                </div>
                <div className="stat-divider"></div>
                <div className="stat-item">
                  <span className="stat-number">EPV</span>
                  <span className="label-md">Labels d'État</span>
                </div>
              </div>
            </div>
            <div className="bento-card card-primary">
              <span className="material-symbols-outlined icon-gold lg-icon">auto_awesome</span>
              <h3 className="headline-md text-white mt-auto">Le Sens du Détail</h3>
              <p className="text-light">
                C'est l'inclinaison d'un verre, le pliage d'une serviette en lin, ou l'éclat d'une argenterie polie qui créent la magie d'une réception réussie.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Section 4: Expertise */}
      <section className="about-expertise bg-surface">
        <div className="container expertise-grid">
          <div className="expertise-visual">
            <div className="blur-blob"></div>
            <img
              src="https://lh3.googleusercontent.com/aida-public/AB6AXuCBuE2cNZytnnLK0CeJyOTvCBjl9f9nXTo2RDHf1XY9HkPJz7p3D_S7wRplFqnkHrOk5yDP09pUdcepyXxjRRAxqca-o4pzbWc43AFgyBIQvbkznM-PtJ0anpeHSdLyNsSu79ZXqL_i0gkgCzUn6P7gEZtMqbgj6YohM0o5B_gH9LsZ-Op8JGwciOdvcpeTe_Use8jSFpauVYtz51Kv7ppiTTDoQWHZ829HuI-jbMMyv0a88G_NSu1okXlxIOIxCgVLsd-Rl40dFKyV"
              alt="Table experts"
              className="ambient-shadow"
            />
            <div className="floating-quote ambient-shadow">
              <p>
                {c.about_history
                  ? `"${c.about_history.slice(0, 100)}…"`
                  : '"Notre expertise est le fruit de 20 ans de passion pour les métiers d\'art."'}
              </p>
            </div>
          </div>
          <div className="expertise-text">
            <h2 className="headline-lg">Une expertise d'exception</h2>
            <p className="text-lg mb-8">
              L'équipe de l'ATF est composée de conservateurs de styles, de décorateurs et de spécialistes de l'étiquette. Nous ne nous contentons pas de louer du matériel ; nous conseillons sur l'accord parfait entre le menu, le lieu et l'ambiance.
            </p>
            <ul className="expertise-list">
              <li>
                <span className="material-symbols-outlined icon-gold">check_circle</span>
                <div>
                  <strong>Conseil en Scénographie</strong>
                  <p>Création d'univers visuels sur-mesure.</p>
                </div>
              </li>
              <li>
                <span className="material-symbols-outlined icon-gold">check_circle</span>
                <div>
                  <strong>Sourcing Exclusif</strong>
                  <p>Accès à des collections privées et des séries limitées.</p>
                </div>
              </li>
            </ul>
          </div>
        </div>
      </section>

      {/* Section 5: Partenaires */}
      <section className="about-partners bg-low">
        <div className="container">

          <div className="partners-header">
            <div className="max-w-xl">
              <h2 className="headline-lg">Nos Partenaires Artisans</h2>
              <p>Nous travaillons main dans la main avec les plus prestigieuses maisons françaises, détenant souvent le label "Entreprise du Patrimoine Vivant".</p>
            </div>
            <Link href="/selection" className="btn-text link-with-arrow">
              Voir la collection
              <span className="material-symbols-outlined">arrow_forward</span>
            </Link>
          </div>

          {/* Grid logos */}
          <div className="partners-grid">
            {displayArtisans.map((artisan) => (
              <div key={artisan.id} className="partner-card ambient-shadow">
                {artisan.featured && (
                  <span className="partner-card__featured">
                    <span className="material-symbols-outlined">star</span>
                    Prioritaire
                  </span>
                )}
                {artisan.logo ? (
                  <img src={artisan.logo} alt={artisan.name} className="partner-card__logo" />
                ) : (
                  <span className="partner-card__name">{artisan.name}</span>
                )}
              </div>
            ))}
          </div>

          {/* Histoires éditoriales */}
          {storiedArtisans.length > 0 && (
            <div className="artisans-stories">
              {storiedArtisans.map((artisan) => (
                <div key={artisan.id} className="artisan-story">

                  <div className={`artisan-story__visual${!artisan.logo ? ' artisan-story__visual--empty' : ''}`}>
                    {artisan.logo
                      ? <img src={artisan.logo} alt={artisan.name} />
                      : <span className="material-symbols-outlined">storefront</span>
                    }
                  </div>

                  <div className="artisan-story__content">
                    {artisan.featured && (
                      <span className="artisan-story__featured-label">
                        <span className="material-symbols-outlined">star</span>
                        Partenaire prioritaire
                      </span>
                    )}
                    <h3 className="artisan-story__title">{artisan.name}</h3>
                    <div className="artisan-story__divider" />
                    <p className="artisan-story__text">{artisan.history}</p>
                    {artisan.featured && (
                      <span className="artisan-story__epv">
                        <span className="material-symbols-outlined">verified</span>
                        Entreprise du Patrimoine Vivant
                      </span>
                    )}
                  </div>

                </div>
              ))}
            </div>
          )}

        </div>
      </section>

      {/* Section 6: CTA */}
      <section className="about-cta bg-surface">
        <div className="container text-center">
          <h2 className="headline-lg">Donnez vie à votre table d'exception</h2>
          <div className="cta-actions mt-10">
            <Link href="/rendez-vous" className="btn-primary">Je prends rendez-vous</Link>
            <Link href="/contact" className="btn-secondary">Demander un devis</Link>
          </div>
        </div>
      </section>

    </main>
  )
}