import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  reactStrictMode: true,
  transpilePackages: [
    "@shinatga/ui",
    "@shinatga/editor",
    "@shinatga/templates",
    "@shinatga/database",
  ],
  experimental: {
    optimizePackageImports: ["@shinatga/ui", "@shinatga/editor"],
  },
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "lh3.googleusercontent.com",
      },
    ],
  },
};

export default nextConfig;
