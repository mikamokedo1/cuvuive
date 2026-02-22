export const randomNum = (min: number, max: number) => {
  return Math.floor(Math.random() * (max - min + 1)) + min;
};

/**
 * Pick a random item from an array, excluding a specific value.
 * Falls back to any random item if exclusion is not possible.
 */
export function randomExcluding<T>(items: T[], exclude: T | null): T {
  if (items.length <= 1) return items[0];
  const filtered = exclude !== null ? items.filter((item) => item !== exclude) : items;
  const pool = filtered.length > 0 ? filtered : items;
  return pool[Math.floor(Math.random() * pool.length)];
}
