import Link from "next/link";
import { notFound } from "next/navigation";

interface Market {
  market: string;
  division: string;
  min: number;
  max: number;
}

interface ProductData {
  id: number;
  slug: string;
  nameBn: string;
  category: string;
  categoryNameBn: string;
  unit: string;
  image: string;
  today: number;
  yesterday: number;
  change: {
    dir: "up" | "down" | "same";
    pct: number;
  };
  markets: Market[];
}

const productEnglishNames: Record<string, string> = {
  "katla-mach": "Katla Fish",
  "rui-mach": "Rui Fish",
  "ilish-mach": "Hilsa Fish",
  "telapiya-mach": "Tilapia",
  "alu": "Potato",
  "peyaj": "Onion",
  "mosur-dal": "Lentil (Masur)",
  "mug-dal": "Mung Dal",
  "sorno-machi-chal": "Sorno Machi Rice",
  "miniket-chal": "Miniket Rice",
  "dim": "Eggs",
  "dui-dudh": "Milk",
  "doi": "Yogurt",
};

const categoryEnglishNames: Record<string, string> = {
  "chal": "Rice",
  "dal": "Lentils & Pulses",
  "tel": "Oils",
  "sabji": "Vegetables",
  "mach": "Fish",
  "mangsho": "Meat",
  "dim-dudh": "Eggs and Milk",
  "masala": "Spices",
};

const marketEnglishNames: Record<string, string> = {
  "কারওয়ান বাজার": "Karwan Bazaar",
  "গ্রীন মার্কেট, মিরপুর": "Green Market, Mirpur",
  "চৌদগ্রাম বাজার": "Chaudagram Bazaar",
  "আমতলী বাজার": "Amtali Bazaar",
  "সদর বাজার": "Sadar Bazaar",
  "বাসারহাট বাজার": "Basarhat Bazaar",
  "মাঠ বাজার": "Math Bazaar",
  "চৌর বাজার": "Chaur Bazaar",
  "বাজারহাট": "Bazarhat",
  "ডবলগেট বাজার": "Double Gate Bazaar",
  "আমবাজার": "Am Bazaar",
  "চৌরাস্তা বাজার": "Chourasta Bazaar",
};

const divisionEnglishNames: Record<string, string> = {
  "ঢাকা": "Dhaka",
  "চট্টগ্রাম": "Chattogram",
  "রাজশাহী": "Rajshahi",
  "ময়মনসিংহ": "Mymensingh",
  "খুলনা": "Khulna",
  "সিলেট": "Sylhet",
};

function capitalizeFirstLetter(str: string): string {
  return str.charAt(0).toUpperCase() + str.slice(1);
}

async function getProduct(id: string) {
  const res = await fetch(
    `https://openapi.programming-hero.com/api/bazardor/products/${id}`,
    { next: { revalidate: 60 } }
  );
  if (!res.ok) return null;
  return res.json() as Promise<ProductData>;
}

export default async function ProductPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const product = await getProduct(id);

  if (!product) {
    notFound();
  }

  const rawProductName = productEnglishNames[product.slug] || product.slug.replaceAll("-", " ");
  const productName = capitalizeFirstLetter(rawProductName);
  const categoryName = categoryEnglishNames[product.category] || product.categoryNameBn;
  const unitLabel = product.unit === "dozen" ? "dozen" : product.unit;

  const priceChangeText = product.change.dir === "up"
    ? `The price has increased by ${product.change.pct}% since yesterday`
    : product.change.dir === "down"
    ? `The price has decreased by ${product.change.pct}% since yesterday`
    : "Price unchanged since yesterday";

  const minPrice = Math.min(...product.markets.map((m) => m.min));
  const maxPrice = Math.max(...product.markets.map((m) => m.max));
  const avgPrice = (
    product.markets.reduce((s, m) => s + (m.min + m.max) / 2, 0) / product.markets.length
  ).toFixed(0);

  return (
    <main className="min-h-screen bg-[#f0f5f0] py-6 px-4">
      <div className="container mx-auto max-w-6xl">
       
        <div className="text-sm text-gray-500 mb-6">
          <Link href="/" className="hover:underline">HOME</Link>
          <span> / </span>
          <span className="text-gray-800">{productName}</span>
        </div>

        <div className="bg-white rounded-2xl border border-[#dce5dc] p-6 mb-6 flex justify-between items-start flex-wrap gap-4">
          <div className="flex items-start gap-4">
            <div className="w-14 h-14 rounded-xl bg-[#f0f5f0] flex items-center justify-center text-2xl">
              {product.image}
            </div>
            <div>
              <h1 className="text-2xl font-bold text-gray-900">{productName}</h1>
              <p className="text-gray-500 text-sm mt-1">Per {unitLabel} • {categoryName}</p>
              <p className="text-gray-500 text-sm mt-2">{priceChangeText}</p>
            </div>
          </div>

          <div className="text-center bg-[#f0f5f0] rounded-xl p-4 min-w-[140px]">
            <p className="text-xs text-gray-500">Today's Price</p>
            <p className="text-3xl font-bold text-gray-900 mt-1">{product.today}</p>
            <p className="text-xs text-gray-500 mt-1">Money/{unitLabel}</p>
            <p className={`text-sm font-medium mt-1 ${
              product.change.dir === "down" ? "text-green-600" : "text-red-500"
            }`}>
              {product.change.dir === "down" ? "▼" : "▲"} {product.change.pct}%
            </p>
          </div>
        </div>

        <div className="bg-white rounded-2xl border border-[#dce5dc] p-6 mb-6">
          <h2 className="text-lg font-bold text-gray-900 mb-4">Price Summary</h2>
          <div className="grid grid-cols-3 gap-4">
            <div className="rounded-xl bg-[#f0f5f0] p-4">
              <p className="text-xs text-gray-500">Lowest Price</p>
              <p className="text-xl font-bold text-green-600 mt-1">৳ {minPrice}</p>
              <p className="text-xs text-gray-400 mt-1">The Lowest Price Market</p>
            </div>
            <div className="rounded-xl bg-[#f0f5f0] p-4">
              <p className="text-xs text-gray-500">Maximum Price</p>
              <p className="text-xl font-bold text-red-500 mt-1">৳ {maxPrice}</p>
              <p className="text-xs text-gray-400 mt-1">The most expensive market</p>
            </div>
            <div className="rounded-xl bg-[#f0f5f0] p-4">
              <p className="text-xs text-gray-500">Average Price</p>
              <p className="text-xl font-bold text-gray-900 mt-1">৳ {avgPrice}</p>
              <p className="text-xs text-gray-400 mt-1">As per {unitLabel}</p>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-2xl border border-[#dce5dc] overflow-hidden">
          <div className="p-4 border-b border-[#dce5dc] font-bold text-gray-900">
            Today's Market-Based Prices
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead className="bg-[#f0f5f0] text-left">
                <tr>
                  <th className="px-4 py-3 font-medium text-gray-600">Market</th>
                  <th className="px-4 py-3 font-medium text-gray-600">Division</th>
                  <th className="px-4 py-3 font-medium text-gray-600">Minimum</th>
                  <th className="px-4 py-3 font-medium text-gray-600">Maximum</th>
                  <th className="px-4 py-3 font-medium text-gray-600">Average</th>
                </tr>
              </thead>
              <tbody>
                {product.markets.map((market, i) => {
                  const marketNameEn = marketEnglishNames[market.market] || market.market;
                  const divisionNameEn = divisionEnglishNames[market.division] || market.division;
                  const avg = ((market.min + market.max) / 2).toFixed(2);

                  return (
                    <tr key={i} className="border-t border-[#f0f0f0] hover:bg-[#f9faf9]">
                      <td className="px-4 py-3 font-bold text-gray-800">{marketNameEn}</td>
                      <td className="px-4 py-3 text-gray-500">{divisionNameEn}</td>
                      <td className="px-4 py-3 font-medium">৳ {market.min}</td>
                      <td className="px-4 py-3 font-medium">৳ {market.max}</td>
                      <td className="px-4 py-3 font-medium text-green-700">৳ {avg}</td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </main>
  );
}