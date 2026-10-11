import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Allow your phone/other devices on the local network to access Next.js dev resources
  allowedDevOrigins: [""],

  // Stop Next.js from 308-redirecting "/foo/" -> "/foo" before rewrites run.
  // Otherwise proxied API paths lose their trailing slash and Django's
  // APPEND_SLASH rejects non-GET requests (POST bodies can't survive redirects).
  skipTrailingSlashRedirect: true,

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
