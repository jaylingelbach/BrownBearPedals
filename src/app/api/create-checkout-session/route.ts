import Stripe from 'stripe';
import { NextRequest, NextResponse } from 'next/server';
import { z } from 'zod';

import { getPedalBySlug } from '@/modules/pedals/queries';

if (!process.env.STRIPE_SECRET_KEY) {
  throw new Error('Missing required environment variable: STRIPE_SECRET_KEY');
}

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY, {
  apiVersion: '2025-11-17.clover'
});

const createSessionSchema = z.object({
  slug: z.string().min(1),
  quantity: z.number().int().positive().max(10).default(1)
});

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
          quantity: quantity
        }
      ],
      mode: 'payment',
      success_url: `${origin}/checkout/success?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${origin}/checkout/cancel`,
      shipping_address_collection: {
        allowed_countries: ['US', 'CA']
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
