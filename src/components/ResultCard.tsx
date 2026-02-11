"use client";

import { memo, useCallback } from "react";
import Image from "next/image";
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

function arePropsEqual(prev: ResultCardProps, next: ResultCardProps) {
  return (
    prev.index === next.index &&
    prev.result.title === next.result.title &&
    prev.result.url === next.result.url &&
    prev.result.price === next.result.price &&
    prev.result.platform === next.result.platform &&
    prev.result.rating === next.result.rating
  );
}

export default memo(function ResultCard({ result, index }: ResultCardProps) {
  const platformStyle = PLATFORM_COLORS[result.platform] || { bg: "var(--text-secondary)", text: "#FFFFFF" };

  const affiliateUrl = addAffiliateParams(result.url, result.platform);

  const handleAffiliateClick = useCallback((e: React.MouseEvent<HTMLAnchorElement>) => {
    e.stopPropagation();

    if (affiliateUrl) {
      trackAffiliateClick(result.platform, affiliateUrl, {
        title: result.title,
        location: result.location,
        price: result.price,
      });
    }
  }, [affiliateUrl, result.platform, result.title, result.location, result.price]);

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
      {/* Property image or placeholder */}
      <div
        className="relative w-full"
        style={{
          height: "clamp(180px, 30vw, 240px)",
          background: result.image
            ? "var(--bg-secondary)"
            : "linear-gradient(135deg, #FFE8E0 0%, #FFD4CC 40%, #FFC2B8 70%, #FFB4A8 100%)",
          position: "relative",
        }}
      >
        {result.image ? (
          <Image
            src={result.image}
            alt={result.title}
            fill
            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
            style={{ objectFit: "cover" }}
            unoptimized
          />
        ) : (
          <>
            <div
              className="absolute inset-0"
              style={{
                background:
                  "radial-gradient(ellipse at 30% 40%, rgba(255, 255, 255, 0.3) 0%, transparent 60%), radial-gradient(ellipse at 70% 70%, rgba(255, 180, 168, 0.4) 0%, transparent 50%)",
              }}
            />
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
          </>
        )}

        {/* Platform badge */}
        <span
          className="absolute top-3 left-3 font-bold"
          style={{
            background: platformStyle.bg,
            color: platformStyle.text,
            padding: "6px 14px",
            borderRadius: "var(--radius-input)",
            fontSize: "0.7rem",
            letterSpacing: "0.03em",
            textTransform: "uppercase",
            boxShadow: "0 2px 8px rgba(0,0,0,0.15)",
            zIndex: 1,
          }}
        >
          {result.platform}
        </span>

        {/* Wishlist heart button */}
        <button
          type="button"
          className="absolute top-3 right-3 w-8 h-8 flex items-center justify-center transition-all opacity-0 group-hover:opacity-100"
          style={{
            background: "rgba(255, 255, 255, 0.9)",
            borderRadius: "50%",
            border: "1px solid rgba(0, 0, 0, 0.08)",
            backdropFilter: "blur(8px)",
            zIndex: 1,
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
      </div>

      {/* Content */}
      <div className="flex flex-col items-center text-center" style={{ padding: "16px 20px 20px 20px" }}>
        {/* Location + Price Row */}
        <div className="flex items-start justify-between gap-3 mb-2 w-full">
          <div className="flex-1 min-w-0">
            <h3
              className="text-base font-semibold mb-1"
              style={{
                color: "var(--text-primary)",
                letterSpacing: "-0.01em",
                display: "-webkit-box",
                WebkitLineClamp: 2,
                WebkitBoxOrient: "vertical" as const,
                overflow: "hidden",
              }}
            >
              {result.title}
            </h3>
            <p
              className="text-sm flex items-center gap-1.5"
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
          <div className="shrink-0 text-right" style={{ maxWidth: "45%" }}>
            <span
              className="text-base font-bold block"
              style={{
                color: "var(--text-primary)",
                letterSpacing: "-0.01em",
                wordBreak: "break-word",
              }}
            >
              {result.price}
            </span>
            {result.price !== "Prix non disponible" && (
              <span
                className="text-xs"
                style={{ color: "var(--text-tertiary)" }}
              >
                prix estim\u00e9
              </span>
            )}
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
          className="text-sm leading-relaxed mb-3 w-full"
          style={{
            color: "var(--text-secondary)",
            lineHeight: 1.6,
            display: "-webkit-box",
            WebkitLineClamp: 3,
            WebkitBoxOrient: "vertical" as const,
            overflow: "hidden",
          }}
        >
          {result.description}
        </p>

        {/* Highlights */}
        {result.highlights && result.highlights.length > 0 && (
          <div className="flex flex-wrap justify-center gap-1.5 mb-4 w-full">
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
            className="inline-flex items-center gap-2 font-semibold transition-all duration-200 hover:opacity-90 active:scale-[0.98]"
            style={{
              color: "#fff",
              textDecoration: "none",
              marginTop: "8px",
              padding: "10px 20px",
              fontSize: "0.85rem",
              borderRadius: "var(--radius-full)",
              border: "none",
              background: platformStyle.bg,
              boxShadow: `0 4px 12px ${platformStyle.bg}40`,
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
              strokeWidth="2.5"
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
}, arePropsEqual);
