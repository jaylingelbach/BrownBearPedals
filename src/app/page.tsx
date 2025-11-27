'use client';

import { PedalGridItem } from '@/components/ui/brown-bear-components/pedal-grid-item';
import { getPedalsForFilter } from '@/modules/pedals/queries';
import { PedalFilterId } from '@/modules/pedals/types';
import { useMemo, useState } from 'react';

export default function Home() {
  const [selectedFilter, setSelectedFilter] = useState<PedalFilterId>('all');

  const pedals = useMemo(
    () => getPedalsForFilter(selectedFilter),
    [selectedFilter]
  );

  return (
    <main className="mx-auto max-w-6xl px-4 py-10">
      {/* Optional heading / filters go here */}
      <section className="grid gap-12 sm:grid-cols-1 md:grid-cols-2 xl:grid-cols-3">
        {pedals.map(({ slug, name, priceCents, imageUrl, status }) => (
          <PedalGridItem
            key={slug}
            slug={slug}
            name={name}
            priceCents={priceCents}
            imageUrl={imageUrl}
            status={status}
          />
        ))}
      </section>
    </main>
  );
}
