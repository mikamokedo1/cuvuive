import { getAllPosts } from "@/libs/blog";
import { HeaderHome } from "./HeaderHome";
import { type SearchItem } from "@/libs/utils/search-data";

/**
 * Server Component wrapper for HeaderHome.
 * Fetches blog posts on the server and passes a lightweight search index
 * to the client-side HeaderHome → SearchOverlay.
 *
 * Use this instead of <HeaderHome /> when you want search to include blog results.
 */
export async function HeaderHomeWithSearch() {
  const posts = await getAllPosts();

  const blogSearchItems: SearchItem[] = posts.map((post) => ({
    id: post.slug,
    title: post.title,
    description: post.description,
    href: `/blogs/${post.slug}`,
    type: "blog" as const,
  }));

  return <HeaderHome blogSearchItems={blogSearchItems} />;
}
