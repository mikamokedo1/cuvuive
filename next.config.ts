import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  output: "standalone",
  reactCompiler: true,
  experimental: {
    optimizePackageImports: ["lucide-react", "framer-motion"],
  },
  webpack: (config) => {
    config.module.rules.push({
      test: /\.mp3$/,
      type: "asset/resource",
    });
    return config;
  },
};

export default nextConfig;
