"use client";
import Stripe from "stripe";
import Image from "next/image";
import { useState } from "react";

async function getProduct(id: string) {
  const res = await fetch(
    `https://api.stripe.com/v1/products/${id}?expand[]=default_price`,
    {
      headers: {
        Authorization: `Bearer ${process.env.NEXT_PUBLIC_STRIPE_SECRET_KEY}`,
      },
      next: { revalidate: 60 * 60 * 2 },
    }
  );
  const product = await res.json();

  const price = product?.default_price as Stripe.Price;
  const filteredProducts = {
    id: product?.id,
    name: product?.name,
    description: product?.description,
    imageUrl: product?.images[0],
    price: new Intl.NumberFormat("pt-BR", {
      style: "currency",
      currency: "BRL",
    }).format((price?.unit_amount as number) / 100),
    defaultPriceId: price.id,
  };

  return filteredProducts;
}

type Props = {
  params: { id: string };
};

export default async function Product({
  params: { id },
}: {
  params: { id: string };
}) {
  const [isLoading, setIsLoading] = useState(false);

  const product = await getProduct(id);

  const handleByProduct = async () => {
    try {
      setIsLoading(true);
      const response = await fetch("/api/checkout", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ priceId: product.defaultPriceId }),
      });
      const data = await response.json();
      window.location.href = data.checkoutUrl;
    } catch (err) {
      setIsLoading(false);

      alert("Falha ao Redirecionar ao checkout!");
    }
  };

  return (
    <>
      <main className="mx-auto grid max-w-6xl grid-cols-shop items-stretch gap-16">
        <div className="flex h-product w-full max-w-xl items-center justify-center rounded-lg bg-gradient-to-b from-green200 to-purple100 p-1">
          <Image
            src={product.imageUrl}
            width={520}
            height={420}
            alt=""
            className="object-cover"
          />
        </div>
        <div className="flex flex-col">
          <h1 className="text-2xl text-gray300">{product.name}</h1>
          <span className="mt-4 block text-2xl text-green300">
            {product.price}
          </span>
          <p className="mt-10 text-md leading-6 text-gray300">
            {product.description}
          </p>

          <button
            className="mt-auto cursor-pointer rounded-lg border-0 bg-green500 p-5 text-md font-bold text-white hover:bg-green300 disabled:bg-green500 disabled:opacity-50"
            onClick={handleByProduct}
            disabled={isLoading}
          >
            Comprar agora
          </button>
        </div>
      </main>
    </>
  );
}
