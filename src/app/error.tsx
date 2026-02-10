"use client";

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
        <div
          className="mx-auto mb-6"
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
            stroke="var(--accent)"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <circle cx="12" cy="12" r="10" />
            <path d="M12 8v4" />
            <circle cx="12" cy="16" r="0.5" fill="var(--accent)" />
          </svg>
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
