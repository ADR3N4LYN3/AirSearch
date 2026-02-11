import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import HeroSection from "@/components/sections/HeroSection";
import FeaturesSection from "@/components/sections/FeaturesSection";
import HowItWorksSection from "@/components/sections/HowItWorksSection";

import CTASection from "@/components/sections/CTASection";
import SearchForm from "@/components/SearchForm";
import CloudBackground from "@/components/CloudBackground";

export default function Home() {
  return (
    <div className="min-h-screen flex flex-col" style={{ background: "var(--bg)" }}>
      <Header />

      {/* Hero with cloud background */}
      <div className="relative overflow-hidden" style={{ minHeight: "280px" }}>
        <CloudBackground />
        <HeroSection />
      </div>

      {/* Search Form Section */}
      <section
        id="search-form"
        className="w-full flex items-center justify-center"
        style={{ paddingBottom: "48px" }}
      >
        <div className="max-w-4xl mx-auto px-6 w-full">
          <div
            className="w-full"
            style={{
              background: "var(--surface)",
              borderRadius: "var(--radius-card)",
              padding: "clamp(16px, 4vw, 32px)",
              boxShadow: "var(--shadow-xl)",
              border: "1px solid var(--border)",
            }}
          >
            <SearchForm />
          </div>
        </div>
      </section>

      <FeaturesSection />
      <HowItWorksSection />
      <CTASection />
      <Footer />
    </div>
  );
}
