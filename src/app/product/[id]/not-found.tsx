import Link from "next/link";

export default function NotFound() {
  return (
    <main className="min-h-screen bg-[#f0f5f0] py-6 px-4">
      <div className="container mx-auto max-w-6xl flex flex-col items-center justify-center min-h-[50vh]">
        <div className="w-20 h-20 rounded-full bg-orange-100 flex items-center justify-center text-3xl mb-4">
          😕
        </div>
        <h2 className="text-2xl font-bold text-gray-900 mb-2">Product Not Found</h2>
        <p className="text-gray-500 max-w-md mb-6">
          This product may be unavailable or the link is incorrect.
        </p>
        <Link
          href="/"
          className="bg-green-600 text-white px-6 py-2.5 rounded-lg hover:bg-green-700 transition-colors"
        >
          ← Back to Home
        </Link>
      </div>
    </main>
  );
}