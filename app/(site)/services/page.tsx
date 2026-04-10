export default function Services() {
  return (
    <main className="services">
      
      {/* Hero Section: L'Excellence du Service */}
      <section className="services-hero container">
        <div className="services-hero__grid">
          <div className="services-hero__content">
            <span className="label-md label-gold">Expertise CHR</span>
            <h1 className="display-lg">
              L'art de sublimer <br />
              <span className="text-secondary" style={{ fontStyle: 'italic' }}>votre établissement.</span>
            </h1>
            <p>
              Nous accompagnons les professionnels de l'hôtellerie et de la restauration dans la création d'expériences mémorables à travers un service de conseil et de sourcing d'exception.
            </p>
          </div>
          
          <div className="services-hero__visual">
            <div className="image-wrapper ambient-shadow">
              <img 
                src="https://lh3.googleusercontent.com/aida-public/AB6AXuDJ5PNqO_AaFoGCbtlXLjGs32q5alLxEyjPQtYyKeYJbg286H7R657pM35LhtanWv5jBMdiE5v6TQteL_yMcPKAtYiyZo5kr21IEjB8ppC0Go7-PZjYPVLGJ8ezWfnO_XlgyUbCJP33NfUQmnbvhDEYuVRmf-qYUBQySBy4p34f-f7fgV2QgzIEmwMPqJVOyfPnq9mozp--wsUhT_6h2xGpdZfZaqgkqExJsh7QWmc5c8PcWIdS0i-5oCXdoJFEe_p4svcN8oEuQVtQ" 
                alt="Elegant table setting" 
              />
            </div>
            {/* Badge */}
            <div className="services-hero__badge ambient-shadow">
              <p className="badge-value">100%</p>
              <p className="label-md">Sourcing Français</p>
            </div>
          </div>
        </div>
      </section>

      {/* Services Section: The Bento Grid of Expertise */}
      <section className="services-bento bg-low">
        <div className="container">
          <div className="services-bento__header">
            <div>
              <h2 className="headline-lg">Une expertise sur-mesure</h2>
              <p>Nos services sont pensés pour répondre aux exigences les plus élevées des restaurateurs, hôteliers et directeurs d'exploitation.</p>
            </div>
            <div className="decorative-line"></div>
          </div>

          <div className="bento-grid">
            {/* Service 1: Sourcing */}
            <div className="bento-card card-large">
              <div className="bento-card__content">
                <span className="material-symbols-outlined icon-gold">inventory_2</span>
                <h3 className="headline-md">Sourcing 100% Français</h3>
                <p>Accès exclusif aux meilleures manufactures de l'Hexagone. Nous dénichons pour vous la porcelaine de Limoges, l'argenterie d'orfèvres et le cristal de tradition pour une table authentique.</p>
                <div className="tags">
                  <span className="tag">Porcelaine</span>
                  <span className="tag">Verrerie</span>
                  <span className="tag">Coutellerie</span>
                  <span className="tag">Nappage</span>
                </div>
              </div>
            </div>

            {/* Service 2: Audit */}
            <div className="bento-card card-primary">
              <div className="bento-card__content relative-z">
                <span className="material-symbols-outlined icon-light">analytics</span>
                <h3 className="headline-md text-white">Audit & Inventaire</h3>
                <p className="text-light">Optimisation de vos stocks et analyse de l'usure de votre parc. Nous évaluons la cohérence esthétique et fonctionnelle de vos équipements actuels.</p>
              </div>
              <span className="material-symbols-outlined bg-icon">assignment_turned_in</span>
            </div>

            {/* Service 3: Accompagnement */}
            <div className="bento-card card-standard">
              <div className="bento-card__content">
                <span className="material-symbols-outlined icon-gold">architecture</span>
                <h3 className="headline-md">Conseil en Design</h3>
                <p>Création d'une identité visuelle propre à votre établissement. Nous marions les textures et les formes pour sublimer chaque plat.</p>
                <ul className="checklist">
                  <li>
                    <span className="material-symbols-outlined icon-gold">check_circle</span>
                    Plan de table personnalisé
                  </li>
                  <li>
                    <span className="material-symbols-outlined icon-gold">check_circle</span>
                    Harmonie des couleurs
                  </li>
                  <li>
                    <span className="material-symbols-outlined icon-gold">check_circle</span>
                    Formation des équipes
                  </li>
                </ul>
              </div>
            </div>

            {/* Service 4: Expertise */}
            <div className="bento-card card-wide-image">
              <div className="card-image">
                <img src="https://lh3.googleusercontent.com/aida-public/AB6AXuAvsCMJdG3lx8dLmtilh9XuwD8iy2FbtwqlLK7ZdJefNxDK4btETd7KMALA8o1OILIMLrquXFllopeqj_5paXaknP3s9Nja__ycusderF_H28ON85R3j_GgC_g_QvkJVxndbamW31xJ9avsEP1FJnFaVLEFhMFjdtcY7dN-Dsan2Zr6npX45CVF4aYnHC18oZN1biM2q7_wo9LJAw4zfSXTHUuEs2TgAejiFwpBXkA6iB-uJUvhfsC-w-ALs8Utkaleccf86rl9QK3Z" alt="Professional consultant" />
              </div>
              <div className="bento-card__content">
                <h3 className="headline-md">Expertise Technique</h3>
                <p>Recommandations basées sur la durabilité des matériaux et leur résistance aux cycles de lavage intensifs du secteur CHR. Alliez élégance et rentabilité opérationnelle.</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* The Process Section: High Contrast Editorial */}
      <section className="services-process container">
        <div className="process-grid">
          <div className="process-header">
            <div className="sticky-content">
              <h2 className="display-lg">L'excellence <br />étape par étape</h2>
              <p>Notre méthodologie garantit une transformation fluide de votre salle de restaurant, du premier audit à la mise en place finale.</p>
              <button className="btn-secondary mt-6">Demander une présentation</button>
            </div>
          </div>
          
          <div className="process-steps">
            {[
              { num: "01", title: "Consultation & Vision", desc: "Définition de vos besoins esthétiques et contraintes budgétaires. Nous écoutons votre histoire culinaire pour en transcrire les codes sur la table." },
              { num: "02", title: "Sélection des Manufactures", desc: "Établissement d'un catalogue sur-mesure parmi nos partenaires EPV (Entreprise du Patrimoine Vivant). Présentation d'échantillons en situation réelle." },
              { num: "03", title: "Logistique & Déploiement", desc: "Gestion complète de la commande à la livraison. Nous assurons un contrôle qualité rigoureux à chaque réception de marchandise." },
              { num: "04", title: "Accompagnement pérenne", desc: "Suivi des réassorts et mise à jour des collections au fil des saisons. Nous restons à vos côtés pour faire évoluer votre identité." }
            ].map((step, idx) => (
              <div key={idx} className="step-item">
                <div className="step-number">{step.num}</div>
                <div className="step-content">
                  <h4 className="headline-sm">{step.title}</h4>
                  <p>{step.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Final CTA Section: Glassmorphism Card */}
      <section className="services-cta container">
        <div className="cta-card">
          <div className="cta-card__bg">
            <img src="https://lh3.googleusercontent.com/aida-public/AB6AXuBbbfQ5udhY1nP0gflKZMNFP3--LNtJFIhvk-55IbXrxekgrRg1d5uFt8GB7Fv_QEHy_Zdqy1SHIKDbysn6yqAN9iIN0T5fBS0qz_qATaVW4bY1Ql4K2PmMC0DMS1UiouJIcfAN5YmHa3CbNMmQUDZDf1gi_SB2ogTTm4oEbvXnOrR5kPpovlc0ibofcmngxshP8WLAjsWeVOsf2DeHJj3N6vaV1dl2c1d9_smd_ssxuTaOa_7_7RSQZhlw9bP1ihTUr9QzQ0aXpI0p" alt="Luxury restaurant" />
          </div>
          <div className="cta-card__content">
            <h2 className="display-lg text-white">
              Donnez à votre établissement <br />
              <span className="text-gold">la table qu'il mérite.</span>
            </h2>
            <p className="text-light">
              Chaque détail compte dans l'expérience client. Nos experts sont prêts à concevoir avec vous une atmosphère qui reflète l'excellence de votre service.
            </p>
            <div className="cta-actions">
              <button className="btn-primary">Demander un devis</button>
              <button className="btn-glass">Voir nos références</button>
            </div>
          </div>
        </div>
      </section>

    </main>
  );
}