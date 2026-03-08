import { MetadataRoute } from "next";
import fs from "fs";
import path from "path";

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = "https://cuthongminh.com";

  const staticRoutes: MetadataRoute.Sitemap = [
    { url: baseUrl, lastModified: new Date(), changeFrequency: "weekly", priority: 1 },
    { url: `${baseUrl}/games`, lastModified: new Date(), changeFrequency: "weekly", priority: 0.9 },
    { url: `${baseUrl}/privacy`, lastModified: new Date(), changeFrequency: "yearly", priority: 0.5 },
    { url: `${baseUrl}/terms`, lastModified: new Date(), changeFrequency: "yearly", priority: 0.5 },
    { url: `${baseUrl}/feedback`, lastModified: new Date(), changeFrequency: "monthly", priority: 0.5 },
  ];

  // Dynamically get all game routes
  const gamesDir = path.join(process.cwd(), "src/app/games");
  let gameRoutes: MetadataRoute.Sitemap = [];

  try {
    const gameFolders = fs.readdirSync(gamesDir).filter((file) => {
      const isDir = fs.statSync(path.join(gamesDir, file)).isDirectory();
      // Filter out Next.js special folders like [groupId]
      return isDir && !file.startsWith("[") && !file.startsWith(".");
    });

    gameRoutes = gameFolders.map((game) => ({
      url: `${baseUrl}/games/${game}`,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.8,
    }));
  } catch (error) {
    console.error("Error generating sitemap for games:", error);
  }

  // Dynamically get all blog routes
  const blogsDir = path.join(process.cwd(), "content/blogs");
  let blogRoutes: MetadataRoute.Sitemap = [];

  try {
    if (fs.existsSync(blogsDir)) {
      const blogFiles = fs.readdirSync(blogsDir).filter((file) => file.endsWith(".mdx"));

      blogRoutes = blogFiles.map((file) => {
        const slug = file.replace(/\.mdx$/, "");
        return {
          url: `${baseUrl}/blogs/${slug}`,
          lastModified: new Date(),
          changeFrequency: "weekly",
          priority: 0.7,
        };
      });
    }
  } catch (error) {
    console.error("Error generating sitemap for blogs:", error);
  }

  // Also add the main /blogs listing page
  const blogListingRoute: MetadataRoute.Sitemap = [
    { url: `${baseUrl}/blogs`, lastModified: new Date(), changeFrequency: "weekly", priority: 0.8 },
  ];

  return [...staticRoutes, ...gameRoutes, ...blogListingRoute, ...blogRoutes];
}
