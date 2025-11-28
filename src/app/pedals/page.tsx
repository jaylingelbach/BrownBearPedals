'use client';

import { Suspense, useState } from 'react';
import Link from 'next/link';
import { useSearchParams } from 'next/navigation';

import { PedalGridItem } from '@/components/ui/brown-bear-components/pedal-grid-item';
import {
  getAvailablePedals,
  getAvailablePedalTypes,
  getPedalsByProductLine
} from '@/modules/pedals/queries';
import type {
  Pedal,
  PedalType,
  PedalFilterId,
  ProductLine
} from '@/modules/pedals/types';
import { isProductLine } from '@/modules/pedals/utils';
import PedalFiltersBar from '@/modules/pedals/ui/pedals-filter-bar';
import { CustomOrderInfo } from '@/modules/pedals/ui/custom-order.info';

/**
 * Inner page that actually uses useSearchParams.
 * This must be wrapped in <Suspense> in the default export.
 */
function PedalsPageInner() {
  const searchParams = useSearchParams();
  const raw = searchParams.get('productLine');

  const [selectedFilter, setSelectedFilter] = useState<PedalFilterId>('All');

  let basePedals: Pedal[] = [];
  let heading = 'All Pedals';
  let notice: string | null = null;
  let emptyMessage: string | null = null;

  // ── Decide basePedals + heading / messages from productLine ───────────────
  if (!raw) {
    // No search param → show all available
    basePedals = getAvailablePedals();
    if (basePedals.length === 0) {
      emptyMessage =
        'No pedals are currently available. Check back soon or browse all pedals.';
    }
  } else if (!isProductLine(raw)) {
    // Unknown line → fall back to all + explain why
    basePedals = getAvailablePedals();
    notice = `We don’t have a “${raw}” product line yet, so we’re showing all pedals instead.`;
    if (basePedals.length === 0) {
      emptyMessage =
        'No pedals are currently available. Check back soon or browse all pedals.';
    }
  } else {
    // Valid line
    if (raw === 'Custom') {
      // Custom line gets a static info page instead of a grid
      return (
        <main className="mx-auto max-w-6xl px-4 py-10">
          <CustomOrderInfo />
        </main>
      );
    }

    const productLine: ProductLine = raw;
    basePedals = getPedalsByProductLine(productLine);
    heading = productLine === 'Tarot' ? 'Tarot Series' : `${productLine} Line`;

    if (basePedals.length === 0) {
      emptyMessage = `No pedals are currently available in the ${productLine} line. Check back soon or browse all pedals.`;
    }
  }

  // Types available across *current stock* (not just this line)
  const availableTypes: PedalType[] = getAvailablePedalTypes();

  // Apply type filter on top of the product line selection
  const visiblePedals =
    selectedFilter === 'All'
      ? basePedals
      : basePedals.filter((pedal) => pedal.type === selectedFilter);

  return (
    <main className="mx-auto max-w-6xl px-4 py-10">
      {/* Page heading + notice */}
      <header className="mb-6">
        <h1 className="text-sm font-semibold uppercase tracking-[0.18em]">
          {heading}
        </h1>
        {notice && <p className="mt-2 text-xs text-destructive">{notice}</p>}
      </header>

      {/* Filters (only if there is something to filter) */}
      {basePedals.length > 0 && (
        <section className="mb-6" aria-label="Filter pedals">
          <PedalFiltersBar
            selectedFilter={selectedFilter}
            onFilterChange={setSelectedFilter}
            availableTypes={availableTypes}
          />
        </section>
      )}

      {/* Empty-line message / gentle alert */}
      {emptyMessage && (
        <section className="mb-6 rounded-lg border border-dashed border-muted-foreground/40 bg-muted/30 px-4 py-3 text-xs text-muted-foreground">
          <p>{emptyMessage}</p>
          <Link
            href="/pedals"
            className="mt-1 inline-block font-medium underline"
          >
            Browse all pedals
          </Link>
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
    </main>
  );
}

/**
 * Default export: wraps the inner page in Suspense so Next is happy
 * about useSearchParams during prerender.
 */
export default function PedalsPage() {
  return (
    <Suspense
      fallback={
        <main className="mx-auto max-w-6xl px-4 py-10">
          <p className="text-xs text-muted-foreground">Loading pedals…</p>
        </main>
      }
    >
      <PedalsPageInner />
    </Suspense>
  );
}
