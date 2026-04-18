'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'

interface Stats {
  products: number
  artisans: number
  machines: number
  testimonials: number
}

const CARDS = [
  { key: 'artisans', label: 'Artisans', icon: 'storefront', href: '/admin/artisans' },
  { key: 'products', label: 'Produits', icon: 'inventory_2', href: '/admin/products' },
  { key: 'machines', label: 'Machines', icon: 'precision_manufacturing', href: '/admin/machines' },
  { key: 'testimonials', label: 'Témoignages visibles', icon: 'format_quote', href: '/admin/testimonials' },
]

export default function AdminDashboard() {
  const [stats, setStats] = useState<Stats | null>(null)

  useEffect(() => {
    fetch('/api/admin/stats').then(r => r.json()).then(setStats)
  }, [])

  return (
    <>
      <div className="admin-header">
        <h1 className="admin-header__title">Tableau de bord</h1>
      </div>

      <div className="admin-dashboard">
        {CARDS.map(({ key, label, icon, href }) => (
          <Link key={key} href={href} className="admin-stat">
            <div className="admin-stat__icon">
              <span className="material-symbols-outlined">{icon}</span>
            </div>
            <div className="admin-stat__value">
              {stats ? stats[key as keyof Stats] : '—'}
            </div>
            <div className="admin-stat__label">{label}</div>
          </Link>
        ))}
      </div>

      <div className="admin-table">
        <table>
          <thead>
            <tr>
              <th>Section</th>
              <th>Action rapide</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>Artisans (Riou, Suzant, Le Jacquard Français…)</td>
              <td>
                <Link href="/admin/artisans/new" className="admin-btn admin-btn--ghost">
                  <span className="material-symbols-outlined">add</span>
                  Ajouter
                </Link>
              </td>
            </tr>
            <tr>
              <td>Produits — Notre Sélection</td>
              <td>
                <Link href="/admin/products/new" className="admin-btn admin-btn--ghost">
                  <span className="material-symbols-outlined">add</span>
                  Ajouter
                </Link>
              </td>
            </tr>
            <tr>
              <td>Machines — Éclat de France</td>
              <td>
                <Link href="/admin/machines/new" className="admin-btn admin-btn--ghost">
                  <span className="material-symbols-outlined">add</span>
                  Ajouter
                </Link>
              </td>
            </tr>
            <tr>
              <td>Témoignages clients</td>
              <td>
                <Link href="/admin/testimonials/new" className="admin-btn admin-btn--ghost">
                  <span className="material-symbols-outlined">add</span>
                  Ajouter
                </Link>
              </td>
            </tr>
            <tr>
              <td>Contenu du site (À propos, contacts…)</td>
              <td>
                <Link href="/admin/content" className="admin-btn admin-btn--ghost">
                  <span className="material-symbols-outlined">edit</span>
                  Modifier
                </Link>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </>
  )
}