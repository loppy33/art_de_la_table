export const dynamic = "force-dynamic"

import Link from 'next/link'
import { prisma } from '@/lib/prisma'

async function getContacts() {
  const rows = await prisma.siteContent.findMany({
    where: { key: { in: ['contact_address', 'contact_phone', 'contact_email'] } },
  })
  return Object.fromEntries(rows.map(r => [r.key, r.value]))
}

export default async function Footer() {
  const c = await getContacts()

  return (
    <footer className="footer">
      <div className="container footer__grid">
        <div className="footer__brand">
          <div className="footer__logo">L'Art de la Table</div>
          <p>L'excellence de l'art de vivre à la française au service des professionnels de l'exception.</p>
        </div>

        <div className="footer__col">
          <h4 className="label-md">Menu</h4>
          <ul>
            <li><Link href="/">Accueil</Link></li>
            <li><Link href="/services">Nos services</Link></li>
            <li><Link href="/selection">Sélection</Link></li>
            <li><Link href="/about">À propos</Link></li>
          </ul>
        </div>

        <div className="footer__col">
          <h4 className="label-md">Informations</h4>
          <ul>
            <li><Link href="/contact">Contact</Link></li>
            <li><Link href="/cgv">CGV</Link></li>
            <li><Link href="/privacy">RGPD</Link></li>
            <li><Link href="/mentions">Mentions Légales</Link></li>
          </ul>
        </div>

        <div className="footer__col">
          <h4 className="label-md">Contact</h4>
          {c.contact_address && <p>{c.contact_address}</p>}
          {c.contact_phone && (
            <p>
              <a href={`tel:${c.contact_phone.replace(/\s/g, '')}`}>
                {c.contact_phone}
              </a>
            </p>
          )}
          {c.contact_email && (
            <p>
              <a href={`mailto:${c.contact_email}`}>
                {c.contact_email}
              </a>
            </p>
          )}
          {!c.contact_address && !c.contact_phone && !c.contact_email && (
            <>
              <p>75001 Paris, France</p>
              <p>+33 (0)1 23 45 67 89</p>
              <p>contact@artdelatable.fr</p>
            </>
          )}
        </div>
      </div>

      <div className="footer__bottom">
        <p>© {new Date().getFullYear()} L'Art de la Table à la Française. Tous droits réservés.</p>
      </div>
    </footer>
  )
}