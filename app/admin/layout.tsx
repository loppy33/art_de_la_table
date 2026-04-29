'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { signOut } from 'next-auth/react'
import { useEffect, useState } from 'react'

const NAV = [
  { href: '/admin', label: 'Tableau de bord', icon: 'dashboard' },
  { href: '/admin/rendez-vous', label: 'Rendez-vous', icon: 'calendar_today' },
  { href: '/admin/contacts', label: 'Demandes', icon: 'mark_email_unread' },
  { href: '/admin/newsletter', label: 'Newsletter', icon: 'mail' },
  { href: '/admin/artisans', label: 'Artisans', icon: 'storefront' },
  { href: '/admin/products', label: 'Produits', icon: 'inventory_2' },
  { href: '/admin/machines', label: 'Machines', icon: 'precision_manufacturing' },
  { href: '/admin/testimonials', label: 'Témoignages', icon: 'format_quote' },
  { href: '/admin/content', label: 'Contenu du site', icon: 'edit_note' },
]

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname()
  const [unread, setUnread] = useState(0)

  useEffect(() => {
    fetch('/api/admin/stats')
      .then(r => r.json())
      .then(d => setUnread(d.unreadContacts ?? 0))
      .catch(() => {})
  }, [pathname])

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
                {href === '/admin/contacts' && unread > 0 && (
                  <span className="admin-sidebar__badge">{unread}</span>
                )}
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