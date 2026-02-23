"use client";

import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { Star } from "@phosphor-icons/react";
import { fetchInstructorProfile } from "@/api/instructor";
import { useAuth } from "@/hooks/use-auth";
import { AnimateIn } from "@/components/ui/animate-in";
import { Skeleton } from "@/components/ui/skeleton";

export default function PageContent() {
  const { user } = useAuth();
  const instructorId = user?.instructorId ?? "inst-6";
  const [starFilter, setStarFilter] = useState<number | null>(null);

  const { data: instructor, isLoading } = useQuery({
    queryKey: ["instructor-profile", instructorId],
    queryFn: () => fetchInstructorProfile(instructorId),
  });

  if (isLoading) {
    return (
      <div className="max-w-7xl mx-auto space-y-6">
        <Skeleton className="h-10 w-48" />
        <Skeleton className="h-32 rounded-2xl" />
        <div className="space-y-4">
          {Array.from({ length: 4 }).map((_, i) => (
            <Skeleton key={i} className="h-24 rounded-2xl" />
          ))}
        </div>
      </div>
    );
  }

  if (!instructor) return null;

  const filteredReviews = starFilter
    ? instructor.reviews.filter((r) => r.rating === starFilter)
    : instructor.reviews;

  return (
    <div className="max-w-7xl mx-auto space-y-8">
      <div>
        <h1 className="text-2xl font-bold text-gray-900 tracking-tight">Reviews</h1>
        <p className="text-sm text-gray-500 mt-1">What your students are saying.</p>
      </div>

      {/* Rating Overview */}
      <AnimateIn>
        <div className="rounded-2xl bg-white p-6 shadow-[var(--shadow-soft)] border border-gray-100/60">
          <div className="flex flex-col sm:flex-row sm:items-center gap-6">
            {/* Big rating */}
            <div className="text-center sm:text-left">
              <p className="text-5xl font-bold text-gray-900">{instructor.rating}</p>
              <div className="flex items-center justify-center sm:justify-start gap-0.5 mt-1">
                {Array.from({ length: 5 }).map((_, i) => (
                  <Star key={i} size={16} weight="fill" className={i < Math.round(instructor.rating) ? "text-amber-400" : "text-gray-200"} />
                ))}
              </div>
              <p className="text-sm text-gray-500 mt-1">{instructor.reviewCount} reviews</p>
            </div>

            {/* Distribution bars */}
            <div className="flex-1 space-y-1.5">
              {instructor.ratingDistribution.map((dist) => (
                <div key={dist.stars} className="flex items-center gap-2">
                  <span className="text-xs text-gray-500 w-4 text-right">{dist.stars}</span>
                  <Star size={12} weight="fill" className="text-amber-400" />
                  <div className="flex-1 h-2 bg-gray-100 rounded-full overflow-hidden">
                    <div className="h-full bg-amber-400 rounded-full transition-all duration-500" style={{ width: `${dist.percentage}%` }} />
                  </div>
                  <span className="text-xs text-gray-400 w-8">{dist.percentage}%</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </AnimateIn>

      {/* Star filter pills */}
      <div className="flex flex-wrap gap-2">
        <button
          onClick={() => setStarFilter(null)}
          className={`px-4 py-2 rounded-full text-sm font-bold transition-all ${
            starFilter === null
              ? "bg-coral text-white shadow-sm"
              : "bg-white text-gray-600 border border-gray-200 hover:border-coral/30"
          }`}
        >
          All
        </button>
        {[5, 4, 3, 2, 1].map((stars) => (
          <button
            key={stars}
            onClick={() => setStarFilter(stars)}
            className={`px-4 py-2 rounded-full text-sm font-bold transition-all flex items-center gap-1 ${
              starFilter === stars
                ? "bg-coral text-white shadow-sm"
                : "bg-white text-gray-600 border border-gray-200 hover:border-coral/30"
            }`}
          >
            {stars} <Star size={12} weight="fill" className={starFilter === stars ? "text-white" : "text-amber-400"} />
          </button>
        ))}
      </div>

      {/* Review cards */}
      <div className="space-y-4">
        {filteredReviews.map((review, i) => (
          <AnimateIn key={review.id} delay={i * 50}>
            <div className="rounded-2xl bg-white p-5 shadow-[var(--shadow-soft)] border border-gray-100/60">
              <div className="flex items-start gap-3">
                <div className="w-10 h-10 rounded-full bg-coral/10 flex items-center justify-center flex-shrink-0 text-sm font-bold text-coral">
                  {review.authorInitials}
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <p className="text-sm font-bold text-gray-900">{review.authorName}</p>
                      <div className="flex items-center gap-0.5">
                        {Array.from({ length: review.rating }).map((_, j) => (
                          <Star key={j} size={12} weight="fill" className="text-amber-400" />
                        ))}
                      </div>
                    </div>
                    <span className="text-xs text-gray-400">{review.date}</span>
                  </div>
                  <p className="text-sm text-gray-600 mt-2 leading-relaxed">{review.text}</p>
                </div>
              </div>
            </div>
          </AnimateIn>
        ))}
        {filteredReviews.length === 0 && (
          <p className="text-center text-sm text-gray-400 py-8">No reviews matching this filter.</p>
        )}
      </div>
    </div>
  );
}
