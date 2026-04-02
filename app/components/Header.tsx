'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'

export default function Header() {
  const pathname = usePathname() 

  const navLinks = [
    { href: '/', label: 'Accueil' },
    { href: '/services', label: 'Nos services' },
    { href: '/selection', label: 'Notre sélection' },
    { href: '/about', label: 'À propos' },
  ]

  return (
    <header className="header glassmorphism">
      <nav className="header__nav container">
        <div className="header__logo">L'Art de la Table</div>
        
        <div className="header__links">
          {navLinks.map(link => (
            <Link
              key={link.href}
              href={link.href}
              className={pathname === link.href ? 'active' : ''}
            >
              {link.label}
            </Link>
          ))}
        </div>

        <div className="header__actions">
          <Link href="/contact" className="btn-text">Contact</Link>
          <Link href="#" className="btn-primary">Prendre RDV</Link>
        </div>
      </nav>
    </header>
  )
}