import { MetadataRoute } from "next";
import fs from "fs";
import path from "path";
import matter from "gray-matter";
import { GROUPS } from "@/libs/constants/groups";
import { AGE_GROUPS } from "@/libs/constants/ages";
import { normalizeTagPathSegment } from "@/libs/utils/tag-slug";

function getLatestMtime(...relativePaths: string[]): Date {
  const timestamps = relativePaths
    .map((relativePath) => path.join(process.cwd(), relativePath))
    .filter((absolutePath) => fs.existsSync(absolutePath))
    .map((absolutePath) => fs.statSync(absolutePath).mtime.getTime());

  return timestamps.length > 0 ? new Date(Math.max(...timestamps)) : new Date();
}

function getGameRouteLastModified(gameId: string): Date {
  return getLatestMtime(
    `src/app/games/${gameId}/page.tsx`,
    `src/app/games/${gameId}/layout.tsx`,
    "src/libs/constants/courses.ts",
    "src/libs/constants/game-seo.ts",
  );
}

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = "https://cuthongminh.com";

  const staticRoutes: MetadataRoute.Sitemap = [
    {
      url: baseUrl,
      lastModified: getLatestMtime("src/app/page.tsx", "src/app/layout.tsx"),
      changeFrequency: "weekly",
      priority: 1,
    },
    {
      url: `${baseUrl}/games`,
      lastModified: getLatestMtime("src/app/games/page.tsx", "src/libs/constants/courses.ts"),
      changeFrequency: "weekly",
      priority: 0.9,
    },
    {
      url: `${baseUrl}/privacy`,
      lastModified: getLatestMtime("src/app/privacy/page.tsx"),
      changeFrequency: "yearly",
      priority: 0.5,
    },
    {
      url: `${baseUrl}/terms`,
      lastModified: getLatestMtime("src/app/terms/page.tsx"),
      changeFrequency: "yearly",
      priority: 0.5,
    },
    {
      url: `${baseUrl}/feedback`,
      lastModified: getLatestMtime("src/app/feedback/page.tsx"),
      changeFrequency: "monthly",
      priority: 0.5,
    },
    {
      url: `${baseUrl}/about-us`,
      lastModified: getLatestMtime("src/app/about-us/page.tsx"),
      changeFrequency: "monthly",
      priority: 0.5,
    },
    {
      url: `${baseUrl}/editorial-policy`,
      lastModified: getLatestMtime("src/app/editorial-policy/page.tsx"),
      changeFrequency: "monthly",
      priority: 0.5,
    },
    {
      url: `${baseUrl}/gioi-thieu-kiem-tien`,
      lastModified: getLatestMtime("src/app/gioi-thieu-kiem-tien/page.tsx", "src/app/gioi-thieu-kiem-tien/layout.tsx"),
      changeFrequency: "monthly",
      priority: 0.6,
    },
    {
      url: `${baseUrl}/blogs`,
      lastModified: getLatestMtime("src/app/blogs/page.tsx", "content/blogs"),
      changeFrequency: "weekly",
      priority: 0.8,
    },
    {
      url: `${baseUrl}/upgrade`,
      lastModified: getLatestMtime("src/app/upgrade/page.tsx"),
      changeFrequency: "monthly",
      priority: 0.5,
    },
    {
      url: `${baseUrl}/cong-cu`,
      lastModified: getLatestMtime("src/app/cong-cu/page.tsx"),
      changeFrequency: "monthly",
      priority: 0.7,
    },
    {
      url: `${baseUrl}/cong-cu/chieu-cao-can-nang`,
      lastModified: getLatestMtime("src/app/cong-cu/chieu-cao-can-nang/page.tsx"),
      changeFrequency: "monthly",
      priority: 0.8,
    },
    {
      url: `${baseUrl}/cong-cu/ten-tieng-anh-cho-be`,
      lastModified: getLatestMtime("src/app/cong-cu/ten-tieng-anh-cho-be/page.tsx"),
      changeFrequency: "monthly",
      priority: 0.8,
    },
  ];

  // Group landing pages (e.g. /tro-choi-tu-duy, /tro-choi-toan-hoc)
  const groupRoutes: MetadataRoute.Sitemap = GROUPS.map((group) => ({
    url: `${baseUrl}/${group.slug}`,
    lastModified: getLatestMtime(
      "src/app/[slug]/page.tsx",
      "src/libs/constants/groups.ts",
      "src/libs/constants/courses.ts",
    ),
    changeFrequency: "weekly",
    priority: 0.8,
  }));

  // Age landing pages
  const ageRoutes: MetadataRoute.Sitemap = AGE_GROUPS.map((age) => ({
    url: `${baseUrl}/do-tuoi/${age.slug}`,
    lastModified: getLatestMtime(
      "src/app/do-tuoi/[age]/page.tsx",
      "src/libs/constants/ages.ts",
      "src/libs/constants/courses.ts",
    ),
    changeFrequency: "weekly",
    priority: 0.85,
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
      lastModified: getGameRouteLastModified(game),
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
        let lastModified = getLatestMtime(`content/blogs/${file}`, "src/app/blogs/[slug]/page.tsx");
        try {
          const content = fs.readFileSync(path.join(blogsDir, file), "utf8");
          const { data } = matter(content);
          if (data.dateModified) {
            lastModified = new Date(data.dateModified);
          } else if (data.date) {
            lastModified = new Date(data.date);
          }
        } catch {
          // fallback to file mtime
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

  // Collect unique blog tags for tag pages (only include tags with ≥3 posts to match noindex threshold)
  let tagRoutes: MetadataRoute.Sitemap = [];
  try {
    if (fs.existsSync(blogsDir)) {
      const blogFiles = fs.readdirSync(blogsDir).filter((file) => file.endsWith(".mdx"));
      const tagCountMap = new Map<string, { normalizedTag: string; count: number }>();
      for (const file of blogFiles) {
        try {
          const content = fs.readFileSync(path.join(blogsDir, file), "utf8");
          const { data } = matter(content);
          if (data.tags && Array.isArray(data.tags)) {
            data.tags.forEach((tag: string) => {
              const normalized = normalizeTagPathSegment(tag);
              const existing = tagCountMap.get(normalized);
              tagCountMap.set(normalized, {
                normalizedTag: normalized,
                count: (existing?.count || 0) + 1,
              });
            });
          }
        } catch {
          // skip
        }
      }
      // Only include tag pages with ≥3 posts (pages with <3 posts are noindex'd)
      tagRoutes = Array.from(tagCountMap.values())
        .filter(({ count }) => count >= 3)
        .map(({ normalizedTag }) => ({
          url: `${baseUrl}/blogs/tag/${normalizedTag}`,
          lastModified: getLatestMtime("src/app/blogs/tag/[tag]/page.tsx", "content/blogs"),
          changeFrequency: "weekly",
          priority: 0.5,
        }));
    }
  } catch (error) {
    console.error("Error generating sitemap for blog tags:", error);
  }

  return [...staticRoutes, ...groupRoutes, ...ageRoutes, ...gameRoutes, ...blogRoutes, ...tagRoutes];
}
