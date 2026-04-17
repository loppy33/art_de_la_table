import Link from "next/link";

export default function AuditConseil() {
  return (
    <main className="audit-conseil">
      
      {/* Hero Section */}
      <section className="audit-hero">
        <div className="audit-hero__bg">
          <img 
            src="https://lh3.googleusercontent.com/aida-public/AB6AXuB1hzw3NOz-EgC8Pt2In81ALRLIfnvHZrZyInf5z--gZF4G3ZTUQjaZGEWi3LTkHQaz1g0a39EtE5MGAM4uB4HLTD_6fIAFthLOrN5lRxRTAUT6l4o_XNfJ31AQDH9N-mT0JzbagTgrt_RFr_vQsNdaE1STepTSSbhF48gt_6Vh4gAR39mAqe5PSx46rQO7cH3aH7IpPHWxl4jaCOMevxpGzCew4Tw5E6gFmrGmR_xq7TcIVcGsBmyg2z1hgKDX6fud_CGJQ1WRDnsM" 
            alt="Luxury Tableware" 
          />
          <div className="audit-hero__overlay"></div>
        </div>
        <div className="container audit-hero__content">
          <div className="hero-text-block text-center">
            <h1 className="display-lg text-white">Audit & Conseil</h1>
            <p className="hero-subtitle">
              Optimisez votre sélection et accédez au meilleur du savoir-faire français pour une table d'exception.
            </p>
            <Link href="/contact" className="btn-primary mt-8">Nous contacter</Link>
          </div>
        </div>
      </section>

      {/* Introduction Section (Asymmetric) */}
      <section className="audit-intro container">
        <div className="intro-grid">
          <div className="intro-text">
            <span className="label-md label-gold">Expertise & Sourcing</span>
            <h2 className="display-sm">L'Excellence du Savoir-Faire Français au Service de Votre Table.</h2>
          </div>
          <div className="intro-desc">
            <p className="text-body">
              Notre rôle est de devenir le trait d'union privilégié entre les artisans d'art français et les tables les plus exigeantes. Nous accompagnons nos clients dans une démarche de sourcing stratégique, de sélection rigoureuse des produits et d'optimisation de collections pour garantir une identité de marque singulière et une qualité irréprochable.
            </p>
          </div>
        </div>
      </section>

      {/* Our Services Grid */}
      <section className="audit-services bg-low">
        <div className="container">
          <div className="services-header">
            <h2 className="display-sm mb-4">Nos Services</h2>
            <p className="text-body">Une approche sur-mesure pour magnifier chaque détail de votre offre.</p>
          </div>

          <div className="services-grid">
            
            {/* Service 1 */}
            <div className="service-card ghost-border transition-bg">
              <span className="material-symbols-outlined icon-gold lg-icon mb-8 transition-icon">analytics</span>
              <div>
                <h3 className="headline-md transition-text">Audit de votre offre</h3>
                <p className="text-muted transition-text-sub">
                  Analyse approfondie de vos produits existants, de votre positionnement marché et revue critique de la qualité.
                </p>
              </div>
            </div>

            {/* Service 2 */}
            <div className="service-card ghost-border transition-bg">
              <span className="material-symbols-outlined icon-gold lg-icon mb-8 transition-icon">design_services</span>
              <div>
                <h3 className="headline-md transition-text">Conseil personnalisé</h3>
                <p className="text-muted transition-text-sub">
                  Accompagnement stratégique basé sur vos besoins spécifiques pour une sélection de produits unique.
                </p>
              </div>
            </div>

            {/* Service 3 */}
            <div className="service-card ghost-border transition-bg">
              <span className="material-symbols-outlined icon-gold lg-icon mb-8 transition-icon">precision_manufacturing</span>
              <div>
                <h3 className="headline-md transition-text">Sourcing d'artisans</h3>
                <p className="text-muted transition-text-sub">
                  Accès privilégié à un réseau d'artisans français d'exception pour des produits authentiques et durables.
                </p>
              </div>
            </div>

            {/* Service 4 */}
            <div className="service-card ghost-border transition-bg">
              <span className="material-symbols-outlined icon-gold lg-icon mb-8 transition-icon">inventory_2</span>
              <div>
                <h3 className="headline-md transition-text">Optimisation de collection</h3>
                <p className="text-muted transition-text-sub">
                  Travail sur la cohérence de vos gammes pour renforcer votre identité de marque et votre image de prestige.
                </p>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* Methodology Section */}
      <section className="audit-methodology container">
        <h2 className="display-sm text-center mb-16">Notre Méthodologie</h2>
        
        <div className="methodology-steps">
          <div className="connecting-line"></div>
          <div className="steps-wrapper">
            
            {/* Step 1 */}
            <div className="step-node">
              <div className="step-circle ambient-shadow">
                <span className="step-number">1</span>
              </div>
              <h4 className="headline-sm">Analyse des besoins</h4>
              <span className="label-sm text-muted">Immersion & Vision</span>
            </div>

            {/* Step 2 */}
            <div className="step-node">
              <div className="step-circle ambient-shadow">
                <span className="step-number">2</span>
              </div>
              <h4 className="headline-sm">Étude de l'existant</h4>
              <span className="label-sm text-muted">Audit Technique</span>
            </div>

            {/* Step 3 */}
            <div className="step-node">
              <div className="step-circle ambient-shadow">
                <span className="step-number">3</span>
              </div>
              <h4 className="headline-sm">Sélection des artisans</h4>
              <span className="label-sm text-muted">Sourcing Elite</span>
            </div>

            {/* Step 4 */}
            <div className="step-node">
              <div className="step-circle ambient-shadow">
                <span className="step-number">4</span>
              </div>
              <h4 className="headline-sm">Recommandations</h4>
              <span className="label-sm text-muted">Stratégie Créative</span>
            </div>

            {/* Step 5 */}
            <div className="step-node">
              <div className="step-circle ambient-shadow">
                <span className="step-number">5</span>
              </div>
              <h4 className="headline-sm">Suivi et accompagnement</h4>
              <span className="label-sm text-muted">Pérennité & Excellence</span>
            </div>

          </div>
        </div>
      </section>

      {/* Why Choose Us */}
      <section className="audit-why bg-primary">
        <div className="container why-grid">
          
          <div className="why-visual">
            <img 
              src="https://lh3.googleusercontent.com/aida-public/AB6AXuBCvqD5GZxcLZNLj2Cqpf-v1EytyG7TXp2pHzAID03tONnbakylYUvY7usaH9zgzodpem2AuDAP9eB4iuOJ6KLowUm1KXAP0jea9xAGeLmXo1ptIE6fw539pDQY5pOBoAtd8SERFoCXEKr-Z5rur3OtmflklWA5ibP3_u3t1QVQs2c6-ApwQKqwPssAUvO6zaftAVwmEsHhwaRLVdrJgpIo2jxgdobG2A1QHkSX249d-SSdHBrEiniG865Co_GnYl0eeSVdcq18t2NJ" 
              alt="Artisan Work" 
              className="ambient-shadow"
            />
            <div className="date-badge glassmorphism-dark hidden-mobile">
              <p className="headline-md italic m-0">Depuis 1924</p>
            </div>
          </div>
          
          <div className="why-content">
            <span className="label-md label-gold-light mb-6">Pourquoi nous choisir</span>
            <h2 className="display-sm text-white mb-12">Une expertise forgée par la tradition et tournée vers l'avenir.</h2>
            
            <ul className="benefits-list">
              <li>
                <span className="material-symbols-outlined icon-gold-light">workspace_premium</span>
                <div>
                  <h4 className="headline-sm text-white">Expertise reconnue</h4>
                  <p className="text-light">Une connaissance pointue des métiers d'art et des standards du luxe hôtelier et gastronomique.</p>
                </div>
              </li>
              <li>
                <span className="material-symbols-outlined icon-gold-light">group_work</span>
                <div>
                  <h4 className="headline-sm text-white">Réseau d'artisans exclusif</h4>
                  <p className="text-light">Un accès direct aux meilleurs ateliers français, souvent inaccessibles au grand public.</p>
                </div>
              </li>
              <li>
                <span className="material-symbols-outlined icon-gold-light">star</span>
                <div>
                  <h4 className="headline-sm text-white">Positionnement haut de gamme</h4>
                  <p className="text-light">Une exigence absolue sur la qualité, la durabilité et l'esthétique de chaque pièce sélectionnée.</p>
                </div>
              </li>
              <li>
                <span className="material-symbols-outlined icon-gold-light">person_celebrate</span>
                <div>
                  <h4 className="headline-sm text-white">Approche personnalisée</h4>
                  <p className="text-light">Chaque projet est unique et bénéficie d'une attention sur-mesure pour sublimer votre vision.</p>
                </div>
              </li>
            </ul>
          </div>
          
        </div>
      </section>

      {/* Final CTA */}
      <section className="audit-cta container text-center">
        <div className="max-w-xl mx-auto">
          <h2 className="display-sm mb-6">Prêt à sublimer votre art de la table ?</h2>
          <p className="text-body mb-10">
            Contactez nos experts pour une première étude de vos besoins et découvrez le potentiel inexploité de votre collection.
          </p>
          <Link href="/contact" className="btn-primary">Demander un audit</Link>
        </div>
      </section>

    </main>
  );
}