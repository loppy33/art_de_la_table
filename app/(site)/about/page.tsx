export default function About() {
  return (
    <main className="about">
      
      {/* Section 1: Introduction (Hero) */}
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
            <h1 className="display-lg text-white">Le raffinement à la française.</h1>
            <p className="about-hero__desc">
              L'Art de la Table à la Française (ATF) n'est pas qu'un service, c'est une célébration de l'art de vivre. Nous redonnons ses lettres de noblesse à l'accueil, où chaque détail devient une émotion.
            </p>
          </div>
        </div>
      </section>

      {/* Section 2: Nos Missions */}
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

      {/* Section 3: Notre approche et Nos valeurs (Bento) */}
      <section className="about-philosophy bg-low">
        <div className="container">
          <div className="philosophy-header text-center">
            <h2 className="headline-lg">Notre Philosophie</h2>
            <div className="decorative-dash"></div>
          </div>

          <div className="philosophy-bento">
            {/* Bento Card 1 */}
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

            {/* Bento Card 2 */}
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

      {/* Section 4: Qui sommes-nous ? */}
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
              <p>"Notre expertise est le fruit de 20 ans de passion pour les métiers d'art."</p>
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

      {/* Section 5: Réseau de partenaires */}
      <section className="about-partners bg-low">
        <div className="container">
          <div className="partners-header">
            <div className="max-w-xl">
              <h2 className="headline-lg">Nos Partenaires Artisans</h2>
              <p>Nous travaillons main dans la main avec les plus prestigieuses maisons françaises, détenant souvent le label "Entreprise du Patrimoine Vivant".</p>
            </div>
            <button className="btn-text link-with-arrow">
              Voir la collection 
              <span className="material-symbols-outlined">arrow_forward</span>
            </button>
          </div>

          <div className="partners-grid">
            <div className="partner-card ambient-shadow">
              <span className="headline-md text-muted">Porcelaine d'Artois</span>
            </div>
            <div className="partner-card ambient-shadow">
              <span className="headline-md text-muted">Cristal de Lorraine</span>
            </div>
            <div className="partner-card ambient-shadow">
              <span className="headline-md text-muted">Lin de Normandie</span>
            </div>
            <div className="partner-card ambient-shadow">
              <span className="headline-md text-muted">Orfèvrerie Royale</span>
            </div>
          </div>
        </div>
      </section>

      {/* Section 6: Final CTA */}
      <section className="about-cta bg-surface">
        <div className="container text-center">
          <h2 className="headline-lg">Donnez vie à votre table d'exception</h2>
          <div className="cta-actions mt-10">
            <button className="btn-primary">Je prends rendez-vous</button>
            <button className="btn-secondary">Demander un devis</button>
          </div>
        </div>
      </section>

    </main>
  );
}