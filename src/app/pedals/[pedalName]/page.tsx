import { notFound } from 'next/navigation';
import Image from 'next/image';

import { getPedalBySlug } from '@/modules/pedals/queries';
import { formatPrice } from '@/lib/money/utils';
import { Button } from '@/components/ui/button';

/**
 * Render a product page component for an individual pedal.
 *
 * @param params - A promise that resolves to an object with `pedalName`, which is used as the slug.
 */
export default async function Page({
  params
}: {
  params: Promise<{ pedalName: string }>;
}) {
  const resolvedParams = await params;
  const { pedalName } = resolvedParams;

  const data = await getPedalBySlug(pedalName);
  if (!data) return notFound();

  const price = formatPrice(data.priceCents);

  const descIntro = data.descriptionIntro
    ? data.descriptionIntro.split(/\n{2,}/) // split on 2+ newlines
    : [];

  const descBullets = data.descriptionBullets ?? [];

  const outro = data?.descriptionOutro;

  const hasIntro = descIntro.length > 0;
  const hasBullets = descBullets.length > 0;

  return (
    <main className="mx-auto max-w-6xl px-4 py-8 sm:py-10">
      <section className="grid gap-8 lg:gap-12 lg:grid-cols-2 lg:items-start">
        {/* Left Column – Image */}
        <div className="relative w-full max-w-md mx-auto">
          <div className="relative aspect-4/5 w-full overflow-hidden rounded-xl bg-muted/40 shadow-sm">
            <Image
              src={data.imageUrl}
              alt={data.name}
              fill
              className="object-contain"
              sizes="(min-width: 1024px) 400px, 80vw"
            />
          </div>
        </div>

        {/* Right Column – Content */}
        <div className="flex flex-col gap-4 lg:gap-5 lg:pr-10 items-stretch text-center lg:text-left">
          {/* Title + Price + CTA */}
          <div className="space-y-2">
            <h1 className="text-xl sm:text-2xl font-semibold tracking-tight">
              {data.name}
            </h1>

            <p className="text-lg sm:text-xl font-semibold text-foreground">
              {price}
            </p>

            <Button className="mt-2 w-full sm:w-auto sm:px-8 hover:bg-pink-500 hover:text-primary">
              Buy it now
            </Button>
          </div>

          {/* Short description */}
          {data.descriptionShort && (
            <p className="mt-2 text-sm sm:text-base font-semibold text-muted-foreground">
              {data.descriptionShort}
            </p>
          )}

          {/* Long intro paragraphs */}
          {hasIntro && (
            <div className="mt-2 space-y-3">
              {descIntro.map((paragraph, index) => (
                <p
                  key={index}
                  className="text-sm sm:text-base leading-relaxed text-foreground"
                >
                  {paragraph}
                </p>
              ))}
            </div>
          )}

          {/* Features list */}
          {hasBullets && (
            <div className="mt-4 text-left">
              <h3 className="text-sm sm:text-base font-semibold mb-2">
                Features
              </h3>
              <ul className="list-disc pl-5 space-y-1 text-sm sm:text-base text-foreground/90">
                {descBullets.map((bullet, index) => (
                  <li key={index}>{bullet}</li>
                ))}
              </ul>
            </div>
          )}
          {/* Outro */}
          {outro && <div className="mt-2 space-y-3">{outro}</div>}
        </div>
      </section>
    </main>
  );
}
