export function normalizeTagPathSegment(tag: string): string {
  return encodeURIComponent(tag.trim().toLowerCase());
}
