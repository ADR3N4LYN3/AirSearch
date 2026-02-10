import { ImageResponse } from "next/og";

export const runtime = "edge";
export const alt = "AirSearch - Trouvez le logement idéal avec l'IA";
export const size = {
  width: 1200,
  height: 630,
};
export const contentType = "image/png";

export default async function Image() {
  return new ImageResponse(
    (
      <div
        style={{
          height: "100%",
          width: "100%",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          background: "linear-gradient(135deg, #FF385C 0%, #bd1e59 100%)",
          fontFamily: "sans-serif",
        }}
      >
        {/* Background Pattern */}
        <div
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            opacity: 0.1,
            background:
              "radial-gradient(circle at 30% 40%, rgba(255, 255, 255, 0.3) 0%, transparent 60%), radial-gradient(circle at 70% 70%, rgba(255, 255, 255, 0.2) 0%, transparent 50%)",
          }}
        />

        {/* Content */}
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            textAlign: "center",
            padding: "80px",
            zIndex: 1,
          }}
        >
          {/* Logo/Icon */}
          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              width: "120px",
              height: "120px",
              borderRadius: "50%",
              background: "rgba(255, 255, 255, 0.2)",
              marginBottom: "40px",
              border: "3px solid rgba(255, 255, 255, 0.4)",
            }}
          >
            <svg
              width="64"
              height="64"
              viewBox="0 0 24 24"
              fill="none"
              stroke="#fff"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" />
              <circle cx="12" cy="10" r="3" />
            </svg>
          </div>

          {/* Brand */}
          <div
            style={{
              fontSize: "72px",
              fontWeight: 900,
              color: "#fff",
              letterSpacing: "-0.03em",
              marginBottom: "24px",
            }}
          >
            AirSearch
          </div>

          {/* Tagline */}
          <div
            style={{
              fontSize: "32px",
              color: "rgba(255, 255, 255, 0.95)",
              maxWidth: "800px",
              lineHeight: 1.4,
              fontWeight: 500,
            }}
          >
            Trouvez le logement idéal avec l&apos;IA
          </div>

          {/* Badge */}
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: "12px",
              marginTop: "40px",
              padding: "12px 28px",
              background: "rgba(255, 255, 255, 0.2)",
              borderRadius: "9999px",
              border: "2px solid rgba(255, 255, 255, 0.3)",
            }}
          >
            <div
              style={{
                width: "12px",
                height: "12px",
                borderRadius: "50%",
                background: "#fff",
              }}
            />
            <span
              style={{
                fontSize: "20px",
                color: "#fff",
                fontWeight: 600,
              }}
            >
              Recherche intelligente par IA
            </span>
          </div>
        </div>

        {/* Footer */}
        <div
          style={{
            position: "absolute",
            bottom: "40px",
            left: "80px",
            display: "flex",
            alignItems: "center",
            gap: "20px",
            color: "rgba(255, 255, 255, 0.8)",
            fontSize: "18px",
          }}
        >
          <span>🔍 Recherche intelligente</span>
          <span>•</span>
          <span>🌍 Multi-plateformes</span>
          <span>•</span>
          <span>⚡ Temps réel</span>
        </div>
      </div>
    ),
    {
      ...size,
    }
  );
}
