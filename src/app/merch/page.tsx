import Image from 'next/image';
import Link from 'next/link';

import { cn } from '@/lib/utils';
import { formatPrice } from '@/lib/money/utils';

type MerchItem = {
  id: string;
  name: string;
  priceCents: number;
  imageSrc: string;
  description?: string;
};

const merchItems: MerchItem[] = [
  {
    id: 'logo-tee',
    name: 'Brown Bear Pedals Logo Tee',
    priceCents: 2800,
    imageSrc: '/merch/BrownBearTee.png',
    description: 'Charcoal tee with the retro Brown Bear Pedals logo.'
  },
  {
    id: 'logo-sticker',
    name: 'Brown Bear Pedals Sticker',
    priceCents: 400,
    imageSrc: '/merch/BrownBearSticker.png',
    description: 'Durable vinyl sticker featuring the mid-century logo.'
  },
  {
    id: 'logo-keychain',
    name: 'Brown Bear Pedals Keychain',
    priceCents: 900,
    imageSrc: '/merch/BrownBearKeychain.png',
    description: 'Vintage-style keychain with the Brown Bear Pedals emblem.'
  }
];

function MerchGridItem(props: MerchItem) {
  const { name, priceCents, imageSrc, description } = props;

  return (
    <div
      className={cn(
        'group flex flex-col items-center gap-6',
        'transition-transform duration-700 hover:scale-[1.05] hover:-translate-y-1'
      )}
    >
      {/* Image area */}
      <div className="relative flex w-full max-w-sm md:max-w-md items-center justify-center">
        <div className="relative aspect-4/5 w-full rounded-xl bg-muted/40">
          <Image
            src={imageSrc}
            alt={name}
            fill
            className="object-contain drop-shadow-lg rounded-xl"
            sizes="(min-width: 1280px) 320px, (min-width: 1024px) 280px, (min-width: 768px) 40vw, 80vw"
          />
        </div>
      </div>

      {/* Text + button */}
      <div className="flex w-full max-w-sm flex-col items-center gap-2 text-center">
        <h2 className="text-sm font-medium tracking-tight text-foreground uppercase">
          {name}
        </h2>

        {description && (
          <p className="text-xs text-muted-foreground">{description}</p>
        )}

        <p className="text-xs font-semibold tracking-wide text-foreground">
          {formatPrice(priceCents)}
        </p>

        <Link
          href="#"
          className="mt-1 inline-flex h-9 items-center justify-center rounded-full border 
          border-foreground/20 bg-foreground text-[0.7rem] font-semibold uppercase tracking-[0.18em] 
          text-background px-6 shadow-sm transition-transform duration-150 hover:bg-pink-500 hover:text-primary
          hover:scale-110"
        >
          Purchase now
        </Link>
      </div>
    </div>
  );
}

/**
 * Merch page showing Brown Bear Pedals apparel and accessories.
 */
export default function Page() {
  return (
    <main className="mx-auto max-w-6xl px-4 py-10">
      <header className="mb-10 text-center">
        <h1 className="text-sm font-semibold uppercase tracking-[0.25em]">
          Merch
        </h1>
        <p className="mt-2 text-xs text-muted-foreground">
          Rep Brown Bear Pedals with tees, stickers, and more.
        </p>
      </header>

      <section
        className="grid gap-12 sm:grid-cols-1 md:grid-cols-2 xl:grid-cols-3"
        aria-label="Brown Bear Pedals merch"
      >
        {merchItems.map((item) => (
          <MerchGridItem key={item.id} {...item} />
        ))}
      </section>
    </main>
  );
}
