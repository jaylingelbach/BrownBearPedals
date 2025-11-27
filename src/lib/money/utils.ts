export function formatPrice(
  priceCents: number,
  currency: string = 'USD'
): string {
  const amount = priceCents / 100;
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency,
    maximumFractionDigits: 2
  }).format(amount);
}
