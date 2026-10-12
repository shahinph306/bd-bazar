import Link from "next/link";

export default function NotFoundPage({
  title = "Product Not Found",
  message = "The product you are looking for does not exist or has been removed.",
  backText = "Back to Home",
  backHref = "/",
}: {
  title?: string;
  message?: string;
  backText?: string;
  backHref?: string;
}) {
  return (
    <div className="min-h-[60vh] flex flex-col items-center justify-center text-center px-4">
      <div className="w-20 h-20 rounded-full bg-orange-100 flex items-center justify-center text-3xl mb-4">
        😕
      </div>
      <h2 className="text-2xl font-bold text-gray-900 mb-2">{title}</h2>
      <p className="text-gray-500 max-w-md mb-6">{message}</p>
      <Link
        href={backHref}
        className="bg-green-600 text-white px-6 py-2.5 rounded-lg hover:bg-green-700 transition-colors"
      >
        ← {backText}
      </Link>
    </div>
  );
}