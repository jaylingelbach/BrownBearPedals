import Stripe from 'stripe';

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY ?? '', {
  apiVersion: '2025-11-17.clover' // use a real Stripe API version
});

interface SuccessPageProps {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}

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
        <a href="/" className="underline">
          Back to home
        </a>
      </main>
    );
  }

  let session;
  try {
    session = await stripe.checkout.sessions.retrieve(sessionId);
  } catch (error) {
    return (
      <main className="max-w-xl mx-auto py-16 text-center">
        <h1 className="text-2xl font-bold mb-4">Error retrieving session</h1>
        <p className="mb-4">
          We couldn't find your checkout session. It may have expired or been
          invalid.
        </p>
        <a href="/" className="underline">
          Back to home
        </a>
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
      <a href="/" className="underline">
        Back to home
      </a>
    </main>
  );
}
