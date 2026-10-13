
import MarqueeText from "react-marquee-text";
import "react-marquee-text/dist/styles.css";

interface Product {
  id: number;
  slug: string;
  name?: string;
  nameBn?: string;
  image: string;
  unit: string;
  today: number;
  yesterday: number;
  lastWeek: number;
  lastMonth: number;
  change: {
    dir: "up" | "down" | "same";
    pct: number;
  };
}

const Marquee = async () => {
  const res = await fetch(
    "https://openapi.programming-hero.com/api/bazardor/products"
  );

  if (!res.ok) {
    throw new Error("Failed to fetch products");
  }

  const result: unknown = await res.json();

  const data: Product[] = Array.isArray(result)
    ? (result as Product[])
    : ((result as { data?: Product[] }).data ?? []);

  return (
    <div className="group overflow-hidden bg-gray-200 px-1 py-1">
      <MarqueeText
        direction="right"
        duration={10}
        className="marquee-hover-pause"
      >
        {data.map((h) => (
          <span
            key={h.id}
            className="inline-flex shrink-0 items-center gap-2 border-r border-gray-300 px-4 py-2 text-sm"
          >
            <span className="text-base">{h.image}</span>

            <span className="whitespace-nowrap font-semibold capitalize text-gray-800">
              {h.name ?? h.slug.replaceAll("-", " ")}
            </span>

            <span className="whitespace-nowrap text-gray-500">
              Rs. {h.today.toLocaleString("en-IN")}/{h.unit}
            </span>

            <span
              className={`whitespace-nowrap font-semibold ${
                h.change.dir === "up"
                  ? "text-red-500"
                  : h.change.dir === "down"
                    ? "text-green-600"
                    : "text-gray-500"
              }`}
            >
              {h.change.dir === "up"
                ? "▲"
                : h.change.dir === "down"
                  ? "▼"
                  : "—"}{" "}
              {Math.abs(h.change.pct)}%
            </span>
          </span>
        ))}
      </MarqueeText>

      <style>{`
        .marquee-hover-pause:hover {
          animation-play-state: paused !important;
        }

        .group:hover .marquee-hover-pause * {
          animation-play-state: paused !important;
        }
      `}</style>
    </div>
  );
};

export default Marquee;
