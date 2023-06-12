import { NextApiRequest } from "next";
import { NextResponse, NextRequest } from "next/server";
import Stripe from "stripe";

type Price = {
  priceId?: string;
};

export async function POST(request: Request) {
  const data: Price = await request.json();
  const successUrl = `${process.env.NEXT_PUBLIC_URL}/success`;
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
