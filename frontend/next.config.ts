import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Allow your phone/other devices on the local network to access Next.js dev resources
  allowedDevOrigins: [""],

  // Stop Next.js from 308-redirecting "/foo/" -> "/foo" before rewrites run.
  // Otherwise proxied API paths lose their trailing slash and Django's
  // APPEND_SLASH rejects non-GET requests (POST bodies can't survive redirects).
  skipTrailingSlashRedirect: true,

  // Googlebot normally gets streamed metadata, so on slower pages (categories) the
  // <title>, robots and canonical landed in <body>. Send them in <head> for every crawler.
  htmlLimitedBots: /.*/,

  // Early article URLs that were renamed; keep their links and ranking signals.
  async redirects() {
    return [
      { source: '/articles/apollo-11-moon-landing', destination: '/articles/apollo-11-engineering-behind-first-moon-landing', permanent: true },
      { source: '/articles/crispr-cas9-gene-editing', destination: '/articles/crispr-gene-editing-capabilities-limits', permanent: true },
      { source: '/articles/dark-matter-dark-energy', destination: '/articles/dark-matter-dark-energy-different-mysteries', permanent: true },
      { source: '/articles/james-webb-space-telescope-first-light', destination: '/articles/how-james-webb-space-telescope-reads-early-universe', permanent: true },
      { source: '/articles/quantum-entanglement-explained', destination: '/articles/quantum-entanglement-without-faster-than-light-myth', permanent: true },
    ];
  },

  // Proxy all /api/* requests to Django — keeps fetches same-origin,
  // bypassing browser extension interference and CORS issues.
  // The first rule preserves the trailing slash Django expects; the second
  // is the fallback for slash-less paths.
  async rewrites() {
    const configuredApiUrl = process.env.NEXT_PUBLIC_API_URL ?? 'http://localhost:8000/api/v1';
    const backendUrl = configuredApiUrl.replace(/\/api\/v1\/?$/, '');
    return [
      {
        source: '/api/:path*/',
        destination: `${backendUrl}/api/:path*/`,
      },
      {
        source: '/api/:path*',
        destination: `${backendUrl}/api/:path*`,
      },
    ];
  },

  images: {
    formats: ["image/avif", "image/webp"],
    remotePatterns: [
      {
        protocol: "https",
        hostname: "**",
      },
    ],
  },
};

export default nextConfig;
