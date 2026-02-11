"use client";

import { useState, useEffect } from "react";
import LottieAnimation from "@/components/LottieAnimation";

const ROTATING_TEXTS = [
  "Analyse des annonces...",
  "Comparaison des prix...",
  "Vérification des disponibilités...",
  "Sélection des meilleures options...",
];

const STAGE_LABELS: Record<string, string> = {
  scraping: "Analyse des plateformes...",
  websearch: "Recherche web IA...",
  analyzing: "Analyse des résultats...",
};

interface LoadingStateProps {
  progress?: {
    stage: string;
    message: string;
    percent: number;
  } | null;
}

export default function LoadingState({ progress }: LoadingStateProps) {
  const [textIndex, setTextIndex] = useState(0);

  useEffect(() => {
    if (progress) return;
    const interval = setInterval(() => {
      setTextIndex((prev) => (prev + 1) % ROTATING_TEXTS.length);
    }, 2500);
    return () => clearInterval(interval);
  }, [progress]);

  const hasProgress = progress != null;

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
          {hasProgress ? (
            <div
              style={{
                background: "var(--accent)",
                width: `${progress.percent}%`,
                height: "100%",
                borderRadius: "var(--radius-chip)",
                transition: "width 0.5s ease",
              }}
            />
          ) : (
            <div
              className="absolute inset-0"
              style={{
                background: "var(--accent)",
                width: "60%",
                borderRadius: "var(--radius-chip)",
                animation: "progress 2s ease-in-out infinite",
              }}
            />
          )}
        </div>

        {/* Status text */}
        {hasProgress ? (
          <div className="flex flex-col items-center gap-1">
            <p
              className="text-sm animate-fade-in"
              style={{
                color: "var(--text-primary)",
                fontWeight: 500,
                height: "20px",
              }}
            >
              {progress.message}
            </p>
            <p
              className="text-xs"
              style={{
                color: "var(--text-secondary)",
                fontWeight: 400,
              }}
            >
              {STAGE_LABELS[progress.stage] || progress.stage}
            </p>
          </div>
        ) : (
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
        )}
      </div>

      {/* Progress bar keyframes (only needed for fallback animation) */}
      {!hasProgress && (
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
      )}
    </div>
  );
}
