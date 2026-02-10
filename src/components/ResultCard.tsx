"use client";

import type { SearchResult } from "@/lib/types";
import { addAffiliateParams, trackAffiliateClick } from "@/lib/affiliate";

const PLATFORM_COLORS: Record<string, { bg: string; text: string }> = {
  "Airbnb": { bg: "#FF385C", text: "#FFFFFF" },
  "Booking.com": { bg: "#003580", text: "#FFFFFF" },
  "Abritel": { bg: "#0E4D92", text: "#FFFFFF" },
  "Vrbo": { bg: "#1A4480", text: "#FFFFFF" },
  "Expedia": { bg: "#FFCC00", text: "#1A1A1A" },
  "Hotels.com": { bg: "#D32F2F", text: "#FFFFFF" },
  "TripAdvisor": { bg: "#34E0A1", text: "#1A1A1A" },
};

interface ResultCardProps {
  result: SearchResult;
  index: number;
}

export default function ResultCard({ result, index }: ResultCardProps) {
  const platformStyle = PLATFORM_COLORS[result.platform] || { bg: "var(--text-secondary)", text: "#FFFFFF" };

  // 💰 Transformer l'URL en lien affilié
  const affiliateUrl = addAffiliateParams(result.url, result.platform);

  // Fonction pour tracker le clic et ouvrir le lien
  const handleAffiliateClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.stopPropagation();

    // Enregistrer le clic pour analytics (non bloquant)
    if (affiliateUrl) {
      trackAffiliateClick(result.platform, affiliateUrl, {
        title: result.title,
        location: result.location,
        price: result.price,
      });
    }
  };

  return (
    <article
      className="animate-fade-slide-up group"
      style={{
        animationDelay: `${index * 0.08}s`,
        background: "var(--surface)",
        borderRadius: "var(--radius-card)",
        overflow: "hidden",
        border: "1px solid var(--border)",
        boxShadow: "var(--shadow-sm)",
        transition: "box-shadow 0.25s ease, transform 0.25s ease",
        cursor: "pointer",
      }}
      onMouseEnter={(e) => {
        e.currentTarget.style.boxShadow = "var(--shadow-card-hover)";
        e.currentTarget.style.transform = "translateY(-4px)";
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.boxShadow = "var(--shadow-sm)";
        e.currentTarget.style.transform = "translateY(0)";
      }}
    >
      {/* Image placeholder — Airbnb style */}
      <div
        className="relative w-full"
        style={{
          height: "clamp(180px, 30vw, 240px)",
          background:
            "linear-gradient(135deg, #FFE8E0 0%, #FFD4CC 40%, #FFC2B8 70%, #FFB4A8 100%)",
          position: "relative",
        }}
      >
        {/* Decorative overlay to simulate property photo */}
        <div
          className="absolute inset-0"
          style={{
            background:
              "radial-gradient(ellipse at 30% 40%, rgba(255, 255, 255, 0.3) 0%, transparent 60%), radial-gradient(ellipse at 70% 70%, rgba(255, 180, 168, 0.4) 0%, transparent 50%)",
          }}
        />

        {/* House icon placeholder */}
        <div
          className="absolute inset-0 flex items-center justify-center"
          style={{ opacity: 0.2 }}
        >
          <svg
            width="80"
            height="80"
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M3 21V10l9-7 9 7v11a1 1 0 0 1-1 1H4a1 1 0 0 1-1-1z"
              stroke="white"
              strokeWidth="1.5"
              strokeLinejoin="round"
              fill="rgba(255, 255, 255, 0.3)"
            />
            <path
              d="M9 21v-6h6v6"
              stroke="white"
              strokeWidth="1.5"
              strokeLinejoin="round"
            />
          </svg>
        </div>

        {/* Platform badge */}
        <span
          className="absolute top-3 left-3 px-2.5 py-1 text-xs font-semibold"
          style={{
            background: platformStyle.bg,
            color: platformStyle.text,
            borderRadius: "6px",
            fontSize: "11px",
            letterSpacing: "0.02em",
            boxShadow: "0 2px 4px rgba(0,0,0,0.15)",
          }}
        >
          {result.platform}
        </span>

        {/* Wishlist heart button — Airbnb style */}
        <button
          type="button"
          className="absolute top-3 right-3 w-8 h-8 flex items-center justify-center transition-all"
          style={{
            background: "rgba(255, 255, 255, 0.9)",
            borderRadius: "50%",
            border: "1px solid rgba(0, 0, 0, 0.08)",
            backdropFilter: "blur(8px)",
            opacity: 0,
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.background = "rgba(255, 255, 255, 1)";
            e.currentTarget.style.transform = "scale(1.1)";
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.background = "rgba(255, 255, 255, 0.9)";
            e.currentTarget.style.transform = "scale(1)";
          }}
          onClick={(e) => {
            e.stopPropagation();
          }}
          aria-label="Ajouter aux favoris"
        >
          <svg
            width="16"
            height="16"
            viewBox="0 0 24 24"
            fill="none"
            stroke="var(--text-primary)"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" />
          </svg>
        </button>

        {/* Show heart on card hover */}
        <style jsx>{`
          article:hover button {
            opacity: 1;
          }
        `}</style>
      </div>

      {/* Content */}
      <div style={{ padding: "16px 20px 20px 20px" }}>
        {/* Location + Price Row */}
        <div className="flex items-start justify-between gap-3 mb-2">
          <div className="flex-1 min-w-0">
            <h3
              className="text-base font-semibold truncate mb-1"
              style={{
                color: "var(--text-primary)",
                letterSpacing: "-0.01em",
              }}
            >
              {result.title}
            </h3>
            <p
              className="text-sm flex items-center gap-1.5 truncate"
              style={{ color: "var(--text-secondary)" }}
            >
              <svg
                width="12"
                height="12"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                style={{ opacity: 0.6, flexShrink: 0 }}
              >
                <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" />
                <circle cx="12" cy="10" r="3" />
              </svg>
              {result.location}
            </p>
          </div>

          {/* Price */}
          <div className="shrink-0 text-right">
            <span
              className="text-base font-bold block"
              style={{
                color: "var(--text-primary)",
                letterSpacing: "-0.01em",
              }}
            >
              {result.price}
            </span>
            <span
              className="text-xs"
              style={{ color: "var(--text-secondary)" }}
            >
              par nuit
            </span>
          </div>
        </div>

        {/* Rating */}
        {result.rating != null && (
          <div className="flex items-center gap-1.5 mb-3">
            <svg
              width="14"
              height="14"
              viewBox="0 0 24 24"
              fill="#FFB800"
              xmlns="http://www.w3.org/2000/svg"
              style={{ flexShrink: 0 }}
            >
              <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
            </svg>
            <span
              className="text-sm font-semibold"
              style={{ color: "var(--text-primary)" }}
            >
              {result.rating.toFixed(1)}
            </span>
            {result.reviewCount != null && (
              <span
                className="text-xs"
                style={{ color: "var(--text-tertiary)" }}
              >
                ({result.reviewCount} avis)
              </span>
            )}
          </div>
        )}

        {/* Description */}
        <p
          className="text-sm leading-relaxed mb-3 line-clamp-2"
          style={{
            color: "var(--text-secondary)",
            lineHeight: 1.6,
          }}
        >
          {result.description}
        </p>

        {/* Highlights — Airbnb amenity pills */}
        {result.highlights && result.highlights.length > 0 && (
          <div className="flex flex-wrap gap-1.5 mb-4">
            {result.highlights.slice(0, 4).map((highlight, i) => (
              <span
                key={i}
                className="inline-flex items-center px-2.5 py-1 text-xs"
                style={{
                  background: "var(--bg-secondary)",
                  color: "var(--text-secondary)",
                  borderRadius: "6px",
                  fontWeight: 500,
                  fontSize: "11px",
                }}
              >
                {highlight}
              </span>
            ))}
            {result.highlights.length > 4 && (
              <span
                className="inline-flex items-center px-2.5 py-1 text-xs"
                style={{
                  background: "transparent",
                  color: "var(--text-secondary)",
                  fontWeight: 500,
                  fontSize: "11px",
                }}
              >
                +{result.highlights.length - 4} autres
              </span>
            )}
          </div>
        )}

        {/* Platform link */}
        {affiliateUrl && (
          <a
            href={affiliateUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 text-sm font-semibold transition-all"
            style={{
              color: platformStyle.bg,
              textDecoration: "none",
              padding: "6px 12px",
              borderRadius: "8px",
              border: `1.5px solid ${platformStyle.bg}`,
              background: "transparent",
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.background = platformStyle.bg;
              e.currentTarget.style.color = platformStyle.text;
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.background = "transparent";
              e.currentTarget.style.color = platformStyle.bg;
            }}
            onClick={handleAffiliateClick}
          >
            Voir sur {result.platform}
            <svg
              width="14"
              height="14"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M7 17L17 7M7 7h10v10" />
            </svg>
          </a>
        )}
      </div>
    </article>
  );
}
