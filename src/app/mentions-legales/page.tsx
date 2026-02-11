"use client";

import LegalLayout, { type LegalSection } from "@/components/LegalLayout";

const SECTIONS: LegalSection[] = [
  {
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="var(--accent)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
        <circle cx="12" cy="7" r="4" />
      </svg>
    ),
    title: "Éditeur du site",
    content: (
      <>
        <p style={{ lineHeight: 1.8, marginBottom: "12px" }}>
          <strong>Raison sociale</strong> : AirSearch
          <br />
          <strong>Adresse</strong> : [À compléter]
          <br />
          <strong>Email</strong> : contact@airsearch.fr
          <br />
          <strong>Directeur de la publication</strong> : [À compléter]
        </p>
      </>
    ),
  },
  {
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="var(--accent)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <rect x="2" y="2" width="20" height="8" rx="2" />
        <rect x="2" y="14" width="20" height="8" rx="2" />
        <line x1="6" y1="6" x2="6.01" y2="6" />
        <line x1="6" y1="18" x2="6.01" y2="18" />
      </svg>
    ),
    title: "Hébergement",
    content: (
      <>
        <p style={{ lineHeight: 1.8, marginBottom: "12px" }}>
          Ce site est hébergé par :
          <br />
          <strong>Vercel Inc.</strong>
          <br />
          340 S Lemon Ave #4133
          <br />
          Walnut, CA 91789, USA
          <br />
          Site web :{" "}
          <a
            href="https://vercel.com"
            target="_blank"
            rel="noopener noreferrer"
            style={{ color: "var(--accent)", fontWeight: 600 }}
          >
            vercel.com
          </a>
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
    title: "Propriété intellectuelle",
    content: (
      <>
        <p style={{ lineHeight: 1.8, marginBottom: "12px" }}>
          L&apos;ensemble du contenu de ce site (textes, images, vidéos, logos, icônes,
          graphismes, sons, logiciels) est la propriété exclusive d&apos;AirSearch ou de ses
          partenaires, et est protégé par les lois françaises et internationales relatives
          à la propriété intellectuelle.
        </p>
        <p style={{ lineHeight: 1.8 }}>
          Toute reproduction, représentation, modification, publication, transmission,
          dénaturation, totale ou partielle du site ou de son contenu, par quelque procédé
          que ce soit, sans l&apos;autorisation préalable et écrite d&apos;AirSearch, est
          strictement interdite et constitue un délit de contrefaçon.
        </p>
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
          AirSearch s&apos;efforce d&apos;assurer l&apos;exactitude et la mise à jour des
          informations diffusées sur ce site, mais ne peut garantir leur exactitude, leur
          complétude ou leur actualité.
        </p>
        <p style={{ lineHeight: 1.8, marginBottom: "12px" }}>
          AirSearch décline toute responsabilité :
        </p>
        <ul style={{ paddingLeft: "20px", display: "flex", flexDirection: "column", gap: "8px" }}>
          <li>Pour toute imprécision, inexactitude ou omission portant sur des informations disponibles sur le site</li>
          <li>Pour tout dommage résultant d&apos;une intrusion frauduleuse d&apos;un tiers ayant entraîné une modification des informations</li>
          <li>Pour tout dommage résultant de l&apos;utilisation du service ou de l&apos;impossibilité de l&apos;utiliser</li>
          <li>Pour les transactions effectuées sur des sites tiers (Airbnb, Booking.com, etc.)</li>
        </ul>
      </>
    ),
  },
  {
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="var(--accent)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71" />
        <path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71" />
      </svg>
    ),
    title: "Liens hypertextes",
    content: (
      <>
        <p style={{ lineHeight: 1.8, marginBottom: "12px" }}>
          Ce site peut contenir des liens vers d&apos;autres sites internet. AirSearch
          n&apos;exerce aucun contrôle sur ces sites et décline toute responsabilité quant
          à leur contenu.
        </p>
        <p style={{ lineHeight: 1.8 }}>
          La création de liens hypertextes vers le site airsearch.fr nécessite
          l&apos;autorisation préalable et écrite d&apos;AirSearch.
        </p>
      </>
    ),
  },
  {
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="var(--accent)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="12" cy="12" r="10" />
        <line x1="4.93" y1="4.93" x2="19.07" y2="19.07" />
      </svg>
    ),
    title: "Non-affiliation",
    content: (
      <>
        <p style={{ lineHeight: 1.8, marginBottom: "12px" }}>
          AirSearch n&apos;est pas affilié, associé, autorisé, approuvé ou de quelque manière
          que ce soit officiellement lié à Airbnb, Inc., Booking.com B.V., Abritel ou toute
          autre plateforme de réservation de logements.
        </p>
        <p style={{ lineHeight: 1.8 }}>
          Toutes les marques déposées, logos et noms de service mentionnés sur ce site sont
          la propriété de leurs propriétaires respectifs.
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
    title: "Droit applicable et juridiction",
    content: (
      <p style={{ lineHeight: 1.8 }}>
        Les présentes mentions légales sont régies par le droit français. En cas de litige
        et à défaut d&apos;accord amiable, le litige sera porté devant les tribunaux
        compétents français.
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
        Pour toute question concernant ces mentions légales, vous pouvez nous contacter
        à l&apos;adresse : <strong>contact@airsearch.fr</strong>
      </p>
    ),
  },
];

export default function MentionsLegalesPage() {
  return (
    <LegalLayout
      breadcrumb="Mentions légales"
      title="Mentions légales"
      description="Informations légales relatives au site AirSearch et à son éditeur."
      sections={SECTIONS}
    />
  );
}
