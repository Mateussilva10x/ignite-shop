import Image from "next/image";
import { useKeenSlider } from "keen-slider/react";

import camiseta1 from "../assets/1.png";
import camiseta2 from "../assets/2.png";
import camiseta3 from "../assets/3.png";

import "keen-slider/keen-slider.min.css";

export default function Home() {
  const [sliderRef] = useKeenSlider({
    slides: {
      perView: 3,
    },
  });

  return (
    <main className="flex min-h-shopScreen  w-full gap-12" ref={sliderRef}>
      <a className="img-hover relative flex cursor-pointer items-center justify-center overflow-hidden rounded-lg bg-gradient-to-b from-green200 to-purple100 p-1">
        <Image
          src={camiseta1}
          width={520}
          height={420}
          alt=""
          className="object-cover"
        />
        <footer className=" img-hover absolute bottom-1 left-1 right-1 flex translate-y-outWindow items-center justify-between rounded-md bg-black600 p-8 opacity-0 transition delay-150 ease-in-out">
          <strong className="text-lg">Camiseta X</strong>
          <span className="text-xl font-bold text-green300">R$ 79,98</span>
        </footer>
      </a>

      <a className="img-hover relative flex cursor-pointer items-center justify-center overflow-hidden rounded-lg bg-gradient-to-b from-green200 to-purple100 p-1">
        <Image
          src={camiseta2}
          width={520}
          height={420}
          alt=""
          className="object-cover"
        />
        <footer className=" img-hover absolute bottom-1 left-1 right-1 flex translate-y-outWindow items-center justify-between rounded-md bg-black600 p-8 opacity-0 transition delay-150 ease-in-out">
          <strong className="text-lg">Camiseta X</strong>
          <span className="text-xl font-bold text-green300">R$ 79,98</span>
        </footer>
      </a>
      <a className="img-hover relative flex cursor-pointer items-center justify-center overflow-hidden rounded-lg bg-gradient-to-b from-green200 to-purple100 p-1">
        <Image
          src={camiseta3}
          width={520}
          height={420}
          alt=""
          className="object-cover"
        />
        <footer className=" img-hover absolute bottom-1 left-1 right-1 flex translate-y-outWindow items-center justify-between rounded-md bg-black600 p-8 opacity-0 transition delay-150 ease-in-out">
          <strong className="text-lg">Camiseta X</strong>
          <span className="text-xl font-bold text-green300">R$ 79,98</span>
        </footer>
      </a>
    </main>
  );
}
