import type { NextConfig } from "next";
import legacyRedirects from "./redirects.json";

// `npm run build:static` sets STATIC_EXPORT=1 to produce plain files in out/ for Cloudflare.
// Redirects and rewrites need a server, so that build writes redirects to out/_redirects instead.
const STATIC_EXPORT = process.env.STATIC_EXPORT === "1";

const nextConfig: NextConfig = {
  ...(STATIC_EXPORT ? { output: "export" as const } : {}),

  env: {
    NEXT_PUBLIC_STATIC_EXPORT: STATIC_EXPORT ? "1" : "",
  },

  // Allow your phone/other devices on the local network to access Next.js dev resources
  allowedDevOrigins: [""],

  // Stop Next.js from 308-redirecting "/foo/" -> "/foo" before rewrites run.
  // Otherwise proxied API paths lose their trailing slash and Django's
  // APPEND_SLASH rejects non-GET requests (POST bodies can't survive redirects).
  skipTrailingSlashRedirect: true,

  // Googlebot normally gets streamed metadata, so on slower pages (categories) the
  // <title>, robots and canonical landed in <body>. Send them in <head> for every crawler.
  htmlLimitedBots: /.*/,

  ...(STATIC_EXPORT
    ? {}
    : {
        // Early article URLs that were renamed, and one merged duplicate; keep their links and ranking signals.
        async redirects() {
          return legacyRedirects.map((redirect) => ({ ...redirect, permanent: true }));
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
      }),

  images: {
    // A static export has no image optimizer; images are already sized webp files or sized remote URLs.
    unoptimized: STATIC_EXPORT,
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
