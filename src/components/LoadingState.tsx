"use client";

import { useState, useEffect } from "react";

const ROTATING_TEXTS = [
  "Analyse des annonces...",
  "Comparaison des prix...",
  "Vérification des disponibilités...",
  "Sélection des meilleures options...",
];

export default function LoadingState() {
  const [textIndex, setTextIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setTextIndex((prev) => (prev + 1) % ROTATING_TEXTS.length);
    }, 2500);
    return () => clearInterval(interval);
  }, []);

  return (
    <div
      className="flex flex-col items-center py-16 gap-12 animate-fade-in w-full"
      style={{ background: "var(--bg)" }}
    >
      {/* Main Loading Indicator */}
      <div className="flex flex-col items-center gap-6">
        {/* Animated house icon */}
        <div
          className="relative"
          style={{
            width: "80px",
            height: "80px",
            borderRadius: "50%",
            background: "var(--accent-light)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <svg
            width="40"
            height="40"
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            className="animate-pulse-soft"
          >
            <path
              d="M3 21V10l9-7 9 7v11a1 1 0 0 1-1 1H4a1 1 0 0 1-1-1z"
              stroke="var(--accent)"
              strokeWidth="2"
              strokeLinejoin="round"
              fill="var(--accent)"
              fillOpacity="0.2"
            />
            <path
              d="M9 21v-6h6v6"
              stroke="var(--accent)"
              strokeWidth="2"
              strokeLinejoin="round"
            />
          </svg>

          {/* Spinning ring */}
          <div
            className="absolute inset-0 animate-spin"
            style={{
              border: "3px solid transparent",
              borderTopColor: "var(--accent)",
              borderRadius: "50%",
              animationDuration: "1.5s",
            }}
          />
        </div>

        {/* Text */}
        <div className="flex flex-col items-center gap-2">
          <p
            className="text-xl font-semibold"
            style={{
              color: "var(--text-primary)",
              fontFamily: "var(--font-nunito), sans-serif",
              letterSpacing: "-0.01em",
            }}
          >
            Recherche en cours...
          </p>
          <p
            className="text-sm"
            style={{ color: "var(--text-secondary)" }}
          >
            Notre IA analyse le web pour vous
          </p>
        </div>

        {/* Progress bar */}
        <div
          className="overflow-hidden relative"
          style={{
            width: "280px",
            height: "4px",
            borderRadius: "var(--radius-chip)",
            background: "var(--bg-secondary)",
          }}
        >
          <div
            className="absolute inset-0"
            style={{
              background: "var(--accent)",
              width: "60%",
              borderRadius: "var(--radius-chip)",
              animation: "progress 2s ease-in-out infinite",
            }}
          />
        </div>

        {/* Rotating status text */}
        <p
          key={textIndex}
          className="text-sm animate-fade-in"
          style={{
            color: "var(--text-secondary)",
            fontWeight: 500,
            height: "20px",
          }}
        >
          {ROTATING_TEXTS[textIndex]}
        </p>
      </div>

      {/* Skeleton Cards — Airbnb style previews */}
      <div className="w-full max-w-6xl px-4">
        <p
          className="text-xs uppercase tracking-wide mb-4 text-center"
          style={{ color: "var(--text-tertiary)" }}
        >
          Préparation des résultats
        </p>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {[0, 1].map((i) => (
            <div
              key={i}
              className="animate-fade-in"
              style={{
                background: "var(--surface)",
                borderRadius: "var(--radius-card)",
                overflow: "hidden",
                border: "1px solid var(--border)",
                animationDelay: `${i * 0.15}s`,
              }}
            >
              {/* Image skeleton */}
              <div
                className="w-full skeleton"
                style={{ height: "240px" }}
              />

              {/* Content skeleton */}
              <div style={{ padding: "16px 20px 20px 20px" }}>
                {/* Title + Price row */}
                <div className="flex items-start justify-between gap-3 mb-3">
                  <div className="flex-1">
                    <div
                      className="skeleton mb-2"
                      style={{ width: "70%", height: "18px" }}
                    />
                    <div
                      className="skeleton"
                      style={{ width: "50%", height: "14px" }}
                    />
                  </div>
                  <div
                    className="skeleton"
                    style={{ width: "60px", height: "18px" }}
                  />
                </div>

                {/* Description skeleton */}
                <div className="mb-3 space-y-2">
                  <div
                    className="skeleton"
                    style={{ width: "100%", height: "12px" }}
                  />
                  <div
                    className="skeleton"
                    style={{ width: "85%", height: "12px" }}
                  />
                </div>

                {/* Highlights skeleton */}
                <div className="flex gap-2 mb-4">
                  <div
                    className="skeleton"
                    style={{ width: "60px", height: "24px", borderRadius: "6px" }}
                  />
                  <div
                    className="skeleton"
                    style={{ width: "70px", height: "24px", borderRadius: "6px" }}
                  />
                  <div
                    className="skeleton"
                    style={{ width: "55px", height: "24px", borderRadius: "6px" }}
                  />
                </div>

                {/* Link skeleton */}
                <div
                  className="skeleton"
                  style={{ width: "120px", height: "16px" }}
                />
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Progress bar keyframes */}
      <style jsx>{`
        @keyframes progress {
          0% {
            transform: translateX(-100%);
          }
          50% {
            transform: translateX(100%);
          }
          100% {
            transform: translateX(200%);
          }
        }
      `}</style>
    </div>
  );
}
