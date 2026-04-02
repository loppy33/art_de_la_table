

export default function Home() {
  return (
    <>
      
      <main className="home">
        {/* Hero Section */}
        <section className="hero">
          <div className="hero__bg">
            <img src="https://lh3.googleusercontent.com/aida-public/AB6AXuC_J90MsTPQaK6S0Tv09uK3W_EzLX_Byz2qLq3JiQeZ_rfSsvXOlG-WjCKDgVtDTNAzFBydG35AtE4-jVVlDzl58GA_MaJrLltLSL074VWTkgp8-_7Ep-UJertHYuqg2ArN0XVeVSjnY0aeMNRNXmg72kis6CSqC8IlUuCevYf8yJ-mF76yHRtENQxzuxthXhxT-7jLF96soQ5pLnoFsnxgHfef8OwCsgRAqtUNVBafnZmKGest-uQnfKqir8B_9zYXXppqTLnQ2mMm" alt="Restaurant table setting" />
            <div className="hero__overlay"></div>
          </div>
          <div className="hero__content container">
            <h1 className="display-lg text-white">L'Art de la Table à la Française</h1>
            <p className="hero__subtitle text-white">Au service des hôteliers et restaurateurs d'exception</p>
            <button className="btn-text hero__cta">
              Découvrir nos services
              <span className="material-symbols-outlined">arrow_forward</span>
            </button>
          </div>
        </section>

        {/* Partners Logos */}
        <section className="partners container">
          <span>PRESTIGE</span>
          <span>HÉRITAGE</span>
          <span>ÉCLAT</span>
          <span>SAVOIR</span>
          <span>MAISON</span>
        </section>

        {/* Mobilier Section */}
        <section className="section-mobilier container">
          <div className="mobilier__image-wrapper">
            <div className="mobilier__blur-blob"></div>
            <img src="https://lh3.googleusercontent.com/aida-public/AB6AXuDF22UAvo7B6eVgJvvJNmhpF2jmkpb-WgBwDUiAeYDvZ2jRnEBjWdsnntulw6Kla4IzyxhgrQ45MeAjMITc_Rt93yOA4CUYXcE0fZygsLdTa08dbYrRcZOp4EXvIOQxVbQDRO1ZAR4Oz9sbBc_YlKny0OCa_YpxW3tDOMkozdD0HwXBvZ4p1MbaecmWZwGGVMPJD62gUsCZm02LUAVbdeagHV1KOzMvXl4qXAVQSK_Ruh_flNAi6AMEpjh5TNqwWHK90YSRtLhFavfE" alt="French dining room" className="ambient-shadow" />
          </div>
          <div className="mobilier__text">
            <span className="label-md label-gold">Excellence Manufacturière</span>
            <h2 className="headline-lg">Le Mobilier : 100% Made in France</h2>
            <p>Nous collaborons avec les meilleurs artisans de l'hexagone pour concevoir des pièces qui traversent le temps. Notre savoir-faire français se reflète dans chaque courbe de bois et chaque couture de textile, garantissant une élégance pérenne à votre établissement.</p>
            <button className="btn-primary">Découvrir notre sélection</button>
          </div>
        </section>

        {/* Audit & Expertise Section */}
        <section className="section-audit bg-low">
          <div className="container audit__grid">
            <div className="audit__text">
              <span className="label-md label-gold">Accompagnement Stratégique</span>
              <h2 className="headline-lg">F&B Paris : Audit & Expertise</h2>
              <p>De Paris à la Côte d'Azur, nos experts analysent vos flux opérationnels pour sublimer l'expérience client. Nous intervenons partout en France pour transformer vos points de vente en destinations gastronomiques incontournables.</p>
              <button className="btn-secondary">Découvrir nos services</button>
            </div>
            <div className="audit__card">
              <img src="https://lh3.googleusercontent.com/aida-public/AB6AXuAFeHQh4u3zF7bHrZqXaMKaDQ0fnyhYito039906pMwUDJwU-2E1uJJLfEpX_21okhHfnW3j6SoxxL13wBJuABH91GoKF0D8JVsNveE0yx0Rw4JKG7vThOv4UbvJKn2G_c_eQvSSdQDxTfognTtzn6s7YVzCRXVbfSYjO-wJwN4MlQJ5bu9w5ccCPboiivboA-ASQKARUz8dRLiOdNThroY8O7gHO2DPSglq_cNi_8nXEHyTp71Y3cdQ_GE6T00ABxwUwC3IRRbVU-u" alt="Professional consultant" />
              <div className="audit__badge ambient-shadow">
                <p>+15 ans d'expertise</p>
              </div>
            </div>
          </div>
        </section>

        {/* Machines & Efficiency (Bento Grid) */}
        <section className="section-machines container">
          <div className="section-header text-center">
            <span className="label-md label-gold">Performance Opérationnelle</span>
            <h2 className="headline-lg">Éclat de France : L'Innovation</h2>
          </div>
          
          <div className="machines__grid">
            <div className="machine__card-large bg-low">
              <div className="machine__content">
                <h3>Optimisation des coûts</h3>
                <p>Une technologie de pointe conçue pour réduire vos consommations et maximiser la durée de vie de votre matériel.</p>
                <div className="machine__actions">
                  <button className="btn-primary">Demander un devis</button>
                  <button className="btn-text">Plus d'informations</button>
                </div>
              </div>
              <div className="machine__image">
                <img src="https://lh3.googleusercontent.com/aida-public/AB6AXuC6_fQ7TMj8qPbrO-m3EHqft1jEP17fiVjI9WgHY1KpCAFF-uKtmbm8ScfDiL-fOh2a9cW2P4dS4l4ESKz0y6hnR-b51Up4uhAwO91a82K0I42ji6YXcov8nl02ev3JoS5Yrbbv2Im-JW0pyc7dzwDbBo-Bol5eSTaRZaWrCL1u_McM13HmSVC89T8TagdLV3_0p6KSdZhQjqa5RUcX84Zg9cCWMBDku2IiF9qaL_qDEbBqI0H8SevUZPBXzINrUOWuHapH5xN8xRG5" alt="Industrial dishwasher" />
              </div>
            </div>

            <div className="machine__card-small">
              <span className="material-symbols-outlined icon-gold">timer</span>
              <div>
                <h3>Gain de temps</h3>
                <p>Libérez vos équipes des tâches répétitives pour qu'elles se concentrent sur l'essentiel : l'accueil de vos convives.</p>
              </div>
            </div>
          </div>
        </section>

        {/* Why Us & Engagements */}
        <section className="section-why-us">
          <div className="why-us__bg-skew"></div>
          <div className="container why-us__grid">
            <div className="why-us__text">
              <h2 className="display-lg">Pourquoi travailler avec nous ?</h2>
              
              <div className="why-us__features">
                <div className="feature">
                  <div className="feature__icon">
                    <span className="material-symbols-outlined">verified</span>
                  </div>
                  <div className="feature__text">
                    <h4>Qualité Sans Compromis</h4>
                    <p>Une sélection rigoureuse des matériaux et des partenaires pour une durabilité maximale.</p>
                  </div>
                </div>
                
                <div className="feature">
                  <div className="feature__icon">
                    <span className="material-symbols-outlined">handshake</span>
                  </div>
                  <div className="feature__text">
                    <h4>Partenariat Durable</h4>
                    <p>Nous ne sommes pas que des fournisseurs, nous sommes vos conseillers stratégiques sur le long terme.</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="why-us__stats">
              <div className="stat-card glassmorphism-dark">
                <p className="stat-value">98%</p>
                <p className="label-md">Satisfaction Client</p>
              </div>
              <div className="stat-card glassmorphism-dark">
                <p className="stat-value">250+</p>
                <p className="label-md">Hôtels Équipés</p>
              </div>
              <div className="stat-card glassmorphism-dark mt-offset">
                <p className="stat-value">100%</p>
                <p className="label-md">Made in France</p>
              </div>
              <div className="stat-card glassmorphism-dark">
                <p className="stat-value">24/7</p>
                <p className="label-md">Support Expert</p>
              </div>
            </div>
          </div>
        </section>

        {/* Testimonials */}
        <section className="section-testimonials container">
          <h2 className="headline-lg text-center">Ils nous font confiance</h2>
          
          <div className="testimonials__grid">
            <div className="testimonial__card">
              <p className="quote">"L'Art de la Table a su transformer notre salle de petit-déjeuner en un véritable écrin de luxe. Leur expertise F&B est inégalée."</p>
              <div className="author">
                <div className="author__avatar"></div>
                <div>
                  <p className="author__name">Jean-Luc Moreau</p>
                  <p className="author__role">Directeur Général, Palace Parisien</p>
                </div>
              </div>
            </div>

            <div className="testimonial__card">
              <p className="quote">"L'innovation Éclat de France nous a permis de réduire nos coûts opérationnels de 15% dès la première année."</p>
              <div className="author">
                <div className="author__avatar"></div>
                <div>
                  <p className="author__name">Marie Castille</p>
                  <p className="author__role">Chef Propriétaire, Étoile de Provence</p>
                </div>
              </div>
            </div>

            <div className="testimonial__card">
              <p className="quote">"Leur sélection de mobilier 100% français apporte une âme et une authenticité que nos clients internationaux adorent."</p>
              <div className="author">
                <div className="author__avatar"></div>
                <div>
                  <p className="author__name">Sophie Valois</p>
                  <p className="author__role">Architecte d'intérieur</p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* FAQ Section */}
        <section className="section-faq bg-low">
          <div className="container faq__container">
            <h2 className="headline-lg text-center">Questions fréquentes</h2>
            <div className="faq__list">
              <details className="faq__item ambient-shadow">
                <summary>
                  Quels sont les délais de livraison pour le mobilier ?
                  <span className="material-symbols-outlined">expand_more</span>
                </summary>
                <div className="faq__content">
                  Comptez généralement 8 à 12 semaines pour une fabrication sur mesure dans nos ateliers français.
                </div>
              </details>
              <details className="faq__item ambient-shadow">
                <summary>
                  Intervenez-vous hors de France ?
                  <span className="material-symbols-outlined">expand_more</span>
                </summary>
                <div className="faq__content">
                  Bien que notre focus soit le marché français, nous accompagnons nos clients sur des projets d'exception en Europe et au Moyen-Orient.
                </div>
              </details>
            </div>
          </div>
        </section>

        {/* Final CTA */}
        <section className="section-cta">
          <div className="cta__bg">
            <img src="https://lh3.googleusercontent.com/aida-public/AB6AXuAARXU5H68fklutPiIOMRzao1GFpM0gGbFruyr1eFXohVjEAox-omWrIyMoS3s1VP1gjBZNRSZFqm5GEumCRtVXtNkt0eWSmQj57HkozyJYlWRxWnan4oykmZCHzaIyqWDlIpUQ468k8L3GNyQCToxgHVVbjAebtvYjEM-iS3uBTqseHbXNdF6SLkgpsGNrCxzExmdb3EPy-w48WqGMcRnmskeLCDSy_pCYJmNFyMKsNrGFeAV22r1bCU0sO_6DvJH8bEJ3z8YG4CH-" alt="Luxury hotel abstract" />
          </div>
          <div className="container cta__content">
            <h2 className="display-lg text-white">Vous avez un projet ? On en parle ?</h2>
            <p className="text-white">Transformez votre vision en réalité avec nos experts en art de la table et hôtellerie.</p>
            <button className="btn-primary">Prise de rendez-vous</button>
          </div>
        </section>

        {/* Newsletter */}
        <section className="section-newsletter">
          <div className="container newsletter__container">
            <h3 className="headline-lg">Restez informé de nos nouveautés</h3>
            <p>Inscrivez-vous pour recevoir notre catalogue exclusif et nos actualités.</p>
            <form className="newsletter__form">
              <input type="email" placeholder="Votre adresse email" required />
              <button type="submit" className="btn-primary">S'inscrire</button>
            </form>
          </div>
        </section>

      </main>

    </>
  );
}