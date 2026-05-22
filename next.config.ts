import type { NextConfig } from "next";
import withBundleAnalyzer from "@next/bundle-analyzer";

const analyzeBundles = withBundleAnalyzer({
  enabled: process.env.ANALYZE === "true",
});

const nextConfig: NextConfig = {
  /* config options here */
  output: "standalone",
  outputFileTracingRoot: process.cwd(),
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
      {
        protocol: "https",
        hostname: "cuthongminh.com",
        port: "",
        pathname: "/**",
      },
    ],
    formats: ["image/avif", "image/webp"],
    minimumCacheTTL: 2592000, // 30 days server-side cache
  },
  async headers() {
    const securityHeaders = [
      {
        key: "X-Content-Type-Options",
        value: "nosniff",
      },
      {
        key: "X-Frame-Options",
        value: "DENY",
      },
      {
        key: "X-XSS-Protection",
        value: "1; mode=block",
      },
      {
        key: "Referrer-Policy",
        value: "strict-origin-when-cross-origin",
      },
      {
        key: "Permissions-Policy",
        value: "camera=(), microphone=(self), geolocation=(), interest-cohort=()",
      },
      {
        key: "Strict-Transport-Security",
        value: "max-age=63072000; includeSubDomains; preload",
      },
      {
        key: "Content-Security-Policy",
        value:
          "default-src 'self'; script-src 'self' 'unsafe-inline' 'unsafe-eval' https://www.googletagmanager.com; style-src 'self' 'unsafe-inline'; img-src 'self' https://assets.cuthongminh.com https://vnlppyavpkuerviyszxg.supabase.co https://qr.sepay.vn data: blob:; font-src 'self' data:; connect-src 'self' wss://*.supabase.co https://*.supabase.co https://www.google-analytics.com https://assets.cuthongminh.com; media-src 'self' https://assets.cuthongminh.com;",
      },
    ];

    return [
      {
        // Apply security headers to all routes
        source: "/(.*)",
        headers: securityHeaders,
      },
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
  async redirects() {
    return [
      // Blog merges — consolidate cannibalized content
      // Pair 1: tro-choi-me-cung → me-cung-cho-be
      {
        source: "/blogs/tro-choi-me-cung",
        destination: "/blogs/me-cung-cho-be",
        permanent: true,
      },
      // Pair 3: be-hoc-ghep-van-nhu-the-nao → be-hoc-ghep-van
      {
        source: "/blogs/be-hoc-ghep-van-nhu-the-nao",
        destination: "/blogs/be-hoc-ghep-van",
        permanent: true,
      },
      // Pair 4: hoc-xem-dong-ho → hoc-xem-dong-ho-cho-be
      {
        source: "/blogs/hoc-xem-dong-ho",
        destination: "/blogs/hoc-xem-dong-ho-cho-be",
        permanent: true,
      },
      // Pair 5: be-hoc-dau-tieng-viet → dau-tieng-viet-cho-be
      {
        source: "/blogs/be-hoc-dau-tieng-viet",
        destination: "/blogs/dau-tieng-viet-cho-be",
        permanent: true,
      },
      // Pair 7: hoc-mau-sac → mau-sac-cho-tre-mau-giao
      {
        source: "/blogs/hoc-mau-sac",
        destination: "/blogs/mau-sac-cho-tre-mau-giao",
        permanent: true,
      },
    ];
  },
  experimental: {
    optimizePackageImports: [
      "lucide-react",
      "framer-motion",
      "react-hot-toast",
      "clsx",
      "class-variance-authority",
      "formik",
      "yup",
      "@supabase/supabase-js",
      "@supabase/ssr",
    ],
  },
  turbopack: {},
  webpack: (config) => {
    config.module.rules.push({
      test: /\.mp3$/,
      type: "asset/resource",
    });
    return config;
  },
};

export default analyzeBundles(nextConfig);
