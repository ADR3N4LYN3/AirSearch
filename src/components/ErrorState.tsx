"use client";

import { AlertCircle, RotateCcw, Search } from "lucide-react";

interface ErrorStateProps {
  error: string | null;
  onRetry: () => void;
  onReset: () => void;
}

export default function ErrorState({ error, onRetry, onReset }: ErrorStateProps) {
  return (
    <div
      className="flex flex-col items-center py-16 gap-8 animate-fade-in w-full"
      style={{ background: "var(--bg)" }}
      role="alert"
    >
      {/* Error icon */}
      <div
        className="flex items-center justify-center"
        style={{
          width: 72,
          height: 72,
          borderRadius: "50%",
          background: "linear-gradient(135deg, rgba(255,56,92,0.08) 0%, rgba(255,56,92,0.16) 100%)",
        }}
      >
        <AlertCircle size={36} color="var(--accent)" />
      </div>

      {/* Error text */}
      <div className="flex flex-col items-center gap-2 text-center" style={{ maxWidth: 400 }}>
        <h2
          className="text-xl font-semibold"
          style={{
            color: "var(--text-primary)",
            fontFamily: "var(--font-nunito), sans-serif",
            letterSpacing: "-0.01em",
          }}
        >
          Oups, quelque chose s&apos;est mal pass&eacute;
        </h2>
        <p
          className="text-sm"
          style={{ color: "var(--text-secondary)", lineHeight: 1.6 }}
        >
          {error || "Une erreur inattendue est survenue."}
        </p>
      </div>

      {/* Action buttons */}
      <div className="flex items-center gap-4">
        <button
          type="button"
          onClick={onRetry}
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
          <RotateCcw size={18} />
          R&eacute;essayer
        </button>
        <button
          type="button"
          onClick={onReset}
          className="inline-flex items-center gap-2.5 cursor-pointer transition-all duration-200 hover:opacity-90 active:scale-[0.98]"
          style={{
            padding: "16px 32px",
            fontSize: "1rem",
            fontWeight: 600,
            background: "transparent",
            color: "var(--text-primary)",
            border: "1px solid var(--border)",
            borderRadius: "var(--radius-full)",
          }}
        >
          <Search size={18} />
          Nouvelle recherche
        </button>
      </div>
    </div>
  );
}
