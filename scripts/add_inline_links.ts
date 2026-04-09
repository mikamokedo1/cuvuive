import fs from "fs";
import path from "path";
import matter from "gray-matter";
import { TOPIC_CLUSTERS, GENERAL_PARENTING_SLUGS } from "../src/libs/seo/topic-clusters";
import { getPostBySlug } from "../src/libs/blog";

async function main() {
  const blogsDir = path.join(process.cwd(), "content/blogs");
  const files = fs.readdirSync(blogsDir).filter(f => f.endsWith(".mdx"));

  let updatedCount = 0;

  for (const file of files) {
    const slug = file.replace(/\.mdx$/, "");
    const fullPath = path.join(blogsDir, file);
    const content = fs.readFileSync(fullPath, "utf8");
    
    // Check if the file already has the injected "Đọc thêm" links to avoid duplicates
    if (content.includes("> **Đọc thêm:**")) {
      continue;
    }

    // Determine cluster
    let clusterSlugs: string[] = [];
    if (GENERAL_PARENTING_SLUGS.includes(slug)) {
      clusterSlugs = GENERAL_PARENTING_SLUGS;
    } else {
      for (const cluster of Object.values(TOPIC_CLUSTERS)) {
        if (cluster.blogSlugs.includes(slug)) {
          clusterSlugs = cluster.blogSlugs;
          break;
        }
      }
    }

    if (clusterSlugs.length < 2) continue; // nothing to link to

    // Get 2 other random slugs from the cluster (or ring buffer)
    const currentIndex = clusterSlugs.indexOf(slug);
    if (currentIndex === -1) continue;

    const nextSlug1 = clusterSlugs[(currentIndex + 1) % clusterSlugs.length];
    let nextSlug2 = clusterSlugs[(currentIndex + 2) % clusterSlugs.length];
    if (nextSlug1 === slug) continue;
    if (nextSlug2 === slug) nextSlug2 = clusterSlugs[(currentIndex + 3) % clusterSlugs.length]; // try to find a distinct one
    if (nextSlug2 === slug || nextSlug2 === nextSlug1) nextSlug2 = "";

    const post1 = await getPostBySlug(nextSlug1);
    const post2 = nextSlug2 ? await getPostBySlug(nextSlug2) : null;

    if (!post1) continue;

    let linkStr = `> **Đọc thêm:** [${post1.title}](/blogs/${post1.slug})`;
    if (post2) {
      linkStr += ` và [${post2.title}](/blogs/${post2.slug})`;
    }

    // Parse the MDX using gray-matter to separate frontmatter and body
    const parsed = matter(content);
    let body = parsed.content;

    // Split body by paragraphs
    const paragraphs = body.split(/\n\n+/);
    
    // Inject after the 2nd paragraph (if available) or 1st
    let injectIndex = 2;
    if (paragraphs.length < 3) injectIndex = 1;
    if (paragraphs.length < 2) continue;

    // Filter out imports/exports
    let actualParagraphCount = 0;
    let actualInjectIndex = -1;
    for (let i = 0; i < paragraphs.length; i++) {
      const p = paragraphs[i].trim();
      // Skip imports, components, headings
      if (!p.startsWith("import") && !p.startsWith("<") && !p.startsWith("#")) {
        actualParagraphCount++;
        if (actualParagraphCount === injectIndex) {
          actualInjectIndex = i;
          break;
        }
      }
    }

    if (actualInjectIndex !== -1) {
      paragraphs.splice(actualInjectIndex + 1, 0, linkStr);
      body = paragraphs.join("\n\n");
      
      const newFileContent = matter.stringify(body, parsed.data);
      fs.writeFileSync(fullPath, newFileContent, "utf8");
      updatedCount++;
    }
  }

  console.log(`Successfully added inline links to ${updatedCount} blog posts!`);
}

main().catch(console.error);
