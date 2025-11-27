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

// TODO: Doc strings
export default function ProductList({
  slug,
  name,
  priceCents,
  imageUrl,
  status
}: ProductCardProps) {
  return (
    <div id="pedal-grid-item">
      <PedalGridItem
        key={slug}
        slug={slug}
        name={name}
        priceCents={priceCents}
        imageUrl={imageUrl}
        status={status ?? 'available'}
      />
    </div>
  );
}
