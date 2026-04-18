'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { signOut } from 'next-auth/react'

const NAV = [
  { href: '/admin', label: 'Tableau de bord', icon: 'dashboard' },
  { href: '/admin/artisans', label: 'Artisans', icon: 'storefront' },
  { href: '/admin/products', label: 'Produits', icon: 'inventory_2' },
  { href: '/admin/machines', label: 'Machines', icon: 'precision_manufacturing' },
  { href: '/admin/testimonials', label: 'Témoignages', icon: 'format_quote' },
  { href: '/admin/content', label: 'Contenu du site', icon: 'edit_note' },
]

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname()

  if (pathname === '/admin/login') return <>{children}</>

  return (
    <div className="admin-layout">
      <aside className="admin-sidebar">
        <div className="admin-sidebar__brand">L'Art de la Table</div>

        <p className="admin-sidebar__label">Navigation</p>

        <nav className="admin-sidebar__nav">
          {NAV.map(({ href, label, icon }) => {
            const isActive =
              href === '/admin' ? pathname === '/admin' : pathname.startsWith(href)
            return (
              <Link
                key={href}
                href={href}
                className={`admin-sidebar__link${isActive ? ' admin-sidebar__link--active' : ''}`}
              >
                <span className="material-symbols-outlined">{icon}</span>
                {label}
              </Link>
            )
          })}
        </nav>

        <div className="admin-sidebar__footer">
          <button
            className="admin-sidebar__logout"
            onClick={() => signOut({ callbackUrl: '/admin/login' })}
          >
            <span className="material-symbols-outlined">logout</span>
            Se déconnecter
          </button>
        </div>
      </aside>

      <main className="admin-main">{children}</main>
    </div>
  )
}