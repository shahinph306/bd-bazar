
import Link from "next/link";

export default function NotFound() {
  return (
    <section className="flex min-h-[420px] flex-1 flex-col items-center justify-center bg-[#F0F5F0] px-4 py-12 text-center">
      <div className="mb-3 text-6xl" role="img" aria-label="Shopping basket">
        🛒
      </div>

      <h1 className="mb-3 text-2xl font-bold text-gray-900 sm:text-3xl">
        The page could not be found
      </h1>

      <p className="mb-5 max-w-xl text-sm leading-6 text-gray-500 sm:text-base">
        The product or page you're looking for has been removed or never was.
      </p>

      <div className="flex flex-wrap items-center justify-center gap-2">
        <Link
          href="/"
          className="rounded-lg bg-green-700 px-5 py-3 text-sm font-semibold text-white shadow-md transition hover:bg-green-800"
        >
          Go to Home Page
        </Link>

        <Link
          href="/auth/sign-in"
          className="rounded-lg border border-gray-800 px-5 py-3 text-sm font-semibold text-gray-900 transition hover:bg-gray-200"
        >
          Go to sign in Page
        </Link>
      </div>
    </section>
  );
}
