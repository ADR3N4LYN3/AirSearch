import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: "standalone",

  // Externalize browser automation & native packages from webpack bundling (critical for standalone output)
  serverExternalPackages: [
    "patchright",
    "fingerprint-generator",
    "fingerprint-injector",
    "better-sqlite3",
  ],

  // Production optimizations
  poweredByHeader: false,
  compress: false, // nginx handles compression — avoid double gzip
  generateEtags: true,

  // Security headers — single source of truth (nginx only adds HSTS for non-proxied responses)
  async headers() {
    // CSP directives explained:
    // - unsafe-eval: required by Google Maps JavaScript API (uses eval() internally)
    // - unsafe-inline in script-src: required for theme toggle inline script in layout.tsx
    // - unsafe-inline in style-src: required for Google Maps injected styles
    // - worker-src blob:: required by @lottiefiles/dotlottie-react WASM Web Worker
    const csp = [
      "default-src 'self'",
      "script-src 'self' 'unsafe-eval' 'unsafe-inline' https://maps.googleapis.com",
      "style-src 'self' 'unsafe-inline' https://fonts.googleapis.com",
      "font-src 'self' https://fonts.gstatic.com",
      "img-src 'self' data: https:",
      "connect-src 'self' https://api.anthropic.com https://maps.googleapis.com",
      "worker-src 'self' blob:",
      "frame-src 'self'",
    ].join("; ");

    return [
      {
        source: '/:path*',
        headers: [
          { key: 'X-DNS-Prefetch-Control', value: 'on' },
          { key: 'X-Frame-Options', value: 'DENY' },
          { key: 'X-Content-Type-Options', value: 'nosniff' },
          { key: 'X-XSS-Protection', value: '1; mode=block' },
          { key: 'Referrer-Policy', value: 'strict-origin-when-cross-origin' },
          { key: 'Permissions-Policy', value: 'camera=(), microphone=(), geolocation=(self), interest-cohort=()' },
          // HSTS is managed solely by nginx (covers non-proxied responses too)
          { key: 'Content-Security-Policy', value: csp },
        ],
      },
    ];
  },

  // Logging for production debugging
  logging: {
    fetches: {
      fullUrl: true,
    },
  },
};

export default nextConfig;
