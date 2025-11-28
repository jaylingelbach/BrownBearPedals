'use client';

import { PedalGridItem } from '@/components/ui/brown-bear-components/pedal-grid-item';
import {
  getAvailablePedalTypes,
  getPedalsForFilter
} from '@/modules/pedals/queries';
import { PedalFilterId, PedalType } from '@/modules/pedals/types';
import PedalFiltersBar from '@/modules/pedals/ui/pedals-filter-bar';
import { useMemo, useState } from 'react';

/**
 * Renders the pedals home page with a filter bar and a responsive grid of pedal items.
 *
 * @returns The page React element containing the filter controls and the pedal results grid.
 */

export default function Home() {
  const [selectedFilter, setSelectedFilter] = useState<PedalFilterId>('All');

  const availableTypes = useMemo<PedalType[]>(
    () => getAvailablePedalTypes(),
    []
  );

  const pedals = useMemo(
    () => getPedalsForFilter(selectedFilter),
    [selectedFilter]
  );

  return (
    <main className="mx-auto max-w-6xl px-4 py-10">
      {/* Optional heading / filters go here */}
      <section className="mb-10" aria-label="Filter pedals">
        <PedalFiltersBar
          selectedFilter={selectedFilter}
          onFilterChange={setSelectedFilter}
          availableTypes={availableTypes}
        />
      </section>
      <section
        className="grid gap-12 sm:grid-cols-1 md:grid-cols-2 xl:grid-cols-3 mt-5"
        aria-label="Pedal results"
      >
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
