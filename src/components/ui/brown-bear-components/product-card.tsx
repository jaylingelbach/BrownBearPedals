'use client';

import Image from 'next/image';
import Link from 'next/link';
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader
} from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import { formatPrice } from '@/lib/money/utils';
import { ProductStatus } from '@/modules/pedals/types';

// TODO: Doc strings
interface ProductCardProps {
  name: string;
  slug: string;
  priceCents: number;
  imageUrl: string;
  status?: ProductStatus;
  description?: string;
  tags?: string[];
  onPrimaryActionClick?: () => void;
  primaryActionLabel?: string;
  className?: string;
  currency?: string; // e.g. "USD"
}

export function ProductCard(props: ProductCardProps) {
  const {
    name,
    slug,
    priceCents,
    imageUrl,
    status = 'available',
    description,
    tags,
    onPrimaryActionClick,
    primaryActionLabel = 'View pedal',
    className,
    currency = 'USD'
  } = props;

  const isSold = status === 'sold';
  const isComingSoon = status === 'coming_soon';

  const statusLabel =
    status === 'sold'
      ? 'Sold'
      : status === 'coming_soon'
      ? 'Coming soon'
      : 'Available';

  const statusVariant =
    status === 'sold'
      ? 'secondary'
      : status === 'coming_soon'
      ? 'outline'
      : 'default';

  const cardInner = (
    <Card
      className={cn(
        // let the theme drive colors
        'flex flex-col overflow-hidden rounded-2xl border border-border bg-card/90 shadow-sm transition hover:-translate-y-1 hover:shadow-md',
        // sold gets a slightly faded look but not too moody
        isSold && 'opacity-80',
        className
      )}
    >
      <CardHeader className="gap-3 p-4 pb-3">
        <div className="flex items-start justify-between gap-3">
          <div className="min-w-0">
            <h2 className="truncate text-lg font-semibold tracking-tight text-foreground">
              {name}
            </h2>
            <p className="mt-1 text-sm text-muted-foreground">
              {formatPrice(priceCents, currency)}
            </p>
          </div>

          <Badge
            variant={statusVariant}
            className={cn(
              'shrink-0 rounded-full px-3 py-1 text-xs font-medium tracking-wide',
              status === 'available' &&
                'bg-primary text-primary-foreground shadow-sm',
              isComingSoon &&
                'border border-border bg-accent/80 text-accent-foreground',
              isSold && 'bg-muted text-muted-foreground'
            )}
          >
            {statusLabel}
          </Badge>
        </div>
      </CardHeader>

      <CardContent className="flex flex-col gap-3 px-4 pb-3">
        <div className="relative aspect-4/3 w-full overflow-hidden rounded-xl border border-border bg-muted">
          <Image
            src={imageUrl}
            alt={name}
            fill
            className="object-contain transition duration-300 group-hover:scale-105"
            sizes="(min-width: 1024px) 300px, (min-width: 768px) 50vw, 100vw"
          />
        </div>

        {description && (
          <p className="line-clamp-3 text-sm text-muted-foreground">
            {description}
          </p>
        )}

        {tags && tags.length > 0 && (
          <div className="flex flex-wrap gap-2">
            {tags.map((tag) => (
              <Badge
                key={tag}
                variant="outline"
                className="border-dashed text-[0.7rem] uppercase tracking-wide text-muted-foreground"
              >
                {tag}
              </Badge>
            ))}
          </div>
        )}
      </CardContent>

      <CardFooter className="flex items-center justify-between gap-3 border-t border-border px-4 py-3">
        <span className="text-[0.7rem] text-muted-foreground">
          Handmade in small batches 🐻
        </span>

        {onPrimaryActionClick ? (
          <Button
            size="sm"
            disabled={isSold}
            onClick={onPrimaryActionClick}
            className="rounded-full px-4"
          >
            {isSold ? 'Sold out' : primaryActionLabel}
          </Button>
        ) : (
          <Button
            asChild
            size="sm"
            disabled={isSold}
            className="rounded-full px-4"
          >
            <Link href={`/pedals/${slug}`}>
              {isSold ? 'View details' : primaryActionLabel}
            </Link>
          </Button>
        )}
      </CardFooter>
    </Card>
  );

  return <div className="group">{cardInner}</div>;
}
