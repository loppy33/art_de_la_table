export default function PrivacyPolicy() {
  return (
    <main className="privacy">
      <div className="container">
        
        {/* Hero Section */}
        <header className="privacy-hero">
          <span className="label-md label-gold">Confidentialité</span>
          <h1 className="display-lg">Politique de Protection des Données.</h1>
          <p className="hero-desc accented-left">
            Chez L'Art de la Table, la préservation de votre vie privée est le reflet de notre engagement envers l'excellence et le respect de l'art de vivre à la française.
          </p>
        </header>

        {/* Content Layout (Asymmetric) */}
        <div className="privacy-layout">
          
          {/* Table of Contents (Sticky) */}
          <aside className="privacy-sidebar hidden-mobile">
            <nav className="toc-nav sidebar-sticky">
              <a href="#introduction">01. Introduction</a>
              <a href="#collecte">02. Données collectées</a>
              <a href="#finalites">03. Finalités du traitement</a>
              <a href="#droits">04. Vos droits RGPD</a>
              <a href="#cookies">05. Politique de Cookies</a>
              <a href="#dpo">06. Contact DPO</a>
            </nav>
          </aside>

          {/* Content Area */}
          <article className="privacy-content">
            
            {/* 01. Introduction */}
            <section id="introduction" className="privacy-section">
              <h2 className="headline-md">01. Introduction</h2>
              <div className="text-body">
                <p>La présente Politique de Confidentialité a pour objet d'informer les utilisateurs de notre site web sur la manière dont L'Art de la Table collecte, utilise et protège leurs données à caractère personnel dans le respect du Règlement Général sur la Protection des Données (RGPD) et de la Loi Informatique et Libertés.</p>
                <p>En utilisant notre site, vous acceptez les pratiques décrites dans cette politique. Nous nous réservons le droit de la modifier à tout moment pour refléter les évolutions légales ou techniques.</p>
              </div>
            </section>

            {/* 02. Collecte */}
            <section id="collecte" className="privacy-section bg-low rounded-xl p-10">
              <h2 className="headline-md">02. Nature des données collectées</h2>
              <div className="cards-grid-2">
                <div className="data-card ghost-border">
                  <span className="material-symbols-outlined icon-gold lg-icon mb-4">person</span>
                  <h3 className="headline-sm">Données d'identité</h3>
                  <p>Nom, prénom, civilité et coordonnées professionnelles ou personnelles transmises via nos formulaires.</p>
                </div>
                <div className="data-card ghost-border">
                  <span className="material-symbols-outlined icon-gold lg-icon mb-4">devices</span>
                  <h3 className="headline-sm">Données techniques</h3>
                  <p>Adresse IP, type de navigateur, fuseau horaire et informations sur votre parcours de navigation sur notre site.</p>
                </div>
              </div>
            </section>

            {/* 03. Finalités */}
            <section id="finalites" className="privacy-section">
              <h2 className="headline-md">03. Finalités du traitement</h2>
              <p className="text-body mb-8">Nous traitons vos données uniquement pour des besoins spécifiques et légitimes :</p>
              
              <ul className="custom-checklist">
                <li>
                  <div className="icon-wrapper">
                    <span className="material-symbols-outlined">check</span>
                  </div>
                  <div>
                    <h4 className="headline-sm">Gestion des demandes de rendez-vous</h4>
                    <p>Pour organiser vos consultations privées et ateliers de savoir-vivre.</p>
                  </div>
                </li>
                <li>
                  <div className="icon-wrapper">
                    <span className="material-symbols-outlined">check</span>
                  </div>
                  <div>
                    <h4 className="headline-sm">Communication marketing</h4>
                    <p>Envoi de notre newsletter et invitations exclusives à nos événements (sous réserve de votre consentement).</p>
                  </div>
                </li>
                <li>
                  <div className="icon-wrapper">
                    <span className="material-symbols-outlined">check</span>
                  </div>
                  <div>
                    <h4 className="headline-sm">Amélioration de l'expérience utilisateur</h4>
                    <p>Analyse statistique anonymisée pour optimiser la navigation et le contenu de notre atelier digital.</p>
                  </div>
                </li>
              </ul>
            </section>

            {/* 04. Droits */}
            <section id="droits" className="privacy-section border-top pt-16">
              <h2 className="headline-md">04. Vos droits RGPD</h2>
              <p className="text-body mb-10">Conformément à la réglementation européenne, vous disposez des droits suivants concernant vos données personnelles :</p>
              
              <div className="rights-grid">
                <div className="right-card ambient-shadow">
                  <h4 className="headline-sm">Droit d'accès</h4>
                  <p>Obtenir la confirmation que vos données sont traitées et en recevoir une copie.</p>
                </div>
                <div className="right-card ambient-shadow">
                  <h4 className="headline-sm">Droit de rectification</h4>
                  <p>Demander la correction des données inexactes ou incomplètes.</p>
                </div>
                <div className="right-card ambient-shadow">
                  <h4 className="headline-sm">Droit à l'effacement</h4>
                  <p>Solliciter la suppression de vos données ("droit à l'oubli").</p>
                </div>
                <div className="right-card ambient-shadow">
                  <h4 className="headline-sm">Droit à la portabilité</h4>
                  <p>Récupérer vos données dans un format structuré pour un usage personnel.</p>
                </div>
              </div>
            </section>

            {/* 05. Cookies */}
            <section id="cookies" className="privacy-section">
              <div className="cookies-block">
                <div className="cookies-block__content">
                  <h2 className="headline-md text-white">05. Utilisation des Cookies</h2>
                  <p className="text-light">
                    Nous utilisons des témoins de navigation pour assurer le bon fonctionnement du site et analyser notre trafic. Certains sont essentiels, d'autres nécessitent votre accord préalable.
                  </p>
                  <button className="btn-primary mt-8">Gérer mes préférences</button>
                </div>
                <div className="blur-blob"></div>
              </div>
            </section>

            {/* 06. DPO */}
            <section id="dpo" className="privacy-section">
              <h2 className="headline-md">06. Contactez notre DPO</h2>
              <div className="dpo-card bg-low accented-left">
                <div className="dpo-card__email">
                  <p className="text-muted mb-2">Pour toute question ou exercice de vos droits :</p>
                  <p className="dpo-email">dpo@artdelatable.fr</p>
                </div>
                <div className="dpo-card__address">
                  <span className="label-sm text-muted block mb-1">L'Art de la Table S.A.S</span>
                  <p>Service Protection des Données</p>
                  <p>75008 Paris, France</p>
                </div>
              </div>
            </section>

          </article>
        </div>
      </div>
    </main>
  );
}