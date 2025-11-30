import { getAvailablePedals } from '@/modules/pedals/queries';
import type { PedalType } from '@/modules/pedals/types';
import PedalsFilterShell from '@/modules/pedals/ui/pedals-filter-shell';

/**
 * Home page – server component.
 * Renders heading + passes initial pedal data into the client filter shell.
 */
export default function Home() {
  const basePedals = getAvailablePedals();

  // Derive available types from the current stock
  const availableTypes: PedalType[] = Array.from(
    new Set(basePedals.map((pedal) => pedal.type))
  );

  return (
    <main className="mx-auto max-w-6xl px-4 py-10">
      <header className="mb-6">
        <p className="text-[0.7rem] font-semibold uppercase tracking-[0.25em] text-muted-foreground">
          Pedals
        </p>
        <h1 className="text-2xl font-semibold tracking-tight">
          Brown Bear Pedals
        </h1>
        <p className="mt-2 max-w-2xl text-sm text-muted-foreground">
          Explore the current lineup of Brown Bear Pedals, from tarot-inspired
          designs to limited runs.
        </p>
      </header>

      <PedalsFilterShell
        basePedals={basePedals}
        availableTypes={availableTypes}
      />
    </main>
  );
}
