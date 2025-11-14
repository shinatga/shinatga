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
};

export default nextConfig;
