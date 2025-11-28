'use client';

import Link from 'next/link';
import { useMemo, useState } from 'react';
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
  ProductLine,
  PedalFilterId
} from '@/modules/pedals/types';
import { isProductLine } from '@/modules/pedals/utils';
import PedalFiltersBar from '@/modules/pedals/ui/pedals-filter-bar';
import { CustomOrderInfo } from '@/modules/pedals/ui/custom-order.info';

export default function PedalsPage() {
  const searchParams = useSearchParams();
  const raw = searchParams.get('productLine');

  // IMPORTANT: this should be "all" (lowercase) to match your PedalFilterId type
  const [selectedFilter, setSelectedFilter] = useState<PedalFilterId>('All');

  /**
   * Derive the base pedal list + heading/notice/emptyMessage from the URL param.
   * This stays pure and is recomputed whenever `raw` changes.
   */
  const { pedals, heading, notice, emptyMessage, isCustom } = useMemo(() => {
    let base: Pedal[] = [];
    let headingLocal = 'All Pedals';
    let noticeLocal: string | null = null;
    let emptyLocal: string | null = null;
    let isCustomLocal = false;

    if (!raw) {
      // No search param → show all available
      base = getAvailablePedals();
      if (base.length === 0) {
        emptyLocal =
          'No pedals are currently available. Check back soon or browse all pedals.';
      }
    } else if (!isProductLine(raw)) {
      // Unknown line → fall back to all + explain why
      base = getAvailablePedals();
      noticeLocal = `We don’t have a “${raw}” product line yet, so we’re showing all pedals instead.`;
      if (base.length === 0) {
        emptyLocal =
          'No pedals are currently available. Check back soon or browse all pedals.';
      }
    } else {
      // Valid product line
      if (raw === 'Custom') {
        // Special case: we want a static custom-order page instead of a grid
        isCustomLocal = true;
        base = [];
        headingLocal = 'Custom Orders';
      } else {
        const productLine: ProductLine = raw;
        base = getPedalsByProductLine(productLine);
        headingLocal =
          productLine === 'Tarot' ? 'Tarot Series' : `${productLine} Line`;

        if (base.length === 0) {
          emptyLocal = `No pedals are currently available in the ${productLine} line. Check back soon or browse all pedals.`;
        }
      }
    }

    return {
      pedals: base,
      heading: headingLocal,
      notice: noticeLocal,
      emptyMessage: emptyLocal,
      isCustom: isCustomLocal
    };
  }, [raw]);

  /**
   * Types to show in the filter bar.
   * Right now this is "all available types on the site"; if you want per-line
   * types only, we can later change this to derive from `pedals` instead.
   */
  const availableTypes = useMemo<PedalType[]>(
    () => getAvailablePedalTypes(),
    []
  );

  /**
   * Apply the type filter on top of the base `pedals` list.
   */
  const visiblePedals = useMemo(() => {
    if (selectedFilter === 'All') {
      return pedals;
    }
    return pedals.filter((pedal) => pedal.type === selectedFilter);
  }, [pedals, selectedFilter]);

  // ───────────────────── Custom line: static page ────────────────────────────
  if (isCustom) {
    return (
      <main className="mx-auto max-w-6xl px-4 py-10">
        <header className="mb-6">
          <h1 className="text-sm font-semibold uppercase tracking-[0.18em]">
            {heading}
          </h1>
        </header>
        <CustomOrderInfo />
      </main>
    );
  }

  // ───────────────────── Normal product grid view ────────────────────────────
  return (
    <main className="mx-auto max-w-6xl px-4 py-10">
      {/* Page heading + notice */}
      <header className="mb-6">
        <h1 className="text-sm font-semibold uppercase tracking-[0.18em]">
          {heading}
        </h1>
        {notice && <p className="mt-2 text-xs text-destructive">{notice}</p>}
      </header>

      {/* Filters only if there is something to filter */}
      {pedals.length > 0 && (
        <section className="mb-6">
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

      {/* Grid – uses visiblePedals (after applying filter) */}
      <section className="grid gap-12 sm:grid-cols-1 md:grid-cols-2 xl:grid-cols-3">
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
