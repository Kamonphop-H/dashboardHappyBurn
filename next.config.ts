/** @format */

// next.config.ts
import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      { protocol: "https", hostname: "lh3.googleusercontent.com" },
      { protocol: "https", hostname: "drive.google.com" },
      { protocol: "https", hostname: "*.googleusercontent.com" },
      { protocol: "https", hostname: "upload.wikimedia.org" },
    ],
  },
  // ลบทิ้งหรือคอมเมนต์บล็อก experimental ออกไปก็ได้
  // experimental: { optimizeCss: true },
  reactStrictMode: true,
  swcMinify: true,
};

export default nextConfig;
