'use client';

import { useState } from 'react';
import { toast } from 'sonner';
import { Button } from '@/components/ui/button';

interface BuyNowButtonProps {
  slug: string; // e.g. "harmonic-albinator"
}

type CreateCheckoutSessionResponse = {
  url?: string;
  error?: string;
};

export function BuyNowButton({ slug }: BuyNowButtonProps) {
  const [isLoading, setIsLoading] = useState(false);

  const handleClick = async () => {
    try {
      setIsLoading(true);

      const response = await fetch('/api/create-checkout-session', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ slug, quantity: 1 })
      });

      let data: CreateCheckoutSessionResponse | null = null;

      try {
        data = (await response.json()) as CreateCheckoutSessionResponse;
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
        aria-label={label}
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
