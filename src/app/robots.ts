import type { MetadataRoute } from "next";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: "*",
      allow: "/",
      disallow: ["/auth/", "/settings/", "/learn-progress/", "/api/"],
    },
    sitemap: "https://cuthongminh.com/sitemap.xml",
  };
}
