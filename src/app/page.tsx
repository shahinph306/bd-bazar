// import Image from "next/image";
// import banner from "../../public/basket.svg";
// import RisingProductsPrices from "./components/RisingProductsPrices";
// import AllProductsPrices from "./components/AllProducts";
// import Link from "next/link";

// export default async function Home() {
//   const response = await fetch(
//     "https://openapi.programming-hero.com/api/bazardor/products"
//   );

//   if (!response.ok) {
//     throw new Error("Failed to fetch products");
//   }

//   const result = await response.json();

//   // Adjust this line to match the API response structure.
//   const products = Array.isArray(result)
//     ? result
//     : result.data?.products ?? result.data ?? result.products ?? [];

//   return (
//     <div>
//       <div className="flex justify-between mx-auto container border pt-4 bg-base-100 mt-8 px-4">
//         <div>
//           <h1 className="font-bold text-4xl py-4">
//             Todays Market Prices at a Glance
//           </h1>

//           <p className="text-gray-500 py-4">
//             Prices of rice, pulses, oil, vegetables, fish, meat, eggs and spices.
//           </p>

//           <Link href="./components/AllProducts.tsx">
//             <button className="bg-green-500 py-2 px-3 rounded-xl cursor-pointer">
//             View all products
//           </button>
//           </Link>
//         </div>

//         <div>
//           <Image src={banner} alt="Basket" width={400} height={400} />
//         </div>
//       </div>

//       <RisingProductsPrices />

//       <AllProductsPrices products={products} />
//     </div>
//   );
// }



import Image from "next/image";
import banner from "../../public/basket.svg";
import RisingProductsPrices from "../components/RisingProductsPrices";
import AllProductsPrices from "../components/AllProducts";
import HomeScrollButton from "../components/HomeScrollButton";
import DecreasingProductPrices from "@/components/DecresingProductPrices";

// ✅ SERVER COMPONENT — fetch data here
export default async function Home() {
  const response = await fetch(
    "https://openapi.programming-hero.com/api/bazardor/products",
    { next: { revalidate: 60 } }
  );

  if (!response.ok) {
    throw new Error("Failed to fetch products");
  }

  const result = await response.json();
  const products = Array.isArray(result)
    ? result
    : result.data?.products ?? result.data ?? result.products ?? [];

  return (
    <div>
      {/* Hero Section — scroll button is a separate client component */}
      <div className="flex justify-between mx-auto container border pt-4 bg-base-100 mt-8 px-4">
        <div>
          <h1 className="font-bold text-4xl py-4">
            Todays Market Prices at a Glance
          </h1>
          <p className="text-gray-500 py-4">
            Prices of rice, pulses, oil, vegetables, fish, meat, eggs and spices.
          </p>
          
          {/* ✅ Client component for scroll only */}
          <HomeScrollButton />
        </div>
        <div>
          <Image src={banner} alt="Basket" width={400} height={400} priority />
        </div>
      </div>

      <RisingProductsPrices />
      <DecreasingProductPrices></DecreasingProductPrices>

      {/* ✅ Target for scroll */}
      <div id="all-products-section">
        <AllProductsPrices products={products} />
      </div>
    </div>
  );
}