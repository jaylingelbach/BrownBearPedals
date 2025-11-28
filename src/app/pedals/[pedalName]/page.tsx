import { ProductCard } from '@/components/ui/brown-bear-components/product-card';

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
