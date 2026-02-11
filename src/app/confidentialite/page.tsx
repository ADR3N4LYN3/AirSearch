"use client";

import LegalLayout, { type LegalSection } from "@/components/LegalLayout";

const SECTIONS: LegalSection[] = [
  {
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="var(--accent)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
        <polyline points="7 10 12 15 17 10" />
        <line x1="12" y1="15" x2="12" y2="3" />
      </svg>
    ),
    title: "Données collectées",
    content: (
      <>
        <p style={{ lineHeight: 1.8, marginBottom: "12px" }}>
          AirSearch collecte uniquement les informations nécessaires au fonctionnement du service :
        </p>
        <ul style={{ paddingLeft: "20px", display: "flex", flexDirection: "column", gap: "8px", marginBottom: "12px" }}>
          <li>
            <strong>Critères de recherche</strong> : destination, dates, nombre de voyageurs,
            budget, préférences d&apos;équipements et notes supplémentaires que vous saisissez
          </li>
          <li>
            <strong>Données techniques</strong> : adresse IP (pour le rate limiting), type
            de navigateur, système d&apos;exploitation
          </li>
          <li>
            <strong>Cookies techniques</strong> : préférence de thème (clair/sombre) stockée
            localement dans votre navigateur
          </li>
        </ul>
        <p style={{ lineHeight: 1.8 }}>
          Nous ne collectons <strong>aucune donnée personnelle</strong> (nom, email, téléphone)
          car aucune inscription n&apos;est requise pour utiliser le service.
        </p>
      </>
    ),
  },
  {
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="var(--accent)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <polyline points="22 12 18 12 15 21 9 3 6 12 2 12" />
      </svg>
    ),
    title: "Utilisation des données",
    content: (
      <>
        <p style={{ lineHeight: 1.8, marginBottom: "12px" }}>
          Les données collectées sont utilisées uniquement pour :
        </p>
        <ul style={{ paddingLeft: "20px", display: "flex", flexDirection: "column", gap: "8px" }}>
          <li>Fournir les résultats de recherche personnalisés via notre fournisseur technologique</li>
          <li>Prévenir les abus et le spam via rate limiting basé sur l&apos;IP</li>
          <li>Améliorer la qualité et la pertinence du service</li>
        </ul>
      </>
    ),
  },
  {
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="var(--accent)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
        <circle cx="9" cy="7" r="4" />
        <path d="M23 21v-2a4 4 0 0 0-3-3.87" />
        <path d="M16 3.13a4 4 0 0 1 0 7.75" />
      </svg>
    ),
    title: "Partage des données",
    content: (
      <>
        <p style={{ lineHeight: 1.8, marginBottom: "12px" }}>
          Vos critères de recherche sont transmis à notre <strong>fournisseur technologique</strong> pour
          générer les résultats. Ce fournisseur est soumis à sa propre politique de confidentialité
          et s&apos;engage à ne pas utiliser vos données à des fins autres que le traitement de votre requête.
        </p>
        <p style={{ lineHeight: 1.8 }}>
          <strong>Nous ne vendons ni ne louons vos données à des tiers.</strong>
        </p>
      </>
    ),
  },
  {
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="var(--accent)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="12" cy="12" r="10" />
        <polyline points="12 6 12 12 16 14" />
      </svg>
    ),
    title: "Conservation des données",
    content: (
      <>
        <p style={{ lineHeight: 1.8, marginBottom: "12px" }}>
          Les données de rate limiting (adresse IP) sont conservées en mémoire pendant 1 minute
          maximum et supprimées automatiquement.
        </p>
        <p style={{ lineHeight: 1.8 }}>
          Les critères de recherche ne sont <strong>pas stockés</strong> sur nos serveurs après
          traitement de votre requête.
        </p>
      </>
    ),
  },
  {
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="var(--accent)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
      </svg>
    ),
    title: "Vos droits (RGPD)",
    content: (
      <>
        <p style={{ lineHeight: 1.8, marginBottom: "12px" }}>
          Conformément au Règlement Général sur la Protection des Données (RGPD), vous disposez
          des droits suivants :
        </p>
        <ul style={{ paddingLeft: "20px", display: "flex", flexDirection: "column", gap: "8px", marginBottom: "12px" }}>
          <li><strong>Droit d&apos;accès</strong> : obtenir une copie de vos données</li>
          <li><strong>Droit de rectification</strong> : corriger vos données inexactes</li>
          <li><strong>Droit à l&apos;effacement</strong> : supprimer vos données</li>
          <li><strong>Droit d&apos;opposition</strong> : refuser le traitement de vos données</li>
          <li><strong>Droit à la portabilité</strong> : récupérer vos données dans un format structuré</li>
        </ul>
        <p style={{ lineHeight: 1.8 }}>
          Pour exercer ces droits, contactez-nous à : <strong>contact@airsearch.fr</strong>
        </p>
      </>
    ),
  },
  {
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="var(--accent)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M12 2a10 10 0 1 0 10 10 4 4 0 0 1-5-5 4 4 0 0 1-5-5" />
        <path d="M8.5 8.5v.01" />
        <path d="M16 15.5v.01" />
        <path d="M12 12v.01" />
        <path d="M11 17v.01" />
        <path d="M7 14v.01" />
      </svg>
    ),
    title: "Cookies",
    content: (
      <>
        <p style={{ lineHeight: 1.8, marginBottom: "12px" }}>
          AirSearch utilise uniquement un cookie technique (localStorage) pour stocker votre
          préférence de thème (mode clair ou sombre). Ce cookie est strictement nécessaire au
          fonctionnement du service et ne contient aucune donnée personnelle.
        </p>
        <p style={{ lineHeight: 1.8 }}>
          Nous n&apos;utilisons <strong>aucun cookie publicitaire ou de tracking</strong>.
        </p>
      </>
    ),
  },
  {
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="var(--accent)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <rect x="3" y="11" width="18" height="11" rx="2" ry="2" />
        <path d="M7 11V7a5 5 0 0 1 10 0v4" />
      </svg>
    ),
    title: "Sécurité",
    content: (
      <>
        <p style={{ lineHeight: 1.8, marginBottom: "12px" }}>
          Nous mettons en œuvre des mesures de sécurité techniques appropriées pour protéger
          vos données contre tout accès, modification, divulgation ou destruction non autorisé :
        </p>
        <ul style={{ paddingLeft: "20px", display: "flex", flexDirection: "column", gap: "8px" }}>
          <li>Chiffrement HTTPS pour toutes les communications</li>
          <li>Headers de sécurité (CSP, HSTS, X-Frame-Options)</li>
          <li>Rate limiting pour prévenir les abus</li>
          <li>Aucun stockage de données sensibles</li>
        </ul>
      </>
    ),
  },
  {
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="var(--accent)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7" />
        <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z" />
      </svg>
    ),
    title: "Modifications",
    content: (
      <p style={{ lineHeight: 1.8 }}>
        Nous nous réservons le droit de modifier cette politique de confidentialité à tout
        moment. Les modifications seront publiées sur cette page avec une date de mise à jour.
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
        Pour toute question concernant cette politique de confidentialité ou pour exercer
        vos droits RGPD : <strong>contact@airsearch.fr</strong>
      </p>
    ),
  },
];

export default function ConfidentialitePage() {
  return (
    <LegalLayout
      breadcrumb="Confidentialité"
      title="Politique de confidentialité"
      description="Découvrez comment AirSearch protège vos données et respecte votre vie privée."
      sections={SECTIONS}
    />
  );
}
