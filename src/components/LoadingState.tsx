"use client";

import { useState, useEffect, Fragment } from "react";
import LottieAnimation from "@/components/LottieAnimation";
import { Search, Globe, BarChart3, Check } from "lucide-react";

const ROTATING_TEXTS = [
  "Analyse des annonces...",
  "Comparaison des prix...",
  "Vérification des disponibilités...",
  "Sélection des meilleures options...",
];

const STEPS = [
  { stage: "scraping", label: "Plateformes", icon: Search },
  { stage: "websearch", label: "Recherche web", icon: Globe },
  { stage: "analyzing", label: "Analyse", icon: BarChart3 },
] as const;

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
  const currentStageIndex = hasProgress
    ? STEPS.findIndex((s) => s.stage === progress.stage)
    : -1;

  return (
    <div
      className="flex flex-col items-center py-16 gap-12 animate-fade-in w-full"
      style={{ background: "var(--bg)" }}
      role="status"
      aria-live="polite"
      aria-busy="true"
    >
      <span className="sr-only">Recherche en cours, veuillez patienter</span>

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

        {/* Title */}
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
          <p className="text-sm" style={{ color: "var(--text-secondary)" }}>
            Notre technologie analyse le web pour vous
          </p>
        </div>

        {/* Stepper or fallback progress bar */}
        {hasProgress ? (
          <div
            className="flex items-start justify-center"
            style={{ width: "320px" }}
          >
            {STEPS.map((step, i) => {
              const isCompleted = i < currentStageIndex;
              const isActive = i === currentStageIndex;
              const Icon = isCompleted ? Check : step.icon;

              return (
                <Fragment key={step.stage}>
                  <div
                    className="flex flex-col items-center gap-2"
                    style={{ minWidth: "72px" }}
                  >
                    <div
                      style={{
                        width: "40px",
                        height: "40px",
                        borderRadius: "50%",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        background:
                          isCompleted || isActive
                            ? "var(--accent)"
                            : "var(--bg-secondary)",
                        border: `2px solid ${
                          isCompleted || isActive
                            ? "var(--accent)"
                            : "var(--border)"
                        }`,
                        transition: "all 0.4s ease",
                      }}
                    >
                      <Icon
                        size={18}
                        style={{
                          color:
                            isCompleted || isActive
                              ? "white"
                              : "var(--text-secondary)",
                          transition: "color 0.4s ease",
                        }}
                      />
                    </div>
                    <span
                      className="text-xs text-center"
                      style={{
                        color: isActive
                          ? "var(--text-primary)"
                          : "var(--text-secondary)",
                        fontWeight: isActive ? 600 : 400,
                        transition: "all 0.3s ease",
                      }}
                    >
                      {step.label}
                    </span>
                  </div>

                  {i < STEPS.length - 1 && (
                    <div
                      style={{
                        flex: 1,
                        height: "2px",
                        marginTop: "19px",
                        background: isCompleted
                          ? "var(--accent)"
                          : "var(--border)",
                        transition: "background 0.4s ease",
                      }}
                    />
                  )}
                </Fragment>
              );
            })}
          </div>
        ) : (
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
        )}

        {/* Status message */}
        {hasProgress ? (
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

      {/* Fallback animation keyframes */}
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
