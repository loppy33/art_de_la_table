export default function MentionsLegales() {
  return (
    <main className="legal-notices">
      <div className="container">
        
        {/* Hero Section */}
        <header className="legal-hero">
          <span className="label-md label-gold">Informations Réglementaires</span>
          <h1 className="display-lg">Mentions Légales</h1>
          <div className="decorative-line"></div>
        </header>

        {/* Content Grid (Asymmetric Layout) */}
        <div className="legal-grid">
          
          {/* Sidebar Info */}
          <aside className="legal-sidebar">
            <div className="sidebar-sticky">
              <div className="update-card bg-low">
                <h3 className="headline-sm">Dernière mise à jour</h3>
                <p className="text-muted">Le 24 Mai 2024</p>
              </div>
              
              <nav className="toc-nav">
                <h3 className="headline-sm">Sommaire</h3>
                <ul className="toc-list">
                  <li><a href="#identite">01. Identité de l'entreprise</a></li>
                  <li><a href="#hebergement">02. Hébergement</a></li>
                  <li><a href="#propriete">03. Propriété Intellectuelle</a></li>
                  <li><a href="#responsabilite">04. Responsabilité</a></li>
                  <li><a href="#donnees">05. Données Personnelles</a></li>
                </ul>
              </nav>
            </div>
          </aside>

          {/* Main Legal Text */}
          <div className="legal-content">
            
            <section id="identite" className="legal-section">
              <h2 className="headline-md">01. Édition du site</h2>
              <p>
                En vertu de l'article 6 de la loi n° 2004-575 du 21 juin 2004 pour la confiance dans l'économie numérique, il est précisé aux utilisateurs du site internet <strong>L'Art de la Table</strong> l'identité des différents intervenants dans le cadre de sa réalisation et de son suivi :
              </p>
              
              <div className="identity-card ghost-border">
                <div className="identity-grid">
                  <div className="identity-item">
                    <span className="label-sm text-gold">Propriétaire</span>
                    <p>L'Art de la Table SAS</p>
                  </div>
                  <div className="identity-item">
                    <span className="label-sm text-gold">Siège Social</span>
                    <p>12 Avenue Montaigne, 75008 Paris, France</p>
                  </div>
                  <div className="identity-item">
                    <span className="label-sm text-gold">SIRET</span>
                    <p>842 193 056 00021</p>
                  </div>
                  <div className="identity-item">
                    <span className="label-sm text-gold">Numéro TVA</span>
                    <p>FR 42 842193056</p>
                  </div>
                  <div className="identity-item">
                    <span className="label-sm text-gold">Responsable Publication</span>
                    <p>Jean-Baptiste Lefebvre</p>
                  </div>
                  <div className="identity-item">
                    <span className="label-sm text-gold">Contact</span>
                    <p>contact@lartdelatable.fr</p>
                  </div>
                </div>
              </div>
            </section>

            <section id="hebergement" className="legal-section">
              <h2 className="headline-md">02. Hébergement</h2>
              <p>
                Le Site est hébergé par la société <strong>Vercel Inc.</strong>, situé au 340 S Lemon Ave #4133 Walnut, CA 91789, États-Unis. 
              </p>
              <p>
                Le stockage des données personnelles des Utilisateurs est exclusivement réalisé sur les centres de données (« clusters ») localisés dans des Etats membres de l'Union Européenne de la société Vercel Inc.
              </p>
            </section>

            <section id="propriete" className="legal-section">
              <h2 className="headline-md">03. Propriété Intellectuelle</h2>
              <p>
                L'Art de la Table SAS est propriétaire des droits de propriété intellectuelle et détient les droits d'usage sur tous les éléments accessibles sur le site internet, notamment les textes, images, graphismes, logos, vidéos, architecture, icônes et sons.
              </p>
              <p>
                Toute reproduction, représentation, modification, publication, adaptation de tout ou partie des éléments du site, quel que soit le moyen ou le procédé utilisé, est interdite, sauf autorisation écrite préalable de L'Art de la Table SAS.
              </p>
              <p>
                Toute exploitation non autorisée du site ou de l’un quelconque des éléments qu’il contient sera considérée comme constitutive d’une contrefaçon et poursuivie conformément aux dispositions des articles L.335-2 et suivants du Code de Propriété Intellectuelle.
              </p>
            </section>

            <section id="responsabilite" className="legal-section">
              <h2 className="headline-md">04. Limitations de responsabilité</h2>
              <p>
                L'Art de la Table SAS ne pourra être tenu pour responsable des dommages directs et indirects causés au matériel de l’utilisateur, lors de l’accès au site.
              </p>
              <p>
                L'Art de la Table SAS décline toute responsabilité quant à l’utilisation qui pourrait être faite des informations et contenus présents sur le site. L'Art de la Table SAS s’engage à sécuriser au mieux le site, cependant sa responsabilité ne pourra être mise en cause si des données indésirables sont importées et installées sur son site à son insu.
              </p>
            </section>

            <section id="donnees" className="legal-section">
              <h2 className="headline-md">05. CNIL et gestion des données</h2>
              <p>
                Conformément aux dispositions de la loi 78-17 du 6 janvier 1978 modifiée, l’utilisateur du site dispose d’un droit d’accès, de modification et de suppression des informations collectées. Pour exercer ce droit, envoyez un message à notre Délégué à la Protection des Données : <strong>dpo@lartdelatable.fr</strong>.
              </p>
              <p>
                Pour plus d'informations sur la façon dont nous traitons vos données (type de données, finalité, destinataire...), lisez notre <a href="#" className="link-underline">Politique de Confidentialité</a>.
              </p>
            </section>
          </div>
        </div>
      </div>
    </main>
  );
}