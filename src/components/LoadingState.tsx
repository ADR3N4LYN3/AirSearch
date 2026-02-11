"use client";

import { useState, useEffect } from "react";
import LottieAnimation from "@/components/LottieAnimation";
import SkeletonCard from "@/components/SkeletonCard";

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
      role="status"
      aria-live="polite"
      aria-busy="true"
    >
      <span className="sr-only">Recherche en cours, veuillez patienter</span>
      {/* Main Loading Indicator */}
      <div className="flex flex-col items-center gap-6">
        {/* Animated airplane */}
        <div style={{ width: "120px", height: "120px" }}>
          <LottieAnimation
            src="/animations/airplane.lottie"
            loop
            autoplay
            speed={1}
            style={{ width: "100%", height: "100%" }}
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
            Notre technologie analyse le web pour vous
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
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {[0, 1, 2, 3, 4].map((i) => (
            <SkeletonCard key={i} index={i} />
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
