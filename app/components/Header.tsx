'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useState, useEffect } from 'react'

export default function Header() {
  const pathname = usePathname()
  const [menuOpen, setMenuOpen] = useState(false)

  useEffect(() => {
    setMenuOpen(false)
  }, [pathname])

  useEffect(() => {
    document.body.style.overflow = menuOpen ? 'hidden' : ''
    return () => { document.body.style.overflow = '' }
  }, [menuOpen])

  // Группируем услуги
  const navLinks = [
    { href: '/', label: 'Accueil' },
    {
      label: 'Services',
      items: [
        { href: '/services', label: 'Tous nos services' },
        { href: '/selection', label: 'Notre sélection' },
        { href: '/audit-conseil', label: 'Audit & Conseil' },
        { href: '/client-mystere', label: 'Client Mystère' },
      ]
    },
    { href: '/espace-client', label: 'Mon espace' },
    { href: '/about', label: 'À propos' },
  ]

  return (
    <>
      <header className="header glassmorphism">
        <nav className="header__nav container">
          <div className="header__logo">
            <Link href="/">L'Art de la Table</Link> {/* Можно слегка сократить лого */}
          </div>

          {/* Desktop nav */}
          <div className="header__links">
            {navLinks.map(link => (
              link.items ? (
                // Выпадающее меню для десктопа
                <div className="header__dropdown" key={link.label}>
                  <span className="header__dropdown-trigger">
                    {link.label} <small>▼</small>
                  </span>
                  <div className="header__dropdown-menu">
                    {link.items.map(sublink => (
                      <Link
                        key={sublink.href}
                        href={sublink.href}
                        className={pathname === sublink.href ? 'active' : ''}
                      >
                        {sublink.label}
                      </Link>
                    ))}
                  </div>
                </div>
              ) : (
                // Обычная ссылка
                <Link
                  key={link.href}
                  href={link.href}
                  className={pathname === link.href ? 'active' : ''}
                >
                  {link.label}
                </Link>
              )
            ))}
          </div>

          {/* Desktop actions */}
          <div className="header__actions header__actions--desktop">
            <Link href="/contact" className="btn-text">Contact</Link>
            <Link href="/rendez-vous" className="btn-primary">Prendre RDV</Link>
          </div>

          {/* Hamburger */}
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
      <div className={`mobile-menu${menuOpen ? ' mobile-menu--open' : ''}`} aria-hidden={!menuOpen}>
        <nav className="mobile-menu__nav">
          {navLinks.map(link => (
            link.items ? (
              // Раскрытая группа для мобильного меню
              <div key={link.label} className="mobile-menu__group">
                <div className="mobile-menu__group-title">{link.label}</div>
                {link.items.map(sublink => (
                  <Link
                    key={sublink.href}
                    href={sublink.href}
                    className={`mobile-menu__link mobile-menu__link--sub${pathname === sublink.href ? ' active' : ''}`}
                    onClick={() => setMenuOpen(false)}
                  >
                    {sublink.label}
                  </Link>
                ))}
              </div>
            ) : (
              <Link
                key={link.href}
                href={link.href}
                className={`mobile-menu__link${pathname === link.href ? ' active' : ''}`}
                onClick={() => setMenuOpen(false)}
              >
                {link.label}
              </Link>
            )
          ))}
        </nav>

        <div className="mobile-menu__actions">
          <Link href="/contact" className="btn-text" onClick={() => setMenuOpen(false)}>Contact</Link>
          <Link href="/rendez-vous" className="btn-primary" onClick={() => setMenuOpen(false)}>Prendre RDV</Link>
        </div>
      </div>

      {menuOpen && <div className="mobile-menu__overlay" onClick={() => setMenuOpen(false)} aria-hidden="true" />}
    </>
  )
}