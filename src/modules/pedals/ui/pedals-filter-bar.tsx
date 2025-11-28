'use client';

import { Pedal, PedalFilterId } from '../types';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import { getAvailablePedals } from '../queries';

interface PedalFiltersBarProps {
  selectedFilter: PedalFilterId;
  onFilterChange: (nextFilter: PedalFilterId) => void;
}

const currentStock: Pedal[] = getAvailablePedals();
const uniqueTypes = Array.from(
  new Set(currentStock.map((pedal) => pedal.type))
);
const filterIds: PedalFilterId[] = ['All', ...uniqueTypes];
console.log(`uniqueTypes: ${uniqueTypes}`);
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
      {filterIds.map((filter) => {
        const isActive = filter === selectedFilter;

        return (
          <Button
            key={filter}
            aria-pressed={isActive}
            size="lg"
            variant="link"
            onClick={() => onFilterChange(filter)}
            className={cn(
              'bg-white transition-all duration-300 hover:scale-[1.18] text-muted-foreground hover:text-black',
              isActive && 'text-black underline scale-[1.18]'
            )}
          >
            {filter}
          </Button>
        );
      })}
    </div>
  );
}
