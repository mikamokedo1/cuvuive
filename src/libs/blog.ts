import fs from "fs";
import path from "path";
import matter from "gray-matter";

// Define the shape of our blog post frontmatter
export interface BlogPost {
  slug: string;
  title: string;
  description: string;
  date: string; // ISO 8601 string, e.g., '2026-03-08'
  author: string;
  tags?: string[];
  image?: string;
  content: string;
  readingTime: number;
}

const blogsDirectory = path.join(process.cwd(), "content/blogs");

/**
 * Ensures the blogs directory exists
 */
function ensureBlogsDirectory() {
  if (!fs.existsSync(blogsDirectory)) {
    fs.mkdirSync(blogsDirectory, { recursive: true });
  }
}

/**
 * Calculates a rough reading time based on word count
 */
function calculateReadingTime(content: string): number {
  const wordsPerMinute = 200;
  const wordCount = content.split(/\s+/).length;
  return Math.max(1, Math.ceil(wordCount / wordsPerMinute));
}

/**
 * Gets a single blog post by its slug (filename without .mdx)
 */
export async function getPostBySlug(slug: string): Promise<BlogPost | null> {
  ensureBlogsDirectory();

  try {
    const fullPath = path.join(blogsDirectory, `${slug}.mdx`);
    const fileContents = fs.readFileSync(fullPath, "utf8");

    // Parse the MDX frontmatter and content using gray-matter
    const { data, content } = matter(fileContents);

    return {
      slug,
      title: data.title || "Untitled",
      description: data.description || "",
      date: data.date || "",
      author: data.author || "Cú Thông Minh",
      tags: data.tags || [],
      image: data.image || "/og-image.png",
      content,
      readingTime: calculateReadingTime(content),
    };
  } catch (e) {
    console.error(`Error reading blog post ${slug}:`, e);
    return null;
  }
}

/**
 * Gets all blog posts, sorted by date (newest first)
 */
export async function getAllPosts(): Promise<BlogPost[]> {
  ensureBlogsDirectory();

  try {
    const fileNames = fs.readdirSync(blogsDirectory);

    // Only process .mdx files
    const allPostsData = await Promise.all(
      fileNames
        .filter((fileName) => fileName.endsWith(".mdx"))
        .map(async (fileName) => {
          const slug = fileName.replace(/\.mdx$/, "");
          return await getPostBySlug(slug);
        }),
    );

    // Filter out nulls and sort by date
    const validPosts = allPostsData.filter((post): post is BlogPost => post !== null);

    return validPosts.sort((a, b) => {
      if (a.date < b.date) {
        return 1; // b is newer
      } else {
        return -1; // a is newer
      }
    });
  } catch (e) {
    console.error("Error reading blogs directory:", e);
    return [];
  }
}
