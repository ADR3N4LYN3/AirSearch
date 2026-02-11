"use client";

export default function Error({
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <div
      className="min-h-screen flex flex-col items-center justify-center px-6 relative overflow-hidden"
      style={{ background: "linear-gradient(180deg, #4A5568 0%, #718096 30%, #A0AEC0 60%, #CBD5E0 85%, #E2E8F0 100%)" }}
    >
      {/* ── Lightning flash ── */}
      <div className="absolute error-lightning" style={{ top: "5%", left: "25%", zIndex: 3 }}>
        <svg width="60" height="120" viewBox="0 0 60 120" fill="none">
          <path
            d="M30 0 L20 45 L35 45 L15 120 L25 65 L12 65 L30 0Z"
            fill="#FFD54F"
            opacity="0.9"
            style={{ filter: "drop-shadow(0 0 20px rgba(255,213,79,0.6))" }}
          />
        </svg>
      </div>

      {/* ── Storm clouds ── */}
      <svg
        className="absolute error-cloud-1"
        style={{ top: "4%", left: "-5%" }}
        width="280"
        height="100"
        viewBox="0 0 280 100"
        opacity="0.85"
      >
        <ellipse cx="140" cy="65" rx="100" ry="28" fill="#5A6577" />
        <ellipse cx="95" cy="52" rx="65" ry="35" fill="#4A5568" />
        <ellipse cx="185" cy="52" rx="60" ry="32" fill="#4A5568" />
        <ellipse cx="140" cy="38" rx="55" ry="32" fill="#3D4A5C" />
        <ellipse cx="110" cy="42" rx="40" ry="25" fill="#374151" />
        <ellipse cx="165" cy="45" rx="35" ry="22" fill="#374151" />
      </svg>

      <svg
        className="absolute error-cloud-2"
        style={{ top: "8%", right: "-3%" }}
        width="240"
        height="90"
        viewBox="0 0 240 90"
        opacity="0.75"
      >
        <ellipse cx="120" cy="58" rx="85" ry="24" fill="#5A6577" />
        <ellipse cx="80" cy="46" rx="55" ry="30" fill="#4A5568" />
        <ellipse cx="160" cy="46" rx="50" ry="28" fill="#4A5568" />
        <ellipse cx="120" cy="34" rx="48" ry="28" fill="#3D4A5C" />
      </svg>

      <svg
        className="absolute error-cloud-3"
        style={{ top: "18%", left: "30%" }}
        width="200"
        height="70"
        viewBox="0 0 200 70"
        opacity="0.6"
      >
        <ellipse cx="100" cy="48" rx="72" ry="20" fill="#5A6577" />
        <ellipse cx="68" cy="38" rx="45" ry="25" fill="#4A5568" />
        <ellipse cx="132" cy="38" rx="42" ry="23" fill="#4A5568" />
        <ellipse cx="100" cy="28" rx="38" ry="22" fill="#3D4A5C" />
      </svg>

      {/* ── Rain drops ── */}
      <div className="absolute inset-0 error-rain" style={{ zIndex: 2, pointerEvents: "none" }}>
        <svg className="w-full h-full" preserveAspectRatio="none" viewBox="0 0 400 600">
          {/* Rain column 1 */}
          <line x1="45" y1="0" x2="42" y2="20" stroke="rgba(255,255,255,0.2)" strokeWidth="1" className="error-drop-1" />
          <line x1="95" y1="30" x2="92" y2="50" stroke="rgba(255,255,255,0.15)" strokeWidth="0.8" className="error-drop-2" />
          <line x1="150" y1="10" x2="147" y2="30" stroke="rgba(255,255,255,0.2)" strokeWidth="1" className="error-drop-3" />
          <line x1="200" y1="40" x2="197" y2="60" stroke="rgba(255,255,255,0.15)" strokeWidth="0.8" className="error-drop-1" />
          <line x1="260" y1="5" x2="257" y2="25" stroke="rgba(255,255,255,0.2)" strokeWidth="1" className="error-drop-2" />
          <line x1="310" y1="35" x2="307" y2="55" stroke="rgba(255,255,255,0.18)" strokeWidth="0.8" className="error-drop-3" />
          <line x1="365" y1="15" x2="362" y2="35" stroke="rgba(255,255,255,0.15)" strokeWidth="1" className="error-drop-1" />
          {/* Rain column 2 */}
          <line x1="70" y1="60" x2="67" y2="80" stroke="rgba(255,255,255,0.15)" strokeWidth="0.8" className="error-drop-3" />
          <line x1="125" y1="80" x2="122" y2="100" stroke="rgba(255,255,255,0.2)" strokeWidth="1" className="error-drop-1" />
          <line x1="180" y1="70" x2="177" y2="90" stroke="rgba(255,255,255,0.15)" strokeWidth="0.8" className="error-drop-2" />
          <line x1="235" y1="55" x2="232" y2="75" stroke="rgba(255,255,255,0.2)" strokeWidth="1" className="error-drop-3" />
          <line x1="290" y1="85" x2="287" y2="105" stroke="rgba(255,255,255,0.15)" strokeWidth="0.8" className="error-drop-1" />
          <line x1="345" y1="65" x2="342" y2="85" stroke="rgba(255,255,255,0.18)" strokeWidth="1" className="error-drop-2" />
        </svg>
      </div>

      {/* ── Plane with turbulence ── */}
      <div className="absolute error-plane" style={{ top: "30%", right: "10%", zIndex: 4 }}>
        <svg
          width="56"
          height="44"
          viewBox="0 0 44 36"
          fill="none"
        >
          {/* Fuselage */}
          <path d="M2 16 L36 14 Q44 14, 42 16 L36 18 L2 18 Z" fill="white" stroke="#bbb" strokeWidth="0.5" />
          {/* Top wing */}
          <path d="M16 14 L22 2 L26 2 L22 14 Z" fill="white" stroke="#bbb" strokeWidth="0.4" />
          {/* Bottom wing */}
          <path d="M16 18 L22 30 L26 30 L22 18 Z" fill="white" stroke="#bbb" strokeWidth="0.4" />
          {/* Tail fin */}
          <path d="M4 16 L2 8 L8 8 L6 16 Z" fill="white" stroke="#bbb" strokeWidth="0.4" />
          {/* Window dots */}
          <circle cx="14" cy="16" r="0.8" fill="#ccc" />
          <circle cx="18" cy="16" r="0.8" fill="#ccc" />
          <circle cx="22" cy="16" r="0.8" fill="#ccc" />
          <circle cx="26" cy="16" r="0.8" fill="#ccc" />
          <circle cx="30" cy="15.5" r="0.8" fill="#ccc" />
        </svg>
      </div>

      {/* ── Main content ── */}
      <div className="text-center relative z-10 mb-16">
        {/* Warning icon */}
        <div
          className="error-icon-bounce mx-auto mb-6"
          style={{
            width: "88px",
            height: "88px",
            borderRadius: "50%",
            background: "rgba(255, 255, 255, 0.15)",
            backdropFilter: "blur(10px)",
            border: "1px solid rgba(255,255,255,0.25)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <svg width="40" height="40" viewBox="0 0 24 24" fill="none">
            <path
              d="M10.29 3.86L1.82 18a2 2 0 001.71 3h16.94a2 2 0 001.71-3L13.71 3.86a2 2 0 00-3.42 0z"
              fill="#FFB300"
              stroke="#F59E0B"
              strokeWidth="0.5"
            />
            <line x1="12" y1="9" x2="12" y2="13" stroke="#fff" strokeWidth="2" strokeLinecap="round" />
            <circle cx="12" cy="16" r="1" fill="#fff" />
          </svg>
        </div>

        <h1
          className="text-xl sm:text-2xl font-bold mb-3 animate-fade-in"
          style={{
            color: "#fff",
            fontFamily: "var(--font-nunito), sans-serif",
            textShadow: "0 2px 12px rgba(0,0,0,0.3)",
            animationDelay: "0.3s",
            animationFillMode: "backwards",
          }}
        >
          Turbulences en vue !
        </h1>

        <p
          className="text-sm sm:text-base mb-8 animate-fade-in max-w-sm mx-auto"
          style={{
            color: "rgba(255,255,255,0.85)",
            lineHeight: 1.6,
            textShadow: "0 1px 4px rgba(0,0,0,0.2)",
            animationDelay: "0.5s",
            animationFillMode: "backwards",
          }}
        >
          Notre vol traverse une zone agitée&hellip; Pas de panique, on va stabiliser tout ça.
        </p>

        <div
          className="flex flex-col sm:flex-row items-center justify-center gap-3 animate-fade-in"
          style={{
            animationDelay: "0.7s",
            animationFillMode: "backwards",
          }}
        >
          <button
            onClick={reset}
            className="inline-flex items-center justify-center gap-3 w-full sm:w-auto px-10 py-4 text-base font-bold transition-all hover:scale-105 active:scale-95"
            style={{
              background: "rgba(255, 255, 255, 0.92)",
              color: "#222",
              borderRadius: "9999px",
              border: "1px solid rgba(255,255,255,0.6)",
              boxShadow: "0 6px 28px rgba(0,0,0,0.2), 0 2px 6px rgba(0,0,0,0.1)",
              backdropFilter: "blur(10px)",
              cursor: "pointer",
              minWidth: "200px",
              letterSpacing: "-0.01em",
            }}
          >
            <svg
              width="18"
              height="18"
              viewBox="0 0 24 24"
              fill="none"
              stroke="var(--accent)"
              strokeWidth="2.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <polyline points="23 4 23 10 17 10" />
              <path d="M20.49 15a9 9 0 1 1-2.12-9.36L23 10" />
            </svg>
            Réessayer
          </button>
          <a
            href="/"
            className="inline-flex items-center justify-center gap-3 w-full sm:w-auto px-10 py-4 text-base font-bold transition-all hover:scale-105 active:scale-95"
            style={{
              background: "rgba(255, 255, 255, 0.12)",
              color: "#fff",
              borderRadius: "9999px",
              border: "1px solid rgba(255,255,255,0.3)",
              textDecoration: "none",
              backdropFilter: "blur(10px)",
              minWidth: "200px",
              letterSpacing: "-0.01em",
            }}
          >
            <svg
              width="18"
              height="18"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M19 12H5M12 19l-7-7 7-7" />
            </svg>
            Retour à l&apos;accueil
          </a>
        </div>
      </div>

      {/* ── Fog / mist at bottom ── */}
      <div
        className="absolute bottom-0 left-0 right-0"
        style={{
          zIndex: 1,
          height: "20%",
          background: "linear-gradient(180deg, transparent 0%, rgba(255,255,255,0.08) 40%, rgba(255,255,255,0.15) 100%)",
        }}
      />

      {/* ── Animations ── */}
      <style dangerouslySetInnerHTML={{ __html: `
        .error-lightning {
          animation: lightning-flash 4s ease-in-out infinite;
        }
        @keyframes lightning-flash {
          0%, 100% { opacity: 0; }
          45% { opacity: 0; }
          46% { opacity: 1; }
          48% { opacity: 0; }
          49% { opacity: 0.8; }
          50% { opacity: 0; }
        }

        .error-cloud-1 {
          animation: cloud-drift-1 20s ease-in-out infinite;
        }
        .error-cloud-2 {
          animation: cloud-drift-2 25s ease-in-out infinite;
        }
        .error-cloud-3 {
          animation: cloud-drift-3 18s ease-in-out infinite;
        }
        @keyframes cloud-drift-1 {
          0%, 100% { transform: translateX(0); }
          50% { transform: translateX(30px); }
        }
        @keyframes cloud-drift-2 {
          0%, 100% { transform: translateX(0); }
          50% { transform: translateX(-25px); }
        }
        @keyframes cloud-drift-3 {
          0%, 100% { transform: translateX(0); }
          50% { transform: translateX(20px); }
        }

        .error-plane {
          animation: turbulence 2s ease-in-out infinite;
        }
        @keyframes turbulence {
          0%, 100% { transform: translate(0, 0) rotate(-2deg); }
          20% { transform: translate(-3px, -6px) rotate(1deg); }
          40% { transform: translate(4px, 3px) rotate(-3deg); }
          60% { transform: translate(-2px, -4px) rotate(2deg); }
          80% { transform: translate(3px, 2px) rotate(-1deg); }
        }

        .error-drop-1 {
          animation: rain-fall 1.2s linear infinite;
        }
        .error-drop-2 {
          animation: rain-fall 1.5s linear infinite;
          animation-delay: 0.3s;
        }
        .error-drop-3 {
          animation: rain-fall 1s linear infinite;
          animation-delay: 0.6s;
        }
        @keyframes rain-fall {
          0% { transform: translateY(-20px); opacity: 0; }
          10% { opacity: 1; }
          90% { opacity: 1; }
          100% { transform: translateY(600px); opacity: 0; }
        }

        .error-icon-bounce {
          animation: icon-bounce 3s ease-in-out infinite;
        }
        @keyframes icon-bounce {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-8px); }
        }
      `}} />
    </div>
  );
}
