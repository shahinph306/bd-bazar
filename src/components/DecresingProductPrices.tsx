
import Link from "next/link";

interface Product {
  id: number;
  slug: string;
  name?: string;
  nameEn?: string;
  image: string;
  unit: string;
  today: number;
  change: {
    dir: "up" | "down" | "same";
    pct: number;
  };
}

const DecreasingProductPrices = async () => {
  const res = await fetch(
    "https://openapi.programming-hero.com/api/bazardor/products"
  );

  if (!res.ok) {
    throw new Error("Failed to fetch products");
  }

  const result: unknown = await res.json();

  const products: Product[] = Array.isArray(result)
    ? (result as Product[])
    : ((result as { data?: Product[] }).data ?? []);

  const topProducts = products
    .filter((product) => product.change?.dir === "down")
    .sort((a, b) => b.change.pct - a.change.pct)
    .slice(0, 6);

  return (
    <section className="mx-auto min-h-screen max-w-7xl bg-[#f0f5f0] px-4 py-6 sm:px-6 lg:px-8">
      <h1 className="mb-3 flex items-center gap-2 text-xl font-bold text-[#172b20]">
        <span className="text-green-600">▼</span>
        Prices have come down today
      </h1>

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {topProducts.map((product) => {
          const name =
            product.nameEn ??
            product.name ??
            product.slug.replaceAll("-", " ");

          return (
            <Link
              key={product.id}
              href={`/product/${product.id}`}
              className="block rounded-2xl border border-[#dce5dc] bg-[#fbfdfb] p-4 transition-shadow duration-200 hover:shadow-md"
            >
              <div className="mb-3 flex items-center gap-3">
                <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-[#f0f5f0] text-2xl">
                  {product.image}
                </div>

                <div className="min-w-0">
                  <h2 className="font-semibold capitalize text-gray-900">
                    {name}
                  </h2>

                  <p className="text-xs text-gray-500">
                    Per {product.unit}
                  </p>
                </div>
              </div>

              <div className="flex items-end justify-between gap-2">
                <div>
                  <p className="mb-1 text-xs text-gray-500">
                    Today's Price
                  </p>

                  <p className="text-lg font-bold text-gray-900">
                    <span className="mr-1 text-sm font-normal">
                      Rs.
                    </span>
                    {product.today.toLocaleString("en-IN")}
                  </p>
                </div>

                <span className="inline-flex shrink-0 items-center gap-1 rounded-full bg-[#f0f5f0] px-3 py-1 text-xs font-semibold text-green-600">
                  ▼ {product.change.pct}%
                </span>
              </div>
            </Link>
          );
        })}
      </div>

      {topProducts.length === 0 && (
        <p className="py-10 text-center text-gray-500">
          No price decreases found today.
        </p>
      )}
    </section>
  );
};

export default DecreasingProductPrices;
