'use client';

import { useState } from 'react';

interface Product {
  id: number;
  slug: string;
  name: string;
  price: number;
  change: number;
  changeDir: 'up' | 'down' | 'flat';
  unit: string;
  icon: string;
}

interface CategoryData {
  category: {
    id: string;
    slug: string;
    nameBn: string;
    icon: string;
  };
  categoryName: string;
  products: Array<{
    id: number;
    slug: string;
    nameBn: string;
    category: string;
    categoryNameBn: string;
    categoryIcon: string;
    unit: string;
    image: string;
    today: number;
    yesterday: number;
    lastWeek: number;
    lastMonth: number;
    change: { dir: 'up' | 'down' | 'flat'; pct: number };
    markets: Array<object>;
  }>;
}

interface Props {
  data: CategoryData;
  productNames: Record<string, string>;
}

export default function CategoryProducts({ data, productNames }: Props) {
  const [sortBy, setSortBy] = useState<'low' | 'high' | 'name'>('low');

  // Transform & sort products
  const products: Product[] = data.products.map((p) => ({
    id: p.id,
    slug: p.slug,
    name: productNames[p.slug] || p.slug,
    price: p.today,
    change: p.change.pct,
    changeDir: p.change.dir,
    unit: `Per ${p.unit}`,
    icon: p.image || p.categoryIcon
  }));

  const sortedProducts = [...products].sort((a, b) => {
    if (sortBy === 'low') return a.price - b.price;
    if (sortBy === 'high') return b.price - a.price;
    return a.name.localeCompare(b.name);
  });

  return (
    <section className="container mx-auto px-4 py-6">
      {/* Category Header */}
      <div className="bg-slate-50 rounded-2xl p-6 mb-8">
        <div className="flex items-center gap-3 mb-2">
          <span className="text-3xl">{data.category.icon}</span>
          <h1 className="text-2xl font-bold text-slate-800">{data.categoryName}</h1>
        </div>
        <p className="text-slate-500">Today&apos;s Prices & Changes of {data.products.length} Products</p>
      </div>

      {/* Top Bar */}
      <div className="flex justify-between items-center mb-6">
        <p className="text-slate-600">Total {data.products.length} products are being shown.</p>
        <div className="flex items-center gap-2">
          <label className="text-slate-600">Sort:</label>
          <select
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value as typeof sortBy)}
            className="border border-slate-200 rounded-lg px-3 py-2 bg-white"
          >
            <option value="low">Price: Low to High</option>
            <option value="high">Price: High to Low</option>
            <option value="name">Name A-Z</option>
          </select>
        </div>
      </div>

      {/* Product Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
        {sortedProducts.map((product) => (
          <div
            key={product.id}
            className="bg-white border border-slate-100 rounded-xl p-5 shadow-sm hover:shadow-md transition-shadow"
          >
            <div className="flex items-start justify-between mb-4">
              <div>
                <h3 className="font-semibold text-lg text-slate-800">{product.name}</h3>
                <p className="text-slate-500 text-sm">{product.unit}</p>
              </div>
              <span className="text-2xl">{product.icon}</span>
            </div>

            <div className="flex items-end justify-between">
              <div>
                <p className="text-slate-500 text-sm">Today&apos;s Price</p>
                <p className="text-xl font-bold text-slate-900">Rs. {product.price}</p>
              </div>
              <div
                className={`px-2 py-1 rounded-lg text-sm font-medium ${
                  product.changeDir === 'flat'
                    ? 'bg-slate-100 text-slate-600'
                    : product.changeDir === 'up'
                    ? 'bg-red-50 text-red-600'
                    : 'bg-green-50 text-green-600'
                }`}
              >
                {product.changeDir === 'flat'
                  ? '— 0.0 %'
                  : product.changeDir === 'up'
                  ? `▲ ${product.change} %`
                  : `▼ ${Math.abs(product.change)} %`}
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}