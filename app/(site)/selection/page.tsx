import Link from "next/link";

export default function Selection() {
  return (
    <main className="selection">
      
      {/* Hero Section */}
      <header className="selection-hero container">
        <div className="selection-hero__grid">
          <div className="selection-hero__text">
            <span className="label-md label-gold">Excellence Française</span>
            <h1 className="display-lg">
              L'Élégance de la <br />
              <span className="text-secondary" style={{ fontStyle: 'italic' }}>Sélection Unique</span>
            </h1>
          </div>
          <div className="selection-hero__desc">
            <p>Une curation rigoureuse des plus grandes manufactures françaises, où chaque pièce raconte une histoire de geste et de passion.</p>
          </div>
        </div>
      </header>

      {/* Category Grid & Filters */}
      <section className="selection-gallery container">
        
        {/* Filter Bar */}
        <div className="filter-bar">
          <div className="filter-bar__tabs no-scrollbar">
            <button className="tab active">Tous</button>
            <button className="tab">Vaisselle</button>
            <button className="tab">Verrerie</button>
            <button className="tab">Couverts</button>
            <button className="tab">Linge</button>
            <button className="tab">Décoration</button>
            <button className="tab">Machines</button>
          </div>
          <div className="filter-bar__sort">
            <span className="label-md text-muted">Filtrer par :</span>
            <select className="sort-select">
              <option>Pertinence</option>
              <option>Prix croissant</option>
              <option>Prix décroissant</option>
            </select>
          </div>
        </div>

        {/* Bento / Masonry Grid */}
        <div className="bento-grid">
          
          {/* Large Feature Card: Vaisselle (span 8) */}
          <article className="product-card card-span-8">
            <div className="product-card__image aspect-16-9">
              <img 
                src="https://lh3.googleusercontent.com/aida-public/AB6AXuAXX9WFXfx9e8SHqAJr7NVO3EcZTifh5gidiYfH6Oxn_Y38JRJo7ed5jLhgfweqddtKUGrowqr_KH2PP-kSiBwyZHsWPlHImm5ZzTffwWFvFl93SFhNK6SvuABhh6WSBVdee386M8JH3CbS0LO-sDpKcM-svfbdHuB9oAoBtomQTswV9ZgWrD9KnlCSdMBeK_NRfgOlAVyO1pLHED24LASpfr7XmrUGEXgeX8PMvNK4tQnVT88jTku3mnQKMM9iUydhf1hNyLwZAW2e" 
                alt="Vaisselle de prestige" 
              />
              <div className="badge-glass top-left">
                <span>100% Made in France</span>
              </div>
            </div>
            <div className="product-card__info flex-between">
              <div>
                <h3 className="headline-md">Service Porcelaine de Limoges</h3>
                <p>Une blancheur immaculée et une finesse légendaire pour vos tables les plus prestigieuses.</p>
              </div>
              <span className="price">À partir de 1 200€</span>
            </div>
          </article>

          {/* Vertical Card: Verrerie (span 4) */}
          <article className="product-card card-span-4">
            <div className="product-card__image aspect-3-4">
              <img 
                src="https://lh3.googleusercontent.com/aida-public/AB6AXuBBscyzh5TL1ZcQ1BRhQ4dy88riOnyVDB88TROdxMtIM7edw2itLkRlMMgb0LOrp_-Ucp0BZi-OsFvuN6Wza7b0NBFu-YMryJlCaJhOb-7Jwop3bnnAW_XH2ryO8I-WYqJca7ioksLwFCTtqN6P8Q1az4AqeOMYUV79EPXaJYiSCMHL3PGhKsQdYdG_GB6odPCcpdzJjCbKnXuq4cuKttnS2yS3c42Akz9tBZo9RCwX7AvwrjN_vtprofMNnk1ZvL_i9s2VgJFtaoml" 
                alt="Verrerie d'exception" 
              />
              <div className="badge-glass bottom-full glassmorphism-dark">
                <span className="label-sm">Collection Cristal</span>
                <h4 className="headline-sm italic">L'Éclat Baccarat</h4>
              </div>
            </div>
            <div className="product-card__info">
              <h3 className="headline-md">Verres à Dégustation</h3>
              <p>L'équilibre parfait entre finesse du buvant et résistance.</p>
              <span className="link-gold">Découvrir la collection</span>
            </div>
          </article>

          {/* Standard Card: Couverts (span 4) */}
          <article className="product-card card-span-4">
            <div className="product-card__image aspect-square">
              <img 
                src="https://lh3.googleusercontent.com/aida-public/AB6AXuCrIV4AxeTHucwHk7GcofWwly-_qyYNiHp4Xp2JH_z-hBTQCOU246C4IwLiUk1lp4QrE_aDHCf3LxXRoVGO9QBMJDiwWojQpcfC-3QbPDHDQuXHrKvsYRE1enn6zayBVgmgDr2v_HRWoxsGSXksHqzmh1i3BbLGM4gyMdMD8cZRke4BRxdITAKOVldDesOgqzNWxBYxyEKGbV7sxUv_PCprsikpVUi-mTzqYymG49lPgZmMmdrOgZJZMGG8J224Ak2OwHVPdkumNwrs" 
                alt="Couverts en argent" 
              />
            </div>
            <div className="product-card__info">
              <h3 className="headline-md">Ménagère Argentée</h3>
              <p>Orfèvrerie traditionnelle réinventée pour le quotidien.</p>
              <div className="finishes">
                <span className="color-dot bg-silver"></span>
                <span className="color-dot bg-gold"></span>
                <span className="text-italic">2 finitions</span>
              </div>
            </div>
          </article>

          {/* Standard Card: Linge (span 4) */}
          <article className="product-card card-span-4">
            <div className="product-card__image aspect-square">
              <img 
                src="https://lh3.googleusercontent.com/aida-public/AB6AXuDE2_-V7mcwxhqNkKHyZJcR7SDHz-T1MHIk4p5kZ1JGpLs1ydag6RXiDzFW6uSBx-JDPnwjkM-BmMlOUcB1NPCUEqiKG0O3rxpbId4iMgKARXS7VUzivoVus6OmJ7tlxD6CoOWIa3ukjPAgsHoPGonIxNe32St1SzLNBPH1vPZjlqLIlcB9m9WU8oRpOnaGV8q7NKUk8Zu-X43spjZuXzRheE8_7Lp7uWLU8UilPAyR1lDEgRdzwHSyiZT3l32EvNwEn4jsyQ0MvWj3" 
                alt="Linge de table" 
              />
            </div>
            <div className="product-card__info">
              <h3 className="headline-md">Nappes en Lin Lavé</h3>
              <p>Le charme naturel d'un lin tissé dans le Nord de la France.</p>
            </div>
          </article>

          {/* Standard Card: Machines (span 4) */}
          <article className="product-card card-span-4">
            <div className="product-card__image aspect-square">
              <img 
                src="https://lh3.googleusercontent.com/aida-public/AB6AXuCzEHOMxv6OBSkXpFOsgMlXsjpVO914DGDBGr9PtzKXX-eDq2zDMHNbfrj9Y1U-brqzfUlSYpP4a34Twi6Wp2KfkloagmHfFwoYnXJv0BiFuHuTCchXQR7-KQPhNR4u0GVqyTBUYrC5amBR8VMeOyKGnZO8B84Hz_uu2VLJa59dt4ZGMFupM0NUskPUPfLaFDV8UAapp9AGaexQeFfyJQiA1pxTrPjuL9fL8VzOUo5tApjovfpQ5F9QV4qlM8qCHzm4LDhaBY17jUFn" 
                alt="Machines à café de luxe" 
              />
            </div>
            <div className="product-card__info">
              <h3 className="headline-md">Machines à Café Artisanales</h3>
              <p>L'expertise technique au service du rituel matinal.</p>
            </div>
          </article>

          {/* Large Asymmetric Feature: Décoration (span 12) */}
          <article className="product-card card-span-12 feature-horizontal bg-low">
            <div className="feature-text">
              <span className="label-md label-gold">Le Détail Subtil</span>
              <h2 className="display-sm">Décoration & <br />Centres de Table</h2>
              <p>Bougeoirs en bronze, vases en cristal et sculptures de table pour parfaire l'atmosphère de vos réceptions.</p>
              <Link href="/contact" className="btn-secondary">Nous contacter</Link>
            </div>
            <div className="feature-image">
              <img 
                src="https://lh3.googleusercontent.com/aida-public/AB6AXuCXYgJQXx2wxUjSpZ1ITJ4lkcKEKcYf84oW_d3zJlyq1F6WC4ikV-LIC7G0flkCnPvbg330JqdIAYrOPyt5LyrSBd-GcTizqA41HYYwuh29d6IMmBwczC2fB4dbM5bH4bc9Q-i7I6TVwPByuyobISvm2mRSGtwLrlUQe9RttBDSwwrlHRXRMt3oJlNohYab7yQJbGhgbpIa09y1tWxtcSQM_8obHGCwiVpXgdOb1BYjUBH2L7J5VE-e41lLK4mDOAyeXp5uzN9heUJR" 
                alt="Décoration de table" 
              />
            </div>
          </article>

        </div>
      </section>

      {/* Signature Banner */}
      <section className="selection-signature">
        <div className="container text-center">
          <span className="material-symbols-outlined icon-gold lg-icon mb-6">verified</span>
          <h2 className="display-sm italic">L'Art de Recevoir est un Héritage</h2>
          <p className="signature-desc">
            Nous travaillons main dans la main avec les ateliers labellisés "Entreprise du Patrimoine Vivant" pour vous garantir une authenticité sans compromis.
          </p>
          <div className="partners-list">
            <span>Atelier Guy Degrenne</span>
            <span>Cristallerie Saint-Louis</span>
            <span>Ercuis</span>
          </div>
        </div>
      </section>

    </main>
  );
}