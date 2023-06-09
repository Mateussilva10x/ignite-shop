"use client";
import Link from "next/link";
import Image from "next/image";
import Stripe from "stripe";
import { redirect } from "next/navigation";

const stripe = new Stripe(process.env.NEXT_PUBLIC_STRIPE_SECRET_KEY as string, {
  apiVersion: "2022-11-15",
});
export default async function Success({
  searchParams: { session_id },
}: {
  searchParams: { session_id: string };
}) {
  if (!session_id) {
    redirect("/");
  }
  const session = await stripe.checkout.sessions.retrieve(session_id, {
    expand: ["line_items", "line_items.data.price.product"],
  });
  const customerName = session.customer_details?.name;
  const product = session.line_items?.data[0].price?.product as Stripe.Product;

  return (
    <>
      <main className="mx-auto my-0 flex h-product flex-col items-center justify-center">
        <h1 className="text-2xl text-gray100">Compra efetuada!</h1>
        <div className="mt-16 flex min-h-successScreen w-full max-w-md items-center justify-center rounded-lg bg-gradient-to-b from-green200 to-purple100 p-1">
          <Image
            src={product.images[0]}
            width={300}
            height={110}
            alt=""
            className="object-cover"
          />
        </div>
        <p className="mt-8 max-w-lg text-center text-xl leading-relaxed text-gray300">
          Parabéns <strong>{customerName}</strong>, sua{" "}
          <strong>{product.name} </strong> já está a caminho da sua casa.
        </p>
        <Link
          className="mt-20 block cursor-pointer text-lg font-bold text-green500 hover:text-green300"
          href={"/"}
        >
          Voltar ao catálogo
        </Link>
      </main>
    </>
  );
}
