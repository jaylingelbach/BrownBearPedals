'use client';

import { useMemo, useState } from 'react';
import { PedalGridItem } from '@/components/ui/brown-bear-components/pedal-grid-item';
import PedalFiltersBar from './pedals-filter-bar';
import type { Pedal, PedalFilterId, PedalType } from '../types';

interface PedalsFilterShellProps {
  basePedals: Pedal[];
  availableTypes: PedalType[];
}

/**
 * Client-side shell that handles filter state and renders
 * the filter bar plus the pedal grid.
 */

export default function PedalsFilterShell(props: PedalsFilterShellProps) {
  const { basePedals, availableTypes } = props;

  const [selectedFilter, setSelectedFilter] = useState<PedalFilterId>('All');

  const visiblePedals = useMemo(
    () =>
      selectedFilter === 'All'
        ? basePedals
        : basePedals.filter((pedal) => pedal.type === selectedFilter),
    [basePedals, selectedFilter]
  );

  return (
    <>
      {/* Filters (only if we have something to filter) */}
      {basePedals.length > 0 && (
        <section className="mb-10" aria-label="Filter pedals">
          <PedalFiltersBar
            selectedFilter={selectedFilter}
            onFilterChange={setSelectedFilter}
            availableTypes={availableTypes}
          />
        </section>
      )}

      {/* Grid */}
      <section
        className="grid gap-12 sm:grid-cols-1 md:grid-cols-2 xl:grid-cols-3"
        aria-label="Pedal results"
      >
        {visiblePedals.map(
          ({ slug, name, priceCents, imageUrl, status, productLine }) => (
            <PedalGridItem
              key={slug}
              slug={slug}
              name={name}
              priceCents={priceCents}
              imageUrl={imageUrl}
              status={status}
              productLine={productLine}
            />
          )
        )}
      </section>
    </>
  );
}
