'use client';

import { z } from 'zod';
import { useState, useRef } from 'react';
import { toast } from 'sonner';
import { Button } from '@/components/ui/button';

interface BuyNowButtonProps {
  slug: string; // e.g. "tree-fiddy"
}

const CheckoutSessionResponseSchema = z.object({
  url: z.string().url().optional(),
  error: z.string().optional()
});

type CreateCheckoutSessionResponse = z.infer<
  typeof CheckoutSessionResponseSchema
>;

/**
 * Renders a button that initiates a checkout flow for the given product slug and redirects the user to the Stripe Checkout page.
 *
 * Shows a loading state while creating the checkout session, disables the button to prevent duplicate submissions, and exposes a screen-reader live region announcing status changes. On failure it displays user-facing error toasts; on success it navigates the browser to the checkout URL returned by the API.
 *
 * @param slug - The product identifier used to create the checkout session (for example, "tree-fiddy")
 * @returns A JSX fragment containing the purchase button and an accessible live region for status announcements
 */
export function BuyNowButton({ slug }: BuyNowButtonProps) {
  const [isLoading, setIsLoading] = useState(false);
  const isSubmittingRef = useRef(false);

  const handleClick = async () => {
    if (isSubmittingRef.current) return;
    try {
      isSubmittingRef.current = true;
      setIsLoading(true);

      const response = await fetch('/api/create-checkout-session', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ slug, quantity: 1 })
      });

      let data: CreateCheckoutSessionResponse | null = null;

      try {
        const json = await response.json();
        const result = CheckoutSessionResponseSchema.safeParse(json);
        data = result.success ? result.data : null;
      } catch {
        data = null;
      }

      if (!response.ok) {
        const message =
          data?.error ??
          'Something went wrong while starting checkout. Please try again.';
        toast.error(message);
        return;
      }

      if (!data?.url) {
        toast.error(
          'Checkout URL was missing. Please refresh the page and try again.'
        );
        return;
      }

      // All good – redirect to Stripe Checkout
      window.location.href = data.url;
    } catch (error) {
      console.error(error);
      toast.error(
        'Network error while contacting Stripe. Check your connection and try again.'
      );
    } finally {
      isSubmittingRef.current = false;
      setIsLoading(false);
    }
  };

  const label = isLoading
    ? 'Redirecting to secure checkout'
    : 'Buy this pedal now';

  return (
    <>
      <Button
        type="button"
        onClick={handleClick}
        disabled={isLoading}
        aria-disabled={isLoading}
        aria-busy={isLoading}
        className="hover:bg-pink-500 hover:text-primary hover:scale-105"
      >
        {isLoading ? 'Redirecting…' : 'Buy it now'}
      </Button>

      {/* Live region for screen readers to announce status changes */}
      <span aria-live="polite" aria-atomic="true" className="sr-only">
        {label}
      </span>
    </>
  );
}