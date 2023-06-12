import { NextApiRequest } from "next";
import { NextResponse } from "next/server";
import Stripe from "stripe";

export async function POST(req: NextApiRequest) {
  const { priceId } = req?.body;
  console.log(req.body);

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
        price: "price_1NBjTzFBf79SF7nWAHA0ToXg",
        quantity: 1,
      },
    ],
    success_url: successUrl,
    cancel_url: cancelUrl,
  });

  return NextResponse.json({ checkoutUrl: checkoutSession.url });
}
