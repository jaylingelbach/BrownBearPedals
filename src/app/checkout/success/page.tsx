import Link from 'next/link';
import { stripe } from '@/lib/stripe';

// Next 16: searchParams is a Promise
interface SuccessPageProps {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}
/**
 * Renders the checkout success page for a completed Stripe session.
 *
 * Reads `session_id` from `searchParams`, attempts to retrieve the corresponding
 * Stripe Checkout Session, and renders one of three views:
 * - a "missing session ID" message when `session_id` is absent,
 * - an error message when the session cannot be retrieved,
 * - a thank-you view that optionally displays the customer's email when retrieval succeeds.
 *
 * @param searchParams - Query parameters passed to the page; expects `session_id` to identify the Stripe session
 * @returns The rendered React element for the checkout success page
 */
export default async function SuccessPage({ searchParams }: SuccessPageProps) {
  const resolvedSearchParams = await searchParams;

  const raw = resolvedSearchParams.session_id;
  const sessionId = Array.isArray(raw) ? raw[0] : raw;

  if (!sessionId) {
    return (
      <main className="max-w-xl mx-auto py-16 text-center">
        <h1 className="text-2xl font-bold mb-4">No session ID found</h1>
        <p className="mb-4">
          The <code>session_id</code> query parameter was missing.
        </p>
        <Link href="/" className="underline">
          Back to home
        </Link>
      </main>
    );
  }

  let session;
  try {
    session = await stripe.checkout.sessions.retrieve(sessionId);
  } catch (error) {
    console.error('[checkout/success] Failed to retrieve session:', error);
    return (
      <main className="max-w-xl mx-auto py-16 text-center">
        <h1 className="text-2xl font-bold mb-4">Error retrieving session</h1>
        <p className="mb-4">
          We couldn't find your checkout session. It may have expired or been
          invalid.
        </p>
        <Link href="/" className="underline">
          Back to home
        </Link>
      </main>
    );
  }

  const customerEmail = session.customer_details?.email;

  return (
    <main className="max-w-xl mx-auto py-16 text-center">
      <h1 className="text-3xl font-bold mb-4">Thank you for your order!</h1>
      {customerEmail && (
        <p className="mb-2">
          A confirmation email has been sent to <strong>{customerEmail}</strong>
          .
        </p>
      )}
      <p className="mb-6">
        Your pedal will ship in 3–5 business days. If you have any questions,
        just reply to your confirmation email.
      </p>
      <Link href="/" className="underline">
        Back to home
      </Link>
    </main>
  );
}
