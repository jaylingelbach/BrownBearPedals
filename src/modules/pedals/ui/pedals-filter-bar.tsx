'use client';

import { useMemo } from 'react';
import { Button } from '@/components/ui/button';
import type { PedalFilterId, PedalType } from '../types';

interface PedalFiltersBarProps {
  selectedFilter: PedalFilterId;
  onFilterChange: (nextFilter: PedalFilterId) => void;
  availableTypes: PedalType[];
}

type FilterOption = { id: PedalFilterId; label: string };

/**
 * Render a row of filter buttons for pedal types including an "All Products" option.
 *
 * @param props.selectedFilter - The currently selected filter id.
 * @param props.onFilterChange - Callback invoked with the selected `PedalFilterId` when a button is clicked.
 * @param props.availableTypes - Array of pedal types to display as filter options.
 * @returns The React element containing buttons for "All Products" and each provided pedal type.
 */
export default function PedalFiltersBar(props: PedalFiltersBarProps) {
  const { selectedFilter, onFilterChange, availableTypes } = props;

  const filterOptions = useMemo<FilterOption[]>(() => {
    const base: FilterOption[] = [{ id: 'All', label: 'All Products' }];

    const typeOptions: FilterOption[] = availableTypes.map((type) => ({
      id: type,
      label: type
    }));

    return [...base, ...typeOptions];
  }, [availableTypes]);

  return (
    <div className="flex flex-wrap gap-3">
      {filterOptions.map((option) => {
        const isActive = option.id === selectedFilter;

        return (
          <Button
            key={option.id}
            aria-label={option.label}
            size="lg"
            variant={isActive ? 'outline' : 'ghost'}
            onClick={() => onFilterChange(option.id)}
          >
            {option.label}
          </Button>
        );
      })}
    </div>
  );
}