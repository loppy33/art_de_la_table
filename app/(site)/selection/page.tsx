'use client'

import Link from 'next/link'
import { useEffect, useState } from 'react'

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

type Tab =
  | 'TOUS'
  | 'VAISSELLE'
  | 'VERRERIE'
  | 'COUVERTS'
  | 'LINGE_DE_TABLE'
  | 'DECORATION'
  | 'MACHINES'

const TABS: { value: Tab; label: string }[] = [
  { value: 'TOUS', label: 'Tous' },
  { value: 'VAISSELLE', label: 'Vaisselle' },
  { value: 'VERRERIE', label: 'Verrerie' },
  { value: 'COUVERTS', label: 'Couverts' },
  { value: 'LINGE_DE_TABLE', label: 'Linge' },
  { value: 'DECORATION', label: 'Décoration' },
  { value: 'MACHINES', label: 'Machines' },
]

const FALLBACK_PRODUCTS: Product[] = [
  {
    id: 'f1',
    name: 'Service Porcelaine de Limoges',
    category: 'VAISSELLE',
    description:
      'Une blancheur immaculée et une finesse légendaire pour vos tables les plus prestigieuses.',
    image:
      'https://lh3.googleusercontent.com/aida-public/AB6AXuAXX9WFXfx9e8SHqAJr7NVO3EcZTifh5gidiYfH6Oxn_Y38JRJo7ed5jLhgfweqddtKUGrowqr_KH2PP-kSiBwyZHsWPlHImm5ZzTffwWFvFl93SFhNK6SvuABhh6WSBVdee386M8JH3CbS0LO-sDpKcM-svfbdHuB9oAoBtomQTswV9ZgWrD9KnlCSdMBeK_NRfgOlAVyO1pLHED24LASpfr7XmrUGEXgeX8PMvNK4tQnVT88jTku3mnQKMM9iUydhf1hNyLwZAW2e',
    artisan: { id: '', name: 'Ateliers Riou' },
  },
  {
    id: 'f2',
    name: 'Verres à Dégustation',
    category: 'VERRERIE',
    description:
      "L'équilibre parfait entre finesse du buvant et résistance.",
    image:
      'https://lh3.googleusercontent.com/aida-public/AB6AXuBBscyzh5TL1ZcQ1BRhQ4dy88riOnyVDB88TROdxMtIM7edw2itLkRlMMgb0LOrp_-Ucp0BZi-OsFvuN6Wza7b0NBFu-YMryJlCaJhOb-7Jwop3bnnAW_XH2ryO8I-WYqJca7ioksLwFCTtqN6P8Q1az4AqeOMYUV79EPXaJYiSCMHL3PGhKsQdYdG_GB6odPCcpdzJjCbKnXuq4cuKttnS2yS3c42Akz9tBZo9RCwX7AvwrjN_vtprofMNnk1ZvL_i9s2VgJFtaoml',
    artisan: { id: '', name: 'Suzant Cristal' },
  },
  {
    id: 'f3',
    name: 'Ménagère Argentée',
    category: 'COUVERTS',
    description:
      'Orfèvrerie traditionnelle réinventée pour le quotidien.',
    image:
      'https://lh3.googleusercontent.com/aida-public/AB6AXuCrIV4AxeTHucwHk7GcofWwly-_qyYNiHp4Xp2JH_z-hBTQCOU246C4IwLiUk1lp4QrE_aDHCf3LxXRoVGO9QBMJDiwWojQpcfC-3QbPDHDQuXHrKvsYRE1enn6zayBVgmgDr2v_HRWoxsGSXksHqzmh1i3BbLGM4gyMdMD8cZRke4BRxdITAKOVldDesOgqzNWxBYxyEKGbV7sxUv_PCprsikpVUi-mTzqYymG49lPgZmMmdrOgZJZMGG8J224Ak2OwHVPdkumNwrs',
    artisan: { id: '', name: 'Ateliers Riou' },
  },
]

export default function Selection() {
  const [activeTab, setActiveTab] = useState<Tab>('TOUS')

  const [products, setProducts] = useState<Product[]>([])
  const [machines, setMachines] = useState<Machine[]>([])

  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const loadData = async () => {
      try {
        const [productsRes, machinesRes] = await Promise.all([
          fetch('/api/admin/products'),
          fetch('/api/admin/machines'),
        ])

        const productsData = await productsRes.json()
        const machinesData = await machinesRes.json()

        // FIX: защита от undefined / object / null
        const safeProducts: Product[] = Array.isArray(productsData)
          ? productsData
          : []

        const safeMachines: Machine[] = Array.isArray(machinesData)
          ? machinesData
          : []

        if (
          safeProducts.length === 0 &&
          safeMachines.length === 0
        ) {
          setProducts(FALLBACK_PRODUCTS)
          setMachines([])
        } else {
          setProducts(safeProducts)
          setMachines(safeMachines)
        }
      } catch (error) {
        console.error(error)

        setProducts(FALLBACK_PRODUCTS)
        setMachines([])
      } finally {
        setLoading(false)
      }
    }

    loadData()
  }, [])

  // FIX: всегда массивы
  const safeProducts = Array.isArray(products)
    ? products
    : []

  const safeMachines = Array.isArray(machines)
    ? machines
    : []

  const filtered = (() => {
    if (activeTab === 'TOUS') {
      return {
        products: safeProducts,
        machines: safeMachines,
      }
    }

    if (activeTab === 'MACHINES') {
      return {
        products: [],
        machines: safeMachines,
      }
    }

    return {
      products: safeProducts.filter(
        product => product.category === activeTab
      ),
      machines: [],
    }
  })()

  const totalItems =
    filtered.products.length + filtered.machines.length

  return (
    <main className="selection">
      <header className="selection-hero container">
        <div className="selection-hero__grid">
          <div className="selection-hero__text">
            <span className="label-md label-gold">
              Excellence Française
            </span>

            <h1 className="display-lg">
              L'Élégance de la <br />
              <span
                className="text-secondary"
                style={{ fontStyle: 'italic' }}
              >
                Sélection Unique
              </span>
            </h1>
          </div>

          <div className="selection-hero__desc">
            <p>
              Une curation rigoureuse des plus grandes
              manufactures françaises.
            </p>
          </div>
        </div>
      </header>

      <section className="selection-gallery container">
        <div className="filter-bar">
          <div className="filter-bar__tabs no-scrollbar">
            {TABS.map(tab => (
              <button
                key={tab.value}
                className={`tab ${
                  activeTab === tab.value ? 'active' : ''
                }`}
                onClick={() => setActiveTab(tab.value)}
              >
                {tab.label}
              </button>
            ))}
          </div>
        </div>

        {loading ? (
          <div className="selection-loading">
            <p>Chargement...</p>
          </div>
        ) : totalItems === 0 ? (
          <div className="selection-empty">
            <p>Aucun élément.</p>
          </div>
        ) : (
          <div className="bento-grid">
            {/* PRODUCT 1 */}
            {filtered.products[0] && (
              <article className="product-card card-span-8">
                <div className="product-card__image aspect-16-9">
                  {filtered.products[0].image ? (
                    <img
                      src={filtered.products[0].image}
                      alt={filtered.products[0].name}
                    />
                  ) : (
                    <div className="product-card__placeholder">
                      image
                    </div>
                  )}
                </div>

                <div className="product-card__info">
                  <h3>
                    {filtered.products[0].name}
                  </h3>

                  <p>
                    {filtered.products[0].description}
                  </p>
                </div>
              </article>
            )}

            {/* PRODUCT 2 */}
            {filtered.products[1] && (
              <article className="product-card card-span-4">
                <div className="product-card__image aspect-3-4">
                  {filtered.products[1].image ? (
                    <img
                      src={filtered.products[1].image}
                      alt={filtered.products[1].name}
                    />
                  ) : (
                    <div className="product-card__placeholder">
                      image
                    </div>
                  )}
                </div>

                <div className="product-card__info">
                  <h3>
                    {filtered.products[1].name}
                  </h3>

                  <p>
                    {filtered.products[1].description}
                  </p>
                </div>
              </article>
            )}

            {/* OTHER PRODUCTS */}
            {filtered.products
              .slice(2)
              .map(product => (
                <article
                  key={product.id}
                  className="product-card card-span-4"
                >
                  <div className="product-card__image aspect-square">
                    {product.image ? (
                      <img
                        src={product.image}
                        alt={product.name}
                      />
                    ) : (
                      <div className="product-card__placeholder">
                        image
                      </div>
                    )}
                  </div>

                  <div className="product-card__info">
                    <h3>{product.name}</h3>

                    {product.description && (
                      <p>{product.description}</p>
                    )}

                    <span>
                      {product.artisan?.name}
                    </span>
                  </div>
                </article>
              ))}

            {/* MACHINES */}
            {filtered.machines.map((machine, i) => (
              <article
                key={machine.id}
                className={`product-card ${
                  i === 0
                    ? 'card-span-12'
                    : 'card-span-4'
                }`}
              >
                <div className="product-card__image aspect-square">
                  {machine.image ? (
                    <img
                      src={machine.image}
                      alt={machine.name}
                    />
                  ) : (
                    <div className="product-card__placeholder">
                      machine
                    </div>
                  )}
                </div>

                <div className="product-card__info">
                  <h3>{machine.name}</h3>

                  {machine.description && (
                    <p>{machine.description}</p>
                  )}

                  {Array.isArray(machine.highlights) &&
                    machine.highlights.length > 0 && (
                      <ul>
                        {machine.highlights.map(
                          (highlight, index) => (
                            <li key={index}>
                              {highlight}
                            </li>
                          )
                        )}
                      </ul>
                    )}
                </div>
              </article>
            ))}
          </div>
        )}
      </section>
    </main>
  )
}