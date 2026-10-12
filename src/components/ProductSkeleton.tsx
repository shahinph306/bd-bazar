export default function ProductSkeleton() {
  return (
    <main className="min-h-screen bg-[#f0f5f0] py-6 px-4">
      <div className="container mx-auto max-w-6xl space-y-6">
        {/* Breadcrumb Skeleton */}
        <div className="h-4 bg-gray-200 rounded w-1/3 animate-pulse"></div>

        {/* Header Card Skeleton */}
        <div className="bg-white rounded-2xl border border-[#dce5dc] p-6">
          <div className="flex items-center justify-between gap-4 flex-wrap">
            <div className="flex items-center gap-4">
              <div className="w-14 h-14 rounded-xl bg-gray-200 animate-pulse"></div>
              <div className="space-y-2">
                <div className="h-6 bg-gray-200 rounded w-48 animate-pulse"></div>
                <div className="h-4 bg-gray-200 rounded w-64 animate-pulse"></div>
              </div>
            </div>
            <div className="w-36 h-28 bg-gray-100 rounded-xl animate-pulse"></div>
          </div>
        </div>

        {/* Price Summary Skeleton */}
        <div className="bg-white rounded-2xl border border-[#dce5dc] p-6">
          <div className="h-5 bg-gray-200 rounded w-36 mb-4 animate-pulse"></div>
          <div className="grid grid-cols-3 gap-4">
            {[1, 2, 3].map((i) => (
              <div key={i} className="h-28 bg-gray-100 rounded-xl animate-pulse"></div>
            ))}
          </div>
        </div>

        {/* Table Skeleton */}
        <div className="bg-white rounded-2xl border border-[#dce5dc] overflow-hidden">
          <div className="h-12 bg-gray-100 animate-pulse"></div>
          <div className="divide-y divide-gray-100">
            {[1, 2, 3, 4, 5].map((i) => (
              <div key={i} className="h-12 bg-gray-50 animate-pulse" style={{ animationDelay: `${i * 100}ms` }}></div>
            ))}
          </div>
        </div>
      </div>
    </main>
  );
}