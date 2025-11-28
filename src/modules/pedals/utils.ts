import { PRODUCT_LINES, ProductLine } from './types';

export function isProductLine(value: string): value is ProductLine {
  return PRODUCT_LINES.includes(value as ProductLine);
}
