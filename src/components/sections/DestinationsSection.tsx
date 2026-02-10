"use client";

const POPULAR_DESTINATIONS = [
  { name: "Paris", slug: "paris", emoji: "🗼" },
  { name: "Nice", slug: "nice", emoji: "🏖️" },
  { name: "Lyon", slug: "lyon", emoji: "🍷" },
  { name: "Marseille", slug: "marseille", emoji: "⛵" },
  { name: "Bordeaux", slug: "bordeaux", emoji: "🍇" },
];

export default function DestinationsSection() {
  return (
    <section
      className="w-full"
      style={{
        background: "var(--bg-secondary)",
        padding: "clamp(56px, 10vw, 96px) clamp(16px, 4vw, 32px)",
      }}
    >
      <div style={{ maxWidth: "1200px", margin: "0 auto" }}>
        <div style={{ textAlign: "center", marginBottom: "48px" }}>
          <h2
            className="font-bold"
            style={{
              fontFamily: "var(--font-nunito), sans-serif",
              color: "var(--text-primary)",
              letterSpacing: "-0.02em",
              fontSize: "clamp(1.8rem, 4vw, 2.25rem)",
              marginBottom: "16px",
            }}
          >
            Destinations populaires
          </h2>
          <p
            style={{
              color: "var(--text-secondary)",
              lineHeight: 1.6,
              fontSize: "1.05rem",
              maxWidth: "600px",
              margin: "0 auto",
            }}
          >
            Trouvez la location parfaite dans les plus belles villes de France
          </p>
        </div>

        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(240px, 1fr))",
            gap: "24px",
          }}
        >
          {POPULAR_DESTINATIONS.map((city) => (
            <a
              key={city.slug}
              href={`/destination/${city.slug}`}
              style={{
                background: "var(--surface)",
                border: "1px solid var(--border)",
                borderRadius: "var(--radius-card)",
                padding: "32px 24px",
                textDecoration: "none",
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                gap: "12px",
                transition: "all 0.2s ease",
                boxShadow: "var(--shadow-sm)",
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = "translateY(-4px)";
                e.currentTarget.style.boxShadow = "var(--shadow-card-hover)";
                e.currentTarget.style.borderColor = "var(--accent)";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = "translateY(0)";
                e.currentTarget.style.boxShadow = "var(--shadow-sm)";
                e.currentTarget.style.borderColor = "var(--border)";
              }}
            >
              <div style={{ fontSize: "3rem", lineHeight: 1 }}>{city.emoji}</div>
              <h3
                style={{
                  color: "var(--text-primary)",
                  fontSize: "1.25rem",
                  fontWeight: 700,
                  margin: 0,
                }}
              >
                {city.name}
              </h3>
              <span
                style={{
                  color: "var(--accent)",
                  fontSize: "0.9rem",
                  fontWeight: 600,
                }}
              >
                Voir les locations →
              </span>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}
