import { NextResponse } from 'next/server';
import Stripe from 'stripe';
export async function POST(req: Request) {
  try {
    const stripe = new Stripe(process.env.STRIPE_SECRET_KEY || '');
    const { answers } = await req.json();
    const appUrl = process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3000';
    const line_items: Stripe.Checkout.SessionCreateParams.LineItem[] = process.env.STRIPE_PRICE_ID
      ? [{ price: process.env.STRIPE_PRICE_ID, quantity: 1 }]
      : [{ price_data: { currency: 'aud', product_data: { name: 'SpendShift Full Savings Report' }, unit_amount: 1900 }, quantity: 1 }];
    const session = await stripe.checkout.sessions.create({
      mode: 'payment',
      line_items,
      success_url: `${appUrl}/success?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${appUrl}/results`,
      metadata: { answers: String(answers).slice(0, 450) },
      allow_promotion_codes: true,
    });
    return NextResponse.json({ url: session.url });
  } catch (e: any) { return NextResponse.json({ error: e.message }, { status: 500 }); }
}
