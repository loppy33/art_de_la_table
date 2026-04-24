'use client'

import Link from "next/link"
import { useEffect, useState } from "react"

interface Artisan {
  id: string
  name: string
}

interface Product {
  id: string
  name: string
  description?: string
  image?: string
  category: string
  artisan: Artisan
}

interface Machine {
  id: string
  name: string
  description?: string
  image?: string
  highlights: string[]
}

type Tab = 'TOUS' | 'VAISSELLE' | 'VERRERIE' | 'COUVERTS' | 'LINGE_DE_TABLE' | 'DECORATION' | 'MACHINES'

const TABS: { value: Tab; label: string }[] = [
  { value: 'TOUS', label: 'Tous' },
  { value: 'VAISSELLE', label: 'Vaisselle' },
  { value: 'VERRERIE', label: 'Verrerie' },
  { value: 'COUVERTS', label: 'Couverts' },
  { value: 'LINGE_DE_TABLE', label: 'Linge' },
  { value: 'DECORATION', label: 'Décoration' },
  { value: 'MACHINES', label: 'Machines' },
]

// Fallback cards quand BDD vide
const FALLBACK_PRODUCTS = [
  {
    id: 'f1', name: 'Service Porcelaine de Limoges', category: 'VAISSELLE',
    description: 'Une blancheur immaculée et une finesse légendaire pour vos tables les plus prestigieuses.',
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAXX9WFXfx9e8SHqAJr7NVO3EcZTifh5gidiYfH6Oxn_Y38JRJo7ed5jLhgfweqddtKUGrowqr_KH2PP-kSiBwyZHsWPlHImm5ZzTffwWFvFl93SFhNK6SvuABhh6WSBVdee386M8JH3CbS0LO-sDpKcM-svfbdHuB9oAoBtomQTswV9ZgWrD9KnlCSdMBeK_NRfgOlAVyO1pLHED24LASpfr7XmrUGEXgeX8PMvNK4tQnVT88jTku3mnQKMM9iUydhf1hNyLwZAW2e',
    artisan: { id: '', name: 'Ateliers Riou' }
  },
  {
    id: 'f2', name: 'Verres à Dégustation', category: 'VERRERIE',
    description: "L'équilibre parfait entre finesse du buvant et résistance.",
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBBscyzh5TL1ZcQ1BRhQ4dy88riOnyVDB88TROdxMtIM7edw2itLkRlMMgb0LOrp_-Ucp0BZi-OsFvuN6Wza7b0NBFu-YMryJlCaJhOb-7Jwop3bnnAW_XH2ryO8I-WYqJca7ioksLwFCTtqN6P8Q1az4AqeOMYUV79EPXaJYiSCMHL3PGhKsQdYdG_GB6odPCcpdzJjCbKnXuq4cuKttnS2yS3c42Akz9tBZo9RCwX7AvwrjN_vtprofMNnk1ZvL_i9s2VgJFtaoml',
    artisan: { id: '', name: 'Suzant Cristal' }
  },
  {
    id: 'f3', name: 'Ménagère Argentée', category: 'COUVERTS',
    description: 'Orfèvrerie traditionnelle réinventée pour le quotidien.',
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCrIV4AxeTHucwHk7GcofWwly-_qyYNiHp4Xp2JH_z-hBTQCOU246C4IwLiUk1lp4QrE_aDHCf3LxXRoVGO9QBMJDiwWojQpcfC-3QbPDHDQuXHrKvsYRE1enn6zayBVgmgDr2v_HRWoxsGSXksHqzmh1i3BbLGM4gyMdMD8cZRke4BRxdITAKOVldDesOgqzNWxBYxyEKGbV7sxUv_PCprsikpVUi-mTzqYymG49lPgZmMmdrOgZJZMGG8J224Ak2OwHVPdkumNwrs',
    artisan: { id: '', name: 'Ateliers Riou' }
  },
  {
    id: 'f4', name: 'Nappes en Lin Lavé', category: 'LINGE_DE_TABLE',
    description: 'Le charme naturel d\'un lin tissé dans le Nord de la France.',
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDE2_-V7mcwxhqNkKHyZJcR7SDHz-T1MHIk4p5kZ1JGpLs1ydag6RXiDzFW6uSBx-JDPnwjkM-BmMlOUcB1NPCUEqiKG0O3rxpbId4iMgKARXS7VUzivoVus6OmJ7tlxD6CoOWIa3ukjPAgsHoPGonIxNe32St1SzLNBPH1vPZjlqLIlcB9m9WU8oRpOnaGV8q7NKUk8Zu-X43spjZuXzRheE8_7Lp7uWLU8UilPAyR1lDEgRdzwHSyiZT3l32EvNwEn4jsyQ0MvWj3',
    artisan: { id: '', name: 'Le Jacquard Français' }
  },
]

export default function Selection() {
  const [activeTab, setActiveTab] = useState<Tab>('TOUS')
  const [products, setProducts] = useState<Product[]>([])
  const [machines, setMachines] = useState<Machine[]>([])
  const [loading, setLoading] = useState(true)
  const [useFallback, setUseFallback] = useState(false)

  useEffect(() => {
    Promise.all([
      fetch('/api/admin/products').then(r => r.json()),
      fetch('/api/admin/machines').then(r => r.json()),
    ]).then(([p, m]) => {
      if (p.length === 0 && m.length === 0) {
        setUseFallback(true)
        setProducts(FALLBACK_PRODUCTS as any)
      } else {
        setProducts(p)
        setMachines(m)
      }
      setLoading(false)
    }).catch(() => {
      setUseFallback(true)
      setProducts(FALLBACK_PRODUCTS as any)
      setLoading(false)
    })
  }, [])

  const filtered = (() => {
    if (activeTab === 'TOUS') return { products, machines }
    if (activeTab === 'MACHINES') return { products: [], machines }
    return { products: products.filter(p => p.category === activeTab), machines: [] }
  })()

  const totalItems = filtered.products.length + filtered.machines.length

  return (
    <main className="selection">

      {/* Hero */}
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

      {/* Gallery */}
      <section className="selection-gallery container">

        {/* Filter Bar */}
        <div className="filter-bar">
          <div className="filter-bar__tabs no-scrollbar">
            {TABS.map(tab => (
              <button
                key={tab.value}
                className={`tab${activeTab === tab.value ? ' active' : ''}`}
                onClick={() => setActiveTab(tab.value)}
              >
                {tab.label}
              </button>
            ))}
          </div>
        </div>

        {/* Grid */}
        {loading ? (
          <div className="selection-loading">
            <p>Chargement de la sélection…</p>
          </div>
        ) : totalItems === 0 ? (
          <div className="selection-empty">
            <span className="material-symbols-outlined">inventory_2</span>
            <p>Aucun produit dans cette catégorie pour l'instant.</p>
            <Link href="/contact" className="btn-secondary">Nous contacter</Link>
          </div>
        ) : (
          <div className="bento-grid">

            {/* Premier produit — grand format */}
            {filtered.products[0] && (
              <article className="product-card card-span-8">
                <div className="product-card__image aspect-16-9">
                  {filtered.products[0].image ? (
                    <img src={filtered.products[0].image} alt={filtered.products[0].name} />
                  ) : (
                    <div className="product-card__placeholder">
                      <span className="material-symbols-outlined">image</span>
                    </div>
                  )}
                  <div className="badge-glass top-left">
                    <span>100% Made in France</span>
                  </div>
                </div>
                <div className="product-card__info flex-between">
                  <div>
                    <h3 className="headline-md">{filtered.products[0].name}</h3>
                    {filtered.products[0].description && (
                      <p>{filtered.products[0].description}</p>
                    )}
                    <span className="product-card__artisan">{filtered.products[0].artisan.name}</span>
                  </div>
                </div>
              </article>
            )}

            {/* Deuxième produit — format vertical */}
            {filtered.products[1] && (
              <article className="product-card card-span-4">
                <div className="product-card__image aspect-3-4">
                  {filtered.products[1].image ? (
                    <img src={filtered.products[1].image} alt={filtered.products[1].name} />
                  ) : (
                    <div className="product-card__placeholder">
                      <span className="material-symbols-outlined">image</span>
                    </div>
                  )}
                  <div className="badge-glass bottom-full glassmorphism-dark">
                    <span className="label-sm">{filtered.products[1].artisan.name}</span>
                    <h4 className="headline-sm italic">{filtered.products[1].name}</h4>
                  </div>
                </div>
                <div className="product-card__info">
                  <h3 className="headline-md">{filtered.products[1].name}</h3>
                  {filtered.products[1].description && (
                    <p>{filtered.products[1].description}</p>
                  )}
                </div>
              </article>
            )}

            {/* Produits restants — format carré */}
            {filtered.products.slice(2).map(product => (
              <article key={product.id} className="product-card card-span-4">
                <div className="product-card__image aspect-square">
                  {product.image ? (
                    <img src={product.image} alt={product.name} />
                  ) : (
                    <div className="product-card__placeholder">
                      <span className="material-symbols-outlined">image</span>
                    </div>
                  )}
                </div>
                <div className="product-card__info">
                  <h3 className="headline-md">{product.name}</h3>
                  {product.description && <p>{product.description}</p>}
                  <span className="product-card__artisan">{product.artisan.name}</span>
                </div>
              </article>
            ))}

            {/* Machines */}
            {filtered.machines.map((machine, i) => (
              <article
                key={machine.id}
                className={`product-card ${i === 0 ? 'card-span-12 feature-horizontal bg-low' : 'card-span-4'}`}
              >
                {i === 0 ? (
                  <>
                    <div className="feature-text">
                      <span className="label-md label-gold">Éclat de France</span>
                      <h2 className="display-sm">{machine.name}</h2>
                      {machine.description && <p>{machine.description}</p>}
                      {machine.highlights.length > 0 && (
                        <ul className="machine-highlights">
                          {machine.highlights.slice(0, 3).map((h, j) => (
                            <li key={j}>
                              <span className="material-symbols-outlined">check_circle</span>
                              {h}
                            </li>
                          ))}
                        </ul>
                      )}
                      <Link href="/contact" className="btn-secondary">Nous contacter</Link>
                    </div>
                    <div className="feature-image">
                      {machine.image ? (
                        <img src={machine.image} alt={machine.name} />
                      ) : (
                        <div className="product-card__placeholder">
                          <span className="material-symbols-outlined">precision_manufacturing</span>
                        </div>
                      )}
                    </div>
                  </>
                ) : (
                  <>
                    <div className="product-card__image aspect-square">
                      {machine.image ? (
                        <img src={machine.image} alt={machine.name} />
                      ) : (
                        <div className="product-card__placeholder">
                          <span className="material-symbols-outlined">precision_manufacturing</span>
                        </div>
                      )}
                    </div>
                    <div className="product-card__info">
                      <h3 className="headline-md">{machine.name}</h3>
                      {machine.description && <p>{machine.description}</p>}
                    </div>
                  </>
                )}
              </article>
            ))}

            {/* Bloc décoratif Décoration si présent */}
            {filtered.products.some(p => p.category === 'DECORATION') && activeTab === 'TOUS' && (
              <article className="product-card card-span-12 feature-horizontal bg-low">
                <div className="feature-text">
                  <span className="label-md label-gold">Le Détail Subtil</span>
                  <h2 className="display-sm">Décoration &<br />Centres de Table</h2>
                  <p>Bougeoirs en bronze, vases en cristal et sculptures de table pour parfaire l'atmosphère de vos réceptions.</p>
                  <Link href="/contact" className="btn-secondary">Nous contacter</Link>
                </div>
                <div className="feature-image">
                  {filtered.products.find(p => p.category === 'DECORATION')?.image ? (
                    <img src={filtered.products.find(p => p.category === 'DECORATION')!.image!} alt="Décoration de table" />
                  ) : (
                    <div className="product-card__placeholder">
                      <span className="material-symbols-outlined">auto_awesome</span>
                    </div>
                  )}
                </div>
              </article>
            )}

          </div>
        )}
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
            <span>Ateliers Riou</span>
            <span>Suzant Cristal</span>
            <span>Le Jacquard Français</span>
          </div>
        </div>
      </section>

    </main>
  )
}