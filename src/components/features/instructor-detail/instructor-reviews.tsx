"use client";

import { Button } from "@/components/ui/button";
import { AnimateIn } from "@/components/ui/animate-in";
import { StarRating, RatingBar } from "@/components/features/star-rating";
import type { RatingDistribution, Review } from "@/types/activity";

export function InstructorReviews({
  reviews,
  rating,
  reviewCount,
  ratingDistribution,
  reviewFilter,
  visibleReviewCount,
  onSetFilter,
  onShowMore,
}: {
  reviews: Review[];
  rating: number;
  reviewCount: number;
  ratingDistribution: RatingDistribution[];
  reviewFilter: "all" | number;
  visibleReviewCount: number;
  onSetFilter: (filter: "all" | number) => void;
  onShowMore: () => void;
}) {
  const filteredReviews =
    reviewFilter === "all"
      ? reviews
      : reviews.filter((r) => Math.floor(r.rating) === reviewFilter);
  const visibleReviews = filteredReviews.slice(0, visibleReviewCount);
  const hasMoreReviews = visibleReviewCount < filteredReviews.length;
  const availableStars = [...new Set(reviews.map((r) => Math.floor(r.rating)))].sort(
    (a, b) => b - a
  );

  return (
    <div className="mt-20 bg-secondary relative overflow-hidden">
      <div className="absolute top-0 right-1/4 w-72 h-72 bg-coral/[0.06] rounded-full blur-3xl" />
      <div className="absolute bottom-0 left-1/6 w-60 h-60 bg-coral/[0.04] rounded-full blur-3xl" />

      <div className="relative z-10 max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8 py-16 md:py-20">
        <AnimateIn>
          <section>
            <span className="uppercase tracking-widest text-coral font-bold text-xs mb-2 block">
              Testimonials
            </span>
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-10 tracking-tight">
              What students say
            </h2>

            {/* Rating overview */}
            <div className="grid grid-cols-1 md:grid-cols-12 gap-8 mb-14">
              <div className="md:col-span-4 flex flex-col items-center justify-center p-8 bg-white rounded-3xl border border-gray-100 shadow-[var(--shadow-soft)]">
                <div className="text-5xl font-bold text-gray-900 mb-2">
                  {rating}
                </div>
                <StarRating rating={rating} size={20} />
                <div className="text-sm font-medium text-gray-500 uppercase tracking-wider mt-3">
                  {reviewCount} Reviews
                </div>
              </div>
              <div className="md:col-span-8 flex flex-col justify-center space-y-3 bg-white rounded-3xl border border-gray-100 shadow-[var(--shadow-soft)] p-8">
                {ratingDistribution.map((dist) => (
                  <RatingBar key={dist.stars} dist={dist} />
                ))}
              </div>
            </div>

            {/* Filter pills */}
            <div className="flex flex-wrap gap-2 mb-8">
              <button
                onClick={() => onSetFilter("all")}
                className={`px-4 py-2 rounded-full text-sm font-bold transition-all ${
                  reviewFilter === "all"
                    ? "bg-coral text-white shadow-sm"
                    : "bg-white text-gray-600 border border-gray-200 hover:border-coral/30"
                }`}
              >
                All ({reviews.length})
              </button>
              {availableStars.map((star) => {
                const count = reviews.filter(
                  (r) => Math.floor(r.rating) === star
                ).length;
                return (
                  <button
                    key={star}
                    onClick={() => onSetFilter(star)}
                    className={`px-4 py-2 rounded-full text-sm font-bold transition-all ${
                      reviewFilter === star
                        ? "bg-coral text-white shadow-sm"
                        : "bg-white text-gray-600 border border-gray-200 hover:border-coral/30"
                    }`}
                  >
                    {star}★ ({count})
                  </button>
                );
              })}
            </div>

            {/* Individual reviews */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {visibleReviews.map((review) => (
                <div
                  key={review.id}
                  className="bg-white rounded-2xl p-6 border border-gray-100 shadow-[var(--shadow-soft)] hover:shadow-[var(--shadow-hover)] transition-shadow"
                >
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-full flex items-center justify-center font-bold text-sm bg-coral/10 text-coral">
                        {review.authorInitials}
                      </div>
                      <div>
                        <h5 className="font-bold text-gray-900 text-sm">
                          {review.authorName}
                        </h5>
                        <p className="text-xs text-gray-400">{review.date}</p>
                      </div>
                    </div>
                  </div>
                  <StarRating rating={review.rating} size={14} />
                  <p className="text-gray-600 text-sm leading-relaxed mt-3">
                    {review.text}
                  </p>
                </div>
              ))}
            </div>

            {hasMoreReviews && (
              <div className="mt-10 flex justify-center">
                <Button
                  variant="outline"
                  className="px-8 py-3 rounded-full font-bold text-sm bg-white hover:bg-gray-50 shadow-[var(--shadow-soft)] hover:shadow-[var(--shadow-hover)] transition-all border-gray-200"
                  onClick={onShowMore}
                >
                  Show more reviews
                </Button>
              </div>
            )}
          </section>
        </AnimateIn>
      </div>
    </div>
  );
}
