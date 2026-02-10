"use client";

export default function CTASection() {
  return (
    <section
      className="w-full"
      style={{
        background: "linear-gradient(135deg, #FF385C 0%, #bd1e59 100%)",
        padding: "clamp(48px, 8vw, 96px) clamp(16px, 4vw, 32px)",
      }}
    >
      <div style={{ maxWidth: "800px", margin: "0 auto", textAlign: "center" }}>
        <h2
          className="font-bold mb-5"
          style={{
            fontFamily: "var(--font-nunito), sans-serif",
            color: "#fff",
            letterSpacing: "-0.02em",
            fontSize: "clamp(2rem, 5vw, 2.5rem)",
          }}
        >
          Prêt à trouver votre logement idéal ?
        </h2>
        <p
          style={{
            color: "rgba(255, 255, 255, 0.9)",
            lineHeight: 1.7,
            fontSize: "1.05rem",
            marginBottom: "40px",
            maxWidth: "540px",
            marginLeft: "auto",
            marginRight: "auto",
          }}
        >
          Essayez AirSearch gratuitement. Aucune inscription requise.
        </p>
        <a
          href="#"
          onClick={(e) => {
            e.preventDefault();
            window.scrollTo({ top: 0, behavior: "smooth" });
          }}
          className="cta-button"
          style={{
            display: "inline-flex",
            alignItems: "center",
            gap: "10px",
            padding: "16px 32px",
            fontSize: "1rem",
            fontWeight: 600,
            background: "#fff",
            color: "#FF385C",
            borderRadius: "var(--radius-full)",
            textDecoration: "none",
            boxShadow: "0 8px 24px rgba(0, 0, 0, 0.2)",
            transition: "all 0.2s ease",
          }}
        >
          Lancer une recherche
          <svg
            width="18" height="18" viewBox="0 0 24 24" fill="none"
            stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"
          >
            <path d="M5 12h14M12 5l7 7-7 7" />
          </svg>
        </a>
      </div>
    </section>
  );
}
