import Link from 'next/link';

export default function Footer() {
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
            <li><Link href="#services">Nos services</Link></li>
            <li><Link href="#selection">Sélection</Link></li>
            <li><Link href="#about">À propos</Link></li>
          </ul>
        </div>

        <div className="footer__col">
          <h4 className="label-md">Informations</h4>
          <ul>
            <li><Link href="/contact">Contact</Link></li>
            <li><Link href="/cgv">CGV</Link></li>
            <li><Link href="/rgpd">RGPD</Link></li>
            <li><Link href="/mentions">Mentions Légales</Link></li>
          </ul>
        </div>

        <div className="footer__col">
          <h4 className="label-md">Contact</h4>
          <p>75001 Paris, France</p>
          <p>+33 (0)1 23 45 67 89</p>
          <p>contact@artdelatable.fr</p>
        </div>
      </div>
      <div className="footer__bottom">
        <p>© 2026 L'Art de la Table à la Française. Tous droits réservés.</p>
      </div>
    </footer>
  );
}