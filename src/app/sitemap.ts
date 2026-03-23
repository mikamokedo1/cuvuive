import { MetadataRoute } from "next";
import fs from "fs";
import path from "path";
import matter from "gray-matter";
import { GROUPS } from "@/libs/constants/groups";

// Use a stable build date instead of new Date() which changes on every request
const BUILD_DATE = new Date("2026-03-23");

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = "https://cuthongminh.com";

  const staticRoutes: MetadataRoute.Sitemap = [
    { url: baseUrl, lastModified: BUILD_DATE, changeFrequency: "weekly", priority: 1 },
    { url: `${baseUrl}/games`, lastModified: BUILD_DATE, changeFrequency: "weekly", priority: 0.9 },
    { url: `${baseUrl}/privacy`, lastModified: BUILD_DATE, changeFrequency: "yearly", priority: 0.5 },
    { url: `${baseUrl}/terms`, lastModified: BUILD_DATE, changeFrequency: "yearly", priority: 0.5 },
    { url: `${baseUrl}/feedback`, lastModified: BUILD_DATE, changeFrequency: "monthly", priority: 0.5 },
    { url: `${baseUrl}/about-us`, lastModified: BUILD_DATE, changeFrequency: "monthly", priority: 0.5 },
    { url: `${baseUrl}/gioi-thieu-kiem-tien`, lastModified: BUILD_DATE, changeFrequency: "monthly", priority: 0.6 },
  ];

  // Group landing pages (e.g. /tro-choi-tu-duy, /tro-choi-toan-hoc)
  const groupRoutes: MetadataRoute.Sitemap = GROUPS.map((group) => ({
    url: `${baseUrl}/${group.slug}`,
    lastModified: BUILD_DATE,
    changeFrequency: "weekly",
    priority: 0.8,
  }));

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
      lastModified: BUILD_DATE,
      changeFrequency: "monthly",
      priority: 0.8,
    }));
  } catch (error) {
    console.error("Error generating sitemap for games:", error);
  }

  // Dynamically get all blog routes with actual dates from frontmatter
  const blogsDir = path.join(process.cwd(), "content/blogs");
  let blogRoutes: MetadataRoute.Sitemap = [];

  try {
    if (fs.existsSync(blogsDir)) {
      const blogFiles = fs.readdirSync(blogsDir).filter((file) => file.endsWith(".mdx"));

      blogRoutes = blogFiles.map((file) => {
        const slug = file.replace(/\.mdx$/, "");
        // Read frontmatter to get actual date
        let lastModified = BUILD_DATE;
        try {
          const content = fs.readFileSync(path.join(blogsDir, file), "utf8");
          const { data } = matter(content);
          if (data.dateModified) {
            lastModified = new Date(data.dateModified);
          } else if (data.date) {
            lastModified = new Date(data.date);
          }
        } catch {
          // fallback to BUILD_DATE
        }
        return {
          url: `${baseUrl}/blogs/${slug}`,
          lastModified,
          changeFrequency: "weekly",
          priority: 0.7,
        };
      });
    }
  } catch (error) {
    console.error("Error generating sitemap for blogs:", error);
  }

  // Collect unique blog tags for tag pages
  let tagRoutes: MetadataRoute.Sitemap = [];
  try {
    if (fs.existsSync(blogsDir)) {
      const blogFiles = fs.readdirSync(blogsDir).filter((file) => file.endsWith(".mdx"));
      const tagSet = new Set<string>();
      for (const file of blogFiles) {
        try {
          const content = fs.readFileSync(path.join(blogsDir, file), "utf8");
          const { data } = matter(content);
          if (data.tags && Array.isArray(data.tags)) {
            data.tags.forEach((tag: string) => tagSet.add(tag));
          }
        } catch {
          // skip
        }
      }
      tagRoutes = Array.from(tagSet).map((tag) => ({
        url: `${baseUrl}/blogs/tag/${encodeURIComponent(tag)}`,
        lastModified: BUILD_DATE,
        changeFrequency: "weekly",
        priority: 0.5,
      }));
    }
  } catch (error) {
    console.error("Error generating sitemap for blog tags:", error);
  }

  // Also add the main /blogs listing page
  const blogListingRoute: MetadataRoute.Sitemap = [
    { url: `${baseUrl}/blogs`, lastModified: BUILD_DATE, changeFrequency: "weekly", priority: 0.8 },
  ];

  return [...staticRoutes, ...groupRoutes, ...gameRoutes, ...blogListingRoute, ...blogRoutes, ...tagRoutes];
}
