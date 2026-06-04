import { COURSES } from "@/libs/constants/courses";
import { GROUPS } from "@/libs/constants/groups";

export interface SearchItem {
  id: string;
  title: string;
  description: string;
  href: string;
  type: "game" | "blog";
  icon?: string;
  category?: string;
}

/**
 * Remove Vietnamese diacritics for fuzzy matching.
 * "Trò chơi" → "tro choi"
 */
export function removeVietnameseDiacritics(str: string): string {
  return str
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/đ/gi, "d")
    .toLowerCase()
    .trim();
}

/**
 * Search items by query. Matches on normalized (no-diacritics) title and description.
 * Returns items sorted by relevance (title match first, then description match).
 */
export function searchItems(query: string, items: SearchItem[]): SearchItem[] {
  if (!query.trim()) return [];

  const normalizedQuery = removeVietnameseDiacritics(query);
  const queryWords = normalizedQuery.split(/\s+/).filter(Boolean);

  if (queryWords.length === 0) return [];

  return items
    .map((item) => {
      const normalizedTitle = removeVietnameseDiacritics(item.title);
      const normalizedDesc = removeVietnameseDiacritics(item.description);
      const normalizedCategory = item.category
        ? removeVietnameseDiacritics(item.category)
        : "";

      // Check if all query words appear in title or description
      const titleMatches = queryWords.filter((word) =>
        normalizedTitle.includes(word)
      ).length;
      const descMatches = queryWords.filter((word) =>
        normalizedDesc.includes(word)
      ).length;
      const categoryMatches = queryWords.filter((word) =>
        normalizedCategory.includes(word)
      ).length;

      const totalMatches = titleMatches + descMatches + categoryMatches;

      // Require at least one word match
      if (totalMatches === 0) return null;

      // Score: title matches worth 3x, category 2x, description 1x
      const score = titleMatches * 3 + categoryMatches * 2 + descMatches;

      return { item, score };
    })
    .filter(Boolean)
    .sort((a, b) => b!.score - a!.score)
    .map((entry) => entry!.item);
}

/**
 * Build search index for games from COURSES constant.
 * This is statically available and doesn't require server-side data.
 */
export function getGameSearchItems(): SearchItem[] {
  return COURSES.map((course) => {
    const group = GROUPS.find((g) => g.id === course.type);
    return {
      id: course.id,
      title: course.title,
      description: course.description,
      href: `/games/${course.id}`,
      type: "game" as const,
      icon: typeof course.icon === "string" ? course.icon : undefined,
      category: group?.title,
    };
  });
}
