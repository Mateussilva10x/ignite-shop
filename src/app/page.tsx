"use client";
import Image from "next/image";
import Link from "next/link";
import Head from "next/head";

import { useKeenSlider } from "keen-slider/react";

import "keen-slider/keen-slider.min.css";
import Stripe from "stripe";
import { Loader } from "@/components/Loader.";
import { useState } from "react";

async function getProducts() {
  const res = await fetch(
    `https://api.stripe.com/v1/products?expand[]=data.default_price`,
    {
      headers: {
        Authorization: `Bearer ${process.env.NEXT_PUBLIC_STRIPE_SECRET_KEY}`,
      },
      next: { revalidate: 60 * 60 * 2 },
    }
  );

  const { data: products } = await res.json();

  const filteredProducts = products.map((product: any) => {
    const price = product.default_price as Stripe.Price;

    return {
      id: product.id,
      name: product.name,
      imageUrl: product.images[0],
      price: new Intl.NumberFormat("pt-BR", {
        style: "currency",
        currency: "BRL",
      }).format((price.unit_amount as number) / 100),
    };
  });

  return filteredProducts;
}

interface Product {
  id: string;
  name: string;
  imageUrl: string;
  price: number;
}

export default async function Home() {
  const [sliderRef] = useKeenSlider({
    slides: {
      perView: 3,
      spacing: 48,
    },
  });
  const [isLoading, setIsLoading] = useState(false);
  const products = await getProducts();

  return (
    <>
      <Loader isLoading={isLoading} />
      <main
        className="keen-slider flex  min-h-shopScreen w-full"
        ref={sliderRef}
      >
        {products?.map((product: Product) => {
          return (
            <Link
              key={product.id}
              href={`/product/${product.id}`}
              className="img-hover keen-slider__slide relative flex cursor-pointer items-center justify-center overflow-hidden rounded-lg bg-gradient-to-b from-green200 to-purple100"
              prefetch={false}
              onClick={() => setIsLoading(true)}
            >
              <Image
                src={product.imageUrl}
                width={520}
                height={420}
                alt=""
                className="object-cover"
              />
              <footer className=" img-hover absolute bottom-1 left-1 right-1 flex translate-y-outWindow items-center justify-between rounded-md bg-black600 p-8 opacity-0 transition delay-150 ease-in-out">
                <strong className="text-lg">{product.name}</strong>
                <span className="text-xl font-bold text-green300">
                  {product.price}
                </span>
              </footer>
            </Link>
          );
        })}
      </main>
    </>
  );
}
