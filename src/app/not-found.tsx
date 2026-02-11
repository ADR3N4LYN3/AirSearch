import Link from "next/link";

export default function NotFound() {
  return (
    <div
      className="min-h-screen flex flex-col items-center justify-center px-6 relative overflow-hidden"
      style={{ background: "linear-gradient(180deg, #87CEEB 0%, #B0E0F6 40%, #FFF5E1 75%, #FFEDC2 100%)" }}
    >
      {/* ── Sun ── */}
      <div
        className="absolute not-found-sun-core"
        style={{ top: "6%", right: "12%", width: 120, height: 120 }}
      >
        {/* Rays */}
        <svg
          className="absolute inset-0 not-found-sun-rays"
          viewBox="0 0 120 120"
          fill="none"
          style={{ width: 120, height: 120 }}
        >
          {Array.from({ length: 12 }).map((_, i) => (
            <line
              key={i}
              x1="60"
              y1="4"
              x2="60"
              y2="18"
              stroke="#FFD54F"
              strokeWidth="3"
              strokeLinecap="round"
              transform={`rotate(${i * 30} 60 60)`}
            />
          ))}
        </svg>
        {/* Core */}
        <div
          className="absolute rounded-full"
          style={{
            top: 20,
            left: 20,
            width: 80,
            height: 80,
            background: "radial-gradient(circle at 40% 40%, #FFE082, #FFB300)",
            boxShadow: "0 0 60px 20px rgba(255,179,0,0.3), 0 0 120px 60px rgba(255,179,0,0.1)",
          }}
        />
      </div>

      {/* ── Clouds ── */}
      <svg
        className="absolute not-found-cloud-1"
        style={{ top: "14%", left: 0 }}
        width="140"
        height="50"
        viewBox="0 0 140 50"
        fill="white"
        opacity="0.9"
      >
        <ellipse cx="70" cy="35" rx="50" ry="15" />
        <ellipse cx="45" cy="28" rx="30" ry="18" />
        <ellipse cx="90" cy="28" rx="28" ry="16" />
        <ellipse cx="68" cy="20" rx="26" ry="16" />
      </svg>
      <svg
        className="absolute not-found-cloud-2"
        style={{ top: "25%", left: 0 }}
        width="100"
        height="40"
        viewBox="0 0 100 40"
        fill="white"
        opacity="0.6"
      >
        <ellipse cx="50" cy="28" rx="38" ry="12" />
        <ellipse cx="35" cy="22" rx="22" ry="14" />
        <ellipse cx="65" cy="22" rx="20" ry="12" />
      </svg>

      {/* ── Birds (flock) ── */}
      <div className="absolute not-found-birds-flock" style={{ top: "16%", left: "15%" }}>
        {/* Lead bird */}
        <svg
          className="not-found-bird"
          style={{ position: "absolute", top: 0, left: 24 }}
          width="20"
          height="10"
          viewBox="0 0 20 10"
          fill="none"
        >
          <path d="M0 8 C3 3, 6 1, 10 5 C14 1, 17 3, 20 8" stroke="#3a3a3a" strokeWidth="1.8" strokeLinecap="round" />
        </svg>
        {/* Left wing */}
        <svg
          className="not-found-bird-2"
          style={{ position: "absolute", top: 12, left: 0 }}
          width="16"
          height="8"
          viewBox="0 0 20 10"
          fill="none"
        >
          <path d="M0 8 C3 3, 6 1, 10 5 C14 1, 17 3, 20 8" stroke="#4a4a4a" strokeWidth="1.6" strokeLinecap="round" />
        </svg>
        {/* Right wing */}
        <svg
          className="not-found-bird"
          style={{ position: "absolute", top: 14, left: 52 }}
          width="14"
          height="7"
          viewBox="0 0 20 10"
          fill="none"
        >
          <path d="M0 8 C3 3, 6 1, 10 5 C14 1, 17 3, 20 8" stroke="#4a4a4a" strokeWidth="1.6" strokeLinecap="round" />
        </svg>
        {/* Trailing birds */}
        <svg
          className="not-found-bird-2"
          style={{ position: "absolute", top: 24, left: -8 }}
          width="12"
          height="6"
          viewBox="0 0 20 10"
          fill="none"
        >
          <path d="M0 8 C3 3, 6 1, 10 5 C14 1, 17 3, 20 8" stroke="#5a5a5a" strokeWidth="1.5" strokeLinecap="round" />
        </svg>
        <svg
          className="not-found-bird"
          style={{ position: "absolute", top: 26, left: 66 }}
          width="12"
          height="6"
          viewBox="0 0 20 10"
          fill="none"
        >
          <path d="M0 8 C3 3, 6 1, 10 5 C14 1, 17 3, 20 8" stroke="#5a5a5a" strokeWidth="1.5" strokeLinecap="round" />
        </svg>
      </div>

      {/* ── Plane ── */}
      <div className="absolute not-found-plane" style={{ top: "8%", left: 0 }}>
        <svg
          width="44"
          height="36"
          viewBox="0 0 44 36"
          fill="none"
          style={{ position: "relative", zIndex: 1 }}
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

      {/* ── Palm tree (left, big) ── */}
      <div className="absolute not-found-palm" style={{ bottom: "4%", left: "3%", zIndex: 4 }}>
        <svg width="160" height="280" viewBox="0 0 160 280" fill="none">
          {/* Trunk — curved with bark texture */}
          <path d="M80 280 Q76 240 78 200 Q82 160 76 120 Q72 90 78 65" stroke="#6D4C41" strokeWidth="12" strokeLinecap="round" fill="none" />
          <path d="M80 280 Q76 240 78 200 Q82 160 76 120 Q72 90 78 65" stroke="#8D6E63" strokeWidth="6" strokeLinecap="round" fill="none" opacity="0.5" />
          {/* Bark rings */}
          <path d="M72 260 Q80 258 86 260" stroke="#5D4037" strokeWidth="1" fill="none" opacity="0.4" />
          <path d="M73 240 Q80 237 85 240" stroke="#5D4037" strokeWidth="1" fill="none" opacity="0.4" />
          <path d="M74 220 Q80 217 84 220" stroke="#5D4037" strokeWidth="1" fill="none" opacity="0.4" />
          <path d="M75 200 Q81 197 85 200" stroke="#5D4037" strokeWidth="1" fill="none" opacity="0.3" />
          <path d="M77 180 Q82 177 85 180" stroke="#5D4037" strokeWidth="1" fill="none" opacity="0.3" />
          {/* Leaves — full coconut palm fronds */}
          <path d="M78 65 Q40 50 5 75 Q20 50 40 42 Q55 35 78 65" fill="#2E7D32" />
          <path d="M78 65 Q30 30 10 15 Q25 28 50 30 Q65 32 78 65" fill="#388E3C" />
          <path d="M78 65 Q60 15 55 0 Q62 18 70 28 Q75 40 78 65" fill="#43A047" />
          <path d="M78 65 Q100 15 110 0 Q102 20 92 32 Q85 42 78 65" fill="#388E3C" />
          <path d="M78 65 Q120 30 150 18 Q130 35 110 38 Q90 42 78 65" fill="#2E7D32" />
          <path d="M78 65 Q125 52 155 72 Q130 55 108 48 Q90 45 78 65" fill="#43A047" />
          {/* Drooping fronds */}
          <path d="M78 65 Q35 60 0 90 Q15 65 45 55 Q60 52 78 65" fill="#1B5E20" opacity="0.6" />
          <path d="M78 65 Q125 62 158 88 Q138 68 115 58 Q95 53 78 65" fill="#1B5E20" opacity="0.5" />
          {/* Coconuts */}
          <circle cx="74" cy="70" r="5" fill="#5D4037" />
          <circle cx="83" cy="68" r="4.5" fill="#6D4C41" />
          <circle cx="78" cy="74" r="4" fill="#4E342E" />
          {/* Coconut highlights */}
          <circle cx="72" cy="68" r="1.5" fill="#8D6E63" opacity="0.5" />
          <circle cx="81" cy="66" r="1.2" fill="#8D6E63" opacity="0.5" />
        </svg>
      </div>

      {/* ── Palm tree (right) ── */}
      <div
        className="absolute not-found-palm hidden sm:block"
        style={{ bottom: "4%", right: "4%", zIndex: 4, animationDelay: "1.2s" }}
      >
        <svg width="120" height="220" viewBox="0 0 160 280" fill="none">
          {/* Trunk */}
          <path d="M80 280 Q84 235 80 190 Q76 150 82 110 Q86 85 80 70" stroke="#6D4C41" strokeWidth="11" strokeLinecap="round" fill="none" />
          <path d="M80 280 Q84 235 80 190 Q76 150 82 110 Q86 85 80 70" stroke="#8D6E63" strokeWidth="5" strokeLinecap="round" fill="none" opacity="0.5" />
          {/* Leaves */}
          <path d="M80 70 Q45 55 10 80 Q25 55 48 48 Q62 42 80 70" fill="#2E7D32" />
          <path d="M80 70 Q38 32 18 15 Q32 30 55 34 Q68 38 80 70" fill="#388E3C" />
          <path d="M80 70 Q65 20 60 2 Q68 22 74 35 Q78 48 80 70" fill="#43A047" />
          <path d="M80 70 Q100 20 105 5 Q100 25 92 38 Q86 50 80 70" fill="#388E3C" />
          <path d="M80 70 Q120 35 148 22 Q128 40 108 42 Q92 46 80 70" fill="#2E7D32" />
          <path d="M80 70 Q122 58 150 78 Q128 62 108 54 Q92 50 80 70" fill="#43A047" />
          <path d="M80 70 Q40 65 8 92 Q20 70 48 60 Q64 56 80 70" fill="#1B5E20" opacity="0.5" />
          {/* Coconuts */}
          <circle cx="76" cy="74" r="4.5" fill="#5D4037" />
          <circle cx="85" cy="73" r="4" fill="#6D4C41" />
        </svg>
      </div>

      {/* ── Small palm (left-center) — hidden on small screens ── */}
      <div
        className="absolute not-found-palm hidden md:block"
        style={{ bottom: "3%", left: "22%", zIndex: 3, animationDelay: "0.6s" }}
      >
        <svg width="70" height="130" viewBox="0 0 160 280" fill="none">
          <path d="M80 280 Q78 230 82 180 Q84 140 80 105" stroke="#6D4C41" strokeWidth="10" strokeLinecap="round" fill="none" />
          <path d="M80 105 Q50 88 20 108 Q35 88 55 82 Q68 78 80 105" fill="#2E7D32" />
          <path d="M80 105 Q48 70 35 52 Q48 65 62 70 Q72 76 80 105" fill="#388E3C" />
          <path d="M80 105 Q115 72 140 58 Q125 75 108 78 Q92 82 80 105" fill="#2E7D32" />
          <path d="M80 105 Q95 60 92 40 Q90 60 86 75 Q83 88 80 105" fill="#43A047" />
          <circle cx="78" cy="108" r="3.5" fill="#5D4037" />
        </svg>
      </div>

      {/* ── Main content ── */}
      <div className="text-center relative z-10 mb-32 sm:mb-36">
        {/* 404 numbers */}
        <div className="flex items-center justify-center gap-1 sm:gap-2 mb-4">
          <span
            className="not-found-number not-found-number-1"
            style={{
              fontFamily: "var(--font-nunito), sans-serif",
              fontSize: "clamp(5rem, 15vw, 10rem)",
              fontWeight: 800,
              color: "var(--accent)",
              lineHeight: 1,
              textShadow: "0 4px 20px rgba(255,56,92,0.25)",
              letterSpacing: "-0.04em",
            }}
          >
            4
          </span>
          {/* The "0" is a life ring / sun hybrid */}
          <span
            className="not-found-number not-found-number-2 not-found-float inline-block"
            style={{
              fontFamily: "var(--font-nunito), sans-serif",
              fontSize: "clamp(5rem, 15vw, 10rem)",
              fontWeight: 800,
              lineHeight: 1,
              letterSpacing: "-0.04em",
              color: "#FFB300",
              textShadow: "0 4px 20px rgba(255,179,0,0.3)",
            }}
          >
            0
          </span>
          <span
            className="not-found-number not-found-number-3"
            style={{
              fontFamily: "var(--font-nunito), sans-serif",
              fontSize: "clamp(5rem, 15vw, 10rem)",
              fontWeight: 800,
              color: "var(--accent)",
              lineHeight: 1,
              textShadow: "0 4px 20px rgba(255,56,92,0.25)",
              letterSpacing: "-0.04em",
            }}
          >
            4
          </span>
        </div>

        <h1
          className="text-xl sm:text-2xl font-bold mb-3 animate-fade-in"
          style={{
            color: "#222",
            fontFamily: "var(--font-nunito), sans-serif",
            animationDelay: "0.6s",
            animationFillMode: "backwards",
          }}
        >
          Cette page est partie en vacances !
        </h1>

        <p
          className="text-sm sm:text-base mb-8 animate-fade-in max-w-sm mx-auto"
          style={{
            color: "#555",
            lineHeight: 1.6,
            animationDelay: "0.8s",
            animationFillMode: "backwards",
          }}
        >
          On dirait que cette destination n&apos;existe pas&hellip; mais il y en a plein d&apos;autres à découvrir !
        </p>

        <Link
          href="/"
          className="inline-flex items-center justify-center gap-3 w-full sm:w-auto px-10 py-4 text-base font-bold transition-all animate-fade-in hover:scale-105 active:scale-95"
          style={{
            background: "rgba(255, 255, 255, 0.92)",
            color: "#222",
            borderRadius: "9999px",
            textDecoration: "none",
            boxShadow: "0 6px 28px rgba(0,0,0,0.14), 0 2px 6px rgba(0,0,0,0.08)",
            backdropFilter: "blur(10px)",
            animationDelay: "1s",
            animationFillMode: "backwards",
            border: "1px solid rgba(255,255,255,0.6)",
            minWidth: "240px",
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
            <path d="M19 12H5M12 19l-7-7 7-7" />
          </svg>
          Retour à l&apos;accueil
        </Link>
      </div>

      {/* ── Beach sand ── */}
      <div
        className="absolute bottom-0 left-0 right-0"
        style={{
          zIndex: 1,
          height: "8%",
          background: "linear-gradient(180deg, #F5D99A 0%, #E8C878 40%, #DEB96A 100%)",
        }}
      >
        {/* Sand texture dots */}
        <svg className="w-full h-full" preserveAspectRatio="none" viewBox="0 0 400 30" opacity="0.3">
          <circle cx="20" cy="8" r="0.8" fill="#C4A44E" />
          <circle cx="60" cy="15" r="0.6" fill="#B89840" />
          <circle cx="110" cy="6" r="0.7" fill="#C4A44E" />
          <circle cx="150" cy="20" r="0.5" fill="#D4B462" />
          <circle cx="200" cy="10" r="0.8" fill="#B89840" />
          <circle cx="240" cy="22" r="0.6" fill="#C4A44E" />
          <circle cx="290" cy="8" r="0.7" fill="#D4B462" />
          <circle cx="330" cy="18" r="0.5" fill="#B89840" />
          <circle cx="370" cy="12" r="0.6" fill="#C4A44E" />
        </svg>
      </div>

      {/* ── Ocean ── */}
      <div className="absolute left-0 right-0" style={{ zIndex: 2, bottom: "5%", height: "25%" }}>
        {/* Wave 1 — deep back */}
        <svg
          className="not-found-wave-1 w-full absolute"
          style={{ bottom: 0, display: "block", minWidth: "150%" }}
          viewBox="0 0 2160 160"
          preserveAspectRatio="none"
          height="110"
        >
          <defs>
            <linearGradient id="wave1grad" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#4DD0E1" stopOpacity="0.3" />
              <stop offset="100%" stopColor="#00838F" stopOpacity="0.5" />
            </linearGradient>
          </defs>
          <path
            d="M0 50 C120 20, 240 80, 360 50 C480 20, 600 80, 720 50 C840 20, 960 80, 1080 50 C1200 20, 1320 80, 1440 50 C1560 20, 1680 80, 1800 50 C1920 20, 2040 80, 2160 50 L2160 160 L0 160Z"
            fill="url(#wave1grad)"
          />
        </svg>

        {/* Wave 2 — mid with foam */}
        <svg
          className="not-found-wave-2 w-full absolute"
          style={{ bottom: 0, display: "block", minWidth: "140%" }}
          viewBox="0 0 2016 140"
          preserveAspectRatio="none"
          height="90"
        >
          <defs>
            <linearGradient id="wave2grad" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#26C6DA" stopOpacity="0.4" />
              <stop offset="100%" stopColor="#00838F" stopOpacity="0.7" />
            </linearGradient>
          </defs>
          {/* Foam line */}
          <path
            d="M0 58 C90 42, 180 52, 270 45 C360 38, 450 55, 540 48 C630 41, 720 56, 810 46 C900 36, 990 54, 1080 48 C1170 42, 1260 52, 1350 45 C1440 38, 1530 55, 1620 48 C1710 41, 1800 56, 1890 46 C1980 36, 2016 48, 2016 48"
            fill="none"
            stroke="rgba(255,255,255,0.5)"
            strokeWidth="2"
          />
          <path
            d="M0 55 C100 30, 200 70, 340 50 C480 30, 580 75, 720 55 C860 35, 960 70, 1080 50 C1200 30, 1300 75, 1440 55 C1580 35, 1680 70, 1800 50 C1920 30, 2016 55, 2016 55 L2016 140 L0 140Z"
            fill="url(#wave2grad)"
          />
        </svg>

        {/* Wave 3 — front (most visible) */}
        <svg
          className="not-found-wave-3 w-full absolute"
          style={{ bottom: 0, display: "block", minWidth: "130%" }}
          viewBox="0 0 1872 100"
          preserveAspectRatio="none"
          height="65"
        >
          <defs>
            <linearGradient id="wave3grad" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#0097A7" stopOpacity="0.6" />
              <stop offset="60%" stopColor="#006064" stopOpacity="0.8" />
              <stop offset="100%" stopColor="#004D40" stopOpacity="0.9" />
            </linearGradient>
          </defs>
          {/* Foam crests */}
          <path
            d="M0 38 C60 30, 120 35, 200 32 C280 29, 340 38, 420 34 C500 30, 580 36, 660 32 C740 28, 820 37, 900 34 C980 31, 1060 36, 1140 32 C1220 28, 1300 37, 1380 34 C1460 31, 1540 36, 1620 32 C1700 28, 1780 36, 1872 34"
            fill="none"
            stroke="rgba(255,255,255,0.6)"
            strokeWidth="1.5"
          />
          <path
            d="M0 35 C80 15, 180 50, 310 35 C440 20, 530 55, 660 35 C790 15, 880 50, 1020 35 C1150 20, 1250 55, 1380 35 C1510 15, 1600 50, 1740 35 C1820 25, 1872 35, 1872 35 L1872 100 L0 100Z"
            fill="url(#wave3grad)"
          />
          {/* Sparkle dots on water */}
          <circle cx="200" cy="45" r="1.5" fill="rgba(255,255,255,0.4)" className="not-found-sparkle" />
          <circle cx="500" cy="42" r="1" fill="rgba(255,255,255,0.3)" className="not-found-sparkle-2" />
          <circle cx="850" cy="48" r="1.5" fill="rgba(255,255,255,0.35)" className="not-found-sparkle" />
          <circle cx="1100" cy="44" r="1" fill="rgba(255,255,255,0.3)" className="not-found-sparkle-2" />
          <circle cx="1400" cy="46" r="1.5" fill="rgba(255,255,255,0.4)" className="not-found-sparkle" />
        </svg>
      </div>
    </div>
  );
}
