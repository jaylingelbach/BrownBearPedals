import { ProductStatus } from '@/modules/pedals/types';
import { PedalGridItem } from './pedal-grid-item';

interface ProductCardProps {
  slug: string;
  name: string;
  priceCents: number;
  descriptionShort: string;
  imageUrl: string;
  status?: ProductStatus;
  tags?: string[];
}

/**
 * Render a PedalGridItem for a product using the provided product props.
 *
 * @param status - Product availability status; when `undefined`, defaults to `'available'`.
 * @returns A JSX element rendering a configured `PedalGridItem`.
 */

export default function ProductList({
  slug,
  name,
  priceCents,
  imageUrl,
  status
}: ProductCardProps) {
  return (
    <PedalGridItem
      key={slug}
      slug={slug}
      name={name}
      priceCents={priceCents}
      imageUrl={imageUrl}
      status={status ?? 'available'}
    />
  );
}
