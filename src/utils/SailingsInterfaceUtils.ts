import type Sailing from "@/interfaces/SailingsInterface";

/**
 * Removes duplicate sailings from an array of sailings.
 * The API sometimes returns the same sailing multiple times, so we need to deduplicate them.
 * @param sailings - Array of sailings to deduplicate
 * @returns Array of unique sailings
 */
export function getUniqueSailings(sailings: Sailing[]): Sailing[] {
  return Array.from(
    new Map(
      sailings.map((sailing) => [JSON.stringify(sailing), sailing])
    ).values()
  );
}