import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Allow your phone/other devices on the local network to access Next.js dev resources
  allowedDevOrigins: ["192.168.100.25", "192.168.11.113"],

  // Proxy all /api/* requests to Django — keeps fetches same-origin,
  // bypassing browser extension interference and CORS issues.
  async rewrites() {
    const backendUrl = process.env.NEXT_PUBLIC_API_URL ?? 'http://localhost:8000';
    return [
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
