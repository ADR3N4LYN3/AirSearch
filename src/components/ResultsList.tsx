"use client";

import type { SearchResponse } from "@/lib/types";
import ResultCard from "./ResultCard";

interface ResultsListProps {
  data: NonNullable<SearchResponse["data"]>;
  onReset: () => void;
}

export default function ResultsList({ data, onReset }: ResultsListProps) {
  const resultCount = data.results.length;

  return (
    <div className="flex flex-col gap-8 animate-fade-in w-full">
      {/* Results Header */}
      <div className="flex flex-col items-center gap-4 text-center">
        <div>
          <h2
            className="text-xl sm:text-2xl font-semibold mb-1"
            style={{
              color: "var(--text-primary)",
              fontFamily: "var(--font-nunito), sans-serif",
              letterSpacing: "-0.02em",
            }}
          >
            {resultCount} {resultCount === 1 ? "logement trouvé" : "logements trouvés"}
          </h2>
          <p className="text-sm" style={{ color: "var(--text-secondary)" }}>
            Résultats personnalisés par IA
          </p>
        </div>

        <button
          type="button"
          onClick={onReset}
          className="inline-flex items-center gap-2.5 cursor-pointer transition-all duration-200 hover:opacity-90 active:scale-[0.98]"
          style={{
            padding: "16px 32px",
            fontSize: "1rem",
            fontWeight: 600,
            background: "var(--accent-gradient)",
            color: "#fff",
            border: "none",
            borderRadius: "var(--radius-full)",
            boxShadow: "0 6px 20px rgba(255, 56, 92, 0.3)",
          }}
        >
          Nouvelle recherche
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
            <circle cx="11" cy="11" r="8" />
            <line x1="21" y1="21" x2="16.65" y2="16.65" />
          </svg>
        </button>
      </div>

      <div style={{ height: "1px", background: "var(--border)" }} />

      {/* Summary Card — clean with left accent */}
      <div
        className="relative"
        style={{
          background: "var(--surface)",
          borderRadius: "var(--radius-card)",
          padding: "20px 24px",
          borderLeft: "4px solid var(--accent)",
          boxShadow: "var(--shadow-sm)",
        }}
      >
        <div className="flex items-start gap-3">
          <div
            style={{
              width: "40px",
              height: "40px",
              borderRadius: "50%",
              background: "var(--accent-light)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              flexShrink: 0,
            }}
          >
            <svg
              width="20"
              height="20"
              viewBox="0 0 24 24"
              fill="none"
              stroke="var(--accent)"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <circle cx="11" cy="11" r="8" />
              <line x1="21" y1="21" x2="16.65" y2="16.65" />
            </svg>
          </div>
          <div className="flex-1">
            <h3
              className="text-sm font-semibold mb-1.5"
              style={{
                color: "var(--text-primary)",
                letterSpacing: "-0.01em",
              }}
            >
              Résumé de votre recherche
            </h3>
            <p
              className="text-sm leading-relaxed"
              style={{
                color: "var(--text-secondary)",
                lineHeight: 1.65,
              }}
            >
              {data.summary}
            </p>
          </div>
        </div>
      </div>

      {/* Results Grid — 2 columns like Airbnb */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {data.results.map((result, index) => (
          <ResultCard key={index} result={result} index={index} />
        ))}
      </div>

      {/* Tips Card — dark mode compatible */}
      {data.tips && (
        <div
          className="tips-card"
          style={{
            borderRadius: "var(--radius-card)",
            padding: "20px 24px",
          }}
        >
          <div className="flex items-start gap-3.5">
            <div
              className="tips-card-icon-bg"
              style={{
                width: "40px",
                height: "40px",
                borderRadius: "50%",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                flexShrink: 0,
              }}
            >
              <svg
                className="tips-card-icon"
                width="20"
                height="20"
                viewBox="0 0 24 24"
                fill="none"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M9 18h6" />
                <path d="M10 22h4" />
                <path d="M12 2a7 7 0 0 0-4 12.7V17h8v-2.3A7 7 0 0 0 12 2z" />
              </svg>
            </div>
            <div className="flex-1">
              <h4
                className="text-sm font-semibold mb-1.5"
                style={{
                  color: "var(--text-primary)",
                  letterSpacing: "-0.01em",
                }}
              >
                Conseils de recherche
              </h4>
              <p
                className="text-sm leading-relaxed"
                style={{
                  color: "var(--text-secondary)",
                  lineHeight: 1.65,
                }}
              >
                {data.tips}
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
