import Stripe from "stripe";
const stripeKey: SecretKey = process.env.STRIPE_SECRET_KEY;
export const stripe = new Stripe(stripeKey, {
  apiVersion: "2022-11-15",
  appInfo: {
    name: "ignite shop",
  },
});
