import { ProductCard } from '@/components/ui/brown-bear-components/product-card';

/**
 * Render a product page component that displays the pedal name in a header.
 *
 * @param params - A promise that resolves to an object with `pedalName`, which is used as the displayed product name.
 * @returns A JSX element containing an `h1` with the text "product page {pedalName}".
 */
export default async function Page({
  params
}: {
  params: Promise<{ pedalName: string }>;
}) {
  const resolvedParams = await params;
  const { pedalName } = resolvedParams;

  return (
    <div>
      <h1>product page {pedalName}</h1>
    </div>
  );
}