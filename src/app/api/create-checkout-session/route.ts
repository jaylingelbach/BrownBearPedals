import Stripe from 'stripe';
import { NextRequest, NextResponse } from 'next/server';
import { z } from 'zod';

import { getPedalBySlug } from '@/modules/pedals/queries';

if (!process.env.STRIPE_SECRET_KEY) {
  throw new Error('Missing required environment variable: STRIPE_SECRET_KEY');
}

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

const createSessionSchema = z.object({
  slug: z.string().min(1),
  quantity: z.number().int().positive().max(10).default(1)
});

/**
 * Handles POST requests to create a Stripe Checkout session for a pedal.
 *
 * Validates the JSON body for `slug` and `quantity`, resolves the pedal by slug, ensures the pedal is available and has a Stripe price ID, determines the site origin from the request `Origin` header or NEXT_PUBLIC_SITE_URL, creates a Stripe Checkout session (payment mode) restricted to US/CA shipping, and responds with the session URL or an error payload.
 *
 * @param request - Incoming NextRequest whose JSON body must include `slug` (string) and optional `quantity` (positive integer)
 * @returns A JSON object `{ url: string }` containing the Checkout session URL on success, or `{ error: string }` describing the failure on validation, product lookup, origin resolution, or internal error.
 */
export async function POST(request: NextRequest) {
  try {
    const json = (await request.json()) as unknown;

    const parsed = createSessionSchema.safeParse(json);
    if (!parsed.success) {
      return NextResponse.json(
        { error: 'Invalid request body' },
        { status: 400 }
      );
    }

    const { slug, quantity } = parsed.data;

    const pedal = getPedalBySlug(slug);
    if (!pedal || !pedal.stripePriceId || pedal.status !== 'available') {
      return NextResponse.json({ error: 'Unknown product' }, { status: 400 });
    }

    const origin =
      request.headers.get('origin') ?? process.env.NEXT_PUBLIC_SITE_URL;

    if (!origin) {
      return NextResponse.json(
        { error: 'Unable to determine site origin' },
        { status: 500 }
      );
    }
    const session = await stripe.checkout.sessions.create({
      line_items: [
        {
          price: pedal.stripePriceId,
          quantity
        }
      ],
      mode: 'payment',

      automatic_tax: {
        enabled: true
      },
      shipping_address_collection: {
        allowed_countries: ['US', 'CA']
      },
      // Flat rate shipping
      shipping_options: [
        {
          shipping_rate_data: {
            display_name: 'Standard shipping',
            type: 'fixed_amount',
            fixed_amount: {
              amount: 1200, // 1200 cents = $12.00
              currency: 'usd'
            },
            // Optional but nice to show on Checkout
            delivery_estimate: {
              minimum: { unit: 'business_day', value: 3 },
              maximum: { unit: 'business_day', value: 5 }
            },
            // Let Stripe Tax decide how to tax shipping
            tax_behavior: 'exclusive' // matches how your product is taxed
          }
        }
      ],

      success_url: `${origin}/checkout/success?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${origin}/checkout/cancel`,
      metadata: {
        productSlug: pedal.slug,
        productName: pedal.name,
        bbpDebugAutomaticTax: 'true'
      }
    });

    return NextResponse.json({ url: session.url }, { status: 200 });
  } catch (error) {
    console.error('[create-checkout-session] error', error);
    return NextResponse.json(
      { error: 'Unable to create checkout session' },
      { status: 500 }
    );
  }
}
