
import Image from "next/image";
import banner from "../../public/basket.svg";
import RisingProductsPrices from "../components/RisingProductsPrices";
import AllProductsPrices from "../components/AllProducts";
import HomeScrollButton from "../components/HomeScrollButton";
import DecreasingProductPrices from "@/components/DecresingProductPrices";

export default async function Home() {
  const response = await fetch(
    "https://openapi.programming-hero.com/api/bazardor/products",
    {
      next: { revalidate: 60 },
    }
  );

  if (!response.ok) {
    throw new Error("Failed to fetch products");
  }

  const result = await response.json();

  const products = Array.isArray(result)
    ? result
    : result.data?.products ?? result.data ?? result.products ?? [];

  return (
    <main className="w-full">
      
      <div className="mx-auto w-full max-w-7xl px-4">

        <section className="mt-8 flex w-full items-center justify-between gap-6 border border-gray-300 bg-base-100 px-4 py-6">
          <div className="flex-1">
            <h1 className="py-4 text-2xl font-bold sm:text-3xl lg:text-4xl">
              Today's Market Prices at a Glance
            </h1>

            <p className="py-2 text-gray-500">
              Prices of rice, pulses, oil, vegetables, fish, meat,
              eggs and spices.
            </p>

            <HomeScrollButton />
          </div>

          <div className="hidden shrink-0 sm:block">
            <Image
              src={banner}
              alt="Basket of vegetables"
              width={240}
              height={240}
              priority
              className="h-auto w-full max-w-60"
            />
          </div>
        </section>

        <section className="w-full py-2">
          <RisingProductsPrices />
        </section>

        <section className="w-full py-2">
          <DecreasingProductPrices />
        </section>

        <section id="all-products-section" className="w-full py-2">
          <AllProductsPrices products={products} />
        </section>

      </div>
    </main>
  );
}
