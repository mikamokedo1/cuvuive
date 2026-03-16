import type { NextConfig } from "next";
import { withSentryConfig } from "@sentry/nextjs";

const nextConfig: NextConfig = {
  /* config options here */
  output: "standalone",
  reactCompiler: true,
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "vnlppyavpkuerviyszxg.supabase.co",
        port: "",
        pathname: "/storage/v1/object/public/**",
      },
      {
        protocol: "https",
        hostname: "assets.cuthongminh.com",
        port: "",
        pathname: "/**",
      },
    ],
    formats: ["image/avif", "image/webp"],
    minimumCacheTTL: 2592000, // 30 days server-side cache
  },
  async headers() {
    return [
      {
        source: "/_next/image",
        headers: [
          {
            key: "Cache-Control",
            value: "public, max-age=2592000, stale-while-revalidate=86400",
          },
        ],
      },
      {
        source: "/_next/static/(.*)",
        headers: [
          {
            key: "Cache-Control",
            value: "public, max-age=31536000, immutable",
          },
        ],
      },
      {
        source: "/icons/(.*)",
        headers: [
          {
            key: "Cache-Control",
            value: "public, max-age=2592000",
          },
        ],
      },
    ];
  },
  experimental: {
    optimizePackageImports: ["lucide-react", "framer-motion", "react-hot-toast", "clsx", "class-variance-authority"],
  },
  webpack: (config) => {
    config.module.rules.push({
      test: /\.mp3$/,
      type: "asset/resource",
    });
    return config;
  },
};

export default withSentryConfig(nextConfig, {
  // Upload source maps for readable stack traces
  org: process.env.SENTRY_ORG,
  project: process.env.SENTRY_PROJECT,
  authToken: process.env.SENTRY_AUTH_TOKEN,

  // Route Sentry requests through your server (avoids ad-blockers)
  tunnelRoute: "/monitoring",

  // Suppress source map upload logs outside CI
  silent: !process.env.CI,
});
