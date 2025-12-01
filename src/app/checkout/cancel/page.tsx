import Link from 'next/link';
/**
 * Renders a static "Order canceled" confirmation page with a link back to the home page.
 *
 * @returns The JSX element for the order cancellation page.
 */
export default function CancelPage() {
  return (
    <main className="max-w-xl mx-auto py-16 text-center">
      <h1 className="text-3xl font-bold mb-4">Order canceled</h1>
      <p className="mb-6">
        Your card wasn’t charged. If you ran into an issue, you can try again or
        contact me for help.
      </p>
      <Link href="/" className="underline">
        Back to home
      </Link>
    </main>
  );
}