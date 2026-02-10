"use client";

import LottieAnimation from "@/components/LottieAnimation";

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <div
      className="min-h-screen flex items-center justify-center px-6"
      style={{ background: "var(--bg)" }}
    >
      <div className="text-center max-w-md">
        <div className="mx-auto mb-6" style={{ width: "200px", height: "200px" }}>
          <LottieAnimation
            src="/animations/error-404.json"
            loop
            autoplay
            speed={0.8}
            style={{ width: "100%", height: "100%" }}
          />
        </div>
        <h1
          className="text-2xl font-bold mb-3"
          style={{
            color: "var(--text-primary)",
            fontFamily: "var(--font-nunito), sans-serif",
          }}
        >
          Oups, quelque chose s&apos;est mal passé
        </h1>
        <p
          className="text-sm mb-8"
          style={{ color: "var(--text-secondary)", lineHeight: 1.6 }}
        >
          Une erreur inattendue est survenue. Veuillez réessayer ou revenir à
          l&apos;accueil.
        </p>
        <div className="flex items-center justify-center gap-3">
          <button
            onClick={reset}
            className="px-6 py-3 text-sm font-semibold transition-all"
            style={{
              background: "var(--accent-gradient)",
              color: "#fff",
              border: "none",
              borderRadius: "var(--radius-full)",
              cursor: "pointer",
            }}
          >
            Réessayer
          </button>
          <a
            href="/"
            className="px-6 py-3 text-sm font-semibold transition-all"
            style={{
              background: "transparent",
              color: "var(--text-primary)",
              border: "1px solid var(--border)",
              borderRadius: "var(--radius-full)",
              textDecoration: "none",
            }}
          >
            Accueil
          </a>
        </div>
      </div>
    </div>
  );
}
