import Link from "next/link";

export default function ClientMystere() {
  return (
    <main className="mystery-shopper">
      
      {/* Hero Section */}
      <section className="mystery-hero">
        <div className="mystery-hero__bg">
          <img 
            src="https://lh3.googleusercontent.com/aida-public/AB6AXuCLzRh3gOL8kdAI7NFCs9pns0gzzpZ5_H_Fyym8v2neTGkPKZoR-8Y8gcdPV88d3yqYZTXoNvTBY9rAMJqodQMOtXhANGd-HrkqcIcvz50I4AIQsmbnrhYXQfYg7sbLn8BuISqp1OaMAvDwtDbvTPesS5R3DRqFMhFze3APGoiWeef2naIZ6X_SfZGxoo4yhGefImNXPMAKSbnqkNZHyqj3Crxt-Q6PanvBZUszHI1tUBNzidWlOioyarzMHTR-kA40HXATEs28i9h4" 
            alt="Luxurious hotel lobby" 
          />
          <div className="mystery-hero__overlay"></div>
        </div>
        <div className="container mystery-hero__content">
          <div className="hero-text-block">
            <span className="label-md label-gold-outline">Service Audit Premium</span>
            <h1 className="display-lg text-white">Client Mystère</h1>
            <p className="hero-subtitle">
              Évaluez votre établissement avec un regard professionnel, discret et objectif.
            </p>
            <div className="hero-actions">
              <Link href="/devis" className="btn-primary">Demander un devis</Link>
              <Link href="/contact" className="btn-secondary-outline">Nous contacter</Link>
            </div>
          </div>
        </div>
      </section>

      {/* Introduction Asymmetric Section */}
      <section className="mystery-intro container">
        <div className="intro-grid">
          <div className="intro-text">
            <h2 className="headline-lg">L'excellence au service de votre performance</h2>
            <p className="text-body">
              Le service client mystère de L'Art de la Table à la Française permet aux professionnels de l'hôtellerie et de la restauration d'obtenir une vision concrète, détaillée et impartiale de l'expérience réellement vécue par leurs clients. C'est un miroir professionnel tendu vers votre quotidien pour polir chaque détail de votre prestation.
            </p>
          </div>
          
          <div className="intro-cards">
            <div className="feature-card ambient-shadow">
              <span className="material-symbols-outlined icon-gold mb-4">visibility_off</span>
              <h4 className="headline-sm">Anonymat</h4>
              <p>Une immersion totale sans éveiller le soupçon de vos collaborateurs.</p>
            </div>
            <div className="feature-card ambient-shadow mt-offset">
              <span className="material-symbols-outlined icon-gold mb-4">verified_user</span>
              <h4 className="headline-sm">Standards</h4>
              <p>Vérification du respect strict de vos codes et protocoles de marque.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Focus Areas - Bento Grid Style */}
      <section className="mystery-focus bg-low">
        <div className="container">
          <h2 className="headline-lg text-center mb-16">Nos piliers d'analyse</h2>
          
          <div className="bento-grid">
            {/* Large Card */}
            <div className="bento-card card-large has-bg">
              <img 
                src="https://lh3.googleusercontent.com/aida-public/AB6AXuA8RxdKVZcAQtL53n_4lxO-6bkSPa9MT88sDBy3PTH6WBsE4ndhaSuL7sN5SAW9eVC0vIkpiNGd80eSPKe6317cDxwzs4jM04iLzeUk5xKFiI4RRwI6X9rLT3kXv0kszfFUAxuNXXc_UdMKm3FKNnF8THCw1-ELCMEbXjcnKBtCprxi0UFawn38qPkzSWsSujd3vB_1czkfUQTwm27DxM2PVZDzoeUpcdlKmMKMlYxsHNc3ZTTLRfKhH6E8-zqSH_EmdMzxIsIVDc5r" 
                alt="Professional waiter" 
                className="card-bg-img"
              />
              <div className="card-overlay"></div>
              <div className="card-content text-white relative-z">
                <h3 className="headline-md text-white">Expérience Globale</h3>
                <p className="text-light">L'harmonie entre le service, le cadre et l'émotion ressentie.</p>
              </div>
            </div>

            {/* Small Card 1 */}
            <div className="bento-card bg-surface ghost-border">
              <span className="material-symbols-outlined icon-gold lg-icon">handshake</span>
              <div className="mt-auto pt-6">
                <h3 className="headline-sm">Accueil</h3>
                <p className="text-sm text-muted">La première impression, cruciale et déterminante.</p>
              </div>
            </div>

            {/* Small Card 2 */}
            <div className="bento-card bg-surface ghost-border">
              <span className="material-symbols-outlined icon-gold lg-icon">groups</span>
              <div className="mt-auto pt-6">
                <h3 className="headline-sm">Posture</h3>
                <p className="text-sm text-muted">Le langage corporel et l'attitude des équipes.</p>
              </div>
            </div>

            {/* Wide Card */}
            <div className="bento-card card-wide bg-gold-light">
              <div className="wide-content">
                <h3 className="headline-sm text-gold">Discours Commercial</h3>
                <p className="text-sm text-gold-dark">Analyse de la pertinence des recommandations et de l'argumentation.</p>
              </div>
              <span className="material-symbols-outlined bg-icon">forum</span>
            </div>
          </div>
        </div>
      </section>

      {/* Method - 5 Steps */}
      <section className="mystery-method container">
        <div className="method-header">
          <div className="max-w-xl">
            <span className="label-md label-gold">Notre Processus</span>
            <h2 className="display-sm">Une méthodologie rigoureuse en 5 étapes</h2>
          </div>
          <div className="decorative-line"></div>
        </div>

        <div className="steps-grid">
          {[
            { num: "01", icon: "contact_page", title: "Prise de contact", desc: "Compréhension de vos besoins spécifiques et de votre identité." },
            { num: "02", icon: "rule", title: "Grille sur mesure", desc: "Création d'un référentiel d'évaluation aligné sur vos standards." },
            { num: "03", icon: "detector", title: "Visite mystère", desc: "Immersion anonyme réalisée par nos experts certifiés." },
            { num: "04", icon: "analytics", title: "Analyse", desc: "Traitement approfondi des données et ressenti émotionnel." },
            { num: "05", icon: "assignment_turned_in", title: "Recommandations", desc: "Restitution constructive avec axes de progression concrets." }
          ].map((step, idx) => (
            <div key={idx} className="step-item">
              <div className="step-bg-number">{step.num}</div>
              <div className="step-content relative-z">
                <span className="material-symbols-outlined icon-gold mb-6 block">{step.icon}</span>
                <h4 className="headline-sm">{step.title}</h4>
                <p className="text-sm text-muted">{step.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Why Choose Us - Dark Section with Decorative Image */}
      <section className="mystery-why bg-primary">
        <div className="container why-grid">
          <div className="why-visual">
            <div className="image-decorator">
              <img 
                src="https://lh3.googleusercontent.com/aida-public/AB6AXuDcMrQ3Yjmr1SRGV1z-cutL87kkOnoky51nSQQAjZ_KksYg7jTFy1fHdnHOjkZqNoA8HOauUlIoir_tnNL-RZiC_J2BKKS0qSTYvVXN6O778G-vzDUiWk5JbH3RHPDCT61jj-5hRIdHs4uuFTpIYXDVCD1TzPzq9KhlISa7r0G-aXkBELWXZfBIBaTMrIoqXz0aG9IiS2i2jUIi-ZCc4cKwVVf4FSMv6c5ESIrE_cydSebvvvrTuui6hxGZuxY5xfWP1O3SB4vDS0g-" 
                alt="Refined restaurant table setting" 
              />
            </div>
          </div>
          
          <div className="why-text">
            <h2 className="display-sm italic text-white mb-12">Pourquoi faire appel à un client mystère ?</h2>
            
            <ul className="benefits-list">
              <li>
                <span className="material-symbols-outlined icon-gold">distance</span>
                <div>
                  <strong className="text-white block">Prendre du recul</strong>
                  <p className="text-light">Sortir de l'opérationnel pour évaluer l'expérience client sans biais affectif.</p>
                </div>
              </li>
              <li>
                <span className="material-symbols-outlined icon-gold">balance</span>
                <div>
                  <strong className="text-white block">Vérifier la cohérence</strong>
                  <p className="text-light">S'assurer que la promesse de marque est tenue à chaque instant.</p>
                </div>
              </li>
              <li>
                <span className="material-symbols-outlined icon-gold">search_insights</span>
                <div>
                  <strong className="text-white block">Identifier les détails</strong>
                  <p className="text-light">Ces "invisibles" qui font pourtant toute la différence entre le bon et l'exceptionnel.</p>
                </div>
              </li>
              <li>
                <span className="material-symbols-outlined icon-gold">trending_up</span>
                <div>
                  <strong className="text-white block">Faire progresser les équipes</strong>
                  <p className="text-light">Motiver par le retour factuel et constructif plutôt que par la critique.</p>
                </div>
              </li>
            </ul>
          </div>
        </div>
      </section>

      {/* Establishment Types */}
      <section className="mystery-targets container text-center">
        <h2 className="headline-lg mb-10">Pour quels établissements ?</h2>
        <div className="tags-wrapper">
          <span className="pill-tag ambient-shadow">Hôtels 3-5*</span>
          <span className="pill-tag ambient-shadow">Gastronomique</span>
          <span className="pill-tag ambient-shadow">Brasserie</span>
          <span className="pill-tag ambient-shadow">Indépendants</span>
          <span className="pill-tag ambient-shadow">Groupes</span>
        </div>
      </section>

      {/* Final CTA */}
      <section className="mystery-cta container">
        <div className="cta-box">
          <div className="cta-box__gradient"></div>
          <div className="cta-box__content relative-z">
            <h2 className="display-sm text-white mb-6">Prêt à sublimer votre expérience client ?</h2>
            <p className="text-light text-lg max-w-xl mx-auto mb-10">
              Nos experts sont à votre disposition pour définir ensemble la grille d'évaluation qui révélera le plein potentiel de votre établissement.
            </p>
            <div className="cta-actions">
              <button className="btn-primary">Demander un devis</button>
              <Link href="/contact" className="btn-glass">Nous contacter</Link>
            </div>
          </div>
        </div>
      </section>

    </main>
  );
}