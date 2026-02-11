import dynamic from "next/dynamic";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import HeroSection from "@/components/sections/HeroSection";
import FeaturesSection from "@/components/sections/FeaturesSection";
import HowItWorksSection from "@/components/sections/HowItWorksSection";

import CTASection from "@/components/sections/CTASection";
import CloudBackground from "@/components/CloudBackground";

const SearchForm = dynamic(() => import("@/components/SearchForm"), {
  loading: () => (
    <div className="flex items-center justify-center py-12" style={{ minHeight: "200px" }}>
      <div
        className="animate-spin rounded-full"
        style={{
          width: "32px",
          height: "32px",
          border: "3px solid var(--border)",
          borderTopColor: "var(--accent)",
        }}
      />
    </div>
  ),
});

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
