export default function Footer() {
  return (
    <footer
      id="footer"
      className="w-full"
      style={{
        background: "var(--bg-secondary)",
        borderTop: "1px solid var(--border)",
        marginTop: "auto",
      }}
    >
      {/* Main footer content */}
      <div
        style={{
          maxWidth: "1120px",
          margin: "0 auto",
          padding: "clamp(32px, 6vw, 64px) clamp(16px, 4vw, 32px) clamp(24px, 4vw, 48px)",
        }}
      >
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "2fr 1fr 1fr",
            gap: "clamp(24px, 5vw, 64px)",
          }}
          className="footer-grid"
        >
          {/* Brand column */}
          <div>
            <a href="/" className="inline-block mb-5" style={{ textDecoration: "none" }}>
              <span
                className="text-2xl font-extrabold"
                style={{
                  fontFamily: "var(--font-nunito), sans-serif",
                  color: "var(--accent)",
                  letterSpacing: "-0.03em",
                }}
              >
                AirSearch
              </span>
            </a>
            <p
              className="text-sm leading-relaxed"
              style={{
                color: "var(--text-secondary)",
                maxWidth: "340px",
                lineHeight: 1.7,
              }}
            >
              Recherche intelligente de locations de vacances propulsée par
              notre technologie intelligente. Trouvez le logement parfait en
              quelques secondes.
            </p>
          </div>

          {/* Navigation + Legal column */}
          <div>
            <h4
              className="text-xs font-semibold uppercase mb-5"
              style={{ color: "var(--text-tertiary)", letterSpacing: "0.08em" }}
            >
              Navigation
            </h4>
            <ul style={{ listStyle: "none", padding: 0, margin: 0 }}>
              {[
                { label: "Rechercher", href: "#search-form" },
                { label: "Fonctionnalités", href: "#features" },
                { label: "Comment ça marche", href: "#how-it-works" },
                { label: "À propos", href: "/a-propos" },
              ].map((link) => (
                <li key={link.label} style={{ marginBottom: "14px" }}>
                  <a
                    href={link.href}
                    className="text-sm transition-colors"
                    style={{ color: "var(--text-secondary)", textDecoration: "none" }}
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>

            <h4
              className="text-xs font-semibold uppercase mb-5"
              style={{
                color: "var(--text-tertiary)",
                letterSpacing: "0.08em",
                marginTop: "24px",
              }}
            >
              Légal
            </h4>
            <ul style={{ listStyle: "none", padding: 0, margin: 0 }}>
              {[
                { label: "Conditions d'utilisation", href: "/conditions" },
                { label: "Confidentialité", href: "/confidentialite" },
                { label: "Mentions légales", href: "/mentions-legales" },
              ].map((link) => (
                <li key={link.label} style={{ marginBottom: "14px" }}>
                  <a
                    href={link.href}
                    className="text-sm transition-colors"
                    style={{ color: "var(--text-secondary)", textDecoration: "none" }}
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Destinations column */}
          <div>
            <h4
              className="text-xs font-semibold uppercase mb-5"
              style={{ color: "var(--text-tertiary)", letterSpacing: "0.08em" }}
            >
              Destinations
            </h4>
            <ul style={{ listStyle: "none", padding: 0, margin: 0 }}>
              {[
                { label: "Paris", href: "/destination/paris" },
                { label: "Nice", href: "/destination/nice" },
                { label: "Lyon", href: "/destination/lyon" },
                { label: "Marseille", href: "/destination/marseille" },
                { label: "Bordeaux", href: "/destination/bordeaux" },
              ].map((link) => (
                <li key={link.label} style={{ marginBottom: "14px" }}>
                  <a
                    href={link.href}
                    className="text-sm transition-colors"
                    style={{ color: "var(--text-secondary)", textDecoration: "none" }}
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>

      {/* Bottom bar */}
      <div style={{ borderTop: "1px solid var(--border)" }}>
        <div
          className="flex flex-col sm:flex-row items-center justify-between gap-3"
          style={{ maxWidth: "1120px", margin: "0 auto", padding: "20px 32px" }}
        >
          <div
            className="flex items-center gap-2 flex-wrap justify-center sm:justify-start"
            style={{ color: "var(--text-tertiary)", fontSize: "13px" }}
          >
            <span>&copy; {new Date().getFullYear()} AirSearch</span>
          </div>

          <div
            className="flex items-center gap-4"
            style={{ color: "var(--text-tertiary)", fontSize: "13px" }}
          >
            <div className="flex items-center gap-1.5">
              <svg
                width="14" height="14" viewBox="0 0 24 24" fill="none"
                stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"
              >
                <circle cx="12" cy="12" r="10" />
                <path d="M2 12h20M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z" />
              </svg>
              <span style={{ fontWeight: 500 }}>Français (FR)</span>
            </div>
            <span style={{ fontWeight: 500 }}>EUR &euro;</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
