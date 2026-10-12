
// 'use client';

// import { useMemo, useState } from 'react';

// export interface Product {
//     id: number;
//     slug: string;
//     name?: string;
//     nameEn?: string;
//     nameBn?: string;
//     image: string;
//     unit: string;
//     today: number;
//     yesterday?: number;
//     change: {
//         dir: 'up' | 'down' | 'same';
//         pct: number;
//     };
// }

// type SortOption = 'default' | 'price-low' | 'price-high' | 'name';

// export default function AllProductsPrices({
//     products,
// }: {
//     products: Product[];
// }) {
//     const [sort, setSort] = useState<SortOption>('default');

//     const sortedProducts = useMemo(() => {
//         const items = [...products];

//         switch (sort) {
//             case 'price-low':
//                 return items.sort((a, b) => a.today - b.today);

//             case 'price-high':
//                 return items.sort((a, b) => b.today - a.today);

//             case 'name':
//                 return items.sort((a, b) =>
//                     (a.nameEn ?? a.name ?? a.slug).localeCompare(
//                         b.nameEn ?? b.name ?? b.slug
//                     )
//                 );

//             default:
//                 return items;
//         }
//     }, [products, sort]);

//     return (
//         <main className="min-h-screen bg-[#f0f5f0] py-2 md:px-10">
//             <section className="mx-auto container">
//                 <div className="mb-5 flex flex-wrap items-center justify-between gap-4">
//                     <div>
//                         <h1 className="text-xl font-bold text-gray-900">
//                             All Products
//                         </h1>

//                         <p className="mt-3 text-xs text-gray-500">
//                             A total of {products.length} products are being shown.
//                         </p>
//                     </div>

//                     <label className="flex items-center gap-2 text-xs text-gray-600">
//                         Sort

//                         <select
//                             value={sort}
//                             onChange={(event) =>
//                                 setSort(event.target.value as SortOption)
//                             }
//                             className="rounded-lg border border-gray-300 bg-white px-3 py-2 text-xs outline-none focus:border-green-600"
//                         >
//                             <option value="default">Default</option>
//                             <option value="price-low">Price: Low to High</option>
//                             <option value="price-high">Price: High to Low</option>
                            
//                         </select>
//                     </label>
//                 </div>

//                 {sortedProducts.length > 0 ? (
//                     <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-3">
//                         {sortedProducts.map((product) => {
//                             const productName =
//                                 product.nameEn ??
//                                 product.name ??
//                                 product.slug.replaceAll('-', ' ');

//                             const trendColor =
//                                 product.change?.dir === 'up'
//                                     ? 'text-red-500'
//                                     : product.change?.dir === 'down'
//                                         ? 'text-green-600'
//                                         : 'text-gray-500';

//                             return (
//                                 <article
//                                     key={product.id}
//                                     className="rounded-xl font-bold text-2xl border border-[#dce5dc] bg-[#fbfdfb] p-3 transition-shadow hover:shadow-md"
//                                 >
//                                     <div className="mb-3 flex items-center gap-2.5">
//                                         <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-[#f0f5f0] text-xl">
//                                             {product.image || '🛒'}
//                                         </div>

//                                         <div className="min-w-0">
//                                             <h2 className="truncate text-sm font-semibold capitalize text-gray-900">
//                                                 {productName}
//                                             </h2>

//                                             <p className="text-[10px] capitalize text-gray-500">
//                                                 Per {product.unit}
//                                             </p>
//                                         </div>
//                                     </div>

//                                     <p className="mb-1 text-[10px] text-gray-500">
//                                         Todays Price
//                                     </p>

//                                     <div className="flex items-center justify-between gap-2">
//                                         <p className="text-sm font-bold text-gray-900">
//                                             <span className="mr-1 text-xs font-normal">
//                                                 Rs.
//                                             </span>
//                                             {product.today.toLocaleString('en-IN')}
//                                         </p>

//                                         <span
//                                             className={`inline-flex shrink-0 items-center gap-1 rounded-full bg-[#f0f5f0] px-2 py-1 text-[10px] font-medium ${trendColor}`}
//                                         >
//                                             {product.change?.dir === 'up'
//                                                 ? '▲'
//                                                 : product.change?.dir === 'down'
//                                                     ? '▼'
//                                                     : '—'}

//                                             {Math.abs(product.change?.pct ?? 0)}%
//                                         </span>
//                                     </div>
//                                 </article>
//                             );
//                         })}
//                     </div>
//                 ) : (
//                     <p className="py-12 text-center text-sm text-gray-500">
//                         No products available.
//                     </p>
//                 )}
//             </section>
//         </main>
//     );
// }






'use client';
import { useMemo, useState } from 'react';
import Link from 'next/link'; // ✅ Link যোগ করেছি

export interface Product {
    id: number;
    slug: string;
    name?: string;
    nameEn?: string;
    nameBn?: string;
    image: string;
    unit: string;
    today: number;
    yesterday?: number;
    change: {
        dir: 'up' | 'down' | 'same';
        pct: number;
    };
}

type SortOption = 'default' | 'price-low' | 'price-high' | 'name';

export default function AllProductsPrices({
    products,
}: {
    products: Product[];
}) {
    const [sort, setSort] = useState<SortOption>('default');

    const sortedProducts = useMemo(() => {
        const items = [...products];
        switch (sort) {
            case 'price-low':
                return items.sort((a, b) => a.today - b.today);
            case 'price-high':
                return items.sort((a, b) => b.today - a.today);
            case 'name':
                return items.sort((a, b) =>
                    (a.nameEn ?? a.name ?? a.slug).localeCompare(
                        b.nameEn ?? b.name ?? b.slug
                    )
                );
            default:
                return items;
        }
    }, [products, sort]);

    return (
        <main className="min-h-screen bg-[#f0f5f0] py-2 md:px-10">
            <section className="mx-auto container">
                <div className="mb-5 flex flex-wrap items-center justify-between gap-4">
                    <div>
                        <h1 className="text-xl font-bold text-gray-900">
                            All Products
                        </h1>
                        <p className="mt-3 text-xs text-gray-500">
                            A total of {products.length} products are being shown.
                        </p>
                    </div>
                    <label className="flex items-center gap-2 text-xs text-gray-600">
                        Sort
                        <select
                            value={sort}
                            onChange={(event) =>
                                setSort(event.target.value as SortOption)
                            }
                            className="rounded-lg border border-gray-300 bg-white px-3 py-2 text-xs outline-none focus:border-green-600"
                        >
                            <option value="default">Default</option>
                            <option value="price-low">Price: Low to High</option>
                            <option value="price-high">Price: High to Low</option>
                            <option value="name">Name</option>
                        </select>
                    </label>
                </div>

                {sortedProducts.length > 0 ? (
                    <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-3">
                        {sortedProducts.map((product) => {
                            const productName =
                                product.nameEn ??
                                product.name ??
                                product.slug.replaceAll('-', ' ');

                            const trendColor =
                                product.change?.dir === 'up'
                                    ? 'text-red-500'
                                    : product.change?.dir === 'down'
                                        ? 'text-green-600'
                                        : 'text-gray-500';

                            return (
                                // ✅ এখানে Link যোগ করেছি
                                <Link
                                    key={product.id}
                                    href={`/product/${product.id}`}
                                    className="block rounded-xl border border-[#dce5dc] bg-[#fbfdfb] p-3 transition-shadow hover:shadow-md"
                                >
                                    <div className="mb-3 flex items-center gap-2.5">
                                        <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-[#f0f5f0] text-xl">
                                            {product.image || '🛒'}
                                        </div>
                                        <div className="min-w-0">
                                            <h2 className="truncate text-sm font-semibold capitalize text-gray-900">
                                                {productName}
                                            </h2>
                                            <p className="text-[10px] capitalize text-gray-500">
                                                Per {product.unit}
                                            </p>
                                        </div>
                                    </div>

                                    <p className="mb-1 text-[10px] text-gray-500">
                                        Todays Price
                                    </p>
                                    <div className="flex items-center justify-between gap-2">
                                        <p className="text-sm font-bold text-gray-900">
                                            <span className="mr-1 text-xs font-normal">৳</span>
                                            {product.today.toLocaleString('en-IN')}
                                        </p>
                                        <span
                                            className={`inline-flex shrink-0 items-center gap-1 rounded-full bg-[#f0f5f0] px-2 py-1 text-[10px] font-medium ${trendColor}`}
                                        >
                                            {product.change?.dir === 'up'
                                                ? '▲'
                                                : product.change?.dir === 'down'
                                                    ? '▼'
                                                    : '—'}
                                            {Math.abs(product.change?.pct ?? 0)}%
                                        </span>
                                    </div>
                                </Link>
                            );
                        })}
                    </div>
                ) : (
                    <p className="py-12 text-center text-sm text-gray-500">
                        No products available.
                    </p>
                )}
            </section>
        </main>
    );
}