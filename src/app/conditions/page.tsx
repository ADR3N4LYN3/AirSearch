"use client";

import LegalLayout, { type LegalSection } from "@/components/LegalLayout";

const SECTIONS: LegalSection[] = [
  {
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="var(--accent)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" />
        <polyline points="22 4 12 14.01 9 11.01" />
      </svg>
    ),
    title: "Acceptation des conditions",
    content: (
      <p style={{ lineHeight: 1.8 }}>
        En utilisant AirSearch, vous acceptez les présentes conditions d&apos;utilisation.
        Si vous n&apos;acceptez pas ces conditions, veuillez ne pas utiliser ce service.
      </p>
    ),
  },
  {
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="var(--accent)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="11" cy="11" r="8" />
        <line x1="21" y1="21" x2="16.65" y2="16.65" />
      </svg>
    ),
    title: "Description du service",
    content: (
      <>
        <p style={{ lineHeight: 1.8, marginBottom: "12px" }}>
          AirSearch est un moteur de recherche intelligent propulsé par une technologie
          intelligente qui aide les utilisateurs à trouver des logements de vacances sur
          différentes plateformes (Airbnb, Booking.com, etc.).
        </p>
        <p style={{ lineHeight: 1.8 }}>
          AirSearch n&apos;est pas affilié à Airbnb, Inc. ou à toute autre plateforme de
          réservation. Nous ne gérons pas les réservations et ne sommes pas responsables
          des transactions effectuées sur les plateformes tierces.
        </p>
      </>
    ),
  },
  {
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="var(--accent)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
        <circle cx="12" cy="7" r="4" />
      </svg>
    ),
    title: "Utilisation du service",
    content: (
      <>
        <p style={{ lineHeight: 1.8, marginBottom: "12px" }}>
          Vous vous engagez à utiliser AirSearch de manière légale et conforme à toutes
          les lois et réglementations applicables. Il est interdit de :
        </p>
        <ul style={{ paddingLeft: "20px", display: "flex", flexDirection: "column", gap: "8px" }}>
          <li>Utiliser le service à des fins illégales ou frauduleuses</li>
          <li>Tenter de contourner les limitations de taux (rate limiting)</li>
          <li>Extraire ou copier automatiquement les données du service</li>
          <li>Utiliser le service pour spammer ou harceler d&apos;autres utilisateurs</li>
        </ul>
      </>
    ),
  },
  {
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="var(--accent)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z" />
        <line x1="12" y1="9" x2="12" y2="13" />
        <line x1="12" y1="17" x2="12.01" y2="17" />
      </svg>
    ),
    title: "Limitation de responsabilité",
    content: (
      <>
        <p style={{ lineHeight: 1.8, marginBottom: "12px" }}>
          AirSearch fournit les résultats de recherche &quot;en l&apos;état&quot; sans garantie
          d&apos;exactitude, de complétude ou de disponibilité. Nous ne sommes pas responsables :
        </p>
        <ul style={{ paddingLeft: "20px", display: "flex", flexDirection: "column", gap: "8px" }}>
          <li>Des erreurs ou inexactitudes dans les résultats de recherche</li>
          <li>Des dommages résultant de l&apos;utilisation ou de l&apos;impossibilité d&apos;utiliser le service</li>
          <li>Des transactions effectuées sur des plateformes tierces</li>
          <li>De la disponibilité ou de la qualité des logements présentés</li>
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
    title: "Propriété intellectuelle",
    content: (
      <p style={{ lineHeight: 1.8 }}>
        Tous les droits de propriété intellectuelle relatifs à AirSearch (design, code,
        logo, contenu) sont la propriété exclusive d&apos;AirSearch ou de ses concédants
        de licence.
      </p>
    ),
  },
  {
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="var(--accent)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7" />
        <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z" />
      </svg>
    ),
    title: "Modification des conditions",
    content: (
      <p style={{ lineHeight: 1.8 }}>
        Nous nous réservons le droit de modifier ces conditions à tout moment. Les
        modifications prendront effet dès leur publication sur cette page. Votre utilisation
        continue du service après la publication des modifications constitue votre acceptation
        de ces modifications.
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
    title: "Contact",
    content: (
      <p style={{ lineHeight: 1.8 }}>
        Pour toute question concernant ces conditions d&apos;utilisation, veuillez nous
        contacter à : <strong>contact@airsearch.fr</strong>
      </p>
    ),
  },
];

export default function ConditionsPage() {
  return (
    <LegalLayout
      breadcrumb="Conditions d'utilisation"
      title="Conditions d'utilisation"
      description="Règles et conditions encadrant l'utilisation du service AirSearch."
      sections={SECTIONS}
    />
  );
}
