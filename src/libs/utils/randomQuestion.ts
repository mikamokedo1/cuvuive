/**
 * Pick a random item from an array, ensuring it differs from the previous item
 * to avoid consecutive duplicate questions.
 *
 * @param items - The array of items to pick from
 * @param previousItem - The previously selected item (or null for the first pick)
 * @param keyFn - Optional function to extract a unique key for comparison (defaults to `item.id`)
 * @returns A randomly selected item that differs from the previous one
 */
export function getRandomItem<T>(
  items: T[],
  previousItem: T | null,
  keyFn: (item: T) => string = (item: T) => String((item as Record<string, unknown>).id),
): T {
  if (items.length <= 1) return items[0];

  if (previousItem === null) {
    return items[Math.floor(Math.random() * items.length)];
  }

  const previousKey = keyFn(previousItem);
  const availableItems = items.filter((item) => keyFn(item) !== previousKey);

  // Fallback: if filtering leaves nothing (all items have the same key), pick any
  if (availableItems.length === 0) {
    return items[Math.floor(Math.random() * items.length)];
  }

  return availableItems[Math.floor(Math.random() * availableItems.length)];
}
