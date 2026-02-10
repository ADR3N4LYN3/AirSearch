import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: "standalone",

  // Externalize Playwright packages from webpack bundling (critical for standalone output)
  serverExternalPackages: [
    "playwright-core",
    "playwright-extra",
    "puppeteer-extra-plugin-stealth",
  ],

  // Production optimizations
  poweredByHeader: false,
  compress: true,
  generateEtags: true,

  // Security headers
  async headers() {
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
          { key: 'Strict-Transport-Security', value: 'max-age=31536000; includeSubDomains' },
          {
            key: 'Content-Security-Policy',
            value: "default-src 'self'; script-src 'self' 'unsafe-eval' 'unsafe-inline' https://maps.googleapis.com; style-src 'self' 'unsafe-inline' https://fonts.googleapis.com; font-src 'self' https://fonts.gstatic.com; img-src 'self' data: https:; connect-src 'self' https://api.anthropic.com https://maps.googleapis.com;",
          },
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
