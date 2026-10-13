import Link from "next/link";

interface Product {
  id: number;
  slug: string;
  nameEn?: string;
  name?: string;
  category: string;
  image: string;
  unit: string;
  today: number;
  change: {
    dir: "up" | "down" | "same";
    pct: number;
  };
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

const categoryNames: Record<string, string> = {
  "chal": "Rice",
  "dal": "Lentils & Pulses",
  "tel": "Oils",
  "sobji": "Vegetables",
  "mach": "Fish",
  "mangsho": "Meat",
  "dim-dui": "Eggs & Milk",
  "mosla": "Spices",
};

async function getProducts() {
  const res = await fetch(
    "https://openapi.programming-hero.com/api/bazardor/products",
    { next: { revalidate: 60 } }
  );
  if (!res.ok) return [];
  const data = await res.json();
  return Array.isArray(data) ? data : (data as { data?: Product[] }).data || [];
}

export default async function CategoryPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const allProducts = await getProducts();

  const products = allProducts.filter((p) => p.category === slug);
  const categoryName = categoryNames[slug] || slug;

  return (
    <main className="min-h-screen bg-[#f0f5f0] py-6 px-4">
      <div className="container mx-auto max-w-5xl">
        {/* ব্রেডক্রাম্ব */}
        <div className="text-sm text-gray-500 mb-6">
          <Link href="/" className="hover:underline">HOME</Link>
          <span> / </span>
          <span className="text-gray-800 font-medium">{categoryName}</span>
        </div>

        <h1 className="text-2xl font-bold text-gray-900 mb-6">{categoryName}</h1>
        <p className="text-sm text-gray-500 mb-6">
          {products.length} products found in this category
        </p>

        {products.length > 0 ? (
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {products.map((product) => {
              const productName =
                productEnglishNames[product.slug] ||
                product.nameEn ||
                product.name ||
                product.slug.replaceAll("-", " ");

              const trendColor =
                product.change.dir === "up"
                  ? "text-red-500"
                  : product.change.dir === "down"
                    ? "text-green-600"
                    : "text-gray-500";

              return (

                <Link
                  key={product.id}
                  href={`/product/${product.id}`}
                  className="block rounded-2xl border-2 border-[#dce5dc] bg-white p-4 transition-shadow hover:shadow-md"
                >
                  <div className="mb-4 flex items-center gap-3">
                    <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-[#f0f5f0] text-2xl">
                      {product.image}
                    </div>
                    <div>
                      <h2 className="font-semibold text-gray-900">
                        {productName}
                      </h2>
                      <p className="text-xs text-gray-500">
                        Per {product.unit}
                      </p>
                    </div>
                  </div>

                  <div className="flex items-end justify-between">
                    <div>
                      <p className="mb-1 text-xs text-gray-500">Today&apos;s Price</p>
                      <p className="text-lg font-bold text-gray-900">
                        <span className="mr-1 text-sm font-normal">৳</span>
                        {product.today.toLocaleString("en-IN")}
                      </p>
                    </div>
                    <span
                      className={`inline-flex items-center gap-1 rounded-full bg-[#f0f5f0] px-3 py-1 text-xs font-medium ${trendColor}`}
                    >
                      {product.change.dir === "up" ? "▲" : product.change.dir === "down" ? "▼" : "—"}
                      {product.change.pct}%
                    </span>
                  </div>
                </Link>
              );
            })}
          </div>
        ) : (
          <p className="py-12 text-center text-gray-500">
            No products available in this category.
          </p>
        )}
      </div>
    </main>
  );
}