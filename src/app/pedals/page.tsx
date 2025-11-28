import { PedalGridItem } from '@/components/ui/brown-bear-components/pedal-grid-item';
import { getAvailablePedals } from '@/modules/pedals/queries';

export default function PedalsPage() {
  const pedals = getAvailablePedals();
  console.log(`available: ${JSON.stringify(pedals, null, 2)}`);
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
