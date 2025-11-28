'use client';

import { PedalFilterId } from '../types';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';

interface PedalFiltersBarProps {
  selectedFilter: PedalFilterId;
  onFilterChange: (nextFilter: PedalFilterId) => void;
}

type FilterOption = { id: PedalFilterId; label: string };
const filterOptions: FilterOption[] = [
  { id: 'all', label: 'All Products' },
  { id: 'Overdrive', label: 'Overdrive' },
  { id: 'Distortion', label: 'Distortion' },
  { id: 'Fuzz', label: 'Fuzz' },
  { id: 'Delay', label: 'Delay' },
  { id: 'Modulation', label: 'Modulation' },
  { id: 'Boost', label: 'Boost' },
  { id: 'Preamp', label: 'Preamp' },
  { id: 'Utility', label: 'Utility' },
  { id: 'Buffers', label: 'Buffers' },
  { id: 'Amp Sim', label: 'Amp Sim' }
];

/**
 * Renders a horizontal, responsive bar of filter buttons for pedal categories.
 *
 * @param props.selectedFilter - Currently active filter id; the corresponding button is styled and exposed via `aria-pressed`.
 * @param props.onFilterChange - Callback invoked with the selected filter id when a button is clicked.
 * @returns A React element containing the row of filter buttons.
 */
export default function PedalFiltersBar(props: PedalFiltersBarProps) {
  const { selectedFilter, onFilterChange } = props;

  return (
    <div className="flex flex-wrap gap-3">
      {filterOptions.map((filter) => {
        const isActive = filter.id === selectedFilter;

        return (
          <Button
            key={filter.id}
            aria-pressed={isActive}
            size="lg"
            variant="link"
            onClick={() => onFilterChange(filter.id)}
            className={cn(
              'bg-white transition-all duration-300 hover:scale-[1.18] text-muted-foreground hover:text-black',
              isActive && 'text-black underline scale-[1.18]'
            )}
          >
            {filter.label}
          </Button>
        );
      })}
    </div>
  );
}