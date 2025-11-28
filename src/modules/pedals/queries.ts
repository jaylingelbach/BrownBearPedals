import { pedals } from './data.local';
import type {
  Pedal,
  ProductStatus,
  PedalType,
  PedalFilterId,
  ProductLine
} from './types';

/**
 * Return all pedals, unsorted.
 * (You can add sorting by createdAt/order later if you want.)
 */
export function getAllPedals(): Pedal[] {
  return pedals;
}

/**
 * Return pedals filtered by status.
 */
export function getPedalsByStatus(status: ProductStatus): Pedal[] {
  return pedals.filter((pedal) => pedal.status === status);
}

/**
 * Convenience helper for just "available" pedals,
 * which is what your /pedals grid will probably use.
 */
export function getAvailablePedals(): Pedal[] {
  return getPedalsByStatus('available');
}

/**
 * Find a single pedal by slug, or undefined if not found.
 * Let the route decide whether to 404 / redirect / etc.
 */
export function getPedalBySlug(slug: string): Pedal | undefined {
  return pedals.find((pedal) => pedal.slug === slug);
}

/**
 * Optional: filter by tag for future category nav
 * (e.g. "Tarot", "One-off", etc.)
 */
export function getPedalsByTag(tag: string): Pedal[] {
  return pedals.filter((pedal) => pedal.tags?.includes(tag));
}

/**
 * Filter by type for nav
 * (e.g. "Overdrive", "Fuzz", etc.)
 */
export function getPedalsByType(type: PedalType): Pedal[] {
  return pedals.filter((pedal) => pedal.type === type);
}

/**
 * Filter by available pedals and type
 * (e.g. "Overdrive", "Fuzz", etc.)
 * Get available pedals matching the given pedal type.
 *
 * @param type - The pedal type to filter by (e.g., "Overdrive", "Fuzz")
 * @returns An array of pedals whose status is `'available'` and whose `type` equals `type`
 */
export function getAvailablePedalsByType(type: PedalType): Pedal[] {
  return getAvailablePedals().filter((pedal) => pedal.type === type);
}

/**
 * Returns available pedals matching the provided filter.
 *
 * @param filter - `'All'` to return all available pedals, otherwise a pedal type used to filter available pedals.
 * @returns An array of available pedals that match the filter.
 */

export function getPedalsForFilter(filter: PedalFilterId): Pedal[] {
  const available = getAvailablePedals();

  return filter === 'All'
    ? available
    : available.filter((pedal) => pedal.type === filter);
}

/**
 * Find all pedals in a line
 * (e.g. "Tarot", "Limited", "Custom" etc.)
 * Get pedals belonging to the specified product line.
 *
 * @param productLine - The product line to filter by (e.g., "Tarot", "Limited", "Custom").
 * @returns An array of pedals whose `productLine` strictly equals the provided product line.
 */
export function getPedalsByProductLine(productLine: ProductLine): Pedal[] {
  return pedals.filter((pedal) => pedal.productLine === productLine);
}
