'use client';

import Image from 'next/image';
import Link from 'next/link';
import { cn } from '@/lib/utils';
import { formatPrice } from '@/lib/money/utils';
import type { ProductLine, ProductStatus } from '@/modules/pedals/types';

interface PedalGridItemProps {
  slug: string;
  name: string;
  priceCents: number;
  imageUrl: string;
  status: ProductStatus;
  className?: string;
  productLine?: ProductLine;
}

/**
 * Render a clickable product tile for a pedal showing its image, title, and either the price or a "Sold out" label.
 *
 * @param props - Component props including `slug`, `name`, `priceCents`, `imageUrl`, `status`, and optional `className`.
 * @returns The React element for the pedal grid item.
 */

export function PedalGridItem(props: PedalGridItemProps) {
  const { slug, name, priceCents, imageUrl, status, className, productLine } =
    props;
  const isSold = status === 'sold';

  return (
    <Link
      href={`/pedals/${slug}`}
      className={cn(
        'group flex flex-col items-center gap-6 transition-transform duration-700 hover:scale-[1.08] hover:-translate-y-1',
        isSold && 'opacity-80',
        className
      )}
    >
      {/* Image area – bigger pedal */}
      <div className="relative flex w-full max-w-sm md:max-w-md items-center justify-center">
        <div className="relative aspect-4/5 w-full">
          <Image
            src={imageUrl}
            alt={name}
            fill
            className="object-contain drop-shadow-lg"
            sizes="(min-width: 1280px) 320px, (min-width: 1024px) 280px, (min-width: 768px) 40vw, 80vw"
          />
        </div>
      </div>

      {/* Text underneath */}
      <div className="flex flex-col items-center gap-1 text-center">
        {productLine && (
          <span className="text-[0.65rem] uppercase tracking-[0.18em] text-muted-foreground">
            {productLine === 'Tarot' ? 'Tarot Series' : productLine}
          </span>
        )}

        <h2 className="text-sm font-medium tracking-tight text-foreground uppercase">
          {name}
        </h2>

        <p className="text-xs text-muted-foreground">
          {isSold ? 'Sold out' : formatPrice(priceCents)}
        </p>
      </div>
    </Link>
  );
}
