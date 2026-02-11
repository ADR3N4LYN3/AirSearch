import { FadeIn, TextReveal } from "@/components/animations";

export default function HeroSection() {
  return (
    <section
      className="w-full flex items-center justify-center relative"
      style={{ paddingTop: "clamp(32px, 5vw, 56px)", paddingBottom: "clamp(16px, 3vw, 32px)" }}
    >
      <div className="max-w-4xl mx-auto px-6 w-full relative" style={{ zIndex: 1 }}>
        <div className="flex flex-col items-center gap-5 sm:gap-6 text-center">
          <div>
            <TextReveal
              text="Trouvez votre location de vacances"
              as="h1"
              className="text-4xl sm:text-5xl lg:text-6xl font-extrabold"
              style={{
                fontFamily: "var(--font-nunito), sans-serif",
                color: "var(--text-primary)",
                letterSpacing: "-0.03em",
                lineHeight: 1.1,
              }}
            />
            <TextReveal
              text="idéale en quelques secondes"
              as="h1"
              className="text-4xl sm:text-5xl lg:text-6xl font-extrabold"
              style={{
                fontFamily: "var(--font-nunito), sans-serif",
                color: "var(--accent)",
                letterSpacing: "-0.03em",
                lineHeight: 1.1,
              }}
              delay={0.15}
            />
          </div>

          <FadeIn delay={0.3}>
            <p
              className="text-lg sm:text-xl mx-auto max-w-2xl"
              style={{ color: "var(--text-secondary)", lineHeight: 1.6, textAlign: "center" }}
            >
              Comparez Airbnb, Booking et Abritel en toute simplicité.
              <br />
              Gratuit, rapide, sans engagement.
            </p>
          </FadeIn>

          <FadeIn delay={0.5}>
            <div className="flex items-center gap-6 flex-wrap justify-center">
              {["Recherche en temps réel", "Multi-plateformes", "100% Gratuit"].map((item) => (
                <div
                  key={item}
                  className="flex items-center gap-2 text-sm"
                  style={{ color: "var(--text-secondary)" }}
                >
                  <svg
                    width="16" height="16" viewBox="0 0 24 24" fill="none"
                    stroke="var(--accent)" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"
                  >
                    <path d="M20 6L9 17l-5-5" />
                  </svg>
                  {item}
                </div>
              ))}
            </div>
          </FadeIn>
        </div>
      </div>
    </section>
  );
}
