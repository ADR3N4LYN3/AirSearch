"use client";

import LegalLayout, { type LegalSection } from "@/components/LegalLayout";

const SECTIONS: LegalSection[] = [
  {
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="var(--accent)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" />
        <circle cx="12" cy="10" r="3" />
      </svg>
    ),
    title: "Notre mission",
    content: (
      <p style={{ lineHeight: 1.8 }}>
        AirSearch facilite la recherche de locations de vacances en comparant automatiquement
        les meilleures plateformes du marché : Airbnb, Booking.com et Abritel. Notre mission
        est de vous faire gagner du temps et de l&apos;argent en centralisant votre recherche
        en un seul endroit, propulsé par notre technologie intelligente.
      </p>
    ),
  },
  {
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="var(--accent)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M12 2a7 7 0 0 0-4 12.7V17h8v-2.3A7 7 0 0 0 12 2z" />
        <path d="M9 18h6" />
        <path d="M10 22h4" />
      </svg>
    ),
    title: "Pourquoi AirSearch ?",
    content: (
      <>
        <p style={{ lineHeight: 1.8, marginBottom: "12px" }}>
          Nous avons créé AirSearch car nous savions qu&apos;il devait exister une meilleure
          façon de trouver sa location de vacances. Voici ce qui nous distingue :
        </p>
        <ul style={{ paddingLeft: "20px", display: "flex", flexDirection: "column", gap: "8px" }}>
          <li><strong>Neutre et indépendant</strong> : Nous ne favorisons aucune plateforme. Les résultats sont basés uniquement sur vos critères.</li>
          <li><strong>100% gratuit</strong> : Aucune commission, aucun frais caché. Notre service est entièrement gratuit pour vous.</li>
          <li><strong>Technologie avancée</strong> : Notre moteur de recherche utilise les algorithmes les plus avancés pour comprendre vos besoins et trouver les meilleures options.</li>
          <li><strong>Rapide et simple</strong> : En quelques clics, obtenez une sélection personnalisée de logements sans perdre des heures à chercher.</li>
        </ul>
      </>
    ),
  },
  {
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="var(--accent)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="12" cy="12" r="10" />
        <path d="M2 12h20M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z" />
      </svg>
    ),
    title: "Comment ça fonctionne ?",
    content: (
      <>
        <p style={{ lineHeight: 1.8, marginBottom: "12px" }}>
          AirSearch utilise une technologie de pointe pour vous offrir la meilleure expérience
          de recherche possible :
        </p>
        <ul style={{ paddingLeft: "20px", display: "flex", flexDirection: "column", gap: "8px" }}>
          <li><strong>Intelligence artificielle</strong> : Notre algorithme analyse votre recherche en langage naturel et comprend précisément ce que vous cherchez.</li>
          <li><strong>Recherche en temps réel</strong> : Nous interrogeons plusieurs plateformes simultanément pour vous garantir les informations les plus à jour.</li>
          <li><strong>Analyse comparative</strong> : Notre technologie compare les prix, les équipements, les avis et la localisation pour vous présenter les meilleures options.</li>
          <li><strong>Recommandations personnalisées</strong> : Recevez des conseils adaptés à votre destination, votre budget et vos préférences.</li>
        </ul>
      </>
    ),
  },
  {
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="var(--accent)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
      </svg>
    ),
    title: "Transparence et confidentialité",
    content: (
      <>
        <p style={{ lineHeight: 1.8, marginBottom: "12px" }}>
          Votre confiance est notre priorité. Voici nos engagements :
        </p>
        <ul style={{ paddingLeft: "20px", display: "flex", flexDirection: "column", gap: "8px" }}>
          <li>Nous ne collectons aucune donnée personnelle sans votre consentement</li>
          <li>Nous ne vendons ni ne partageons vos informations avec des tiers</li>
          <li>Aucune inscription n&apos;est requise pour utiliser notre service</li>
          <li>Les liens vers les plateformes sont directs et transparents, sans tracking caché</li>
        </ul>
      </>
    ),
  },
  {
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="var(--accent)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="12" cy="12" r="3" />
        <path d="M12 1v6M12 17v6M4.22 4.22l4.24 4.24M15.54 15.54l4.24 4.24M1 12h6M17 12h6M4.22 19.78l4.24-4.24M15.54 8.46l4.24-4.24" />
      </svg>
    ),
    title: "L'avenir d'AirSearch",
    content: (
      <p style={{ lineHeight: 1.8 }}>
        AirSearch est en constante évolution. Nous travaillons continuellement à améliorer notre
        service en ajoutant de nouvelles plateformes, en affinant nos algorithmes et en développant
        de nouvelles fonctionnalités pour rendre votre recherche encore plus simple et efficace.
        Votre feedback nous aide à progresser, n&apos;hésitez pas à nous contacter pour partager
        vos suggestions.
      </p>
    ),
  },
  {
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="var(--accent)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
        <polyline points="22,6 12,13 2,6" />
      </svg>
    ),
    title: "Contactez-nous",
    content: (
      <>
        <p style={{ lineHeight: 1.8, marginBottom: "12px" }}>
          Une question ? Une suggestion ? Nous sommes à votre écoute.
        </p>
        <p style={{ lineHeight: 1.8 }}>
          Email : <strong style={{ color: "var(--accent)" }}>contact@airsearch.fr</strong>
        </p>
        <p style={{ lineHeight: 1.8, marginTop: "12px", fontSize: "0.9rem", color: "var(--text-tertiary)" }}>
          Nous nous efforçons de répondre à tous les messages dans les 48 heures.
        </p>
      </>
    ),
  },
];

export default function AProposPage() {
  return (
    <LegalLayout
      breadcrumb="À propos"
      title="À propos d'AirSearch"
      description="Découvrez notre mission, notre technologie et notre engagement à simplifier votre recherche de location de vacances."
      sections={SECTIONS}
    />
  );
}
