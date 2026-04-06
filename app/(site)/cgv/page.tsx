export default function CGV() {
  return (
    <main className="cgv">
      <div className="container">
        
        {/* Hero Section */}
        <header className="cgv-hero">
          <div className="badge-outline">
            <span className="label-sm text-gold">Espace Professionnel</span>
          </div>
          <h1 className="display-lg">Conditions Générales de Vente</h1>
          <p className="hero-desc">
            Régissant les relations contractuelles entre L'Art de la Table et ses partenaires professionnels pour les services de sourcing et de fourniture de prestige.
          </p>
          <div className="decorative-dash"></div>
        </header>

        {/* Main Content Layout: Bento Grid Style */}
        <div className="cgv-grid">
          
          {/* Sidebar Navigation (Sticky) */}
          <aside className="cgv-sidebar hidden-mobile">
            <div className="sidebar-sticky">
              <p className="label-sm text-muted mb-6">Sommaire</p>
              <nav className="toc-nav">
                <a href="#art1">01. Objet & Application</a>
                <a href="#art2">02. Commandes & Sourcing</a>
                <a href="#art3">03. Conditions Tarifaires</a>
                <a href="#art4">04. Modalités de Paiement</a>
                <a href="#art5">05. Livraison & Transfert</a>
                <a href="#art6">06. Garanties & Retours</a>
                <a href="#art7">07. Litiges & Juridiction</a>
              </nav>
            </div>
          </aside>

          {/* Clauses Content */}
          <div className="cgv-content">
            
            {/* Section 01 */}
            <section id="art1" className="clause-section bg-low rounded-xl">
              <div className="clause-header">
                <span className="clause-number">01</span>
                <h2 className="headline-sm">Objet et Champ d'Application</h2>
              </div>
              <div className="clause-body">
                <p>Les présentes Conditions Générales de Vente (CGV) constituent le socle unique de la négociation commerciale et s'appliquent sans restriction ni réserve à toutes les ventes conclues par <strong>L'Art de la Table</strong> auprès d'acheteurs professionnels, désirant acquérir les produits et services de sourcing proposés par le Prestataire.</p>
                <p>Ces CGV prévalent sur tout autre document de l'Acheteur, et notamment sur toutes conditions générales d'achat, sauf accord dérogatoire exprès et préalable du Prestataire.</p>
              </div>
            </section>

            {/* Section 02 */}
            <section id="art2" className="clause-section">
              <div className="clause-header">
                <span className="clause-number">02</span>
                <h2 className="headline-sm">Commandes et Services de Sourcing</h2>
              </div>
              
              <div className="cards-grid-2">
                <div className="clause-card ghost-border">
                  <h3 className="card-title">
                    <span className="material-symbols-outlined">inventory_2</span> 
                    Validation
                  </h3>
                  <p>Les ventes ne sont parfaites qu'après acceptation expresse et par écrit de la commande de l'Acheteur par le Prestataire, matérialisée par l'envoi d'un accusé de réception de commande ou d'un devis signé.</p>
                </div>
                
                <div className="clause-card ghost-border">
                  <h3 className="card-title">
                    <span className="material-symbols-outlined">search</span> 
                    Sourcing Sur-Mesure
                  </h3>
                  <p>Pour les prestations de recherche personnalisée, l'Acheteur s'engage à fournir un cahier des charges précis. Toute modification ultérieure pourra entraîner une révision tarifaire.</p>
                </div>
              </div>
            </section>

            {/* Section 03 */}
            <section id="art3" className="clause-section accented-left">
              <div className="clause-header">
                <span className="clause-number">03</span>
                <h2 className="headline-sm">Conditions Tarifaires</h2>
              </div>
              <div className="clause-body">
                <p>Les produits et services sont fournis aux tarifs en vigueur au jour de la passation de la commande. Les prix sont entendus Hors Taxes (HT), départ entrepôt. Ils seront majorés de la TVA au taux en vigueur au jour de la facturation.</p>
                <p>Le Prestataire se réserve le droit de modifier ses prix à tout moment, sous réserve d'un préavis de 30 jours pour les contrats de sourcing récurrents.</p>
              </div>
            </section>

            {/* Section 04 */}
            <section id="art4" className="clause-section">
              <div className="clause-header">
                <span className="clause-number">04</span>
                <h2 className="headline-sm">Modalités de Paiement</h2>
              </div>
              
              <div className="dark-block">
                <div className="dark-block__text">
                  <h3 className="headline-sm text-white">Échéances de Règlement</h3>
                  <ul className="check-list">
                    <li><span className="material-symbols-outlined icon-gold">check_circle</span> Acompte de 40% à la signature de la commande.</li>
                    <li><span className="material-symbols-outlined icon-gold">check_circle</span> Solde net à 30 jours date de facture.</li>
                    <li><span className="material-symbols-outlined icon-gold">check_circle</span> Aucun escompte pour paiement anticipé.</li>
                  </ul>
                </div>
                
                <div className="dark-block__fine glassmorphism-dark">
                  <span className="fine-amount">40€</span>
                  <span className="fine-label">Indemnité forfaitaire de recouvrement</span>
                </div>
              </div>
            </section>

            {/* Section 05 & 06 Asymmetric Layout */}
            <div className="cards-grid-asymmetric">
              <section id="art5" className="clause-section">
                <div className="clause-header">
                  <span className="clause-number">05</span>
                  <h2 className="headline-sm">Livraison et Transfert</h2>
                </div>
                <div className="clause-body">
                  <p>La livraison est effectuée soit par la remise directe du produit à l'Acheteur, soit par la délivrance à un expéditeur ou un transporteur dans les locaux du Prestataire.</p>
                  <p><strong>Réserve de propriété :</strong><br/>
                  Le Prestataire se réserve, jusqu'au complet paiement du prix par l'Acheteur, un droit de propriété sur les produits vendus, lui permettant de reprendre possession desdits produits.</p>
                </div>
              </section>

              <section id="art6" className="clause-section bg-low rounded-lg p-6">
                <div className="clause-header mb-4">
                  <span className="clause-number text-2xl">06</span>
                  <h2 className="headline-xs">Garanties</h2>
                </div>
                <p className="text-sm mb-4">
                  Nos produits bénéficient de la garantie légale contre les vices cachés résultant d'un défaut de conception ou de fabrication. La responsabilité du Prestataire est limitée au remplacement ou au remboursement des produits non conformes.
                </p>
                <div className="guarantee-box">
                  <span className="label-sm text-gold block">Délai de réclamation</span>
                  <strong>48 Heures après réception</strong>
                </div>
              </section>
            </div>

            {/* Section 07 */}
            <section id="art7" className="clause-section border-top">
              <div className="flex-between">
                <div className="max-w-xl">
                  <div className="clause-header">
                    <span className="clause-number">07</span>
                    <h2 className="headline-sm">Litiges et Juridiction</h2>
                  </div>
                  <p className="clause-body">
                    Tous les litiges auxquels le présent contrat pourrait donner lieu, concernant tant sa validité, son interprétation, son exécution, sa résiliation, leurs conséquences et leurs suites seront soumis au <strong>Tribunal de Commerce de Paris</strong>.
                  </p>
                </div>
                
                <div className="action-buttons">
                  <button className="btn-secondary-light">
                    <span className="material-symbols-outlined">download</span> Télécharger le PDF
                  </button>
                  <button className="btn-outline">
                    <span className="material-symbols-outlined">print</span> Imprimer
                  </button>
                </div>
              </div>
            </section>

          </div>
        </div>
      </div>
    </main>
  );
}