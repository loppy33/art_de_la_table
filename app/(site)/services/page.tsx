import { prisma } from "@/lib/prisma"
import Link from "next/link"

import { servicesMetadata } from '@/lib/metadata'
export const metadata = servicesMetadata

async function getContent() {
  const rows = await prisma.siteContent.findMany()
  return Object.fromEntries(rows.map(r => [r.key, r.value]))
}

export default async function Services() {
  const c = await getContent()
  const v = (key: string, fallback: string) => c[key]?.trim() || fallback

  const steps = [
    {
      num: "01",
      title: v('services_step1_title', 'Consultation & Vision'),
      desc:  v('services_step1_text',  "Définition de vos besoins esthétiques et contraintes budgétaires. Nous écoutons votre histoire culinaire pour en transcrire les codes sur la table."),
    },
    {
      num: "02",
      title: v('services_step2_title', 'Sélection des Manufactures'),
      desc:  v('services_step2_text',  "Établissement d'un catalogue sur-mesure parmi nos partenaires EPV (Entreprise du Patrimoine Vivant). Présentation d'échantillons en situation réelle."),
    },
    {
      num: "03",
      title: v('services_step3_title', 'Logistique & Déploiement'),
      desc:  v('services_step3_text',  "Gestion complète de la commande à la livraison. Nous assurons un contrôle qualité rigoureux à chaque réception de marchandise."),
    },
    {
      num: "04",
      title: v('services_step4_title', 'Accompagnement pérenne'),
      desc:  v('services_step4_text',  "Suivi des réassorts et mise à jour des collections au fil des saisons. Nous restons à vos côtés pour faire évoluer votre identité."),
    },
  ]

  return (
    <main className="services">

      {/* Hero */}
      <section className="services-hero container">
        <div className="services-hero__grid">
          <div className="services-hero__content">
            <span className="label-md label-gold">Expertise CHR</span>
            <h1 className="display-lg">
              L'art de sublimer <br />
              <span className="text-secondary" style={{ fontStyle: 'italic' }}>votre établissement.</span>
            </h1>
            <p>{v('services_hero_text', "Nous accompagnons les professionnels de l'hôtellerie et de la restauration dans la création d'expériences mémorables à travers un service de conseil et de sourcing d'exception.")}</p>
          </div>
          <div className="services-hero__visual">
            <div className="image-wrapper ambient-shadow">
              <img
                src="https://lh3.googleusercontent.com/aida-public/AB6AXuDJ5PNqO_AaFoGCbtlXLjGs32q5alLxEyjPQtYyKeYJbg286H7R657pM35LhtanWv5jBMdiE5v6TQteL_yMcPKAtYiyZo5kr21IEjB8ppC0Go7-PZjYPVLGJ8ezWfnO_XlgyUbCJP33NfUQmnbvhDEYuVRmf-qYUBQySBy4p34f-f7fgV2QgzIEmwMPqJVOyfPnq9mozp--wsUhT_6h2xGpdZfZaqgkqExJsh7QWmc5c8PcWIdS0i-5oCXdoJFEe_p4svcN8oEuQVtQ"
                alt="Elegant table setting"
              />
            </div>
            <div className="services-hero__badge ambient-shadow">
              <p className="badge-value">100%</p>
              <p className="label-md">Sourcing Français</p>
            </div>
          </div>
        </div>
      </section>

      {/* Bento Grid */}
      <section className="services-bento bg-low">
        <div className="container">
          <div className="services-bento__header">
            <div>
              <h2 className="headline-lg">Une expertise sur-mesure</h2>
              <p>Nos services sont pensés pour répondre aux exigences les plus élevées des restaurateurs, hôteliers et directeurs d'exploitation.</p>
            </div>
            <div className="decorative-line"></div>
          </div>

          <div className="bento-grid">
            <div className="bento-card card-large">
              <div className="bento-card__content">
                <span className="material-symbols-outlined icon-gold">inventory_2</span>
                <h3 className="headline-md">{v('services_sourcing_title', 'Sourcing 100% Français')}</h3>
                <p>{v('services_sourcing_text', "Accès exclusif aux meilleures manufactures de l'Hexagone. Nous dénichons pour vous la porcelaine de Limoges, l'argenterie d'orfèvres et le cristal de tradition pour une table authentique.")}</p>
                <div className="tags">
                  <span className="tag">Porcelaine</span>
                  <span className="tag">Verrerie</span>
                  <span className="tag">Coutellerie</span>
                  <span className="tag">Nappage</span>
                </div>
              </div>
            </div>

            <div className="bento-card card-primary">
              <div className="bento-card__content relative-z">
                <span className="material-symbols-outlined icon-light">analytics</span>
                <h3 className="headline-md text-white">{v('services_audit_title', 'Audit & Inventaire')}</h3>
                <p className="text-light">{v('services_audit_text', "Optimisation de vos stocks et analyse de l'usure de votre parc. Nous évaluons la cohérence esthétique et fonctionnelle de vos équipements actuels.")}</p>
              </div>
              <span className="material-symbols-outlined bg-icon">assignment_turned_in</span>
            </div>

            <div className="bento-card card-standard">
              <div className="bento-card__content">
                <span className="material-symbols-outlined icon-gold">architecture</span>
                <h3 className="headline-md">{v('services_design_title', 'Conseil en Design')}</h3>
                <p>{v('services_design_text', "Création d'une identité visuelle propre à votre établissement. Nous marions les textures et les formes pour sublimer chaque plat.")}</p>
                <ul className="checklist">
                  <li><span className="material-symbols-outlined icon-gold">check_circle</span>Plan de table personnalisé</li>
                  <li><span className="material-symbols-outlined icon-gold">check_circle</span>Harmonie des couleurs</li>
                  <li><span className="material-symbols-outlined icon-gold">check_circle</span>Formation des équipes</li>
                </ul>
              </div>
            </div>

            <div className="bento-card card-wide-image">
              <div className="card-image">
                <img src="https://lh3.googleusercontent.com/aida-public/AB6AXuAvsCMJdG3lx8dLmtilh9XuwD8iy2FbtwqlLK7ZdJefNxDK4btETd7KMALA8o1OILIMLrquXFllopeqj_5paXaknP3s9Nja__ycusderF_H28ON85R3j_GgC_g_QvkJVxndbamW31xJ9avsEP1FJnFaVLEFhMFjdtcY7dN-Dsan2Zr6npX45CVF4aYnHC18oZN1biM2q7_wo9LJAw4zfSXTHUuEs2TgAejiFwpBXkA6iB-uJUvhfsC-w-ALs8Utkaleccf86rl9QK3Z" alt="Professional consultant" />
              </div>
              <div className="bento-card__content">
                <h3 className="headline-md">{v('services_tech_title', 'Expertise Technique')}</h3>
                <p>{v('services_tech_text', "Recommandations basées sur la durabilité des matériaux et leur résistance aux cycles de lavage intensifs du secteur CHR. Alliez élégance et rentabilité opérationnelle.")}</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Process */}
      <section className="services-process container">
        <div className="process-grid">
          <div className="process-header">
            <div className="sticky-content">
              <h2 className="display-lg">L'excellence <br />étape par étape</h2>
              <p>Notre méthodologie garantit une transformation fluide de votre salle de restaurant, du premier audit à la mise en place finale.</p>
              <Link href="/rendez-vous" className="btn-secondary mt-6">Demander une présentation</Link>
            </div>
          </div>
          <div className="process-steps">
            {steps.map((step) => (
              <div key={step.num} className="step-item">
                <div className="step-number">{step.num}</div>
                <div className="step-content">
                  <h4 className="headline-sm">{step.title}</h4>
                  <p>{step.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="services-cta container">
        <div className="cta-card">
          <div className="cta-card__bg">
            <img src="https://lh3.googleusercontent.com/aida-public/AB6AXuBbbfQ5udhY1nP0gflKZMNFP3--LNtJFIhvk-55IbXrxekgrRg1d5uFt8GB7Fv_QEHy_Zdqy1SHIKDbysn6yqAN9iIN0T5fBS0qz_qATaVW4bY1Ql4K2PmMC0DMS1UiouJIcfAN5YmHa3CbNMmQUDZDf1gi_SB2ogTTm4oEbvXnOrR5kPpovlc0ibofcmngxshP8WLAjsWeVOsf2DeHJj3N6vaV1dl2c1d9_smd_ssxuTaOa_7_7RSQZhlw9bP1ihTUr9QzQ0aXpI0p" alt="Luxury restaurant" />
          </div>
          <div className="cta-card__content">
            <h2 className="display-lg text-white">
              Donnez à votre établissement <br />
              <span className="text-gold">la table qu'il mérite.</span>
            </h2>
            <p className="text-light">
              Chaque détail compte dans l'expérience client. Nos experts sont prêts à concevoir avec vous une atmosphère qui reflète l'excellence de votre service.
            </p>
            <div className="cta-actions">
              <Link href="/contact" className="btn-primary">Demander un devis</Link>
              <Link href="/selection" className="btn-glass">Voir notre sélection</Link>
            </div>
          </div>
        </div>
      </section>

    </main>
  )
}