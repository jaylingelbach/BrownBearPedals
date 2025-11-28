import { PRODUCT_LINES, ProductLine } from './types';

/**
 * Determines whether a string corresponds to a known product line.
 *
 * @param value - Candidate product line string to validate
 * @returns `true` if `value` corresponds to a known `ProductLine`, `false` otherwise.
 */
export function isProductLine(value: string): value is ProductLine {
  return PRODUCT_LINES.includes(value as ProductLine);
}