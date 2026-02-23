import { Star } from "@phosphor-icons/react";
import { BRAND_ACCENT } from "@/lib/constants";
import type { RatingDistribution } from "@/types/activity";

export function StarRating({ rating, size = 16 }: { rating: number; size?: number }) {
  const full = Math.floor(rating);
  const hasHalf = rating - full >= 0.25;
  return (
    <span className="inline-flex items-center gap-0.5">
      {[0, 1, 2, 3, 4].map((pos) => (
        <Star
          key={pos}
          size={size}
          weight={pos < full ? "fill" : pos === full && hasHalf ? "duotone" : "regular"}
          style={{ color: pos < full || (pos === full && hasHalf) ? BRAND_ACCENT : "#D1D5DB" }}
        />
      ))}
    </span>
  );
}

export function RatingBar({ dist }: { dist: RatingDistribution }) {
  return (
    <div className="flex items-center gap-4">
      <span className="text-xs font-bold text-gray-400 w-4">{dist.stars}</span>
      <div className="flex-1 h-2.5 bg-white rounded-full overflow-hidden shadow-inner">
        <div
          className="h-full rounded-full transition-all duration-700"
          style={{ width: `${dist.percentage}%`, backgroundColor: BRAND_ACCENT }}
        />
      </div>
      <span className="text-xs font-medium text-gray-400 w-8">
        {dist.percentage}%
      </span>
    </div>
  );
}
