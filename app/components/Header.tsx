'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useState, useEffect } from 'react'

export default function Header() {
  const pathname = usePathname()
  const [menuOpen, setMenuOpen] = useState(false)

  // Закрыть меню при смене страницы
  useEffect(() => {
    setMenuOpen(false)
  }, [pathname])

  // Заблокировать скролл когда меню открыто
  useEffect(() => {
    document.body.style.overflow = menuOpen ? 'hidden' : ''
    return () => { document.body.style.overflow = '' }
  }, [menuOpen])

  const navLinks = [
    { href: '/', label: 'Accueil' },
    { href: '/services', label: 'Nos services' },
    { href: '/selection', label: 'Notre sélection' },
    { href: '/client-mystere', label: 'Client Mystère' },
    { href: '/about', label: 'À propos' },
  ]

  return (
    <>
      <header className="header glassmorphism">
        <nav className="header__nav container">
          <div className="header__logo"><Link href="/">L'Art de la Table</Link></div>

          {/* Desktop nav */}
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

          {/* Desktop actions */}
          <div className="header__actions header__actions--desktop">
            <Link href="/contact" className="btn-text">Contact</Link>
            <Link href="/rendez-vous" className="btn-primary">Prendre RDV</Link>
          </div>

          {/* Hamburger button (mobile only) */}
          <button
            className={`header__burger${menuOpen ? ' header__burger--open' : ''}`}
            onClick={() => setMenuOpen(!menuOpen)}
            aria-label={menuOpen ? 'Fermer le menu' : 'Ouvrir le menu'}
            aria-expanded={menuOpen}
          >
            <span />
            <span />
            <span />
          </button>
        </nav>
      </header>

      {/* Mobile drawer */}
      <div
        className={`mobile-menu${menuOpen ? ' mobile-menu--open' : ''}`}
        aria-hidden={!menuOpen}
      >
        <nav className="mobile-menu__nav">
          {navLinks.map(link => (
            <Link
              key={link.href}
              href={link.href}
              className={`mobile-menu__link${pathname === link.href ? ' active' : ''}`}
              onClick={() => setMenuOpen(false)}
            >
              {link.label}
            </Link>
          ))}
        </nav>

        <div className="mobile-menu__actions">
          <Link href="/contact" className="btn-text" onClick={() => setMenuOpen(false)}>
            Contact
          </Link>
          <Link href="/rendez-vous" className="btn-primary" onClick={() => setMenuOpen(false)}>
            Prendre RDV
          </Link>
        </div>
      </div>

      {/* Overlay */}
      {menuOpen && (
        <div
          className="mobile-menu__overlay"
          onClick={() => setMenuOpen(false)}
          aria-hidden="true"
        />
      )}
    </>
  )
}