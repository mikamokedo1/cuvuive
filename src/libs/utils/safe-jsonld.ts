/**
 * Safely serialize JSON-LD data for embedding in <script> tags.
 * Escapes "</script>" patterns to prevent XSS when using dangerouslySetInnerHTML.
 */
export function safeJsonLd(data: Record<string, unknown>): string {
  return JSON.stringify(data).replace(/<\/script/gi, "<\\/script");
}
