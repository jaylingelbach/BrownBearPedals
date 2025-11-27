'use client';

import { PedalFilterId } from '../types';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';

interface PedalFiltersBarProps {
  selectedFilter: PedalFilterId;
  onFilterChange: (nextFilter: PedalFilterId) => void;
}

type FilterOption = { id: PedalFilterId; label: string };

export default function PedalFiltersBar(props: PedalFiltersBarProps) {
  const { selectedFilter, onFilterChange } = props;

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

  return (
    <div className="flex flex-wrap gap-3">
      {filterOptions.map((filter) => {
        const isActive = filter.id === selectedFilter;

        return (
          <Button
            key={filter.id}
            aria-label={filter.label}
            size="lg"
            variant="link"
            onClick={() => onFilterChange(filter.id)}
            className={cn(
              'bg-white transition-transform duration-300 hover:scale-[1.18] text-muted-foreground hover:text-black hover:bg-white',
              isActive && 'text-black underline scale-118'
            )}
          >
            {filter.label}
          </Button>
        );
      })}
    </div>
  );
}
