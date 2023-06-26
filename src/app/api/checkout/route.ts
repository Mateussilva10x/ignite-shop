import { NextResponse } from "next/server";
import Stripe from "stripe";

export async function POST(request: Request) {
  const data = await request.json();

  if (!data) {
    return NextResponse.json({ error: "Price not found" });
  }

  const successUrl = `${process.env.NEXT_PUBLIC_URL}/success?session_id={CHECKOUT_SESSION_ID}`;
  const cancelUrl = `${process.env.NEXT_PUBLIC_URL}/`;

  const stripe = new Stripe(
    process.env.NEXT_PUBLIC_STRIPE_SECRET_KEY as string,
    {
      apiVersion: "2022-11-15",
    }
  );

  const checkoutSession = await stripe.checkout.sessions.create({
    mode: "payment",
    line_items: [
      {
        price: data.priceId,
        quantity: 1,
      },
    ],
    success_url: successUrl,
    cancel_url: cancelUrl,
  });

  return NextResponse.json({ checkoutUrl: checkoutSession.url });
}
