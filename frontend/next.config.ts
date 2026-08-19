import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Allow your phone/other devices on the local network to access Next.js dev resources
  allowedDevOrigins: ["192.168.100.25"],
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
