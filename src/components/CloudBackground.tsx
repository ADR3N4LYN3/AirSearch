"use client";

import LottieAnimation from "@/components/LottieAnimation";

export default function CloudBackground() {
  return (
    <div
      className="absolute inset-0 pointer-events-none"
      style={{ zIndex: 0, overflow: "hidden" }}
      aria-hidden="true"
    >
      {/* Sky gradient so white clouds are visible */}
      <div
        className="absolute inset-0"
        style={{
          background: "linear-gradient(to bottom, var(--cloud-sky), transparent 90%)",
        }}
      />

      {/* Cloud animation */}
      <div className="absolute inset-0" style={{ opacity: 0.6 }}>
        <LottieAnimation
          src="/animations/moving-clouds.json"
          loop
          autoplay
          speed={0.5}
          style={{ width: "100%", height: "100%" }}
        />
      </div>
    </div>
  );
}
