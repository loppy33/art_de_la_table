import type { Metadata } from 'next'

const SITE_URL = 'https://lartdelatable.sale'
const SITE_NAME = "L'Art de la Table à la Française"

const DEFAULT_OG_IMAGE = {
  url: 'https://lh3.googleusercontent.com/aida-public/AB6AXuC_J90MsTPQaK6S0Tv09uK3W_EzLX_Byz2qLq3JiQeZ_rfSsvXOlG-WjCKDgVtDTNAzFBydG35AtE4-jVVlDzl58GA_MaJrLltLSL074VWTkgp8-_7Ep-UJertHYuqg2ArN0XVeVSjnY0aeMNRNXmg72kis6CSqC8IlUuCevYf8yJ-mF76yHRtENQxzuxthXhxT-7jLF96soQ5pLnoFsnxgHfef8OwCsgRAqtUNVBafnZmKGest-uQnfKqir8B_9zYXXppqTLnQ2mMm',
  width: 1200,
  height: 630,
  alt: SITE_NAME,
}

// ── Metadata de base partagée entre toutes les pages ──────────────────────────
export const baseMetadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  applicationName: SITE_NAME,
  authors: [{ name: SITE_NAME, url: SITE_URL }],
  creator: SITE_NAME,
  publisher: SITE_NAME,
  formatDetection: { telephone: true, email: true, address: true },
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true },
  },
  icons: {
    icon: '/favicon.ico',
    apple: '/apple-touch-icon.png',
  },
}

// ── Helper pour générer metadata complète ─────────────────────────────────────
export function createMetadata({
  title,
  description,
  path = '',
  image,
  noIndex = false,
}: {
  title: string
  description: string
  path?: string
  image?: string
  noIndex?: boolean
}): Metadata {
  const fullTitle = path === '' ? `${title} | ${SITE_NAME}` : `${title} | ${SITE_NAME}`
  const canonicalUrl = `${SITE_URL}${path}`
  const ogImage = image
    ? { url: image, width: 1200, height: 630, alt: title }
    : DEFAULT_OG_IMAGE

  return {
    ...baseMetadata,
    title: fullTitle,
    description,
    alternates: { canonical: canonicalUrl },
    robots: noIndex
      ? { index: false, follow: false }
      : baseMetadata.robots,
    openGraph: {
      type: 'website',
      locale: 'fr_FR',
      url: canonicalUrl,
      siteName: SITE_NAME,
      title: fullTitle,
      description,
      images: [ogImage],
    },
    twitter: {
      card: 'summary_large_image',
      title: fullTitle,
      description,
      images: [ogImage.url],
    },
  }
}

// ── Metadata par page ─────────────────────────────────────────────────────────

export const homeMetadata = createMetadata({
  title: "L'Art de la Table à la Française",
  description:
    "Spécialiste du sourcing 100% français pour l'hôtellerie et la restauration d'exception. Porcelaine, cristal, argenterie, linge de table — conseil et sélection sur-mesure.",
  path: '/',
})

export const selectionMetadata = createMetadata({
  title: 'Notre Sélection',
  description:
    "Découvrez notre catalogue exclusif : vaisselle de Limoges, verrerie en cristal, couverts d'orfèvrerie, linge de table et décoration. Sélection artisanale 100% française.",
  path: '/selection',
})

export const aboutMetadata = createMetadata({
  title: 'À Propos',
  description:
    "L'histoire de L'Art de la Table à la Française : notre philosophie, nos valeurs et nos partenaires artisans labellisés Entreprise du Patrimoine Vivant.",
  path: '/about',
})

export const servicesMetadata = createMetadata({
  title: 'Nos Services',
  description:
    "Sourcing français, audit & inventaire, conseil en design de table, expertise technique CHR. Un accompagnement complet pour les professionnels de l'hôtellerie-restauration.",
  path: '/services',
})

export const auditMetadata = createMetadata({
  title: 'Audit & Conseil',
  description:
    "Service d'audit F&B et de conseil stratégique pour hôteliers et restaurateurs. Analyse de vos équipements, optimisation des coûts, recommandations sur-mesure.",
  path: '/audit-conseil',
})

export const clientMystereMetadata = createMetadata({
  title: 'Client Mystère',
  description:
    "Notre service Client Mystère évalue l'expérience de vos convives avec un regard d'expert. Rapport détaillé et recommandations pour élever votre niveau de service.",
  path: '/client-mystere',
})

export const contactMetadata = createMetadata({
  title: 'Contact',
  description:
    "Contactez nos experts en art de la table. Demande de devis, renseignements sur nos collections ou votre projet d'équipement — réponse sous 24h.",
  path: '/contact',
})

export const bookingMetadata = createMetadata({
  title: 'Prise de Rendez-vous',
  description:
    "Réservez une consultation privée avec nos experts. 30 minutes d'échange exclusif pour définir votre sélection sur-mesure et sublimer votre établissement.",
  path: '/rendez-vous',
})

export const cgvMetadata = createMetadata({
  title: 'Conditions Générales de Vente',
  description: "Conditions générales de vente de L'Art de la Table à la Française.",
  path: '/cgv',
  noIndex: true,
})

export const privacyMetadata = createMetadata({
  title: 'Politique de confidentialité — RGPD',
  description: "Politique de confidentialité et de protection des données personnelles conformément au RGPD.",
  path: '/privacy',
  noIndex: true,
})

export const mentionsMetadata = createMetadata({
  title: 'Mentions Légales',
  description: "Mentions légales du site lartdelatable.sale.",
  path: '/mentions',
  noIndex: true,
})