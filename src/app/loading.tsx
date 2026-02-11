export default function Loading() {
  return (
    <div
      style={{
        position: "fixed",
        inset: 0,
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        background: "var(--bg)",
        zIndex: 9999,
        gap: "28px",
      }}
    >
      {/* Animated logo mark */}
      <div style={{ position: "relative", width: "56px", height: "56px" }}>
        {/* Pulsing ring */}
        <div
          className="loading-ring"
          style={{
            position: "absolute",
            inset: "-8px",
            borderRadius: "50%",
            border: "2px solid var(--accent)",
            opacity: 0.2,
          }}
        />
        {/* Spinning arc */}
        <div
          className="loading-spinner"
          style={{
            position: "absolute",
            inset: "-8px",
            borderRadius: "50%",
            border: "2.5px solid transparent",
            borderTopColor: "var(--accent)",
            borderRightColor: "var(--accent)",
          }}
        />
        {/* Center icon — location pin */}
        <div
          style={{
            width: "100%",
            height: "100%",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <svg
            className="loading-icon"
            width="28"
            height="28"
            viewBox="0 0 24 24"
            fill="none"
            stroke="var(--accent)"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" />
            <circle cx="12" cy="10" r="3" />
          </svg>
        </div>
      </div>

      {/* Brand text */}
      <div
        className="loading-text"
        style={{
          fontFamily: "var(--font-nunito), sans-serif",
          fontWeight: 800,
          fontSize: "1.25rem",
          letterSpacing: "-0.03em",
          color: "var(--accent)",
        }}
      >
        AirSearch
      </div>

      <style dangerouslySetInnerHTML={{ __html: `
        @keyframes spin {
          to { transform: rotate(360deg); }
        }
        @keyframes pulse-ring {
          0%, 100% { transform: scale(1); opacity: 0.2; }
          50% { transform: scale(1.15); opacity: 0.08; }
        }
        @keyframes fade-up {
          0% { opacity: 0; transform: translateY(6px); }
          100% { opacity: 1; transform: translateY(0); }
        }
        @keyframes gentle-bounce {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-3px); }
        }
        .loading-spinner {
          animation: spin 0.9s linear infinite;
        }
        .loading-ring {
          animation: pulse-ring 2s ease-in-out infinite;
        }
        .loading-icon {
          animation: gentle-bounce 1.8s ease-in-out infinite;
        }
        .loading-text {
          animation: fade-up 0.4s ease-out both;
          animation-delay: 0.15s;
        }
      `}} />
    </div>
  );
}
